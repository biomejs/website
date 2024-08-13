**Since**: `v1.8.0`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/stylelint/stylelint/blob/main/lib/rules/keyframe-declaration-no-important/README.md" target="_blank"><code>stylelint/keyframe-declaration-no-important</code></a>

Disallow invalid `!important` within keyframe declarations

Using `!important` within keyframes declarations is completely ignored in some browsers.

## Examples

### Invalid

```css
@keyframes foo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1 !important;
    }
}
```

<pre class="language-text"><code class="language-text">code-block.css:6:18 <a href="https://biomejs.dev/linter/rules/no-important-in-keyframe">lint/nursery/noImportantInKeyframe</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Using </span><span style="color: Tomato;"><strong>!important</strong></span><span style="color: Tomato;"> within keyframes declaration is completely ignored in some browsers.</span>
  
    <strong>4 │ </strong>    }
    <strong>5 │ </strong>    to {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>6 │ </strong>      opacity: 1 !important;
   <strong>   │ </strong>                 <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>7 │ </strong>    }
    <strong>8 │ </strong>}
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider removing useless </span><span style="color: lightgreen;"><strong>!important</strong></span><span style="color: lightgreen;"> declaration.</span>
  
</code></pre>

### Valid

```css
@keyframes foo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
