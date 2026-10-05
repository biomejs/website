---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.
editUrl: false

title: noVueDuplicateKeys (JavaScript)
description: JavaScript (and super languages) documentation for noVueDuplicateKeys
localized: false
---
import RuleLanguageLinks from "@/components/RuleLanguageLinks.astro";
import RulePlaygroundLink from "@/components/RulePlaygroundLink.astro";

<RuleLanguageLinks current="javascript" languages={[{"id":"javascript","label":"JavaScript (and super languages)","href":"/linter/rules/no-vue-duplicate-keys/javascript/"}]} />

## Summary
- Rule available since: `v2.2.5`
- Diagnostic Category: [`lint/correctness/noVueDuplicateKeys`](/reference/diagnostics#diagnostic-category)
- This rule is **recommended**, meaning it is enabled by default.
- This rule doesn't have a fix.
- The default severity of this rule is [**error**](/reference/diagnostics#error).
- This rule belongs to the following domains:
  - [`vue`](/linter/domains#vue)
- Sources: 
  - Same as [`vue/no-dupe-keys`](https://eslint.vuejs.org/rules/no-dupe-keys)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"correctness": {
				"noVueDuplicateKeys": "error"
			}
		}
	}
}

```
## Description
Disallow duplicate keys in Vue component data, methods, computed properties, and other options.

This rule prevents the use of duplicate keys across different Vue component options
such as `props`, `data`, `computed`, `methods`, and `setup`. Even if keys don't conflict
in the script tag, they may cause issues in the template since Vue allows direct
access to these keys.

## Examples

### Invalid

```vue
<script>
export default {
    props: ['foo'],
    data() {
        return {
            foo: 'bar'
        };
    }
};
</script>
```

<Fragment set:html={"<pre class=\"language-text\"><code class=\"language-text\">code-block.vue:3:13 <a href=\"https://biomejs.dev/linter/rules/no-vue-duplicate-keys\">lint/correctness/noVueDuplicateKeys</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style=\"color: Tomato;\">✖</span></strong> <span style=\"color: Tomato;\">Duplicate key </span><span style=\"color: Tomato;\"><strong>foo</strong></span><span style=\"color: Tomato;\"> found in Vue component.</span><br />  <br />    <strong>1 │ </strong>&lt;script&gt;<br />    <strong>2 │ </strong>export default &#123;<br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>3 │ </strong>    props: ['foo'],<br />   <strong>   │ </strong>            <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>4 │ </strong>    data() &#123;<br />    <strong>5 │ </strong>        return &#123;<br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Key </span><span style=\"color: lightgreen;\"><strong>foo</strong></span><span style=\"color: lightgreen;\"> is also defined here.</span><br />  <br />    <strong>4 │ </strong>    data() &#123;<br />    <strong>5 │ </strong>        return &#123;<br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>6 │ </strong>            foo: 'bar'<br />   <strong>   │ </strong>            <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>7 │ </strong>        &#125;;<br />    <strong>8 │ </strong>    &#125;<br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Keys defined in different Vue component options (props, data, methods, computed) can conflict when accessed in the template. Rename the key to avoid conflicts.</span><br />  <br /></code></pre>"} />

```vue
<script>
export default {
    data() {
        return {
            message: 'hello'
        };
    },
    methods: {
        message() {
            console.log('duplicate key');
        }
    }
};
</script>
```

<Fragment set:html={"<pre class=\"language-text\"><code class=\"language-text\">code-block.vue:5:13 <a href=\"https://biomejs.dev/linter/rules/no-vue-duplicate-keys\">lint/correctness/noVueDuplicateKeys</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style=\"color: Tomato;\">✖</span></strong> <span style=\"color: Tomato;\">Duplicate key </span><span style=\"color: Tomato;\"><strong>message</strong></span><span style=\"color: Tomato;\"> found in Vue component.</span><br />  <br />    <strong>3 │ </strong>    data() &#123;<br />    <strong>4 │ </strong>        return &#123;<br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>5 │ </strong>            message: 'hello'<br />   <strong>   │ </strong>            <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>6 │ </strong>        &#125;;<br />    <strong>7 │ </strong>    &#125;,<br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Key </span><span style=\"color: lightgreen;\"><strong>message</strong></span><span style=\"color: lightgreen;\"> is also defined here.</span><br />  <br />     <strong>7 │ </strong>    &#125;,<br />     <strong>8 │ </strong>    methods: &#123;<br />   <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>9 │ </strong>        message() &#123;<br />    <strong>   │ </strong>        <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>10 │ </strong>            console.log('duplicate key');<br />    <strong>11 │ </strong>        &#125;<br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Keys defined in different Vue component options (props, data, methods, computed) can conflict when accessed in the template. Rename the key to avoid conflicts.</span><br />  <br /></code></pre>"} />

```vue
<script>
export default {
    computed: {
        count() {
            return this.value * 2;
        }
    },
    methods: {
        count() {
            this.value++;
        }
    }
};
</script>
```

<Fragment set:html={"<pre class=\"language-text\"><code class=\"language-text\">code-block.vue:4:9 <a href=\"https://biomejs.dev/linter/rules/no-vue-duplicate-keys\">lint/correctness/noVueDuplicateKeys</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style=\"color: Tomato;\">✖</span></strong> <span style=\"color: Tomato;\">Duplicate key </span><span style=\"color: Tomato;\"><strong>count</strong></span><span style=\"color: Tomato;\"> found in Vue component.</span><br />  <br />    <strong>2 │ </strong>export default &#123;<br />    <strong>3 │ </strong>    computed: &#123;<br />  <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>4 │ </strong>        count() &#123;<br />   <strong>   │ </strong>        <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>5 │ </strong>            return this.value &#42; 2;<br />    <strong>6 │ </strong>        &#125;<br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Key </span><span style=\"color: lightgreen;\"><strong>count</strong></span><span style=\"color: lightgreen;\"> is also defined here.</span><br />  <br />     <strong>7 │ </strong>    &#125;,<br />     <strong>8 │ </strong>    methods: &#123;<br />   <strong><span style=\"color: Tomato;\">&gt;</span></strong> <strong>9 │ </strong>        count() &#123;<br />    <strong>   │ </strong>        <strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><strong><span style=\"color: Tomato;\">^</span></strong><br />    <strong>10 │ </strong>            this.value++;<br />    <strong>11 │ </strong>        &#125;<br />  <br />  <strong><span style=\"color: lightgreen;\">ℹ</span></strong> <span style=\"color: lightgreen;\">Keys defined in different Vue component options (props, data, methods, computed) can conflict when accessed in the template. Rename the key to avoid conflicts.</span><br />  <br /></code></pre>"} />

### Valid

```vue
<script>
export default {
    props: ['foo'],
    data() {
        return {
            bar: 'baz'
        };
    },
    methods: {
        handleClick() {
            console.log('unique key');
        }
    }
};
</script>
```

```vue
<script>
export default {
    computed: {
        displayMessage() {
            return this.message.toUpperCase();
        }
    },
    methods: {
        clearMessage() {
            this.message = '';
        }
    }
};
</script>
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code (Edit this Page)](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/correctness/no_vue_duplicate_keys.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/correctness/noVueDuplicateKeys)
- <RulePlaygroundLink rule="noVueDuplicateKeys" category="lint" language="vue" code={"<script>\nexport default {\n    props: ['foo'],\n    data() {\n        return {\n            foo: 'bar'\n        };\n    }\n};\n</script>\n"} />

