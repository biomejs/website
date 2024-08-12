**Since**: `v1.5.0`
Sources: 
- Same as: <a href="https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-nodejs-modules.md" target="_blank"><code>import/no-nodejs-modules</code></a>

Forbid the use of Node.js builtin modules.

This can be useful for client-side web projects that don't have access to those modules.

## Examples

### Invalid

```js
import fs from "fs";
```

<pre class="language-text"><code class="language-text">code-block.js:1:16 <a href="https://biomejs.dev/linter/rules/no-nodejs-modules">lint/correctness/noNodejsModules</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Using Node.js modules is forbidden.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import fs from &quot;fs&quot;;
   <strong>   │ </strong>               <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Can be useful for client-side web projects that do not have access to those modules.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Remove the import module.</span>
  
</code></pre>

```js
import path from "node:path";
```

<pre class="language-text"><code class="language-text">code-block.js:1:18 <a href="https://biomejs.dev/linter/rules/no-nodejs-modules">lint/correctness/noNodejsModules</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Using Node.js modules is forbidden.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import path from &quot;node:path&quot;;
   <strong>   │ </strong>                 <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Can be useful for client-side web projects that do not have access to those modules.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Remove the import module.</span>
  
</code></pre>

### Valid

```js
import fs from "fs-custom";
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
