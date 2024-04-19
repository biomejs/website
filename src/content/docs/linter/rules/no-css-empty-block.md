---
title: noCssEmptyBlock (not released)
---

**Diagnostic Category: `lint/nursery/noCssEmptyBlock`**

:::danger
This rule hasn't been released yet.
:::

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

<pre class="language-text"><code class="language-text">nursery/noCssEmptyBlock.js:1:3 <a href="https://biomejs.dev/linter/rules/no-css-empty-block">lint/nursery/noCssEmptyBlock</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Empty blocks aren't allowed.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>p {}
   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider removing the empty block or adding styles inside it.</span>
  
</code></pre>

```css
.b {}
```

<pre class="language-text"><code class="language-text">nursery/noCssEmptyBlock.js:1:4 <a href="https://biomejs.dev/linter/rules/no-css-empty-block">lint/nursery/noCssEmptyBlock</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Empty blocks aren't allowed.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>.b {}
   <strong>   │ </strong>   <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider removing the empty block or adding styles inside it.</span>
  
</code></pre>

```css
@media print { a {} }
```

<pre class="language-text"><code class="language-text">nursery/noCssEmptyBlock.js:1:18 <a href="https://biomejs.dev/linter/rules/no-css-empty-block">lint/nursery/noCssEmptyBlock</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Empty blocks aren't allowed.</span>
  
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
p {
  /* foo */
}
```

```css
@media print { a { color: pink; } }
```

## Options

If false, exclude comments from being treated as content inside of a block.

```json
{
    "noCssEmptyBlock": {
        "options": {
          "allowComments": false
        }
    }
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Rule options](/linter/#rule-options)
