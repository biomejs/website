**Since**: `v1.0.0`
:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
:::

Sources: 
- Same as: <a href="https://eslint.org/docs/latest/rules/no-class-assign" target="_blank"><code>no-class-assign</code></a>

Disallow reassigning class members.

A class declaration creates a variable that we can modify, however, the modification is a mistake in most cases.

## Examples

### Invalid

```js
class A {}
A = 0;
```

<pre class="language-text"><code class="language-text">code-block.js:2:1 <a href="https://biomejs.dev/linter/rules/no-class-assign">lint/suspicious/noClassAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">'A' is a class.</span><br />  <br />    <strong>1 │ </strong>class A {}<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>A = 0;<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">'A' is defined here.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>class A {}<br />   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>A = 0;<br />    <strong>3 │ </strong><br />  <br /></code></pre>

```js
A = 0;
class A {}
```

<pre class="language-text"><code class="language-text">code-block.js:1:1 <a href="https://biomejs.dev/linter/rules/no-class-assign">lint/suspicious/noClassAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">'A' is a class.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>A = 0;<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>class A {}<br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">'A' is defined here.</span><br />  <br />    <strong>1 │ </strong>A = 0;<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>class A {}<br />   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br /></code></pre>

```js
class A {
	b() {
		A = 0;
	}
}
```

<pre class="language-text"><code class="language-text">code-block.js:3:3 <a href="https://biomejs.dev/linter/rules/no-class-assign">lint/suspicious/noClassAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">'A' is a class.</span><br />  <br />    <strong>1 │ </strong>class A {<br />    <strong>2 │ </strong>	b() {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>		A = 0;<br />   <strong>   │ </strong>		<strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>	}<br />    <strong>5 │ </strong>}<br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">'A' is defined here.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>class A {<br />   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>	b() {<br />    <strong>3 │ </strong>		A = 0;<br />  <br /></code></pre>

```js
let A = class A {
	b() {
		A = 0;
		// `let A` is shadowed by the class name.
	}
}
```

<pre class="language-text"><code class="language-text">code-block.js:3:3 <a href="https://biomejs.dev/linter/rules/no-class-assign">lint/suspicious/noClassAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">'A' is a class.</span><br />  <br />    <strong>1 │ </strong>let A = class A {<br />    <strong>2 │ </strong>	b() {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>		A = 0;<br />   <strong>   │ </strong>		<strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>		// `let A` is shadowed by the class name.<br />    <strong>5 │ </strong>	}<br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">'A' is defined here.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let A = class A {<br />   <strong>   │ </strong>              <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>	b() {<br />    <strong>3 │ </strong>		A = 0;<br />  <br /></code></pre>

### Valid

```js
let A = class A {}
A = 0; // A is a variable.
```

```js
let A = class {
    b() {
        A = 0; // A is a variable.
    }
}
```

```js
class A {
	b(A) {
		A = 0; // A is a parameter.
	}
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
