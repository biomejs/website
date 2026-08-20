import type { RuleDomain, RuleDomainValue } from "@biomejs/wasm-web";
import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import LoadingScreen from "@/playground/components/LoadingScreen";
import Playground from "@/playground/Playground";
import {
	type ArrowParentheses,
	type AttributePosition,
	defaultPlaygroundState,
	type Expand,
	emptyBiomeOutput,
	emptyPrettierOutput,
	type IndentStyle,
	LANGUAGE,
	type Language,
	type LintRule,
	LoadingState,
	type OperatorLinebreak,
	type PlaygroundFixMode,
	PlaygroundFlyoutView,
	PlaygroundProblemsTab,
	type PlaygroundSettings,
	type PlaygroundState,
	type QuoteProperties,
	type QuoteStyle,
	type Semicolons,
	type TrailingCommas,
	type WhitespaceSensitivity,
} from "@/playground/types.ts";
import {
	createLocalStorage,
	decodeCode,
	encodeCode,
	getCurrentCode,
	getExtension,
	getFileState,
	guessLanguage,
	normalizeFilename,
} from "@/playground/utils.ts";

function throttle(callback: () => void, delay = 100): () => void {
	const timeout = setTimeout(callback, delay);

	return () => {
		clearTimeout(timeout);
	};
}

function PlaygroundLoader() {
	const [loadingState, setLoadingState] = useState<LoadingState>(
		LoadingState.Loading,
	);
	const [state, setPlaygroundState, resetPlaygroundState] =
		usePlaygroundState();
	const workerRef = useRef<Worker | null>(null);
	const prettierWorkerRef = useRef<Worker | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: dependencies mismatch
	useEffect(() => {
		workerRef.current = new Worker(
			new URL("./workers/biomeWorker", import.meta.url),
			{ type: "module" },
		);
		prettierWorkerRef.current = new Worker(
			new URL("./workers/prettierWorker", import.meta.url),
			{ type: "module" },
		);

		workerRef.current.addEventListener("message", (event) => {
			switch (event.data.type) {
				case "init": {
					const loadingState = event.data.loadingState as LoadingState;
					setLoadingState(loadingState);
					break;
				}

				case "updated": {
					const { filename, biomeOutput } = event.data;
					setPlaygroundState((state) =>
						state.files[filename] === undefined
							? state
							: {
									...state,
									files: {
										...state.files,
										[filename]: {
											...getFileState(state, filename),
											biome: biomeOutput,
										},
									},
								},
					);
					break;
				}

				case "log": {
					const { level, message } = event.data as {
						level: "log" | "info" | "warn" | "error";
						message: unknown[];
					};
					switch (level) {
						case "log":
							console.log("[Biome worker]", ...message);
							break;
						case "info":
							console.info("[Biome worker]", ...message);
							break;
						case "warn":
							console.warn("[Biome worker]", ...message);
							break;
						case "error":
							console.error("[Biome worker]", ...message);
							break;
						default:
							console.log("[Biome worker]", ...message);
					}
					break;
				}

				default:
					console.error(`Unknown message ${event.data.type}`);
			}
		});

		prettierWorkerRef.current.addEventListener("message", (event) => {
			switch (event.data.type) {
				case "formatted": {
					const { filename, prettierOutput } = event.data;
					setPlaygroundState((state) =>
						state.files[filename] === undefined
							? state
							: {
									...state,
									files: {
										...state.files,
										[filename]: {
											...getFileState(state, filename),
											prettier: prettierOutput,
										},
									},
								},
					);
					break;
				}

				case "log": {
					const { level, message } = event.data as {
						level: "log" | "info" | "warn" | "error";
						message: unknown[];
					};
					switch (level) {
						case "log":
							console.log("[Prettier worker]", ...message);
							break;
						case "info":
							console.info("[Prettier worker]", ...message);
							break;
						case "warn":
							console.warn("[Prettier worker]", ...message);
							break;
						case "error":
							console.error("[Prettier worker]", ...message);
							break;
						default:
							console.log("[Prettier worker]", ...message);
					}
					break;
				}

				default:
					console.error(`Unknown message ${event.data.type}`);
			}
		});

		workerRef.current?.postMessage({
			type: "init",
		});

		return () => {
			workerRef.current?.terminate();
			prettierWorkerRef.current?.terminate();
		};
	}, []);

	// Dispatch updated settings
	// biome-ignore lint/correctness/useExhaustiveDependencies: dependencies mismatch
	useEffect(() => {
		if (loadingState !== LoadingState.Success) {
			return;
		}

		return throttle(() => {
			workerRef.current?.postMessage({
				type: "updateSettings",
				settings: state.settings,
				shouldFormat: state.shouldFormat,
				fixMode: state.fixMode,
			});

			workerRef.current?.postMessage({
				type: "update",
				cursorPosition: state.cursorPosition,
				filename: state.currentFile,
				code: getCurrentCode(state),
			});

			prettierWorkerRef.current?.postMessage({
				type: "updateSettings",
				settings: state.settings,
			});

			prettierWorkerRef.current?.postMessage({
				type: "format",
				filename: state.currentFile,
				code: getCurrentCode(state),
			});
		});
	}, [loadingState, state.settings, state.shouldFormat, state.fixMode]);

	// Dispatch updated files
	// biome-ignore lint/correctness/useExhaustiveDependencies: dependencies mismatch
	useEffect(() => {
		if (loadingState !== LoadingState.Success) {
			return;
		}

		return throttle(() => {
			workerRef.current?.postMessage({
				type: "updateFiles",
				files: Object.entries(state.files).map(([filename, file]) => ({
					filename,
					code: file?.content ?? "",
				})),
			});
		});
	}, [loadingState, Object.keys(state.files).join("\0")]);

	// Dispatch updated code to Prettier
	// biome-ignore lint/correctness/useExhaustiveDependencies: dependencies mismatch
	useEffect(() => {
		if (loadingState !== LoadingState.Success) {
			return;
		}

		return throttle(() => {
			prettierWorkerRef.current?.postMessage({
				type: "format",
				filename: state.currentFile,
				code: getCurrentCode(state),
			});

			const file = getFileState(state, state.currentFile);

			workerRef.current?.postMessage({
				type: "update",
				cursorPosition: state.cursorPosition,
				filename: state.currentFile,
				code: getCurrentCode(state),
				gritQuery: file?.gritQuery,
				defaultLanguage: state.settings.searchLanguage,
			});
		});
	}, [
		loadingState,
		state.currentFile,
		state.cursorPosition,
		state.settings.searchLanguage,
		getCurrentCode(state),
		getFileState(state, state.currentFile)?.gritQuery,
	]);

	switch (loadingState) {
		case LoadingState.Error:
			return <div>Error loading. Please refresh</div>;

		case LoadingState.Loading:
			return <LoadingScreen />;

		default:
			return (
				<Playground
					resetPlaygroundState={resetPlaygroundState}
					setPlaygroundState={setPlaygroundState}
					playgroundState={state}
				/>
			);
	}
}

function buildLocation(state: PlaygroundState): string {
	const rawQueryParams: Record<string, unknown> = {
		...state.settings,
	};
	delete rawQueryParams.ruleDomains;

	// Eliminate default values
	const queryStringObj: Record<string, string> = {};
	const hashStringObj: Record<string, string> = {};
	for (const key in rawQueryParams) {
		const defaultValue = String(
			defaultPlaygroundState.settings[key as keyof PlaygroundSettings],
		);
		const rawValue = rawQueryParams[key];
		const value = String(rawValue);

		if (rawValue !== undefined && value !== defaultValue) {
			queryStringObj[key] = value;
		}
	}
	const lastSearchStringObj = { ...queryStringObj };

	if (state.flyoutView !== defaultPlaygroundState.flyoutView) {
		queryStringObj.view = state.flyoutView ?? "";
	}
	if (state.problemsTab !== defaultPlaygroundState.problemsTab) {
		queryStringObj.problems = state.problemsTab;
	}
	if (state.shouldFormat !== defaultPlaygroundState.shouldFormat) {
		queryStringObj.format = String(state.shouldFormat);
	}
	if (state.fixMode !== defaultPlaygroundState.fixMode) {
		queryStringObj.fix = state.fixMode;
	}
	if (state.comparePrettier !== defaultPlaygroundState.comparePrettier) {
		queryStringObj.prettier = String(state.comparePrettier);
	}

	if (state.singleFileMode && Object.keys(state.files).length === 1) {
		// Single file mode
		const code = getCurrentCode(state);
		const language = guessLanguage(state.currentFile);
		const isScript = state.currentFile.endsWith(".cjs");
		if (code || language !== LANGUAGE.TSX || isScript) {
			hashStringObj.code = encodeCode(code);
		}
		if (language !== LANGUAGE.TSX) {
			queryStringObj.language = language;
		}
		if (isScript) {
			queryStringObj.script = "true";
		}
	} else {
		// Populate files
		for (const filename in state.files) {
			const content = state.files[filename]?.content ?? "";
			hashStringObj[`files.${filename}`] = encodeCode(content);
		}
	}
	const gritQuery = getFileState(state, state.currentFile)?.gritQuery;
	if (gritQuery) {
		hashStringObj.gritQuery = gritQuery;
	}

	// handle rule domains
	for (const key in state.settings.ruleDomains) {
		const value = state.settings.ruleDomains[key as RuleDomain];
		if (value !== undefined && value !== "none") {
			queryStringObj[`ruleDomains.${key}`] = value;
			lastSearchStringObj[`ruleDomains.${key}`] = value;
		}
	}

	const queryString = new URLSearchParams(queryStringObj).toString();
	const hashString = new URLSearchParams(hashStringObj).toString();
	lastSearchStore.set(new URLSearchParams(lastSearchStringObj).toString());

	let url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
	if (queryString !== "") {
		url += `?${queryString}`;
	}
	if (hashString !== "") {
		url += `#${hashString}`;
	}
	return url;
}

function initState(
	searchParams: URLSearchParams,
	hashParams: URLSearchParams,
	legacyContentParams: URLSearchParams,
): PlaygroundState {
	let singleFileMode = defaultPlaygroundState.singleFileMode;
	let hasFiles = false;
	let files: PlaygroundState["files"] = {};

	const hashHasFiles = [...hashParams.keys()].some((key) =>
		FILE_QUERY_KEY_REGEX.test(key),
	);
	const fileParams = hashHasFiles ? hashParams : legacyContentParams;

	// Populate files. Hash content wins over legacy query-string content.
	for (const [key, value] of fileParams) {
		const match = key.match(FILE_QUERY_KEY_REGEX);
		if (match != null) {
			const filename = normalizeFilename(match[1]!);
			files[filename] = {
				content: decodeCode(value),
				biome: emptyBiomeOutput,
				prettier: emptyPrettierOutput,
			};
			singleFileMode = false;
			hasFiles = true;
		}
	}
	if (!hasFiles) {
		// Single file mode. Read content from the hash first, then legacy query params.
		const encodedCode =
			hashParams.get("code") ?? legacyContentParams.get("code");
		if (encodedCode !== null) {
			const ext = getExtension({
				language: (searchParams.get("language") as Language) ?? LANGUAGE.TSX,
				script: searchParams.get("script") === "true",
			});
			files[`main.${ext}`] = {
				content: decodeCode(encodedCode),
				biome: emptyBiomeOutput,
				prettier: emptyPrettierOutput,
			};
			hasFiles = true;
		}
	}

	const gritQuery =
		hashParams.get("gritQuery") ?? legacyContentParams.get("gritQuery");
	if (gritQuery) {
		const filename = Object.keys(files)[0];
		if (filename !== undefined) {
			files[filename] = {
				...files[filename]!,
				gritQuery,
			};
		}
	}

	if (!hasFiles) {
		files = defaultPlaygroundState.files;
	}

	// handle rule domains
	const ruleDomains = { ...defaultPlaygroundState.settings.ruleDomains };
	const prefixLength = "ruleDomains.".length;
	for (const key of searchParams.keys()) {
		if (key.startsWith("ruleDomains.")) {
			const domain = key.slice(prefixLength) as RuleDomain;
			const value = searchParams.get(key) as RuleDomainValue;
			if (value) {
				ruleDomains[domain] = value;
			}
		}
	}

	return {
		cursorPosition: 0,
		singleFileMode,
		currentFile: Object.keys(files)[0] ?? defaultPlaygroundState.currentFile,
		files,
		shouldFormat: getBooleanParam(
			searchParams,
			"format",
			defaultPlaygroundState.shouldFormat,
		),
		fixMode: getFixMode(searchParams.get("fix")),
		comparePrettier: getBooleanParam(
			searchParams,
			"prettier",
			defaultPlaygroundState.comparePrettier,
		),
		problemsTab: Object.values(PlaygroundProblemsTab).includes(
			searchParams.get("problems") as PlaygroundProblemsTab,
		)
			? (searchParams.get("problems") as PlaygroundProblemsTab)
			: defaultPlaygroundState.problemsTab,
		flyoutView: Object.values(PlaygroundFlyoutView).includes(
			searchParams.get("view") as PlaygroundFlyoutView,
		)
			? (searchParams.get("view") as PlaygroundFlyoutView)
			: defaultPlaygroundState.flyoutView,
		settings: {
			lineWidth: Number.parseInt(
				searchParams.get("lineWidth") ??
					String(defaultPlaygroundState.settings.lineWidth),
				10,
			),
			indentStyle:
				(searchParams.get("indentStyle") as IndentStyle) ??
				defaultPlaygroundState.settings.indentStyle,
			quoteStyle:
				(searchParams.get("quoteStyle") as QuoteStyle) ??
				defaultPlaygroundState.settings.quoteStyle,
			jsxQuoteStyle:
				(searchParams.get("jsxQuoteStyle") as QuoteStyle) ??
				defaultPlaygroundState.settings.jsxQuoteStyle,
			quoteProperties:
				(searchParams.get("quoteProperties") as QuoteProperties) ??
				defaultPlaygroundState.settings.quoteProperties,
			trailingCommas:
				(searchParams.get("trailingCommas") as TrailingCommas) ??
				// This is kept for backward compatibility
				(searchParams.get("trailingComma") as TrailingCommas) ??
				defaultPlaygroundState.settings.trailingCommas,
			indentWidth: Number.parseInt(
				searchParams.get("indentWidth") ??
					String(defaultPlaygroundState.settings.indentWidth),
				10,
			),
			semicolons:
				(searchParams.get("semicolons") as Semicolons) ??
				defaultPlaygroundState.settings.semicolons,
			arrowParentheses:
				(searchParams.get("arrowParentheses") as ArrowParentheses) ??
				defaultPlaygroundState.settings.arrowParentheses,
			operatorLinebreak:
				(searchParams.get("operatorLinebreak") as OperatorLinebreak) ??
				defaultPlaygroundState.settings.operatorLinebreak,
			attributePosition:
				(searchParams.get("attributePosition") as AttributePosition) ??
				defaultPlaygroundState.settings.attributePosition,
			bracketSpacing: getBooleanParam(
				searchParams,
				"bracketSpacing",
				defaultPlaygroundState.settings.bracketSpacing,
			),
			bracketSameLine: getBooleanParam(
				searchParams,
				"bracketSameLine",
				defaultPlaygroundState.settings.bracketSameLine,
			),
			expand:
				(searchParams.get("expand") as Expand) ??
				defaultPlaygroundState.settings.expand,
			whitespaceSensitivity:
				(searchParams.get("whitespaceSensitivity") as WhitespaceSensitivity) ??
				defaultPlaygroundState.settings.whitespaceSensitivity,
			indentScriptAndStyle: getBooleanParam(
				searchParams,
				"indentScriptAndStyle",
				defaultPlaygroundState.settings.indentScriptAndStyle,
			),
			lintRules:
				(searchParams.get("lintRules") as LintRule) ??
				defaultPlaygroundState.settings.lintRules,
			enabledLinting: getBooleanParam(
				searchParams,
				"enabledLinting",
				defaultPlaygroundState.settings.enabledLinting,
			),
			enabledAssist: getBooleanParam(
				searchParams,
				"enabledAssist",
				defaultPlaygroundState.settings.enabledAssist,
			),
			unsafeParameterDecoratorsEnabled: getBooleanParam(
				searchParams,
				"unsafeParameterDecoratorsEnabled",
				defaultPlaygroundState.settings.unsafeParameterDecoratorsEnabled,
			),
			allowComments: getBooleanParam(
				searchParams,
				"allowComments",
				defaultPlaygroundState.settings.allowComments,
			),
			ruleDomains,
			cssModules: getBooleanParam(
				searchParams,
				"cssModules",
				defaultPlaygroundState.settings.cssModules,
			),
			experimentalEmbeddedSnippetsEnabled: getBooleanParam(
				searchParams,
				"experimentalEmbeddedSnippetsEnabled",
				defaultPlaygroundState.settings.experimentalEmbeddedSnippetsEnabled,
			),
			experimentalFullSupportEnabled: getBooleanParam(
				searchParams,
				"experimentalFullSupportEnabled",
				defaultPlaygroundState.settings.experimentalFullSupportEnabled,
			),
			tailwindDirectives: getBooleanParam(
				searchParams,
				"tailwindDirectives",
				defaultPlaygroundState.settings.tailwindDirectives,
			),
			searchLanguage:
				(searchParams.get("searchLanguage") as
					| "js"
					| "css"
					| "json"
					| undefined) ?? defaultPlaygroundState.settings.searchLanguage,
		},
	};
}

function getFixMode(value: string | null): PlaygroundFixMode {
	const fixModes: PlaygroundFixMode[] = [
		"none",
		"safeFixes",
		"safeAndUnsafeFixes",
		"applySuppressions",
	];
	return fixModes.includes(value as PlaygroundFixMode)
		? (value as PlaygroundFixMode)
		: defaultPlaygroundState.fixMode;
}

function getBooleanParam(
	searchParams: URLSearchParams,
	key: string,
	defaultValue: boolean,
): boolean {
	const value = searchParams.get(key);
	return value === null ? defaultValue : value === "true";
}

const lastSearchStore = createLocalStorage("last-search");

const FILE_QUERY_KEY_REGEX = /^files\.(.*?)$/;

// Safari/Webkit/JSC/whatever only allows setting a URL 50 times within 30 seconds
// set our maximum update frequency just under that to avoid any chance of hitting it
const URL_UPDATE_THROTTLE = 30000 / 40;

export function usePlaygroundState(): [
	PlaygroundState,
	Dispatch<SetStateAction<PlaygroundState>>,
	() => void,
] {
	const [url, setUrl] = useState(window.location.toString());

	const [playgroundState, setPlaygroundState] = useState(() => {
		const locationSearchParams = new URLSearchParams(window.location.search);
		let settingsSearchParams = locationSearchParams;

		// Default to query of last session to load settings
		if (window.location.search === "") {
			settingsSearchParams = new URLSearchParams(lastSearchStore.get() ?? "");
		}

		return initState(
			settingsSearchParams,
			new URLSearchParams(window.location.hash.slice(1)),
			locationSearchParams,
		);
	});

	function resetPlaygroundState() {
		setPlaygroundState(
			initState(
				new URLSearchParams(),
				new URLSearchParams(),
				new URLSearchParams(),
			),
		);
	}

	useEffect(() => {
		setUrl(buildLocation(playgroundState));
	}, [playgroundState]);

	// Throttle updating of URL
	useEffect(() => {
		const timeout = setTimeout(() => {
			window.history.replaceState({ path: url }, "", url);
		}, URL_UPDATE_THROTTLE);

		return () => {
			clearTimeout(timeout);
		};
	}, [url]);

	return [playgroundState, setPlaygroundState, resetPlaygroundState];
}

export default PlaygroundLoader;
