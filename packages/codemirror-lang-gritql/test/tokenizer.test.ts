import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type IndentContext, StringStream } from "@codemirror/language";
import {
	type GritqlState,
	gritqlStreamParser as parser,
	type TokenName,
} from "../src/index.ts";

type Token = [text: string, style: TokenName];

function run(source: string): { tokens: Token[]; state: GritqlState } {
	const state = parser.startState!(2);
	const tokens: Token[] = [];

	for (const line of source.split("\n")) {
		const stream = new StringStream(line, 4, 2);
		while (!stream.eol()) {
			const style = parser.token(stream, state) as TokenName | null;
			assert.ok(
				stream.pos > stream.start,
				`tokenizer didn't advance at ${JSON.stringify(line.slice(stream.start))}`,
			);
			if (style !== null) {
				tokens.push([stream.current(), style]);
			}
			stream.start = stream.pos;
		}
	}

	return { tokens, state };
}

function tokenize(source: string): Token[] {
	return run(source).tokens;
}

describe("comments", () => {
	it("tokenizes line comments", () => {
		assert.deepEqual(tokenize("$x // hello `world`"), [
			["$x", "metavariable"],
			["// hello `world`", "lineComment"],
		]);
	});

	it("tokenizes block comments across lines", () => {
		const { tokens, state } = run("/* a\nb */ $x");
		assert.deepEqual(tokens, [
			["/* a", "blockComment"],
			["b */", "blockComment"],
			["$x", "metavariable"],
		]);
		assert.equal(state.mode, null);
	});
});

describe("declarations", () => {
	it("tokenizes engine declarations", () => {
		assert.deepEqual(tokenize("engine biome(1.0)"), [
			["engine", "moduleKeyword"],
			["biome", "languageName"],
			["(", "paren"],
			["1.0", "number"],
			[")", "paren"],
		]);
	});

	it("ends engine declarations at the next keyword", () => {
		assert.deepEqual(tokenize("engine marzano\nlanguage css"), [
			["engine", "moduleKeyword"],
			["marzano", "languageName"],
			["language", "moduleKeyword"],
			["css", "languageName"],
		]);
	});

	it("tokenizes language declarations with flavors", () => {
		assert.deepEqual(tokenize("language js(typescript, jsx);"), [
			["language", "moduleKeyword"],
			["js", "languageName"],
			["(", "paren"],
			["typescript", "languageName"],
			[",", "separator"],
			["jsx", "languageName"],
			[")", "paren"],
			[";", "separator"],
		]);
	});
});

describe("snippets", () => {
	it("tokenizes backtick snippets with metavariables", () => {
		assert.deepEqual(tokenize("`console.log($message, $_, $...)`"), [
			["`", "snippet"],
			["console.log(", "snippet"],
			["$message", "metavariable"],
			[", ", "snippet"],
			["$_", "metavariable"],
			[", ", "snippet"],
			["$...", "metavariable"],
			[")", "snippet"],
			["`", "snippet"],
		]);
	});

	it("tokenizes bracketed metavariables and escapes", () => {
		assert.deepEqual(tokenize("`a$[name]b\\``"), [
			["`", "snippet"],
			["a", "snippet"],
			["$[name]", "metavariable"],
			["b", "snippet"],
			["\\`", "escape"],
			["`", "snippet"],
		]);
	});

	it("tokenizes snippets across lines", () => {
		const { tokens, state } = run("`if ($a) {\n  $b\n}`");
		assert.deepEqual(tokens, [
			["`", "snippet"],
			["if (", "snippet"],
			["$a", "metavariable"],
			[") {", "snippet"],
			["  ", "snippet"],
			["$b", "metavariable"],
			["}", "snippet"],
			["`", "snippet"],
		]);
		assert.equal(state.mode, null);
	});

	it("tokenizes raw snippets", () => {
		assert.deepEqual(tokenize("raw`$x`"), [
			["raw", "modifier"],
			["`", "snippet"],
			["$x", "metavariable"],
			["`", "snippet"],
		]);
	});

	it("tokenizes language-annotated snippets", () => {
		assert.deepEqual(tokenize('js"foo($x)\\n"'), [
			["js", "modifier"],
			['"', "snippet"],
			["foo(", "snippet"],
			["$x", "metavariable"],
			[")", "snippet"],
			["\\n", "escape"],
			['"', "snippet"],
		]);
	});

	it("doesn't treat unknown words before a quote as language prefixes", () => {
		assert.deepEqual(tokenize('foo"x"'), [
			['"', "string"],
			["x", "string"],
			['"', "string"],
		]);
	});
});

describe("strings and regexes", () => {
	it("tokenizes strings with escapes", () => {
		assert.deepEqual(tokenize('"a\\"b\\u0041$x"'), [
			['"', "string"],
			["a", "string"],
			['\\"', "escape"],
			["b", "string"],
			["\\u0041", "escape"],
			["$x", "string"],
			['"', "string"],
		]);
	});

	it("ends unterminated strings at the end of the line", () => {
		assert.deepEqual(tokenize('"abc\n$x'), [
			['"', "string"],
			["abc", "string"],
			["$x", "metavariable"],
		]);
	});

	it("tokenizes regexes", () => {
		assert.deepEqual(tokenize('r"^log\\.$"'), [
			["r", "modifier"],
			['"', "regexp"],
			["^log", "regexp"],
			["\\.", "escape"],
			["$", "regexp"],
			['"', "regexp"],
		]);
	});

	it("tokenizes regex snippets with metavariables", () => {
		assert.deepEqual(tokenize("r`$name.*`"), [
			["r", "modifier"],
			["`", "regexp"],
			["$name", "metavariable"],
			[".*", "regexp"],
			["`", "regexp"],
		]);
	});
});

describe("definitions", () => {
	it("tokenizes pattern definitions", () => {
		assert.deepEqual(tokenize("private pattern foo($a, $b) { $a }"), [
			["private", "modifier"],
			["pattern", "definitionKeyword"],
			["foo", "functionDefinition"],
			["(", "paren"],
			["$a", "parameter"],
			[",", "separator"],
			["$b", "parameter"],
			[")", "paren"],
			["{", "brace"],
			["$a", "metavariable"],
			["}", "brace"],
		]);
	});

	it("tokenizes definition parameters across lines", () => {
		assert.deepEqual(tokenize("predicate bar(\n  $a,\n  $b\n)"), [
			["predicate", "definitionKeyword"],
			["bar", "functionDefinition"],
			["(", "paren"],
			["$a", "parameter"],
			[",", "separator"],
			["$b", "parameter"],
			[")", "paren"],
		]);
	});

	it("skips over the JavaScript body of foreign functions", () => {
		const { tokens, state } = run(
			"function upper($s) js {\n  if ($s) { return $s.text; } // ok\n}\n$x",
		);
		assert.deepEqual(tokens, [
			["function", "definitionKeyword"],
			["upper", "functionDefinition"],
			["(", "paren"],
			["$s", "parameter"],
			[")", "paren"],
			["js", "languageName"],
			["{", "brace"],
			["// ok", "lineComment"],
			["}", "brace"],
			["$x", "metavariable"],
		]);
		assert.equal(state.mode, null);
	});

	it("only treats `js {` as a foreign function body after a function's parameters", () => {
		assert.deepEqual(tokenize("js { $x }"), [
			["{", "brace"],
			["$x", "metavariable"],
			["}", "brace"],
		]);
	});
});

describe("expressions", () => {
	it("tokenizes calls, keywords, and operators", () => {
		assert.deepEqual(
			tokenize(
				"`$f($x)` as $call where { $f <: contains call_expression(callee = $c), !$x => . }",
			),
			[
				["`", "snippet"],
				["$f", "metavariable"],
				["(", "snippet"],
				["$x", "metavariable"],
				[")", "snippet"],
				["`", "snippet"],
				["as", "operatorKeyword"],
				["$call", "metavariable"],
				["where", "controlKeyword"],
				["{", "brace"],
				["$f", "metavariable"],
				["<:", "operator"],
				["contains", "operatorKeyword"],
				["call_expression", "call"],
				["(", "paren"],
				["callee", "label"],
				["=", "definitionOperator"],
				["$c", "metavariable"],
				[")", "paren"],
				[",", "separator"],
				["!", "logicOperator"],
				["$x", "metavariable"],
				["=>", "operator"],
				[".", "derefOperator"],
				["}", "brace"],
			],
		);
	});

	it("tokenizes builtins, constants, and property access", () => {
		assert.deepEqual(
			tokenize("length($x.text) == 0 and true or undefined or Top"),
			[
				["length", "builtin"],
				["(", "paren"],
				["$x", "metavariable"],
				[".", "derefOperator"],
				["text", "propertyName"],
				[")", "paren"],
				["==", "compareOperator"],
				["0", "number"],
				["and", "operatorKeyword"],
				["true", "bool"],
				["or", "operatorKeyword"],
				["undefined", "null"],
				["or", "operatorKeyword"],
				["Top", "atom"],
			],
		);
	});

	it("doesn't treat keywords followed by parens as calls", () => {
		assert.deepEqual(tokenize("not ($x)"), [
			["not", "operatorKeyword"],
			["(", "paren"],
			["$x", "metavariable"],
			[")", "paren"],
		]);
	});

	it("tokenizes maps, lists, and numbers", () => {
		assert.deepEqual(tokenize("{ a: [1, -2.5e3], b: $x - 1 }"), [
			["{", "brace"],
			["a", "propertyName"],
			[":", "punctuation"],
			["[", "squareBracket"],
			["1", "number"],
			[",", "separator"],
			["-2.5e3", "number"],
			["]", "squareBracket"],
			[",", "separator"],
			["b", "propertyName"],
			[":", "punctuation"],
			["$x", "metavariable"],
			["-", "arithmeticOperator"],
			["1", "number"],
			["}", "brace"],
		]);
	});

	it("tokenizes annotations and register_diagnostic", () => {
		assert.deepEqual(
			tokenize('@suppress register_diagnostic(span = $x, message = "no")'),
			[
				["@suppress", "annotation"],
				["register_diagnostic", "builtin"],
				["(", "paren"],
				["span", "label"],
				["=", "definitionOperator"],
				["$x", "metavariable"],
				[",", "separator"],
				["message", "label"],
				["=", "definitionOperator"],
				['"', "string"],
				["no", "string"],
				['"', "string"],
				[")", "paren"],
			],
		);
	});

	it("leaves plain identifiers unstyled", () => {
		assert.deepEqual(tokenize("$x <: JsCallExpression"), [
			["$x", "metavariable"],
			["<:", "operator"],
		]);
	});
});

describe("indentation", () => {
	const context = { unit: 2 } as IndentContext;

	function indentAfter(source: string, textAfter: string): number | null {
		return parser.indent!(run(source).state, textAfter, context);
	}

	it("indents inside brackets", () => {
		assert.equal(indentAfter("`$x` where {", "$x"), 2);
		assert.equal(indentAfter("`$x` where {\n  or {", "$y"), 4);
	});

	it("dedents closing brackets", () => {
		assert.equal(indentAfter("`$x` where {", "}"), 0);
	});

	it("doesn't change indentation inside snippets", () => {
		assert.equal(indentAfter("`foo(", "bar"), null);
	});
});
