---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.
editUrl: false

title: noSvelteUnnecessaryStateWrap
description: Learn more about noSvelteUnnecessaryStateWrap
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
:::caution
This rule is part of the [nursery](/linter/#nursery) group. This means that it is experimental and the behavior can change at any time.
:::
## Summary
- Rule available since: `v2.5.2`
- Diagnostic Category: [`lint/nursery/noSvelteUnnecessaryStateWrap`](/reference/diagnostics#diagnostic-category)
- This rule has an [**unsafe**](/linter/#unsafe-fixes) fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- This rule belongs to the following domains:
  - [`svelte`](/linter/domains#svelte)
- Sources: 
  - Same as [`svelte/no-unnecessary-state-wrap`](https://sveltejs.github.io/eslint-plugin-svelte/rules/no-unnecessary-state-wrap/)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"nursery": {
				"noSvelteUnnecessaryStateWrap": "error"
			}
		}
	}
}

```
## Description
Disallow unnecessary `$state` wrapping of reactive classes.

Several classes exported from `svelte/reactivity` — such as `SvelteMap`, `SvelteSet`, and
`SvelteDate` — are already deeply reactive without the `$state` rune. Wrapping them in
`$state(...)` is redundant and may mislead readers into thinking the reactivity comes from
the rune rather than the class itself.

Use the `additionalReactiveClasses` option to extend this list with custom reactive classes
from your own codebase.

Use `allowReassign: true` if you need to reassign the variable itself after declaration,
which requires `$state` to track the reference change.

## Examples

### Invalid

```svelte
<script>
import { SvelteMap } from "svelte/reactivity";
const map = $state(new SvelteMap());
</script>
```

<pre class="language-text"><code class="language-text">code-block.svelte:2:13 <a href="https://biomejs.dev/linter/rules/no-svelte-unnecessary-state-wrap">lint/nursery/noSvelteUnnecessaryStateWrap</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>SvelteMap</strong></span><span style="color: lightgreen;"> is already reactive, wrapping it in </span><span style="color: lightgreen;"><strong>$state()</strong></span><span style="color: lightgreen;"> is unnecessary.</span><br />  <br />    <strong>1 │ </strong>import &#123; SvelteMap &#125; from &quot;svelte/reactivity&quot;;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>const map = $state(new SvelteMap());<br />   <strong>   │ </strong>            <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Classes from </span><span style="color: lightgreen;"><strong>svelte/reactivity</strong></span><span style="color: lightgreen;"> track their own mutations without needing a </span><span style="color: lightgreen;"><strong>$state</strong></span><span style="color: lightgreen;"> wrapper.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove the unnecessary </span><span style="color: lightgreen;"><strong>$state()</strong></span><span style="color: lightgreen;"> wrapper.</span><br />  <br />  <strong>  2 │ </strong>const<span style="opacity: 0.8;">·</span>map<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span><span style="color: Tomato;">$</span><span style="color: Tomato;">s</span><span style="color: Tomato;">t</span><span style="color: Tomato;">a</span><span style="color: Tomato;">t</span><span style="color: Tomato;">e</span><span style="color: Tomato;">(</span>new<span style="opacity: 0.8;">·</span>SvelteMap(<span style="color: Tomato;">)</span>);<br />  <strong>    │ </strong>            <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span>              <span style="color: Tomato;">-</span>  <br /></code></pre>

### Valid

```svelte
<script>
import { SvelteMap } from "svelte/reactivity";
const map = new SvelteMap();
</script>
```

## Options

### `allowReassign`

When `true`, suppresses the autofix for variables that are reassigned after declaration.
Because reassigning a `$state`-wrapped value changes the binding itself, removing `$state`
would break reactivity for those reassignments. The diagnostic still fires — only the
unsafe autofix is withheld.

Default: `false`

```json title='biome.json'
{
	"linter": {
		"rules": {
			"nursery": {
				"noSvelteUnnecessaryStateWrap": {
					"level": "on",
					"options": {
						"allowReassign": true
					}
				}
			}
		}
	}
}

```

```svelte
<script>
import { SvelteMap } from "svelte/reactivity";
const map = $state(new SvelteMap());
</script>
```

<pre class="language-text"><code class="language-text">code-block.svelte:2:13 <a href="https://biomejs.dev/linter/rules/no-svelte-unnecessary-state-wrap">lint/nursery/noSvelteUnnecessaryStateWrap</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>SvelteMap</strong></span><span style="color: lightgreen;"> is already reactive, wrapping it in </span><span style="color: lightgreen;"><strong>$state()</strong></span><span style="color: lightgreen;"> is unnecessary.</span><br />  <br />    <strong>1 │ </strong>import &#123; SvelteMap &#125; from &quot;svelte/reactivity&quot;;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>const map = $state(new SvelteMap());<br />   <strong>   │ </strong>            <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Classes from </span><span style="color: lightgreen;"><strong>svelte/reactivity</strong></span><span style="color: lightgreen;"> track their own mutations without needing a </span><span style="color: lightgreen;"><strong>$state</strong></span><span style="color: lightgreen;"> wrapper.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove the unnecessary </span><span style="color: lightgreen;"><strong>$state()</strong></span><span style="color: lightgreen;"> wrapper.</span><br />  <br />  <strong>  2 │ </strong>const<span style="opacity: 0.8;">·</span>map<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span><span style="color: Tomato;">$</span><span style="color: Tomato;">s</span><span style="color: Tomato;">t</span><span style="color: Tomato;">a</span><span style="color: Tomato;">t</span><span style="color: Tomato;">e</span><span style="color: Tomato;">(</span>new<span style="opacity: 0.8;">·</span>SvelteMap(<span style="color: Tomato;">)</span>);<br />  <strong>    │ </strong>            <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span>              <span style="color: Tomato;">-</span>  <br /></code></pre>

```svelte
<script>
import { SvelteMap } from "svelte/reactivity";
let map = $state(new SvelteMap());
map = new SvelteMap();
</script>
```

<pre class="language-text"><code class="language-text">code-block.svelte:2:11 <a href="https://biomejs.dev/linter/rules/no-svelte-unnecessary-state-wrap">lint/nursery/noSvelteUnnecessaryStateWrap</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>SvelteMap</strong></span><span style="color: lightgreen;"> is already reactive, wrapping it in </span><span style="color: lightgreen;"><strong>$state()</strong></span><span style="color: lightgreen;"> is unnecessary.</span><br />  <br />    <strong>1 │ </strong>import &#123; SvelteMap &#125; from &quot;svelte/reactivity&quot;;<br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>let map = $state(new SvelteMap());<br />   <strong>   │ </strong>          <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>3 │ </strong>map = new SvelteMap();<br />    <strong>4 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Classes from </span><span style="color: lightgreen;"><strong>svelte/reactivity</strong></span><span style="color: lightgreen;"> track their own mutations without needing a </span><span style="color: lightgreen;"><strong>$state</strong></span><span style="color: lightgreen;"> wrapper.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br /></code></pre>

### `additionalReactiveClasses`

An array of additional class names to treat as already reactive (beyond the built-in
`svelte/reactivity` classes). Use this to extend the rule with custom reactive classes
from your own codebase.

```json title='biome.json'
{
	"linter": {
		"rules": {
			"nursery": {
				"noSvelteUnnecessaryStateWrap": {
					"level": "on",
					"options": {
						"additionalReactiveClasses": [
							"MyReactiveStore"
						]
					}
				}
			}
		}
	}
}

```

#### Invalid

```svelte
<script>
const store = $state(new MyReactiveStore());
</script>
```

<pre class="language-text"><code class="language-text">code-block.svelte:1:15 <a href="https://biomejs.dev/linter/rules/no-svelte-unnecessary-state-wrap">lint/nursery/noSvelteUnnecessaryStateWrap</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;"><strong>MyReactiveStore</strong></span><span style="color: lightgreen;"> is already reactive, wrapping it in </span><span style="color: lightgreen;"><strong>$state()</strong></span><span style="color: lightgreen;"> is unnecessary.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const store = $state(new MyReactiveStore());<br />   <strong>   │ </strong>              <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Classes from </span><span style="color: lightgreen;"><strong>svelte/reactivity</strong></span><span style="color: lightgreen;"> track their own mutations without needing a </span><span style="color: lightgreen;"><strong>$state</strong></span><span style="color: lightgreen;"> wrapper.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">This rule belongs to the nursery group, which means it is not yet stable and may change in the future. Visit </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/#nursery">https://biomejs.dev/linter/#nursery</a></span><span style="color: lightgreen;"> for more information.</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Remove the unnecessary </span><span style="color: lightgreen;"><strong>$state()</strong></span><span style="color: lightgreen;"> wrapper.</span><br />  <br />  <strong>  1 │ </strong>const<span style="opacity: 0.8;">·</span>store<span style="opacity: 0.8;">·</span>=<span style="opacity: 0.8;">·</span><span style="color: Tomato;">$</span><span style="color: Tomato;">s</span><span style="color: Tomato;">t</span><span style="color: Tomato;">a</span><span style="color: Tomato;">t</span><span style="color: Tomato;">e</span><span style="color: Tomato;">(</span>new<span style="opacity: 0.8;">·</span>MyReactiveStore(<span style="color: Tomato;">)</span>);<br />  <strong>    │ </strong>              <span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span><span style="color: Tomato;">-</span>                    <span style="color: Tomato;">-</span>  <br /></code></pre>

#### Valid

```svelte
<script>
const store = new MyReactiveStore();
</script>
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code (Edit this Page)](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/nursery/no_svelte_unnecessary_state_wrap.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/nursery/noSvelteUnnecessaryStateWrap)

</TabItem>
</Tabs>

