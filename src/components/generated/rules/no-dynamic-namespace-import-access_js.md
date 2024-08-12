**Since**: `vnext`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Disallow accessing namespace imports dynamically.

Accessing namespace imports dynamically can prevent efficient tree shaking and increase bundle size.
This happens because the bundler cannot determine which parts of the namespace are used at compile time,
so it must include the entire namespace in the bundle.

Instead, consider using named imports or if that is not possible
access the namespaced import properties statically.

If you want to completely disallow namespace imports, consider using the [noNamespaceImport](https://biomejs.dev/linter/rules/no-namespace-import/) rule.

## Examples

### Invalid

```js
import * as foo from "foo"
foo["bar"]
```

<pre class="language-text"><code class="language-text">code-block.js:2:1 <a href="https://biomejs.dev/linter/rules/no-dynamic-namespace-import-access">lint/nursery/noDynamicNamespaceImportAccess</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Avoid accessing namespace imports dynamically, it can prevent efficient tree shaking and increase bundle size.</span>
  
    <strong>1 │ </strong>import * as foo from &quot;foo&quot;
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>foo[&quot;bar&quot;]
   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Prefer static property access or use named imports instead.</span>
  
</code></pre>

```js
import * as foo from "foo"
const key = "bar"
foo[key]
```

<pre class="language-text"><code class="language-text">code-block.js:3:1 <a href="https://biomejs.dev/linter/rules/no-dynamic-namespace-import-access">lint/nursery/noDynamicNamespaceImportAccess</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Avoid accessing namespace imports dynamically, it can prevent efficient tree shaking and increase bundle size.</span>
  
    <strong>1 │ </strong>import * as foo from &quot;foo&quot;
    <strong>2 │ </strong>const key = &quot;bar&quot;
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>foo[key]
   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>4 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Prefer static property access or use named imports instead.</span>
  
</code></pre>

### Valid

```js
import * as foo from "foo"
foo.bar
```

```js
import { bar } from "foo"
bar
```

```js
import messages from "i18n"
const knownMessagesMap = {
 hello: messages.hello,
 goodbye: messages.goodbye
}

const dynamicKey = "hello"
knownMessagesMap[dynamicKey]
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
