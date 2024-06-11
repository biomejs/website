---
title: noEmptyBlockStatements (since v1.3.0)
---

**Diagnostic Category: `lint/suspicious/noEmptyBlockStatements`**

Sources: 
- Same as: <a href="https://eslint.org/docs/latest/rules/no-empty" target="_blank"><code>no-empty</code></a>
- Same as: <a href="https://eslint.org/docs/latest/rules/no-empty-static-block" target="_blank"><code>no-empty-static-block</code></a>
- Same as: <a href="https://eslint.org/docs/latest/rules/no-empty-function" target="_blank"><code>no-empty-function</code></a>
- Same as: <a href="https://typescript-eslint.io/rules/no-empty-function" target="_blank"><code>@typescript-eslint/no-empty-function</code></a>

Disallow empty block statements and static blocks.

Empty static blocks and block statements, while not technically errors, usually occur due to refactoring that wasn’t completed. They can cause confusion when reading code.

This rule disallows empty block statements and static blocks.
This rule ignores block statements or static blocks which contain a comment (for example, in an empty catch or finally block of a try statement to indicate that execution should continue regardless of errors).

## Examples

### Invalid

```js
function emptyFunctionBody () {}
```

<pre class="language-text"><code class="language-text">code-block.js:1:31 <a href="https://biomejs.dev/linter/rules/no-empty-block-statements">lint/suspicious/noEmptyBlockStatements</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Unexpected empty block.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function emptyFunctionBody () {}
   <strong>   │ </strong>                              <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Empty blocks are usually the result of an incomplete refactoring. Remove the empty block or add a comment inside it if it is intentional.</span>
  
</code></pre>

```js
try {
    doSomething();
} catch(ex) {

}
```

<pre class="language-text"><code class="language-text">code-block.js:3:13 <a href="https://biomejs.dev/linter/rules/no-empty-block-statements">lint/suspicious/noEmptyBlockStatements</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Unexpected empty block.</span>
  
    <strong>1 │ </strong>try {
    <strong>2 │ </strong>    doSomething();
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>} catch(ex) {
   <strong>   │ </strong>            <strong><span style="color: Tomato;">^</span></strong>
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>4 │ </strong>
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>5 │ </strong>}
   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>6 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Empty blocks are usually the result of an incomplete refactoring. Remove the empty block or add a comment inside it if it is intentional.</span>
  
</code></pre>

```js
class Foo {
  static {}
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:3 <a href="https://biomejs.dev/linter/rules/no-empty-block-statements">lint/suspicious/noEmptyBlockStatements</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Unexpected empty block.</span>
  
    <strong>1 │ </strong>class Foo {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  static {}
   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>}
    <strong>4 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Empty blocks are usually the result of an incomplete refactoring. Remove the empty block or add a comment inside it if it is intentional.</span>
  
</code></pre>

### Valid

```js
function foo () {
    doSomething();
}
```

```js
try {
  doSomething();
} catch (ex) {
  // continue regardless of error
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
