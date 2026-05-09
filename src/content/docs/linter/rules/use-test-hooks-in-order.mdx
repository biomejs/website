---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.
editUrl: false

title: useTestHooksInOrder
description: Learn more about useTestHooksInOrder
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
## Summary
- Rule available since: `v2.4.15`
- Diagnostic Category: [`lint/nursery/useTestHooksInOrder`](/reference/diagnostics#diagnostic-category)
- This rule doesn't have a fix.
- The default severity of this rule is [**warning**](/reference/diagnostics#warning).
- This rule belongs to the following domains:
  - [`test`](/linter/domains#test)
- Sources: 
  - Same as [`jest/prefer-hooks-in-order`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-in-order.md)
  - Same as [`vitest/prefer-hooks-in-order`](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-hooks-in-order.md)
  - Same as [`playwright/prefer-hooks-in-order`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/prefer-hooks-in-order.md)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"useTestHooksInOrder": "error"
			}
		}
	}
}

```
## Description
Enforce that test lifecycle hooks are declared in the order they execute.

Jest and Vitest always execute lifecycle hooks in the following order,
regardless of how they are written in the file:

1. `beforeAll` (or `before` if you are using `node:test`)
2. `beforeEach`
3. `afterEach`
4. `afterAll` (or `after` if you are using `node:test`)

Writing the hooks in a different order creates a discrepancy between
the visual order in the source and the actual execution order, which
makes test code harder to reason about.

This rule flags any hook that appears after a hook that runs later in the
execution order. Only consecutive groups of hooks in the same block are
compared — test cases and other statements between hooks are allowed and
reset the comparison baseline.

## Examples

### Invalid

```js
describe('foo', () => {
  beforeEach(() => {});
  beforeAll(() => {});
});
```

<pre class="language-text"><code class="language-text">code-block.js:3:3 <a href="https://biomejs.dev/linter/rules/use-test-hooks-in-order">lint/nursery/useTestHooksInOrder</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;"><strong>beforeAll</strong></span><span style="color: Orange;"> is out of order compared to </span><span style="color: Orange;"><strong>beforeEach</strong></span><span style="color: Orange;">.</span><br />  <br />    <strong>1 │ </strong>describe('foo', () =&gt; &#123;<br />    <strong>2 │ </strong>  beforeEach(() =&gt; &#123;&#125;);<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>  beforeAll(() =&gt; &#123;&#125;);<br />   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>&#125;);<br />    <strong>5 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>beforeEach</strong></span><span style="color: lightgreen;"> is declared here but executes after </span><span style="color: lightgreen;"><strong>beforeAll</strong></span><span style="color: lightgreen;">.</span><br />  <br />    <strong>1 │ </strong>describe('foo', () =&gt; &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  beforeEach(() =&gt; &#123;&#125;);<br />   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>  beforeAll(() =&gt; &#123;&#125;);<br />    <strong>4 │ </strong>&#125;);<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Reorder the lifecycle hooks to appear in the order they execute: </span><span style="color: lightgreen;"><strong>beforeAll/before</strong></span><span style="color: lightgreen;">, </span><span style="color: lightgreen;"><strong>beforeEach</strong></span><span style="color: lightgreen;">, </span><span style="color: lightgreen;"><strong>afterEach</strong></span><span style="color: lightgreen;">, </span><span style="color: lightgreen;"><strong>afterAll/after</strong></span><span style="color: lightgreen;">.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```js
describe('foo', () => {
  afterEach(() => {});
  afterAll(() => {});
  beforeAll(() => {});
});
```

<pre class="language-text"><code class="language-text">code-block.js:4:3 <a href="https://biomejs.dev/linter/rules/use-test-hooks-in-order">lint/nursery/useTestHooksInOrder</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;"><strong>beforeAll</strong></span><span style="color: Orange;"> is out of order compared to </span><span style="color: Orange;"><strong>afterAll</strong></span><span style="color: Orange;">.</span><br />  <br />    <strong>2 │ </strong>  afterEach(() =&gt; &#123;&#125;);<br />    <strong>3 │ </strong>  afterAll(() =&gt; &#123;&#125;);<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>4 │ </strong>  beforeAll(() =&gt; &#123;&#125;);<br />   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>5 │ </strong>&#125;);<br />    <strong>6 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>afterAll</strong></span><span style="color: lightgreen;"> is declared here but executes after </span><span style="color: lightgreen;"><strong>beforeAll</strong></span><span style="color: lightgreen;">.</span><br />  <br />    <strong>1 │ </strong>describe('foo', () =&gt; &#123;<br />    <strong>2 │ </strong>  afterEach(() =&gt; &#123;&#125;);<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>  afterAll(() =&gt; &#123;&#125;);<br />   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>  beforeAll(() =&gt; &#123;&#125;);<br />    <strong>5 │ </strong>&#125;);<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Reorder the lifecycle hooks to appear in the order they execute: </span><span style="color: lightgreen;"><strong>beforeAll/before</strong></span><span style="color: lightgreen;">, </span><span style="color: lightgreen;"><strong>beforeEach</strong></span><span style="color: lightgreen;">, </span><span style="color: lightgreen;"><strong>afterEach</strong></span><span style="color: lightgreen;">, </span><span style="color: lightgreen;"><strong>afterAll/after</strong></span><span style="color: lightgreen;">.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

### Valid

```js
describe('foo', () => {
  beforeAll(() => {});
  beforeEach(() => {});
  afterEach(() => {});
  afterAll(() => {});
});
```

```js
// Hooks separated by test cases are treated independently.
describe('foo', () => {
  beforeEach(() => {});
  it('a test', () => {});
  afterAll(() => {});
});
```

See [`useTestHooksOnTop`](https://biomejs.dev/linter/rules/use-test-hooks-on-top) if you want to group all the hooks at the top of the block, before any test cases.

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code (Edit this Page)](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/nursery/use_test_hooks_in_order.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/nursery/useTestHooksInOrder)

</TabItem>
</Tabs>

