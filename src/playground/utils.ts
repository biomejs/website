import type { ThemeChanged, ThemeName } from "@/frontend-scripts/util";
import { getCurrentTheme } from "@/frontend-scripts/util";
import {
	type PlaygroundFileState,
	type PlaygroundSettings,
	type PlaygroundState,
	emptyBiomeOutput,
	emptyPrettierOutput,
} from "@/playground/types";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export function classNames(
	...classes: (string | undefined | boolean)[]
): string {
	return classes.filter(Boolean).join(" ");
}

// Define general type for useWindowSize hook, which includes width and height
interface Size {
	width: number | undefined;
	height: number | undefined;
}

export function useTheme(): ThemeName {
	const [theme, setTheme] = useState(getCurrentTheme());

	useEffect(() => {
		function onColorSchemeChange(event: CustomEvent<ThemeChanged>) {
			setTheme(getCurrentTheme(event.detail.theme));
		}

		window.addEventListener("colorschemechange", (event) => {
			onColorSchemeChange(event as CustomEvent<ThemeChanged>);
		});

		return function cleanup() {
			window.removeEventListener("colorschemechange", (event) => {
				onColorSchemeChange(event as CustomEvent<ThemeChanged>);
			});
		};
	});

	return theme;
}

// Hook
export function useWindowSize(): Size {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState<Size>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		}

		// Add event listener
		window.addEventListener("resize", handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []); // Empty array ensures that effect is only run on mount

	return windowSize;
}

export function createLocalStorage(name: string): {
	set: (value: string | boolean | number) => void;
	get: () => undefined | string;
	getNumber: () => undefined | number;
	getBoolean: () => boolean;
	clear: () => void;
} {
	const key = `playground:${name}`;
	return {
		set: (value) => {
			localStorage.setItem(key, String(value));
		},
		getNumber: () => {
			const elem = localStorage.getItem(key);
			if (elem != null) {
				return Number(elem);
			}
			return undefined;
		},
		getBoolean: () => {
			return localStorage.getItem(key) === "true";
		},
		get: () => {
			return localStorage.getItem(key) || undefined;
		},
		clear: () => {
			localStorage.removeItem(key);
		},
	};
}

export function getCurrentCode(state: PlaygroundState): string {
	return state.files[state.currentFile]?.content ?? "";
}

export function getFileState(
	state: Pick<PlaygroundState, "files">,
	filename: string,
): PlaygroundFileState {
	return (
		state.files[filename] ?? {
			content: "",
			biome: emptyBiomeOutput,
			prettier: emptyPrettierOutput,
		}
	);
}

export function createPlaygroundSettingsSetter<
	K extends keyof PlaygroundSettings,
>(
	setPlaygroundState: Dispatch<SetStateAction<PlaygroundState>>,
	field: K,
): (value: PlaygroundSettings[K]) => void {
	return (param: PlaygroundSettings[typeof field]) => {
		setPlaygroundState((state) => {
			return {
				...state,
				settings: {
					...state.settings,
					[field]: param,
				},
			};
		});
	};
}

// See https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings
export function encodeCode(code: string): string {
	return btoa(toBinary(code));
}

export function decodeCode(encoded: string): string {
	try {
		return fromBinary(atob(encoded));
	} catch {
		return encoded;
	}
}

// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
function toBinary(input: string) {
	const codeUnits = new Uint16Array(input.length);
	for (let i = 0; i < codeUnits.length; i++) {
		codeUnits[i] = input.charCodeAt(i);
	}

	const charCodes = new Uint8Array(codeUnits.buffer);
	let result = "";
	for (let i = 0; i < charCodes.byteLength; i++) {
		result += String.fromCharCode(charCodes[i]!);
	}
	return result;
}

function fromBinary(binary: string) {
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	const charCodes = new Uint16Array(bytes.buffer);
	let result = "";
	for (let i = 0; i < charCodes.length; i++) {
		result += String.fromCharCode(charCodes[i]!);
	}
	return result;
}

export function classnames(...names: (undefined | boolean | string)[]): string {
	let out = "";
	for (const name of names) {
		if (name === undefined || typeof name === "boolean") {
			continue;
		}

		if (out !== "") {
			out += " ";
		}
		out += name;
	}
	return out;
}

export function isTypeScriptFilename(filename: string): boolean {
	return (
		filename.endsWith(".ts") ||
		filename.endsWith(".tsx") ||
		filename.endsWith(".mts") ||
		filename.endsWith(".cts")
	);
}

export function isJsxFilename(filename: string): boolean {
	return filename.endsWith(".tsx") || filename.endsWith(".jsx");
}

export function isScriptFilename(filename: string): boolean {
	return filename.endsWith(".cjs");
}

export function isModuleFilename(filename: string): boolean {
	return (
		filename.endsWith(".mjs") ||
		filename.endsWith(".mts") ||
		filename.endsWith(".js") ||
		filename.endsWith(".ts") ||
		filename.endsWith(".cts")
	);
}

export function isJsonFilename(filename: string): boolean {
	return filename.endsWith(".json") || filename.endsWith(".jsonc");
}

export function isCssFilename(filename: string): boolean {
	return filename.endsWith(".css");
}

export function isGraphqlFilename(filename: string): boolean {
	return filename.endsWith(".gql") || filename.endsWith(".graphql");
}

export function modifyFilename(
	filename: string,
	opts: ExtensionOptions,
): string {
	const ext = getExtension(opts);
	const parts = filename.split(".");
	parts.pop();
	parts.push(ext);
	return parts.join(".");
}

type ExtensionOptions = {
	jsx: boolean;
	typescript: boolean;
	script: boolean;
};

export function getExtension(opts: ExtensionOptions): string {
	let ext = "";

	if (opts.script) {
		ext = "cjs";
	} else {
		ext = "js";
	}

	if (opts.typescript) {
		if (opts.jsx) {
			ext = "tsx";
		} else {
			ext = "ts";
		}
	} else if (opts.jsx) {
		ext = "jsx";
	}

	return ext;
}

export function isValidExtension(filename: string): boolean {
	return (
		isScriptFilename(filename) ||
		isModuleFilename(filename) ||
		isTypeScriptFilename(filename) ||
		isJsxFilename(filename) ||
		isJsonFilename(filename) ||
		isCssFilename(filename) ||
		isGraphqlFilename(filename)
	);
}

export function normalizeFilename(filename: string): string {
	return isValidExtension(filename) ? filename : `${filename}.js`;
}

/**
 * Returns how many bytes the UTF-16 code unit would be, if represented in utf8
 * Credit to: https://stackoverflow.com/a/73096001/4668057
 */
function getUtf8ByteLength(codeUnit: string) {
	const code = codeUnit.charCodeAt(0);
	if (code < 128) {
		return 1;
	}
	if (code < 2048) {
		return 2;
	}
	// UTF-16 high surrogate
	if (55296 <= code && code <= 56319) {
		return 4;
	}
	// UTF-16 low surrogate
	if (56320 <= code && code <= 57343) {
		return 0;
	}
	if (code < 65536) {
		return 3;
	}
	throw `Bad UTF-16 code unit: ${codeUnit}`;
}

/**
 * Converts the span in UTF-8 byte offets to a span in code unit offsets.
 * May misbehave if the specified byte span doesn't fall exactly to the code unit boundaries
 * Credit to: https://stackoverflow.com/a/73096001/4668057
 */
export function spanInBytesToSpanInCodeUnits(
	[startInBytes, endInBytes]: [number, number],
	str: string,
) {
	const spanInCodeUnits: [number, number] = [startInBytes, endInBytes];

	let currCodeUnitIndex = 0;

	// Scan through the string, looking for the start of the substring
	let bytePos = 0;
	while (bytePos < startInBytes) {
		const byteLength = getUtf8ByteLength(str.charAt(currCodeUnitIndex));
		bytePos += byteLength;
		++currCodeUnitIndex;

		// Make sure to include low surrogate
		if (byteLength === 4 && bytePos === startInBytes) {
			++currCodeUnitIndex;
		}
	}

	// We've found the start, we update the start of spanInCodeUnits,
	spanInCodeUnits[0] = currCodeUnitIndex;

	// Now scan through the following string to find the end
	while (bytePos < endInBytes) {
		const byteLength = getUtf8ByteLength(str.charAt(currCodeUnitIndex));
		bytePos += byteLength;
		++currCodeUnitIndex;

		// Make sure to include low surrogate
		if (byteLength === 4 && bytePos === endInBytes) {
			++currCodeUnitIndex;
		}
	}

	// We've found the end, we update the end of spanInCodeUnits,
	spanInCodeUnits[1] = currCodeUnitIndex;

	return spanInCodeUnits;
}
