**Since**: `v1.0.0`
:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.
:::

Sources: 
- Same as: <a href="https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md" target="_blank"><code>react/jsx-no-comment-textnodes</code></a>

Prevent comments from being inserted as text nodes

## Examples

### Invalid

```jsx
<div>// comment</div>;
```

<pre class="language-text"><code class="language-text">code-block.jsx:1:6 <a href="https://biomejs.dev/linter/rules/no-comment-text">lint/suspicious/noCommentText</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Wrap </span><span style="color: Tomato;"><strong>comments</strong></span><span style="color: Tomato;"> inside children within </span><span style="color: Tomato;"><strong>braces</strong></span><span style="color: Tomato;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;div&gt;// comment&lt;/div&gt;;
   <strong>   │ </strong>     <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Wrap the comments with braces</span>
  
    <strong>1</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;">&lt;</span><span style="color: Tomato;">d</span><span style="color: Tomato;">i</span><span style="color: Tomato;">v</span><span style="color: Tomato;">&gt;</span><span style="color: Tomato;">/</span><span style="color: Tomato;"><strong>/</strong></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">c</span><span style="color: Tomato;">o</span><span style="color: Tomato;">m</span><span style="color: Tomato;">m</span><span style="color: Tomato;">e</span><span style="color: Tomato;">n</span><span style="color: Tomato;">t</span><span style="color: Tomato;">&lt;</span><span style="color: Tomato;">/</span><span style="color: Tomato;">d</span><span style="color: Tomato;">i</span><span style="color: Tomato;">v</span><span style="color: Tomato;">&gt;</span><span style="color: Tomato;">;</span>
      <strong>1</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;">&lt;</span><span style="color: MediumSeaGreen;">d</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">v</span><span style="color: MediumSeaGreen;">&gt;</span><span style="color: MediumSeaGreen;"><strong>{</strong></span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;"><strong>*</strong></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">c</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: MediumSeaGreen;"><strong>*</strong></span><span style="color: MediumSeaGreen;"><strong>/</strong></span><span style="color: MediumSeaGreen;"><strong>}</strong></span><span style="color: MediumSeaGreen;">&lt;</span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;">d</span><span style="color: MediumSeaGreen;">i</span><span style="color: MediumSeaGreen;">v</span><span style="color: MediumSeaGreen;">&gt;</span><span style="color: MediumSeaGreen;">;</span>
    <strong>2</strong> <strong>2</strong><strong> │ </strong>  
  
</code></pre>

```jsx
<div>/* comment */</div>;
```

<pre class="language-text"><code class="language-text">code-block.jsx:1:6 <a href="https://biomejs.dev/linter/rules/no-comment-text">lint/suspicious/noCommentText</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Wrap </span><span style="color: Tomato;"><strong>comments</strong></span><span style="color: Tomato;"> inside children within </span><span style="color: Tomato;"><strong>braces</strong></span><span style="color: Tomato;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;div&gt;/* comment */&lt;/div&gt;;
   <strong>   │ </strong>     <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Wrap the comments with braces</span>
  
<strong>  </strong><strong>  1 │ </strong>&lt;div&gt;<span style="color: MediumSeaGreen;">{</span>/*<span style="opacity: 0.8;">·</span>comment<span style="opacity: 0.8;">·</span>*/<span style="color: MediumSeaGreen;">}</span>&lt;/div&gt;;
<strong>  </strong><strong>    │ </strong>     <span style="color: MediumSeaGreen;">+</span>             <span style="color: MediumSeaGreen;">+</span>       
</code></pre>

```jsx
<div>/** comment */</div>;
```

<pre class="language-text"><code class="language-text">code-block.jsx:1:6 <a href="https://biomejs.dev/linter/rules/no-comment-text">lint/suspicious/noCommentText</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Wrap </span><span style="color: Tomato;"><strong>comments</strong></span><span style="color: Tomato;"> inside children within </span><span style="color: Tomato;"><strong>braces</strong></span><span style="color: Tomato;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;div&gt;/** comment */&lt;/div&gt;;
   <strong>   │ </strong>     <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Wrap the comments with braces</span>
  
<strong>  </strong><strong>  1 │ </strong>&lt;div&gt;<span style="color: MediumSeaGreen;">{</span>/**<span style="opacity: 0.8;">·</span>comment<span style="opacity: 0.8;">·</span>*/<span style="color: MediumSeaGreen;">}</span>&lt;/div&gt;;
<strong>  </strong><strong>    │ </strong>     <span style="color: MediumSeaGreen;">+</span>              <span style="color: MediumSeaGreen;">+</span>       
</code></pre>

```jsx
<div>text /* comment */</div>;
```

<pre class="language-text"><code class="language-text">code-block.jsx:1:11 <a href="https://biomejs.dev/linter/rules/no-comment-text">lint/suspicious/noCommentText</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Wrap </span><span style="color: Tomato;"><strong>comments</strong></span><span style="color: Tomato;"> inside children within </span><span style="color: Tomato;"><strong>braces</strong></span><span style="color: Tomato;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;div&gt;text /* comment */&lt;/div&gt;;
   <strong>   │ </strong>          <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Wrap the comments with braces</span>
  
<strong>  </strong><strong>  1 │ </strong>&lt;div&gt;text<span style="opacity: 0.8;">·</span><span style="color: MediumSeaGreen;">{</span>/*<span style="opacity: 0.8;">·</span>comment<span style="opacity: 0.8;">·</span>*/<span style="color: MediumSeaGreen;">}</span>&lt;/div&gt;;
<strong>  </strong><strong>    │ </strong>          <span style="color: MediumSeaGreen;">+</span>             <span style="color: MediumSeaGreen;">+</span>       
</code></pre>

```jsx
<div>/* comment */ text</div>;
```

<pre class="language-text"><code class="language-text">code-block.jsx:1:6 <a href="https://biomejs.dev/linter/rules/no-comment-text">lint/suspicious/noCommentText</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Wrap </span><span style="color: Tomato;"><strong>comments</strong></span><span style="color: Tomato;"> inside children within </span><span style="color: Tomato;"><strong>braces</strong></span><span style="color: Tomato;">.</span>
  
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>&lt;div&gt;/* comment */ text&lt;/div&gt;;
   <strong>   │ </strong>     <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>2 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Wrap the comments with braces</span>
  
<strong>  </strong><strong>  1 │ </strong>&lt;div&gt;<span style="color: MediumSeaGreen;">{</span>/*<span style="opacity: 0.8;">·</span>comment<span style="opacity: 0.8;">·</span>*/<span style="color: MediumSeaGreen;">}</span><span style="opacity: 0.8;">·</span>text&lt;/div&gt;;
<strong>  </strong><strong>    │ </strong>     <span style="color: MediumSeaGreen;">+</span>             <span style="color: MediumSeaGreen;">+</span>            
</code></pre>

```jsx
<div>
    text
    // comment
</div>;
```

<pre class="language-text"><code class="language-text">code-block.jsx:3:5 <a href="https://biomejs.dev/linter/rules/no-comment-text">lint/suspicious/noCommentText</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Wrap </span><span style="color: Tomato;"><strong>comments</strong></span><span style="color: Tomato;"> inside children within </span><span style="color: Tomato;"><strong>braces</strong></span><span style="color: Tomato;">.</span>
  
    <strong>1 │ </strong>&lt;div&gt;
    <strong>2 │ </strong>    text
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>3 │ </strong>    // comment
   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>4 │ </strong>&lt;/div&gt;;
    <strong>5 │ </strong>
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Wrap the comments with braces</span>
  
    <strong>1</strong> <strong>1</strong><strong> │ </strong>  &lt;div&gt;
    <strong>2</strong> <strong>2</strong><strong> │ </strong>      text
    <strong>3</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">/</span><span style="color: Tomato;"><strong>/</strong></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">c</span><span style="color: Tomato;">o</span><span style="color: Tomato;">m</span><span style="color: Tomato;">m</span><span style="color: Tomato;">e</span><span style="color: Tomato;">n</span><span style="color: Tomato;">t</span>
      <strong>3</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><strong>{</strong></span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;"><strong>*</strong></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">c</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: MediumSeaGreen;"><strong>*</strong></span><span style="color: MediumSeaGreen;"><strong>/</strong></span><span style="color: MediumSeaGreen;"><strong>}</strong></span>
    <strong>4</strong> <strong>4</strong><strong> │ </strong>  &lt;/div&gt;;
    <strong>5</strong> <strong>5</strong><strong> │ </strong>  
  
</code></pre>

```jsx
<div>
    // comment
   text
</div>;
```

<pre class="language-text"><code class="language-text">code-block.jsx:2:5 <a href="https://biomejs.dev/linter/rules/no-comment-text">lint/suspicious/noCommentText</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Wrap </span><span style="color: Tomato;"><strong>comments</strong></span><span style="color: Tomato;"> inside children within </span><span style="color: Tomato;"><strong>braces</strong></span><span style="color: Tomato;">.</span>
  
    <strong>1 │ </strong>&lt;div&gt;
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    // comment
   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>   text
    <strong>4 │ </strong>&lt;/div&gt;;
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Wrap the comments with braces</span>
  
    <strong>1</strong> <strong>1</strong><strong> │ </strong>  &lt;div&gt;
    <strong>2</strong>  <strong> │ </strong><span style="color: Tomato;">-</span> <span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">/</span><span style="color: Tomato;"><strong>/</strong></span><span style="color: Tomato;"><span style="opacity: 0.8;">·</span></span><span style="color: Tomato;">c</span><span style="color: Tomato;">o</span><span style="color: Tomato;">m</span><span style="color: Tomato;">m</span><span style="color: Tomato;">e</span><span style="color: Tomato;">n</span><span style="color: Tomato;">t</span>
      <strong>2</strong><strong> │ </strong><span style="color: MediumSeaGreen;">+</span> <span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;"><strong>{</strong></span><span style="color: MediumSeaGreen;">/</span><span style="color: MediumSeaGreen;"><strong>*</strong></span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;">·</span></span><span style="color: MediumSeaGreen;">c</span><span style="color: MediumSeaGreen;">o</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">m</span><span style="color: MediumSeaGreen;">e</span><span style="color: MediumSeaGreen;">n</span><span style="color: MediumSeaGreen;">t</span><span style="color: MediumSeaGreen;"><span style="opacity: 0.8;"><strong>·</strong></span></span><span style="color: MediumSeaGreen;"><strong>*</strong></span><span style="color: MediumSeaGreen;"><strong>/</strong></span><span style="color: MediumSeaGreen;"><strong>}</strong></span>
    <strong>3</strong> <strong>3</strong><strong> │ </strong>     text
    <strong>4</strong> <strong>4</strong><strong> │ </strong>  &lt;/div&gt;;
  
</code></pre>

```jsx
<div>
    /* comment */
    text
</div>;
```

<pre class="language-text"><code class="language-text">code-block.jsx:2:5 <a href="https://biomejs.dev/linter/rules/no-comment-text">lint/suspicious/noCommentText</a> <span style="color: #000; background-color: #ddd;"> FIXABLE </span> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Wrap </span><span style="color: Tomato;"><strong>comments</strong></span><span style="color: Tomato;"> inside children within </span><span style="color: Tomato;"><strong>braces</strong></span><span style="color: Tomato;">.</span>
  
    <strong>1 │ </strong>&lt;div&gt;
<strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>2 │ </strong>    /* comment */
   <strong>   │ </strong>    <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong>
    <strong>3 │ </strong>    text
    <strong>4 │ </strong>&lt;/div&gt;;
  
<strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Unsafe fix</span><span style="color: lightgreen;">: </span><span style="color: lightgreen;">Wrap the comments with braces</span>
  
<strong>  </strong><strong>  2 │ </strong><span style="opacity: 0.8;">·</span><span style="opacity: 0.8;">·</span><span style="opacity: 0.8;">·</span><span style="opacity: 0.8;">·</span><span style="color: MediumSeaGreen;">{</span>/*<span style="opacity: 0.8;">·</span>comment<span style="opacity: 0.8;">·</span>*/<span style="color: MediumSeaGreen;">}</span>
<strong>  </strong><strong>    │ </strong>    <span style="color: MediumSeaGreen;">+</span>             <span style="color: MediumSeaGreen;">+</span>
</code></pre>

### Valid

```jsx
<>
   <div>{/* comment */}</div>;
   <div>{/** comment */}</div>;
   <div className={"cls" /* comment */}></div>;
   <div>text {/* comment */}</div>;
   <div>{/* comment */} text</div>;
</>
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
