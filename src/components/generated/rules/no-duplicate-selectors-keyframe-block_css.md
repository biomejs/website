**Since**: `v1.8.0`
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

<pre class="language-text"><code class="language-text">code-block.css:1:26 <a href="https://biomejs.dev/linter/rules/no-duplicate-selectors-keyframe-block">lint/nursery/noDuplicateSelectorsKeyframeBlock</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The duplicate keyframe selector is overwritten by later one.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>@keyframes foo { from {} from {} }<br />   <strong>   │ </strong>                         <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider using a different percentage value or keyword to avoid duplication</span><br />  <br /></code></pre>

```css
@keyframes foo { from {} FROM {} }
```

<pre class="language-text"><code class="language-text">code-block.css:1:26 <a href="https://biomejs.dev/linter/rules/no-duplicate-selectors-keyframe-block">lint/nursery/noDuplicateSelectorsKeyframeBlock</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The duplicate keyframe selector is overwritten by later one.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>@keyframes foo { from {} FROM {} }<br />   <strong>   │ </strong>                         <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider using a different percentage value or keyword to avoid duplication</span><br />  <br /></code></pre>

```css
@keyframes foo { 0% {} 0% {} }
```

<pre class="language-text"><code class="language-text">code-block.css:1:24 <a href="https://biomejs.dev/linter/rules/no-duplicate-selectors-keyframe-block">lint/nursery/noDuplicateSelectorsKeyframeBlock</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The duplicate keyframe selector is overwritten by later one.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>@keyframes foo { 0% {} 0% {} }<br />   <strong>   │ </strong>                       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider using a different percentage value or keyword to avoid duplication</span><br />  <br /></code></pre>

### Valid

```css
@keyframes foo { 0% {} 100% {} }
```

```css
@keyframes foo { from {} to {} }
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
