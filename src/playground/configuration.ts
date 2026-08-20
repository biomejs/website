import type { Configuration, Rules } from "@biomejs/wasm-web";
import { LINT_RULES } from "@/playground/generated/lintRules.ts";
import {
	ArrowParentheses,
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

const BIOME_DEFAULT_CONFIGURATION = {
	formatter: {
		enabled: true,
		formatWithErrors: false,
		lineWidth: 80,
		indentStyle: "tab",
		indentWidth: 2,
		attributePosition: "auto",
		expand: "auto",
	},
	linter: {
		enabled: true,
		domains: {},
		rules: {},
	},
	assist: {
		enabled: true,
	},
	javascript: {
		formatter: {
			quoteStyle: "double",
			jsxQuoteStyle: "double",
			quoteProperties: "asNeeded",
			trailingCommas: "all",
			semicolons: "always",
			arrowParentheses: "always",
			operatorLinebreak: "after",
			bracketSpacing: true,
			bracketSameLine: false,
			attributePosition: "auto",
		},
		parser: {
			unsafeParameterDecoratorsEnabled: false,
		},
		experimentalEmbeddedSnippetsEnabled: false,
	},
	css: {
		formatter: {
			quoteStyle: "double",
		},
		parser: {
			allowWrongLineComments: false,
			cssModules: false,
			tailwindDirectives: false,
		},
	},
	json: {
		formatter: {},
		parser: {
			allowComments: false,
		},
	},
	html: {
		formatter: {
			enabled: false,
			indentScriptAndStyle: false,
			whitespaceSensitivity: "css",
		},
		experimentalFullSupportEnabled: false,
	},
} satisfies Configuration;

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
	const configuration = omitDefaultValues(
		createBiomeConfiguration(settings),
		BIOME_DEFAULT_CONFIGURATION,
	);
	return `${JSON.stringify(configuration ?? {}, null, 2)}\n`;
}

function omitDefaultValues(value: unknown, defaultValue: unknown): unknown {
	if (Object.is(value, defaultValue)) {
		return undefined;
	}

	if (Array.isArray(value)) {
		if (
			Array.isArray(defaultValue) &&
			value.length === defaultValue.length &&
			value.every(
				(item, index) =>
					omitDefaultValues(item, defaultValue[index]) === undefined,
			)
		) {
			return undefined;
		}
		return value;
	}

	if (isRecord(value) && isRecord(defaultValue)) {
		const result: Record<string, unknown> = {};
		for (const [key, item] of Object.entries(value)) {
			const difference = omitDefaultValues(item, defaultValue[key]);
			if (difference !== undefined) {
				result[key] = difference;
			}
		}
		return Object.keys(result).length === 0 ? undefined : result;
	}

	return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getOnlyLintRules(lintRule: LintRule): string[] {
	return isLintPreset(lintRule) ? [] : [lintRule];
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

function isLintPreset(lintRule: LintRule): boolean {
	return Object.values(LINT_RULES.preset).some((preset) => preset === lintRule);
}
