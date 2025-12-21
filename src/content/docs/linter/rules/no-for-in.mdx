---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noForIn
description: Learn more about noForIn
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
## Summary
- Rule available since: `v2.3.6`
- Diagnostic Category: [`lint/nursery/noForIn`](/reference/diagnostics#diagnostic-category)
- This rule doesn't have a fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- Sources: 
  - Inspired from [`@typescript-eslint/no-for-in-array`](https://typescript-eslint.io/rules/no-for-in-array)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"noForIn": "error"
			}
		}
	}
}

```
## Description
Disallow iterating using a for-in loop.

A for-in loop (`for (const i in o)`) iterates over the properties of an Object. While it is legal to use for-in loops with array values, it is not common. There are several potential bugs with this:

1. It iterates over all enumerable properties, including non-index ones and the entire prototype chain. For example, [`RegExp.prototype.exec`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) returns an array with additional properties, and `for-in` will iterate over them. Some libraries or even your own code may add additional methods to `Array.prototype` (either as polyfill or as custom methods), and if not done properly, they may be iterated over as well.
2. It skips holes in the array. While sparse arrays are rare and advised against, they are still possible and your code should be able to handle them.
3. The "index" is returned as a string, not a number. This can be caught by TypeScript, but can still lead to subtle bugs.

You may have confused for-in with for-of, which iterates over the elements of the array. If you actually need the index, use a regular `for` loop or the `forEach` method.

## Examples

### Invalid

```js
for (const i in array) {
  console.log(i, array[i]);
}
```

<pre class="language-text"><code class="language-text">code-block.js:1:1 <a href="https://biomejs.dev/linter/rules/no-for-in">lint/nursery/noForIn</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unexpected for-in loop.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>for (const i in array) &#123;<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  console.log(i, array[i]);<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>&#125;<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">For-in loops are confusing and easy to misuse. You likely want to use a regular loop, for-of loop or forEach instead.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

### Valid

```js
for (const value of array) {
  console.log(value);
}
```

```js
for (let i = 0; i < array.length; i += 1) {
  console.log(i, array[i]);
}
```

```js
array.forEach((value, i) => {
  console.log(i, value);
});
```

```js
for (const [i, value] of array.entries()) {
  console.log(i, value);
}
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/nursery/no_for_in.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/nursery/noForIn)

</TabItem>
</Tabs>

