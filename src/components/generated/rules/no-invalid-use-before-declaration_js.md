**Since**: `v1.5.0`
:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
:::

Sources: 
- Same as: <a href="https://eslint.org/docs/latest/rules/no-use-before-define" target="_blank"><code>no-use-before-define</code></a>
- Same as: <a href="https://typescript-eslint.io/rules/no-use-before-define" target="_blank"><code>@typescript-eslint/no-use-before-define</code></a>

Disallow the use of variables and function parameters before their declaration

JavaScript doesn't allow the use of block-scoped variables (`let`, `const`) and function parameters before their declaration.
A `ReferenceError` will be thrown with any attempt to access the variable or the parameter before its declaration.

The rule also reports the use of variables declared with `var` before their declarations.

## Examples

### Invalid

```js
function f() {
    console.log(x);
    const x;
}
```

<pre class="language-text"><code class="language-text">code-block.js:3:11 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Const declarations must have an initialized value.</span>
  
    <strong>1 │ </strong>function f() {
    <strong>2 │ </strong>    console.log(x);
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>    const x;
   <strong>   │ </strong>          <strong><span style="color: Tomato;">^</span></strong>
    <strong>4 │ </strong>}
    <strong>5 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This variable needs to be initialized.</span>
  
</code></pre>

```js
function f() {
    console.log(x);
    var x = 0;
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:17 <a href="https://biomejs.dev/linter/rules/no-invalid-use-before-declaration">lint/correctness/noInvalidUseBeforeDeclaration</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This variable is used before its declaration.</span>
  
    <strong>1 │ </strong>function f() {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    console.log(x);
   <strong>   │ </strong>                <strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>    var x = 0;
    <strong>4 │ </strong>}
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The variable is declared here:</span>
  
    <strong>1 │ </strong>function f() {
    <strong>2 │ </strong>    console.log(x);
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>    var x = 0;
   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong>
    <strong>4 │ </strong>}
    <strong>5 │ </strong>
  
</code></pre>

```js
function f(a = b, b = 0) {}
```

<pre class="language-text"><code class="language-text">code-block.js:1:16 <a href="https://biomejs.dev/linter/rules/no-invalid-use-before-declaration">lint/correctness/noInvalidUseBeforeDeclaration</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This parameter is used before its declaration.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function f(a = b, b = 0) {}
   <strong>   │ </strong>               <strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The parameter is declared here:</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function f(a = b, b = 0) {}
   <strong>   │ </strong>                  <strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
</code></pre>

### Valid

```js
f();
function f() {}

new C();
class C {}
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

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
