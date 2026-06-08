---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.
editUrl: false

title: noBeforeInteractiveScriptOutsideDocument
description: Learn more about noBeforeInteractiveScriptOutsideDocument
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JSX and TSX" icon="seti:javascript">
## Summary
- Rule available since: `v2.3.11`
- Diagnostic Category: [`lint/correctness/noBeforeInteractiveScriptOutsideDocument`](/reference/diagnostics#diagnostic-category)
- This rule isn't recommended, so you need to enable it.
- This rule doesn't have a fix.
- The default severity of this rule is [**error**](/reference/diagnostics#error).
- This rule belongs to the following domains:
  - [`next`](/linter/domains#next)
- Sources: 
  - Same as [`@next/next/no-before-interactive-script-outside-document`](https://nextjs.org/docs/messages/no-before-interactive-script-outside-document)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"correctness": {
				"noBeforeInteractiveScriptOutsideDocument": "error"
			}
		}
	}
}

```
## Description
Prevent usage of `next/script`'s `beforeInteractive` strategy outside of `pages/_document.js` in a Next.js project.

Next.js provides a `next/script` component to optimize the loading of third-party scripts. Using the `beforeInteractive`
strategy allows scripts to be preloaded before any first-party code. `beforeInteractive` scripts must be placed in `pages/_document.js`.

This rule checks for any usage of the `beforeInteractive` scripts outside of these files.

## Examples

### Invalid

```jsx
// pages/index.jsx
import Script from 'next/script'

export default function Index() {
  return (
    <div>
      <Script
        src="https://example.com/script.js"
        strategy="beforeInteractive"
      ></Script>
    </div>
  )
}
```

<pre class="language-text"><code class="language-text">code-block.jsx:7:7 <a href="https://biomejs.dev/linter/rules/no-before-interactive-script-outside-document">lint/correctness/noBeforeInteractiveScriptOutsideDocument</a> ━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Don't use </span><span style="color: Tomato;"><strong>next/script</strong></span><span style="color: Tomato;"> component with the &#96;</span><span style="color: Tomato;"><strong>beforeInteractive</strong></span><span style="color: Tomato;">&#96; strategy outside of </span><span style="color: Tomato;"><strong>pages/&#95;document.js</strong></span><span style="color: Tomato;">.</span><br />  <br />     <strong>5 │ </strong>  return (<br />     <strong>6 │ </strong>    &lt;div&gt;<br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>7 │ </strong>      &lt;Script<br />    <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>8 │ </strong>        src=&quot;https://example.com/script.js&quot;<br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>9 │ </strong>        strategy=&quot;beforeInteractive&quot;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>10 │ </strong>      &gt;&lt;/Script&gt;<br />    <strong>   │ </strong>      <strong><span style="color: Tomato;">^</span></strong><br />    <strong>11 │ </strong>    &lt;/div&gt;<br />    <strong>12 │ </strong>  )<br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">See the </span><span style="color: lightgreen;"><a href="https://nextjs.org/docs/messages/no-before-interactive-script-outside-document">Next.js docs</a></span><span style="color: lightgreen;"> for more details.</span><br />  <br /></code></pre>

### Valid

```jsx
// pages/_document.jsx
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
                <Script
                  src="https://example.com/script.js"
                  strategy="beforeInteractive"
                ></Script>
            </body>
        </Html>
    )
}
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code (Edit this Page)](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/correctness/no_before_interactive_script_outside_document.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/correctness/noBeforeInteractiveScriptOutsideDocument)

</TabItem>
</Tabs>

