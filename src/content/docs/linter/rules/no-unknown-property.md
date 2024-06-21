---
title: noUnknownProperty (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/noUnknownProperty`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/property-no-unknown/README.md" target="_blank"><code>stylelint/property-no-unknown</code></a>

Disallow unknown properties.

This rule considers properties defined in the CSS Specifications and browser specific properties to be known.
https://github.com/known-css/known-css-properties#source

This rule ignores:

- custom variables e.g. `--custom-property`
- vendor-prefixed properties (e.g., `-moz-align-self,` `-webkit-align-self`)

## Examples

### Invalid

```css
a {
  colr: blue;
}
```

<pre class="language-text"><code class="language-text">code-block.css:2:3 <a href="https://biomejs.dev/linter/rules/no-unknown-property">lint/nursery/noUnknownProperty</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unknown property is not allowed.</span>
  
    <strong>1 │ </strong>a {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  colr: blue;
   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>}
    <strong>4 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://stylelint.io/user-guide/rules/property-no-unknown/">CSS Specifications and browser specific properties</a></span><span style="color: lightgreen;"> for more details.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">To resolve this issue, replace the unknown property with a valid CSS property.</span>
  
</code></pre>

```css
a {
  my-property: 1;
}
```

<pre class="language-text"><code class="language-text">code-block.css:2:3 <a href="https://biomejs.dev/linter/rules/no-unknown-property">lint/nursery/noUnknownProperty</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unknown property is not allowed.</span>
  
    <strong>1 │ </strong>a {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  my-property: 1;
   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>}
    <strong>4 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://stylelint.io/user-guide/rules/property-no-unknown/">CSS Specifications and browser specific properties</a></span><span style="color: lightgreen;"> for more details.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">To resolve this issue, replace the unknown property with a valid CSS property.</span>
  
</code></pre>

### Valid

```css
a {
  color: green;
}
```

```css
a {
  fill: black;
}
```

```css
a {
  -moz-align-self: center;
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
