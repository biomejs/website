---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: useVueHyphenatedAttributes
description: Learn more about useVueHyphenatedAttributes
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="HTML" icon="seti:html">
:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
## Summary
- Rule available since: `v2.3.6`
- Diagnostic Category: [`lint/nursery/useVueHyphenatedAttributes`](/reference/diagnostics#diagnostic-category)
- This rule has an [**unsafe**](/linter/#unsafe-fixes) fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- This rule belongs to the following domains:
  - [`vue`](/linter/domains#vue)
- Sources: 
  - Same as [`vue/attribute-hyphenation`](https://eslint.vuejs.org/rules/attribute-hyphenation)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"useVueHyphenatedAttributes": "error"
			}
		}
	}
}

```
## Description
Enforce hyphenated (kebab-case) attribute names in Vue templates.

Vue style guide recommends using hyphenated attribute (and prop) names in templates to
keep them consistent and distinguish them from JavaScript identifiers written in camelCase/PascalCase.

This rule flags attributes that are detected as camelCase, PascalCase, CONSTANT_CASE, snake_case
or that contain any uppercase ASCII letter. It uses Biome's internal `Case::identify` helper.

Allowed:

- kebab-case attributes (e.g. `data-test-id`)
- pure lowercase single word attributes (e.g. `class`, `id`)

## Examples

### Invalid

```vue
<div fooBar="x"></div>
```

<pre class="language-text"><code class="language-text"></code></pre>

```vue
<MyComp :someProp="x" />
```

<pre class="language-text"><code class="language-text"></code></pre>

### Valid

```vue
<div data-test-id="x"></div>
<div class="foo"></div>
<MyComp :some-prop="x" />
```

## Options

The rule supports the following options:

### `ignore`

A list of attribute names that should be ignored by the rule (they won't be required to be hyphenated).
Use this when you have a fixed set of camelCase / PascalCase prop names you intentionally allow.

```json title='biome.json'
{
	"linter": {
		"rules": {
			"nursery": {
				"useVueHyphenatedAttributes": {
					"options": {
						"ignore": [
							"someProp",
							"fooBar"
						]
					}
				}
			}
		}
	}
}

```

#### Valid (using `ignore`)

```vue
<div fooBar="x"></div>
```

### `ignoreTags`

A list of tag names whose attributes should be skipped entirely.
This is useful for third-party or internal components that deliberately expose non‑hyphenated prop names.

```json title='biome.json'
{
	"linter": {
		"rules": {
			"nursery": {
				"useVueHyphenatedAttributes": {
					"options": {
						"ignoreTags": [
							"MyComp",
							"AnotherWidget"
						]
					}
				}
			}
		}
	}
}

```

#### Valid (using `ignoreTags`)

```vue
<MyComp :someProp="x" />
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_html_analyze/src/lint/nursery/use_vue_hyphenated_attributes.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_html_analyze/tests/specs/nursery/useVueHyphenatedAttributes)

</TabItem>
</Tabs>

