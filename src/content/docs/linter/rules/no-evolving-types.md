---
title: noEvolvingTypes (since v1.6.3)
---

**Diagnostic Category: `lint/nursery/noEvolvingTypes`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Disallow variables from evolving into `any` type through reassignments.

In TypeScript, variables without explicit type annotations can evolve their types based on subsequent assignments.

When  TypeScript's [noImplicitAny](https://www.typescriptlang.org/tsconfig/#noImplicitAny) is disabled,
variables without explicit type annotations have implicitly the type `any`.
Just like the `any` type, evolved `any` types disable many type-checking rules and should be avoided to maintain strong type safety.
This rule prevents such cases by ensuring variables do not evolve into `any` type, encouraging explicit type annotations and controlled type evolutions.

If you enabled TypeScript's [noImplicitAny](https://www.typescriptlang.org/tsconfig/#noImplicitAny) and want to benefit of evolving types,
then we recommend to disable this rule.

## Examples

### Invalid

```ts
let a;
```

<pre class="language-text"><code class="language-text">code-block.ts:1:5 <a href="https://biomejs.dev/linter/rules/no-evolving-types">lint/nursery/noEvolvingTypes</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">The type of this variable may evolve implicitly to any type, including the </span><span style="color: Orange;"><strong>any</strong></span><span style="color: Orange;"> type.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let a;
   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Add an explicit type or initialization to avoid implicit type evolution.</span>
  
</code></pre>

```ts
const b = [];
```

<pre class="language-text"><code class="language-text">code-block.ts:1:7 <a href="https://biomejs.dev/linter/rules/no-evolving-types">lint/nursery/noEvolvingTypes</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">The type of this variable may evolve implicitly to any type, including the </span><span style="color: Orange;"><strong>any</strong></span><span style="color: Orange;"> type.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const b = [];
   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Add an explicit type or initialization to avoid implicit type evolution.</span>
  
</code></pre>

```ts
let c = null;
```

<pre class="language-text"><code class="language-text">code-block.ts:1:5 <a href="https://biomejs.dev/linter/rules/no-evolving-types">lint/nursery/noEvolvingTypes</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">The type of this variable may evolve implicitly to any type, including the </span><span style="color: Orange;"><strong>any</strong></span><span style="color: Orange;"> type.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let c = null;
   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Add an explicit type or initialization to avoid implicit type evolution.</span>
  
</code></pre>

### Valid

```ts
let a: number;
let b = 1;
var c : string;
var d = "abn";
const e: never[] = [];
const f = [null];
const g = ['1'];
const h = [1];
let workspace: Workspace | null = null;
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
