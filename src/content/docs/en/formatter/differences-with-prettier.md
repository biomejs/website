---
title: Differences with Prettier
description: In-depth explanation of the differences with Prettier.
---

In some cases, Biome has intentionally decided to format code in a way that doesn't match Prettier's output. These divergences are explained below.

## Known limitations compared to Prettier

Biome does not yet support formatting for all languages and frameworks. For a detailed breakdown of what is currently supported, please see our [language support page](https://biomejs.dev/internals/language-support/).

## Prettier doesn't unquote some object properties that are valid JavaScript identifiers.

Prettier and Biome unquote object and class properties that are valid JavaScript identifiers.
Prettier [unquotes only valid ES5 identifiers](https://github.com/prettier/prettier/blob/a5d502513e5de4819a41fd90b9be7247146effc7/src/language-js/utils/index.js#L646).

This is a legacy restriction in an ecosystem where ES2015 is now widespread.
Thus, we decided to diverge here by un-quoting all valid JavaScript identifiers in ES2015+.

A possible workaround would be to introduce a configuration to set the ECMAScript version a project uses.
We could then adjust the un-quoting behaviour based on that version.
Setting the ECMAScript version to `ES5` could match Prettier's behaviour.

```js title="example.js"
const obj = {
 'a': true,
 b: true,
 "𐊧": true,
}
```

Diff

```js title="example.js" del={4} ins={5}
const obj = {
  a: true,
  b: true,
  "𐊧": true,
  𐊧: true,
};
```


## Prettier has an inconsistent behavior for assignment in computed keys.

Prettier and Biome enclose some assignment expressions between parentheses, particularly in conditionals.
This allows Biome to identify an expression that should be a comparison.

Prettier has inconsistent behaviour because it adds parentheses for an assignment in a computed key of an object property and doesn't for a computed key of a class property, as demonstrated by the following example:

Input

```js title="example.js"
a = {
  [x = 0]: 1,
}

class C {
  [x = 0] = 1
}
```

Diff

```js title="example.js" del={2} ins={3}
a = {
  [(x = 0)]: 1,
  [x = 0]: 1,
};

class C {
  [x = 0] = 1;
}
```

[Playground link](/playground?enabledLinting=false&code=YQAgAD0AIAB7AAoAIAAgAFsAeAAgAD0AIAAwAF0AOgAgADEALAAKAH0ACgAKAGMAbABhAHMAcwAgAEMAIAB7AAoAIAAgACAAIABbAHgAIAA9ACAAMABdACAAPQAgADEACgB9AAoA)

To be consistent, we decided to diverge and omit the parentheses.
Alternatively, we could enclose any assignment in a computed key of an object or of a class.


## Prettier adds a trailing comma to type parameters of arrow functions even when it is not required.

In some specific cases, a type parameter list of an arrow function requires a trailing comma to distinguish it from a JSX element.
When a default type is provided, this trailing comma is not required.
Here, we diverge from Prettier because we think it better respects the original intent of Prettier, which was to add a trailing comma only when required.

Input

```tsx title="example.tsx"
<T = unknown>() => {};
```

Diff

```tsx title="example.tsx" del={1} ins={2}
<T = unknown,>() => {};
<T = unknown>() => {};
```


## Prettier has an inconsistent behavior for parenthesized non-null-asserted optional chains

In _TypeScript_, the non-null assertion operator `!` allows asserting that a value is non-null.
When applied on an optional chain, the assertion applies to the entire chain regardless of the presence of parentheses,
making equivalent `(a.?.b)!` and `a.?.b!`.

The previous code examples are already well-formatted, according to Prettier.
Prettier is used to enforce the presence or the absence of parentheses.
This looks like a missed opportunity to normalize the code.

Moreover, Prettier doesn't remove the parentheses even when they enclose the non-null assertion.
Instead, it moves the operator outside the parentheses.

Input:

```ts title="example.ts"
a.?.b!
(a.?.b)!
(a.?.b!)
```

Diff

```ts title="example.ts" del={2, 4} ins={3, 5}
a.?.b!
(a.?.b)!
a.?.b!
(a.?.b!)
a.?.b!
```


## Prettier formats invalid syntaxes

Prettier's Babel-based parsing for JavaScript and TypeScript is very loose and [allows multiple errors](https://github.com/prettier/prettier/blob/e4a74c05f4502dd4ec70495c3130ff08ab088e05/src/language-js/parse/babel.js#L177-L218) to be ignored.
Biome's parser is intentionally stricter than the Prettier parser.
It correctly identifies the following syntax errors:

- A function cannot have duplicate modifiers
- invalid order of properties' modifiers
- Function declarations are not allowed to have bodies
- non-abstract classes cannot have abstract properties
- An optional chain cannot be assigned
- The `const` modifier cannot be set on a type parameter of an interface
- top-level return
- etc.

In Prettier, these errors aren't considered parse errors, and the AST is still built "correctly" with the appropriate nodes.
When formatting, Prettier treats these nodes as normal and formats them accordingly.

In Biome, the parsing errors result in `Bogus` nodes, which may contain any number of valid nodes, invalid nodes, and/or raw characters.
When formatting, Biome treats bogus nodes as effectively plain text, printing them out verbatim into the resulting code without any formatting since attempting to format them could be incorrect and cause semantic changes.

For class properties, Prettier's current parsing strategy also uses boolean fields for modifiers, meaning only one of each kind of modifier can ever be present (accessibility modifiers are stored as a single string).
When printing, Prettier looks at the list of booleans and decides which modifiers to print out again. Biome instead keeps a list of modifiers, meaning duplicates are kept around and can be analyzed (hence the parsing error messages about duplicate modifiers and ordering).
When printing out the bogus nodes, this list is kept intact, and printing out the unformatted text results in those modifiers continuing to exist.

There are ways that Biome can address this.
One possibility is to try to interpret the Bogus nodes when formatting and construct valid nodes out of them.
If a valid node can be built, then it would just format that node like normal, otherwise, it prints the bogus text verbatim as it does currently.
However, this is messy and introduces a form of parsing logic into the formatter that is not meaningful.

Another option is to introduce some form of "syntactically-valid bogus node" into the parser, which accepts these kinds of purely semantic errors (duplicate modifiers, abstract properties in non-abstract classes).

It would continue to build the nodes like normal (effectively matching the behavior in Prettier) but store them inside of a new kind of bogus node, including the diagnostics along with it.
When formatting, these particular bogus nodes would just attempt to format the inner node and then fallback if there's an error (the existing `format_or_verbatim` utility would do this already).
This keeps the parsing and formatting logic separate from each other but introduces more complexity to the parser, allowing invalid states to be considered semi-valid.

### Duplicate modifiers on class properties

Input

```ts title="example.ts"
// Multiple accessibility modifiers
class Foo {
  private public a  = 1;
}

// Declare function with body
declare function foo ( ) {  }

// Invalid use of abstract
class Bar {
  abstract  foo  ;
}

// Duplicate Readonly
class Read {
  readonly readonly   x: number;
}
```

Diff

```ts title="example.ts" del={3, 8, 13, 19} ins={4, 9, 14, 20}
// Multiple accessibility modifiers
class Foo {
  private public a  = 1;
  private a = 1;
}

// Declare function with body
declare function foo ( ) {  }
declare function foo() {};

// Invalid use of abstract
class Bar {
  abstract  foo  ;
  abstract foo;
}

// Duplicate Readonly
class Read {
  readonly readonly   x: number;
  readonly x: number;
}
```

### Assignment to an optional chain

Input

```js title="example.js"
(a?.b) = c;
```

Diff

```js title="example.js" del={1} ins={2}
a?.b = c;
(a?.b) = c;
```

### Incorrect modifier for the type parameters of an interface

Input

```ts title="example.js"
interface L<in const T> {}
```

Diff

```ts title="example.js" del={1} ins={2}
interface L<const in T> {}
interface L<in const T> {}
```

### Top-level return

```js title="example.js"
return someVeryLongStringA && someVeryLongStringB && someVeryLongStringC && someVeryLongStringD
```

```js title="example.js" del={2, 3, 4, 5, 6, 7} ins={1}
return someVeryLongStringA && someVeryLongStringB && someVeryLongStringC && someVeryLongStringD
return (
  someVeryLongStringA &&
  someVeryLongStringB &&
  someVeryLongStringC &&
  someVeryLongStringD
);
```


## Prettier wraps MDX expressions like prose

When [`markdown.formatter.proseWrap`](/reference/configuration/#markdownformatterprosewrap) is set to `"always"`, Prettier treats the JavaScript inside an MDX expression, such as `{formatCurrency(price)}`, as ordinary text.
It can break the expression across lines, and it escapes characters that have a meaning in Markdown, such as `*`.
The escaped character may change the semantics of the JavaScript code: `price \* item.quantity` is no longer valid code.

Biome never breaks an MDX expression inside a paragraph to wrap the paragraph.
The expression stays on one line, even when that line is longer than the configured `lineWidth`.

Input

```mdx title="example.mdx"
Total: {formatCurrency(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0), "EUR")}
```

Diff, with `proseWrap` set to `"always"`

```mdx title="example.mdx" del={1, 2} ins={3}
Total: {formatCurrency(order.items.reduce((sum, item) => sum + item.price \*
item.quantity, 0), "EUR")}
Total: {formatCurrency(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0), "EUR")}
```


## Prettier can leave an MDX tag or expression alone on a line

In MDX, a line that contains only JSX tags or JSX expressions is block. See the [interleaving](https://mdxjs.com/docs/what-is-mdx/#interleaving) section.
When Prettier wraps a paragraph with `proseWrap` set to `"always"`, it can move a tag or an expression to a line of its own.
That turns the tag or the expression into a block, and splits the paragraph in two.

Biome never leaves JSX tags and JSX expressions alone on a line, so they stay inside the paragraph.
If a tag or an expression doesn't fit at the end of a line, Biome moves it to the next line together with the word that comes before it.
If a paragraph starts with a tag or an expression, Biome keeps it on the same line as the word that comes after it.
As a result, a line can be longer than the configured `lineWidth`.

In the following example, Biome moves `see` to the next line together with the two tags, and keeps `{lead}` on the same line as the long word after it.

Input

```mdx title="example.mdx"
Two tags close this paragraph, see <A /> <B />

{lead} unusually_long_identifier_that_cannot_fit_on_the_line
```

Diff, with `proseWrap` set to `"always"` and `lineWidth` set to `40`

```mdx title="example.mdx" del={1, 2, 6, 7} ins={3, 4, 8}
Two tags close this paragraph, see <A />
<B />
Two tags close this paragraph,
see <A /> <B />

{lead}
unusually_long_identifier_that_cannot_fit_on_the_line
{lead} unusually_long_identifier_that_cannot_fit_on_the_line
```


## Prettier doesn't format JSX inside MDX paragraphs

Prettier formats a JSX tag that stands on a line of its own, but it keeps a tag inside a paragraph as written.

Biome formats the JavaScript of the tags and expressions inside a paragraph too, and keeps each of them on one line, even when the line becomes longer than the configured `lineWidth`.
A line break inside a paragraph can change how MDX reads the document.
When the code needs a line break, for example after a `//` comment, Biome keeps the tag or the expression as written.

Input

```mdx title="example.mdx"
A short one: <Badge   color='green' /> and {  value  }.
```

Diff, with `proseWrap` set to `"always"`

```mdx title="example.mdx" del={1} ins={2}
A short one: <Badge   color='green' /> and { value }.
A short one: <Badge color="green" /> and {value}.
```

