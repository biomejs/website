export function GET() {
	const schema = {
	"$schema": "https://json-schema.org/draft/2020-12/schema",
	"title": "RulesMetadata",
	"type": "object",
	"properties": {
		"assist": {
			"$ref": "#/$defs/Rules",
			"default": { "languages": {}, "numberOrRules": 0 }
		},
		"lints": {
			"$ref": "#/$defs/Rules",
			"default": { "languages": {}, "numberOrRules": 0 }
		},
		"syntax": {
			"$ref": "#/$defs/Rules",
			"default": { "languages": {}, "numberOrRules": 0 }
		}
	},
	"$defs": {
		"FixKind": {
			"description": "Used to identify the kind of code action emitted by a rule",
			"oneOf": [
				{
					"description": "The rule doesn't emit code actions.",
					"type": "string",
					"const": "none"
				},
				{
					"description": "The rule emits a code action that is safe to apply. Usually these fixes don't change the semantic of the program.",
					"type": "string",
					"const": "safe"
				},
				{
					"description": "The rule emits a code action that is _unsafe_ to apply. Usually these fixes remove comments, or change\nthe semantic of the program.",
					"type": "string",
					"const": "unsafe"
				}
			]
		},
		"JsonMetadata": {
			"type": "object",
			"properties": {
				"deprecated": {
					"description": "It marks if a rule is deprecated, and if so a reason has to be provided.",
					"type": "boolean",
					"default": false
				},
				"docs": { "type": "string", "default": "" },
				"fixKind": {
					"description": "The kind of fix",
					"$ref": "#/$defs/FixKind",
					"default": "none"
				},
				"link": {
					"description": "The rule's documentation URL",
					"type": "string",
					"default": ""
				},
				"name": {
					"description": "The name of this rule, displayed in the diagnostics it emits",
					"type": "string",
					"default": ""
				},
				"recommended": {
					"description": "Whether a rule is recommended or not",
					"type": "boolean",
					"default": false
				},
				"sources": {
					"description": "The source metadata of the rule",
					"type": "array",
					"items": { "$ref": "#/$defs/RuleSourceWithKind" }
				},
				"version": {
					"description": "The version when the rule was implemented",
					"type": "string",
					"default": ""
				}
			}
		},
		"RuleSource": {
			"oneOf": [
				{
					"description": "Rules from [Rust Clippy](https://rust-lang.github.io/rust-clippy/master/index.html)",
					"type": "object",
					"properties": { "clippy": { "type": "string" } },
					"additionalProperties": false,
					"required": ["clippy"]
				},
				{
					"description": "Rules from [Deno Lint](https://github.com/denoland/deno_lint)",
					"type": "object",
					"properties": { "denoLint": { "type": "string" } },
					"additionalProperties": false,
					"required": ["denoLint"]
				},
				{
					"description": "Rules from [Eslint](https://eslint.org/)",
					"type": "object",
					"properties": { "eslint": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslint"]
				},
				{
					"description": "Rules from [Eslint Plugin Barrel Files](https://github.com/thepassle/eslint-plugin-barrel-files)",
					"type": "object",
					"properties": { "eslintBarrelFiles": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintBarrelFiles"]
				},
				{
					"description": "Rules from [Eslint Plugin Better Tailwindcss](https://github.com/schoero/eslint-plugin-better-tailwindcss)",
					"type": "object",
					"properties": { "eslintBetterTailwindcss": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintBetterTailwindcss"]
				},
				{
					"description": "Rules from [e18e ESLint Plugin](https://github.com/e18e/eslint-plugin)",
					"type": "object",
					"properties": { "eslintE18e": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintE18e"]
				},
				{
					"description": "Rules from [GraphQL-ESLint](https://github.com/graphql-hive/graphql-eslint)",
					"type": "object",
					"properties": { "eslintGraphql": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintGraphql"]
				},
				{
					"description": "Rules from [Eslint Plugin Import](https://github.com/import-js/eslint-plugin-import)",
					"type": "object",
					"properties": { "eslintImport": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintImport"]
				},
				{
					"description": "Rules from [Eslint Plugin Import Access](https://github.com/uhyo/eslint-plugin-import-access)",
					"type": "object",
					"properties": { "eslintImportAccess": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintImportAccess"]
				},
				{
					"description": "Rules from [Eslint Plugin Jest](https://github.com/jest-community/eslint-plugin-jest)",
					"type": "object",
					"properties": { "eslintJest": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintJest"]
				},
				{
					"description": "Rules from [Eslint Plugin JSDOc](https://github.com/gajus/eslint-plugin-jsdoc)",
					"type": "object",
					"properties": { "eslintJsDoc": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintJsDoc"]
				},
				{
					"description": "Rules from [Eslint Plugin JSX A11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)",
					"type": "object",
					"properties": { "eslintJsxA11y": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintJsxA11y"]
				},
				{
					"description": "Rules from [Eslint Plugin Mysticatea](https://github.com/mysticatea/eslint-plugin)",
					"type": "object",
					"properties": { "eslintMysticatea": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintMysticatea"]
				},
				{
					"description": "Rules from [Eslint Plugin N](https://github.com/eslint-community/eslint-plugin-n)",
					"type": "object",
					"properties": { "eslintN": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintN"]
				},
				{
					"description": "Rules from [Eslint Plugin Next](https://github.com/vercel/next.js/tree/canary/packages/eslint-plugin-next)",
					"type": "object",
					"properties": { "eslintNext": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintNext"]
				},
				{
					"description": "Rules from [Eslint Plugin No Secrets](https://github.com/nickdeis/eslint-plugin-no-secrets)",
					"type": "object",
					"properties": { "eslintNoSecrets": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintNoSecrets"]
				},
				{
					"description": "Rules from [Eslint Plugin Package.json](https://github.com/JoshuaKGoldberg/eslint-plugin-package-json)",
					"type": "object",
					"properties": { "eslintPackageJson": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintPackageJson"]
				},
				{
					"description": "Rules from [Eslint Plugin Package.json Dependencies](https://github.com/idan-at/eslint-plugin-package-json-dependencies)",
					"type": "object",
					"properties": {
						"eslintPackageJsonDependencies": { "type": "string" }
					},
					"additionalProperties": false,
					"required": ["eslintPackageJsonDependencies"]
				},
				{
					"description": "Rules from [Eslint Plugin Perfectionist](https://perfectionist.dev/)",
					"type": "object",
					"properties": { "eslintPerfectionist": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintPerfectionist"]
				},
				{
					"description": "Rules from [Eslint Plugin Promise](https://github.com/eslint-community/eslint-plugin-promise)",
					"type": "object",
					"properties": { "eslintPromise": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintPromise"]
				},
				{
					"description": "Rules from [Eslint Plugin Qwik](https://github.com/QwikDev/qwik)",
					"type": "object",
					"properties": { "eslintQwik": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintQwik"]
				},
				{
					"description": "Rules from [Eslint Plugin React](https://github.com/jsx-eslint/eslint-plugin-react)",
					"type": "object",
					"properties": { "eslintReact": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintReact"]
				},
				{
					"description": "Rules from [Eslint Plugin React Hooks](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md)",
					"type": "object",
					"properties": { "eslintReactHooks": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintReactHooks"]
				},
				{
					"description": "Rules from [Eslint Plugin React Prefer Function Component](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component)",
					"type": "object",
					"properties": {
						"eslintReactPreferFunctionComponent": { "type": "string" }
					},
					"additionalProperties": false,
					"required": ["eslintReactPreferFunctionComponent"]
				},
				{
					"description": "Rules from [Eslint Plugin React Refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)",
					"type": "object",
					"properties": { "eslintReactRefresh": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintReactRefresh"]
				},
				{
					"description": "Rules from [eslint-react.xyz](https://eslint-react.xyz/)",
					"type": "object",
					"properties": { "eslintReactX": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintReactX"]
				},
				{
					"description": "Rules from [eslint-react.xyz](https://eslint-react.xyz/)",
					"type": "object",
					"properties": { "eslintReactXyz": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintReactXyz"]
				},
				{
					"description": "Rules from [Eslint Plugin Regexp](https://github.com/ota-meshi/eslint-plugin-regexp)",
					"type": "object",
					"properties": { "eslintRegexp": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintRegexp"]
				},
				{
					"description": "Rules from [Eslint Plugin Solid](https://github.com/solidjs-community/eslint-plugin-solid)",
					"type": "object",
					"properties": { "eslintSolid": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintSolid"]
				},
				{
					"description": "Rules from [Eslint Plugin Sonar](https://github.com/SonarSource/eslint-plugin-sonarjs)",
					"type": "object",
					"properties": { "eslintSonarJs": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintSonarJs"]
				},
				{
					"description": "Rules from [Eslint Plugin Stylistic](https://eslint.style)",
					"type": "object",
					"properties": { "eslintStylistic": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintStylistic"]
				},
				{
					"description": "Rules from [Eslint Plugin Typescript](https://typescript-eslint.io)",
					"type": "object",
					"properties": { "eslintTypeScript": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintTypeScript"]
				},
				{
					"description": "Rules from [Eslint Plugin Unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)",
					"type": "object",
					"properties": { "eslintUnicorn": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintUnicorn"]
				},
				{
					"description": "Rules from [Eslint Plugin Unused Imports](https://github.com/sweepline/eslint-plugin-unused-imports)",
					"type": "object",
					"properties": { "eslintUnusedImports": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintUnusedImports"]
				},
				{
					"description": "Rules from [Eslint Plugin Vitest](https://github.com/vitest-dev/eslint-plugin-vitest)",
					"type": "object",
					"properties": { "eslintVitest": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintVitest"]
				},
				{
					"description": "Rules from [Eslint Plugin Vue.js](https://eslint.vuejs.org/)",
					"type": "object",
					"properties": { "eslintVueJs": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintVueJs"]
				},
				{
					"description": "Rules from [graphql-schema-linter](https://github.com/cjoudrey/graphql-schema-linter)",
					"type": "object",
					"properties": { "graphqlSchemaLinter": { "type": "string" } },
					"additionalProperties": false,
					"required": ["graphqlSchemaLinter"]
				},
				{
					"description": "Rules from [Stylelint](https://github.com/stylelint/stylelint)",
					"type": "object",
					"properties": { "stylelint": { "type": "string" } },
					"additionalProperties": false,
					"required": ["stylelint"]
				},
				{
					"description": "Rules from [Eslint Plugin Turbo](https://github.com/vercel/turborepo/tree/main/packages/eslint-plugin-turbo)",
					"type": "object",
					"properties": { "eslintTurbo": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintTurbo"]
				},
				{
					"description": "Rules from [html-eslint](https://html-eslint.org/)",
					"type": "object",
					"properties": { "htmlEslint": { "type": "string" } },
					"additionalProperties": false,
					"required": ["htmlEslint"]
				},
				{
					"description": "Rules from [Eslint Plugin Playwright](https://github.com/playwright-community/eslint-plugin-playwright)",
					"type": "object",
					"properties": { "eslintPlaywright": { "type": "string" } },
					"additionalProperties": false,
					"required": ["eslintPlaywright"]
				}
			]
		},
		"RuleSourceKind": {
			"oneOf": [
				{
					"description": "The rule implements the same logic of the source",
					"type": "string",
					"const": "sameLogic"
				},
				{
					"description": "The rule deviate of the logic of the source",
					"type": "string",
					"const": "inspired"
				}
			]
		},
		"RuleSourceWithKind": {
			"type": "object",
			"properties": {
				"kind": { "$ref": "#/$defs/RuleSourceKind" },
				"source": { "$ref": "#/$defs/RuleSource" }
			},
			"required": ["kind", "source"]
		},
		"Rules": {
			"type": "object",
			"properties": {
				"languages": {
					"type": "object",
					"additionalProperties": {
						"type": "object",
						"additionalProperties": {
							"type": "object",
							"additionalProperties": { "$ref": "#/$defs/JsonMetadata" }
						}
					},
					"default": {}
				},
				"numberOrRules": {
					"type": "integer",
					"format": "uint16",
					"default": 0,
					"maximum": 65535,
					"minimum": 0
				}
			}
		}
	}
}
;
	return new Response(JSON.stringify(schema), {
		status: 200,
		headers: {
			"content-type": "application/json",
		},
	});
}
