**Since**: `vnext`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/declaration-block-no-shorthand-property-overrides/README.md" target="_blank"><code>stylelint/declaration-block-no-shorthand-property-overrides</code></a>

Disallow shorthand properties that override related longhand properties.

For details on shorthand properties, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties).

## Examples

### Invalid

```css
a { padding-left: 10px; padding: 20px; }
```

<pre class="language-text"><code class="language-text">code-block.css:1:25 <a href="https://biomejs.dev/linter/rules/no-shorthand-property-overrides">lint/nursery/noShorthandPropertyOverrides</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected shorthand property </span><span style="color: Tomato;"><strong>padding</strong></span><span style="color: Tomato;"> after </span><span style="color: Tomato;"><strong>padding-left</strong></span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a { padding-left: 10px; padding: 20px; }
   <strong>   │ </strong>                        <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
</code></pre>

### Valid

```css
a { padding: 10px; padding-left: 20px; }
```

```css
a { transition-property: opacity; } a { transition: opacity 1s linear; }
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)