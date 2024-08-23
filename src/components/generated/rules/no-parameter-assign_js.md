**Since**: `v1.0.0`
:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
:::

Sources: 
- Same as: <a href="https://eslint.org/docs/latest/rules/no-param-reassign" target="_blank"><code>no-param-reassign</code></a>

Disallow reassigning `function` parameters.

Assignment to a `function` parameters can be misleading and confusing,
as modifying parameters will also mutate the `arguments` object.
It is often unintended and indicative of a programmer error.

In contrast to the _ESLint_ rule, this rule cannot be configured to report
assignments to a property of a parameter.

## Examples

### Invalid

```js
function f(param) {
    param = 13;
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:5 <a href="https://biomejs.dev/linter/rules/no-parameter-assign">lint/style/noParameterAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Reassigning a </span><span style="color: Tomato;"><strong>function parameter</strong></span><span style="color: Tomato;"> is confusing.</span><br />  <br />    <strong>1 │ </strong>function f(param) {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    param = 13;<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>}<br />    <strong>4 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The </span><span style="color: lightgreen;"><strong>parameter</strong></span><span style="color: lightgreen;"> is declared here:</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function f(param) {<br />   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>    param = 13;<br />    <strong>3 │ </strong>}<br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead.</span><br />  <br /></code></pre>

```js
function f(param) {
    param++;
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:5 <a href="https://biomejs.dev/linter/rules/no-parameter-assign">lint/style/noParameterAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Reassigning a </span><span style="color: Tomato;"><strong>function parameter</strong></span><span style="color: Tomato;"> is confusing.</span><br />  <br />    <strong>1 │ </strong>function f(param) {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    param++;<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>}<br />    <strong>4 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The </span><span style="color: lightgreen;"><strong>parameter</strong></span><span style="color: lightgreen;"> is declared here:</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function f(param) {<br />   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>    param++;<br />    <strong>3 │ </strong>}<br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead.</span><br />  <br /></code></pre>

```js
function f(param) {
    for (param of arr) {}
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:10 <a href="https://biomejs.dev/linter/rules/no-parameter-assign">lint/style/noParameterAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Reassigning a </span><span style="color: Tomato;"><strong>function parameter</strong></span><span style="color: Tomato;"> is confusing.</span><br />  <br />    <strong>1 │ </strong>function f(param) {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    for (param of arr) {}<br />   <strong>   │ </strong>         <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>}<br />    <strong>4 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The </span><span style="color: lightgreen;"><strong>parameter</strong></span><span style="color: lightgreen;"> is declared here:</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function f(param) {<br />   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>    for (param of arr) {}<br />    <strong>3 │ </strong>}<br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead.</span><br />  <br /></code></pre>

```ts
class C {
    constructor(readonly prop: number) {
        prop++
    }
}
```

<pre class="language-text"><code class="language-text">code-block.ts:3:9 <a href="https://biomejs.dev/linter/rules/no-parameter-assign">lint/style/noParameterAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Reassigning a </span><span style="color: Tomato;"><strong>function parameter</strong></span><span style="color: Tomato;"> is confusing.</span><br />  <br />    <strong>1 │ </strong>class C {<br />    <strong>2 │ </strong>    constructor(readonly prop: number) {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        prop++<br />   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>    }<br />    <strong>5 │ </strong>}<br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The </span><span style="color: lightgreen;"><strong>parameter</strong></span><span style="color: lightgreen;"> is declared here:</span><br />  <br />    <strong>1 │ </strong>class C {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    constructor(readonly prop: number) {<br />   <strong>   │ </strong>                         <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>        prop++<br />    <strong>4 │ </strong>    }<br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead.</span><br />  <br /></code></pre>

### Valid

```js
function f(param) {
    let local = param;
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
