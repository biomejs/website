**Since**: `v1.0.0`
:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
:::

Sources: 
- Same as: <a href="https://eslint.org/docs/latest/rules/getter-return" target="_blank"><code>getter-return</code></a>

Enforce `get` methods to always return a value.

## Examples

### Invalid

```js
class Person {
    get firstName() {}
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:5 <a href="https://biomejs.dev/linter/rules/use-getter-return">lint/suspicious/useGetterReturn</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This </span><span style="color: Tomato;"><strong>getter</strong></span><span style="color: Tomato;"> should </span><span style="color: Tomato;"><strong>return</strong></span><span style="color: Tomato;"> a value.</span><br />  <br />    <strong>1 │ </strong>class Person {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    get firstName() {}<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>}<br />    <strong>4 │ </strong><br />  <br /></code></pre>

```js
const obj = {
    get firstName() {
        return;
    }
}
```

<pre class="language-text"><code class="language-text">code-block.js:3:9 <a href="https://biomejs.dev/linter/rules/use-getter-return">lint/suspicious/useGetterReturn</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This </span><span style="color: Tomato;"><strong>return</strong></span><span style="color: Tomato;"> should return a value because it is located in a </span><span style="color: Tomato;"><strong>getter</strong></span><span style="color: Tomato;">.</span><br />  <br />    <strong>1 │ </strong>const obj = {<br />    <strong>2 │ </strong>    get firstName() {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        return;<br />   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>    }<br />    <strong>5 │ </strong>}<br />  <br /></code></pre>

```js
class Option {
    get value() {
        if (this.hasValue) {
            log();
        } else {
            return null;
        }
    }
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:5 <a href="https://biomejs.dev/linter/rules/use-getter-return">lint/suspicious/useGetterReturn</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This </span><span style="color: Tomato;"><strong>getter</strong></span><span style="color: Tomato;"> should </span><span style="color: Tomato;"><strong>return</strong></span><span style="color: Tomato;"> a value.</span><br />  <br />     <strong>1 │ </strong>class Option {<br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    get value() {<br />    <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        if (this.hasValue) {<br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>4 │ </strong>            log();<br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>5 │ </strong>        } else {<br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>6 │ </strong>            return null;<br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>7 │ </strong>        }<br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>8 │ </strong>    }<br />    <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><br />     <strong>9 │ </strong>}<br />    <strong>10 │ </strong><br />  <br /></code></pre>

### Valid

```js
class Person {
    get firstName() {
        return this.fullname.split(" ")[0];
    }
}
```

```js
const obj = {
    get firstName() {
        return this.fullname.split(" ")[0];
    }
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
