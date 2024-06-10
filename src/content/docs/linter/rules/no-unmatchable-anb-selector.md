---
title: noUnmatchableAnbSelector (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/noUnmatchableAnbSelector`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/selector-anb-no-unmatchable/README.md" target="_blank"><code>stylelint/selector-anb-no-unmatchable</code></a>

Disallow unmatchable An+B selectors.

Selectors that always evaluate to 0 will not match any elements.
For more details about the An+B syntax, see:
https://www.w3.org/TR/css-syntax-3/#anb-microsyntax

## Examples

### Invalid

```css
a:nth-child(0) {}
```

<pre class="language-text"><code class="language-text">nursery/noUnmatchableAnbSelector.js:1:13 <a href="https://biomejs.dev/linter/rules/no-unmatchable-anb-selector">lint/nursery/noUnmatchableAnbSelector</a> ━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This selector will never match any elements.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a:nth-child(0) {}
   <strong>   │ </strong>            <strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Avoid using An+B selectors that always evaluate to 0.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">For more details, see </span><span style="color: lightgreen;"><a href="https://www.w3.org/TR/css-syntax-3/#anb-microsyntax">the official spec for An+B selectors</a></span><span style="color: lightgreen;">.</span>
  
</code></pre>

```css
a:nth-last-child(0n) {}
```

<pre class="language-text"><code class="language-text">nursery/noUnmatchableAnbSelector.js:1:18 <a href="https://biomejs.dev/linter/rules/no-unmatchable-anb-selector">lint/nursery/noUnmatchableAnbSelector</a> ━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This selector will never match any elements.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a:nth-last-child(0n) {}
   <strong>   │ </strong>                 <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Avoid using An+B selectors that always evaluate to 0.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">For more details, see </span><span style="color: lightgreen;"><a href="https://www.w3.org/TR/css-syntax-3/#anb-microsyntax">the official spec for An+B selectors</a></span><span style="color: lightgreen;">.</span>
  
</code></pre>

```css
a:nth-of-type(0n+0) {}
```

<pre class="language-text"><code class="language-text">nursery/noUnmatchableAnbSelector.js:1:15 <a href="https://biomejs.dev/linter/rules/no-unmatchable-anb-selector">lint/nursery/noUnmatchableAnbSelector</a> ━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This selector will never match any elements.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a:nth-of-type(0n+0) {}
   <strong>   │ </strong>              <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Avoid using An+B selectors that always evaluate to 0.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">For more details, see </span><span style="color: lightgreen;"><a href="https://www.w3.org/TR/css-syntax-3/#anb-microsyntax">the official spec for An+B selectors</a></span><span style="color: lightgreen;">.</span>
  
</code></pre>

```css
a:nth-last-of-type(0 of a) {}
```

<pre class="language-text"><code class="language-text">nursery/noUnmatchableAnbSelector.js:1:20 <a href="https://biomejs.dev/linter/rules/no-unmatchable-anb-selector">lint/nursery/noUnmatchableAnbSelector</a> ━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This selector will never match any elements.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a:nth-last-of-type(0 of a) {}
   <strong>   │ </strong>                   <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Avoid using An+B selectors that always evaluate to 0.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">For more details, see </span><span style="color: lightgreen;"><a href="https://www.w3.org/TR/css-syntax-3/#anb-microsyntax">the official spec for An+B selectors</a></span><span style="color: lightgreen;">.</span>
  
</code></pre>

### Valid

```css
a:nth-child(1) {}
```

```css
a:nth-last-child(1n) {}
```

```css
a:nth-of-type(1n+0) {}
```

```css
a:nth-last-of-type(1 of a) {}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
