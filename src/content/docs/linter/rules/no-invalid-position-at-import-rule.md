---
title: noInvalidPositionAtImportRule (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/noInvalidPositionAtImportRule`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/no-invalid-position-at-import-rule/README.md" target="_blank"><code>stylelint/no-invalid-position-at-import-rule</code></a>

Disallow the use of `@import` at-rules in invalid positions.

Any `@import` rules must precede all other valid at-rules and style rules in a stylesheet (ignoring `@charset` and `@layer`), or else the `@import` rule is invalid.

## Examples

### Invalid

```css
a {}
@import 'foo.css';
```

<pre class="language-text"><code class="language-text">nursery/noInvalidPositionAtImportRule.js:2:2 <a href="https://biomejs.dev/linter/rules/no-invalid-position-at-import-rule">lint/nursery/noInvalidPositionAtImportRule</a> ━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">This </span><span style="color: Tomato;"><strong>@import</strong></span><span style="color: Tomato;"> is in the wrong position.</span>
  
    <strong>1 │ </strong>a {}
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>@import 'foo.css';
   <strong>   │ </strong> <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Any </span><span style="color: lightgreen;"><strong>@import</strong></span><span style="color: lightgreen;"> rules must precede all other valid at-rules and style rules in a stylesheet (ignoring @charset and @layer), or else the </span><span style="color: lightgreen;"><strong>@import</strong></span><span style="color: lightgreen;"> rule is invalid.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider moving import position.</span>
  
</code></pre>

### Valid

```css
@import 'foo.css';
a {}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
