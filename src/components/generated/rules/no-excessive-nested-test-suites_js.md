**Since**: `v1.6.0`
:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
:::

Sources: 
- Same as: <a href="https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/max-nested-describe.md" target="_blank"><code>jest/max-nested-describe</code></a>

This rule enforces a maximum depth to nested `describe()` in test files.

To improve code clarity in your tests, the rule limits nested `describe` to 5.

## Examples

### Invalid

```js
describe('foo', () => {
  describe('bar', () => {
    describe('baz', () => {
      describe('qux', () => {
        describe('quxx', () => {
          describe('too many', () => {
            it('should get something', () => {
              expect(getSomething()).toBe('Something');
            });
          });
        });
      });
    });
  });
});
```

<pre class="language-text"><code class="language-text">code-block.js:6:11 <a href="https://biomejs.dev/linter/rules/no-excessive-nested-test-suites">lint/complexity/noExcessiveNestedTestSuites</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">✖</span></strong> <span style="color: Tomato;">Excessive `describe()` nesting detected.</span><br />  <br />     <strong>4 │ </strong>      describe('qux', () =&gt; {<br />     <strong>5 │ </strong>        describe('quxx', () =&gt; {<br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>6 │ </strong>          describe('too many', () =&gt; {<br />    <strong>   │ </strong>          <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>7 │ </strong>            it('should get something', () =&gt; {<br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>8 │ </strong>              expect(getSomething()).toBe('Something');<br />   <strong><span style="color: Tomato;">&gt;</span></strong> <strong>9 │ </strong>            });<br /><strong><span style="color: Tomato;">  </span></strong><strong><span style="color: Tomato;">&gt;</span></strong> <strong>10 │ </strong>          });<br />    <strong>   │ </strong>          <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>11 │ </strong>        });<br />    <strong>12 │ </strong>      });<br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Excessive nesting of </span><span style="color: lightgreen;"><strong>describe()</strong></span><span style="color: lightgreen;"> calls can hinder test readability.</span><br />  <br /><strong><span style="color: lightgreen;">  </span></strong><strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Consider refactoring and </span><span style="color: lightgreen;"><strong>reduce the level of nested describe</strong></span><span style="color: lightgreen;"> to improve code clarity.</span><br />  <br /></code></pre>

### Valid

```js
describe('foo', () => {
  describe('bar', () => {
    it('should get something', () => {
      expect(getSomething()).toBe('Something');
    });
  });
  describe('qux', () => {
    it('should get something', () => {
      expect(getSomething()).toBe('Something');
    });
  });
});
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
