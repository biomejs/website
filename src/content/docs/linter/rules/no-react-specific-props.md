---
title: noReactSpecificProps (since v1.7.2)
---

**Diagnostic Category: `lint/nursery/noReactSpecificProps`**

:::note
- This rule has a **safe** fix.
- This rule is applied to **JavaScript and super languages** files.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/solidjs-community/eslint-plugin-solid/blob/main/docs/no-react-specific-props.md" target="_blank"><code>solidjs/no-react-specific-props</code></a>

Prevents React-specific JSX properties from being used.

This rule is intended for use in JSX-based frameworks (mainly **Solid.js**)
that do not use React-style prop names.

## Examples

### Invalid

```js
<Hello className="John" />
```

<pre class="language-text"><code class="language-text">code-block.js:1:8 <a href="https://biomejs.dev/linter/rules/no-react-specific-props">lint/nursery/noReactSpecificProps</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This JSX attribute is specific to React.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;Hello className=&quot;John&quot; /&gt;
   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This attribute may not be supported by non-React frameworks, as it is not native to HTML.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;Hello className=&quot;John&quot; /&gt;
   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Replace this attribute name with &quot;class&quot;</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">&lt;</span><span style="color: Tomato;">H</span><span style="color: Tomato;">e</span><span style="color: Tomato;">l</span><span style="color: Tomato;">l</span><span style="color: Tomato;">o</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><strong>c</strong></span><span style="color: Tomato;"><strong>l</strong></span><span style="color: Tomato;"><strong>a</strong></span><span style="color: Tomato;"><strong>s</strong></span><span style="color: Tomato;"><strong>s</strong></span><span style="color: Tomato;"><strong>N</strong></span><span style="color: Tomato;"><strong>a</strong></span><span style="color: Tomato;"><strong>m</strong></span><span style="color: Tomato;"><strong>e</strong></span><span style="color: Tomato;">=</span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">J</span><span style="color: Tomato;">o</span><span style="color: Tomato;">h</span><span style="color: Tomato;">n</span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">/</span><span style="color: Tomato;">&gt;</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">&lt;</span><span style="color: MediumSeaGreen;">H</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><strong>c</strong></span><span style="color: MediumSeaGreen;"><strong>l</strong></span><span style="color: MediumSeaGreen;"><strong>a</strong></span><span style="color: MediumSeaGreen;"><strong>s</strong></span><span style="color: MediumSeaGreen;"><strong>s</strong></span><span style="color: MediumSeaGreen;">=</span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">J</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">h</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;">&gt;</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

### Valid

```js
<Hello class="Doe" />
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
