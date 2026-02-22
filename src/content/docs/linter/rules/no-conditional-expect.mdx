---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noConditionalExpect
description: Learn more about noConditionalExpect
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
## Summary
- Rule available since: `v2.4.2`
- Diagnostic Category: [`lint/nursery/noConditionalExpect`](/reference/diagnostics#diagnostic-category)
- This rule doesn't have a fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- This rule belongs to the following domains:
  - [`test`](/linter/domains#test)
- Sources: 
  - Same as [`playwright/no-conditional-expect`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-conditional-expect.md)
  - Same as [`jest/no-conditional-expect`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-expect.md)
  - Same as [`vitest/no-conditional-expect`](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-conditional-expect.md)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"noConditionalExpect": "error"
			}
		}
	}
}

```
## Description
Disallow conditional `expect()` calls inside tests.

Conditional expectations are problematic because they can silently pass
when the condition is false, meaning assertions may never actually run.
This can lead to tests that pass despite bugs in the code.

If you need conditional testing logic, consider:

- Using `test.skip()` to skip the entire test
- Splitting into separate tests with clear conditions
- Using `expect.soft()` for optional assertions

## Examples

### Invalid

```js
test("conditional expect", async ({ page }) => {
    if (someCondition) {
        await expect(page).toHaveTitle("Title");
    }
});
```

<pre class="language-text"><code class="language-text">code-block.js:3:15 <a href="https://biomejs.dev/linter/rules/no-conditional-expect">lint/nursery/noConditionalExpect</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unexpected conditional </span><span style="color: lightgreen;"><strong>expect()</strong></span><span style="color: lightgreen;"> call.</span><br />  <br />    <strong>1 │ </strong>test(&quot;conditional expect&quot;, async (&#123; page &#125;) =&gt; &#123;<br />    <strong>2 │ </strong>    if (someCondition) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        await expect(page).toHaveTitle(&quot;Title&quot;);<br />   <strong>   │ </strong>              <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>    &#125;<br />    <strong>5 │ </strong>&#125;);<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This </span><span style="color: lightgreen;"><strong>expect()</strong></span><span style="color: lightgreen;"> is inside a if statement, which means it may not always run.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider using </span><span style="color: lightgreen;"><strong>test.skip()</strong></span><span style="color: lightgreen;"> to conditionally skip the test, or restructure to avoid conditional expectations.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```js
test("ternary expect", async ({ page }) => {
    someCondition ? await expect(page).toHaveTitle("Title") : null;
});
```

<pre class="language-text"><code class="language-text">code-block.js:2:27 <a href="https://biomejs.dev/linter/rules/no-conditional-expect">lint/nursery/noConditionalExpect</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unexpected conditional </span><span style="color: lightgreen;"><strong>expect()</strong></span><span style="color: lightgreen;"> call.</span><br />  <br />    <strong>1 │ </strong>test(&quot;ternary expect&quot;, async (&#123; page &#125;) =&gt; &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    someCondition ? await expect(page).toHaveTitle(&quot;Title&quot;) : null;<br />   <strong>   │ </strong>                          <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;);<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This </span><span style="color: lightgreen;"><strong>expect()</strong></span><span style="color: lightgreen;"> is inside a ternary expression, which means it may not always run.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider using </span><span style="color: lightgreen;"><strong>test.skip()</strong></span><span style="color: lightgreen;"> to conditionally skip the test, or restructure to avoid conditional expectations.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```js
test("catch expect", async ({ page }) => {
    try {
        await page.click("button");
    } catch (e) {
        await expect(page).toHaveTitle("Title");
    }
});
```

<pre class="language-text"><code class="language-text">code-block.js:5:15 <a href="https://biomejs.dev/linter/rules/no-conditional-expect">lint/nursery/noConditionalExpect</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unexpected conditional </span><span style="color: lightgreen;"><strong>expect()</strong></span><span style="color: lightgreen;"> call.</span><br />  <br />    <strong>3 │ </strong>        await page.click(&quot;button&quot;);<br />    <strong>4 │ </strong>    &#125; catch (e) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>5 │ </strong>        await expect(page).toHaveTitle(&quot;Title&quot;);<br />   <strong>   │ </strong>              <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>6 │ </strong>    &#125;<br />    <strong>7 │ </strong>&#125;);<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This </span><span style="color: lightgreen;"><strong>expect()</strong></span><span style="color: lightgreen;"> is inside a catch clause, which means it may not always run.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider using </span><span style="color: lightgreen;"><strong>test.skip()</strong></span><span style="color: lightgreen;"> to conditionally skip the test, or restructure to avoid conditional expectations.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

### Valid

```js
test("unconditional expect", async ({ page }) => {
    await expect(page).toHaveTitle("Title");
});
```

```js
test("skip based on condition", async ({ page }) => {
    test.skip(someCondition, "Reason to skip");
    await expect(page).toHaveTitle("Title");
});
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/nursery/no_conditional_expect.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/nursery/noConditionalExpect)

</TabItem>
</Tabs>

