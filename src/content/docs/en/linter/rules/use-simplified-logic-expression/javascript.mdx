---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.
editUrl: false

title: useSimplifiedLogicExpression (JavaScript)
description: JavaScript (and super languages) documentation for useSimplifiedLogicExpression
localized: false
---
import RuleLanguageLinks from "@/components/RuleLanguageLinks.astro";
import RulePlaygroundLink from "@/components/RulePlaygroundLink.astro";

<RuleLanguageLinks current="javascript" languages={[{"id":"javascript","label":"JavaScript (and super languages)","href":"/linter/rules/use-simplified-logic-expression/javascript/"}]} />

## Summary
- Rule available since: `v1.0.0`
- Diagnostic Category: [`lint/complexity/useSimplifiedLogicExpression`](/reference/diagnostics#diagnostic-category)
- This rule isn't recommended, so you need to enable it.
- This rule has a [**safe**](/linter/#safe-fixes) fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"complexity": {
				"useSimplifiedLogicExpression": "error"
			}
		}
	}
}

```
## Description
Discard redundant terms from logical expressions.

The rule applies the [De Morgan's Law](https://en.wikipedia.org/wiki/De_Morgan%27s_laws) rule to simplify logical expressions.
This means that some simplified expressions that are fixed by the rule might seem less intuitive to read, but they are more efficient to evaluate.

`value || false` and `value && true` are only reported in a boolean context, such as an `if`
condition or the operand of `!`, where only the truthiness of the result matters. Elsewhere,
removing the literal changes the result when `value` is not a boolean.
`value || true` and `value && false` are never reported, since the literal alone would skip
evaluating `value`.

## Examples

### Invalid

```js
const boolExp = true;
const r = true && boolExp;
```

<Fragment set:html={"<pre class=\"language-text\"><code class=\"language-text\">code-block.js:2:11 <a href=\"https://biomejs.dev/linter/rules/use-simplified-logic-expression\">lint/complexity/useSimplifiedLogicExpression</a> <span style=\"color: #000; background-color: #ddd;\"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Logical expression contains unnecessary complexity.</span><br />  <br />    <strong>1 │ </strong>const boolExp = true;<br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>2 │ </strong>const r = true &amp;&amp; boolExp;<br />   <strong>   │ </strong>          <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>3 │ </strong><br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Safe fix</span><span style=\"color: lightgreen;\">: </span><span style=\"color: lightgreen;\">Discard redundant terms from the logical expression.</span><br />  <br />  <strong>  2 │ </strong>const<span style=\"opacity: 0.8;\">·</span>r<span style=\"opacity: 0.8;\">·</span>=<span style=\"opacity: 0.8;\">·</span><span style=\"color: Tomato;\">t</span><span style=\"color: Tomato;\">r</span><span style=\"color: Tomato;\">u</span><span style=\"color: Tomato;\">e</span><span style=\"opacity: 0.8;\"><span style=\"color: Tomato;\">·</span></span><span style=\"color: Tomato;\">&amp;</span><span style=\"color: Tomato;\">&amp;</span><span style=\"opacity: 0.8;\"><span style=\"color: Tomato;\">·</span></span>boolExp;<br />  <strong>    │ </strong>          <span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span>        <br /></code></pre>"} />

```js
const boolExp2 = true;
const r2 = false || boolExp2;
```

<Fragment set:html={"<pre class=\"language-text\"><code class=\"language-text\">code-block.js:2:12 <a href=\"https://biomejs.dev/linter/rules/use-simplified-logic-expression\">lint/complexity/useSimplifiedLogicExpression</a> <span style=\"color: #000; background-color: #ddd;\"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Logical expression contains unnecessary complexity.</span><br />  <br />    <strong>1 │ </strong>const boolExp2 = true;<br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>2 │ </strong>const r2 = false || boolExp2;<br />   <strong>   │ </strong>           <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>3 │ </strong><br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Safe fix</span><span style=\"color: lightgreen;\">: </span><span style=\"color: lightgreen;\">Discard redundant terms from the logical expression.</span><br />  <br />  <strong>  2 │ </strong>const<span style=\"opacity: 0.8;\">·</span>r2<span style=\"opacity: 0.8;\">·</span>=<span style=\"opacity: 0.8;\">·</span><span style=\"color: Tomato;\">f</span><span style=\"color: Tomato;\">a</span><span style=\"color: Tomato;\">l</span><span style=\"color: Tomato;\">s</span><span style=\"color: Tomato;\">e</span><span style=\"opacity: 0.8;\"><span style=\"color: Tomato;\">·</span></span><span style=\"color: Tomato;\">|</span><span style=\"color: Tomato;\">|</span><span style=\"opacity: 0.8;\"><span style=\"color: Tomato;\">·</span></span>boolExp2;<br />  <strong>    │ </strong>           <span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span>         <br /></code></pre>"} />

```js
const boolExp3 = true;
if (boolExp3 || false) {
    doSomething();
}
```

<Fragment set:html={"<pre class=\"language-text\"><code class=\"language-text\">code-block.js:2:5 <a href=\"https://biomejs.dev/linter/rules/use-simplified-logic-expression\">lint/complexity/useSimplifiedLogicExpression</a> <span style=\"color: #000; background-color: #ddd;\"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Logical expression contains unnecessary complexity.</span><br />  <br />    <strong>1 │ </strong>const boolExp3 = true;<br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>2 │ </strong>if (boolExp3 || false) &#123;<br />   <strong>   │ </strong>    <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>3 │ </strong>    doSomething();<br />    <strong>4 │ </strong>&#125;<br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Safe fix</span><span style=\"color: lightgreen;\">: </span><span style=\"color: lightgreen;\">Discard redundant terms from the logical expression.</span><br />  <br />  <strong>  2 │ </strong>if<span style=\"opacity: 0.8;\">·</span>(boolExp3<span style=\"opacity: 0.8;\"><span style=\"color: Tomato;\">·</span></span><span style=\"color: Tomato;\">|</span><span style=\"color: Tomato;\">|</span><span style=\"opacity: 0.8;\"><span style=\"color: Tomato;\">·</span></span><span style=\"color: Tomato;\">f</span><span style=\"color: Tomato;\">a</span><span style=\"color: Tomato;\">l</span><span style=\"color: Tomato;\">s</span><span style=\"color: Tomato;\">e</span>)<span style=\"opacity: 0.8;\">·</span>&#123;<br />  <strong>    │ </strong>            <span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span>   <br /></code></pre>"} />

```js
const nonNullExp = 123;
const r3 = null ?? nonNullExp;
```

<Fragment set:html={"<pre class=\"language-text\"><code class=\"language-text\">code-block.js:2:12 <a href=\"https://biomejs.dev/linter/rules/use-simplified-logic-expression\">lint/complexity/useSimplifiedLogicExpression</a> <span style=\"color: #000; background-color: #ddd;\"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Logical expression contains unnecessary complexity.</span><br />  <br />    <strong>1 │ </strong>const nonNullExp = 123;<br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>2 │ </strong>const r3 = null ?? nonNullExp;<br />   <strong>   │ </strong>           <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>3 │ </strong><br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Safe fix</span><span style=\"color: lightgreen;\">: </span><span style=\"color: lightgreen;\">Discard redundant terms from the logical expression.</span><br />  <br />  <strong>  2 │ </strong>const<span style=\"opacity: 0.8;\">·</span>r3<span style=\"opacity: 0.8;\">·</span>=<span style=\"opacity: 0.8;\">·</span><span style=\"color: Tomato;\">n</span><span style=\"color: Tomato;\">u</span><span style=\"color: Tomato;\">l</span><span style=\"color: Tomato;\">l</span><span style=\"opacity: 0.8;\"><span style=\"color: Tomato;\">·</span></span><span style=\"color: Tomato;\">?</span><span style=\"color: Tomato;\">?</span><span style=\"opacity: 0.8;\"><span style=\"color: Tomato;\">·</span></span>nonNullExp;<br />  <strong>    │ </strong>           <span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span><span style=\"color: Tomato;\">-</span>           <br /></code></pre>"} />

```js
const boolExpr1 = true;
const boolExpr2 = false;
const r4 = !boolExpr1 || !boolExpr2;
```

<Fragment set:html={"<pre class=\"language-text\"><code class=\"language-text\">code-block.js:3:12 <a href=\"https://biomejs.dev/linter/rules/use-simplified-logic-expression\">lint/complexity/useSimplifiedLogicExpression</a> <span style=\"color: #000; background-color: #ddd;\"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Logical expression contains unnecessary complexity.</span><br />  <br />    <strong>1 │ </strong>const boolExpr1 = true;<br />    <strong>2 │ </strong>const boolExpr2 = false;<br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>3 │ </strong>const r4 = !boolExpr1 || !boolExpr2;<br />   <strong>   │ </strong>           <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>4 │ </strong><br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Safe fix</span><span style=\"color: lightgreen;\">: </span><span style=\"color: lightgreen;\">Reduce the complexity of the logical expression.</span><br />  <br />    <strong>1</strong> <strong>1</strong><strong> │ </strong>  const boolExpr1 = true;<br />    <strong>2</strong> <strong>2</strong><strong> │ </strong>  const boolExpr2 = false;<br />    <strong>3</strong>  <strong> │ </strong><span style=\"color: Tomato;\">-</span> <span style=\"color: Tomato;\">c</span><span style=\"color: Tomato;\">o</span><span style=\"color: Tomato;\">n</span><span style=\"color: Tomato;\">s</span><span style=\"color: Tomato;\">t</span><span style=\"color: Tomato;\"><span style=\"opacity: 0.8;\">·</span></span><span style=\"color: Tomato;\">r</span><span style=\"color: Tomato;\">4</span><span style=\"color: Tomato;\"><span style=\"opacity: 0.8;\">·</span></span><span style=\"color: Tomato;\">=</span><span style=\"color: Tomato;\"><span style=\"opacity: 0.8;\">·</span></span><span style=\"color: Tomato;\">!</span><span style=\"color: Tomato;\">b</span><span style=\"color: Tomato;\">o</span><span style=\"color: Tomato;\">o</span><span style=\"color: Tomato;\">l</span><span style=\"color: Tomato;\">E</span><span style=\"color: Tomato;\">x</span><span style=\"color: Tomato;\">p</span><span style=\"color: Tomato;\">r</span><span style=\"color: Tomato;\">1</span><span style=\"color: Tomato;\"><span style=\"opacity: 0.8;\">·</span></span><span style=\"color: Tomato;\"><strong>|</strong></span><span style=\"color: Tomato;\"><strong>|</strong></span><span style=\"color: Tomato;\"><span style=\"opacity: 0.8;\">·</span></span><span style=\"color: Tomato;\"><strong>!</strong></span><span style=\"color: Tomato;\">b</span><span style=\"color: Tomato;\">o</span><span style=\"color: Tomato;\">o</span><span style=\"color: Tomato;\">l</span><span style=\"color: Tomato;\">E</span><span style=\"color: Tomato;\">x</span><span style=\"color: Tomato;\">p</span><span style=\"color: Tomato;\">r</span><span style=\"color: Tomato;\">2</span><span style=\"color: Tomato;\">;</span><br />      <strong>3</strong><strong> │ </strong><span style=\"color: MediumSeaGreen;\">+</span> <span style=\"color: MediumSeaGreen;\">c</span><span style=\"color: MediumSeaGreen;\">o</span><span style=\"color: MediumSeaGreen;\">n</span><span style=\"color: MediumSeaGreen;\">s</span><span style=\"color: MediumSeaGreen;\">t</span><span style=\"color: MediumSeaGreen;\"><span style=\"opacity: 0.8;\">·</span></span><span style=\"color: MediumSeaGreen;\">r</span><span style=\"color: MediumSeaGreen;\">4</span><span style=\"color: MediumSeaGreen;\"><span style=\"opacity: 0.8;\">·</span></span><span style=\"color: MediumSeaGreen;\">=</span><span style=\"color: MediumSeaGreen;\"><span style=\"opacity: 0.8;\">·</span></span><span style=\"color: MediumSeaGreen;\">!</span><span style=\"color: MediumSeaGreen;\"><strong>(</strong></span><span style=\"color: MediumSeaGreen;\">b</span><span style=\"color: MediumSeaGreen;\">o</span><span style=\"color: MediumSeaGreen;\">o</span><span style=\"color: MediumSeaGreen;\">l</span><span style=\"color: MediumSeaGreen;\">E</span><span style=\"color: MediumSeaGreen;\">x</span><span style=\"color: MediumSeaGreen;\">p</span><span style=\"color: MediumSeaGreen;\">r</span><span style=\"color: MediumSeaGreen;\">1</span><span style=\"color: MediumSeaGreen;\"><span style=\"opacity: 0.8;\">·</span></span><span style=\"color: MediumSeaGreen;\"><strong>&amp;</strong></span><span style=\"color: MediumSeaGreen;\"><strong>&amp;</strong></span><span style=\"color: MediumSeaGreen;\"><span style=\"opacity: 0.8;\">·</span></span><span style=\"color: MediumSeaGreen;\">b</span><span style=\"color: MediumSeaGreen;\">o</span><span style=\"color: MediumSeaGreen;\">o</span><span style=\"color: MediumSeaGreen;\">l</span><span style=\"color: MediumSeaGreen;\">E</span><span style=\"color: MediumSeaGreen;\">x</span><span style=\"color: MediumSeaGreen;\">p</span><span style=\"color: MediumSeaGreen;\">r</span><span style=\"color: MediumSeaGreen;\">2</span><span style=\"color: MediumSeaGreen;\"><strong>)</strong></span><span style=\"color: MediumSeaGreen;\">;</span><br />    <strong>4</strong> <strong>4</strong><strong> │ </strong>  <br />  <br /></code></pre>"} />

### Valid

```js
const boolExpr3 = true;
const boolExpr4 = false;
const r5 = !(boolExpr1 && boolExpr2);
const boolExpr5 = true;
const boolExpr6 = false;
```

```js
const value = undefined;
const r6 = value || false;
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code (Edit this Page)](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/complexity/use_simplified_logic_expression.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/complexity/useSimplifiedLogicExpression)
- <RulePlaygroundLink rule="useSimplifiedLogicExpression" category="lint" language="js" code={"const boolExp = true;\nconst r = true && boolExp;\n"} />

