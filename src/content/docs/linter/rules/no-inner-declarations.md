---
title: noInnerDeclarations (since v1.0.0)
---

**Diagnostic Category: `lint/correctness/noInnerDeclarations`**

:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule is applied to **JavaScript and super languages** files.
:::

Sources: 
- Same as: <a href="https://eslint.org/docs/latest/rules/no-inner-declarations" target="_blank"><code>no-inner-declarations</code></a>

Disallow `function` and `var` declarations that are accessible outside their block.

A `var` is accessible in the whole body of the nearest root (function, module, script, static block).
To avoid confusion, they should be declared to the nearest root.

Prior to ES2015, `function` declarations were only allowed in the nearest root,
though parsers sometimes erroneously accept them elsewhere.
In ES2015, inside an _ES module_, a `function` declaration is always block-scoped.

Note that `const` and `let` declarations are block-scoped,
and therefore they are not affected by this rule.
Moreover, `function` declarations in nested blocks are allowed inside _ES modules_.

## Examples

### Invalid

```cjs
if (test) {
    function f() {}
}
```

<pre class="language-text"><code class="language-text">code-block.cjs:2:5 <a href="https://biomejs.dev/linter/rules/no-inner-declarations">lint/correctness/noInnerDeclarations</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This </span><span style="color: Tomato;"><strong>function</strong></span><span style="color: Tomato;"> should be declared at the root of the </span><span style="color: Tomato;"><strong>script</strong></span><span style="color: Tomato;">.</span>
  
    <strong>1 │ </strong>if (test) {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    function f() {}
   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>}
    <strong>4 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The </span><span style="color: lightgreen;"><strong>function</strong></span><span style="color: lightgreen;"> is accessible in the whole body of the </span><span style="color: lightgreen;"><strong>script</strong></span><span style="color: lightgreen;">.
</span><span style="color: lightgreen;">  </span><span style="color: lightgreen;">  </span><span style="color: lightgreen;">To avoid confusion, it should be declared at the root of the </span><span style="color: lightgreen;"><strong>script</strong></span><span style="color: lightgreen;">.</span>
  
</code></pre>

```js
if (test) {
    var x = 1;
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:5 <a href="https://biomejs.dev/linter/rules/no-inner-declarations">lint/correctness/noInnerDeclarations</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This </span><span style="color: Tomato;"><strong>var</strong></span><span style="color: Tomato;"> should be declared at the root of the </span><span style="color: Tomato;"><strong>module</strong></span><span style="color: Tomato;">.</span>
  
    <strong>1 │ </strong>if (test) {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    var x = 1;
   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>}
    <strong>4 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The </span><span style="color: lightgreen;"><strong>var</strong></span><span style="color: lightgreen;"> is accessible in the whole body of the </span><span style="color: lightgreen;"><strong>module</strong></span><span style="color: lightgreen;">.
</span><span style="color: lightgreen;">  </span><span style="color: lightgreen;">  </span><span style="color: lightgreen;">To avoid confusion, it should be declared at the root of the </span><span style="color: lightgreen;"><strong>module</strong></span><span style="color: lightgreen;">.</span>
  
</code></pre>

```cjs
function f() {
    if (test) {
        function g() {}
    }
}
```

<pre class="language-text"><code class="language-text">code-block.cjs:3:9 <a href="https://biomejs.dev/linter/rules/no-inner-declarations">lint/correctness/noInnerDeclarations</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This </span><span style="color: Tomato;"><strong>function</strong></span><span style="color: Tomato;"> should be declared at the root of the </span><span style="color: Tomato;"><strong>enclosing function</strong></span><span style="color: Tomato;">.</span>
  
    <strong>1 │ </strong>function f() {
    <strong>2 │ </strong>    if (test) {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        function g() {}
   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>4 │ </strong>    }
    <strong>5 │ </strong>}
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The </span><span style="color: lightgreen;"><strong>function</strong></span><span style="color: lightgreen;"> is accessible in the whole body of the </span><span style="color: lightgreen;"><strong>enclosing function</strong></span><span style="color: lightgreen;">.
</span><span style="color: lightgreen;">  </span><span style="color: lightgreen;">  </span><span style="color: lightgreen;">To avoid confusion, it should be declared at the root of the </span><span style="color: lightgreen;"><strong>enclosing function</strong></span><span style="color: lightgreen;">.</span>
  
</code></pre>

```js
function f() {
    if (test) {
        var x = 1;
    }
}
```

<pre class="language-text"><code class="language-text">code-block.js:3:9 <a href="https://biomejs.dev/linter/rules/no-inner-declarations">lint/correctness/noInnerDeclarations</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This </span><span style="color: Tomato;"><strong>var</strong></span><span style="color: Tomato;"> should be declared at the root of the </span><span style="color: Tomato;"><strong>enclosing function</strong></span><span style="color: Tomato;">.</span>
  
    <strong>1 │ </strong>function f() {
    <strong>2 │ </strong>    if (test) {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        var x = 1;
   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>4 │ </strong>    }
    <strong>5 │ </strong>}
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The </span><span style="color: lightgreen;"><strong>var</strong></span><span style="color: lightgreen;"> is accessible in the whole body of the </span><span style="color: lightgreen;"><strong>enclosing function</strong></span><span style="color: lightgreen;">.
</span><span style="color: lightgreen;">  </span><span style="color: lightgreen;">  </span><span style="color: lightgreen;">To avoid confusion, it should be declared at the root of the </span><span style="color: lightgreen;"><strong>enclosing function</strong></span><span style="color: lightgreen;">.</span>
  
</code></pre>

### Valid

```js
// inside a module, function declarations are block-scoped and thus allowed.
if (test) {
    function f() {}
}
export {}
```

```js
function f() { }
```

```js
function f() {
    function g() {}
}
```

```js
function f() {
    var x = 1;
}
```

```js
function f() {
    if (test) {
        const g = function() {};
    }
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
