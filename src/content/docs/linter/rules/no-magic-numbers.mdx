---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noMagicNumbers
description: Learn more about noMagicNumbers
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="TypeScript and TSX" icon="seti:typescript">
## Summary
- Rule available since: `v2.1.0`
- Diagnostic Category: [`lint/style/noMagicNumbers`](/reference/diagnostics#diagnostic-category)
- This rule isn't recommended, so you need to enable it.
- This rule doesn't have a fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- Sources: 
  - Same as [`@typescript-eslint/no-magic-numbers`](https://typescript-eslint.io/rules/no-magic-numbers)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"style": {
				"noMagicNumbers": "error"
			}
		}
	}
}

```
## Description
Reports usage of "magic numbers" — numbers used directly instead of being assigned to named constants.

Its goal is to improve code maintainability and readability by encouraging developers to extract such numbers into named constants, making their purpose explicit.

It ignores:

- non-magic values (like 0, 1, 2, 10, 24, 60, and their negative or bigint forms) found anywhere, including arithmetic expressions, fn calls etc.
- Array indices
- Enum values
- Initial values in variable or class property declarations
- Default values in function parameters or destructuring patterns
- Arguments to JSON.stringify and parseInt (e.g., `JSON.stringify(22)`, `parseInt("123", 8)`)
- Operands in bitwise operations (e.g., `a & 7`, `a | 7`)
- Values in JSX expressions (e.g., `<div>{1}</div>`)
- Object property values (e.g., `{ tax: 0.25 }`)

## Examples

### Invalid

```js
let total = price * 1.23; // Magic number for tax rate
```

<pre class="language-text"><code class="language-text">code-block.js:1:21 <a href="https://biomejs.dev/linter/rules/no-magic-numbers">lint/style/noMagicNumbers</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Magic number detected. Extract it to a constant with a meaningful name.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>let total = price &#42; 1.23; // Magic number for tax rate<br />   <strong>   │ </strong>                    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Code is more readable and refactoring easier when special numbers are declared as constants as it makes their meaning explicit.</span><br />  <br /></code></pre>

### Valid

```js
const TAX_RATE = 1.23;
let total = price * TAX_RATE;
```

```ts
const TAX_RATE = 1.23 as const;
let total = price * TAX_RATE;
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/style/no_magic_numbers.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/style/noMagicNumbers)

</TabItem>
</Tabs>

