---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: useQwikMethodUsage
description: Learn more about useQwikMethodUsage
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JSX and TSX" icon="seti:javascript">
## Summary
- Rule available since: `v2.2.6`
- Diagnostic Category: [`lint/correctness/useQwikMethodUsage`](/reference/diagnostics#diagnostic-category)
- This rule is **recommended**, meaning it is enabled by default.
- This rule doesn't have a fix.
- The default severity of this rule is [**error**](/reference/diagnostics#error).
- This rule belongs to the following domains:
  - [`qwik`](/linter/domains#qwik)
- Sources: 
  - Same as [`qwik/use-method-usage`](https://qwik.dev/docs/advanced/eslint/#use-method-usage)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"correctness": {
				"useQwikMethodUsage": "error"
			}
		}
	}
}

```
## Description
Disallow `use*` hooks outside of `component$` or other `use*` hooks in Qwik applications.

Ensures Qwik's lifecycle hooks are only used in valid reactive contexts.
See [Qwik Component Lifecycle](https://qwik.dev/docs/components/lifecycle/) for proper hook usage.

## Examples

### Invalid

```js
import { useSignal } from "@builder.io/qwik";

export const Counter = () => {
  const count = useSignal(0);
};
```

<pre class="language-text"><code class="language-text">code-block.js:4:17 <a href="https://biomejs.dev/linter/rules/use-qwik-method-usage">lint/correctness/useQwikMethodUsage</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Qwik hook detected outside of an allowed scope.</span><br />  <br />    <strong>3 │ </strong>export const Counter = () =&gt; &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>4 │ </strong>  const count = useSignal(0);<br />   <strong>   │ </strong>                <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>5 │ </strong>&#125;;<br />    <strong>6 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Qwik's reactive hooks (functions starting with  </span><span style="color: lightgreen;"><strong>use&#42;</strong></span><span style="color: lightgreen;"> followed by uppercase letter) must be:<br /></span>    <span style="color: lightgreen;">- Used exclusively within &#96;component$&#96; functions<br /></span>    <span style="color: lightgreen;">- Or encapsulated within other valid Qwik hooks</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Check the </span><span style="color: lightgreen;"><a href="https://qwik.dev/docs/components/state/#use-methods">Qwik documentation</a></span><span style="color: lightgreen;">.</span><br />  <br /></code></pre>

### Valid

```js
import { component$, useSignal } from "@builder.io/qwik";

export const Counter = component$(() => {
  const count = useSignal(0);
});

export const useCounter = () => {
  const count = useSignal(0);
  return count;
};
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/correctness/use_qwik_method_usage.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/correctness/useQwikMethodUsage)

</TabItem>
</Tabs>

