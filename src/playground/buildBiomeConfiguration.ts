import type { Configuration } from "@biomejs/wasm-web";
import { LINT_RULES } from "@/playground/generated/lintRules.ts";
import {
	ArrowParentheses,
	AttributePosition,
	defaultPlaygroundState,
	Expand,
	IndentStyle,
	OperatorLinebreak,
	type PlaygroundSettings,
	QuoteProperties,
	QuoteStyle,
	Semicolons,
} from "@/playground/types";

type LinterRules = NonNullable<NonNullable<Configuration["linter"]>["rules"]>;
type LintRuleGroup = Exclude<keyof typeof LINT_RULES, "recommended" | "all">;

const LINT_RULE_GROUPS = Object.entries(LINT_RULES).filter((entry) => {
	return typeof entry[1] === "object";
}) as Array<[LintRuleGroup, Record<string, string>]>;

function getBiomeIndentStyle(indentStyle: PlaygroundSettings["indentStyle"]) {
	return indentStyle === IndentStyle.Tab ? IndentStyle.Tab : IndentStyle.Space;
}

function getPlaygroundIndentStyle(indentStyle: IndentStyle | undefined) {
	return indentStyle === IndentStyle.Space
		? IndentStyle.Space
		: defaultPlaygroundState.settings.indentStyle;
}

function getBiomeAttributePosition(
	attributePosition: PlaygroundSettings["attributePosition"],
) {
	return attributePosition === AttributePosition.Auto
		? AttributePosition.Auto
		: AttributePosition.Multiline;
}

function getPlaygroundAttributePosition(
	attributePosition: AttributePosition | undefined,
) {
	return attributePosition === AttributePosition.Multiline
		? AttributePosition.Multiline
		: defaultPlaygroundState.settings.attributePosition;
}

function getBiomeExpand(expand: PlaygroundSettings["expand"]) {
	switch (expand) {
		case Expand.Always:
			return Expand.Always;
		case Expand.Never:
			return Expand.Never;
		default:
			return Expand.Auto;
	}
}

function getPlaygroundExpand(expand: Expand | undefined) {
	switch (expand) {
		case Expand.Always:
			return Expand.Always;
		case Expand.Never:
			return Expand.Never;
		default:
			return defaultPlaygroundState.settings.expand;
	}
}

function getBiomeQuoteStyle(quoteStyle: PlaygroundSettings["quoteStyle"]) {
	return quoteStyle === QuoteStyle.Double
		? QuoteStyle.Double
		: QuoteStyle.Single;
}

function getPlaygroundQuoteStyle(quoteStyle: QuoteStyle | undefined) {
	if (quoteStyle === QuoteStyle.Single) {
		return QuoteStyle.Single;
	}

	if (quoteStyle === QuoteStyle.Double) {
		return QuoteStyle.Double;
	}

	return undefined;
}

function getBiomeQuoteProperties(
	quoteProperties: PlaygroundSettings["quoteProperties"],
) {
	return quoteProperties === QuoteProperties.Preserve ? "preserve" : "asNeeded";
}

function getPlaygroundQuoteProperties(
	quoteProperties: "preserve" | "asNeeded" | undefined,
) {
	return quoteProperties === QuoteProperties.Preserve
		? QuoteProperties.Preserve
		: defaultPlaygroundState.settings.quoteProperties;
}

function getBiomeSemicolons(semicolons: PlaygroundSettings["semicolons"]) {
	return semicolons === Semicolons.Always ? "always" : "asNeeded";
}

function getPlaygroundSemicolons(
	semicolons: "always" | "asNeeded" | undefined,
) {
	return semicolons === "asNeeded"
		? Semicolons.AsNeeded
		: defaultPlaygroundState.settings.semicolons;
}

function getBiomeArrowParentheses(
	arrowParentheses: PlaygroundSettings["arrowParentheses"],
) {
	return arrowParentheses === ArrowParentheses.Always ? "always" : "asNeeded";
}

function getPlaygroundArrowParentheses(
	arrowParentheses: "always" | "asNeeded" | undefined,
) {
	return arrowParentheses === "asNeeded"
		? ArrowParentheses.AsNeeded
		: defaultPlaygroundState.settings.arrowParentheses;
}

function getBiomeOperatorLinebreak(
	operatorLinebreak: PlaygroundSettings["operatorLinebreak"],
) {
	return operatorLinebreak === OperatorLinebreak.Before
		? OperatorLinebreak.Before
		: OperatorLinebreak.After;
}

function getPlaygroundOperatorLinebreak(
	operatorLinebreak: OperatorLinebreak | undefined,
) {
	return operatorLinebreak === OperatorLinebreak.Before
		? OperatorLinebreak.Before
		: defaultPlaygroundState.settings.operatorLinebreak;
}

function getLintRuleGroup(
	lintRule: PlaygroundSettings["lintRules"],
): LintRuleGroup | undefined {
	for (const [groupName, rules] of LINT_RULE_GROUPS) {
		if (lintRule in rules) {
			return groupName;
		}
	}

	return undefined;
}

function getLintRulesConfiguration(
	lintRules: PlaygroundSettings["lintRules"],
): LinterRules {
	switch (lintRules) {
		case LINT_RULES.recommended:
			return {
				nursery: {
					recommended: false,
				},
			};
		case LINT_RULES.all:
			return {
				a11y: "on",
				nursery: "on",
				complexity: "on",
				correctness: "on",
				performance: "on",
				security: "on",
				style: "on",
				suspicious: "on",
			};
		default: {
			const lintRuleGroup = getLintRuleGroup(lintRules);

			if (lintRuleGroup !== undefined) {
				return {
					recommended: false,
					[lintRuleGroup]: {
						[lintRules]: "on",
					},
				} as LinterRules;
			}

			return {
				recommended: false,
			};
		}
	}
}

function getPlaygroundLintRules(linterRules: LinterRules | undefined) {
	if (!linterRules || typeof linterRules !== "object") {
		return defaultPlaygroundState.settings.lintRules;
	}

	const rules = linterRules as Record<string, unknown>;
	const enabledGroups = [
		rules.a11y,
		rules.nursery,
		rules.complexity,
		rules.correctness,
		rules.performance,
		rules.security,
		rules.style,
		rules.suspicious,
	];

	for (const [groupName, groupRules] of LINT_RULE_GROUPS) {
		const groupConfiguration = rules[groupName];

		if (!groupConfiguration || typeof groupConfiguration !== "object") {
			continue;
		}

		for (const lintRule of Object.keys(groupRules)) {
			if ((groupConfiguration as Record<string, unknown>)[lintRule] === "on") {
				return lintRule as PlaygroundSettings["lintRules"];
			}
		}
	}

	if (enabledGroups.every((value) => value === "on")) {
		return LINT_RULES.all;
	}

	if (
		"nursery" in rules &&
		typeof rules.nursery === "object" &&
		rules.nursery !== null &&
		"recommended" in rules.nursery &&
		(rules.nursery as { recommended?: unknown }).recommended === false
	) {
		return LINT_RULES.recommended;
	}

	return defaultPlaygroundState.settings.lintRules;
}

export function buildBiomeConfiguration(
	settings: PlaygroundSettings,
): Configuration {
	const {
		lineWidth,
		indentStyle,
		indentWidth,
		quoteStyle,
		jsxQuoteStyle,
		quoteProperties,
		lintRules,
		enabledLinting,
		trailingCommas,
		semicolons,
		arrowParentheses,
		operatorLinebreak,
		bracketSpacing,
		bracketSameLine,
		expand,
		indentScriptAndStyle,
		whitespaceSensitivity,
		enabledAssist,
		unsafeParameterDecoratorsEnabled,
		allowComments,
		attributePosition,
		ruleDomains,
		experimentalEmbeddedSnippetsEnabled,
		experimentalFullSupportEnabled,
		cssModules,
		tailwindDirectives,
	} = settings;

	const configuration: Configuration = {
		formatter: {
			enabled: true,
			formatWithErrors: true,
			lineWidth,
			indentStyle: getBiomeIndentStyle(indentStyle),
			indentWidth,
			attributePosition: getBiomeAttributePosition(attributePosition),
			expand: getBiomeExpand(expand),
		},
		linter: {
			enabled: enabledLinting,
			domains: ruleDomains,
			rules: getLintRulesConfiguration(lintRules),
		},
		assist: {
			enabled: enabledAssist,
		},
		javascript: {
			formatter: {
				quoteStyle: getBiomeQuoteStyle(quoteStyle),
				jsxQuoteStyle: getBiomeQuoteStyle(jsxQuoteStyle),
				quoteProperties: getBiomeQuoteProperties(quoteProperties),
				trailingCommas,
				semicolons: getBiomeSemicolons(semicolons),
				arrowParentheses: getBiomeArrowParentheses(arrowParentheses),
				operatorLinebreak: getBiomeOperatorLinebreak(operatorLinebreak),
				bracketSpacing,
				bracketSameLine,
				attributePosition: getBiomeAttributePosition(attributePosition),
			},
			parser: {
				unsafeParameterDecoratorsEnabled,
			},
			experimentalEmbeddedSnippetsEnabled,
		},
		css: {
			formatter: {
				quoteStyle: getBiomeQuoteStyle(quoteStyle),
			},
			parser: {
				allowWrongLineComments: true,
				cssModules,
				tailwindDirectives,
			},
		},
		json: {
			parser: {
				allowComments,
			},
		},
		html: {
			formatter: {
				enabled: true,
				indentScriptAndStyle,
				whitespaceSensitivity,
			},
			experimentalFullSupportEnabled,
		},
	};

	return configuration;
}

export function parseBiomeConfiguration(
	configuration: Configuration,
	currentSettings: PlaygroundSettings = defaultPlaygroundState.settings,
): PlaygroundSettings {
	const defaults = currentSettings;
	const formatter = configuration.formatter;
	const javascript = configuration.javascript;
	const javascriptFormatter = javascript?.formatter;
	const javascriptParser = javascript?.parser;
	const css = configuration.css;
	const cssFormatter = css?.formatter;
	const cssParser = css?.parser;
	const json = configuration.json;
	const jsonParser = json?.parser;
	const html = configuration.html;
	const htmlFormatter = html?.formatter;
	const linter = configuration.linter;
	const assist = configuration.assist;

	return {
		...defaults,
		lineWidth: formatter?.lineWidth ?? defaults.lineWidth,
		indentStyle: getPlaygroundIndentStyle(formatter?.indentStyle),
		indentWidth: formatter?.indentWidth ?? defaults.indentWidth,
		quoteStyle:
			getPlaygroundQuoteStyle(javascriptFormatter?.quoteStyle) ??
			getPlaygroundQuoteStyle(cssFormatter?.quoteStyle) ??
			defaults.quoteStyle,
		jsxQuoteStyle:
			getPlaygroundQuoteStyle(javascriptFormatter?.jsxQuoteStyle) ??
			defaults.jsxQuoteStyle,
		quoteProperties: getPlaygroundQuoteProperties(
			javascriptFormatter?.quoteProperties,
		),
		trailingCommas:
			javascriptFormatter?.trailingCommas ?? defaults.trailingCommas,
		semicolons: getPlaygroundSemicolons(javascriptFormatter?.semicolons),
		arrowParentheses: getPlaygroundArrowParentheses(
			javascriptFormatter?.arrowParentheses,
		),
		operatorLinebreak: getPlaygroundOperatorLinebreak(
			javascriptFormatter?.operatorLinebreak,
		),
		attributePosition:
			getPlaygroundAttributePosition(formatter?.attributePosition) ===
				AttributePosition.Multiline ||
			getPlaygroundAttributePosition(javascriptFormatter?.attributePosition) ===
				AttributePosition.Multiline
				? AttributePosition.Multiline
				: defaults.attributePosition,
		bracketSpacing:
			javascriptFormatter?.bracketSpacing ?? defaults.bracketSpacing,
		bracketSameLine:
			javascriptFormatter?.bracketSameLine ?? defaults.bracketSameLine,
		expand: getPlaygroundExpand(formatter?.expand),
		lintRules: getPlaygroundLintRules(linter?.rules),
		enabledLinting: linter?.enabled ?? defaults.enabledLinting,
		analyzerFixMode: defaults.analyzerFixMode,
		enabledAssist: assist?.enabled ?? defaults.enabledAssist,
		unsafeParameterDecoratorsEnabled:
			javascriptParser?.unsafeParameterDecoratorsEnabled ??
			defaults.unsafeParameterDecoratorsEnabled,
		allowComments: jsonParser?.allowComments ?? defaults.allowComments,
		ruleDomains: linter?.domains ?? defaults.ruleDomains,
		indentScriptAndStyle:
			htmlFormatter?.indentScriptAndStyle ?? defaults.indentScriptAndStyle,
		whitespaceSensitivity:
			htmlFormatter?.whitespaceSensitivity ?? defaults.whitespaceSensitivity,
		experimentalEmbeddedSnippetsEnabled:
			javascript?.experimentalEmbeddedSnippetsEnabled ??
			defaults.experimentalEmbeddedSnippetsEnabled,
		experimentalFullSupportEnabled:
			html?.experimentalFullSupportEnabled ??
			defaults.experimentalFullSupportEnabled,
		cssModules: cssParser?.cssModules ?? defaults.cssModules,
		tailwindDirectives:
			cssParser?.tailwindDirectives ?? defaults.tailwindDirectives,
		gritTargetLanguage: defaults.gritTargetLanguage,
	};
}
