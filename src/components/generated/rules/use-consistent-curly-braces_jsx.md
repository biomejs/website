**Since**: `vnext`
:::note
- This rule has an **unsafe** fix.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Inspired from: <a href="https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md" target="_blank"><code>react/jsx-curly-brace-presence</code></a>

This rule enforces consistent use of curly braces inside JSX attributes and JSX children.

For situations where JSX expressions are unnecessary, please refer to [the React doc](https://facebook.github.io/react/docs/jsx-in-depth.html) and [this page about JSX gotchas](https://github.com/facebook/react/blob/v15.4.0-rc.3/docs/docs/02.3-jsx-gotchas.md#html-entities).

This rule will check for and warn about unnecessary curly braces in both JSX props and children.

## Examples

### Invalid

```jsx
<Foo>{'Hello world'}</Foo>
```

<pre class="language-text"><code class="language-text">code-block.jsx:1:6 <a href="https://biomejs.dev/linter/rules/use-consistent-curly-braces">lint/nursery/useConsistentCurlyBraces</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Should not have curly braces around expression.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;Foo&gt;{'Hello world'}&lt;/Foo&gt;
   <strong>   │ </strong>     <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">JSX child does not need to be wrapped in curly braces.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove curly braces around the expression.</span>
  
<strong>  </strong><strong>  1 │ </strong>&lt;Foo&gt;<span style="color: Tomato;">{</span><span style="color: Tomato;">'</span>Hello<span style="opacity: 0.8;">·</span>world<span style="color: Tomato;">'</span><span style="color: Tomato;">}</span>&lt;/Foo&gt;
<strong>  </strong><strong>    │ </strong>     <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span>           <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span>      
</code></pre>

```jsx
<Foo foo={'bar'} />
```

<pre class="language-text"><code class="language-text">code-block.jsx:1:10 <a href="https://biomejs.dev/linter/rules/use-consistent-curly-braces">lint/nursery/useConsistentCurlyBraces</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Should not have curly braces around expression.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;Foo foo={'bar'} /&gt;
   <strong>   │ </strong>         <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">JSX attribute value does not need to be wrapped in curly braces.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove curly braces around the expression.</span>
  
<strong>  </strong><strong>  1 │ </strong>&lt;Foo<span style="opacity: 0.8;">·</span>foo=<span style="color: Tomato;">{</span>'bar'<span style="color: Tomato;">}</span><span style="opacity: 0.8;">·</span>/&gt;
<strong>  </strong><strong>    │ </strong>         <span style="color: Tomato;">-</span>     <span style="color: Tomato;">-</span>   
</code></pre>

```jsx
<Foo foo=<Bar /> />
```

<pre class="language-text"><code class="language-text">code-block.jsx:1:10 <a href="https://biomejs.dev/linter/rules/use-consistent-curly-braces">lint/nursery/useConsistentCurlyBraces</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Should have curly braces around expression.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;Foo foo=&lt;Bar /&gt; /&gt;
   <strong>   │ </strong>         <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">JSX attribute value should be wrapped in curly braces. This will make the JSX attribute value more readable.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add curly braces around the expression.</span>
  
<strong>  </strong><strong>  1 │ </strong>&lt;Foo<span style="opacity: 0.8;">·</span>foo=<span style="color: MediumSeaGreen;">{</span>&lt;Bar<span style="opacity: 0.8;">·</span>/&gt;<span style="color: MediumSeaGreen;">}</span><span style="opacity: 0.8;">·</span>/&gt;
<strong>  </strong><strong>    │ </strong>         <span style="color: MediumSeaGreen;">+</span>       <span style="color: MediumSeaGreen;">+</span>   
</code></pre>

### Valid

```jsx
<>
    <Foo>Hello world</Foo>
    <Foo foo="bar" />
    <Foo foo={5} />
    <Foo foo={<Bar />} />
</>
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
