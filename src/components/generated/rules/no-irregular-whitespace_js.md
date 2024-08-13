**Since**: `vnext`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://eslint.org/docs/latest/rules/no-irregular-whitespace" target="_blank"><code>no-irregular-whitespace</code></a>

Disallows the use of irregular whitespace characters.

Invalid or irregular whitespace causes issues with various parsers and also makes code harder to debug.

## Examples

### Invalid

```js
letcount;
```

<pre class="language-text"><code class="language-text">code-block.js:1:4 <a href="https://biomejs.dev/linter/rules/no-irregular-whitespace">lint/nursery/noIrregularWhitespace</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Irregular whitespaces found.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let<span style="opacity: 0.8;">␋</span>count;
   <strong>   │ </strong>   <strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Irregular whitespaces can cause issues to other parsers, and make the code harder to debug.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Replace the irregular whitespaces with normal whitespaces or tabs.</span>
  
</code></pre>

```js
let foo;
```

<pre class="language-text"><code class="language-text">code-block.js:1:4 <a href="https://biomejs.dev/linter/rules/no-irregular-whitespace">lint/nursery/noIrregularWhitespace</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Irregular whitespaces found.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let<span style="opacity: 0.8;">␠</span>foo;
   <strong>   │ </strong>   <strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Irregular whitespaces can cause issues to other parsers, and make the code harder to debug.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Replace the irregular whitespaces with normal whitespaces or tabs.</span>
  
</code></pre>

### Valid

```js
const count = 1;
```

```js
const foo = '';
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
