**Since**: `v1.8.0`
:::note
- This rule has an **unsafe** fix.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-number-to-fixed-digits-argument.md" target="_blank"><code>unicorn/require-number-to-fixed-digits-argument</code></a>

Enforce using the digits argument with `Number#toFixed()`.

When using `Number#toFixed()` explicitly specify the number of digits you want to appear after the decimal point,
to avoid unexpected results, rather than relying on its default value of 0.

## Examples

### Invalid

```js
const string = number.toFixed();
```

<pre class="language-text"><code class="language-text">code-block.js:1:30 <a href="https://biomejs.dev/linter/rules/use-number-to-fixed-digits-argument">lint/nursery/useNumberToFixedDigitsArgument</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Specify the number of digits you want to appear after the decimal point.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const string = number.toFixed();
   <strong>   │ </strong>                             <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add explicit digits argument to </span><span style="color: lightgreen;"><strong>toFixed</strong></span><span style="color: lightgreen;"> method.</span>
  
<strong>  </strong><strong>  1 │ </strong>const<span style="opacity: 0.8;">·</span>string<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span>number.toFixed(<span style="color: MediumSeaGreen;">0</span>);
<strong>  </strong><strong>    │ </strong>                              <span style="color: MediumSeaGreen;">+</span>  
</code></pre>

### Valid

```js
const string = foo.toFixed(0);
```

```js
const string = foo.toFixed(2);
```

## Caveats

This rule always assumes that `toFixed` is called on a number.
It does not check the type of the callee.

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
