---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noLeakedRender
description: Learn more about noLeakedRender
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JSX and TSX" icon="seti:javascript">
:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
## Summary
- Rule available since: `v2.3.8`
- Diagnostic Category: [`lint/nursery/noLeakedRender`](/reference/diagnostics#diagnostic-category)
- This rule doesn't have a fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- This rule belongs to the following domains:
  - [`react`](/linter/domains#react)
- Sources: 
  - Inspired from [`react/jsx-no-leaked-render`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"noLeakedRender": "error"
			}
		}
	}
}

```
## Description
Prevent problematic leaked values from being rendered.

This rule prevents values that might cause unintentionally rendered values
or rendering crashes in React JSX. When using conditional rendering with the
logical AND operator (`&&`), if the left-hand side evaluates to a falsy value like
`0`, `NaN`, or any empty string, these values will be rendered instead of rendering nothing.

## Examples

### Invalid

```jsx
const Component = () => {
  const count = 0;
  return <div>{count && <span>Count: {count}</span>}</div>;
}
```

<pre class="language-text"><code class="language-text">code-block.jsx:3:16 <a href="https://biomejs.dev/linter/rules/no-leaked-render">lint/nursery/noLeakedRender</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Potential leaked value that might cause unintended rendering.</span><br />  <br />    <strong>1 │ </strong>const Component = () =&gt; &#123;<br />    <strong>2 │ </strong>  const count = 0;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>  return &lt;div&gt;&#123;count &amp;&amp; &lt;span&gt;Count: &#123;count&#125;&lt;/span&gt;&#125;&lt;/div&gt;;<br />   <strong>   │ </strong>               <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>&#125;<br />    <strong>5 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">JavaScript's &amp;&amp; operator returns the left value when it's falsy (e.g., 0, NaN, ''). React will render that value, causing unexpected UI output.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Make sure the condition is explicitly boolean.Use !!value, value &gt; 0, or a ternary expression.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```jsx
const Component = () => {
  const items = [];
  return <div>{items.length && <List items={items} />}</div>;
}
```

<pre class="language-text"><code class="language-text">code-block.jsx:3:16 <a href="https://biomejs.dev/linter/rules/no-leaked-render">lint/nursery/noLeakedRender</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Potential leaked value that might cause unintended rendering.</span><br />  <br />    <strong>1 │ </strong>const Component = () =&gt; &#123;<br />    <strong>2 │ </strong>  const items = [];<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>  return &lt;div&gt;&#123;items.length &amp;&amp; &lt;List items=&#123;items&#125; /&gt;&#125;&lt;/div&gt;;<br />   <strong>   │ </strong>               <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>&#125;<br />    <strong>5 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">JavaScript's &amp;&amp; operator returns the left value when it's falsy (e.g., 0, NaN, ''). React will render that value, causing unexpected UI output.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Make sure the condition is explicitly boolean.Use !!value, value &gt; 0, or a ternary expression.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

```jsx
const Component = () => {
  const user = null;
  return <div>{user && <Profile user={user} />}</div>;
}
```

<pre class="language-text"><code class="language-text">code-block.jsx:3:16 <a href="https://biomejs.dev/linter/rules/no-leaked-render">lint/nursery/noLeakedRender</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Potential leaked value that might cause unintended rendering.</span><br />  <br />    <strong>1 │ </strong>const Component = () =&gt; &#123;<br />    <strong>2 │ </strong>  const user = null;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>  return &lt;div&gt;&#123;user &amp;&amp; &lt;Profile user=&#123;user&#125; /&gt;&#125;&lt;/div&gt;;<br />   <strong>   │ </strong>               <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>4 │ </strong>&#125;<br />    <strong>5 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">JavaScript's &amp;&amp; operator returns the left value when it's falsy (e.g., 0, NaN, ''). React will render that value, causing unexpected UI output.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Make sure the condition is explicitly boolean.Use !!value, value &gt; 0, or a ternary expression.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

### Valid

```jsx
const Component = () => {
  const count = 0;
  return <div>{count > 0 && <span>Count: {count}</span>}</div>;
}
```

```jsx
const Component = () => {
  const items = [];
  return <div>{!!items.length && <List items={items} />}</div>;
}
```

```jsx
const Component = () => {
  const user = null;
  return <div>{user ? <Profile user={user} /> : null}</div>;
}
```

```jsx
const Component = () => {
  const condition = false;
  return <div>{condition ? <Content /> : <Fallback />}</div>;
}
```

```jsx
const Component = () => {
  const isReady = true;
  return <div>{isReady && <Content />}</div>;
}
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/nursery/no_leaked_render.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/nursery/noLeakedRender)

</TabItem>
</Tabs>

