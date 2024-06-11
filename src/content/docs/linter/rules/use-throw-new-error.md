---
title: useThrowNewError (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/useThrowNewError`**

:::note
- This rule has an **unsafe** fix.
- This rule is applied to **JavaScript and super languages** files.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md" target="_blank"><code>unicorn/throw-new-error</code></a>

Require `new` when throwing an error.

While it's possible to instantiate `Error` without using the `new` keyword, it's better to be consistent: modern builtins require `new` to be instantiated.

Rule matches errors when their name ends with the word "Error" and the first character is uppercase.

## Examples

### Invalid

```js
throw Error();
```

<pre class="language-text"><code class="language-text">code-block.js:1:7 <a href="https://biomejs.dev/linter/rules/use-throw-new-error">lint/nursery/useThrowNewError</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Use </span><span style="color: Orange;"><strong>new Error()</strong></span><span style="color: Orange;"> instead of </span><span style="color: Orange;"><strong>Error()</strong></span><span style="color: Orange;"> when throwing an error.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>throw Error();
   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Instantiate </span><span style="color: lightgreen;"><strong>Error</strong></span><span style="color: lightgreen;"> with </span><span style="color: lightgreen;"><strong>new</strong></span><span style="color: lightgreen;"> keyword for consistency with modern builtins.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add </span><span style="color: lightgreen;"><strong>new</strong></span><span style="color: lightgreen;"> keyword.</span>
  
<strong>  </strong><strong>  1 │ </strong>throw<span style="opacity: 0.8;">·</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">w</span><span style="opacity: 0.8;"><span style="color: MediumSeaGreen;">·</span></span>Error();
<strong>  </strong><strong>    │ </strong>      <span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span>        
</code></pre>

```js
throw TypeError('biome');
```

<pre class="language-text"><code class="language-text">code-block.js:1:7 <a href="https://biomejs.dev/linter/rules/use-throw-new-error">lint/nursery/useThrowNewError</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Use </span><span style="color: Orange;"><strong>new TypeError()</strong></span><span style="color: Orange;"> instead of </span><span style="color: Orange;"><strong>TypeError()</strong></span><span style="color: Orange;"> when throwing an error.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>throw TypeError('biome');
   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Instantiate </span><span style="color: lightgreen;"><strong>Error</strong></span><span style="color: lightgreen;"> with </span><span style="color: lightgreen;"><strong>new</strong></span><span style="color: lightgreen;"> keyword for consistency with modern builtins.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add </span><span style="color: lightgreen;"><strong>new</strong></span><span style="color: lightgreen;"> keyword.</span>
  
<strong>  </strong><strong>  1 │ </strong>throw<span style="opacity: 0.8;">·</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">w</span><span style="opacity: 0.8;"><span style="color: MediumSeaGreen;">·</span></span>TypeError('biome');
<strong>  </strong><strong>    │ </strong>      <span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span>                   
</code></pre>

```js
throw lib.TypeError();
```

<pre class="language-text"><code class="language-text">code-block.js:1:7 <a href="https://biomejs.dev/linter/rules/use-throw-new-error">lint/nursery/useThrowNewError</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Use </span><span style="color: Orange;"><strong>new TypeError()</strong></span><span style="color: Orange;"> instead of </span><span style="color: Orange;"><strong>TypeError()</strong></span><span style="color: Orange;"> when throwing an error.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>throw lib.TypeError();
   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Instantiate </span><span style="color: lightgreen;"><strong>Error</strong></span><span style="color: lightgreen;"> with </span><span style="color: lightgreen;"><strong>new</strong></span><span style="color: lightgreen;"> keyword for consistency with modern builtins.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add </span><span style="color: lightgreen;"><strong>new</strong></span><span style="color: lightgreen;"> keyword.</span>
  
<strong>  </strong><strong>  1 │ </strong>throw<span style="opacity: 0.8;">·</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">w</span><span style="opacity: 0.8;"><span style="color: MediumSeaGreen;">·</span></span>lib.TypeError();
<strong>  </strong><strong>    │ </strong>      <span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span>                
</code></pre>

### Valid

```js
throw new Error();
```

```js
throw new TypeError('biome');
```

```js
throw new lib.TypeError();
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
