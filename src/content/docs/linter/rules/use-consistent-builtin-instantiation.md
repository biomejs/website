---
title: useConsistentBuiltinInstantiation (since v1.7.2)
---

**Diagnostic Category: `lint/nursery/useConsistentBuiltinInstantiation`**

:::note
- This rule has an **unsafe** fix.
- This rule is applied to **JavaScript and super languages** files.
:::

:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Sources: 
- Same as: <a href="https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/new-for-builtins.md" target="_blank"><code>unicorn/new-for-builtins</code></a>
- Same as: <a href="https://eslint.org/docs/latest/rules/no-new-wrappers" target="_blank"><code>no-new-wrappers</code></a>

Enforce the use of `new` for all builtins, except `String`, `Number`, `Boolean`, `Symbol` and `BigInt`.

`new Builtin()` and `Builtin()` work the same, but new should be preferred for consistency with other constructors.
Enforces the use of new for following builtins:

- AggregateError
- Array
- ArrayBuffer
- BigInt64Array
- BigUint64Array
- DataView
- Date
- Error
- EvalError
- FinalizationRegistry
- Float32Array
- Float64Array
- Function
- Int16Array
- Int32Array
- Int8Array
- Map
- Object
- Promise
- Proxy
- RangeError
- ReferenceError
- RegExp
- Set
- SharedArrayBuffer
- SyntaxError
- TypeError
- URIError
- Uint16Array
- Uint32Array
- Uint8Array
- Uint8ClampedArray
- WeakMap
- WeakRef
- WeakSet

Disallows the use of new for following builtins:

- BigInt
- Boolean
- Number
- String
- Symbol

>These should not use `new` as that would create object wrappers for the primitive values, which is not what you want.
However, without `new` they can be useful for coercing a value to that type.


## Examples

### Invalid

```js
const text = new String(10);
```

<pre class="language-text"><code class="language-text">code-block.js:1:14 <a href="https://biomejs.dev/linter/rules/use-consistent-new-builtin">lint/nursery/useConsistentBuiltinInstantiation</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Use </span><span style="color: Orange;"><strong>String()</strong></span><span style="color: Orange;"> instead of </span><span style="color: Orange;"><strong>new String()</strong></span><span style="color: Orange;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const text = new String(10);
   <strong>   │ </strong>             <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove </span><span style="color: lightgreen;"><strong>new</strong></span><span style="color: lightgreen;"> keyword.</span>
  
<strong>  </strong><strong>  1 │ </strong>const<span style="opacity: 0.8;">·</span>text<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span><span style="color: Tomato;">n</span><span style="color: Tomato;">e</span><span style="color: Tomato;">w</span><span style="opacity: 0.8;"><span style="color: Tomato;">·</span></span>String(10);
<strong>  </strong><strong>    │ </strong>             <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span>           
</code></pre>

```js
const now = Date();
```

<pre class="language-text"><code class="language-text">code-block.js:1:13 <a href="https://biomejs.dev/linter/rules/use-consistent-new-builtin">lint/nursery/useConsistentBuiltinInstantiation</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Use </span><span style="color: Orange;"><strong>new Date()</strong></span><span style="color: Orange;"> instead of </span><span style="color: Orange;"><strong>Date()</strong></span><span style="color: Orange;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const now = Date();
   <strong>   │ </strong>            <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add </span><span style="color: lightgreen;"><strong>new</strong></span><span style="color: lightgreen;"> keyword.</span>
  
<strong>  </strong><strong>  1 │ </strong>const<span style="opacity: 0.8;">·</span>now<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">w</span><span style="opacity: 0.8;"><span style="color: MediumSeaGreen;">·</span></span>Date();
<strong>  </strong><strong>    │ </strong>            <span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span>       
</code></pre>

```js
const map = Map([
  ['foo', 'bar']
]);
```

<pre class="language-text"><code class="language-text">code-block.js:1:13 <a href="https://biomejs.dev/linter/rules/use-consistent-new-builtin">lint/nursery/useConsistentBuiltinInstantiation</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Use </span><span style="color: Orange;"><strong>new Map()</strong></span><span style="color: Orange;"> instead of </span><span style="color: Orange;"><strong>Map()</strong></span><span style="color: Orange;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const map = Map([
   <strong>   │ </strong>            <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>  ['foo', 'bar']
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>]);
   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>4 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Add </span><span style="color: lightgreen;"><strong>new</strong></span><span style="color: lightgreen;"> keyword.</span>
  
<strong>  </strong><strong>  1 │ </strong>const<span style="opacity: 0.8;">·</span>map<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">w</span><span style="opacity: 0.8;"><span style="color: MediumSeaGreen;">·</span></span>Map([
<strong>  </strong><strong>    │ </strong>            <span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span><span style="color: MediumSeaGreen;">+</span>     
</code></pre>

### Valid

```js
const text = String(10);
```

```js
const now = new Date();
```

```js
const map = new Map([
 ['foo', 'bar']
]);
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
