---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.
editUrl: false

title: noVueUndeclaredDirectives (HTML)
description: HTML documentation for noVueUndeclaredDirectives
localized: false
---
import RuleLanguageLinks from "@/components/RuleLanguageLinks.astro";
import RulePlaygroundLink from "@/components/RulePlaygroundLink.astro";

<RuleLanguageLinks current="html" languages={[{"id":"html","label":"HTML","href":"/linter/rules/no-vue-undeclared-directives/html/"}]} />

:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
## Summary
- Rule available since: `v2.5.14`
- Diagnostic Category: [`lint/nursery/noVueUndeclaredDirectives`](/reference/diagnostics#diagnostic-category)
- This rule doesn't have a fix.
- The default severity of this rule is [**error**](/reference/diagnostics#error).
- This rule belongs to the following domains:
  - [`vue`](/linter/domains#vue)
## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"noVueUndeclaredDirectives": "error"
			}
		}
	}
}

```
## Description
Disallow custom Vue directives that are not declared.

Vue resolves a custom directive such as `v-highlight` at runtime. When nothing
registers it, Vue logs a warning and the element silently loses the behavior the
directive was supposed to add.

A custom directive is considered declared when any of the following registers it:

- a top-level `<script setup>` binding named after the directive, using the
camelCase form prefixed with `v`, such as `vHighlight` for `v-highlight`;
- the component's `directives` option, written either in `export default`,
in `defineComponent(...)`, or in `defineOptions(...)`;
- the rule's [`globals`](#globals) option, which is how a directive registered
globally with `app.directive(...)` is declared to Biome.

Built-in directives such as `v-if` are never reported. Nothing is reported either
when the component's options cannot be resolved statically, which happens when they
use `extends`, `mixins`, a spread, or a default export that is not an object literal,
or when a `<script>` block uses `src="..."` to load its content from another file.

## Examples

### Invalid

```vue
<template>
    <div v-highlight></div>
</template>
```

<Fragment set:html={"<pre class=\"language-text\"><code class=\"language-text\">code-block.vue:2:10 <a href=\"https://biomejs.dev/linter/rules/no-vue-undeclared-directives\">lint/nursery/noVueUndeclaredDirectives</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style=\"color: Tomato;\">✖</span></strong> <span style=\"color: Tomato;\">The custom directive </span><span style=\"color: Tomato;\"><strong>v-highlight</strong></span><span style=\"color: Tomato;\"> is undeclared.</span><br />  <br />    <strong>1 │ </strong>&lt;template&gt;<br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>2 │ </strong>    &lt;div v-highlight&gt;&lt;/div&gt;<br />   <strong>   │ </strong>         <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>3 │ </strong>&lt;/template&gt;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Declare </span><span style=\"color: lightgreen;\"><strong>vHighlight</strong></span><span style=\"color: lightgreen;\"> in &lt;script setup&gt;, register the directive in the component's directives option, or list it in the rule's globals option.</span><br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style=\"color: lightgreen;\"><a href=\"https://biomejs.dev/linter/#nursery\">https://biomejs.dev/linter/#nursery</a></span><span style=\"color: lightgreen;\"> for more information.</span><br />  <br /></code></pre>"} />

### Valid

A `<script setup>` binding declares the directive:

```vue
<script setup>
const vHighlight = {};
</script>

<template><div v-highlight></div></template>
```

So does the component's `directives` option:

```vue
<script>
export default {
    directives: { highlight: {} },
};
</script>

<template><div v-highlight></div></template>
```

## Options

### `globals`

A list of directive names that are registered globally with `app.directive(...)`.
Write each name in kebab-case, exactly as it appears in the template without the
`v-` prefix: `click-outside` for `v-click-outside`. Other spellings such as
`clickOutside` or `vClickOutside` do not match.

Default: `[]`

```json title='biome.json'
{
	"linter": {
		"rules": {
			"nursery": {
				"noVueUndeclaredDirectives": {
					"level": "on",
					"options": {
						"globals": [
							"click-outside"
						]
					}
				}
			}
		}
	}
}

```

#### Valid (using `globals`)

```vue
<template>
    <div v-click-outside></div>
</template>
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code (Edit this Page)](https://github.com/biomejs/biome/blob/main/crates/biome_html_analyze/src/lint/nursery/no_vue_undeclared_directives.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_html_analyze/tests/specs/nursery/noVueUndeclaredDirectives)
- <RulePlaygroundLink rule="noVueUndeclaredDirectives" category="lint" language="vue" code={"<template>\n    <div v-highlight></div>\n</template>\n"} />

