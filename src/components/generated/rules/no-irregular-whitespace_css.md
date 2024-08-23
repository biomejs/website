**Since**: `vnext`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/no-irregular-whitespace/README.md" target="_blank"><code>stylelint/no-irregular-whitespace</code></a>

Disallows the use of irregular whitespace characters.

Using irregular whitespace would lead to the failure of selecting the correct target.

## Examples

### Invalid

```css
.firstClass.secondClass {
  color: red;
}
```

<pre class="language-text"><code class="language-text">code-block.css:1:12 <a href="https://biomejs.dev/linter/rules/no-irregular-whitespace">lint/nursery/noIrregularWhitespace</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Irregular whitespace found.</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>.firstClass<span style="opacity: 0.8;">␋</span>.secondClass {<br />   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>  color: red;<br />    <strong>3 │ </strong>}<br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Replace the irregular whitespace with normal whitespaces.</span><br />  <br /></code></pre>

```css
.firstClass .secondClass {
  color:red;
}
```

<pre class="language-text"><code class="language-text">code-block.css:2:9 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The CSS standard only allows tabs, whitespace, carriage return and line feed whitespace.</span><br />  <br />    <strong>1 │ </strong>.firstClass .secondClass {<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  color:<span style="opacity: 0.8;">␋</span>red;<br />   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>}<br />    <strong>4 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a regular whitespace character instead.</span><br />  <br /></code></pre>

### Valid

```css
.firstClass .secondClass {
  color: red;
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
