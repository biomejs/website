import type {
	FixFileMode,
	RuleDomain,
	RuleDomains,
	RuleDomainValue,
} from "@biomejs/wasm-web";
import type React from "react";
import { type Dispatch, type SetStateAction, useState } from "react";
import EnumSelect from "@/playground/components/EnumSelect";
import {
	ArrowParentheses,
	AttributePosition,
	Expand,
	IndentStyle,
	Language,
	LintRules,
	type PlaygroundState,
	QuoteProperties,
	QuoteStyle,
	Semicolons,
	SourceType,
	TrailingCommas,
	WhitespaceSensitivity,
} from "@/playground/types";
import {
	classnames,
	createPlaygroundSettingsSetter,
	getFileState,
	guessLanguage,
	isScriptFilename,
	modifyFilename,
	normalizeFilename,
} from "@/playground/utils";

export interface SettingsTabProps {
	state: PlaygroundState;
	setPlaygroundState: Dispatch<SetStateAction<PlaygroundState>>;
	onReset: () => void;
}

export default function SettingsTab({
	setPlaygroundState,
	onReset,
	state: {
		singleFileMode,
		currentFile,
		files,
		settings: {
			lineWidth,
			indentWidth,
			indentStyle,
			quoteStyle,
			jsxQuoteStyle,
			quoteProperties,
			trailingCommas,
			semicolons,
			arrowParentheses,
			bracketSpacing,
			bracketSameLine,
			expand,
			indentScriptAndStyle,
			whitespaceSensitivity,
			lintRules,
			enabledLinting,
			analyzerFixMode,
			enabledAssist,
			unsafeParameterDecoratorsEnabled,
			allowComments,
			attributePosition,
			ruleDomains,
		},
	},
}: SettingsTabProps) {
	const setLineWidth = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"lineWidth",
	);
	const setIndentWidth = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"indentWidth",
	);
	const setIndentStyle = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"indentStyle",
	);
	const setQuoteStyle = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"quoteStyle",
	);
	const setJsxQuoteStyle = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"jsxQuoteStyle",
	);
	const setQuoteProperties = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"quoteProperties",
	);
	const setTrailingCommas = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"trailingCommas",
	);
	const setSemicolons = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"semicolons",
	);
	const setArrowParentheses = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"arrowParentheses",
	);
	const setAttributePosition = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"attributePosition",
	);
	const setBracketSpacing = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"bracketSpacing",
	);
	const setBracketSameLine = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"bracketSameLine",
	);
	const setExpand = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"expand",
	);
	const setIndentScriptAndStyle = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"indentScriptAndStyle",
	);

	const setWhitespaceSensitivity = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"whitespaceSensitivity",
	);

	const setLintRules = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"lintRules",
	);
	const setEnabledLinting = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"enabledLinting",
	);
	const setAnalyzerFixMode = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"analyzerFixMode",
	);

	const setEnabledAssist = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"enabledAssist",
	);

	const setUnsafeParameterDecoratorsEnabled = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"unsafeParameterDecoratorsEnabled",
	);
	const setAllowComments = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"allowComments",
	);

	const setRuleDomains = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"ruleDomains",
	);

	function setCurrentFilename(newFilename: string) {
		setPlaygroundState((state) => {
			if (state.currentFile === newFilename) {
				return state;
			}

			const { [state.currentFile]: _, ...otherFiles } = state.files;

			const files: PlaygroundState["files"] = {
				...otherFiles,
				[newFilename]: state.files[state.currentFile]!,
			};

			return {
				...state,
				currentFile: newFilename,
				files,
			};
		});
	}

	function deleteFile(filename: string) {
		setPlaygroundState((state) => {
			const { [filename]: _, ...files } = state.files;
			let currentFile = state.currentFile;

			if (currentFile === filename) {
				const files = Object.keys(state.files);
				const index = files.indexOf(filename);
				currentFile = files[index + 1] ?? files[index - 1] ?? currentFile;
			}

			return {
				...state,
				currentFile,
				files: {
					...files,
					// Make sure currentFile is still accessible
					[currentFile]: getFileState(state, currentFile),
				},
			};
		});
	}

	function createFile(filename: string) {
		const normalizedFilename = normalizeFilename(filename);

		setPlaygroundState((state) => ({
			...state,
			currentFile: normalizedFilename,
			files: {
				...state.files,
				[normalizedFilename]: getFileState(
					{
						files: {},
					},
					normalizedFilename,
				),
			},
		}));
	}

	function renameFile(oldFilename: string, newFilename: string) {
		const normalizedNewFilename = normalizeFilename(newFilename);

		setPlaygroundState((state) => {
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
		});
	}

	function setCurrentFile(currentFile: string) {
		setPlaygroundState((state) => ({
			...state,
			currentFile,
		}));
	}

	function toggleSingleFileMode() {
		setPlaygroundState((state) => ({
			...state,
			singleFileMode: !state.singleFileMode,
		}));
	}

	const language = guessLanguage(currentFile);

	function setLanguage(language: Language): void {
		renameFile(
			currentFile,
			modifyFilename(currentFile, {
				language,
				script: isScriptFilename(currentFile),
			}),
		);
	}

	return (
		<div className="settings-tab">
			<section className="settings-tab-buttons">
				<button type="button" onClick={onReset} onKeyDown={onReset}>
					Reset
				</button>
				<button
					type="button"
					onClick={toggleSingleFileMode}
					onKeyDown={toggleSingleFileMode}
					data-testid="toggle-single-file-mode"
				>
					{singleFileMode ? "Multi-file mode" : "Single-file mode"}
				</button>
			</section>

			{singleFileMode ? (
				<LanguageView language={language} setLanguage={setLanguage} />
			) : (
				<FileView
					currentFile={currentFile}
					files={Object.keys(files)}
					createFile={createFile}
					deleteFile={deleteFile}
					setCurrentFile={setCurrentFile}
					renameFile={renameFile}
				/>
			)}
			<FormatterSettings
				lineWidth={lineWidth}
				setLineWidth={setLineWidth}
				indentStyle={indentStyle}
				setIndentStyle={setIndentStyle}
				indentWidth={indentWidth}
				setIndentWidth={setIndentWidth}
				quoteStyle={quoteStyle}
				setQuoteStyle={setQuoteStyle}
				jsxQuoteStyle={jsxQuoteStyle}
				setJsxQuoteStyle={setJsxQuoteStyle}
				quoteProperties={quoteProperties}
				setQuoteProperties={setQuoteProperties}
				trailingCommas={trailingCommas}
				setTrailingCommas={setTrailingCommas}
				semicolons={semicolons}
				setSemicolons={setSemicolons}
				arrowParentheses={arrowParentheses}
				setArrowParentheses={setArrowParentheses}
				attributePosition={attributePosition}
				setAttributePosition={setAttributePosition}
				bracketSpacing={bracketSpacing}
				setBracketSpacing={setBracketSpacing}
				bracketSameLine={bracketSameLine}
				setBracketSameLine={setBracketSameLine}
				expand={expand}
				setExpand={setExpand}
				indentScriptAndStyle={indentScriptAndStyle}
				setIndentScriptAndStyle={setIndentScriptAndStyle}
				whitespaceSensitivity={whitespaceSensitivity}
				setWhitespaceSensitivity={setWhitespaceSensitivity}
			/>
			<LinterSettings
				lintRules={lintRules}
				setLintRules={setLintRules}
				enabledLinting={enabledLinting}
				setEnabledLinting={setEnabledLinting}
				analyzerFixMode={analyzerFixMode}
				setAnalyzerFixMode={setAnalyzerFixMode}
				ruleDomains={ruleDomains}
				setRuleDomains={setRuleDomains}
			/>
			<AssistSettings
				enabledAssist={enabledAssist}
				setEnabledAssist={setEnabledAssist}
			/>
			<SyntaxSettings
				filename={currentFile}
				setFilename={setCurrentFilename}
				unsafeParameterDecoratorsEnabled={unsafeParameterDecoratorsEnabled}
				allowComments={allowComments}
				setUnsafeParameterDecoratorsEnabled={
					setUnsafeParameterDecoratorsEnabled
				}
				setAllowComments={setAllowComments}
			/>
		</div>
	);
}

function LanguageView({
	language,
	setLanguage,
}: {
	language: Language;
	setLanguage: (language: Language) => void;
}) {
	return (
		<section>
			<div className="field-row">
				<label htmlFor="language">Language</label>
				<EnumSelect
					id="language"
					name="language"
					options={{
						[Language.JS]: "JavaScript",
						[Language.JSX]: "JSX",
						[Language.TS]: "TypeScript",
						[Language.TSX]: "TSX",
						[Language.JSON]: "JSON",
						[Language.GraphQL]: "GraphQL",
						[Language.Grit]: "Grit",
						[Language.CSS]: "CSS",
						[Language.HTML]: "HTML",
						[Language.Vue]: "Vue",
						[Language.Svelte]: "Svelte",
						[Language.Astro]: "Astro",
					}}
					value={language ?? Language.TSX}
					onChangeValue={setLanguage}
				/>
			</div>
		</section>
	);
}

function FileView({
	currentFile,
	createFile,
	deleteFile,
	renameFile,
	setCurrentFile,
	files,
}: {
	createFile: (filename: string) => void;
	deleteFile: (filename: string) => void;
	setCurrentFile: (filename: string) => void;
	renameFile: (oldFilename: string, newFilename: string) => void;
	currentFile: string;
	files: string[];
}) {
	const [isCreatingFile, setCreatingFile] = useState(false);

	return (
		<div className="file-view">
			<h2 className="files-heading">
				Files
				<button type="button" onClick={() => setCreatingFile(true)}>
					<span className="sr-only">New</span>
					<span aria-hidden={true}>+</span>
				</button>
			</h2>

			<ul className="files-list">
				{files.map((filename) => {
					return (
						<FileViewItem
							key={filename}
							isActive={filename === currentFile}
							filename={filename}
							canDelete={files.length > 1}
							onClick={() => {
								setCurrentFile(filename);
							}}
							renameFile={(newFilename) => {
								renameFile(filename, newFilename);
							}}
							deleteFile={() => {
								deleteFile(filename);
							}}
						/>
					);
				})}
			</ul>

			{isCreatingFile && (
				<FilenameInput
					onSubmit={(filename) => {
						createFile(filename);
						setCreatingFile(false);
					}}
					onCancel={() => setCreatingFile(false)}
				/>
			)}
		</div>
	);
}

function FileViewItem({
	filename,
	isActive,
	onClick,
	deleteFile,
	renameFile,
	canDelete,
}: {
	filename: string;
	canDelete: boolean;
	isActive: boolean;
	renameFile: (newFilename: string) => void;
	onClick: () => void;
	deleteFile: () => void;
}) {
	const [isRenaming, setIsRenaming] = useState(false);

	const className = classnames(isActive && "active");

	if (isRenaming) {
		return (
			<li>
				<FilenameInput
					onSubmit={(newFilename) => {
						renameFile(newFilename);
						setIsRenaming(false);
					}}
					onCancel={() => {
						setIsRenaming(false);
					}}
					initialValue={filename}
				/>
			</li>
		);
	}

	function onDeleteClick(e: React.MouseEvent | React.KeyboardEvent) {
		e.preventDefault();
		e.stopPropagation();
		deleteFile();
	}

	function onRenameClick(e: React.MouseEvent | React.KeyboardEvent) {
		e.preventDefault();
		e.stopPropagation();
		setIsRenaming(true);
	}

	return (
		<li className={className} onClick={onClick} onKeyDown={onClick}>
			{filename}

			<button type="button" onClick={onRenameClick} onKeyDown={onRenameClick}>
				Rename
			</button>

			{canDelete && (
				<button type="button" onClick={onDeleteClick} onKeyDown={onDeleteClick}>
					<span className="sr-only">Delete</span>
					<span aria-hidden={true}>X</span>
				</button>
			)}
		</li>
	);
}

function FilenameInput({
	onSubmit,
	onCancel,
	initialValue,
}: {
	onSubmit: (filename: string) => void;
	onCancel: () => void;
	initialValue?: string;
}) {
	const [filename, setFilename] = useState(initialValue ?? "");

	function onKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Escape") {
			onCancel();
		}

		if (e.key === "Enter") {
			onSubmit(filename);
		}
	}

	function onBlur() {
		if (filename === "") {
			onCancel();
		} else {
			onSubmit(filename);
		}
	}

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFilename(e.target.value);
	}

	return (
		<input
			type="text"
			// biome-ignore lint/a11y/noAutofocus: Not sure how else to do this
			autoFocus={true}
			onKeyDown={onKeyDown}
			onChange={onChange}
			onBlur={onBlur}
			value={filename}
		/>
	);
}

function SyntaxSettings({
	filename,
	setFilename,
	unsafeParameterDecoratorsEnabled,
	setUnsafeParameterDecoratorsEnabled,
	setAllowComments,
	allowComments,
}: {
	filename: string;
	setFilename: (filename: string) => void;
	unsafeParameterDecoratorsEnabled: boolean;
	allowComments: boolean;
	setUnsafeParameterDecoratorsEnabled: (value: boolean) => void;
	setAllowComments: (value: boolean) => void;
}) {
	const isScript = isScriptFilename(filename);

	return (
		<>
			<h2>Syntax options</h2>
			<section>
				<div className="field-row">
					<label htmlFor="sourceType">Source Type</label>
					<EnumSelect
						id="sourceType"
						name="sourceType"
						options={{
							[SourceType.Module]: "Module",
							[SourceType.Script]: "Script",
						}}
						value={isScript ? SourceType.Script : SourceType.Module}
						onChangeValue={(sourceType) => {
							setFilename(
								modifyFilename(filename, {
									language: guessLanguage(filename),
									script: sourceType === SourceType.Script,
								}),
							);
						}}
					/>
				</div>

				<div className="field-row">
					<input
						id="parameter-decorators"
						name="parameter-decorators"
						type="checkbox"
						checked={unsafeParameterDecoratorsEnabled}
						onChange={(e) =>
							setUnsafeParameterDecoratorsEnabled(e.target.checked)
						}
					/>
					<label htmlFor="parameter-decorators">
						Parameter decorators enabled
					</label>
				</div>
				<div className="field-row">
					<input
						id="allow-comments"
						name="allow-comments"
						type="checkbox"
						checked={allowComments}
						onChange={(e) => setAllowComments(e.target.checked)}
					/>
					<label htmlFor="allow-comments">Allow comments in JSON files</label>
				</div>
			</section>
		</>
	);
}

function FormatterSettings({
	lineWidth,
	setLineWidth,
	indentStyle,
	setIndentStyle,
	indentWidth,
	setIndentWidth,
	quoteStyle,
	setQuoteStyle,
	jsxQuoteStyle,
	setJsxQuoteStyle,
	quoteProperties,
	setQuoteProperties,
	trailingCommas,
	setTrailingCommas,
	semicolons,
	setSemicolons,
	arrowParentheses,
	setArrowParentheses,
	attributePosition,
	setAttributePosition,
	bracketSpacing,
	setBracketSpacing,
	bracketSameLine,
	setBracketSameLine,
	expand,
	setExpand,
	indentScriptAndStyle,
	setIndentScriptAndStyle,
	whitespaceSensitivity,
	setWhitespaceSensitivity,
}: {
	lineWidth: number;
	setLineWidth: (value: number) => void;
	indentStyle: IndentStyle;
	setIndentStyle: (value: IndentStyle) => void;
	indentWidth: number;
	setIndentWidth: (value: number) => void;
	quoteStyle: QuoteStyle;
	setQuoteStyle: (value: QuoteStyle) => void;
	jsxQuoteStyle: QuoteStyle;
	setJsxQuoteStyle: (value: QuoteStyle) => void;
	quoteProperties: QuoteProperties;
	setQuoteProperties: (value: QuoteProperties) => void;
	trailingCommas: TrailingCommas;
	setTrailingCommas: (value: TrailingCommas) => void;
	semicolons: Semicolons;
	setSemicolons: (value: Semicolons) => void;
	arrowParentheses: ArrowParentheses;
	setArrowParentheses: (value: ArrowParentheses) => void;
	attributePosition: AttributePosition;
	setAttributePosition: (value: AttributePosition) => void;
	bracketSpacing: boolean;
	setBracketSpacing: (value: boolean) => void;
	bracketSameLine: boolean;
	setBracketSameLine: (value: boolean) => void;
	expand: Expand;
	setExpand: (value: Expand) => void;
	indentScriptAndStyle: boolean;
	setIndentScriptAndStyle: (value: boolean) => void;
	whitespaceSensitivity: WhitespaceSensitivity;
	setWhitespaceSensitivity: (value: WhitespaceSensitivity) => void;
}) {
	return (
		<>
			<h2>Formatter options</h2>
			<section>
				<LineWidthInput lineWidth={lineWidth} setLineWidth={setLineWidth} />

				<div className="field-row">
					<label htmlFor="indentStyle">Indent Style</label>
					<EnumSelect
						id="location"
						name="location"
						options={{
							[IndentStyle.Tab]: "Tabs",
							[IndentStyle.Space]: "Spaces",
						}}
						value={indentStyle}
						onChangeValue={setIndentStyle}
					/>
				</div>

				<div className="field-row">
					<label htmlFor="indentWidth">Indent Width</label>
					<input
						type="number"
						name="indentWidth"
						id="indentWidth"
						value={indentWidth}
						onChange={(e) => {
							setIndentWidth(Number.parseInt(e.target.value));
						}}
					/>
				</div>

				<div className="field-row">
					<label htmlFor="quoteStyle">Quote Style</label>
					<EnumSelect
						id="quoteStyle"
						name="quoteStyle"
						options={{
							[QuoteStyle.Double]: "Double",
							[QuoteStyle.Single]: "Single",
						}}
						value={quoteStyle ?? QuoteStyle.Double}
						onChangeValue={setQuoteStyle}
					/>
				</div>

				<div className="field-row">
					<label htmlFor="jsxQuoteStyle">Jsx Quote Style</label>
					<EnumSelect
						id="jsxQuoteStyle"
						name="jsxQuoteStyle"
						options={{
							[QuoteStyle.Double]: "Double",
							[QuoteStyle.Single]: "Single",
						}}
						value={jsxQuoteStyle ?? QuoteStyle.Double}
						onChangeValue={setJsxQuoteStyle}
					/>
				</div>

				<div className="field-row">
					<label htmlFor="quoteProperties">Quote Properties</label>
					<EnumSelect
						id="quoteProperties"
						name="quoteProperties"
						options={{
							[QuoteProperties.AsNeeded]: "As needed",
							[QuoteProperties.Preserve]: "Preserve",
						}}
						value={quoteProperties ?? QuoteProperties.AsNeeded}
						onChangeValue={setQuoteProperties}
					/>
				</div>

				<div className="field-row">
					<label htmlFor="trailingCommas">Trailing Commas</label>
					<EnumSelect
						id="trailingCommas"
						name="trailingCommas"
						options={{
							[TrailingCommas.All]: "All",
							[TrailingCommas.Es5]: "ES5",
							[TrailingCommas.None]: "None",
						}}
						value={trailingCommas ?? TrailingCommas.All}
						onChangeValue={setTrailingCommas}
					/>
				</div>

				<div className="field-row">
					<label htmlFor="semicolons">Semicolons</label>
					<EnumSelect
						id="semicolons"
						name="semicolons"
						options={{
							[Semicolons.Always]: "Always",
							[Semicolons.AsNeeded]: "As needed",
						}}
						value={semicolons ?? Semicolons.Always}
						onChangeValue={setSemicolons}
					/>
				</div>

				<div className="field-row">
					<label htmlFor="arrowParentheses">Arrow Parentheses</label>
					<EnumSelect
						id="arrowParentheses"
						name="arrowParentheses"
						options={{
							[ArrowParentheses.Always]: "Always",
							[ArrowParentheses.AsNeeded]: "As needed",
						}}
						value={arrowParentheses ?? ArrowParentheses.Always}
						onChangeValue={setArrowParentheses}
					/>
				</div>
				<div className="field-row">
					<label htmlFor="arrowParentheses">Attribute Position</label>
					<EnumSelect
						id="attributePosition"
						name="attributePosition"
						options={{
							[AttributePosition.Auto]: "Auto",
							[AttributePosition.Multiline]: "Multiline",
						}}
						value={attributePosition ?? AttributePosition.Auto}
						onChangeValue={setAttributePosition}
					/>
				</div>
				<div className="field-row">
					<label htmlFor="bracketSpacing">Bracket Spacing</label>
					<input
						id="bracketSpacing"
						name="bracketSpacing"
						type="checkbox"
						checked={bracketSpacing}
						onChange={(e) => setBracketSpacing(e.target.checked)}
					/>
				</div>
				<div className="field-row">
					<label htmlFor="bracketSameLine">Bracket Same Line</label>
					<input
						id="bracketSameLine"
						name="bracketSameLine"
						type="checkbox"
						checked={bracketSameLine}
						onChange={(e) => setBracketSameLine(e.target.checked)}
					/>
				</div>
				<div className="field-row">
					<label htmlFor="expand">Expand</label>
					<EnumSelect
						id="expand"
						name="expand"
						options={{
							[Expand.Auto]: "Auto",
							[Expand.Always]: "Always",
							[Expand.Never]: "Never",
						}}
						value={expand ?? Expand.Auto}
						onChangeValue={setExpand}
					/>
				</div>

				<h3>HTML</h3>
				<div className="field-row">
					<label htmlFor="indentScriptAndStyle">Indent Script And Style</label>
					<input
						id="indentScriptAndStyle"
						name="indentScriptAndStyle"
						type="checkbox"
						checked={indentScriptAndStyle}
						onChange={(e) => setIndentScriptAndStyle(e.target.checked)}
					/>
				</div>
				<div className="field-row">
					<label htmlFor="whitespaceSensitivity">Whitespace Sensitivity</label>
					<select
						id="whitespaceSensitivity"
						name="whitespaceSensitivity"
						value={whitespaceSensitivity}
						onChange={(e) =>
							setWhitespaceSensitivity(e.target.value as WhitespaceSensitivity)
						}
					>
						<option value={WhitespaceSensitivity.Css}>CSS</option>
						<option value={WhitespaceSensitivity.Strict}>Strict</option>
						<option value={WhitespaceSensitivity.Ignore}>Ignore</option>
					</select>
				</div>
			</section>
		</>
	);
}

function LinterSettings({
	lintRules,
	setLintRules,
	enabledLinting,
	setEnabledLinting,
	analyzerFixMode,
	setAnalyzerFixMode,
	ruleDomains,
	setRuleDomains,
}: {
	lintRules: LintRules;
	setLintRules: (value: LintRules) => void;
	enabledLinting: boolean;
	setEnabledLinting: (value: boolean) => void;
	analyzerFixMode: FixFileMode;
	setAnalyzerFixMode: (value: FixFileMode) => void;
	ruleDomains: RuleDomains;
	setRuleDomains: (value: RuleDomains) => void;
}) {
	const updateDomain = (domain: RuleDomain, value: RuleDomainValue) => {
		setRuleDomains({
			...ruleDomains,
			[domain]: value,
		});
	};
	if (ruleDomains === undefined) {
		ruleDomains = {};
	}

	const domainConfigs: Array<{
		id: RuleDomain;
		label: string;
	}> = [
		{ id: "react", label: "React Rules" },
		{ id: "test", label: "Test Rules" },
		{ id: "solid", label: "Solid Rules" },
		{ id: "next", label: "Next.js Rules" },
	];

	const domainValues: RuleDomainValue[] = ["all", "recommended", "none"];

	return (
		<>
			<h2>Linter options</h2>
			<section>
				<div className="field-row">
					<input
						id="linting-enabled"
						name="linting-enabled"
						type="checkbox"
						checked={enabledLinting}
						onChange={(e) => setEnabledLinting(e.target.checked)}
					/>
					<label htmlFor="linting-enabled">Linter enabled</label>
				</div>

				<div className="field-row">
					<label htmlFor="lint-rules">Lint Rules</label>
					<select
						id="lint-rules"
						aria-describedby="lint-rules-description"
						name="lint-rules"
						disabled={!enabledLinting}
						value={lintRules ?? LintRules.Recommended}
						onChange={(e) => setLintRules(e.target.value as LintRules)}
					>
						<option value={LintRules.Recommended}>Recommended</option>
						<option value={LintRules.All}>All</option>
					</select>
				</div>
				<div className="field-row">
					<label htmlFor="analyzer-fix-mode">Fix Mode</label>
					<select
						id="analyzer-fix-mode"
						aria-describedby="analyzer-fix-mode-description"
						name="analyzer-fix-mode"
						disabled={!enabledLinting}
						value={analyzerFixMode ?? "safeFixes"}
						onChange={(e) => setAnalyzerFixMode(e.target.value as FixFileMode)}
					>
						<option value={"safeFixes"}>Safe Fixes</option>
						<option value={"safeAndUnsafeFixes"}>Safe and Unsafe Fixes</option>
						<option value={"applySuppressions"}>Apply Suppressions</option>
					</select>
				</div>

				<h3>Domains</h3>
				{domainConfigs.map(({ id, label }) => (
					<div key={id} className="field-row">
						<label htmlFor={`${id}-domain`}>{label}</label>
						<select
							id={`${id}-domain`}
							value={ruleDomains[id] ?? "none"}
							onChange={(e) =>
								updateDomain(id, e.target.value as RuleDomainValue)
							}
							disabled={!enabledLinting}
						>
							{domainValues.map((value) => (
								<option key={value} value={value}>
									{value.charAt(0).toUpperCase() + value.slice(1)}
								</option>
							))}
						</select>
					</div>
				))}
			</section>
		</>
	);
}

export function AssistSettings({
	enabledAssist,
	setEnabledAssist,
}: {
	enabledAssist: boolean;
	setEnabledAssist: (value: boolean) => void;
}) {
	return (
		<>
			<h2>Assist options</h2>
			<section>
				<div className="field-row">
					<input
						id="assist-enabled"
						name="assist-enabled"
						type="checkbox"
						checked={enabledAssist}
						onChange={(e) => setEnabledAssist(e.target.checked)}
					/>
					<label htmlFor="assist-enabled">Assist enabled</label>
				</div>
			</section>
		</>
	);
}

function LineWidthInput({
	lineWidth,
	setLineWidth,
}: {
	lineWidth: number;
	setLineWidth: (lineWidth: number) => void;
}) {
	const [showCustom, setShowCustom] = useState(
		lineWidth !== 80 && lineWidth !== 120,
	);

	return (
		<>
			<div className="field-row">
				<label htmlFor="lineWidth">Line Width</label>

				<div className="input-container">
					<div className="button-group">
						<button
							type="button"
							aria-label="Set line width to 80 characters"
							onClick={() => {
								setLineWidth(80);
								setShowCustom(false);
							}}
							onKeyDown={() => {
								setLineWidth(80);
								setShowCustom(false);
							}}
							disabled={!showCustom && lineWidth === 80}
						>
							80
						</button>

						<button
							type="button"
							aria-label="Set line width to 120 characters"
							onClick={() => {
								setLineWidth(120);
								setShowCustom(false);
							}}
							onKeyDown={() => {
								setLineWidth(120);
								setShowCustom(false);
							}}
							disabled={!showCustom && lineWidth === 120}
						>
							120
						</button>

						<button
							type="button"
							aria-label="Set a custom line width"
							onClick={() => setShowCustom(!showCustom)}
							onKeyDown={() => setShowCustom(!showCustom)}
							disabled={showCustom}
						>
							Custom
						</button>
					</div>

					{showCustom && (
						<input
							type="number"
							name="lineWidth"
							id="lineWidth"
							value={lineWidth}
							onChange={(e) => {
								setLineWidth(Number.parseInt(e.target.value));
							}}
						/>
					)}
				</div>
			</div>
		</>
	);
}
