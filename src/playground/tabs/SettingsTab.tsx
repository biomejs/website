import type {
	RuleDomain,
	RuleDomains,
	RuleDomainValue,
} from "@biomejs/wasm-web";
import { type Dispatch, type SetStateAction, useId, useState } from "react";
import EnumSelect from "@/playground/components/EnumSelect";
import { LINT_RULES } from "@/playground/generated/lintRules.ts";
import {
	ArrowParentheses,
	AttributePosition,
	Expand,
	IndentStyle,
	type LintRule,
	OperatorLinebreak,
	type PlaygroundState,
	QuoteProperties,
	QuoteStyle,
	Semicolons,
	TrailingCommas,
	WhitespaceSensitivity,
} from "@/playground/types.ts";
import { createPlaygroundSettingsSetter } from "@/playground/utils";

export interface SettingsTabProps {
	state: PlaygroundState;
	setPlaygroundState: Dispatch<SetStateAction<PlaygroundState>>;
}

export default function SettingsTab({
	setPlaygroundState,
	state: {
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
			operatorLinebreak,
			bracketSpacing,
			bracketSameLine,
			expand,
			indentScriptAndStyle,
			whitespaceSensitivity,
			lintRules,
			enabledLinting,
			enabledAssist,
			unsafeParameterDecoratorsEnabled,
			allowComments,
			attributePosition,
			ruleDomains,
			experimentalEmbeddedSnippetsEnabled,
			experimentalFullSupportEnabled,
			cssModules,
			tailwindDirectives,
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
	const setOperatorLinebreak = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"operatorLinebreak",
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

	const setExperimentalEmbeddedSnippetsEnabled = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"experimentalEmbeddedSnippetsEnabled",
	);

	const setExperimentalFullSupportEnabled = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"experimentalFullSupportEnabled",
	);

	const setCssModules = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"cssModules",
	);

	const setTailwindDirectives = createPlaygroundSettingsSetter(
		setPlaygroundState,
		"tailwindDirectives",
	);

	return (
		<div className="settings-tab">
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
				operatorLinebreak={operatorLinebreak}
				setOperatorLinebreak={setOperatorLinebreak}
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
				ruleDomains={ruleDomains}
				setRuleDomains={setRuleDomains}
			/>
			<AssistSettings
				enabledAssist={enabledAssist}
				setEnabledAssist={setEnabledAssist}
			/>
			<SyntaxSettings
				unsafeParameterDecoratorsEnabled={unsafeParameterDecoratorsEnabled}
				allowComments={allowComments}
				setUnsafeParameterDecoratorsEnabled={
					setUnsafeParameterDecoratorsEnabled
				}
				setAllowComments={setAllowComments}
				experimentalEmbeddedSnippetsEnabled={
					experimentalEmbeddedSnippetsEnabled
				}
				setExperimentalEmbeddedSnippetsEnabled={
					setExperimentalEmbeddedSnippetsEnabled
				}
				experimentalFullSupportEnabled={experimentalFullSupportEnabled}
				setExperimentalFullSupportEnabled={setExperimentalFullSupportEnabled}
				cssModules={cssModules}
				setCssModules={setCssModules}
				tailwindDirectives={tailwindDirectives}
				setTailwindDirectives={setTailwindDirectives}
			/>
		</div>
	);
}

function SyntaxSettings({
	unsafeParameterDecoratorsEnabled,
	setUnsafeParameterDecoratorsEnabled,
	setAllowComments,
	allowComments,
	experimentalEmbeddedSnippetsEnabled,
	setExperimentalEmbeddedSnippetsEnabled,
	experimentalFullSupportEnabled,
	setExperimentalFullSupportEnabled,
	cssModules,
	setCssModules,
	tailwindDirectives,
	setTailwindDirectives,
}: {
	unsafeParameterDecoratorsEnabled: boolean;
	allowComments: boolean;
	setUnsafeParameterDecoratorsEnabled: (value: boolean) => void;
	setAllowComments: (value: boolean) => void;
	experimentalEmbeddedSnippetsEnabled: boolean;
	setExperimentalEmbeddedSnippetsEnabled: (value: boolean) => void;
	experimentalFullSupportEnabled: boolean;
	setExperimentalFullSupportEnabled: (value: boolean) => void;
	cssModules: boolean;
	setCssModules: (value: boolean) => void;
	tailwindDirectives: boolean;
	setTailwindDirectives: (value: boolean) => void;
}) {
	const allowCommentsId = useId();
	const decoratorsId = useId();
	const experimentalEmbeddedSnippetsId = useId();
	const experimentalFullSupportId = useId();
	const cssModulesId = useId();
	const tailwindDirectivesId = useId();
	return (
		<>
			<h2>Parser options</h2>
			<section>
				<div className="field-row">
					<input
						id={decoratorsId}
						name="parameter-decorators"
						type="checkbox"
						checked={unsafeParameterDecoratorsEnabled}
						onChange={(e) =>
							setUnsafeParameterDecoratorsEnabled(e.target.checked)
						}
					/>
					<label htmlFor={decoratorsId}>Parameter decorators enabled</label>
				</div>
				<div className="field-row">
					<input
						id={allowCommentsId}
						name="allow-comments"
						type="checkbox"
						checked={allowComments}
						onChange={(e) => setAllowComments(e.target.checked)}
					/>
					<label htmlFor={allowCommentsId}>Allow comments in JSON files</label>
				</div>
				<div className="field-row">
					<input
						id={experimentalEmbeddedSnippetsId}
						name="experimental-embedded-snippets"
						type="checkbox"
						checked={experimentalEmbeddedSnippetsEnabled}
						onChange={(e) =>
							setExperimentalEmbeddedSnippetsEnabled(e.target.checked)
						}
					/>
					<label htmlFor={experimentalEmbeddedSnippetsId}>
						Experimental embedded snippets support
					</label>
				</div>
				<div className="field-row">
					<input
						id={experimentalFullSupportId}
						name="experimental-full-support"
						type="checkbox"
						checked={experimentalFullSupportEnabled}
						onChange={(e) =>
							setExperimentalFullSupportEnabled(e.target.checked)
						}
					/>
					<label htmlFor={experimentalFullSupportId}>
						Experimental HTML-ish full support
					</label>
				</div>
				<div className="field-row">
					<input
						id={cssModulesId}
						name="css-modules"
						type="checkbox"
						checked={cssModules}
						onChange={(e) => setCssModules(e.target.checked)}
					/>
					<label htmlFor={cssModulesId}>CSS Modules</label>
				</div>
				<div className="field-row">
					<input
						id={tailwindDirectivesId}
						name="tailwind-directives"
						type="checkbox"
						checked={tailwindDirectives}
						onChange={(e) => setTailwindDirectives(e.target.checked)}
					/>
					<label htmlFor={tailwindDirectivesId}>Tailwind v4</label>
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
	operatorLinebreak,
	setOperatorLinebreak,
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
	operatorLinebreak: OperatorLinebreak;
	setOperatorLinebreak: (value: OperatorLinebreak) => void;
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
	const indentStyleId = useId();
	const indentWidthId = useId();
	const quoteStyleId = useId();
	const jsxQuoteStyleId = useId();
	const quotePropertiesId = useId();
	const trailingCommasId = useId();
	const semicolonsId = useId();
	const arrowParenthesesId = useId();
	const operatorLinebreakId = useId();
	const attributePositionId = useId();
	const bracketSpacingId = useId();
	const bracketSameLineId = useId();
	const expandId = useId();
	const indentScriptAndStyleId = useId();
	const whitespaceSensitivityId = useId();
	return (
		<>
			<h2>Formatter options</h2>
			<section>
				<LineWidthInput lineWidth={lineWidth} setLineWidth={setLineWidth} />

				<div className="field-row">
					<label htmlFor={indentStyleId}>Indent Style</label>
					<EnumSelect
						id={indentStyleId}
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
					<label htmlFor={indentWidthId}>Indent Width</label>
					<input
						type="number"
						name="indentWidth"
						id={indentWidthId}
						value={indentWidth}
						onChange={(e) => {
							setIndentWidth(Number.parseInt(e.target.value, 10));
						}}
					/>
				</div>

				<div className="field-row">
					<label htmlFor={quoteStyleId}>Quote Style</label>
					<EnumSelect
						id={quoteStyleId}
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
					<label htmlFor={jsxQuoteStyleId}>Jsx Quote Style</label>
					<EnumSelect
						id={jsxQuoteStyleId}
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
					<label htmlFor={quotePropertiesId}>Quote Properties</label>
					<EnumSelect
						id={quotePropertiesId}
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
					<label htmlFor={trailingCommasId}>Trailing Commas</label>
					<EnumSelect
						id={trailingCommasId}
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
					<label htmlFor={semicolonsId}>Semicolons</label>
					<EnumSelect
						id={semicolonsId}
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
					<label htmlFor={arrowParenthesesId}>Arrow Parentheses</label>
					<EnumSelect
						id={arrowParenthesesId}
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
					<label htmlFor={operatorLinebreakId}>Operator Linebreak</label>
					<EnumSelect
						id={operatorLinebreakId}
						name="operatorLinebreak"
						options={{
							[OperatorLinebreak.After]: "After",
							[OperatorLinebreak.Before]: "Before",
						}}
						value={operatorLinebreak ?? OperatorLinebreak.After}
						onChangeValue={setOperatorLinebreak}
					/>
				</div>
				<div className="field-row">
					<label htmlFor={attributePositionId}>Attribute Position</label>
					<EnumSelect
						id={attributePositionId}
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
					<label htmlFor={bracketSpacingId}>Bracket Spacing</label>
					<input
						id={bracketSpacingId}
						name="bracketSpacing"
						type="checkbox"
						checked={bracketSpacing}
						onChange={(e) => setBracketSpacing(e.target.checked)}
					/>
				</div>
				<div className="field-row">
					<label htmlFor={bracketSameLineId}>Bracket Same Line</label>
					<input
						id={bracketSameLineId}
						name="bracketSameLine"
						type="checkbox"
						checked={bracketSameLine}
						onChange={(e) => setBracketSameLine(e.target.checked)}
					/>
				</div>
				<div className="field-row">
					<label htmlFor={expandId}>Expand</label>
					<EnumSelect
						id={expandId}
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
					<label htmlFor={indentScriptAndStyleId}>
						Indent Script And Style
					</label>
					<input
						id={indentScriptAndStyleId}
						name="indentScriptAndStyle"
						type="checkbox"
						checked={indentScriptAndStyle}
						onChange={(e) => setIndentScriptAndStyle(e.target.checked)}
					/>
				</div>
				<div className="field-row">
					<label htmlFor={whitespaceSensitivityId}>
						Whitespace Sensitivity
					</label>
					<select
						id={whitespaceSensitivityId}
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
	ruleDomains,
	setRuleDomains,
}: {
	lintRules: LintRule;
	setLintRules: (value: LintRule) => void;
	enabledLinting: boolean;
	setEnabledLinting: (value: boolean) => void;
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
		{ id: "project", label: "Project Rules" },
	];

	const domainValues: RuleDomainValue[] = ["all", "recommended", "none"];
	const lintingEnabled = useId();
	const lintRulesId = useId();
	return (
		<>
			<h2>Linter options</h2>
			<section>
				<div className="field-row">
					<input
						id={lintingEnabled}
						name="linting-enabled"
						type="checkbox"
						checked={enabledLinting}
						onChange={(e) => setEnabledLinting(e.target.checked)}
					/>
					<label htmlFor={lintingEnabled}>Linter enabled</label>
				</div>

				<div className="field-row">
					<label htmlFor={lintRulesId}>Lint Rules</label>
					<select
						id={lintRulesId}
						aria-describedby="lint-rules-description"
						name="lint-rules"
						disabled={!enabledLinting}
						value={lintRules}
						onChange={(e) => setLintRules(e.target.value as LintRule)}
					>
						{Object.entries(LINT_RULES).map(([name, value]) =>
							typeof value === "object" ? (
								<optgroup key={name} label={name}>
									{Object.values(value).map((value) => (
										<option value={value} key={value}>
											{value}
										</option>
									))}
								</optgroup>
							) : (
								<option value={value} key={value}>
									{value}
								</option>
							),
						)}
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
	const assistEnabledId = useId();
	return (
		<>
			<h2>Assist options</h2>
			<section>
				<div className="field-row">
					<input
						id={assistEnabledId}
						name="assist-enabled"
						type="checkbox"
						checked={enabledAssist}
						onChange={(e) => setEnabledAssist(e.target.checked)}
					/>
					<label htmlFor={assistEnabledId}>Assist enabled</label>
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
	const lineWidthId = useId();

	return (
		<div className="field-row">
			<label htmlFor={lineWidthId}>Line Width</label>

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
						id={lineWidthId}
						value={lineWidth}
						onChange={(e) => {
							setLineWidth(Number.parseInt(e.target.value, 10));
						}}
					/>
				)}
			</div>
		</div>
	);
}
