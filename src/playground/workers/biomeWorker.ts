import init, {
	type AnalyzerSelector,
	type Configuration,
	DiagnosticPrinter,
	MemoryFileSystem,
	type ProjectKey,
	type RuleCategories,
	Workspace,
} from "@biomejs/wasm-web";
import { LINT_RULES } from "@/playground/generated/lintRules.ts";
import {
	ArrowParentheses,
	AttributePosition,
	type BiomeOutput,
	Expand,
	IndentStyle,
	LoadingState,
	OperatorLinebreak,
	type PlaygroundSettings,
	QuoteProperties,
	QuoteStyle,
	Semicolons,
} from "@/playground/types";

const encoder = new TextEncoder();
const knownFiles = new Set<string>();

let filesystem: MemoryFileSystem | null = null;
let workspace: Workspace | null = null;
let projectKey: ProjectKey | null = null;

let configuration: undefined | Configuration;
let fullSettings: undefined | PlaygroundSettings;
let only: AnalyzerSelector[] = [];
// Configuration that comes from a virtual file. It takes precedence over the settings
let fileConfiguration: undefined | Configuration;

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

			fullSettings = e.data.settings;

			const {
				lineWidth,
				indentStyle,
				indentWidth,
				quoteStyle,
				jsxQuoteStyle,
				quoteProperties,
				lintRules,
				enabledLinting,
				trailingCommas,
				semicolons,
				arrowParentheses,
				operatorLinebreak,
				bracketSpacing,
				bracketSameLine,
				expand,
				indentScriptAndStyle,
				whitespaceSensitivity,
				enabledAssist,
				unsafeParameterDecoratorsEnabled,
				allowComments,
				attributePosition,
				ruleDomains,
				experimentalFullSupportEnabled,
				cssModules,
				tailwindDirectives,
			} = e.data.settings as PlaygroundSettings;

			configuration = {
				...configuration,

				formatter: {
					enabled: true,
					formatWithErrors: true,
					lineWidth: lineWidth,
					indentStyle: indentStyle === IndentStyle.Tab ? "tab" : "space",
					indentWidth,
					attributePosition:
						attributePosition === AttributePosition.Auto ? "auto" : "multiline",
					expand:
						expand === Expand.Auto
							? "auto"
							: expand === Expand.Always
								? "always"
								: "never",
				},

				linter: {
					enabled: enabledLinting,
					domains: ruleDomains,
				},

				assist: {
					enabled: enabledAssist,
				},

				javascript: {
					formatter: {
						quoteStyle: quoteStyle === QuoteStyle.Double ? "double" : "single",
						jsxQuoteStyle:
							jsxQuoteStyle === QuoteStyle.Double ? "double" : "single",
						quoteProperties:
							quoteProperties === QuoteProperties.Preserve
								? "preserve"
								: "asNeeded",
						trailingCommas,
						semicolons:
							semicolons === Semicolons.Always ? "always" : "asNeeded",
						arrowParentheses:
							arrowParentheses === ArrowParentheses.Always
								? "always"
								: "asNeeded",
						operatorLinebreak:
							operatorLinebreak === OperatorLinebreak.Before
								? "before"
								: "after",
						bracketSpacing,
						bracketSameLine,
						attributePosition:
							attributePosition === AttributePosition.Auto
								? "auto"
								: "multiline",
					},
					parser: {
						unsafeParameterDecoratorsEnabled,
					},
				},
				css: {
					formatter: {
						quoteStyle: quoteStyle === QuoteStyle.Double ? "double" : "single",
					},
					parser: {
						allowWrongLineComments: true,
						cssModules,
						tailwindDirectives,
					},
				},
				json: {
					parser: {
						allowComments,
					},
				},
				html: {
					formatter: {
						enabled: true,
						indentScriptAndStyle,
						whitespaceSensitivity,
					},
					experimentalFullSupportEnabled,
				},
			};

			switch (lintRules) {
				case LINT_RULES.recommended: {
					configuration!.linter!.rules = {
						nursery: {
							recommended: false,
						},
					};
					break;
				}
				case LINT_RULES.all: {
					// TODO: not entirely sure what to do here now that we have rule domains, and no longer have a single "all" option
					configuration!.linter!.rules = {
						a11y: "on",
						nursery: "on",
						complexity: "on",
						correctness: "on",
						performance: "on",
						security: "on",
						style: "on",
						suspicious: "on",
					};
					break;
				}
				default: {
					configuration!.linter!.rules = {
						recommended: false,
					};
					only = [lintRules];
				}
			}

			if (fileConfiguration) {
				workspace.updateSettings({
					configuration: fileConfiguration,
					projectKey,
				});
			} else {
				workspace.updateSettings({
					configuration,
					projectKey,
				});
			}
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

			// Remove files that no longer exists
			const filenames = new Set<string>(...files.map((file) => file.filename));
			for (const filename of knownFiles) {
				if (!filenames.has(filename)) {
					filesystem.remove(filename);
				}
			}

			// Insert new or existing files
			for (const { filename, code } of files) {
				filesystem.insert(`/${filename}`, encoder.encode(code));
			}

			// Update plugins
			const plugins = files
				.map((file) => file.filename)
				.filter((filename) => filename.endsWith(".grit"));

			workspace.updateSettings({
				projectKey,
				configuration: {
					...configuration,
					plugins,
				},
			});

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
			if (filename.endsWith(".grit")) {
				workspace.updateSettings({
					projectKey,
					configuration: { ...configuration },
				});
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
				try {
					fileConfiguration = JSON.parse(code) as Configuration;
					workspace.updateSettings({
						projectKey,
						configuration: fileConfiguration,
					});
					console.info("Correct set custom configuration");
					// biome-ignore lint/suspicious/noExplicitAny: It's an error message
				} catch (e: any) {
					// Let's use debug, because it could be noisy while typing
					console.debug(
						"The Biome configuration isn't a valid JSON.\n",
						e.message,
					);
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
			if (gritQuery) {
				let patternId: string | null = null;
				try {
					const parseResult = workspace.parsePattern({
						pattern: String(gritQuery),
						defaultLanguage: defaultLanguage || "JavaScript",
					});
					patternId = String(parseResult.patternId);
				} catch (e) {
					console.error("Failed to parse GritQL query:", e);
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
			if (currentConfiguration?.formatter?.enabled) {
				categories.push("syntax");
			}
			if (currentConfiguration?.linter?.enabled) {
				categories.push("lint");
			}
			if (currentConfiguration?.assist?.enabled) {
				categories.push("action");
			}

			const { diagnostics } = workspace.pullDiagnostics({
				projectKey,
				path,
				categories,
				only,
				skip: [],
				pullCodeActions: true,
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
				code: "",
			};
			try {
				fixed =
					fileFeatures.featuresSupported.lint === "supported"
						? workspace.fixFile({
								projectKey,
								path,
								only: [],
								skip: [],
								ruleCategories: categories,
								shouldFormat: false,
								fixFileMode: fullSettings?.analyzerFixMode ?? "safeFixes",
							})
						: { code: "Not supported" };
			} catch (e) {
				console.error(e);
				fixed = {
					code: "Can't apply fixes with errors",
				};
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
