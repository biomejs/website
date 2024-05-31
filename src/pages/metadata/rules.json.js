export function GET() {
	const schema = {
  "lints": {
    "languages": {
      "css": {
        "nursery": {
          "noDuplicateAtImportRules": {
            "deprecated": false,
            "version": "next",
            "name": "noDuplicateAtImportRules",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-at-import-rules",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "no-duplicate-at-import-rules"
              }
            ],
            "docs": " Disallow duplicate `@import` rules.\n\n This rule checks if the file urls of the @import rules are duplicates.\n\n This rule also checks the imported media queries and alerts of duplicates.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n @import 'a.css';\n @import 'a.css';\n ```\n\n ```css,expect_diagnostic\n @import \"a.css\";\n @import 'a.css';\n ```\n\n ```css,expect_diagnostic\n @import url('a.css');\n @import url('a.css');\n ```\n\n ### Valid\n\n ```css\n @import 'a.css';\n @import 'b.css';\n ```\n\n ```css\n @import url('a.css') tv;\n @import url('a.css') projection;\n ```\n\n"
          },
          "noDuplicateFontNames": {
            "deprecated": false,
            "version": "next",
            "name": "noDuplicateFontNames",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-font-names",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "font-family-no-duplicate-names"
              }
            ],
            "docs": " Disallow duplicate names within font families.\n\n This rule checks the `font` and `font-family` properties for duplicate font names.\n\n This rule ignores var(--custom-property) variable syntaxes now.\n\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a { font-family: \"Lucida Grande\", 'Arial', sans-serif, sans-serif; }\n ```\n\n ```css,expect_diagnostic\n a { font-family: 'Arial', \"Lucida Grande\", Arial, sans-serif; }\n ```\n\n ```css,expect_diagnostic\n a { FONT: italic 300 16px/30px Arial, \" Arial\", serif; }\n ```\n\n ### Valid\n\n ```css\n a { font-family: \"Lucida Grande\", \"Arial\", sans-serif; }\n ```\n\n ```css\n b { font: normal 14px/32px -apple-system, BlinkMacSystemFont, sans-serif; }\n ```\n"
          },
          "noDuplicateSelectorsKeyframeBlock": {
            "deprecated": false,
            "version": "next",
            "name": "noDuplicateSelectorsKeyframeBlock",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-selectors-keyframe-block",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "keyframe-block-no-duplicate-selectors"
              }
            ],
            "docs": " Disallow duplicate selectors within keyframe blocks.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n @keyframes foo { from {} from {} }\n ```\n\n ```css,expect_diagnostic\n @keyframes foo { from {} FROM {} }\n ```\n\n ```css,expect_diagnostic\n @keyframes foo { 0% {} 0% {} }\n ```\n\n ### Valid\n\n ```css\n @keyframes foo { 0% {} 100% {} }\n ```\n\n ```css\n @keyframes foo { from {} to {} }\n ```\n\n"
          },
          "noEmptyBlock": {
            "deprecated": false,
            "version": "next",
            "name": "noEmptyBlock",
            "link": "https://biomejs.dev/linter/rules/no-empty-block",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "no-empty-block"
              }
            ],
            "docs": " Disallow CSS empty blocks.\n\n By default, it will allow empty blocks with comments inside.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n p {}\n ```\n\n ```css,expect_diagnostic\n .b {}\n ```\n\n ```css,expect_diagnostic\n @media print { a {} }\n ```\n\n ### Valid\n\n ```css\n p {\n   color: red;\n }\n ```\n\n ```css\n p {\n   /* foo */\n }\n ```\n\n ```css\n @media print { a { color: pink; } }\n ```\n\n"
          },
          "noImportantInKeyframe": {
            "deprecated": false,
            "version": "next",
            "name": "noImportantInKeyframe",
            "link": "https://biomejs.dev/linter/rules/no-important-in-keyframe",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "keyframe-declaration-no-important"
              }
            ],
            "docs": " Disallow invalid `!important` within keyframe declarations\n\n Using `!important` within keyframes declarations is completely ignored in some browsers.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n @keyframes foo {\n     from {\n       opacity: 0;\n     }\n     to {\n       opacity: 1 !important;\n     }\n }\n ```\n\n ### Valid\n\n ```css\n @keyframes foo {\n     from {\n       opacity: 0;\n     }\n     to {\n       opacity: 1;\n     }\n }\n ```\n\n"
          },
          "noInvalidPositionAtImportRule": {
            "deprecated": false,
            "version": "next",
            "name": "noInvalidPositionAtImportRule",
            "link": "https://biomejs.dev/linter/rules/no-invalid-position-at-import-rule",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "no-invalid-position-at-import-rule"
              }
            ],
            "docs": " Disallow the use of `@import` at-rules in invalid positions.\n\n Any `@import` rules must precede all other valid at-rules and style rules in a stylesheet (ignoring `@charset` and `@layer`), or else the `@import` rule is invalid.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a {}\n @import 'foo.css';\n ```\n\n ### Valid\n\n ```css\n @import 'foo.css';\n a {}\n ```\n\n"
          },
          "noUnknownFunction": {
            "deprecated": false,
            "version": "next",
            "name": "noUnknownFunction",
            "link": "https://biomejs.dev/linter/rules/no-unknown-function",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "function-no-unknown"
              }
            ],
            "docs": " Disallow unknown CSS value functions.\n\n This rule ignores double-dashed custom functions, e.g. `--custom-function()`.\n\n Data sources of known CSS value functions are:\n - MDN reference on [CSS value functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions)\n - MDN reference on [CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)\n - MDN [browser compatibility data for CSS value functions](https://github.com/mdn/browser-compat-data/tree/main/css/types)\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a { transform: unknown(1); }\n ```\n\n ### Valid\n\n ```css\n a { transform: scale(1); }\n ```\n\n"
          },
          "noUnknownMediaFeatureName": {
            "deprecated": false,
            "version": "next",
            "name": "noUnknownMediaFeatureName",
            "link": "https://biomejs.dev/linter/rules/no-unknown-media-feature-name",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "media-feature-name-no-unknown"
              }
            ],
            "docs": " Disallow unknown media feature names.\n\n This rule considers media feature names defined in the CSS Specifications, up to and including Editor's Drafts, to be known.\n This rule also checks vendor-prefixed media feature names.\n\n Data sources of known CSS media feature are:\n - MDN reference on [CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)\n - W3C reference on [Media Queries Level 3](https://www.w3.org/TR/mediaqueries-3/)\n - W3C reference on [Media Queries Level 4](https://www.w3.org/TR/mediaqueries-4/)\n - W3C reference on [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/)\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n @media screen and (unknown > 320px) {}\n ```\n\n ```css,expect_diagnostic\n @media only screen and (min-width: 320px) and (max-width: 480px) and (unknown: 150dpi) {}\n ```\n\n ```css,expect_diagnostic\n @media (not(unknown < 320px)) and (max-width > 640px) {}\n ```\n\n ```css,expect_diagnostic\n @media (400px <= unknown <= 700px) {}\n ```\n\n ### Valid\n\n ```css\n @media screen and (width > 320px) {}\n ```\n\n ```css\n @media only screen and (min-width: 320px) and (max-width: 480px) and (resolution: 150dpi) {}\n ```\n\n ```css\n @media (not(min-width < 320px)) and (max-width > 640px) {}\n ```\n\n ```css\n @media (400px <= width <= 700px) {}\n ```\n\n ```css\n @media screen and (-webkit-width > 320px) {}\n ```\n\n"
          },
          "noUnknownProperty": {
            "deprecated": false,
            "version": "next",
            "name": "noUnknownProperty",
            "link": "https://biomejs.dev/linter/rules/no-unknown-property",
            "recommended": false,
            "fixKind": "none",
            "docs": " Disallow unknown properties.\n\n This rule considers properties defined in the CSS Specifications and browser specific properties to be known.\n https://github.com/known-css/known-css-properties#source\n\n\n This rule ignores:\n\n - custom variables e.g. `--custom-property`\n - vendor-prefixed properties (e.g., `-moz-align-self,` `-webkit-align-self`)\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a {\n   colr: blue;\n }\n ```\n\n ```css,expect_diagnostic\n a {\n   my-property: 1;\n }\n ```\n\n ### Valid\n\n ```css\n a {\n   color: green;\n }\n ```\n\n ```css\n a {\n   fill: black;\n }\n ```\n\n ```css\n a {\n   -moz-align-self: center;\n }\n ```\n\n"
          },
          "noUnknownSelectorPseudoElement": {
            "deprecated": false,
            "version": "next",
            "name": "noUnknownSelectorPseudoElement",
            "link": "https://biomejs.dev/linter/rules/no-unknown-selector-pseudo-element",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "selector-pseudo-element-no-unknown"
              }
            ],
            "docs": " Disallow unknown pseudo-element selectors.\n\n For details on known CSS pseudo-elements, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#list_of_pseudo-elements).\n\n This rule ignores vendor-prefixed pseudo-element selectors.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a::pseudo {}\n ```\n\n ```css,expect_diagnostic\n a::PSEUDO {}\n ```\n\n ```css,expect_diagnostic\n a::element {}\n ```\n\n ### Valid\n\n ```css\n a:before {}\n ```\n\n ```css\n a::before {}\n ```\n\n ```css\n ::selection {}\n ```\n\n ```css\n input::-moz-placeholder {}\n ```\n\n"
          },
          "noUnknownUnit": {
            "deprecated": false,
            "version": "next",
            "name": "noUnknownUnit",
            "link": "https://biomejs.dev/linter/rules/no-unknown-unit",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "unit-no-unknown"
              }
            ],
            "docs": " Disallow unknown CSS units.\n\n For details on known CSS units, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths).\n\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a {\n   width: 10pixels;\n }\n ```\n\n ```css,expect_diagnostic\n a {\n   width: calc(10px + 10pixels);\n }\n ```\n\n ### Valid\n\n ```css\n a {\n   width: 10px;\n }\n ```\n\n ```css\n a {\n   width: 10Px;\n }\n ```\n\n ```css\n a {\n   width: 10pX;\n }\n ```\n\n ```css\n a {\n   width: calc(10px + 10px);\n }\n ```\n\n"
          },
          "noUnmatchableAnbSelector": {
            "deprecated": false,
            "version": "next",
            "name": "noUnmatchableAnbSelector",
            "link": "https://biomejs.dev/linter/rules/no-unmatchable-anb-selector",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "selector-anb-no-unmatchable"
              }
            ],
            "docs": " Disallow unmatchable An+B selectors.\n\n Selectors that always evaluate to 0 will not match any elements.\n For more details about the An+B syntax, see:\n https://www.w3.org/TR/css-syntax-3/#anb-microsyntax\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a:nth-child(0) {}\n ```\n\n ```css,expect_diagnostic\n a:nth-last-child(0n) {}\n ```\n\n ```css,expect_diagnostic\n a:nth-of-type(0n+0) {}\n ```\n\n ```css,expect_diagnostic\n a:nth-last-of-type(0 of a) {}\n ```\n\n ### Valid\n\n ```css\n a:nth-child(1) {}\n ```\n\n ```css\n a:nth-last-child(1n) {}\n ```\n\n ```css\n a:nth-of-type(1n+0) {}\n ```\n\n ```css\n a:nth-last-of-type(1 of a) {}\n ```\n\n"
          },
          "useGenericFontNames": {
            "deprecated": false,
            "version": "next",
            "name": "useGenericFontNames",
            "link": "https://biomejs.dev/linter/rules/use-generic-font-names",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "stylelint": "font-family-no-missing-generic-family-keyword"
              }
            ],
            "docs": " Disallow a missing generic family keyword within font families.\n\n The generic font family can be:\n - placed anywhere in the font family list\n - omitted if a keyword related to property inheritance or a system font is used\n\n This rule checks the font and font-family properties.\n The following special situations are ignored:\n - Property with a keyword value such as `inherit`, `initial`.\n - The last value being a CSS variable.\n - `font-family` property in an `@font-face` rule.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a { font-family: Arial; }\n ```\n\n ```css,expect_diagnostic\n a { font: normal 14px/32px -apple-system, BlinkMacSystemFont; }\n ```\n\n ### Valid\n\n ```css\n a { font-family: \"Lucida Grande\", \"Arial\", sans-serif; }\n ```\n\n ```css\n a { font-family: inherit; }\n ```\n\n ```css\n a { font-family: sans-serif; }\n ```\n\n ```css\n a { font-family: var(--font); }\n ```\n\n ```css\n @font-face { font-family: Gentium; }\n ```\n\n"
          }
        }
      },
      "js": {
        "complexity": {
          "noExcessiveCognitiveComplexity": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noExcessiveCognitiveComplexity",
            "link": "https://biomejs.dev/linter/rules/no-excessive-cognitive-complexity",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintSonarJs": "cognitive-complexity"
              }
            ],
            "docs": " Disallow functions that exceed a given Cognitive Complexity score.\n\n The more complexity a function contains, the harder it is to understand\n later on.\n\n Reducing complexity helps to make code more maintenable, both by making\n it easier to understand as well as by reducing chances of accidental\n side-effects when making changes.\n\n This rule calculates a complexity score for every function and disallows\n those that exceed a configured complexity threshold (default: 15).\n\n The complexity score is calculated based on the Cognitive Complexity\n algorithm: https://redirect.sonarsource.com/doc/cognitive-complexity.html\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function tooComplex() {\n     for (let x = 0; x < 10; x++) {\n         for (let y = 0; y < 10; y++) {\n             for (let z = 0; z < 10; z++) {\n                 if (x % 2 === 0) {\n                     if (y % 2 === 0) {\n                         console.log(x > y ? `${x} > ${y}` : `${y} > ${x}`);\n                     }\n                 }\n             }\n         }\n     }\n }\n ```\n\n ## Options\n\n Allows to specify the maximum allowed complexity.\n\n ```json\n {\n     \"//\": \"...\",\n     \"options\": {\n         \"maxAllowedComplexity\": 15\n     }\n }\n ```\n\n The allowed values range from 1 through 254. The default is 15.\n\n"
          },
          "noExcessiveNestedTestSuites": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noExcessiveNestedTestSuites",
            "link": "https://biomejs.dev/linter/rules/no-excessive-nested-test-suites",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJest": "max-nested-describe"
              }
            ],
            "sourceKind": "sameLogic",
            "docs": " This rule enforces a maximum depth to nested `describe()` in test files.\n\n To improve code clarity in your tests, the rule limits nested `describe` to 5.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n describe('foo', () => {\n   describe('bar', () => {\n     describe('baz', () => {\n       describe('qux', () => {\n         describe('quxx', () => {\n           describe('too many', () => {\n             it('should get something', () => {\n               expect(getSomething()).toBe('Something');\n             });\n           });\n         });\n       });\n     });\n   });\n });\n ```\n\n ### Valid\n\n ```js\n describe('foo', () => {\n   describe('bar', () => {\n     it('should get something', () => {\n       expect(getSomething()).toBe('Something');\n     });\n   });\n   describe('qux', () => {\n     it('should get something', () => {\n       expect(getSomething()).toBe('Something');\n     });\n   });\n });\n ```\n\n"
          },
          "noExtraBooleanCast": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noExtraBooleanCast",
            "link": "https://biomejs.dev/linter/rules/no-extra-boolean-cast",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-extra-boolean-cast"
              }
            ],
            "docs": " Disallow unnecessary boolean casts\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (!Boolean(foo)) {\n }\n ```\n\n ```js,expect_diagnostic\n while (!!foo) {}\n ```\n\n ```js,expect_diagnostic\n let x = 1;\n do {\n 1 + 1;\n } while (Boolean(x));\n ```\n\n ```js,expect_diagnostic\n for (; !!foo; ) {}\n ```\n\n ```js,expect_diagnostic\n new Boolean(!!x);\n ```\n\n ### Valid\n ```js\n Boolean(!x);\n !x;\n !!x;\n ```\n"
          },
          "noForEach": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noForEach",
            "link": "https://biomejs.dev/linter/rules/no-for-each",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintUnicorn": "no-array-for-each"
              },
              {
                "clippy": "needless_for_each"
              }
            ],
            "docs": " Prefer `for...of` statement instead of `Array.forEach`.\n\n Here's a summary of why `forEach` may be disallowed, and why `for...of` is preferred for almost any use-case of `forEach`:\n - Performance: Using `forEach` can lead to performance issues, especially when working with large arrays.\n When more requirements are added on, `forEach` typically gets chained with other methods like `filter` or `map`, causing multiple iterations over the same Array.\n Encouraging for loops discourages chaining and encourages single-iteration logic (e.g. using a continue instead of `filter`).\n\n - Readability: While `forEach` is a simple and concise way to iterate over an array, it can make the code less readable, especially when the callback function is complex.\n In contrast, using a for loop or a `for...of` loop can make the code more explicit and easier to read.\n\n - Debugging: `forEach` can make debugging more difficult, because it hides the iteration process.\n\n ## Caveat\n\n We consider all objects with a method named `forEach` to be iterable.\n This way, this rule applies to all objects with a method called `forEach`, not just `Array` instances.\n\n ## Exception for Index Usage\n\n When the index is explicitly used in the `forEach` callback, it is acceptable to use `forEach`. This is because:\n - The index is directly available as the second argument in `forEach`, making it convenient for scenarios where the index is necessary.\n - In sparse arrays, `forEach` will skip undefined entries, which differs from the behavior of `for...of` with `Object.entries` that includes these entries.\n   This can be important for certain array operations, particularly in TypeScript environments with strict type checking.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n els.forEach((el) => {\n   f(el);\n })\n ```\n\n ```js,expect_diagnostic\n els[\"forEach\"](el => {\n   f(el);\n })\n ```\n\n ### Valid\n\n ```js\n els.forEach((el, i) => {\n   f(el, i)\n })\n ```\n\n ```js\n for (const el of els) {\n   f(el);\n }\n ```\n\n"
          },
          "noMultipleSpacesInRegularExpressionLiterals": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noMultipleSpacesInRegularExpressionLiterals",
            "link": "https://biomejs.dev/linter/rules/no-multiple-spaces-in-regular-expression-literals",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "no-regex-spaces"
              }
            ],
            "docs": " Disallow unclear usage of consecutive space characters in regular expression literals\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n /   /\n ```\n\n ```js,expect_diagnostic\n /foo  */\n ```\n\n ```js,expect_diagnostic\n /foo  {2,}bar   {3,5}baz/\n ```\n\n ```js,expect_diagnostic\n /foo [ba]r  b(a|z)/\n ```\n\n ### Valid\n\n ```js\n /foo {2}bar/\n```\n\n ```js\n / foo bar baz /\n```\n\n ```js\n /foo bar\tbaz/\n```\n"
          },
          "noStaticOnlyClass": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noStaticOnlyClass",
            "link": "https://biomejs.dev/linter/rules/no-static-only-class",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintTypeScript": "no-extraneous-class"
              },
              {
                "eslintUnicorn": "no-static-only-class"
              }
            ],
            "docs": " This rule reports when a class has no non-static members, such as for a class used exclusively as a static namespace.\n\n Users who come from a [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming) paradigm may wrap their utility functions in an extra class,\n instead of putting them at the top level of an ECMAScript module. Doing so is generally unnecessary in JavaScript and TypeScript projects.\n\n - Wrapper classes add extra cognitive complexity to code without adding any structural improvements\n \t- Whatever would be put on them, such as utility functions, are already organized by virtue of being in a module.\n \t- As an alternative, you can import * as ... the module to get all of them in a single object.\n - IDEs can't provide as good suggestions for static class or namespace imported properties when you start typing property names\n - It's more difficult to statically analyze code for unused variables, etc. when they're all on the class (see: [Finding dead code (and dead types) in TypeScript](https://effectivetypescript.com/2020/10/20/tsprune)).\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class X {\n   static foo = false;\n   static bar() {};\n }\n ```\n ```js,expect_diagnostic\n class StaticConstants {\n   static readonly version = 42;\n\n   static isProduction() {\n     return process.env.NODE_ENV === 'production';\n   }\n }\n ```\n\n ### Valid\n\n ```js\n const X = {\n   foo: false,\n   bar() {}\n };\n ```\n ```js\n export const version = 42;\n\n export function isProduction() {\n   return process.env.NODE_ENV === 'production';\n }\n\n function logHelloWorld() {\n   console.log('Hello, world!');\n }\n ```\n ```js\n class Empty {}\n ```\n\n ## Notes on Mutating Variables\n One case you need to be careful of is exporting mutable variables. While class properties can be mutated externally, exported variables are always constant. This means that importers can only ever read the first value they are assigned and cannot write to the variables.\n\n Needing to write to an exported variable is very rare and is generally considered a code smell. If you do need it you can accomplish it using getter and setter functions:\n ```js,expect_diagnostic\n export class Utilities {\n   static mutableCount = 1;\n   static incrementCount() {\n     Utilities.mutableCount += 1;\n   }\n }\n ```\n\n Do this instead:\n ```js\n let mutableCount = 1;\n\n export function getMutableCount() {\n   return mutableField;\n }\n\n export function incrementCount() {\n   mutableField += 1;\n }\n ```\n"
          },
          "noThisInStatic": {
            "deprecated": false,
            "version": "1.3.1",
            "name": "noThisInStatic",
            "link": "https://biomejs.dev/linter/rules/no-this-in-static",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintMysticatea": "no-this-in-static"
              }
            ],
            "docs": " Disallow `this` and `super` in `static` contexts.\n\n In JavaScript, the `this` keyword in static contexts refers to the class (the constructor) instance,\n not an instance of the class. This can be confusing for developers coming from other languages where\n `this` typically refers to an instance of the class, not the class itself.\n\n Similarly, `super` in static contexts refers to the parent class, not an instance of the class.\n This can lead to unexpected behavior if not properly understood.\n\n This rule enforces the use of the class name itself to access static methods,\n which can make the code clearer and less prone to errors. It helps to prevent\n misunderstandings and bugs that can arise from the unique behavior of `this` and `super` in static contexts.\n\n ## Example\n\n ### Invalid\n\n ```js,expect_diagnostic\n  class A {\n     static CONSTANT = 0;\n\n     static foo() {\n         this.CONSTANT;\n     }\n  }\n ```\n\n ```js,expect_diagnostic\n  class B extends A {\n     static bar() {\n         super.CONSTANT;\n     }\n  }\n ```\n\n ### Valid\n\n ```js\n class B extends A {\n     static ANOTHER_CONSTANT = A.CONSTANT + 1;\n\n     static foo() {\n         A.CONSTANT;\n         B.ANOTHER_CONSTANT;\n     }\n\n     bar() {\n         this.property;\n     }\n }\n ```\n\n ```js\n class A {\n    static foo() {\n        doSomething()\n    }\n\n    bar() {\n      A.foo()\n    }\n }\n ```\n\n"
          },
          "noUselessCatch": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUselessCatch",
            "link": "https://biomejs.dev/linter/rules/no-useless-catch",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-useless-catch"
              }
            ],
            "docs": " Disallow unnecessary `catch` clauses.\n\n A `catch` clause that only rethrows the original error is redundant,\n and has no effect on the runtime behavior of the program.\n These redundant clauses can be a source of confusion and code bloat,\n so it’s better to disallow these unnecessary `catch` clauses.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n try {\n     doSomething();\n } catch(e) {\n     throw e;\n }\n ```\n ```js,expect_diagnostic\n try {\n     doSomething();\n } catch(e) {\n     throw e;\n } finally {\n     doCleanUp();\n }\n ```\n ### Valid\n\n ```js\n try {\n     doSomething();\n } catch(e) {\n     doSomethingWhenCatch();\n     throw e;\n }\n ```\n\n ```js\n try {\n     doSomething();\n } catch(e) {\n     handleError(e);\n }\n ```\n\n"
          },
          "noUselessConstructor": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUselessConstructor",
            "link": "https://biomejs.dev/linter/rules/no-useless-constructor",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-useless-constructor"
              },
              {
                "eslintTypeScript": "no-useless-constructor"
              }
            ],
            "docs": " Disallow unnecessary constructors.\n\n _ES2015_ provides a default class constructor if one is not specified.\n As such, providing an empty constructor or one that delegates into its parent is unnecessary.\n\n The rule ignores:\n\n - decorated classes;\n - constructors with at least one [parameter property](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties);\n - `private` and `protected` constructors.\n\n ## Caveat\n\n This rule reports on constructors whose sole purpose is to make a parent constructor public.\n See the last invalid example.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A {\n     constructor (a) {}\n }\n ```\n\n ```ts,expect_diagnostic\n class B extends A {\n     constructor (a) {\n         super(a);\n     }\n }\n ```\n\n ```js,expect_diagnostic\n class C {\n     /**\n      * Documented constructor.\n      */\n     constructor () {}\n }\n ```\n\n ```js,expect_diagnostic\n class A {\n     protected constructor() {\n         this.prop = 1;\n     }\n }\n\n class B extends A {\n     // Make the parent constructor public.\n     constructor () {\n         super();\n     }\n }\n ```\n\n ### Valid\n\n ```js\n class A {\n     constructor (prop) {\n         this.prop = prop;\n     }\n }\n ```\n\n ```js\n class B extends A {\n     constructor () {\n         super(5);\n     }\n }\n ```\n\n ```ts\n class C {\n     // Empty constructor with parameter properties are allowed.\n     constructor (private prop: number) {}\n }\n ```\n\n ```ts\n class D {\n   constructor(public arg: number){}\n }\n\n class F extends D {\n   // constructor with default parameters are allowed.\n   constructor(arg = 4) {\n     super(arg)\n   }\n }\n ```\n\n ```ts\n @Decorator\n class C {\n     constructor (prop: number) {}\n }\n ```\n"
          },
          "noUselessLabel": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUselessLabel",
            "link": "https://biomejs.dev/linter/rules/no-useless-label",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "no-extra-label"
              }
            ],
            "docs": " Disallow unnecessary labels.\n\n If a loop contains no nested loops or switches, labeling the loop is unnecessary.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n loop: while(a) {\n     break loop;\n }\n ```\n\n ### Valid\n\n ```js\n outer: while(a) {\n     while(b) {\n         break outer;\n     }\n }\n ```\n\n"
          },
          "noUselessLoneBlockStatements": {
            "deprecated": false,
            "version": "1.3.3",
            "name": "noUselessLoneBlockStatements",
            "link": "https://biomejs.dev/linter/rules/no-useless-lone-block-statements",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "no-lone-blocks"
              }
            ],
            "docs": " Disallow unnecessary nested block statements.\n\n > In JavaScript, prior to ES6, standalone code blocks delimited by curly braces do not create a new scope and have no use.\n > In ES6, code blocks may create a new scope if a block-level binding (let and const), a class declaration or a function declaration (in strict mode) are present. A block is not considered redundant in these cases.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n {}\n ```\n\n ```js,expect_diagnostic\n if (foo) {\n   bar();\n   {\n     baz();\n   }\n }\n ```\n\n ### Valid\n\n ```js\n while (foo) {\n   bar();\n }\n ```\n\n"
          },
          "noUselessRename": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUselessRename",
            "link": "https://biomejs.dev/linter/rules/no-useless-rename",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "no-useless-rename"
              }
            ],
            "docs": " Disallow renaming import, export, and destructured assignments to the same name.\n\n ES2015 allows for the renaming of references in import and export statements as well as destructuring assignments.\n This gives programmers a concise syntax for performing these operations while renaming these references:\n\n ```js\n import { foo as bar } from \"baz\";\n export { foo as bar };\n let { foo: bar } = baz;\n ```\n\n With this syntax, it is possible to rename a reference to the same name.\n This is a completely redundant operation, as this is the same as not renaming at all.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import { foo as foo } from \"bar\";\n ```\n\n ```js,expect_diagnostic\n export { foo as foo };\n ```\n\n ```js,expect_diagnostic\n let { foo: foo } = bar;\n ```\n\n ### Valid\n\n ```js\n import { foo as bar } from \"baz\";\n ```\n\n ```js\n export { foo as bar };\n ```\n\n ```js\n let { foo: bar } = baz;\n ```\n\n"
          },
          "noUselessSwitchCase": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUselessSwitchCase",
            "link": "https://biomejs.dev/linter/rules/no-useless-switch-case",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintUnicorn": "no-useless-switch-case"
              }
            ],
            "docs": " Disallow useless `case` in `switch` statements.\n\n A `switch` statement can optionally have a `default` clause.\n\n The `default` clause will be still executed only if there is no match in the `case` clauses.\n An empty `case` clause that precedes the `default` clause is thus useless.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n switch (foo) {\n     case 0:\n     default:\n         break;\n     case 1:\n         break;\n }\n ```\n\n ```js,expect_diagnostic\n switch (foo) {\n     default:\n     case 0:\n         break;\n     case 1:\n         break;\n }\n ```\n\n ### Valid\n\n ```js\n switch (foo) {\n     case 0:\n         break;\n     default:\n         break;\n }\n ```\n\n ```js\n switch (foo) {\n     case 0:\n         break;\n }\n ```\n\n"
          },
          "noUselessTernary": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "noUselessTernary",
            "link": "https://biomejs.dev/linter/rules/no-useless-ternary",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-unneeded-ternary"
              }
            ],
            "docs": " Disallow ternary operators when simpler alternatives exist.\n\n It’s a common mistake in JavaScript to use a conditional expression to select between two\n boolean values instead of using the logical NOT (`!`) or double NOT (`!!`) to convert the test to a boolean.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var a = x ? true : true;\n ```\n\n ```js,expect_diagnostic\n var a = foo === 1 ? false : true;\n ```\n\n ```js,expect_diagnostic\n var a = foo + 1 ? false : true;\n ```\n\n ```js,expect_diagnostic\n var a = foo + 1 ? true : false;\n ```\n\n ### Valid\n\n ```js\n var a = x === 2 ? 'Yes' : 'No';\n ```\n\n ```js\n var a = x === 2 ? 'Yes' : false;\n ```\n\n ## Resources\n\n Logical NOT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT\n\n"
          },
          "noVoid": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noVoid",
            "link": "https://biomejs.dev/linter/rules/no-void",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-void"
              }
            ],
            "docs": " Disallow the use of `void` operators, which is not a familiar operator.\n\n > The `void` operator is often used merely to obtain the undefined primitive value,\n > usually using `void(0)` (which is equivalent to `void 0`). In these cases, the global variable `undefined` can be used.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n void 0;\n ```\n\n"
          },
          "noWith": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noWith",
            "link": "https://biomejs.dev/linter/rules/no-with",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-with"
              }
            ],
            "docs": " Disallow `with` statements in non-strict contexts.\n\n The `with` statement is potentially problematic because it adds members of an object to the current\n scope, making it impossible to tell what a variable inside the block actually refers to.\n\n ## Examples\n\n ### Invalid\n\n ```cjs,expect_diagnostic\n function f() {\n   with (point) {\n     r = Math.sqrt(x * x + y * y); // is r a member of point?\n   }\n }\n ```\n"
          },
          "useArrowFunction": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useArrowFunction",
            "link": "https://biomejs.dev/linter/rules/use-arrow-function",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "prefer-arrow-callback"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Use arrow functions over function expressions.\n\n An arrow function expression is a compact alternative to a regular function expression,\n with an important distinction:\n `this` is not bound to the arrow function. It inherits `this` from its parent scope.\n\n This rule proposes turning all function expressions that are not generators (`function*`) and don't use `this` into arrow functions.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const z = function() {\n     return 0;\n }\n ```\n\n ```js,expect_diagnostic\n const delegatedFetch = async function(url) {\n     return await fetch(url);\n }\n ```\n\n ### Valid\n\n ```js\n const f = function() {\n     return this.prop;\n }\n ```\n\n Named function expressions are ignored:\n\n ```js\n const z = function z() {\n     return 0;\n }\n ```\n\n Function expressions that declare the type of `this` are  also ignored:\n\n ```ts\n const z = function(this: A): number {\n     return 0;\n }\n ```\n"
          },
          "useFlatMap": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useFlatMap",
            "link": "https://biomejs.dev/linter/rules/use-flat-map",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintUnicorn": "prefer-array-flat-map"
              },
              {
                "clippy": "map_flatten"
              }
            ],
            "docs": " Promotes the use of `.flatMap()` when `map().flat()` are used together.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const array = [\"split\", \"the text\", \"into words\"];\n array.map(sentence => sentence.split(' ')).flat();\n ```\n\n ```js,expect_diagnostic\n const array = [\"split\", \"the text\", \"into words\"];\n array.map(sentence => sentence.split(' ')).flat(1);\n ```\n\n ### Valid\n\n ```js\n const array = [\"split\", \"the text\", \"into words\"];\n array.map(sentence => sentence.split(' ')).flat(2);\n ```\n\n"
          },
          "useLiteralKeys": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useLiteralKeys",
            "link": "https://biomejs.dev/linter/rules/use-literal-keys",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "dot-notation"
              },
              {
                "eslintTypeScript": "dot-notation"
              }
            ],
            "docs": " Enforce the usage of a literal access to properties over computed property access.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n a.b[\"c\"];\n ```\n\n ```js,expect_diagnostic\n a.c[`d`]\n ```\n\n ```js,expect_diagnostic\n a.c[`d`] = \"something\"\n ```\n\n ```js,expect_diagnostic\n a = {\n \t['b']: d\n }\n ```\n\n ### Valid\n\n ```js\n a[\"c\" + \"d\"];\n a[d.c];\n ```\n\n"
          },
          "useRegexLiterals": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "useRegexLiterals",
            "link": "https://biomejs.dev/linter/rules/use-regex-literals",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "prefer-regex-literals"
              }
            ],
            "docs": " Enforce the use of the regular expression literals instead of the RegExp constructor if possible.\n\n There are two ways to create a regular expression:\n - Regular expression literals, e.g., `/abc/u`.\n - The RegExp constructor function, e.g., `new RegExp(\"abc\", \"u\")` .\n\n The constructor function is particularly useful when you want to dynamically generate the pattern,\n because it takes string arguments.\n\n Using regular expression literals avoids some escaping required in a string literal,\n and are easier to analyze statically.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n new RegExp(\"abc\", \"u\");\n ```\n\n ### Valid\n\n ```js\n /abc/u;\n\n new RegExp(\"abc\", flags);\n ```\n\n"
          },
          "useSimpleNumberKeys": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useSimpleNumberKeys",
            "link": "https://biomejs.dev/linter/rules/use-simple-number-keys",
            "recommended": true,
            "fixKind": "safe",
            "docs": " Disallow number literal object member names which are not base10 or uses underscore as separator\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n ({ 0x1: 1 });\n ```\n ```js,expect_diagnostic\n ({ 11_1.11: \"ee\" });\n ```\n ```js,expect_diagnostic\n ({ 0o1: 1 });\n ```\n ```js,expect_diagnostic\n ({ 1n: 1 });\n ```\n ```js,expect_diagnostic\n ({ 11_1.11: \"ee\" });\n ```\n\n ### Valid\n\n ```js\n ({ 0: \"zero\" });\n ({ 122: \"integer\" });\n ({ 1.22: \"floating point\" });\n ({ 3.1e12: \"floating point with e\" });\n ```\n\n"
          },
          "useSimplifiedLogicExpression": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useSimplifiedLogicExpression",
            "link": "https://biomejs.dev/linter/rules/use-simplified-logic-expression",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Discard redundant terms from logical expressions.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const boolExp = true;\n const r = true && boolExp;\n ```\n\n ```js,expect_diagnostic\n const boolExp2 = true;\n const r2 = boolExp || true;\n ```\n\n ```js,expect_diagnostic\n const nonNullExp = 123;\n const r3 = null ?? nonNullExp;\n ```\n\n ```js,expect_diagnostic\n const boolExpr1 = true;\n const boolExpr2 = false;\n const r4 = !boolExpr1 || !boolExpr2;\n ```\n\n ### Valid\n ```js\n const boolExpr3 = true;\n const boolExpr4 = false;\n const r5 = !(boolExpr1 && boolExpr2);\n const boolExpr5 = true;\n const boolExpr6 = false;\n ```\n\n"
          }
        },
        "correctness": {
          "noConstAssign": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noConstAssign",
            "link": "https://biomejs.dev/linter/rules/no-const-assign",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-const-assign"
              }
            ],
            "docs": " Prevents from having `const` variables being re-assigned.\n\n Trying to assign a value to a `const` will cause an `TypeError` when the code is executed.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const a = 1;\n a = 4;\n ```\n\n ```js,expect_diagnostic\n const a = 2;\n a += 1;\n ```\n\n ```js,expect_diagnostic\n const a = 1;\n ++a;\n ```\n\n ```js,expect_diagnostic\n const a = 1, b = 2;\n\n a = 2;\n ```\n\n ### Valid\n\n ```js\n const a = 10;\n let b = 10;\n b = 20;\n ```\n\n"
          },
          "noConstantCondition": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noConstantCondition",
            "link": "https://biomejs.dev/linter/rules/no-constant-condition",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-constant-condition"
              }
            ],
            "docs": " Disallow constant expressions in conditions\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (false) {\n     doSomethingUnfinished();\n }\n ```\n\n ```js,expect_diagnostic\n if (Boolean(1)) {\n     doSomethingAlways();\n }\n ```\n\n ```js,expect_diagnostic\n if (undefined) {\n     doSomethingUnfinished();\n }\n ```\n\n ```js,expect_diagnostic\n for (;-2;) {\n     doSomethingForever();\n }\n ```\n\n ```js,expect_diagnostic\n while (typeof x) {\n     doSomethingForever();\n }\n ```\n\n ```js,expect_diagnostic\n var result = 0 ? a : b;\n ```\n\n ### Valid\n\n ```js\n if (x === 0) {\n     doSomething();\n }\n\n for (;;) {\n     doSomethingForever();\n }\n\n while (typeof x === \"undefined\") {\n     doSomething();\n }\n\n do {\n     doSomething();\n } while (x);\n\n var result = x !== 0 ? a : b;\n\n // Exception\n while (true) {\n     if (x) { break; }\n     x = f();\n }\n ```\n\n"
          },
          "noConstructorReturn": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noConstructorReturn",
            "link": "https://biomejs.dev/linter/rules/no-constructor-return",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-constructor-return"
              }
            ],
            "docs": " Disallow returning a value from a `constructor`.\n\n Returning a value from a `constructor` of a class is a possible error.\n Forbidding this pattern prevents errors resulting from unfamiliarity with JavaScript or a copy-paste error.\n\n Only returning without a value is allowed, as it’s a control flow statement.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A {\n     constructor() {\n         return 0;\n     }\n }\n ```\n\n ### Valid\n\n ```js\n class A {\n     constructor() {}\n }\n ```\n\n ```js\n class B {\n     constructor(x) {\n         return;\n     }\n }\n ```\n\n"
          },
          "noEmptyCharacterClassInRegex": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noEmptyCharacterClassInRegex",
            "link": "https://biomejs.dev/linter/rules/no-empty-character-class-in-regex",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-empty-character-class"
              }
            ],
            "docs": " Disallow empty character classes in regular expression literals.\n\n Empty character classes don't match anything.\n In contrast, negated empty classes match any character.\n They are often the result of a typing mistake.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n /^a[]/.test(\"a\"); // false\n ```\n\n ```js,expect_diagnostic\n /^a[^]/.test(\"ax\"); // true\n ```\n\n ### Valid\n\n ```js\n /^a[xy]/.test(\"ay\"); // true\n ```\n\n ```js\n /^a[^xy]/.test(\"ab\"); // true\n ```\n\n ```js\n /^a\\[]/.test(\"a[]\"); // true\n ```\n\n"
          },
          "noEmptyPattern": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noEmptyPattern",
            "link": "https://biomejs.dev/linter/rules/no-empty-pattern",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-empty-pattern"
              }
            ],
            "docs": " Disallows empty destructuring patterns.\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var {} = foo;\n ```\n\n ```js,expect_diagnostic\n var {a: {}} = foo;\n ```\n\n ```js,expect_diagnostic\n function foo({}) {}\n ```\n\n ### Valid\n The following cases are valid because they create new bindings.\n\n ```js\n var {a = {}} = foo;\n var {a, b = {}} = foo;\n var {a = []} = foo;\n function foo({a = {}}) {}\n function foo({a = []}) {}\n var [a] = foo;\n ```\n"
          },
          "noGlobalObjectCalls": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noGlobalObjectCalls",
            "link": "https://biomejs.dev/linter/rules/no-global-object-calls",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-obj-calls"
              }
            ],
            "docs": " Disallow calling global object properties as functions\n\n ECMAScript provides several global objects that are intended to be used as-is.\n Some of these objects look as if they could be constructors due their capitalization (such as Math and JSON) but will throw an error if you try to execute them as functions.\n\n The ECMAScript 5 specification makes it clear that both Math and JSON cannot be invoked:\n The Math object does not have a [[Call]] internal property; it is not possible to invoke the Math object as a function.\n\n The ECMAScript 2015 specification makes it clear that Reflect cannot be invoked:\n The Reflect object also does not have a [[Call]] internal method; it is not possible to invoke the Reflect object as a function.\n\n The ECMAScript 2017 specification makes it clear that Atomics cannot be invoked:\n The Atomics object does not have a [[Call]] internal method; it is not possible to invoke the Atomics object as a function.\n\n And the ECMAScript Internationalization API Specification makes it clear that Intl cannot be invoked:\n The Intl object does not have a [[Call]] internal method; it is not possible to invoke the Intl object as a function.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var math = Math();\n ```\n\n ```js,expect_diagnostic\n var newMath = new Math();\n ```\n\n ```js,expect_diagnostic\n var json = JSON();\n ```\n\n ```js,expect_diagnostic\n var newJSON = new JSON();\n ```\n\n ```js,expect_diagnostic\n var reflect = Reflect();\n ```\n\n ```js,expect_diagnostic\n var newReflect = new Reflect();\n ```\n\n ```js,expect_diagnostic\n var atomics = Atomics();\n ```\n\n ```js,expect_diagnostic\n var newAtomics = new Atomics();\n ```\n\n ```js,expect_diagnostic\n var intl = Intl();\n ```\n\n ```js,expect_diagnostic\n var newIntl = new Intl();\n ```\n\n ### Valid\n\n ```js\n function area(r) {\n     return Math.PI * r * r;\n }\n\n var object = JSON.parse(\"{}\");\n\n var value = Reflect.get({ x: 1, y: 2 }, \"x\");\n\n var first = Atomics.load(foo, 0);\n\n var segmenterFr = new Intl.Segmenter(\"fr\", { granularity: \"word\" });\n ```\n\n"
          },
          "noInnerDeclarations": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noInnerDeclarations",
            "link": "https://biomejs.dev/linter/rules/no-inner-declarations",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-inner-declarations"
              }
            ],
            "docs": " Disallow `function` and `var` declarations that are accessible outside their block.\n\n A `var` is accessible in the whole body of the nearest root (function, module, script, static block).\n To avoid confusion, they should be declared to the nearest root.\n\n Prior to ES2015, `function` declarations were only allowed in the nearest root,\n though parsers sometimes erroneously accept them elsewhere.\n In ES2015, inside an _ES module_, a `function` declaration is always block-scoped.\n\n Note that `const` and `let` declarations are block-scoped,\n and therefore they are not affected by this rule.\n Moreover, `function` declarations in nested blocks are allowed inside _ES modules_.\n\n ## Examples\n\n ### Invalid\n\n ```cjs,expect_diagnostic\n if (test) {\n     function f() {}\n }\n ```\n\n ```js,expect_diagnostic\n if (test) {\n     var x = 1;\n }\n ```\n\n ```cjs,expect_diagnostic\n function f() {\n     if (test) {\n         function g() {}\n     }\n }\n ```\n\n ```js,expect_diagnostic\n function f() {\n     if (test) {\n         var x = 1;\n     }\n }\n ```\n\n ### Valid\n\n ```js\n // inside a module, function declarations are block-scoped and thus allowed.\n if (test) {\n     function f() {}\n }\n export {}\n ```\n\n ```js\n function f() { }\n ```\n\n ```js\n function f() {\n     function g() {}\n }\n ```\n\n ```js\n function f() {\n     var x = 1;\n }\n ```\n\n ```js\n function f() {\n     if (test) {\n         const g = function() {};\n     }\n }\n ```\n\n"
          },
          "noInvalidConstructorSuper": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noInvalidConstructorSuper",
            "link": "https://biomejs.dev/linter/rules/no-invalid-constructor-super",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "constructor-super"
              }
            ],
            "docs": " Prevents the incorrect use of `super()` inside classes. It also checks whether a call `super()` is missing from classes that extends other constructors.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A {\n     constructor() {\n         super();\n     }\n }\n ```\n\n ```js,expect_diagnostic\n class A extends undefined {\n     constructor() {\n         super();\n     }\n }\n ```\n\n ### Valid\n\n ```js\n export default class A extends B {\n     constructor() {\n         super();\n     }\n }\n ```\n\n ```js\n export class A {\n     constructor() {}\n }\n ```\n\n"
          },
          "noInvalidNewBuiltin": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noInvalidNewBuiltin",
            "link": "https://biomejs.dev/linter/rules/no-invalid-new-builtin",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-new-native-nonconstructor"
              }
            ],
            "docs": " Disallow `new` operators with global non-constructor functions.\n\n Some global functions cannot be called using the new operator and\n will throw a `TypeError` if you attempt to do so. These functions are:\n\n - [`Symbol`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol)\n - [`BigInt`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt/BigInt)\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let foo = new Symbol('foo');\n ```\n\n ```js,expect_diagnostic\n let bar = new BigInt(9007199254740991);\n ```\n\n ### Valid\n\n ```js\n let foo = Symbol('foo');\n\n function baz(Symbol) {\n     const qux = new Symbol(\"baz\");\n }\n ```\n\n ```js\n let bar = BigInt(9007199254740991);\n\n function quux(BigInt) {\n     const corge = new BigInt(9007199254740991);\n }\n ```\n"
          },
          "noInvalidUseBeforeDeclaration": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "noInvalidUseBeforeDeclaration",
            "link": "https://biomejs.dev/linter/rules/no-invalid-use-before-declaration",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-use-before-define"
              },
              {
                "eslintTypeScript": "no-use-before-define"
              }
            ],
            "docs": " Disallow the use of variables and function parameters before their declaration\n\n JavaScript doesn't allow the use of block-scoped variables (`let`, `const`) and function parameters before their declaration.\n A `ReferenceError` will be thrown with any attempt to access the variable or the parameter before its declaration.\n\n The rule also reports the use of variables declared with `var` before their declarations.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function f() {\n     console.log(x);\n     const x;\n }\n ```\n\n ```js,expect_diagnostic\n function f() {\n     console.log(x);\n     var x = 0;\n }\n ```\n\n ```js,expect_diagnostic\n function f(a = b, b = 0) {}\n ```\n\n ### Valid\n\n ```js\n f();\n function f() {}\n\n new C();\n class C {}\n ```\n\n ```js\n // An export can reference a variable before its declaration.\n export { CONSTANT };\n const CONSTANT = 0;\n ```\n\n ```js\n function f() { return CONSTANT; }\n const CONSTANT = 0;\n ```\n"
          },
          "noNewSymbol": {
            "deprecated": true,
            "version": "1.0.0",
            "name": "noNewSymbol",
            "link": "https://biomejs.dev/linter/rules/no-new-symbol",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-new-symbol"
              }
            ],
            "docs": " Disallow `new` operators with the `Symbol` object.\n\n `Symbol` cannot be instantiated. This results in throwing a `TypeError`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var foo = new Symbol('foo');\n ```\n\n ### Valid\n\n ```js\n var bar = Symbol('bar');\n function baz() {\n     function Symbol() { }\n     new Symbol();\n }\n ```\n"
          },
          "noNonoctalDecimalEscape": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noNonoctalDecimalEscape",
            "link": "https://biomejs.dev/linter/rules/no-nonoctal-decimal-escape",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-nonoctal-decimal-escape"
              }
            ],
            "docs": " Disallow `\\8` and `\\9` escape sequences in string literals.\n\n Since ECMAScript 2021, the escape sequences \\8 and \\9 have been defined as non-octal decimal escape sequences.\n However, most JavaScript engines consider them to be \"useless\" escapes. For example:\n\n ```js,ignore\n \"\\8\" === \"8\"; // true\n \"\\9\" === \"9\"; // true\n ```\n\n Although this syntax is deprecated, it is still supported for compatibility reasons.\n If the ECMAScript host is not a web browser, this syntax is optional.\n However, web browsers are still required to support it, but only in non-strict mode.\n Regardless of your targeted environment, it is recommended to avoid using these escape sequences in new code.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const x = \"\\8\";\n ```\n\n ```js,expect_diagnostic\n const x = \"Don't use \\8 escape.\";\n ```\n\n ```js,expect_diagnostic\n const x = \"Don't use \\9 escape.\";\n ```\n\n ### Valid\n\n ```js\n const x = \"8\";\n ```\n\n ```js\n const x = \"Don't use \\\\8 and \\\\9 escapes.\";\n ```\n\n"
          },
          "noPrecisionLoss": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noPrecisionLoss",
            "link": "https://biomejs.dev/linter/rules/no-precision-loss",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-loss-of-precision"
              },
              {
                "eslintTypeScript": "no-loss-of-precision"
              },
              {
                "clippy": "lossy_float_literal"
              }
            ],
            "docs": " Disallow literal numbers that lose precision\n\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const x = 9007199254740993\n ```\n\n ```js,expect_diagnostic\n const x = 5.123000000000000000000000000001\n ```\n\n ```js,expect_diagnostic\n const x = 0x20000000000001\n ```\n\n ```js,expect_diagnostic\n const x = 0x2_000000000_0001;\n ```\n\n ### Valid\n\n ```js\n const x = 12345\n const x = 123.456\n const x = 123e34\n const x = 12300000000000000000000000\n const x = 0x1FFFFFFFFFFFFF\n const x = 9007199254740991\n const x = 9007_1992547409_91\n ```\n\n"
          },
          "noSelfAssign": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noSelfAssign",
            "link": "https://biomejs.dev/linter/rules/no-self-assign",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-self-assign"
              },
              {
                "clippy": "self_assignment"
              }
            ],
            "docs": " Disallow assignments where both sides are exactly the same.\n\n Self assignments have no effect, so probably those are an error due to incomplete refactoring.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n a = a;\n ```\n\n ```js,expect_diagnostic\n [a] = [a];\n ```\n\n ```js,expect_diagnostic\n ({a: b} = {a: b});\n ```\n\n ```js,expect_diagnostic\n a.b = a.b;\n ```\n\n ```js,expect_diagnostic\n a[b] = a[b];\n ```\n\n ```js,expect_diagnostic\n a[b].foo = a[b].foo;\n ```\n\n ```js,expect_diagnostic\n a['b'].foo = a['b'].foo;\n ```\n\n ### Valid\n\n ```js\n a &= a;\n var a = a;\n let a = a;\n const a = a;\n [a, b] = [b, a];\n ```\n\n"
          },
          "noSetterReturn": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noSetterReturn",
            "link": "https://biomejs.dev/linter/rules/no-setter-return",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-setter-return"
              }
            ],
            "docs": " Disallow returning a value from a setter\n\n While returning a value from a setter does not produce an error, the returned value is being ignored. Therefore, returning a value from a setter is either unnecessary or a possible error.\n\n Only returning without a value is allowed, as it’s a control flow statement.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A {\n     set foo(x) {\n         return x;\n     }\n }\n ```\n\n ```js,expect_diagnostic\n const b = {\n     set foo(x) {\n         return x;\n     },\n };\n ```\n\n ```js,expect_diagnostic\n const c = {\n     set foo(x) {\n         if (x) {\n             return x;\n         }\n     },\n };\n ```\n\n ### Valid\n\n ```js\n // early-return\n class A {\n     set foo(x) {\n         if (x) {\n             return;\n         }\n     }\n }\n ```\n\n ```js\n // not a setter\n class B {\n   set(x) {\n     return x;\n   }\n }\n ```\n"
          },
          "noStringCaseMismatch": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noStringCaseMismatch",
            "link": "https://biomejs.dev/linter/rules/no-string-case-mismatch",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "clippy": "match_str_case_mismatch"
              }
            ],
            "docs": " Disallow comparison of expressions modifying the string case with non-compliant value.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (s.toUpperCase() === \"Abc\") {}\n ```\n\n ```js,expect_diagnostic\n while (s.toLowerCase() === \"Abc\") {}\n ```\n ### Valid\n\n ```js\n if (s.toUpperCase() === \"ABC\") {}\n while (s.toLowerCase() === \"abc\") {}\n for (;s.toLocaleLowerCase() === \"ABC\";) {}\n while (s.toLocaleUpperCase() === \"abc\") {}\n for (let s = \"abc\"; s === \"abc\"; s = s.toUpperCase()) {}\n ```\n"
          },
          "noSwitchDeclarations": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noSwitchDeclarations",
            "link": "https://biomejs.dev/linter/rules/no-switch-declarations",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-case-declarations"
              }
            ],
            "docs": " Disallow lexical declarations in `switch` clauses.\n\n Lexical declarations in `switch` clauses are accessible in the entire `switch`.\n However, it only gets initialized when it is assigned, which will only happen if the `switch` clause where it is defined is reached.\n\n To ensure that the lexical declarations only apply to the current `switch` clause wrap your declarations in a block.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n switch (foo) {\n     case 0:\n         const x = 1;\n         break;\n     case 2:\n         x; // `x` can be used while it is not initialized\n         break;\n }\n ```\n\n ```js,expect_diagnostic\n switch (foo) {\n     case 0:\n         function f() {}\n         break;\n     case 2:\n         f(); // `f` can be called here\n         break;\n }\n ```\n\n ```js,expect_diagnostic\n switch (foo) {\n     case 0:\n         class A {}\n         break;\n     default:\n         new A(); // `A` can be instantiated here\n         break;\n }\n ```\n\n ### Valid\n\n ```js\n switch (foo) {\n     case 0: {\n         const x = 1;\n         break;\n     }\n     case 1:\n         // `x` is not visible here\n         break;\n }\n ```\n\n"
          },
          "noUndeclaredVariables": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUndeclaredVariables",
            "link": "https://biomejs.dev/linter/rules/no-undeclared-variables",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-undef"
              }
            ],
            "docs": " Prevents the usage of variables that haven't been declared inside the document.\n\n If you need to allow-list some global bindings, you can use the [`javascript.globals`](/reference/configuration/#javascriptglobals) configuration.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n foobar;\n ```\n\n ```js,expect_diagnostic\n // throw diagnostic for JavaScript files\n PromiseLike;\n ```\n ### Valid\n\n ```ts\n type B<T> = PromiseLike<T>\n ```\n"
          },
          "noUnnecessaryContinue": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnnecessaryContinue",
            "link": "https://biomejs.dev/linter/rules/no-unnecessary-continue",
            "recommended": true,
            "fixKind": "unsafe",
            "docs": " Avoid using unnecessary `continue`.\n\n ## Examples\n\n ### Invalid\n ```js,expect_diagnostic\n loop: for (let i = 0; i < 5; i++) {\n   continue loop;\n }\n ```\n ```js,expect_diagnostic\n while (i--) {\n   continue;\n }\n ```\n ```js,expect_diagnostic\n while (1) {\n   continue;\n }\n ```\n ```js,expect_diagnostic\n for (let i = 0; i < 10; i++) {\n   if (i > 5) {\n     console.log(\"foo\");\n     continue;\n   } else if (i >= 5 && i < 8) {\n     console.log(\"test\");\n   } else {\n     console.log(\"test\");\n   }\n }\n ```\n ```js,expect_diagnostic\n for (let i = 0; i < 9; i++) {\n   continue;\n }\n ```\n\n ```js, expect_diagnostic\n test2: do {\n \tcontinue test2;\n } while (true);\n ```\n\n ### Valid\n ```js\n while (i) {\n   if (i > 5) {\n     continue;\n   }\n   console.log(i);\n   i--;\n }\n\n loop: while (1) {\n   forLoop: for (let i = 0; i < 5; i++) {\n     if (someCondition) {\n       continue loop;\n     }\n   }\n }\n ```\n"
          },
          "noUnreachable": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnreachable",
            "link": "https://biomejs.dev/linter/rules/no-unreachable",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-unreachable"
              }
            ],
            "docs": " Disallow unreachable code\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function example() {\n     return;\n     neverCalled();\n }\n ```\n\n ```js,expect_diagnostic\n function example() {\n     for(let i = 0; i < 10; ++i) {\n         break;\n     }\n }\n ```\n\n ```js,expect_diagnostic\n function example() {\n     for(const key in value) {\n         continue;\n         neverCalled();\n     }\n }\n ```\n"
          },
          "noUnreachableSuper": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnreachableSuper",
            "link": "https://biomejs.dev/linter/rules/no-unreachable-super",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-this-before-super"
              }
            ],
            "docs": " Ensures the `super()` constructor is called exactly once on every code  path in a class constructor before `this` is accessed if the class has a superclass\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A extends B {\n     constructor() {}\n }\n ```\n\n ```js,expect_diagnostic\n class A extends B {\n     constructor(value) {\n         this.prop = value;\n         super();\n     }\n }\n ```\n\n ```js,expect_diagnostic\n class A extends B {\n     constructor(cond) {\n         if(cond) {\n             super();\n         }\n     }\n }\n ```\n\n ### Valid\n\n ```js\n export default class A extends B {\n     constructor() {\n         super();\n     }\n }\n ```\n\n ```js\n export class A {\n     constructor() {}\n }\n ```\n\n"
          },
          "noUnsafeFinally": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnsafeFinally",
            "link": "https://biomejs.dev/linter/rules/no-unsafe-finally",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-unsafe-finally"
              }
            ],
            "docs": " Disallow control flow statements in finally blocks.\n\n JavaScript suspends the control flow statements of `try` and `catch` blocks until\n the execution of finally block finishes. So, when `return`, `throw`, `break` or `continue`\n is used in finally, control flow statements inside `try` and `catch` are overwritten,\n which is considered as unexpected behavior.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n (() => {\n     try {\n         return 1; // 1 is returned but suspended until finally block ends\n     } catch(err) {\n         return 2;\n     } finally {\n         return 3; // 3 is returned before 1, which we did not expect\n     }\n })();\n ```\n\n ```js,expect_diagnostic\n (() => {\n     try {\n         throw new Error(\"Try\"); // error is thrown but suspended until finally block ends\n     } finally {\n         return 3; // 3 is returned before the error is thrown, which we did not expect\n     }\n })();\n ```\n\n ```js,expect_diagnostic\n (() => {\n     try {\n         throw new Error(\"Try\")\n     } catch(err) {\n         throw err; // The error thrown from try block is caught and re-thrown\n     } finally {\n         throw new Error(\"Finally\"); // Finally(...) is thrown, which we did not expect\n     }\n })();\n ```\n\n ```js,expect_diagnostic\n (() => {\n     label: try {\n       return 0; // 0 is returned but suspended until finally block ends\n     } finally {\n       break label; // It breaks out the try-finally block, before 0 is returned.\n     }\n     return 1;\n })();\n ```\n\n ```js,expect_diagnostic\n function a() {\n   switch (condition) {\n     case 'a': {\n       try {\n         console.log('a');\n         return;\n       } finally {\n         break;\n       }\n     }\n     case 'b': {\n       console.log('b');\n     }\n   }\n }\n```\n\n ### Valid\n\n ```js\n let foo = function() {\n     try {\n         return 1;\n     } catch(err) {\n         return 2;\n     } finally {\n         console.log(\"hola!\");\n     }\n };\n ```\n\n ```js\n let foo = function() {\n     try {\n         return 1;\n     } catch(err) {\n         return 2;\n     } finally {\n         let a = function() {\n             return \"hola!\";\n         }\n     }\n };\n ```\n\n ```js\n let foo = function(a) {\n     try {\n         return 1;\n     } catch(err) {\n         return 2;\n     } finally {\n         switch(a) {\n             case 1: {\n                 console.log(\"hola!\")\n                 break;\n             }\n         }\n     }\n };\n ```\n\n"
          },
          "noUnsafeOptionalChaining": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnsafeOptionalChaining",
            "link": "https://biomejs.dev/linter/rules/no-unsafe-optional-chaining",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-unsafe-optional-chaining"
              }
            ],
            "docs": " Disallow the use of optional chaining in contexts where the undefined value is not allowed.\n\n The optional chaining (?.) expression can short-circuit with a return value of undefined.\n Therefore, treating an evaluated optional chaining expression as a function, object, number, etc., can cause TypeError or unexpected results.\n Also, parentheses limit the scope of short-circuiting in chains.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n 1 in obj?.foo;\n ```\n\n ```cjs,expect_diagnostic\n with (obj?.foo);\n ```\n\n ```js,expect_diagnostic\n for (bar of obj?.foo);\n ```\n\n ```js,expect_diagnostic\n bar instanceof obj?.foo;\n ```\n\n ```js,expect_diagnostic\n const { bar } = obj?.foo;\n ```\n\n ```js,expect_diagnostic\n (obj?.foo)();\n ```\n\n ```js,expect_diagnostic\n (baz?.bar).foo;\n ```\n\n ### Valid\n\n ```js\n (obj?.foo)?.();\n obj?.foo();\n (obj?.foo ?? bar)();\n obj?.foo.bar;\n obj.foo?.bar;\n foo?.()?.bar;\n ```\n\n"
          },
          "noUnusedImports": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noUnusedImports",
            "link": "https://biomejs.dev/linter/rules/no-unused-imports",
            "recommended": false,
            "fixKind": "safe",
            "docs": " Disallow unused imports.\n\n Unused imports might be the result of an incomplete refactoring.\n The code fix can remove comments associated with an `import`.\n See the last invalid example.\n\n Note that the leading trivia, e.g., comments or newlines preceding\n the unused imports will also be removed. So that comment directives\n like `@ts-expect-error` won't be transferred to a wrong place.\n\n ## Options\n\n This rule respects the [`jsxRuntime`](https://biomejs.dev/reference/configuration/#javascriptjsxruntime)\n setting and will make an exception for React globals if it is set to\n `\"reactClassic\"`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import A from 'mod';\n ```\n\n ```js,expect_diagnostic\n import * as A from 'mod';\n ```\n\n ```ts,expect_diagnostic\n import { type A, B } from 'mod';\n\n export { B }\n ```\n\n ```js,expect_diagnostic\n // Header comment\n import /*inner comment */ A from 'mod'; // Associated comment\n\n // Another header comment\n import {\n     // A's header comment\n     type A, // A's comment\n     // B's header comment\n     B,\n } from 'mod';\n\n export { B }\n ```\n\n ### Valid\n\n ```ts\n import { A, type B } from 'mod';\n\n function f(arg: B): A {\n     return new A(arg);\n }\n ```\n"
          },
          "noUnusedLabels": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnusedLabels",
            "link": "https://biomejs.dev/linter/rules/no-unused-labels",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "no-unused-labels"
              }
            ],
            "docs": " Disallow unused labels.\n\n Labels that are declared and never used are most likely an error due to incomplete refactoring.\n\n The rule ignores reactive Svelte statements in Svelte components.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n LOOP: for (const x of xs) {\n     if (x > 0) {\n         break;\n     }\n     f(x);\n }\n ```\n\n ### Valid\n\n ```js\n LOOP: for (const x of xs) {\n     if (x > 0) {\n         break LOOP;\n     }\n     f(x);\n }\n ```\n\n ```js\n function nonNegative(n) {\n     DEV: assert(n >= 0);\n     return n;\n }\n ```\n\n ```svelte\n <script>\n $: { /* reactive block */ }\n </script>\n ```\n"
          },
          "noUnusedPrivateClassMembers": {
            "deprecated": false,
            "version": "1.3.3",
            "name": "noUnusedPrivateClassMembers",
            "link": "https://biomejs.dev/linter/rules/no-unused-private-class-members",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-unused-private-class-members"
              }
            ],
            "docs": " Disallow unused private class members\n\n Private class members that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring.\n Such class members take up space in the code and can lead to confusion by readers.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class OnlyWrite {\n   #usedOnlyInWrite = 5;\n\n   method() {\n\t    this.#usedOnlyInWrite = 212;\n   }\n }\n ```\n\n ```ts,expect_diagnostic\n  class TsBioo {\n    private unusedProperty = 5;\n  }\n ```\n\n ```ts,expect_diagnostic\n  class TsBioo {\n    private unusedMethod() {}\n  }\n ```\n\n ### Valid\n\n ```js\n class UsedMember {\n   #usedMember = 42;\n\n   method() {\n\t    return this.#usedMember;\n   }\n }\n ```\n\n"
          },
          "noUnusedVariables": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnusedVariables",
            "link": "https://biomejs.dev/linter/rules/no-unused-variables",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-unused-vars"
              },
              {
                "eslintTypeScript": "no-unused-vars"
              }
            ],
            "docs": " Disallow unused variables.\n\n There is an exception to this rule:\n variables that starts with underscore, e.g. `let _something;`.\n\n The pattern of having an underscore as prefix of a name of variable is a very diffuse\n pattern among programmers, and Biome decided to follow it.\n\n This rule won't report unused imports.\n If you want to report unused imports,\n enable [noUnusedImports](https://biomejs.dev/linter/rules/no-unused-imports/).\n\n From `v1.9.0`, the rule won't check unused function parameters any more.\n Users should switch to\n [noUnusedFunctionParameters](https://biomejs.dev/linter/rules/no-unused-function-parameters/)\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let a = 4;\n a++;\n ```\n\n ```js,expect_diagnostic\n function foo() {}\n ```\n\n ```js,expect_diagnostic\n export function foo(myVar) {\n     console.log('foo');\n }\n ```\n\n ```js,expect_diagnostic\n function foo() {\n     foo();\n }\n ```\n\n ```js,expect_diagnostic\n const foo = () => {\n     foo();\n };\n ```\n\n ```ts,expect_diagnostic\n export function f<T>() {}\n ```\n\n ### Valid\n\n ```js\n function foo(b) {\n     console.log(b)\n };\n foo();\n ```\n\n ```js\n export function foo(_unused) {}\n ```\n\n ```ts\n function used_overloaded(): number;\n function used_overloaded(s: string): string;\n function used_overloaded(s?: string) {\n     return s;\n }\n used_overloaded();\n ```\n"
          },
          "useIsNan": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useIsNan",
            "link": "https://biomejs.dev/linter/rules/use-is-nan",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "use-isnan"
              }
            ],
            "docs": " Require calls to `isNaN()` when checking for `NaN`.\n\n In JavaScript, `NaN` is a special value of the `Number` type.\n It’s used to represent any of the \"not-a-number\" values represented by the double-precision 64-bit format as specified by the IEEE Standard for Binary Floating-Point Arithmetic.\n\n Because `NaN` is unique in JavaScript by not being equal to anything, including itself, the results of comparisons to `NaN` are confusing:\n - `NaN` === `NaN` or `NaN` == `NaN` evaluate to false\n - `NaN` !== `NaN` or `NaN` != `NaN` evaluate to true\n\n Therefore, use `Number.isNaN()` or global `isNaN()` functions to test whether a value is `NaN`.\n\n Note that `Number.isNaN()` and `isNaN()` [do not have the same behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN#description).\n When the argument to `isNaN()` is not a number, the value is first coerced to a number.\n `Number.isNaN()` does not perform this coercion.\n Therefore, it is a more reliable way to test whether a value is `NaN`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n 123 == NaN\n ```\n\n ```js,expect_diagnostic\n 123 != NaN\n ```\n\n ```js,expect_diagnostic\n switch(foo) { case (NaN): break; }\n ```\n\n ```js,expect_diagnostic\n Number.NaN == \"abc\"\n ```\n\n ### Valid\n\n ```js\n if (Number.isNaN(123) !== true) {}\n\n foo(Number.NaN / 2)\n\n switch(foo) {}\n ```\n\n"
          },
          "useValidForDirection": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useValidForDirection",
            "link": "https://biomejs.dev/linter/rules/use-valid-for-direction",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "for-direction"
              }
            ],
            "docs": " Enforce \"for\" loop update clause moving the counter in the right direction.\n\n A for loop with a stop condition that can never be reached,\n such as one with a counter that moves in the wrong direction, will run infinitely.\n While there are occasions when an infinite loop is intended, the convention is to construct such loops as while loops.\n More typically, an infinite for loop is a bug.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n for (var i = 0; i < 10; i--) {\n }\n ```\n\n ```js,expect_diagnostic\n for (var i = 10; i >= 0; i++) {\n }\n ```\n\n ```js,expect_diagnostic\n for (var i = 0; i > 10; i++) {\n }\n ```\n\n ### Valid\n\n ```js\n for (var i = 0; i < 10; i++) {\n }\n ```\n"
          },
          "useYield": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useYield",
            "link": "https://biomejs.dev/linter/rules/use-yield",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "require-yield"
              }
            ],
            "docs": " Require generator functions to contain `yield`.\n\n This rule generates warnings for generator functions that do not have the `yield` keyword.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function* foo() {\n   return 10;\n }\n ```\n\n ### Valid\n ```js\n function* foo() {\n   yield 5;\n   return 10;\n }\n\n function foo() {\n   return 10;\n }\n\n // This rule does not warn on empty generator functions.\n function* foo() { }\n ```\n"
          }
        },
        "nursery": {
          "noConsole": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noConsole",
            "link": "https://biomejs.dev/linter/rules/no-console",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-console"
              }
            ],
            "docs": " Disallow the use of `console`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n console.error('hello world')\n ```\n\n"
          },
          "noConstantMathMinMaxClamp": {
            "deprecated": false,
            "version": "1.7.0",
            "name": "noConstantMathMinMaxClamp",
            "link": "https://biomejs.dev/linter/rules/no-constant-math-min-max-clamp",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "clippy": "min_max"
              }
            ],
            "docs": " Disallow the use of `Math.min` and `Math.max` to clamp a value where the result itself is constant.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n Math.min(0, Math.max(100, x));\n ```\n\n ```js,expect_diagnostic\n Math.max(100, Math.min(0, x));\n ```\n ### Valid\n\n ```js\n Math.min(100, Math.max(0, x));\n ```\n\n"
          },
          "noDoneCallback": {
            "deprecated": false,
            "version": "1.6.1",
            "name": "noDoneCallback",
            "link": "https://biomejs.dev/linter/rules/no-done-callback",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJest": "no-done-callback"
              }
            ],
            "sourceKind": "sameLogic",
            "docs": " Disallow using a callback in asynchronous tests and hooks.\n\n This rule checks the function parameter of hooks & tests for use of the done argument, suggesting you return a promise instead.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n beforeEach(done => {\n     // ...\n });\n ```\n\n ```js,expect_diagnostic\n test('myFunction()', done => {\n     // ...\n });\n ```\n\n ### Valid\n\n ```js\n beforeEach(async () => {\n     // ...\n });\n ```\n\n ```js\n test('myFunction()', () => {\n     expect(myFunction()).toBeTruthy();\n });\n ```\n\n"
          },
          "noDuplicateElseIf": {
            "deprecated": false,
            "version": "1.6.2",
            "name": "noDuplicateElseIf",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-else-if",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-dupe-else-if"
              }
            ],
            "docs": " Disallow duplicate conditions in if-else-if chains\n\n if-else-if chains are commonly used when there is a need to execute only one branch\n (or at most one branch) out of several possible branches, based on certain conditions.\n\n Two identical test conditions in the same chain are almost always a mistake in the code.\n Unless there are side effects in the expressions,\n a duplicate will evaluate to the same true or false value as the identical expression earlier in the chain,\n meaning that its branch can never execute.\n\n Please note that this rule does not compare conditions from the chain with conditions inside statements\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (a) {\n     foo();\n } else if (b) {\n     bar();\n } else if (b) {\n     baz();\n }\n ```\n\n ### Valid\n\n ```js\n if (a) {\n     foo();\n } else if (b) {\n     bar();\n } else if (c) {\n     baz();\n }\n ```\n\n"
          },
          "noFlatMapIdentity": {
            "deprecated": false,
            "version": "1.7.0",
            "name": "noFlatMapIdentity",
            "link": "https://biomejs.dev/linter/rules/no-flat-map-identity",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "clippy": "flat_map_identity"
              }
            ],
            "docs": " Disallow to use unnecessary callback on `flatMap`.\n\n To achieve the same result (flattening an array) more concisely and efficiently, you should use `flat` instead.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n array.flatMap((arr) => arr);\n ```\n\n ```js,expect_diagnostic\n array.flatMap((arr) => {return arr});\n ```\n\n ### Valid\n\n ```js\n array.flatMap((arr) => arr * 2);\n ```\n\n"
          },
          "noMisplacedAssertion": {
            "deprecated": false,
            "version": "next",
            "name": "noMisplacedAssertion",
            "link": "https://biomejs.dev/linter/rules/no-misplaced-assertion",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintJest": "no-standalone-expect"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Checks that the assertion function, for example `expect`, is placed inside an `it()` function call.\n\n Placing (and using) the `expect` assertion function can result in unexpected behaviors when executing your testing suite.\n\n The rule will check for the following assertion calls:\n - `expect`\n - `assert`\n - `assertEquals`\n\n However, the rule will ignore the following assertion calls:\n - `expect.any`\n - `expect.anything`\n - `expect.closeTo`\n - `expect.arrayContaining`\n - `expect.objectContaining`\n - `expect.stringContaining`\n - `expect.stringMatching`\n - `expect.extend`\n - `expect.addEqualityTesters`\n - `expect.addSnapshotSerializer`\n\n If the assertion function is imported, the rule will check if they are imported from:\n - `\"chai\"`\n - `\"node:assert\"`\n - `\"node:assert/strict\"`\n - `\"bun:test\"`\n - `\"vitest\"`\n - Deno assertion module URL\n\n Check the [options](#options) if you need to change the defaults.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n describe(\"describe\", () => {\n     expect()\n })\n ```\n\n ```js,expect_diagnostic\n import assert from \"node:assert\";\n describe(\"describe\", () => {\n     assert.equal()\n })\n ```\n\n ```js,expect_diagnostic\n import {test, expect} from \"bun:test\";\n expect(1, 2)\n ```\n\n ```js,expect_diagnostic\n import {assertEquals} from \"https://deno.land/std@0.220.0/assert/mod.ts\";\n\n assertEquals(url.href, \"https://deno.land/foo.js\");\n Deno.test(\"url test\", () => {\n     const url = new URL(\"./foo.js\", \"https://deno.land/\");\n });\n ```\n\n ### Valid\n\n ```js\n import assert from \"node:assert\";\n describe(\"describe\", () => {\n     it(\"it\", () => {\n         assert.equal()\n     })\n })\n ```\n\n ```js\n describe(\"describe\", () => {\n     it(\"it\", () => {\n         expect()\n     })\n })\n ```\n\n ```js\n test.each([1, 2, 3])('test', (a, b, expected) => {\n     expect(a + b).toBe(expected)\n })\n ```\n\n ```js\n import { waitFor } from '@testing-library/react';\n await waitFor(() => {\n   expect(111).toBe(222);\n });\n ```\n\n"
          },
          "noNodejsModules": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "noNodejsModules",
            "link": "https://biomejs.dev/linter/rules/no-nodejs-modules",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintImport": "no-nodejs-modules"
              }
            ],
            "docs": " Forbid the use of Node.js builtin modules.\n\n This can be useful for client-side web projects that don't have access to those modules.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import fs from \"fs\";\n ```\n\n ```js,expect_diagnostic\n import path from \"node:path\";\n ```\n\n ### Valid\n\n ```js\n import fs from \"fs-custom\";\n ```\n"
          },
          "noReactSpecificProps": {
            "deprecated": false,
            "version": "1.7.2",
            "name": "noReactSpecificProps",
            "link": "https://biomejs.dev/linter/rules/no-react-specific-props",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "eslintSolid": "no-react-specific-props"
              }
            ],
            "docs": " Prevents React-specific JSX properties from being used.\n\n This rule is intended for use in JSX-based frameworks (mainly Solid.js)\n that do not use React-style prop names.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n <Hello className=\"John\" />\n ```\n\n ### Valid\n\n ```js\n <Hello class=\"Doe\" />\n ```\n"
          },
          "noRestrictedImports": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noRestrictedImports",
            "link": "https://biomejs.dev/linter/rules/no-restricted-imports",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-restricted-imports"
              },
              {
                "eslintTypeScript": "no-restricted-imports"
              }
            ],
            "docs": " Disallow specified modules when loaded by import or require.\n\n ## Options\n\n ```json\n {\n     \"noRestrictedImports\": {\n         \"options\": {\n             \"paths\": {\n                 \"lodash\": \"Using lodash is not encouraged\",\n                 \"underscore\": \"Using underscore is not encouraged\"\n             }\n         }\n     }\n }\n ```\n"
          },
          "noUndeclaredDependencies": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noUndeclaredDependencies",
            "link": "https://biomejs.dev/linter/rules/no-undeclared-dependencies",
            "recommended": false,
            "fixKind": "none",
            "docs": " Disallow the use of dependencies that aren't specified in the `package.json`.\n\n Indirect dependencies will trigger the rule because they aren't declared in the `package.json`. This means that if package `@org/foo` has a dependency on `lodash`, and then you use\n `import \"lodash\"` somewhere in your project, the rule will trigger a diagnostic for this import.\n\n The rule ignores imports using a protocol such as `node:`, `bun:`, `jsr:`, `https:`.\n\n ## Examples\n\n ### Invalid\n\n ```js,ignore\n import \"vite\";\n ```\n\n ### Valid\n\n ```js,ignore\n import { A } from \"./local.js\";\n ```\n\n ```js,ignore\n import assert from \"node:assert\";\n ```\n"
          },
          "noUnusedFunctionParameters": {
            "deprecated": false,
            "version": "next",
            "name": "noUnusedFunctionParameters",
            "link": "https://biomejs.dev/linter/rules/no-unused-function-parameters",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Disallow unused function parameters.\n\n There is an exception to this rule:\n parameters that starts with underscore, e.g. `function foo(_a, _b) {}`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function foo(myVar) {\n     console.log('foo');\n }\n ```\n\n ```js,expect_diagnostic\n new Promise((accept, reject) => {\n     window.setTimeout(accept, 1000);\n });\n ```\n\n ```js,expect_diagnostic\n const squares = [[1, 1], [2, 4], [3, 9], 4, 16]];\n squares.filter(([k, v]) => v > 5);\n ```\n\n ### Valid\n\n ```js\n function foo(myVar) {\n     console.log(myVar);\n }\n ```\n\n"
          },
          "noUselessStringConcat": {
            "deprecated": false,
            "version": "next",
            "name": "noUselessStringConcat",
            "link": "https://biomejs.dev/linter/rules/no-useless-string-concat",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-useless-concat"
              }
            ],
            "docs": " Disallow unnecessary concatenation of string or template literals.\n\n This rule aims to flag the concatenation of 2 literals when they could be combined into a single literal. Literals can be strings or template literals.\n Concatenation of multiple strings is allowed when the strings are spread over multiple lines in order to prevent exceeding the maximum line width.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const a = \"a\" + \"b\";\n ```\n\n ```js,expect_diagnostic\n const a = \"a\" + \"b\" + \"c\";\n ```\n\n ```js,expect_diagnostic\n const a = (foo + \"a\") + (\"b\" + \"c\");\n ```\n\n ### Valid\n\n ```js\n const a = 1 + 1;\n ```\n\n ```js\n const a = 1 * '2';\n ```\n\n ```js\n const a = 1 - 2;\n ```\n\n ```js\n const a = foo + bar;\n ```\n\n ```js\n const a = 'foo' + bar;\n ```\n\n ```js\n const a = 'foo' +\n           'bar'\n ```\n"
          },
          "noUselessUndefinedInitialization": {
            "deprecated": false,
            "version": "1.7.2",
            "name": "noUselessUndefinedInitialization",
            "link": "https://biomejs.dev/linter/rules/no-useless-undefined-initialization",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "no-undef-init"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow initializing variables to `undefined`.\n\n A variable that is declared and not initialized to any value automatically gets the value of `undefined`.\n It’s considered a best practice to avoid initializing variables to `undefined`.\n Please note that any inline comments attached to the initialization value or variable will be moved at the end of the variable declaration on auto-fix.\n Please be also aware that this differs from Eslint's behaviour.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var a = undefined;\n ```\n ```js,expect_diagnostic\n let b = undefined, c = 1, d = 2;\n ```\n ```js,expect_diagnostic\n for (let i = 0; i < 100; i++) {\n \tlet i = undefined;\n }\n ```\n ```js,expect_diagnostic\n let f = /**/undefined/**/ ;\n ```\n ### Valid\n\n ```js\n var a = 1;\n ```\n ```js\n class Foo {\n \tbar = undefined;\n }\n ```\n\n"
          },
          "noYodaExpression": {
            "deprecated": false,
            "version": "next",
            "name": "noYodaExpression",
            "link": "https://biomejs.dev/linter/rules/no-yoda-expression",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "yoda"
              }
            ],
            "docs": " Disallow the use of yoda expressions.\n\n A Yoda expression is a programming style where, given a binary operation, the \"static\" part of the binary operation is placed on the left-hand side.\n This rule **forbids** the use of Yoda expressions and enforces the placing of the \"static\" part of the binary operations on the right-hand side.\n\n ## Exceptions\n\n Range expressions like `0 < value && value < 1` or `value <= 0 || 1 < value` are allowed.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (\"red\" == value) {}\n ```\n\n ```js,expect_diagnostic\n if (true === value) {}\n ```\n\n ```js,expect_diagnostic\n if (5 != value) {}\n ```\n\n ### Valid\n\n ```js\n if (value === \"red\") {}\n ```\n\n ```js\n if (value === value) {}\n ```\n\n ```js\n if (value != 5) {}\n ```\n\n ```js\n if (0 < value && value < 1) {}\n ```\n\n ## Resources\n - [Wikipedia definition](https://en.wikipedia.org/wiki/Yoda_conditions)\n\n"
          },
          "useAdjacentOverloadSignatures": {
            "deprecated": false,
            "version": "next",
            "name": "useAdjacentOverloadSignatures",
            "link": "https://biomejs.dev/linter/rules/use-adjacent-overload-signatures",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintTypeScript": "adjacent-overload-signatures"
              }
            ],
            "docs": " Disallow the use of overload signatures that are not next to each other.\n\n Overload signatures must be adjacent.\n If a key is defined multiple times, only the last definition takes effect. Previous definitions are ignored.\n This rule is useful for preventing accidental overloads that are not adjacent.\n It is recommended to keep the overload signatures adjacent to make the code easier to read and maintain.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n type Foo = {\n   foo_type(s: string): void;\n   foo_type(n: number): void;\n   bar_type(): void;\n   foo_type(sn: string | number): void;\n };\n ```\n\n ```js,expect_diagnostic\n interface Foo {\n   foo_interface(s: string): void;\n   foo_interface(n: number): void;\n   bar_interface(): void;\n   foo_interface(sn: string | number): void;\n }\n ``\n\n ```js,expect_diagnostic\n class A {\n   fooA(s: string): void;\n   fooA(n: number): void;\n   barA(): void {};\n   fooA(sn: string | number): void {};\n }\n ```\n\n ### Valid\n\n ```js\n declare namespace Foo {\n   export function foo_declare(s: string): void;\n   export function foo_declare(n: number): void;\n   export function foo_declare(sn: string | number): void;\n   export function bar_declare(): void;\n }\n ````\n\n ```js\n type Foo = {\n   foo_type(s: string): void;\n   foo_type(n: number): void;\n   foo_type(sn: string | number): void;\n   bar_type(): void;\n };\n ```\n\n ```js\n interface Foo {\n   foo_interface(s: string): void;\n   foo_interface(n: number): void;\n   foo_interface(sn: string | number): void;\n   bar_interface(): void;\n }\n ```\n\n ```js\n class A {\n   fooA(s: string): void;\n   fooA(n: number): void;\n   fooA(sn: string | number): void {}\n   barA(): void {}\n }\n ```\n\n"
          },
          "useArrayLiterals": {
            "deprecated": false,
            "version": "1.7.2",
            "name": "useArrayLiterals",
            "link": "https://biomejs.dev/linter/rules/use-array-literals",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-array-constructor"
              }
            ],
            "docs": " Disallow Array constructors.\n\n Use of the Array constructor to construct a new array is generally discouraged in favor of array literal notation because of the single-argument pitfall and because the Array global may be redefined.\n The exception is when the Array constructor intentionally creates sparse arrays of a specified size by giving the constructor a single numeric argument.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n Array();\n ```\n\n ```js,expect_diagnostic\n Array(0, 1, 2);\n ```\n\n ```js,expect_diagnostic\n new Array(0, 1, 2);\n ```\n\n ```js,expect_diagnostic\n Array(...args);\n ```\n\n ### Valid\n\n ```js\n Array(500);\n ```\n\n ```js\n [0, 1, 2];\n ```\n\n"
          },
          "useConsistentBuiltinInstantiation": {
            "deprecated": false,
            "version": "1.7.2",
            "name": "useConsistentBuiltinInstantiation",
            "link": "https://biomejs.dev/linter/rules/use-consistent-builtin-instantiation",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintUnicorn": "new-for-builtins"
              },
              {
                "eslint": "no-new-wrappers"
              }
            ],
            "docs": " Enforce the use of `new` for all builtins, except `String`, `Number`, `Boolean`, `Symbol` and `BigInt`.\n\n `new Builtin()` and `Builtin()` work the same, but new should be preferred for consistency with other constructors.\n Enforces the use of new for following builtins:\n\n - AggregateError\n - Array\n - ArrayBuffer\n - BigInt64Array\n - BigUint64Array\n - DataView\n - Date\n - Error\n - EvalError\n - FinalizationRegistry\n - Float32Array\n - Float64Array\n - Function\n - Int16Array\n - Int32Array\n - Int8Array\n - Map\n - Object\n - Promise\n - Proxy\n - RangeError\n - ReferenceError\n - RegExp\n - Set\n - SharedArrayBuffer\n - SyntaxError\n - TypeError\n - URIError\n - Uint16Array\n - Uint32Array\n - Uint8Array\n - Uint8ClampedArray\n - WeakMap\n - WeakRef\n - WeakSet\n\n Disallows the use of new for following builtins:\n\n - BigInt\n - Boolean\n - Number\n - String\n - Symbol\n\n > These should not use `new` as that would create object wrappers for the primitive values, which is not what you want.\n > However, without `new` they can be useful for coercing a value to that type.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const text = new String(10);\n ```\n\n ```js,expect_diagnostic\n const now = Date();\n ```\n\n ```js,expect_diagnostic\n const map = Map([\n   ['foo', 'bar']\n ]);\n ```\n\n ### Valid\n\n ```js\n const text = String(10);\n ```\n\n ```js\n const now = new Date();\n ```\n\n ```js\n const map = new Map([\n  ['foo', 'bar']\n ]);\n ```\n\n"
          },
          "useDateNow": {
            "deprecated": false,
            "version": "next",
            "name": "useDateNow",
            "link": "https://biomejs.dev/linter/rules/use-date-now",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintUnicorn": "prefer-date-now"
              }
            ],
            "docs": " Use `Date.now()` to get the number of milliseconds since the Unix Epoch.\n\n `Date.now()` is more readable than `new Date().getTime()` and its variants,\n it also avoids unnecessary instantiation of `Date` object.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = new Date().getTime();\n ```\n ```js,expect_diagnostic\n const foo = new Date().valueOf();\n ```\n ```js,expect_diagnostic\n const foo = +new Date;\n ```\n ```js,expect_diagnostic\n const foo = Number(new Date());\n ```\n ```js,expect_diagnostic\n const foo = new Date() * 2;\n ```\n\n ### Valid\n\n ```js\n const foo = Date.now();\n ```\n ```js\n const foo = Date.now() * 2;\n ```\n\n"
          },
          "useDefaultSwitchClause": {
            "deprecated": false,
            "version": "1.7.2",
            "name": "useDefaultSwitchClause",
            "link": "https://biomejs.dev/linter/rules/use-default-switch-clause",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "default-case"
              }
            ],
            "docs": " Require the default clause in switch statements.\n\n Some code conventions require that all switch statements have a default clause. The thinking is that it’s better\n to always explicitly state what the default behavior should be so that it’s clear whether or not the developer\n forgot to include the default behavior by mistake.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n switch (a) {\n     case 1:\n         /* code */\n         break;\n }\n ```\n\n ### Valid\n\n ```js\n switch (a) {\n     case 1:\n         /* code */\n         break;\n\n     default:\n         /* code */\n         break;\n }\n ```\n"
          },
          "useErrorMessage": {
            "deprecated": false,
            "version": "next",
            "name": "useErrorMessage",
            "link": "https://biomejs.dev/linter/rules/use-error-message",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintUnicorn": "error-message"
              }
            ],
            "docs": " Enforce passing a message value when creating a built-in error.\n\n This rule enforces a message value to be passed in when creating an instance of a built-in `Error` object,\n which leads to more readable and debuggable code.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n throw Error();\n ```\n ```js,expect_diagnostic\n throw Error('');\n ```\n ```js,expect_diagnostic\n throw new TypeError();\n ```\n ```js,expect_diagnostic\n const error = new AggregateError(errors);\n ```\n\n ### Valid\n\n ```js\n throw Error('Unexpected property.');\n ```\n ```js\n throw new TypeError('Array expected.');\n ```\n ```js\n const error = new AggregateError(errors, 'Promises rejected.');\n ```\n"
          },
          "useExplicitLengthCheck": {
            "deprecated": false,
            "version": "1.7.3",
            "name": "useExplicitLengthCheck",
            "link": "https://biomejs.dev/linter/rules/use-explicit-length-check",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintUnicorn": "explicit-length-check"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Enforce explicitly comparing the `length`, `size`, `byteLength` or `byteOffset` property of a value.\n\n This rule enforces a specific style length comparisons to make them more clear.\n\n ## Zero comparison examples\n Enforce comparison with === 0 when checking for zero length.\n\n ### Invalid\n\n ```js,expect_diagnostic\n const isEmpty = !foo.length;\n ```\n ```js,expect_diagnostic\n const isEmpty = foo.length == 0;\n ```\n ```js,expect_diagnostic\n const isEmpty = foo.length < 1;\n ```\n ```js,expect_diagnostic\n const isEmpty = 0 === foo.length;\n ```\n ```js,expect_diagnostic\n const isEmpty = 0 == foo.length;\n ```\n ```js,expect_diagnostic\n const isEmpty = 1 > foo.length;\n ```\n ```js,expect_diagnostic\n // Negative style is disallowed too\n const isEmpty = !(foo.length > 0);\n ```\n ```js,expect_diagnostic\n const isEmptySet = !foo.size;\n ```\n\n ### Valid\n\n ```js\n const isEmpty = foo.length === 0;\n ```\n\n ## Non-zero comparison examples\n Enforce comparison with > 0 when checking for non-zero length.\n\n ### Invalid\n ```js,expect_diagnostic\n const isNotEmpty = foo.length !== 0;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = foo.length != 0;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = foo.length >= 1;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = 0 !== foo.length;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = 0 != foo.length;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = 1 <= foo.length;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = Boolean(foo.length);\n ```\n ```js,expect_diagnostic\n // Negative style is disallowed too\n const isNotEmpty = !(foo.length === 0);\n ```\n ```js,expect_diagnostic\n if (foo.length) {}\n ```\n ```js,expect_diagnostic\n const biome = foo.length ? 1 : 2\n ```\n ```js,expect_diagnostic\n while (foo.length) {}\n ```\n ```js,expect_diagnostic\n do {} while (foo.length);\n ```\n ```js,expect_diagnostic\n for (; foo.length; ) {};\n ```\n\n ### Valid\n\n ```js\n const isNotEmpty = foo.length > 0;\n ```\n ```js\n if (foo.length > 0 || bar.length > 0) {}\n ```\n\n ## Caveats\n This rule assumes that the `length`/`size` property is always numeric, even if it actually is not.\n In the example below the rule will trigger a warning, even though the `size` property is a string.\n ```js,expect_diagnostic\n const foo1 = { size: \"small\" }; if (foo1.size) {}\n ```\n To properly handle this case, type inference would be required, which is not supported by Biome at the moment.\n We recommend disabling this rule when working with non-numeric `length`/`size` properties.\n\n"
          },
          "useImportExtensions": {
            "deprecated": false,
            "version": "next",
            "name": "useImportExtensions",
            "link": "https://biomejs.dev/linter/rules/use-import-extensions",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Enforce file extensions for relative imports.\n\n Browsers and Node.js do not natively support importing files without extensions. This rule\n enforces the use of file extensions for relative imports to make the code more consistent.\n\n Tooling also benefits from explicit file extensions, because they do not need to guess which\n file to resolve.\n\n Rule checks static imports and dynamic imports calls such as `import()` and `require()`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import \"./foo\";\n ```\n ```js,expect_diagnostic\n import \"./bar/\";\n ```\n ```js,expect_diagnostic\n import \"../\";\n ```\n ```js,expect_diagnostic\n import \"../.\";\n ```\n ```js,expect_diagnostic\n import(\"./foo\");\n ```\n ```js,expect_diagnostic\n require(\"./foo\");\n ```\n\n ### Valid\n\n ```js\n import \"biome\";\n ```\n ```js\n import \"./foo.js\";\n ```\n ```js\n import \"./bar/index.js\";\n ```\n ```js\n import(\"./foo.js\");\n ```\n ```js\n require(\"./foo.js\");\n ```\n ## Caveats\n\n If you are using TypeScript, TypeScript version 5.0 and later is required, also make sure to enable\n [allowImportingTsExtensions=true](https://typescriptlang.org/tsconfig#allowImportingTsExtensions) in your `tsconfig.json`.\n\n Rule does not yet check filesystem for file type. It tries to guess which extension\n it should add based on the file extension of the current file and the import path.\n When applying the suggested fix, make sure to verify that the file type is correct.\n\n"
          },
          "useImportRestrictions": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useImportRestrictions",
            "link": "https://biomejs.dev/linter/rules/use-import-restrictions",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintImportAccess": "eslint-plugin-import-access"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallows package private imports.\n\n This rules enforces the following restrictions:\n\n ## Package private visibility\n\n All exported symbols, such as types, functions or other things that may be exported, are\n considered to be \"package private\". This means that modules that reside in the same\n directory, as well as submodules of those \"sibling\" modules, are allowed to import them,\n while any other modules that are further away in the file system are restricted from\n importing them. A symbol's visibility may be extended by re-exporting from an index file.\n\n Notes:\n\n * This rule only applies to relative imports. External dependencies are exempted.\n * This rule only applies to imports for JavaScript and TypeScript files. Imports for\n   resources such as images or CSS files are exempted.\n\n Source: https://github.com/uhyo/eslint-plugin-import-access\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n // Attempt to import from `foo.js` from outside its `sub` module.\n import { fooPackageVariable } from \"./sub/foo.js\";\n ```\n ```js,expect_diagnostic\n // Attempt to import from `bar.ts` from outside its `aunt` module.\n import { barPackageVariable } from \"../aunt/bar.ts\";\n ```\n\n ```js,expect_diagnostic\n // Assumed to resolve to a JS/TS file.\n import { fooPackageVariable } from \"./sub/foo\";\n ```\n\n ```js,expect_diagnostic\n // If the `sub/foo` module is inaccessible, so is its index file.\n import { fooPackageVariable } from \"./sub/foo/index.js\";\n ```\n\n ### Valid\n\n ```js\n // Imports within the same module are always allowed.\n import { fooPackageVariable } from \"./foo.js\";\n\n // Resources (anything other than JS/TS files) are exempt.\n import { barResource } from \"../aunt/bar.png\";\n\n // A parent index file is accessible like other modules.\n import { internal } from \"../../index.js\";\n\n // If the `sub` module is accessible, so is its index file.\n import { subPackageVariable } from \"./sub/index.js\";\n\n // Library imports are exempt.\n import useAsync from \"react-use/lib/useAsync\";\n ```\n\n"
          },
          "useNumberToFixedDigitsArgument": {
            "deprecated": false,
            "version": "next",
            "name": "useNumberToFixedDigitsArgument",
            "link": "https://biomejs.dev/linter/rules/use-number-to-fixed-digits-argument",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintUnicorn": "require-number-to-fixed-digits-argument"
              }
            ],
            "docs": " Enforce using the digits argument with `Number#toFixed()`.\n\n When using `Number#toFixed()` explicitly specify the number of digits you want to appear after the decimal point,\n to avoid unexpected results, rather than relying on its default value of 0.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const string = number.toFixed();\n ```\n\n ### Valid\n\n ```js\n const string = foo.toFixed(0);\n ```\n ```js\n const string = foo.toFixed(2);\n ```\n\n ## Caveats\n\n This rule always assumes that `toFixed` is called on a number.\n It does not check the type of the callee.\n\n"
          },
          "useSortedClasses": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "useSortedClasses",
            "link": "https://biomejs.dev/linter/rules/use-sorted-classes",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Enforce the sorting of CSS utility classes.\n\n This rule implements the same sorting algorithm as [Tailwind CSS](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted), but supports any utility class framework including [UnoCSS](https://unocss.dev/).\n\n It is analogous to [`prettier-plugin-tailwindcss`](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).\n\n\n :::caution\n ## Important notes\n\n This rule is a work in progress, and is only partially implemented. Progress is being tracked in the following GitHub issue: https://github.com/biomejs/biome/issues/1274\n\n Currently, utility class sorting is **not part of the formatter**, and is implemented as a linter rule instead, with an automatic fix. The fix is, at this stage, classified as unsafe. This means that **it won't be applied automatically** as part of IDE actions such as \"fix on save\".\n\n We appreciate any feedback on this rule, and encourage you to try it out and report any issues you find.\n\n **Please read this entire documentation page before reporting an issue.**\n\n Notably, keep in mind that the following features are not supported yet:\n\n - Variant sorting.\n - Custom utilitites and variants (such as ones introduced by Tailwind CSS plugins). Only the default Tailwind CSS configuration is supported.\n - Options such as `prefix` and `separator`.\n - Tagged template literals.\n - Object properties (e.g. in `clsx` calls).\n\n Please don't report issues about these features.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div class=\"px-2 foo p-4 bar\" />;\n ```\n\n ## Options\n\n ### Code-related\n\n ```json\n {\n     \"options\": {\n         \"attributes\": [\"classList\"],\n         \"functions\": [\"clsx\", \"cva\", \"tw\"]\n     }\n }\n ```\n\n #### attributes\n\n Classes in the `class` and `className` JSX attributes are always sorted. Use this option to add more attributes that should be sorted.\n\n #### functions\n\n If specified, strings in the indicated functions will be sorted. This is useful when working with libraries like [`clsx`](https://github.com/lukeed/clsx) or [`cva`](https://cva.style/).\n\n ```js,ignore\n clsx(\"px-2 foo p-4 bar\", {\n     \"block mx-4\": condition,\n });\n ```\n\n Tagged template literals are also supported, for example:\n\n ```js,ignore\n tw`px-2`;\n tw.div`px-2`;\n ```\n\n :::caution\n Tagged template literal support has not been implemented yet.\n :::\n\n ### Sort-related\n\n :::caution\n At the moment, this rule does not support customizing the sort options. Instead, the default Tailwind CSS configuration is hard-coded.\n :::\n\n ## Differences with [Prettier](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)\n\n The main key difference is that Tailwind CSS and its Prettier plugin read and execute the `tailwind.config.js` JavaScript file, which Biome can't do. Instead, Biome implements a simpler version of the configuration. The trade-offs are explained below.\n\n ### Values are not known\n\n The rule has no knowledge of values such as colors, font sizes, or spacing values, which are normally defined in a configuration file like `tailwind.config.js`. Instead, the rule matches utilities that support values in a simpler way: if they start with a known utility prefix, such as `px-` or `text-`, they're considered valid.\n\n This has two implications:\n\n - False positives: classes can be wrongly recognized as utilities even though their values are incorrect. For example, if there's a `px-` utility defined in the configuration, it will match all of the following classes: `px-2`, `px-1337`, `px-[not-actually-valid]`, `px-literally-anything`.\n - No distinction between different utilities that share the same prefix: for example, `text-red-500` and `text-lg` are both interpreted as the same type of utility by this rule, even though the former refers to a color and the latter to a font size. This results in all utilities that share the same prefix being sorted together, regardless of their actual values.\n\n ### Custom additions must be specified\n\n The built-in Tailwind CSS preset (enabled by default) contains the set of utilities and variants that are available with the default configuration. More utilities and variants can be added through Tailwind CSS plugins. In Biome, these need to be manually specified in the Biome configuration file in order to \"extend\" the preset.\n\n ### Presets can't be modified\n\n In Tailwind CSS, core plugins (which provide the default utilities and variants) can be disabled. In Biome, however, there is no way to disable parts of a preset: it's all or nothing. A work-around is to, instead of using a preset, manually specify all utilities and variants in the Biome configuration file.\n\n ### Whitespace is collapsed\n\n The Tailwind CSS Prettier plugin preserves all original whitespace. This rule, however, collapses all whitespace (including newlines) into single spaces.\n\n This is a deliberate decision. We're unsure about this behavior, and would appreciate feedback on it. If this is a problem for you, please share a detailed explanation of your use case in [the GitHub issue](https://github.com/biomejs/biome/issues/1274).\n\n"
          },
          "useThrowNewError": {
            "deprecated": false,
            "version": "next",
            "name": "useThrowNewError",
            "link": "https://biomejs.dev/linter/rules/use-throw-new-error",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintUnicorn": "throw-new-error"
              }
            ],
            "docs": " Require `new` when throwing an error.\n\n While it's possible to instantiate `Error` without using the `new` keyword, it's better to be consistent: modern builtins require `new` to be instantiated.\n\n Rule matches errors when their name ends with the word \"Error\" and the first character is uppercase.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n throw Error();\n ```\n ```js,expect_diagnostic\n throw TypeError('biome');\n ```\n ```js,expect_diagnostic\n throw lib.TypeError();\n ```\n\n ### Valid\n\n ```js\n throw new Error();\n ```\n ```js\n throw new TypeError('biome');\n ```\n ```js\n throw new lib.TypeError();\n ```\n\n"
          },
          "useThrowOnlyError": {
            "deprecated": false,
            "version": "next",
            "name": "useThrowOnlyError",
            "link": "https://biomejs.dev/linter/rules/use-throw-only-error",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-throw-literal"
              },
              {
                "eslintTypeScript": "no-throw-literal"
              },
              {
                "eslint": "only-throw-error"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow throwing non-`Error` values.\n\n It is considered good practice only to throw the `Error` object itself or an object using the `Error` object\n as base objects for user-defined exceptions. The fundamental benefit of `Error` objects is that they automatically\n keep track of where they were built and originated.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n throw undefined;\n ```\n ```js,expect_diagnostic\n throw false;\n ```\n ```js,expect_diagnostic\n throw \"a\" + \"b\";\n ```\n\n ### Valid\n\n ```js\n throw new Error();\n ```\n ```js\n throw new TypeError('biome');\n ```\n ```js\n class CustomError extends Error {}\n\n throw new CustomError();\n ```\n\n ## Caveats\n\n This rule only covers cases where throwing the value can be known statically.\n Complex cases such as object and function access aren't checked.\n This will be improved in the future once Biome supports type inference.\n\n"
          },
          "useTopLevelRegex": {
            "deprecated": false,
            "version": "next",
            "name": "useTopLevelRegex",
            "link": "https://biomejs.dev/linter/rules/use-top-level-regex",
            "recommended": false,
            "fixKind": "none",
            "docs": " Require regex literals to be declared at the top level.\n\n This rule is useful to avoid performance issues when using regex literals inside functions called many times (hot paths). Regex literals create a new RegExp object when they are evaluated. (See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) By declaring them at the top level, this overhead can be avoided.\n\n It's important to note that this rule is not recommended for all cases. Placing regex literals at the top level can hurt startup times. In browser contexts, this can result in longer page loads.\n\n Additionally, this rule ignores regular expressions with the `g` and/or `y` flags, as they maintain internal state and can cause\n [side effects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex#avoiding_side_effects) when calling `test` and `exec` with them.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function foo(someString) {\n     return /[a-Z]*/.test(someString)\n }\n ```\n\n ### Valid\n\n ```js\n const REGEX = /[a-Z]*/;\n\n function foo(someString) {\n     return REGEX.test(someString)\n }\n ```\n\n ```js\n function foo(str) {\n     return /[a-Z]*/g.exec(str)\n }\n ```\n\n"
          }
        },
        "performance": {
          "noAccumulatingSpread": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noAccumulatingSpread",
            "link": "https://biomejs.dev/linter/rules/no-accumulating-spread",
            "recommended": true,
            "fixKind": "none",
            "docs": " Disallow the use of spread (`...`) syntax on accumulators.\n\n Spread syntax allows an iterable to be expanded into its individual elements.\n\n Spread syntax should be avoided on accumulators (like those in `.reduce`)\n because it causes a time complexity of `O(n^2)` instead of `O(n)`.\n\n Source: https://prateeksurana.me/blog/why-using-object-spread-with-reduce-bad-idea/\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var a = ['a', 'b', 'c'];\n a.reduce((acc, val) => [...acc, val], []);\n ```\n\n ```js,expect_diagnostic\n var a = ['a', 'b', 'c'];\n a.reduce((acc, val) => {return [...acc, val];}, []);\n ```\n\n ```js,expect_diagnostic\n var a = ['a', 'b', 'c'];\n a.reduce((acc, val) => ({...acc, [val]: val}), {});\n ```\n\n ### Valid\n\n ```js\n var a = ['a', 'b', 'c'];\n a.reduce((acc, val) => {acc.push(val); return acc}, []);\n ```\n\n"
          },
          "noDelete": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDelete",
            "link": "https://biomejs.dev/linter/rules/no-delete",
            "recommended": true,
            "fixKind": "unsafe",
            "docs": " Disallow the use of the `delete` operator.\n\n The `delete` operator enables the removal of a property from an object.\n\n The `delete` operator should be avoided because it [can prevent some optimizations of _JavaScript_ engines](https://webkit.org/blog/10298/inline-caching-delete/).\n Moreover, it can lead to unexpected results.\n For instance, deleting an array element [does not change the length of the array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete#deleting_array_elements).\n\n The only legitimate use of `delete` is on an object that behaves like a _map_.\n To allow this pattern, this rule does not report `delete` on computed properties that are not literal values.\n Consider using [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) instead of an object.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const arr = [1, 2, 3];\n delete arr[0];\n ```\n\n ```js,expect_diagnostic\n const obj = {a: {b: {c: 123}}};\n delete obj.a.b.c;\n ```\n\n ### Valid\n\n ```js\n const foo = new Set([1,2,3]);\n foo.delete(1);\n```\n\n ```js\n const map = Object.create(null);\n const key = \"key\"\n map[key] = \"value\"\n delete map[key];\n```\n\n ```js\n let x = 5;\n delete f(); // uncovered by this rule.\n```\n\n"
          },
          "noReExportAll": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noReExportAll",
            "link": "https://biomejs.dev/linter/rules/no-re-export-all",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintBarrelFiles": "avoid-re-export-all"
              }
            ],
            "sourceKind": "sameLogic",
            "docs": " Avoid re-export all.\n\n Deeply nested import chains in modular projects, where a barrel file imports another barrel file, can lead to increased load times and complexity.\n This structure results in the unnecessary loading of many modules, significantly impacting performance in large-scale applications.\n Additionally, it complicates the codebase, making it difficult to navigate and understand the project's dependency graph.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n export * from \"foo\";\n ```\n\n ```js,expect_diagnostic\n export * as foo from \"foo\";\n ```\n\n ### Valid\n\n ```js\n export { foo } from \"foo\";\n ```\n\n ```ts\n export type * from \"foo\";\n export type * as bar from \"bar\";\n ```\n\n"
          }
        },
        "security": {
          "noGlobalEval": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "noGlobalEval",
            "link": "https://biomejs.dev/linter/rules/no-global-eval",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-eval"
              }
            ],
            "docs": " Disallow the use of global `eval()`.\n\n The `eval()` function evaluates the passed string as a _JavaScript_ code.\n The executed code can access and mutate variables in the scope where the function is called.\n\n The use of `eval()` exposes to [security risks and performance issues](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!).\n If the executed code is somehow affected by a malicious party,\n then you may end up executing malicious code with the privileges of the caller.\n Moreover, changing variables in the caller's scope is expensive in modern _JavaScript_ interpreters.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n eval(\"var a = 0\");\n ```\n\n ```js,expect_diagnostic\n (0, globalThis.eval)(\"var a = 0\")\n ```\n\n ```js,expect_diagnostic\n f(eval);\n ```\n\n ```js,expect_diagnostic\n const aliasedEval = eval;\n ```\n\n ### Valid\n\n ```cjs\n function f(eval) {\n     eval(\"let a = 0;\");\n }\n ```\n\n The rule is not able to detect cases where the global object is aliased:\n\n ```js\n let foo = globalThis;\n foo.eval(\"let a = 0;\");\n ```\n"
          }
        },
        "style": {
          "noArguments": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noArguments",
            "link": "https://biomejs.dev/linter/rules/no-arguments",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "prefer-rest-params"
              }
            ],
            "docs": " Disallow the use of `arguments`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function f() {\n    console.log(arguments);\n }\n ```\n\n ### Valid\n\n ```cjs\n function f() {\n     let arguments = 1;\n     console.log(arguments);\n }\n ```\n"
          },
          "noCommaOperator": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noCommaOperator",
            "link": "https://biomejs.dev/linter/rules/no-comma-operator",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-sequences"
              }
            ],
            "docs": " Disallow comma operator.\n\n The comma operator includes multiple expressions where only one is expected.\n It evaluates every operand from left to right and returns the value of the last operand.\n It frequently obscures side effects, and its use is often an accident.\n\n The use of the comma operator in the initialization and update parts of a `for` is still allowed.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = (doSomething(), 0);\n ```\n\n ```js,expect_diagnostic\n for (; doSomething(), !!test; ) {}\n ```\n\n ```js,expect_diagnostic\n // Use a semicolon instead.\n let a, b;\n a = 1, b = 2;\n ```\n\n ### Valid\n\n ```js\n for(a = 0, b = 0; (a + b) < 10; a++, b += 2) {}\n ```\n\n"
          },
          "noDefaultExport": {
            "deprecated": false,
            "version": "1.4.0",
            "name": "noDefaultExport",
            "link": "https://biomejs.dev/linter/rules/no-default-export",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintImport": "no-default-export"
              }
            ],
            "docs": " Disallow default exports.\n\n Default exports cannot be easily discovered inside an editor:\n They cannot be suggested by the editor when the user tries to import a name.\n\n Also, default exports don't encourage consistency over a code base:\n the module that imports the default export must choose a name.\n It is likely that different modules use different names.\n\n Moreover, default exports encourage exporting an object that acts as a namespace.\n This is a legacy pattern used to mimic CommonJS modules.\n\n For all these reasons, a team may want to disallow default exports.\n\n Note that this rule disallows only default exports in EcmaScript Module.\n It ignores CommonJS default exports.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n export default function f() {};\n ```\n\n ```js,expect_diagnostic\n export default class C {};\n ```\n\n ```js,expect_diagnostic\n export default {\n     f() {},\n     g() {},\n };\n ```\n\n ```js,expect_diagnostic\n export { X as default };\n ```\n\n ### Valid\n\n ```js\n export function f () {};\n export class C {};\n export { default as X } from \"mod\";\n ```\n\n ```cjs\n module.exports = class {};\n ```\n\n"
          },
          "noNamespaceImport": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noNamespaceImport",
            "link": "https://biomejs.dev/linter/rules/no-namespace-import",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintBarrelFiles": "avoid-namespace-import"
              }
            ],
            "sourceKind": "sameLogic",
            "docs": " Disallow the use of namespace imports.\n\n Namespace imports might impact the efficiency of tree shaking, a process that removes unused code from bundles.\n The effectiveness of tree shaking largely depends on the bundler (e.g., Webpack, Rollup) and its configuration.\n Modern bundlers are generally capable of handling namespace imports effectively, but using named imports is recommended for optimal tree shaking and minimizing bundle size.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import * as foo from \"foo\";\n ```\n\n ### Valid\n\n ```ts\n import { foo } from \"foo\"\n import type { bar } from \"bar\"\n import type * as baz from \"baz\"\n ```\n\n"
          },
          "noNegationElse": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noNegationElse",
            "link": "https://biomejs.dev/linter/rules/no-negation-else",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "no-negated-condition"
              },
              {
                "clippy": "if_not_else"
              }
            ],
            "docs": " Disallow negation in the condition of an `if` statement if it has an `else` clause.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (!cond) { f();} else { g();}\n ```\n\n ```js,expect_diagnostic\n !cond ? 0 : 1\n```\n\n ### Valid\n\n ```js\n if (!cond) { f(); }\n```\n\n ```js\n cond ? 1 : 0\n```\n\n ```js\n if (!cond) { f(); }\n```\n\n ```js\n if (!!val) { f(); } else { g(); }\n```\n"
          },
          "noParameterAssign": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noParameterAssign",
            "link": "https://biomejs.dev/linter/rules/no-parameter-assign",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-param-reassign"
              }
            ],
            "docs": " Disallow reassigning `function` parameters.\n\n Assignment to a `function` parameters can be misleading and confusing,\n as modifying parameters will also mutate the `arguments` object.\n It is often unintended and indicative of a programmer error.\n\n In contrast to the _ESLint_ rule, this rule cannot be configured to report\n assignments to a property of a parameter.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function f(param) {\n     param = 13;\n }\n ```\n\n ```js,expect_diagnostic\n function f(param) {\n     param++;\n }\n ```\n\n ```js,expect_diagnostic\n function f(param) {\n     for (param of arr) {}\n }\n ```\n\n ```ts,expect_diagnostic\n class C {\n     constructor(readonly prop: number) {\n         prop++\n     }\n }\n ```\n\n ### Valid\n\n ```js\n function f(param) {\n     let local = param;\n }\n ```\n\n"
          },
          "noRestrictedGlobals": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noRestrictedGlobals",
            "link": "https://biomejs.dev/linter/rules/no-restricted-globals",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-restricted-globals"
              }
            ],
            "docs": " This rule allows you to specify global variable names that you don’t want to use in your application.\n\n > Disallowing usage of specific global variables can be useful if you want to allow a set of\n global variables by enabling an environment, but still want to disallow some of those.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n console.log(event)\n ```\n\n ### Valid\n ```js\n function f(event) {\n     console.log(event)\n }\n ```\n ## Options\n\n Use the options to specify additional globals that you want to restrict in your\n source code.\n\n ```json\n {\n     \"//\": \"...\",\n     \"options\": {\n         \"deniedGlobals\": [\"$\", \"MooTools\"]\n     }\n }\n ```\n\n In the example above, the rule will emit a diagnostics if tried to use `$` or `MooTools` without\n creating a local variable.\n\n"
          },
          "noShoutyConstants": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noShoutyConstants",
            "link": "https://biomejs.dev/linter/rules/no-shouty-constants",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Disallow the use of constants which its value is the upper-case version of its name.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const FOO = \"FOO\";\n console.log(FOO);\n ```\n\n ### Valid\n\n ```js\n let FOO = \"FOO\";\n console.log(FOO);\n ```\n\n ```js\n export const FOO = \"FOO\";\n console.log(FOO);\n ```\n\n ```js\n function f(FOO = \"FOO\") {\n     return FOO;\n }\n ```\n\n"
          },
          "noUselessElse": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noUselessElse",
            "link": "https://biomejs.dev/linter/rules/no-useless-else",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-else-return"
              },
              {
                "clippy": "redundant_else \t"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow `else` block when the `if` block breaks early.\n\n If an `if` block breaks early using a breaking statement (`return`, `break`, `continue`, or `throw`),\n then the `else` block becomes useless.\n Its contents can be placed outside of the block.\n\n If an `if` block breaks early using a breaking statement (`return`, `break`, `continue`, or `throw`),\n then the `else` block becomes unnecessary.\n This is because the content of the `else` block will never be executed in conjunction with the `if` block,\n as the breaking statement ensures the control flow exits the `if` block immediately.\n Therefore, the `else` block is redundant, and its content can be placed outside of the block,\n reducing the indentation level by one.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n while (x > 0) {\n     if (f(x)) {\n         break;\n     } else {\n         x++\n     }\n }\n ```\n\n ```js,expect_diagnostic\n function f(x) {\n     if (x < 0) {\n         return 0;\n     } else {\n         return x;\n     }\n }\n ```\n\n ```js,expect_diagnostic\n function f(x) {\n     if (x < 0) {\n         throw new RangeError();\n     } else {\n         return x;\n     }\n }\n ```\n\n ### Valid\n\n ```js\n function f(x) {\n     if (x < 0) {\n         return 0;\n     }\n     return x;\n }\n ```\n\n ```js\n function f(x) {\n     if (x < 0) {\n         console.info(\"negative number\");\n     } else if (x > 0) {\n         return x;\n     } else {\n         console.info(\"number 0\");\n     }\n }\n ```\n"
          },
          "noVar": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noVar",
            "link": "https://biomejs.dev/linter/rules/no-var",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-var"
              }
            ],
            "docs": " Disallow the use of `var`\n\n ECMAScript 6 allows programmers to create variables with block scope instead of function scope using the let and const keywords.\n\n Block scope is common in many other programming languages and helps programmers avoid mistakes.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var foo = 1;\n ```\n\n ### Valid\n\n ```js\n const foo = 1;\n let bar = 1;\n```\n"
          },
          "useBlockStatements": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useBlockStatements",
            "link": "https://biomejs.dev/linter/rules/use-block-statements",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "curly"
              }
            ],
            "docs": " Requires following curly brace conventions.\n\n JavaScript allows the omission of curly braces when a block contains only one statement. However, it is considered by many to be best practice to never omit curly braces around blocks, even when they are optional, because it can lead to bugs and reduces code clarity.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n  if (x) x;\n ```\n\n ```js,expect_diagnostic\n  if (x) {\n    x;\n  } else y;\n ```\n\n ```js,expect_diagnostic\n if (x) {\n   x;\n } else if (y) y;\n ```\n\n ```js,expect_diagnostic\n    for (;;);\n ```\n\n ```js,expect_diagnostic\n    for (p in obj);\n ```\n\n ```js,expect_diagnostic\n   for (x of xs);\n ```\n\n ```js,expect_diagnostic\n   do;\n   while (x);\n ```\n\n ```js,expect_diagnostic\n    while (x);\n ```\n\n ```js,expect_diagnostic\n   with (x);\n ```\n"
          },
          "useCollapsedElseIf": {
            "deprecated": false,
            "version": "1.1.0",
            "name": "useCollapsedElseIf",
            "link": "https://biomejs.dev/linter/rules/use-collapsed-else-if",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "no-lonely-if"
              },
              {
                "clippy": "collapsible_else_if"
              }
            ],
            "docs": " Enforce using `else if` instead of nested `if` in `else` clauses.\n\n If an `if` statement is the only statement in the `else` block, it is often clearer to use an `else if` form.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (condition) {\n     // ...\n } else {\n     if (anotherCondition) {\n         // ...\n     }\n }\n ```\n\n ```js,expect_diagnostic\n if (condition) {\n     // ...\n } else {\n     if (anotherCondition) {\n         // ...\n     } else {\n         // ...\n     }\n }\n ```\n\n ```js,expect_diagnostic\n if (condition) {\n     // ...\n } else {\n     // Comment\n     if (anotherCondition) {\n         // ...\n     }\n }\n ```\n\n ### Valid\n\n ```js\n if (condition) {\n     // ...\n } else if (anotherCondition) {\n     // ...\n }\n ```\n\n ```js\n if (condition) {\n     // ...\n } else if (anotherCondition) {\n     // ...\n } else {\n     // ...\n }\n ```\n\n ```js\n if (condition) {\n     // ...\n } else {\n     if (anotherCondition) {\n         // ...\n     }\n     doSomething();\n }\n ```\n\n"
          },
          "useConst": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useConst",
            "link": "https://biomejs.dev/linter/rules/use-const",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "prefer-const"
              }
            ],
            "docs": " Require `const` declarations for variables that are only assigned once.\n\n Variables that are initialized and never reassigned and\n variables that are only assigned once can be declared as `const`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let a = 3;\n console.log(a);\n ```\n\n ```js,expect_diagnostic\n // `a` is redefined (not reassigned) on each loop step.\n for (let a of [1, 2, 3]) {\n     console.log(a);\n }\n ```\n\n ```js,expect_diagnostic\n // `a` is redefined (not reassigned) on each loop step.\n for (let a in [1, 2, 3]) {\n     console.log(a);\n }\n ```\n\n ```js,expect_diagnostic\n let a;\n a = 0;\n ```\n\n ```js,expect_diagnostic\n let a = 3;\n {\n     let a = 4;\n     a = 2;\n }\n ```\n\n ### Valid\n\n ```js\n let a = 2;\n a = 3;\n console.log(a);\n ```\n\n ```js\n let a = 1, b = 2;\n b = 3;\n ```\n\n ```js\n let a;\n a; // the variable is read before its assignement\n a = 0;\n ```\n"
          },
          "useDefaultParameterLast": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useDefaultParameterLast",
            "link": "https://biomejs.dev/linter/rules/use-default-parameter-last",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "default-param-last"
              },
              {
                "eslintTypeScript": "default-param-last"
              }
            ],
            "docs": " Enforce default function parameters and optional function parameters to be last.\n\n Default and optional parameters that precede a required parameter cannot be omitted at call site.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function f(a = 0, b) {}\n ```\n\n ```js,expect_diagnostic\n function f(a, b = 0, c) {}\n ```\n\n ```ts,expect_diagnostic\n function f(a: number, b?: number, c: number) {}\n ```\n\n ```ts,expect_diagnostic\n class Foo {\n     constructor(readonly a = 10, readonly b: number) {}\n }\n ```\n\n ### Valid\n\n ```js\n function f(a, b = 0) {}\n ```\n\n ```ts\n function f(a: number, b?: number, c = 0) {}\n ```\n\n ```ts\n function f(a: number, b = 0, c?: number) {}\n ```\n\n"
          },
          "useExponentiationOperator": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useExponentiationOperator",
            "link": "https://biomejs.dev/linter/rules/use-exponentiation-operator",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "prefer-exponentiation-operator"
              }
            ],
            "docs": " Disallow the use of `Math.pow` in favor of the `**` operator.\n\n Introduced in ES2016, the infix exponentiation operator `**` is an alternative for the standard `Math.pow` function.\n Infix notation is considered to be more readable and thus more preferable than the function notation.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = Math.pow(2, 8);\n ```\n\n ```js,expect_diagnostic\n const bar = Math.pow(a, b);\n ```\n\n ```js,expect_diagnostic\n let baz = Math.pow(a + b, c + d);\n ```\n\n ```js,expect_diagnostic\n let quux = Math.pow(-1, n);\n ```\n\n ### Valid\n\n ```js\n const foo = 2 ** 8;\n\n const bar = a ** b;\n\n let baz = (a + b) ** (c + d);\n\n let quux = (-1) ** n;\n ```\n\n"
          },
          "useFilenamingConvention": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "useFilenamingConvention",
            "link": "https://biomejs.dev/linter/rules/use-filenaming-convention",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintUnicorn": "filename-case"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Enforce naming conventions for JavaScript and TypeScript filenames.\n\n Enforcing [naming conventions](https://en.wikipedia.org/wiki/Naming_convention_(programming)) helps to keep the codebase consistent.\n\n A filename consists of two parts: a name and a set of consecutive extension.\n For instance, `my-filename.test.js` has `my-filename` as name, and two consecutive extensions: `.test` and `.js`.\n\n The filename can start with a dot or a plus sign, be prefixed and suffixed by underscores `_`.\n For example, `.filename.js`, `+filename.js`, `__filename__.js`, or even `.__filename__.js`.\n\n The convention of prefixing a filename with a plus sign is used by\n [Sveltekit](https://kit.svelte.dev/docs/routing#page) and [Vike](https://vike.dev/route).\n\n By default, the rule ensures that the filename is either in [`camelCase`], [`kebab-case`], [`snake_case`],\n or equal to the name of one export in the file.\n\n ## Ignoring some files\n\n Sometimes you want to completly ignore some files.\n Biome ignore comments cannot be used because the rule applies on filenames not file contents.\n To ignore files, you can use [`overrides`](https://biomejs.dev/reference/configuration/#overrides).\n If you want to ignore all files in the `test` directory, then you can disable the rule for those files only:\n\n ```json\n {\n   \"overrides\": [\n     {\n        \"include\": [\"test/**/*\"],\n        \"linter\": {\n          \"style\": {\n            \"useFilenamingConvention\": \"off\"\n          }\n        }\n     }\n   ]\n }\n ```\n\n ## Options\n\n The rule provides several options that are detailed in the following subsections.\n\n ```json\n {\n     \"//\": \"...\",\n     \"options\": {\n         \"strictCase\": false,\n         \"requireAscii\": true,\n         \"filenameCases\": [\"camelCase\", \"export\"]\n     }\n }\n ```\n\n ### strictCase\n\n When this option is set to `true`, it forbids consecutive uppercase characters in [`camelCase`] and [`PascalCase`].\n For instance,  when the option is set to `true`, `agentID` will throw an error.\n This name should be renamed to `agentId`.\n\n When the option is set to `false`, consecutive uppercase characters are allowed.\n `agentID` is so valid.\n\n Default: `true`\n\n ### requireAscii\n\n When this option is set to `true`, it forbids names that include non-ASCII characters.\n For instance,  when the option is set to `true`, `café` or `안녕하세요` will throw an error.\n\n When the option is set to `false`, a name may include non-ASCII characters.\n `café` and `안녕하세요` are so valid.\n\n Default: `false`\n\n **This option will be turned on by default in Biome 2.0.**\n\n ### filenameCases\n\n By default, the rule enforces that the filename  is either in [`camelCase`], [`kebab-case`], [`snake_case`], or equal to the name of one export in the file.\n\n You can enforce a stricter convention by setting `filenameCases` option.\n `filenameCases` accepts an array of cases among the following cases: [`camelCase`], [`kebab-case`], [`PascalCase`], [`snake_case`], and `export`.\n\n [case]: https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats\n [`camelCase`]: https://en.wikipedia.org/wiki/Camel_case\n [`kebab-case`]: https://en.wikipedia.org/wiki/Letter_case#Kebab_case\n [`PascalCase`]: https://en.wikipedia.org/wiki/Camel_case\n [`snake_case`]: https://en.wikipedia.org/wiki/Snake_case\n"
          },
          "useForOf": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "useForOf",
            "link": "https://biomejs.dev/linter/rules/use-for-of",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintTypeScript": "prefer-for-of"
              },
              {
                "eslintUnicorn": "no-for-loop"
              }
            ],
            "docs": " This rule recommends a `for-of` loop when in a `for` loop, the index used to extract an item from the iterated array.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n for (let i = 0; i < array.length; i++) {\n   console.log(array[i]);\n }\n ```\n\n ### Valid\n\n ```js\n for (let item of array) {\n    console.log(item);\n  }\n ```\n\n ```js\n for (let i = 0; i < array.length; i++) {\n    console.log(i, array[i]);\n  }\n ```\n\n ```js\n for (let i = 0, j = 0; i < array.length; i++) {\n    console.log(i, array[i]);\n  }\n ```\n\n"
          },
          "useNodeAssertStrict": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "useNodeAssertStrict",
            "link": "https://biomejs.dev/linter/rules/use-node-assert-strict",
            "recommended": false,
            "fixKind": "safe",
            "docs": " Promotes the usage of `node:assert/strict` over `node:assert`.\n\n If you prefer stricter assertions when using the Node.js assertion module, the package `node:assert/strict` exposes a set of alias for stricter assertions.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import * as assert from \"node:assert\"\n ```\n\n ### Valid\n\n ```js\n import * as assert from \"node:assert/strict\"\n ```\n\n"
          },
          "useNodejsImportProtocol": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "useNodejsImportProtocol",
            "link": "https://biomejs.dev/linter/rules/use-nodejs-import-protocol",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintUnicorn": "prefer-node-protocol"
              }
            ],
            "docs": " Enforces using the `node:` protocol for Node.js builtin modules.\n\n The rule marks traditional imports like `import fs from \"fs\";` as invalid,\n suggesting the format `import fs from \"node:fs\";` instead.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import fs from 'fs';\n ```\n\n ```js,expect_diagnostic\n import os from 'os';\n ```\n\n ```js,expect_diagnostic\n import path from 'path';\n ```\n\n ### Valid\n\n ```js\n import fs from 'node:fs';\n\n import os from 'node:os';\n\n import path from 'node:path';\n ```\n\n"
          },
          "useNumberNamespace": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "useNumberNamespace",
            "link": "https://biomejs.dev/linter/rules/use-number-namespace",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintUnicorn": "prefer-number-properties"
              }
            ],
            "docs": " Use the `Number` properties instead of global ones.\n\n _ES2015_ moved some globals into the `Number` properties for consistency.\n\n The rule doesn't report the globals `isFinite` and `isNan` because they have a slightly different behavior to their corresponding `Number`'s properties `Number.isFinite` and `Number.isNan`.\n You can use the dedicated rules [noGlobalIsFinite](https://biomejs.dev/linter/rules/no-global-is-finite/) and  [noGlobalIsNan](https://biomejs.dev/linter/rules/no-global-is-nan/) to enforce the use of `Number.isFinite` and `Number.isNan`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n parseInt(\"1\"); // true\n ```\n\n ```js,expect_diagnostic\n parseFloat(\"1.1\"); // true\n ```\n\n ```js,expect_diagnostic\n NaN; // true\n ```\n\n ```js,expect_diagnostic\n Infinity; // true\n ```\n\n ```js,expect_diagnostic\n -Infinity; // true\n ```\n\n ### Valid\n\n ```js\n Number.parseInt(\"1\"); // false\n ```\n\n ```js\n Number.parseFloat(\"1.1\"); // false\n ```\n\n ```js\n Number.NaN; // false\n ```\n\n ```js\n Number.POSITIVE_INFINITY; // false\n ```\n\n ```js\n Number.NEGATIVE_INFINITY; // false\n ```\n\n"
          },
          "useNumericLiterals": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useNumericLiterals",
            "link": "https://biomejs.dev/linter/rules/use-numeric-literals",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "prefer-numeric-literals"
              }
            ],
            "docs": " Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals\n\n _JavaScript_ provides literal forms for binary, octal, and hexadecimal numbers.\n For example: `0b11`, `0o77`, and `0xff`.\n Using the literal forms enable static code analysis and avoid unnecessary computations.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n parseInt(\"111110111\", 2);\n ```\n\n ```js,expect_diagnostic\n Number.parseInt(\"767\", 8);\n ```\n\n ```js,expect_diagnostic\n Number.parseInt(\"-1f7\", 16);\n ```\n\n ### Valid\n\n ```js\n parseInt(1);\n parseInt(1, 3);\n Number.parseInt(1);\n Number.parseInt(1, 3);\n\n 0b111110111 === 503;\n 0o767 === 503;\n 0x1F7 === 503;\n\n a[parseInt](1,2);\n\n parseInt(foo);\n parseInt(foo, 2);\n Number.parseInt(foo);\n Number.parseInt(foo, 2);\n ```\n"
          },
          "useSelfClosingElements": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useSelfClosingElements",
            "link": "https://biomejs.dev/linter/rules/use-self-closing-elements",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintStylistic": "jsx-self-closing-comp"
              }
            ],
            "docs": " Prevent extra closing tags for components without children\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n <div></div>\n ```\n\n ```js,expect_diagnostic\n <Component></Component>\n ```\n\n ```js,expect_diagnostic\n <Foo.bar></Foo.bar>\n ```\n\n ### Valid\n\n ```js\n <div />\n```\n\n ```js\n <div>child</div>\n```\n\n ```js\n <Component />\n```\n\n ```js\n <Component>child</Component>\n```\n\n ```js\n <Foo.bar />\n```\n\n ```js\n <Foo.bar>child</Foo.bar>\n```\n"
          },
          "useShorthandAssign": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "useShorthandAssign",
            "link": "https://biomejs.dev/linter/rules/use-shorthand-assign",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "operator-assignment"
              }
            ],
            "docs": " Require assignment operator shorthand where possible.\n\n JavaScript provides shorthand operators combining a variable assignment and simple mathematical operation.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n a = a + 1;\n ```\n\n ```js,expect_diagnostic\n a = a - 1;\n ```\n\n  ```js,expect_diagnostic\n a = a * 1;\n ```\n\n ### Valid\n\n ```js\n a += 1;\n ```\n\n ```js\n a -= 1;\n ```\n\n  ```js\n a *= 1;\n ```\n"
          },
          "useSingleCaseStatement": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useSingleCaseStatement",
            "link": "https://biomejs.dev/linter/rules/use-single-case-statement",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Enforces switch clauses have a single statement, emits a quick fix wrapping the statements in a block.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n switch (foo) {\n     case true:\n     case false:\n         let foo = '';\n         foo;\n }\n ```\n\n ### Valid\n\n ```js\n switch (foo) {\n     case true:\n     case false: {\n         let foo = '';\n         foo;\n     }\n }\n ```\n"
          },
          "useSingleVarDeclarator": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useSingleVarDeclarator",
            "link": "https://biomejs.dev/linter/rules/use-single-var-declarator",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "one-var"
              }
            ],
            "docs": " Disallow multiple variable declarations in the same variable statement\n\n In JavaScript, multiple variables can be declared within a single `var`, `const` or `let` declaration.\n It is often considered a best practice to declare every variable separately.\n That is what this rule enforces.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let foo = 0, bar, baz;\n ```\n\n ### Valid\n\n ```js\n const foo = 0;\n let bar;\n let baz;\n ```\n\n ```js\n for (let i = 0, x = 1; i < arr.length; i++) {}\n ```\n"
          },
          "useTemplate": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useTemplate",
            "link": "https://biomejs.dev/linter/rules/use-template",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "prefer-template"
              }
            ],
            "docs": " Prefer template literals over string concatenation.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const s = foo + \"baz\";\n ```\n\n ```js,expect_diagnostic\n const s = 1 + 2 + \"foo\" + 3;\n ```\n\n ```js,expect_diagnostic\n const s = 1 * 2 + \"foo\";\n ```\n\n ```js,expect_diagnostic\n const s = 1 + \"foo\" + 2 + \"bar\" + \"baz\" + 3;\n ```\n\n ### Valid\n\n ```js\n let s = \"foo\" + \"bar\" + `baz`;\n ```\n\n ```js\n let s = `value: ${1}`;\n ```\n"
          },
          "useWhile": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useWhile",
            "link": "https://biomejs.dev/linter/rules/use-while",
            "recommended": true,
            "fixKind": "safe",
            "docs": " Enforce the use of `while` loops instead of `for` loops when the initializer and update expressions are not needed.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n for (; x.running;) {\n     x.step();\n }\n ```\n\n ### Valid\n\n ```js\n for(let x = 0; x < 10; i++) {}\n ```\n\n ```js\n let x = 0\n for(; x < 10; i++) {}\n ```\n\n ```js\n for(let x = 0; x < 10;) {\n     i++\n }\n ```\n"
          }
        },
        "suspicious": {
          "noApproximativeNumericConstant": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noApproximativeNumericConstant",
            "link": "https://biomejs.dev/linter/rules/no-approximative-numeric-constant",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "clippy": "approx_constant"
              }
            ],
            "docs": " Use standard constants instead of approximated literals.\n\n Usually, the definition in the standard library is more precise than\n what people come up with or the used constant exceeds the maximum precision of the number type.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let x = 3.141;\n ```\n\n ```js,expect_diagnostic\n let x = 2.302;\n ```\n\n ### Valid\n\n ```js\n let x = Math.PI;\n let y = 3.14;\n ```\n\n ```js\n let x = Math.LN10;\n ```\n"
          },
          "noAssignInExpressions": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noAssignInExpressions",
            "link": "https://biomejs.dev/linter/rules/no-assign-in-expressions",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-cond-assign"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow assignments in expressions.\n\n In expressions, it is common to mistype a comparison operator (such as `==`) as an assignment operator (such as `=`).\n Moreover, the use of assignments in expressions is confusing.\n Indeed, expressions are often considered as side-effect free.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n let a, b;\n a = (b = 1) + 1;\n ```\n\n ```ts,expect_diagnostic\n let a;\n if (a = 1) {\n }\n ```\n\n ```ts,expect_diagnostic\n function f(a) {\n     return a = 1;\n }\n ```\n\n ### Valid\n\n ```ts\n let a;\n a = 1;\n ```\n"
          },
          "noAsyncPromiseExecutor": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noAsyncPromiseExecutor",
            "link": "https://biomejs.dev/linter/rules/no-async-promise-executor",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-async-promise-executor"
              }
            ],
            "docs": " Disallows using an async function as a Promise executor.\n\n The executor function can also be an async function. However, this is usually a mistake, for a few reasons:\n 1. If an async executor function throws an error, the error will be lost and won't cause the newly-constructed `Promise` to reject. This could make it difficult to debug and handle some errors.\n 2. If a Promise executor function is using `await`, this is usually a sign that it is not actually necessary to use the `new Promise` constructor, or the scope of the `new Promise` constructor can be reduced.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n new Promise(async function foo(resolve, reject) {})\n ```\n\n ```js,expect_diagnostic\n   new Promise(async (resolve, reject) => {})\n ```\n\n ```js,expect_diagnostic\n   new Promise(((((async () => {})))))\n ```\n\n ### Valid\n\n ```js\n   new Promise((resolve, reject) => {})\n   new Promise((resolve, reject) => {}, async function unrelated() {})\n   new Foo(async (resolve, reject) => {})\n   new Foo((( (resolve, reject) => {} )))\n ```\n"
          },
          "noCatchAssign": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noCatchAssign",
            "link": "https://biomejs.dev/linter/rules/no-catch-assign",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-ex-assign"
              }
            ],
            "docs": " Disallow reassigning exceptions in catch clauses.\n\n Assignment to a `catch` parameter can be misleading and confusing.\n It is often unintended and indicative of a programmer error.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n try {\n\n } catch (e) {\n   e;\n   e = 10;\n }\n ```\n\n ### Valid\n\n ```js\n try {\n\n } catch (e) {\n   let e = 10;\n   e = 100;\n }\n ```\n"
          },
          "noClassAssign": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noClassAssign",
            "link": "https://biomejs.dev/linter/rules/no-class-assign",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-class-assign"
              }
            ],
            "docs": " Disallow reassigning class members.\n\n A class declaration creates a variable that we can modify, however, the modification is a mistake in most cases.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A {}\n A = 0;\n ```\n\n ```js,expect_diagnostic\n A = 0;\n class A {}\n ```\n\n ```js,expect_diagnostic\n class A {\n \tb() {\n \t\tA = 0;\n \t}\n }\n ```\n\n ```js,expect_diagnostic\n let A = class A {\n \tb() {\n \t\tA = 0;\n \t\t// `let A` is shadowed by the class name.\n \t}\n }\n ```\n\n ### Valid\n\n ```js\n let A = class A {}\n A = 0; // A is a variable.\n ```\n\n ```js\n let A = class {\n     b() {\n         A = 0; // A is a variable.\n     }\n }\n ```\n\n ```js\n class A {\n \tb(A) {\n \t\tA = 0; // A is a parameter.\n \t}\n }\n ```\n\n"
          },
          "noCompareNegZero": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noCompareNegZero",
            "link": "https://biomejs.dev/linter/rules/no-compare-neg-zero",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "no-compare-neg-zero"
              }
            ],
            "docs": " Disallow comparing against `-0`\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n (1 >= -0)\n ```\n\n ### Valid\n\n ```js\n (1 >= 0)\n```\n"
          },
          "noConfusingLabels": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noConfusingLabels",
            "link": "https://biomejs.dev/linter/rules/no-confusing-labels",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-labels"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow labeled statements that are not loops.\n\n Labeled statements in JavaScript are used in conjunction with `break` and `continue` to control flow around multiple loops.\n Their use for other statements is suspicious and unfamiliar.\n\n The rule ignores reactive Svelte statements in Svelte components.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n label: f();\n ```\n\n ```js,expect_diagnostic\n label: {\n     f();\n     break label;\n }\n ```\n\n ```js,expect_diagnostic\n label: if (a) {\n     f()\n     break label;\n }\n ```\n\n ```js,expect_diagnostic\n label: switch (a) {\n     case 0:\n         break label;\n }\n ```\n\n ### Valid\n\n ```js\n outer: while (a) {\n     while(b) {\n         break outer;\n     }\n }\n ```\n\n ```svelte\n <script>\n $: { /* reactive block */ }\n </script>\n ```\n"
          },
          "noConsoleLog": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noConsoleLog",
            "link": "https://biomejs.dev/linter/rules/no-console-log",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-console"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow the use of `console.log`\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n console.log()\n ```\n\n ### Valid\n\n ```js\n console.info(\"info\");\n console.warn(\"warn\");\n console.error(\"error\");\n console.assert(true);\n console.table([\"foo\", \"bar\"]);\n const console = { log() {} };\n console.log();\n ```\n\n"
          },
          "noControlCharactersInRegex": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noControlCharactersInRegex",
            "link": "https://biomejs.dev/linter/rules/no-control-characters-in-regex",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-control-regex"
              }
            ],
            "docs": " Prevents from having control characters and some escape sequences that match control characters in regular expressions.\n\n Control characters are hidden special characters that are numbered from 0 to 31 in the ASCII system.\n They're not commonly used in JavaScript text. So, if you see them in a pattern (called a regular expression), it's probably a mistake.\n\n The following elements of regular expression patterns are considered possible errors in typing and are therefore disallowed by this rule:\n\n - Hexadecimal character escapes from `\\x00` to `\\x1F`\n - Unicode character escapes from `\\u0000` to `\\u001F`\n - Unicode code point escapes from `\\u{0}` to `\\u{1F}`\n - Unescaped raw characters from U+0000 to U+001F\n\n Control escapes such as `\\t` and `\\n` are allowed by this rule.\n\n ## Examples\n\n ### Invalid\n ```js,expect_diagnostic\n  var pattern1 = /\\x00/;\n ```\n ```js,expect_diagnostic\n  var pattern2 = /\\x0C/;\n ```\n ```js,expect_diagnostic\n  var pattern3 = /\\x1F/;\n ```\n ```js,expect_diagnostic\n  var pattern4 = /\\u000C/;\n ```\n ```js,expect_diagnostic\n  var pattern5 = /\\u{C}/u;\n ```\n ```js,expect_diagnostic\n  var pattern7 = new RegExp(\"\\x0C\");\n ```\n ```js,expect_diagnostic\n  var pattern7 = new RegExp(\"\\\\x0C\");\n ```\n\n ### Valid\n ```js\n var pattern1 = /\\x20/;\n var pattern2 = /\\u0020/;\n var pattern3 = /\\u{20}/u;\n var pattern4 = /\\t/;\n var pattern5 = /\\n/;\n var pattern6 = new RegExp(\"\\x20\");\n ```\n\n"
          },
          "noDebugger": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDebugger",
            "link": "https://biomejs.dev/linter/rules/no-debugger",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-debugger"
              }
            ],
            "docs": " Disallow the use of `debugger`\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n debugger;\n ```\n\n ### Valid\n\n ```js\n const test = { debugger: 1 };\n test.debugger;\n```\n"
          },
          "noDoubleEquals": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDoubleEquals",
            "link": "https://biomejs.dev/linter/rules/no-double-equals",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "eqeqeq"
              }
            ],
            "docs": " Require the use of `===` and `!==`\n\n It is generally bad practice to use `==` for comparison instead of\n `===`. Double operators will trigger implicit [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)\n and are thus not prefered. Using strict equality operators is almost\n always best practice.\n\n For ergonomic reasons, this rule makes an exception for `== null` for\n comparing to both `null` and `undefined`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n foo == bar\n ```\n\n ### Valid\n\n ```js\n foo == null\n```\n\n ```js\n foo != null\n```\n\n ```js\n null == foo\n```\n\n ```js\n null != foo\n```\n"
          },
          "noDuplicateCase": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDuplicateCase",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-case",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-duplicate-case"
              }
            ],
            "docs": " Disallow duplicate case labels.\n\n If a switch statement has duplicate test expressions in case clauses, it is likely that a programmer copied a case clause but forgot to change the test expression.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n switch (a) {\n     case 1:\n         break;\n     case 1:\n         break;\n     default:\n         break;\n }\n ```\n\n ```js,expect_diagnostic\n switch (a) {\n     case one:\n         break;\n     case one:\n         break;\n     default:\n         break;\n }\n ```\n\n ```js,expect_diagnostic\n switch (a) {\n     case \"1\":\n         break;\n     case \"1\":\n         break;\n     default:\n         break;\n }\n ```\n\n ### Valid\n\n ```js\n switch (a) {\n     case 1:\n         break;\n     case 2:\n         break;\n     default:\n         break;\n }\n ```\n\n ```js\n switch (a) {\n     case one:\n         break;\n     case two:\n         break;\n     default:\n         break;\n }\n ```\n\n ```js\n switch (a) {\n     case \"1\":\n         break;\n     case \"2\":\n         break;\n     default:\n         break;\n }\n ```\n"
          },
          "noDuplicateClassMembers": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDuplicateClassMembers",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-class-members",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-dupe-class-members"
              },
              {
                "eslintTypeScript": "no-dupe-class-members"
              }
            ],
            "docs": " Disallow duplicate class members.\n\n If there are declarations of the same name among class members,\n the last declaration overwrites other declarations silently.\n It can cause unexpected behaviours.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class Foo {\n   bar() { }\n   bar() { }\n }\n ```\n\n ```js,expect_diagnostic\n class Foo {\n   bar() { }\n   get bar() { }\n }\n ```\n\n ```js,expect_diagnostic\n class Foo {\n   bar;\n   bar() { }\n }\n ```\n\n ```js,expect_diagnostic\n class Foo {\n   static bar() { }\n   static bar() { }\n }\n ```\n\n ### Valid\n\n ```js\n class Foo {\n   bar() { }\n   qux() { }\n }\n ```\n\n ```js\n class Foo {\n   set bar(value) { }\n   get bar() { }\n }\n ```\n\n ```js\n class Foo {\n   bar;\n   qux;\n }\n ```\n\n ```js\n class Foo {\n   bar;\n   qux() { }\n }\n ```\n\n ```js\n class Foo {\n   static bar() { }\n   bar() { }\n }\n ```\n\n"
          },
          "noDuplicateObjectKeys": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDuplicateObjectKeys",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-object-keys",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-dupe-keys"
              }
            ],
            "docs": " Prevents object literals having more than one property declaration for the same name.\n\n If an object property with the same name is defined multiple times (except when combining a getter with a setter), only the last definition makes it into the object and previous definitions are ignored, which is likely a mistake.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const obj = {\n\t\ta: 1,\n\t\ta: 2,\n }\n ```\n\n ```js,expect_diagnostic\n const obj = {\n\t\tset a(v) {},\n\t\ta: 2,\n }\n ```\n\n ### Valid\n\n ```js\n const obj = {\n\t\ta: 1,\n\t\tb: 2,\n }\n ```\n\n ```js\n const obj = {\n\t\tget a() { return 1; },\n\t\tset a(v) {},\n }\n ```\n\n"
          },
          "noDuplicateParameters": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDuplicateParameters",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-parameters",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-dupe-args"
              }
            ],
            "docs": "  Disallow duplicate function parameter name.\n\n If more than one parameter has the same name in a function definition,\n the last occurrence overrides the preceding occurrences.\n A duplicated name might be a typing error.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var f = function(a, b, b) {}\n ```\n\n ```js,expect_diagnostic\n function b(a, b, b) {}\n ```\n\n ### Valid\n\n ```js\n function i(i, b, c) {}\n var j = function (j, b, c) {};\n function k({ k, b }, { c, d }) {}\n function l([, l]) {}\n function foo([[a, b], [c, d]]) {}\n ```\n"
          },
          "noDuplicateTestHooks": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noDuplicateTestHooks",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-test-hooks",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJest": "no-duplicate-hooks"
              }
            ],
            "sourceKind": "inspired",
            "docs": " A `describe` block should not contain duplicate hooks.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n describe('foo', () => {\n   beforeEach(() => {\n     // some setup\n   });\n   beforeEach(() => {\n     // some setup\n   });\n   test('foo_test', () => {\n    // some test\n   });\n });\n ```\n\n ```js,expect_diagnostic\n describe('foo', () => {\n   beforeEach(() => {\n     // some setup\n   });\n   test('foo_test', () => {\n     afterAll(() => {\n       // some teardown\n     });\n    afterAll(() => {\n      // some teardown\n    });\n   });\n });\n ```\n\n ### Valid\n\n ```js\n describe('foo', () => {\n   beforeEach(() => {\n     // some setup\n   });\n   test('foo_test', () => {\n     // some test\n   });\n });\n ```\n\n"
          },
          "noEmptyBlockStatements": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noEmptyBlockStatements",
            "link": "https://biomejs.dev/linter/rules/no-empty-block-statements",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-empty"
              },
              {
                "eslint": "no-empty-static-block"
              },
              {
                "eslint": "no-empty-function"
              },
              {
                "eslintTypeScript": "no-empty-function"
              }
            ],
            "docs": " Disallow empty block statements and static blocks.\n\n Empty static blocks and block statements, while not technically errors, usually occur due to refactoring that wasn’t completed. They can cause confusion when reading code.\n\n This rule disallows empty block statements and static blocks.\n This rule ignores block statements or static blocks which contain a comment (for example, in an empty catch or finally block of a try statement to indicate that execution should continue regardless of errors).\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function emptyFunctionBody () {}\n ```\n\n ```js,expect_diagnostic\n try {\n     doSomething();\n } catch(ex) {\n\n }\n ```\n\n ```js,expect_diagnostic\n class Foo {\n   static {}\n }\n ```\n\n ### Valid\n\n ```js\n function foo () {\n     doSomething();\n }\n ```\n\n ```js\n try {\n   doSomething();\n } catch (ex) {\n   // continue regardless of error\n }\n ```\n\n"
          },
          "noExportsInTest": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noExportsInTest",
            "link": "https://biomejs.dev/linter/rules/no-exports-in-test",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJest": "no-export"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow using `export` or `module.exports` in files containing tests\n\n This rule aims to eliminate duplicate runs of tests by exporting things from test files.\n If you import from a test file, then all the tests in that file will be run in each imported instance,\n so bottom line, don't export from a test, but instead move helper functions into a separate file when they need to be shared across tests.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n export function myHelper() {}\n describe('a test', () => {\n     expect(1).toBe(1);\n });\n ```\n\n ### Valid\n\n ```js\n function myHelper() {}\n describe('a test', () => {\n     expect(1).toBe(1);\n });\n ```\n\n"
          },
          "noFallthroughSwitchClause": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noFallthroughSwitchClause",
            "link": "https://biomejs.dev/linter/rules/no-fallthrough-switch-clause",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-fallthrough"
              }
            ],
            "docs": " Disallow fallthrough of `switch` clauses.\n\n Switch clauses in `switch` statements fall through by default.\n This can lead to unexpected behavior when forgotten.\n\n > The rule doesn't take `process.exit()` in consideration.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n switch (bar) {\n \tcase 0:\n \t\ta();\n \tcase 1:\n \t\tb();\n }\n ```\n\n ### Valid\n\n ```js\n switch (foo) {\n \tcase 1:\n     case 2:\n \t\tdoSomething();\n \t\tbreak;\n     case 3: {\n         if (cond) {\n             break;\n         } else {\n             break;\n         }\n     }\n \tcase 4:\n \t\tdoSomething();\n }\n ```\n\n"
          },
          "noFocusedTests": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noFocusedTests",
            "link": "https://biomejs.dev/linter/rules/no-focused-tests",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJest": "no-focused-tests"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow focused tests.\n\n Disabled test are useful when developing and debugging, because it forces the test suite to run only certain tests.\n\n However, in pull/merge request, you usually want to run all the test suite.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n describe.only(\"foo\", () => {});\n ```\n\n ```js,expect_diagnostic\n test.only(\"foo\", () => {});\n ```\n\n ### Valid\n ```js\n test(\"foo\", () => {});\n ```\n"
          },
          "noFunctionAssign": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noFunctionAssign",
            "link": "https://biomejs.dev/linter/rules/no-function-assign",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-func-assign"
              }
            ],
            "docs": " Disallow reassigning function declarations.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function foo() { };\n foo = bar;\n ```\n\n ```js,expect_diagnostic\n function foo() {\n     foo = bar;\n  }\n ```\n\n ```js,expect_diagnostic\n foo = bar;\n function foo() { };\n ```\n\n ```js,expect_diagnostic\n [foo] = bar;\n function foo() { };\n ```\n\n ```js,expect_diagnostic\n ({ x: foo = 0 } = bar);\n function foo() { };\n ```\n\n ```js,expect_diagnostic\n function foo() {\n     [foo] = bar;\n  }\n ```\n ```js,expect_diagnostic\n (function () {\n     ({ x: foo = 0 } = bar);\n     function foo() { };\n  })();\n ```\n\n ### Valid\n\n ```js\n function foo() {\n     var foo = bar;\n  }\n ```\n\n ```js\n function foo(foo) {\n     foo = bar;\n  }\n ```\n\n ```js\n function foo() {\n     var foo;\n     foo = bar;\n  }\n ```\n\n ```js\n var foo = () => {};\n foo = bar;\n ```\n\n ```js\n var foo = function() {};\n foo = bar;\n ```\n\n ```js\n var foo = function() {\n     foo = bar;\n  };\n ```\n\n ```js\n import bar from 'bar';\n function foo() {\n     var foo = bar;\n }\n ```\n"
          },
          "noGlobalAssign": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "noGlobalAssign",
            "link": "https://biomejs.dev/linter/rules/no-global-assign",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-global-assign"
              }
            ],
            "docs": " Disallow assignments to native objects and read-only global variables.\n\n _JavaScript environments contain numerous built-in global variables, such as `window` in browsers and `process` in _Node.js.\n Assigning values to these global variables can be problematic as it can override essential functionality.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n Object = null;\n ```\n\n ```js,expect_diagnostic\n window = {};\n ```\n\n ```js,expect_diagnostic\n undefined = true;\n ```\n\n ### Valid\n\n ```js\n a = 0;\n ```\n\n ```js\n let window;\n window = {};\n ```\n"
          },
          "noGlobalIsFinite": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noGlobalIsFinite",
            "link": "https://biomejs.dev/linter/rules/no-global-is-finite",
            "recommended": true,
            "fixKind": "unsafe",
            "docs": " Use `Number.isFinite` instead of global `isFinite`.\n\n `Number.isFinite()` and `isFinite()` [do not have the same behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#difference_between_number.isfinite_and_global_isfinite).\n When the argument to `isFinite()` is not a number, the value is first coerced to a number.\n `Number.isFinite()` does not perform this coercion.\n Therefore, it is a more reliable way to test whether a number is finite.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n isFinite(false); // true\n ```\n\n ### Valid\n\n ```js\n Number.isFinite(false); // false\n ```\n"
          },
          "noGlobalIsNan": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noGlobalIsNan",
            "link": "https://biomejs.dev/linter/rules/no-global-is-nan",
            "recommended": true,
            "fixKind": "unsafe",
            "docs": " Use `Number.isNaN` instead of global `isNaN`.\n\n `Number.isNaN()` and `isNaN()` [do not have the same behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN#description).\n When the argument to `isNaN()` is not a number, the value is first coerced to a number.\n `Number.isNaN()` does not perform this coercion.\n Therefore, it is a more reliable way to test whether a value is `NaN`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n isNaN({}); // true\n ```\n\n ### Valid\n\n ```js\n Number.isNaN({}); // false\n ```\n\n"
          },
          "noImportAssign": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noImportAssign",
            "link": "https://biomejs.dev/linter/rules/no-import-assign",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-import-assign"
              }
            ],
            "docs": "  Disallow assigning to imported bindings\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import x from \"y\";\n x = 1;\n ```\n ```js,expect_diagnostic\n import y from \"y\";\n [y] = 1;\n ```\n ```js,expect_diagnostic\n import z from \"y\";\n ({ z } = 1);\n ```\n ```js,expect_diagnostic\n import a from \"y\";\n [...a] = 1;\n ```\n ```js,expect_diagnostic\n import b from \"y\";\n ({ ...b } = 1);\n ```\n ```js,expect_diagnostic\n import c from \"y\";\n for (c in y) {};\n ```\n\n ```js,expect_diagnostic\n import d from \"y\";\n d += 1;\n ```\n ```js,expect_diagnostic\n import * as e from \"y\";\n e = 1;\n ```\n"
          },
          "noLabelVar": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noLabelVar",
            "link": "https://biomejs.dev/linter/rules/no-label-var",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-label-var"
              }
            ],
            "docs": "  Disallow labels that share a name with a variable\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const x1 = \"test\";\n x1: expr;\n ```\n\n ### Valid\n\n ```js\n const x = \"test\";\n z: expr;\n ```\n"
          },
          "noMisleadingCharacterClass": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "noMisleadingCharacterClass",
            "link": "https://biomejs.dev/linter/rules/no-misleading-character-class",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslint": "no-misleading-character-class"
              }
            ],
            "docs": " Disallow characters made with multiple code points in character class syntax.\n\n Unicode includes the characters which are made with multiple code points. e.g. Á, 🇯🇵, 👨‍👩‍👦.\n A RegExp character class `/[abc]/` cannot handle characters with multiple code points.\n For example, the character `❇️` consists of two code points: `❇` (U+2747) and `VARIATION SELECTOR-16` (U+FE0F).\n If this character is in a RegExp character class, it will match to either `❇` or `VARIATION SELECTOR-16` rather than `❇️`.\n This rule reports the regular expressions which include multiple code point characters in character class syntax.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n /^[Á]$/u;\n ```\n\n ```js,expect_diagnostic\n /^[❇️]$/u;\n ```\n\n ```js,expect_diagnostic\n /^[👶🏻]$/u;\n ```\n\n ```js,expect_diagnostic\n /^[🇯🇵]$/u;\n ```\n\n ```js,expect_diagnostic\n /^[👨‍👩‍👦]$/u;\n ```\n\n ```js,expect_diagnostic\n /^[👍]$/; // surrogate pair without u flag\n ```\n\n ### Valid\n\n ```js\n /^[abc]$/;\n /^[👍]$/u;\n /^[\\q{👶🏻}]$/v;\n ```\n"
          },
          "noMisrefactoredShorthandAssign": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noMisrefactoredShorthandAssign",
            "link": "https://biomejs.dev/linter/rules/no-misrefactored-shorthand-assign",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "clippy": "misrefactored_assign_op"
              }
            ],
            "docs": " Disallow shorthand assign when variable appears on both sides.\n\n This rule helps to avoid potential bugs related to incorrect assignments or unintended\n side effects that may occur during refactoring.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n a += a + b\n ```\n\n ```js,expect_diagnostic\n a -= a - b\n ```\n\n ```js,expect_diagnostic\n a *= a * b\n ```\n\n ### Valid\n\n ```js\n a += b\n ```\n\n ```js\n a = a + b\n ```\n\n ```js\n a = a - b\n ```\n"
          },
          "noPrototypeBuiltins": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noPrototypeBuiltins",
            "link": "https://biomejs.dev/linter/rules/no-prototype-builtins",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-prototype-builtins"
              }
            ],
            "docs": " Disallow direct use of `Object.prototype` builtins.\n\n ECMAScript 5.1 added `Object.create` which allows the creation of an object with a custom prototype.\n This pattern is often used for objects used as Maps. However, this pattern can lead to errors\n if something else relies on prototype properties/methods.\n Moreover, the methods could be shadowed, this can lead to random bugs and denial of service\n vulnerabilities. For example, calling `hasOwnProperty` directly on parsed JSON like `{\"hasOwnProperty\": 1}` could lead to vulnerabilities.\n To avoid subtle bugs like this, you should call these methods from `Object.prototype`.\n For example, `foo.isPrototypeOf(bar)` should be replaced with `Object.prototype.isPrototypeOf.call(foo, \"bar\")`\n As for the `hasOwn` method, `foo.hasOwn(\"bar\")` should be replaced with `Object.hasOwn(foo, \"bar\")`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var invalid = foo.hasOwnProperty(\"bar\");\n ```\n\n ```js,expect_diagnostic\n var invalid = foo.isPrototypeOf(bar);\n ```\n\n ```js,expect_diagnostic\n var invalid = foo.propertyIsEnumerable(\"bar\");\n ```\n\n ### Valid\n\n ```js\n var valid = Object.hasOwn(foo, \"bar\");\n var valid = Object.prototype.isPrototypeOf.call(foo, bar);\n var valid = {}.propertyIsEnumerable.call(foo, \"bar\");\n ```\n\n"
          },
          "noRedeclare": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noRedeclare",
            "link": "https://biomejs.dev/linter/rules/no-redeclare",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-redeclare"
              },
              {
                "eslintTypeScript": "no-redeclare"
              }
            ],
            "docs": " Disallow variable, function, class, and type redeclarations in the same scope.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var a = 3;\n var a = 10;\n ```\n\n ```js,expect_diagnostic\n let a = 3;\n let a = 10;\n ```\n\n ```js,expect_diagnostic\n function f() {}\n function f() {}\n ```\n\n ```js,expect_diagnostic\n class C {\n     static {\n         var c = 3;\n         var c = 10;\n     }\n }\n ```\n\n ```ts,expect_diagnostic\n type Person = { name: string; }\n class Person { name: string; }\n ```\n\n ### Valid\n\n ```js\n var a = 3;\n a = 10;\n ```\n\n ```ts\n class Foo {\n     bar(a: A);\n     bar(a: A, b: B);\n     bar(a: A, b: B) {}\n }\n ```\n"
          },
          "noRedundantUseStrict": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noRedundantUseStrict",
            "link": "https://biomejs.dev/linter/rules/no-redundant-use-strict",
            "recommended": true,
            "fixKind": "safe",
            "docs": " Prevents from having redundant `\"use strict\"`.\n\n The directive `\"use strict\"` **isn't** needed in `.mjs` files, or in `.js` files inside projects where the `package.json` defines library as module:\n\n\n ```json,ignore\n {\n    \"type\": \"module\"\n }\n ```\n\n Instead, `.cjs` files are considered \"scripts\" and the directive `\"use strict\"` is accepted and advised.\n\n Note that the leading trivia, e.g., comments or newlines preceding\n the redundant `\"use strict\"` will also be removed. So that comment\n directives won't be transferred to a wrong place.\n\n ## Examples\n\n ### Invalid\n ```cjs,expect_diagnostic\n \"use strict\";\n function foo() {\n  \t\"use strict\";\n }\n ```\n ```cjs,expect_diagnostic\n \"use strict\";\n \"use strict\";\n\n function foo() {\n\n }\n ```\n ```cjs,expect_diagnostic\n function foo() {\n \"use strict\";\n \"use strict\";\n }\n ```\n ```cjs,expect_diagnostic\n class C1 {\n \ttest() {\n \t\t\"use strict\";\n \t}\n }\n ```\n ```cjs,expect_diagnostic\n const C2 = class {\n \ttest() {\n \t\t\"use strict\";\n \t}\n };\n\n ```\n ### Valid\n ```cjs\n function foo() {\n\n }\n```\n ```cjs\n  function foo() {\n     \"use strict\";\n }\n function bar() {\n     \"use strict\";\n }\n```\n\n"
          },
          "noSelfCompare": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noSelfCompare",
            "link": "https://biomejs.dev/linter/rules/no-self-compare",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-self-compare"
              },
              {
                "clippy": "eq_op"
              }
            ],
            "docs": " Disallow comparisons where both sides are exactly the same.\n\n > Comparing a variable against itself is usually an error, either a typo or refactoring error. It is confusing to the reader and may potentially introduce a runtime error.\n\n > The only time you would compare a variable against itself is when you are testing for `NaN`.\n However, it is far more appropriate to use `typeof x === 'number' && Number.isNaN(x)` for that use case rather than leaving the reader of the code to determine the intent of self comparison.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (x === x) {}\n ```\n\n ```js,expect_diagnostic\n if (a.b.c() !== a.b .c()) {}\n ```\n\n"
          },
          "noShadowRestrictedNames": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noShadowRestrictedNames",
            "link": "https://biomejs.dev/linter/rules/no-shadow-restricted-names",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "no-shadow-restricted-names"
              }
            ],
            "docs": " Disallow identifiers from shadowing restricted names.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function NaN() {}\n ```\n\n ```js,expect_diagnostic\n let Set;\n ```\n\n ```js,expect_diagnostic\n try {\t} catch(Object) {}\n ```\n\n ```js,expect_diagnostic\n function Array() {}\n ```\n\n ```js,expect_diagnostic\n function test(JSON) {console.log(JSON)}\n ```\n"
          },
          "noSkippedTests": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noSkippedTests",
            "link": "https://biomejs.dev/linter/rules/no-skipped-tests",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJest": "no-disabled-tests"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow disabled tests.\n\n Disabled test are useful when developing and debugging, although they should not be committed in production.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n describe.skip(\"test\", () => {});\n ```\n\n ```js,expect_diagnostic\n test.skip(\"test\", () => {});\n ```\n\n ## Valid\n\n ```js\n test.only(\"test\", () => {});\n test(\"test\", () => {});\n ```\n\n"
          },
          "noSparseArray": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noSparseArray",
            "link": "https://biomejs.dev/linter/rules/no-sparse-array",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-sparse-array"
              }
            ],
            "docs": " Disallow sparse arrays\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n [1,,2]\n ```\n"
          },
          "noSuspiciousSemicolonInJsx": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noSuspiciousSemicolonInJsx",
            "link": "https://biomejs.dev/linter/rules/no-suspicious-semicolon-in-jsx",
            "recommended": true,
            "fixKind": "none",
            "docs": " It detects possible \"wrong\" semicolons inside JSX elements.\n\n Semicolons that appear after a self-closing element or a closing element are usually the result of a typo of a refactor gone wrong.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const Component = () => {\n   return (\n     <div>\n       <div />;\n     </div>\n  );\n }\n ```\n\n ### Valid\n\n ```js\n const Component = () => {\n   return (\n     <div>\n       <div />\n       ;\n     </div>\n   );\n }\n const Component2 = () => {\n   return (\n     <div>\n       <span>;</span>\n     </div>\n   );\n }\n ```\n\n"
          },
          "noThenProperty": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "noThenProperty",
            "link": "https://biomejs.dev/linter/rules/no-then-property",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintUnicorn": "no-thenable"
              }
            ],
            "docs": " Disallow `then` property.\n\n When combining objects with a `then` method (thenable objects) with await expressions or dynamic imports, caution is necessary.\n These syntaxes interpret the object's then method as intended for the resolution or rejection of a promise, which can lead to unexpected behavior or errors.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n export {then};\n ```\n\n ```js,expect_diagnostic\n const foo = {\n     then() {}\n };\n ```\n\n ```js,expect_diagnostic\n const foo = {\n     get then() {}\n };\n ```\n\n ```js,expect_diagnostic\n const foo = {\n    get then() {}\n };\n ```\n\n ```js,expect_diagnostic\n foo.then = function () {}\n ```\n\n ```js,expect_diagnostic\n class Foo {\n     then() {}\n }\n ```\n\n ```js,expect_diagnostic\n class Foo {\n     static then() {}\n }\n ```\n\n ### Valid\n\n ```js\n export {then as success};\n ```\n\n ```js\n const foo = {\n     success() {}\n };\n ```\n\n ```js\n class Foo {\n     success() {}\n }\n ```\n\n ```js\n const foo = bar.then;\n ```\n\n"
          },
          "noUnsafeNegation": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnsafeNegation",
            "link": "https://biomejs.dev/linter/rules/no-unsafe-negation",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "no-unsafe-negation"
              }
            ],
            "docs": " Disallow using unsafe negation.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n !1 in [1,2];\n ```\n\n ```js,expect_diagnostic\n /**test*/!/** test*/1 instanceof [1,2];\n ```\n\n ### Valid\n ```js\n -1 in [1,2];\n ~1 in [1,2];\n typeof 1 in [1,2];\n void 1 in [1,2];\n delete 1 in [1,2];\n +1 instanceof [1,2];\n ```\n"
          },
          "useAwait": {
            "deprecated": false,
            "version": "1.4.0",
            "name": "useAwait",
            "link": "https://biomejs.dev/linter/rules/use-await",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "require-await"
              },
              {
                "eslintTypeScript": "require-await"
              }
            ],
            "docs": " Ensure `async` functions utilize `await`.\n\n This rule reports `async` functions that lack an `await` expression. As `async`\n functions return a promise, the use of `await` is often necessary to capture the\n resolved value and handle the asynchronous operation appropriately. Without `await`,\n the function operates synchronously and might not leverage the advantages of async\n functions.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n async function fetchData() {\n // Missing `await` for the promise returned by `fetch`\n   return fetch('/data');\n }\n ```\n\n ### Valid\n\n ```js\n async function fetchData() {\n   const response = await fetch('/data');\n   const data = await response.json();\n   return data;\n }\n\n // This rule does not warn about non-async functions\n function processData() {\n   return compute(data);\n }\n\n // Nor does it warn about empty `async` functions\n async function noop() { }\n ```\n"
          },
          "useDefaultSwitchClauseLast": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useDefaultSwitchClauseLast",
            "link": "https://biomejs.dev/linter/rules/use-default-switch-clause-last",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "default-case-last"
              }
            ],
            "docs": " Enforce default clauses in switch statements to be last\n\n A switch statement can optionally have a default clause.\n\n If present, it’s usually the last clause, but it doesn’t need to be. It is also allowed to put the default clause before all case clauses, or anywhere between.\n The behavior is mostly the same as if it was the last clause.\n\n The default block will be still executed only if there is no match in the case clauses (including those defined after the default),\n but there is also the ability to “fall through” from the default clause to the following clause in the list.\n However, such flow is not common and it would be confusing to the readers.\n\n Even if there is no \"fall through\" logic, it’s still unexpected to see the default clause before or between the case clauses. By convention, it is expected to be the last clause.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n switch (foo) {\n     default:\n         break;\n     case 0:\n         break;\n }\n ```\n\n ```js,expect_diagnostic\n switch (foo) {\n     default:\n         f();\n     case 0:\n         break;\n }\n ```\n\n ```js,expect_diagnostic\n switch (foo) {\n     case 0:\n         break;\n     default:\n     case 1:\n         break;\n }\n ```\n\n ### Valid\n\n ```js\n switch (foo) {\n     case 0:\n         break;\n     case 1:\n     default:\n         break;\n }\n ```\n\n ```js\n switch (foo) {\n     case 0:\n         break;\n }\n ```\n\n"
          },
          "useGetterReturn": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useGetterReturn",
            "link": "https://biomejs.dev/linter/rules/use-getter-return",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslint": "getter-return"
              }
            ],
            "docs": " Enforce `get` methods to always return a value.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class Person {\n     get firstName() {}\n }\n ```\n\n ```js,expect_diagnostic\n const obj = {\n     get firstName() {\n         return;\n     }\n }\n ```\n\n ```js,expect_diagnostic\n class Option {\n     get value() {\n         if (this.hasValue) {\n             log();\n         } else {\n             return null;\n         }\n     }\n }\n ```\n\n ### Valid\n\n ```js\n class Person {\n     get firstName() {\n         return this.fullname.split(\" \")[0];\n     }\n }\n ```\n\n ```js\n const obj = {\n     get firstName() {\n         return this.fullname.split(\" \")[0];\n     }\n }\n ```\n\n"
          },
          "useIsArray": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useIsArray",
            "link": "https://biomejs.dev/linter/rules/use-is-array",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintUnicorn": "no-instanceof-array"
              }
            ],
            "docs": " Use `Array.isArray()` instead of `instanceof Array`.\n\n In _JavaScript_ some array-like objects such as _arguments_ are not instances of the `Array` class.    ///\n Moreover, the global `Array` class can be different between two execution contexts.\n For instance, two frames in a web browser have a distinct `Array` class.\n Passing arrays across these contexts, results in arrays that are not instances of the contextual global `Array` class.\n To avoid these issues, use `Array.isArray()` instead of `instanceof Array`.\n See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) for more details.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const xs = [];\n if (xs instanceof Array) {}\n ```\n\n ### Valid\n\n ```js\n const xs = [];\n if (Array.isArray(xs)) {}\n ```\n\n"
          },
          "useValidTypeof": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useValidTypeof",
            "link": "https://biomejs.dev/linter/rules/use-valid-typeof",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslint": "valid-typeof"
              }
            ],
            "docs": " This rule verifies the result of `typeof $expr` unary expressions is being compared to valid values, either string literals containing valid type names or other `typeof` expressions\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n typeof foo === \"strnig\"\n ```\n\n ```js,expect_diagnostic\n typeof foo == \"undefimed\"\n ```\n\n ```js,expect_diagnostic\n typeof bar != \"nunber\"\n ```\n\n ```js,expect_diagnostic\n typeof bar !== \"fucntion\"\n ```\n\n ```js,expect_diagnostic\n typeof foo === undefined\n ```\n\n ```js,expect_diagnostic\n typeof bar == Object\n ```\n\n ```js,expect_diagnostic\n typeof foo === baz\n ```\n\n ```js,expect_diagnostic\n typeof foo == 5\n ```\n\n ```js,expect_diagnostic\n typeof foo == -5\n ```\n\n ### Valid\n\n ```js\n typeof foo === \"string\"\n ```\n\n ```js\n typeof bar == \"undefined\"\n ```\n\n ```js\n typeof bar === typeof qux\n ```\n"
          }
        }
      },
      "json": {
        "nursery": {
          "noDuplicateJsonKeys": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDuplicateJsonKeys",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-json-keys",
            "recommended": true,
            "fixKind": "none",
            "docs": " Disallow two keys with the same name inside a JSON object.\n\n ## Examples\n\n ### Invalid\n\n ```json,expect_diagnostic\n {\n   \"title\": \"New title\",\n   \"title\": \"Second title\"\n }\n ```\n\n ### Valid\n\n ```json\n {\n   \"title\": \"New title\",\n   \"secondTitle\": \"Second title\"\n }\n ```\n"
          }
        }
      },
      "jsx": {
        "a11y": {
          "noAccessKey": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noAccessKey",
            "link": "https://biomejs.dev/linter/rules/no-access-key",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "no-access-key"
              }
            ],
            "docs": " Enforce that the `accessKey` attribute is not used on any HTML element.\n\n The `accessKey` assigns a keyboard shortcut to the current element. However, the `accessKey` value\n can conflict with keyboard commands used by screen readers and keyboard-only users, which leads to\n inconsistent keyboard actions across applications. To avoid accessibility complications,\n this rule suggests users remove the `accessKey` attribute on elements.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <input type=\"submit\" accessKey=\"s\" value=\"Submit\" />\n ```\n\n ```jsx,expect_diagnostic\n <a href=\"https://webaim.org/\" accessKey=\"w\">WebAIM.org</a>\n ```\n\n ```jsx,expect_diagnostic\n <button accessKey=\"n\">Next</button>\n ```\n\n ## Resources\n\n - [WebAIM: Keyboard Accessibility - Accesskey](https://webaim.org/techniques/keyboard/accesskey#spec)\n - [MDN `accesskey` documentation](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/accesskey)\n\n"
          },
          "noAriaHiddenOnFocusable": {
            "deprecated": false,
            "version": "1.4.0",
            "name": "noAriaHiddenOnFocusable",
            "link": "https://biomejs.dev/linter/rules/no-aria-hidden-on-focusable",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "no-aria-hidden-on-focusable"
              }
            ],
            "docs": " Enforce that aria-hidden=\"true\" is not set on focusable elements.\n\n `aria-hidden=\"true\"` can be used to hide purely decorative content from screen reader users.\n A focusable element with `aria-hidden=\"true\"` can be reached by keyboard.\n This can lead to confusion or unexpected behavior for screen reader users.\n\n ## Example\n\n ### Invalid\n\n ```js,expect_diagnostic\n <div aria-hidden=\"true\" tabIndex=\"0\" />\n ```\n\n ```js, expect_diagnostic\n <a href=\"/\" aria-hidden=\"true\" />\n ```\n\n ### Valid\n\n ```js\n <button aria-hidden=\"true\" tabIndex=\"-1\" />\n ```\n\n ```js\n <div aria-hidden=\"true\"><a href=\"#\"></a></div>\n ```\n\n ## Resources\n\n - [aria-hidden elements do not contain focusable elements](https://dequeuniversity.com/rules/axe/html/4.4/aria-hidden-focus)\n - [Element with aria-hidden has no content in sequential focus navigation](https://www.w3.org/WAI/standards-guidelines/act/rules/6cfa84/proposed/)\n - [MDN aria-hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)\n\n"
          },
          "noAriaUnsupportedElements": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noAriaUnsupportedElements",
            "link": "https://biomejs.dev/linter/rules/no-aria-unsupported-elements",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "aria-unsupported-elements"
              }
            ],
            "docs": " Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <meta charset=\"UTF-8\" role=\"meta\" />\n ```\n\n ```jsx,expect_diagnostic\n <html aria-required=\"true\" />\n ```\n\n ### Valid\n\n ```jsx\n <meta charset=\"UTF-8\" />\n ```\n\n ```jsx\n <html></html>\n ```\n\n\n"
          },
          "noAutofocus": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noAutofocus",
            "link": "https://biomejs.dev/linter/rules/no-autofocus",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "no-autofocus"
              }
            ],
            "docs": " Enforce that autoFocus prop is not used on elements.\n\n Autofocusing elements can cause usability issues for sighted and non-sighted users, alike.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <input autoFocus />\n ```\n\n ```jsx,expect_diagnostic\n <input autoFocus=\"true\" />\n ```\n\n ```jsx,expect_diagnostic\n <input autoFocus={\"false\"} />\n ```\n\n ```jsx,expect_diagnostic\n <input autoFocus={undefined} />\n ```\n\n ### Valid\n\n ```jsx\n <input />\n```\n\n ```jsx\n <div />\n```\n\n ```jsx\n <button />\n```\n\n ```jsx\n // `autoFocus` prop in user created component is valid\n <MyComponent autoFocus={true} />\n```\n\n ## Resources\n\n - [WHATWG HTML Standard, The autofocus attribute](https://html.spec.whatwg.org/multipage/interaction.html#attr-fe-autofocus)\n - [The accessibility of HTML 5 autofocus](https://brucelawson.co.uk/2009/the-accessibility-of-html-5-autofocus/)\n\n"
          },
          "noBlankTarget": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noBlankTarget",
            "link": "https://biomejs.dev/linter/rules/no-blank-target",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintReact": "jsx-no-target-blank"
              }
            ],
            "docs": " Disallow `target=\"_blank\"` attribute without `rel=\"noreferrer\"`\n\n When creating anchor `a` element, there are times when its link has to be opened in a new browser tab\n via `target=\"_blank\"` attribute. This attribute has to paired with `rel=\"noreferrer\"` or you're incur\n in a security issue.\n\n Refer to [the noreferrer documentation](https://html.spec.whatwg.org/multipage/links.html#link-type-noreferrer)\n and the [the noopener documentation](https://html.spec.whatwg.org/multipage/links.html#link-type-noopener)\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <a href='http://external.link' target='_blank'>child</a>\n ```\n\n ```jsx,expect_diagnostic\n <a href='http://external.link' target='_blank' rel=\"noopener\">child</a>\n ```\n\n ```jsx,expect_diagnostic\n <a {...props} href='http://external.link' target='_blank' rel=\"noopener\">child</a>\n ```\n\n ### Valid\n\n ```jsx\n <a href='http://external.link' rel='noreferrer' target='_blank'>child</a>\n ```\n\n ```jsx\n <a href='http://external.link' target='_blank' rel=\"noopener\" {...props}>child</a>\n ```\n"
          },
          "noDistractingElements": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDistractingElements",
            "link": "https://biomejs.dev/linter/rules/no-distracting-elements",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "no-distracting-elements"
              }
            ],
            "docs": " Enforces that no distracting elements are used.\n\n Elements that can be visually distracting can cause accessibility issues with visually impaired users.\n Such elements are most likely deprecated, and should be avoided.\n By default, the following elements are visually distracting: `<marquee>` and `<blink>`.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <marquee />\n ```\n\n ```jsx,expect_diagnostic\n <blink />\n ```\n\n ### Valid\n\n ```jsx\n <div />\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.2.2](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide)\n\n"
          },
          "noHeaderScope": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noHeaderScope",
            "link": "https://biomejs.dev/linter/rules/no-header-scope",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "scope"
              }
            ],
            "docs": " The scope prop should be used only on `<th>` elements.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div scope={scope} />\n ```\n\n ```jsx,expect_diagnostic\n <div scope=\"col\" />\n ```\n\n ### Valid\n\n ```jsx\n <th scope={scope}></th>\n ```\n\n ```jsx\n <th scope=\"col\"></th>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 1.3.1](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships)\n - [WCAG 4.1.1](https://www.w3.org/WAI/WCAG21/Understanding/parsing)\n\n"
          },
          "noInteractiveElementToNoninteractiveRole": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noInteractiveElementToNoninteractiveRole",
            "link": "https://biomejs.dev/linter/rules/no-interactive-element-to-noninteractive-role",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "no-interactive-element-to-noninteractive-role"
              }
            ],
            "docs": " Enforce that non-interactive ARIA roles are not assigned to interactive HTML elements.\n\n Interactive HTML elements indicate controls in the user interface.\n Interactive elements include `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`.\n Non-interactive HTML elements and non-interactive ARIA roles indicate content and containers in the user interface.\n Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`.\n\n [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) should not be used to convert an interactive element to a non-interactive element.\n Non-interactive ARIA roles include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <input role=\"img\" />;\n ```\n\n ### Valid\n\n ```jsx\n <input role=\"button\" />;\n ```\n\n"
          },
          "noNoninteractiveElementToInteractiveRole": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noNoninteractiveElementToInteractiveRole",
            "link": "https://biomejs.dev/linter/rules/no-noninteractive-element-to-interactive-role",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "no-noninteractive-element-to-interactive-role"
              }
            ],
            "docs": " Enforce that interactive ARIA roles are not assigned to non-interactive HTML elements.\n\n Non-interactive HTML elements indicate _content_ and _containers_ in the user interface.\n Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`.\n\n Interactive HTML elements indicate _controls_ in the user interface.\n Interactive elements include `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`.\n\n [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) should not be used to convert a non-interactive element to an interactive element.\n Interactive ARIA roles include `button`, `link`, `checkbox`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `searchbox`, `switch` and `textbox`.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <h1 role=\"button\">Some text</h1>\n ```\n\n ### Valid\n\n\n ```jsx\n <span role=\"button\">Some text</span>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n ### Resources\n\n - [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro)\n - [WAI-ARIA Authoring Practices Guide - Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex)\n - [Fundamental Keyboard Navigation Conventions](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_generalnav)\n - [Mozilla Developer Network - ARIA Techniques](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role#Keyboard_and_focus)\n\n"
          },
          "noNoninteractiveTabindex": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noNoninteractiveTabindex",
            "link": "https://biomejs.dev/linter/rules/no-noninteractive-tabindex",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "no-noninteractive-tabindex"
              }
            ],
            "docs": " Enforce that `tabIndex` is not assigned to non-interactive HTML elements.\n\n When using the tab key to navigate a webpage, limit it to interactive elements.\n You don't need to add tabindex to items in an unordered list as assistive technology can navigate through the HTML.\n Keep the tab ring small, which is the order of elements when tabbing, for a more efficient and accessible browsing experience.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div tabIndex=\"0\" />\n ```\n\n ```jsx,expect_diagnostic\n <div role=\"article\" tabIndex=\"0\" />\n ```\n\n ```jsx,expect_diagnostic\n <article tabIndex=\"0\" />\n ```\n\n ### Valid\n\n ```jsx\n <div />\n ```\n\n ```jsx\n <MyButton tabIndex={0} />\n ```\n\n ```jsx\n <article tabIndex=\"-1\" />\n ```\n\n"
          },
          "noPositiveTabindex": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noPositiveTabindex",
            "link": "https://biomejs.dev/linter/rules/no-positive-tabindex",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "tabindex-no-positive"
              }
            ],
            "docs": " Prevent the usage of positive integers on `tabIndex` property\n\n Avoid positive `tabIndex` property values to synchronize the flow of the page with keyboard tab order.\n ## Accessibility guidelines\n\n [WCAG 2.4.3](https://www.w3.org/WAI/WCAG21/Understanding/focus-order)\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div tabIndex={1}>foo</div>\n ```\n\n ```jsx,expect_diagnostic\n <div tabIndex={\"1\"} />\n ```\n\n ```js,expect_diagnostic\n React.createElement(\"div\", { tabIndex: 1 })\n ```\n\n ### Valid\n\n ```jsx\n <div tabIndex=\"0\" />\n ```\n\n ```js\n React.createElement(\"div\", { tabIndex: -1 })\n ```\n"
          },
          "noRedundantAlt": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noRedundantAlt",
            "link": "https://biomejs.dev/linter/rules/no-redundant-alt",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "img-redundant-alt"
              }
            ],
            "docs": " Enforce `img` alt prop does not contain the word \"image\", \"picture\", or \"photo\".\n\n The rule will first check if `aria-hidden` is truthy to determine whether to enforce the rule. If the image is\n hidden, then the rule will always succeed.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <img src=\"src\" alt=\"photo content\" />;\n ```\n\n ```jsx,expect_diagnostic\n <img alt={`picture doing ${things}`} {...this.props} />;\n ```\n\n ```jsx,expect_diagnostic\n <img alt=\"picture of cool person\" aria-hidden={false} />;\n ```\n\n ### Valid\n\n ```jsx\n <>\n \t<img src=\"src\" alt=\"alt\" />\n \t<img src=\"src\" alt={photo} />\n \t<img src=\"bar\" aria-hidden alt=\"Picture of me taking a photo of an image\" />\n </>\n ```\n\n"
          },
          "noRedundantRoles": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noRedundantRoles",
            "link": "https://biomejs.dev/linter/rules/no-redundant-roles",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "no-redundant-roles"
              }
            ],
            "docs": " Enforce explicit `role` property is not the same as implicit/default role property on an element.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <article role='article'></article>\n ```\n\n ```jsx,expect_diagnostic\n <button role='button'></button>\n ```\n\n ```jsx,expect_diagnostic\n <h1 role='heading' aria-level='1'>title</h1>\n ```\n\n ### Valid\n\n ```jsx\n <article role='presentation'></article>\n ```\n\n ```jsx\n <Button role='button'></Button>\n ```\n\n ```jsx\n <span></span>\n ```\n\n"
          },
          "noSvgWithoutTitle": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noSvgWithoutTitle",
            "link": "https://biomejs.dev/linter/rules/no-svg-without-title",
            "recommended": true,
            "fixKind": "none",
            "docs": " Enforces the usage of the `title` element for the `svg` element.\n\n It is not possible to specify the `alt` attribute for the `svg` as for the `img`.\n To make svg accessible, the following methods are available:\n - provide the `title` element as the first child to `svg`\n - provide `role=\"img\"` and `aria-label` or `aria-labelledby` to `svg`\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n <svg>foo</svg>\n ```\n\n ```js,expect_diagnostic\n <svg>\n     <title></title>\n     <circle />\n </svg>\n ```\n\n ```js,expect_diagnostic\n <svg>foo</svg>\n ```\n\n ```js\n <svg role=\"img\" aria-label=\"\">\n     <span id=\"\">Pass</span>\n </svg>\n ```\n\n ```js\n <svg role=\"presentation\">foo</svg>\n ```\n\n ### Valid\n\n ```js\n <svg>\n     <rect />\n     <rect />\n     <g>\n         <circle />\n         <circle />\n         <g>\n             <title>Pass</title>\n             <circle />\n             <circle />\n         </g>\n     </g>\n </svg>\n ```\n\n ```js\n <svg>\n     <title>Pass</title>\n     <circle />\n </svg>\n ```\n\n ```js\n <svg role=\"img\" aria-labelledby=\"title\">\n     <span id=\"title\">Pass</span>\n </svg>\n ```\n\n ```js\n <svg role=\"img\" aria-label=\"title\">\n     <span id=\"title\">Pass</span>\n </svg>\n ```\n ```js\n <svg role=\"graphics-symbol\"><rect /></svg>\n ```\n\n ```js\n <svg role=\"graphics-symbol img\"><rect /></svg>\n ```\n\n ```js\n <svg aria-hidden=\"true\"><rect /></svg>\n ```\n\n\n ## Accessibility guidelines\n [Document Structure – SVG 1.1 (Second Edition)](https://www.w3.org/TR/SVG11/struct.html#DescriptionAndTitleElements)\n [ARIA: img role - Accessibility | MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role)\n [Accessible SVGs | CSS-Tricks - CSS-Tricks](https://css-tricks.com/accessible-svgs/)\n [Contextually Marking up accessible images and SVGs | scottohara.me](https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html)\n [Accessible SVGs](https://www.unimelb.edu.au/accessibility/techniques/accessible-svgs)\n\n"
          },
          "useAltText": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useAltText",
            "link": "https://biomejs.dev/linter/rules/use-alt-text",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "alt-text"
              }
            ],
            "docs": " Enforce that all elements that require alternative text have meaningful information to relay back to the end user.\n\n This is a critical component of accessibility for screen reader users in order for them to understand the content's purpose on the page.\n By default, this rule checks for alternative text on the following elements: `<img>`, `<area>`, `<input type=\"image\">`, and `<object>`.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <img src=\"image.png\" />\n ```\n\n ```jsx,expect_diagnostic\n <input type=\"image\" src=\"image.png\" />\n ```\n\n ### Valid\n\n ```jsx\n <img src=\"image.png\" alt=\"image alt\" />\n ```\n\n ```jsx\n <input type=\"image\" src=\"image.png\" alt=\"alt text\" />\n ```\n\n ```jsx\n <input type=\"image\" src=\"image.png\" aria-label=\"alt text\" />\n ```\n\n ```jsx\n <input type=\"image\" src=\"image.png\" aria-labelledby=\"someId\" />\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 1.1.1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)\n\n"
          },
          "useAnchorContent": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useAnchorContent",
            "link": "https://biomejs.dev/linter/rules/use-anchor-content",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "anchor-has-content"
              }
            ],
            "docs": " Enforce that anchors have content and that the content is accessible to screen readers.\n\n Accessible means the content is not hidden using the `aria-hidden` attribute.\n Refer to the references to learn about why this is important.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <a />\n ```\n\n ```jsx,expect_diagnostic\n <a></a>\n ```\n\n ```jsx,expect_diagnostic\n <a>    </a>\n ```\n\n ```jsx,expect_diagnostic\n <a aria-hidden>content</a>\n ```\n\n ```jsx,expect_diagnostic\n <a><span aria-hidden=\"true\">content</span></a>\n ```\n\n ### Valid\n\n ```jsx\n <a>content</a>\n ```\n\n ```jsx\n function html() {\n     return { __html: \"foo\" }\n }\n <a dangerouslySetInnerHTML={html()} />\n ```\n\n ```jsx\n <a><TextWrapper aria-hidden={true} />content</a>\n ```\n\n ```jsx\n <a><div aria-hidden=\"true\"></div>content</a>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.4.4](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context)\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n"
          },
          "useAriaActivedescendantWithTabindex": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "useAriaActivedescendantWithTabindex",
            "link": "https://biomejs.dev/linter/rules/use-aria-activedescendant-with-tabindex",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "aria-activedescendant-has-tabindex"
              }
            ],
            "docs": " Enforce that `tabIndex` is assigned to non-interactive HTML elements with `aria-activedescendant`.\n\n `aria-activedescendant` is used to manage to focus within a [composite widget](https://www.w3.org/TR/wai-aria/#composite).\n The element with the attribute `aria-activedescendant` retains the active document focus.\n\n It indicates which of its child elements has a secondary focus by assigning the ID of that\n element to the value of `aria-activedescendant`. This pattern is used to build a widget\n like a search typeahead select list. The search input box retains document focus\n so that the user can type in the input. If the down arrow key is pressed and\n a search suggestion is highlighted, the ID of the suggestion element will be applied\n as the value of `aria-activedescendant` on the input element.\n\n Because an element with `aria-activedescendant` must be tabbable,\n it must either have an inherent tabIndex of zero or declare a tabIndex attribute.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div aria-activedescendant={someID} />\n ```\n\n ### Valid\n\n ```jsx\n <div aria-activedescendant={someID} tabIndex={0} />\n ```\n\n ```jsx\n <input aria-activedescendant={someID} />\n ```\n\n"
          },
          "useAriaPropsForRole": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useAriaPropsForRole",
            "link": "https://biomejs.dev/linter/rules/use-aria-props-for-role",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "role-has-required-aria-props"
              }
            ],
            "docs": " Enforce that elements with ARIA roles must have all required ARIA attributes for that role.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <span role=\"checkbox\"></span>\n ```\n\n ```jsx,expect_diagnostic\n <span role=\"heading\"></span>\n ```\n\n ### Valid\n\n ```jsx\n <span role=\"checkbox\" aria-checked=\"true\"></span>\n ```\n\n ```jsx\n <span role=\"heading\" aria-level=\"1\"></span>\n ```\n\n\n ## Accessibility guidelines\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n ### Resources\n - [ARIA Spec, Roles](https://www.w3.org/TR/wai-aria/#roles)\n - [Chrome Audit Rules, AX_ARIA_03](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_03)\n"
          },
          "useButtonType": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useButtonType",
            "link": "https://biomejs.dev/linter/rules/use-button-type",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintReact": "button-has-type"
              }
            ],
            "docs": " Enforces the usage of the attribute `type` for the element `button`\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <button>Do something</button>\n ```\n\n ```jsx,expect_diagnostic\n <button type=\"incorrectType\">Do something</button>\n ```\n\n ```js,expect_diagnostic\n React.createElement('button');\n ```\n\n ### Valid\n\n ```jsx\n <>\n     <button type=\"button\">Do something</button>\n     <button type={buttonType}>Do something</button>\n </>\n ```\n"
          },
          "useHeadingContent": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useHeadingContent",
            "link": "https://biomejs.dev/linter/rules/use-heading-content",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "heading-has-content"
              }
            ],
            "docs": " Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the aria-hidden prop.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <h1 />\n ```\n\n ```jsx,expect_diagnostic\n <h1><div aria-hidden /></h1>\n ```\n\n ```jsx,expect_diagnostic\n <h1></h1>\n ```\n\n ### Valid\n\n ```jsx\n <h1>heading</h1>\n ```\n\n ```jsx\n <h1><div aria-hidden=\"true\"></div>visible content</h1>\n ```\n\n ```jsx\n <h1 dangerouslySetInnerHTML={{ __html: \"heading\" }} />\n ```\n\n ```jsx\n <h1><div aria-hidden />visible content</h1>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.4.6](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)\n\n"
          },
          "useHtmlLang": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useHtmlLang",
            "link": "https://biomejs.dev/linter/rules/use-html-lang",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "html-has-lang"
              }
            ],
            "docs": " Enforce that `html` element has `lang` attribute.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <html></html>\n ```\n\n ```jsx,expect_diagnostic\n <html lang={\"\"}></html>\n ```\n\n ```jsx,expect_diagnostic\n <html lang={null}></html>\n ```\n\n ```jsx,expect_diagnostic\n <html lang={undefined}></html>\n ```\n\n ```jsx,expect_diagnostic\n <html lang={true}></html>\n ```\n\n ### Valid\n\n ```jsx\n <html lang=\"en\"></html>\n ```\n\n ```jsx\n <html lang={language}></html>\n ```\n\n ```jsx\n <html {...props}></html>\n ```\n\n ```jsx\n <html lang={\"\"} {...props}></html>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 3.1.1](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page)\n\n"
          },
          "useIframeTitle": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useIframeTitle",
            "link": "https://biomejs.dev/linter/rules/use-iframe-title",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "iframe-has-title"
              }
            ],
            "docs": " Enforces the usage of the attribute `title` for the element `iframe`.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n  <iframe />\n ```\n\n ```jsx,expect_diagnostic\n <iframe></iframe>\n ```\n\n ```jsx,expect_diagnostic\n <iframe title=\"\" />\n ```\n\n ```jsx,expect_diagnostic\n <iframe title={\"\"} />\n ```\n\n ```jsx,expect_diagnostic\n <iframe title={undefined} />\n ```\n\n ```jsx,expect_diagnostic\n <iframe title={false} />\n ```\n\n ```jsx,expect_diagnostic\n <iframe title={true} />\n ```\n\n ```jsx,expect_diagnostic\n <iframe title={42} />\n ```\n\n\n ### Valid\n\n ```jsx\n <>\n   <iframe title=\"This is a unique title\" />\n   <iframe title={uniqueTitle} />\n   <iframe {...props} />\n </>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.4.1](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks)\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n"
          },
          "useKeyWithClickEvents": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useKeyWithClickEvents",
            "link": "https://biomejs.dev/linter/rules/use-key-with-click-events",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "click-events-have-key-events"
              }
            ],
            "docs": " Enforce onClick is accompanied by at least one of the following: `onKeyUp`, `onKeyDown`, `onKeyPress`.\n\n Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.\n This does not apply for interactive or hidden elements.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div onClick={() => {}} />\n ```\n\n ```jsx,expect_diagnostic\n <div onClick={() => {}} ></div>\n ```\n\n ### Valid\n\n ```jsx\n <div onClick={() => {}} onKeyDown={handleKeyDown} />\n```\n\n ```jsx\n <div onClick={() => {}} onKeyUp={handleKeyUp} />\n```\n\n ```jsx\n <div onClick={() => {}} onKeyPress={handleKeyPress} />\n```\n\n ```jsx\n // this rule doesn't apply to user created component\n <MyComponent onClick={() => {}} />\n```\n\n ```jsx,\n <div onClick={() => {}} {...spread}></div>\n ```\n\n ```jsx\n <div {...spread} onClick={() => {}} ></div>\n ```\n\n ```jsx\n <button onClick={() => console.log(\"test\")}>Submit</button>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.1.1](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)\n\n"
          },
          "useKeyWithMouseEvents": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useKeyWithMouseEvents",
            "link": "https://biomejs.dev/linter/rules/use-key-with-mouse-events",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "mouse-events-have-key-events"
              }
            ],
            "docs": " Enforce `onMouseOver` / `onMouseOut` are accompanied by `onFocus` / `onBlur`.\n\n Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div onMouseOver={() => {}} />\n ```\n\n ```jsx,expect_diagnostic\n <div onMouseOut={() => {}} />\n ```\n\n ### Valid\n\n ```jsx\n <>\n   <div onMouseOver={() => {}} onFocus={() => {}} />\n   <div onMouseOut={() => {}} onBlur={() => {}} />\n   <div onMouseOver={() => {}} {...otherProps} />\n   <div onMouseOut={() => {}} {...otherProps} />\n   <div onMouseOver={() => {}} onFocus={() => {}} {...otherProps} />\n   <div onMouseOut={() => {}} onBlur={() => {}} {...otherProps} />\n </>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.1.1](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)\n\n"
          },
          "useMediaCaption": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useMediaCaption",
            "link": "https://biomejs.dev/linter/rules/use-media-caption",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "media-has-caption"
              }
            ],
            "docs": " Enforces that `audio` and `video` elements must have a `track` for captions.\n\n ## Examples\n\n ### Invalid\n ```jsx,expect_diagnostic\n \t<video />\n ```\n\n ```jsx,expect_diagnostic\n \t<audio>child</audio>\n ```\n\n ### Valid\n\n ```jsx\n \t<audio>\n \t\t<track kind=\"captions\" {...props} />\n \t</audio>\n ```\n\n ```jsx\n \t<video muted {...props}></video>\n ```\n"
          },
          "useValidAnchor": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useValidAnchor",
            "link": "https://biomejs.dev/linter/rules/use-valid-anchor",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "anchor-is-valid"
              }
            ],
            "docs": " Enforce that all anchors are valid, and they are navigable elements.\n\n The anchor element (`<a></a>`) - also called **hyperlink** - is an important element\n that allows users to navigate pages, in the same page, same website or on another website.\n\n While before it was possible to attach logic to an anchor element, with the advent of JSX libraries,\n it's now  easier to attach logic to any HTML element, anchors included.\n\n This rule is designed to prevent users from attaching logic at the click of anchors when the `href`\n provided to the anchor element is not valid. Avoid using `#` symbol inside the `href` when you are\n attaching the logic to the anchor element. If the anchor has logic attached to it with an incorrect `href`\n the rules suggests to turn it to a `button`, because that's likely what the user wants.\n\n Anchor `<a></a>` elements should be used for navigation, while `<button></button>` should be\n used for user interaction.\n\n There are **many reasons** why an anchor should not have a logic with an incorrect `href` attribute:\n - it can disrupt the correct flow of the user navigation e.g. a user that wants to open the link\n in another tab, but the default \"click\" behavior is prevented\n - it can source of invalid links, and crawlers can't navigate the website, risking to penalize\n SEO ranking\n\n\n For a detailed explanation, check out https://marcysutton.com/links-vs-buttons-in-modern-web-applications\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <a href={null}>navigate here</a>\n ```\n ```jsx,expect_diagnostic\n <a href={undefined}>navigate here</a>\n ```\n ```jsx,expect_diagnostic\n <a href>navigate here</a>\n ```\n ```jsx,expect_diagnostic\n <a href=\"javascript:void(0)\">navigate here</a>\n ```\n ```jsx,expect_diagnostic\n <a onClick={something}>navigate here</a>\n ```\n ### Valid\n\n ```jsx\n <a href=\"https://example.com\" onClick={something}>navigate here</a>\n ```\n\n ```jsx\n <a href={`https://www.javascript.com`}>navigate here</a>\n ```\n\n ```jsx\n <a href={somewhere}>navigate here</a>\n ```\n\n ```jsx\n <a {...spread}>navigate here</a>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.1.1](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)\n\n"
          },
          "useValidAriaProps": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useValidAriaProps",
            "link": "https://biomejs.dev/linter/rules/use-valid-aria-props",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "aria-props"
              }
            ],
            "docs": " Ensures that ARIA properties `aria-*` are all valid.\n\n ## Examples\n\n ### Invalid\n\n ```jsx, expect_diagnostic\n <input className=\"\" aria-labell=\"\" />\n ```\n\n ```jsx,expect_diagnostic\n <div aria-lorem=\"foobar\" />;\n ```\n\n ## Accessibility guidelines\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n"
          },
          "useValidAriaRole": {
            "deprecated": false,
            "version": "1.4.0",
            "name": "useValidAriaRole",
            "link": "https://biomejs.dev/linter/rules/use-valid-aria-role",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintJsxA11y": "aria-role"
              }
            ],
            "docs": " Elements with ARIA roles must use a valid, non-abstract ARIA role.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n <div role=\"datepicker\"></div>\n ```\n\n ```js,expect_diagnostic\n <div role=\"range\"></div>\n ```\n\n ```js,expect_diagnostic\n <div role=\"\"></div>\n ```\n\n ```js,expect_diagnostic\n <Foo role=\"foo\"></Foo>\n ```\n\n ### Valid\n\n ```js\n <>\n   <div role=\"button\"></div>\n   <div role={role}></div>\n   <div></div>\n </>\n ```\n\n ## Options\n\n ```json\n {\n     \"//\": \"...\",\n     \"options\": {\n         \"allowInvalidRoles\": [\"invalid-role\", \"text\"],\n         \"nonIgnoreDom\": true\n     }\n }\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n ## Resources\n\n - [Chrome Audit Rules, AX_ARIA_01](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_01)\n - [DPUB-ARIA roles](https://www.w3.org/TR/dpub-aria-1.0/)\n - [MDN: Using ARIA: Roles, states, and properties](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques)\n\n"
          },
          "useValidAriaValues": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useValidAriaValues",
            "link": "https://biomejs.dev/linter/rules/use-valid-aria-values",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "aria-proptypes"
              }
            ],
            "docs": " Enforce that ARIA state and property values are valid.\n\n ## Examples\n\n ### Invalid\n\n ```jsx, expect_diagnostic\n <span role=\"checkbox\" aria-checked=\"test\">some text</span>\n ```\n\n ```jsx, expect_diagnostic\n <span aria-labelledby=\"\">some text</span>\n ```\n\n ```jsx, expect_diagnostic\n <span aria-valuemax=\"hey\">some text</span>\n ```\n\n ```jsx, expect_diagnostic\n <span aria-orientation=\"hey\">some text</span>\n ```\n\n ### Valid\n\n ```jsx\n <>\n     <span role=\"checkbox\" aria-checked={checked} >some text</span>\n     <span aria-labelledby=\"fooId barId\" >some text</span>\n </>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n ### Resources\n\n - [ARIA Spec, States and Properties](https://www.w3.org/TR/wai-aria/#states_and_properties)\n - [Chrome Audit Rules, AX_ARIA_04](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_04)\n"
          },
          "useValidLang": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useValidLang",
            "link": "https://biomejs.dev/linter/rules/use-valid-lang",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "lang"
              }
            ],
            "docs": " Ensure that the attribute passed to the `lang` attribute is a correct ISO language and/or country.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <html lang=\"lorem\" />\n ```\n\n ```jsx,expect_diagnostic\n <html lang=\"en-babab\" />\n ```\n\n ```jsx,expect_diagnostic\n <html lang=\"en-GB-typo\" />\n ```\n\n ### Valid\n\n ```jsx\n <Html lang=\"en-babab\" />\n ```\n"
          }
        },
        "complexity": {
          "noUselessFragments": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUselessFragments",
            "link": "https://biomejs.dev/linter/rules/no-useless-fragments",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintReact": "jsx-no-useless-fragment"
              }
            ],
            "docs": " Disallow unnecessary fragments\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <>\n foo\n </>\n ```\n\n ```jsx,expect_diagnostic\n <React.Fragment>\n foo\n </React.Fragment>\n ```\n\n ```jsx,expect_diagnostic\n <>\n     <>foo</>\n     <SomeComponent />\n </>\n ```\n\n ```jsx,expect_diagnostic\n <></>\n ```\n\n ### Valid\n\n ```jsx\n <>\n     <Foo />\n     <Bar />\n </>\n ```\n\n ```jsx\n <>foo {bar}</>\n ```\n\n"
          }
        },
        "correctness": {
          "noChildrenProp": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noChildrenProp",
            "link": "https://biomejs.dev/linter/rules/no-children-prop",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintReact": "no-children-prop"
              }
            ],
            "docs": " Prevent passing of **children** as props.\n\n When using JSX, the children should be nested between the opening and closing tags.\n When not using JSX, the children should be passed as additional arguments to `React.createElement`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n <FirstComponent children={'foo'} />\n ```\n\n ```js,expect_diagnostic\n React.createElement('div', { children: 'foo' });\n ```\n"
          },
          "noRenderReturnValue": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noRenderReturnValue",
            "link": "https://biomejs.dev/linter/rules/no-render-return-value",
            "recommended": true,
            "fixKind": "none",
            "docs": " Prevent the usage of the return value of `React.render`.\n\n > `ReactDOM.render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy\n and should be avoided because future versions of React may render components asynchronously in some cases.\n If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)\n to the root element.\n\n Source: [ReactDOM documentation](https://facebook.github.io/react/docs/react-dom.html#render)\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n const foo = ReactDOM.render(<div />, document.body);\n ```\n\n ### Valid\n\n ```jsx\n ReactDOM.render(<div />, document.body);\n ```\n"
          },
          "noVoidElementsWithChildren": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noVoidElementsWithChildren",
            "link": "https://biomejs.dev/linter/rules/no-void-elements-with-children",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintReact": "void-dom-elements-no-children"
              }
            ],
            "docs": " This rules prevents void elements (AKA self-closing elements) from having children.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <br>invalid child</br>\n ```\n\n ```jsx,expect_diagnostic\n <img alt=\"some text\" children={\"some child\"} />\n ```\n\n ```js,expect_diagnostic\n React.createElement('img', {}, 'child')\n ```\n"
          },
          "useExhaustiveDependencies": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useExhaustiveDependencies",
            "link": "https://biomejs.dev/linter/rules/use-exhaustive-dependencies",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintReactHooks": "exhaustive-deps"
              }
            ],
            "docs": " Enforce all dependencies are correctly specified in a React hook.\n\n This rule is a port of the rule [react-hooks/exhaustive-deps](https://legacy.reactjs.org/docs/hooks-rules.html#eslint-plugin), and it's meant to target projects that uses React.\n\n If your project _doesn't_ use React (or Preact), **you shouldn't use this rule**.\n\n The rule will inspect the following **known** hooks:\n\n - `useEffect`\n - `useLayoutEffect`\n - `useInsertionEffect`\n - `useCallback`\n - `useMemo`\n - `useImperativeHandle`\n - `useState`\n - `useReducer`\n - `useRef`\n - `useDebugValue`\n - `useDeferredValue`\n - `useTransition`\n\n If you want to add more hooks to the rule, check the [options](#options).\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import { useEffect } from \"react\";\n\n function component() {\n     let a = 1;\n     useEffect(() => {\n         console.log(a);\n     }, []);\n }\n ```\n\n ```js,expect_diagnostic\n import { useEffect } from \"react\";\n\n function component() {\n     let b = 1;\n     useEffect(() => {\n     }, [b]);\n }\n ```\n\n ```js,expect_diagnostic\n import { useEffect, useState } from \"react\";\n\n function component() {\n     const [name, setName] = useState();\n     useEffect(() => {\n         console.log(name);\n         setName(\"\");\n     }, [name, setName]);\n }\n ```\n\n ```js,expect_diagnostic\n import { useEffect } from \"react\";\n\n function component() {\n     let a = 1;\n     const b = a + 1;\n     useEffect(() => {\n         console.log(b);\n     }, []);\n }\n ```\n\n ### Valid\n\n ```js\n import { useEffect } from \"react\";\n\n function component() {\n     let a = 1;\n     useEffect(() => {\n         console.log(a);\n     }, [a]);\n }\n ```\n\n ```js\n import { useEffect } from \"react\";\n\n function component() {\n     const a = 1;\n     useEffect(() => {\n         console.log(a);\n     });\n }\n ```\n\n ```js\n import { useEffect, useState } from \"react\";\n\n function component() {\n     const [name, setName] = useState();\n     useEffect(() => {\n         console.log(name);\n         setName(\"\");\n     }, [name]);\n }\n ```\n\n ```js\n import { useEffect } from \"react\";\n let outer = false;\n function component() {\n     useEffect(() => {\n         outer = true;\n     }, []);\n }\n ```\n\n ## Options\n\n Allows to specify custom hooks - from libraries or internal projects -\n for which dependencies should be checked and/or which are known to have\n stable return values.\n\n ### Validating dependencies\n\n For every hook for which you want the dependencies to be validated, you\n should specify the index of the closure and the index of the\n dependencies array to validate against.\n\n #### Example\n\n ```json\n {\n     \"//\": \"...\",\n     \"options\": {\n         \"hooks\": [\n             { \"name\": \"useLocation\", \"closureIndex\": 0, \"dependenciesIndex\": 1},\n             { \"name\": \"useQuery\", \"closureIndex\": 1, \"dependenciesIndex\": 0}\n         ]\n     }\n }\n ```\n\n Given the previous example, your hooks can be used like this:\n\n ```js\n function Foo() {\n     const location = useLocation(() => {}, []);\n     const query = useQuery([], () => {});\n }\n ```\n\n ### Stable results\n\n When a hook is known to have a stable return value (its identity doesn't\n change across invocations), that value doesn't need to be specified in\n dependency arrays. For example, setters returned by React's `useState`\n hook always have the same identity and should be omitted as such.\n\n You can configure custom hooks that return stable results in one of\n three ways:\n\n * `\"stableResult\": true` -- marks the return value as stable. An example\n   of a React hook that would be configured like this is `useRef()`.\n * `\"stableResult\": [1]` -- expects the return value to be an array and\n   marks the given index or indices to be stable. An example of a React\n   hook that would be configured like this is `useState()`.\n * `\"stableResult\": 1` -- shorthand for `\"stableResult\": [1]`.\n\n #### Example\n\n ```json\n {\n     \"//\": \"...\",\n     \"options\": {\n         \"hooks\": [\n             { \"name\": \"useDispatch\", \"stableResult\": true }\n         ]\n     }\n }\n ```\n\n With this configuration, the following is valid:\n\n ```js\n const dispatch = useDispatch();\n // No need to list `dispatch` as dependency:\n const doAction = useCallback(() => dispatch(someAction()), []);\n ```\n\n ## Preact support\n\n This rule recognizes rules imported from `preact/compat` and\n `preact/hooks` and applies the same rules as for React hooks.\n\n"
          },
          "useHookAtTopLevel": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useHookAtTopLevel",
            "link": "https://biomejs.dev/linter/rules/use-hook-at-top-level",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintReactHooks": "rules-of-hooks"
              }
            ],
            "docs": " Enforce that all React hooks are being called from the Top Level component functions.\n\n To understand why this required see https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function Component1({ a }) {\n     if (a == 1) {\n         useEffect();\n     }\n }\n ```\n\n ```js,expect_diagnostic\n function Component1({ a }) {\n     if (a != 1) {\n         return;\n     }\n\n     useEffect();\n }\n ```\n\n ### Valid\n\n ```js\n function Component1() {\n     useEffect();\n }\n ```\n\n"
          },
          "useJsxKeyInIterable": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "useJsxKeyInIterable",
            "link": "https://biomejs.dev/linter/rules/use-jsx-key-in-iterable",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintReact": "jsx-key"
              }
            ],
            "sourceKind": "sameLogic",
            "docs": " Disallow missing key props in iterators/collection literals.\n\n Warn if an element that likely requires a key prop--namely, one present in an array literal or an arrow function expression.\n Check out React documentation for [explanation on the why does React need keys.](https://react.dev/learn/rendering-lists#why-does-react-need-keys)\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n [<Hello />];\n ```\n ```js,expect_diagnostic\n data.map((x) => <Hello>{x}</Hello>);\n ```\n\n ### Valid\n\n ```js\n [<Hello key=\"first\" />, <Hello key=\"second\" />, <Hello key=\"third\" />];\n data.map((x) => <Hello key={x.id}>{x}</Hello>);\n ```\n\n"
          }
        },
        "nursery": {
          "noLabelWithoutControl": {
            "deprecated": false,
            "version": "next",
            "name": "noLabelWithoutControl",
            "link": "https://biomejs.dev/linter/rules/no-label-without-control",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "label-has-associated-control"
              }
            ],
            "docs": " Enforce that a label element or component has a text label and an associated input.\n\n An \"input\" is considered one of the following elements: `input`, `meter`, `output`, `progress`, `select` or `textarea`.\n\n There are two supported ways to associate a label with an input:\n - Wrapping an input in a label element.\n - Adding a `for` attribute (or `htmlFor` in React) to a label and assigning it a DOM ID string associated with an input on the page.\n\n\n This rule checks that any `label` element (or an indicated custom component that will output a `label` element) meets one of these conditions:\n - Wraps an `input` element (or an indicated custom component that will output an `input` element)\n - Has a `for` or `htmlFor` attribute and that the `label` element/component has accessible text content.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <label for=\"js_id\" />;\n ```\n\n ```jsx,expect_diagnostic\n <label for=\"js_id\"><input /></label>;\n ```\n\n ```jsx,expect_diagnostic\n <label htmlFor=\"js_id\" />;\n ```\n\n ```jsx,expect_diagnostic\n <label htmlFor=\"js_id\"><input /></label>;\n ```\n\n ```jsx,expect_diagnostic\n <label>A label</label>;\n ```\n\n ```jsx,expect_diagnostic\n <div><label /><input /></div>;\n ```\n\n ### Valid\n\n ```jsx\n <label for=\"js_id\" aria-label=\"A label\" />;\n <label for=\"js_id\" aria-labelledby=\"A label\" />;\n <label htmlFor=\"js_id\" aria-label=\"A label\" />;\n <label htmlFor=\"js_id\" aria-labelledby=\"A label\" />;\n <label>A label<input /></label>;\n <label>A label<textarea /></label>;\n <label><img alt=\"A label\" /><input /></label>;\n ```\n\n ## Options\n\n The rule supports the following options:\n - `inputComponents` - An array of component names that should be considered the same as an `input` element.\n - `labelAttributes` - An array of attributes that should be treated as the `label` accessible text content.\n - `labelComponents` - An array of component names that should be considered the same as a `label` element.\n\n Both options `inputComponents` and `labelComponents` don't have support for namespace components (e.g. `<Control.Input>`).\n\n ```json\n {\n     \"//\": \"...\",\n     \"options\": {\n         \"inputComponents\": [\"CustomInput\"],\n         \"labelAttributes\": [\"label\"],\n         \"labelComponents\": [\"CustomLabel\"]\n     }\n }\n ```\n\n"
          },
          "useFocusableInteractive": {
            "deprecated": false,
            "version": "next",
            "name": "useFocusableInteractive",
            "link": "https://biomejs.dev/linter/rules/use-focusable-interactive",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "interactive-support-focus"
              }
            ],
            "docs": " Elements with an interactive role and interaction handlers must be focusable.\n\n HTML elements with interactive roles must have `tabIndex` defined to ensure they are\n focusable. Without tabIndex, assistive technologies may not recognize these elements as\n interactive.\n You could also consider switching from an interactive role to its semantic HTML element\n instead.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n <div role=\"button\" />\n ```\n\n ```js,expect_diagnostic\n <div role=\"tab\" />\n ```\n\n ### Valid\n\n ```js\n <div role=\"button\" tabIndex={0} />\n ```\n\n ```jsx\n <div />\n ```\n\n"
          },
          "useSemanticElements": {
            "deprecated": false,
            "version": "next",
            "name": "useSemanticElements",
            "link": "https://biomejs.dev/linter/rules/use-semantic-elements",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintJsxA11y": "prefer-tag-over-role"
              }
            ],
            "docs": " It detects the use of `role` attributes in JSX elements and suggests using semantic elements instead.\n\n The `role` attribute is used to define the purpose of an element, but it should be used as a last resort. Using semantic elements like `<button>`, `<input>`, `<textarea>`, `<a>`, `<img>`, `<table>`, `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<main>`, `<figure>`, `<figcaption>`, `<details>`, `<summary>`, `<dialog>`, `<menu>`, `<menuitem>`, `<fieldset>`, `<legend>`, `<caption>`, `<colgroup>`, `<col>`, `<optgroup>`, `<option>`, `<select>`, `<datalist>`, `<output>`, `<progress>`, `<meter>`, `<time>`, `<audio>`, `<video>`, `<track>`, `<source>`, `<embed>`, `<object>`, `<param>`, `<iframe>`, `<canvas>`, `<map>`, `<area>`, `<svg>`, `<math>` are more accessible and provide better semantics.\n\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div role=\"checkbox\">\n ```\n\n ```jsx,expect_diagnostic\n <div role=\"img\">\n ```\n\n ### Valid\n\n ```jsx\n <div>...</div>\n <header>...</header>\n <img alt=\"\" src=\"image.jpg\" />\n ```\n\n"
          }
        },
        "security": {
          "noDangerouslySetInnerHtml": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDangerouslySetInnerHtml",
            "link": "https://biomejs.dev/linter/rules/no-dangerously-set-inner-html",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintReact": "no-danger"
              }
            ],
            "docs": " Prevent the usage of dangerous JSX props\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n function createMarkup() {\n     return { __html: 'child' }\n }\n <div dangerouslySetInnerHTML={createMarkup()}></div>\n ```\n\n ```js,expect_diagnostic\n React.createElement('div', {\n     dangerouslySetInnerHTML: { __html: 'child' }\n });\n ```\n"
          },
          "noDangerouslySetInnerHtmlWithChildren": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDangerouslySetInnerHtmlWithChildren",
            "link": "https://biomejs.dev/linter/rules/no-dangerously-set-inner-html-with-children",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintReact": "no-danger-with-children"
              }
            ],
            "docs": " Report when a DOM element or a component uses both `children` and `dangerouslySetInnerHTML` prop.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n function createMarkup() {\n     return { __html: 'child' }\n }\n <Component dangerouslySetInnerHTML={createMarkup()}>\"child1\"</Component>\n ```\n\n ```jsx,expect_diagnostic\n function createMarkup() {\n     return { __html: 'child' }\n }\n <Component dangerouslySetInnerHTML={createMarkup()} children=\"child1\" />\n ```\n\n ```js,expect_diagnostic\n React.createElement('div', { dangerouslySetInnerHTML: { __html: 'HTML' } }, 'children')\n ```\n"
          }
        },
        "style": {
          "noImplicitBoolean": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noImplicitBoolean",
            "link": "https://biomejs.dev/linter/rules/no-implicit-boolean",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "eslintReact": "jsx-boolean-value"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow implicit `true` values on JSX boolean attributes\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <input disabled />\n ```\n\n ### Valid\n\n ```jsx\n <input disabled={false} />\n```\n\n ```jsx\n <input disabled={''} />\n```\n\n ```jsx\n <input disabled={0} />\n```\n\n ```jsx\n <input disabled={undefined} />\n```\n\n ```jsx\n <input disabled='false' />\n```\n"
          },
          "useFragmentSyntax": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useFragmentSyntax",
            "link": "https://biomejs.dev/linter/rules/use-fragment-syntax",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintReact": "jsx-fragments"
              }
            ],
            "docs": " This rule enforces the use of `<>...</>` over `<Fragment>...</Fragment>`.\n\n The shorthand fragment syntax saves keystrokes and is only inapplicable when keys are required.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n <Fragment>child</Fragment>\n ```\n\n ```js,expect_diagnostic\n <React.Fragment>child</React.Fragment>\n ```\n"
          }
        },
        "suspicious": {
          "noArrayIndexKey": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noArrayIndexKey",
            "link": "https://biomejs.dev/linter/rules/no-array-index-key",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintReact": "no-array-index-key"
              }
            ],
            "docs": " Discourage the usage of Array index in keys.\n\n > We don’t recommend using indexes for keys if the order of items may change.\n This can negatively impact performance and may cause issues with component state.\n Check out Robin Pokorny’s article for an\n [in-depth explanation on the negative impacts of using an index as a key](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/).\n If you choose not to assign an explicit key to list items then React will default to using indexes as keys.\n\n Source [React documentation](https://reactjs.org/docs/lists-and-keys.html#keys)\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n something.forEach((Element, index) => {\n     <Component key={index} >foo</Component>\n });\n ```\n\n ```jsx,expect_diagnostic\n React.Children.map(this.props.children, (child, index) => (\n     React.cloneElement(child, { key: index })\n ))\n ```\n\n ```jsx,expect_diagnostic\n something.forEach((Element, index) => {\n     <Component key={`test-key-${index}`} >foo</Component>\n });\n ```\n\n ```jsx,expect_diagnostic\n something.forEach((Element, index) => {\n     <Component key={\"test\" + index} >foo</Component>\n });\n ```\n\n ### Valid\n ```jsx\n something.forEach((item) => {\n     <Component key={item.id} >foo</Component>\n });\n ```\n\n ```jsx\n something.forEach((item) => {\n     <Component key={item.baz.foo} >foo</Component>\n });\n ```\n\n"
          },
          "noCommentText": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noCommentText",
            "link": "https://biomejs.dev/linter/rules/no-comment-text",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintReact": "jsx-no-comment-textnodes"
              }
            ],
            "docs": " Prevent comments from being inserted as text nodes\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const a3 = <div>// comment</div>;\n ```\n\n ```js,expect_diagnostic\n const a4 = <div>/* comment */</div>;\n ```\n\n ```js,expect_diagnostic\n const a5 = <div>/** comment */</div>;\n ```\n\n ### Valid\n\n ```js\n const a = <div>{/* comment */}</div>;\n const a1 = <div>{/** comment */}</div>;\n const a2 = <div className={\"cls\" /* comment */}></div>;\n ```\n"
          },
          "noDuplicateJsxProps": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDuplicateJsxProps",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-jsx-props",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintReact": "jsx-no-duplicate-props"
              }
            ],
            "docs": " Prevents JSX properties to be assigned multiple times.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n <Hello name=\"John\" name=\"John\" />\n ```\n\n ```js,expect_diagnostic\n <label xml:lang=\"en-US\" xml:lang=\"en-US\"></label>\n ```\n\n ### Valid\n\n ```js\n <Hello firstname=\"John\" lastname=\"Doe\" />\n ```\n\n ```js\n <label xml:lang=\"en-US\" lang=\"en-US\"></label>\n ```\n"
          }
        }
      },
      "ts": {
        "complexity": {
          "noBannedTypes": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noBannedTypes",
            "link": "https://biomejs.dev/linter/rules/no-banned-types",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "ban-types"
              }
            ],
            "docs": " Disallow primitive type aliases and misleading types.\n\n - Enforce consistent names for primitive types\n\n   Primitive types have aliases.\n   For example, `Number` is an alias of `number`.\n   The rule recommends the lowercase primitive type names.\n\n - Disallow the `Function` type\n\n   The `Function` type is loosely typed and is thus considered dangerous or harmful.\n   `Function` is equivalent to the type `(...rest: any[]) => any` that uses the unsafe `any` type.\n\n - Disallow the misleading non-nullable type `{}`\n\n   In TypeScript, the type `{}` doesn't represent an empty object.\n   It represents any value except `null` and `undefined`.\n   The following TypeScript example is perfectly valid:\n\n   ```ts,expect_diagnostic\n   const n: {} = 0\n   ```\n\n   To represent an empty object, you should use `{ [k: string]: never }` or `Record<string, never>`.\n\n   To avoid any confusion, the rule forbids the use of the type `{}`, except in two situations:\n\n   1. In type constraints to restrict a generic type to non-nullable types:\n\n   ```ts\n   function f<T extends {}>(x: T) {\n       assert(x != null);\n   }\n   ```\n\n   2. In a type intersection to narrow a type to its non-nullable equivalent type:\n\n   ```ts\n   type NonNullableMyType = MyType & {};\n   ```\n\n   In this last case, you can also use the `NonNullable` utility type:\n\n   ```ts\n   type NonNullableMyType = NonNullable<MyType>;\n   ```\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n let foo: String = \"bar\";\n ```\n\n ```ts,expect_diagnostic\n let bool = true as Boolean;\n ```\n\n ```ts,expect_diagnostic\n let invalidTuple: [string, Boolean] = [\"foo\", false];\n ```\n\n ### Valid\n\n ```ts\n let foo: string = \"bar\";\n ```\n\n ```ts\n let tuple: [boolean, string] = [false, \"foo\"];\n ```\n\n"
          },
          "noEmptyTypeParameters": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "noEmptyTypeParameters",
            "link": "https://biomejs.dev/linter/rules/no-empty-type-parameters",
            "recommended": true,
            "fixKind": "none",
            "docs": " Disallow empty type parameters in type aliases and interfaces.\n\n TypeScript permits the use of empty type parameter lists in type alias and interface declarations; however, this practice is generally discouraged.\n Allowing empty type parameter lists can lead to unclear or ambiguous code, where the intention of the generic type is not self-evident.\n This rule disallows empty type parameter lists in type alias and interface declarations.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface Foo<> {}\n ```\n\n ```ts,expect_diagnostic\n type Bar<> = {};\n ```\n\n ### Valid\n\n ```ts\n interface Foo {}\n ```\n\n ```ts\n type Foo<T> = {\n  bar: T;\n }\n ```\n"
          },
          "noUselessEmptyExport": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUselessEmptyExport",
            "link": "https://biomejs.dev/linter/rules/no-useless-empty-export",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "no-useless-empty-export"
              }
            ],
            "docs": " Disallow empty exports that don't change anything in a module file.\n\n An empty `export {}` is sometimes useful to turn a file that would otherwise be a script into a module.\n Per the [TypeScript Handbook Modules page](https://www.typescriptlang.org/docs/handbook/modules.html):\n\n > In TypeScript, just as in ECMAScript 2015,\n > any file containing a top-level import or export is considered a module.\n > Conversely, a file without any top-level import or export declarations is treated as a script\n > whose contents are available in the global scope.\n\n However, an `export {}` statement does nothing if there are any other top-level import or export in the file.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import { A } from \"module\";\n export {};\n ```\n\n ```js,expect_diagnostic\n export const A = 0;\n export {};\n ```\n\n ### Valid\n\n ```js\n export {};\n ```\n\n"
          },
          "noUselessThisAlias": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUselessThisAlias",
            "link": "https://biomejs.dev/linter/rules/no-useless-this-alias",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "no-this-alias"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow useless `this` aliasing.\n\n Arrow functions inherits `this` from their enclosing scope;\n this makes `this` aliasing useless in this situation.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A {\n     method() {\n         const self = this;\n         return () => {\n             return self;\n         }\n     }\n }\n ```\n\n ### Valid\n\n ```js\n class A {\n     method() {\n         const self = this;\n         return function() {\n             this.g();\n             return self;\n         }\n     }\n }\n ```\n\n"
          },
          "noUselessTypeConstraint": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUselessTypeConstraint",
            "link": "https://biomejs.dev/linter/rules/no-useless-type-constraint",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "no-unnecessary-type-constraint"
              }
            ],
            "docs": " Disallow using `any` or `unknown` as type constraint.\n\n Generic type parameters (`<T>`) in TypeScript may be **constrained** with [`extends`](https://www.typescriptlang.org/docs/handbook/generics.html#generic-constraints).\n A supplied type must then be a subtype of the supplied constraint.\n All types are subtypes of `any` and `unknown`.\n It is thus useless to extend from `any` or `unknown`.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface FooAny<T extends any> {}\n ```\n ```ts,expect_diagnostic\n type BarAny<T extends any> = {};\n ```\n ```ts,expect_diagnostic\n class BazAny<T extends any> {\n }\n ```\n ```ts,expect_diagnostic\n class BazAny {\n   quxAny<U extends any>() {}\n }\n ```\n ```ts,expect_diagnostic\n const QuuxAny = <T extends any>() => {};\n ```\n ```ts,expect_diagnostic\n function QuuzAny<T extends any>() {}\n ```\n\n ```ts,expect_diagnostic\n interface FooUnknown<T extends unknown> {}\n ```\n ```ts,expect_diagnostic\n type BarUnknown<T extends unknown> = {};\n ```\n ```ts,expect_diagnostic\n class BazUnknown<T extends unknown> {\n }\n ```ts,expect_diagnostic\n class BazUnknown {\n   quxUnknown<U extends unknown>() {}\n }\n ```\n ```ts,expect_diagnostic\n const QuuxUnknown = <T extends unknown>() => {};\n ```\n ```ts,expect_diagnostic\n function QuuzUnknown<T extends unknown>() {}\n ```\n\n ### Valid\n\n ```ts\n interface Foo<T> {}\n\n type Bar<T> = {};\n```\n"
          },
          "useOptionalChain": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useOptionalChain",
            "link": "https://biomejs.dev/linter/rules/use-optional-chain",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintTypeScript": "prefer-optional-chain"
              }
            ],
            "docs": " Enforce using concise optional chain instead of chained logical expressions.\n\n TypeScript 3.7 added support for the optional chain operator.\n This operator allows you to safely access properties and methods on objects when they are potentially `null` or `undefined`.\n The optional chain operator only chains when the property value is `null` or `undefined`.\n It is much safer than relying upon logical operator chaining; which chains on any truthy value.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n foo && foo.bar && foo.bar.baz && foo.bar.baz.buzz\n ```\n\n ```js,expect_diagnostic\n foo.bar && foo.bar.baz.buzz\n ```\n\n ```js,expect_diagnostic\n foo !== undefined && foo.bar != undefined && foo.bar.baz !== null && foo.bar.baz.buzz\n ```\n\n ```js,expect_diagnostic\n ((foo || {}).bar || {}).baz;\n ```\n\n ```js,expect_diagnostic\n (await (foo1 || {}).foo2 || {}).foo3;\n ```\n\n ```ts,expect_diagnostic\n (((typeof x) as string) || {}).bar;\n ```\n\n ### Valid\n\n ```js\n foo && bar;\n```\n ```js\n foo || {};\n```\n\n ```js\n (foo = 2 || {}).bar;\n```\n\n ```js\n foo || foo.bar;\n```\n\n ```js\n foo[\"some long\"] && foo[\"some long string\"].baz\n```\n\n"
          }
        },
        "correctness": {
          "noVoidTypeReturn": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noVoidTypeReturn",
            "link": "https://biomejs.dev/linter/rules/no-void-type-return",
            "recommended": true,
            "fixKind": "none",
            "docs": " Disallow returning a value from a function with the return type 'void'\n\n 'void' signals the absence of value. The returned value is likely to be ignored by the caller.\n Thus, returning a value when the return type of function is 'void', is undoubtedly an error.\n\n Only returning without a value is allowed, as it’s a control flow statement.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n class A {\n     f(): void {\n         return undefined;\n     }\n }\n ```\n\n ```ts,expect_diagnostic\n const a = {\n     f(): void {\n         return undefined;\n     }\n }\n ```\n\n ```ts,expect_diagnostic\n function f(): void {\n     return undefined;\n }\n ```\n\n ```ts,expect_diagnostic\n export default function(): void {\n     return undefined;\n }\n ```\n\n ```ts,expect_diagnostic\n const g = (): void => {\n     return undefined;\n };\n ```\n\n ```ts,expect_diagnostic\n const h = function(): void {\n     return undefined;\n };\n ```\n\n ### Valid\n\n ```js\n class A {\n     f() {\n         return undefined;\n     }\n }\n ```\n\n ```ts\n class B {\n     f(): void {}\n }\n ```\n\n ```ts\n function f(): void {\n     return;\n }\n ```\n\n"
          }
        },
        "nursery": {
          "noEvolvingAny": {
            "deprecated": false,
            "version": "1.6.3",
            "name": "noEvolvingAny",
            "link": "https://biomejs.dev/linter/rules/no-evolving-any",
            "recommended": true,
            "fixKind": "none",
            "docs": " Disallow variables from evolving into `any` type through reassignments.\n\n In TypeScript, variables without explicit type annotations can evolve their types based on subsequent assignments.\n This behaviour can accidentally lead to variables with an `any` type, weakening type safety.\n Just like the `any` type, evolved `any` types disable many type-checking rules and should be avoided to maintain strong type safety.\n This rule prevents such cases by ensuring variables do not evolve into `any` type, encouraging explicit type annotations and controlled type evolutions.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n let a;\n ````\n\n ```ts,expect_diagnostic\n const b = [];\n ````\n\n ```ts,expect_diagnostic\n let c = null;\n ````\n\n\n ### Valid\n\n ```ts\n let a: number;\n let b = 1;\n var c : string;\n var d = \"abn\";\n const e: never[] = [];\n const f = [null];\n const g = ['1'];\n const h = [1];\n let workspace: Workspace | null = null;\n ```\n\n"
          }
        },
        "performance": {
          "noBarrelFile": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noBarrelFile",
            "link": "https://biomejs.dev/linter/rules/no-barrel-file",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintBarrelFiles": "avoid-barrel-files"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow the use of barrel file.\n\n A barrel file is a file that re-exports all of the exports from other files in a directory.\n This structure results in the unnecessary loading of many modules, significantly impacting performance in large-scale applications.\n Additionally, it complicates the codebase, making it difficult to navigate and understand the project's dependency graph.\n This rule ignores .d.ts files and type-only exports.\n\n For a more detailed explanation, check out https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n export * from \"foo\";\n export * from \"bar\";\n ```\n\n ```ts,expect_diagnostic\n export { foo } from \"foo\";\n export { bar } from \"bar\";\n ```\n\n ```ts,expect_diagnostic\n export { default as module1 } from \"./module1\";\n ```\n\n ### Valid\n\n ```ts\n export type * from \"foo\";\n export type { foo } from \"foo\";\n ```\n\n"
          }
        },
        "style": {
          "noInferrableTypes": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noInferrableTypes",
            "link": "https://biomejs.dev/linter/rules/no-inferrable-types",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "no-inferrable-types"
              }
            ],
            "docs": " Disallow type annotations for variables, parameters, and class properties initialized with a literal expression.\n\n TypeScript is able to infer the types of parameters, properties, and variables from their default or initial values.\n There is no need to use an explicit `:` type annotation for trivially inferred types (boolean, bigint, number, regex, string).\n Doing so adds unnecessary verbosity to code making it harder to read.\n\n In contrast to ESLint's rule, this rule allows to use a wide type for `const` declarations.\n Moreover, the rule does not recognize `undefined` values, primitive type constructors (String, Number, ...), and `RegExp` type.\n These global variables could be shadowed by local ones.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n const variable: 1 = 1;\n ```\n\n ```ts,expect_diagnostic\n let variable: number = 1;\n ```\n\n ```ts,expect_diagnostic\n class SomeClass {\n   readonly field: 1 = 1;\n }\n ```\n\n ```ts,expect_diagnostic\n class SomeClass {\n   field: number = 1;\n }\n ```\n\n ```ts,expect_diagnostic\n function f(param: number = 1): void {}\n ```\n\n ### Valid\n\n ```ts\n const variable: number = 1;\n ```\n\n ```ts\n let variable: 1 | 2 = 1;\n ```\n\n ```ts\n class SomeClass {\n   readonly field: number = 1;\n }\n ```\n\n ```ts\n // `undefined` could be shadowed\n const variable: undefined = undefined;\n ```\n\n ```ts\n // `RegExp` could be shadowed\n const variable: RegExp = /a/;\n ```\n\n ```ts\n // `String` could be shadowed\n let variable: string = String(5);\n ```\n\n ```ts\n class SomeClass {\n   field: 1 | 2 = 1;\n }\n ```\n\n ```ts\n function f(param: 1 | 2 = 1): void {}\n ```\n\n"
          },
          "noNamespace": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noNamespace",
            "link": "https://biomejs.dev/linter/rules/no-namespace",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintTypeScript": "no-namespace"
              }
            ],
            "docs": " Disallow the use of TypeScript's `namespace`s.\n\n Namespaces are an old way to organize your code in TypeScript.\n They are not recommended anymore and should be replaced by ES6 modules\n (the `import`/`export` syntax).\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n module foo {}\n ```\n\n ```ts,expect_diagnostic\n declare module foo {}\n ```\n\n ```ts,expect_diagnostic\n namespace foo {}\n ```\n\n ```ts,expect_diagnostic\n declare namespace foo {}\n ```\n\n ### Valid\n\n ```ts\n import foo from 'foo';\n export { bar };\n ```\n\n ```ts\n declare global {}\n ```\n\n ```ts\n declare module 'foo' {}\n ```\n\n"
          },
          "noNonNullAssertion": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noNonNullAssertion",
            "link": "https://biomejs.dev/linter/rules/no-non-null-assertion",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintTypeScript": "no-non-null-assertion"
              }
            ],
            "docs": " Disallow non-null assertions using the `!` postfix operator.\n\n TypeScript's `!` non-null assertion operator asserts to the type system that an expression is non-nullable, as\n in not `null` or `undefined`. Using assertions to tell the type system new information is often a sign that\n code is not fully type-safe. It's generally better to structure program logic so that TypeScript understands\n when values may be nullable.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface Example {\n   property?: string;\n }\n declare const foo: Example;\n const includesBaz = foo.property!.includes('baz');\n ```\n ```ts,expect_diagnostic\n (b!! as number) = \"test\";\n ```\n\n ### Valid\n\n ```ts\n interface Example {\n   property?: string;\n }\n\n declare const foo: Example;\n const includesBaz = foo.property?.includes('baz') ?? false;\n ```\n\n"
          },
          "noParameterProperties": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noParameterProperties",
            "link": "https://biomejs.dev/linter/rules/no-parameter-properties",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "eslintTypeScript": "parameter-properties"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow the use of parameter properties in class constructors.\n\n TypeScript includes a \"parameter properties\" shorthand for declaring a class constructor parameter and class property in one location.\n Parameter properties can confuse those new to TypeScript as they are less explicit than other ways of declaring and initializing class members.\n Moreover, private class properties, starting with `#`, cannot be turned into \"parameter properties\".\n This questions the future of this feature.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n class A {\n     constructor(readonly name: string) {}\n }\n ```\n\n ### Valid\n\n ```ts\n class A {\n     constructor(name: string) {}\n }\n ```\n\n"
          },
          "noUnusedTemplateLiteral": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnusedTemplateLiteral",
            "link": "https://biomejs.dev/linter/rules/no-unused-template-literal",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintTypeScript": "no-useless-template-literals"
              }
            ],
            "docs": " Disallow template literals if interpolation and special-character handling are not needed\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = `bar`\n ```\n\n ```js,expect_diagnostic\n const foo = `bar `\n ```\n\n ### Valid\n\n ```js\n const foo = `bar\n has newline`;\n ```\n\n ```js\n const foo = `\"bar\"`\n ```\n\n ```js\n const foo = `'bar'`\n ```\n"
          },
          "useAsConstAssertion": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "useAsConstAssertion",
            "link": "https://biomejs.dev/linter/rules/use-as-const-assertion",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "prefer-as-const"
              }
            ],
            "docs": " Enforce the use of `as const` over literal type and type annotation.\n\n In TypeScript, there are three common ways to specify that a value is of a specific type such as `2` and not a general type such as `number`:\n\n 1. `as const`: telling TypeScript to infer the literal type automatically\n 2. `as <literal>`: explicitly telling the literal type to TypeScript\n 3. type annotation: explicitly telling the literal type to TypeScript when declare variables\n\n The rule suggests to use `as const` when you're using `as` with a literal type or type annotation, since `as const` is simpler and doesn't require retyping the value.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n let bar: 2 = 2;\n ```\n\n ```ts,expect_diagnostic\n let foo = { bar: 'baz' as 'baz' };\n ```\n\n ### Valid\n\n ```ts\n let foo = 'bar';\n let foo = 'bar' as const;\n let foo: 'bar' = 'bar' as const;\n let bar = 'bar' as string;\n let foo = { bar: 'baz' };\n ```\n"
          },
          "useConsistentArrayType": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "useConsistentArrayType",
            "link": "https://biomejs.dev/linter/rules/use-consistent-array-type",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintTypeScript": "array-type"
              }
            ],
            "docs": " Require consistently using either `T[]` or `Array<T>`\n\n _TypeScript_ provides two equivalent ways to define an array type: `T[]` and `Array<T>`.\n The two styles are functionally equivalent.\n Using the same style consistently across your codebase makes it easier for developers to read and understand array types.\n\n ## Example\n\n ### Invalid\n ```ts,expect_diagnostic\n let invalid: Array<foo>;\n ```\n\n ```ts,expect_diagnostic\n let invalid: Promise<Array<string>>;\n ```\n\n ```ts,expect_diagnostic\n let invalid3: Array<Foo<Bar>>;\n ```\n\n ### Valid\n ```ts\n const valid: Array<string | number> = ['a', 'b'];\n const valid: Array<{ prop: string }> = [{ prop: 'a' }];\n const valid: Array<() => void> = [() => {}];\n const valid: MyType[] = ['a', 'b'];\n const valid: string[] = ['a', 'b'];\n const valid: readonly string[] = ['a', 'b'];\n ```\n\n ## Options\n The rule provides two options that help to specify what type of array declarations to use.\n\n Default: \"shorthand\"\n\n ```json\n {\n     \"//\": \"...\",\n     \"options\": {\n         \"syntax\": \"shorthand\"\n     }\n }\n ```\n ### Syntax\n\n By default, all array declarations will be converted to `T[]` or `readonly T[]`, which it means `shorthand`,\n or if the options is set to the \"generic\", that all will converted to `Array<T>` or `ReadonlyArray<T>`.\n\n"
          },
          "useEnumInitializers": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useEnumInitializers",
            "link": "https://biomejs.dev/linter/rules/use-enum-initializers",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "prefer-enum-initializers"
              }
            ],
            "docs": " Require that each enum member value be explicitly initialized.\n\n _TypeScript_ enums are a practical way to organize semantically related constant values.\n Members of enums that don't have explicit values are by default given sequentially increasing numbers.\n\n When the value of enum members are important,\n allowing implicit values for enum members can cause bugs if enum declarations are modified over time.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n enum Version {\n     V1,\n }\n ```\n\n ```ts,expect_diagnostic\n enum Status {\n     Open = 1,\n     Close,\n }\n ```\n\n ```ts,expect_diagnostic\n enum Color {\n     Red = \"Red\",\n     Green = \"Green\",\n     Blue,\n }\n ```\n\n ### Valid\n\n ```ts\n enum Status {\n     Open = 1,\n     Close = 2,\n }\n ```\n\n ```ts\n enum Color {\n     Red = \"Red\",\n     Green = \"Green\",\n     Blue = \"Blue\",\n }\n ```\n\n ```ts\n declare enum Weather {\n     Rainy,\n     Sunny,\n }\n ```\n"
          },
          "useExportType": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "useExportType",
            "link": "https://biomejs.dev/linter/rules/use-export-type",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "consistent-type-exports"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Promotes the use of `export type` for types.\n\n _TypeScript_ allows specifying a `type` marker on an `export` to indicate that the `export` doesn't exist at runtime.\n This allows transpilers to safely drop exports of types without looking for their definition.\n\n The rule ensures that types are exported using a type-only `export`.\n It also groups inline type exports into a grouped `export type`.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface I {}\n export { I };\n ```\n\n ```ts,expect_diagnostic\n type T = number;\n export { T };\n ```\n\n ```ts,expect_diagnostic\n import type { T } from \"./mod.js\";\n export { T };\n ```\n\n ```ts,expect_diagnostic\n export { type X, type Y };\n ```\n\n ### Valid\n\n ```js\n class C {}\n function f() {}\n export { C, f };\n ```\n\n This rules checks only the identifiers that are defined in a file.\n It doesn't warn against a type exported as a value in a re-export clause such as:\n\n ```ts,ignore\n export { TypeA } from \"./mod.ts\"\n ```\n"
          },
          "useImportType": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "useImportType",
            "link": "https://biomejs.dev/linter/rules/use-import-type",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "consistent-type-imports"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Promotes the use of `import type` for types.\n\n _TypeScript_ allows specifying a `type` qualifier on an `import` to indicate that the `import` doesn't exist at runtime.\n This allows transpilers to safely drop imports of types without looking for their definition.\n This also ensures that some modules are not loaded at runtime.\n\n The rule ensures that all imports used only as a type use a type-only `import`.\n It also groups inline type imports into a grouped `import type`.\n\n ## Caveat with TypeScript experimental decorators\n\n Some frameworks like Angular and NestJS rely on\n [experimental TypeScript decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)\n which allow code to be generated based on type annotations.\n This is mainly used for dependency injection.\n\n Since Biome doesn't know how a decorator is implemented,\n it is unable to detect that an import used as a type is also used as a value in the code generated by a decorator.\n This leads Biome to suggest importing some imports as type, which are actually used as value at runtime.\n\n We haven't found a way to support this pattern yet.\n We recommend disabling this rule when using such decorators.\n\n ## Options\n\n This rule respects the [`jsxRuntime`](https://biomejs.dev/reference/configuration/#javascriptjsxruntime)\n setting and will make an exception for React globals if it is set to\n `\"reactClassic\"`.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n import { A } from \"./mod.js\";\n type TypeOfA = typeof A;\n let a: A;\n ```\n\n ```ts,expect_diagnostic\n import { type A, type B } from \"./mod.js\";\n ```\n\n ```ts,expect_diagnostic\n import { type A, B } from \"./mod.js\";\n let c: A;\n let d: typeof B;\n ```\n\n ### Valid\n\n ```ts\n import type { A } from \"./mod.js\";\n let a: A;\n ```\n\n ```ts\n import { B } from \"./mod.js\";\n let a: B = new B();\n ```\n\n ```ts\n import { type A, B } from \"./mod.js\";\n let c: A;\n let d = new B();\n ```\n\n The rule ignores unused imports and imports with import attributes.\n\n ```ts\n import { A } from \"./mod.js\";\n\n import { B } from \"./mod.js\" with {};\n export type { B };\n ```\n"
          },
          "useLiteralEnumMembers": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useLiteralEnumMembers",
            "link": "https://biomejs.dev/linter/rules/use-literal-enum-members",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintTypeScript": "prefer-literal-enum-member"
              }
            ],
            "docs": " Require all enum members to be literal values.\n\n Usually, an enum member is initialized with a literal number or a literal string.\n However, _TypeScript_ allows the value of an enum member to be many different kinds of expressions.\n Using a computed enum member is often error-prone and confusing.\n This rule requires the initialization of enum members with constant expressions.\n It allows numeric and bitwise expressions for supporting [enum flags](https://stackoverflow.com/questions/39359740/what-are-enum-flags-in-typescript/39359953#39359953).\n It also allows referencing previous enum members.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n const x = 2;\n enum Computed {\n     A,\n     B = x,\n }\n ```\n\n ### Valid\n\n ```ts\n enum Direction {\n     Left,\n     Right,\n }\n ```\n\n ```ts\n enum Order {\n     Less = -1,\n     Equal = 0,\n     Greater = 1,\n }\n ```\n\n ```ts\n enum State {\n     Open = \"Open\",\n     Close = \"Close\",\n }\n ```\n\n ```ts\n enum FileAccess {\n     None = 0,\n     Read = 1,\n     Write = 1 << 1,\n     All = Read | Write\n }\n ```\n"
          },
          "useNamingConvention": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useNamingConvention",
            "link": "https://biomejs.dev/linter/rules/use-naming-convention",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "naming-convention"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Enforce naming conventions for everything across a codebase.\n\n Enforcing [naming conventions](https://en.wikipedia.org/wiki/Naming_convention_(programming)) helps to keep the codebase consistent,\n and reduces overhead when thinking about the name [case] of a variable.\n\n The following section describes the default conventions enforced by the rule.\n You can also enforce custom conventions with the [rule options](#options).\n\n ## Naming conventions\n\n All names can be prefixed and suffixed by underscores `_` and dollar signs `$`.\n\n ### Variable and parameter names\n\n All variables and function parameters are in [`camelCase`] or [`PascalCase`].\n Catch parameters are in [`camelCase`].\n\n Additionally, global variables declared as `const` or `var` may be in [`CONSTANT_CASE`].\n Global variables are declared at module or script level.\n Variables declared in a TypeScript `namespace` are also considered global.\n\n ```js\n function f(param, _unusedParam) {\n     let localValue = 0;\n     try {\n         /* ... */\n     } catch (customError) {\n         /* ... */\n     }\n }\n\n export const A_CONSTANT = 5;\n\n let aVariable = 0;\n\n export namespace ns {\n     export const ANOTHER_CONSTANT = \"\";\n }\n ```\n\n Examples of incorrect names:\n\n ```js,expect_diagnostic\n let a_value = 0;\n ```\n\n ```js,expect_diagnostic\n const fooYPosition = 0;\n ```\n\n ```js,expect_diagnostic\n function f(FIRST_PARAM) {}\n ```\n\n ### Function names\n\n - A `function` name is in [`camelCase`] or [`PascalCase`].\n - A global `function` can also be in `UPPERCASE`.\n   This allows supporting the frameworks that require some function to use valid [HTTP method names](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).\n\n ```jsx\n function trimString(s) { /*...*/ }\n\n function Component() {\n     return <div></div>;\n }\n\n export function GET() { /*...*/ }\n ```\n\n ### TypeScript `enum` names\n\n A _TypeScript_ `enum` name is in [`PascalCase`].\n\n `enum` members are by default in [`PascalCase`].\n However, you can configure the [case] of `enum` members.\n See [options](#options) for more details.\n\n ```ts\n enum Status {\n     Open,\n     Close,\n }\n ```\n\n ### Classes\n\n - A class name is in [`PascalCase`].\n\n - Static property and static getter names are in [`camelCase`] or [`CONSTANT_CASE`].\n\n - Class property and method names are in [`camelCase`].\n\n ```js\n class Person {\n     static MAX_FRIEND_COUNT = 256;\n\n     static get SPECIAL_PERSON_INSTANCE() { /*...*/ }\n\n     initializedProperty = 0;\n\n     specialMethod() {}\n }\n ```\n\n ### TypeScript `type` aliases and `interface`\n\n - A `type` alias or an interface name are in [`PascalCase`].\n\n - Member names of a type are in [`camelCase`].\n\n - `readonly` property and getter names can also be in [`CONSTANT_CASE`].\n\n ```ts\n type Named = {\n     readonly fullName: string;\n\n     specialMethod(): void;\n };\n\n interface Named {\n     readonly fullName: string;\n\n     specialMethod(): void;\n }\n\n interface PersonConstructor {\n     readonly MAX_FRIEND_COUNT: number;\n\n     get SPECIAL_PERSON_INSTANCE(): Person;\n\n     new(): Person;\n }\n ```\n\n Examples of an incorrect type alias:\n\n ```ts,expect_diagnostic\n type person = { fullName: string };\n ```\n\n ### Literal object member names\n\n - Literal object members are in [`camelCase`].\n\n ```js\n const alice = {\n     fullName: \"Alice\",\n }\n ```\n\n Example of an incorrect name:\n\n ```js,expect_diagnostic\n const alice = {\n     full_name: \"Alice\",\n }\n ```\n\n ### Import and export aliases and namespaces\n\n Import and export namespaces are in [`camelCase`] or [`PascalCase`].\n\n ```js\n import * as myLib from \"my-lib\";\n import * as Framework from \"framework\";\n\n export * as myLib from \"my-lib\";\n export * as Framework from \"framework\";\n ```\n\n `import` and `export` aliases are in [`camelCase`], [`PascalCase`], or [`CONSTANT_CASE`]:\n\n ```js\n import assert, {\n     deepStrictEqual as deepEqual,\n     AssertionError as AssertError\n } from \"node:assert\";\n ```\n\n Examples of an incorrect name:\n\n ```ts,expect_diagnostic\n import * as MY_LIB from \"my-lib\";\n ```\n\n ### TypeScript type parameter names\n\n A _TypeScript_ type parameter name is in [`PascalCase`].\n\n ```ts\n function id<Val>(value: Val): Val { /* ... */}\n ```\n\n ### TypeScript `namespace` names\n\n A _TypeScript_ `namespace` names are in [`camelCase`] or in [`PascalCase`].\n\n ```ts\n namespace mathExtra {\n     /*...*/\n }\n\n namespace MathExtra {\n     /*...*/\n }\n ```\n\n ## Options\n\n The rule provides several options that are detailed in the following subsections.\n\n ```json\n {\n     \"//\": \"...\",\n     \"options\": {\n         \"strictCase\": false,\n         \"requireAscii\": true,\n         \"enumMemberCase\": \"CONSTANT_CASE\",\n         \"conventions\": [\n             {\n                 \"selector\": {\n                     \"kind\": \"memberLike\",\n                     \"modifiers\": [\"private\"]\n                 },\n                 \"match\": \"_(.+)\",\n                 \"formats\": [\"camelCase\"]\n             }\n         ]\n     }\n }\n ```\n\n ### strictCase\n\n When this option is set to `true`, it forbids consecutive uppercase characters in [`camelCase`] and [`PascalCase`].\n For instance,  when the option is set to `true`, `HTTPServer` or `aHTTPServer` will throw an error.\n These names should be renamed to `HttpServer` and `aHttpServer`\n\n When the option is set to `false`, consecutive uppercase characters are allowed.\n `HTTPServer` and `aHTTPServer` are so valid.\n\n Default: `true`\n\n ### requireAscii\n\n When this option is set to `true`, it forbids names that include non-ASCII characters.\n For instance,  when the option is set to `true`, `café` or `안녕하세요` will throw an error.\n\n When the option is set to `false`, names may include non-ASCII characters.\n `café` and `안녕하세요` are so valid.\n\n Default: `false`\n\n **This option will be turned on by default in Biome 2.0.**\n\n ### enumMemberCase\n\n By default, the rule enforces the naming convention followed by the [TypeScript Compiler team](https://www.typescriptlang.org/docs/handbook/enums.html):\n an `enum` member is in [`PascalCase`].\n\n You can enforce another convention by setting `enumMemberCase` option.\n The supported cases are: [`PascalCase`], [`CONSTANT_CASE`], and [`camelCase`].\n\n This option will be deprecated in the future.\n Use the `conventions` option instead.\n\n ### conventions (Since v1.8.0)\n\n The `conventions` option allows applying custom conventions.\n The option takes an array of conventions.\n Every convention is an object that includes a `selector` and some requirements (`match` and `formats`).\n\n For example, you can enforce the use of [`CONSTANT_CASE`] for global `const` declarations:\n\n ```json\n {\n     \"//\": \"...\",\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": {\n                     \"kind\": \"const\",\n                     \"scope\": \"global\"\n                 },\n                 \"formats\": [\"CONSTANT_CASE\"]\n             }\n         ]\n     }\n }\n ```\n\n A selector describes which declarations the convention applies to.\n You can select a declaration based on several criteria:\n\n - `kind`: the kind of the declaration among:\n   - `any` (default kind if the kind is unset)\n   - `typeLike`: classes, enums, type aliases, and interfaces\n   - `class`\n   - `enum`\n   - `interface`\n   - `typeAlias`\n   - `function`: named function declarations and expressions\n   - `namespaceLike`: TypeScript namespaces, import and export namespaces (`import * as namespace from`)\n   - `namespace`: TypeScript namespaces\n   - `importNamespace`\n   - `exportNamespace`\n   - `importAlias`: default imports and aliases of named imports\n   - `exportAlias`: aliases of re-exported names\n   - `variable`: const, let, using, and var declarations\n   - `const`\n   - `let`\n   - `var`\n   - `using`\n   - `functionParameter`\n   - `catchParameter`\n   - `indexParameter`: parameters of index signatures\n   - `typeParameter`: generic type parameter\n   - `classMember`: class properties, parameter properties, methods, getters, and setters\n   - `classProperty`: class properties, including parameter properties\n   - `classMethod`\n   - `classGetter`\n   - `classSetter`\n   - `objectLiteralMember`: literal object properties, methods, getters, and setters\n   - `objectLiteralProperty`\n   - `objectLiteralMethod`\n   - `objectLiteralGetter`\n   - `objectLiteralSetter`\n   - `typeMember`: properties, methods, getters, and setters declared in type aliases and interfaces\n   - `typeProperty`\n   - `typeMethod`\n   - `typeGetter`\n   - `typeSetter`\n - `modifiers`: an array of modifiers among:\n   - `abstract`: applies to class members and classes\n   - `private`: applies to class members\n   - `protected`: applies to class members\n   - `readonly`: applies to class members and type members\n   - `static`: applies to class members\n - `scope`: where the declaration appears. Allowed values:\n   - `any`: anywhere (default value if the scope is unset)\n   - `global`: the global scope (also includes the namespace scopes)\n\n For each declaration,\n the `conventions` array is traversed until a selector selects the declaration.\n The requirements of the convention are so verified on the declaration.\n\n A convention must set at least one requirement among:\n\n - `match`: a regular expression that the name of the declaration must match.\n   If the regular expression captures a part of the name, then this part is checked against `formats`.\n   Only the first capture is tested. Other captures are ignored.\n - `formats`: the string [case] that the name must follow.\n   The supported cases are: [`PascalCase`], [`CONSTANT_CASE`], [`camelCase`], and [`snake_case`].\n\n If `match` is set and `formats` is unset,\n then the part of the name captured by the regular expression is forwarded to the next convention of the array.\n\n If a declaration is not selected or if a capture is forwarded while there is no more custom conventions,\n Then the declaration is verified against the default convention.\n If a forwarded capture is a part of the original name, then underscore and dollar signs are not trimmed.\n\n In the following example:\n\n - We require `static readonly` class members to be in [`CONSTANT_CASE`].\n - We require `private` class members to start with an underscore `_` and to be in [`camelCase`].\n - We require global constants to be in [`CONSTANT_CASE`] and\n   we allow these constants to be enclosed by double underscores or to be named `_SPECIAL_`.\n - We require interfaces to start with `I`, except for interfaces ending with `Error`,\n   and to be in [`PascalCase`].\n - All other names follow the default conventions\n\n```json5\n {\n     \"//\": \"...\",\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": {\n                     \"kind\": \"classMember\",\n                     \"modifiers\": [\"static\", \"readonly\"]\n                 },\n                 \"formats\": [\"CONSTANT_CASE\"]\n             },\n             {\n                 \"selector\": {\n                     \"kind\": \"classMember\",\n                     \"modifiers\": [\"private\"]\n                 },\n                 \"match\": \"_(.+)\",\n                 \"formats\": [\"camelCase\"]\n             }, {\n                 \"selector\": {\n                     \"kind\": \"const\",\n                     \"scope\": \"global\"\n                 },\n                 \"match\": \"__(.+)__|_SPECIAL_|(.+)\",\n                 \"formats\": [\"CONSTANT_CASE\"]\n             }, {\n                 \"selector\": {\n                     \"kind\": \"interface\"\n                 },\n                 \"match\": \"I(.*)|(.*)Error\",\n                 \"formats\": [\"PascalCase\"]\n             }\n             // default conventions\n         ]\n     }\n }\n ```\n\n ### Regular expression syntax\n\n The `match` option takes a regular expression that supports the following syntaxes:\n\n - Greedy quantifiers `*`, `?`, `+`, `{n}`, `{n,m}`, `{n,}`, `{m}`\n - Non-greedy quantifiers `*?`, `??`, `+?`, `{n}?`, `{n,m}?`, `{n,}?`, `{m}?`\n - Any character matcher `.`\n - Character classes `[a-z]`, `[xyz]`, `[^a-z]`\n - Alternations `|`\n - Capturing groups `()`\n - Non-capturing groups `(?:)`\n - A limited set of escaped characters including all special characters\n   and regular string escape characters `\\f`, `\\n`, `\\r`, `\\t`, `\\v`\n\n [case]: https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats\n [`camelCase`]: https://en.wikipedia.org/wiki/Camel_case\n [`PascalCase`]: https://en.wikipedia.org/wiki/Camel_case\n [`CONSTANT_CASE`]: https://en.wikipedia.org/wiki/Snake_case\n [`snake_case`]: https://en.wikipedia.org/wiki/Snake_case\n"
          },
          "useShorthandArrayType": {
            "deprecated": true,
            "version": "1.0.0",
            "name": "useShorthandArrayType",
            "link": "https://biomejs.dev/linter/rules/use-shorthand-array-type",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " When expressing array types, this rule promotes the usage of `T[]` shorthand instead of `Array<T>`.\n\n ## Examples\n\n ### Invalid\n ```ts,expect_diagnostic\n let invalid: Array<foo>;\n ```\n\n ```ts,expect_diagnostic\n let invalid: Promise<Array<string>>;\n ```\n\n ```ts,expect_diagnostic\n let invalid: Array<Foo<Bar>>;\n ```\n\n ```ts,expect_diagnostic\n let invalid: Array<[number, number]>;\n ```\n\n ```ts,expect_diagnostic\n let invalid: Array<[number, number]>;\n ```\n\n ```ts,expect_diagnostic\n let invalid: ReadonlyArray<string>;\n ```\n\n ### Valid\n\n ```ts\n let valid: Array<Foo | Bar>;\n let valid: Array<keyof Bar>;\n let valid: Array<foo | bar>;\n ```\n"
          },
          "useShorthandFunctionType": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "useShorthandFunctionType",
            "link": "https://biomejs.dev/linter/rules/use-shorthand-function-type",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "prefer-function-type"
              }
            ],
            "docs": " Enforce using function types instead of object type with call signatures.\n\n TypeScript allows for two common ways to declare a type for a function:\n\n - Function type: `() => string`\n - Object type with a signature: `{ (): string }`\n\n The function type form is generally preferred when possible for being more succinct.\n\n This rule suggests using a function type instead of an interface or object type literal with a single call signature.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface Example {\n   (): string;\n }\n ```\n\n ```ts,expect_diagnostic\n function foo(example: { (): number }): number {\n   return example();\n }\n ```\n\n ### Valid\n\n ```ts\n type Example = () => string;\n ```\n\n ```ts\n function foo(example: () => number): number {\n   return bar();\n }\n ```\n\n ```ts\n // returns the function itself, not the `this` argument.\n type ReturnsSelf2 = (arg: string) => ReturnsSelf;\n ```\n\n ```ts\n interface Foo {\n   bar: string;\n }\n interface Bar extends Foo {\n   (): void;\n }\n ```\n\n ```ts\n // multiple call signatures (overloads) is allowed:\n interface Overloaded {\n   (data: string): number;\n   (id: number): string;\n }\n // this is equivalent to Overloaded interface.\n type Intersection = ((data: string) => number) & ((id: number) => string);\n```\n\n"
          }
        },
        "suspicious": {
          "noConfusingVoidType": {
            "deprecated": false,
            "version": "1.2.0",
            "name": "noConfusingVoidType",
            "link": "https://biomejs.dev/linter/rules/no-confusing-void-type",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "eslintTypeScript": "no-invalid-void-type"
              }
            ],
            "docs": " Disallow `void` type outside of generic or return types.\n\n `void` in TypeScript refers to a function return that is meant to be ignored.\n Attempting to use a void type outside of a return type or a type parameter is often a sign of programmer error.\n `void` can also be misleading for other developers even if used correctly.\n\n > The `void` type means cannot be mixed with any other types, other than `never`, which accepts all types.\n > If you think you need this then you probably want the `undefined` type instead.\n\n The code action suggests using `undefined` instead of `void`.\n It is unsafe because a variable with the `void` type cannot be asigned to a variable with the `undefined` type.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n let foo: void;\n ```\n\n ```ts,expect_diagnostic\n function logSomething(thing: void) {}\n ```\n\n ```ts,expect_diagnostic\n interface Interface {\n     prop: void;\n }\n ```\n\n ```ts,expect_diagnostic\n type PossibleValues = number | void;\n ```\n\n ### Valid\n\n ```ts\n function foo(): void {};\n ```\n\n ```ts\n function doSomething(this: void) {}\n ```\n\n ```ts\n function printArg<T = void>(arg: T) {}\n ```\n"
          },
          "noConstEnum": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noConstEnum",
            "link": "https://biomejs.dev/linter/rules/no-const-enum",
            "recommended": true,
            "fixKind": "safe",
            "docs": " Disallow TypeScript `const enum`\n\n Const enums are enums that should be inlined at use sites.\n Const enums are not supported by bundlers and are incompatible with the `isolatedModules` mode.\n Their use can lead to import nonexistent values (because const enums are erased).\n\n Thus, library authors and bundler users should not use const enums.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n const enum Status {\n   Open,\n   Close,\n }\n ```\n\n ### Valid\n\n ```ts\n enum Status {\n   Open,\n   Close,\n }\n ```\n"
          },
          "noEmptyInterface": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noEmptyInterface",
            "link": "https://biomejs.dev/linter/rules/no-empty-interface",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "no-empty-interface"
              }
            ],
            "sourceKind": "inspired",
            "docs": " Disallow the declaration of empty interfaces.\n\n An empty interface in TypeScript does very little: any non-nullable value is assignable to `{}`.\n Using an empty interface is often a sign of programmer error, such as misunderstanding the concept of `{}` or forgetting to fill in fields.\n\n The rule ignores empty interfaces that `extends` one or multiple types.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface A {}\n ```\n\n ### Valid\n\n ```ts\n interface A {\n   prop: string;\n }\n\n // Allow empty interfaces that extend a type.\n interface B extends A {}\n ```\n"
          },
          "noExplicitAny": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noExplicitAny",
            "link": "https://biomejs.dev/linter/rules/no-explicit-any",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintTypeScript": "no-explicit-any"
              }
            ],
            "docs": " Disallow the `any` type usage.\n\n The `any` type in TypeScript is a dangerous \"escape hatch\" from the type system.\n Using `any` disables many type checking rules and is generally best used only as a last resort or when prototyping code.\n\n TypeScript's `--noImplicitAny` compiler option prevents an implied `any`,\n but doesn't prevent `any` from being explicitly used the way this rule does.\n\n Sometimes you can use the type `unknown` instead of the type `any`.\n It also accepts any value, however it requires to check that a property exists before calling it.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n let variable: any = 1;\n ```\n\n ```ts,expect_diagnostic\n class SomeClass {\n    message: Array<Array<any>>;\n }\n ```\n\n ```ts,expect_diagnostic\n function fn(param: Array<any>): void {}\n ```\n\n ### Valid\n\n ```ts\n let variable: number = 1;\n let variable2 = 1;\n ```\n\n ```ts\n class SomeClass<T extends any> {\n    message: Array<Array<unknown>>;\n }\n ```\n\n ```ts\n function fn(param: Array<Array<unknown>>): Array<unknown> {}\n ```\n\n"
          },
          "noExtraNonNullAssertion": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noExtraNonNullAssertion",
            "link": "https://biomejs.dev/linter/rules/no-extra-non-null-assertion",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "no-extra-non-null-assertion"
              }
            ],
            "docs": " Prevents the wrong usage of the non-null assertion operator (`!`) in TypeScript files.\n\n > The `!` non-null assertion operator in TypeScript is used to assert that a value's type does not include `null` or `undefined`. Using the operator any more than once on a single value does nothing.\n\n ## Examples\n\n ### Invalid\n ```ts,expect_diagnostic\n const bar = foo!!.bar;\n ```\n\n ```ts,expect_diagnostic\n function fn(bar?: { n: number }) {\n   return bar!?.n;\n }\n ```\n\n ```ts,expect_diagnostic\n function fn(bar?: { n: number }) {\n   return ((bar!))?.();\n }\n ```\n\n ### Valid\n ```ts\n const bar = foo!.bar;\n\n obj?.string!.trim();\n\n function fn(key: string | null) {\n   const obj = {};\n   return obj?.[key!];\n }\n ```\n\n"
          },
          "noImplicitAnyLet": {
            "deprecated": false,
            "version": "1.4.0",
            "name": "noImplicitAnyLet",
            "link": "https://biomejs.dev/linter/rules/no-implicit-any-let",
            "recommended": true,
            "fixKind": "none",
            "docs": " Disallow use of implicit `any` type on variable declarations.\n\n TypeScript variable declaration without any type annotation and initialization have the `any` type.\n The any type in TypeScript is a dangerous “escape hatch” from the type system.\n Using any disables many type checking rules and is generally best used only as a last resort or when prototyping code.\n TypeScript’s [`--noImplicitAny` compiler option](https://www.typescriptlang.org/tsconfig#noImplicitAny) doesn't report this case.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n var a;\n a = 2;\n ````\n\n ```ts,expect_diagnostic\n let b;\n b = 1\n ```\n\n ### Valid\n\n ```ts\n var a = 1;\n let a:number;\n var b: number\n var b =10;\n ```\n\n"
          },
          "noMisleadingInstantiator": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noMisleadingInstantiator",
            "link": "https://biomejs.dev/linter/rules/no-misleading-instantiator",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintTypeScript": "no-misused-new"
              }
            ],
            "docs": " Enforce proper usage of `new` and `constructor`.\n\n In JavaScript, classes utilize the `constructor` method to initialize a new instance. On the other hand, TypeScript interfaces can describe a class type with a `new()` method signature, though this pattern is not commonly seen in real-world code. Developers, especially those new to JavaScript or TypeScript, might occasionally confuse the use of `constructor` with `new`.\n This rule triggers warnings in the following scenarios:\n - When a class has a method named `new`.\n - When an interface defines a method named `constructor` or `new` that returns the interface type.\n - When a type alias has a `constructor` method.\n\n You should not use this rule if you intentionally want a class with a `new` method, and you're confident nobody working in your code will mistake it with an `constructor`.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface I {\n   new (): I;\n   constructor(): void;\n }\n ```\n\n ```ts,expect_diagnostic\n class C {\n   new(): C;\n }\n ```\n\n ### Valid\n\n ```ts\n declare class C {\n   constructor();\n }\n\n interface I {\n   new (): C;\n }\n ```\n"
          },
          "noUnsafeDeclarationMerging": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnsafeDeclarationMerging",
            "link": "https://biomejs.dev/linter/rules/no-unsafe-declaration-merging",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "eslintTypeScript": "no-unsafe-declaration-merging"
              }
            ],
            "docs": " Disallow unsafe declaration merging between interfaces and classes.\n\n _TypeScript_'s [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) supports merging separate declarations with the same name.\n\n _Declaration merging_ between classes and interfaces is unsafe.\n The _TypeScript Compiler_ doesn't check whether properties defined in the interface are initialized in the class.\n This can cause lead to _TypeScript_ not detecting code that will cause runtime errors.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface Foo {\n     f(): void\n }\n\n class Foo {}\n\n const foo = new Foo();\n foo.f(); // Runtime Error: Cannot read properties of undefined.\n ```\n\n ### Valid\n\n ```ts\n interface Foo {}\n class Bar implements Foo {}\n ```\n\n ```ts\n namespace Baz {}\n namespace Baz {}\n enum Baz {}\n ```\n"
          },
          "useNamespaceKeyword": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useNamespaceKeyword",
            "link": "https://biomejs.dev/linter/rules/use-namespace-keyword",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "eslintTypeScript": "prefer-namespace-keyword"
              }
            ],
            "docs": " Require using the `namespace` keyword over the `module` keyword to declare TypeScript namespaces.\n\n TypeScript historically allowed a code organization called _namespace_.\n [_ECMAScript modules_ are preferred](https://www.typescriptlang.org/docs/handbook/2/modules.html#typescript-namespaces) (`import` / `export`).\n\n For projects still using _namespaces_, it's preferred to use the `namespace` keyword instead of the `module` keyword.\n The `module` keyword is deprecated to avoid any confusion with the _ECMAScript modules_ which are often called _modules_.\n\n Note that TypeScript `module` declarations to describe external APIs (`declare module \"foo\" {}`) are still allowed.\n\n See also: https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n module Example {}\n ```\n\n ### Valid\n\n ```ts\n namespace Example {}\n ```\n\n ```ts\n declare module \"foo\" {}\n ```\n\n"
          }
        }
      }
    },
    "numberOrRules": 247
  },
  "syntax": {
    "languages": {
      "js": {
        "correctness": {
          "noDuplicatePrivateClassMembers": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDuplicatePrivateClassMembers",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-private-class-members",
            "recommended": false,
            "fixKind": "none",
            "docs": " Catch a `SyntaxError` when defining duplicate private class members.\n\n ## Examples\n\n ```js\n class A {\n   #foo;\n   #foo;\n ```\n"
          },
          "noInitializerWithDefinite": {
            "deprecated": false,
            "version": "1.4.0",
            "name": "noInitializerWithDefinite",
            "link": "https://biomejs.dev/linter/rules/no-initializer-with-definite",
            "recommended": false,
            "fixKind": "none",
            "docs": " Disallow initializing a variable with a definite assertion to prevent `SyntaxError`.\n\n ## Examples\n\n ```js\n let foo!: string = \"bar\";\n ```\n"
          },
          "noSuperWithoutExtends": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noSuperWithoutExtends",
            "link": "https://biomejs.dev/linter/rules/no-super-without-extends",
            "recommended": false,
            "fixKind": "none",
            "docs": " Catch a `SyntaxError` when writing calling `super()` on a class that doesn't extends any class\n\n ## Examples\n\n ```js\n class A {\n ```\n"
          }
        },
        "nursery": {
          "noTypeOnlyImportAttributes": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "noTypeOnlyImportAttributes",
            "link": "https://biomejs.dev/linter/rules/no-type-only-import-attributes",
            "recommended": false,
            "fixKind": "none",
            "docs": " Disallow type-only imports and exports with import attributes.\n\n ## Examples\n\n ```js\n import type { A } from \"./a.json\" with { type: \"json\" };\n ```\n"
          }
        }
      }
    },
    "numberOrRules": 4
  },
  "assist": {
    "languages": {
      "js": {
        "correctness": {
          "organizeImports": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "organizeImports",
            "link": "https://biomejs.dev/linter/rules/organize-imports",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Provides a whole-source code action to sort the imports in the file\n using import groups and natural ordering.\n\n ## Examples\n\n ```js\n import React, {\n     FC,\n     useEffect,\n     useRef,\n     ChangeEvent,\n     KeyboardEvent,\n } from 'react';\n import { logger } from '@core/logger';\n import { reduce, debounce } from 'lodash';\n import { Message } from '../Message';\n import { createServer } from '@server/node';\n import { Alert } from '@ui/Alert';\n import { repeat, filter, add } from '../utils';\n import { initializeApp } from '@core/app';\n import { Popup } from '@ui/Popup';\n import { createConnection } from '@server/database';\n ```\n"
          }
        }
      }
    },
    "numberOrRules": 1
  }
};
	// const json_file = new URL("_metadata.json", root);
	return new Response(JSON.stringify(schema), {
		status: 200,
		headers: {
			"content-type": "application/json",
		},
	});
}
