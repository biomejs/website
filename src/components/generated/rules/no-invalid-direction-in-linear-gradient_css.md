**Since**: `vnext`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/function-linear-gradient-no-nonstandard-direction/README.md" target="_blank"><code>stylelint/function-linear-gradient-no-nonstandard-direction</code></a>

Disallow non-standard direction values for linear gradient functions.

A valid and standard direction value is one of the following:

- an angle
- to plus a side-or-corner (`to top`, `to bottom`, `to left`, `to right`; `to top right`, `to right top`, `to bottom left`, etc.)

A common mistake (matching outdated non-standard syntax) is to use just a side-or-corner without the preceding to.

## Examples

### Invalid

```css
.foo { background: linear-gradient(top, #fff, #000); }
```

<pre class="language-text"><code class="language-text">code-block.css:1:36 <a href="https://biomejs.dev/linter/rules/no-invalid-direction-in-linear-gradient">lint/nursery/noInvalidDirectionInLinearGradient</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected nonstandard direction</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>.foo { background: linear-gradient(top, #fff, #000); }<br />   <strong>   │ </strong>                                   <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">You should fix the direction value to follow the syntax.</span><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient">MDN web docs</a></span><span style="color: lightgreen;"> for more details.</span><br />  <br /></code></pre>

```css
.foo { background: linear-gradient(45, #fff, #000); }
```

<pre class="language-text"><code class="language-text">code-block.css:1:36 <a href="https://biomejs.dev/linter/rules/no-invalid-direction-in-linear-gradient">lint/nursery/noInvalidDirectionInLinearGradient</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected nonstandard direction</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>.foo { background: linear-gradient(45, #fff, #000); }<br />   <strong>   │ </strong>                                   <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">You should fix the direction value to follow the syntax.</span><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient">MDN web docs</a></span><span style="color: lightgreen;"> for more details.</span><br />  <br /></code></pre>

### Valid

```css
.foo { background: linear-gradient(to top, #fff, #000); }
```

```css
.foo { background: linear-gradient(45deg, #fff, #000); }
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
