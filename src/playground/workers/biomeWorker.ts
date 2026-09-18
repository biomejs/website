import init, {
	type AnalyzerSelector,
	type Configuration,
	DiagnosticPrinter,
	type FixFileMode,
	MemoryFileSystem,
	type ProjectKey,
	type RuleCategories,
	Workspace,
} from "@biomejs/wasm-web";
import {
	createBiomeConfiguration,
	getOnlyLintRules,
} from "@/playground/configuration.ts";
import {
	type BiomeOutput,
	LoadingState,
	type PlaygroundSettings,
} from "@/playground/types.ts";

const encoder = new TextEncoder();
const knownFiles = new Set<string>();

let filesystem: MemoryFileSystem | null = null;
let workspace: Workspace | null = null;
let projectKey: ProjectKey | null = null;

let configuration: undefined | Configuration;
let only: AnalyzerSelector[] = [];
// Configuration that comes from a virtual file. It takes precedence over the settings
let fileConfiguration: undefined | Configuration;
let virtualPlugins: string[] = [];
let shouldFormat = true;
let fixMode: "none" | FixFileMode = "none";

const originalConsole = {
	log: console.log,
	info: console.info,
	warn: console.warn,
	error: console.error,
};

function postLog(level: "log" | "info" | "warn" | "error", args: unknown[]) {
	try {
		self.postMessage({
			type: "log",
			level,
			message: args.map((a) => {
				try {
					return typeof a === "string" ? a : JSON.stringify(a);
				} catch {
					return String(a);
				}
			}),
		});
	} catch {
		// no-op
	}
}

console.log = (...args: unknown[]) => {
	postLog("log", args);
	originalConsole.log(...args);
};
console.info = (...args: unknown[]) => {
	postLog("info", args);
	originalConsole.info(...args);
};
console.warn = (...args: unknown[]) => {
	postLog("warn", args);
	originalConsole.warn(...args);
};
console.error = (...args: unknown[]) => {
	postLog("error", args);
	originalConsole.error(...args);
};

self.addEventListener("message", async (e) => {
	switch (e.data.type) {
		case "init": {
			try {
				if (import.meta.env.DEV) {
					await init({
						module_or_path:
							"../../../node_modules/@biomejs/wasm-web/biome_wasm_bg.wasm?init",
					});
				} else {
					await init();
				}

				filesystem = new MemoryFileSystem();
				workspace = Workspace.withFileSystem(filesystem);
				projectKey = workspace.openProject({
					openUninitialized: true,
					path: "/",
				}).projectKey;

				self.postMessage({ type: "init", loadingState: LoadingState.Success });
			} catch (err) {
				console.error(err);
				self.postMessage({ type: "init", loadingState: LoadingState.Error });
			}

			break;
		}

		case "updateSettings": {
			if (!workspace || projectKey == null) {
				console.error("Workspace was not initialized");
				break;
			}

			const settings = e.data.settings as PlaygroundSettings;
			shouldFormat = e.data.shouldFormat as boolean;
			fixMode = e.data.fixMode as "none" | FixFileMode;

			configuration = createBiomeConfiguration(settings);
			only = getOnlyLintRules(settings.lintRules) as AnalyzerSelector[];
			updateWorkspaceSettings();
			break;
		}

		case "updateFiles": {
			if (!filesystem || !workspace || !projectKey) {
				console.error("Workspace was not initialized");
				break;
			}

			const { files } = e.data as {
				files: { filename: string; code: string }[];
			};

			// Remove files that no longer exist.
			const filenames = new Set(files.map((file) => file.filename));
			for (const filename of knownFiles) {
				if (!filenames.has(filename)) {
					filesystem.remove(`/${filename}`);
					knownFiles.delete(filename);
				}
			}

			// Insert new or existing files
			for (const { filename, code } of files) {
				filesystem.insert(`/${filename}`, encoder.encode(code));
				knownFiles.add(filename);
			}

			const configFile = files.find((file) => file.filename === "biome.json");
			fileConfiguration = configFile
				? parseFileConfiguration(configFile.code)
				: undefined;

			// Update plugins
			virtualPlugins = files
				.map((file) => file.filename)
				.filter((filename) => isPluginFile(filename))
				.map((filename) => `/${filename}`);
			updateWorkspaceSettings();

			// TODO: Handle diagnostics
			workspace.scanProject({
				projectKey,
				scanKind: "project",
				force: true,
				watch: false,
				verbose: false,
			});

			break;
		}

		case "update": {
			if (!filesystem || !workspace || !projectKey) {
				console.error("Workspace was not initialized");
				break;
			}

			const { filename, code, cursorPosition, gritQuery, defaultLanguage } =
				e.data;
			const path = `/${filename}`;

			filesystem.insert(path, encoder.encode(code));

			// Reload plugins if changed
			if (isPluginFile(filename)) {
				updateWorkspaceSettings();
			}

			workspace.openFile({
				projectKey,
				path,
				content: {
					type: "fromServer",
				},
				persistNodeCache: true,
			});

			if (filename === "biome.json") {
				const parsedConfiguration = parseFileConfiguration(code);
				if (parsedConfiguration !== undefined) {
					fileConfiguration = parsedConfiguration;
					updateWorkspaceSettings();
					console.info("Correct set custom configuration");
				}
			}

			const fileFeatures = workspace.fileFeatures({
				projectKey,
				path,
				features: ["debug", "format", "lint", "assist"],
			});

			const syntaxTree =
				fileFeatures.featuresSupported.debug === "supported"
					? workspace.getSyntaxTree({ projectKey, path })
					: { ast: "Not supported", cst: "Not supported" };

			let controlFlowGraph = "";
			try {
				controlFlowGraph =
					fileFeatures.featuresSupported.debug === "supported"
						? workspace.getControlFlowGraph({
								projectKey,
								path,
								cursor: cursorPosition,
							})
						: "";
			} catch (e) {
				console.warn("Failed to get control flow graph:", e);
				controlFlowGraph = "";
			}

			let semanticModel = "";
			try {
				semanticModel =
					fileFeatures.featuresSupported.debug === "supported"
						? workspace.getSemanticModel({ projectKey, path })
						: "";
			} catch (e) {
				console.warn("Failed to get semantic model:", e);
				semanticModel = "";
			}

			let typesIr = "";
			try {
				typesIr =
					fileFeatures.featuresSupported.debug === "supported"
						? workspace.getTypeInfo({ projectKey, path })
						: "";
			} catch (e) {
				console.warn("Failed to get control flow graph:", e);
				typesIr = "";
			}

			let typesRegistered = "";
			try {
				typesRegistered =
					fileFeatures.featuresSupported.debug === "supported"
						? workspace.getRegisteredTypes({ projectKey, path })
						: "";
			} catch (e) {
				console.warn("Failed to get control flow graph:", e);
				typesRegistered = "";
			}

			let gritQueryMatches: [number, number][] = [];
			let gritQueryError: string | undefined;
			if (gritQuery) {
				let patternId: string | null = null;
				try {
					const parseResult = workspace.parsePattern({
						pattern: String(gritQuery),
						defaultLanguage: defaultLanguage || "JavaScript",
					});
					patternId = String(parseResult.patternId);
				} catch (e) {
					console.error(
						"Failed to parse GritQL query:",
						e instanceof Error ? e.message : e,
					);
					gritQueryError = `Failed to parse query: ${e instanceof Error ? e.message : String(e)}`;
				}

				if (patternId) {
					try {
						const searchResults = workspace.searchPattern({
							path: `/${filename}`,
							pattern: patternId,
							projectKey,
						});
						gritQueryMatches = searchResults.matches || [];
					} catch (e) {
						console.error("Failed to search with GritQL query:", e);
						gritQueryError = `Failed to search with query: ${e instanceof Error ? e.message : String(e)}`;
					}

					try {
						workspace.dropPattern({
							pattern: patternId,
						});
					} catch (e) {
						console.warn("Failed to drop pattern:", e);
					}
				}
			}

			let formatterIr = "";
			try {
				formatterIr =
					fileFeatures.featuresSupported.debug === "supported"
						? workspace.getFormatterIr({ projectKey, path })
						: "Not supported";
			} catch (e) {
				console.error(e);
				formatterIr = "Can't format";
			}

			const categories: RuleCategories = [];
			const currentConfiguration = getCurrentConfiguration();
			if (currentConfiguration?.formatter?.enabled !== false) {
				categories.push("syntax");
			}
			if (currentConfiguration?.linter?.enabled !== false) {
				categories.push("lint");
			}
			if (currentConfiguration?.assist?.enabled !== false) {
				categories.push("action");
			}

			const { diagnostics } = workspace.pullDiagnostics({
				projectKey,
				path,
				categories,
				only: fileConfiguration ? [] : only,
				skip: [],
				includeCodeFix: true,
			});

			const printer = new DiagnosticPrinter(path, code);
			for (const diag of diagnostics) {
				printer.print_verbose(diag);
			}

			let printed = {
				code: "",
			};
			try {
				printed =
					fileFeatures.featuresSupported.format === "supported"
						? workspace.formatFile({ projectKey, path })
						: { code: "Not supported" };
			} catch (e) {
				console.error(e);
				printed = {
					code: "Can't format with errors",
				};
			}

			let fixed = {
				code,
			};
			if (fixMode !== "none") {
				const canFix =
					(categories.includes("lint") &&
						fileFeatures.featuresSupported.lint === "supported") ||
					(categories.includes("action") &&
						fileFeatures.featuresSupported.assist === "supported") ||
					(shouldFormat &&
						fileFeatures.featuresSupported.format === "supported");
				try {
					fixed = canFix
						? workspace.fixFile({
								projectKey,
								path,
								only: [],
								skip: [],
								ruleCategories: categories,
								shouldFormat,
								fixFileMode: fixMode,
							})
						: { code: "Not supported" };
				} catch (e) {
					console.error(e);
					fixed = {
						code: "Can't apply fixes with errors",
					};
				}
			}

			const biomeOutput: BiomeOutput = {
				syntax: {
					// Replace 4 spaced indentation with 2
					// TODO replace this in Biome itself
					ast: syntaxTree.ast.replace(/ {4}/g, "  "),
					cst: syntaxTree.cst,
				},
				diagnostics: {
					console: printer.finish(),
					list: diagnostics,
				},
				formatter: {
					code: printed.code,
					ir: formatterIr,
				},
				analysis: {
					controlFlowGraph,
					semanticModel,
					fixed: fixed.code,
				},
				types: {
					ir: typesIr,
					registered: typesRegistered,
				},
				gritQuery: {
					matches: gritQueryMatches,
					error: gritQueryError,
				},
			};

			self.postMessage({
				type: "updated",
				filename,
				biomeOutput,
			});
			break;
		}

		default:
			console.error(`Unknown message '${e.data.type}'.`);
	}
});

/**
 * Returns the file configuration if it exists. Returns the playground settings otherwise
 */
function getCurrentConfiguration(): Configuration | undefined {
	if (fileConfiguration) {
		return fileConfiguration;
	}
	return configuration;
}

function isPluginFile(filename: string): boolean {
	return (
		filename.endsWith(".grit") ||
		filename === "plugin.js" ||
		filename === "plugin.ts"
	);
}

function updateWorkspaceSettings(): void {
	if (!workspace || projectKey == null) {
		return;
	}

	const currentConfiguration = getCurrentConfiguration();
	workspace.updateSettings({
		projectKey,
		configuration: {
			...currentConfiguration,
			plugins: [
				...(currentConfiguration?.plugins ?? []),
				...virtualPlugins.filter(
					(plugin) => !currentConfiguration?.plugins?.includes(plugin),
				),
			],
		},
		moduleGraphResolutionKind: "modulesAndTypes",
	});
}

function parseFileConfiguration(code: string): Configuration | undefined {
	try {
		return JSON.parse(code) as Configuration;
	} catch (error) {
		// This can be noisy while the user is editing the configuration.
		console.debug(
			"The Biome configuration isn't valid JSON.\n",
			error instanceof Error ? error.message : error,
		);
		return undefined;
	}
}
