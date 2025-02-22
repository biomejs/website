import {
	ArrowParentheses,
	AttributePosition,
	IndentStyle,
	type ObjectWrap,
	type PlaygroundSettings,
	type PrettierOptions,
	type PrettierOutput,
	type QuoteProperties,
	QuoteStyle,
	Semicolons,
	type TrailingCommas,
	defaultPlaygroundState,
} from "@/playground/types";
import {
	isCssFilename,
	isGraphqlFilename,
	isHtmlFilename,
	isJsonFilename,
	isSvelteFilename,
	isTypeScriptFilename,
	isVueFilename,
} from "@/playground/utils";
import type { WhitespaceSensitivity } from "@biomejs/wasm-web";
import * as prettier from "prettier";
// @ts-expect-error
import * as pluginSvelte from "prettier-plugin-svelte/browser";
// @ts-expect-error
import parserBabel from "prettier/esm/parser-babel.mjs";
// @ts-expect-error
import pluginEstree from "prettier/plugins/estree.mjs";
// @ts-expect-error
import pluginGraphql from "prettier/plugins/graphql.mjs";
// @ts-expect-error
import pluginHtml from "prettier/plugins/html.mjs";
// @ts-expect-error
import pluginCss from "prettier/plugins/postcss.mjs";

let settings = defaultPlaygroundState.settings;

self.addEventListener("message", async (e) => {
	switch (e.data.type) {
		case "updateSettings": {
			settings = e.data.settings as PlaygroundSettings;
			break;
		}

		case "format": {
			const {
				lineWidth,
				indentStyle,
				indentWidth,
				quoteStyle,
				jsxQuoteStyle,
				quoteProperties,
				trailingCommas: trailingComma,
				semicolons,
				arrowParentheses,
				bracketSpacing,
				bracketSameLine,
				attributePosition,
				objectWrap,
				indentScriptAndStyle,
				whitespaceSensitivity,
			} = settings;
			const code = e.data.code as string;
			const filename = e.data.filename as string;

			const prettierOutput = await formatWithPrettier(code, {
				lineWidth,
				indentStyle,
				indentWidth,
				filepath: filename,
				quoteStyle,
				jsxQuoteStyle,
				quoteProperties,
				trailingComma,
				semicolons,
				arrowParentheses,
				bracketSpacing,
				bracketSameLine,
				singleAttributePerLine:
					attributePosition === AttributePosition.Multiline,
				objectWrap,
				vueIndentScriptAndStyle: indentScriptAndStyle,
				whitespaceSensitivity,
			});

			self.postMessage({
				type: "formatted",
				filename,
				prettierOutput,
			});

			break;
		}

		default:
			console.error(`Unknown message ${e.data.type}.`);
	}
});

async function formatWithPrettier(
	code: string,
	options: {
		lineWidth: number;
		indentStyle: IndentStyle;
		indentWidth: number;
		filepath: string;
		quoteStyle: QuoteStyle;
		jsxQuoteStyle: QuoteStyle;
		quoteProperties: QuoteProperties;
		trailingComma: TrailingCommas;
		semicolons: Semicolons;
		arrowParentheses: ArrowParentheses;
		bracketSpacing: boolean;
		bracketSameLine: boolean;
		singleAttributePerLine?: boolean;
		objectWrap: ObjectWrap;
		vueIndentScriptAndStyle: boolean;
		whitespaceSensitivity: WhitespaceSensitivity;
	},
): Promise<PrettierOutput> {
	try {
		const prettierOptions: PrettierOptions = {
			useTabs: options.indentStyle === IndentStyle.Tab,
			tabWidth: options.indentWidth,
			printWidth: options.lineWidth,
			filepath: options.filepath,
			plugins: [
				parserBabel,
				pluginCss,
				pluginEstree,
				pluginGraphql,
				pluginHtml,
				pluginSvelte,
			],
			parser: getPrettierParser(options.filepath),
			singleQuote: options.quoteStyle === QuoteStyle.Single,
			jsxSingleQuote: options.jsxQuoteStyle === QuoteStyle.Single,
			quoteProps: options.quoteProperties,
			trailingComma: options.trailingComma,
			semi: options.semicolons === Semicolons.Always,
			arrowParens:
				options.arrowParentheses === ArrowParentheses.Always
					? "always"
					: "avoid",
			bracketSpacing: options.bracketSpacing,
			bracketSameLine: options.bracketSameLine,
			singleAttributePerLine: options.singleAttributePerLine ?? false,
			objectWrap: options.objectWrap,
			embeddedLanguageFormatting: "off",
			vueIndentScriptAndStyle: options.vueIndentScriptAndStyle,
			htmlWhitespaceSensitivity: options.whitespaceSensitivity,
		};

		// @ts-expect-error
		const debug = prettier.__debug;
		const document = await debug.printToDoc(code, prettierOptions);

		// formatDoc must be before prettier.format because prettier.format mutates the document and breaks the ir
		const ir = await debug.formatDoc(document, {
			parser: "babel",
			plugins: [parserBabel, pluginEstree],
		});

		const formattedCode = await prettier.format(code, prettierOptions);

		return {
			type: "SUCCESS",
			code: formattedCode,
			ir,
		};
	} catch (err: unknown) {
		if (err instanceof SyntaxError) {
			return {
				type: "ERROR",
				stack: err.message,
			};
		}
		return {
			type: "ERROR",
			stack: `
			name: ${(err as Error).name}
			message: ${(err as Error).message}
			stack: ${(err as Error).stack ?? ""}
			`,
		};
	}
}

function getPrettierParser(filename: string): string {
	if (isTypeScriptFilename(filename)) {
		return "babel-ts";
	}
	if (isJsonFilename(filename)) {
		return "json";
	}
	if (isCssFilename(filename)) {
		return "css";
	}
	if (isGraphqlFilename(filename)) {
		return "graphql";
	}
	if (isHtmlFilename(filename)) {
		return "html";
	}
	if (isVueFilename(filename)) {
		return "vue";
	}
	if (isSvelteFilename(filename)) {
		return "svelte";
	}
	return "babel";
}
