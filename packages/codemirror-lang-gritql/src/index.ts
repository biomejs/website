import {
	type IndentContext,
	LanguageSupport,
	StreamLanguage,
	type StreamParser,
	type StringStream,
} from "@codemirror/language";
import { type Tag, tags as t } from "@lezer/highlight";

/**
 * Maps the token names returned by the tokenizer to highlighting tags.
 *
 * The tokenizer follows the TextMate grammar vendored at
 * `src/grammars/gritql.tmLanguage.json` in the website, so changes to one
 * should usually be mirrored in the other.
 */
const tokenTable = {
	lineComment: t.lineComment,
	blockComment: t.blockComment,
	controlKeyword: t.controlKeyword,
	operatorKeyword: t.operatorKeyword,
	definitionKeyword: t.definitionKeyword,
	moduleKeyword: t.moduleKeyword,
	modifier: t.modifier,
	languageName: t.namespace,
	functionDefinition: t.definition(t.function(t.variableName)),
	parameter: t.definition(t.variableName),
	snippet: t.special(t.string),
	string: t.string,
	regexp: t.regexp,
	escape: t.escape,
	metavariable: t.special(t.variableName),
	annotation: t.annotation,
	number: t.number,
	bool: t.bool,
	null: t.null,
	atom: t.atom,
	builtin: t.standard(t.function(t.variableName)),
	call: t.function(t.variableName),
	propertyName: t.propertyName,
	label: t.labelName,
	operator: t.operator,
	definitionOperator: t.definitionOperator,
	compareOperator: t.compareOperator,
	logicOperator: t.logicOperator,
	arithmeticOperator: t.arithmeticOperator,
	derefOperator: t.derefOperator,
	brace: t.brace,
	paren: t.paren,
	squareBracket: t.squareBracket,
	separator: t.separator,
	punctuation: t.punctuation,
} satisfies Record<string, Tag>;

export type TokenName = keyof typeof tokenTable;

/**
 * A construct the tokenizer is inside of that can span multiple lines.
 */
type Mode =
	/** `/* ... *\/` */
	| "blockComment"
	/** `` `...` `` and `` raw`...` `` */
	| "snippet"
	/** `` r`...` `` */
	| "regexSnippet"
	/** `r"..."` */
	| "regex"
	/** `js"..."` */
	| "languageSnippet"
	/** `"..."`, which ends at the end of the line if unterminated */
	| "string"
	/** The JavaScript body of `function foo() js { ... }` */
	| "foreignFunctionBody";

/**
 * A token that changes how the token right after it is read.
 */
type Prefix =
	/** `raw`, followed by a backtick */
	| "raw"
	/** `r`, followed by a backtick or double quote */
	| "regex"
	/** A language name such as `js`, followed by a double quote */
	| "language"
	/** `js` after a function's parameters, followed by `{` */
	| "foreignFunction";

export interface GritqlState {
	/** `null` when reading regular GritQL. */
	mode: Mode | null;
	/** The mode to go back to when the current block comment ends. */
	commentReturnMode: Mode | null;
	prefix: Prefix | null;
	/** Progress through `engine biome(1.0)` or `language js(typescript, jsx)`. */
	declaration:
		| "engine"
		| "language"
		| "languageName"
		| "languageFlavors"
		| null;
	/** Progress through the head of `pattern foo($a, $b)`. */
	definition: "name" | "paren" | "params" | null;
	definitionIsFunction: boolean;
	/** The parameter list of a `function` definition was just closed. */
	afterFunctionParams: boolean;
	/** The previous token was a `.` followed by a name. */
	expectProperty: boolean;
	/** Brace depth inside a foreign function body. */
	foreignBraceDepth: number;
	/** Bracket depth, used for indentation. */
	depth: number;
}

const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*/;

const LANGUAGE_SNIPPET_PREFIXES = new Set([
	"ast",
	"c",
	"cpp",
	"csharp",
	"css",
	"elixir",
	"go",
	"grit",
	"hcl",
	"html",
	"java",
	"js",
	"json",
	"kotlin",
	"markdown",
	"php",
	"python",
	"ruby",
	"rust",
	"sol",
	"solidity",
	"sql",
	"toml",
	"universal",
	"vue",
	"xml",
	"yaml",
	"zig",
]);

const BUILTINS = new Set([
	"capitalize",
	"distinct",
	"join",
	"length",
	"log",
	"lowercase",
	"random",
	"range",
	"register_diagnostic",
	"resolve",
	"shuffle",
	"spit",
	"split",
	"text",
	"todo",
	"trim",
	"uppercase",
]);

const KEYWORDS = new Map<string, TokenName>([
	["if", "controlKeyword"],
	["else", "controlKeyword"],
	["return", "controlKeyword"],
	["where", "controlKeyword"],
	["until", "controlKeyword"],
	["limit", "controlKeyword"],
	["bubble", "controlKeyword"],
	["sequential", "controlKeyword"],
	["multifile", "controlKeyword"],
	["and", "operatorKeyword"],
	["or", "operatorKeyword"],
	["orelse", "operatorKeyword"],
	["any", "operatorKeyword"],
	["not", "operatorKeyword"],
	["maybe", "operatorKeyword"],
	["some", "operatorKeyword"],
	["every", "operatorKeyword"],
	["contains", "operatorKeyword"],
	["within", "operatorKeyword"],
	["after", "operatorKeyword"],
	["before", "operatorKeyword"],
	["includes", "operatorKeyword"],
	["like", "operatorKeyword"],
	["as", "operatorKeyword"],
	["private", "modifier"],
	["pattern", "definitionKeyword"],
	["predicate", "definitionKeyword"],
	["function", "definitionKeyword"],
	["language", "moduleKeyword"],
	["engine", "moduleKeyword"],
]);

const CONSTANTS = new Map<string, TokenName>([
	["true", "bool"],
	["false", "bool"],
	["undefined", "null"],
	["Top", "atom"],
	["Bottom", "atom"],
]);

/** Words that end an `engine` declaration instead of being part of it. */
const ENGINE_DECLARATION_TERMINATORS = new Set([
	"language",
	"pattern",
	"predicate",
	"function",
	"private",
	"sequential",
	"multifile",
]);

function peekIdentifier(stream: StringStream): string | null {
	const match = stream.match(IDENTIFIER, false);
	return match && typeof match === "object" ? match[0] : null;
}

function tokenBlockComment(
	stream: StringStream,
	state: GritqlState,
): TokenName {
	if (stream.skipTo("*/")) {
		stream.match("*/");
		state.mode = state.commentReturnMode;
		state.commentReturnMode = null;
	} else {
		stream.skipToEnd();
	}
	return "blockComment";
}

function bodyToken(mode: Mode): TokenName {
	switch (mode) {
		case "regex":
		case "regexSnippet":
			return "regexp";
		case "string":
			return "string";
		default:
			return "snippet";
	}
}

/**
 * Snippets, strings, and regexes.
 */
function tokenDelimited(
	stream: StringStream,
	state: GritqlState,
	mode: Mode,
): TokenName {
	const close = mode === "snippet" || mode === "regexSnippet" ? "`" : '"';
	const body = bodyToken(mode);

	if (stream.eat(close)) {
		state.mode = null;
		return body;
	}

	const escapePattern =
		mode === "string" || mode === "languageSnippet"
			? /^\\(?:u[0-9A-Fa-f]{4}|.)/
			: /^\\./;
	if (stream.match(escapePattern)) {
		return "escape";
	}

	const interpolates = mode !== "string" && mode !== "regex";
	if (
		interpolates &&
		(stream.match(/^\$\[[A-Za-z_][A-Za-z0-9_]*\]/) ||
			stream.match(/^\$(?:\.\.\.|_(?![A-Za-z0-9_])|[A-Za-z_][A-Za-z0-9_]*)/))
	) {
		return "metavariable";
	}

	if (
		!stream.eatWhile(
			(ch) => ch !== close && ch !== "\\" && (!interpolates || ch !== "$"),
		)
	) {
		stream.next();
	}
	return body;
}

/**
 * Embedded JavaScript isn't highlighted, but braces are balanced to find the
 * end of the body. Like the TextMate grammar's fallback, this doesn't account
 * for braces inside JavaScript strings.
 */
function tokenForeignFunctionBody(
	stream: StringStream,
	state: GritqlState,
): TokenName | null {
	if (stream.match("//")) {
		stream.skipToEnd();
		return "lineComment";
	}
	if (stream.match("/*")) {
		state.mode = "blockComment";
		state.commentReturnMode = "foreignFunctionBody";
		return tokenBlockComment(stream, state);
	}

	const ch = stream.next();
	if (ch === "{") {
		state.foreignBraceDepth++;
	} else if (ch === "}") {
		state.foreignBraceDepth--;
		if (state.foreignBraceDepth === 0) {
			state.mode = null;
			return "brace";
		}
	} else {
		stream.eatWhile((c) => c !== "{" && c !== "}" && c !== "/");
	}
	return null;
}

/**
 * Returns `undefined` when the declaration has ended and the token should be
 * read as regular GritQL.
 */
function tokenDeclaration(
	stream: StringStream,
	state: GritqlState,
): TokenName | undefined {
	switch (state.declaration) {
		case "engine": {
			if (stream.match(/^[0-9]+(?:\.[0-9]+)?/)) {
				return "number";
			}
			if (stream.eat("(")) {
				state.depth++;
				return "paren";
			}
			if (stream.eat(")")) {
				state.depth = Math.max(0, state.depth - 1);
				state.declaration = null;
				return "paren";
			}
			const word = peekIdentifier(stream);
			if (word !== null && !ENGINE_DECLARATION_TERMINATORS.has(word)) {
				stream.match(IDENTIFIER);
				return "languageName";
			}
			break;
		}
		case "language": {
			if (stream.match(IDENTIFIER)) {
				state.declaration = "languageName";
				return "languageName";
			}
			break;
		}
		case "languageName": {
			if (stream.eat("(")) {
				state.depth++;
				state.declaration = "languageFlavors";
				return "paren";
			}
			break;
		}
		case "languageFlavors": {
			if (stream.match(IDENTIFIER)) {
				return "languageName";
			}
			if (stream.eat(",")) {
				return "separator";
			}
			if (stream.eat(")")) {
				state.depth = Math.max(0, state.depth - 1);
				state.declaration = null;
				return "paren";
			}
			break;
		}
	}

	state.declaration = null;
	return undefined;
}

/**
 * Returns `undefined` when the token should be read as regular GritQL.
 */
function tokenDefinition(
	stream: StringStream,
	state: GritqlState,
): TokenName | undefined {
	switch (state.definition) {
		case "name": {
			// The keyword's lookahead guarantees a name and `(` follow.
			stream.match(IDENTIFIER);
			state.definition = "paren";
			return "functionDefinition";
		}
		case "paren": {
			stream.eat("(");
			state.depth++;
			state.definition = "params";
			return "paren";
		}
		case "params": {
			if (stream.match(/^\$[A-Za-z0-9_]+/)) {
				return "parameter";
			}
			if (stream.eat(",")) {
				return "separator";
			}
			if (stream.eat(")")) {
				state.depth = Math.max(0, state.depth - 1);
				state.definition = null;
				state.afterFunctionParams = state.definitionIsFunction;
				return "paren";
			}
			break;
		}
	}
	return undefined;
}

function tokenWord(
	stream: StringStream,
	state: GritqlState,
	word: string,
	expectProperty: boolean,
	afterFunctionParams: boolean,
): TokenName | null {
	const next = stream.peek();
	if (next === "`" && (word === "raw" || word === "r")) {
		state.prefix = word === "raw" ? "raw" : "regex";
		return "modifier";
	}
	if (next === '"' && (word === "r" || LANGUAGE_SNIPPET_PREFIXES.has(word))) {
		state.prefix = word === "r" ? "regex" : "language";
		return "modifier";
	}

	if (expectProperty) {
		return "propertyName";
	}

	if (afterFunctionParams && word === "js" && stream.match(/^\s*\{/, false)) {
		state.prefix = "foreignFunction";
		return "languageName";
	}

	if (stream.match(/^\s*:/, false)) {
		return "propertyName";
	}
	if (stream.match(/^\s*=(?![=>])/, false)) {
		return "label";
	}

	const constant = CONSTANTS.get(word);
	if (constant !== undefined) {
		return constant;
	}

	const keyword = KEYWORDS.get(word);
	if (stream.match(/^\s*\(/, false)) {
		if (BUILTINS.has(word)) {
			return "builtin";
		}
		if (keyword === undefined) {
			return "call";
		}
	}

	if (keyword === undefined) {
		return null;
	}

	if (word === "engine") {
		state.declaration = "engine";
	} else if (word === "language") {
		state.declaration = "language";
	} else if (
		keyword === "definitionKeyword" &&
		stream.match(/^\s+[A-Za-z_][A-Za-z0-9_]*\s*\(/, false)
	) {
		state.definition = "name";
		state.definitionIsFunction = word === "function";
	}
	return keyword;
}

function tokenOperatorOrPunctuation(
	stream: StringStream,
	state: GritqlState,
): TokenName | null {
	if (stream.match("=>") || stream.match("<:")) {
		return "operator";
	}
	if (stream.match("+=")) {
		return "definitionOperator";
	}
	if (stream.match(/^(?:==|!=|<=|>=|<|>)/)) {
		return "compareOperator";
	}
	if (stream.eat("=")) {
		return "definitionOperator";
	}
	if (stream.eat("!")) {
		return "logicOperator";
	}
	if (stream.match("...")) {
		return "operator";
	}
	if (stream.eat(".")) {
		state.expectProperty = peekIdentifier(stream) !== null;
		return "derefOperator";
	}
	if (stream.eat(/[-+*/%]/)) {
		return "arithmeticOperator";
	}

	const ch = stream.next();
	switch (ch) {
		case "{":
		case "(":
		case "[":
			state.depth++;
			return ch === "{" ? "brace" : ch === "(" ? "paren" : "squareBracket";
		case "}":
		case ")":
		case "]":
			state.depth = Math.max(0, state.depth - 1);
			return ch === "}" ? "brace" : ch === ")" ? "paren" : "squareBracket";
		case ",":
		case ";":
			return "separator";
		case ":":
			return "punctuation";
		default:
			return null;
	}
}

function token(stream: StringStream, state: GritqlState): TokenName | null {
	if (state.mode === "string" && stream.sol()) {
		state.mode = null;
	}

	switch (state.mode) {
		case null:
			break;
		case "blockComment":
			return tokenBlockComment(stream, state);
		case "foreignFunctionBody":
			if (stream.eatSpace()) {
				return null;
			}
			return tokenForeignFunctionBody(stream, state);
		default:
			return tokenDelimited(stream, state, state.mode);
	}

	if (stream.eatSpace()) {
		return null;
	}

	if (stream.match("//")) {
		stream.skipToEnd();
		return "lineComment";
	}
	if (stream.match("/*")) {
		state.mode = "blockComment";
		state.commentReturnMode = null;
		return tokenBlockComment(stream, state);
	}

	// Whitespace and comments don't reset any of this.
	const { prefix, expectProperty, afterFunctionParams } = state;
	state.prefix = null;
	state.expectProperty = false;
	state.afterFunctionParams = false;

	if (prefix === "foreignFunction") {
		stream.eat("{");
		state.mode = "foreignFunctionBody";
		state.foreignBraceDepth = 1;
		return "brace";
	}
	if (prefix !== null) {
		// The opening delimiter, which is guaranteed to follow the prefix.
		const delimiter = stream.next();
		if (prefix === "raw") {
			state.mode = "snippet";
		} else if (prefix === "language") {
			state.mode = "languageSnippet";
		} else {
			state.mode = delimiter === "`" ? "regexSnippet" : "regex";
		}
		return bodyToken(state.mode);
	}

	if (state.declaration !== null) {
		const style = tokenDeclaration(stream, state);
		if (style !== undefined) {
			return style;
		}
	}

	if (state.definition !== null) {
		const style = tokenDefinition(stream, state);
		if (style !== undefined) {
			return style;
		}
	}

	if (stream.eat("`")) {
		state.mode = "snippet";
		return "snippet";
	}
	if (stream.eat('"')) {
		state.mode = "string";
		return "string";
	}

	if (stream.match(/^@[A-Za-z][A-Za-z0-9]*/)) {
		return "annotation";
	}

	if (
		stream.match(/^\$(?:\.\.\.|_(?![A-Za-z0-9_]))/) ||
		stream.match(/^[$^][A-Za-z0-9_]+/)
	) {
		return "metavariable";
	}

	const before = stream.string.charAt(stream.pos - 1);
	if (
		!/[A-Za-z0-9_$.]/.test(before) &&
		stream.match(
			/^-?[0-9]+(?:\.[0-9]+(?:[eE][+-]?[0-9]+)?|[eE][+-]?[0-9]+)?(?![A-Za-z0-9_])/,
		)
	) {
		return "number";
	}

	if (stream.match(IDENTIFIER)) {
		return tokenWord(
			stream,
			state,
			stream.current(),
			expectProperty,
			afterFunctionParams,
		);
	}

	return tokenOperatorOrPunctuation(stream, state);
}

export const gritqlStreamParser: StreamParser<GritqlState> = {
	name: "gritql",
	startState: () => ({
		mode: null,
		commentReturnMode: null,
		prefix: null,
		declaration: null,
		definition: null,
		definitionIsFunction: false,
		afterFunctionParams: false,
		expectProperty: false,
		foreignBraceDepth: 0,
		depth: 0,
	}),
	token,
	indent(state: GritqlState, textAfter: string, context: IndentContext) {
		if (state.mode !== null && state.mode !== "foreignFunctionBody") {
			return null;
		}
		const closing = /^\s*[}\])]/.test(textAfter) ? 1 : 0;
		return (
			context.unit *
			Math.max(0, state.depth + state.foreignBraceDepth - closing)
		);
	},
	languageData: {
		commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
		closeBrackets: { brackets: ["(", "[", "{", '"', "`"] },
	},
	tokenTable,
};

export const gritqlLanguage = StreamLanguage.define(gritqlStreamParser);

/**
 * GritQL language support for CodeMirror.
 */
export function gritql(): LanguageSupport {
	return new LanguageSupport(gritqlLanguage);
}
