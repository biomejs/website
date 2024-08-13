**Since**: `v1.8.0`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/prefer-tag-over-role.md" target="_blank"><code>jsx-a11y/prefer-tag-over-role</code></a>

It detects the use of `role` attributes in JSX elements and suggests using semantic elements instead.

The `role` attribute is used to define the purpose of an element, but it should be used as a last resort. Using semantic elements like `<button>`, `<input>`, `<textarea>`, `<a>`, `<img>`, `<table>`, `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<main>`, `<figure>`, `<figcaption>`, `<details>`, `<summary>`, `<dialog>`, `<menu>`, `<menuitem>`, `<fieldset>`, `<legend>`, `<caption>`, `<colgroup>`, `<col>`, `<optgroup>`, `<option>`, `<select>`, `<datalist>`, `<output>`, `<progress>`, `<meter>`, `<time>`, `<audio>`, `<video>`, `<track>`, `<source>`, `<embed>`, `<object>`, `<param>`, `<iframe>`, `<canvas>`, `<map>`, `<area>`, `<svg>`, `<math>` are more accessible and provide better semantics.

## Examples

### Invalid

```jsx
<div role="checkbox">
```

<pre class="language-text"><code class="language-text">code-block.jsx:2:1 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">expected `&lt;` but instead the file ends</span>
  
    <strong>1 │ </strong>&lt;div role=&quot;checkbox&quot;&gt;
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>
   <strong>   │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">the file ends here</span>
  
    <strong>1 │ </strong>&lt;div role=&quot;checkbox&quot;&gt;
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>
   <strong>   │ </strong>
  
</code></pre>

```jsx
<div role="img">
```

<pre class="language-text"><code class="language-text">code-block.jsx:2:1 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">expected `&lt;` but instead the file ends</span>
  
    <strong>1 │ </strong>&lt;div role=&quot;img&quot;&gt;
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>
   <strong>   │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">the file ends here</span>
  
    <strong>1 │ </strong>&lt;div role=&quot;img&quot;&gt;
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>
   <strong>   │ </strong>
  
</code></pre>

### Valid

```jsx
<>
 <div></div>
 <header></header>
 <img alt="" src="image.jpg" />
</>
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
