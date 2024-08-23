**Since**: `v1.8.0`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/error-message.md" target="_blank"><code>unicorn/error-message</code></a>

Enforce passing a message value when creating a built-in error.

This rule enforces a message value to be passed in when creating an instance of a built-in `Error` object,
which leads to more readable and debuggable code.

## Examples

### Invalid

```js
throw Error();
```

<pre class="language-text"><code class="language-text">code-block.js:1:12 <a href="https://biomejs.dev/linter/rules/use-error-message">lint/nursery/useErrorMessage</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Provide an error message for the error.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>throw Error();<br />   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Providing meaningful error messages leads to more readable and debuggable code.</span><br />  <br /></code></pre>

```js
throw Error('');
```

<pre class="language-text"><code class="language-text">code-block.js:1:12 <a href="https://biomejs.dev/linter/rules/use-error-message">lint/nursery/useErrorMessage</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Error message should not be an empty string.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>throw Error('');<br />   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Providing meaningful error messages leads to more readable and debuggable code.</span><br />  <br /></code></pre>

```js
throw new TypeError();
```

<pre class="language-text"><code class="language-text">code-block.js:1:20 <a href="https://biomejs.dev/linter/rules/use-error-message">lint/nursery/useErrorMessage</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Provide an error message for the error.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>throw new TypeError();<br />   <strong>   │ </strong>                   <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Providing meaningful error messages leads to more readable and debuggable code.</span><br />  <br /></code></pre>

```js
const error = new AggregateError(errors);
```

<pre class="language-text"><code class="language-text">code-block.js:1:33 <a href="https://biomejs.dev/linter/rules/use-error-message">lint/nursery/useErrorMessage</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Provide an error message for the error.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const error = new AggregateError(errors);<br />   <strong>   │ </strong>                                <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Providing meaningful error messages leads to more readable and debuggable code.</span><br />  <br /></code></pre>

### Valid

```js
throw Error('Unexpected property.');
```

```js
throw new TypeError('Array expected.');
```

```js
const error = new AggregateError(errors, 'Promises rejected.');
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
