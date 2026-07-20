---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.
editUrl: false

title: noUnnecessaryConditions
description: Learn more about noUnnecessaryConditions
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
:::note
This rule belongs to the types domain. This means that its activation will activate the Biome Scanner to scan the files of your project, and enable the type inference engine. Read more about it in the [documentation page](/linter/domains#types)
:::
## Summary
- Rule available since: `v2.1.4`
- Diagnostic Category: [`lint/suspicious/noUnnecessaryConditions`](/reference/diagnostics#diagnostic-category)
- This rule isn't recommended, so you need to enable it.
- This rule doesn't have a fix.
- The default severity of this rule is [**warning**](/reference/diagnostics#warning).
- This rule belongs to the following domains:
  - [`types`](/linter/domains#types)
- Sources: 
  - Inspired from [`@typescript-eslint/no-unnecessary-condition`](https://typescript-eslint.io/rules/no-unnecessary-condition)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"suspicious": {
				"noUnnecessaryConditions": "error"
			}
		}
	}
}

```
## Description
Disallow conditions that always evaluate to the same value.

Using type information, this rule reports conditions whose result is
statically known. It covers `if`/`while`/`for`/ternary tests, the `??`
and `||`/`&&` operators, optional chaining (`?.`), comparisons against
`null`/`undefined`, and `case` clauses that can never match the value
passed to `switch`.

## Examples

### Invalid

A non-nullable value never needs an `if` guard:

```ts
function head<T>(items: T[]) {
    if (items) {
        return items[0];
    }
}
```

<pre class="language-text"><code class="language-text">code-block.ts:2:9 <a href="https://biomejs.dev/linter/rules/no-unnecessary-conditions">lint/suspicious/noUnnecessaryConditions</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This condition is always truthy.</span><br />  <br />    <strong>1 │ </strong>function head&lt;T&gt;(items: T[]) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    if (items) &#123;<br />   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>        return items[0];<br />    <strong>4 │ </strong>    &#125;<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The value's type can never be falsy, so this check is redundant.</span><br />  <br /></code></pre>

A literal-union type can never be empty, so the truthiness check is
redundant:

```ts
function foo(arg: 'bar' | 'baz') {
    if (arg) {}
}
```

<pre class="language-text"><code class="language-text">code-block.ts:2:9 <a href="https://biomejs.dev/linter/rules/no-unnecessary-conditions">lint/suspicious/noUnnecessaryConditions</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This condition is always truthy.</span><br />  <br />    <strong>1 │ </strong>function foo(arg: 'bar' | 'baz') &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    if (arg) &#123;&#125;<br />   <strong>   │ </strong>        <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The value's type can never be falsy, so this check is redundant.</span><br />  <br /></code></pre>

`?.` and `??` on operands that are guaranteed to be non-nullish:

```ts
function bar(arg: string) {
    return arg?.length;
}
```

<pre class="language-text"><code class="language-text">code-block.ts:2:12 <a href="https://biomejs.dev/linter/rules/no-unnecessary-conditions">lint/suspicious/noUnnecessaryConditions</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Unnecessary optional chaining.</span><br />  <br />    <strong>1 │ </strong>function bar(arg: string) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    return arg?.length;<br />   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Replace </span><span style="color: lightgreen;"><strong>?.</strong></span><span style="color: lightgreen;"> with </span><span style="color: lightgreen;"><strong>.</strong></span><span style="color: lightgreen;">.</span><br />  <br />    <strong>1 │ </strong>function bar(arg: string) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    return arg?.length;<br />   <strong>   │ </strong>              <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The receiver is guaranteed to be non-nullish.</span><br />  <br /></code></pre>

```ts
function withDefault(name: string) {
    return name ?? "anonymous";
}
```

<pre class="language-text"><code class="language-text">code-block.ts:2:12 <a href="https://biomejs.dev/linter/rules/no-unnecessary-conditions">lint/suspicious/noUnnecessaryConditions</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Unnecessary nullish coalescing.</span><br />  <br />    <strong>1 │ </strong>function withDefault(name: string) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    return name ?? &quot;anonymous&quot;;<br />   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Drop </span><span style="color: lightgreen;"><strong>??</strong></span><span style="color: lightgreen;"> and the fallback expression.</span><br />  <br />    <strong>1 │ </strong>function withDefault(name: string) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    return name ?? &quot;anonymous&quot;;<br />   <strong>   │ </strong>                <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The left-hand side is guaranteed to be non-nullish, so the fallback is unreachable.</span><br />  <br /></code></pre>

`||` and `&&` on always-truthy operands:

```ts
interface Config { items: string[] }
function f(c: Config) {
    return c.items || [];
}
```

<pre class="language-text"><code class="language-text">code-block.ts:3:12 <a href="https://biomejs.dev/linter/rules/no-unnecessary-conditions">lint/suspicious/noUnnecessaryConditions</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This condition is always truthy.</span><br />  <br />    <strong>1 │ </strong>interface Config &#123; items: string[] &#125;<br />    <strong>2 │ </strong>function f(c: Config) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>    return c.items || [];<br />   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>&#125;<br />    <strong>5 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The value's type can never be falsy, so this check is redundant.</span><br />  <br /></code></pre>

`!expr` on a value that is always truthy:

```ts
const items = [];
if (!items) {}
```

<pre class="language-text"><code class="language-text">code-block.ts:2:5 <a href="https://biomejs.dev/linter/rules/no-unnecessary-conditions">lint/suspicious/noUnnecessaryConditions</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This condition is always falsy.</span><br />  <br />    <strong>1 │ </strong>const items = [];<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>if (!items) &#123;&#125;<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The value's type can never be truthy, so this check is redundant.</span><br />  <br /></code></pre>

Comparing a non-nullable value against `null` or `undefined`:

```ts
function f(x: string) {
    return x === null;
}
```

<pre class="language-text"><code class="language-text">code-block.ts:2:12 <a href="https://biomejs.dev/linter/rules/no-unnecessary-conditions">lint/suspicious/noUnnecessaryConditions</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This comparison always has the same result.</span><br />  <br />    <strong>1 │ </strong>function f(x: string) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    return x === null;<br />   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The operands' types make the outcome statically known.</span><br />  <br /></code></pre>

A `case` whose value can never equal the value passed to `switch`:

```ts
function f(v: 'a' | 'b') {
    switch (v) {
        case 'c': return 1;
    }
}
```

<pre class="language-text"><code class="language-text">code-block.ts:3:14 <a href="https://biomejs.dev/linter/rules/no-unnecessary-conditions">lint/suspicious/noUnnecessaryConditions</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This </span><span style="color: Orange;"><strong>case</strong></span><span style="color: Orange;"> is unreachable.</span><br />  <br />    <strong>1 │ </strong>function f(v: 'a' | 'b') &#123;<br />    <strong>2 │ </strong>    switch (v) &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>        case 'c': return 1;<br />   <strong>   │ </strong>             <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>    &#125;<br />    <strong>5 │ </strong>&#125;<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The value passed to </span><span style="color: lightgreen;"><strong>switch</strong></span><span style="color: lightgreen;"> can never equal this value.</span><br />  <br /></code></pre>

### Valid

When the type allows nullish or empty values, the check is meaningful.
The rule also does not report bindings that are reassigned to values of
different truthiness, since their narrowing cannot be inferred reliably.

```ts
function head<T>(items: T[] | null) {
    if (items) {
        return items[0];
    }
}

function bar(arg: string | undefined) {
    return arg?.length;
}

function f(v: 'a' | 'b' | 'c') {
    switch (v) {
        case 'a': break;
        case 'b': break;
        case 'c': break;
    }
}

let greeting = false;
function update() { greeting = "Hello"; }
if (greeting) {}
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code (Edit this Page)](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/suspicious/no_unnecessary_conditions.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/suspicious/noUnnecessaryConditions)

</TabItem>
</Tabs>

