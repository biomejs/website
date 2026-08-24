import {
	emptyBiomeOutput,
	emptyPrettierOutput,
	type PlaygroundFileState,
	type PlaygroundState,
} from "@/playground/types.ts";
import { normalizeFilename } from "@/playground/utils.ts";
import { stringifyBiomeConfiguration } from "./configuration.ts";

export const BIOME_CONFIG_FILENAME = "biome.json";

export function createPlaygroundFile(
	state: PlaygroundState,
	filename: string,
	content = "",
): PlaygroundState {
	const normalizedFilename = normalizeFilename(filename);
	const existingFile = state.files[normalizedFilename];

	return {
		...state,
		currentFile: normalizedFilename,
		singleFileMode: false,
		files: {
			...state.files,
			[normalizedFilename]: existingFile ?? createFileState(content),
		},
	};
}

export function deletePlaygroundFile(
	state: PlaygroundState,
	filename: string,
): PlaygroundState {
	if (!canDeletePlaygroundFile(state, filename)) {
		return state;
	}

	const filenames = Object.keys(state.files);
	const deletedIndex = filenames.indexOf(filename);
	const { [filename]: _, ...files } = state.files;
	const remainingFilenames = Object.keys(files);
	const currentFile =
		state.currentFile === filename
			? (remainingFilenames[deletedIndex] ??
				remainingFilenames[deletedIndex - 1] ??
				state.currentFile)
			: state.currentFile;

	return {
		...state,
		currentFile,
		files,
	};
}

export function canDeletePlaygroundFile(
	state: Pick<PlaygroundState, "files">,
	filename: string,
): boolean {
	if (filename === BIOME_CONFIG_FILENAME) {
		return state.files[filename] !== undefined;
	}

	return (
		Object.keys(state.files).filter((file) => file !== BIOME_CONFIG_FILENAME)
			.length > 1
	);
}

export function renamePlaygroundFile(
	state: PlaygroundState,
	oldFilename: string,
	newFilename: string,
): PlaygroundState {
	const normalizedNewFilename = normalizeFilename(newFilename);
	if (
		oldFilename === normalizedNewFilename ||
		state.files[oldFilename] === undefined ||
		state.files[normalizedNewFilename] !== undefined
	) {
		return state;
	}

	const { [oldFilename]: oldFile, ...files } = state.files;
	return {
		...state,
		currentFile:
			state.currentFile === oldFilename
				? normalizedNewFilename
				: state.currentFile,
		files: {
			...files,
			[normalizedNewFilename]: oldFile,
		},
	};
}

export function openPlaygroundFile(
	state: PlaygroundState,
	filename: string,
): PlaygroundState {
	return state.files[filename] === undefined
		? state
		: { ...state, currentFile: filename };
}

export function createBiomeConfigFile(state: PlaygroundState): PlaygroundState {
	return createPlaygroundFile(
		state,
		BIOME_CONFIG_FILENAME,
		stringifyBiomeConfiguration(state.settings),
	);
}

export function openBiomeConfigFile(state: PlaygroundState): PlaygroundState {
	return openPlaygroundFile(state, BIOME_CONFIG_FILENAME);
}

export function deleteBiomeConfigFile(state: PlaygroundState): PlaygroundState {
	return deletePlaygroundFile(state, BIOME_CONFIG_FILENAME);
}

function createFileState(content: string): PlaygroundFileState {
	return {
		content,
		biome: emptyBiomeOutput,
		prettier: emptyPrettierOutput,
	};
}
