---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noExcessiveLinesPerFunction
description: Learn more about noExcessiveLinesPerFunction
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
## Summary
- Rule available since: `v2.0.0`
- Diagnostic Category: [`lint/complexity/noExcessiveLinesPerFunction`](/reference/diagnostics#diagnostic-category)
- This rule isn't recommended, so you need to enable it.
- This rule doesn't have a fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- Sources: 
  - Inspired from [`max-lines-per-function`](https://eslint.org/docs/latest/rules/max-lines-per-function)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"complexity": {
				"noExcessiveLinesPerFunction": "error"
			}
		}
	}
}

```
## Description
Restrict the number of lines of code in a function.

This rule checks the number of lines in a function body and reports a diagnostic if it exceeds a specified limit. Remember that this rule only counts the lines of code in the function body, not the entire function declaration.
Some people consider large functions a code smell. Large functions tend to do a lot of things and can make it hard following what’s going on. Many coding style guides dictate a limit of the number of lines that a function can comprise of. This rule can help enforce that style.

## Examples

### Invalid

The following example will show diagnostic when you set the maxLines limit to 3, however the default value is 50.

```js
function foo () {
  const x = 0;
  const y = 1;
  const z = 2;
  return x + y + z;
};
```

### Valid

```js
 function foo () {
    const x = 0;
    const y = 1;
};
```

## Options

The rule supports the following options:

```json
{
    "options": {
       "maxLines": 50,
       "skipBlankLines": false,
       "skipIifes": false
    }
}
```

### maxLines

This option sets the maximum number of lines allowed in a function body.
If the function body exceeds this limit, a diagnostic will be reported.

Default: `50`

When `maxLines: 2`, the following function will be considered invalid:

```json title='biome.json'
{
	"linter": {
		"rules": {
			"complexity": {
				"noExcessiveLinesPerFunction": {
					"options": {
						"maxLines": 2
					}
				}
			}
		}
	}
}

```

```js
function example() {
 const a = 1; // 1
 const b = 2; // 2
 const c = 3; // 3
};
```

<pre class="language-text"><code class="language-text">code-block.js:1:1 <a href="https://biomejs.dev/linter/rules/no-excessive-lines-per-function">lint/complexity/noExcessiveLinesPerFunction</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This function has too many lines (3). Maximum allowed is 2.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>function example() &#123;<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong> const a = 1; // 1<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong> const b = 2; // 2<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>4 │ </strong> const c = 3; // 3<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>5 │ </strong>&#125;;<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>6 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider refactoring this function to split it into smaller functions.</span><br />  <br /></code></pre>

### skipBlankLines

When this options is set to `true`, blank lines in the function body are not counted towards the maximum line limit.
This means that only lines with actual code or comments will be counted.

Default: `false`

When `maxLines: 2` and `skipBlankLines: true`, the following function will be considered valid:

```json title='biome.json'
{
	"linter": {
		"rules": {
			"complexity": {
				"noExcessiveLinesPerFunction": {
					"options": {
						"maxLines": 2,
						"skipBlankLines": true
					}
				}
			}
		}
	}
}

```

```js
function example() {
 const a = 1; // 1
 // not counted
 const b = 2; // 2
 // not counted
};
```

### skipIifes

When this option is set to `true`, Immediately Invoked Function Expressions (IIFEs) are not checked for the maximum line limit.

Default: `false`

When `maxLines: 2` and `skipIifes: true`, the following IIFE will be considered valid even though its body has 3 lines:

```json title='biome.json'
{
	"linter": {
		"rules": {
			"complexity": {
				"noExcessiveLinesPerFunction": {
					"options": {
						"maxLines": 2,
						"skipIifes": true
					}
				}
			}
		}
	}
}

```

```js
(() => {
 const a = 1; // 1
 const b = 2; // 2
 const c = 3; // 3
})();
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/complexity/no_excessive_lines_per_function.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/complexity/noExcessiveLinesPerFunction)

</TabItem>
</Tabs>

