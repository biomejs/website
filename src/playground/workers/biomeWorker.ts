import {
	ArrowParentheses,
	AttributePosition,
	type BiomeOutput,
	IndentStyle,
	LintRules,
	LoadingState,
	type PlaygroundSettings,
	QuoteProperties,
	QuoteStyle,
	Semicolons,
} from "@/playground/types";
import init, {
	DiagnosticPrinter,
	type Configuration,
	type BiomePath,
	type RuleCategories,
	Workspace,
} from "@biomejs/wasm-web";

let workspace: Workspace | null = null;
let projectKey: number | null = null;
let fileCounter = 0;

type File = {
	filename: string;
	id: number;
	content: string;
	version: number;
};

const files: Map<string, File> = new Map();

let configuration: undefined | Configuration;
let fullSettings: undefined | PlaygroundSettings;

function getPathForFile(file: File): BiomePath {
	return file.filename;
}

self.addEventListener("message", async (e) => {
	switch (e.data.type) {
		case "init": {
			try {
				if (import.meta.env.DEV) {
					await init(
						"../../../node_modules/@biomejs/wasm-web/biome_wasm_bg.wasm?init",
					);
				} else {
					await init();
				}

				workspace = new Workspace();
				projectKey = workspace.openProject({
					path: "",
					openUninitialized: true,
				});

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
				bracketSpacing,
				bracketSameLine,
				enabledAssist,
				unsafeParameterDecoratorsEnabled,
				allowComments,
				attributePosition,
			} = e.data.settings as PlaygroundSettings;

			configuration = {
				formatter: {
					enabled: true,
					formatWithErrors: true,
					lineWidth: lineWidth,
					indentStyle: indentStyle === IndentStyle.Tab ? "tab" : "space",
					indentWidth,
					attributePosition:
						attributePosition === AttributePosition.Auto ? "auto" : "multiline",
				},

				linter: {
					enabled: enabledLinting,
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
					},
				},
				json: {
					parser: {
						allowComments,
					},
				},
			};

			switch (lintRules) {
				case LintRules.Recommended: {
					configuration.linter!.rules = {
						nursery: {
							recommended: false,
						},
					};
					break;
				}
				case LintRules.All: {
					configuration.linter!.rules = {
						a11y: "on",
						complexity: "on",
						correctness: "on",
						nursery: "on",
						performance: "on",
						security: "on",
						style: "on",
						suspicious: "on",
					};
					break;
				}
			}

			workspace.updateSettings({
				configuration,
				projectKey,
			});
			break;
		}

		case "update": {
			if (!workspace || !projectKey) {
				console.error("Workspace was not initialized");
				break;
			}

			const { filename, code, cursorPosition } = e.data;

			let file = files.get(filename);
			if (file === undefined) {
				file = {
					filename,
					version: 0,
					content: code,
					id: fileCounter++,
				};

				workspace.openFile({
					projectKey,
					path: getPathForFile(file),
					content: {
						type: "fromClient",
						content: code,
						version: 0,
					},
				});
			} else {
				file = {
					filename,
					id: file.id,
					version: file.version + 1,
					content: code,
				};

				workspace.openFile({
					projectKey,
					path: getPathForFile(file),
					content: {
						type: "fromClient",
						content: code,
						version: file.version,
					},
				});
			}
			files.set(filename, file);
			const path = getPathForFile(file);
			const fileFeatures = workspace.fileFeatures({
				projectKey,
				path,
				features: ["debug", "format", "lint", "assist"],
			});

			const syntaxTree =
				fileFeatures.featuresSupported.get("debug") === "supported"
					? workspace.getSyntaxTree({
							projectKey,
							path,
						})
					: { ast: "Not supported", cst: "Not supported" };

			let controlFlowGraph = "";
			try {
				controlFlowGraph =
					fileFeatures.featuresSupported.get("debug") === "supported"
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

			let formatterIr = "";
			try {
				formatterIr =
					fileFeatures.featuresSupported.get("debug") === "supported"
						? workspace.getFormatterIr({
								projectKey,
								path,
							})
						: "Not supported";
			} catch (e) {
				console.error(e);
				formatterIr = "Can't format";
			}

			// TODO: Run assists

			const categories: RuleCategories = [];
			if (configuration?.formatter?.enabled) {
				categories.push("syntax");
			}
			if (configuration?.linter?.enabled) {
				categories.push("lint");
			}
			const diagnosticsResult = workspace.pullDiagnostics({
				projectKey,
				path,
				categories: categories,
				maxDiagnostics: Number.MAX_SAFE_INTEGER,
				only: [],
				skip: [],
			});

			const printer = new DiagnosticPrinter(path, code);
			for (const diag of diagnosticsResult.diagnostics) {
				printer.print_verbose(diag);
			}

			let printed = {
				code: "",
			};
			try {
				printed =
					fileFeatures.featuresSupported.get("format") === "supported"
						? workspace.formatFile({
								projectKey,
								path,
							})
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
					fileFeatures.featuresSupported.get("lint") === "supported"
						? workspace.fixFile({
								projectKey,
								path,
								only: [],
								skip: [],
								ruleCategories: ["lint"],
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
					list: diagnosticsResult.diagnostics,
				},
				formatter: {
					code: printed.code,
					ir: formatterIr,
				},
				analysis: {
					controlFlowGraph,
					fixed: fixed.code,
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
