---
title: noUnusedFunctionParameters (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/noUnusedFunctionParameters`**

:::note
- This rule has an **unsafe** fix.
- This rule is applied to **JavaScript and super languages** files.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Disallow unused function parameters.

There is an exception to this rule:
parameters that starts with underscore, e.g. `function foo(_a, _b) {}`.

## Examples

### Invalid

```js
function foo(myVar) {
    console.log('foo');
}
```

<pre class="language-text"><code class="language-text">code-block.js:1:14 <a href="https://biomejs.dev/linter/rules/no-unused-function-parameters">lint/nursery/noUnusedFunctionParameters</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This </span><span style="color: Orange;"><strong>parameter</strong></span><span style="color: Orange;"> is unused.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function foo(myVar) {
   <strong>   │ </strong>             <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>    console.log('foo');
    <strong>3 │ </strong>}
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unused parameters might be the result of an incomplete refactoring.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">If this is intentional, prepend </span><span style="color: lightgreen;"><strong>myVar</strong></span><span style="color: lightgreen;"> with an underscore.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">f</span><span style="color: Tomato;">u</span><span style="color: Tomato;">n</span><span style="color: Tomato;">c</span><span style="color: Tomato;">t</span><span style="color: Tomato;">i</span><span style="color: Tomato;">o</span><span style="color: Tomato;">n</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">f</span><span style="color: Tomato;">o</span><span style="color: Tomato;">o</span><span style="color: Tomato;">(</span><span style="color: Tomato;"><strong>m</strong></span><span style="color: Tomato;"><strong>y</strong></span><span style="color: Tomato;"><strong>V</strong></span><span style="color: Tomato;"><strong>a</strong></span><span style="color: Tomato;"><strong>r</strong></span><span style="color: Tomato;">)</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">{</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">u</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">c</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">(</span><span style="color: MediumSeaGreen;"><strong>_</strong></span><span style="color: MediumSeaGreen;"><strong>m</strong></span><span style="color: MediumSeaGreen;"><strong>y</strong></span><span style="color: MediumSeaGreen;"><strong>V</strong></span><span style="color: MediumSeaGreen;"><strong>a</strong></span><span style="color: MediumSeaGreen;"><strong>r</strong></span><span style="color: MediumSeaGreen;">)</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">{</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>      console.log('foo');
    <strong>3</strong> <strong>3</strong><strong> │ </strong>  }
  
</code></pre>

```js
new Promise((accept, reject) => {
    window.setTimeout(accept, 1000);
});
```

<pre class="language-text"><code class="language-text">code-block.js:1:22 <a href="https://biomejs.dev/linter/rules/no-unused-function-parameters">lint/nursery/noUnusedFunctionParameters</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This </span><span style="color: Orange;"><strong>parameter</strong></span><span style="color: Orange;"> is unused.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>new Promise((accept, reject) =&gt; {
   <strong>   │ </strong>                     <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>    window.setTimeout(accept, 1000);
    <strong>3 │ </strong>});
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unused parameters might be the result of an incomplete refactoring.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">If this is intentional, prepend </span><span style="color: lightgreen;"><strong>reject</strong></span><span style="color: lightgreen;"> with an underscore.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">n</span><span style="color: Tomato;">e</span><span style="color: Tomato;">w</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">P</span><span style="color: Tomato;">r</span><span style="color: Tomato;">o</span><span style="color: Tomato;">m</span><span style="color: Tomato;">i</span><span style="color: Tomato;">s</span><span style="color: Tomato;">e</span><span style="color: Tomato;">(</span><span style="color: Tomato;">(</span><span style="color: Tomato;">a</span><span style="color: Tomato;">c</span><span style="color: Tomato;">c</span><span style="color: Tomato;">e</span><span style="color: Tomato;">p</span><span style="color: Tomato;">t</span><span style="color: Tomato;">,</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><strong>r</strong></span><span style="color: Tomato;"><strong>e</strong></span><span style="color: Tomato;"><strong>j</strong></span><span style="color: Tomato;"><strong>e</strong></span><span style="color: Tomato;"><strong>c</strong></span><span style="color: Tomato;"><strong>t</strong></span><span style="color: Tomato;">)</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">=</span><span style="color: Tomato;">&gt;</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">{</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">w</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">P</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">s</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">(</span><span style="color: MediumSeaGreen;">(</span><span style="color: MediumSeaGreen;">a</span><span style="color: MediumSeaGreen;">c</span><span style="color: MediumSeaGreen;">c</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">p</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;">,</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><strong>_</strong></span><span style="color: MediumSeaGreen;"><strong>r</strong></span><span style="color: MediumSeaGreen;"><strong>e</strong></span><span style="color: MediumSeaGreen;"><strong>j</strong></span><span style="color: MediumSeaGreen;"><strong>e</strong></span><span style="color: MediumSeaGreen;"><strong>c</strong></span><span style="color: MediumSeaGreen;"><strong>t</strong></span><span style="color: MediumSeaGreen;">)</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">=</span><span style="color: MediumSeaGreen;">&gt;</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">{</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>      window.setTimeout(accept, 1000);
    <strong>3</strong> <strong>3</strong><strong> │ </strong>  });
  
</code></pre>

```js
const squares = [[1, 1], [2, 4], [3, 9], [4, 16]];
squares.filter(([k, v]) => v > 5);
```

<pre class="language-text"><code class="language-text">code-block.js:2:18 <a href="https://biomejs.dev/linter/rules/no-unused-function-parameters">lint/nursery/noUnusedFunctionParameters</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This </span><span style="color: Orange;"><strong>parameter</strong></span><span style="color: Orange;"> is unused.</span>
  
    <strong>1 │ </strong>const squares = [[1, 1], [2, 4], [3, 9], [4, 16]];
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>squares.filter(([k, v]) =&gt; v &gt; 5);
   <strong>   │ </strong>                 <strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unused parameters might be the result of an incomplete refactoring.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">If this is intentional, prepend </span><span style="color: lightgreen;"><strong>k</strong></span><span style="color: lightgreen;"> with an underscore.</span>
  
    <strong>1</strong> <strong>1</strong><strong> │ </strong>  const squares = [[1, 1], [2, 4], [3, 9], [4, 16]];
    <strong>2</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">s</span><span style="color: Tomato;">q</span><span style="color: Tomato;">u</span><span style="color: Tomato;">a</span><span style="color: Tomato;">r</span><span style="color: Tomato;">e</span><span style="color: Tomato;">s</span><span style="color: Tomato;">.</span><span style="color: Tomato;">f</span><span style="color: Tomato;">i</span><span style="color: Tomato;">l</span><span style="color: Tomato;">t</span><span style="color: Tomato;">e</span><span style="color: Tomato;">r</span><span style="color: Tomato;">(</span><span style="color: Tomato;">(</span><span style="color: Tomato;">[</span><span style="color: Tomato;"><strong>k</strong></span><span style="color: Tomato;">,</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">v</span><span style="color: Tomato;">]</span><span style="color: Tomato;">)</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">=</span><span style="color: Tomato;">&gt;</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">v</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">&gt;</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">5</span><span style="color: Tomato;">)</span><span style="color: Tomato;">;</span>
      <strong>2</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">s</span><span style="color: MediumSeaGreen;">q</span><span style="color: MediumSeaGreen;">u</span><span style="color: MediumSeaGreen;">a</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">s</span><span style="color: MediumSeaGreen;">.</span><span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">(</span><span style="color: MediumSeaGreen;">(</span><span style="color: MediumSeaGreen;">[</span><span style="color: MediumSeaGreen;"><strong>_</strong></span><span style="color: MediumSeaGreen;"><strong>k</strong></span><span style="color: MediumSeaGreen;">,</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">v</span><span style="color: MediumSeaGreen;">]</span><span style="color: MediumSeaGreen;">)</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">=</span><span style="color: MediumSeaGreen;">&gt;</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">v</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">&gt;</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">5</span><span style="color: MediumSeaGreen;">)</span><span style="color: MediumSeaGreen;">;</span>
    <strong>3</strong> <strong>3</strong><strong> │ </strong>  
  
</code></pre>

### Valid

```js
function foo(myVar) {
    console.log(myVar);
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
