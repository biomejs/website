---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noUnreachableSuper
description: Learn more about noUnreachableSuper
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
## Summary
- Rule available since: `v1.0.0`
- Diagnostic Category: [`lint/correctness/noUnreachableSuper`](/reference/diagnostics#diagnostic-category)
- This rule is **recommended**, meaning it is enabled by default.
- This rule doesn't have a fix.
- The default severity of this rule is [**error**](/reference/diagnostics#error).
- Sources: 
  - Same as [`no-this-before-super`](https://eslint.org/docs/latest/rules/no-this-before-super)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"correctness": {
				"noUnreachableSuper": "error"
			}
		}
	}
}

```
## Description
Ensures the `super()` constructor is called exactly once on every code  path in a class constructor before `this` is accessed if the class has a superclass

## Examples

### Invalid

```js
class A extends B {
    constructor() {}
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:5 <a href="https://biomejs.dev/docs/linter/rules/no-unreachable-super">lint/correctness/noUnreachableSuper</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This constructor has code paths that return without calling &#96;</span><span style="color: Tomato;"><strong>super()</strong></span><span style="color: Tomato;">&#96;.</span><br />  <br />    <strong>1 │ </strong>class A extends B &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    constructor() &#123;&#125;<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If this is intentional, add an explicit throw statement in unsupported paths.</span><br />  <br /></code></pre>

```js
class A extends B {
    constructor(value) {
        this.prop = value;
        super();
    }
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:5 <a href="https://biomejs.dev/docs/linter/rules/no-unreachable-super">lint/correctness/noUnreachableSuper</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This constructor has code paths accessing &#96;</span><span style="color: Tomato;"><strong>this</strong></span><span style="color: Tomato;">&#96; without calling &#96;</span><span style="color: Tomato;"><strong>super()</strong></span><span style="color: Tomato;">&#96; first.</span><br />  <br />    <strong>1 │ </strong>class A extends B &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    constructor(value) &#123;<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        this.prop = value;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>4 │ </strong>        super();<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>5 │ </strong>    &#125;<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><br />    <strong>6 │ </strong>&#125;<br />    <strong>7 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">&#96;</span><span style="color: lightgreen;"><strong>this</strong></span><span style="color: lightgreen;">&#96; is accessed here:</span><br />  <br />    <strong>1 │ </strong>class A extends B &#123;<br />    <strong>2 │ </strong>    constructor(value) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        this.prop = value;<br />   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>        super();<br />    <strong>5 │ </strong>    &#125;<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If this is intentional, add an explicit throw statement in unsupported paths.</span><br />  <br /></code></pre>

```js
class A extends B {
    constructor(cond) {
        if(cond) {
            super();
        }
    }
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:5 <a href="https://biomejs.dev/docs/linter/rules/no-unreachable-super">lint/correctness/noUnreachableSuper</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This constructor has code paths that return without calling &#96;</span><span style="color: Tomato;"><strong>super()</strong></span><span style="color: Tomato;">&#96;.</span><br />  <br />    <strong>1 │ </strong>class A extends B &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    constructor(cond) &#123;<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        if(cond) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>4 │ </strong>            super();<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>5 │ </strong>        &#125;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>6 │ </strong>    &#125;<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><br />    <strong>7 │ </strong>&#125;<br />    <strong>8 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If this is intentional, add an explicit throw statement in unsupported paths.</span><br />  <br /></code></pre>

### Valid

```js
export default class A extends B {
    constructor() {
        super();
    }
}
```

```js
export class A {
    constructor() {}
}
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/correctness/no_unreachable_super.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/correctness/noUnreachableSuper)

</TabItem>
</Tabs>

