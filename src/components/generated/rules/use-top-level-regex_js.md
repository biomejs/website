**Since**: `v1.8.0`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Require regex literals to be declared at the top level.

This rule is useful to avoid performance issues when using regex literals inside functions called many times (hot paths). Regex literals create a new RegExp object when they are evaluated. (See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) By declaring them at the top level, this overhead can be avoided.

It's important to note that this rule is not recommended for all cases. Placing regex literals at the top level can hurt startup times. In browser contexts, this can result in longer page loads.

Additionally, this rule ignores regular expressions with the `g` and/or `y` flags, as they maintain internal state and can cause
[side effects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex#avoiding_side_effects) when calling `test` and `exec` with them.

## Examples

### Invalid

```js
function foo(someString) {
    return /[a-Z]*/.test(someString)
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:12 <a href="https://biomejs.dev/linter/rules/use-top-level-regex">lint/nursery/useTopLevelRegex</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This regex literal is not defined in the top level scope. This can lead to performance issues if this function is called frequently.</span><br />  <br />    <strong>1 │ </strong>function foo(someString) {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    return /[a-Z]*/.test(someString)<br />   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>}<br />    <strong>4 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Move the regex literal outside of this scope, and place it at the top level of this module, as a constant.</span><br />  <br /></code></pre>

### Valid

```js
const REGEX = /[a-Z]*/;

function foo(someString) {
    return REGEX.test(someString)
}
```

```js
function foo(str) {
    return /[a-Z]*/g.exec(str)
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
