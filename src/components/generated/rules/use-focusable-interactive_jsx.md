**Since**: `v1.8.0`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/interactive-support-focus.md" target="_blank"><code>jsx-a11y/interactive-support-focus</code></a>

Elements with an interactive role and interaction handlers must be focusable.

HTML elements with interactive roles must have `tabIndex` defined to ensure they are
focusable. Without tabIndex, assistive technologies may not recognize these elements as
interactive.
You could also consider switching from an interactive role to its semantic HTML element
instead.

## Examples

### Invalid

```jsx
<div role="button" />
```

<pre class="language-text"><code class="language-text">code-block.jsx:1:1 <a href="https://biomejs.dev/linter/rules/use-focusable-interactive">lint/nursery/useFocusableInteractive</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The HTML element with the interactive role </span><span style="color: Tomato;"><strong>&quot;button&quot;</strong></span><span style="color: Tomato;"> is not focusable.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;div role=&quot;button&quot; /&gt;
   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">A non-interactive HTML element that is not focusable may not be reachable for users that rely on keyboard navigation, even with an added role like </span><span style="color: lightgreen;"><strong>&quot;button&quot;</strong></span><span style="color: lightgreen;">.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Add a </span><span style="color: lightgreen;"><strong>tabIndex</strong></span><span style="color: lightgreen;"> attribute to make this element focusable.</span>
  
</code></pre>

```jsx
<div role="tab" />
```

<pre class="language-text"><code class="language-text">code-block.jsx:1:1 <a href="https://biomejs.dev/linter/rules/use-focusable-interactive">lint/nursery/useFocusableInteractive</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The HTML element with the interactive role </span><span style="color: Tomato;"><strong>&quot;tab&quot;</strong></span><span style="color: Tomato;"> is not focusable.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;div role=&quot;tab&quot; /&gt;
   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">A non-interactive HTML element that is not focusable may not be reachable for users that rely on keyboard navigation, even with an added role like </span><span style="color: lightgreen;"><strong>&quot;tab&quot;</strong></span><span style="color: lightgreen;">.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Add a </span><span style="color: lightgreen;"><strong>tabIndex</strong></span><span style="color: lightgreen;"> attribute to make this element focusable.</span>
  
</code></pre>

### Valid

```jsx
<div role="button" tabIndex={0} />
```

```jsx
<div />
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
