---
title: noValueAtRule (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/noValueAtRule`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Disallow use of `@value` rule in css modules.

Use of CSS variables is recommended instead of `@value` rule.

## Examples

### Invalid

```css
@value red: #FF0000;
```

<pre class="language-text"><code class="language-text">code-block.css:1:2 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">@value at-rule is not a standard CSS feature.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>@value red: #FF0000;
   <strong>   │ </strong> <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">You can enable @value at-rule parsing by setting the `css.parser.cssModules` option to `true` in your configuration file.</span>
  
</code></pre>

### Valid

```css
:root {
  --red: #FF0000
}

p {
  background-color: var(--red);
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
