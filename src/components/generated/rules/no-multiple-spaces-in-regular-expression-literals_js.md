**Since**: `v1.0.0`
:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.
:::

Sources: 
- Same as: <a href="https://eslint.org/docs/latest/rules/no-regex-spaces" target="_blank"><code>no-regex-spaces</code></a>

Disallow unclear usage of consecutive space characters in regular expression literals

## Examples

### Invalid

```js
/   /
```

<pre class="language-text"><code class="language-text">code-block.js:1:2 <a href="https://biomejs.dev/linter/rules/no-multiple-spaces-in-regular-expression-literals">lint/complexity/noMultipleSpacesInRegularExpressionLiterals</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This regular expression contains unclear uses of consecutive spaces.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>/   /
   <strong>   │ </strong> <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">It's hard to visually count the amount of spaces.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Use a quantifier instead.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">/</span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;">/</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: MediumSeaGreen;"><strong>{</strong></span><span style="color: MediumSeaGreen;"><strong>3</strong></span><span style="color: MediumSeaGreen;"><strong>}</strong></span><span style="color: MediumSeaGreen;">/</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

```js
/foo  */
```

<pre class="language-text"><code class="language-text">code-block.js:1:5 <a href="https://biomejs.dev/linter/rules/no-multiple-spaces-in-regular-expression-literals">lint/complexity/noMultipleSpacesInRegularExpressionLiterals</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This regular expression contains unclear uses of consecutive spaces.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>/foo  */
   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">It's hard to visually count the amount of spaces.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Use a quantifier instead.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">/</span><span style="color: Tomato;">f</span><span style="color: Tomato;">o</span><span style="color: Tomato;">o</span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;"><strong>*</strong></span><span style="color: Tomato;">/</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: MediumSeaGreen;"><strong>+</strong></span><span style="color: MediumSeaGreen;">/</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

```js
/foo  {2,}bar   {3,5}baz/
```

<pre class="language-text"><code class="language-text">code-block.js:1:5 <a href="https://biomejs.dev/linter/rules/no-multiple-spaces-in-regular-expression-literals">lint/complexity/noMultipleSpacesInRegularExpressionLiterals</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This regular expression contains unclear uses of consecutive spaces.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>/foo  {2,}bar   {3,5}baz/
   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">It's hard to visually count the amount of spaces.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Use a quantifier instead.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">/</span><span style="color: Tomato;">f</span><span style="color: Tomato;">o</span><span style="color: Tomato;">o</span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;">{</span><span style="color: Tomato;"><strong>2</strong></span><span style="color: Tomato;">,</span><span style="color: Tomato;">}</span><span style="color: Tomato;">b</span><span style="color: Tomato;">a</span><span style="color: Tomato;">r</span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;">{</span><span style="color: Tomato;"><strong>3</strong></span><span style="color: Tomato;"><strong>,</strong></span><span style="color: Tomato;"><strong>5</strong></span><span style="color: Tomato;">}</span><span style="color: Tomato;">b</span><span style="color: Tomato;">a</span><span style="color: Tomato;">z</span><span style="color: Tomato;">/</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: MediumSeaGreen;">{</span><span style="color: MediumSeaGreen;"><strong>3</strong></span><span style="color: MediumSeaGreen;">,</span><span style="color: MediumSeaGreen;">}</span><span style="color: MediumSeaGreen;">b</span><span style="color: MediumSeaGreen;">a</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: MediumSeaGreen;">{</span><span style="color: MediumSeaGreen;"><strong>5</strong></span><span style="color: MediumSeaGreen;"><strong>,</strong></span><span style="color: MediumSeaGreen;"><strong>7</strong></span><span style="color: MediumSeaGreen;">}</span><span style="color: MediumSeaGreen;">b</span><span style="color: MediumSeaGreen;">a</span><span style="color: MediumSeaGreen;">z</span><span style="color: MediumSeaGreen;">/</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

```js
/foo [ba]r  b(a|z)/
```

<pre class="language-text"><code class="language-text">code-block.js:1:11 <a href="https://biomejs.dev/linter/rules/no-multiple-spaces-in-regular-expression-literals">lint/complexity/noMultipleSpacesInRegularExpressionLiterals</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This regular expression contains unclear uses of consecutive spaces.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>/foo [ba]r  b(a|z)/
   <strong>   │ </strong>          <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">It's hard to visually count the amount of spaces.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Use a quantifier instead.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">/</span><span style="color: Tomato;">f</span><span style="color: Tomato;">o</span><span style="color: Tomato;">o</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">[</span><span style="color: Tomato;">b</span><span style="color: Tomato;">a</span><span style="color: Tomato;">]</span><span style="color: Tomato;">r</span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: Tomato;">b</span><span style="color: Tomato;">(</span><span style="color: Tomato;">a</span><span style="color: Tomato;">|</span><span style="color: Tomato;">z</span><span style="color: Tomato;">)</span><span style="color: Tomato;">/</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">[</span><span style="color: MediumSeaGreen;">b</span><span style="color: MediumSeaGreen;">a</span><span style="color: MediumSeaGreen;">]</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: MediumSeaGreen;"><strong>{</strong></span><span style="color: MediumSeaGreen;"><strong>2</strong></span><span style="color: MediumSeaGreen;"><strong>}</strong></span><span style="color: MediumSeaGreen;">b</span><span style="color: MediumSeaGreen;">(</span><span style="color: MediumSeaGreen;">a</span><span style="color: MediumSeaGreen;">|</span><span style="color: MediumSeaGreen;">z</span><span style="color: MediumSeaGreen;">)</span><span style="color: MediumSeaGreen;">/</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

### Valid

```js
/foo {2}bar/
```

```js
/ foo bar baz /
```

```js
/foo bar	baz/
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
