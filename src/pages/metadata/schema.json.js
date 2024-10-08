export function GET() {
	const schema = {
		$schema: "http://json-schema.org/draft-07/schema#",
		title: "RulesMetadata",
		type: "object",
		properties: {
			assist: {
				default: { languages: {}, numberOrRules: 0 },
				allOf: [{ $ref: "#/definitions/Rules" }],
			},
			lints: {
				default: { languages: {}, numberOrRules: 0 },
				allOf: [{ $ref: "#/definitions/Rules" }],
			},
			syntax: {
				default: { languages: {}, numberOrRules: 0 },
				allOf: [{ $ref: "#/definitions/Rules" }],
			},
		},
		definitions: {
			FixKind: {
				description:
					"Used to identify the kind of code action emitted by a rule",
				oneOf: [
					{
						description: "The rule doesn't emit code actions.",
						type: "string",
						enum: ["none"],
					},
					{
						description:
							"The rule emits a code action that is safe to apply. Usually these fixes don't change the semantic of the program.",
						type: "string",
						enum: ["safe"],
					},
					{
						description:
							"The rule emits a code action that is _unsafe_ to apply. Usually these fixes remove comments, or change the semantic of the program.",
						type: "string",
						enum: ["unsafe"],
					},
				],
			},
			JsonMetadata: {
				type: "object",
				properties: {
					deprecated: {
						description:
							"It marks if a rule is deprecated, and if so a reason has to be provided.",
						default: false,
						type: "boolean",
					},
					docs: { default: "", type: "string" },
					fixKind: {
						description: "The kind of fix",
						default: "none",
						allOf: [{ $ref: "#/definitions/FixKind" }],
					},
					link: {
						description: "The rule's documentation URL",
						default: "",
						type: "string",
					},
					name: {
						description:
							"The name of this rule, displayed in the diagnostics it emits",
						default: "",
						type: "string",
					},
					recommended: {
						description: "Whether a rule is recommended or not",
						default: false,
						type: "boolean",
					},
					sourceKind: {
						description: "The source kind of the rule",
						anyOf: [{ $ref: "#/definitions/RuleSourceKind" }, { type: "null" }],
					},
					sources: {
						description: "The source metadata of the rule",
						type: "array",
						items: { $ref: "#/definitions/RuleSource" },
					},
					version: {
						description: "The version when the rule was implemented",
						default: "",
						type: "string",
					},
				},
			},
			RuleSource: {
				oneOf: [
					{
						description:
							"Rules from [Rust Clippy](https://rust-lang.github.io/rust-clippy/master/index.html)",
						type: "object",
						required: ["clippy"],
						properties: { clippy: { type: "string" } },
						additionalProperties: false,
					},
					{
						description: "Rules from [Eslint](https://eslint.org/)",
						type: "object",
						required: ["eslint"],
						properties: { eslint: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [GraphQL-ESLint](https://github.com/dimaMachina/graphql-eslint)",
						type: "object",
						required: ["eslintGraphql"],
						properties: { eslintGraphql: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Import](https://github.com/import-js/eslint-plugin-import)",
						type: "object",
						required: ["eslintImport"],
						properties: { eslintImport: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Import Access](https://github.com/uhyo/eslint-plugin-import-access)",
						type: "object",
						required: ["eslintImportAccess"],
						properties: { eslintImportAccess: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Jest](https://github.com/jest-community/eslint-plugin-jest)",
						type: "object",
						required: ["eslintJest"],
						properties: { eslintJest: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin JSX A11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)",
						type: "object",
						required: ["eslintJsxA11y"],
						properties: { eslintJsxA11y: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin React](https://github.com/jsx-eslint/eslint-plugin-react)",
						type: "object",
						required: ["eslintReact"],
						properties: { eslintReact: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin React Hooks](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md)",
						type: "object",
						required: ["eslintReactHooks"],
						properties: { eslintReactHooks: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin React Refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)",
						type: "object",
						required: ["eslintReactRefresh"],
						properties: { eslintReactRefresh: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Solid](https://github.com/solidjs-community/eslint-plugin-solid)",
						type: "object",
						required: ["eslintSolid"],
						properties: { eslintSolid: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Sonar](https://github.com/SonarSource/eslint-plugin-sonarjs)",
						type: "object",
						required: ["eslintSonarJs"],
						properties: { eslintSonarJs: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Stylistic](https://eslint.style)",
						type: "object",
						required: ["eslintStylistic"],
						properties: { eslintStylistic: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Typescript](https://typescript-eslint.io)",
						type: "object",
						required: ["eslintTypeScript"],
						properties: { eslintTypeScript: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)",
						type: "object",
						required: ["eslintUnicorn"],
						properties: { eslintUnicorn: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Unused Imports](https://github.com/sweepline/eslint-plugin-unused-imports)",
						type: "object",
						required: ["eslintUnusedImports"],
						properties: { eslintUnusedImports: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Mysticatea](https://github.com/mysticatea/eslint-plugin)",
						type: "object",
						required: ["eslintMysticatea"],
						properties: { eslintMysticatea: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Barrel Files](https://github.com/thepassle/eslint-plugin-barrel-files)",
						type: "object",
						required: ["eslintBarrelFiles"],
						properties: { eslintBarrelFiles: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin N](https://github.com/eslint-community/eslint-plugin-n)",
						type: "object",
						required: ["eslintN"],
						properties: { eslintN: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin Next](https://github.com/vercel/next.js/tree/canary/packages/eslint-plugin-next)",
						type: "object",
						required: ["eslintNext"],
						properties: { eslintNext: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Stylelint](https://github.com/stylelint/stylelint)",
						type: "object",
						required: ["stylelint"],
						properties: { stylelint: { type: "string" } },
						additionalProperties: false,
					},
					{
						description:
							"Rules from [Eslint Plugin No Secrets](https://github.com/nickdeis/eslint-plugin-no-secrets)",
						type: "object",
						required: ["eslintNoSecrets"],
						properties: { eslintNoSecrets: { type: "string" } },
						additionalProperties: false,
					},
				],
			},
			RuleSourceKind: {
				oneOf: [
					{
						description: "The rule implements the same logic of the source",
						type: "string",
						enum: ["sameLogic"],
					},
					{
						description: "The rule deviate of the logic of the source",
						type: "string",
						enum: ["inspired"],
					},
				],
			},
			Rules: {
				type: "object",
				properties: {
					languages: {
						default: {},
						type: "object",
						additionalProperties: {
							type: "object",
							additionalProperties: {
								type: "object",
								additionalProperties: { $ref: "#/definitions/JsonMetadata" },
							},
						},
					},
					numberOrRules: {
						default: 0,
						type: "integer",
						format: "uint16",
						minimum: 0.0,
					},
				},
			},
		},
	};
	return new Response(JSON.stringify(schema), {
		status: 200,
		headers: {
			"content-type": "application/json",
		},
	});
}
