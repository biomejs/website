---
title: noUnknownFunction (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/noUnknownFunction`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/function-no-unknown/README.md" target="_blank"><code>stylelint/function-no-unknown</code></a>

Disallow unknown CSS value functions.

This rule ignores double-dashed custom functions, e.g. `--custom-function()`.

Data sources of known CSS value functions are:

- MDN reference on [CSS value functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions)
- MDN reference on [CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- MDN [browser compatibility data for CSS value functions](https://github.com/mdn/browser-compat-data/tree/main/css/types)

## Examples

### Invalid

```css
a { transform: unknown(1); }
```

<pre class="language-text"><code class="language-text">code-block.css:1:16 <a href="https://biomejs.dev/linter/rules/no-unknown-function">lint/nursery/noUnknownFunction</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected unknown function: </span><span style="color: Tomato;"><strong>unknown</strong></span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a { transform: unknown(1); }
   <strong>   │ </strong>               <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a known function instead.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions">MDN web docs</a></span><span style="color: lightgreen;"> for more details.</span>
  
</code></pre>

### Valid

```css
a { transform: scale(1); }
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
