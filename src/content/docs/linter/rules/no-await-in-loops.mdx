---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noAwaitInLoops
description: Learn more about noAwaitInLoops
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
## Summary
- Rule available since: `v2.0.0`
- Diagnostic Category: [`lint/performance/noAwaitInLoops`](/reference/diagnostics#diagnostic-category)
- This rule isn't recommended, so you need to enable it.
- This rule doesn't have a fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- Sources: 
  - Same as [`no-await-in-loop`](https://eslint.org/docs/latest/rules/no-await-in-loop)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"performance": {
				"noAwaitInLoops": "error"
			}
		}
	}
}

```
## Description
Disallow `await` inside loops.

Using `await` in a loop makes your asynchronous operations run one after another instead of all at once. This can slow things down and might cause unhandled errors. Instead, create all the promises together and then wait for them simultaneously using methods like `Promise.all()`.

## Examples

### Invalid

```js
async function invalid() {
    for (const thing of things) {
        const result = await asyncWork();
    }
}
```

<pre class="language-text"><code class="language-text">code-block.js:3:24 <a href="https://biomejs.dev/linter/rules/no-await-in-loops">lint/performance/noAwaitInLoops</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Avoid using </span><span style="color: lightgreen;"><strong>await</strong></span><span style="color: lightgreen;"> inside loops.</span><br />  <br />    <strong>1 │ </strong>async function invalid() &#123;<br />    <strong>2 │ </strong>    for (const thing of things) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        const result = await asyncWork();<br />   <strong>   │ </strong>                       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>    &#125;<br />    <strong>5 │ </strong>&#125;<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Using </span><span style="color: lightgreen;"><strong>await</strong></span><span style="color: lightgreen;"> inside loops might cause performance issues or unintended sequential execution, consider use </span><span style="color: lightgreen;"><strong>Promise.all()</strong></span><span style="color: lightgreen;"> instead.</span><br />  <br /></code></pre>

### Valid

```js
async function valid() {
    await Promise.all(things.map((thing) => asyncWork(thing)))
}
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/performance/no_await_in_loops.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/performance/noAwaitInLoops)

</TabItem>
</Tabs>

