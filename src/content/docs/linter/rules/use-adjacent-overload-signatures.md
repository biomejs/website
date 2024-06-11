---
title: useAdjacentOverloadSignatures (since v1.8.0)
---

**Diagnostic Category: `lint/nursery/useAdjacentOverloadSignatures`**

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://typescript-eslint.io/rules/adjacent-overload-signatures" target="_blank"><code>@typescript-eslint/adjacent-overload-signatures</code></a>

Disallow the use of overload signatures that are not next to each other.

Overload signatures must be adjacent.
If a key is defined multiple times, only the last definition takes effect. Previous definitions are ignored.
This rule is useful for preventing accidental overloads that are not adjacent.
It is recommended to keep the overload signatures adjacent to make the code easier to read and maintain.

## Examples

### Invalid

```ts
type Foo = {
  foo_type(s: string): void;
  foo_type(n: number): void;
  bar_type(): void;
  foo_type(sn: string | number): void;
};
```

<pre class="language-text"><code class="language-text">code-block.ts:5:3 <a href="https://biomejs.dev/linter/rules/use-adjacent-overload-signatures">lint/nursery/useAdjacentOverloadSignatures</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">All foo_type signatures must be adjacent.</span>
  
    <strong>3 │ </strong>  foo_type(n: number): void;
    <strong>4 │ </strong>  bar_type(): void;
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>5 │ </strong>  foo_type(sn: string | number): void;
   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>6 │ </strong>};
    <strong>7 │ </strong>
  
</code></pre>

```ts
interface Foo {
  foo_interface(s: string): void;
  foo_interface(n: number): void;
  bar_interface(): void;
  foo_interface(sn: string | number): void;
}
```

<pre class="language-text"><code class="language-text">code-block.ts:5:3 <a href="https://biomejs.dev/linter/rules/use-adjacent-overload-signatures">lint/nursery/useAdjacentOverloadSignatures</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">All foo_interface signatures must be adjacent.</span>
  
    <strong>3 │ </strong>  foo_interface(n: number): void;
    <strong>4 │ </strong>  bar_interface(): void;
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>5 │ </strong>  foo_interface(sn: string | number): void;
   <strong>   │ </strong>  <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>6 │ </strong>}
    <strong>7 │ </strong>
  
</code></pre>

```ts
class A {
  fooA(s: string): void;
  fooA(n: number): void;
  barA(): void {};
  fooA(sn: string | number): void {};
}
```

<pre class="language-text"><code class="language-text"></code></pre>

### Valid

```ts
declare namespace Foo {
  export function foo_declare(s: string): void;
  export function foo_declare(n: number): void;
  export function foo_declare(sn: string | number): void;
  export function bar_declare(): void;
}
```

```ts
type Foo = {
  foo_type(s: string): void;
  foo_type(n: number): void;
  foo_type(sn: string | number): void;
  bar_type(): void;
};
```

```ts
interface Foo {
  foo_interface(s: string): void;
  foo_interface(n: number): void;
  foo_interface(sn: string | number): void;
  bar_interface(): void;
}
```

```ts
class A {
  fooA(s: string): void;
  fooA(n: number): void;
  fooA(sn: string | number): void {}
  barA(): void {}
}
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
