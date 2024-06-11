---
title: useImportExtensions (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/useImportExtensions`**

:::note
- This rule has an **unsafe** fix.
- This rule is applied to **JavaScript and super languages** files.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Enforce file extensions for relative imports.

Browsers and Node.js do not natively support importing files without extensions. This rule
enforces the use of file extensions for relative imports to make the code more consistent.

Tooling also benefits from explicit file extensions, because they do not need to guess which
file to resolve.

Rule checks static imports and dynamic imports calls such as `import()` and `require()`.

## Examples

### Invalid

```js
import "./foo";
```

<pre class="language-text"><code class="language-text"></code></pre>

```js
import "./bar/";
```

<pre class="language-text"><code class="language-text"></code></pre>

```js
import "../";
```

<pre class="language-text"><code class="language-text"></code></pre>

```js
import "../.";
```

<pre class="language-text"><code class="language-text"></code></pre>

```js
import("./foo");
```

<pre class="language-text"><code class="language-text"></code></pre>

```js
require("./foo");
```

<pre class="language-text"><code class="language-text"></code></pre>

### Valid

```js
import "biome";
```

```js
import "./foo.js";
```

```js
import "./bar/index.js";
```

```js
import("./foo.js");
```

```js
require("./foo.js");
```

## Caveats

If you are using TypeScript, TypeScript version 5.0 and later is required, also make sure to enable
[allowImportingTsExtensions=true](https://typescriptlang.org/tsconfig#allowImportingTsExtensions) in your `tsconfig.json`.

Rule does not yet check filesystem for file type. It tries to guess which extension
it should add based on the file extension of the current file and the import path.
When applying the suggested fix, make sure to verify that the file type is correct.

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
