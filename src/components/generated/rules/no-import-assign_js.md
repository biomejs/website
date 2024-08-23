**Since**: `v1.0.0`
:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
:::

Sources: 
- Same as: <a href="https://eslint.org/docs/latest/rules/no-import-assign" target="_blank"><code>no-import-assign</code></a>

Disallow assigning to imported bindings

## Examples

### Invalid

```js
import x from "y";
x = 1;
```

<pre class="language-text"><code class="language-text">code-block.js:2:1 <a href="https://biomejs.dev/linter/rules/no-import-assign">lint/suspicious/noImportAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The imported variable </span><span style="color: Tomato;"><strong>x</strong></span><span style="color: Tomato;"> is read-only</span><br />  <br />    <strong>1 │ </strong>import x from &quot;y&quot;;<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>x = 1;<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The variable is imported here</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import x from &quot;y&quot;;<br />   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>x = 1;<br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead of reassigning an import.</span><br />  <br /></code></pre>

```js
import y from "y";
[y] = 1;
```

<pre class="language-text"><code class="language-text">code-block.js:2:2 <a href="https://biomejs.dev/linter/rules/no-import-assign">lint/suspicious/noImportAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The imported variable </span><span style="color: Tomato;"><strong>y</strong></span><span style="color: Tomato;"> is read-only</span><br />  <br />    <strong>1 │ </strong>import y from &quot;y&quot;;<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>[y] = 1;<br />   <strong>   │ </strong> <strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The variable is imported here</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import y from &quot;y&quot;;<br />   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>[y] = 1;<br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead of reassigning an import.</span><br />  <br /></code></pre>

```js
import z from "y";
({ z } = 1);
```

<pre class="language-text"><code class="language-text">code-block.js:2:4 <a href="https://biomejs.dev/linter/rules/no-import-assign">lint/suspicious/noImportAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The imported variable </span><span style="color: Tomato;"><strong>z</strong></span><span style="color: Tomato;"> is read-only</span><br />  <br />    <strong>1 │ </strong>import z from &quot;y&quot;;<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>({ z } = 1);<br />   <strong>   │ </strong>   <strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The variable is imported here</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import z from &quot;y&quot;;<br />   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>({ z } = 1);<br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead of reassigning an import.</span><br />  <br /></code></pre>

```js
import a from "y";
[...a] = 1;
```

<pre class="language-text"><code class="language-text">code-block.js:2:5 <a href="https://biomejs.dev/linter/rules/no-import-assign">lint/suspicious/noImportAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The imported variable </span><span style="color: Tomato;"><strong>a</strong></span><span style="color: Tomato;"> is read-only</span><br />  <br />    <strong>1 │ </strong>import a from &quot;y&quot;;<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>[...a] = 1;<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The variable is imported here</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import a from &quot;y&quot;;<br />   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>[...a] = 1;<br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead of reassigning an import.</span><br />  <br /></code></pre>

```js
import b from "y";
({ ...b } = 1);
```

<pre class="language-text"><code class="language-text">code-block.js:2:7 <a href="https://biomejs.dev/linter/rules/no-import-assign">lint/suspicious/noImportAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The imported variable </span><span style="color: Tomato;"><strong>b</strong></span><span style="color: Tomato;"> is read-only</span><br />  <br />    <strong>1 │ </strong>import b from &quot;y&quot;;<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>({ ...b } = 1);<br />   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The variable is imported here</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import b from &quot;y&quot;;<br />   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>({ ...b } = 1);<br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead of reassigning an import.</span><br />  <br /></code></pre>

```js
import c from "y";
for (c in y) {};
```

<pre class="language-text"><code class="language-text">code-block.js:2:6 <a href="https://biomejs.dev/linter/rules/no-import-assign">lint/suspicious/noImportAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The imported variable </span><span style="color: Tomato;"><strong>c</strong></span><span style="color: Tomato;"> is read-only</span><br />  <br />    <strong>1 │ </strong>import c from &quot;y&quot;;<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>for (c in y) {};<br />   <strong>   │ </strong>     <strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The variable is imported here</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import c from &quot;y&quot;;<br />   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>for (c in y) {};<br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead of reassigning an import.</span><br />  <br /></code></pre>

```js
import d from "y";
d += 1;
```

<pre class="language-text"><code class="language-text">code-block.js:2:1 <a href="https://biomejs.dev/linter/rules/no-import-assign">lint/suspicious/noImportAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The imported variable </span><span style="color: Tomato;"><strong>d</strong></span><span style="color: Tomato;"> is read-only</span><br />  <br />    <strong>1 │ </strong>import d from &quot;y&quot;;<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>d += 1;<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The variable is imported here</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import d from &quot;y&quot;;<br />   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>d += 1;<br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead of reassigning an import.</span><br />  <br /></code></pre>

```js
import * as e from "y";
e = 1;
```

<pre class="language-text"><code class="language-text">code-block.js:2:1 <a href="https://biomejs.dev/linter/rules/no-import-assign">lint/suspicious/noImportAssign</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">The imported variable </span><span style="color: Tomato;"><strong>e</strong></span><span style="color: Tomato;"> is read-only</span><br />  <br />    <strong>1 │ </strong>import * as e from &quot;y&quot;;<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>e = 1;<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The variable is imported here</span><br />  <br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import * as e from &quot;y&quot;;<br />   <strong>   │ </strong>            <strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>e = 1;<br />    <strong>3 │ </strong><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Use a local variable instead of reassigning an import.</span><br />  <br /></code></pre>

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
