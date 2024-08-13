**Since**: `v1.7.2`
:::note
- This rule has a **safe** fix.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Inspired from: <a href="https://eslint.org/docs/latest/rules/no-undef-init" target="_blank"><code>no-undef-init</code></a>

Disallow initializing variables to `undefined`.

A variable that is declared and not initialized to any value automatically gets the value of `undefined`.
It’s considered a best practice to avoid initializing variables to `undefined`.
Please note that any inline comments attached to the initialization value or variable will be moved at the end of the variable declaration on auto-fix.
Please be also aware that this differs from Eslint's behaviour.

## Examples

### Invalid

```js
var a = undefined;
```

<pre class="language-text"><code class="language-text">code-block.js:1:7 <a href="https://biomejs.dev/linter/rules/no-useless-undefined-initialization">lint/nursery/noUselessUndefinedInitialization</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">It's not necessary to initialize </span><span style="color: Orange;"><strong>a</strong></span><span style="color: Orange;"> to undefined.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>var a = undefined;
   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">A variable that is declared and not initialized to any value automatically gets the value of undefined.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove undefined initialization.</span>
  
<strong>  </strong><strong>  1 │ </strong>var<span style="opacity: 0.8;">·</span>a<span style="opacity: 0.8;">·</span><span style="color: Tomato;">=</span><span style="opacity: 0.8;"><span style="color: Tomato;">·</span></span><span style="color: Tomato;">u</span><span style="color: Tomato;">n</span><span style="color: Tomato;">d</span><span style="color: Tomato;">e</span><span style="color: Tomato;">f</span><span style="color: Tomato;">i</span><span style="color: Tomato;">n</span><span style="color: Tomato;">e</span><span style="color: Tomato;">d</span>;
<strong>  </strong><strong>    │ </strong>      <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span> 
</code></pre>

```js
let b = undefined, c = 1, d = 2;
```

<pre class="language-text"><code class="language-text">code-block.js:1:7 <a href="https://biomejs.dev/linter/rules/no-useless-undefined-initialization">lint/nursery/noUselessUndefinedInitialization</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">It's not necessary to initialize </span><span style="color: Orange;"><strong>b</strong></span><span style="color: Orange;"> to undefined.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let b = undefined, c = 1, d = 2;
   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">A variable that is declared and not initialized to any value automatically gets the value of undefined.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove undefined initialization.</span>
  
<strong>  </strong><strong>  1 │ </strong>let<span style="opacity: 0.8;">·</span>b<span style="opacity: 0.8;">·</span><span style="color: Tomato;">=</span><span style="opacity: 0.8;"><span style="color: Tomato;">·</span></span><span style="color: Tomato;">u</span><span style="color: Tomato;">n</span><span style="color: Tomato;">d</span><span style="color: Tomato;">e</span><span style="color: Tomato;">f</span><span style="color: Tomato;">i</span><span style="color: Tomato;">n</span><span style="color: Tomato;">e</span><span style="color: Tomato;">d</span>,<span style="opacity: 0.8;">·</span>c<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span>1,<span style="opacity: 0.8;">·</span>d<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span>2;
<strong>  </strong><strong>    │ </strong>      <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span>               
</code></pre>

```js
for (let i = 0; i < 100; i++) {
	let i = undefined;
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:8 <a href="https://biomejs.dev/linter/rules/no-useless-undefined-initialization">lint/nursery/noUselessUndefinedInitialization</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">It's not necessary to initialize </span><span style="color: Orange;"><strong>i</strong></span><span style="color: Orange;"> to undefined.</span>
  
    <strong>1 │ </strong>for (let i = 0; i &lt; 100; i++) {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>	let i = undefined;
   <strong>   │ </strong>	      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>}
    <strong>4 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">A variable that is declared and not initialized to any value automatically gets the value of undefined.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove undefined initialization.</span>
  
<strong>  </strong><strong>  2 │ </strong><span style="opacity: 0.8;">→ </span>let<span style="opacity: 0.8;">·</span>i<span style="opacity: 0.8;">·</span><span style="color: Tomato;">=</span><span style="opacity: 0.8;"><span style="color: Tomato;">·</span></span><span style="color: Tomato;">u</span><span style="color: Tomato;">n</span><span style="color: Tomato;">d</span><span style="color: Tomato;">e</span><span style="color: Tomato;">f</span><span style="color: Tomato;">i</span><span style="color: Tomato;">n</span><span style="color: Tomato;">e</span><span style="color: Tomato;">d</span>;
<strong>  </strong><strong>    │ </strong>        <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span> 
</code></pre>

```js
let f = /**/undefined/**/ ;
```

<pre class="language-text"><code class="language-text">code-block.js:1:7 <a href="https://biomejs.dev/linter/rules/no-useless-undefined-initialization">lint/nursery/noUselessUndefinedInitialization</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">It's not necessary to initialize </span><span style="color: Orange;"><strong>f</strong></span><span style="color: Orange;"> to undefined.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let f = /**/undefined/**/ ;
   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">A variable that is declared and not initialized to any value automatically gets the value of undefined.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove undefined initialization.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">l</span><span style="color: Tomato;">e</span><span style="color: Tomato;">t</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">f</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><strong>=</strong></span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;">/</span><span style="color: Tomato;">*</span><span style="color: Tomato;">*</span><span style="color: Tomato;">/</span><span style="color: Tomato;"><strong>u</strong></span><span style="color: Tomato;"><strong>n</strong></span><span style="color: Tomato;"><strong>d</strong></span><span style="color: Tomato;"><strong>e</strong></span><span style="color: Tomato;"><strong>f</strong></span><span style="color: Tomato;"><strong>i</strong></span><span style="color: Tomato;"><strong>n</strong></span><span style="color: Tomato;"><strong>e</strong></span><span style="color: Tomato;"><strong>d</strong></span><span style="color: Tomato;">/</span><span style="color: Tomato;">*</span><span style="color: Tomato;">*</span><span style="color: Tomato;">/</span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;"><strong>;</strong></span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><strong>;</strong></span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;">*</span><span style="color: MediumSeaGreen;">*</span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;">*</span><span style="color: MediumSeaGreen;">*</span><span style="color: MediumSeaGreen;">/</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

### Valid

```js
var a = 1;
```

```js
class Foo {
	bar = undefined;
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
