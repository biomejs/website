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
	return indentStyle === IndentStyle.Tab ? "tab" : "space";
}

function getBiomeAttributePosition(
	attributePosition: PlaygroundSettings["attributePosition"],
) {
	return attributePosition === AttributePosition.Auto ? "auto" : "multiline";
}

function getBiomeExpand(expand: PlaygroundSettings["expand"]) {
	switch (expand) {
		case Expand.Always:
			return "always";
		case Expand.Never:
			return "never";
		default:
			return "auto";
	}
}

function getBiomeQuoteStyle(quoteStyle: PlaygroundSettings["quoteStyle"]) {
	return quoteStyle === QuoteStyle.Double ? "double" : "single";
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
				quoteProperties:
					quoteProperties === QuoteProperties.Preserve
						? "preserve"
						: "asNeeded",
				trailingCommas,
				semicolons: semicolons === Semicolons.Always ? "always" : "asNeeded",
				arrowParentheses:
					arrowParentheses === ArrowParentheses.Always ? "always" : "asNeeded",
				operatorLinebreak:
					operatorLinebreak === OperatorLinebreak.Before ? "before" : "after",
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
): PlaygroundSettings {
	const defaults = defaultPlaygroundState.settings;
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
		indentStyle:
			formatter?.indentStyle === "space"
				? IndentStyle.Space
				: defaults.indentStyle,
		indentWidth: formatter?.indentWidth ?? defaults.indentWidth,
		quoteStyle:
			javascriptFormatter?.quoteStyle === "single"
				? QuoteStyle.Single
				: cssFormatter?.quoteStyle === "single"
					? QuoteStyle.Single
					: defaults.quoteStyle,
		jsxQuoteStyle:
			javascriptFormatter?.jsxQuoteStyle === "single"
				? QuoteStyle.Single
				: defaults.jsxQuoteStyle,
		quoteProperties:
			javascriptFormatter?.quoteProperties === "preserve"
				? QuoteProperties.Preserve
				: defaults.quoteProperties,
		trailingCommas:
			javascriptFormatter?.trailingCommas ?? defaults.trailingCommas,
		semicolons:
			javascriptFormatter?.semicolons === "asNeeded"
				? Semicolons.AsNeeded
				: defaults.semicolons,
		arrowParentheses:
			javascriptFormatter?.arrowParentheses === "asNeeded"
				? ArrowParentheses.AsNeeded
				: defaults.arrowParentheses,
		operatorLinebreak:
			javascriptFormatter?.operatorLinebreak === "before"
				? OperatorLinebreak.Before
				: defaults.operatorLinebreak,
		attributePosition:
			formatter?.attributePosition === "multiline" ||
			javascriptFormatter?.attributePosition === "multiline"
				? AttributePosition.Multiline
				: defaults.attributePosition,
		bracketSpacing:
			javascriptFormatter?.bracketSpacing ?? defaults.bracketSpacing,
		bracketSameLine:
			javascriptFormatter?.bracketSameLine ?? defaults.bracketSameLine,
		expand:
			formatter?.expand === "always"
				? Expand.Always
				: formatter?.expand === "never"
					? Expand.Never
					: defaults.expand,
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
