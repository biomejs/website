---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.
editUrl: false

title: noReactObjectTypeAsDefaultProp (JavaScript)
description: JavaScript (and super languages) documentation for noReactObjectTypeAsDefaultProp
localized: false
---
import RuleLanguageLinks from "@/components/RuleLanguageLinks.astro";
import RulePlaygroundLink from "@/components/RulePlaygroundLink.astro";

<RuleLanguageLinks current="javascript" languages={[{"id":"javascript","label":"JavaScript (and super languages)","href":"/linter/rules/no-react-object-type-as-default-prop/javascript/"}]} />

:::note
This rule has been implemented but not released yet. It will be available in the next release.
:::
:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
## Summary
- Diagnostic Category: [`lint/nursery/noReactObjectTypeAsDefaultProp`](/reference/diagnostics#diagnostic-category)
- This rule doesn't have a fix.
- The default severity of this rule is [**error**](/reference/diagnostics#error).
- This rule belongs to the following domains:
  - [`react`](/linter/domains#react)
- Sources: 
  - Same as [`react/no-object-type-as-default-prop`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-object-type-as-default-prop.md)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"noReactObjectTypeAsDefaultProp": "error"
			}
		}
	}
}

```
## Description
Disallow array, object, and function values as default props in React components.

In React, a default prop value like `{ items = [] }` is created every
time the component renders. Arrays, objects, and functions are new values
each time, even when they look the same. React then thinks the prop changed,
so it may re-render the component more than needed, or re-run hooks like
`useEffect` that depends on the prop.

Numbers, strings, and other primitives are fine, because they stay the same
among renders.

## Examples

### Invalid

```js
function Component({ items = [] }) {
    return items;
}
```

<Fragment set:html={"<pre class=\"language-text\"><code class=\"language-text\">code-block.js:1:30 <a href=\"https://biomejs.dev/linter/rules/no-react-object-type-as-default-prop\">lint/nursery/noReactObjectTypeAsDefaultProp</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style=\"color: Tomato;\">✖</span></strong> <span style=\"color: Tomato;\">Every render creates an array literal here.</span><br />  <br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>1 │ </strong>function Component(&#123; items = [] &#125;) &#123;<br />   <strong>   │ </strong>                             <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>2 │ </strong>    return items;<br />    <strong>3 │ </strong>&#125;<br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">React sees this as a different value each render, so the component may re-render more than needed.</span><br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Move this value to a constant outside the component and use that as the default.</span><br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style=\"color: lightgreen;\"><a href=\"https://biomejs.dev/linter/#nursery\">https://biomejs.dev/linter/#nursery</a></span><span style=\"color: lightgreen;\"> for more information.</span><br />  <br /></code></pre>"} />

```js
const Component = ({ config = {} }) => config;
```

<Fragment set:html={"<pre class=\"language-text\"><code class=\"language-text\">code-block.js:1:31 <a href=\"https://biomejs.dev/linter/rules/no-react-object-type-as-default-prop\">lint/nursery/noReactObjectTypeAsDefaultProp</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style=\"color: Tomato;\">✖</span></strong> <span style=\"color: Tomato;\">Every render creates an object literal here.</span><br />  <br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>1 │ </strong>const Component = (&#123; config = &#123;&#125; &#125;) =&gt; config;<br />   <strong>   │ </strong>                              <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">React sees this as a different value each render, so the component may re-render more than needed.</span><br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Move this value to a constant outside the component and use that as the default.</span><br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style=\"color: lightgreen;\"><a href=\"https://biomejs.dev/linter/#nursery\">https://biomejs.dev/linter/#nursery</a></span><span style=\"color: lightgreen;\"> for more information.</span><br />  <br /></code></pre>"} />

### Valid

```js
const EMPTY_ITEMS = [];

function Component({ items = EMPTY_ITEMS }) {
    return items;
}
```

```js
function Component({ count = 0, label = "default" }) {
    return count;
}
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code (Edit this Page)](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/nursery/no_react_object_type_as_default_prop.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/nursery/noReactObjectTypeAsDefaultProp)
- <RulePlaygroundLink rule="noReactObjectTypeAsDefaultProp" category="lint" language="js" code={"function Component({ items = [] }) {\n    return items;\n}\n"} />

