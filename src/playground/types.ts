import type {
	Diagnostic,
	FixFileMode,
	RuleDomain,
	RuleDomainValue,
} from "@biomejs/wasm-web";
import type { parser } from "codemirror-lang-rome-ast";
import type { Dispatch, SetStateAction } from "react";

export enum PlaygroundTab {
	Code = "code",
	Diagnostics = "diagnostics",
	Formatter = "formatter",
	FormatterIr = "formatter-ir",
	Syntax = "syntax",
	ControlFlowGraph = "control-flow-graph",
	Console = "console",
	Settings = "settings",
	AnalyzerFixes = "analyzer-fixes",
}

export type { Options as PrettierOptions } from "prettier";

export enum IndentStyle {
	Tab = "tab",
	Space = "space",
}

export enum SourceType {
	Module = "module",
	Script = "script",
}

export enum QuoteStyle {
	Double = "double",
	Single = "single",
}

export enum LintRules {
	Recommended = "recommended",
	All = "all",
}

export enum QuoteProperties {
	AsNeeded = "as-needed",
	Preserve = "preserve",
}

export enum TrailingCommas {
	All = "all",
	Es5 = "es5",
	None = "none",
}

export enum LoadingState {
	Loading = 0,
	Success = 1,
	Error = 2,
}

export enum Semicolons {
	Always = "always",
	AsNeeded = "as-needed",
}

export enum ArrowParentheses {
	Always = "always",
	AsNeeded = "as-needed",
}

export enum AttributePosition {
	Auto = "auto",
	Multiline = "multiline",
}

export enum Expand {
	Auto = "auto",
	Always = "always",
	Never = "never",
}

export enum WhitespaceSensitivity {
	Css = "css",
	Strict = "strict",
	Ignore = "ignore",
}

export type PrettierOutput =
	| { type: "SUCCESS"; code: string; ir: string }
	| { type: "ERROR"; stack: string };

export const emptyPrettierOutput: PrettierOutput = {
	type: "SUCCESS",
	code: "",
	ir: "",
};

export interface BiomeOutput {
	syntax: {
		ast: string;
		cst: string;
	};
	diagnostics: {
		console: string;
		list: Diagnostic[];
	};
	formatter: {
		code: string;
		ir: string;
	};
	analysis: {
		controlFlowGraph: string;
		/** The snippet with lint fixes applied. */
		fixed: string;
	};
}

export const emptyBiomeOutput: BiomeOutput = {
	syntax: {
		ast: "",
		cst: "",
	},
	diagnostics: {
		console: "",
		list: [],
	},
	formatter: {
		code: "",
		ir: "",
	},
	analysis: {
		controlFlowGraph: "",
		fixed: "",
	},
};

export interface PlaygroundSettings {
	lineWidth: number;
	indentStyle: IndentStyle;
	indentWidth: number;
	quoteStyle: QuoteStyle;
	jsxQuoteStyle: QuoteStyle;
	quoteProperties: QuoteProperties;
	trailingCommas: TrailingCommas;
	semicolons: Semicolons;
	arrowParentheses: ArrowParentheses;
	attributePosition: AttributePosition;
	bracketSpacing: boolean;
	bracketSameLine: boolean;
	expand: Expand;
	lintRules: LintRules;
	enabledLinting: boolean;
	analyzerFixMode: FixFileMode;
	enabledAssist: boolean;
	unsafeParameterDecoratorsEnabled: boolean;
	allowComments: boolean;
	ruleDomains: Record<RuleDomain, RuleDomainValue>;
	indentScriptAndStyle: boolean;
	whitespaceSensitivity: WhitespaceSensitivity;
}

export interface PlaygroundFileState {
	content: string;
	prettier: PrettierOutput;
	biome: BiomeOutput;
}

export interface PlaygroundState {
	currentFile: string;
	singleFileMode: boolean;
	tab: PlaygroundTab;
	cursorPosition: number;
	files: Record<string, undefined | PlaygroundFileState>;
	settings: PlaygroundSettings;
}

export const defaultPlaygroundState: PlaygroundState = {
	cursorPosition: 0,
	tab: PlaygroundTab.Formatter,
	currentFile: "main.tsx",
	singleFileMode: false,
	files: {
		"main.tsx": {
			content: "",
			prettier: emptyPrettierOutput,
			biome: emptyBiomeOutput,
		},
	},
	settings: {
		lineWidth: 80,
		indentWidth: 2,
		indentStyle: IndentStyle.Tab,
		quoteStyle: QuoteStyle.Double,
		jsxQuoteStyle: QuoteStyle.Double,
		quoteProperties: QuoteProperties.AsNeeded,
		trailingCommas: TrailingCommas.All,
		semicolons: Semicolons.Always,
		arrowParentheses: ArrowParentheses.Always,
		attributePosition: AttributePosition.Auto,
		bracketSpacing: true,
		bracketSameLine: false,
		expand: Expand.Auto,
		lintRules: LintRules.Recommended,
		enabledLinting: true,
		analyzerFixMode: "safeFixes",
		enabledAssist: true,
		unsafeParameterDecoratorsEnabled: true,
		allowComments: true,
		ruleDomains: {},
		indentScriptAndStyle: false,
		whitespaceSensitivity: WhitespaceSensitivity.Css,
	},
};

export interface PlaygroundProps {
	setPlaygroundState: Dispatch<SetStateAction<PlaygroundState>>;
	resetPlaygroundState: () => void;
	playgroundState: PlaygroundState;
}

export type Tree = ReturnType<typeof parser.parse>;
type RangeMapKey = [number, number];
type RangeMapValue = [number, number];
export interface BiomeAstSyntacticData {
	ast: Tree;
	// key is range of original `SyntaxToken`, value is the range string, like `20..20` corresponding range in
	// `biome_xx_ast` `Display` string.
	rangeMap: Map<RangeMapKey, RangeMapValue>;
}
