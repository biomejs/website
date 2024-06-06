---
title: noEmptyBlock (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/noEmptyBlock`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/no-empty-block/README.md" target="_blank"><code>stylelint/no-empty-block</code></a>

Disallow CSS empty blocks.

By default, it will allow empty blocks with comments inside.

## Examples

### Invalid

```css
p {}
```

<pre class="language-text"><code class="language-text">nursery/noEmptyBlock.js:1:3 <a href="https://biomejs.dev/linter/rules/no-empty-block">lint/nursery/noEmptyBlock</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">An empty block isn't allowed.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>p {}
   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider removing the empty block or adding styles inside it.</span>
  
</code></pre>

```css
.b {}
```

<pre class="language-text"><code class="language-text">nursery/noEmptyBlock.js:1:4 <a href="https://biomejs.dev/linter/rules/no-empty-block">lint/nursery/noEmptyBlock</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">An empty block isn't allowed.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>.b {}
   <strong>   │ </strong>   <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider removing the empty block or adding styles inside it.</span>
  
</code></pre>

```css
@media print { a {} }
```

<pre class="language-text"><code class="language-text">nursery/noEmptyBlock.js:1:18 <a href="https://biomejs.dev/linter/rules/no-empty-block">lint/nursery/noEmptyBlock</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">An empty block isn't allowed.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>@media print { a {} }
   <strong>   │ </strong>                 <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider removing the empty block or adding styles inside it.</span>
  
</code></pre>

### Valid

```css
p {
  color: red;
}
```

```css
p { /* foo */ }
```

```css
@media print { a { color: pink; } }
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
