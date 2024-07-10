---
title: useStrictMode (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/useStrictMode`**

:::note
- This rule has a **safe** fix.
- This rule is applied to **JavaScript and super languages** files.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Enforce the use of the directive `"use strict"` in script files.

The JavaScript [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) prohibits some obsolete JavaScript syntaxes and makes some slight semantic chnmages to allow more optimizations by JavaScript engines.
EcmaScript modules are always in strict mode, while JavaScript scripts are by default in non-strict mode, also known as _sloppy mode_.
A developer can add the `"use strict"` directive at the start of a script file to enable the strict mode in that file.

Biome considers a CommonJS (`.cjs`) file as a script file.
By default, Biome recognizes a JavaScript file (`.js`) as a module file, except if `"type": "commonjs"` is specified in `package.json`.

## Examples

### Invalid

```cjs
var a = 1;
```

<pre class="language-text"><code class="language-text">code-block.cjs:1:1 <a href="https://biomejs.dev/linter/rules/use-strict-mode">lint/nursery/useStrictMode</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Unexpected absence of the directive </span><span style="color: Tomato;"><strong>&quot;use strict&quot;.</strong></span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>var a = 1;
   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Strict mode allows to opt-in some optimisations of the runtime engines, and it eliminates some JavaScript silent errors by changing them to throw errors.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Check the </span><span style="color: lightgreen;"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode">for more information regarding strict mode.</a></span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Insert a top level</span><span style="color: lightgreen;"><strong>&quot;use strict&quot; </strong></span><span style="color: lightgreen;">.</span>
  
<strong>  </strong><strong>  1 │ </strong><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">u</span><span style="color: MediumSeaGreen;">s</span><span style="color: MediumSeaGreen;">e</span><span style="opacity: 0.8;"><span style="color: MediumSeaGreen;">·</span></span><span style="color: MediumSeaGreen;">s</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">c</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;">&quot;</span>var<span style="opacity: 0.8;">·</span>a<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span>1;
<strong>  </strong><strong>    │ </strong><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span>          
</code></pre>

### Valid

```cjs
"use strict";

var a = 1;
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
