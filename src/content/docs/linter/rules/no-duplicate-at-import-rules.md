---
title: noDuplicateAtImportRules (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/noDuplicateAtImportRules`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/no-duplicate-at-import-rules/README.md" target="_blank"><code>stylelint/no-duplicate-at-import-rules</code></a>

Disallow duplicate `@import` rules.

This rule checks if the file urls of the @import rules are duplicates.

This rule also checks the imported media queries and alerts of duplicates.

## Examples

### Invalid

```css
@import 'a.css';
@import 'a.css';
```

<pre class="language-text"><code class="language-text">nursery/noDuplicateAtImportRules.js:2:2 <a href="https://biomejs.dev/linter/rules/no-duplicate-at-import-rules">lint/nursery/noDuplicateAtImportRules</a> ━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Each </span><span style="color: Tomato;"><strong>@import</strong></span><span style="color: Tomato;"> should be unique unless differing by media queries.</span>
  
    <strong>1 │ </strong>@import 'a.css';
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>@import 'a.css';
   <strong>   │ </strong> <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider removing one of the duplicated imports.</span>
  
</code></pre>

```css
@import "a.css";
@import 'a.css';
```

<pre class="language-text"><code class="language-text">nursery/noDuplicateAtImportRules.js:2:2 <a href="https://biomejs.dev/linter/rules/no-duplicate-at-import-rules">lint/nursery/noDuplicateAtImportRules</a> ━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Each </span><span style="color: Tomato;"><strong>@import</strong></span><span style="color: Tomato;"> should be unique unless differing by media queries.</span>
  
    <strong>1 │ </strong>@import &quot;a.css&quot;;
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>@import 'a.css';
   <strong>   │ </strong> <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider removing one of the duplicated imports.</span>
  
</code></pre>

```css
@import url('a.css');
@import url('a.css');
```

<pre class="language-text"><code class="language-text">nursery/noDuplicateAtImportRules.js:2:2 <a href="https://biomejs.dev/linter/rules/no-duplicate-at-import-rules">lint/nursery/noDuplicateAtImportRules</a> ━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Each </span><span style="color: Tomato;"><strong>@import</strong></span><span style="color: Tomato;"> should be unique unless differing by media queries.</span>
  
    <strong>1 │ </strong>@import url('a.css');
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>@import url('a.css');
   <strong>   │ </strong> <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider removing one of the duplicated imports.</span>
  
</code></pre>

### Valid

```css
@import 'a.css';
@import 'b.css';
```

```css
@import url('a.css') tv;
@import url('a.css') projection;
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
