---
title: noDuplicateSelectorsKeyframeBlock (not released)
---

**Diagnostic Category: `lint/nursery/noDuplicateSelectorsKeyframeBlock`**

:::danger
This rule hasn't been released yet.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/keyframe-block-no-duplicate-selectors/README.md" target="_blank"><code>stylelint/keyframe-block-no-duplicate-selectors</code></a>

Disallow duplicate selectors within keyframe blocks.

## Examples

### Invalid

```css
@keyframes foo { from {} from {} }
```

<pre class="language-text"><code class="language-text">nursery/noDuplicateSelectorsKeyframeBlock.js:1:26 <a href="https://biomejs.dev/linter/rules/no-duplicate-selectors-keyframe-block">lint/nursery/noDuplicateSelectorsKeyframeBlock</a> ━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected duplicate selector: </span><span style="color: Tomato;"><strong>from</strong></span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>@keyframes foo { from {} from {} }
   <strong>   │ </strong>                         <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider using a different percentage value or keyword to avoid duplication</span>
  
</code></pre>

```css
@keyframes foo { from {} FROM {} }
```

<pre class="language-text"><code class="language-text">nursery/noDuplicateSelectorsKeyframeBlock.js:1:26 <a href="https://biomejs.dev/linter/rules/no-duplicate-selectors-keyframe-block">lint/nursery/noDuplicateSelectorsKeyframeBlock</a> ━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected duplicate selector: </span><span style="color: Tomato;"><strong>FROM</strong></span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>@keyframes foo { from {} FROM {} }
   <strong>   │ </strong>                         <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider using a different percentage value or keyword to avoid duplication</span>
  
</code></pre>

```css
@keyframes foo { 0% {} 0% {} }
```

<pre class="language-text"><code class="language-text">nursery/noDuplicateSelectorsKeyframeBlock.js:1:24 <a href="https://biomejs.dev/linter/rules/no-duplicate-selectors-keyframe-block">lint/nursery/noDuplicateSelectorsKeyframeBlock</a> ━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected duplicate selector: </span><span style="color: Tomato;"><strong>0%</strong></span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>@keyframes foo { 0% {} 0% {} }
   <strong>   │ </strong>                       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider using a different percentage value or keyword to avoid duplication</span>
  
</code></pre>

### Valid

```css
@keyframes foo { 0% {} 100% {} }
```

```css
@keyframes foo { from {} to {} }
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Rule options](/linter/#rule-options)
