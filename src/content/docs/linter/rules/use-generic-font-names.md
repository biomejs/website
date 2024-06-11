---
title: useGenericFontNames (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/useGenericFontNames`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/font-family-no-missing-generic-family-keyword/README.md" target="_blank"><code>stylelint/font-family-no-missing-generic-family-keyword</code></a>

Disallow a missing generic family keyword within font families.

The generic font family can be:

- placed anywhere in the font family list
- omitted if a keyword related to property inheritance or a system font is used

This rule checks the font and font-family properties.
The following special situations are ignored:

- Property with a keyword value such as `inherit`, `initial`.
- The last value being a CSS variable.
- `font-family` property in an `@font-face` rule.

## Examples

### Invalid

```css
a { font-family: Arial; }
```

<pre class="language-text"><code class="language-text">code-block.css:1:18 <a href="https://biomejs.dev/linter/rules/use-generic-font-names">lint/nursery/useGenericFontNames</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Generic font family missing.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a { font-family: Arial; }
   <strong>   │ </strong>                 <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider adding a generic font family as a fallback.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">For examples and more information, see</span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/generic-family"> the MDN Web Docs</a></span>
  
  - serif
  - sans-serif
  - monospace
  - etc.
  
</code></pre>

```css
a { font: normal 14px/32px -apple-system, BlinkMacSystemFont; }
```

<pre class="language-text"><code class="language-text">code-block.css:1:43 <a href="https://biomejs.dev/linter/rules/use-generic-font-names">lint/nursery/useGenericFontNames</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Generic font family missing.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a { font: normal 14px/32px -apple-system, BlinkMacSystemFont; }
   <strong>   │ </strong>                                          <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider adding a generic font family as a fallback.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">For examples and more information, see</span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/generic-family"> the MDN Web Docs</a></span>
  
  - serif
  - sans-serif
  - monospace
  - etc.
  
</code></pre>

### Valid

```css
a { font-family: "Lucida Grande", "Arial", sans-serif; }
```

```css
a { font-family: inherit; }
```

```css
a { font-family: sans-serif; }
```

```css
a { font-family: var(--font); }
```

```css
@font-face { font-family: Gentium; }
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
