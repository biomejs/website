import type {
	Diagnostic,
	FixFileMode,
	GritTargetLanguage,
	RuleDomains,
} from "@biomejs/wasm-web";
import type { parser } from "codemirror-lang-rome-ast";
import type { Dispatch, SetStateAction } from "react";
import { LINT_RULES } from "@/playground/generated/lintRules.ts";

export const PlaygroundTab = {
	Code: "code",
	Diagnostics: "diagnostics",
	Formatter: "formatter",
	FormatterIr: "formatter-ir",
	Syntax: "syntax",
	ControlFlowGraph: "control-flow-graph",
	Console: "console",
	Settings: "settings",
	AnalyzerFixes: "analyzer-fixes",
	TypesIr: "types-ir",
	TypesRegistered: "types-registered",
	SemanticModel: "semantic-model",
	GritQL: "gritql",
} as const;
export type PlaygroundTab = (typeof PlaygroundTab)[keyof typeof PlaygroundTab];

export const PLAYGROUND_PANE = {
	diagnostics: "Diagnostics",
	console: "Console",
	gritql: "GritQL",
} as const;

type Pane = typeof PLAYGROUND_PANE;

export type PlaygroundPaneKey = keyof Pane;
export type PlaygroundPane = Pane[keyof Pane];

export type PrettierOptions = import("prettier").Options & {
	experimentalOperatorPosition?: "start" | "end";
};

export const IndentStyle = {
	Tab: "tab",
	Space: "space",
} as const;
export type IndentStyle = (typeof IndentStyle)[keyof typeof IndentStyle];

export const SourceType = {
	Module: "module",
	Script: "script",
} as const;
export type SourceType = (typeof SourceType)[keyof typeof SourceType];

export const QuoteStyle = {
	Double: "double",
	Single: "single",
} as const;
export type QuoteStyle = (typeof QuoteStyle)[keyof typeof QuoteStyle];

export const QuoteProperties = {
	AsNeeded: "as-needed",
	Preserve: "preserve",
} as const;
export type QuoteProperties =
	(typeof QuoteProperties)[keyof typeof QuoteProperties];

export const TrailingCommas = {
	All: "all",
	Es5: "es5",
	None: "none",
} as const;
export type TrailingCommas =
	(typeof TrailingCommas)[keyof typeof TrailingCommas];

export const LoadingState = {
	Loading: 0,
	Success: 1,
	Error: 2,
} as const;
export type LoadingState = (typeof LoadingState)[keyof typeof LoadingState];

export const Semicolons = {
	Always: "always",
	AsNeeded: "as-needed",
} as const;
export type Semicolons = (typeof Semicolons)[keyof typeof Semicolons];

export const ArrowParentheses = {
	Always: "always",
	AsNeeded: "as-needed",
} as const;
export type ArrowParentheses =
	(typeof ArrowParentheses)[keyof typeof ArrowParentheses];

export const OperatorLinebreak = {
	After: "after",
	Before: "before",
} as const;
export type OperatorLinebreak =
	(typeof OperatorLinebreak)[keyof typeof OperatorLinebreak];

export const AttributePosition = {
	Auto: "auto",
	Multiline: "multiline",
} as const;
export type AttributePosition =
	(typeof AttributePosition)[keyof typeof AttributePosition];

export const Expand = {
	Auto: "auto",
	Always: "always",
	Never: "never",
} as const;
export type Expand = (typeof Expand)[keyof typeof Expand];

export const WhitespaceSensitivity = {
	Css: "css",
	Strict: "strict",
	Ignore: "ignore",
} as const;
export type WhitespaceSensitivity =
	(typeof WhitespaceSensitivity)[keyof typeof WhitespaceSensitivity];

export type PrettierOutput =
	| {
			type: "SUCCESS";
			code: string;
			ir: string;
	  }
	| {
			type: "ERROR";
			stack: string;
	  };

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
		semanticModel: string;
		/** The snippet with lint fixes applied. */
		fixed: string;
	};
	types: {
		ir: string;
		registered: string;
	};
	gritQuery: {
		matches: [number, number][];
		error: string | undefined;
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
		semanticModel: "",
		fixed: "",
	},
	types: {
		ir: "",
		registered: "",
	},
	gritQuery: {
		matches: [],
		error: undefined,
	},
};

export const LANGUAGE = {
	JS: "js",
	JSX: "jsx",
	TS: "ts",
	TSX: "tsx",
	JSON: "json",
	GraphQL: "graphql",
	Grit: "grit",
	CSS: "css",
	HTML: "html",
	Vue: "vue",
	Svelte: "svelte",
	Astro: "astro",
	Markdown: "md",
} as const;

export type Language = (typeof LANGUAGE)[keyof typeof LANGUAGE];

export type LintRule =
	| keyof typeof LINT_RULES
	| keyof (typeof LINT_RULES)[keyof typeof LINT_RULES];

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
	operatorLinebreak: OperatorLinebreak;
	attributePosition: AttributePosition;
	bracketSpacing: boolean;
	bracketSameLine: boolean;
	expand: Expand;
	lintRules: LintRule;
	enabledLinting: boolean;
	analyzerFixMode: FixFileMode;
	enabledAssist: boolean;
	unsafeParameterDecoratorsEnabled: boolean;
	allowComments: boolean;
	ruleDomains: RuleDomains;
	indentScriptAndStyle: boolean;
	whitespaceSensitivity: WhitespaceSensitivity;
	experimentalEmbeddedSnippetsEnabled: boolean;
	experimentalFullSupportEnabled: boolean;
	cssModules: boolean;
	tailwindDirectives: boolean;
	gritTargetLanguage: GritTargetLanguage;
}

export interface PlaygroundFileState {
	content: string;
	prettier: PrettierOutput;
	biome: BiomeOutput;
	gritQuery?: string;
}

export interface PlaygroundState {
	currentFile: string;
	singleFileMode: boolean;
	tab: PlaygroundTab;
	pane: PlaygroundPane;
	cursorPosition: number;
	files: Record<string, undefined | PlaygroundFileState>;
	settings: PlaygroundSettings;
}

export const defaultPlaygroundState: PlaygroundState = {
	cursorPosition: 0,
	tab: PlaygroundTab.Formatter,
	pane: PLAYGROUND_PANE.diagnostics,
	currentFile: "main.tsx",
	singleFileMode: true,
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
		operatorLinebreak: OperatorLinebreak.After,
		attributePosition: AttributePosition.Auto,
		bracketSpacing: true,
		bracketSameLine: false,
		expand: Expand.Auto,
		lintRules: LINT_RULES.recommended,
		enabledLinting: true,
		analyzerFixMode: "safeFixes",
		enabledAssist: true,
		unsafeParameterDecoratorsEnabled: true,
		allowComments: true,
		ruleDomains: {},
		indentScriptAndStyle: false,
		whitespaceSensitivity: WhitespaceSensitivity.Css,
		experimentalEmbeddedSnippetsEnabled: true,
		experimentalFullSupportEnabled: true,
		cssModules: false,
		tailwindDirectives: true,
		gritTargetLanguage: "JavaScript",
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
