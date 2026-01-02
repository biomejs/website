---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noUndeclaredEnvVars
description: Learn more about noUndeclaredEnvVars
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
## Summary
- Rule available since: `v2.3.10`
- Diagnostic Category: [`lint/nursery/noUndeclaredEnvVars`](/reference/diagnostics#diagnostic-category)
- This rule doesn't have a fix.
- The default severity of this rule is [**warning**](/reference/diagnostics#warning).
- This rule belongs to the following domains:
  - [`turborepo`](/linter/domains#turborepo)
- Sources: 
  - Same as [`turbo/no-undeclared-env-vars`](https://github.com/vercel/turborepo/blob/main/packages/eslint-plugin-turbo/docs/rules/no-undeclared-env-vars.md)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"noUndeclaredEnvVars": "error"
			}
		}
	}
}

```
## Description
Disallow the use of undeclared environment variables.

In Turborepo projects, environment variables used in tasks must be declared
in the `turbo.json(c)` configuration file to ensure proper caching behavior.
Using undeclared environment variables can lead to incorrect cache hits
and unpredictable build behavior.

This rule checks for environment variable accesses in the following patterns:

- `process.env.VAR_NAME` and `process.env["VAR_NAME"]`
- `import.meta.env.VAR_NAME` and `import.meta.env["VAR_NAME"]`
- `Bun.env.VAR_NAME` and `Bun.env["VAR_NAME"]`
- `Deno.env.get("VAR_NAME")`

It validates them against:

1. Environment variables declared in `turbo.json(c)` (`globalEnv`, `globalPassThroughEnv`, task-level `env`, and task-level `passThroughEnv`)
2. Environment variables specified in the rule's `allowedEnvVars` option
3. Default allowed variables (common system vars and framework-specific patterns)

## Default Allowed Variables

The following environment variables are always allowed without explicit declaration:

**System variables:**

- `CI`, `HOME`, `PATH`, `PWD`, `SHELL`, `TZ`, `USER`

**Node.js:**

- `NODE_ENV`

**Framework and provider-specific patterns (all variables matching these prefixes):**

- `NEXT_PUBLIC_*` (Next.js)
- `VITE_*` (Vite)
- `REACT_APP_*` (Create React App)
- `VUE_APP_*` (Vue CLI)
- `NUXT_*` (Nuxt)
- `GATSBY_*` (Gatsby)
- `EXPO_PUBLIC_*` (Expo)
- `VERCEL`, `VERCEL_*` (Vercel)

## Examples

### Invalid

When `MY_VAR` is not declared in `turbo.json` or the allowed list:

```js
const value = process.env.MY_VAR;
```

### Valid

```js
// NODE_ENV is always allowed
const value = process.env.NODE_ENV;
```

## Options

Use the options to specify additional environment variables that are not declared in `globalEnv`,
`globalPassThroughEnv`, or task-level `env`/`passThroughEnv` in `turbo.json`.
Supports regular expression patterns (anchors `^` and `$` are implicit).

```json title='biome.json'
{
	"linter": {
		"rules": {
			"nursery": {
				"noUndeclaredEnvVars": {
					"options": {
						"allowedEnvVars": [
							"MY_APP_.*",
							"ACME_TOKEN"
						]
					}
				}
			}
		}
	}
}

```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/nursery/no_undeclared_env_vars.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/nursery/noUndeclaredEnvVars)

</TabItem>
</Tabs>

