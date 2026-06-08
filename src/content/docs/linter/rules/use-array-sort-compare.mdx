---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.
editUrl: false

title: useArraySortCompare
description: Learn more about useArraySortCompare
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
:::note
This rule belongs to the types domain. This means that its activation will activate the Biome Scanner to scan the files of your project, and enable the type inference engine. Read more about it in the [documentation page](/linter/domains#types)
:::
## Summary
- Rule available since: `v2.3.5`
- Diagnostic Category: [`lint/suspicious/useArraySortCompare`](/reference/diagnostics#diagnostic-category)
- This rule isn't recommended, so you need to enable it.
- This rule doesn't have a fix.
- The default severity of this rule is [**warning**](/reference/diagnostics#warning).
- This rule belongs to the following domains:
  - [`types`](/linter/domains#types)
- Sources: 
  - Same as [`@typescript-eslint/require-array-sort-compare`](https://typescript-eslint.io/rules/require-array-sort-compare)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"suspicious": {
				"useArraySortCompare": "error"
			}
		}
	}
}

```
## Description
Require Array#sort and Array#toSorted calls to always provide a compareFunction.

When called without a compare function, Array#sort() and Array#toSorted() converts all non-undefined array elements into strings and then compares said strings based off their UTF-16 code units [ECMA specification](https://262.ecma-international.org/9.0/#sec-sortcompare).

The result is that elements are sorted alphabetically, regardless of their type. For example, when sorting numbers, this results in a "10 before 2" order:

```ts title='example.ts'
[1, 2, 3, 10, 20, 30].sort(); //→ [1, 10, 2, 20, 3, 30]
```

This rule reports on any call to the sort methods that do not provide a compare argument.

## Examples

### Invalid

```ts title='invalid.ts'
const array: any[] = [];
array.sort();
```

<pre class="language-text"><code class="language-text"><a href="file:///invalid.ts">/invalid.ts</a>:2:1 <a href="https://biomejs.dev/linter/rules/use-array-sort-compare">lint/suspicious/useArraySortCompare</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Orange;">⚠</span></strong> <span style="color: Orange;">Compare function missing.</span><br />  <br />    <strong>1 │ </strong>const array: any[] = [];<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>array.sort();<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">When called without a compare function, Array#sort() and Array#toSorted() converts all non-undefined array elements into strings and then compares said strings based off their UTF-16 code units.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Add a compare function to prevent unexpected sorting.</span><br />  <br /></code></pre>

### Valid

```ts title='valid.ts'
const array: any[] = [];
array.sort((a, b) => a - b);
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code (Edit this Page)](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/suspicious/use_array_sort_compare.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/suspicious/useArraySortCompare)

</TabItem>
</Tabs>

