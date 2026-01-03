---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noBannedTypes
description: Learn more about noBannedTypes
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="TypeScript and TSX" icon="seti:typescript">
## Summary
- Rule available since: `v1.0.0`
- Diagnostic Category: [`lint/complexity/noBannedTypes`](/reference/diagnostics#diagnostic-category)
- This rule is **recommended**, meaning it is enabled by default.
- This rule has a [**safe**](/linter/#safe-fixes) fix.
- The default severity of this rule is [**warning**](/reference/diagnostics#warning).
- Sources: 
  - Same as [`@typescript-eslint/ban-types`](https://typescript-eslint.io/rules/ban-types)
  - Inspired from [`@typescript-eslint/no-empty-object-type`](https://typescript-eslint.io/rules/no-empty-object-type)
  - Inspired from [`@typescript-eslint/no-wrapper-object-types`](https://typescript-eslint.io/rules/no-wrapper-object-types)
  - Inspired from [`@typescript-eslint/no-unsafe-function-type`](https://typescript-eslint.io/rules/no-unsafe-function-type)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"complexity": {
				"noBannedTypes": "error"
			}
		}
	}
}

```
## Description
Disallow primitive type aliases and misleading types.

This rule aims to prevent usage of potentially "misleading" types and type aliases
which may behave unexpectedly.

### Disallow "boxed object" types like `Boolean` and `Number`

JavaScript's 8 data types are described in TypeScript by the lowercase types
`undefined`, `null`, `boolean`, `number`, `string`, `bigint`, `symbol`, and `object`.

The latter 6 also have uppercase variants, which instead represent _interfaces_ with the shared properties of their primitive counterparts.
Due to the nature of structural typing, these uppercase types accept both primitive values and non-primitive "boxed object"s
like `new Boolean(true)`, despite the two behaving differently in many circumstances like equality and truthiness.

It is thus considered best practice to avoid these "boxed types" in favor of their lowercase
primitive counterparts.

### Disallow the unsafe `Function` type

TypeScript's built-in `Function` type is capable of accepting callbacks of any shape or form,
behaving equivalent to `(...rest: any[]) => any` (which uses the unsafe `any` type) when called directly. <br />
It also accepts classes or plain objects that happen to possess all properties of the `Function` class,
which is likewise a potential source of confusion.

As such, it is almost always preferable to explicitly specify function parameters and return types where possible. <br />
When a generic "catch-all" callback type is required, one of the following can be used instead:

- `() => void`: A function that accepts no parameters and whose return value is ignored
- `(...args: never) => unknown`: A "top type" for functions that can be _assigned_ any function type,
but can't be called directly

### Disallow the misleading empty object type `{}`

`{}`, also known as the "empty object" type, _doesn't_ actually represent an empty object (despite what many new to TypeScript may assume). <br />
Due to TypeScript's type system being _structural_ instead of nominal, it actually accepts _any non-nullish value_,
The following example is thus perfectly valid TypeScript:

```ts
const n: {} = 0;
```

Often, developers writing `{}` actually mean one of the following:

- `object`: Represents any object value
- `unknown`: Represents any value at all, including `null` and `undefined`
- `{ [k: keyof any]: never }` or `Record<keyof any, never>`: Represent object types whose properties are all of type `never` (and cannot be used)
- `{ [myUniqueInternalSymbol]?: never }`: Represents an object type whose only "property" is an unexported `unique symbol`, thereby forcing external consumers to omit it[^2]. <br />
This can be used as a type guard for use in `extends` clauses or a type annotation for use in [excess property checks](https://www.typescriptlang.org/docs/handbook/2/objects.html#excess-property-checks),
both with their own respective use cases and pitfalls.

To avoid confusion, this rule forbids the use of the type `{}`, except in two situations:

1. In type constraints to restrict a generic type to non-nullable types:

```ts
function f<T extends {}>(x: T) {
    assert(x != null);
}
```

2. In a type intersection to narrow a type to its non-nullable equivalent type:

```ts
type NonNullableMyType = MyType & {};
```

In this last case, you can also use the `NonNullable` utility type to the same effect:

```ts
// equivalent to `{}`
type AnythingNotNullish = NonNullable<unknown>;
```

## Examples

### Invalid

```ts
let foo: String = "bar";
```

<pre class="language-text"><code class="language-text">code-block.ts:1:10 <a href="https://biomejs.dev/linter/rules/no-banned-types">lint/complexity/noBannedTypes</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Don't use '</span><span style="color: Orange;"><strong>String</strong></span><span style="color: Orange;">' as a type.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let foo: String = &quot;bar&quot;;<br />   <strong>   │ </strong>         <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Prefer using lowercase primitive types instead of uppercase &quot;boxed object&quot; types.<br /></span>    <span style="color: lightgreen;">'</span><span style="color: lightgreen;"><strong>String</strong></span><span style="color: lightgreen;">' accepts </span><span style="color: lightgreen;"><strong>anything</strong></span><span style="color: lightgreen;"> that implements the corresponding interface - both primitives and &quot;primitive-like&quot; objects.<br /></span>    <span style="color: lightgreen;">It is considered best practice to use '</span><span style="color: lightgreen;"><strong>string</strong></span><span style="color: lightgreen;">' instead in nearly all circumstances.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If that's really what you want, use an inline disable comment.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Use 'string' instead.</span><br />  <br />    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">l</span><span style="color: Tomato;">e</span><span style="color: Tomato;">t</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">f</span><span style="color: Tomato;">o</span><span style="color: Tomato;">o</span><span style="color: Tomato;">:</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><strong>S</strong></span><span style="color: Tomato;"><strong>t</strong></span><span style="color: Tomato;"><strong>r</strong></span><span style="color: Tomato;"><strong>i</strong></span><span style="color: Tomato;"><strong>n</strong></span><span style="color: Tomato;"><strong>g</strong></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">=</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">b</span><span style="color: Tomato;">a</span><span style="color: Tomato;">r</span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">;</span><br />      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">:</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><strong>s</strong></span><span style="color: MediumSeaGreen;"><strong>t</strong></span><span style="color: MediumSeaGreen;"><strong>r</strong></span><span style="color: MediumSeaGreen;"><strong>i</strong></span><span style="color: MediumSeaGreen;"><strong>n</strong></span><span style="color: MediumSeaGreen;"><strong>g</strong></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">=</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">b</span><span style="color: MediumSeaGreen;">a</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">;</span><br />    <strong>2</strong> <strong>2</strong><strong> │ </strong>  <br />  <br /></code></pre>

```ts
const bool = true as Boolean;
```

<pre class="language-text"><code class="language-text">code-block.ts:1:22 <a href="https://biomejs.dev/linter/rules/no-banned-types">lint/complexity/noBannedTypes</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Don't use '</span><span style="color: Orange;"><strong>Boolean</strong></span><span style="color: Orange;">' as a type.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const bool = true as Boolean;<br />   <strong>   │ </strong>                     <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Prefer using lowercase primitive types instead of uppercase &quot;boxed object&quot; types.<br /></span>    <span style="color: lightgreen;">'</span><span style="color: lightgreen;"><strong>Boolean</strong></span><span style="color: lightgreen;">' accepts </span><span style="color: lightgreen;"><strong>anything</strong></span><span style="color: lightgreen;"> that implements the corresponding interface - both primitives and &quot;primitive-like&quot; objects.<br /></span>    <span style="color: lightgreen;">It is considered best practice to use '</span><span style="color: lightgreen;"><strong>boolean</strong></span><span style="color: lightgreen;">' instead in nearly all circumstances.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If that's really what you want, use an inline disable comment.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Use 'boolean' instead.</span><br />  <br />    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">c</span><span style="color: Tomato;">o</span><span style="color: Tomato;">n</span><span style="color: Tomato;">s</span><span style="color: Tomato;">t</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">b</span><span style="color: Tomato;">o</span><span style="color: Tomato;">o</span><span style="color: Tomato;">l</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">=</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">t</span><span style="color: Tomato;">r</span><span style="color: Tomato;">u</span><span style="color: Tomato;">e</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">a</span><span style="color: Tomato;">s</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><strong>B</strong></span><span style="color: Tomato;"><strong>o</strong></span><span style="color: Tomato;"><strong>o</strong></span><span style="color: Tomato;"><strong>l</strong></span><span style="color: Tomato;"><strong>e</strong></span><span style="color: Tomato;"><strong>a</strong></span><span style="color: Tomato;"><strong>n</strong></span><span style="color: Tomato;">;</span><br />      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">c</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">s</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">b</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">=</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">u</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">a</span><span style="color: MediumSeaGreen;">s</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><strong>b</strong></span><span style="color: MediumSeaGreen;"><strong>o</strong></span><span style="color: MediumSeaGreen;"><strong>o</strong></span><span style="color: MediumSeaGreen;"><strong>l</strong></span><span style="color: MediumSeaGreen;"><strong>e</strong></span><span style="color: MediumSeaGreen;"><strong>a</strong></span><span style="color: MediumSeaGreen;"><strong>n</strong></span><span style="color: MediumSeaGreen;">;</span><br />    <strong>2</strong> <strong>2</strong><strong> │ </strong>  <br />  <br /></code></pre>

```ts
let invalidTuple: [string, Number] = ["foo", 12];
```

<pre class="language-text"><code class="language-text">code-block.ts:1:28 <a href="https://biomejs.dev/linter/rules/no-banned-types">lint/complexity/noBannedTypes</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Don't use '</span><span style="color: Orange;"><strong>Number</strong></span><span style="color: Orange;">' as a type.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let invalidTuple: [string, Number] = [&quot;foo&quot;, 12];<br />   <strong>   │ </strong>                           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Prefer using lowercase primitive types instead of uppercase &quot;boxed object&quot; types.<br /></span>    <span style="color: lightgreen;">'</span><span style="color: lightgreen;"><strong>Number</strong></span><span style="color: lightgreen;">' accepts </span><span style="color: lightgreen;"><strong>anything</strong></span><span style="color: lightgreen;"> that implements the corresponding interface - both primitives and &quot;primitive-like&quot; objects.<br /></span>    <span style="color: lightgreen;">It is considered best practice to use '</span><span style="color: lightgreen;"><strong>number</strong></span><span style="color: lightgreen;">' instead in nearly all circumstances.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If that's really what you want, use an inline disable comment.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Use 'number' instead.</span><br />  <br />    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">l</span><span style="color: Tomato;">e</span><span style="color: Tomato;">t</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">i</span><span style="color: Tomato;">n</span><span style="color: Tomato;">v</span><span style="color: Tomato;">a</span><span style="color: Tomato;">l</span><span style="color: Tomato;">i</span><span style="color: Tomato;">d</span><span style="color: Tomato;">T</span><span style="color: Tomato;">u</span><span style="color: Tomato;">p</span><span style="color: Tomato;">l</span><span style="color: Tomato;">e</span><span style="color: Tomato;">:</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">[</span><span style="color: Tomato;">s</span><span style="color: Tomato;">t</span><span style="color: Tomato;">r</span><span style="color: Tomato;">i</span><span style="color: Tomato;">n</span><span style="color: Tomato;">g</span><span style="color: Tomato;">,</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><strong>N</strong></span><span style="color: Tomato;"><strong>u</strong></span><span style="color: Tomato;"><strong>m</strong></span><span style="color: Tomato;"><strong>b</strong></span><span style="color: Tomato;"><strong>e</strong></span><span style="color: Tomato;"><strong>r</strong></span><span style="color: Tomato;">]</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">=</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">[</span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">f</span><span style="color: Tomato;">o</span><span style="color: Tomato;">o</span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">,</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">1</span><span style="color: Tomato;">2</span><span style="color: Tomato;">]</span><span style="color: Tomato;">;</span><br />      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">v</span><span style="color: MediumSeaGreen;">a</span><span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">d</span><span style="color: MediumSeaGreen;">T</span><span style="color: MediumSeaGreen;">u</span><span style="color: MediumSeaGreen;">p</span><span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">:</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">[</span><span style="color: MediumSeaGreen;">s</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">g</span><span style="color: MediumSeaGreen;">,</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><strong>n</strong></span><span style="color: MediumSeaGreen;"><strong>u</strong></span><span style="color: MediumSeaGreen;"><strong>m</strong></span><span style="color: MediumSeaGreen;"><strong>b</strong></span><span style="color: MediumSeaGreen;"><strong>e</strong></span><span style="color: MediumSeaGreen;"><strong>r</strong></span><span style="color: MediumSeaGreen;">]</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">=</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">[</span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">,</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">1</span><span style="color: MediumSeaGreen;">2</span><span style="color: MediumSeaGreen;">]</span><span style="color: MediumSeaGreen;">;</span><br />    <strong>2</strong> <strong>2</strong><strong> │ </strong>  <br />  <br /></code></pre>

```ts
function badFunction(cb: Function) {
  cb(12);
}
```

<pre class="language-text"><code class="language-text">code-block.ts:1:26 <a href="https://biomejs.dev/linter/rules/no-banned-types">lint/complexity/noBannedTypes</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Don't use '</span><span style="color: Orange;"><strong>Function</strong></span><span style="color: Orange;">' as a type.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function badFunction(cb: Function) &#123;<br />   <strong>   │ </strong>                         <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong>  cb(12);<br />    <strong>3 │ </strong>&#125;<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">The '</span><span style="color: lightgreen;"><strong>Function</strong></span><span style="color: lightgreen;">' type is unsafe and accepts any arbitrary function or &quot;function-like&quot; value.<br /></span>    <span style="color: lightgreen;">Explicitly defining the function's shape helps prevent mismatching argument types and return values.<br /></span>    <span style="color: lightgreen;">If a generic &quot;catch-all&quot; callback type is required, consider using a &quot;top type&quot; like '</span><span style="color: lightgreen;"><strong>(...args: never) =&gt; unknown</strong></span><span style="color: lightgreen;">' instead.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If that's really what you want, use an inline disable comment.</span><br />  <br /></code></pre>

```ts
const notEmpty: {} = {prop: 12};
```

<pre class="language-text"><code class="language-text">code-block.ts:1:17 <a href="https://biomejs.dev/linter/rules/no-banned-types">lint/complexity/noBannedTypes</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Don't use '</span><span style="color: Orange;"><strong>&#123;&#125;</strong></span><span style="color: Orange;">' as a type.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const notEmpty: &#123;&#125; = &#123;prop: 12&#125;;<br />   <strong>   │ </strong>                <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">'</span><span style="color: lightgreen;"><strong>&#123;&#125;</strong></span><span style="color: lightgreen;">' accepts </span><span style="color: lightgreen;"><strong>any</strong></span><span style="color: lightgreen;"> non-nullish value, including non-object primitives like '</span><span style="color: lightgreen;"><strong>123</strong></span><span style="color: lightgreen;">' and '</span><span style="color: lightgreen;"><strong>true</strong></span><span style="color: lightgreen;">'.<br /></span>    <span style="color: lightgreen;">- If you want a type meaning &quot;any arbitrary object&quot;, use '</span><span style="color: lightgreen;"><strong>object</strong></span><span style="color: lightgreen;">' instead.<br /></span>    <span style="color: lightgreen;">- If you want a type meaning &quot;any value&quot;, use '</span><span style="color: lightgreen;"><strong>unknown</strong></span><span style="color: lightgreen;">' instead.<br /></span>    <span style="color: lightgreen;">- If you want a type meaning &quot;an object whose properties cannot be used&quot;, use '</span><span style="color: lightgreen;"><strong>&#123; [k: keyof any]: never &#125;</strong></span><span style="color: lightgreen;">' or '</span><span style="color: lightgreen;"><strong>Record&lt;keyof any, never&gt;</strong></span><span style="color: lightgreen;">' instead.<br /></span>    <span style="color: lightgreen;">- If you want a type meaning &quot;an object that cannot contain any properties whatsoever&quot;, use '</span><span style="color: lightgreen;"><strong>&#123; [uniqueSymbol]?: never &#125;</strong></span><span style="color: lightgreen;">' with an unexported </span><span style="color: lightgreen;"><strong>unique symbol</strong></span><span style="color: lightgreen;"> in the same file.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If that's really what you want, use an inline disable comment.</span><br />  <br /></code></pre>

```ts
const alsoNotAnObj: Object = "foo";
```

<pre class="language-text"><code class="language-text">code-block.ts:1:21 <a href="https://biomejs.dev/linter/rules/no-banned-types">lint/complexity/noBannedTypes</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Don't use '</span><span style="color: Orange;"><strong>Object</strong></span><span style="color: Orange;">' as a type.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const alsoNotAnObj: Object = &quot;foo&quot;;<br />   <strong>   │ </strong>                    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">'</span><span style="color: lightgreen;"><strong>Object</strong></span><span style="color: lightgreen;">' accepts </span><span style="color: lightgreen;"><strong>any</strong></span><span style="color: lightgreen;"> non-nullish value, including non-object primitives like '</span><span style="color: lightgreen;"><strong>123</strong></span><span style="color: lightgreen;">' and '</span><span style="color: lightgreen;"><strong>true</strong></span><span style="color: lightgreen;">'.<br /></span>    <span style="color: lightgreen;">- If you want a type meaning &quot;any arbitrary object&quot;, use '</span><span style="color: lightgreen;"><strong>object</strong></span><span style="color: lightgreen;">' instead.<br /></span>    <span style="color: lightgreen;">- If you want a type meaning &quot;any value&quot;, use '</span><span style="color: lightgreen;"><strong>unknown</strong></span><span style="color: lightgreen;">' instead.<br /></span>    <span style="color: lightgreen;">- If you want a type meaning &quot;an object whose properties cannot be used&quot;, use '</span><span style="color: lightgreen;"><strong>&#123; [k: keyof any]: never &#125;</strong></span><span style="color: lightgreen;">' or '</span><span style="color: lightgreen;"><strong>Record&lt;keyof any, never&gt;</strong></span><span style="color: lightgreen;">' instead.<br /></span>    <span style="color: lightgreen;">- If you want a type meaning &quot;an object that cannot contain any properties whatsoever&quot;, use '</span><span style="color: lightgreen;"><strong>&#123; [uniqueSymbol]?: never &#125;</strong></span><span style="color: lightgreen;">' with an unexported </span><span style="color: lightgreen;"><strong>unique symbol</strong></span><span style="color: lightgreen;"> in the same file.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If that's really what you want, use an inline disable comment.</span><br />  <br /></code></pre>

### Valid

```ts
const foo: string = "bar";
```

```ts
let tuple: [boolean, string] = [false, "foo"];
```

```ts
function betterFunction(cb: (n: number) => string) {
  return cb(12);
}
```

```ts
type wrapFn<T extends (...args: never) => unknown> = { func: T }
```

```ts
const goodObj: object = {foo: 12};
```

```ts
type emptyObj = Record<string, never>;
```

Exceptions for `{}`:

```ts
declare function foo<T extends {}>(x: T): void;
```

```ts
type notNull<T> = T & {};
```

[^1]: This is the exact same mechanism that allows passing `{ foo: number, bar: string }`
to a function expecting `{ bar: string }`.
Specifying `{}` doesn't restrict compatible types to ones with _exactly_ 0 properties;
it simply requires they have _at least_ 0 properties.
[^2]: In this case, you'd write `declare const myUniqueInternalSymbol: unique symbol` somewhere in the same file.

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/complexity/no_banned_types.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/complexity/noBannedTypes)

</TabItem>
</Tabs>

