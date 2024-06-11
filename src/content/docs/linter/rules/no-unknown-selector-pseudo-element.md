---
title: noUnknownSelectorPseudoElement (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/noUnknownSelectorPseudoElement`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/selector-pseudo-element-no-unknown/README.md" target="_blank"><code>stylelint/selector-pseudo-element-no-unknown</code></a>

Disallow unknown pseudo-element selectors.

For details on known CSS pseudo-elements, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#list_of_pseudo-elements).

This rule ignores vendor-prefixed pseudo-element selectors.

## Examples

### Invalid

```css
a::pseudo {}
```

<pre class="language-text"><code class="language-text">code-block.css:1:4 <a href="https://biomejs.dev/linter/rules/no-unknown-selector-pseudo-element">lint/nursery/noUnknownSelectorPseudoElement</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected unknown pseudo-elements: </span><span style="color: Tomato;"><strong>pseudo</strong></span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a::pseudo {}
   <strong>   │ </strong>   <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#list_of_pseudo-elements">MDN web docs</a></span><span style="color: lightgreen;"> for more details.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a known pseudo-elements instead, such as:</span>
  
  - after
  - backdrop
  - before
  - etc.
  
</code></pre>

```css
a::PSEUDO {}
```

<pre class="language-text"><code class="language-text">code-block.css:1:4 <a href="https://biomejs.dev/linter/rules/no-unknown-selector-pseudo-element">lint/nursery/noUnknownSelectorPseudoElement</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected unknown pseudo-elements: </span><span style="color: Tomato;"><strong>PSEUDO</strong></span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a::PSEUDO {}
   <strong>   │ </strong>   <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#list_of_pseudo-elements">MDN web docs</a></span><span style="color: lightgreen;"> for more details.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a known pseudo-elements instead, such as:</span>
  
  - after
  - backdrop
  - before
  - etc.
  
</code></pre>

```css
a::element {}
```

<pre class="language-text"><code class="language-text">code-block.css:1:4 <a href="https://biomejs.dev/linter/rules/no-unknown-selector-pseudo-element">lint/nursery/noUnknownSelectorPseudoElement</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected unknown pseudo-elements: </span><span style="color: Tomato;"><strong>element</strong></span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a::element {}
   <strong>   │ </strong>   <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#list_of_pseudo-elements">MDN web docs</a></span><span style="color: lightgreen;"> for more details.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a known pseudo-elements instead, such as:</span>
  
  - after
  - backdrop
  - before
  - etc.
  
</code></pre>

### Valid

```css
a:before {}
```

```css
a::before {}
```

```css
::selection {}
```

```css
input::-moz-placeholder {}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
