---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.
editUrl: false

title: noBaseToString
description: Learn more about noBaseToString
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
:::note
This rule belongs to the types domain. This means that its activation will activate the Biome Scanner to scan the files of your project, and enable the type inference engine. Read more about it in the [documentation page](/linter/domains#types)
:::
## Summary
- Rule available since: `v2.4.15`
- Diagnostic Category: [`lint/nursery/noBaseToString`](/reference/diagnostics#diagnostic-category)
- This rule doesn't have a fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- This rule belongs to the following domains:
  - [`types`](/linter/domains#types)
- Sources: 
  - Same as [`@typescript-eslint/no-base-to-string`](https://typescript-eslint.io/rules/no-base-to-string)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"noBaseToString": "error"
			}
		}
	}
}

```
## Description
Require stringification to avoid values that only use the default object representation.

JavaScript coerces values to strings in several places, such as `String(value)`,
`value.toString()`, string concatenation, template interpolation, and `Array#join()`.
When the value only inherits the default object stringification, that often produces
`"[object Object]"` instead of something intentionally readable.

## Examples

### Invalid

```ts title='invalid-string.ts'
const value: {} = {};
String(value);
```

<pre class="language-text"><code class="language-text"><a href="file:///invalid-string.ts">/invalid-string.ts</a>:2:8 <a href="https://biomejs.dev/linter/rules/no-base-to-string">lint/nursery/noBaseToString</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This expression will use the default object stringification format, such as </span><span style="color: lightgreen;"><strong>[object Object]</strong></span><span style="color: lightgreen;">, when stringified.</span><br />  <br />    <strong>1 │ </strong>const value: &#123;&#125; = &#123;&#125;;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>String(value);<br />   <strong>   │ </strong>       <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Stringify a primitive value, define a custom stringification method, or serialize the object explicitly.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```ts title='invalid-template.ts'
const value: {} = {};
`${value}`;
```

<pre class="language-text"><code class="language-text"><a href="file:///invalid-template.ts">/invalid-template.ts</a>:2:4 <a href="https://biomejs.dev/linter/rules/no-base-to-string">lint/nursery/noBaseToString</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This expression will use the default object stringification format, such as </span><span style="color: lightgreen;"><strong>[object Object]</strong></span><span style="color: lightgreen;">, when stringified.</span><br />  <br />    <strong>1 │ </strong>const value: &#123;&#125; = &#123;&#125;;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>&#96;$&#123;value&#125;&#96;;<br />   <strong>   │ </strong>   <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Stringify a primitive value, define a custom stringification method, or serialize the object explicitly.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```ts title='invalid-join.ts'
const values: {}[] = [{}];
values.join(",");
```

<pre class="language-text"><code class="language-text"><a href="file:///invalid-join.ts">/invalid-join.ts</a>:2:1 <a href="https://biomejs.dev/linter/rules/no-base-to-string">lint/nursery/noBaseToString</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This </span><span style="color: lightgreen;"><strong>join()</strong></span><span style="color: lightgreen;"> call will stringify one or more elements with the default object format, such as </span><span style="color: lightgreen;"><strong>[object Object]</strong></span><span style="color: lightgreen;">.</span><br />  <br />    <strong>1 │ </strong>const values: &#123;&#125;[] = [&#123;&#125;];<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>values.join(&quot;,&quot;);<br />   <strong>   │ </strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Ensure every joined element has a useful string representation, or map the values before joining.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

### Valid

```ts
String(1);
```

```ts
class CustomToString {
    toString() {
        return "ok";
    }
}

`${new CustomToString()}`;
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code (Edit this Page)](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/nursery/no_base_to_string.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/nursery/noBaseToString)

</TabItem>
</Tabs>

