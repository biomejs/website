import type {
	FixFileMode,
	RuleDomain,
	RuleDomainValue,
} from "@biomejs/wasm-web";
import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import LoadingScreen from "@/playground/components/LoadingScreen";
import type { LINT_RULES } from "@/playground/generated/lintRules.ts";
import Playground from "@/playground/Playground";
import {
	type ArrowParentheses,
	type AttributePosition,
	defaultPlaygroundState,
	type Expand,
	emptyBiomeOutput,
	emptyPrettierOutput,
	type IndentStyle,
	Language,
	LoadingState,
	type PlaygroundSettings,
	type PlaygroundState,
	type QuoteProperties,
	type QuoteStyle,
	type Semicolons,
	type TrailingCommas,
	type WhitespaceSensitivity,
} from "@/playground/types";
import {
	createLocalStorage,
	decodeCode,
	encodeCode,
	getCurrentCode,
	getExtension,
	getFileState,
	guessLanguage,
	normalizeFilename,
} from "@/playground/utils";

function throttle(callback: () => void): () => void {
	const timeout = setTimeout(callback, 100);

	return () => {
		clearTimeout(timeout);
	};
}

function PlaygroundLoader() {
	const [loadingState, setLoadingState] = useState(LoadingState.Loading);
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
					setPlaygroundState((state) => ({
						...state,
						files: {
							...state.files,
							[filename]: {
								...getFileState(state, filename),
								biome: biomeOutput,
							},
						},
					}));
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
					setPlaygroundState((state) => ({
						...state,
						files: {
							...state.files,
							[filename]: {
								...getFileState(state, filename),
								prettier: prettierOutput,
							},
						},
					}));
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
	}, [loadingState, state.settings]);

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
					code: file?.content,
				})),
			});
		});
	}, [loadingState, Object.keys(state.files).length]);

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

			workerRef.current?.postMessage({
				type: "update",
				cursorPosition: state.cursorPosition,
				filename: state.currentFile,
				code: getCurrentCode(state),
			});
		});
	}, [
		loadingState,
		state.currentFile,
		state.cursorPosition,
		getCurrentCode(state),
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

	// Eliminate default values
	const queryStringObj: Record<string, string> = {};
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

	if (state.singleFileMode && Object.keys(state.files).length === 1) {
		// Single file mode
		const code = getCurrentCode(state);
		if (code) {
			queryStringObj.code = encodeCode(code);
		}

		const language = guessLanguage(state.currentFile);
		if (language !== Language.TSX) {
			queryStringObj.language = language;
		}
	} else {
		// Populate files
		for (const filename in state.files) {
			const content = state.files[filename]?.content ?? "";
			queryStringObj[`files.${filename}`] = encodeCode(content);
		}
	}

	// handle rule domains
	for (const key in state.settings.ruleDomains) {
		const value = state.settings.ruleDomains[key as RuleDomain];
		if (value !== undefined && value !== "none") {
			queryStringObj[`ruleDomains.${key}`] = value;
		}
	}

	const queryString = new URLSearchParams(queryStringObj).toString();
	lastSearchStore.set(queryString);

	let url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
	if (queryString !== "") {
		url += `?${queryString}`;
	}
	return url;
}

function initState(
	searchParams: URLSearchParams,
	includeFiles: boolean,
): PlaygroundState {
	let singleFileMode = defaultPlaygroundState.singleFileMode;
	let hasFiles = false;
	let files: PlaygroundState["files"] = {};

	if (includeFiles) {
		// Populate files
		for (const [key, value] of searchParams) {
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

		// Single file mode
		if (searchParams.get("code")) {
			const ext = getExtension({
				language: (searchParams.get("language") as Language) ?? Language.TSX,
				script: searchParams.get("script") === "true",
			});
			files[`main.${ext}`] = {
				content: decodeCode(searchParams.get("code") ?? ""),
				biome: emptyBiomeOutput,
				prettier: emptyPrettierOutput,
			};
			hasFiles = true;
		}
	}

	if (!hasFiles) {
		files = defaultPlaygroundState.files;
	}

	// handle rule domains
	const ruleDomains = defaultPlaygroundState.settings.ruleDomains;
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
		tab:
			(searchParams.get("tab") as PlaygroundState["tab"]) ??
			defaultPlaygroundState.tab,
		singleFileMode,
		currentFile: Object.keys(files)[0] ?? defaultPlaygroundState.currentFile,
		files,
		settings: {
			lineWidth: Number.parseInt(
				searchParams.get("lineWidth") ??
					String(defaultPlaygroundState.settings.lineWidth),
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
			),
			semicolons:
				(searchParams.get("semicolons") as Semicolons) ??
				defaultPlaygroundState.settings.semicolons,
			arrowParentheses:
				(searchParams.get("arrowParentheses") as ArrowParentheses) ??
				defaultPlaygroundState.settings.arrowParentheses,
			attributePosition:
				(searchParams.get("attributePosition") as AttributePosition) ??
				defaultPlaygroundState.settings.attributePosition,
			bracketSpacing:
				searchParams.get("bracketSpacing") === "true" ||
				defaultPlaygroundState.settings.bracketSpacing,
			bracketSameLine:
				searchParams.get("bracketSameLine") === "true" ||
				defaultPlaygroundState.settings.bracketSameLine,
			expand:
				(searchParams.get("expand") as Expand) ??
				defaultPlaygroundState.settings.expand,
			whitespaceSensitivity:
				(searchParams.get("whitespaceSensitivity") as WhitespaceSensitivity) ??
				defaultPlaygroundState.settings.whitespaceSensitivity,
			indentScriptAndStyle:
				searchParams.get("indentScriptAndStyle") === "true" ||
				defaultPlaygroundState.settings.indentScriptAndStyle,
			lintRules:
				(searchParams.get("lintRules") as keyof typeof LINT_RULES) ??
				defaultPlaygroundState.settings.lintRules,
			enabledLinting:
				searchParams.get("enabledLinting") === "true" ||
				defaultPlaygroundState.settings.enabledLinting,
			analyzerFixMode:
				(searchParams.get("analyzerFixMode") as FixFileMode) ??
				defaultPlaygroundState.settings.analyzerFixMode,
			enabledAssist:
				searchParams.get("enabledAssist") === "true" ||
				defaultPlaygroundState.settings.enabledAssist,
			unsafeParameterDecoratorsEnabled:
				searchParams.get("unsafeParameterDecoratorsEnabled") === "true" ||
				defaultPlaygroundState.settings.unsafeParameterDecoratorsEnabled,
			allowComments:
				searchParams.get("allowComments") === "true" ||
				defaultPlaygroundState.settings.allowComments,
			ruleDomains,
		},
	};
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
		let searchQuery = window.location.search;
		let includeSearchQueryFiles = true;

		// Default to query of last session to load settings
		if (searchQuery === "") {
			searchQuery = lastSearchStore.get() ?? "";
			includeSearchQueryFiles = false;
		}

		return initState(new URLSearchParams(searchQuery), includeSearchQueryFiles);
	});

	function resetPlaygroundState() {
		setPlaygroundState(initState(new URLSearchParams(""), false));
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
