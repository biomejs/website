---
title: noUselessUndefinedInitialization (not released)
---

**Diagnostic Category: `lint/nursery/noUselessUndefinedInitialization`**

:::danger
This rule hasn't been released yet.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Inspired from: <a href="https://eslint.org/docs/latest/rules/no-undef-init" target="_blank"><code>no-undef-init</code></a>

Disallow initializing variables to `undefined`.

A variable that is declared and not initialized to any value automatically gets the value of `undefined`.
It’s considered a best practice to avoid initializing variables to `undefined`.
Please note that any inline comments attached to the initialization value or variable will be removed on auto-fix.
Please be also aware that this differs from Eslint's behaviour and we are still discussing on how to properly handle this case.

## Examples

### Invalid

```jsx
var a = undefined;
```

<pre class="language-text"><code class="language-text">nursery/noUselessUndefinedInitialization.js:1:7 <a href="https://biomejs.dev/linter/rules/no-useless-undefined-initialization">lint/nursery/noUselessUndefinedInitialization</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">It's not necessary to initialize </span><span style="color: Orange;"><strong>a</strong></span><span style="color: Orange;"> to undefined.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>var a = undefined;
   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">A variable that is declared and not initialized to any value automatically gets the value of undefined.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove undefined initialization.</span>
  
<strong>  </strong><strong>  1 │ </strong>var<span style="opacity: 0.8;">·</span>a<span style="opacity: 0.8;">·</span><span style="color: Tomato;">=</span><span style="opacity: 0.8;"><span style="color: Tomato;">·</span></span><span style="color: Tomato;">u</span><span style="color: Tomato;">n</span><span style="color: Tomato;">d</span><span style="color: Tomato;">e</span><span style="color: Tomato;">f</span><span style="color: Tomato;">i</span><span style="color: Tomato;">n</span><span style="color: Tomato;">e</span><span style="color: Tomato;">d</span>;
<strong>  </strong><strong>    │ </strong>      <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span> 
</code></pre>

```jsx
let b = undefined, c = 1, d = 2;
```

<pre class="language-text"><code class="language-text">nursery/noUselessUndefinedInitialization.js:1:7 <a href="https://biomejs.dev/linter/rules/no-useless-undefined-initialization">lint/nursery/noUselessUndefinedInitialization</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">It's not necessary to initialize </span><span style="color: Orange;"><strong>b</strong></span><span style="color: Orange;"> to undefined.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let b = undefined, c = 1, d = 2;
   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">A variable that is declared and not initialized to any value automatically gets the value of undefined.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove undefined initialization.</span>
  
<strong>  </strong><strong>  1 │ </strong>let<span style="opacity: 0.8;">·</span>b<span style="opacity: 0.8;">·</span><span style="color: Tomato;">=</span><span style="opacity: 0.8;"><span style="color: Tomato;">·</span></span><span style="color: Tomato;">u</span><span style="color: Tomato;">n</span><span style="color: Tomato;">d</span><span style="color: Tomato;">e</span><span style="color: Tomato;">f</span><span style="color: Tomato;">i</span><span style="color: Tomato;">n</span><span style="color: Tomato;">e</span><span style="color: Tomato;">d</span>,<span style="opacity: 0.8;">·</span>c<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span>1,<span style="opacity: 0.8;">·</span>d<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span>2;
<strong>  </strong><strong>    │ </strong>      <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span>               
</code></pre>

```jsx
for (let i = 0; i < 100; i++) {
	let i = undefined;
}
```

<pre class="language-text"><code class="language-text">nursery/noUselessUndefinedInitialization.js:2:8 <a href="https://biomejs.dev/linter/rules/no-useless-undefined-initialization">lint/nursery/noUselessUndefinedInitialization</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">It's not necessary to initialize </span><span style="color: Orange;"><strong>i</strong></span><span style="color: Orange;"> to undefined.</span>
  
    <strong>1 │ </strong>for (let i = 0; i &lt; 100; i++) {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>	let i = undefined;
   <strong>   │ </strong>	      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>}
    <strong>4 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">A variable that is declared and not initialized to any value automatically gets the value of undefined.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove undefined initialization.</span>
  
<strong>  </strong><strong>  2 │ </strong><span style="opacity: 0.8;">→ </span>let<span style="opacity: 0.8;">·</span>i<span style="opacity: 0.8;">·</span><span style="color: Tomato;">=</span><span style="opacity: 0.8;"><span style="color: Tomato;">·</span></span><span style="color: Tomato;">u</span><span style="color: Tomato;">n</span><span style="color: Tomato;">d</span><span style="color: Tomato;">e</span><span style="color: Tomato;">f</span><span style="color: Tomato;">i</span><span style="color: Tomato;">n</span><span style="color: Tomato;">e</span><span style="color: Tomato;">d</span>;
<strong>  </strong><strong>    │ </strong>        <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span> 
</code></pre>

```jsx
let f = /**/undefined/**/ ;
```

<pre class="language-text"><code class="language-text">nursery/noUselessUndefinedInitialization.js:1:7 <a href="https://biomejs.dev/linter/rules/no-useless-undefined-initialization">lint/nursery/noUselessUndefinedInitialization</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">It's not necessary to initialize </span><span style="color: Orange;"><strong>f</strong></span><span style="color: Orange;"> to undefined.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let f = /**/undefined/**/ ;
   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">A variable that is declared and not initialized to any value automatically gets the value of undefined.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove undefined initialization.</span>
  
<strong>  </strong><strong>  1 │ </strong>let<span style="opacity: 0.8;">·</span>f<span style="opacity: 0.8;">·</span><span style="color: Tomato;">=</span><span style="opacity: 0.8;"><span style="color: Tomato;">·</span></span><span style="color: Tomato;">/</span><span style="color: Tomato;">*</span><span style="color: Tomato;">*</span><span style="color: Tomato;">/</span><span style="color: Tomato;">u</span><span style="color: Tomato;">n</span><span style="color: Tomato;">d</span><span style="color: Tomato;">e</span><span style="color: Tomato;">f</span><span style="color: Tomato;">i</span><span style="color: Tomato;">n</span><span style="color: Tomato;">e</span><span style="color: Tomato;">d</span><span style="color: Tomato;">/</span><span style="color: Tomato;">*</span><span style="color: Tomato;">*</span><span style="color: Tomato;">/</span><span style="opacity: 0.8;"><span style="color: Tomato;">·</span></span>;
<strong>  </strong><strong>    │ </strong>      <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span> 
</code></pre>

### Valid

```jsx
var a = 1;
```

```jsx
class Foo {
	bar = undefined;
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Rule options](/linter/#rule-options)
