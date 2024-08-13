**Since**: `v1.8.0`
:::note
- This rule has an **unsafe** fix.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Enforce file extensions for relative imports.

Browsers and Node.js do not natively support importing files without extensions. This rule
enforces the use of file extensions for relative imports to make the code more consistent.

Tooling also benefits from explicit file extensions, because they do not need to guess which
file to resolve.

The rule checks static imports and dynamic imports calls such as `import()` and `require()`.

To ensure that Visual Studio Code adds the file extension when it automatically imports a variable,
you may set [`javascript.preferences.importModuleSpecifierEnding` and `typescript.preferences.importModuleSpecifierEnding`](https://code.visualstudio.com/docs/getstarted/settings) to the desired file extension.

## Examples

### Invalid

```js
import "./foo";
```

<pre class="language-text"><code class="language-text">code-block.js:1:8 <a href="https://biomejs.dev/linter/rules/use-import-extensions">lint/nursery/useImportExtensions</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Add a file extension for relative imports.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import &quot;./foo&quot;;
   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Explicit import improves compatibility with browsers and makes file resolution in tooling faster.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add potential import extension </span><span style="color: lightgreen;"><strong>.js</strong></span><span style="color: lightgreen;">.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">i</span><span style="color: Tomato;">m</span><span style="color: Tomato;">p</span><span style="color: Tomato;">o</span><span style="color: Tomato;">r</span><span style="color: Tomato;">t</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">.</span><span style="color: Tomato;">/</span><span style="color: Tomato;"><strong>f</strong></span><span style="color: Tomato;"><strong>o</strong></span><span style="color: Tomato;"><strong>o</strong></span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">;</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">p</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">.</span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;"><strong>f</strong></span><span style="color: MediumSeaGreen;"><strong>o</strong></span><span style="color: MediumSeaGreen;"><strong>o</strong></span><span style="color: MediumSeaGreen;"><strong>.</strong></span><span style="color: MediumSeaGreen;"><strong>j</strong></span><span style="color: MediumSeaGreen;"><strong>s</strong></span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">;</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

```js
import "./foo/";
```

<pre class="language-text"><code class="language-text">code-block.js:1:8 <a href="https://biomejs.dev/linter/rules/use-import-extensions">lint/nursery/useImportExtensions</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Add a file extension for relative imports.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import &quot;./foo/&quot;;
   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Explicit import improves compatibility with browsers and makes file resolution in tooling faster.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add potential import extension </span><span style="color: lightgreen;"><strong>.js</strong></span><span style="color: lightgreen;">.</span>
  
<strong>  </strong><strong>  1 │ </strong>import<span style="opacity: 0.8;">·</span>&quot;./foo/<span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">d</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">x</span><span style="color: MediumSeaGreen;">.</span><span style="color: MediumSeaGreen;">j</span><span style="color: MediumSeaGreen;">s</span>&quot;;
<strong>  </strong><strong>    │ </strong>              <span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span>  
</code></pre>

```js
import "../";
```

<pre class="language-text"><code class="language-text">code-block.js:1:8 <a href="https://biomejs.dev/linter/rules/use-import-extensions">lint/nursery/useImportExtensions</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Add a file extension for relative imports.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import &quot;../&quot;;
   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Explicit import improves compatibility with browsers and makes file resolution in tooling faster.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add potential import extension </span><span style="color: lightgreen;"><strong>.js</strong></span><span style="color: lightgreen;">.</span>
  
<strong>  </strong><strong>  1 │ </strong>import<span style="opacity: 0.8;">·</span>&quot;../<span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">d</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">x</span><span style="color: MediumSeaGreen;">.</span><span style="color: MediumSeaGreen;">j</span><span style="color: MediumSeaGreen;">s</span>&quot;;
<strong>  </strong><strong>    │ </strong>           <span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span>  
</code></pre>

```js
import "../.";
```

<pre class="language-text"><code class="language-text">code-block.js:1:8 <a href="https://biomejs.dev/linter/rules/use-import-extensions">lint/nursery/useImportExtensions</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Add a file extension for relative imports.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import &quot;../.&quot;;
   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Explicit import improves compatibility with browsers and makes file resolution in tooling faster.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add potential import extension </span><span style="color: lightgreen;"><strong>.js</strong></span><span style="color: lightgreen;">.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">i</span><span style="color: Tomato;">m</span><span style="color: Tomato;">p</span><span style="color: Tomato;">o</span><span style="color: Tomato;">r</span><span style="color: Tomato;">t</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">.</span><span style="color: Tomato;">.</span><span style="color: Tomato;">/</span><span style="color: Tomato;"><strong>.</strong></span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">;</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">p</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">.</span><span style="color: MediumSeaGreen;">.</span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;"><strong>i</strong></span><span style="color: MediumSeaGreen;"><strong>n</strong></span><span style="color: MediumSeaGreen;"><strong>d</strong></span><span style="color: MediumSeaGreen;"><strong>e</strong></span><span style="color: MediumSeaGreen;"><strong>x</strong></span><span style="color: MediumSeaGreen;"><strong>.</strong></span><span style="color: MediumSeaGreen;"><strong>j</strong></span><span style="color: MediumSeaGreen;"><strong>s</strong></span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">;</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

```js
import("./foo");
```

<pre class="language-text"><code class="language-text">code-block.js:1:8 <a href="https://biomejs.dev/linter/rules/use-import-extensions">lint/nursery/useImportExtensions</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Add a file extension for relative imports.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import(&quot;./foo&quot;);
   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Explicit import improves compatibility with browsers and makes file resolution in tooling faster.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add potential import extension </span><span style="color: lightgreen;"><strong>.js</strong></span><span style="color: lightgreen;">.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">i</span><span style="color: Tomato;">m</span><span style="color: Tomato;">p</span><span style="color: Tomato;">o</span><span style="color: Tomato;">r</span><span style="color: Tomato;">t</span><span style="color: Tomato;">(</span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">.</span><span style="color: Tomato;">/</span><span style="color: Tomato;"><strong>f</strong></span><span style="color: Tomato;"><strong>o</strong></span><span style="color: Tomato;"><strong>o</strong></span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">)</span><span style="color: Tomato;">;</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">p</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;">(</span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">.</span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;"><strong>f</strong></span><span style="color: MediumSeaGreen;"><strong>o</strong></span><span style="color: MediumSeaGreen;"><strong>o</strong></span><span style="color: MediumSeaGreen;"><strong>.</strong></span><span style="color: MediumSeaGreen;"><strong>j</strong></span><span style="color: MediumSeaGreen;"><strong>s</strong></span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">)</span><span style="color: MediumSeaGreen;">;</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

```js
require("./foo");
```

<pre class="language-text"><code class="language-text">code-block.js:1:9 <a href="https://biomejs.dev/linter/rules/use-import-extensions">lint/nursery/useImportExtensions</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Add a file extension for relative imports.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>require(&quot;./foo&quot;);
   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Explicit import improves compatibility with browsers and makes file resolution in tooling faster.</span>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add potential import extension </span><span style="color: lightgreen;"><strong>.js</strong></span><span style="color: lightgreen;">.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">r</span><span style="color: Tomato;">e</span><span style="color: Tomato;">q</span><span style="color: Tomato;">u</span><span style="color: Tomato;">i</span><span style="color: Tomato;">r</span><span style="color: Tomato;">e</span><span style="color: Tomato;">(</span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">.</span><span style="color: Tomato;">/</span><span style="color: Tomato;"><strong>f</strong></span><span style="color: Tomato;"><strong>o</strong></span><span style="color: Tomato;"><strong>o</strong></span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">)</span><span style="color: Tomato;">;</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">q</span><span style="color: MediumSeaGreen;">u</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">(</span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">.</span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;"><strong>f</strong></span><span style="color: MediumSeaGreen;"><strong>o</strong></span><span style="color: MediumSeaGreen;"><strong>o</strong></span><span style="color: MediumSeaGreen;"><strong>.</strong></span><span style="color: MediumSeaGreen;"><strong>j</strong></span><span style="color: MediumSeaGreen;"><strong>s</strong></span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">)</span><span style="color: MediumSeaGreen;">;</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

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

### Options

Use the options to specify the correct import extensions for your project based on the linted
file extension. These mappings will override the rule's default logic.

Currently, Biome determines the import extension based on the inspected file extension.
The `suggestedExtensions` option works as a map, where the key is the source file extension
and the value should provide two possible mappings for imports:

- `module` is used for module imports that start with a lower-case character, e.g. `foo.js`
- `component` is used for component files that start with an upper-case character, e.g. `Foo.jsx` (which is a common convention for React JSX)

For example, if you want `.ts` files to import other modules as `.js` (or `.jsx`), you should
configure the following options in your Biome config:

```json
{
    "//": "...",
    "options": {
        "suggestedExtensions": {
            "ts": {
                "module": "js",
                "component": "jsx"
            }
        }
    }
}
```

:::caution
Mainly, this is a temporary workaround that allows Biome to propose correct import extensions
for TypeScript projects that use ES Modules. TypeScript requires you to specify imports to
the actual files used in runtime: `.js` or `.mjs` (see more here: https://github.com/microsoft/TypeScript/issues/49083#issuecomment-1435399267).
:::

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
