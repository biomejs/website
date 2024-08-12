**Since**: `vnext`
:::note
- This rule has a **safe** fix.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://eslint.org/docs/latest/rules/no-useless-escape" target="_blank"><code>no-useless-escape</code></a>

Disallow unnecessary escape sequence in regular expression literals.

Escaping non-special characters in regular expression literals doesn't have any effect.
Hence, they may confuse a reader.

## Examples

### Invalid

```js
/\a/;
```

<pre class="language-text"><code class="language-text">code-block.js:1:2 <a href="https://biomejs.dev/linter/rules/no-useless-escape-in-regex">lint/nursery/noUselessEscapeInRegex</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The character doesn't need to be escaped.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>/\a/;
   <strong>   │ </strong> <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Unescape the character.</span>
  
<strong>  </strong><strong>  1 │ </strong>/<span style="color: Tomato;">\</span>a/;
<strong>  </strong><strong>    │ </strong> <span style="color: Tomato;">-</span>   
</code></pre>

```js
/[\-]/;
```

<pre class="language-text"><code class="language-text">code-block.js:1:3 <a href="https://biomejs.dev/linter/rules/no-useless-escape-in-regex">lint/nursery/noUselessEscapeInRegex</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The character doesn't need to be escaped.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>/[\-]/;
   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The character should only be escaped if it appears in the middle of the character class or under the `v` flag.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Unescape the character.</span>
  
<strong>  </strong><strong>  1 │ </strong>/[<span style="color: Tomato;">\</span>-]/;
<strong>  </strong><strong>    │ </strong>  <span style="color: Tomato;">-</span>    
</code></pre>

```js
/[\&]/v;
```

<pre class="language-text"><code class="language-text">code-block.js:1:3 <a href="https://biomejs.dev/linter/rules/no-useless-escape-in-regex">lint/nursery/noUselessEscapeInRegex</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The character doesn't need to be escaped.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>/[\&amp;]/v;
   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Unescape the character.</span>
  
<strong>  </strong><strong>  1 │ </strong>/[<span style="color: Tomato;">\</span>&amp;]/v;
<strong>  </strong><strong>    │ </strong>  <span style="color: Tomato;">-</span>     
</code></pre>

### Valid

```js
/\^\d\b/
```

```js
/[\b]/
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
