---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: useConsistentMethodSignatures
description: Learn more about useConsistentMethodSignatures
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="TypeScript and TSX" icon="seti:typescript">
:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
## Summary
- Rule available since: `v2.3.14`
- Diagnostic Category: [`lint/nursery/useConsistentMethodSignatures`](/reference/diagnostics#diagnostic-category)
- This rule doesn't have a fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- Sources: 
  - Same as [`@typescript-eslint/method-signature-style`](https://typescript-eslint.io/rules/method-signature-style)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"useConsistentMethodSignatures": "error"
			}
		}
	}
}

```
## Description
Enforce consistent use of either method signatures or function properties within interfaces and type aliases.

TypeScript provides 2 different ways to declare methods within interfaces and object types:

```ts
interface Example {
  // method shorthand syntax
  methodFunc(arg: string): void;

  // regular property with function type
  prop: (arg: string) => void;
}

// These forms correspond to the analogous JS object literal patterns:
const obj = {
  methodFunc(arg) {},
  prop: (arg) => {},
} satisfies Example;
```

While mostly a matter of stylistic consistency, the two gain subtle differences in behavior when the
[`strictFunctionTypes`](https://www.typescriptlang.org/tsconfig/#strictFunctionTypes) compiler option is enabled. <br />
More specifically, its stricter contravariant checks will **only** apply to functions written in _property_ syntax —
ones written as methods will remain with the weaker bivariant type checks.

 <details>
 <summary>What's the difference?</summary>
To illustrate the differences between method bivariance and contravariance, consider the following snippet of code:

```ts
interface Emitter {
  methodFunc(arg: Event): void;
  propFunc: (arg: Event) => void;
}

interface SpecialEvent extends Event {
  isBirthday: boolean;
}

interface SpecialEmitter extends Emitter {
  methodFunc(arg: SpecialEvent): void; // OK
  propFunc: (arg: SpecialEvent) => void; // Error under `strictFunctionTypes`
}
```

In the above example, `SpecialEmitter.methodFunc` is compatible with `Emitter.methodFunc` under _bivariant_[^1] checks,
as `SpecialEvent` is assignable to `Event` (i.e. all `SpecialEvent`s are guaranteed to be valid `Event`s). <br />
On the other hand, the strict _contravariant_ checks for function properties produce errors on `propFunc` as the reverse is not guaranteed —
`Event` is not assignable to `SpecialEvent` (i.e. not all `Event`s are guaranteed to be valid `SpecialEvent`s).

The full rationale for this behavior can be found in the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#function-parameter-bivariance).

[^1]: From a purely type-theoretical perspective, bivariance technically refers to a type being _both_ covariant _and_ contravariant at once
(`A` ⊆ `B` implies `T<A>` ≣ `T<B>`). <br />
In practice, this is only true for pathological types like `type T<A> = number`,
and so is often used to refer to a type being either covariant _or_ contravariant (which simply requires `T<A>` and `T<B>` to have some non-zero amount of overlap).

 </details>
To avoid inconsistent type assignability issues and enforce stylistic consistency, this rule attempts to
ensure either method- or property-style declarations are used consistently across a given codebase.

:::info
Without `strictFunctionTypes` enabled, method signatures and function properties become **functionally identical**.
In this case, which option to use simply becomes a matter of personal preference.
:::

## Examples

### Invalid

```ts
interface Example {
  methodFunc(arg: string): number;
}
```

<pre class="language-text"><code class="language-text">code-block.ts:2:3 <a href="https://biomejs.dev/linter/rules/use-consistent-method-signatures">lint/nursery/useConsistentMethodSignatures</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Prefer using </span><span style="color: lightgreen;"><strong>property</strong></span><span style="color: lightgreen;">-style over </span><span style="color: lightgreen;"><strong>method</strong></span><span style="color: lightgreen;">-style method signatures.</span><br />  <br />    <strong>1 │ </strong>interface Example &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  methodFunc(arg: string): number;<br />   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consistently using a single style of method signatures helps improve readability and consistency.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Property-style function declarations also allow for stricter type checking when the </span><span style="color: lightgreen;"><strong>strictFunctionTypes</strong></span><span style="color: lightgreen;"> compiler option is enabled.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If this isn't what you want, consider changing the </span><span style="color: lightgreen;"><strong>style</strong></span><span style="color: lightgreen;"> option in the rule's settings.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule is still being actively worked on, so it may be missing features or have rough edges. Visit </span><span style="color: lightgreen;"><a href="https://github.com/biomejs/biome/issues/8780">https://github.com/biomejs/biome/issues/8780</a></span><span style="color: lightgreen;"> for more information or to report possible bugs.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```ts
type Generic<T, U> = {
  methodFunc(arg: T): U;
}
```

<pre class="language-text"><code class="language-text">code-block.ts:2:3 <a href="https://biomejs.dev/linter/rules/use-consistent-method-signatures">lint/nursery/useConsistentMethodSignatures</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Prefer using </span><span style="color: lightgreen;"><strong>property</strong></span><span style="color: lightgreen;">-style over </span><span style="color: lightgreen;"><strong>method</strong></span><span style="color: lightgreen;">-style method signatures.</span><br />  <br />    <strong>1 │ </strong>type Generic&lt;T, U&gt; = &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  methodFunc(arg: T): U;<br />   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consistently using a single style of method signatures helps improve readability and consistency.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Property-style function declarations also allow for stricter type checking when the </span><span style="color: lightgreen;"><strong>strictFunctionTypes</strong></span><span style="color: lightgreen;"> compiler option is enabled.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If this isn't what you want, consider changing the </span><span style="color: lightgreen;"><strong>style</strong></span><span style="color: lightgreen;"> option in the rule's settings.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule is still being actively worked on, so it may be missing features or have rough edges. Visit </span><span style="color: lightgreen;"><a href="https://github.com/biomejs/biome/issues/8780">https://github.com/biomejs/biome/issues/8780</a></span><span style="color: lightgreen;"> for more information or to report possible bugs.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```ts
type Union =
  | {
    foo(bar: number): number;
  }
  | 4;
```

<pre class="language-text"><code class="language-text">code-block.ts:3:5 <a href="https://biomejs.dev/linter/rules/use-consistent-method-signatures">lint/nursery/useConsistentMethodSignatures</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Prefer using </span><span style="color: lightgreen;"><strong>property</strong></span><span style="color: lightgreen;">-style over </span><span style="color: lightgreen;"><strong>method</strong></span><span style="color: lightgreen;">-style method signatures.</span><br />  <br />    <strong>1 │ </strong>type Union =<br />    <strong>2 │ </strong>  | &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>    foo(bar: number): number;<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>  &#125;<br />    <strong>5 │ </strong>  | 4;<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consistently using a single style of method signatures helps improve readability and consistency.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Property-style function declarations also allow for stricter type checking when the </span><span style="color: lightgreen;"><strong>strictFunctionTypes</strong></span><span style="color: lightgreen;"> compiler option is enabled.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If this isn't what you want, consider changing the </span><span style="color: lightgreen;"><strong>style</strong></span><span style="color: lightgreen;"> option in the rule's settings.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule is still being actively worked on, so it may be missing features or have rough edges. Visit </span><span style="color: lightgreen;"><a href="https://github.com/biomejs/biome/issues/8780">https://github.com/biomejs/biome/issues/8780</a></span><span style="color: lightgreen;"> for more information or to report possible bugs.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```ts
type Intersection =
  {
    qux(quux: number): "quuux";
  } & { foo: string };
```

<pre class="language-text"><code class="language-text">code-block.ts:3:5 <a href="https://biomejs.dev/linter/rules/use-consistent-method-signatures">lint/nursery/useConsistentMethodSignatures</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Prefer using </span><span style="color: lightgreen;"><strong>property</strong></span><span style="color: lightgreen;">-style over </span><span style="color: lightgreen;"><strong>method</strong></span><span style="color: lightgreen;">-style method signatures.</span><br />  <br />    <strong>1 │ </strong>type Intersection =<br />    <strong>2 │ </strong>  &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>    qux(quux: number): &quot;quuux&quot;;<br />   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>  &#125; &amp; &#123; foo: string &#125;;<br />    <strong>5 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consistently using a single style of method signatures helps improve readability and consistency.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Property-style function declarations also allow for stricter type checking when the </span><span style="color: lightgreen;"><strong>strictFunctionTypes</strong></span><span style="color: lightgreen;"> compiler option is enabled.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If this isn't what you want, consider changing the </span><span style="color: lightgreen;"><strong>style</strong></span><span style="color: lightgreen;"> option in the rule's settings.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule is still being actively worked on, so it may be missing features or have rough edges. Visit </span><span style="color: lightgreen;"><a href="https://github.com/biomejs/biome/issues/8780">https://github.com/biomejs/biome/issues/8780</a></span><span style="color: lightgreen;"> for more information or to report possible bugs.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

### Valid

```ts
interface Prop {
  propFunc: (arg: string) => number;
}
```

```ts
type Thing<T> = {
  genericProp: <U>(arg: U) => T;
}
```

```ts
type Callback = () => void;
```

Classes (as well as interfaces lacking function declarations) are always ignored:

```ts
interface Example {
  notAFunc: number;
}
```

```ts
class Foo {
  methodFunc(arg: string): number;
}
```

## Options

### `style`

The desired method signature style to enforce. <br />
Possible values are either `"method"` or `"property"`.

Default: `"property"`[^2]

#### Examples for `"style": "method"`

```json title='biome.json'
{
	"linter": {
		"rules": {
			"nursery": {
				"useConsistentMethodSignatures": {
					"options": {
						"style": "method"
					}
				}
			}
		}
	}
}

```

```ts
interface Blah {
  propFunc: (arg: string) => void;
}
```

<pre class="language-text"><code class="language-text">code-block.ts:2:3 <a href="https://biomejs.dev/linter/rules/use-consistent-method-signatures">lint/nursery/useConsistentMethodSignatures</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Prefer using </span><span style="color: lightgreen;"><strong>method</strong></span><span style="color: lightgreen;">-style over </span><span style="color: lightgreen;"><strong>property</strong></span><span style="color: lightgreen;">-style method signatures.</span><br />  <br />    <strong>1 │ </strong>interface Blah &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  propFunc: (arg: string) =&gt; void;<br />   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consistently using a single style of method signatures helps improve readability and consistency.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If this isn't what you want, consider changing the </span><span style="color: lightgreen;"><strong>style</strong></span><span style="color: lightgreen;"> option in the rule's settings.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule is still being actively worked on, so it may be missing features or have rough edges. Visit </span><span style="color: lightgreen;"><a href="https://github.com/biomejs/biome/issues/8780">https://github.com/biomejs/biome/issues/8780</a></span><span style="color: lightgreen;"> for more information or to report possible bugs.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```ts
type Generic = {
  propFunc: <T, U>(arg: T) => U;
}
```

<pre class="language-text"><code class="language-text">code-block.ts:2:3 <a href="https://biomejs.dev/linter/rules/use-consistent-method-signatures">lint/nursery/useConsistentMethodSignatures</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Prefer using </span><span style="color: lightgreen;"><strong>method</strong></span><span style="color: lightgreen;">-style over </span><span style="color: lightgreen;"><strong>property</strong></span><span style="color: lightgreen;">-style method signatures.</span><br />  <br />    <strong>1 │ </strong>type Generic = &#123;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  propFunc: &lt;T, U&gt;(arg: T) =&gt; U;<br />   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>&#125;<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consistently using a single style of method signatures helps improve readability and consistency.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If this isn't what you want, consider changing the </span><span style="color: lightgreen;"><strong>style</strong></span><span style="color: lightgreen;"> option in the rule's settings.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule is still being actively worked on, so it may be missing features or have rough edges. Visit </span><span style="color: lightgreen;"><a href="https://github.com/biomejs/biome/issues/8780">https://github.com/biomejs/biome/issues/8780</a></span><span style="color: lightgreen;"> for more information or to report possible bugs.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```ts
type OK = {
  flubber(arg: number): number;
}
```

[^2]: Chosen to allow stricter type checks under the aforementioned `strictFunctionTypes`.

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/nursery/use_consistent_method_signatures.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/nursery/useConsistentMethodSignatures)

</TabItem>
</Tabs>

