import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useId, useState } from "react";
import {
	BIOME_CONFIG_FILENAME,
	canDeletePlaygroundFile,
	createBiomeConfigFile,
	createPlaygroundFile,
	deleteBiomeConfigFile,
	deletePlaygroundFile,
	openBiomeConfigFile,
	openPlaygroundFile,
	renamePlaygroundFile,
} from "@/playground/state.ts";
import {
	LANGUAGE,
	type Language,
	type PlaygroundState,
	SourceType,
} from "@/playground/types.ts";
import {
	guessLanguage,
	isScriptFilename,
	modifyFilename,
} from "@/playground/utils.ts";
import SettingsTab from "../tabs/SettingsTab.tsx";
import EnumSelect from "./EnumSelect.tsx";

interface Props {
	state: PlaygroundState;
	setPlaygroundState: Dispatch<SetStateAction<PlaygroundState>>;
}

interface DirectoryNode {
	directories: Map<string, DirectoryNode>;
	files: Array<{ name: string; path: string }>;
}

export default function PlaygroundSidebar({
	state,
	setPlaygroundState,
}: Props) {
	const hasConfig = state.files[BIOME_CONFIG_FILENAME] !== undefined;

	return (
		<div className="playground-sidebar-content">
			<SidebarSection title="Files">
				<FileTree state={state} setPlaygroundState={setPlaygroundState} />
			</SidebarSection>
			<SidebarSection title="Settings">
				{hasConfig ? (
					<div className="playground-settings-ejected">
						<p>Settings are defined by biome.json.</p>
						<div className="playground-button-row">
							<button
								type="button"
								onClick={() => setPlaygroundState(openBiomeConfigFile)}
							>
								Open biome.json
							</button>
							<button
								type="button"
								onClick={() => setPlaygroundState(deleteBiomeConfigFile)}
							>
								Delete
							</button>
						</div>
					</div>
				) : (
					<>
						<button
							className="playground-eject-button"
							type="button"
							onClick={() => setPlaygroundState(createBiomeConfigFile)}
						>
							Edit root config
						</button>
						<SettingsTab
							state={state}
							setPlaygroundState={setPlaygroundState}
						/>
					</>
				)}
			</SidebarSection>
			<SidebarSection title="Editor options">
				<EditorOptions state={state} setPlaygroundState={setPlaygroundState} />
			</SidebarSection>
		</div>
	);
}

function SidebarSection({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<section className="playground-sidebar-section">
			<div className="playground-section-label">{title}</div>
			{children}
		</section>
	);
}

function FileTree({ state, setPlaygroundState }: Props) {
	const [creating, setCreating] = useState(false);
	const root = buildTree(Object.keys(state.files));

	return (
		<div className="playground-files">
			<div className="playground-files-actions">
				<button type="button" onClick={() => setCreating(true)}>
					+ New file
				</button>
			</div>
			{creating && (
				<FilenameInput
					onCancel={() => setCreating(false)}
					onSubmit={(filename) => {
						setPlaygroundState((current) =>
							createPlaygroundFile(current, filename),
						);
						setCreating(false);
					}}
				/>
			)}
			<div className="playground-file-tree">
				<TreeNode
					node={root}
					state={state}
					setPlaygroundState={setPlaygroundState}
				/>
			</div>
		</div>
	);
}

function TreeNode({
	node,
	state,
	setPlaygroundState,
}: Props & { node: DirectoryNode }) {
	return (
		<>
			{Array.from(node.directories.entries())
				.sort(([left], [right]) => compareFilenames(left, right))
				.map(([name, directory]) => (
					<details key={name} open={true}>
						<summary>{name}</summary>
						<div className="playground-directory-children">
							<TreeNode
								node={directory}
								state={state}
								setPlaygroundState={setPlaygroundState}
							/>
						</div>
					</details>
				))}
			{node.files
				.slice()
				.sort((left, right) => compareFilenames(left.name, right.name))
				.map(({ name, path }) => (
					<FileTreeItem
						key={path}
						name={name}
						path={path}
						state={state}
						setPlaygroundState={setPlaygroundState}
					/>
				))}
		</>
	);
}

function compareFilenames(left: string, right: string): number {
	const lowercaseLeft = left.toLowerCase();
	const lowercaseRight = right.toLowerCase();
	if (lowercaseLeft < lowercaseRight) return -1;
	if (lowercaseLeft > lowercaseRight) return 1;
	if (left < right) return -1;
	if (left > right) return 1;
	return 0;
}

function FileTreeItem({
	name,
	path,
	state,
	setPlaygroundState,
}: Props & { name: string; path: string }) {
	const [renaming, setRenaming] = useState(false);
	const className = `playground-file-row${state.currentFile === path ? " active" : ""}`;

	if (renaming) {
		return (
			<div className={className}>
				<FilenameInput
					initialValue={path}
					ariaLabel={`Rename ${path}`}
					onCancel={() => setRenaming(false)}
					onSubmit={(filename) => {
						setPlaygroundState((current) => ({
							...renamePlaygroundFile(current, path, filename),
							singleFileMode: false,
						}));
						setRenaming(false);
					}}
				/>
			</div>
		);
	}

	return (
		<div className={className}>
			<button
				className="playground-file-open"
				type="button"
				onClick={() =>
					setPlaygroundState((current) => openPlaygroundFile(current, path))
				}
			>
				{name}
			</button>
			<button
				className="playground-file-rename"
				type="button"
				aria-label={`Rename ${path}`}
				onClick={() => setRenaming(true)}
			>
				Rename
			</button>
			{canDeletePlaygroundFile(state, path) && (
				<button
					className="playground-file-delete"
					type="button"
					aria-label={`Delete ${path}`}
					onClick={() =>
						setPlaygroundState((current) => deletePlaygroundFile(current, path))
					}
				>
					×
				</button>
			)}
		</div>
	);
}

function FilenameInput({
	onCancel,
	onSubmit,
	initialValue = "",
	ariaLabel,
}: {
	onCancel: () => void;
	onSubmit: (filename: string) => void;
	initialValue?: string;
	ariaLabel?: string;
}) {
	const [value, setValue] = useState(initialValue);
	const submit = () => (value.trim() ? onSubmit(value) : onCancel());

	return (
		<input
			className="playground-filename-input"
			type="text"
			aria-label={ariaLabel}
			placeholder="src/component.tsx"
			value={value}
			// biome-ignore lint/a11y/noAutofocus: Creating a file is an explicit focus-moving action.
			autoFocus={true}
			onChange={(event) => setValue(event.target.value)}
			onBlur={submit}
			onKeyDown={(event) => {
				if (event.key === "Enter") submit();
				if (event.key === "Escape") onCancel();
			}}
		/>
	);
}

function EditorOptions({ state, setPlaygroundState }: Props) {
	const languageId = useId();
	const sourceTypeId = useId();
	const isConfig = state.currentFile === BIOME_CONFIG_FILENAME;
	const language = guessLanguage(state.currentFile);
	const sourceType = isScriptFilename(state.currentFile)
		? SourceType.Script
		: SourceType.Module;
	const rename = (nextLanguage: Language, nextSourceType: SourceType) => {
		setPlaygroundState((current) =>
			renamePlaygroundFile(
				current,
				current.currentFile,
				modifyFilename(current.currentFile, {
					language: nextLanguage,
					script: nextSourceType === SourceType.Script,
				}),
			),
		);
	};

	return (
		<div className="playground-editor-options">
			<div className="field-row">
				<label htmlFor={languageId}>Language</label>
				<EnumSelect
					id={languageId}
					name="language"
					disabled={isConfig}
					options={LANGUAGE_LABELS}
					value={language}
					onChangeValue={(next) => rename(next, sourceType)}
				/>
			</div>
			<div className="field-row">
				<label htmlFor={sourceTypeId}>Source type</label>
				<EnumSelect
					id={sourceTypeId}
					name="sourceType"
					disabled={isConfig}
					options={{ module: "Module", script: "Script" }}
					value={sourceType}
					onChangeValue={(next) => rename(language, next)}
				/>
			</div>
			<p className="playground-editor-note">
				These controls only affect this playground file.
			</p>
		</div>
	);
}

const LANGUAGE_LABELS: Record<Language, string> = {
	[LANGUAGE.JS]: "JavaScript",
	[LANGUAGE.JSX]: "JSX",
	[LANGUAGE.TS]: "TypeScript",
	[LANGUAGE.TSX]: "TSX",
	[LANGUAGE.JSON]: "JSON",
	[LANGUAGE.GraphQL]: "GraphQL",
	[LANGUAGE.Grit]: "Grit",
	[LANGUAGE.CSS]: "CSS",
	[LANGUAGE.SCSS]: "SCSS",
	[LANGUAGE.HTML]: "HTML",
	[LANGUAGE.Vue]: "Vue",
	[LANGUAGE.Svelte]: "Svelte",
	[LANGUAGE.Astro]: "Astro",
	[LANGUAGE.Markdown]: "Markdown",
	[LANGUAGE.YAML]: "YAML",
};

function buildTree(filenames: string[]): DirectoryNode {
	const root: DirectoryNode = { directories: new Map(), files: [] };
	for (const path of filenames) {
		const parts = path.split("/");
		const name = parts.pop() ?? path;
		let node = root;
		for (const directory of parts) {
			let child = node.directories.get(directory);
			if (!child) {
				child = { directories: new Map(), files: [] };
				node.directories.set(directory, child);
			}
			node = child;
		}
		node.files.push({ name, path });
	}
	return root;
}
