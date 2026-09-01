import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { sass } from "@codemirror/lang-sass";
import { vue } from "@codemirror/lang-vue";
import { yaml } from "@codemirror/lang-yaml";
import type { Extension } from "@codemirror/state";
import { EditorSelection } from "@codemirror/state";
import type { ViewUpdate } from "@codemirror/view";
import { svelte } from "@replit/codemirror-lang-svelte";
import type { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { graphql } from "cm6-graphql";
import * as codeMirrorLangBiomeAst from "codemirror-lang-rome-ast";
import type { ReactNode, RefObject } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CodeMirror from "./CodeMirror.tsx";
import { javascriptWithEmbeddedSnippets } from "./codemirror/javascriptWithEmbeddedSnippets.ts";
import BiomeHeader from "./components/BiomeHeader.tsx";
import PlaygroundSidebar from "./components/PlaygroundSidebar.tsx";
import PrettierHeader from "./components/PrettierHeader.tsx";
import Resizable from "./components/Resizable.tsx";
import ControlFlowTab from "./tabs/ControlFlowTab.tsx";
import DiagnosticsConsoleTab from "./tabs/DiagnosticsConsoleTab.tsx";
import DiagnosticsListTab from "./tabs/DiagnosticsListTab.tsx";
import FormatterIrTab from "./tabs/FormatterIrTab.tsx";
import GritQLSearchTab from "./tabs/GritQLSearchTab.tsx";
import SemanticModelTab from "./tabs/SemanticModelTab.tsx";
import SyntaxTab from "./tabs/SyntaxTab.tsx";
import TyeInfoTab from "./tabs/TypeInfoTab.tsx";
import {
	type BiomeAstSyntacticData,
	PlaygroundProblemsTab,
	type PlaygroundProps,
	PlaygroundView,
	type PlaygroundView as PlaygroundViewType,
} from "./types.ts";
import {
	createLocalStorage,
	getCurrentCode,
	getFileState,
	isCssFilename,
	isGraphqlFilename,
	isHtmlFilename,
	isJsonFilename,
	isJsxFilename,
	isMarkdownFilename,
	isScssFilename,
	isSvelteFilename,
	isTypeScriptFilename,
	isVueFilename,
	isYamlFilename,
	useWindowSize,
} from "./utils.ts";

type ViewItem = { view: PlaygroundViewType; label: string };

/** Tools shown directly in the toolbar. */
const TOOLS: ViewItem[] = [
	{ view: PlaygroundView.GritQL, label: "GritQL search" },
];

/** Biome internals, grouped behind a collapsible "Internals" toggle. */
const INTERNALS: ViewItem[] = [
	{ view: PlaygroundView.FormatterIr, label: "Formatter IR" },
	{ view: PlaygroundView.Syntax, label: "Syntax tree" },
	{ view: PlaygroundView.ControlFlow, label: "Control flow" },
	{ view: PlaygroundView.SemanticModel, label: "Semantic model" },
	{ view: PlaygroundView.TypesIr, label: "Types IR" },
	{ view: PlaygroundView.TypesRegistered, label: "Types registered" },
];

const VIEWS: ViewItem[] = [...TOOLS, ...INTERNALS];

function isInternal(view: PlaygroundViewType): boolean {
	return INTERNALS.some((item) => item.view === view);
}

const outputCollapsedStore = createLocalStorage("output-collapsed");

function viewLabel(view: PlaygroundViewType): string {
	return VIEWS.find((item) => item.view === view)?.label ?? view;
}

export default function Playground({
	setPlaygroundState,
	playgroundState,
}: PlaygroundProps) {
	const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
	const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
	const [internalsExpanded, setInternalsExpanded] = useState(() =>
		playgroundState.openViews.some(isInternal),
	);
	const [outputCollapsed, setOutputCollapsed] = useState(() =>
		outputCollapsedStore.getBoolean(),
	);
	const toggleOutputCollapsed = () => {
		setOutputCollapsed((collapsed) => {
			outputCollapsedStore.set(!collapsed);
			return !collapsed;
		});
	};
	const file = getFileState(playgroundState, playgroundState.currentFile);
	const biomeOutput = file.biome;
	const prettierOutput = file.prettier;
	const code = getCurrentCode(playgroundState) ?? "";
	const gritQuery = file.gritQuery ?? "";
	const gritQueryResults = biomeOutput.gritQuery ?? { matches: [] };
	const editorRef = useRef<ReactCodeMirrorRef>(null);
	const astPanelCodeMirrorRef = useRef<ReactCodeMirrorRef>(null);
	const biomeAstSyntacticDataRef = useRef<BiomeAstSyntacticData | null>(null);
	const { width } = useWindowSize();
	const mobile = width !== undefined && width <= 768;

	const codeMirrorExtensions = useMemo(() => {
		if (isJsonFilename(playgroundState.currentFile)) return [json()];
		if (isCssFilename(playgroundState.currentFile)) return [css()];
		if (isScssFilename(playgroundState.currentFile)) return [sass()];
		if (isGraphqlFilename(playgroundState.currentFile)) return [graphql()];
		if (isHtmlFilename(playgroundState.currentFile)) return [html()];
		if (isVueFilename(playgroundState.currentFile)) return [vue()];
		if (isSvelteFilename(playgroundState.currentFile)) return [svelte()];
		if (isMarkdownFilename(playgroundState.currentFile)) return [markdown()];
		if (isYamlFilename(playgroundState.currentFile)) return [yaml()];
		const jsx = isJsxFilename(playgroundState.currentFile);
		const typescript = isTypeScriptFilename(playgroundState.currentFile);
		return playgroundState.settings.experimentalEmbeddedSnippetsEnabled
			? [javascriptWithEmbeddedSnippets({ jsx, typescript })]
			: [javascript({ jsx, typescript })];
	}, [
		playgroundState.currentFile,
		playgroundState.settings.experimentalEmbeddedSnippetsEnabled,
	]);

	const onUpdate = useCallback(
		(viewUpdate: ViewUpdate) => {
			const cursorPosition = viewUpdate.state.selection.ranges[0]?.from ?? 0;
			setPlaygroundState((state) =>
				state.cursorPosition === cursorPosition
					? state
					: { ...state, cursorPosition },
			);
		},
		[setPlaygroundState],
	);

	const onChange = useCallback(
		(value: string) => {
			setPlaygroundState((state) => ({
				...state,
				files: {
					...state.files,
					[state.currentFile]: {
						...getFileState(state, state.currentFile),
						content: value,
					},
				},
			}));
		},
		[setPlaygroundState],
	);

	useEffect(() => {
		const ast = biomeOutput.syntax.ast;
		const tree = codeMirrorLangBiomeAst.parser.parse(ast);
		const rangeMap = new Map<[number, number], [number, number]>();
		biomeAstSyntacticDataRef.current = { ast: tree, rangeMap };
		tree.iterate({
			enter(node) {
				if (node.type.name !== "SyntaxToken") return;
				const range = node.node.getChild("Range");
				if (!range) return;
				let current = range.firstChild;
				while (current) {
					if (current.type.isError) return;
					current = current.nextSibling;
				}
				const children = range.node.getChildren("Number");
				const first = children.at(0)?.node;
				const second = children.at(1)?.node;
				if (first && second) {
					rangeMap.set(
						[
							+ast.slice(first.from, first.to),
							+ast.slice(second.from, second.to),
						],
						[node.from, node.to],
					);
				}
			},
		});
	}, [biomeOutput.syntax.ast]);

	useEffect(() => {
		const view = astPanelCodeMirrorRef.current?.view;
		const rangeMap = biomeAstSyntacticDataRef.current?.rangeMap;
		if (!view || !rangeMap) return;
		for (const [sourceRange, displayRange] of rangeMap.entries()) {
			if (
				playgroundState.cursorPosition >= sourceRange[0] &&
				playgroundState.cursorPosition <= sourceRange[1]
			) {
				view.dispatch({
					scrollIntoView: true,
					selection: EditorSelection.create([
						EditorSelection.range(displayRange[0], displayRange[1]),
						EditorSelection.cursor(displayRange[0]),
					]),
				});
				break;
			}
		}
	}, [playgroundState.cursorPosition]);

	/**
	 * Plain click switches to `view` alone (or closes it if it is the only one
	 * open); `additive` (shift-click) adds/removes it next to the others.
	 */
	const selectView = (view: PlaygroundViewType, additive: boolean) => {
		setPlaygroundState((state) => {
			const isOpen = state.openViews.includes(view);
			if (additive) {
				return {
					...state,
					openViews: isOpen
						? state.openViews.filter((item) => item !== view)
						: [...state.openViews, view],
				};
			}
			const onlyThisOpen = isOpen && state.openViews.length === 1;
			return { ...state, openViews: onlyThisOpen ? [] : [view] };
		});
	};
	const toggleView = (view: PlaygroundViewType) => selectView(view, true);
	const closeAllViews = () =>
		setPlaygroundState((state) => ({ ...state, openViews: [] }));

	const editor = (
		<CodeMirror
			ref={editorRef}
			diagnostics={biomeOutput.diagnostics.list}
			value={code}
			extensions={codeMirrorExtensions}
			placeholder="Enter your code here"
			onUpdate={onUpdate}
			onChange={onChange}
			autoFocus={true}
			data-testid="editor"
			gritQueryMatches={gritQueryResults.matches}
		/>
	);

	const renderOutput = (onCollapse?: () => void) => (
		<OutputStack
			state={playgroundState}
			setPlaygroundState={setPlaygroundState}
			code={code}
			biomeOutput={biomeOutput}
			prettierOutput={prettierOutput}
			extensions={codeMirrorExtensions}
			editorRef={editorRef}
			onCollapse={onCollapse}
		/>
	);
	const output = renderOutput();

	const renderView = (view: PlaygroundViewType) => (
		<ViewBody
			view={view}
			comparePrettierIr={playgroundState.comparePrettierIr}
			onComparePrettierIrChange={(comparePrettierIr) =>
				setPlaygroundState((state) => ({ ...state, comparePrettierIr }))
			}
			biomeOutput={biomeOutput}
			prettierOutput={prettierOutput}
			extensions={codeMirrorExtensions}
			astRef={astPanelCodeMirrorRef}
			editorRef={editorRef}
			code={code}
			gritQuery={gritQuery}
			gritQueryResults={gritQueryResults}
			searchLanguage={playgroundState.settings.searchLanguage}
			onGritQueryChange={(query) =>
				setPlaygroundState((state) => ({
					...state,
					files: {
						...state.files,
						[state.currentFile]: {
							...getFileState(state, state.currentFile),
							gritQuery: query,
						},
					},
				}))
			}
			onLanguageChange={(searchLanguage) =>
				setPlaygroundState((state) => ({
					...state,
					settings: { ...state.settings, searchLanguage },
				}))
			}
		/>
	);
	const viewButton = ({ view, label }: ViewItem) => (
		<button
			type="button"
			key={view}
			className={playgroundState.openViews.includes(view) ? "active" : ""}
			aria-pressed={playgroundState.openViews.includes(view)}
			title="Click to switch; shift-click to open alongside other tools"
			onClick={(event) => selectView(view, event.shiftKey)}
		>
			{label}
		</button>
	);
	const openInternalsCount =
		playgroundState.openViews.filter(isInternal).length;

	const viewToggles = (
		<nav className="playground-view-toggles" aria-label="Tools">
			<span className="playground-view-toggles-label">Tools</span>
			{TOOLS.map(viewButton)}
			<div
				className={`playground-view-group${internalsExpanded ? " expanded" : ""}`}
			>
				<button
					type="button"
					className="playground-view-group-toggle"
					aria-expanded={internalsExpanded}
					onClick={() => setInternalsExpanded((expanded) => !expanded)}
				>
					Internals
					{!internalsExpanded && openInternalsCount > 0 && (
						<span className="playground-view-group-count">
							{openInternalsCount}
						</span>
					)}
					<span aria-hidden={true}>{internalsExpanded ? "‹" : "›"}</span>
				</button>
				{internalsExpanded && INTERNALS.map(viewButton)}
			</div>
			{playgroundState.openViews.length > 0 && (
				<button
					type="button"
					className="playground-view-toggles-close"
					onClick={closeAllViews}
				>
					Close all
				</button>
			)}
		</nav>
	);

	const viewPanes = playgroundState.openViews.map((view) => (
		<section className="playground-view-pane" key={view}>
			<header className="playground-view-pane-header">
				<span>{viewLabel(view)}</span>
				<button
					type="button"
					aria-label={`Close ${viewLabel(view)}`}
					onClick={() => toggleView(view)}
				>
					×
				</button>
			</header>
			<div className="playground-view-pane-body">{renderView(view)}</div>
		</section>
	));

	if (mobile) {
		return (
			<div className="playground-shell mobile">
				<div className="playground-mobile-actions">
					<button type="button" onClick={() => setLeftDrawerOpen(true)}>
						Files &amp; settings
					</button>
					<button type="button" onClick={() => setRightDrawerOpen(true)}>
						Internals
					</button>
				</div>
				<main className="playground-editor">{editor}</main>
				<section className="playground-output-stack">{output}</section>
				{leftDrawerOpen && (
					<Drawer
						side="left"
						title="Files & settings"
						onClose={() => setLeftDrawerOpen(false)}
					>
						<PlaygroundSidebar
							state={playgroundState}
							setPlaygroundState={setPlaygroundState}
						/>
					</Drawer>
				)}
				{rightDrawerOpen && (
					<Drawer
						side="right"
						title="Internals"
						onClose={() => setRightDrawerOpen(false)}
					>
						<nav
							className="playground-mobile-view-list"
							aria-label="Internal views"
						>
							{TOOLS.map(viewButton)}
							<span className="playground-mobile-view-list-label">
								Internals
							</span>
							{INTERNALS.map(viewButton)}
						</nav>
						{viewPanes.length > 0 && (
							<div className="playground-mobile-view-stack">{viewPanes}</div>
						)}
					</Drawer>
				)}
			</div>
		);
	}

	return (
		<div className="playground-shell">
			<Resizable
				name="playground-sidebar"
				direction="right"
				className="playground-sidebar"
				minimumSize={220}
			>
				<PlaygroundSidebar
					state={playgroundState}
					setPlaygroundState={setPlaygroundState}
				/>
			</Resizable>
			<div className="playground-main">
				{viewToggles}
				<div
					className={`playground-workspace${outputCollapsed ? " output-collapsed" : ""}`}
				>
					<Resizable
						name="playground-editor"
						direction="right"
						className="playground-editor"
						minimumSize={100}
					>
						{editor}
					</Resizable>
					{viewPanes.length > 0 && (
						<Resizable
							name="playground-view-stack"
							direction="right"
							className="playground-view-stack"
							minimumSize={140}
						>
							{viewPanes}
						</Resizable>
					)}
					{outputCollapsed ? (
						<section className="playground-output-stack collapsed">
							<button
								type="button"
								className="playground-output-collapse"
								aria-label="Expand output"
								aria-expanded={false}
								onClick={toggleOutputCollapsed}
							>
								<span aria-hidden={true}>‹</span>
							</button>
						</section>
					) : (
						<section className="playground-output-stack">
							{renderOutput(toggleOutputCollapsed)}
						</section>
					)}
				</div>
			</div>
		</div>
	);
}

function OutputStack({
	state,
	setPlaygroundState,
	code,
	biomeOutput,
	prettierOutput,
	extensions,
	editorRef,
	onCollapse,
}: {
	state: Parameters<typeof PlaygroundSidebar>[0]["state"];
	setPlaygroundState: Parameters<
		typeof PlaygroundSidebar
	>[0]["setPlaygroundState"];
	code: string;
	biomeOutput: ReturnType<typeof getFileState>["biome"];
	prettierOutput: ReturnType<typeof getFileState>["prettier"];
	extensions: Extension[];
	editorRef: RefObject<ReactCodeMirrorRef | null>;
	/** When given, the toolbar shows a button that collapses the whole panel. */
	onCollapse?: (() => void) | undefined;
}) {
	const [problemsCollapsed, setProblemsCollapsed] = useState(false);
	const outputCode =
		state.fixMode === "none"
			? state.shouldFormat
				? biomeOutput.formatter.code
				: code
			: biomeOutput.analysis.fixed;

	return (
		<>
			<div className="playground-output-toolbar">
				<div className="playground-output-controls">
					<label>
						<input
							type="checkbox"
							checked={state.shouldFormat}
							onChange={(event) =>
								setPlaygroundState((current) => ({
									...current,
									shouldFormat: event.target.checked,
								}))
							}
						/>
						Format
					</label>
					<fieldset className="playground-fix-control">
						<legend>Fix</legend>
						{[
							["none", "None"],
							["safeFixes", "Safe"],
							["safeAndUnsafeFixes", "Safe + unsafe"],
							["applySuppressions", "Suppressions"],
						].map(([value, label]) => (
							<button
								type="button"
								key={value}
								className={state.fixMode === value ? "active" : ""}
								onClick={() =>
									setPlaygroundState((current) => ({
										...current,
										fixMode: value as typeof current.fixMode,
									}))
								}
							>
								{label}
							</button>
						))}
					</fieldset>
					<label>
						<input
							type="checkbox"
							disabled={!state.shouldFormat}
							checked={state.comparePrettier}
							onChange={(event) =>
								setPlaygroundState((current) => ({
									...current,
									comparePrettier: event.target.checked,
								}))
							}
						/>
						Compare Prettier
					</label>
				</div>
				{onCollapse && (
					<button
						type="button"
						className="playground-output-collapse"
						aria-label="Collapse output"
						aria-expanded={true}
						onClick={onCollapse}
					>
						<span aria-hidden={true}>›</span>
					</button>
				)}
			</div>
			<div
				className={`playground-code-output${state.comparePrettier ? " split" : ""}`}
			>
				{state.comparePrettier && state.shouldFormat ? (
					<Resizable
						name="playground-biome-output"
						direction="right"
						className="playground-output-pane"
						minimumSize={140}
					>
						<div className="playground-output-heading biome">
							<BiomeHeader />
						</div>
						<CodeMirror
							value={outputCode}
							extensions={extensions}
							readOnly={true}
							data-testid="biome-output"
						/>
					</Resizable>
				) : (
					<div className="playground-output-pane">
						<div className="playground-output-heading biome">
							<BiomeHeader />
						</div>
						<CodeMirror
							value={outputCode}
							extensions={extensions}
							readOnly={true}
							data-testid="biome-output"
						/>
					</div>
				)}
				{state.comparePrettier && state.shouldFormat && (
					<div className="playground-output-pane">
						<div className="playground-output-heading prettier">
							<PrettierHeader />
						</div>
						<CodeMirror
							value={
								prettierOutput.type === "SUCCESS"
									? prettierOutput.code
									: prettierOutput.stack
							}
							extensions={prettierOutput.type === "SUCCESS" ? extensions : []}
							readOnly={true}
							data-testid="prettier-output"
						/>
					</div>
				)}
			</div>
			<Resizable
				name="playground-problems"
				direction="top"
				className={`playground-problems${problemsCollapsed ? " collapsed" : ""}`}
				minimumSize={problemsCollapsed ? 0 : 150}
			>
				<div className="playground-problems-tabs" role="tablist">
					<button
						type="button"
						role="tab"
						aria-selected={
							state.problemsTab === PlaygroundProblemsTab.Diagnostics
						}
						onClick={() =>
							setPlaygroundState((current) => ({
								...current,
								problemsTab: PlaygroundProblemsTab.Diagnostics,
							}))
						}
					>
						Diagnostics ({biomeOutput.diagnostics.list.length})
					</button>
					<button
						type="button"
						role="tab"
						aria-selected={state.problemsTab === PlaygroundProblemsTab.Console}
						onClick={() =>
							setPlaygroundState((current) => ({
								...current,
								problemsTab: PlaygroundProblemsTab.Console,
							}))
						}
					>
						Console
					</button>
					<button
						className="playground-problems-collapse"
						type="button"
						aria-label={
							problemsCollapsed
								? "Expand problems panel"
								: "Collapse problems panel"
						}
						aria-expanded={!problemsCollapsed}
						onClick={() => setProblemsCollapsed((collapsed) => !collapsed)}
					>
						<span aria-hidden={true}>{problemsCollapsed ? "⌃" : "⌄"}</span>
					</button>
				</div>
				{!problemsCollapsed && (
					<div className="playground-problems-body">
						{state.problemsTab === PlaygroundProblemsTab.Diagnostics ? (
							<DiagnosticsListTab
								editorRef={editorRef}
								code={code}
								diagnostics={biomeOutput.diagnostics.list}
							/>
						) : (
							<DiagnosticsConsoleTab
								console={biomeOutput.diagnostics.console}
							/>
						)}
					</div>
				)}
			</Resizable>
		</>
	);
}

function ViewBody({
	view,
	comparePrettierIr,
	onComparePrettierIrChange,
	biomeOutput,
	prettierOutput,
	extensions,
	astRef,
	editorRef,
	code,
	gritQuery,
	gritQueryResults,
	searchLanguage,
	onGritQueryChange,
	onLanguageChange,
}: {
	view: PlaygroundViewType;
	comparePrettierIr: boolean;
	onComparePrettierIrChange: (compare: boolean) => void;
	biomeOutput: ReturnType<typeof getFileState>["biome"];
	prettierOutput: ReturnType<typeof getFileState>["prettier"];
	extensions: Extension[];
	astRef: RefObject<ReactCodeMirrorRef | null>;
	editorRef: RefObject<ReactCodeMirrorRef | null>;
	code: string;
	gritQuery: string;
	gritQueryResults: { matches: [number, number][]; error: string | undefined };
	searchLanguage: Parameters<typeof GritQLSearchTab>[0]["searchLanguage"];
	onGritQueryChange: (query: string) => void;
	onLanguageChange: Parameters<typeof GritQLSearchTab>[0]["onLanguageChange"];
}) {
	switch (view) {
		case PlaygroundView.FormatterIr:
			return (
				<FormatterIrTab
					biome={biomeOutput.formatter.ir}
					prettier={prettierOutput}
					comparePrettier={comparePrettierIr}
					onComparePrettierChange={onComparePrettierIrChange}
				/>
			);
		case PlaygroundView.Syntax:
			return (
				<SyntaxTab
					ast={biomeOutput.syntax.ast}
					cst={biomeOutput.syntax.cst}
					ref={astRef}
				/>
			);
		case PlaygroundView.ControlFlow:
			return <ControlFlowTab graph={biomeOutput.analysis.controlFlowGraph} />;
		case PlaygroundView.SemanticModel:
			return (
				<SemanticModelTab
					code={biomeOutput.analysis.semanticModel}
					extensions={extensions}
				/>
			);
		case PlaygroundView.TypesIr:
			return <TyeInfoTab code={biomeOutput.types.ir} extensions={extensions} />;
		case PlaygroundView.TypesRegistered:
			return (
				<TyeInfoTab
					code={biomeOutput.types.registered}
					extensions={extensions}
				/>
			);
		case PlaygroundView.GritQL:
			return (
				<GritQLSearchTab
					editorRef={editorRef}
					code={code}
					gritQuery={gritQuery}
					gritQueryResults={gritQueryResults}
					searchLanguage={searchLanguage}
					onGritQueryChange={onGritQueryChange}
					onLanguageChange={onLanguageChange}
				/>
			);
	}
}

function Drawer({
	side,
	title,
	onClose,
	children,
}: {
	side: "left" | "right";
	title: string;
	onClose: () => void;
	children: ReactNode;
}) {
	return (
		<div className="playground-drawer-layer">
			<button
				className="playground-drawer-backdrop"
				type="button"
				aria-label="Close drawer"
				onClick={onClose}
			/>
			<aside className={`playground-drawer ${side}`}>
				<header>
					<span>{title}</span>
					<button type="button" aria-label={`Close ${title}`} onClick={onClose}>
						×
					</button>
				</header>
				<div className="playground-drawer-body">{children}</div>
			</aside>
		</div>
	);
}
