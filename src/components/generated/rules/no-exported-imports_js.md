**Since**: `vnext`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Disallow exporting an imported variable.

In JavaScript, you can re-export a variable either by using `export from` or
by first importing the variable and then exporting it with a regular `export`.

You may prefer to use the first approach, as it clearly communicates the intention
to re-export an import, and can make static analysis easier.

## Examples

### Invalid

```js
import { A } from "mod";
export { A };
```

<pre class="language-text"><code class="language-text">code-block.js:1:10 <a href="https://biomejs.dev/linter/rules/no-exported-imports">lint/nursery/noExportedImports</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">An import should not be exported. Use </span><span style="color: Orange;"><strong>export from</strong></span><span style="color: Orange;"> instead.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import { A } from &quot;mod&quot;;
   <strong>   │ </strong>         <strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>export { A };
    <strong>3 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>export from</strong></span><span style="color: lightgreen;"> makes it clearer that the intention is to re-export a variable.</span>
  
</code></pre>

```js
import * as ns from "mod";
export { ns };
```

<pre class="language-text"><code class="language-text">code-block.js:1:8 <a href="https://biomejs.dev/linter/rules/no-exported-imports">lint/nursery/noExportedImports</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">An import should not be exported. Use </span><span style="color: Orange;"><strong>export from</strong></span><span style="color: Orange;"> instead.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import * as ns from &quot;mod&quot;;
   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>export { ns };
    <strong>3 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>export from</strong></span><span style="color: lightgreen;"> makes it clearer that the intention is to re-export a variable.</span>
  
</code></pre>

```js
import D from "mod";
export { D };
```

<pre class="language-text"><code class="language-text">code-block.js:1:8 <a href="https://biomejs.dev/linter/rules/no-exported-imports">lint/nursery/noExportedImports</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">An import should not be exported. Use </span><span style="color: Orange;"><strong>export from</strong></span><span style="color: Orange;"> instead.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import D from &quot;mod&quot;;
   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>export { D };
    <strong>3 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>export from</strong></span><span style="color: lightgreen;"> makes it clearer that the intention is to re-export a variable.</span>
  
</code></pre>

### Valid

```js
export { A } from "mod";
export * as ns from "mod";
export { default as D } from "mod";
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
