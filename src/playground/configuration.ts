import type { Actions, Configuration, Rules } from "@biomejs/wasm-web";
import { ASSIST_ACTIONS } from "@/playground/generated/assistActions.ts";
import { LINT_RULES } from "@/playground/generated/lintRules.ts";
import {
	ArrowParentheses,
	type AssistAction,
	AttributePosition,
	Expand,
	IndentStyle,
	type LintRule,
	OperatorLinebreak,
	type PlaygroundSettings,
	QuoteProperties,
	QuoteStyle,
	Semicolons,
} from "@/playground/types.ts";

export function createBiomeConfiguration(
	settings: PlaygroundSettings,
): Configuration {
	const configuration = {
		formatter: {
			enabled: true,
			formatWithErrors: true,
			lineWidth: settings.lineWidth,
			indentStyle: settings.indentStyle === IndentStyle.Tab ? "tab" : "space",
			indentWidth: settings.indentWidth,
			attributePosition:
				settings.attributePosition === AttributePosition.Auto
					? "auto"
					: "multiline",
			expand:
				settings.expand === Expand.Auto
					? "auto"
					: settings.expand === Expand.Always
						? "always"
						: "never",
		},
		linter: {
			enabled: settings.enabledLinting,
			domains: settings.ruleDomains,
			rules: createLintRulesConfiguration(settings.lintRules),
		},
		assist: {
			enabled: settings.enabledAssist,
			actions: createAssistActionsConfiguration(settings.assistActions),
		},
		javascript: {
			formatter: {
				quoteStyle:
					settings.quoteStyle === QuoteStyle.Double ? "double" : "single",
				jsxQuoteStyle:
					settings.jsxQuoteStyle === QuoteStyle.Double ? "double" : "single",
				quoteProperties:
					settings.quoteProperties === QuoteProperties.Preserve
						? "preserve"
						: "asNeeded",
				trailingCommas: settings.trailingCommas,
				semicolons:
					settings.semicolons === Semicolons.Always ? "always" : "asNeeded",
				arrowParentheses:
					settings.arrowParentheses === ArrowParentheses.Always
						? "always"
						: "asNeeded",
				operatorLinebreak:
					settings.operatorLinebreak === OperatorLinebreak.Before
						? "before"
						: "after",
				bracketSpacing: settings.bracketSpacing,
				bracketSameLine: settings.bracketSameLine,
				attributePosition:
					settings.attributePosition === AttributePosition.Auto
						? "auto"
						: "multiline",
			},
			parser: {
				unsafeParameterDecoratorsEnabled:
					settings.unsafeParameterDecoratorsEnabled,
			},
			experimentalEmbeddedSnippetsEnabled:
				settings.experimentalEmbeddedSnippetsEnabled,
		},
		css: {
			formatter: {
				quoteStyle:
					settings.quoteStyle === QuoteStyle.Double ? "double" : "single",
			},
			parser: {
				allowWrongLineComments: true,
				cssModules: settings.cssModules,
				tailwindDirectives: settings.tailwindDirectives,
			},
		},
		json: {
			formatter: {},
			parser: {
				allowComments: settings.allowComments,
			},
		},
		html: {
			formatter: {
				enabled: true,
				indentScriptAndStyle: settings.indentScriptAndStyle,
				whitespaceSensitivity: settings.whitespaceSensitivity,
			},
			experimentalFullSupportEnabled: settings.experimentalFullSupportEnabled,
		},
		markdown: {
			formatter: {
				enabled: true,
			},
		},
		yaml: {
			formatter: {
				enabled: true,
			},
		},
	};

	// These runtime options are not present in the generated Configuration type yet.
	return configuration as Configuration;
}

export function stringifyBiomeConfiguration(
	settings: PlaygroundSettings,
): string {
	return `${JSON.stringify(createBiomeConfiguration(settings), null, 2)}\n`;
}

export function getOnlyRules(
	lintRule: LintRule,
	assistAction: AssistAction,
): string[] {
	const selections = [lintRule, assistAction];
	if (
		selections.some(
			(selection) => selection === "recommended" || selection === "all",
		)
	) {
		return [];
	}
	return selections.filter((selection) => selection !== "none");
}

function createLintRulesConfiguration(lintRule: LintRule): Rules {
	switch (lintRule) {
		case LINT_RULES.preset.recommended:
			return {
				nursery: {
					preset: "none",
				},
			};
		case LINT_RULES.preset.all:
			return { preset: "all" };
		case LINT_RULES.preset.none:
			return { preset: "none" };
		default:
			return createSingleLintRuleConfiguration(lintRule);
	}
}

function createSingleLintRuleConfiguration(lintRule: LintRule): Rules {
	for (const [group, rules] of Object.entries(LINT_RULES)) {
		if (group === "preset" || !(lintRule in rules)) {
			continue;
		}

		return {
			preset: "none",
			[group]: {
				[lintRule]: "error",
			},
		} as Rules;
	}

	return { preset: "recommended" };
}

function createAssistActionsConfiguration(assistAction: AssistAction): Actions {
	switch (assistAction) {
		case ASSIST_ACTIONS.preset.recommended:
		case ASSIST_ACTIONS.preset.all:
		case ASSIST_ACTIONS.preset.none:
			return { preset: assistAction };
		default:
			return {
				preset: "none",
				source: { [assistAction]: "on" },
			};
	}
}
