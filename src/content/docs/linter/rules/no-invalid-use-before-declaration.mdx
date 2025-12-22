---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noInvalidUseBeforeDeclaration
description: Learn more about noInvalidUseBeforeDeclaration
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
## Summary
- Rule available since: `v1.5.0`
- Diagnostic Category: [`lint/correctness/noInvalidUseBeforeDeclaration`](/reference/diagnostics#diagnostic-category)
- This rule is **recommended**, meaning it is enabled by default.
- This rule doesn't have a fix.
- The default severity of this rule is [**error**](/reference/diagnostics#error).
- Sources: 
  - Same as [`no-use-before-define`](https://eslint.org/docs/latest/rules/no-use-before-define)
  - Same as [`@typescript-eslint/no-use-before-define`](https://typescript-eslint.io/rules/no-use-before-define)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"correctness": {
				"noInvalidUseBeforeDeclaration": "error"
			}
		}
	}
}

```
## Description
Disallow the use of variables, function parameters, classes, and enums before their declaration

JavaScript doesn't allow the use of block-scoped variables (`let`, `const`), function parameters, and classes before their declaration.
Similarly TypeScript doesn't allow the use of enums before their declaration.
A `ReferenceError` will be thrown with any attempt to access the variable or the parameter before its declaration.

The rule also reports the use of variables declared with `var` before their declarations.

## Examples

### Invalid

```js
function f() {
    console.log(x);
    let x;
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:17 <a href="https://biomejs.dev/linter/rules/no-invalid-use-before-declaration">lint/correctness/noInvalidUseBeforeDeclaration</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This variable is used before its declaration.</span><br />  <br />    <strong>1 │ </strong>function f() &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    console.log(x);<br />   <strong>   │ </strong>                <strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>    let x;<br />    <strong>4 │ </strong>&#125;<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The variable is declared here:</span><br />  <br />    <strong>1 │ </strong>function f() &#123;<br />    <strong>2 │ </strong>    console.log(x);<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>    let x;<br />   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>&#125;<br />    <strong>5 │ </strong><br />  <br /></code></pre>

```js
function f() {
    console.log(x);
    var x = 0;
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:17 <a href="https://biomejs.dev/linter/rules/no-invalid-use-before-declaration">lint/correctness/noInvalidUseBeforeDeclaration</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This variable is used before its declaration.</span><br />  <br />    <strong>1 │ </strong>function f() &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    console.log(x);<br />   <strong>   │ </strong>                <strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>    var x = 0;<br />    <strong>4 │ </strong>&#125;<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The variable is declared here:</span><br />  <br />    <strong>1 │ </strong>function f() &#123;<br />    <strong>2 │ </strong>    console.log(x);<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>    var x = 0;<br />   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>&#125;<br />    <strong>5 │ </strong><br />  <br /></code></pre>

```js
function f(a = b, b = 0) {}
```

<pre class="language-text"><code class="language-text">code-block.js:1:16 <a href="https://biomejs.dev/linter/rules/no-invalid-use-before-declaration">lint/correctness/noInvalidUseBeforeDeclaration</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This parameter is used before its declaration.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function f(a = b, b = 0) &#123;&#125;<br />   <strong>   │ </strong>               <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The parameter is declared here:</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function f(a = b, b = 0) &#123;&#125;<br />   <strong>   │ </strong>                  <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /></code></pre>

```js
new C();
class C {}
```

<pre class="language-text"><code class="language-text">code-block.js:1:5 <a href="https://biomejs.dev/linter/rules/no-invalid-use-before-declaration">lint/correctness/noInvalidUseBeforeDeclaration</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This class is used before its declaration.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>new C();<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>class C &#123;&#125;<br />    <strong>3 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The class is declared here:</span><br />  <br />    <strong>1 │ </strong>new C();<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>class C &#123;&#125;<br />   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br /></code></pre>

### Valid

```js
f();
function f() {}
```

```js
// An export can reference a variable before its declaration.
export { CONSTANT };
const CONSTANT = 0;
```

```js
function f() { return CONSTANT; }
const CONSTANT = 0;
```

```ts
function f() {
    new C();
}
let c: C;
class C {}
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/correctness/no_invalid_use_before_declaration.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/correctness/noInvalidUseBeforeDeclaration)

</TabItem>
</Tabs>

