**Since**: `vnext`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/selector-pseudo-class-no-unknown/README.md" target="_blank"><code>stylelint/selector-pseudo-class-no-unknown</code></a>

Disallow unknown pseudo-class selectors.

For details on known pseudo-class, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

This rule ignores vendor-prefixed pseudo-class selectors.

## Examples

### Invalid

```css
a:unknown {}
```

<pre class="language-text"><code class="language-text">code-block.css:1:3 <a href="https://biomejs.dev/linter/rules/no-unknown-pseudo-class-selector">lint/nursery/noUnknownPseudoClassSelector</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected unknown pseudo-class </span><span style="color: Tomato;"><strong>unknown</strong></span><span style="color: Tomato;"> </span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a:unknown {}<br />   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes">MDN web docs</a></span><span style="color: lightgreen;"> for more details.</span><br />  <br /></code></pre>

```css
a:UNKNOWN {}
```

<pre class="language-text"><code class="language-text">code-block.css:1:3 <a href="https://biomejs.dev/linter/rules/no-unknown-pseudo-class-selector">lint/nursery/noUnknownPseudoClassSelector</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected unknown pseudo-class </span><span style="color: Tomato;"><strong>UNKNOWN</strong></span><span style="color: Tomato;"> </span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a:UNKNOWN {}<br />   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes">MDN web docs</a></span><span style="color: lightgreen;"> for more details.</span><br />  <br /></code></pre>

```css
a:hoverr {}
```

<pre class="language-text"><code class="language-text">code-block.css:1:3 <a href="https://biomejs.dev/linter/rules/no-unknown-pseudo-class-selector">lint/nursery/noUnknownPseudoClassSelector</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected unknown pseudo-class </span><span style="color: Tomato;"><strong>hoverr</strong></span><span style="color: Tomato;"> </span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>a:hoverr {}<br />   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes">MDN web docs</a></span><span style="color: lightgreen;"> for more details.</span><br />  <br /></code></pre>

### Valid

```css
a:hover {}
```

```css
a:focus {}
```

```css
:not(p) {}
```

```css
input:-moz-placeholder {}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
