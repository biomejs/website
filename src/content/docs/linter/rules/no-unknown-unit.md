---
title: noUnknownUnit (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/noUnknownUnit`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/unit-no-unknown/README.md" target="_blank"><code>stylelint/unit-no-unknown</code></a>

Disallow unknown CSS units.

For details on known CSS units, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths).

## Examples

### Invalid

```css
a {
  width: 10pixels;
}
```

<pre class="language-text"><code class="language-text">code-block.css:2:12 <a href="https://biomejs.dev/linter/rules/no-unknown-unit">lint/nursery/noUnknownUnit</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected unknown unit: </span><span style="color: Tomato;"><strong>pixels</strong></span>
  
    <strong>1 │ </strong>a {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  width: 10pixels;
   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>}
    <strong>4 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths">MDN web docs</a></span><span style="color: lightgreen;"> for more details.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a known unit instead, such as:</span>
  
  - px
  - em
  - rem
  - etc.
  
</code></pre>

```css
a {
  width: calc(10px + 10pixels);
}
```

<pre class="language-text"><code class="language-text">code-block.css:2:24 <a href="https://biomejs.dev/linter/rules/no-unknown-unit">lint/nursery/noUnknownUnit</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected unknown unit: </span><span style="color: Tomato;"><strong>pixels</strong></span>
  
    <strong>1 │ </strong>a {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  width: calc(10px + 10pixels);
   <strong>   │ </strong>                       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>}
    <strong>4 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths">MDN web docs</a></span><span style="color: lightgreen;"> for more details.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a known unit instead, such as:</span>
  
  - px
  - em
  - rem
  - etc.
  
</code></pre>

### Valid

```css
a {
  width: 10px;
}
```

```css
a {
  width: 10Px;
}
```

```css
a {
  width: 10pX;
}
```

```css
a {
  width: calc(10px + 10px);
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
