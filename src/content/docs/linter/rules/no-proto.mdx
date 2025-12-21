---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noProto
description: Learn more about noProto
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
## Summary
- Rule available since: `v2.3.8`
- Diagnostic Category: [`lint/nursery/noProto`](/reference/diagnostics#diagnostic-category)
- This rule doesn't have a fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- Sources: 
  - Same as [`no-proto`](https://eslint.org/docs/latest/rules/no-proto)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"noProto": "error"
			}
		}
	}
}

```
## Description
Disallow the use of the deprecated `__proto__` object property.

[`Object.prototype.__proto__`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
is a special accessor used to get or set the prototype of an object. \

However, it has been **deprecated** since _ECMAScript 2009_, being much slower and much less reliable than its
modern counterparts [`Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
and [`Object.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf).

Since it is a regular property on `Object.prototype`,
`__proto__` **will not work** on `null`-prototype objects that do not extend from `Object.prototype`
nor ones having created their own `__proto__` properties via `Object.defineProperty`.

As such, this rule encourages the use of `Object.getPrototypeOf()` and `Object.setPrototypeOf()`
in lieu of directly accessing `__proto__`.

:::info
Note that this does **not** check for the use of `__proto__` inside object literal definitions
to set a newly created object's prototype, <br />
which is standard practice and well-optimized in modern browsers.
:::

## Examples

### Invalid

```js
obj.__proto__ = a;
```

<pre class="language-text"><code class="language-text">code-block.js:1:1 <a href="https://biomejs.dev/linter/rules/no-proto">lint/nursery/noProto</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Avoid use of the deprecated </span><span style="color: lightgreen;"><strong>&#95;&#95;proto&#95;&#95;</strong></span><span style="color: lightgreen;"> accessor.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>obj.&#95;&#95;proto&#95;&#95; = a;<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>Object.prototype.&#95;&#95;proto&#95;&#95;</strong></span><span style="color: lightgreen;"> is an outdated way to get or set an object's prototype,<br /></span>    <span style="color: lightgreen;">having been </span><span style="color: lightgreen;"><strong>deprecated in 2009</strong></span><span style="color: lightgreen;"> for being inefficient and unreliable.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>Object.getPrototypeOf()</strong></span><span style="color: lightgreen;"> and </span><span style="color: lightgreen;"><strong>Object.setPrototypeOf()</strong></span><span style="color: lightgreen;"> are modern alternatives that work on all objects and are more performant.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```js
const b = obj.__proto__;
```

<pre class="language-text"><code class="language-text">code-block.js:1:11 <a href="https://biomejs.dev/linter/rules/no-proto">lint/nursery/noProto</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Avoid use of the deprecated </span><span style="color: lightgreen;"><strong>&#95;&#95;proto&#95;&#95;</strong></span><span style="color: lightgreen;"> accessor.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const b = obj.&#95;&#95;proto&#95;&#95;;<br />   <strong>   │ </strong>          <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>Object.prototype.&#95;&#95;proto&#95;&#95;</strong></span><span style="color: lightgreen;"> is an outdated way to get or set an object's prototype,<br /></span>    <span style="color: lightgreen;">having been </span><span style="color: lightgreen;"><strong>deprecated in 2009</strong></span><span style="color: lightgreen;"> for being inefficient and unreliable.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>Object.getPrototypeOf()</strong></span><span style="color: lightgreen;"> and </span><span style="color: lightgreen;"><strong>Object.setPrototypeOf()</strong></span><span style="color: lightgreen;"> are modern alternatives that work on all objects and are more performant.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

### Valid

```js
const a = Object.getPrototypeOf(obj);
```

```js
Object.setPrototypeOf(obj, b);
```

```js
// This sets `foo`'s prototype to `null` (similar to `Object.create`), and is
// well-defined across browsers.
const foo = {
  __proto__: null,
  a: 1,
}
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/nursery/no_proto.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/nursery/noProto)

</TabItem>
</Tabs>

