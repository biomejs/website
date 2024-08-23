**Since**: `v1.0.0`
:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
:::

Sources: 
- Same as: <a href="https://eslint.org/docs/latest/rules/constructor-super" target="_blank"><code>constructor-super</code></a>

Prevents the incorrect use of `super()` inside classes. It also checks whether a call `super()` is missing from classes that extends other constructors.

## Examples

### Invalid

```js
class A {
    constructor() {
        super();
    }
}
```

<pre class="language-text"><code class="language-text">code-block.js:3:9 <a href="https://biomejs.dev/linter/rules/no-invalid-constructor-super">lint/correctness/noInvalidConstructorSuper</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This class should not have a </span><span style="color: Tomato;"><strong>super()</strong></span><span style="color: Tomato;"> call. You should remove it.</span><br />  <br />    <strong>1 │ </strong>class A {<br />    <strong>2 │ </strong>    constructor() {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        super();<br />   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>    }<br />    <strong>5 │ </strong>}<br />  <br /></code></pre>

```js
class A extends undefined {
    constructor() {
        super();
    }
}
```

<pre class="language-text"><code class="language-text">code-block.js:3:9 <a href="https://biomejs.dev/linter/rules/no-invalid-constructor-super">lint/correctness/noInvalidConstructorSuper</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This class calls </span><span style="color: Tomato;"><strong>super()</strong></span><span style="color: Tomato;">, but the class extends from a non-constructor.</span><br />  <br />    <strong>1 │ </strong>class A extends undefined {<br />    <strong>2 │ </strong>    constructor() {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        super();<br />   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>    }<br />    <strong>5 │ </strong>}<br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This is where the non-constructor is used.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>class A extends undefined {<br />   <strong>   │ </strong>                <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>    constructor() {<br />    <strong>3 │ </strong>        super();<br />  <br /></code></pre>

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

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
