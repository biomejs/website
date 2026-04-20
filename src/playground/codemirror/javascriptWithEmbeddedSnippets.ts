import { css, cssLanguage } from "@codemirror/lang-css";
import {
	javascript,
	javascriptLanguage,
	jsxLanguage,
	tsxLanguage,
	typescriptLanguage,
} from "@codemirror/lang-javascript";
import { LanguageSupport } from "@codemirror/language";
import { parseMixed, type SyntaxNode } from "@lezer/common";
import { graphql, graphqlLanguage } from "cm6-graphql";

function embeddedParserForTag(rawTag: string) {
	const tag = rawTag.replace(/\s+/g, "");

	if (tag === "css" || tag.startsWith("styled.") || tag.startsWith("styled(")) {
		return cssLanguage.parser;
	}

	if (tag === "gql" || tag === "graphql") {
		return graphqlLanguage.parser;
	}

	return null;
}

function templateOverlayRanges(
	template: SyntaxNode,
): { from: number; to: number }[] {
	const ranges: { from: number; to: number }[] = [];
	let pos = template.from + 1; // opening backtick

	for (let ch = template.firstChild; ch; ch = ch.nextSibling) {
		if (ch.name !== "Interpolation") continue;
		if (ch.from > pos) ranges.push({ from: pos, to: ch.from });
		pos = ch.to;
	}

	if (pos < template.to - 1) {
		ranges.push({ from: pos, to: template.to - 1 }); // closing backtick
	}

	return ranges;
}

const wrap = parseMixed((node, input) => {
	let tag: SyntaxNode | null = null;
	let template: SyntaxNode | null = null;
	if (node.name === "TaggedTemplateExpression") {
		tag = node.node.firstChild;
		template = tag?.nextSibling ?? null;
	}

	if (node.name === "CallExpression") {
		tag = node.node.firstChild;
		template = tag?.nextSibling?.getChild("TemplateString") ?? null;
	}

	if (!tag || !template || template.name !== "TemplateString") {
		return null;
	}

	const parser = embeddedParserForTag(input.read(tag.from, tag.to));
	if (!parser) {
		return null;
	}

	return {
		parser,
		overlay: templateOverlayRanges(template),
	};
});

export function javascriptWithEmbeddedSnippets(config: {
	jsx?: boolean;
	typescript?: boolean;
}): LanguageSupport {
	const base = config.jsx
		? config.typescript
			? tsxLanguage
			: jsxLanguage
		: config.typescript
			? typescriptLanguage
			: javascriptLanguage;

	return new LanguageSupport(base.configure({ wrap }), [
		javascript(config).support,
		css().support,
		graphql(),
	]);
}
