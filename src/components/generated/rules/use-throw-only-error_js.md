**Since**: `v1.8.0`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Inspired from: <a href="https://eslint.org/docs/latest/rules/no-throw-literal" target="_blank"><code>no-throw-literal</code></a>
- Inspired from: <a href="https://typescript-eslint.io/rules/no-throw-literal" target="_blank"><code>@typescript-eslint/no-throw-literal</code></a>
- Inspired from: <a href="https://typescript-eslint.io/rules/only-throw-error" target="_blank"><code>@typescript-eslint/only-throw-error</code></a>

Disallow throwing non-`Error` values.

It is considered good practice only to throw the `Error` object itself or an object using the `Error` object
as base objects for user-defined exceptions. The fundamental benefit of `Error` objects is that they automatically
keep track of where they were built and originated.

## Examples

### Invalid

```js
throw undefined;
```

<pre class="language-text"><code class="language-text">code-block.js:1:1 <a href="https://biomejs.dev/linter/rules/use-throw-only-error">lint/nursery/useThrowOnlyError</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Throwing non-</span><span style="color: Orange;"><strong>Error</strong></span><span style="color: Orange;"> values is not allowed.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>throw undefined;
   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">While Javascript supports throwing any value, handling non-</span><span style="color: lightgreen;"><strong>Error</strong></span><span style="color: lightgreen;"> values is confusing.</span>
  
</code></pre>

```js
throw false;
```

<pre class="language-text"><code class="language-text">code-block.js:1:1 <a href="https://biomejs.dev/linter/rules/use-throw-only-error">lint/nursery/useThrowOnlyError</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Throwing non-</span><span style="color: Orange;"><strong>Error</strong></span><span style="color: Orange;"> values is not allowed.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>throw false;
   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">While Javascript supports throwing any value, handling non-</span><span style="color: lightgreen;"><strong>Error</strong></span><span style="color: lightgreen;"> values is confusing.</span>
  
</code></pre>

```js
throw "a" + "b";
```

<pre class="language-text"><code class="language-text">code-block.js:1:1 <a href="https://biomejs.dev/linter/rules/use-throw-only-error">lint/nursery/useThrowOnlyError</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Throwing non-</span><span style="color: Orange;"><strong>Error</strong></span><span style="color: Orange;"> values is not allowed.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>throw &quot;a&quot; + &quot;b&quot;;
   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">While Javascript supports throwing any value, handling non-</span><span style="color: lightgreen;"><strong>Error</strong></span><span style="color: lightgreen;"> values is confusing.</span>
  
</code></pre>

### Valid

```js
throw new Error();
```

```js
throw new TypeError('biome');
```

```js
class CustomError extends Error {}

throw new CustomError();
```

## Caveats

This rule only covers cases where throwing the value can be known statically.
Complex cases such as object and function access aren't checked.
This will be improved in the future once Biome supports type inference.

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
