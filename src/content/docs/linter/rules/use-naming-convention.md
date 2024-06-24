---
title: useNamingConvention (since v1.0.0)
---

**Diagnostic Category: `lint/style/useNamingConvention`**

:::note
- This rule has a **safe** fix.
- This rule is applied to **TypeScript and TSX** files.
:::

Sources: 
- Inspired from: <a href="https://typescript-eslint.io/rules/naming-convention" target="_blank"><code>@typescript-eslint/naming-convention</code></a>

Enforce naming conventions for everything across a codebase.

Enforcing [naming conventions](https://en.wikipedia.org/wiki/Naming_convention_(programming)) helps to keep the codebase consistent,
and reduces overhead when thinking about the name [case](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats) of a variable.

The following section describes the default conventions enforced by the rule.
You can also enforce custom conventions with the [rule options](#options).

## Naming conventions

All names can be prefixed and suffixed by underscores `_` and dollar signs `$`.

### Variable and parameter names

All variables and function parameters are in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case) or [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).
Catch parameters are in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case).

Additionally, global variables declared as `const` or `var` may be in [`CONSTANT_CASE`](https://en.wikipedia.org/wiki/Snake_case).
Global variables are declared at module or script level.
Variables declared in a TypeScript `namespace` are also considered global.

```js
function f(param, _unusedParam) {
    let localValue = 0;
    try {
        /* ... */
    } catch (customError) {
        /* ... */
    }
}

export const A_CONSTANT = 5;

let aVariable = 0;

export namespace ns {
    export const ANOTHER_CONSTANT = "";
}
```

Examples of incorrect names:

```js
let a_value = 0;
```

<pre class="language-text"><code class="language-text">code-block.js:1:5 <a href="https://biomejs.dev/linter/rules/use-naming-convention">lint/style/useNamingConvention</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This </span><span style="color: Orange;"><strong>let</strong></span><span style="color: Orange;"> name should be in </span><span style="color: Orange;"><strong>camelCase or PascalCase</strong></span><span style="color: Orange;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let a_value = 0;
   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Rename this symbol in </span><span style="color: lightgreen;"><strong>camelCase</strong></span><span style="color: lightgreen;">.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">l</span><span style="color: Tomato;">e</span><span style="color: Tomato;">t</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><strong>a</strong></span><span style="color: Tomato;"><strong>_</strong></span><span style="color: Tomato;"><strong>v</strong></span><span style="color: Tomato;"><strong>a</strong></span><span style="color: Tomato;"><strong>l</strong></span><span style="color: Tomato;"><strong>u</strong></span><span style="color: Tomato;"><strong>e</strong></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">=</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">0</span><span style="color: Tomato;">;</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><strong>a</strong></span><span style="color: MediumSeaGreen;"><strong>V</strong></span><span style="color: MediumSeaGreen;"><strong>a</strong></span><span style="color: MediumSeaGreen;"><strong>l</strong></span><span style="color: MediumSeaGreen;"><strong>u</strong></span><span style="color: MediumSeaGreen;"><strong>e</strong></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">=</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">0</span><span style="color: MediumSeaGreen;">;</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

```js
const fooYPosition = 0;
```

<pre class="language-text"><code class="language-text">code-block.js:1:7 <a href="https://biomejs.dev/linter/rules/use-naming-convention">lint/style/useNamingConvention</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Two consecutive uppercase characters are not allowed in camelCase because </span><span style="color: Orange;"><strong>strictCase</strong></span><span style="color: Orange;"> is set to `true`.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const fooYPosition = 0;
   <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">If you want to use consecutive uppercase characters in camelCase, then set the </span><span style="color: lightgreen;"><strong>strictCase</strong></span><span style="color: lightgreen;"> option to `false`.
</span><span style="color: lightgreen;">  </span><span style="color: lightgreen;">  </span><span style="color: lightgreen;">See the rule </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/rules/use-naming-convention#options">options</a></span><span style="color: lightgreen;"> for more details.</span>
  
</code></pre>

```js
function f(FIRST_PARAM) {}
```

<pre class="language-text"><code class="language-text">code-block.js:1:12 <a href="https://biomejs.dev/linter/rules/use-naming-convention">lint/style/useNamingConvention</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This </span><span style="color: Orange;"><strong>function parameter</strong></span><span style="color: Orange;"> name should be in </span><span style="color: Orange;"><strong>camelCase or PascalCase</strong></span><span style="color: Orange;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function f(FIRST_PARAM) {}
   <strong>   │ </strong>           <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Rename this symbol in </span><span style="color: lightgreen;"><strong>camelCase</strong></span><span style="color: lightgreen;">.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">f</span><span style="color: Tomato;">u</span><span style="color: Tomato;">n</span><span style="color: Tomato;">c</span><span style="color: Tomato;">t</span><span style="color: Tomato;">i</span><span style="color: Tomato;">o</span><span style="color: Tomato;">n</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">f</span><span style="color: Tomato;">(</span><span style="color: Tomato;"><strong>F</strong></span><span style="color: Tomato;"><strong>I</strong></span><span style="color: Tomato;"><strong>R</strong></span><span style="color: Tomato;"><strong>S</strong></span><span style="color: Tomato;"><strong>T</strong></span><span style="color: Tomato;"><strong>_</strong></span><span style="color: Tomato;"><strong>P</strong></span><span style="color: Tomato;"><strong>A</strong></span><span style="color: Tomato;"><strong>R</strong></span><span style="color: Tomato;"><strong>A</strong></span><span style="color: Tomato;"><strong>M</strong></span><span style="color: Tomato;">)</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">{</span><span style="color: Tomato;">}</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">u</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">c</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">(</span><span style="color: MediumSeaGreen;"><strong>f</strong></span><span style="color: MediumSeaGreen;"><strong>i</strong></span><span style="color: MediumSeaGreen;"><strong>r</strong></span><span style="color: MediumSeaGreen;"><strong>s</strong></span><span style="color: MediumSeaGreen;"><strong>t</strong></span><span style="color: MediumSeaGreen;"><strong>P</strong></span><span style="color: MediumSeaGreen;"><strong>a</strong></span><span style="color: MediumSeaGreen;"><strong>r</strong></span><span style="color: MediumSeaGreen;"><strong>a</strong></span><span style="color: MediumSeaGreen;"><strong>m</strong></span><span style="color: MediumSeaGreen;">)</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">{</span><span style="color: MediumSeaGreen;">}</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

### Function names

- A `function` name is in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case) or [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).
- A global `function` can also be in `UPPERCASE`.
This allows supporting the frameworks that require some function to use valid [HTTP method names](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

```jsx
function trimString(s) { /*...*/ }

function Component() {
    return <div></div>;
}

export function GET() { /*...*/ }
```

### TypeScript `enum` names

A _TypeScript_ `enum` name is in [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).

`enum` members are by default in [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).
However, you can configure the [case](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats) of `enum` members.
See [options](#options) for more details.

```ts
enum Status {
    Open,
    Close,
}
```

### Classes

- A class name is in [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).


- Static property and static getter names are in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case) or [`CONSTANT_CASE`](https://en.wikipedia.org/wiki/Snake_case).


- Class property and method names are in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case).



```js
class Person {
    static MAX_FRIEND_COUNT = 256;

    static get SPECIAL_PERSON_INSTANCE() { /*...*/ }

    initializedProperty = 0;

    specialMethod() {}
}
```

### TypeScript `type` aliases and `interface`

- A `type` alias or an interface name are in [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).


- Member names of a type are in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case).


- `readonly` property and getter names can also be in [`CONSTANT_CASE`](https://en.wikipedia.org/wiki/Snake_case).



```ts
type Named = {
    readonly fullName: string;

    specialMethod(): void;
};

interface Named {
    readonly fullName: string;

    specialMethod(): void;
}

interface PersonConstructor {
    readonly MAX_FRIEND_COUNT: number;

    get SPECIAL_PERSON_INSTANCE(): Person;

    new(): Person;
}
```

Examples of an incorrect type alias:

```ts
type person = { fullName: string };
```

<pre class="language-text"><code class="language-text">code-block.ts:1:6 <a href="https://biomejs.dev/linter/rules/use-naming-convention">lint/style/useNamingConvention</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This </span><span style="color: Orange;"><strong>type alias</strong></span><span style="color: Orange;"> name should be in </span><span style="color: Orange;"><strong>PascalCase</strong></span><span style="color: Orange;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>type person = { fullName: string };
   <strong>   │ </strong>     <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Rename this symbol in </span><span style="color: lightgreen;"><strong>PascalCase</strong></span><span style="color: lightgreen;">.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">t</span><span style="color: Tomato;">y</span><span style="color: Tomato;">p</span><span style="color: Tomato;">e</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><strong>p</strong></span><span style="color: Tomato;"><strong>e</strong></span><span style="color: Tomato;"><strong>r</strong></span><span style="color: Tomato;"><strong>s</strong></span><span style="color: Tomato;"><strong>o</strong></span><span style="color: Tomato;"><strong>n</strong></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">=</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">{</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">f</span><span style="color: Tomato;">u</span><span style="color: Tomato;">l</span><span style="color: Tomato;">l</span><span style="color: Tomato;">N</span><span style="color: Tomato;">a</span><span style="color: Tomato;">m</span><span style="color: Tomato;">e</span><span style="color: Tomato;">:</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">s</span><span style="color: Tomato;">t</span><span style="color: Tomato;">r</span><span style="color: Tomato;">i</span><span style="color: Tomato;">n</span><span style="color: Tomato;">g</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">}</span><span style="color: Tomato;">;</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;">y</span><span style="color: MediumSeaGreen;">p</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><strong>P</strong></span><span style="color: MediumSeaGreen;"><strong>e</strong></span><span style="color: MediumSeaGreen;"><strong>r</strong></span><span style="color: MediumSeaGreen;"><strong>s</strong></span><span style="color: MediumSeaGreen;"><strong>o</strong></span><span style="color: MediumSeaGreen;"><strong>n</strong></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">=</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">{</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">u</span><span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">N</span><span style="color: MediumSeaGreen;">a</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">:</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">s</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">g</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">}</span><span style="color: MediumSeaGreen;">;</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

### Literal object member names

- Literal object members are in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case).

```js
const alice = {
    fullName: "Alice",
}
```

Example of an incorrect name:

```js
const alice = {
    full_name: "Alice",
}
```

<pre class="language-text"><code class="language-text">code-block.js:2:5 <a href="https://biomejs.dev/linter/rules/use-naming-convention">lint/style/useNamingConvention</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This </span><span style="color: Orange;"><strong>object property</strong></span><span style="color: Orange;"> name should be in </span><span style="color: Orange;"><strong>camelCase</strong></span><span style="color: Orange;">.</span>
  
    <strong>1 │ </strong>const alice = {
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    full_name: &quot;Alice&quot;,
   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>}
    <strong>4 │ </strong>
  
</code></pre>

### Import and export aliases and namespaces

Import and export namespaces are in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case) or [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).

```js
import * as myLib from "my-lib";
import * as Framework from "framework";

export * as myLib from "my-lib";
export * as Framework from "framework";
```

`import` and `export` aliases are in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case), [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case), or [`CONSTANT_CASE`](https://en.wikipedia.org/wiki/Snake_case):

```js
import assert, {
    deepStrictEqual as deepEqual,
    AssertionError as AssertError
} from "node:assert";
```

Examples of an incorrect name:

```ts
import * as MY_LIB from "my-lib";
```

<pre class="language-text"><code class="language-text">code-block.ts:1:13 <a href="https://biomejs.dev/linter/rules/use-naming-convention">lint/style/useNamingConvention</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Orange;">  </span></strong><strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">This </span><span style="color: Orange;"><strong>import namespace</strong></span><span style="color: Orange;"> name should be in </span><span style="color: Orange;"><strong>camelCase or PascalCase</strong></span><span style="color: Orange;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>import * as MY_LIB from &quot;my-lib&quot;;
   <strong>   │ </strong>            <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Safe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Rename this symbol in </span><span style="color: lightgreen;"><strong>camelCase</strong></span><span style="color: lightgreen;">.</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">i</span><span style="color: Tomato;">m</span><span style="color: Tomato;">p</span><span style="color: Tomato;">o</span><span style="color: Tomato;">r</span><span style="color: Tomato;">t</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">*</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">a</span><span style="color: Tomato;">s</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><strong>M</strong></span><span style="color: Tomato;"><strong>Y</strong></span><span style="color: Tomato;"><strong>_</strong></span><span style="color: Tomato;"><strong>L</strong></span><span style="color: Tomato;"><strong>I</strong></span><span style="color: Tomato;"><strong>B</strong></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">f</span><span style="color: Tomato;">r</span><span style="color: Tomato;">o</span><span style="color: Tomato;">m</span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">m</span><span style="color: Tomato;">y</span><span style="color: Tomato;">-</span><span style="color: Tomato;">l</span><span style="color: Tomato;">i</span><span style="color: Tomato;">b</span><span style="color: Tomato;">&quot;</span><span style="color: Tomato;">;</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">p</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">*</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">a</span><span style="color: MediumSeaGreen;">s</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><strong>m</strong></span><span style="color: MediumSeaGreen;"><strong>y</strong></span><span style="color: MediumSeaGreen;"><strong>L</strong></span><span style="color: MediumSeaGreen;"><strong>i</strong></span><span style="color: MediumSeaGreen;"><strong>b</strong></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">f</span><span style="color: MediumSeaGreen;">r</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">y</span><span style="color: MediumSeaGreen;">-</span><span style="color: MediumSeaGreen;">l</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">b</span><span style="color: MediumSeaGreen;">&quot;</span><span style="color: MediumSeaGreen;">;</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

### TypeScript type parameter names

A _TypeScript_ type parameter name is in [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).

```ts
function id<Val>(value: Val): Val { /* ... */}
```

### TypeScript `namespace` names

A _TypeScript_ `namespace` names are in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case) or in [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).

```ts
namespace mathExtra {
    /*...*/
}

namespace MathExtra {
    /*...*/
}
```

## Ignored declarations

Note that some declarations are always ignored.
You cannot apply a convention to them.
This is the cas eof:

- Member names that are not identifiers

```js
class C {
  ["not an identifier"]() {}
}
```


- Named imports



```js
 import { an_IMPORT } from "mod"
```

- destructured object properties

```js
const { destructed_PROP } = obj;
```


- class member marked with `override`

```ts
class C extends B {
  override overridden_METHOD() {}
}
```


- declarations inside an external TypeScript module

```ts
declare module "myExternalModule" {
  export interface my_INTERFACE {}
}
```



## Options

The rule provides several options that are detailed in the following subsections.

```json
{
    "//": "...",
    "options": {
        "strictCase": false,
        "requireAscii": true,
        "enumMemberCase": "CONSTANT_CASE",
        "conventions": [
            {
                "selector": {
                    "kind": "memberLike",
                    "modifiers": ["private"]
                },
                "match": "_(.+)",
                "formats": ["camelCase"]
            }
        ]
    }
}
```

### strictCase

When this option is set to `true`, it forbids consecutive uppercase characters in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case) and [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).
For instance,  when the option is set to `true`, `HTTPServer` or `aHTTPServer` will throw an error.
These names should be renamed to `HttpServer` and `aHttpServer`

When the option is set to `false`, consecutive uppercase characters are allowed.
`HTTPServer` and `aHTTPServer` are so valid.

Default: `true`

### requireAscii

When this option is set to `true`, it forbids names that include non-ASCII characters.
For instance,  when the option is set to `true`, `café` or `안녕하세요` will throw an error.

When the option is set to `false`, names may include non-ASCII characters.
`café` and `안녕하세요` are so valid.

Default: `false`

**This option will be turned on by default in Biome 2.0.**

### enumMemberCase

By default, the rule enforces the naming convention followed by the [TypeScript Compiler team](https://www.typescriptlang.org/docs/handbook/enums.html):
an `enum` member is in [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).

You can enforce another convention by setting `enumMemberCase` option.
The supported cases are: [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case), [`CONSTANT_CASE`](https://en.wikipedia.org/wiki/Snake_case), and [`camelCase`](https://en.wikipedia.org/wiki/Camel_case).

This option will be deprecated in the future.
Use the `conventions` option instead.

### conventions (Since v1.8.0)

The `conventions` option allows applying custom conventions.
The option takes an array of conventions.
Every convention is an object that includes an optional `selector` and one or more requirements (`match` and `formats`).

For example, you can enforce the use of [`CONSTANT_CASE`](https://en.wikipedia.org/wiki/Snake_case) for global `const` declarations:

```json
{
    "//": "...",
    "options": {
        "conventions": [
            {
                "selector": {
                    "kind": "const",
                    "scope": "global"
                },
                "formats": ["CONSTANT_CASE"]
            }
        ]
    }
}
```

A selector describes which declarations the convention applies to.
You can select a declaration based on several criteria:

- `kind`: the kind of the declaration among:
  - `any` (default kind if the kind is unset)
  - `typeLike`: classes, enums, type aliases, and interfaces
  - `class`
  - `enum`
  - `interface`
  - `typeAlias`
  - `function`: named function declarations and expressions
  - `namespaceLike`: TypeScript namespaces, import and export namespaces (`import * as namespace from`)
  - `namespace`: TypeScript namespaces
  - `importNamespace`
  - `exportNamespace`
  - `importAlias`: default imports and aliases of named imports
  - `exportAlias`: aliases of re-exported names
  - `variable`: const, let, using, and var declarations
  - `const`
  - `let`
  - `var`
  - `using`
  - `functionParameter`
  - `catchParameter`
  - `indexParameter`: parameters of index signatures
  - `typeParameter`: generic type parameter
  - `classMember`: class properties, parameter properties, methods, getters, and setters
  - `classProperty`: class properties, including parameter properties
  - `classMethod`
  - `classGetter`
  - `classSetter`
  - `objectLiteralMember`: literal object properties, methods, getters, and setters
  - `objectLiteralProperty`
  - `objectLiteralMethod`
  - `objectLiteralGetter`
  - `objectLiteralSetter`
  - `typeMember`: properties, methods, getters, and setters declared in type aliases and interfaces
  - `typeProperty`
  - `typeMethod`
  - `typeGetter`
  - `typeSetter`


- `modifiers`: an array of modifiers among:
  - `abstract`: applies to class members and classes
  - `private`: applies to class members
  - `protected`: applies to class members
  - `readonly`: applies to class members and type members
  - `static`: applies to class members


- `scope`: where the declaration appears. Allowed values:
  - `any`: anywhere (default value if the scope is unset)
  - `global`: the global scope (also includes the namespace scopes)



For each declaration,
the `conventions` array is traversed until a selector selects the declaration.
The requirements of the convention are so verified on the declaration.

A convention must set at least one requirement among:

- `match`: a regular expression that the name of the declaration must match.
- `formats`: the string [case](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats) that the name must follow.
The supported cases are: [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case), [`CONSTANT_CASE`](https://en.wikipedia.org/wiki/Snake_case), [`camelCase`](https://en.wikipedia.org/wiki/Camel_case), and [`snake_case`](https://en.wikipedia.org/wiki/Snake_case).

If both `match` and `formats` are set, then `formats` is checked against the first capture of the regular expression.
Only the first capture is tested. Other captures are ignored.
If nothing is captured, then `formats` is ignored.

In the following example, we check the following conventions:

- A private property starts with `_` and consists of at least two characters
- The captured name (the name without the leading `_`) is in [`camelCase`](https://en.wikipedia.org/wiki/Camel_case).

```json5
{
    // ...
    "options": {
        "conventions": [
            {
                "selector": {
                    "kind": "classMember",
                    "modifiers": ["private"]
                },
                "match": "_(.+)",
                "formats": ["camelCase"]
            }
        ]
    }
}
```

If `match` is set and `formats` is unset,
then the part of the name captured by the regular expression is forwarded to the next conventions of the array.
In the following example, we require that private class members start with `_` and all class members are in ["camelCase"].

```json5
{
    // ...
    "options": {
        "conventions": [
            {
                "selector": {
                    "kind": "classMember",
                    "modifiers": ["private"]
                },
                "match": "_(.+)"
                // We don't need to specify `formats` because the capture is forwarded to the next conventions.
            },
            {
                "selector": {
                    "kind": "classMember"
                },
                "formats": ["camelCase"]
            }
        ]
    }
}
```

If a declaration is not selected or if a capture is forwarded while there are no more conventions,
then the declaration name is verified against the default conventions.
Because the default conventions already ensure that class members are in ["camelCase"],
the previous example can be simplified to:

```json5
{
    // ...
    "options": {
        "conventions": [
            {
                "selector": {
                    "kind": "classMember",
                    "modifiers": ["private"]
                },
                "match": "_(.+)"
                // We don't need to specify `formats` because the capture is forwarded to the next conventions.
            }
            // default conventions
        ]
    }
}
```

If the capture is identical to the initial name (it is not a part of the initial name),
then, leading and trailing underscore and dollar signs are trimmed before being checked against default conventions.
In the previous example, the capture is a part of the name because `_` is not included in the capture.

You can reset all default conventions by adding a convention at the end of the array that accepts anything:

```json5
{
    // ...
    "options": {
        "conventions": [
            // your conventions
            // ...

            // Otherwise, accept anything
            {
                "match": ".*"
            }
        ]
    }
}
```

Let's take a more complex example with the following conventions:

- Accept variable names `i`, `j`, and check all other names against the next conventions.
- All identifiers must contain at least two characters.
- We require `private` class members to start with an underscore `_`.
- We require `static readonly` class properties to be in [`CONSTANT_CASE`](https://en.wikipedia.org/wiki/Snake_case).
A `private static readonly` property must also start with an underscore as dictated by the previous convention.
- We require global constants to be in [`CONSTANT_CASE`](https://en.wikipedia.org/wiki/Snake_case) and
we allow these constants to be enclosed by double underscores or to be named `_SPECIAL_`.
- We require interfaces to start with `I`, except for interfaces ending with `Error`,
and to be in [`PascalCase`](https://en.wikipedia.org/wiki/Camel_case).
- All other names follow the default conventions

```json5
{
    // ...
    "options": {
        "conventions": [
            {
                "selector": {
                    "kind": "variable"
                },
                "match": "[ij]|(.*)"
            },
            {
                "match": "(.{2,})"
            },
            {
                "selector": {
                    "kind": "classMember",
                    "modifiers": ["private"]
                },
                "match": "_(.+)"
            }, {
                "selector": {
                    "kind": "classProperty",
                    "modifiers": ["static", "readonly"]
                },
                "formats": ["CONSTANT_CASE"]
            }, {
                "selector": {
                    "kind": "const",
                    "scope": "global"
                },
                "match": "__(.+)__|_SPECIAL_|(.+)",
                "formats": ["CONSTANT_CASE"]
            }, {
                "selector": {
                    "kind": "interface"
                },
                "match": "I(.*)|(.*)Error",
                "formats": ["PascalCase"]
            }
            // default conventions
        ]
    }
}
```

### Regular expression syntax

The `match` option takes a regular expression that supports the following syntaxes:

- Greedy quantifiers `*`, `?`, `+`, `{n}`, `{n,m}`, `{n,}`, `{m}`
- Non-greedy quantifiers `*?`, `??`, `+?`, `{n}?`, `{n,m}?`, `{n,}?`, `{m}?`
- Any character matcher `.`
- Character classes `[a-z]`, `[xyz]`, `[^a-z]`
- Alternations `|`
- Capturing groups `()`
- Non-capturing groups `(?:)`
- A limited set of escaped characters including all special characters
and regular string escape characters `\f`, `\n`, `\r`, `\t`, `\v`

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
