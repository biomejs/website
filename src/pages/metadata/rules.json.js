export function GET() {
	const schema = {
  "lints": {
    "languages": {
      "css": {
        "a11y": {
          "useGenericFontNames": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "useGenericFontNames",
            "link": "https://biomejs.dev/linter/rules/use-generic-font-names",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "font-family-no-missing-generic-family-keyword"
                }
              }
            ],
            "docs": " Disallow a missing generic family keyword within font families.\n\n The generic font family can be:\n - placed anywhere in the font family list\n - omitted if a keyword related to property inheritance or a system font is used\n\n This rule checks the font and font-family properties.\n The following special situations are ignored:\n - Property with a keyword value such as `inherit`, `initial`.\n - The last value being a CSS variable.\n - `font-family` property in an `@font-face` rule.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a { font-family: Arial; }\n ```\n\n ```css,expect_diagnostic\n a { font: normal 14px/32px -apple-system, BlinkMacSystemFont; }\n ```\n\n ### Valid\n\n ```css\n a { font-family: \"Lucida Grande\", \"Arial\", sans-serif; }\n ```\n\n ```css\n a { font-family: inherit; }\n ```\n\n ```css\n a { font-family: sans-serif; }\n ```\n\n ```css\n a { font-family: var(--font); }\n ```\n\n ```css\n @font-face { font-family: Gentium; }\n ```\n\n"
          }
        },
        "complexity": {
          "noImportantStyles": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noImportantStyles",
            "link": "https://biomejs.dev/linter/rules/no-important-styles",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "declaration-no-important"
                }
              }
            ],
            "docs": " Disallow the use of the `!important` style.\n\n The `!important` CSS style is a declaration used to give a specific rule\n higher precedence over other conflicting rules. When it is applied to a CSS\n property, that property's value is prioritized over any other declarations,\n regardless of specificity or order of appearance in the stylesheet.\n\n ### How `!important` Works\n - Normally, CSS rules follow a cascade order, where the browser decides\n   which rules apply based on specificity, inheritance, and proximity to the\n   targeted element.\n - Adding `!important` to a rule overrides this cascade logic, forcing the\n   rule to apply even if other rules have higher specificity or are defined later.\n\n ### Why `!important` Should Be Avoided\n While `!important` can solve specific and immediate styling issues, its effects\n can result in long-term problems within a codebase:\n\n - **Breaks the Cascade Logic**: It overrides the natural flow of cascading rules,\n   making it harder to predict which styles will apply.\n - **Increases Complexity**: Once `!important` is used in a stylesheet, other developers\n   may respond by using it even more aggressively, creating a cycle of overrides and\n   increasing maintenance difficulty.\n - **Reduces Reusability**: Overriding styles often makes components less flexible,\n   as future adjustments require more effort.\n - **Hinders Debugging**: Debugging styles becomes more challenging, as developers\n   must account for the `!important` rule overriding expected behavior.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n .style {\n     color: red !important;\n }\n ```\n\n ## Useful links\n\n - [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/important)\n"
          }
        },
        "correctness": {
          "noInvalidDirectionInLinearGradient": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noInvalidDirectionInLinearGradient",
            "link": "https://biomejs.dev/linter/rules/no-invalid-direction-in-linear-gradient",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "function-linear-gradient-no-nonstandard-direction"
                }
              }
            ],
            "docs": " Disallow non-standard direction values for linear gradient functions.\n\n A valid and standard direction value is one of the following:\n - an angle\n - to plus a side-or-corner (`to top`, `to bottom`, `to left`, `to right`; `to top right`, `to right top`, `to bottom left`, etc.)\n\n A common mistake (matching outdated non-standard syntax) is to use just a side-or-corner without the preceding to.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n .foo { background: linear-gradient(top, #fff, #000); }\n ```\n\n ```css,expect_diagnostic\n .foo { background: linear-gradient(45, #fff, #000); }\n ```\n\n ### Valid\n\n ```css\n .foo { background: linear-gradient(to top, #fff, #000); }\n ```\n\n ```css\n .foo { background: linear-gradient(45deg, #fff, #000); }\n ```\n\n"
          },
          "noInvalidGridAreas": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noInvalidGridAreas",
            "link": "https://biomejs.dev/linter/rules/no-invalid-grid-areas",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "named-grid-areas-no-invalid"
                }
              }
            ],
            "docs": " Disallows invalid named grid areas in CSS Grid Layouts.\n\n For a named grid area to be valid, all strings must define:\n\n - the same number of cell tokens\n - at least one cell token\n\n And all named grid areas that spans multiple grid cells must form a single filled-in rectangle.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a { grid-template-areas: \"a a\"\n                          \"b b b\"; }\n ```\n\n ```css,expect_diagnostic\n a { grid-template-areas: \"b b b\"\n                          \"\"; }\n ```\n\n ```css,expect_diagnostic\n a { grid-template-areas: \"a a a\"\n                          \"b b a\"; }\n ```\n\n ### Valid\n\n ```css\n a { grid-template-areas: \"a a a\"\n                          \"b b b\"; }\n ```\n\n ```css\n a { grid-template-areas: \"a a a\"\n                          \"a a a\"; }\n ```\n\n"
          },
          "noInvalidPositionAtImportRule": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noInvalidPositionAtImportRule",
            "link": "https://biomejs.dev/linter/rules/no-invalid-position-at-import-rule",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "no-invalid-position-at-import-rule"
                }
              }
            ],
            "docs": " Disallow the use of `@import` at-rules in invalid positions.\n\n Any `@import` rules must precede all other valid at-rules and style rules in a stylesheet (ignoring `@charset` and `@layer`), or else the `@import` rule is invalid.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a {}\n @import 'foo.css';\n ```\n\n ### Valid\n\n ```css\n @import 'foo.css';\n a {}\n ```\n\n"
          },
          "noMissingVarFunction": {
            "deprecated": false,
            "version": "1.9.2",
            "name": "noMissingVarFunction",
            "link": "https://biomejs.dev/linter/rules/no-missing-var-function",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "custom-property-no-missing-var-function"
                }
              }
            ],
            "docs": " Disallow missing var function for css variables.\n\n This rule has the following limitations:\n - It only reports custom properties that are defined and accessible within the same source.\n - It does not check properties that can contain author-defined identifiers.\n - It ignores the following properties:\n   - `animation`\n   - `animation-name`\n   - `counter-increment`\n   - `counter-reset`\n   - `counter-set`\n   - `grid-column`\n   - `grid-column-end`\n   - `grid-column-start`\n   - `grid-row`\n   - `grid-row-end`\n   - `grid-row-start`\n   - `list-style`\n   - `list-style-type`\n   - `transition`\n   - `transition-property`\n   - `view-transition-name`\n   - `will-change`\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a {\n   --foo: red;\n   color: --foo;\n }\n ```\n\n ```css,expect_diagnostic\n .parent {\n   --foo: red;\n   .child {\n     color: --foo;\n   }\n }\n ```\n\n ```css,expect_diagnostic\n @property --bar {}\n\n a {\n   color: --bar;\n }\n ```\n\n ```css,expect_diagnostic\n :root {\n   --baz: 0;\n }\n\n a {\n   --foo: --baz;\n }\n ```\n\n ### Valid\n\n ```css\n p {\n   color: var(--foo);\n }\n ```\n\n ```css\n p {\n   --foo: red;\n   color: var(--foo);\n }\n ```\n\n ```css\n p {\n   color: --foo;\n }\n ```\n\n ```css\n *:root {\n --global: red;\n }\n\n a {\n     color: var(--global);\n }\n ```\n\n ```css\n @property --global-value {}\n a {\n   color: var(--global-value);\n }\n ```\n\n ```css\n a {\n   view-transition-name: --bbb;\n }\n ```\n\n"
          },
          "noUnknownFunction": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noUnknownFunction",
            "link": "https://biomejs.dev/linter/rules/no-unknown-function",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "function-no-unknown"
                }
              }
            ],
            "docs": " Disallow unknown CSS value functions.\n\n This rule ignores double-dashed custom functions, e.g. `--custom-function()`.\n\n Data sources of known CSS value functions are:\n - MDN reference on [CSS value functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions)\n - MDN reference on [CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)\n - MDN [browser compatibility data for CSS value functions](https://github.com/mdn/browser-compat-data/tree/main/css/types)\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a { transform: unknown(1); }\n ```\n\n ### Valid\n\n ```css\n a { transform: scale(1); }\n ```\n\n ## Options\n\n ### `ignore`\n\n A list of unknown function names to ignore (case-insensitive).\n\n ```json,options\n {\n   \"options\": {\n     \"ignore\": [\n       \"custom-function\"\n     ]\n   }\n }\n ```\n\n #### Valid\n\n ```css,use_options\n a { transform: custom-function(1); }\n ```\n\n"
          },
          "noUnknownMediaFeatureName": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noUnknownMediaFeatureName",
            "link": "https://biomejs.dev/linter/rules/no-unknown-media-feature-name",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "media-feature-name-no-unknown"
                }
              }
            ],
            "docs": " Disallow unknown media feature names.\n\n This rule considers media feature names defined in the CSS Specifications, up to and including Editor's Drafts, to be known.\n This rule also checks vendor-prefixed media feature names.\n\n Data sources of known CSS media feature are:\n - MDN reference on [CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)\n - W3C reference on [Media Queries Level 3](https://www.w3.org/TR/mediaqueries-3/)\n - W3C reference on [Media Queries Level 4](https://www.w3.org/TR/mediaqueries-4/)\n - W3C reference on [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/)\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n @media screen and (unknown > 320px) {}\n ```\n\n ```css,expect_diagnostic\n @media only screen and (min-width: 320px) and (max-width: 480px) and (unknown: 150dpi) {}\n ```\n\n ```css,expect_diagnostic\n @media (not(unknown < 320px)) and (max-width > 640px) {}\n ```\n\n ```css,expect_diagnostic\n @media (400px <= unknown <= 700px) {}\n ```\n\n ### Valid\n\n ```css\n @media screen and (width > 320px) {}\n ```\n\n ```css\n @media only screen and (min-width: 320px) and (max-width: 480px) and (resolution: 150dpi) {}\n ```\n\n ```css\n @media (not(min-width < 320px)) and (max-width > 640px) {}\n ```\n\n ```css\n @media (400px <= width <= 700px) {}\n ```\n\n ```css\n @media screen and (-webkit-width > 320px) {}\n ```\n\n"
          },
          "noUnknownProperty": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noUnknownProperty",
            "link": "https://biomejs.dev/linter/rules/no-unknown-property",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "property-no-unknown"
                }
              }
            ],
            "docs": " Disallow unknown properties.\n\n This rule considers properties defined in the CSS Specifications and browser specific properties to be known.\n https://github.com/known-css/known-css-properties#source\n\n\n This rule ignores:\n\n - custom variables e.g. `--custom-property`\n - vendor-prefixed properties (e.g., `-moz-align-self,` `-webkit-align-self`)\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a {\n   colr: blue;\n }\n ```\n\n ```css,expect_diagnostic\n a {\n   my-property: 1;\n }\n ```\n\n ### Valid\n\n ```css\n a {\n   color: green;\n }\n ```\n\n ```css\n a {\n   fill: black;\n }\n ```\n\n ```css\n a {\n   -moz-align-self: center;\n }\n ```\n\n ## Options\n\n ### `ignore`\n\n A list of unknown property names to ignore (case-insensitive).\n\n ```json,options\n {\n   \"options\": {\n     \"ignore\": [\n       \"custom-property\"\n     ]\n   }\n }\n ```\n\n #### Valid\n\n ```css,use_options\n a {\n   custom-property: black;\n }\n ```\n\n"
          },
          "noUnknownPseudoClass": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noUnknownPseudoClass",
            "link": "https://biomejs.dev/linter/rules/no-unknown-pseudo-class",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "selector-pseudo-class-no-unknown"
                }
              }
            ],
            "docs": " Disallow unknown pseudo-class selectors.\n\n For details on known pseudo-class, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)\n\n This rule ignores vendor-prefixed pseudo-class selectors.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a:unknown {}\n ```\n\n ```css,expect_diagnostic\n a:UNKNOWN {}\n ```\n\n ```css,expect_diagnostic\n a:hoverr {}\n ```\n\n ### Valid\n\n ```css\n a:hover {}\n ```\n\n ```css\n a:focus {}\n ```\n\n ```css\n :not(p) {}\n ```\n\n ```css\n input:-moz-placeholder {}\n ```\n\n ## Options\n\n ### `ignore`\n\n A list of unknown pseudo-class names to ignore (case-insensitive).\n\n ```json,options\n {\n   \"options\": {\n     \"ignore\": [\n       \"custom-pseudo-class\"\n     ]\n   }\n }\n ```\n\n #### Valid\n\n ```css,use_options\n a:custom-pseudo-class {}\n ```\n\n"
          },
          "noUnknownPseudoElement": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noUnknownPseudoElement",
            "link": "https://biomejs.dev/linter/rules/no-unknown-pseudo-element",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "selector-pseudo-element-no-unknown"
                }
              }
            ],
            "docs": " Disallow unknown pseudo-element selectors.\n\n For details on known CSS pseudo-elements, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#list_of_pseudo-elements).\n\n This rule ignores vendor-prefixed pseudo-element selectors.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a::pseudo {}\n ```\n\n ```css,expect_diagnostic\n a::PSEUDO {}\n ```\n\n ```css,expect_diagnostic\n a::element {}\n ```\n\n ### Valid\n\n ```css\n a:before {}\n ```\n\n ```css\n a::before {}\n ```\n\n ```css\n ::selection {}\n ```\n\n ```css\n input::-moz-placeholder {}\n ```\n\n ## Options\n\n ### `ignore`\n\n A list of unknown pseudo-element names to ignore (case-insensitive).\n\n ```json,options\n {\n   \"options\": {\n     \"ignore\": [\n       \"custom-pseudo-element\"\n     ]\n   }\n }\n ```\n\n #### Valid\n\n ```css,use_options\n ::custom-pseudo-element {}\n ```\n\n"
          },
          "noUnknownTypeSelector": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "noUnknownTypeSelector",
            "link": "https://biomejs.dev/linter/rules/no-unknown-type-selector",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "selector-type-no-unknown"
                }
              }
            ],
            "docs": " Disallow unknown type selectors.\n\n This rule considers tags defined in the HTML, SVG, and MathML specifications to be known.\n For details on known CSS type selectors, see the following links\n - https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors\n - https://developer.mozilla.org/ja/docs/Web/HTML/Element\n - https://developer.mozilla.org/ja/docs/Web/SVG/Element\n - https://developer.mozilla.org/ja/docs/Web/MathML/Element\n\n This rule allows custom elements.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n unknown {}\n ```\n\n ```css,expect_diagnostic\n unknown > ul {}\n ```\n\n ```css,expect_diagnostic\n x-Foo {}\n ```\n\n ### Valid\n\n ```css\n input {}\n ```\n\n ```css\n ul > li {}\n ```\n\n ```css\n x-foo {}\n ```\n\n"
          },
          "noUnknownUnit": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noUnknownUnit",
            "link": "https://biomejs.dev/linter/rules/no-unknown-unit",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "unit-no-unknown"
                }
              }
            ],
            "docs": " Disallow unknown CSS units.\n\n For details on known CSS units, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths).\n\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a {\n   width: 10pixels;\n }\n ```\n\n ```css,expect_diagnostic\n a {\n   width: calc(10px + 10pixels);\n }\n ```\n\n ### Valid\n\n ```css\n a {\n   width: 10px;\n }\n ```\n\n ```css\n a {\n   width: 10Px;\n }\n ```\n\n ```css\n a {\n   width: 10pX;\n }\n ```\n\n ```css\n a {\n   width: calc(10px + 10px);\n }\n ```\n\n"
          },
          "noUnmatchableAnbSelector": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noUnmatchableAnbSelector",
            "link": "https://biomejs.dev/linter/rules/no-unmatchable-anb-selector",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "selector-anb-no-unmatchable"
                }
              }
            ],
            "docs": " Disallow unmatchable An+B selectors.\n\n Selectors that always evaluate to 0 will not match any elements.\n For more details about the An+B syntax, see:\n https://www.w3.org/TR/css-syntax-3/#anb-microsyntax\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a:nth-child(0) {}\n ```\n\n ```css,expect_diagnostic\n a:nth-last-child(0n) {}\n ```\n\n ```css,expect_diagnostic\n a:nth-of-type(0n+0) {}\n ```\n\n ```css,expect_diagnostic\n a:nth-last-of-type(0 of a) {}\n ```\n\n ### Valid\n\n ```css\n a:nth-child(1) {}\n ```\n\n ```css\n a:nth-last-child(1n) {}\n ```\n\n ```css\n a:nth-of-type(1n+0) {}\n ```\n\n ```css\n a:nth-last-of-type(1 of a) {}\n ```\n\n"
          }
        },
        "nursery": {
          "noDeprecatedMediaType": {
            "deprecated": false,
            "version": "2.3.14",
            "name": "noDeprecatedMediaType",
            "link": "https://biomejs.dev/linter/rules/no-deprecated-media-type",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "media-type-no-deprecated"
                }
              }
            ],
            "docs": " Disallow deprecated media types.\n\n Several media types defined in earlier specifications have been deprecated and should\n no longer be used. The deprecated media types are still recognized, but they match nothing.\n\n For details on media types, see the\n [Media Queries Level 5 specification](https://drafts.csswg.org/mediaqueries-5/#media-types).\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n @media tv {}\n ```\n\n ```css,expect_diagnostic\n @media handheld and (min-width: 480px) {}\n ```\n\n ### Valid\n\n ```css\n @media screen {}\n ```\n\n ```css\n @media print and (min-resolution: 300dpi) {}\n ```\n\n ## Options\n\n ### `allow`\n\n Media types to allow (case-insensitive).\n\n ```json,options\n {\n   \"options\": {\n     \"allow\": [\"tv\", \"speech\"]\n   }\n }\n ```\n\n #### Valid\n\n ```css,use_options\n @media tv {}\n @media speech {}\n ```\n\n"
          },
          "noExcessiveLinesPerFile": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "noExcessiveLinesPerFile",
            "link": "https://biomejs.dev/linter/rules/no-excessive-lines-per-file",
            "recommended": false,
            "fixKind": "none",
            "docs": " Restrict the number of lines in a file.\n\n Large files tend to do many things and can make it hard to follow what's going on.\n This rule can help enforce a limit on the number of lines in a file.\n\n ## Examples\n\n ### Invalid\n\n The following example will show a diagnostic when `maxLines` is set to 2:\n\n ```json,options\n {\n     \"options\": {\n        \"maxLines\": 2\n     }\n }\n ```\n ```css,expect_diagnostic,use_options\n .a { color: red; }\n .b { color: blue; }\n .c { color: green; }\n ```\n\n ### Valid\n\n ```css\n .a { color: red; }\n .b { color: blue; }\n ```\n\n ## Options\n\n ### `maxLines`\n\n This option sets the maximum number of lines allowed in a file.\n If the file exceeds this limit, a diagnostic will be reported.\n\n Default: `300`\n\n ### `skipBlankLines`\n\n When this option is set to `true`, blank lines are not counted towards the maximum line limit.\n\n Default: `false`\n\n"
          },
          "noHexColors": {
            "deprecated": false,
            "version": "2.3.14",
            "name": "noHexColors",
            "link": "https://biomejs.dev/linter/rules/no-hex-colors",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "color-no-hex"
                }
              }
            ],
            "docs": " Disallow hex colors.\n\n While hex colors are widely supported and compact, they can be less readable\n and have limitations in terms of color representation compared to color models\n like HSL or OKLCH. This rule encourages the use of more expressive color formats.\n\n This rule is inspired by the Stylelint rule\n [`color-no-hex`](https://stylelint.io/user-guide/rules/color-no-hex/).\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a { color: #000; }\n ```\n\n ```css,expect_diagnostic\n a { color: #fff1aa; }\n ```\n\n ```css,expect_diagnostic\n a { color: #123456aa; }\n ```\n\n ### Valid\n\n ```css\n a { color: black; }\n ```\n\n ```css\n a { color: rgb(0, 0, 0); }\n ```\n\n ### References\n\n - [MDN Web Docs on CSS color values](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value)\n\n"
          }
        },
        "style": {
          "noDescendingSpecificity": {
            "deprecated": false,
            "version": "1.9.3",
            "name": "noDescendingSpecificity",
            "link": "https://biomejs.dev/linter/rules/no-descending-specificity",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "no-descending-specificity"
                }
              }
            ],
            "docs": " Disallow a lower specificity selector from coming after a higher specificity selector.\n\n Source order is important in CSS, and when two selectors have the same specificity, the one that occurs last will take priority.\n However, the situation is different when one of the selectors has a higher specificity.\n In that case, source order does not matter: the selector with higher specificity will win out even if it comes first.\n\n The clashes of these two mechanisms for prioritization, source order and specificity, can cause some confusion when reading stylesheets.\n If a selector with higher specificity comes before the selector it overrides, we have to think harder to understand it, because it violates the source order expectation.\n **Stylesheets are most legible when overriding selectors always come after the selectors they override.**\n That way both mechanisms, source order and specificity, work together nicely.\n\n This rule enforces that practice as best it can, reporting fewer errors than it should.\n It cannot catch every actual overriding selector, but it can catch certain common mistakes.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n b a { color: red; }\n a { color: red; }\n ```\n\n ```css,expect_diagnostic\n a {\n   & > b { color: red; }\n }\n b { color: red; }\n ```\n\n ```css,expect_diagnostic\n :root input {\n     color: red;\n }\n html input {\n     color: red;\n }\n ```\n\n\n ### Valid\n\n ```css\n a { color: red; }\n b a { color: red; }\n ```\n\n ```css\n b { color: red; }\n a {\n   & > b { color: red; }\n }\n ```\n\n ```css\n a:hover { color: red; }\n a { color: red; }\n ```\n\n ```css\n a b {\n     color: red;\n }\n /* This selector is overwritten by the one above it, but this is not an error because the rule only evaluates it as a compound selector */\n :where(a) :is(b) {\n     color: blue;\n }\n ```\n\n"
          },
          "noValueAtRule": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noValueAtRule",
            "link": "https://biomejs.dev/linter/rules/no-value-at-rule",
            "recommended": false,
            "fixKind": "none",
            "docs": " Disallow use of `@value` rule in CSS modules.\n\n Use of CSS variables is recommended instead of `@value` rule.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic,file=example.module.css\n @value red: #FF0000;\n ```\n\n ### Valid\n\n ```css,file=example.module.css\n :root {\n   --red: #FF0000\n }\n\n p {\n   background-color: var(--red);\n }\n ```\n\n"
          }
        },
        "suspicious": {
          "noDuplicateAtImportRules": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noDuplicateAtImportRules",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-at-import-rules",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "no-duplicate-at-import-rules"
                }
              }
            ],
            "docs": " Disallow duplicate `@import` rules.\n\n This rule checks if the file urls of the @import rules are duplicates.\n\n This rule also checks the imported media queries and alerts of duplicates.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n @import 'a.css';\n @import 'a.css';\n ```\n\n ```css,expect_diagnostic\n @import \"a.css\";\n @import 'a.css';\n ```\n\n ```css,expect_diagnostic\n @import url('a.css');\n @import url('a.css');\n ```\n\n ### Valid\n\n ```css\n @import 'a.css';\n @import 'b.css';\n ```\n\n ```css\n @import url('a.css') tv;\n @import url('a.css') projection;\n ```\n\n"
          },
          "noDuplicateCustomProperties": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noDuplicateCustomProperties",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-custom-properties",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "declaration-block-no-duplicate-custom-properties"
                }
              }
            ],
            "docs": " Disallow duplicate custom properties within declaration blocks.\n\n This rule checks the declaration blocks for duplicate custom properties.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a { --custom-property: pink; --custom-property: orange;  }\n ```\n\n ```css,expect_diagnostic\n a { --custom-property: pink; background: orange; --custom-property: orange }\n ```\n\n ### Valid\n\n ```css\n a { --custom-property: pink; }\n ```\n\n ```css\n a { --custom-property: pink; --cUstOm-prOpErtY: orange; }\n ```\n\n"
          },
          "noDuplicateFontNames": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noDuplicateFontNames",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-font-names",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "font-family-no-duplicate-names"
                }
              }
            ],
            "docs": " Disallow duplicate names within font families.\n\n This rule checks the `font` and `font-family` properties for duplicate font names.\n\n This rule ignores var(--custom-property) variable syntaxes now.\n\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a { font-family: \"Lucida Grande\", 'Arial', sans-serif, sans-serif; }\n ```\n\n ```css,expect_diagnostic\n a { font-family: 'Arial', \"Lucida Grande\", Arial, sans-serif; }\n ```\n\n ```css,expect_diagnostic\n a { FONT: italic 300 16px/30px Arial, \" Arial\", serif; }\n ```\n\n ### Valid\n\n ```css\n a { font-family: \"Lucida Grande\", \"Arial\", sans-serif; }\n b { font: normal 14px/32px -apple-system, BlinkMacSystemFont, sans-serif; }\n c { font-family: SF Mono, Liberation Mono, sans-serif; }\n d { font: 1em SF Mono, Liberation Mono, sans-serif; }\n ```\n"
          },
          "noDuplicateProperties": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "noDuplicateProperties",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-properties",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "declaration-block-no-duplicate-properties"
                }
              }
            ],
            "docs": " Disallow duplicate properties within declaration blocks.\n\n This rule checks the declaration blocks for duplicate properties. It ignores custom properties.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a {\n   color: pink;\n   color: orange;\n }\n ```\n\n ### Valid\n\n ```css\n a {\n   color: pink;\n   background: orange;\n }\n ```\n\n"
          },
          "noDuplicateSelectorsKeyframeBlock": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noDuplicateSelectorsKeyframeBlock",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-selectors-keyframe-block",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "keyframe-block-no-duplicate-selectors"
                }
              }
            ],
            "docs": " Disallow duplicate selectors within keyframe blocks.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n @keyframes foo { from {} from {} }\n ```\n\n ```css,expect_diagnostic\n @keyframes foo { from {} FROM {} }\n ```\n\n ```css,expect_diagnostic\n @keyframes foo { 0% {} 0% {} }\n ```\n\n ### Valid\n\n ```css\n @keyframes foo { 0% {} 100% {} }\n ```\n\n ```css\n @keyframes foo { from {} to {} }\n ```\n\n"
          },
          "noEmptyBlock": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noEmptyBlock",
            "link": "https://biomejs.dev/linter/rules/no-empty-block",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "block-no-empty"
                }
              }
            ],
            "docs": " Disallow CSS empty blocks.\n\n By default, it will allow empty blocks with comments inside.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n p {}\n ```\n\n ```css,expect_diagnostic\n .b {}\n ```\n\n ```css,expect_diagnostic\n @media print { a {} }\n ```\n\n ### Valid\n\n ```css\n p {\n   color: red;\n }\n ```\n\n ```css\n p { /* foo */ }\n ```\n\n ```css\n @media print { a { color: pink; } }\n ```\n\n"
          },
          "noEmptySource": {
            "deprecated": false,
            "version": "2.2.7",
            "name": "noEmptySource",
            "link": "https://biomejs.dev/linter/rules/no-empty-source",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "no-empty-source"
                }
              }
            ],
            "docs": " Disallow empty sources.\n\n A source containing only the following is considered empty:\n   - Whitespace (spaces, tabs or newlines)\n   - Comments\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n\n ```\n\n ```css,expect_diagnostic\n /* Only comments */\n ```\n\n ### Valid\n\n ```css\n a { }\n ```\n\n ## Options\n\n ### `allowComments`\n\n Whether the comments should be marked as meaningful.\n When this option has been set to `true`, a file with only comments is considered valid.\n\n Default `false`\n\n ```json,options\n {\n   \"options\": {\n     \"allowComments\": true\n   }\n }\n ```\n\n #### Invalid\n\n ```css,expect_diagnostic,use_options\n\n ```\n\n #### Valid\n\n ```css,use_options\n /* Only comments */\n ```\n\n"
          },
          "noImportantInKeyframe": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noImportantInKeyframe",
            "link": "https://biomejs.dev/linter/rules/no-important-in-keyframe",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "keyframe-declaration-no-important"
                }
              }
            ],
            "docs": " Disallow invalid `!important` within keyframe declarations\n\n Using `!important` within keyframes declarations is completely ignored in some browsers.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n @keyframes foo {\n     from {\n       opacity: 0;\n     }\n     to {\n       opacity: 1 !important;\n     }\n }\n ```\n\n ### Valid\n\n ```css\n @keyframes foo {\n     from {\n       opacity: 0;\n     }\n     to {\n       opacity: 1;\n     }\n }\n ```\n\n"
          },
          "noIrregularWhitespace": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noIrregularWhitespace",
            "link": "https://biomejs.dev/linter/rules/no-irregular-whitespace",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "no-irregular-whitespace"
                }
              }
            ],
            "docs": " Disallows the use of irregular whitespace characters.\n\n Using irregular whitespace would lead to the failure of selecting the correct target.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n .firstClass\u000b.secondClass {\n   color: red;\n }\n ```\n\n ### Valid\n\n ```css\n .firstClass .secondClass {\n   color: red;\n }\n ```\n\n"
          },
          "noShorthandPropertyOverrides": {
            "deprecated": false,
            "version": "1.8.2",
            "name": "noShorthandPropertyOverrides",
            "link": "https://biomejs.dev/linter/rules/no-shorthand-property-overrides",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "declaration-block-no-shorthand-property-overrides"
                }
              }
            ],
            "docs": " Disallow shorthand properties that override related longhand properties.\n\n For details on shorthand properties, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties).\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a { padding-left: 10px; padding: 20px; }\n ```\n\n ### Valid\n\n ```css\n a { padding: 10px; padding-left: 20px; }\n ```\n\n ```css\n a { transition-property: opacity; } a { transition: opacity 1s linear; }\n ```\n\n"
          },
          "noUnknownAtRules": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noUnknownAtRules",
            "link": "https://biomejs.dev/linter/rules/no-unknown-at-rules",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "stylelint": "at-rule-no-unknown"
                }
              }
            ],
            "docs": " Disallow unknown at-rules.\n\n For details on known at-rules, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule).\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n @uNkNoWn {}\n ```\n\n ```css,expect_diagnostic\n @unknown-at-rule {\n   font-size: 14px;\n }\n ```\n\n ### Valid\n\n ```css\n @charset 'UTF-8';\n ```\n\n ```css\n @media (max-width: 960px) {\n   body {\n     font-size: 13px;\n   }\n }\n ```\n\n ## Options\n\n ### `ignore`\n\n A list of unknown at-rule names to ignore (case-insensitive).\n\n ```json,options\n {\n   \"options\": {\n     \"ignore\": [\n       \"custom-at-rule\",\n       \"my-custom-rule\"\n     ]\n   }\n }\n ```\n\n #### Valid\n\n ```css,use_options\n @custom-at-rule {}\n @my-custom-rule {\n   color: red;\n }\n ```\n"
          },
          "noUselessEscapeInString": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noUselessEscapeInString",
            "link": "https://biomejs.dev/linter/rules/no-useless-escape-in-string",
            "recommended": true,
            "fixKind": "safe",
            "docs": " Disallow unnecessary escapes in string literals.\n\n Escaping non-special characters in string literals doesn't have any effect.\n Hence, they may confuse a reader.\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n a::after {\n   content: \"\\a\"\n }\n ```\n\n ```css,expect_diagnostic\n a::after {\n   content: \"\\'\"\n }\n ```\n\n ### Valid\n\n ```css\n a::after {\n   content: \"\\\"\"\n }\n ```\n\n ```css\n a::after {\n   content: \"\\n\"\n }\n ```\n\n"
          }
        }
      },
      "graphql": {
        "correctness": {
          "useGraphqlNamedOperations": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useGraphqlNamedOperations",
            "link": "https://biomejs.dev/linter/rules/use-graphql-named-operations",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "no-anonymous-operations"
                }
              }
            ],
            "docs": " Enforce specifying the name of GraphQL operations.\n\n This is useful because most GraphQL client libraries use the operation name for caching purposes.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n query {}\n ```\n\n ### Valid\n\n ```graphql\n query Human {\n   name\n }\n ```\n\n"
          }
        },
        "nursery": {
          "noDuplicateArgumentNames": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "noDuplicateArgumentNames",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-argument-names",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "unique-argument-names"
                }
              }
            ],
            "docs": " Require all argument names for fields & directives to be unique.\n\n A GraphQL field or directive is only valid if all supplied arguments are uniquely named.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n query {\n   field(arg1: \"value\", arg1: \"value\")\n }\n ```\n\n ### Valid\n\n ```graphql\n query {\n   field(arg1: \"value\", arg2: \"value\")\n }\n ```\n\n"
          },
          "noDuplicateEnumValueNames": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "noDuplicateEnumValueNames",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-enum-value-names",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "unique-enum-value-names"
                }
              }
            ],
            "docs": " Require all enum value names to be unique.\n\n A GraphQL enum type is only valid if all its values are uniquely named.\n The enum value names are case insensitive, meaning `TEST` & `Test` are seen as the same enum value name.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n enum A {\n   TEST\n   OTHER\n   TEST\n }\n ```\n\n ```graphql,expect_diagnostic\n enum B {\n   TEST\n   TesT\n }\n ```\n\n ### Valid\n\n ```graphql\n enum A {\n   TEST\n   OTHER\n }\n ```\n\n"
          },
          "noDuplicateFieldDefinitionNames": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "noDuplicateFieldDefinitionNames",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-field-definition-names",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "unique-field-definition-names"
                }
              }
            ],
            "docs": " Require all fields of a type to be unique.\n\n A GraphQL complex type is only valid if all its fields are uniquely named.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n type SomeObject {\n   foo: String\n   foo: String\n }\n ```\n\n ```graphql,expect_diagnostic\n interface SomeObject {\n   foo: String\n   foo: String\n }\n ```\n\n ```graphql,expect_diagnostic\n input SomeObject {\n   foo: String\n   foo: String\n }\n ```\n\n ### Valid\n\n ```graphql\n type SomeObject {\n   foo: String\n   bar: String\n }\n ```\n\n ```graphql\n interface SomeObject {\n   foo: String\n   bar: String\n }\n ```\n\n ```graphql\n input SomeObject {\n   foo: String\n   bar: String\n }\n ```\n\n"
          },
          "noDuplicateGraphqlOperationName": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "noDuplicateGraphqlOperationName",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-graphql-operation-name",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintGraphql": "unique-operation-name"
                }
              }
            ],
            "docs": " Enforce unique operation names across a GraphQL document.\n\n This rule ensures that all GraphQL operations (queries, mutations, subscriptions) have unique names.\n Using unique operation names is essential for proper identification and reducing confusion.\n\n :::note\n This rule currently does not work across multiple files.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n query user {\n   user {\n     id\n   }\n }\n\n query user {\n   me {\n     id\n   }\n }\n ```\n\n ### Valid\n\n ```graphql\n query user {\n   user {\n     id\n   }\n }\n\n query me {\n   me {\n     id\n   }\n }\n ```\n\n"
          },
          "noDuplicateInputFieldNames": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "noDuplicateInputFieldNames",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-input-field-names",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "unique-input-field-names"
                }
              }
            ],
            "docs": " Require fields within an input object to be unique.\n\n A GraphQL input object value is only valid if all supplied fields are uniquely named.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n query {\n   field(arg: { f1: \"value\", f1: \"value\" })\n }\n ```\n\n ### Valid\n\n ```graphql\n query {\n   field(arg: { f1: \"value\", f2: \"value\" })\n }\n ```\n\n"
          },
          "noDuplicateVariableNames": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "noDuplicateVariableNames",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-variable-names",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "unique-variable-names"
                }
              }
            ],
            "docs": " Require all variable definitions to be unique.\n\n A GraphQL operation is only valid if all its variables are uniquely named.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n query ($x: Int, $x: Int) {\n   field\n }\n ```\n\n ### Valid\n\n ```graphql\n query ($x: Int, $y: Int) {\n   field\n }\n ```\n\n"
          },
          "noExcessiveLinesPerFile": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "noExcessiveLinesPerFile",
            "link": "https://biomejs.dev/linter/rules/no-excessive-lines-per-file",
            "recommended": false,
            "fixKind": "none",
            "docs": " Restrict the number of lines in a file.\n\n Large files tend to do many things and can make it hard to follow what's going on.\n This rule can help enforce a limit on the number of lines in a file.\n\n ## Examples\n\n ### Invalid\n\n The following example will show a diagnostic when `maxLines` is set to 2:\n\n ```json,options\n {\n     \"options\": {\n        \"maxLines\": 2\n     }\n }\n ```\n ```graphql,expect_diagnostic,use_options\n query Foo { id }\n query Bar { id }\n query Baz { id }\n ```\n\n ### Valid\n\n ```graphql\n query Foo { id }\n query Bar { id }\n ```\n\n ## Options\n\n ### `maxLines`\n\n This option sets the maximum number of lines allowed in a file.\n If the file exceeds this limit, a diagnostic will be reported.\n\n Default: `300`\n\n ### `skipBlankLines`\n\n When this option is set to `true`, blank lines are not counted towards the maximum line limit.\n\n Default: `false`\n\n"
          },
          "noRootType": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "noRootType",
            "link": "https://biomejs.dev/linter/rules/no-root-type",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "no-root-type"
                }
              }
            ],
            "docs": " Disallow the usage of specified root types\n\n Prevent the usage of certain root types (e.g. `mutation` and/or `subscription`)\n\n ## Examples\n\n ### Invalid\n\n ```json,options\n {\n   \"options\": {\n     \"disallow\": [\"mutation\"]\n   }\n }\n ```\n\n ```graphql,expect_diagnostic,use_options\n type Mutation {\n   createUser(input: CreateUserInput!): User!\n }\n ```\n\n ### Valid\n\n ```graphql,use_options\n type Query {\n   users: [User!]!\n }\n ```\n\n ## Options\n\n ### `disallow`\n\n This required option lists all disallowed root types (e.g. `mutation` and/or `subscription`).\n The values of the list are case-insensitive.\n\n Default `[]`\n\n ```json,options\n {\n   \"options\": {\n     \"disallow\": [\"subscription\"]\n   }\n }\n ```\n\n ```graphql,expect_diagnostic,use_options\n type Subscription {\n   user: User\n }\n ```\n\n"
          },
          "useConsistentGraphqlDescriptions": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "useConsistentGraphqlDescriptions",
            "link": "https://biomejs.dev/linter/rules/use-consistent-graphql-descriptions",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "description-style"
                }
              }
            ],
            "docs": " Require all descriptions to follow the same style (either block or inline) to  maintain consistency and improve readability across the schema.\n\n ## Examples\n\n ### style: `block`\n\n #### Invalid\n\n ```graphql,expect_diagnostic\n enum EnumValue {\n   \"this is a description\"\n   DEFAULT\n }\n ```\n\n #### Valid\n\n ```graphql\n enum EnumValue {\n   \"\"\"\n   this is a description\n   \"\"\"\n   DEFAULT\n }\n ```\n\n ## Options\n\n ### `style`\n\n This option will specify the description style.\n - `\"block\"`: Requires triple-quoted block descriptions (`\"\"\"...\"\"\"`)\n - `\"inline\"`: Requires single-quoted inline descriptions (`\"...\"`)\n\n Default `\"block\"`\n\n ```json,options\n {\n   \"options\": {\n     \"style\": \"inline\"\n   }\n }\n ```\n\n ```graphql,expect_diagnostic,use_options\n enum EnumValue {\n   \"\"\"\n   this is a description\n   \"\"\"\n   DEFAULT\n }\n ```\n\n"
          },
          "useInputName": {
            "deprecated": false,
            "version": "2.3.14",
            "name": "useInputName",
            "link": "https://biomejs.dev/linter/rules/use-input-name",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "input-name"
                }
              }
            ],
            "docs": " Require mutation argument to be always called \"input\"\n\n Using the same name for all input parameters will make your schemas easier to consume and more predictable.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n type Mutation {\n   SetMessage(message: InputMessage): String\n }\n ```\n\n ### Valid\n\n ```graphql\n type Mutation {\n   SetMessage(input: SetMessageInput): String\n }\n ```\n\n ## Options\n\n ### `checkInputType`\n\n With the option `checkInputType` on, the input type name requires to be called `<mutation name>Input`.\n This can either be \"loose\" (case-insensitive) or \"strict\" (case-sensitive).\n Using the name of the mutation in the input type name will make it easier to find the mutation that the input type belongs to.\n\n Default `\"off\"`\n\n ```json,options\n {\n   \"options\": {\n     \"checkInputType\": \"loose\"\n   }\n }\n ```\n\n ```graphql,expect_diagnostic,use_options\n type Mutation {\n   SetMessage(input: InputMessage): String\n }\n ```\n\n ```graphql,use_options\n type Mutation {\n   SetMessage(input: setMessageInput): String\n }\n ```\n\n ```graphql,use_options\n type Mutation {\n   SetMessage(input: SetMessageInput): String\n }\n ```\n\n\n ```json,options\n {\n   \"options\": {\n     \"checkInputType\": \"strict\"\n   }\n }\n ```\n\n ```graphql,expect_diagnostic,use_options\n type Mutation {\n   SetMessage(input: InputMessage): String\n }\n ```\n\n ```graphql,expect_diagnostic,use_options\n type Mutation {\n   SetMessage(input: setMessageInput): String\n }\n ```\n\n ```graphql,use_options\n type Mutation {\n   SetMessage(input: SetMessageInput): String\n }\n ```\n\n"
          },
          "useLoneAnonymousOperation": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "useLoneAnonymousOperation",
            "link": "https://biomejs.dev/linter/rules/use-lone-anonymous-operation",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "lone-anonymous-operation"
                }
              }
            ],
            "docs": " Disallow anonymous operations when more than one operation specified in document.\n\n A GraphQL document that contains an anonymous operation (the query short-hand) is only valid if it contains only that one operation definition.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n query {\n   fieldA\n }\n\n query B {\n   fieldB\n }\n ```\n\n ### Valid\n\n ```graphql\n query A {\n   fieldA\n }\n\n query B {\n   fieldB\n }\n ```\n\n"
          },
          "useLoneExecutableDefinition": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "useLoneExecutableDefinition",
            "link": "https://biomejs.dev/linter/rules/use-lone-executable-definition",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "lone-executable-definition"
                }
              }
            ],
            "docs": " Require queries, mutations, subscriptions or fragments each to be located in separate files.\n\n This rule ensures that each GraphQL document only contains a single operation (query, mutation, or subscription) or fragment definition.\n Having multiple executable definitions in a single file can make code harder to maintain, test, and understand.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n query Foo {\n   id\n }\n\n fragment Bar on Baz {\n   id\n }\n ```\n\n ```graphql,expect_diagnostic\n query Foo {\n   id\n }\n\n mutation ($name: String!) {\n   createUser {\n     id\n   }\n }\n ```\n\n ```graphql,expect_diagnostic\n query Foo {\n   id\n }\n\n query Bar {\n   id\n }\n ```\n\n ### Valid\n\n ```graphql\n query Foo {\n   id\n }\n ```\n\n ```graphql\n fragment Bar on Baz {\n   id\n }\n ```\n\n"
          }
        },
        "style": {
          "useDeprecatedReason": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "useDeprecatedReason",
            "link": "https://biomejs.dev/linter/rules/use-deprecated-reason",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "require-deprecation-reason"
                }
              }
            ],
            "docs": " Require specifying the reason argument when using `@deprecated` directive\n\n This rule checks the parameter of `@deprecated` directive for the use of reason argument,\n suggesting user to add it in case the argument is missing.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n query {\n   member @deprecated\n }\n ```\n\n ### Valid\n\n ```graphql\n query {\n   member @deprecated(reason: \"Why?\")\n }\n ```\n"
          },
          "useGraphqlNamingConvention": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useGraphqlNamingConvention",
            "link": "https://biomejs.dev/linter/rules/use-graphql-naming-convention",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "graphqlSchemaLinter": "enum-values-all-caps"
                }
              }
            ],
            "docs": " Validates that all enum values are capitalized.\n\n By convention in GraphQL, enum values are all caps.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n enum MyEnum {\n  value\n }\n ```\n\n ### Valid\n\n ```graphql\n enum MyEnum {\n  VALUE\n }\n ```\n\n"
          }
        },
        "suspicious": {
          "noDuplicateFields": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noDuplicateFields",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-fields",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "no-duplicate-fields"
                }
              }
            ],
            "docs": " No duplicated fields in GraphQL operations.\n\n Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n query {\n   users {\n     id\n     name\n     email\n     name\n   }\n }\n ```\n\n ```graphql,expect_diagnostic\n query {\n   users(\n     first: 100,\n     after: 10,\n     filter: \"test\",\n     first: 50\n   ) {\n     id\n   }\n }\n ```\n\n ```graphql,expect_diagnostic\n query ($v: String, $t: String, $v: String) {\n   id\n }\n ```\n\n ### Valid\n\n ```graphql\n query {\n   users {\n     id\n     name\n     email\n   }\n }\n ```\n\n"
          },
          "noEmptySource": {
            "deprecated": false,
            "version": "2.2.7",
            "name": "noEmptySource",
            "link": "https://biomejs.dev/linter/rules/no-empty-source",
            "recommended": false,
            "fixKind": "none",
            "docs": " Disallow empty sources.\n\n A source containing only the following is considered empty:\n   - Whitespace (spaces, tabs or newlines)\n   - Comments\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n\n ```\n\n ```graphql,ignore\n # Invalid comment\n ```\n\n ### Valid\n\n ```graphql\n query Member {}\n ```\n\n ```graphql\n fragment StrippedMember on Member {}\n ```\n\n ## Options\n\n ### `allowComments`\n\n Whether the comments should be marked as meaningful.\n When this option has been set to `true`, a file with only comments is considered valid.\n\n Default `false`\n\n\n ```json,options\n {\n   \"options\": {\n     \"allowComments\": true\n   }\n }\n ```\n\n #### Invalid\n\n ```graphql,expect_diagnostic,use_options\n\n ```\n\n #### Valid\n\n ```graphql,ignore\n # Valid comment\n ```\n\n"
          },
          "useDeprecatedDate": {
            "deprecated": false,
            "version": "2.2.6",
            "name": "useDeprecatedDate",
            "link": "https://biomejs.dev/linter/rules/use-deprecated-date",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintGraphql": "require-deprecation-date"
                }
              }
            ],
            "docs": " Require the `@deprecated` directive to specify a deletion date.\n\n Suggests removing deprecated code when the due date has been passed.\n\n ## Examples\n\n ### Invalid\n\n ```graphql,expect_diagnostic\n query {\n   member @deprecated(reason: \"Use `members` instead\") {\n     id\n   }\n }\n ```\n\n ### Valid\n\n ```graphql\n query {\n   member @deprecated(reason: \"Use `members` instead\", deletionDate: \"2099-12-25\") {\n     id\n   }\n }\n ```\n\n"
          }
        }
      },
      "html": {
        "a11y": {
          "noAccessKey": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "noAccessKey",
            "link": "https://biomejs.dev/linter/rules/no-access-key",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-access-key"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "htmlEslint": "no-accesskey-attrs"
                }
              }
            ],
            "docs": " Enforce that the `accesskey` attribute is not used on any HTML element.\n\n The `accesskey` assigns a keyboard shortcut to the current element. However, the `accesskey` value\n can conflict with keyboard commands used by screen readers and keyboard-only users, which leads to\n inconsistent keyboard actions across applications. To avoid accessibility complications,\n this rule suggests users remove the `accesskey` attribute on elements.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <input type=\"submit\" accesskey=\"s\" value=\"Submit\" />\n ```\n\n ```html,expect_diagnostic\n <a href=\"https://webaim.org/\" accesskey=\"w\">WebAIM.org</a>\n ```\n\n ```html,expect_diagnostic\n <button accesskey=\"n\">Next</button>\n ```\n\n ## Resources\n\n - [WebAIM: Keyboard Accessibility - Accesskey](https://webaim.org/techniques/keyboard/accesskey#spec)\n - [MDN `accesskey` documentation](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/accesskey)\n\n"
          },
          "noAutofocus": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "noAutofocus",
            "link": "https://biomejs.dev/linter/rules/no-autofocus",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-autofocus"
                }
              }
            ],
            "docs": " Enforce that the `autofocus` attribute is not used on elements.\n\n Autofocusing elements can cause usability issues for sighted and non-sighted users, alike.\n However, the `autofocus` attribute is allowed on elements inside a `dialog` element or\n elements with a `popover` attribute, as these are modal contexts where autofocus is expected.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <input autofocus />\n ```\n\n ```html,expect_diagnostic\n <input autofocus=\"true\" />\n ```\n\n ```html,expect_diagnostic\n <textarea autofocus>content</textarea>\n ```\n\n ### Valid\n\n ```html\n <input />\n ```\n\n ```html\n <div popover><input autofocus /></div>\n ```\n\n ```html\n <dialog><input autofocus /></dialog>\n ```\n\n ## Resources\n\n - [WHATWG HTML Standard, The autofocus attribute](https://html.spec.whatwg.org/multipage/interaction.html#attr-fe-autofocus)\n - [The accessibility of HTML 5 autofocus](https://brucelawson.co.uk/2009/the-accessibility-of-html-5-autofocus/)\n - [MDN Web Docs, HTMLElement: autofocus property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/autofocus)\n\n"
          },
          "noDistractingElements": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "noDistractingElements",
            "link": "https://biomejs.dev/linter/rules/no-distracting-elements",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-distracting-elements"
                }
              }
            ],
            "docs": " Enforces that no distracting elements are used.\n\n Elements that can be visually distracting can cause accessibility issues with visually impaired users.\n Such elements are most likely deprecated, and should be avoided.\n By default, the following elements are visually distracting: `<marquee>` and `<blink>`.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <marquee />\n ```\n\n ```html,expect_diagnostic\n <blink />\n ```\n\n ### Valid\n\n ```html\n <div />\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.2.2](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide)\n\n"
          },
          "noHeaderScope": {
            "deprecated": false,
            "version": "2.3.0",
            "name": "noHeaderScope",
            "link": "https://biomejs.dev/linter/rules/no-header-scope",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "scope"
                }
              }
            ],
            "docs": " The scope prop should be used only on `<th>` elements.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <div scope=\"col\"></div>\n ```\n\n ```html,expect_diagnostic\n <div scope></div>\n ```\n\n ### Valid\n\n ```html\n <th scope=\"col\"></th>\n ```\n\n ```html\n <th scope></th>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 1.3.1](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships)\n - [WCAG 4.1.1](https://www.w3.org/WAI/WCAG21/Understanding/parsing)\n\n"
          },
          "noPositiveTabindex": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "noPositiveTabindex",
            "link": "https://biomejs.dev/linter/rules/no-positive-tabindex",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "tabindex-no-positive"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "htmlEslint": "no-positive-tabindex"
                }
              }
            ],
            "docs": " Prevent the usage of positive integers on `tabindex` attribute.\n\n Avoid positive `tabindex` attribute values to synchronize the flow of the page with keyboard tab order.\n\n ## Accessibility guidelines\n\n [WCAG 2.4.3](https://www.w3.org/WAI/WCAG21/Understanding/focus-order)\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <div tabindex=\"1\"></div>\n ```\n\n ```html,expect_diagnostic\n <div tabindex=\"5\"></div>\n ```\n\n ### Valid\n\n ```html\n <div tabindex=\"0\"></div>\n ```\n\n ```html\n <div tabindex=\"-1\"></div>\n ```\n\n"
          },
          "noRedundantAlt": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "noRedundantAlt",
            "link": "https://biomejs.dev/linter/rules/no-redundant-alt",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "img-redundant-alt"
                }
              }
            ],
            "docs": " Enforce `img` alt prop does not contain the word \"image\", \"picture\", or \"photo\".\n\n The rule will first check if `aria-hidden` is truthy to determine whether to enforce the rule. If the image is\n hidden, then the rule will always succeed.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <img src=\"src\" alt=\"photo content\" />;\n ```\n\n ```html,expect_diagnostic\n <img alt=\"picture of cool person\" aria-hidden=\"false\" />;\n ```\n\n ### Valid\n\n ```html\n <div>\n \t<img src=\"src\" alt=\"alt\" />\n \t<img src=\"bar\" aria-hidden alt=\"Picture of me taking a photo of an image\" />\n </div>\n ```\n\n"
          },
          "noSvgWithoutTitle": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "noSvgWithoutTitle",
            "link": "https://biomejs.dev/linter/rules/no-svg-without-title",
            "recommended": true,
            "fixKind": "none",
            "docs": " Enforces the usage of the `title` element for the `svg` element.\n\n It is not possible to specify the `alt` attribute for the `svg` as for the `img`.\n To make svg accessible, the following methods are available:\n - provide the `title` element as the first child to `svg`\n - provide `role=\"img\"` and `aria-label` or `aria-labelledby` to `svg`\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <svg>foo</svg>\n ```\n\n ```html,expect_diagnostic\n <svg>\n     <title></title>\n     <circle />\n </svg>\n ```\n\n ```html,expect_diagnostic\n <svg role=\"img\" title=\"title\">\n     <span id=\"\">foo</span>\n </svg>\n ```\n\n ```html,expect_diagnostic\n <svg role=\"img\" aria-labelledby=\"title\">\n     <span id=\"title2\">foo</span>\n </svg>\n ```\n\n ```html,expect_diagnostic\n <svg>\n     <rect />\n     <rect />\n     <g>\n         <title>foo</title>\n         <circle />\n         <circle />\n     </g>\n </svg>\n ```\n\n ```html,expect_diagnostic\n <svg role=\"graphics-symbol\"><rect /></svg>\n ```\n\n ### Valid\n\n ```html\n <svg>\n     <title>Pass</title>\n     <circle />\n </svg>\n ```\n\n ```html\n <svg role=\"img\" aria-labelledby=\"title\">\n     <span id=\"title\">Pass</span>\n </svg>\n ```\n\n ```html\n <svg role=\"img\" aria-label=\"title\">\n     <span id=\"title\">Pass</span>\n </svg>\n ```\n\n ```html\n <svg role=\"img\" aria-label=\"\">\n     <span id=\"\">Pass</span>\n </svg>\n ```\n\n ```html\n <svg role=\"graphics-symbol\">\n     <title>Pass</title>\n     <rect />\n </svg>\n ```\n\n ```html\n <svg aria-hidden=\"true\"><rect /></svg>\n ```\n\n ```html\n <svg role=\"presentation\">foo</svg>\n ```\n\n\n ## Accessibility guidelines\n [Document Structure – SVG 1.1 (Second Edition)](https://www.w3.org/TR/SVG11/struct.html#DescriptionAndTitleElements)\n [ARIA: img role - Accessibility | MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role)\n [Accessible SVGs | CSS-Tricks - CSS-Tricks](https://css-tricks.com/accessible-svgs/)\n [Contextually Marking up accessible images and SVGs | scottohara.me](https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html)\n [Accessible SVGs](https://www.unimelb.edu.au/accessibility/techniques/accessible-svgs)\n\n"
          },
          "useAltText": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "useAltText",
            "link": "https://biomejs.dev/linter/rules/use-alt-text",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "alt-text"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "htmlEslint": "require-img-alt"
                }
              }
            ],
            "docs": " Enforce that all elements that require alternative text have meaningful information to relay back to the end user.\n\n This is a critical component of accessibility for screen reader users in order for them\n to understand the content's purpose on the page.\n By default, this rule checks for alternative text on the following elements:\n `<img>`, `<area>`, `<input type=\"image\">`, and `<object>`.\n\n :::note\n In `.html` files, this rule matches element names case-insensitively (e.g., `<IMG>`, `<Img>`).\n\n In component-based frameworks (Vue, Svelte, Astro), only lowercase element names are checked.\n PascalCase variants like `<Img>` are assumed to be custom components and are ignored.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <img src=\"image.png\" />\n ```\n\n ```html,expect_diagnostic\n <input type=\"image\" src=\"image.png\" />\n ```\n\n ```html,expect_diagnostic\n <area href=\"foo\" />\n ```\n\n ```html,expect_diagnostic\n <object data=\"foo\"></object>\n ```\n\n ### Valid\n\n ```html\n <img src=\"image.png\" alt=\"A beautiful landscape\" />\n ```\n\n ```html\n <input type=\"image\" src=\"image.png\" alt=\"Submit\" />\n ```\n\n ```html\n <img src=\"image.png\" aria-label=\"A beautiful landscape\" />\n ```\n\n ```html\n <img src=\"image.png\" aria-labelledby=\"image-description\" />\n ```\n\n ```html\n <object data=\"foo\" title=\"Embedded content\"></object>\n ```\n\n ```html\n <!-- Decorative images can be hidden from assistive technologies -->\n <img src=\"decorative.png\" alt=\"\" />\n ```\n\n ```html\n <img src=\"decorative.png\" aria-hidden=\"true\" />\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 1.1.1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)\n\n"
          },
          "useAnchorContent": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "useAnchorContent",
            "link": "https://biomejs.dev/linter/rules/use-anchor-content",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "anchor-has-content"
                }
              }
            ],
            "docs": " Enforce that anchors have content and that the content is accessible to screen readers.\n\n Accessible means the content is not hidden using the `aria-hidden` attribute.\n Anchor tags should have text content that describes the link destination for screen reader users.\n Alternatively, the anchor can have an accessible name via the `aria-label` or `title` attribute.\n\n :::note\n In `.html` files, this rule matches element names case-insensitively (e.g., `<A>`, `<a>`).\n\n In component-based frameworks (Vue, Svelte, Astro), only lowercase element names are checked.\n PascalCase variants like `<A>` are assumed to be custom components and are ignored.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <a></a>\n ```\n\n ```html,expect_diagnostic\n <a>   </a>\n ```\n\n ```html,expect_diagnostic\n <a aria-hidden=\"true\">content</a>\n ```\n\n ```html,expect_diagnostic\n <a><span aria-hidden=\"true\">content</span></a>\n ```\n\n ### Valid\n\n ```html\n <a>content</a>\n ```\n\n ```html\n <a><span>content</span></a>\n ```\n\n ```html\n <a><span aria-hidden=\"true\"></span>content</a>\n ```\n\n ```html\n <a aria-label=\"Navigate to home\"></a>\n ```\n\n ```html\n <a title=\"Home page\"></a>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.4.4](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context)\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n"
          },
          "useAriaPropsForRole": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "useAriaPropsForRole",
            "link": "https://biomejs.dev/linter/rules/use-aria-props-for-role",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "role-has-required-aria-props"
                }
              }
            ],
            "docs": " Enforce that elements with ARIA roles must have all required ARIA attributes for that role.\n\n Remember that this rule only supports static values for the `role` attribute.\n Dynamic `role` values are not checked.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <span role=\"checkbox\"></span>\n ```\n\n ```html,expect_diagnostic\n <span role=\"heading\"></span>\n ```\n\n ### Valid\n\n ```html\n <span role=\"checkbox\" aria-checked=\"true\"></span>\n ```\n\n ```html\n <span role=\"heading\" aria-level=\"1\"></span>\n ```\n\n\n ## Accessibility guidelines\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n ### Resources\n - [ARIA Spec, Roles](https://www.w3.org/TR/wai-aria/#roles)\n - [Chrome Audit Rules, AX_ARIA_03](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_03)\n\n"
          },
          "useButtonType": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "useButtonType",
            "link": "https://biomejs.dev/linter/rules/use-button-type",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "button-has-type"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "htmlEslint": "require-button-type"
                }
              }
            ],
            "docs": " Enforces the usage and validity of the attribute `type` for the element `button`\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <button>Do something</button>\n ```\n\n ```html,expect_diagnostic\n <button type=\"incorrectType\">Do something</button>\n ```\n\n ### Valid\n\n ```html\n <button type=\"button\">Do something</button>\n ```\n\n"
          },
          "useHtmlLang": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "useHtmlLang",
            "link": "https://biomejs.dev/linter/rules/use-html-lang",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "html-has-lang"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "htmlEslint": "require-lang"
                }
              }
            ],
            "docs": " Enforce that `html` element has `lang` attribute.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <html></html>\n ```\n\n ```html,expect_diagnostic\n <html lang=\"\"></html>\n ```\n\n ### Valid\n\n ```html\n <html lang=\"en\"></html>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 3.1.1](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page)\n\n"
          },
          "useIframeTitle": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "useIframeTitle",
            "link": "https://biomejs.dev/linter/rules/use-iframe-title",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "iframe-has-title"
                }
              }
            ],
            "docs": " Enforces the usage of the attribute `title` for the element `iframe`.\n\n :::note\n In `.html` files, this rule matches `iframe` elements case-insensitively (e.g., `<IFRAME>`, `<IFrame>`).\n\n In component-based frameworks (Vue, Svelte, Astro), only lowercase `<iframe>` is checked. PascalCase variants like `<Iframe>` are assumed to be custom components and are ignored.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <iframe></iframe>\n ```\n\n ```html,expect_diagnostic\n <iframe title=\"\"></iframe>\n ```\n\n ### Valid\n\n ```html\n <iframe title=\"title\"></iframe>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.4.1](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks)\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n"
          },
          "useMediaCaption": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "useMediaCaption",
            "link": "https://biomejs.dev/linter/rules/use-media-caption",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "media-has-caption"
                }
              }
            ],
            "docs": " Enforces that `audio` and `video` elements must have a `track` for captions.\n\n Captions support users with hearing-impairments. They should be a transcription\n or translation of the dialogue, sound effects, musical cues, and other relevant\n audio information.\n\n :::note\n In `.html` files, this rule matches element names case-insensitively (e.g., `<VIDEO>`, `<video>`).\n\n In component-based frameworks (Vue, Svelte, Astro), only lowercase element names are checked.\n PascalCase variants like `<Video>` are assumed to be custom components and are ignored.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <video src=\"video.mp4\"></video>\n ```\n\n ```html,expect_diagnostic\n <audio src=\"audio.mp3\">\n     <source src=\"audio.ogg\" type=\"audio/ogg\" />\n </audio>\n ```\n\n ### Valid\n\n ```html\n <video src=\"video.mp4\">\n     <track kind=\"captions\" src=\"captions.vtt\" />\n </video>\n ```\n\n ```html\n <audio src=\"audio.mp3\">\n     <track kind=\"captions\" src=\"captions.vtt\" />\n </audio>\n ```\n\n ```html\n <video muted src=\"video.mp4\"></video>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 1.2.2](https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded)\n - [WCAG 1.2.3](https://www.w3.org/WAI/WCAG21/Understanding/audio-description-or-media-alternative-prerecorded)\n\n"
          },
          "useValidAriaRole": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "useValidAriaRole",
            "link": "https://biomejs.dev/linter/rules/use-valid-aria-role",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "aria-role"
                }
              }
            ],
            "docs": " Elements with ARIA roles must use a valid, non-abstract ARIA role.\n\n Remember that this rule only supports static values for the `role` attribute.\n Dynamic `role` values are not checked.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <div role=\"datepicker\"></div>\n ```\n\n ```html,expect_diagnostic\n <div role=\"range\"></div>\n ```\n\n ```html,expect_diagnostic\n <div role=\"\"></div>\n ```\n\n\n ### Valid\n\n ```html\n <div role=\"button\"></div>\n <div></div>\n ```\n\n ## Options\n\n\n ### `allowInvalidRoles`\n\n It allows specifying a list of roles that might be invalid otherwise\n\n ```json,options\n {\n     \"options\": {\n         \"allowInvalidRoles\": [\"datepicker\"]\n     }\n }\n ```\n\n ```html,use_options\n <div role=\"datepicker\"></div>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n ## Resources\n\n - [Chrome Audit Rules, AX_ARIA_01](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_01)\n - [DPUB-ARIA roles](https://www.w3.org/TR/dpub-aria-1.0/)\n - [MDN: Using ARIA: Roles, states, and properties](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques)\n\n"
          },
          "useValidLang": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "useValidLang",
            "link": "https://biomejs.dev/linter/rules/use-valid-lang",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "lang"
                }
              }
            ],
            "docs": " Ensure that the attribute passed to the `lang` attribute is a correct ISO language and/or country.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <html lang=\"lorem\" />\n ```\n\n ```html,expect_diagnostic\n <html lang=\"en-babab\" />\n ```\n\n ```html,expect_diagnostic\n <html lang=\"en-GB-typo\" />\n ```\n\n ### Valid\n\n ```html\n <html lang=\"en-GB\" />\n ```\n"
          }
        },
        "nursery": {
          "noAmbiguousAnchorText": {
            "deprecated": false,
            "version": "2.3.10",
            "name": "noAmbiguousAnchorText",
            "link": "https://biomejs.dev/linter/rules/no-ambiguous-anchor-text",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "anchor-ambiguous-text"
                }
              }
            ],
            "docs": " Disallow ambiguous anchor descriptions.\n\n Enforces `<a>` values are not exact matches for the phrases \"click here\", \"here\", \"link\", \"a link\", or \"learn more\".\n Screen readers announce tags as links/interactive, but rely on values for context.\n Ambiguous anchor descriptions do not provide sufficient context for users.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <a>learn more</a>\n ```\n\n ### Valid\n\n ```html\n <a>documentation</a>\n ```\n\n ## Options\n\n ### `words`\n\n The words option allows users to modify the strings that can be checked for in the anchor text. Useful for specifying other words in other languages.\n\n Default `[\"click here\", \"here\", \"link\", \"a link\", \"learn more\"]`\n\n ```json,options\n {\n   \"options\": {\n     \"words\": [\"click this\"]\n   }\n }\n ```\n\n #### Invalid\n\n ```html,expect_diagnostic,use_options\n <a>click this</a>\n ```\n\n"
          },
          "noDuplicateAttributes": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "noDuplicateAttributes",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-attributes",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "htmlEslint": "no-duplicate-attrs"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "no-duplicate-attributes"
                }
              }
            ],
            "docs": " Disallow duplication of attributes.\n\n According to the HTML specification, each attribute name must be unique within a single element.\n Duplicate attributes are invalid and can lead to unexpected behavior in browsers.\n\n ## Vue templates\n\n For Vue templates (`.vue` files), this rule also considers the following directives as\n aliases of their arguments:\n\n - `v-bind:foo` and `:foo` are handled as the attribute `foo`.\n\n Vue class/style bindings are ignored. For example, `class` and `:class` may co-exist.\n\n Event handlers are ignored. For example, `@click` and `v-on:click` are not considered\n attributes by this rule.\n\n Dynamic arguments such as `:[foo]` or `v-bind:[foo]` are ignored.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <div foo=\"a\" foo=\"b\"></div>\n ```\n\n ```vue,expect_diagnostic\n <template>\n   <div foo :foo=\"bar\" />\n </template>\n ```\n\n ### Valid\n\n ```html\n <div foo=\"a\" bar=\"b\"></div>\n ```\n\n"
          },
          "noScriptUrl": {
            "deprecated": false,
            "version": "2.3.9",
            "name": "noScriptUrl",
            "link": "https://biomejs.dev/linter/rules/no-script-url",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-script-url"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "jsx-no-script-url"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintQwik": "jsx-no-script-url"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintSolid": "jsx-no-script-url"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactXyz": "dom-no-script-url"
                }
              }
            ],
            "docs": " Disallow `javascript:` URLs in HTML.\n\n Using `javascript:` URLs is considered a form of `eval` and can be a security risk.\n These URLs can execute arbitrary JavaScript code, which can lead to cross-site scripting (XSS) vulnerabilities.\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <a href=\"javascript:void(0)\">Click me</a>\n ```\n\n ```html,expect_diagnostic\n <a href=\"javascript:alert('XSS')\">Click me</a>\n ```\n\n ### Valid\n\n ```html\n <a href=\"https://example.com\">Click me</a>\n <a href=\"/path/to/page\">Click me</a>\n <a href=\"#section\">Click me</a>\n <span href=\"javascript:void(0)\">Not a real href</span>\n ```\n\n"
          },
          "noSyncScripts": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "noSyncScripts",
            "link": "https://biomejs.dev/linter/rules/no-sync-scripts",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "no-sync-scripts"
                }
              }
            ],
            "docs": " Prevent the usage of synchronous scripts.\n\n A synchronous script can impact your webpage performance, read more on how to [Efficiently load third-party JavaScript](https://web.dev/articles/efficiently-load-third-party-javascript).\n\n ## Examples\n\n ### Invalid\n\n ```html,expect_diagnostic\n <script src=\"\"></script>\n ```\n\n ### Valid\n\n ```html\n <script src=\"\" async></script>\n <script src=\"\" defer></script>\n <script src=\"\" type=\"module\"></script>\n ```\n\n"
          },
          "noVueVIfWithVFor": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "noVueVIfWithVFor",
            "link": "https://biomejs.dev/linter/rules/no-vue-v-if-with-v-for",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "no-use-v-if-with-v-for"
                }
              }
            ],
            "docs": " Disallow using `v-if` and `v-for` directives on the same element.\n\n There are two common cases where this can be tempting:\n - To filter items in a list (e.g. `v-for=\"user in users\" v-if=\"user.isActive\"`). In these cases, replace users with a new computed property that returns your filtered list (e.g. activeUsers).\n - To avoid rendering a list if it should be hidden (e.g. `v-for=\"user in users\" v-if=\"shouldShowUsers\"`). In these cases, move the v-if to a container element.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <TodoItem\n     v-if=\"complete\"\n     v-for=\"todo in todos\"\n     :todo=\"todo\"\n />\n ```\n\n ### Valid\n\n ```vue\n <ul v-if=\"complete\">\n     <TodoItem\n         v-for=\"todo in todos\"\n         :todo=\"todo\"\n     />\n </ul>\n ```\n\n"
          },
          "useScopedStyles": {
            "deprecated": false,
            "version": "next",
            "name": "useScopedStyles",
            "link": "https://biomejs.dev/linter/rules/use-scoped-styles",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintVueJs": "enforce-style-attribute"
                }
              }
            ],
            "docs": " Enforce that `<style>` blocks in Vue SFCs have the `scoped` attribute and that `<style>` blocks in Astro components do not have the `is:global` directive.\n\n Vue's `scoped` attribute automatically scopes CSS to the component,\n preventing style leakage and conflicts. Astro's `is:global` attribute\n allows for global styles, but without it, styles are scoped to the component by default.\n\n Style blocks with the `module` attribute are exempt, as CSS Modules\n is an alternative scoping mechanism.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <style>\n .foo { color: red; }\n </style>\n ```\n\n ```astro,expect_diagnostic\n <style is:global>\n .foo { color: red; }\n </style>\n ```\n\n ### Valid\n\n ```vue\n <style scoped>\n .foo { color: red; }\n </style>\n ```\n\n ```vue\n <style module>\n .foo { color: red; }\n </style>\n ```\n\n ## References:\n\n - [Vue Documentation](https://vuejs.org/api/sfc-css-features.html#scoped-css)\n - [Astro Documentation](https://docs.astro.build/en/guides/styling/#global-styles)\n"
          },
          "useVueConsistentVBindStyle": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "useVueConsistentVBindStyle",
            "link": "https://biomejs.dev/linter/rules/use-vue-consistent-v-bind-style",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "v-bind-style"
                }
              }
            ],
            "docs": " Enforce a consistent style for `v-bind` in Vue templates.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <div v-bind:foo=\"bar\" />\n ```\n\n ### Valid\n\n ```vue\n <div :foo=\"bar\" />\n ```\n\n ## Options\n\n ### `style`\n\n Configures the preferred directive style. Default: `\"shorthand\"`.\n\n ```json,options\n {\n   \"options\": {\n     \"style\": \"longhand\"\n   }\n }\n ```\n\n #### Invalid\n\n ```vue,expect_diagnostic,use_options\n <div :foo=\"bar\" />\n ```\n\n #### Valid\n\n ```vue,use_options\n <div v-bind:foo=\"bar\" />\n ```\n\n"
          },
          "useVueConsistentVOnStyle": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "useVueConsistentVOnStyle",
            "link": "https://biomejs.dev/linter/rules/use-vue-consistent-v-on-style",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "v-on-style"
                }
              }
            ],
            "docs": " Enforce a consistent style for `v-on` in Vue templates.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <div v-on:click=\"onClick\" />\n ```\n\n ### Valid\n\n ```vue\n <div @click=\"onClick\" />\n ```\n\n ## Options\n\n ### `style`\n\n Configures the preferred directive style. Accepts `\"shorthand\"` or `\"longhand\"`. Default: `\"shorthand\"`.\n\n ```json,options\n {\n   \"options\": {\n     \"style\": \"longhand\"\n   }\n }\n ```\n\n #### Invalid\n\n ```vue,expect_diagnostic,use_options\n <div @click=\"onClick\" />\n ```\n\n #### Valid\n\n ```vue,use_options\n <div v-on:click=\"onClick\" />\n ```\n\n"
          },
          "useVueHyphenatedAttributes": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "useVueHyphenatedAttributes",
            "link": "https://biomejs.dev/linter/rules/use-vue-hyphenated-attributes",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "attribute-hyphenation"
                }
              }
            ],
            "docs": " Enforce hyphenated (kebab-case) attribute names in Vue templates.\n\n Vue style guide recommends using hyphenated attribute (and prop) names in templates to\n keep them consistent and distinguish them from JavaScript identifiers written in camelCase/PascalCase.\n\n This rule flags attributes that are detected as camelCase, PascalCase, CONSTANT_CASE, snake_case\n or that contain any uppercase ASCII letter. It uses Biome's internal `Case::identify` helper.\n\n Allowed:\n - kebab-case attributes (e.g. `data-test-id`)\n - pure lowercase single word attributes (e.g. `class`, `id`)\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <div fooBar=\"x\"></div>\n ```\n\n ```vue,expect_diagnostic\n <MyComp :someProp=\"x\" />\n ```\n\n ### Valid\n\n ```vue\n <div data-test-id=\"x\"></div>\n <div class=\"foo\"></div>\n <MyComp :some-prop=\"x\" />\n ```\n\n ## Options\n\n The rule supports the following options:\n\n ### `ignore`\n\n A list of attribute names that should be ignored by the rule (they won't be required to be hyphenated).\n Use this when you have a fixed set of camelCase / PascalCase prop names you intentionally allow.\n\n ```json,options\n {\n   \"options\": {\n     \"ignore\": [\"someProp\", \"fooBar\"]\n   }\n }\n ```\n\n #### Valid (using `ignore`)\n\n ```vue,use_options\n <div fooBar=\"x\"></div>\n ```\n\n ### `ignoreTags`\n\n A list of tag names whose attributes should be skipped entirely.\n This is useful for third-party or internal components that deliberately expose non‑hyphenated prop names.\n\n ```json,options\n {\n   \"options\": {\n     \"ignoreTags\": [\"MyComp\", \"AnotherWidget\"]\n   }\n }\n ```\n\n #### Valid (using `ignoreTags`)\n\n ```vue,use_options\n <MyComp :someProp=\"x\" />\n ```\n\n"
          },
          "useVueVForKey": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "useVueVForKey",
            "link": "https://biomejs.dev/linter/rules/use-vue-v-for-key",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "require-v-for-key"
                }
              }
            ],
            "docs": " Enforce that elements using `v-for` also specify a unique `key`.\n\n When rendering lists with `v-for`, Vue relies on a `key` to track elements efficiently.\n The `key` can be provided via longhand `v-bind:key` or shorthand `:key`. If you need to\n animate the entrance/exit of an item in a list, the key should be a unique identifier for\n each item in the list, and not the index of the item.\n\n For more information, see the Vue documentation on [list rendering](https://vuejs.org/guide/essentials/list#maintaining-state-with-key).\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <li v-for=\"item in items\">{{ item }}</li>\n ```\n\n ### Valid\n\n ```vue\n <li v-for=\"item in items\" :key=\"item.id\">{{ item }}</li>\n ```\n\n ```vue\n <li v-for=\"item in items\" v-bind:key=\"item.id\">{{ item }}</li>\n ```\n\n"
          },
          "useVueValidTemplateRoot": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "useVueValidTemplateRoot",
            "link": "https://biomejs.dev/linter/rules/use-vue-valid-template-root",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "valid-template-root"
                }
              }
            ],
            "docs": " Enforce valid Vue `<template>` root usage.\n\n This rule reports only root-level `<template>` elements. If the\n `<template>` has a `src` attribute, the element must be empty. Otherwise,\n the element must contain content.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <template src=\"./foo.html\">content</template>\n ```\n\n ```vue,expect_diagnostic\n <template></template>\n ```\n\n ### Valid\n\n ```vue\n <template>content</template>\n ```\n\n ```vue\n <template src=\"./foo.html\"></template>\n ```\n\n"
          },
          "useVueValidVBind": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "useVueValidVBind",
            "link": "https://biomejs.dev/linter/rules/use-vue-valid-v-bind",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "valid-v-bind"
                }
              }
            ],
            "docs": " Forbids `v-bind` directives with missing arguments or invalid modifiers.\n\n This rule reports v-bind directives in the following cases:\n - The directive does not have an argument. E.g. `<div v-bind></div>`\n - The directive does not have a value. E.g. `<div v-bind:aaa></div>`\n - The directive has invalid modifiers. E.g. `<div v-bind:aaa.bbb=\"ccc\"></div>`\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <Foo v-bind />\n ```\n\n ```vue,expect_diagnostic\n <div v-bind></div>\n ```\n\n ### Valid\n\n ```vue\n <Foo v-bind:foo=\"foo\" />\n ```\n\n"
          },
          "useVueValidVCloak": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "useVueValidVCloak",
            "link": "https://biomejs.dev/linter/rules/use-vue-valid-v-cloak",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "valid-v-cloak"
                }
              }
            ],
            "docs": " Enforce valid `v-cloak` Vue directives.\n\n This rule reports `v-cloak` directives in the following cases:\n - The directive has an argument. E.g. `<div v-cloak:aaa></div>`\n - The directive has any modifiers. E.g. `<div v-cloak.bbb></div>`\n - The directive has an attribute value. E.g. `<div v-cloak=\"foo\"></div>`\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <div v-cloak:arg></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-cloak.mod></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-cloak=\"value\"></div>\n ```\n\n ### Valid\n\n ```vue\n <div v-cloak></div>\n ```\n\n"
          },
          "useVueValidVElse": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "useVueValidVElse",
            "link": "https://biomejs.dev/linter/rules/use-vue-valid-v-else",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "valid-v-else"
                }
              }
            ],
            "docs": " Enforce valid usage of v-else.\n\n This rule reports v-else directives in the following cases:\n - The directive has an argument. E.g. `<div v-if=\"foo\"></div><div v-else:aaa></div>`\n - The directive has a modifier. E.g. `<div v-if=\"foo\"></div><div v-else.bbb></div>`\n - The directive has an attribute value. E.g. `<div v-if=\"foo\"></div><div v-else=\"bar\"></div>`\n - The directive is on elements where the previous element doesn't have `v-if`/`v-else-if` directives. E.g. `<div v-else></div>`\n - The directive is on elements which have `v-if`/`v-else-if` directives. E.g. `<div v-if=\"foo\" v-else></div>`\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <div v-else:arg></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-else.mod></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-else=\"value\"></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-else></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-if=\"foo\" v-else></div>\n ```\n\n ### Valid\n\n ```vue\n <div v-if=\"foo\"></div>\n <div v-else></div>\n ```\n\n ```vue\n <div v-if=\"foo\"></div>\n <div v-else-if=\"bar\"></div>\n <div v-else></div>\n ```\n\n"
          },
          "useVueValidVElseIf": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "useVueValidVElseIf",
            "link": "https://biomejs.dev/linter/rules/use-vue-valid-v-else-if",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "valid-v-else-if"
                }
              }
            ],
            "docs": " Enforce valid `v-else-if` directives.\n\n Biome flags these cases:\n - Has an argument: `<div v-else-if:arg=\"b\"></div>`.\n - Has modifiers: `<div v-else-if.mod=\"b\"></div>`.\n - Missing value: `<div v-else-if></div>`.\n - Not preceded by a sibling with `v-if`/`v-else-if`.\n - On the same element as `v-if` or `v-else`.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <div v-if=\"a\"></div><div v-else-if:arg=\"b\"></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-if=\"a\"></div><div v-else-if.mod=\"b\"></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-if=\"a\"></div><div v-else-if></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-else-if=\"b\"></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-if=\"a\" v-else-if=\"b\"></div>\n ```\n\n ### Valid\n\n ```vue\n <div v-if=\"a\"></div><div v-else-if=\"b\"></div><div v-else></div>\n ```\n\n"
          },
          "useVueValidVHtml": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "useVueValidVHtml",
            "link": "https://biomejs.dev/linter/rules/use-vue-valid-v-html",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "valid-v-html"
                }
              }
            ],
            "docs": " Enforce valid `v-html` directives.\n\n This rule reports v-html directives in the following cases:\n - The directive has an argument. E.g. `<div v-html:aaa></div>`\n - The directive has a modifier. E.g. `<div v-html.bbb></div>`\n - The directive does not have an attribute value. E.g. `<div v-html></div>`\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <div v-html:aaa=\"foo\"></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-html.bbb=\"foo\"></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-html></div>\n ```\n\n ### Valid\n\n ```vue\n <div v-html=\"htmlContent\"></div>\n ```\n\n"
          },
          "useVueValidVIf": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "useVueValidVIf",
            "link": "https://biomejs.dev/linter/rules/use-vue-valid-v-if",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "valid-v-if"
                }
              }
            ],
            "docs": " Enforces valid `v-if` usage for Vue templates.\n\n This rule reports `v-if` directives in following cases:\n - The directive has an argument. E.g. `<div v-if:aaa=\"foo\"></div>`\n - The directive has a modifier. E.g. `<div v-if.bbb=\"foo\"></div>`\n - The directive does not have an attribute value. E.g. `<div v-if></div>`\n - The same element also has `v-else` or `v-else-if`. E.g. `<div v-if=\"foo\" v-else></div>`\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <div v-if:aaa=\"foo\"></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-if.bbb=\"foo\"></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-if></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-if=\"foo\" v-else></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-if=\"foo\" v-else-if=\"bar\"></div>\n ```\n\n ### Valid\n\n ```vue\n <div v-if=\"ok\"></div>\n ```\n\n ```vue\n <div v-if=\"a < b\"></div>\n ```\n\n ```vue\n <div v-if=\"a\"></div>\n <div v-else-if=\"b\"></div>\n <div v-else></div>\n ```\n\n"
          },
          "useVueValidVOn": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "useVueValidVOn",
            "link": "https://biomejs.dev/linter/rules/use-vue-valid-v-on",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "valid-v-on"
                }
              }
            ],
            "docs": " Enforce valid `v-on` directives with proper arguments, modifiers, and handlers.\n\n This rule reports v-on directives in the following cases:\n - The directive does not have an event name. E.g. `<div v-on=\"foo\"></div>`\n - The directive has invalid modifiers. E.g. `<div v-on:click.bogus=\"foo\"></div>`\n - The directive is missing a handler expression. E.g. `<div v-on:click></div>`\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <Foo v-on />\n ```\n\n ### Valid\n\n ```vue\n <Foo v-on:click=\"foo\" />\n ```\n\n"
          },
          "useVueValidVOnce": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "useVueValidVOnce",
            "link": "https://biomejs.dev/linter/rules/use-vue-valid-v-once",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "valid-v-once"
                }
              }
            ],
            "docs": " Enforce valid `v-once` Vue directives.\n\n\n ## Examples\n\n ### Invalid\n\n This rule reports `v-once` directives in the following cases:\n\n The directive has an argument so it is invalid.\n ```vue,expect_diagnostic\n <div v-once:arg></div>\n ```\n\n The directive has a modifier so it is invalid.\n ```vue,expect_diagnostic\n <div v-once.mod></div>\n ```\n\n The directive has a value so it is invalid.\n ```vue,expect_diagnostic\n <div v-once=\"value\"></div>\n ```\n\n ### Valid\n\n ```vue\n <div v-once></div>\n ```\n\n"
          },
          "useVueValidVPre": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "useVueValidVPre",
            "link": "https://biomejs.dev/linter/rules/use-vue-valid-v-pre",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "valid-v-pre"
                }
              }
            ],
            "docs": " Enforce valid `v-pre` Vue directives.\n\n\n ## Examples\n\n ### Invalid\n\n This rule reports `v-pre` directives in the following cases:\n\n The directive has an argument so it is invalid.\n ```vue,expect_diagnostic\n <div v-pre:arg></div>\n ```\n\n The directive has a modifier so it is invalid.\n ```vue,expect_diagnostic\n <div v-pre.mod></div>\n ```\n\n The directive has a value so it is invalid.\n ```vue,expect_diagnostic\n <div v-pre=\"value\"></div>\n ```\n\n ### Valid\n\n ```vue\n <div v-pre></div>\n ```\n\n"
          },
          "useVueValidVText": {
            "deprecated": false,
            "version": "2.3.7",
            "name": "useVueValidVText",
            "link": "https://biomejs.dev/linter/rules/use-vue-valid-v-text",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "valid-v-text"
                }
              }
            ],
            "docs": " Enforce valid `v-text` Vue directives.\n\n This rule reports `v-text` directives in the following cases:\n - The directive has an argument. E.g. `<div v-text:aaa></div>`\n - The directive has any modifiers. E.g. `<div v-text.bbb></div>`\n - The directive does not have a value. E.g. `<div v-text></div>`\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <div v-text />\n ```\n\n ```vue,expect_diagnostic\n <div v-text:aaa=\"foo\"></div>\n ```\n\n ```vue,expect_diagnostic\n <div v-text.bbb=\"foo\"></div>\n ```\n\n ### Valid\n\n ```vue\n <div v-text=\"foo\" />\n ```\n\n"
          },
          "useVueVapor": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "useVueVapor",
            "link": "https://biomejs.dev/linter/rules/use-vue-vapor",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Enforce opting in to Vue Vapor mode in `<script setup>` blocks.\n\n Vue 3.6 introduces an opt-in “Vapor mode” for SFC `<script setup>` blocks:\n `<script setup vapor>`.\n\n Vapor mode only works for Vue Single File Components (SFCs) using `<script setup>`.\n\n This rule reports `<script setup>` opening tags that are missing the `vapor` attribute.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <script setup>\n </script>\n ```\n\n ### Valid\n\n ```vue\n <script setup vapor>\n </script>\n ```\n\n ## Related Rules\n\n - [noVueOptionsApi](https://biomejs.dev/linter/rules/no-vue-options-api): Disallows the Options API format, which is incompatible with Vapor Mode\n\n"
          }
        }
      },
      "js": {
        "a11y": {
          "noStaticElementInteractions": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noStaticElementInteractions",
            "link": "https://biomejs.dev/linter/rules/no-static-element-interactions",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-static-element-interactions"
                }
              }
            ],
            "docs": " Enforce that static, visible elements (such as `<div>`) that have click handlers use the valid role attribute.\n\n Static HTML elements do not have semantic meaning. This is clear in the case of `<div>` and `<span>`. It is less so clear in the case of elements that seem semantic, but that do not have a semantic mapping in the accessibility layer. For example `<a>` without href attribute, `<meta>`, `<script>`, `<picture>`, `<section>`, and `<colgroup>` -- to name a few -- have no semantic layer mapping. They are as void of meaning as `<div>`.\n\n The [WAI-ARIA role attribute](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) confers a semantic mapping to an element. The semantic value can then be expressed to a user via assistive technology.\n In order to add interactivity such as a mouse or key event listener to a static element, that element must be given a role value as well.\n\n Source: [jsx-a11y/no-static-element-interactions](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-static-element-interactions.md)\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div onClick={() => {}}></div>;\n ```\n\n ```jsx,expect_diagnostic\n <span onClick={() => {}}></span>;\n ```\n\n When `<a>` does not have \"href\" attribute, that is non-interactive.\n ```jsx,expect_diagnostic\n <a onClick={() => {}}></a>\n ```\n\n ### Valid\n\n ```jsx\n <>\n     <div role=\"button\" onClick={() => {}}></div>\n     <span role=\"scrollbar\" onClick={() => {}}></span>\n     <a href=\"http://example.com\" onClick={() => {}}></a>\n </>\n ```\n\n Custom components are not checked.\n ```jsx\n <TestComponent onClick={doFoo} />\n ```\n\n"
          },
          "useAriaPropsSupportedByRole": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "useAriaPropsSupportedByRole",
            "link": "https://biomejs.dev/linter/rules/use-aria-props-supported-by-role",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "role-supports-aria-props"
                }
              }
            ],
            "docs": " Enforce that ARIA properties are valid for the roles that are supported by the element.\n\n Invalid ARIA properties can make it difficult for users of assistive technologies to understand the purpose of the element.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <a href=\"#\" aria-checked />\n ```\n\n ```jsx,expect_diagnostic\n <img alt=\"foobar\" aria-checked />\n ```\n\n ### Valid\n\n ```jsx\n <>\n     <a href=\"#\" aria-expanded />\n     <img alt=\"foobar\" aria-hidden />\n     <div role=\"heading\" aria-level=\"1\" />\n </>\n ```\n\n"
          },
          "useValidAutocomplete": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "useValidAutocomplete",
            "link": "https://biomejs.dev/linter/rules/use-valid-autocomplete",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "autocomplete-valid"
                }
              }
            ],
            "docs": " Use valid values for the `autocomplete` attribute on `input` elements.\n\n The HTML autocomplete attribute only accepts specific predefined values.\n This allows for more detailed purpose definitions compared to the `type` attribute.\n Using these predefined values, user agents and assistive technologies can present input purposes to users in different ways.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <input type=\"text\" autocomplete=\"incorrect\" />\n ```\n\n ### Valid\n\n ```jsx\n <>\n   <input type=\"text\" autocomplete=\"name\" />\n   <MyInput autocomplete=\"incorrect\" />\n </>\n ```\n\n ## Options\n\n ```json,options\n {\n     \"options\": {\n         \"inputComponents\": [\"MyInput\"]\n     }\n }\n ```\n\n ## Accessibility guidelines\n - [WCAG 1.3.5](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose)\n\n ### Resources\n - [HTML Living Standard autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)\n - [HTML attribute: autocomplete - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)\n\n"
          }
        },
        "complexity": {
          "noAdjacentSpacesInRegex": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noAdjacentSpacesInRegex",
            "link": "https://biomejs.dev/linter/rules/no-adjacent-spaces-in-regex",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-regex-spaces"
                }
              }
            ],
            "docs": " Disallow unclear usage of consecutive space characters in regular expression literals\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n /   /\n ```\n\n ```js,expect_diagnostic\n /foo  */\n ```\n\n ```js,expect_diagnostic\n /foo  {2,}bar   {3,5}baz/\n ```\n\n ```js,expect_diagnostic\n /foo [ba]r  b(a|z)/\n ```\n\n ### Valid\n\n ```js\n /foo {2}bar/\n```\n\n ```js\n / foo bar baz /\n```\n\n ```js\n /foo bar\tbaz/\n```\n"
          },
          "noArguments": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noArguments",
            "link": "https://biomejs.dev/linter/rules/no-arguments",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "prefer-rest-params"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-sequences"
                }
              }
            ],
            "docs": " Disallow comma operator.\n\n The comma operator includes multiple expressions where only one is expected.\n It evaluates every operand from left to right and returns the value of the last operand.\n It frequently obscures side effects, and its use is often an accident.\n\n The use of the comma operator in the initialization and update parts of a `for` is still allowed.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = (doSomething(), 0);\n ```\n\n ```js,expect_diagnostic\n for (; doSomething(), !!test; ) {}\n ```\n\n ```js,expect_diagnostic\n // Use a semicolon instead.\n let a, b;\n a = 1, b = 2;\n ```\n\n ### Valid\n\n ```js\n for(a = 0, b = 0; (a + b) < 10; a++, b += 2) {}\n ```\n\n"
          },
          "noExcessiveCognitiveComplexity": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noExcessiveCognitiveComplexity",
            "link": "https://biomejs.dev/linter/rules/no-excessive-cognitive-complexity",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintSonarJs": "cognitive-complexity"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslint": "complexity"
                }
              }
            ],
            "docs": " Disallow functions that exceed a given Cognitive Complexity score.\n\n The more complexity a function contains, the harder it is to understand\n later on.\n\n Reducing complexity helps to make code more maintenable, both by making\n it easier to understand as well as by reducing chances of accidental\n side-effects when making changes.\n\n This rule calculates a complexity score for every function and disallows\n those that exceed a configured complexity threshold (default: 15).\n\n The complexity score is calculated based on the Cognitive Complexity\n algorithm: https://redirect.sonarsource.com/doc/cognitive-complexity.html\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function tooComplex() {\n     for (let x = 0; x < 10; x++) {\n         for (let y = 0; y < 10; y++) {\n             for (let z = 0; z < 10; z++) {\n                 if (x % 2 === 0) {\n                     if (y % 2 === 0) {\n                         console.log(x > y ? `${x} > ${y}` : `${y} > ${x}`);\n                     }\n                 }\n             }\n         }\n     }\n }\n ```\n\n ## Options\n\n Allows specifying the maximum allowed complexity.\n\n ```json,options\n {\n     \"options\": {\n         \"maxAllowedComplexity\": 15\n     }\n }\n ```\n\n The allowed values range from 1 through 254. The default is 15.\n\n"
          },
          "noExcessiveLinesPerFunction": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noExcessiveLinesPerFunction",
            "link": "https://biomejs.dev/linter/rules/no-excessive-lines-per-function",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslint": "max-lines-per-function"
                }
              }
            ],
            "docs": " Restrict the number of lines of code in a function.\n\n This rule checks the number of lines in a function body and reports a diagnostic if it exceeds a specified limit. Remember that this rule only counts the lines of code in the function body, not the entire function declaration.\n Some people consider large functions a code smell. Large functions tend to do a lot of things and can make it hard following what’s going on. Many coding style guides dictate a limit of the number of lines that a function can comprise of. This rule can help enforce that style.\n\n ## Examples\n\n ### Invalid\n\n The following example will show diagnostic when you set the maxLines limit to 3, however the default value is 50.\n\n ```js\n function foo () {\n   const x = 0;\n   const y = 1;\n   const z = 2;\n   return x + y + z;\n };\n ```\n\n ### Valid\n\n ```js\n  function foo () {\n     const x = 0;\n     const y = 1;\n };\n ```\n\n ## Options\n\n The rule supports the following options:\n\n ```json\n {\n     \"options\": {\n        \"maxLines\": 50,\n        \"skipBlankLines\": false,\n        \"skipIifes\": false\n     }\n }\n ```\n\n ### maxLines\n\n This option sets the maximum number of lines allowed in a function body.\n If the function body exceeds this limit, a diagnostic will be reported.\n\n Default: `50`\n\n When `maxLines: 2`, the following function will be considered invalid:\n ```json,options\n {\n     \"options\": {\n        \"maxLines\": 2\n     }\n }\n ```\n ```js,expect_diagnostic,use_options\n function example() {\n  const a = 1; // 1\n  const b = 2; // 2\n  const c = 3; // 3\n };\n ```\n\n ### skipBlankLines\n\n When this options is set to `true`, blank lines in the function body are not counted towards the maximum line limit.\n This means that only lines with actual code or comments will be counted.\n\n Default: `false`\n\n When `maxLines: 2` and `skipBlankLines: true`, the following function will be considered valid:\n ```json,options\n {\n     \"options\": {\n        \"maxLines\": 2,\n        \"skipBlankLines\": true\n     }\n }\n ```\n ```js,use_options\n function example() {\n  const a = 1; // 1\n  // not counted\n  const b = 2; // 2\n  // not counted\n };\n ```\n\n ### skipIifes\n\n When this option is set to `true`, Immediately Invoked Function Expressions (IIFEs) are not checked for the maximum line limit.\n\n Default: `false`\n\n When `maxLines: 2` and `skipIifes: true`, the following IIFE will be considered valid even though its body has 3 lines:\n ```json,options\n {\n     \"options\": {\n        \"maxLines\": 2,\n        \"skipIifes\": true\n     }\n }\n ```\n ```js,use_options\n (() => {\n  const a = 1; // 1\n  const b = 2; // 2\n  const c = 3; // 3\n })();\n ```\n\n"
          },
          "noExcessiveNestedTestSuites": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noExcessiveNestedTestSuites",
            "link": "https://biomejs.dev/linter/rules/no-excessive-nested-test-suites",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJest": "max-nested-describe"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVitest": "max-nested-describe"
                }
              }
            ],
            "docs": " This rule enforces a maximum depth to nested `describe()` in test files.\n\n To improve code clarity in your tests, the rule limits nested `describe` to 5.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n describe('foo', () => {\n   describe('bar', () => {\n     describe('baz', () => {\n       describe('qux', () => {\n         describe('quxx', () => {\n           describe('too many', () => {\n             it('should get something', () => {\n               expect(getSomething()).toBe('Something');\n             });\n           });\n         });\n       });\n     });\n   });\n });\n ```\n\n ### Valid\n\n ```js\n describe('foo', () => {\n   describe('bar', () => {\n     it('should get something', () => {\n       expect(getSomething()).toBe('Something');\n     });\n   });\n   describe('qux', () => {\n     it('should get something', () => {\n       expect(getSomething()).toBe('Something');\n     });\n   });\n });\n ```\n\n"
          },
          "noExtraBooleanCast": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noExtraBooleanCast",
            "link": "https://biomejs.dev/linter/rules/no-extra-boolean-cast",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-extra-boolean-cast"
                }
              }
            ],
            "docs": " Disallow unnecessary boolean casts\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (!Boolean(foo)) {\n }\n ```\n\n ```js,expect_diagnostic\n while (!!foo) {}\n ```\n\n ```js,expect_diagnostic\n let x = 1;\n do {\n 1 + 1;\n } while (Boolean(x));\n ```\n\n ```js,expect_diagnostic\n for (; !!foo; ) {}\n ```\n\n ```js,expect_diagnostic\n new Boolean(!!x);\n ```\n\n ### Valid\n ```js\n Boolean(!x);\n !x;\n !!x;\n ```\n"
          },
          "noFlatMapIdentity": {
            "deprecated": false,
            "version": "1.7.0",
            "name": "noFlatMapIdentity",
            "link": "https://biomejs.dev/linter/rules/no-flat-map-identity",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "flat_map_identity"
                }
              }
            ],
            "docs": " Disallow to use unnecessary callback on `flatMap`.\n\n To achieve the same result (flattening an array) more concisely and efficiently, you should use `flat` instead.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n array.flatMap((arr) => arr);\n ```\n\n ```js,expect_diagnostic\n array.flatMap((arr) => {return arr});\n ```\n\n ### Valid\n\n ```js\n array.flatMap((arr) => arr * 2);\n ```\n\n"
          },
          "noForEach": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noForEach",
            "link": "https://biomejs.dev/linter/rules/no-for-each",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "no-array-for-each"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "needless_for_each"
                }
              }
            ],
            "docs": " Prefer `for...of` statement instead of `Array.forEach`.\n\n Here's a summary of why `forEach` may be disallowed, and why `for...of` is preferred for almost any use-case of `forEach`:\n - Performance: Using `forEach` can lead to performance issues, especially when working with large arrays.\n When more requirements are added on, `forEach` typically gets chained with other methods like `filter` or `map`, causing multiple iterations over the same Array.\n Encouraging for loops discourages chaining and encourages single-iteration logic (e.g. using a continue instead of `filter`).\n\n - Readability: While `forEach` is a simple and concise way to iterate over an array, it can make the code less readable, especially when the callback function is complex.\n In contrast, using a for loop or a `for...of` loop can make the code more explicit and easier to read.\n\n - Debugging: `forEach` can make debugging more difficult, because it hides the iteration process.\n\n ## Caveat\n\n We consider all objects with a method named `forEach` to be iterable.\n This way, this rule applies to all objects with a method called `forEach`, not just `Array` instances.\n\n ## Exception for Index Usage\n\n When the index is explicitly used in the `forEach` callback, it is acceptable to use `forEach`. This is because:\n - The index is directly available as the second argument in `forEach`, making it convenient for scenarios where the index is necessary.\n - In sparse arrays, `forEach` will skip undefined entries, which differs from the behavior of `for...of` with `Object.entries` that includes these entries.\n   This can be important for certain array operations, particularly in TypeScript environments with strict type checking.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n els.forEach((el) => {\n   f(el);\n })\n ```\n\n ```js,expect_diagnostic\n els[\"forEach\"](el => {\n   f(el);\n })\n ```\n\n ### Valid\n\n ```js\n els.forEach((el, i) => {\n   f(el, i)\n })\n ```\n\n ```js\n for (const el of els) {\n   f(el);\n }\n ```\n\n ## Options\n\n The rule provides a `validIdentifiers` option that allows specific variable names to call `forEach`.\n In the following configuration, it's allowed to call `forEach` with expressions that match `Effect` or `_`:\n\n ```json,options\n {\n     \"options\": {\n         \"allowedIdentifiers\": [\"Effect\", \"_\"]\n     }\n }\n ```\n\n ```js,use_options\n Effect.forEach((el) => {\n   f(el);\n })\n _.forEach((el) => {\n   f(el);\n })\n ```\n\n Values with dots (e.g., \"lib._\") will not be accepted.\n"
          },
          "noImplicitCoercions": {
            "deprecated": false,
            "version": "2.1.0",
            "name": "noImplicitCoercions",
            "link": "https://biomejs.dev/linter/rules/no-implicit-coercions",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-implicit-coercion"
                }
              }
            ],
            "docs": " Disallow shorthand type conversions.\n\n JavaScript allows shorthand type conversions by using operators like `!!`, `+`, `~`, etc.\n These shortcuts can make the code harder to read and understand, especially for developers\n who are not familiar with these patterns. Using explicit type conversion functions like\n `Boolean()`, `Number()`, and `String()` makes the intent clearer and more readable.\n\n This rule reports when values are converted to:\n - Boolean using double negation `!!value`\n - Number using unary plus `+value`, subtraction from zero `value - 0`, multiplication by one `value * 1`, division by one `value / 1`, or double negation with minus `-(-value)`\n - String using concatenation with empty string `value + \"\"` or empty template literal `` value + `` ``\n - Check index using bitwise NOT with indexOf `~value.indexOf(item)` instead of comparing with -1\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n !!foo;\n ```\n\n ```js,expect_diagnostic\n +foo;\n ```\n\n ```js,expect_diagnostic\n -(-foo);\n ```\n\n ```js,expect_diagnostic\n foo - 0;\n ```\n\n ```js,expect_diagnostic\n foo * 1;\n ```\n\n ```js,expect_diagnostic\n foo / 1;\n ```\n\n ```js,expect_diagnostic\n \"\" + foo;\n ```\n\n ```js,expect_diagnostic\n foo + \"\";\n ```\n\n ```js,expect_diagnostic\n `` + foo;\n ```\n\n ```js,expect_diagnostic\n foo += \"\";\n ```\n\n ```js,expect_diagnostic\n ~foo.indexOf(1);\n ```\n\n ### Valid\n\n ```js\n Boolean(foo);\n ```\n\n ```js\n Number(foo);\n ```\n\n ```js\n String(foo);\n ```\n\n ```js\n foo.indexOf(1) !== -1;\n ```\n\n These are not flagged because they don't perform type coercion:\n ```js\n !foo;\n ~foo;\n -foo;\n +1234;\n 2 * foo;\n foo + 'bar';\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-extraneous-class"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "no-static-only-class"
                }
              }
            ],
            "docs": " This rule reports when a class has no non-static members, such as for a class used exclusively as a static namespace.\n\n Users who come from a [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming) paradigm may wrap their utility functions in an extra class,\n instead of putting them at the top level of an ECMAScript module. Doing so is generally unnecessary in JavaScript and TypeScript projects.\n\n - Wrapper classes add extra cognitive complexity to code without adding any structural improvements\n \t- Whatever would be put on them, such as utility functions, are already organized by virtue of being in a module.\n \t- As an alternative, you can import * as ... the module to get all of them in a single object.\n - IDEs can't provide as good suggestions for static class or namespace imported properties when you start typing property names\n - It's more difficult to statically analyze code for unused variables, etc. when they're all on the class (see: [Finding dead code (and dead types) in TypeScript](https://effectivetypescript.com/2020/10/20/tsprune)).\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class X {\n   static foo = false;\n   static bar() {};\n }\n ```\n ```ts,expect_diagnostic\n class StaticConstants {\n   static readonly version = 42;\n\n   static isProduction() {\n     return process.env.NODE_ENV === 'production';\n   }\n }\n ```\n\n ### Valid\n\n ```js\n const X = {\n   foo: false,\n   bar() {}\n };\n ```\n ```js\n export const version = 42;\n\n export function isProduction() {\n   return process.env.NODE_ENV === 'production';\n }\n\n function logHelloWorld() {\n   console.log('Hello, world!');\n }\n ```\n ```js\n class Empty {}\n ```\n\n ## Notes on Mutating Variables\n One case you need to be careful of is exporting mutable variables. While class properties can be mutated externally, exported variables are always constant. This means that importers can only ever read the first value they are assigned and cannot write to the variables.\n\n Needing to write to an exported variable is very rare and is generally considered a code smell. If you do need it you can accomplish it using getter and setter functions:\n ```js,expect_diagnostic\n export class Utilities {\n   static mutableCount = 1;\n   static incrementCount() {\n     Utilities.mutableCount += 1;\n   }\n }\n ```\n\n Do this instead:\n ```js\n let mutableCount = 1;\n\n export function getMutableCount() {\n   return mutableField;\n }\n\n export function incrementCount() {\n   mutableField += 1;\n }\n ```\n"
          },
          "noThisInStatic": {
            "deprecated": false,
            "version": "1.3.1",
            "name": "noThisInStatic",
            "link": "https://biomejs.dev/linter/rules/no-this-in-static",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintMysticatea": "no-this-in-static"
                }
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
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-useless-catch"
                }
              }
            ],
            "docs": " Disallow unnecessary `catch` clauses.\n\n A `catch` clause that only rethrows the original error is redundant,\n and has no effect on the runtime behavior of the program.\n These redundant clauses can be a source of confusion and code bloat,\n so it’s better to disallow these unnecessary `catch` clauses.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n try {\n     doSomething();\n } catch(e) {\n     throw e;\n }\n ```\n ```js,expect_diagnostic\n try {\n     doSomething();\n } catch(e) {\n     throw e;\n } finally {\n     doCleanUp();\n }\n ```\n ### Valid\n\n ```js\n try {\n     doSomething();\n } catch(e) {\n     doSomethingWhenCatch();\n     throw e;\n }\n ```\n\n ```js\n try {\n     doSomething();\n } catch(e) {\n     handleError(e);\n }\n ```\n\n ```js\n try {\n     doSomething();\n } finally {\n     doCleanUp();\n }\n ```\n\n"
          },
          "noUselessCatchBinding": {
            "deprecated": false,
            "version": "2.2.3",
            "name": "noUselessCatchBinding",
            "link": "https://biomejs.dev/linter/rules/no-useless-catch-binding",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Disallow unused catch bindings.\n\n This rule disallows unnecessary catch bindings in accordance with ECMAScript 2019.\n See also: the ECMAScript 2019 “optional catch binding” feature in the language specification.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n try {\n     // Do something\n } catch (unused) {}\n ```\n\n ```js,expect_diagnostic\n try {\n     // Do something\n } catch ({ unused }) {}\n ```\n\n ```js,expect_diagnostic\n try {\n     // Do something\n } catch ({ unused1, unused2 }) {}\n ```\n\n ### Valid\n\n ```js\n try {\n     // Do something\n } catch (used) {\n     console.error(used);\n }\n ```\n\n ```js\n try {\n     // Do something\n } catch ({ used }) {\n     console.error(used);\n }\n ```\n\n ```js\n try {\n     // Do something\n } catch ({ used, unused }) {\n     console.error(used);\n }\n ```\n\n ```js\n try {\n     // Do something\n } catch {}\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-useless-constructor"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-useless-constructor"
                }
              }
            ],
            "docs": " Disallow unnecessary constructors.\n\n _ES2015_ provides a default class constructor if one is not specified.\n As such, providing an empty constructor or one that delegates into its parent is unnecessary.\n\n The rule ignores:\n\n - decorated classes;\n - constructors with at least one [parameter property](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties);\n - `private` and `protected` constructors.\n\n ## Caveat\n\n This rule reports on constructors whose sole purpose is to make a parent constructor public.\n See the last invalid example.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A {\n     constructor (a) {}\n }\n ```\n\n ```ts,expect_diagnostic\n class B extends A {\n     constructor (a) {\n         super(a);\n     }\n }\n ```\n\n ```js,expect_diagnostic\n class C {\n     /**\n      * Documented constructor.\n      */\n     constructor () {}\n }\n ```\n\n ```ts,expect_diagnostic\n class A {\n     protected constructor() {\n         this.prop = 1;\n     }\n }\n\n class B extends A {\n     // Make the parent constructor public.\n     constructor () {\n         super();\n     }\n }\n ```\n\n ### Valid\n\n ```js\n class A {\n     constructor (prop) {\n         this.prop = prop;\n     }\n }\n ```\n\n ```js\n class B extends A {\n     constructor () {\n         super(5);\n     }\n }\n ```\n\n ```ts\n class C {\n     // Empty constructor with parameter properties are allowed.\n     constructor (private prop: number) {}\n }\n ```\n\n ```ts\n class D {\n   constructor(public arg: number){}\n }\n\n class F extends D {\n   // constructor with default parameters are allowed.\n   constructor(arg = 4) {\n     super(arg)\n   }\n }\n ```\n\n ```ts\n @Decorator\n class C {\n     constructor (prop: number) {}\n }\n ```\n"
          },
          "noUselessContinue": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUselessContinue",
            "link": "https://biomejs.dev/linter/rules/no-useless-continue",
            "recommended": true,
            "fixKind": "safe",
            "docs": " Avoid using unnecessary `continue`.\n\n ## Examples\n\n ### Invalid\n ```js,expect_diagnostic\n loop: for (let i = 0; i < 5; i++) {\n   continue loop;\n }\n ```\n ```js,expect_diagnostic\n while (i--) {\n   continue;\n }\n ```\n ```js,expect_diagnostic\n while (1) {\n   continue;\n }\n ```\n ```js,expect_diagnostic\n for (let i = 0; i < 10; i++) {\n   if (i > 5) {\n     console.log(\"foo\");\n     continue;\n   } else if (i >= 5 && i < 8) {\n     console.log(\"test\");\n   } else {\n     console.log(\"test\");\n   }\n }\n ```\n ```js,expect_diagnostic\n for (let i = 0; i < 9; i++) {\n   continue;\n }\n ```\n\n ```js, expect_diagnostic\n test2: do {\n \tcontinue test2;\n } while (true);\n ```\n\n ### Valid\n ```js\n while (i) {\n   if (i > 5) {\n     continue;\n   }\n   console.log(i);\n   i--;\n }\n\n loop: while (1) {\n   forLoop: for (let i = 0; i < 5; i++) {\n     if (someCondition) {\n       continue loop;\n     }\n   }\n }\n ```\n"
          },
          "noUselessEscapeInRegex": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noUselessEscapeInRegex",
            "link": "https://biomejs.dev/linter/rules/no-useless-escape-in-regex",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-useless-escape"
                }
              }
            ],
            "docs": " Disallow unnecessary escape sequence in regular expression literals.\n\n Escaping non-special characters in regular expression literals doesn't have any effect.\n Hence, they may confuse a reader.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n /\\a/;\n ```\n\n ```js,expect_diagnostic\n /[\\-]/;\n ```\n\n ```js,expect_diagnostic\n /[\\&]/v;\n ```\n\n ### Valid\n\n ```js\n /\\^\\d\\b/\n ```\n\n ```js\n /[\\b]/\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-extra-label"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-lone-blocks"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-useless-rename"
                }
              }
            ],
            "docs": " Disallow renaming import, export, and destructured assignments to the same name.\n\n ES2015 allows for the renaming of references in import and export statements as well as destructuring assignments.\n This gives programmers a concise syntax for performing these operations while renaming these references:\n\n ```js\n import { foo as bar } from \"baz\";\n export { foo as bar };\n let { foo: bar } = baz;\n ```\n\n With this syntax, it is possible to rename a reference to the same name.\n This is a completely redundant operation, as this is the same as not renaming at all.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import { foo as foo } from \"bar\";\n ```\n\n ```js,expect_diagnostic\n export { foo as foo };\n ```\n\n ```js,expect_diagnostic\n let { foo: foo } = bar;\n ```\n\n ### Valid\n\n ```js\n import { foo as bar } from \"baz\";\n ```\n\n ```js\n export { foo as bar };\n ```\n\n ```js\n let { foo: bar } = baz;\n ```\n\n"
          },
          "noUselessStringConcat": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noUselessStringConcat",
            "link": "https://biomejs.dev/linter/rules/no-useless-string-concat",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-useless-concat"
                }
              }
            ],
            "docs": " Disallow unnecessary concatenation of string or template literals.\n\n This rule aims to flag concatenation of string or template literals when they could be combined into a single literal.\n Notably, this also includes concatenating a string with a number (unlike the derivative ESLint rule).\n\n Concatenation of multiple strings is allowed for multi-line strings (such as ones used to prevent exceeding the maximum line width).\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const a = \"a\" + \"b\";\n ```\n\n ```js,expect_diagnostic\n const foo = \"string\" + 123;\n ```\n\n ```js,expect_diagnostic\n const a = \"a\" + \"b\" + \"c\";\n ```\n\n ```js,expect_diagnostic\n const a = (foo + \"a\") + (\"b\" + \"c\");\n ```\n\n ### Valid\n\n ```js\n const a = 1 + 1;\n ```\n\n ```js\n const a = 1 * '2';\n ```\n\n ```js\n const a = 1 - 2;\n ```\n\n ```js\n const a = foo + bar;\n ```\n\n ```js\n const a = 'foo' + bar;\n ```\n\n Multi-line strings are ignored:\n\n ```js\n const multiline = 'foo' + // formatting\n           'bar'\n ```\n\n ```js\n const alsoMultiline = 'foo'\n           + 'bar'\n           + `baz`\n ```\n"
          },
          "noUselessStringRaw": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "noUselessStringRaw",
            "link": "https://biomejs.dev/linter/rules/no-useless-string-raw",
            "recommended": true,
            "fixKind": "none",
            "docs": " Disallow unnecessary `String.raw` function in template string literals without any escape sequence.\n\n `String.raw` is useless when contains a raw string without any escape-like sequence.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n String.raw`a`;\n ```\n\n ```js,expect_diagnostic\n String.raw`a ${v}`;\n ```\n\n ### Valid\n\n ```js\n String.raw`\\n ${a}`;\n ```\n\n ```js\n String.raw`\\n`;\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "no-useless-switch-case"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-unneeded-ternary"
                }
              }
            ],
            "docs": " Disallow ternary operators when simpler alternatives exist.\n\n It’s a common mistake in JavaScript to use a conditional expression to select between two\n boolean values instead of using the logical NOT (`!`) or double NOT (`!!`) to convert the test to a boolean.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var a = x ? true : true;\n ```\n\n ```js,expect_diagnostic\n var a = foo === 1 ? false : true;\n ```\n\n ```js,expect_diagnostic\n var a = foo + 1 ? false : true;\n ```\n\n ```js,expect_diagnostic\n var a = foo + 1 ? true : false;\n ```\n\n ### Valid\n\n ```js\n var a = x === 2 ? 'Yes' : 'No';\n ```\n\n ```js\n var a = x === 2 ? 'Yes' : false;\n ```\n\n ## Resources\n\n Logical NOT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT\n\n"
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
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "no-this-alias"
                }
              }
            ],
            "docs": " Disallow useless `this` aliasing.\n\n Arrow functions inherits `this` from their enclosing scope;\n this makes `this` aliasing useless in this situation.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A {\n     method() {\n         const self = this;\n         return () => {\n             return self;\n         }\n     }\n }\n ```\n\n ### Valid\n\n ```js\n class A {\n     method() {\n         const self = this;\n         return function() {\n             this.g();\n             return self;\n         }\n     }\n }\n ```\n\n"
          },
          "noUselessUndefined": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noUselessUndefined",
            "link": "https://biomejs.dev/linter/rules/no-useless-undefined",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "no-useless-undefined"
                }
              }
            ],
            "docs": " Disallow the use of useless `undefined`.\n\n `undefined` is the default value for new variables, parameters, return statements, etc., so specifying it doesn't make any difference.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let foo = undefined;\n ```\n\n ```js,expect_diagnostic\n const {foo = undefined} = bar;\n ```\n\n ```js,expect_diagnostic\n function foo() {\n    return undefined;\n }\n ```\n\n ```js,expect_diagnostic\n function* foo() {\n   yield undefined;\n }\n ```\n\n ```js,expect_diagnostic\n function foo(bar = undefined) {}\n ```\n\n ```js,expect_diagnostic\n function foo({bar = undefined}) {}\n ```\n\n ### Valid\n\n ```js\n let foo;\n const {foo} = bar;\n function foo() {\n   return;\n }\n function* foo() {\n   yield;\n }\n function foo(bar) {}\n function foo({bar}) {}\n foo();\n ```\n\n"
          },
          "noUselessUndefinedInitialization": {
            "deprecated": false,
            "version": "1.7.2",
            "name": "noUselessUndefinedInitialization",
            "link": "https://biomejs.dev/linter/rules/no-useless-undefined-initialization",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-undef-init"
                }
              }
            ],
            "docs": " Disallow initializing variables to `undefined`.\n\n A variable that is declared and not initialized to any value automatically gets the value of `undefined`.\n It’s considered a best practice to avoid initializing variables to `undefined`.\n\n Please note that any inline comments attached to the initialization value or variable will be moved at the end of the variable declaration on auto-fix.\n Please be also aware that this differs from Eslint's behaviour.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var a = undefined;\n ```\n ```js,expect_diagnostic\n let b = undefined, c = 1, d = 2;\n ```\n ```js,expect_diagnostic\n for (let i = 0; i < 100; i++) {\n \tlet i = undefined;\n }\n ```\n ```js,expect_diagnostic\n let f = /**/undefined/**/ ;\n ```\n ### Valid\n\n ```js\n var a = 1;\n ```\n ```js\n class Foo {\n \tbar = undefined;\n }\n ```\n\n Exported variables are not flagged because in some frameworks (e.g., Svelte 4),\n initializing exported variables to `undefined` is used to declare optional props.\n\n ```js\n export let x = undefined;\n ```\n ```js\n let y = undefined;\n export { y };\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-void"
                }
              }
            ],
            "docs": " Disallow the use of `void` operators, which is not a familiar operator.\n\n > The `void` operator is often used merely to obtain the undefined primitive value,\n > usually using `void(0)` (which is equivalent to `void 0`). In these cases, the global variable `undefined` can be used.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n void 0;\n ```\n\n"
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
                "kind": "inspired",
                "source": {
                  "eslint": "prefer-arrow-callback"
                }
              }
            ],
            "docs": " Use arrow functions over function expressions.\n\n An arrow function expression is a compact alternative to a regular function expression,\n with an important distinction:\n `this` is not bound to the arrow function. It inherits `this` from its parent scope.\n\n This rule proposes turning all function expressions that are not generators (`function*`) and don't use `this` into arrow functions.\n\n This rule does not modify top-level function declarations ([discuss here](https://github.com/biomejs/biome/discussions/7108)).\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const z = function() {\n     return 0;\n }\n ```\n\n ```js,expect_diagnostic\n const delegatedFetch = async function(url) {\n     return await fetch(url);\n }\n ```\n\n ### Valid\n\n ```js\n const f = function() {\n     return this.prop;\n }\n ```\n\n Named function expressions are ignored:\n\n ```js\n const z = function z() {\n     return 0;\n }\n ```\n\n Functions that reference the [arguments\n object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)\n are ignored because the arguments object is not available to arrow\n functions.\n\n ```js\n const q = function () {\n     return arguments[0];\n }\n ```\n\n Function expressions that declare the type of `this` are  also ignored:\n\n ```ts\n const z = function(this: A): number {\n     return 0;\n }\n ```\n"
          },
          "useDateNow": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "useDateNow",
            "link": "https://biomejs.dev/linter/rules/use-date-now",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "prefer-date-now"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintE18e": "prefer-date-now"
                }
              }
            ],
            "docs": " Use `Date.now()` to get the number of milliseconds since the Unix Epoch.\n\n `Date.now()` is more readable than `new Date().getTime()` and its variants,\n it also avoids unnecessary instantiation of `Date` object.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = new Date().getTime();\n ```\n\n ```js,expect_diagnostic\n const foo = new Date().valueOf();\n ```\n\n ```js,expect_diagnostic\n const foo = +new Date();\n ```\n\n ```js,expect_diagnostic\n const foo = Number(new Date());\n ```\n\n ```js,expect_diagnostic\n const foo = new Date() * 2;\n ```\n\n ### Valid\n\n ```js\n const foo = Date.now();\n ```\n ```js\n const foo = Date.now() * 2;\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "prefer-array-flat-map"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "map_flatten"
                }
              }
            ],
            "docs": " Promotes the use of `.flatMap()` when `map().flat()` are used together.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const array = [\"split\", \"the text\", \"into words\"];\n array.map(sentence => sentence.split(' ')).flat();\n ```\n\n ```js,expect_diagnostic\n const array = [\"split\", \"the text\", \"into words\"];\n array.map(sentence => sentence.split(' ')).flat(1);\n ```\n\n ### Valid\n\n ```js\n const array = [\"split\", \"the text\", \"into words\"];\n array.map(sentence => sentence.split(' ')).flat(2);\n ```\n\n"
          },
          "useIndexOf": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useIndexOf",
            "link": "https://biomejs.dev/linter/rules/use-index-of",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "prefer-array-index-of"
                }
              }
            ],
            "docs": " Prefer `Array#{indexOf,lastIndexOf}()` over `Array#{findIndex,findLastIndex}()` when looking for the index of an item.\n\n `Array#findIndex()` and `Array#findLastIndex()` are intended for more complex needs.\n If you are just looking for the index where the given item is present, then the code can be simplified to use Array#indexOf() or Array#lastIndexOf().\n This applies to any search with a literal, a variable, or any expression that doesn't have any explicit side effects.\n However, if the expression you are looking for relies on an item related to the function (its arguments, the function self, etc.), the case is still valid.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const index = foo.findIndex(x => x === 'foo');\n ```\n\n ```js,expect_diagnostic\n const index = foo.findIndex(x => 'foo' === x);\n ```\n\n ```js,expect_diagnostic\n const index = foo.findIndex(x => {\n      return x === 'foo';\n });\n ```\n\n ```js,expect_diagnostic\n const index = foo.findLastIndex(x => 'foo' === x);\n ```\n\n ```js,expect_diagnostic\n const index = foo.findLastIndex(x => {\n      return x === 'bar';\n });\n ```\n\n ```js,expect_diagnostic\n const index = foo.findLastIndex(function(x) {\n      return x === 'foo';\n });\n ```\n\n ### Valid\n\n ```js\n const index = foo.indexOf('foo');\n ```\n\n ```js\n const index = foo.findIndex(x => x !== 'foo');\n ```\n\n ```js\n const index = foo.findIndex((x, index) => x === index);\n ```\n\n ```js\n const index = foo.findIndex(x => (x === 'foo') && isValid());\n ```\n\n ```js\n const index = foo.findIndex(x => y === 'foo');\n ```\n\n ```js\n const index = foo.findIndex(x => y.x === 'foo');\n ```\n\n ```js\n const index = foo.findIndex(x => {\n     const bar = getBar();\n     return x === bar;\n });\n ```\n\n ```js\n const index = foo.findIndex(function(x) {\n     const bar = getBar();\n     return x === bar;\n });\n ```\n\n ```js\n const index = foo.lastIndexOf('foo');\n ```\n\n ```js\n const index = foo.findLastIndex(x => x !== 'foo');\n ```\n\n ```js\n const index = foo.findLastIndex((x, index) => x === index);\n ```\n\n ```js\n const index = foo.findLastIndex(x => (x === 'foo') && isValid());\n ```\n\n ```js\n const index = foo.findLastIndex(x => y === 'foo');\n ```\n\n ```js\n const index = foo.findLastIndex(x => y.x === 'foo');\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "dot-notation"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-useless-computed-key"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "dot-notation"
                }
              }
            ],
            "docs": " Enforce the usage of a literal access to properties over computed property access.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n a.b[\"c\"];\n ```\n\n ```js,expect_diagnostic\n a.c[`d`]\n ```\n\n ```js,expect_diagnostic\n a.c[`d`] = \"something\"\n ```\n\n ```js,expect_diagnostic\n a = {\n \t['b']: d\n }\n ```\n\n ### Valid\n\n ```js\n a[\"c\" + \"d\"];\n a[d.c];\n ```\n\n"
          },
          "useMaxParams": {
            "deprecated": false,
            "version": "2.2.0",
            "name": "useMaxParams",
            "link": "https://biomejs.dev/linter/rules/use-max-params",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "max-params"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "too_many_arguments"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "max-params"
                }
              }
            ],
            "docs": " Enforce a maximum number of parameters in function definitions.\n\n Functions that take numerous parameters can be difficult to read and write\n because it requires the memorization of what each parameter is, its type,\n and the order they should appear in.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function foo(a, b, c, d, e, f, g, h) {\n     // too many parameters\n }\n ```\n\n ```js,expect_diagnostic\n const bar = (a, b, c, d, e, f, g, h) => {\n     // too many parameters\n }\n ```\n\n ```js,expect_diagnostic\n class Baz {\n     method(a, b, c, d, e, f, g, h) {\n         // too many parameters\n     }\n }\n ```\n\n ### Valid\n\n ```js\n function foo(a, b, c) {\n     // within limit\n }\n ```\n\n ```js\n const bar = (a, b, c) => {\n     // within limit\n }\n ```\n\n ```js\n class Baz {\n     method(a, b, c) {\n         // within limit\n     }\n }\n ```\n\n ## Options\n\n ### max\n\n The maximum number of parameters allowed (default: 4).\n\n"
          },
          "useNumericLiterals": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useNumericLiterals",
            "link": "https://biomejs.dev/linter/rules/use-numeric-literals",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "prefer-numeric-literals"
                }
              }
            ],
            "docs": " Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals\n\n _JavaScript_ provides literal forms for binary, octal, and hexadecimal numbers.\n For example: `0b11`, `0o77`, and `0xff`.\n Using the literal forms enable static code analysis and avoid unnecessary computations.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n parseInt(\"111110111\", 2);\n ```\n\n ```js,expect_diagnostic\n Number.parseInt(\"767\", 8);\n ```\n\n ```js,expect_diagnostic\n Number.parseInt(\"-1f7\", 16);\n ```\n\n ### Valid\n\n ```js\n parseInt(1);\n parseInt(1, 3);\n Number.parseInt(1);\n Number.parseInt(1, 3);\n\n 0b111110111 === 503;\n 0o767 === 503;\n 0x1F7 === 503;\n\n a[parseInt](1,2);\n\n parseInt(foo);\n parseInt(foo, 2);\n Number.parseInt(foo);\n Number.parseInt(foo, 2);\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "prefer-optional-chain"
                }
              }
            ],
            "docs": " Enforce using concise optional chain instead of chained logical expressions.\n\n TypeScript 3.7 introduced support for the optional chain operator, which was later standardized and included in the ECMAScript specification.\n This operator allows you to safely access properties and methods on objects when they are potentially `null` or `undefined`.\n The optional chain operator only chains when the property value is `null` or `undefined`.\n It is much safer than relying upon logical operator chaining; which chains on any truthy value.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n foo && foo.bar && foo.bar.baz && foo.bar.baz.buzz\n ```\n\n ```js,expect_diagnostic\n foo.bar && foo.bar.baz.buzz\n ```\n\n ```js,expect_diagnostic\n foo !== undefined && foo.bar != undefined && foo.bar.baz !== null && foo.bar.baz.buzz\n ```\n\n ```js,expect_diagnostic\n ((foo || {}).bar || {}).baz;\n ```\n\n ```js,expect_diagnostic\n (await (foo1 || {}).foo2 || {}).foo3;\n ```\n\n ```ts,expect_diagnostic\n (((typeof x) as string) || {}).bar;\n ```\n\n ### Valid\n\n ```js\n foo && bar;\n```\n ```js\n foo || {};\n```\n\n ```js\n (foo = 2 || {}).bar;\n```\n\n ```js\n foo || foo.bar;\n```\n\n ```js\n foo[\"some long\"] && foo[\"some long string\"].baz\n```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "prefer-regex-literals"
                }
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
            "docs": " Disallow number literal object member names which are not base 10 or use underscore as separator.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n ({ 0x1: 1 });\n ```\n ```js,expect_diagnostic\n ({ 11_1.11: \"ee\" });\n ```\n ```js,expect_diagnostic\n ({ 0o1: 1 });\n ```\n ```js,expect_diagnostic\n ({ 1n: 1 });\n ```\n ```js,expect_diagnostic\n ({ 11_1.11: \"ee\" });\n ```\n\n ### Valid\n\n ```js\n ({ 0: \"zero\" });\n ({ 122: \"integer\" });\n ({ 1.22: \"floating point\" });\n ({ 3.1e12: \"floating point with e\" });\n ```\n\n"
          },
          "useSimplifiedLogicExpression": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useSimplifiedLogicExpression",
            "link": "https://biomejs.dev/linter/rules/use-simplified-logic-expression",
            "recommended": false,
            "fixKind": "safe",
            "docs": " Discard redundant terms from logical expressions.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const boolExp = true;\n const r = true && boolExp;\n ```\n\n ```js,expect_diagnostic\n const boolExp2 = true;\n const r2 = boolExp || true;\n ```\n\n ```js,expect_diagnostic\n const nonNullExp = 123;\n const r3 = null ?? nonNullExp;\n ```\n\n ```js,expect_diagnostic\n const boolExpr1 = true;\n const boolExpr2 = false;\n const r4 = !boolExpr1 || !boolExpr2;\n ```\n\n ### Valid\n ```js\n const boolExpr3 = true;\n const boolExpr4 = false;\n const r5 = !(boolExpr1 && boolExpr2);\n const boolExpr5 = true;\n const boolExpr6 = false;\n ```\n\n"
          },
          "useWhile": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useWhile",
            "link": "https://biomejs.dev/linter/rules/use-while",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintSonarJs": "prefer-while"
                }
              }
            ],
            "docs": " Enforce the use of `while` loops instead of `for` loops when the initializer and update expressions are not needed.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n for (; x.running;) {\n     x.step();\n }\n ```\n\n ### Valid\n\n ```js\n for (let x = 0; x < 10; i++) {}\n ```\n\n ```js\n let x = 0\n for (; x < 10; i++) {}\n ```\n\n ```js\n for (let x = 0; x < 10;) {\n     i++\n }\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-const-assign"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-constant-condition"
                }
              }
            ],
            "docs": " Disallow constant expressions in conditions\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (false) {\n     doSomethingUnfinished();\n }\n ```\n\n ```js,expect_diagnostic\n if (Boolean(1)) {\n     doSomethingAlways();\n }\n ```\n\n ```js,expect_diagnostic\n if (undefined) {\n     doSomethingUnfinished();\n }\n ```\n\n ```js,expect_diagnostic\n for (;-2;) {\n     doSomethingForever();\n }\n ```\n\n ```js,expect_diagnostic\n while (typeof x) {\n     doSomethingForever();\n }\n ```\n\n ```js,expect_diagnostic\n var result = 0 ? a : b;\n ```\n\n ### Valid\n\n ```js\n if (x === 0) {\n     doSomething();\n }\n\n for (;;) {\n     doSomethingForever();\n }\n\n while (typeof x === \"undefined\") {\n     doSomething();\n }\n\n do {\n     doSomething();\n } while (x);\n\n var result = x !== 0 ? a : b;\n\n // Exception\n while (true) {\n     if (x) { break; }\n     x = f();\n }\n ```\n\n"
          },
          "noConstantMathMinMaxClamp": {
            "deprecated": false,
            "version": "1.7.0",
            "name": "noConstantMathMinMaxClamp",
            "link": "https://biomejs.dev/linter/rules/no-constant-math-min-max-clamp",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "min_max"
                }
              }
            ],
            "docs": " Disallow the use of `Math.min` and `Math.max` to clamp a value where the result itself is constant.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n Math.min(0, Math.max(100, x));\n ```\n\n ```js,expect_diagnostic\n Math.max(100, Math.min(0, x));\n ```\n ### Valid\n\n ```js\n Math.min(100, Math.max(0, x));\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-constructor-return"
                }
              }
            ],
            "docs": " Disallow returning a value from a `constructor`.\n\n Returning a value from a `constructor` of a class is a possible error.\n Forbidding this pattern prevents errors resulting from unfamiliarity with JavaScript or a copy-paste error.\n\n Only returning without a value is allowed, as it’s a control flow statement.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A {\n     constructor() {\n         return 0;\n     }\n }\n ```\n\n ### Valid\n\n ```js\n class A {\n     constructor() {}\n }\n ```\n\n ```js\n class B {\n     constructor(x) {\n         return;\n     }\n }\n ```\n\n ## Using this rule in combination with the singleton pattern\n\n Some people implement the singleton pattern in JavaScript by returning\n an existing instance from the constructor, which would conflict with\n this rule.\n\n Instead, we advise to follow one of the suggestions described in this\n blog post: https://arendjr.nl/blog/2024/11/singletons-in-javascript/\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-empty-character-class"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-empty-pattern"
                }
              }
            ],
            "docs": " Disallows empty destructuring patterns.\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var {} = foo;\n ```\n\n ```js,expect_diagnostic\n var {a: {}} = foo;\n ```\n\n ```js,expect_diagnostic\n function foo({}) {}\n ```\n\n ### Valid\n The following cases are valid because they create new bindings.\n\n ```js\n var {a = {}} = foo;\n var {a, b = {}} = foo;\n var {a = []} = foo;\n function foo({a = {}}) {}\n function foo({a = []}) {}\n var [a] = foo;\n ```\n"
          },
          "noGlobalDirnameFilename": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noGlobalDirnameFilename",
            "link": "https://biomejs.dev/linter/rules/no-global-dirname-filename",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintUnicorn": "prefer-module"
                }
              }
            ],
            "docs": " Disallow the use of `__dirname` and `__filename` in the global scope.\n\n They are [not available in ES modules](https://nodejs.org/api/esm.html#esm_no_filename_or_dirname).\n Starting with Node.js 20.11, `import.meta.dirname` and `import.meta.filename` have been introduced in ES modules, providing identical functionality to `__dirname` and `__filename` in CommonJS (CJS).\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const dirname = __dirname;\n ```\n\n ```js,expect_diagnostic\n const filename = __filename;\n ```\n\n ``` js,expect_diagnostic\n const foo = { __filename }\n ```\n\n ```js,expect_diagnostic\n if (__dirname.startsWith(\"/project/src/\")) {}\n ```\n\n ### Valid\n\n ```js\n const dirname = import.meta.dirname\n const filename = import.meta.filename\n const foo = {__filename: import.meta.filename };\n if (import.meta.dirname.startsWith(\"/project/src/\")) {}\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-obj-calls"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-inner-declarations"
                }
              }
            ],
            "docs": " Disallow `function` and `var` declarations that are accessible outside their block.\n\n A `var` is accessible in the whole body of the nearest root (function, module, script, static block).\n To avoid confusion, they should be declared to the nearest root.\n\n Prior to ES2015, `function` declarations were only allowed in the nearest root,\n though parsers sometimes erroneously accept them elsewhere.\n In ES2015, inside an _ES module_, a `function` declaration is always block-scoped.\n\n Note that `const` and `let` declarations are block-scoped,\n and therefore they are not affected by this rule.\n Moreover, `function` declarations in nested blocks are allowed inside _ES modules_.\n\n ## Examples\n\n ### Invalid\n\n ```cjs,expect_diagnostic\n if (test) {\n     function f() {}\n }\n ```\n\n ```js,expect_diagnostic\n if (test) {\n     var x = 1;\n }\n ```\n\n ```cjs,expect_diagnostic\n function f() {\n     if (test) {\n         function g() {}\n     }\n }\n ```\n\n ```js,expect_diagnostic\n function f() {\n     if (test) {\n         var x = 1;\n     }\n }\n ```\n\n ### Valid\n\n ```js\n // inside a module, function declarations are block-scoped and thus allowed.\n if (test) {\n     function f() {}\n }\n export {}\n ```\n\n ```js\n function f() { }\n ```\n\n ```js\n function f() {\n     function g() {}\n }\n ```\n\n ```js\n function f() {\n     var x = 1;\n }\n ```\n\n ```js\n function f() {\n     if (test) {\n         const g = function() {};\n     }\n }\n ```\n\n"
          },
          "noInvalidBuiltinInstantiation": {
            "deprecated": false,
            "version": "1.7.2",
            "name": "noInvalidBuiltinInstantiation",
            "link": "https://biomejs.dev/linter/rules/no-invalid-builtin-instantiation",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "new-for-builtins"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-new-native-nonconstructor"
                }
              }
            ],
            "docs": " Ensure that builtins are correctly instantiated.\n\n The following builtins require `new` to be instantiate:\n\n - ArrayBuffer\n - BigInt64Array\n - BigUint64Array\n - DataView\n - FinalizationRegistry\n - Float32Array\n - Float64Array\n - Int16Array\n - Int32Array\n - Int8Array\n - Map\n - Promise\n - Proxy\n - Set\n - SharedArrayBuffer\n - Uint16Array\n - Uint32Array\n - Uint8Array\n - Uint8ClampedArray\n - WeakMap\n - WeakRef\n - WeakSet\n\n Conversely, the following builtins cannot be instantiated with `new`:\n\n - BigInt\n - Symbol\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const text = new BigInt(1);\n ```\n\n ```js,expect_diagnostic\n const map = Map([\n   ['foo', 'bar']\n ]);\n ```\n\n ### Valid\n\n ```js\n const text = BigInt(1);\n ```\n\n ```js\n const map = new Map([\n  ['foo', 'bar']\n ]);\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "constructor-super"
                }
              }
            ],
            "docs": " Prevents the incorrect use of `super()` inside classes. It also checks whether a call `super()` is missing from classes that extends other constructors.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A {\n     constructor() {\n         super();\n     }\n }\n ```\n\n ```js,expect_diagnostic\n class A extends undefined {\n     constructor() {\n         super();\n     }\n }\n ```\n\n ### Valid\n\n ```js\n export default class A extends B {\n     constructor() {\n         super();\n     }\n }\n ```\n\n ```js\n export class A {\n     constructor() {}\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-use-before-define"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-use-before-define"
                }
              }
            ],
            "docs": " Disallow the use of variables, function parameters, classes, and enums before their declaration\n\n JavaScript doesn't allow the use of block-scoped variables (`let`, `const`), function parameters, and classes before their declaration.\n Similarly TypeScript doesn't allow the use of enums before their declaration.\n A `ReferenceError` will be thrown with any attempt to access the variable or the parameter before its declaration.\n\n The rule also reports the use of variables declared with `var` before their declarations.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function f() {\n     console.log(x);\n     let x;\n }\n ```\n\n ```js,expect_diagnostic\n function f() {\n     console.log(x);\n     var x = 0;\n }\n ```\n\n ```js,expect_diagnostic\n function f(a = b, b = 0) {}\n ```\n\n ```js,expect_diagnostic\n new C();\n class C {}\n ```\n\n ### Valid\n\n ```js\n f();\n function f() {}\n ```\n\n ```js\n // An export can reference a variable before its declaration.\n export { CONSTANT };\n const CONSTANT = 0;\n ```\n\n ```js\n function f() { return CONSTANT; }\n const CONSTANT = 0;\n ```\n\n ```ts\n function f() {\n     new C();\n }\n let c: C;\n class C {}\n ```\n"
          },
          "noNextAsyncClientComponent": {
            "deprecated": false,
            "version": "2.2.0",
            "name": "noNextAsyncClientComponent",
            "link": "https://biomejs.dev/linter/rules/no-next-async-client-component",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "no-async-client-component"
                }
              }
            ],
            "docs": " Prevent client components from being async functions.\n\n This rule prevents the use of async functions for client components in Next.js applications.\n Client components marked with \"use client\" directive should not be async as this can cause\n hydration mismatches, break component rendering lifecycle, and lead to unexpected behavior\n with React's concurrent features.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n \"use client\";\n\n export default async function MyComponent() {\n   return <div>Hello</div>;\n }\n ```\n\n ### Valid\n\n ```jsx\n \"use client\";\n\n export default function MyComponent() {\n   return <div>Hello</div>;\n }\n ```\n\n ```jsx\n // No \"use client\" directive - server component can be async\n export default async function ServerComponent() {\n   const data = await fetch('/api/data');\n   return <div>{data}</div>;\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintImport": "no-nodejs-modules"
                }
              }
            ],
            "docs": " Forbid the use of Node.js builtin modules.\n\n This can be useful for client-side web projects that don't have access to those modules.\n\n The rule also isn't triggered if there are dependencies declared in the `package.json` that match\n the name of a built-in Node.js module.\n\n Type-only imports are ignored.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import fs from \"fs\";\n ```\n\n ```js,expect_diagnostic\n import path from \"node:path\";\n ```\n\n ### Valid\n\n ```js\n import fs from \"fs-custom\";\n ```\n\n ```ts\n import type path from \"node:path\";\n ```\n"
          },
          "noNonoctalDecimalEscape": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noNonoctalDecimalEscape",
            "link": "https://biomejs.dev/linter/rules/no-nonoctal-decimal-escape",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-nonoctal-decimal-escape"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-loss-of-precision"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-loss-of-precision"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "lossy_float_literal"
                }
              }
            ],
            "docs": " Disallow literal numbers that lose precision\n\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const x = 9007199254740993\n ```\n\n ```js,expect_diagnostic\n const x = 5.123000000000000000000000000001\n ```\n\n ```js,expect_diagnostic\n const x = 0x20000000000001\n ```\n\n ```js,expect_diagnostic\n const x = 0x2_000000000_0001;\n ```\n\n ### Valid\n\n ```js\n const x = 12345\n const x = 123.456\n const x = 123e34\n const x = 12300000000000000000000000\n const x = 0x1FFFFFFFFFFFFF\n const x = 9007199254740991\n const x = 9007_1992547409_91\n ```\n\n"
          },
          "noPrivateImports": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noPrivateImports",
            "link": "https://biomejs.dev/linter/rules/no-private-imports",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintImportAccess": "eslint-plugin-import-access"
                }
              }
            ],
            "docs": " Restrict imports of private exports.\n\n In JavaScript and TypeScript, as soon as you `export` a symbol, such as\n a type, function, or anything else that can be exported, it is\n considered public and can be imported from anywhere else. Unfortunately,\n this makes it hard to enforce module boundaries, or to prevent importing\n things that were only exported for test purposes, for instance.\n\n This rule recognizes the JSDoc tags `@public`, `@package`, and\n `@private` so that you are free to set the visibility of exports.\n Exports without tag have a default visibility of **public**, but this\n can be configured.\n\n The `@access` tag is also supported if it's used with one of the values\n `public`, `package`, or `private`.\n\n ## Public visibility\n\n Public visibility is the default and means there are no restrictions for\n importing a given symbol. In other words, without this rule, all\n exported symbols are implicitly public.\n\n ## Package visibility\n\n Within the context of this rule, _package visibility_ means that a\n symbol is visible within the same \"package\", which means that any module\n that resides in the same folder, or one of its subfolders, is allowed to\n import the symbol. Modules that only share a common folder higher up in\n the hierarchy are not allowed to import the symbol.\n\n For a visual explanation, see\n [this illustration](https://github.com/uhyo/eslint-plugin-import-access?tab=readme-ov-file#what).\n\n ## Private visibility\n\n Private visibility means that a symbol may not be imported from other\n modules.\n\n The key thing to understanding the usefulness of `@private` is that this\n rule doesn't treat modules and files as one and the same thing. While\n files are indeed modules, folders are considered modules too, with their\n files and subfolders being submodules. Therefore, symbols exported as\n `@private` from an index file, such as `index.js`, can _still_ be\n imported from other submodules in that same module.\n\n :::note\n For the sake of compatibility with conventions used with Deno, modules\n named `mod.js`/`mod.ts` are considered index files too.\n :::\n\n Another reason why private visibility may still be useful is that it\n allows you to choose specific exceptions. For example, using\n [overrides](https://biomejs.dev/reference/configuration/#overrides), you\n may want to disable this rule in all files with a `.test.js` extension.\n This way, symbols marked private cannot be imported from outside\n modules, with the exception of test files.\n\n ## Known Limitations\n\n * This rule only applies to imports from JavaScript and TypeScript\n   files. Imports for resources such as images or CSS files are exempted\n   regardless of the default visibility setting.\n * This rule does not validate imports through dynamic `import()`\n   expressions or CommonJS `require()` calls.\n * Imports from dependencies under `node_modules` are considered out of\n   scope.\n\n ## Examples\n\n ### Invalid\n\n ```js,file=sub/foo.js\n /**\n  * @package\n  */\n export const fooPackageVariable = 1;\n ```\n\n ```js,expect_diagnostic,file=bar.js\n // Attempt to import package private variable from `sub/foo.js` from\n // outside its `sub` module:\n import { fooPackageVariable } from \"./sub/foo.js\";\n\n /**\n  * @private For test purposes only!\n  */\n export function getTestStuff() {}\n ```\n\n ```js,expect_diagnostic,file=bar.test.js\n // Attempt to import a private export. To allow this, you probably want\n // to configure an `override` to disable this rule in test files.\n // See: https://biomejs.dev/reference/configuration/#overrides\n import { getTestStuff } from \"./bar.js\";\n ```\n\n ### Valid\n\n ```js,file=sub/index.js\n // Package-private exports can be imported from inside the same module.\n import { fooPackageVariable } from \"./foo.js\";\n\n // Resources (anything other than JS/TS files) are always exempt.\n import { barResource } from \"../resources/bar.png\";\n\n /** @private */\n export const subPrivateVariable = 2;\n ```\n\n ```js,file=sub/deep/index.js\n // Private exports are accessible within the same module only, but\n // modules can be nested. So the following works because you can always\n // import from the index file of a parent module:\n import { subPrivateVariable } from \"../index.js\";\n ```\n"
          },
          "noProcessGlobal": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noProcessGlobal",
            "link": "https://biomejs.dev/linter/rules/no-process-global",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "denoLint": "no-process-global"
                }
              }
            ],
            "docs": " Disallow the use of `process` global.\n\n Node.js and Deno expose `process` global but they are hard to statically analyze by tools,\n so code should not assume they are available. Instead, `import process from \"node:process\"`.\n\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = process.env.FOO;\n ```\n\n ### Valid\n\n ```js\n import process from \"node:process\";\n\n const foo = process.env.FOO;\n ```\n\n The rule is not able to detect cases where the global object is aliased:\n\n ```js\n const foo = globalThis;\n const bar = foo.process;\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-self-assign"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "self_assignment"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-setter-return"
                }
              }
            ],
            "docs": " Disallow returning a value from a setter\n\n While returning a value from a setter does not produce an error, the returned value is being ignored. Therefore, returning a value from a setter is either unnecessary or a possible error.\n\n Only returning without a value is allowed, as it’s a control flow statement.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A {\n     set foo(x) {\n         return x;\n     }\n }\n ```\n\n ```js,expect_diagnostic\n const b = {\n     set foo(x) {\n         return x;\n     },\n };\n ```\n\n ```js,expect_diagnostic\n const c = {\n     set foo(x) {\n         if (x) {\n             return x;\n         }\n     },\n };\n ```\n\n ### Valid\n\n ```js\n // early-return\n class A {\n     set foo(x) {\n         if (x) {\n             return;\n         }\n     }\n }\n ```\n\n ```js\n // not a setter\n class B {\n   set(x) {\n     return x;\n   }\n }\n ```\n"
          },
          "noSolidDestructuredProps": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noSolidDestructuredProps",
            "link": "https://biomejs.dev/linter/rules/no-solid-destructured-props",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintSolid": "no-destructure"
                }
              }
            ],
            "docs": " Disallow destructuring props inside JSX components in Solid projects.\n\n In Solid, props must be used with property accesses (props.foo) to preserve reactivity.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n let Component = ({}) => <div />;\n ```\n\n ```jsx,expect_diagnostic\n let Component = ({ a: A }) => <div a={A} />;\n ```\n\n ```tsx,expect_diagnostic\n let Component = ({ prop1 }: Props) => <div p1={prop1} />;\n ```\n\n ### Valid\n\n ```jsx\n let Component = (props) => <div />;\n ```\n\n ```jsx\n let Component = (props) => <div a={props.a} />;\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "clippy": "match_str_case_mismatch"
                }
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
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-case-declarations"
                }
              }
            ],
            "docs": " Disallow lexical declarations in `switch` clauses.\n\n Lexical declarations in `switch` clauses are accessible in the entire `switch`.\n However, it only gets initialized when it is assigned, which will only happen if the `switch` clause where it is defined is reached.\n\n To ensure that the lexical declarations only apply to the current `switch` clause wrap your declarations in a block.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n switch (foo) {\n     case 0:\n         const x = 1;\n         break;\n     case 2:\n         x; // `x` can be used while it is not initialized\n         break;\n }\n ```\n\n ```js,expect_diagnostic\n switch (foo) {\n     case 0:\n         function f() {}\n         break;\n     case 2:\n         f(); // `f` can be called here\n         break;\n }\n ```\n\n ```js,expect_diagnostic\n switch (foo) {\n     case 0:\n         class A {}\n         break;\n     default:\n         new A(); // `A` can be instantiated here\n         break;\n }\n ```\n\n ### Valid\n\n ```js\n switch (foo) {\n     case 0: {\n         const x = 1;\n         break;\n     }\n     case 1:\n         // `x` is not visible here\n         break;\n }\n ```\n\n"
          },
          "noUndeclaredDependencies": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noUndeclaredDependencies",
            "link": "https://biomejs.dev/linter/rules/no-undeclared-dependencies",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintImport": "no-extraneous-dependencies"
                }
              }
            ],
            "docs": " Disallow the use of dependencies that aren't specified in the `package.json`.\n\n Indirect dependencies will trigger the rule because they aren't declared in the `package.json`.\n This means that if the package `@org/foo` has a dependency on `lodash`, and then you use\n `import \"lodash\"` somewhere in your project, the rule will trigger a diagnostic for this import.\n\n The rule is meant to catch those dependencies that aren't declared inside the closest `package.json`, and\n isn't meant to detect dependencies declared in other manifest files, e.g. the root `package.json` in a monorepo setting.\n\n The rule ignores imports that are not valid package names.\n This includes internal imports that start with `#` and `@/` and imports with a protocol such as `node:`, `bun:`, `jsr:`, `https:`.\n\n To ensure that Visual Studio Code uses relative imports when it automatically imports a variable,\n you may set [`javascript.preferences.importModuleSpecifier` and `typescript.preferences.importModuleSpecifier`](https://code.visualstudio.com/docs/getstarted/settings) to `relative`.\n\n ## Examples\n\n ### Invalid\n\n ```json,file=package.json\n {\n   \"dependencies\": {}\n }\n ```\n\n ```js,expect_diagnostic,file=index.js\n import \"vite\";\n ```\n\n ### Valid\n\n ```json,file=package.json\n {\n   \"dependencies\": {\n     \"vite\": \"*\"\n   }\n }\n ```\n\n ```js,file=index.js\n import \"vite\"; // package is correctly declared\n\n import assert from \"node:assert\"; // Node imports don't need declaration\n\n import { A } from \"./local.js\"; // relative imports don't trigger the rule\n import { B } from \"#alias\"; // same goes for aliases\n ```\n\n ## Options\n\n This rule supports the following options:\n - `devDependencies`: If set to `false`, then the rule will show an error when `devDependencies` are imported. Defaults to `true`.\n - `peerDependencies`: If set to `false`, then the rule will show an error when `peerDependencies` are imported. Defaults to `true`.\n - `optionalDependencies`: If set to `false`, then the rule will show an error when `optionalDependencies` are imported. Defaults to `true`.\n\n You can set the options like this:\n\n ```json,options\n {\n   \"options\": {\n     \"devDependencies\": false,\n     \"peerDependencies\": false,\n     \"optionalDependencies\": false\n   }\n }\n ```\n\n You can also use an array of globs instead of literal booleans.\n When using an array of globs, the setting will be set to `true` (no errors reported)\n if the name of the file being linted (i.e. not the imported file/module) matches a single glob\n in the array, and `false` otherwise.\n\n ### Example using the `devDependencies` option\n\n In this example, only test files can use dependencies in the\n `devDependencies` section. `dependencies`, `peerDependencies`, and\n `optionalDependencies` are always available.\n\n ```json,options\n {\n   \"options\": {\n     \"devDependencies\": [\"**/tests/*.test.js\", \"**/tests/*.spec.js\"]\n   }\n }\n ```\n\n ```json,file=package.json\n {\n   \"devDependencies\": {\n     \"vite\": \"*\"\n   }\n }\n ```\n\n ```js,expect_diagnostic,use_options,file=src/index.js\n // cannot import from a non-test file\n import \"vite\";\n ```\n\n ```js,use_options,file=tests/foo.test.js\n // this works, because the file matches a glob from the options\n import \"vite\";\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-undef"
                }
              }
            ],
            "docs": " Prevents the usage of variables that haven't been declared inside the document.\n\n If you need to allow-list some global bindings, you can use the [`javascript.globals`](/reference/configuration/#javascriptglobals) configuration.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n foobar;\n ```\n\n ```js,expect_diagnostic\n // throw diagnostic for JavaScript files\n PromiseLike;\n ```\n ### Valid\n\n ```ts\n type B<T> = PromiseLike<T>\n ```\n\n ## Options\n\n ### `checkTypes`\n\n When set to `true`, it checks for undeclared types too.\n The option defaults to `false`.\n\n ```json,options\n {\n     \"options\": {\n         \"checkTypes\": true\n     }\n }\n ```\n\n ```ts,use_options,expect_diagnostic\n type A = number extends infer T ? never : T;\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-unreachable"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-this-before-super"
                }
              }
            ],
            "docs": " Ensures the `super()` constructor is called exactly once on every code  path in a class constructor before `this` is accessed if the class has a superclass\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class A extends B {\n     constructor() {}\n }\n ```\n\n ```js,expect_diagnostic\n class A extends B {\n     constructor(value) {\n         this.prop = value;\n         super();\n     }\n }\n ```\n\n ```js,expect_diagnostic\n class A extends B {\n     constructor(cond) {\n         if(cond) {\n             super();\n         }\n     }\n }\n ```\n\n ### Valid\n\n ```js\n export default class A extends B {\n     constructor() {\n         super();\n     }\n }\n ```\n\n ```js\n export class A {\n     constructor() {}\n }\n ```\n\n"
          },
          "noUnresolvedImports": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noUnresolvedImports",
            "link": "https://biomejs.dev/linter/rules/no-unresolved-imports",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintImport": "named"
                }
              }
            ],
            "docs": " Warn when importing non-existing exports.\n\n Importing a non-existing export is an error at runtime or build time.\n Biome can detect such incorrect imports and report errors for them.\n\n Note that if you use TypeScript, you probably don't want to use this\n rule, since TypeScript already performs such checks for you.\n\n ## Known Limitations\n\n * This rule does not validate imports through dynamic `import()`\n   expressions or CommonJS `require()` calls.\n\n ## Examples\n\n ### Invalid\n\n ```js,file=foo.js\n export function foo() {};\n ```\n\n ```js,expect_diagnostic,file=bar.js\n // Attempt to import symbol with a typo:\n import { fooo } from \"./foo.js\";\n ```\n\n ### Valid\n\n ```js,file=foo.js\n export function foo() {};\n ```\n\n ```js,file=bar.js\n // Fixed typo:\n import { foo } from \"./foo.js\";\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-unsafe-finally"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-unsafe-optional-chaining"
                }
              }
            ],
            "docs": " Disallow the use of optional chaining in contexts where the undefined value is not allowed.\n\n The optional chaining (?.) expression can short-circuit with a return value of undefined.\n Therefore, treating an evaluated optional chaining expression as a function, object, number, etc., can cause TypeError or unexpected results.\n Also, parentheses limit the scope of short-circuiting in chains.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n 1 in obj?.foo;\n ```\n\n ```cjs,expect_diagnostic\n with (obj?.foo);\n ```\n\n ```js,expect_diagnostic\n for (bar of obj?.foo);\n ```\n\n ```js,expect_diagnostic\n bar instanceof obj?.foo;\n ```\n\n ```js,expect_diagnostic\n const { bar } = obj?.foo;\n ```\n\n ```js,expect_diagnostic\n (obj?.foo)();\n ```\n\n ```js,expect_diagnostic\n (baz?.bar).foo;\n ```\n\n ### Valid\n\n ```js\n (obj?.foo)?.();\n obj?.foo();\n (obj?.foo ?? bar)();\n obj?.foo.bar;\n obj.foo?.bar;\n foo?.()?.bar;\n ```\n\n"
          },
          "noUnusedFunctionParameters": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noUnusedFunctionParameters",
            "link": "https://biomejs.dev/linter/rules/no-unused-function-parameters",
            "recommended": true,
            "fixKind": "unsafe",
            "docs": " Disallow unused function parameters.\n\n There is an exception to this rule:\n parameters that starts with underscore, e.g. `function foo(_a, _b) {}`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function foo(myVar) {\n     console.log('foo');\n }\n ```\n\n ```js,expect_diagnostic\n new Promise((accept, reject) => {\n     window.setTimeout(accept, 1000);\n });\n ```\n\n ```js,expect_diagnostic\n const squares = [[1, 1], [2, 4], [3, 9], [4, 16]];\n squares.filter(([k, v]) => v > 5);\n ```\n\n ### Valid\n\n ```js\n function foo(myVar) {\n     console.log(myVar);\n }\n ```\n\n ```js\n function withObjectSpread({ a, ...rest }) {\n\t    return rest;\n }\n ```\n\n ## Options\n\n The rule has the following options\n\n ### `ignoreRestSiblings`\n **Since `v2.1.0`**\n\n Whether to ignore unused variables from an object destructuring with a spread.\n Example: `a` and `b` in `function({ a, b, ...rest }) { return rest;}` should be ignored by this rule when set to false.\n\n Defaults to `true`.\n\n ```json,options\n {\n   \"options\": {\n     \"ignoreRestSiblings\": false\n   }\n }\n ```\n\n ```js,use_options,expect_diagnostic\n function withObjectSpread({ b, ...rest }) {\n\t    return rest;\n }\n ```\n\n\n"
          },
          "noUnusedImports": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noUnusedImports",
            "link": "https://biomejs.dev/linter/rules/no-unused-imports",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnusedImports": "no-unused-imports"
                }
              }
            ],
            "docs": " Disallow unused imports.\n\n Unused imports might be the result of an incomplete refactoring.\n The code fix can remove comments associated with an `import`.\n See the last invalid example.\n\n Note that the leading trivia, e.g., comments or newlines preceding\n the unused imports will also be removed. So that comment directives\n like `@ts-expect-error` won't be transferred to a wrong place.\n\n ## Options\n\n This rule respects the [`jsxRuntime`](https://biomejs.dev/reference/configuration/#javascriptjsxruntime)\n setting and will make an exception for React globals if it is set to\n `\"reactClassic\"`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import A from 'mod';\n ```\n\n ```js,expect_diagnostic\n import * as A from 'mod';\n ```\n\n ```ts,expect_diagnostic\n import { type A, B } from 'mod';\n\n export { B }\n ```\n\n ```ts,expect_diagnostic\n // Header comment\n import /*inner comment */ A from 'mod'; // Associated comment\n ```\n\n ```ts,expect_diagnostic\n // Another header comment\n import {\n     // A's header comment\n     type A, // A's comment\n     // B's header comment\n     B,\n } from 'mod';\n\n export { B }\n ```\n\n ### Valid\n\n ```ts\n import { A, type B } from 'mod';\n\n function f(arg: B): A {\n     return new A(arg);\n }\n ```\n\n One notable exception is when the import is intended to be used for type augmentation.\n\n ```ts\n import type {} from '@mui/lab/themeAugmentation';\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-unused-labels"
                }
              }
            ],
            "docs": " Disallow unused labels.\n\n Labels that are declared and never used are most likely an error due to incomplete refactoring.\n\n The rule ignores reactive Svelte statements in Svelte components.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n LOOP: for (const x of xs) {\n     if (x > 0) {\n         break;\n     }\n     f(x);\n }\n ```\n\n ### Valid\n\n ```js\n LOOP: for (const x of xs) {\n     if (x > 0) {\n         break LOOP;\n     }\n     f(x);\n }\n ```\n\n ```js\n function nonNegative(n) {\n     DEV: assert(n >= 0);\n     return n;\n }\n ```\n\n ```svelte\n <script>\n $: { /* reactive block */ }\n </script>\n ```\n"
          },
          "noUnusedPrivateClassMembers": {
            "deprecated": false,
            "version": "1.3.3",
            "name": "noUnusedPrivateClassMembers",
            "link": "https://biomejs.dev/linter/rules/no-unused-private-class-members",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-unused-private-class-members"
                }
              }
            ],
            "docs": " Disallow unused private class members\n\n Private class members that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring.\n Such class members take up space in the code and can lead to confusion by readers.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class OnlyWrite {\n   #usedOnlyInWrite = 5;\n\n   method() {\n\t    this.#usedOnlyInWrite = 212;\n   }\n }\n ```\n\n ```ts,expect_diagnostic\n  class TsBioo {\n    private unusedProperty = 5;\n  }\n ```\n\n ```ts,expect_diagnostic\n  class TsBioo {\n    private unusedMethod() {}\n  }\n ```\n\n ### Valid\n\n ```js\n class UsedMember {\n   #usedMember = 42;\n\n   method() {\n\t    return this.#usedMember;\n   }\n }\n ```\n\n ## Caveats\n\n The rule currently considers that all TypeScript private members are used if it encounters a computed access.\n In the following example `member` is not reported. It is considered as used.\n\n ```ts\n  class TsBioo {\n    private member: number;\n\n    set_with_name(name: string, value: number) {\n      this[name] = value;\n    }\n  }\n ```\n\n"
          },
          "noUnusedVariables": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnusedVariables",
            "link": "https://biomejs.dev/linter/rules/no-unused-variables",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-unused-vars"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-unused-vars"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnusedImports": "no-unused-vars"
                }
              }
            ],
            "docs": " Disallow unused variables.\n\n There is an exception to this rule: variables that start with underscore, e.g. `let _something;`.\n\n The pattern of having an underscore as a prefix of a variable is a very diffuse\n pattern among programmers, and Biome follows it.\n\n This rule won't report unused imports.\n If you want to report unused imports,\n enable [noUnusedImports](https://biomejs.dev/linter/rules/no-unused-imports/).\n\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let a = 4;\n a++;\n ```\n\n ```js,expect_diagnostic\n function foo() {}\n ```\n\n ```js,expect_diagnostic\n function foo() {\n     foo();\n }\n ```\n\n ```js,expect_diagnostic\n const foo = () => {\n     foo();\n };\n ```\n\n ```ts,expect_diagnostic\n export function f<T>() {}\n ```\n\n ```js,expect_diagnostic\n const { brand } = car;\n ```\n\n ### Valid\n\n ```js\n function foo(b) {\n     console.log(b)\n };\n foo();\n ```\n\n ```js\n export function foo(_unused) {}\n ```\n\n ```ts\n function used_overloaded(): number;\n function used_overloaded(s: string): string;\n function used_overloaded(s?: string) {\n     return s;\n }\n used_overloaded();\n ```\n\n By default, unused variables declared inside destructured objects are ignored\n if the destructuring pattern also contains a rest property.\n (See the [rule options](#options) if you want to enable these checks).\n ```js\n const car = { brand: \"Tesla\", year: 2019, countryCode: \"US\" };\n const { brand, ...rest } = car;\n console.log(rest);\n ```\n\n In Astro files, a top-level interface or a type alias named `Props` is always ignored\n as it's implicitly read by the framework.\n ```astro,ignore\n ---\n interface Props {\n   name: string;\n   greeting?: string;\n }\n\n const { name, greeting } = Astro.props;\n ---\n ```\n\n ## Options\n\n ### `ignoreRestSiblings`\n\n Whether to ignore unused variables declared inside destructured objects\n containing rest properties (such as `const { a, b, ...rest } = obj`.\n\n Default: `true`\n\n #### Example\n\n ```json,options\n {\n   \"options\": {\n     \"ignoreRestSiblings\": false\n   }\n }\n ```\n\n ```js,expect_diagnostic,use_options\n const car = { brand: \"Tesla\", year: 2019, countryCode: \"US\" };\n const { brand, ...other } = car;\n console.log(other);\n ```\n\n ```js,use_options\n const car = { brand: \"Tesla\", year: 2019, countryCode: \"US\" };\n const { brand: _, ...other } = car;\n console.log(other);\n ```\n"
          },
          "noVueDataObjectDeclaration": {
            "deprecated": false,
            "version": "2.1.4",
            "name": "noVueDataObjectDeclaration",
            "link": "https://biomejs.dev/linter/rules/no-vue-data-object-declaration",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintVueJs": "no-deprecated-data-object-declaration"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintVueJs": "no-shared-component-data"
                }
              }
            ],
            "docs": " Enforce that Vue component `data` options are declared as functions.\n\n In Vue 3+, defining `data` as an object is deprecated because it leads to shared mutable state across component instances.\n This rule flags usages of `data: { … }` and offers an automatic fix to convert it into a function returning that object.\n\n See also:\n – Vue Migration Guide – Data Option: https://v3-migration.vuejs.org/breaking-changes/data-option.html :contentReference[oaicite:0]{index=0}\n – ESLint Plugin Vue: `no-deprecated-data-object-declaration`: https://eslint.vuejs.org/rules/no-deprecated-data-object-declaration :contentReference[oaicite:1]{index=1}\n\n ## Examples\n\n ### Invalid\n\n ```js\n // component-local data via function\n export default {\n   /* ✗ BAD */\n   data: { foo: null },\n };\n ```\n\n ```js\n // Composition API helper also deprecated\n defineComponent({\n   /* ✗ BAD */\n   data: { message: 'hi' }\n });\n ```\n\n ```js\n // Vue 3 entrypoint via createApp\n createApp({\n   /* ✗ BAD */\n   data: { active: true }\n }).mount('#app');\n ```\n\n ### Valid\n\n ```js\n // component-local data via function\n export default {\n   /* ✓ GOOD */\n   data() {\n     return { foo: null };\n   }\n };\n ```\n\n ```js\n // global registration with function syntax\n Vue.component('my-comp', {\n   /* ✓ GOOD */\n   data: function () {\n     return { count: 0 };\n   }\n });\n ```\n\n ```js\n // Composition API and createApp entrypoints\n defineComponent({\n   /* ✓ GOOD */\n   data() {\n     return { message: 'hi' };\n   }\n });\n\n createApp({\n   /* ✓ GOOD */\n   data: function() {\n     return { active: true };\n   }\n }).mount('#app');\n ```\n\n"
          },
          "noVueDuplicateKeys": {
            "deprecated": false,
            "version": "2.2.5",
            "name": "noVueDuplicateKeys",
            "link": "https://biomejs.dev/linter/rules/no-vue-duplicate-keys",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "no-dupe-keys"
                }
              }
            ],
            "docs": " Disallow duplicate keys in Vue component data, methods, computed properties, and other options.\n\n This rule prevents the use of duplicate keys across different Vue component options\n such as `props`, `data`, `computed`, `methods`, and `setup`. Even if keys don't conflict\n in the script tag, they may cause issues in the template since Vue allows direct\n access to these keys.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <script>\n export default {\n     props: ['foo'],\n     data() {\n         return {\n             foo: 'bar'\n         };\n     }\n };\n </script>\n ```\n\n ```vue,expect_diagnostic\n <script>\n export default {\n     data() {\n         return {\n             message: 'hello'\n         };\n     },\n     methods: {\n         message() {\n             console.log('duplicate key');\n         }\n     }\n };\n </script>\n ```\n\n ```vue,expect_diagnostic\n <script>\n export default {\n     computed: {\n         count() {\n             return this.value * 2;\n         }\n     },\n     methods: {\n         count() {\n             this.value++;\n         }\n     }\n };\n </script>\n ```\n\n ### Valid\n\n ```vue\n <script>\n export default {\n     props: ['foo'],\n     data() {\n         return {\n             bar: 'baz'\n         };\n     },\n     methods: {\n         handleClick() {\n             console.log('unique key');\n         }\n     }\n };\n </script>\n ```\n\n ```vue\n <script>\n export default {\n     computed: {\n         displayMessage() {\n             return this.message.toUpperCase();\n         }\n     },\n     methods: {\n         clearMessage() {\n             this.message = '';\n         }\n     }\n };\n </script>\n ```\n\n"
          },
          "noVueReservedKeys": {
            "deprecated": false,
            "version": "2.1.3",
            "name": "noVueReservedKeys",
            "link": "https://biomejs.dev/linter/rules/no-vue-reserved-keys",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "no-reserved-keys"
                }
              }
            ],
            "docs": " Disallow reserved keys in Vue component data and computed properties.\n\n Vue reserves certain keys for its internal use. Using these reserved keys\n in data properties, computed properties, methods, or other component options\n can cause conflicts and unpredictable behavior in your Vue components.\n\n This rule prevents the use of Vue reserved keys such as:\n - Keys starting with `$` (e.g., `$el`, `$data`, `$props`, `$refs`, etc.)\n - Keys starting with `_` in data properties (reserved for Vue internals)\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <script>\n export default {\n     data: {\n         $el: '',\n     },\n };\n </script>\n ```\n\n ```vue,expect_diagnostic\n <script>\n export default {\n     data() {\n         return {\n             _foo: 'bar',\n         };\n     },\n };\n </script>\n ```\n\n ```vue,expect_diagnostic\n <script>\n export default {\n     computed: {\n         $data() {\n             return this.someData;\n         },\n     },\n };\n </script>\n ```\n\n ```vue,expect_diagnostic\n <script>\n export default {\n     methods: {\n         $emit() {\n             // This conflicts with Vue's built-in $emit\n         },\n     },\n };\n </script>\n ```\n\n ### Valid\n\n ```vue\n <script>\n export default {\n     data() {\n         return {\n             message: 'Hello Vue!',\n             count: 0,\n         };\n     },\n };\n </script>\n ```\n\n ```vue\n <script>\n export default {\n     computed: {\n         displayMessage() {\n             return this.message;\n         },\n     },\n };\n </script>\n ```\n\n"
          },
          "noVueReservedProps": {
            "deprecated": false,
            "version": "2.1.2",
            "name": "noVueReservedProps",
            "link": "https://biomejs.dev/linter/rules/no-vue-reserved-props",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "no-reserved-props"
                }
              }
            ],
            "docs": " Disallow reserved names to be used as props.\n\n Vue reserves certain prop names for its internal use. Using these reserved names\n as prop names can cause conflicts and unexpected behavior in your Vue components.\n\n This rule prevents the use of the following reserved prop names:\n - `key` - Used by Vue for list rendering and component identification\n - `ref` - Used by Vue for template refs\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <script setup>\n defineProps({\n     ref: String,\n });\n </script>\n ```\n\n ```js,expect_diagnostic\n import {defineComponent} from 'vue';\n\n export default defineComponent({\n     props: [\n         'key',\n     ]\n });\n ```\n\n ```vue,expect_diagnostic\n <script setup lang=\"ts\">\n defineProps<{\n     ref: string,\n }>();\n </script>\n ```\n\n ```vue,expect_diagnostic\n <script>\n export default {\n     props: {\n         key: String,\n     }\n };\n </script>\n ```\n\n ### Valid\n\n ```js\n import {defineComponent} from 'vue';\n\n export default defineComponent({\n     props: ['foo']\n });\n ```\n\n ```vue\n <script setup>\n defineProps({ foo: String });\n </script>\n ```\n\n ```vue\n <script setup lang=\"ts\">\n defineProps<{\n     foo: string,\n     bar: string,\n }>();\n </script>\n ```\n\n ```vue\n <script>\n export default {\n     props: {\n         foo: String,\n         bar: String,\n     }\n };\n </script>\n ```\n\n"
          },
          "noVueSetupPropsReactivityLoss": {
            "deprecated": false,
            "version": "2.2.6",
            "name": "noVueSetupPropsReactivityLoss",
            "link": "https://biomejs.dev/linter/rules/no-vue-setup-props-reactivity-loss",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintVueJs": "no-setup-props-reactivity-loss"
                }
              }
            ],
            "docs": " Disallow destructuring of `props` passed to `setup` in Vue projects.\n\n In Vue's Composition API, props must be accessed as `props.propertyName` to maintain\n reactivity. Destructuring `props` directly in the `setup` function parameters will\n cause the resulting variables to lose their reactive nature.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n export default {\n   setup({ count }) {\n     return () => h('div', count);\n   }\n }\n ```\n\n ### Valid\n\n ```js\n export default {\n   setup(props) {\n     return () => h('div', props.count);\n   }\n }\n ```\n\n"
          },
          "useImportExtensions": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "useImportExtensions",
            "link": "https://biomejs.dev/linter/rules/use-import-extensions",
            "recommended": false,
            "fixKind": "safe",
            "docs": " Enforce file extensions for relative imports.\n\n Browsers, Deno, and Node.js do not natively support importing files\n without extensions from JavaScript modules. This rule enforces the use\n of file extensions for relative imports to make the code more\n consistent -- and correct.\n\n In some cases, tooling can also benefit from explicit file extensions,\n because they do not need to guess which file to resolve.\n\n The rule checks both static imports (`import ... from \"...\"`) as well as\n dynamic imports such as `import(...)` and `require(...)`.\n\n ## Examples\n\n ### Invalid\n\n The following examples assume these imports will resolve to a file with\n an extension. Imports that don't resolve at all will not trigger a\n diagnostic.\n\n ```js\n import \"./foo\";\n ```\n ```js\n import \"./foo/\";\n ```\n ```js\n import \"../\";\n ```\n ```js\n import \"../.\";\n ```\n ```js\n import(\"./foo\");\n ```\n ```js\n require(\"./foo\");\n ```\n\n ### Valid\n\n ```js\n import \"biome\";\n ```\n ```js\n import \"./foo.js\";\n ```\n ```js\n import \"./bar/index.js\";\n ```\n ```js\n import(\"./foo.js\");\n ```\n ```js\n require(\"./foo.js\");\n ```\n\n ## Options\n\n The rule provides the options described below.\n\n ### extensionMappings\n\n A map of file extensions to their suggested replacements. This allows you\n to specify custom mappings for import extensions. For example, you can\n map TypeScript imports to JavaScript extensions.\n\n This is useful if you are bundling your code to JavaScript into a package\n and want to make sure all imports of TypeScript files use the `.js` extension\n instead.\n\n If no mapping is found for a given extension, and the import is missing an extension,\n the rule will suggest using the actual extension of the resolved file.\n\n Default: `{}` (empty object)\n\n ```json,options\n {\n     \"options\": {\n         \"extensionMappings\": {\n             \"ts\": \"js\",\n             \"tsx\": \"js\"\n         }\n     }\n }\n ```\n\n ### forceJsExtensions\n\n Normally, this rule suggests to use the extension of the module that is\n found in your project. For instance, `.ts` or `.tsx` for a TypeScript\n file. If this option is set to `true`, the rule will always suggest to\n use `.js` regardless of the extension in your project.\n\n This is useful if you use the `\"module\": \"node16\"` setting when building\n your code with `tsc`.\n\n Default: `false`\n\n ```json,options\n {\n     \"options\": {\n         \"forceJsExtensions\": true\n     }\n }\n ```\n\n ## Editor Configuration\n\n If you use Visual Studio Code, you can ensure that it adds the file\n extension when automatically importing a variable by configuring\n `javascript.preferences.importModuleSpecifierEnding` and\n `typescript.preferences.importModuleSpecifierEnding`\n in your [settings](https://code.visualstudio.com/docs/getstarted/settings).\n\n ## Caveats\n\n If you are using TypeScript, TypeScript version 5.0 or later is\n required, also make sure to set\n [`allowImportingTsExtensions: true`](https://typescriptlang.org/tsconfig#allowImportingTsExtensions)\n in your `tsconfig.json`.\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "use-isnan"
                }
              }
            ],
            "docs": " Require calls to `isNaN()` when checking for `NaN`.\n\n In JavaScript, `NaN` is a special value of the `Number` type.\n It’s used to represent any of the \"not-a-number\" values represented by the double-precision 64-bit format as specified by the IEEE Standard for Binary Floating-Point Arithmetic.\n\n Because `NaN` is unique in JavaScript by not being equal to anything, including itself, the results of comparisons to `NaN` are confusing:\n - `NaN` === `NaN` or `NaN` == `NaN` evaluate to false\n - `NaN` !== `NaN` or `NaN` != `NaN` evaluate to true\n\n Therefore, use `Number.isNaN()` or global `isNaN()` functions to test whether a value is `NaN`.\n\n Note that `Number.isNaN()` and `isNaN()` [do not have the same behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN#description).\n When the argument to `isNaN()` is not a number, the value is first coerced to a number.\n `Number.isNaN()` does not perform this coercion.\n Therefore, it is a more reliable way to test whether a value is `NaN`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n 123 == NaN\n ```\n\n ```js,expect_diagnostic\n 123 != NaN\n ```\n\n ```js,expect_diagnostic\n switch(foo) { case (NaN): break; }\n ```\n\n ```js,expect_diagnostic\n Number.NaN == \"abc\"\n ```\n\n ### Valid\n\n ```js\n if (Number.isNaN(123) !== true) {}\n\n foo(Number.NaN / 2)\n\n switch(foo) {}\n ```\n\n"
          },
          "useJsonImportAttributes": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useJsonImportAttributes",
            "link": "https://biomejs.dev/linter/rules/use-json-import-attributes",
            "recommended": false,
            "fixKind": "safe",
            "docs": " Enforces the use of `with { type: \"json\" }` for JSON module imports.\n\n ECMAScript modules can import JSON modules. However, the specific import assertion `with { type: \"json\" }`\n is required to inform the JavaScript runtime that the imported file should be parsed as JSON.\n Omitting this assertion can lead to runtime errors or misinterpretation of the imported module.\n\n This rule ensures that all imports of `.json` files include this assertion.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import jsonData from './data.json';\n ```\n\n ```js,expect_diagnostic\n import jsonData from './data.json' with { someOtherAttribute: \"value\" };\n ```\n\n ### Valid\n\n ```js\n import jsonData from './data.json' with { type: \"json\" };\n\n import jsonData from './data.json' with { type: \"json\", other: \"value\" };\n\n import code from './script.js'; // Not a JSON import\n ```\n\n"
          },
          "useParseIntRadix": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useParseIntRadix",
            "link": "https://biomejs.dev/linter/rules/use-parse-int-radix",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "radix"
                }
              }
            ],
            "docs": " Enforce the consistent use of the radix argument when using `parseInt()`.\n\n When using the `parseInt()` function it is common to omit the second argument, the radix, and let the function try to determine from the first argument what type of number it is. By default, `parseInt()` will autodetect decimal and hexadecimal (via `0x` prefix). Prior to ECMAScript 5, `parseInt()` also autodetected octal literals, which caused problems because many developers assumed a leading `0` would be ignored.\n\n This confusion led to the suggestion that you always use the radix parameter to `parseInt()` to eliminate unintended consequences.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n parseInt(\"071\");\n ```\n\n ```js,expect_diagnostic\n parseInt(someValue);\n ```\n\n ```js,expect_diagnostic\n parseInt(\"071\", \"abc\");\n ```\n\n ```js,expect_diagnostic\n parseInt(\"071\", 37);\n ```\n\n ```js,expect_diagnostic\n parseInt();\n ```\n\n ### Valid\n\n ```js\n parseInt(\"071\", 10);\n parseInt(\"071\", 8);\n parseFloat(someValue);\n ```\n\n"
          },
          "useSingleJsDocAsterisk": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useSingleJsDocAsterisk",
            "link": "https://biomejs.dev/linter/rules/use-single-js-doc-asterisk",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsDoc": "no-multi-asterisks"
                }
              }
            ],
            "docs": " Enforce JSDoc comment lines to start with a single asterisk, except for the first one.\n\n This rule ensures that every line in a JSDoc block, except the opening one, starts with exactly one asterisk (`*`).\n Extra asterisks are unnecessary in JSDoc comments and are often introduced by mistake.\n\n Double asterisks (`**`) are still allowed, because they mark the start of bold text.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n /**\n ** Description\n */\n ```\n\n ```js,expect_diagnostic\n /**\n * Description\n * */\n ```\n\n ```js,expect_diagnostic\n /** @ts-ignore **/\n ```\n\n ### Valid\n\n ```js\n /**\n  * Description\n  * @public\n  */\n ```\n\n ```js\n /** @ts-ignore */\n ```\n\n ```js\n /**\n  * **Bold** text\n  */\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "for-direction"
                }
              }
            ],
            "docs": " Enforce \"for\" loop update clause moving the counter in the right direction.\n\n A for loop with a stop condition that can never be reached,\n such as one with a counter that moves in the wrong direction, will run infinitely.\n While there are occasions when an infinite loop is intended, the convention is to construct such loops as while loops.\n More typically, an infinite for loop is a bug.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n for (var i = 0; i < 10; i--) {\n }\n ```\n\n ```js,expect_diagnostic\n for (var i = 10; i >= 0; i++) {\n }\n ```\n\n ```js,expect_diagnostic\n for (var i = 0; i > 10; i++) {\n }\n ```\n\n ### Valid\n\n ```js\n for (var i = 0; i < 10; i++) {\n }\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "valid-typeof"
                }
              }
            ],
            "docs": " This rule checks that the result of a `typeof` expression is compared to a valid value.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n typeof foo === \"strnig\";\n ```\n\n ```js,expect_diagnostic\n typeof foo == \"undefimed\";\n ```\n\n ```js,expect_diagnostic\n typeof bar != \"nunber\";\n ```\n\n ```js,expect_diagnostic\n typeof foo === undefined;\n ```\n\n ```js,expect_diagnostic\n typeof foo == 0;\n ```\n\n ### Valid\n\n ```js\n typeof foo === \"string\";\n ```\n\n ```js\n typeof bar == \"undefined\";\n ```\n\n ```js\n typeof bar === typeof qux;\n ```\n\n ```js\n typeof foo === bar\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "require-yield"
                }
              }
            ],
            "docs": " Require generator functions to contain `yield`.\n\n This rule generates warnings for generator functions that do not have the `yield` keyword.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function* foo() {\n   return 10;\n }\n ```\n\n ### Valid\n ```js\n function* foo() {\n   yield 5;\n   return 10;\n }\n\n function foo() {\n   return 10;\n }\n\n // This rule does not warn on empty generator functions.\n function* foo() { }\n ```\n"
          }
        },
        "nursery": {
          "noAmbiguousAnchorText": {
            "deprecated": false,
            "version": "2.3.10",
            "name": "noAmbiguousAnchorText",
            "link": "https://biomejs.dev/linter/rules/no-ambiguous-anchor-text",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "anchor-ambiguous-text"
                }
              }
            ],
            "docs": " Disallow ambiguous anchor descriptions.\n\n Enforces `<a>` values are not exact matches for the phrases \"click here\", \"here\", \"link\", \"a link\", or \"learn more\".\n Screen readers announce tags as links/interactive, but rely on values for context.\n Ambiguous anchor descriptions do not provide sufficient context for users.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n const Invalid = () => <a>learn more</a>;\n ```\n\n ### Valid\n\n ```jsx\n const Valid = () => <a>documentation</a>;\n ```\n\n ## Options\n\n ### `words`\n\n The words option allows users to modify the strings that can be checked for in the anchor text. Useful for specifying other words in other languages.\n\n Default `[\"click here\", \"here\", \"link\", \"a link\", \"learn more\"]`\n\n ```json,options\n {\n   \"options\": {\n     \"words\": [\"click this\"]\n   }\n }\n ```\n\n #### Invalid\n\n ```jsx,expect_diagnostic,use_options\n const Invalid = () => <a>click this</a>;\n ```\n\n"
          },
          "noConditionalExpect": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "noConditionalExpect",
            "link": "https://biomejs.dev/linter/rules/no-conditional-expect",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "no-conditional-expect"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJest": "no-conditional-expect"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVitest": "no-conditional-expect"
                }
              }
            ],
            "docs": " Disallow conditional `expect()` calls inside tests.\n\n Conditional expectations are problematic because they can silently pass\n when the condition is false, meaning assertions may never actually run.\n This can lead to tests that pass despite bugs in the code.\n\n If you need conditional testing logic, consider:\n - Using `test.skip()` to skip the entire test\n - Splitting into separate tests with clear conditions\n - Using `expect.soft()` for optional assertions\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n test(\"conditional expect\", async ({ page }) => {\n     if (someCondition) {\n         await expect(page).toHaveTitle(\"Title\");\n     }\n });\n ```\n\n ```js,expect_diagnostic\n test(\"ternary expect\", async ({ page }) => {\n     someCondition ? await expect(page).toHaveTitle(\"Title\") : null;\n });\n ```\n\n ```js,expect_diagnostic\n test(\"catch expect\", async ({ page }) => {\n     try {\n         await page.click(\"button\");\n     } catch (e) {\n         await expect(page).toHaveTitle(\"Title\");\n     }\n });\n ```\n\n ### Valid\n\n ```js\n test(\"unconditional expect\", async ({ page }) => {\n     await expect(page).toHaveTitle(\"Title\");\n });\n ```\n\n ```js\n test(\"skip based on condition\", async ({ page }) => {\n     test.skip(someCondition, \"Reason to skip\");\n     await expect(page).toHaveTitle(\"Title\");\n });\n ```\n\n"
          },
          "noContinue": {
            "deprecated": false,
            "version": "2.3.4",
            "name": "noContinue",
            "link": "https://biomejs.dev/linter/rules/no-continue",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-continue"
                }
              }
            ],
            "docs": " Disallow continue statements.\n\n The continue statement terminates execution of the statements in the current iteration of the current or labeled loop, and continues execution of the loop with the next iteration.\n When used incorrectly it makes code less testable, less readable and less maintainable.\n Structured control flow statements such as if should be used instead.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let sum = 0,\n     i;\n\n for(i = 0; i < 10; i++) {\n     if(i >= 5) {\n         continue;\n     }\n\n     sum += i;\n }\n ```\n\n ### Valid\n\n ```js\n let sum = 0,\n     i;\n\n for(i = 0; i < 10; i++) {\n     if(i < 5) {\n         sum += i;\n     }\n }\n ```\n\n"
          },
          "noDivRegex": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "noDivRegex",
            "link": "https://biomejs.dev/linter/rules/no-div-regex",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-div-regex"
                }
              }
            ],
            "docs": " Disallow equal signs explicitly at the beginning of regular expressions.\n\n This rule forbids equal signs (`=`) after the slash (`/`) at the beginning of a regular expression literal,\n because the characters `/=` can be confused with a division assignment operator.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function bar() {\n   return /=foo/;\n }\n ```\n\n ### Valid\n\n ```js\n function bar() {\n   return /[=]foo/;\n }\n ```\n\n"
          },
          "noDuplicateEnumValues": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "noDuplicateEnumValues",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-enum-values",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-duplicate-enum-values"
                }
              }
            ],
            "docs": " Disallow duplicate enum member values.\n\n Although TypeScript supports duplicate enum member values, people usually expect members to have unique values within the same enum.\n Duplicate values can lead to bugs that are hard to track down.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n enum E {\n   A = 0,\n   B = 0,\n }\n ```\n\n ```ts,expect_diagnostic\n enum E {\n   A = \"A\",\n   B = 'A',\n   C = `A`,\n }\n ```\n\n ### Valid\n\n ```ts\n enum E {\n   A = 0,\n   B = 1,\n }\n ```\n\n ```ts\n enum E {\n   A = \"A\",\n   B = 'B',\n   C = `C`,\n }\n ```\n\n"
          },
          "noDuplicatedSpreadProps": {
            "deprecated": false,
            "version": "2.3.8",
            "name": "noDuplicatedSpreadProps",
            "link": "https://biomejs.dev/linter/rules/no-duplicated-spread-props",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "jsx-props-no-spread-multi"
                }
              }
            ],
            "docs": " Disallow JSX prop spreading the same identifier multiple times.\n\n Enforces that any unique expression is only spread once.\n Generally spreading the same expression twice is an indicator of a mistake since any attribute between the spreads may be overridden when the intent was not to.\n Even when that is not the case this will lead to unnecessary computations being performed.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div {...props} something=\"else\" {...props} />\n ```\n\n ### Valid\n\n ```jsx\n <div something=\"else\" {...props} />\n ```\n\n"
          },
          "noEqualsToNull": {
            "deprecated": false,
            "version": "2.3.8",
            "name": "noEqualsToNull",
            "link": "https://biomejs.dev/linter/rules/no-equals-to-null",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-eq-null"
                }
              }
            ],
            "docs": " Require the use of `===` or `!==` for comparison with `null`.\n\n Comparing to `null` with `==` or `!=` may have unintended results as the\n expression evaluates to `true` when comparing `null` to `undefined`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n foo == null;\n ```\n\n ```js,expect_diagnostic\n foo != null;\n ```\n\n ### Valid\n\n ```js\n foo === null;\n ```\n\n ```js\n foo !== null;\n ```\n"
          },
          "noExcessiveClassesPerFile": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "noExcessiveClassesPerFile",
            "link": "https://biomejs.dev/linter/rules/no-excessive-classes-per-file",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "max-classes-per-file"
                }
              }
            ],
            "docs": " Enforce a maximum number of classes per file.\n\n Files containing multiple classes can often result in a less navigable and poorly structured codebase.\n Best practice is to keep each file limited to a single responsibility.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class Foo {}\n class Bar {}\n ```\n\n ### Valid\n\n ```js\n class Foo {}\n ```\n\n ## Options\n\n The following options are available:\n\n ### `maxClasses`\n\n This option sets the maximum number of classes allowed in a file.\n If the file exceeds this limit, a diagnostic will be reported.\n\n Default: `1`\n\n ```json,options\n {\n     \"options\": {\n        \"maxClasses\": 2\n     }\n }\n ```\n\n ```js,expect_diagnostic,use_options\n class Foo {}\n class Bar {}\n class Baz {}\n ```\n\n"
          },
          "noExcessiveLinesPerFile": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "noExcessiveLinesPerFile",
            "link": "https://biomejs.dev/linter/rules/no-excessive-lines-per-file",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslint": "max-lines"
                }
              }
            ],
            "docs": " Restrict the number of lines in a file.\n\n This rule checks the number of lines in a file and reports a diagnostic if it exceeds a specified limit.\n Some people consider large files a code smell. Large files tend to do many things and can make it hard to follow what's going on.\n Many coding style guides dictate a limit of the number of lines that a file can comprise of. This rule can help enforce that style.\n\n ## Examples\n\n ### Invalid\n\n The following example will show a diagnostic when `maxLines` is set to 2:\n\n ```json,options\n {\n     \"options\": {\n        \"maxLines\": 2\n     }\n }\n ```\n ```js,expect_diagnostic,use_options\n const a = 1;\n const b = 2;\n const c = 3;\n ```\n\n ### Valid\n\n ```js\n const a = 1;\n const b = 2;\n ```\n\n ## Options\n\n The following options are available:\n\n ### `maxLines`\n\n This option sets the maximum number of lines allowed in a file.\n If the file exceeds this limit, a diagnostic will be reported.\n\n Default: `300`\n\n When `maxLines: 2`, the following file will be considered invalid:\n ```json,options\n {\n     \"options\": {\n        \"maxLines\": 2\n     }\n }\n ```\n ```js,expect_diagnostic,use_options\n const a = 1;\n const b = 2;\n const c = 3;\n ```\n\n ### `skipBlankLines`\n\n When this option is set to `true`, blank lines are not counted towards the maximum line limit.\n This means that only lines with actual code or comments will be counted.\n\n Default: `false`\n\n When `maxLines: 3` and `skipBlankLines: true`, the following file will be considered valid\n even though it has 5 total lines, because only 3 lines contain code:\n ```json,options\n {\n     \"options\": {\n        \"maxLines\": 3,\n        \"skipBlankLines\": true\n     }\n }\n ```\n ```js,use_options\n const a = 1;\n\n const b = 2;\n\n const c = 3;\n ```\n\n ## Suppressions\n\n If you need to exceed the line limit in a specific file, you can suppress this rule\n at the top of the file:\n\n ```json,options\n {\n     \"options\": {\n         \"maxLines\": 2\n     }\n }\n ```\n ```js,use_options\n // biome-ignore lint/nursery/noExcessiveLinesPerFile: generated file\n const a = 1;\n const b = 2;\n const c = 3;\n ```\n\n"
          },
          "noFloatingClasses": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "noFloatingClasses",
            "link": "https://biomejs.dev/linter/rules/no-floating-classes",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-new"
                }
              }
            ],
            "docs": " Disallow `new` operators outside of assignments or comparisons.\n\n The goal of using `new` with a constructor is typically to create an object of a particular type and store that object in a variable, such as:\n\n ```js\n const person = new Person();\n ```\n\n It's less common to use `new` and not store the result, such as:\n\n ```js,ignore\n new Person();\n ```\n\n In this case, the created object is thrown away because its reference isn't stored anywhere, and in many cases, this means that the constructor should be replaced with a function that doesn't require `new` to be used.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n new Thing();\n ```\n\n ### Valid\n\n ```js\n const thing = new Thing();\n ```\n\n"
          },
          "noForIn": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "noForIn",
            "link": "https://biomejs.dev/linter/rules/no-for-in",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "no-for-in-array"
                }
              }
            ],
            "docs": " Disallow iterating using a for-in loop.\n\n A for-in loop (`for (const i in o)`) iterates over the properties of an Object. While it is legal to use for-in loops with array values, it is not common. There are several potential bugs with this:\n\n 1. It iterates over all enumerable properties, including non-index ones and the entire prototype chain. For example, [`RegExp.prototype.exec`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) returns an array with additional properties, and `for-in` will iterate over them. Some libraries or even your own code may add additional methods to `Array.prototype` (either as polyfill or as custom methods), and if not done properly, they may be iterated over as well.\n 2. It skips holes in the array. While sparse arrays are rare and advised against, they are still possible and your code should be able to handle them.\n 3. The \"index\" is returned as a string, not a number. This can be caught by TypeScript, but can still lead to subtle bugs.\n\n You may have confused for-in with for-of, which iterates over the elements of the array. If you actually need the index, use a regular `for` loop or the `forEach` method.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n for (const i in array) {\n   console.log(i, array[i]);\n }\n ```\n\n ### Valid\n\n ```js\n for (const value of array) {\n   console.log(value);\n }\n ```\n ```js\n for (let i = 0; i < array.length; i += 1) {\n   console.log(i, array[i]);\n }\n ```\n ```js\n array.forEach((value, i) => {\n   console.log(i, value);\n });\n ```\n ```js\n for (const [i, value] of array.entries()) {\n   console.log(i, value);\n }\n ```\n\n"
          },
          "noIncrementDecrement": {
            "deprecated": false,
            "version": "2.3.2",
            "name": "noIncrementDecrement",
            "link": "https://biomejs.dev/linter/rules/no-increment-decrement",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-plusplus"
                }
              }
            ],
            "docs": " Disallows the usage of the unary operators ++ and --.\n\n Because the unary ++ and -- operators are subject to automatic semicolon insertion, differences in whitespace can change semantics of source code.\n\n ```js,expect_diagnostic\n let i = 10;\n let j = 20;\n\n i ++\n j\n // i = 11, j = 20\n ```\n\n ```js,expect_diagnostic\n let i = 10;\n let j = 20;\n\n i\n ++\n j\n // i = 10, j = 21\n ```\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let foo = 0;\n foo++;\n ```\n\n ```js,expect_diagnostic\n let bar = 42;\n bar--;\n ```\n\n ```js,expect_diagnostic\n for (let i = 0; i < 10; i++) {\n     doSomething(i);\n }\n ```\n\n ```js,expect_diagnostic\n for (let i = 0; i < 10;) {\n     doSomething(i);\n     i++;\n }\n ```\n\n ### Valid\n\n ```js\n let foo = 0;\n foo += 1;\n ```\n\n ```js\n let bar = 42;\n bar -= 1;\n ```\n\n ```js\n for (let i = 0; i < 10; i += 1) {\n     doSomething(i);\n }\n ```\n\n ```js\n for (let i = 0; i < 10;) {\n     doSomething(i);\n     i += 1;\n }\n ```\n\n ## Options\n\n ### `allowForLoopAfterthoughts`\n\n Allows unary operators ++ and -- in the afterthought (final expression) of a for loop.\n\n Default `false`\n\n ```json,options\n {\n   \"options\": {\n     \"allowForLoopAfterthoughts\": true\n   }\n }\n ```\n\n #### Invalid\n\n ```js,expect_diagnostic,use_options\n for (let i = 0; i < j; j = i++) {\n     doSomething(i, j);\n }\n ```\n\n ```js,expect_diagnostic,use_options\n for (let i = 10; i--;) {\n     doSomething(i);\n }\n ```\n\n ```js,expect_diagnostic,use_options\n for (let i = 0; i < 10;) i++;\n ```\n\n #### Valid\n\n ```js,use_options\n for (let i = 0; i < 10; i++) {\n     doSomething(i);\n }\n ```\n\n ```js,use_options\n for (let i = 0, j = l; i < l; i++, j--) {\n     doSomething(i, j);\n }\n ```\n\n"
          },
          "noMultiAssign": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "noMultiAssign",
            "link": "https://biomejs.dev/linter/rules/no-multi-assign",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslint": "no-multi-assign"
                }
              }
            ],
            "docs": " Disallow use of chained assignment expressions\n\n Chaining the assignment of variables can lead to unexpected results and\n be difficult to read.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = bar = \"baz\";\n ```\n\n ### Valid\n\n ```js\n const foo = \"baz\";\n const bar = \"baz\";\n ```\n\n"
          },
          "noMultiStr": {
            "deprecated": false,
            "version": "2.3.8",
            "name": "noMultiStr",
            "link": "https://biomejs.dev/linter/rules/no-multi-str",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-multi-str"
                }
              }
            ],
            "docs": " Disallow creating multiline strings by escaping newlines.\n\n Escaping newlines to create multiline strings is discouraged because it\n can lead to subtle errors caused by unexpected whitespace after the\n backslash.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo =\n     \"Line 1\\n\\\n Line 2\";\n ```\n\n ### Valid\n\n ```js\n const foo = \"Line 1\\nLine 2\";\n ```\n\n ```js\n const bar = `Line 1\n Line 2`;\n ```\n"
          },
          "noNestedPromises": {
            "deprecated": false,
            "version": "2.3.15",
            "name": "noNestedPromises",
            "link": "https://biomejs.dev/linter/rules/no-nested-promises",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPromise": "no-nesting"
                }
              }
            ],
            "docs": " Disallow nested `.then()` or `.catch()` promise calls.\n\n Nesting `.then()` or `.catch()` calls defeats the purpose of promises,\n which is to create a flat chain of asynchronous operations. Nested promise\n callbacks can make code harder to read and maintain.\n\n However, nesting is allowed when the nested callback references variables\n from the outer scope, as flattening would break the code in such cases.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n doThing().then(function() { return a.then() })\n ```\n\n ```js,expect_diagnostic\n doThing().then(() => b.catch())\n ```\n\n ```js,expect_diagnostic\n doThing()\n   .then(a => getB(a)\n     .then(b => getC(b))\n   )\n ```\n\n ### Valid\n\n ```js\n // Simple returns\n doThing().then(function() { return 4 })\n doThing().then(() => 4)\n ```\n\n ```js\n // Chained promises (no nesting)\n doThing()\n   .then(a => getB(a))\n   .then(b => getC(b))\n ```\n\n ```js\n // Nested but references outer scope variable 'a'\n doThing()\n   .then(a => getB(a)\n     .then(b => getC(a, b))\n   )\n ```\n\n ```js\n // Promise.resolve/all are fine\n doThing().then(function() { return Promise.all([a,b,c]) })\n doThing().then(() => Promise.resolve(4))\n ```\n\n"
          },
          "noParametersOnlyUsedInRecursion": {
            "deprecated": false,
            "version": "2.3.3",
            "name": "noParametersOnlyUsedInRecursion",
            "link": "https://biomejs.dev/linter/rules/no-parameters-only-used-in-recursion",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "clippy": "only_used_in_recursion"
                }
              }
            ],
            "docs": " Disallow function parameters that are only used in recursive calls.\n\n A parameter that is only passed to recursive calls is effectively unused\n and can be removed or replaced with a constant, simplifying the function.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function factorial(n, acc) {\n     if (n === 0) return 1;\n     return factorial(n - 1, acc);\n }\n ```\n\n ```js,expect_diagnostic\n function countdown(n, step) {\n     if (n === 0) return 0;\n     return countdown(n - step, step);\n }\n ```\n\n ```js,expect_diagnostic\n class Counter {\n     count(n, acc) {\n         if (n === 0) return 0;\n         return this.count(n - 1, acc);\n     }\n }\n ```\n\n ```js,expect_diagnostic\n function fn(n, acc) {\n     if (n === 0) return 0;\n     return fn(n - 1, acc || 0);\n }\n ```\n\n ```js,expect_diagnostic\n class Counter {\n     count(n, acc) {\n         if (n === 0) return 0;\n         return this?.count(n - 1, acc);\n     }\n }\n ```\n\n ### Valid\n\n ```js\n function factorial(n, acc) {\n     if (n === 0) return acc;\n     return factorial(n - 1, acc * n);\n }\n ```\n\n ```js\n function countdown(n, step) {\n     console.log(step);\n     if (n === 0) return 0;\n     return countdown(n - step, step);\n }\n ```\n\n ```js\n function fn(n, threshold) {\n     if (n > threshold) return n;\n     return fn(n + 1, threshold);\n }\n ```\n"
          },
          "noPlaywrightElementHandle": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "noPlaywrightElementHandle",
            "link": "https://biomejs.dev/linter/rules/no-playwright-element-handle",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "no-element-handle"
                }
              }
            ],
            "docs": " Disallow usage of element handles (`page.$()` and `page.$$()`).\n\n Element handles are discouraged in Playwright. Use locators instead, which auto-wait\n and are more reliable. Locators represent a way to find elements at any moment,\n while element handles are references to specific elements that may become stale.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const button = await page.$('button');\n ```\n\n ```js,expect_diagnostic\n const buttons = await page.$$('.btn');\n ```\n\n ```js,expect_diagnostic\n const element = await frame.$('#element');\n ```\n\n ### Valid\n\n ```js\n const button = page.locator('button');\n await button.click();\n ```\n\n ```js\n const buttons = page.locator('.btn');\n await expect(buttons).toHaveCount(3);\n ```\n\n ```js\n await page.getByRole('button', { name: 'Submit' }).click();\n ```\n\n"
          },
          "noPlaywrightEval": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "noPlaywrightEval",
            "link": "https://biomejs.dev/linter/rules/no-playwright-eval",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "no-eval"
                }
              }
            ],
            "docs": " Disallow usage of `page.$eval()` and `page.$$eval()`.\n\n These methods are discouraged in favor of `locator.evaluate()` and `locator.evaluateAll()`.\n Locator-based evaluation is more reliable and follows Playwright's recommended patterns.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n await page.$eval('.foo', el => el.textContent);\n ```\n\n ```js,expect_diagnostic\n const texts = await page.$$eval('.foo', els => els.map(el => el.textContent));\n ```\n\n ### Valid\n\n ```js\n const text = await page.locator('.foo').evaluate(el => el.textContent);\n ```\n\n ```js\n const texts = await page.locator('.foo').evaluateAll(els => els.map(el => el.textContent));\n ```\n\n"
          },
          "noPlaywrightForceOption": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "noPlaywrightForceOption",
            "link": "https://biomejs.dev/linter/rules/no-playwright-force-option",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "no-force-option"
                }
              }
            ],
            "docs": " Disallow usage of the `{ force: true }` option.\n\n Playwright's `force` option bypasses actionability checks and can lead to unreliable tests.\n Instead of using `{ force: true }`, you should fix the underlying issue that requires forcing the action.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n await page.locator('button').click({ force: true });\n ```\n\n ```js,expect_diagnostic\n await page.locator('check').check({ force: true });\n ```\n\n ```js,expect_diagnostic\n await page.locator('input').fill('text', { force: true });\n ```\n\n ### Valid\n\n ```js\n await page.locator('button').click();\n ```\n\n ```js\n await page.locator('check').check();\n ```\n\n ```js\n await page.locator('input').fill('text');\n ```\n\n"
          },
          "noPlaywrightMissingAwait": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "noPlaywrightMissingAwait",
            "link": "https://biomejs.dev/linter/rules/no-playwright-missing-await",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "missing-playwright-await"
                }
              }
            ],
            "docs": " Enforce Playwright async APIs to be awaited or returned.\n\n Playwright has asynchronous matchers and methods that must be properly awaited.\n This rule identifies common mistakes where async Playwright APIs are not properly handled,\n which can lead to false positives in tests.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n test('example', async ({ page }) => {\n     expect(page.getByRole('button')).toBeVisible();\n });\n ```\n\n ```js,expect_diagnostic\n test('example', async ({ page }) => {\n     test.step('step', async () => {});\n });\n ```\n\n ### Valid\n\n ```js\n test('example', async ({ page }) => {\n     await expect(page.getByRole('button')).toBeVisible();\n });\n ```\n\n ```js\n test('example', async ({ page }) => {\n     await test.step('step', async () => {});\n });\n ```\n\n ```js\n test('example', async ({ page }) => {\n     return expect(page.getByRole('button')).toBeVisible();\n });\n ```\n\n"
          },
          "noPlaywrightNetworkidle": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "noPlaywrightNetworkidle",
            "link": "https://biomejs.dev/linter/rules/no-playwright-networkidle",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "no-networkidle"
                }
              }
            ],
            "docs": " Disallow usage of the `networkidle` option.\n\n Using `networkidle` is discouraged in favor of using web-first assertions.\n The `networkidle` event is unreliable and can lead to flaky tests.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n await page.waitForLoadState('networkidle');\n ```\n\n ```js,expect_diagnostic\n await page.goto('https://example.com', { waitUntil: 'networkidle' });\n ```\n\n ### Valid\n\n ```js\n await page.waitForLoadState('load');\n ```\n\n ```js\n await page.goto('https://example.com');\n await page.locator('.content').waitFor();\n ```\n\n"
          },
          "noPlaywrightPagePause": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "noPlaywrightPagePause",
            "link": "https://biomejs.dev/linter/rules/no-playwright-page-pause",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "no-page-pause"
                }
              }
            ],
            "docs": " Disallow using `page.pause()`.\n\n Playwright's `page.pause()` is a debugging utility that should not be committed to version control.\n It pauses test execution and opens the Playwright Inspector, which is useful during development\n but should not be present in production test code.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n await page.pause();\n ```\n\n ```js,expect_diagnostic\n test('example', async ({ page }) => {\n     await page.click('button');\n     await page.pause();\n });\n ```\n\n ### Valid\n\n ```js\n test('example', async ({ page }) => {\n     await page.click('button');\n     await expect(page.locator('.result')).toBeVisible();\n });\n ```\n\n"
          },
          "noPlaywrightUselessAwait": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "noPlaywrightUselessAwait",
            "link": "https://biomejs.dev/linter/rules/no-playwright-useless-await",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "no-useless-await"
                }
              }
            ],
            "docs": " Disallow unnecessary `await` for Playwright methods that don't return promises.\n\n Some Playwright methods are frequently, yet incorrectly, awaited when they return\n synchronous values. This includes locator methods, which return locators (not promises),\n and synchronous expect matchers.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n await page.locator('.my-element');\n ```\n\n ```js,expect_diagnostic\n await page.getByRole('button');\n ```\n\n ```js,expect_diagnostic\n await expect(1).toBe(1);\n ```\n\n ### Valid\n\n ```js\n page.locator('.my-element');\n await page.locator('.my-element').click();\n ```\n\n ```js\n page.getByRole('button');\n await page.getByRole('button').click();\n ```\n\n ```js\n expect(1).toBe(1);\n await expect(page.locator('.foo')).toBeVisible();\n ```\n\n"
          },
          "noPlaywrightWaitForNavigation": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "noPlaywrightWaitForNavigation",
            "link": "https://biomejs.dev/linter/rules/no-playwright-wait-for-navigation",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "no-wait-for-navigation"
                }
              }
            ],
            "docs": " Disallow using `page.waitForNavigation()`.\n\n Playwright's `page.waitForNavigation()` is deprecated and should be replaced with more reliable\n alternatives like `page.waitForURL()` or `page.waitForLoadState()`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n await page.waitForNavigation();\n ```\n\n ```js,expect_diagnostic\n await page.click('button');\n await page.waitForNavigation({ waitUntil: 'networkidle' });\n ```\n\n ### Valid\n\n ```js\n await page.waitForURL('/home');\n ```\n\n ```js\n await page.waitForLoadState('networkidle');\n ```\n\n ```js\n await page.goto('/home');\n ```\n\n"
          },
          "noPlaywrightWaitForSelector": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "noPlaywrightWaitForSelector",
            "link": "https://biomejs.dev/linter/rules/no-playwright-wait-for-selector",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "no-wait-for-selector"
                }
              }
            ],
            "docs": " Disallow using `page.waitForSelector()`.\n\n Playwright's `page.waitForSelector()` is discouraged in favor of more reliable locator-based APIs.\n Using locators with assertions or actions automatically waits for elements to be ready.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n await page.waitForSelector('.submit-button');\n ```\n\n ```js,expect_diagnostic\n await page.waitForSelector('#dialog', { state: 'visible' });\n await page.click('#dialog .button');\n ```\n\n ### Valid\n\n ```js\n await page.locator('.submit-button').click();\n ```\n\n ```js\n await expect(page.locator('#dialog')).toBeVisible();\n ```\n\n ```js\n const button = page.getByRole('button', { name: 'Submit' });\n await button.click();\n ```\n\n"
          },
          "noPlaywrightWaitForTimeout": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "noPlaywrightWaitForTimeout",
            "link": "https://biomejs.dev/linter/rules/no-playwright-wait-for-timeout",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "no-wait-for-timeout"
                }
              }
            ],
            "docs": " Disallow using `page.waitForTimeout()`.\n\n Playwright provides methods like `page.waitForLoadState()`, `page.waitForURL()`,\n and `page.waitForFunction()` which are better alternatives to using hardcoded timeouts.\n These methods wait for specific conditions and are more reliable than arbitrary timeouts.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n await page.waitForTimeout(5000);\n ```\n\n ```js,expect_diagnostic\n await page.waitForTimeout(1000);\n ```\n\n ### Valid\n\n ```js\n await page.waitForLoadState();\n ```\n\n ```js\n await page.waitForURL('/home');\n ```\n\n ```js\n await page.waitForFunction(() => window.innerWidth < 100);\n ```\n\n"
          },
          "noProto": {
            "deprecated": false,
            "version": "2.3.8",
            "name": "noProto",
            "link": "https://biomejs.dev/linter/rules/no-proto",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-proto"
                }
              }
            ],
            "docs": " Disallow the use of the deprecated `__proto__` object property.\n\n [`Object.prototype.__proto__`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)\n is a special accessor used to get or set the prototype of an object. \\\n\n However, it has been **deprecated** since _ECMAScript 2009_, being much slower and much less reliable than its\n modern counterparts [`Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)\n and [`Object.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf).\n\n Since it is a regular property on `Object.prototype`,\n `__proto__` **will not work** on `null`-prototype objects that do not extend from `Object.prototype`\n nor ones having created their own `__proto__` properties via `Object.defineProperty`.\n\n As such, this rule encourages the use of `Object.getPrototypeOf()` and `Object.setPrototypeOf()`\n in lieu of directly accessing `__proto__`.\n\n :::info\n Note that this does **not** check for the use of `__proto__` inside object literal definitions\n to set a newly created object's prototype, \\\n which is standard practice and well-optimized in modern browsers.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n obj.__proto__ = a;\n ```\n\n ```js,expect_diagnostic\n const b = obj.__proto__;\n ```\n\n ### Valid\n\n ```js\n const a = Object.getPrototypeOf(obj);\n ```\n\n ```js\n Object.setPrototypeOf(obj, b);\n ```\n\n ```js\n // This sets `foo`'s prototype to `null` (similar to `Object.create`), and is\n // well-defined across browsers.\n const foo = {\n   __proto__: null,\n   a: 1,\n }\n ```\n"
          },
          "noRedundantDefaultExport": {
            "deprecated": false,
            "version": "2.3.14",
            "name": "noRedundantDefaultExport",
            "link": "https://biomejs.dev/linter/rules/no-redundant-default-export",
            "recommended": false,
            "fixKind": "none",
            "docs": " Checks if a default export exports the same symbol as a named export.\n\n This rule warns when a `default` export references the same identifier as a named export.\n Re-exports are out of scope.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n export const foo = 42;\n export default foo;\n ```\n\n ### Valid\n\n ```js\n export const foo = 42;\n export default 42;\n ```\n\n"
          },
          "noReturnAssign": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "noReturnAssign",
            "link": "https://biomejs.dev/linter/rules/no-return-assign",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-return-assign"
                }
              }
            ],
            "docs": " Disallow assignments in return statements.\n\n In return statements, it is common to mistype a comparison operator (such as `==`) as an assignment operator (such as `=`).\n Moreover, the use of assignments in a return statement is confusing.\n Return statements are often considered side-effect free.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function f(a) {\n     return a = 1;\n }\n ```\n\n ### Valid\n\n ```js\n function f(a) {\n     a = 1;\n     return a;\n }\n ```\n\n ```js\n function f(a) {\n     return a == 1;\n }\n ```\n\n"
          },
          "noScriptUrl": {
            "deprecated": false,
            "version": "2.3.9",
            "name": "noScriptUrl",
            "link": "https://biomejs.dev/linter/rules/no-script-url",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-script-url"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "jsx-no-script-url"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintQwik": "jsx-no-script-url"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintSolid": "jsx-no-script-url"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactXyz": "dom-no-script-url"
                }
              }
            ],
            "docs": " Disallow `javascript:` URLs.\n\n Using `javascript:` URLs is considered a form of `eval` and can be a security risk.\n These URLs can execute arbitrary JavaScript code, which can lead to cross-site scripting (XSS) vulnerabilities.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <a href=\"javascript:void(0)\">Click me</a>\n ```\n\n ```jsx,expect_diagnostic\n <a href=\"javascript:alert('XSS')\">Click me</a>\n ```\n\n ```js,expect_diagnostic\n React.createElement('a', { href: 'javascript:void(0)' });\n ```\n\n ### Valid\n\n ```jsx\n <a href=\"https://example.com\">Click me</a>\n ```\n\n ```jsx\n <a href=\"/path/to/page\">Click me</a>\n ```\n\n ```jsx\n <a href=\"#section\">Click me</a>\n ```\n\n"
          },
          "noShadow": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noShadow",
            "link": "https://biomejs.dev/linter/rules/no-shadow",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-shadow"
                }
              }
            ],
            "docs": " Disallow variable declarations from shadowing variables declared in the outer scope.\n\n Shadowing is the process by which a local variable shares the same name as a variable in its containing scope. This can cause confusion while reading the code and make it impossible to access the global variable.\n\n See also: [`noShadowRestrictedNames`](http://biomejs.dev/linter/rules/no-shadow-restricted-names)\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = \"bar\";\n if (true) {\n    const foo = \"baz\";\n }\n ```\n\n Variable declarations in functions can shadow variables in the outer scope:\n\n ```js,expect_diagnostic\n const foo = \"bar\";\n const bar = function () {\n     const foo = 10;\n }\n ```\n\n Function argument names can shadow variables in the outer scope:\n\n ```js,expect_diagnostic\n const foo = \"bar\";\n function bar(foo) {\n     foo = 10;\n }\n ```\n\n ### Valid\n\n ```js\n const foo = \"bar\";\n if (true) {\n    const qux = \"baz\";\n }\n ```\n\n"
          },
          "noSyncScripts": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "noSyncScripts",
            "link": "https://biomejs.dev/linter/rules/no-sync-scripts",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "no-sync-scripts"
                }
              }
            ],
            "docs": " Prevent the usage of synchronous scripts.\n\n A synchronous script can impact your webpage performance, read more on how to [Efficiently load third-party JavaScript](https://web.dev/articles/efficiently-load-third-party-javascript).\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n const Invalid = () => <script src=\"https://third-party-script.js\" />;\n ```\n\n ### Valid\n\n ```jsx\n const Valid = () => {\n   return (\n     <>\n       <script src=\"https://third-party-script.js\" async />\n       <script src=\"https://third-party-script.js\" defer />\n       <script src=\"https://third-party-script.js\" type=\"module\" />\n     </>\n   );\n }\n ```\n\n #### Next.js\n\n ```jsx\n import Script from 'next/script'\n\n const Valid = () => <Script src=\"https://third-party-script.js\" />;\n ```\n\n"
          },
          "noTernary": {
            "deprecated": false,
            "version": "2.3.8",
            "name": "noTernary",
            "link": "https://biomejs.dev/linter/rules/no-ternary",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-ternary"
                }
              }
            ],
            "docs": " Disallow ternary operators.\n\n The ternary operator is used to conditionally assign a value to a variable.\n Some believe that the use of ternary operators leads to unclear code.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = isBar ? baz : qux;\n ```\n\n ### Valid\n\n ```js\n let foo;\n\n if (isBar) {\n \tfoo = baz;\n } else {\n \tfoo = qux;\n }\n ```\n\n"
          },
          "noUndeclaredEnvVars": {
            "deprecated": false,
            "version": "2.3.10",
            "name": "noUndeclaredEnvVars",
            "link": "https://biomejs.dev/linter/rules/no-undeclared-env-vars",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTurbo": "no-undeclared-env-vars"
                }
              }
            ],
            "docs": " Disallow the use of undeclared environment variables.\n\n In Turborepo projects, environment variables used in tasks must be declared\n in the `turbo.json(c)` configuration file to ensure proper caching behavior.\n Using undeclared environment variables can lead to incorrect cache hits\n and unpredictable build behavior.\n\n This rule checks for environment variable accesses in the following patterns:\n - `process.env.VAR_NAME` and `process.env[\"VAR_NAME\"]`\n - `import.meta.env.VAR_NAME` and `import.meta.env[\"VAR_NAME\"]`\n - `Bun.env.VAR_NAME` and `Bun.env[\"VAR_NAME\"]`\n - `Deno.env.get(\"VAR_NAME\")`\n\n It validates them against:\n 1. Environment variables declared in `turbo.json(c)` (`globalEnv`, `globalPassThroughEnv`, task-level `env`, and task-level `passThroughEnv`)\n 2. Environment variables specified in the rule's `allowedEnvVars` option\n 3. Default allowed variables (common system vars and framework-specific patterns)\n\n ## Default Allowed Variables\n\n The following environment variables are always allowed without explicit declaration:\n\n **System variables:**\n - `CI`, `HOME`, `PATH`, `PWD`, `SHELL`, `TZ`, `USER`\n\n **Node.js:**\n - `NODE_ENV`\n\n **Framework and provider-specific patterns (all variables matching these prefixes):**\n - `NEXT_PUBLIC_*` (Next.js)\n - `VITE_*` (Vite)\n - `REACT_APP_*` (Create React App)\n - `VUE_APP_*` (Vue CLI)\n - `NUXT_*` (Nuxt)\n - `GATSBY_*` (Gatsby)\n - `EXPO_PUBLIC_*` (Expo)\n - `VERCEL`, `VERCEL_*` (Vercel)\n\n ## Examples\n\n ### Invalid\n\n When `MY_VAR` is not declared in `turbo.json` or the allowed list:\n\n ```js,ignore\n const value = process.env.MY_VAR;\n ```\n\n ### Valid\n\n ```js\n // NODE_ENV is always allowed\n const value = process.env.NODE_ENV;\n ```\n\n ## Options\n\n Use the options to specify additional environment variables that are not declared in `globalEnv`,\n `globalPassThroughEnv`, or task-level `env`/`passThroughEnv` in `turbo.json`.\n Supports regular expression patterns (anchors `^` and `$` are implicit).\n\n ```json,options\n {\n     \"options\": {\n         \"allowedEnvVars\": [\"MY_APP_.*\", \"ACME_TOKEN\"]\n     }\n }\n ```\n\n"
          },
          "noUnnecessaryConditions": {
            "deprecated": false,
            "version": "2.1.4",
            "name": "noUnnecessaryConditions",
            "link": "https://biomejs.dev/linter/rules/no-unnecessary-conditions",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "no-unnecessary-condition"
                }
              }
            ],
            "docs": " Disallow unnecessary type-based conditions that can be statically determined as redundant.\n\n This rule detects if expressions inside conditions are statically inferrable and yield\n falsy or truthy values that don't change during the life cycle of the program.\n\n ## Examples\n\n ### Invalid\n\n ```ts\n function head<T>(items: T[]) {\n   if (items) {  // This check is unnecessary\n     return items[0].toUpperCase();\n   }\n }\n ```\n\n ```ts\n function foo(arg: 'bar' | 'baz') {\n   if (arg) {  // This check is unnecessary\n   }\n }\n ```\n\n ```ts\n function bar(arg: string) {\n   return arg?.length;  // ?. is unnecessary\n }\n ```\n\n Contrary to the source rule, this rule doesn't trigger bindings that are assigned to multiple\n values. In the following example, the variable `greeting` is assigned to multiple values; hence\n it can't be inferred to a truthy or falsy value.\n\n ```ts\n let greeting = false;\n\n function changeGreeting() {\n     greeting = \"Hello World!\"\n }\n\n if (greeting) {} // rule not triggered here\n\n ```\n\n\n ### Valid\n\n ```ts\n function head<T>(items: T[] | null) {\n   if (items) {  // This check is necessary\n     return items[0].toUpperCase();\n   }\n }\n ```\n\n ```ts\n function foo(arg: 'bar' | 'baz' | null) {\n   if (arg) {  // This check is necessary\n   }\n }\n ```\n\n ```ts\n function bar(arg: string | undefined) {\n   return arg?.length;  // ?. is necessary\n }\n ```\n\n"
          },
          "noUselessReturn": {
            "deprecated": false,
            "version": "2.3.15",
            "name": "noUselessReturn",
            "link": "https://biomejs.dev/linter/rules/no-useless-return",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslint": "no-useless-return"
                }
              }
            ],
            "docs": " Disallow redundant return statements.\n\n A `return;` statement with nothing after it is redundant when it is the\n last reachable statement in a function body. Removing it does not change\n the function's behavior, as execution naturally falls through to the end.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function foo() {\n     return;\n }\n ```\n\n ```js,expect_diagnostic\n function foo() {\n     doSomething();\n     return;\n }\n ```\n\n ```js,expect_diagnostic\n function foo() {\n     if (condition) {\n         bar();\n         return;\n     }\n }\n ```\n\n ### Valid\n\n ```js\n function foo() {\n     return 5;\n }\n ```\n\n ```js\n function foo() {\n     if (condition) {\n         return;\n     }\n     bar();\n }\n ```\n\n ```js\n function foo() {\n     for (const x of xs) {\n         return;\n     }\n }\n ```\n\n"
          },
          "noVueArrowFuncInWatch": {
            "deprecated": false,
            "version": "2.3.14",
            "name": "noVueArrowFuncInWatch",
            "link": "https://biomejs.dev/linter/rules/no-vue-arrow-func-in-watch",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "no-arrow-functions-in-watch"
                }
              }
            ],
            "docs": " Disallows using arrow functions when defining a watcher.\n\n When using the Options API in Vue.js, defining watchers with arrow functions is discouraged. This is because arrow functions bind to their parent context, which means that the `this` keyword inside the arrow function does not refer to the Vue instance as expected. Instead, it refers to the context in which the arrow function was defined, which can be confusing.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <script>\n export default {\n   watch: {\n     foo: (val, oldVal) => {\n       console.log('new: %s, old: %s', val, oldVal)\n     }\n   }\n }\n </script>\n ```\n\n ```vue,expect_diagnostic\n <script>\n export default {\n   watch: {\n     foo: {\n       handler: (val, oldVal) => {\n         console.log('new: %s, old: %s', val, oldVal)\n       }\n     }\n   }\n }\n </script>\n ```\n\n ### Valid\n\n ```vue\n <script>\n export default {\n   watch: {\n     a: function (val, oldVal) {\n       console.log('new: %s, old: %s', val, oldVal)\n     },\n     b: 'someMethod',\n     c: {\n       handler: function (val, oldVal) { /* ... */ },\n       deep: true\n     },\n     d: {\n       handler: 'someMethod',\n       immediate: true\n     },\n     e: [\n       'handle1',\n       function handle2 (val, oldVal) { /* ... */ },\n       {\n         handler: function handle3 (val, oldVal) { /* ... */ },\n         /* ... */\n       }\n     ],\n     'e.f': function (val, oldVal) { /* ... */ }\n   }\n }\n </script>\n ```\n\n References:\n - https://vuejs.org/api/options-state.html#watch\n\n"
          },
          "noVueOptionsApi": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "noVueOptionsApi",
            "link": "https://biomejs.dev/linter/rules/no-vue-options-api",
            "recommended": false,
            "fixKind": "none",
            "docs": " Disallow the use of Vue Options API.\n\n Vue 3.6's Vapor Mode does not support the Options API.\n Components must use the Composition API (`<script setup>` or `defineComponent` with function signature) instead.\n\n This rule helps prepare codebases for Vapor Mode by detecting Options API\n patterns that are incompatible with the new rendering mode.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <script>\n export default {\n   data() {\n     return { count: 0 }\n   }\n }\n </script>\n ```\n\n ```vue,expect_diagnostic\n <script>\n export default {\n   methods: {\n     increment() {\n       this.count++\n     }\n   }\n }\n </script>\n ```\n\n ```vue,expect_diagnostic\n <script>\n export default {\n   computed: {\n     doubled() {\n       return this.count * 2\n     }\n   }\n }\n </script>\n ```\n\n ```vue,expect_diagnostic\n <script>\n export default {\n   mounted() {\n     console.log('Component mounted')\n   }\n }\n </script>\n ```\n\n ```js,expect_diagnostic\n import { defineComponent } from 'vue'\n\n defineComponent({\n   name: 'MyComponent',\n   data() {\n     return { count: 0 }\n   }\n })\n ```\n\n ### Valid\n\n ```vue\n <script setup>\n import { ref } from 'vue'\n const count = ref(0)\n </script>\n ```\n\n ```vue\n <script setup>\n import { ref, computed } from 'vue'\n\n const count = ref(0)\n const doubled = computed(() => count.value * 2)\n </script>\n ```\n\n ```vue\n <script setup>\n import { onMounted } from 'vue'\n\n onMounted(() => {\n   console.log('Component mounted')\n })\n </script>\n ```\n\n ## Related Rules\n\n - [useVueVapor](https://biomejs.dev/linter/rules/use-vue-vapor): Enforces the use of Vapor mode in Vue components\n\n ## Resources\n\n - [Vue 3 Composition API](https://vuejs.org/api/composition-api-setup.html)\n - [Options API vs Composition API](https://vuejs.org/guide/introduction.html#api-styles)\n\n"
          },
          "noVueRefAsOperand": {
            "deprecated": false,
            "version": "next",
            "name": "noVueRefAsOperand",
            "link": "https://biomejs.dev/linter/rules/no-vue-ref-as-operand",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "no-ref-as-operand"
                }
              }
            ],
            "docs": " Disallow the use of value wrapped by `ref()`(Composition API) as operand\n \n To access value wrapped by `ref()`, you must use `.value`.\n\n ## Examples\n\n ### Invalid\n \n ```js,expect_diagnostic\n import { ref } from \"vue\"\n \n const count = ref(0)\n count++\n ```\n \n ```js,expect_diagnostic\n import { ref } from \"vue\"\n \n const ok = ref(false)\n const msg = ok ? \"yes\" : \"no\"\n ```\n \n ```js,expect_diagnostic\n import { ref } from \"vue\"\n \n const ok = ref(false)\n if (ok) {\n   //\n }\n ```\n \n ```js,expect_diagnostic\n import { ref } from \"vue\"\n \n export default {\n   setup(_props, { emit }) {\n     const count = ref(0)\n     emit('increment', count)\n   }\n }\n ```\n\n ### Valid\n \n ```js\n import { ref } from \"vue\"\n \n const count = ref(0)\n count.value++\n ```\n \n ```js\n import { ref } from \"vue\"\n \n const ok = ref(true)\n const msg = ok.value ? \"yes\" : \"no\"\n if (ok.value) {\n   //\n }\n ```\n \n ```js\n import { ref } from \"vue\"\n \n export default {\n   setup(_props, { emit }) {\n     const count = ref(0)\n     emit('increment', count.value)\n   }\n }\n ```\n \n"
          },
          "useArraySome": {
            "deprecated": false,
            "version": "next",
            "name": "useArraySome",
            "link": "https://biomejs.dev/linter/rules/use-array-some",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintUnicorn": "prefer-array-some"
                }
              }
            ],
            "docs": " Prefer `Array.prototype.some()` over verbose existence checks.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n array.filter(predicate).length > 0;\n ```\n\n ```js,expect_diagnostic\n array.findIndex(predicate) !== -1;\n ```\n\n ```js,expect_diagnostic\n if (array.find(predicate)) {}\n ```\n\n ```js,expect_diagnostic\n array.find(predicate) != null;\n ```\n\n ```js,expect_diagnostic\n array.findLastIndex(predicate) !== -1;\n ```\n\n ```js,expect_diagnostic\n if (array.findLast(predicate)) {}\n ```\n\n ### Valid\n\n ```js\n array.some(predicate);\n ```\n\n"
          },
          "useArraySortCompare": {
            "deprecated": false,
            "version": "2.3.5",
            "name": "useArraySortCompare",
            "link": "https://biomejs.dev/linter/rules/use-array-sort-compare",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "require-array-sort-compare"
                }
              }
            ],
            "docs": " Require Array#sort and Array#toSorted calls to always provide a compareFunction.\n\n When called without a compare function, Array#sort() and Array#toSorted() converts all non-undefined array elements into strings and then compares said strings based off their UTF-16 code units [ECMA specification](https://262.ecma-international.org/9.0/#sec-sortcompare).\n\n The result is that elements are sorted alphabetically, regardless of their type. For example, when sorting numbers, this results in a \"10 before 2\" order:\n\n ```ts,file=example.ts,ignore\n [1, 2, 3, 10, 20, 30].sort(); //→ [1, 10, 2, 20, 3, 30]\n ```\n\n This rule reports on any call to the sort methods that do not provide a compare argument.\n\n ## Examples\n\n ### Invalid\n\n ```ts,file=invalid.ts,expect_diagnostic\n const array: any[] = [];\n array.sort();\n ```\n\n ### Valid\n\n ```ts,file=valid.ts\n const array: any[] = [];\n array.sort((a, b) => a - b);\n ```\n\n"
          },
          "useAwaitThenable": {
            "deprecated": false,
            "version": "2.3.9",
            "name": "useAwaitThenable",
            "link": "https://biomejs.dev/linter/rules/use-await-thenable",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "use-await-thenable"
                }
              }
            ],
            "docs": " Enforce that `await` is _only_ used on `Promise` values.\n\n :::caution\n At the moment, this rule only checks for instances of the global\n `Promise` class. This is a major shortcoming compared to the ESLint\n rule if you are using custom `Promise`-like implementations such as\n [Bluebird](http://bluebirdjs.com/) or in-house solutions.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic,file=invalid-primitive.js\n await 'value';\n ```\n\n ```js,expect_diagnostic,file=invalid-function-call.js\n const createValue = () => 'value';\n await createValue();\n ```\n\n ### Valid\n\n ```js,file=valid-examples.js\n await Promise.resolve('value');\n\n const createValue = async () => 'value';\n await createValue();\n ```\n\n"
          },
          "useDestructuring": {
            "deprecated": false,
            "version": "2.3.9",
            "name": "useDestructuring",
            "link": "https://biomejs.dev/linter/rules/use-destructuring",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "prefer-destructuring"
                }
              }
            ],
            "docs": " Require destructuring from arrays and/or objects\n\n With JavaScript ES6, a new syntax was added for creating variables from an array index or object property,\n called destructuring. This rule enforces usage of destructuring instead of accessing a property through a member expression.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var foo = array[0];\n ```\n\n ```js,expect_diagnostic\n var bar = foo.bar;\n ```\n\n\n ### Valid\n\n ```js\n var [foo] = array;\n ```\n\n ```js\n var { bar } = foo;\n ```\n\n ```ts\n // Variables with type annotations are ignored\n const foo: string = object.foo;\n ```\n\n"
          },
          "useErrorCause": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "useErrorCause",
            "link": "https://biomejs.dev/linter/rules/use-error-cause",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "preserve-caught-error"
                }
              }
            ],
            "docs": " Enforce that `new Error()` is thrown with the original error as `cause`.\n\n When catching and rethrowing an error, it's recommended to wrap the original error in a new `Error` object to preserve the original error's stack trace and context. The original error should be passed as the `cause` property of the new `Error` object.\n\n This rule enforces that practice, helping to maintain a clear and traceable error propagation chain, which is crucial for effective debugging.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n try {\n   // ...\n } catch (err) {\n   throw new Error(err.message);\n }\n ```\n\n ```js,expect_diagnostic\n try {\n     doSomething();\n } catch {\n     throw new Error(\"Something went wrong\");\n }\n ```\n\n ```js,expect_diagnostic\n try {\n   // ...\n } catch ({ message }) {\n   throw new Error(message);\n }\n ```\n\n Cause error is being shadowed by a closer scoped redeclaration.\n ```js,expect_diagnostic\n try {\n     doSomething();\n } catch (error) {\n     if (whatever) {\n         const error = anotherError; // This declaration shadows the caught error.\n         throw new Error(\"Something went wrong\", { cause: error });\n     }\n }\n ```\n\n ### Valid\n\n ```js\n try {\n   // ...\n } catch (err) {\n   throw new Error(\"Something went wrong\", { cause: err });\n }\n\n try {\n     throw \"Not a rethrow, so it's ignored when nested\";\n } catch (err) {\n     const fn = () => {\n         throw new Error(\"New unrelated error\");\n     }\n     fn();\n }\n ```\n\n ## Options\n\n The following options are available:\n\n ### `requireCatchParameter`\n\n If `true`, the rule will report a diagnostic for a `throw` statement inside an empty `catch {}` block, recommending that the error be caught in a parameter.\n\n Default: `true`\n\n ```json,options\n {\n     \"options\": {\n         \"requireCatchParameter\": false\n     }\n }\n ```\n\n This option is enabled by default, meaning the following code is considered invalid:\n\n ```js,expect_diagnostic\n try {\n     doSomething();\n } catch {\n     throw new Error(\"Something went wrong\");\n }\n ```\n\n To disable this check, you would set the option to `false`:\n\n ```js,use_options\n try {\n     doSomething();\n } catch {\n     throw new Error(\"Something went wrong\");\n }\n ```\n\n"
          },
          "useExhaustiveSwitchCases": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useExhaustiveSwitchCases",
            "link": "https://biomejs.dev/linter/rules/use-exhaustive-switch-cases",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "switch-exhaustiveness-check"
                }
              }
            ],
            "docs": " Require switch-case statements to be exhaustive.\n\n When working with union types in TypeScript, it's common to want to write a switch statement\n intended to contain a case for each possible variant.\n However, if the union type changes, it's easy to forget to modify the cases to account for\n any new types.\n\n This rule reports when a switch statement over a value typed as a union of literals lacks\n a case for any of those literal types and does not have a default clause.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic,file=invalid.ts\n type Day =\n   | 'Monday'\n   | 'Tuesday'\n   | 'Wednesday'\n   | 'Thursday'\n   | 'Friday'\n   | 'Saturday'\n   | 'Sunday';\n\n declare const day: Day;\n let result = 0;\n\n switch (day) {\n   case 'Monday':\n     result = 1;\n     break;\n }\n ```\n\n ### Valid\n\n ```ts,file=valid.ts\n type Day =\n   | 'Monday'\n   | 'Tuesday'\n   | 'Wednesday'\n   | 'Thursday'\n   | 'Friday'\n   | 'Saturday'\n   | 'Sunday';\n\n declare const day: Day;\n let result = 0;\n\n switch (day) {\n   case 'Monday':\n     result = 1;\n     break;\n   case 'Tuesday':\n     result = 2;\n     break;\n   case 'Wednesday':\n     result = 3;\n     break;\n   case 'Thursday':\n     result = 4;\n     break;\n   case 'Friday':\n     result = 5;\n     break;\n   case 'Saturday':\n     result = 6;\n     break;\n   case 'Sunday':\n     result = 7;\n     break;\n }\n ```\n\n"
          },
          "useExpect": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "useExpect",
            "link": "https://biomejs.dev/linter/rules/use-expect",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "expect-expect"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJest": "expect-expect"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVitest": "expect-expect"
                }
              }
            ],
            "docs": " Ensure that test functions contain at least one `expect()` or similar assertion.\n\n Tests without assertions may pass even when behavior is broken, leading to\n false confidence in the test suite. This rule ensures that every test\n validates some expected behavior using `expect()` or an allowed variant thereof.\n \n ### Allowed `expect` variants\n \n - [`assert`](https://www.chaijs.com/api/assert/)\n - [`expectTypeOf`](https://github.com/mmkal/expect-type)\n - [`assertType`](https://vitest.dev/api/assert-type)\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n test(\"no assertion\", async ({ page }) => {\n     await page.goto(\"/\");\n     await page.click(\"button\");\n });\n ```\n\n ### Valid\n\n ```js\n test(\"has assertion\", async ({ page }) => {\n     await page.goto(\"/\");\n     await expect(page).toHaveTitle(\"Title\");\n });\n ```\n\n ```js\n it(\"soft assertion\", async ({ page }) => {\n     await page.goto(\"/\");\n     await expect.soft(page.locator(\"h1\")).toBeVisible();\n });\n ```\n \n Variant assertions are allowed:\n ```js\n it(\"returns bar when passed foo\", () => {\n   assert(myFunc(\"foo\") === \"bar\", \"didn't return bar\");\n });\n ```\n\n ```ts\n it(\"should allow passing 'foo' as an argument\", () => {\n   expectTypeOf(myFunc).toBeCallableWith(\"foo\");\n });\n ```\n ```ts\n it(\"should have proper type\", () => {\n   assertType<(n: string) => string>(myFunc);\n });\n ```\n (This replicates the rule's behavior in eslint-plugin-vitest with `typecheck` set to `true`.)\n\n"
          },
          "useFind": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "useFind",
            "link": "https://biomejs.dev/linter/rules/use-find",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "prefer-find"
                }
              }
            ],
            "docs": " Enforce the use of Array.prototype.find() over Array.prototype.filter() followed by [0] when looking for a single result.\n\n When searching for the first item in an array matching a condition, it may be tempting to use code like `arr.filter(x => x > 0)[0]`.\n However, it is simpler to use `Array.prototype.find()` instead, `arr.find(x => x > 0)`, which also returns the first entry matching a condition.\n Because the `.find()` only needs to execute the callback until it finds a match, it's also more efficient.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic,file=invalid.ts\n [1, 2, 3].filter(x => x > 1)[0];\n ```\n\n ```ts,expect_diagnostic,file=invalid2.ts\n [1, 2, 3].filter(x => x > 1).at(0);\n ```\n\n ### Valid\n\n ```ts,file=valid.ts\n [1, 2, 3].find(x => x > 1);\n ```\n\n"
          },
          "useGlobalThis": {
            "deprecated": false,
            "version": "2.3.14",
            "name": "useGlobalThis",
            "link": "https://biomejs.dev/linter/rules/use-global-this",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "prefer-global-this"
                }
              }
            ],
            "docs": " Enforce the use of `globalThis` over `window`, `self`, and `global`.\n\n `globalThis` is a standard way to access the global object across platforms such as browsers, Web Workers, Node.js and so on, and using it can make your code portable.\n\n However, there are several exceptions that are allowed:\n\n 1. Certain window/Web Workers-specific APIs, such as `window.innerHeight` and `self.postMessage`\n 2. Window-specific events, such as `window.addEventListener('resize')`\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n window.foo;\n ```\n\n ```js,expect_diagnostic\n window.addEventListener('click', () => {});\n ```\n\n ### Valid\n\n ```js\n globalThis.foo;\n ```\n\n ```js\n globalThis.addEventListener('click', () => {});\n ```\n\n ```js\n // window/Web Workers-specific APIs are allowed\n window.innerWidth;\n self.postMessage({ type: 'ready' });\n ```\n\n ```js\n // window-specific events are allowed\n window.addEventListener('resize', () => {});\n ```\n\n"
          },
          "useNamedCaptureGroup": {
            "deprecated": false,
            "version": "next",
            "name": "useNamedCaptureGroup",
            "link": "https://biomejs.dev/linter/rules/use-named-capture-group",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "prefer-named-capture-group"
                }
              }
            ],
            "docs": " Enforce using named capture groups in regular expression.\n\n Numbered capture groups like `(...)` can be difficult to work with,\n as they are matched by their position and not by a descriptive name.\n Named capture groups (`(?<name>...)`) associate a descriptive name\n with each match, making the regular expression more readable and\n its intent clearer.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n /(ba[rz])/;\n ```\n\n ```js,expect_diagnostic\n /([0-9]{4})/;\n ```\n\n ```js,expect_diagnostic\n /(?:ab)(cd)/;\n ```\n\n ```js,expect_diagnostic\n new RegExp(\"(foo)\");\n ```\n\n ```js,expect_diagnostic\n RegExp(\"(foo)\");\n ```\n\n ### Valid\n\n ```js\n /(?<id>ba[rz])/;\n /(?:ba[rz])/;\n /ba[rz]/;\n /(?<year>[0-9]{4})-(?<month>[0-9]{2})/;\n new RegExp(\"(?<id>foo)\");\n new RegExp(pattern);\n ```\n\n"
          },
          "useNullishCoalescing": {
            "deprecated": false,
            "version": "next",
            "name": "useNullishCoalescing",
            "link": "https://biomejs.dev/linter/rules/use-nullish-coalescing",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "prefer-nullish-coalescing"
                }
              }
            ],
            "docs": " Enforce using the nullish coalescing operator (`??`) instead of logical or (`||`).\n\n The `??` operator only checks for `null` and `undefined`, while `||` checks\n for any falsy value including `0`, `''`, and `false`. This can prevent bugs\n where legitimate falsy values are incorrectly treated as missing.\n\n For `||` expressions, this rule triggers when the left operand is possibly\n nullish (contains `null` or `undefined` in its type). A safe fix is only\n offered when type analysis confirms the left operand can only be truthy or\n nullish (not other falsy values like `0` or `''`).\n\n For `||=` assignment expressions, the same logic applies: `a ||= b` is\n flagged when `a` is possibly nullish and can be rewritten as `a ??= b`.\n\n By default, `||` expressions in conditional test positions (if/while/for/ternary)\n are ignored, as the falsy-checking behavior is often intentional there. This can\n be disabled with the `ignoreConditionalTests` option.\n\n ## Examples\n\n ### Invalid\n\n ```ts\n declare const maybeString: string | null;\n const value = maybeString || 'default'; // should use ??\n ```\n\n ```ts\n declare const maybeNumber: number | undefined;\n const value = maybeNumber || 0; // should use ??\n ```\n\n ```ts\n declare let x: string | null;\n x ||= 'default'; // should use ??=\n ```\n\n ### Valid\n\n ```ts\n // Already using ??\n declare const maybeString: string | null;\n const value = maybeString ?? 'default';\n ```\n\n ```ts\n // Type is not nullish - no null or undefined in union\n declare const definiteString: string;\n const value = definiteString || 'fallback';\n ```\n\n ```ts\n // In conditional test position (ignored by default)\n declare const cond: string | null;\n if (cond || 'fallback') {\n   console.log('in if');\n }\n ```\n\n ```ts\n // Already using ??=\n declare let y: string | null;\n y ??= 'default';\n ```\n\n"
          },
          "usePlaywrightValidDescribeCallback": {
            "deprecated": false,
            "version": "2.4.2",
            "name": "usePlaywrightValidDescribeCallback",
            "link": "https://biomejs.dev/linter/rules/use-playwright-valid-describe-callback",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPlaywright": "valid-describe-callback"
                }
              }
            ],
            "docs": " Enforce valid `describe()` callback.\n\n Using an improper `describe()` callback function can lead to unexpected test errors.\n This rule validates that describe callbacks are proper synchronous functions without parameters.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n test.describe('suite', async () => {\n     test('one', async ({ page }) => {});\n });\n ```\n\n ```js,expect_diagnostic\n test.describe('suite', (done) => {\n     test('one', async ({ page }) => {});\n });\n ```\n\n ### Valid\n\n ```js\n test.describe('suite', () => {\n     test('one', async ({ page }) => {});\n     test('two', async ({ page }) => {});\n });\n ```\n\n ```js\n describe('suite', function() {\n     test('one', async ({ page }) => {});\n });\n ```\n\n"
          },
          "useRegexpExec": {
            "deprecated": false,
            "version": "2.3.9",
            "name": "useRegexpExec",
            "link": "https://biomejs.dev/linter/rules/use-regexp-exec",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "prefer-regexp-exec"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintRegexp": "prefer-regexp-exec"
                }
              }
            ],
            "docs": " Enforce `RegExp#exec` over `String#match` if no global flag is provided.\n\n String#match is defined to work the same as RegExp#exec when the regular expression does not include the g flag.\n Keeping to consistently using one of the two can help improve code readability.\n\n RegExp#exec may also be slightly faster than String#match; this is the reason to choose it as the preferred usage.\n\n ## Examples\n\n ### Invalid\n\n ```ts,file=invalid.ts,expect_diagnostic\n 'something'.match(/thing/);\n ```\n\n ### Valid\n\n ```ts,file=valid.ts\n /thing/.exec('something');\n ```\n\n"
          },
          "useSortedClasses": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "useSortedClasses",
            "link": "https://biomejs.dev/linter/rules/use-sorted-classes",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Enforce the sorting of CSS utility classes.\n\n This rule implements the same sorting algorithm as [Tailwind CSS](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted), but supports any utility class framework including [UnoCSS](https://unocss.dev/).\n\n It is analogous to [`prettier-plugin-tailwindcss`](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).\n\n\n :::caution\n ## Important notes\n\n This rule is a work in progress, and is only partially implemented. Progress is being tracked in the following GitHub issue: https://github.com/biomejs/biome/issues/1274\n\n Currently, utility class sorting is **not part of the formatter**, and is implemented as a linter rule instead, with an automatic fix. The fix is, at this stage, classified as unsafe. This means that **it won't be applied automatically** as part of IDE actions such as \"fix on save\".\n\n We appreciate any feedback on this rule, and encourage you to try it out and report any issues you find.\n\n **Please read this entire documentation page before reporting an issue.**\n\n Notably, keep in mind that the following features are not supported yet:\n\n - Screen variant sorting (e.g. `md:`, `max-lg:`). Only static, dynamic and arbitrary variants are supported.\n - Custom utilitites and variants (such as ones introduced by Tailwind CSS plugins). Only the default Tailwind CSS configuration is supported.\n - Options such as `prefix` and `separator`.\n - Object properties (e.g. in `clsx` calls).\n\n Please don't report issues about these features.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div class=\"px-2 foo p-4 bar\" />;\n ```\n\n ```jsx,expect_diagnostic\n <div class=\"hover:focus:m-2 foo hover:px-2 p-4\" />\n ```\n\n ## Options\n\n ### Code-related\n\n ```json,options\n {\n     \"options\": {\n         \"attributes\": [\"classList\"],\n         \"functions\": [\"clsx\", \"cva\", \"tw\", \"tw.*\"]\n     }\n }\n ```\n\n #### attributes\n\n Classes in the `class` and `className` JSX attributes are always sorted. Use this option to add more attributes that should be sorted.\n\n #### functions\n\n If specified, strings in the indicated functions will be sorted. This is useful when working with libraries like [`clsx`](https://github.com/lukeed/clsx) or [`cva`](https://cva.style/).\n\n ```js,expect_diagnostic,use_options\n clsx(\"px-2 foo p-4 bar\", {\n     \"some-css-class\": condition,\n });\n ```\n\n ```js,expect_diagnostic,use_options\n clsx(\"some-css-class\", {\n     \"block mx-4\": condition,\n });\n ```\n\n Tagged template literals are also supported, for example:\n\n ```js,use_options\n tw`px-2`;\n tw.div`px-2`;\n ```\n\n ```js,expect_diagnostic,use_options\n tw`px-2 foo p-4 bar`;\n ```\n\n ```js,expect_diagnostic,use_options\n tw.div`px-2 foo p-4 bar`;\n ```\n\n ### Sort-related\n\n :::caution\n At the moment, this rule does not support customizing the sort options. Instead, the default Tailwind CSS configuration is hard-coded.\n :::\n\n ## Differences with [Prettier](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)\n\n The main key difference is that Tailwind CSS and its Prettier plugin read and execute the `tailwind.config.js` JavaScript file, which Biome can't do. Instead, Biome implements a simpler version of the configuration. The trade-offs are explained below.\n\n ### Values are not known\n\n The rule has no knowledge of values such as colors, font sizes, or spacing values, which are normally defined in a configuration file like `tailwind.config.js`. Instead, the rule matches utilities that support values in a simpler way: if they start with a known utility prefix, such as `px-` or `text-`, they're considered valid.\n\n This has two implications:\n\n - **False positives:** classes can be wrongly recognized as utilities even though their values are incorrect.\n   For example, if there's a `px-` utility defined in the configuration, it will match all of the following classes:\n   `px-2`, `px-1337`, `px-[not-actually-valid]`, `px-literally-anything`.\n\n - **No distinction between different utilities that share the same prefix:** for example,\n   `text-red-500` and `text-lg` are both interpreted as the same type of utility by this rule,\n    even though the former refers to a color and the latter to a font size. This results in all\n    utilities that share the same prefix being sorted together, regardless of their actual values.\n\n ### Custom additions must be specified\n\n The built-in Tailwind CSS preset (enabled by default) contains the set of utilities and variants that are available with the default configuration. More utilities and variants can be added through Tailwind CSS plugins. In Biome, these need to be manually specified in the Biome configuration file in order to \"extend\" the preset.\n\n ### Presets can't be modified\n\n In Tailwind CSS, core plugins (which provide the default utilities and variants) can be disabled. In Biome, however, there is no way to disable parts of a preset: it's all or nothing. A work-around is to, instead of using a preset, manually specify all utilities and variants in the Biome configuration file.\n\n ### Whitespace is collapsed\n\n The Tailwind CSS Prettier plugin preserves all original whitespace. This rule, however, collapses all whitespace (including newlines) into single spaces.\n\n This is a deliberate decision. We're unsure about this behavior, and would appreciate feedback on it. If this is a problem for you, please share a detailed explanation of your use case in [the GitHub issue](https://github.com/biomejs/biome/issues/1274).\n\n"
          },
          "useSpread": {
            "deprecated": false,
            "version": "2.3.6",
            "name": "useSpread",
            "link": "https://biomejs.dev/linter/rules/use-spread",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "prefer-spread"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintE18e": "prefer-spread-syntax"
                }
              }
            ],
            "docs": " Enforce the use of the spread operator over `.apply()`.\n\n The `apply()` method is used to call a function with a given `this` value and arguments provided as an array.\n The spread operator `...` can be used to achieve the same result, which is more concise and easier to read.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n foo.apply(null, args);\n ```\n\n ```js,expect_diagnostic\n foo.apply(null, [1, 2, 3]);\n ```\n\n ```js,expect_diagnostic\n foo.apply(undefined, args);\n ```\n\n ```js,expect_diagnostic\n obj.foo.apply(obj, args);\n ```\n\n ### Valid\n\n ```js\n foo(...args);\n\n obj.foo(...args);\n\n foo.apply(obj, [1, 2, 3]);\n\n ```\n\n"
          },
          "useVueConsistentDefinePropsDeclaration": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "useVueConsistentDefinePropsDeclaration",
            "link": "https://biomejs.dev/linter/rules/use-vue-consistent-define-props-declaration",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "define-props-declaration"
                }
              }
            ],
            "docs": " Enforce consistent `defineProps` declaration style.\n\n This rule enforces `defineProps` typing style which you should use `type` or `runtime` declaration.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <script setup lang=\"ts\">\n const props = defineProps({\n   kind: { type: String },\n });\n </script>\n ```\n\n ### Valid\n\n ```vue\n <script setup lang=\"ts\">\n const props = defineProps<{\n   kind: string;\n }>();\n </script>\n ```\n\n"
          },
          "useVueDefineMacrosOrder": {
            "deprecated": false,
            "version": "2.3.0",
            "name": "useVueDefineMacrosOrder",
            "link": "https://biomejs.dev/linter/rules/use-vue-define-macros-order",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVueJs": "define-macros-order"
                }
              }
            ],
            "docs": " Enforce specific order of Vue compiler macros.\n\n This rule ensures consistent ordering of Vue's Composition API compiler macros in `<script setup>` blocks.\n Enforcing a consistent order improves code readability and maintainability by establishing a predictable structure.\n\n These macros must also appear before any other statements (except imports, type declarations, and debugger statements).\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <script lang=\"ts\" setup>\n const emit = defineEmits(['update'])\n const props = defineProps<{ name: string }>()\n </script>\n ```\n\n ```vue,expect_diagnostic\n <script lang=\"ts\" setup>\n import { ref } from 'vue'\n\n const count = ref(0)\n const props = defineProps<{ name: string }>()\n </script>\n ```\n\n ### Valid\n\n ```vue\n <script lang=\"ts\" setup>\n const props = defineProps<{ name: string }>()\n const emit = defineEmits(['update'])\n </script>\n ```\n\n ```vue\n <script lang=\"ts\" setup>\n import { ref } from 'vue'\n\n const model = defineModel()\n const props = defineProps<{ name: string }>()\n const emit = defineEmits(['update'])\n\n const count = ref(0)\n </script>\n ```\n\n ```vue\n <script lang=\"ts\" setup>\n import { ref } from 'vue'\n\n interface Props {\n   value: string\n }\n\n const props = defineProps<Props>()\n const emit = defineEmits(['update'])\n </script>\n ```\n\n ## Options\n\n ### `order`\n\n Allows specifying the order in which the Vue compiler macros should appear.\n\n **Default:** `[\"defineModel\", \"defineProps\", \"defineEmits\"]`\n\n This is not limited to built-in macros, for example unplug-vue-router [definePage](https://uvr.esm.is/guide/extending-routes.html#definepage)\n can be listed here as well.\n\n ```json,options\n {\n   \"options\": {\n     \"order\": [\"definePage\", \"defineProps\", \"defineEmits\", \"defineModel\"]\n   }\n }\n ```\n\n"
          },
          "useVueMultiWordComponentNames": {
            "deprecated": false,
            "version": "2.2.3",
            "name": "useVueMultiWordComponentNames",
            "link": "https://biomejs.dev/linter/rules/use-vue-multi-word-component-names",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintVueJs": "multi-word-component-names"
                }
              }
            ],
            "docs": " Enforce multi-word component names in Vue components.\n\n Using a single-word component name (e.g. `App`, `Header`) can:\n - Conflict with native/custom HTML elements (present or future)\n - Reduce clarity/expressiveness\n\n This rule requires component names to be \"multi-word\".\n\n A name is considered multi-word when:\n - Kebab-case: contains at least one hyphen (`my-component`)\n - PascalCase / CamelCase: contains at least two capital letters (`MyComponent`); single-cap names like `App` or `Foo` are rejected\n\n Component names are extracted from the `name` property in Options API components, or inferred from the file name if not explicitly set.\n\n ## Examples\n\n ### Invalid\n\n ```vue,expect_diagnostic\n <script>\n export default {\n   name: \"Foo\"\n };\n </script>\n ```\n\n ```js,expect_diagnostic\n import { defineComponent } from \"vue\";\n export default defineComponent({\n   name: \"Header\"\n });\n ```\n\n ```js,expect_diagnostic\n import { createApp } from \"vue\";\n createApp({\n   name: \"Widget\"\n }).mount(\"#app\");\n ```\n\n ### Valid\n\n ```vue\n <script>\n export default {\n   name: \"MyComponent\"\n };\n </script>\n ```\n\n ```js\n export default {\n   name: \"my-component\"\n };\n ```\n\n ```js\n defineComponent({\n   name: \"MyComponent\"\n });\n ```\n\n ```js\n createApp({ name: \"MyApp\" }).mount(\"#app\");\n ```\n\n ## Options\n\n ### `ignores`\n\n Additional single-word component names to ignore (case-insensitive). The rule already ignores Vue built-in components and `App` by default.\n\n ```json,options\n {\n   \"options\": {\n     \"ignores\": [\n       \"Foo\"\n     ]\n   }\n }\n ```\n\n #### Valid\n\n ```vue,use_options\n <script>\n export default {\n   name: \"Foo\"\n };\n </script>\n ```\n\n"
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
            "docs": " Disallow the use of spread (`...`) syntax on accumulators.\n\n Spread syntax allows an iterable to be expanded into its individual elements.\n\n Spread syntax should be avoided on accumulators (like those in `.reduce`)\n because it causes a time complexity of `O(n^2)` instead of `O(n)`.\n\n Source: https://prateeksurana.me/blog/why-using-object-spread-with-reduce-bad-idea/\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var a = ['a', 'b', 'c'];\n a.reduce((acc, val) => [...acc, val], []);\n ```\n\n ```js,expect_diagnostic\n var a = ['a', 'b', 'c'];\n a.reduce((acc, val) => {return [...acc, val];}, []);\n ```\n\n ```js,expect_diagnostic\n var a = ['a', 'b', 'c'];\n a.reduce((acc, val) => ({...acc, [val]: val}), {});\n ```\n\n ```js,expect_diagnostic\n var a = ['a', 'b', 'c'];\n a.reduce((acc, val) => {return Object.assign([], acc, val);}, []);\n ```\n\n ### Valid\n\n ```js\n var a = ['a', 'b', 'c'];\n a.reduce((acc, val) => {acc.push(val); return acc}, []);\n ```\n\n ```js\n var a = ['a', 'b', 'c'];\n a.reduce((acc, val) => Object.assign(acc, val), []);\n ```\n\n ```js\n var a = ['a', 'b', 'c'];\n a.reduce((acc, val) => {return Object.assign(acc, val);}, []);\n ```\n\n"
          },
          "noAwaitInLoops": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noAwaitInLoops",
            "link": "https://biomejs.dev/linter/rules/no-await-in-loops",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-await-in-loop"
                }
              }
            ],
            "docs": " Disallow `await` inside loops.\n\n Using `await` in a loop makes your asynchronous operations run one after another instead of all at once. This can slow things down and might cause unhandled errors. Instead, create all the promises together and then wait for them simultaneously using methods like `Promise.all()`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n async function invalid() {\n     for (const thing of things) {\n         const result = await asyncWork();\n     }\n }\n ```\n\n ### Valid\n\n ```js\n async function valid() {\n     await Promise.all(things.map((thing) => asyncWork(thing)))\n }\n ```\n\n"
          },
          "noBarrelFile": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noBarrelFile",
            "link": "https://biomejs.dev/linter/rules/no-barrel-file",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintBarrelFiles": "avoid-barrel-files"
                }
              }
            ],
            "docs": " Disallow the use of barrel file.\n\n A barrel file is a file that re-exports all of the exports from other files in a directory.\n This structure results in the unnecessary loading of many modules, significantly impacting performance in large-scale applications.\n Additionally, it complicates the codebase, making it difficult to navigate and understand the project's dependency graph.\n This rule ignores .d.ts files and type-only exports.\n\n For a more detailed explanation, check out https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n export * from \"foo\";\n export * from \"bar\";\n ```\n\n ```js,expect_diagnostic\n export { foo } from \"foo\";\n export { bar } from \"bar\";\n ```\n\n ```js,expect_diagnostic\n export { default as module1 } from \"./module1\";\n ```\n\n ### Valid\n\n ```ts\n export type * from \"foo\";\n export type { foo } from \"foo\";\n ```\n\n"
          },
          "noDelete": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDelete",
            "link": "https://biomejs.dev/linter/rules/no-delete",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Disallow the use of the `delete` operator.\n\n The `delete` operator enables the removal of a property from an object.\n\n The `delete` operator should be avoided because it [can prevent some optimizations of _JavaScript_ engines](https://webkit.org/blog/10298/inline-caching-delete/).\n Moreover, it can lead to unexpected results.\n For instance, deleting an array element [does not change the length of the array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete#deleting_array_elements).\n\n The only legitimate use of `delete` is on an object that behaves like a _map_.\n To allow this pattern, this rule does not report `delete` on computed properties that are not literal values.\n Consider using [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) instead of an object.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const arr = [1, 2, 3];\n delete arr[0];\n ```\n\n ```js,expect_diagnostic\n const obj = {a: {b: {c: 123}}};\n delete obj.a.b.c;\n ```\n\n ### Valid\n\n ```js\n const foo = new Set([1,2,3]);\n foo.delete(1);\n```\n\n ```js\n const map = Object.create(null);\n const key = \"key\"\n map[key] = \"value\"\n delete map[key];\n```\n\n ```js\n let x = 5;\n delete f(); // uncovered by this rule.\n```\n\n"
          },
          "noDynamicNamespaceImportAccess": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noDynamicNamespaceImportAccess",
            "link": "https://biomejs.dev/linter/rules/no-dynamic-namespace-import-access",
            "recommended": true,
            "fixKind": "none",
            "docs": " Disallow accessing namespace imports dynamically.\n\n Accessing namespace imports dynamically can prevent efficient tree shaking and increase bundle size.\n This happens because the bundler cannot determine which parts of the namespace are used at compile time,\n so it must include the entire namespace in the bundle.\n\n Instead, consider using named imports or if that is not possible\n access the namespaced import properties statically.\n\n If you want to completely disallow namespace imports, consider using the [noNamespaceImport](https://biomejs.dev/linter/rules/no-namespace-import/) rule.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import * as foo from \"foo\"\n foo[\"bar\"]\n ```\n\n ```js,expect_diagnostic\n import * as foo from \"foo\"\n const key = \"bar\"\n foo[key]\n ```\n\n ### Valid\n\n ```js\n import * as foo from \"foo\"\n foo.bar\n ```\n\n ```js\n import { bar } from \"foo\"\n bar\n ```\n\n ```js\n import messages from \"i18n\"\n const knownMessagesMap = {\n  hello: messages.hello,\n  goodbye: messages.goodbye\n }\n\n const dynamicKey = \"hello\"\n knownMessagesMap[dynamicKey]\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintBarrelFiles": "avoid-namespace-import"
                }
              }
            ],
            "docs": " Disallow the use of namespace imports.\n\n Namespace imports might impact the efficiency of tree shaking, a process that removes unused code from bundles.\n The effectiveness of tree shaking largely depends on the bundler (e.g., Webpack, Rollup) and its configuration.\n Modern bundlers are generally capable of handling namespace imports effectively, but using named imports is recommended for optimal tree shaking and minimizing bundle size.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import * as foo from \"foo\";\n ```\n\n ### Valid\n\n ```ts\n import { foo } from \"foo\"\n import type { bar } from \"bar\"\n import type * as baz from \"baz\"\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintBarrelFiles": "avoid-re-export-all"
                }
              }
            ],
            "docs": " Avoid re-export all.\n\n Deeply nested import chains in modular projects, where a barrel file imports another barrel file, can lead to increased load times and complexity.\n This structure results in the unnecessary loading of many modules, significantly impacting performance in large-scale applications.\n Additionally, it complicates the codebase, making it difficult to navigate and understand the project's dependency graph.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n export * from \"foo\";\n ```\n\n ```js,expect_diagnostic\n export * as foo from \"foo\";\n ```\n\n ### Valid\n\n ```js\n export { foo } from \"foo\";\n ```\n\n ```ts\n export type * from \"foo\";\n export type * as bar from \"bar\";\n ```\n\n"
          },
          "useSolidForComponent": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useSolidForComponent",
            "link": "https://biomejs.dev/linter/rules/use-solid-for-component",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintSolid": "prefer-for"
                }
              }
            ],
            "docs": " Enforce using Solid's `<For />` component for mapping an array to JSX elements.\n\n In Solid, `<For />` component for efficiently rendering lists. Array#map causes DOM elements to be recreated.\n\n For details on `<For />` Component, see the [Solid docs about Components](https://docs.solidjs.com/reference/components/for).\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n let Component = (props) => <ol>{props.data.map(d => <li>{d.text}</li>)}</ol>;\n ```\n\n ```jsx,expect_diagnostic\n let Component = (props) => <>{props.data.map(d => <li>{d.text}</li>)}</>;\n ```\n\n ```jsx,expect_diagnostic\n let Component = (props) => (\n   <ol>\n     {props.data.map((d) => (\n       <li key={d.id}>{d.text}</li>\n     ))}\n   </ol>\n );\n ```\n\n ### Valid\n\n ```jsx\n let Component = (props) => <ol><For each={props.data}>{d => <li>{d.text}</li>}</For></ol>;\n ```\n\n ```jsx\n let abc = x.map(y => y + z);\n ```\n\n ```jsx\n let Component = (props) => {\n  let abc = x.map(y => y + z);\n  return <div>Hello, world!</div>;\n }\n ```\n\n"
          },
          "useTopLevelRegex": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "useTopLevelRegex",
            "link": "https://biomejs.dev/linter/rules/use-top-level-regex",
            "recommended": false,
            "fixKind": "none",
            "docs": " Require regex literals to be declared at the top level.\n\n This rule is useful to avoid performance issues when using regex literals inside functions called many times (hot paths). Regex literals create a new RegExp object when they are evaluated. (See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) By declaring them at the top level, this overhead can be avoided.\n\n It's important to note that this rule is not recommended for all cases. Placing regex literals at the top level can hurt startup times. In browser contexts, this can result in longer page loads.\n\n Additionally, this rule ignores regular expressions with the `g` and/or `y` flags, as they maintain internal state and can cause\n [side effects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex#avoiding_side_effects) when calling `test` and `exec` with them.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function foo(someString) {\n     return /[a-Z]*/.test(someString)\n }\n ```\n\n ### Valid\n\n ```js\n const REGEX = /[a-Z]*/;\n\n function foo(someString) {\n     return REGEX.test(someString)\n }\n ```\n\n ```js\n function foo(str) {\n     return /[a-Z]*/g.exec(str)\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-eval"
                }
              }
            ],
            "docs": " Disallow the use of global `eval()`.\n\n The `eval()` function evaluates the passed string as a _JavaScript_ code.\n The executed code can access and mutate variables in the scope where the function is called.\n\n The use of `eval()` exposes to [security risks and performance issues](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!).\n If the executed code is somehow affected by a malicious party,\n then you may end up executing malicious code with the privileges of the caller.\n Moreover, changing variables in the caller's scope is expensive in modern _JavaScript_ interpreters.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n eval(\"var a = 0\");\n ```\n\n ```js,expect_diagnostic\n (0, globalThis.eval)(\"var a = 0\")\n ```\n\n ```js,expect_diagnostic\n f(eval);\n ```\n\n ```js,expect_diagnostic\n const aliasedEval = eval;\n ```\n\n ### Valid\n\n ```cjs\n function f(eval) {\n     eval(\"let a = 0;\");\n }\n ```\n\n The rule is not able to detect cases where the global object is aliased:\n\n ```js\n let foo = globalThis;\n foo.eval(\"let a = 0;\");\n ```\n"
          },
          "noSecrets": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noSecrets",
            "link": "https://biomejs.dev/linter/rules/no-secrets",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintNoSecrets": "no-secrets"
                }
              }
            ],
            "docs": " Disallow usage of sensitive data such as API keys and tokens.\n\n This rule checks for high-entropy strings and matches common patterns\n for secrets, including AWS keys, Slack tokens, and private keys.\n It aims to help users identify immediate potential secret leaks in their codebase,\n especially for those who may not be aware of the risks associated with\n sensitive data exposure.\n\n ## Detected Secrets\n\n The following list contains the patterns we detect:\n\n - **JSON Web Token (JWT)**: Tokens in the format of `ey...`\n - **Base64-encoded JWT**: Base64-encoded JWT tokens with various parameters (alg, aud, iss, etc.)\n - **Slack Token**: Tokens such as `xox[baprs]-...`\n - **Slack Webhook URL**: URLs like `https://hooks.slack.com/services/...`\n - **GitHub Token**: GitHub tokens with lengths between 35-40 characters\n - **Twitter OAuth Token**: Twitter OAuth tokens with lengths between 35-44 characters\n - **Facebook OAuth Token**: Facebook OAuth tokens with possible lengths up to 42 characters\n - **Google OAuth Token**: Google OAuth tokens in the format `ya29...`\n - **AWS API Key**: Keys that begin with `AKIA` followed by 16 alphanumeric characters\n - **Passwords in URLs**: Passwords included in URL credentials (`protocol://user:pass@...`)\n - **Google Service Account**: JSON structure with the service-account identifier\n - **Twilio API Key**: API keys starting with `SK...` followed by 32 characters\n - **RSA Private Key**: Key blocks that start with `-----BEGIN RSA PRIVATE KEY-----`\n - **OpenSSH Private Key**: Key blocks that start with `-----BEGIN OPENSSH PRIVATE KEY-----`\n - **DSA Private Key**: Key blocks that start with `-----BEGIN DSA PRIVATE KEY-----`\n - **EC Private Key**: Key blocks that start with `-----BEGIN EC PRIVATE KEY-----`\n - **PGP Private Key Block**: Key blocks that start with `-----BEGIN PGP PRIVATE KEY BLOCK-----`\n\n ### Entropy Check\n\n In addition to detecting the above patterns, we also employ a **string entropy checker** to catch potential secrets based on their entropy (randomness). The entropy checker is configurable through the `entropyThreshold` option (see below), allowing customization of thresholds for string entropy to fine-tune detection and minimize false positives.\n\n ### Disclaimer\n\n While this rule helps with most common cases, it is not intended to handle all of them.\n Therefore, always review your code carefully and consider implementing additional security\n measures, such as automated secret scanning in your CI/CD and git pipeline.\n\n ### Recommendations\n\n Some recommended tools for more comprehensive secret detection include:\n - [SonarQube](https://www.sonarsource.com/products/sonarqube/downloads/): Clean Code scanning solution with a secret scanner (Community version).\n - [Gitleaks](https://github.com/gitleaks/gitleaks/): A mature secret scanning tool.\n - [Trufflehog](https://github.com/trufflesecurity/trufflehog): A tool for finding secrets in git history.\n - [Sensleak](https://github.com/crates-pro/sensleak-rs): A Rust-based solution for secret detection.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const secret = \"AKIA1234567890EXAMPLE\";\n ```\n\n ### Valid\n\n ```js\n const nonSecret = \"hello world\";\n ```\n\n ## Options\n\n The rule supports the following option:\n\n ```json,options\n {\n   \"options\": {\n     \"entropyThreshold\": 41\n   }\n }\n ```\n\n ### `entropyThreshold`\n\n Sets the sensitivity threshold for the high‑entropy detection pass.\n The underlying algorithm computes an adjusted entropy score for string tokens; if the score\n exceeds `entropyThreshold / 10` (e.g. `41` => `4.1`), and the string does not match any known\n safe pattern, it is reported as a potential secret.\n\n Increase the value to reduce false positives (stricter: fewer strings flagged).\n Decrease the value to increase sensitivity (more strings flagged).\n\n > **Default:** `41`\n\n Example raising the threshold (fewer detections):\n ```json,options\n {\n   \"options\": {\n     \"entropyThreshold\": 50\n   }\n }\n ```\n"
          }
        },
        "style": {
          "noCommonJs": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noCommonJs",
            "link": "https://biomejs.dev/linter/rules/no-common-js",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-require-imports"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-var-requires"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintImport": "no-commonjs"
                }
              }
            ],
            "docs": " Disallow use of CommonJs module system in favor of ESM style imports.\n\n ESM-style `import`s are modern alternative to CommonJS `require` imports. Supported by all modern browsers and Node.js versions.\n Tooling can more easily statically analyze and tree-shake ESM `import`s compared to CommonJs.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n require('node:fs');\n ```\n ```js,expect_diagnostic\n module.exports = { a: 'b' }\n ```\n ```js,expect_diagnostic\n exports.a = 'b';\n ```\n\n ### Valid\n\n ```js\n import fs from 'node:fs';\n ```\n ```js\n import('node:fs')\n ```\n ```js\n export const a = 'b';\n ```\n ```js\n export default { a: 'b' };\n ```\n\n ## Caveats\n\n Rule is automatically disabled inside `.cjs` and `.cts` files, because they are explicitly CommonJs files.\n\n This rule could be helpful if you are migrating from CommonJs to ESM,\n but if you wish to continue using CommonJs, you can safely disable it.\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintImport": "no-default-export"
                }
              }
            ],
            "docs": " Disallow default exports.\n\n Default exports cannot be easily discovered inside an editor:\n They cannot be suggested by the editor when the user tries to import a name.\n\n Also, default exports don't encourage consistency over a code base:\n the module that imports the default export must choose a name.\n It is likely that different modules use different names.\n\n Moreover, default exports encourage exporting an object that acts as a namespace.\n This is a legacy pattern used to mimic CommonJS modules.\n\n For all these reasons, a team may want to disallow default exports.\n\n Note that this rule disallows only default exports in EcmaScript Module.\n It ignores CommonJS default exports.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n export default function f() {};\n ```\n\n ```js,expect_diagnostic\n export default class C {};\n ```\n\n ```js,expect_diagnostic\n export default {\n     f() {},\n     g() {},\n };\n ```\n\n ```js,expect_diagnostic\n export { X as default };\n ```\n\n ### Valid\n\n ```js\n export function f () {};\n export class C {};\n export { default as X } from \"mod\";\n ```\n\n ```cjs\n module.exports = class {};\n ```\n\n"
          },
          "noDoneCallback": {
            "deprecated": false,
            "version": "1.6.1",
            "name": "noDoneCallback",
            "link": "https://biomejs.dev/linter/rules/no-done-callback",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJest": "no-done-callback"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintVitest": "no-done-callback"
                }
              }
            ],
            "docs": " Disallow using a callback in asynchronous tests and hooks.\n\n This rule checks the function parameter of hooks and tests for use of the `done` argument, suggesting you return a promise instead.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n beforeEach((done) => {\n     // ...\n });\n ```\n\n ```js,expect_diagnostic\n test('tets-name', (done) => {\n     // ...\n });\n ```\n\n ### Valid\n\n ```js\n beforeEach(async () => {\n     // ...\n });\n ```\n\n ```js\n test('test-name', () => {\n     expect(myFunction()).toBeTruthy();\n });\n ```\n\n"
          },
          "noExportedImports": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noExportedImports",
            "link": "https://biomejs.dev/linter/rules/no-exported-imports",
            "recommended": false,
            "fixKind": "none",
            "docs": " Disallow exporting an imported variable.\n\n In JavaScript, you can re-export a variable either by using `export from` or\n by first importing the variable and then exporting it with a regular `export`.\n\n You may prefer to use the first approach, as it clearly communicates the intention\n to re-export an import, and can make static analysis easier.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import { A } from \"mod\";\n export { A };\n ```\n\n ```js,expect_diagnostic\n import * as ns from \"mod\";\n export { ns };\n ```\n\n ```js,expect_diagnostic\n import D from \"mod\";\n export { D };\n ```\n\n ### Valid\n\n ```js\n export { A } from \"mod\";\n export * as ns from \"mod\";\n export { default as D } from \"mod\";\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-negated-condition"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "if_not_else"
                }
              }
            ],
            "docs": " Disallow negation in the condition of an `if` statement if it has an `else` clause.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (!cond) { f();} else { g();}\n ```\n\n ```js,expect_diagnostic\n !cond ? 0 : 1\n```\n\n ### Valid\n\n ```js\n if (!cond) { f(); }\n```\n\n ```js\n cond ? 1 : 0\n```\n\n ```js\n if (!cond) { f(); }\n```\n\n ```js\n if (!!val) { f(); } else { g(); }\n```\n"
          },
          "noNestedTernary": {
            "deprecated": false,
            "version": "1.9.3",
            "name": "noNestedTernary",
            "link": "https://biomejs.dev/linter/rules/no-nested-ternary",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-nested-ternary"
                }
              }
            ],
            "docs": " Disallow nested ternary expressions.\n\n Nesting ternary expressions can make code more difficult to understand.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const thing = foo ? bar : baz === qux ? quxx : foobar;\n ```\n\n ```js,expect_diagnostic\n foo ? baz === qux ? quxx() : foobar() : bar();\n ```\n\n ### Valid\n\n ```js\n const thing = foo ? bar : foobar;\n ```\n\n ```js\n let thing;\n\n if (foo) {\n     thing = bar;\n } else if (baz === qux) {\n     thing = quxx;\n } else {\n     thing = foobar;\n }\n ```\n\n"
          },
          "noParameterAssign": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noParameterAssign",
            "link": "https://biomejs.dev/linter/rules/no-parameter-assign",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-param-reassign"
                }
              }
            ],
            "docs": " Disallow reassigning `function` parameters.\n\n Assignment to `function` parameters can be misleading and confusing,\n as modifying parameters will also mutate the `arguments` object.\n It is often unintended and indicative of a programmer error.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function f(param) {\n     param = 13;\n }\n ```\n\n ```js,expect_diagnostic\n function f(param) {\n     param++;\n }\n ```\n\n ```js,expect_diagnostic\n function f(param) {\n     for (param of arr) {}\n }\n ```\n\n ```ts,expect_diagnostic\n class C {\n     constructor(readonly prop: number) {\n         prop++;\n     }\n }\n ```\n\n ### Valid\n\n ```js\n function f(param) {\n     let local = param;\n }\n ```\n\n ## Options\n\n ### propertyAssignment\n\n The `noParameterAssign` rule can be configured using the `propertyAssignment` option, which determines whether property assignments on function parameters are allowed or denied. By default, `propertyAssignment` is set to `allow`.\n\n ```json\n {\n     \"options\": {\n         \"propertyAssignment\": \"allow\"\n     }\n }\n ```\n\n - **allow**: Allows property assignments on function parameters. This is the default behavior.\n   - Example:\n\n ```json,options\n {\n     \"options\": {\n         \"propertyAssignment\": \"allow\"\n     }\n }\n ```\n\n ```js,use_options\n function update(obj) {\n     obj.key = \"value\"; // No diagnostic\n }\n ```\n\n - **deny**: Disallows property assignments on function parameters, enforcing stricter immutability.\n   - Example:\n\n ```json,options\n {\n     \"options\": {\n         \"propertyAssignment\": \"deny\"\n     }\n }\n ```\n\n ```js,use_options,expect_diagnostic\n function update(obj) {\n     obj.key = \"value\"; // Diagnostic: Assignment to a property of function parameter is not allowed.\n }\n ```\n"
          },
          "noProcessEnv": {
            "deprecated": false,
            "version": "1.9.1",
            "name": "noProcessEnv",
            "link": "https://biomejs.dev/linter/rules/no-process-env",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintN": "no-process-env"
                }
              }
            ],
            "docs": " Disallow the use of `process.env`.\n\n The `process.env` object in Node.js stores configuration settings. Using it directly throughout a project can cause problems:\n\n 1. It's harder to maintain\n 2. It can lead to conflicts in team development\n 3. It complicates deployment across multiple servers\n\n A better practice is to keep all settings in one configuration file and reference it throughout the project.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (process.env.NODE_ENV === 'development') {\n   // ...\n }\n ```\n\n ### Valid\n\n ```js\n const config = require('./config');\n if (config.NODE_ENV === 'development') {\n   // ...\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-restricted-globals"
                }
              }
            ],
            "docs": " This rule allows you to specify global variable names that you don’t want to use in your application.\n\n References to the global identifiers `error` and `event` are always disallowed by this rule.\n\n > Disallowing usage of specific global variables can be useful if you want to allow a set of\n global variables by enabling an environment but still want to disallow some of those.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n console.log(event)\n ```\n\n ### Valid\n ```js\n function f(event) {\n     console.log(event)\n }\n ```\n ## Options\n\n Use the options to specify additional globals that you want to restrict in your\n source code.\n\n ```json,options\n {\n     \"options\": {\n         \"deniedGlobals\": {\n             \"$\": \"jQuery is not allowed. Use native DOM manipulation instead.\",\n             \"MooTools\": \"Do not use MooTools, use MeowTools instead.\"\n         }\n     }\n }\n ```\n\n In the example above, the rule will emit a diagnostics if tried to use `$` or `MooTools` without\n creating a local variable.\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-restricted-imports"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-restricted-imports"
                }
              }
            ],
            "docs": " Disallow specified modules when loaded by import or require.\n\n ## Examples\n\n ```json\n {\n     \"noRestrictedImports\": {\n         \"options\": {\n             \"paths\": {\n                 \"lodash\": \"Using lodash is not encouraged\",\n                 \"underscore\": \"Using underscore is not encouraged\"\n             }\n         }\n     }\n }\n ```\n\n ```json,options\n {\n     \"options\": {\n         \"paths\": {\n             \"lodash\": \"Using lodash is not encouraged.\",\n             \"underscore\": \"\",\n             \"import-foo\": { \"importNames\": [\"Bar\"] },\n             \"import-bar\": { \"allowImportNames\": [\"Bar\"] }\n         },\n         \"patterns\": [{\n             \"group\": [\"import-foo/*\", \"!import-foo/bar\"]\n         }]\n     }\n }\n ```\n\n ### Invalid\n\n ```js,expect_diagnostic,use_options\n import \"lodash\";\n ```\n\n ```js,expect_diagnostic,use_options\n import \"underscore\";\n ```\n\n ```js,expect_diagnostic,use_options\n import { Bar } from \"import-foo\";\n ```\n\n\n ```js,expect_diagnostic,use_options\n const underscore = await import(\"underscore\");\n ```\n\n ```js,expect_diagnostic,use_options\n const lodash = require(\"lodash\");\n ```\n\n ```js,expect_diagnostic,use_options\n import foo from 'import-foo/foo';\n ```\n\n ### Valid\n\n ```js,use_options\n import \"allowed-import\";\n const myImport = await import(\"allowed-import\");\n const myImport = require(\"allowed-import\");\n ```\n\n ```js,use_options\n import foo from 'import-foo';\n import bar from 'import-foo/bar';\n ```\n\n ## Supported Import Syntaxes\n\n The rule tries to parse the context of the import to see if only one or more\n of the allowed import names have been imported from a given module.\n\n All of the following import syntaxes are supported:\n\n ### Static `import` (and re-`export`) declarations\n\n Normal static [ESM `import` declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) are supported:\n\n ```js\n // Static `import` declaration:\n // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import\n\n import \"sideeffect-import\";\n import * as alias1 from \"namespace-import\";\n import { export1, export2 as alias2, \"string-name\" as alias3, default as defaultExport /* … */ } from \"named-import\";\n import defaultExport from \"default-import\";\n import defaultExport, * as alias5 from \"default+namespace-import\";\n import defaultExport, { export1 /* … */ } from \"default+named-import\";\n\n export * from \"namespace-import\";\n export { export1, export2 as alias2, \"string-name\" as alias3, default as defaultExport /* … */ } from \"named-import\";\n ```\n\n The TypeScript-specific [type-only imports](https://www.typescriptlang.org/docs/handbook/modules/reference.html#type-only-imports-and-exports) are also supported:\n\n ```ts\n // TypeScript-specific type-only `import` declaration:\n // https://www.typescriptlang.org/docs/handbook/modules/reference.html#type-only-imports-and-exports\n\n import { type export1, type export2 as alias2, type \"string-name\" as alias3, type default as defaultExport /* … */ } from \"named-import\";\n import type { export1, export2 as alias2, \"string-name\" as alias3, default as defaultExport /* … */ } from \"named-import\";\n import type defaultExport from \"default-import\";\n ```\n\n ### Dynamic `import()` calls\n\n Dynamic [ESM `import()` calls](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) are also supported.\n Because the import is performed at runtime, it is not always possible to determine which import names are being used.\n Nevertheless, the rule tries to detect the following common usage patterns where the set of imported names is determined statically:\n\n ```js\n // Dynamic `import()` calls:\n // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import\n\n import('sideeffect-import');\n await import('sideeffect-import');\n\n // ...using await + destructuring-assignment:\n const alias1 = await import('namespace-import');\n const { default: defaultExport } = await import('default-import')\n const { export1, export2: alias2, \"string-name\": alias3, default: defaultExport /* … */ } = await import(\"named-import\");\n\n // ...using then() with arrow-function + destructuring parameters:\n import('namespace-import').then(alias1 => { /* … */ });\n import('namespace-import').then((alias1) => { /* … */ });\n import('default-import').then(({ default: defaultExport }) => { /* … */ });\n import('named-import').then(({ export1, export2: alias2, \"string-name\": alias3, default: defaultExport /* … */ }) => { /* … */ });\n\n // ...using then() with function + destructuring parameters:\n import('namespace-import').then(function(alias1) { /* … */ });\n import('default-import').then(function({ default: defaultExport }) { /* … */ });\n import('named-import').then(function({ export1, export2: alias2, \"string-name\": alias3, default: defaultExport /* … */ }) { /* … */ });\n\n // Standalone `import('...')` calls that appear in some other\n // unrecognized context will be treated as a namespace import,\n // because the return value of `import('...')` is a namespace object:\n\n myFunction(...args, import(\"namespace-import\"), ...args)\n ```\n\n ### Dynamic `require()` calls\n\n NodeJS-style `require()` calls are also supported.\n Due to the way `require()` works, these are always treated as default imports.\n\n ```js\n // Dynamic `require()` call\n const defaultExport = require('default-import');\n ```\n\n ## Options\n\n ```json\n {\n     \"noRestrictedImports\": {\n         \"options\": {\n             \"paths\": {\n                 \"lodash\": \"Using lodash is not encouraged\",\n                 \"underscore\": \"Using underscore is not encouraged\"\n             }\n         }\n     }\n }\n ```\n\n Use the options to specify import paths and/or patterns, including specific import names, that you want to restrict in your source code.\n\n ```json,options\n {\n     \"options\": {\n         \"paths\": {\n             \"lodash\": \"Using lodash is not encouraged\",\n             \"underscore\": \"Using underscore is not encouraged\",\n             \"import-foo\": {\n                 \"importNames\": [\"Bar\"],\n                 \"message\": \"Please use Bar from /import-bar/baz/ instead.\"\n             },\n             \"import-bar\": {\n               \"allowImportNames\": [\"Bar\"],\n               \"message\": \"Please use only Bar from import-bar.\"\n             }\n         }\n     }\n }\n ```\n\n ```json,options\n {\n     \"options\": {\n         \"patterns\": [{\n             \"group\": [\"import-foo/*\", \"!import-foo/bar\"]\n         }]\n     }\n }\n ```\n\n ### `paths`\n\n An object that lists the import paths that are either wholly or partially restricted.\n\n The keys of the object are the import paths to restrict, and the values can be:\n - A string with a custom message to show in the diagnostic when any\n - An object with additional options, as explained [below](#pathsimportimportnames).\n\n In the example below, we restrict the two paths `services-deprecated` and `constants`, with two particular messages.\n Importing `services-deprecated` will emit the message `Use services instead.`.\n Importing `constants` will emit the message `This file will be deleted soon.`:\n\n ```json,options\n {\n     \"options\": {\n         \"paths\": {\n             \"services-deprecated\": {\n                 \"message\": \"Use services instead.\"\n             },\n\t            \"constants\": \"This file will be deleted soon.\"\n         }\n     }\n }\n ```\n\n ```js,expect_diagnostic,use_options\n import * as namespaceAlias from 'services-deprecated';\n ```\n\n ```js,expect_diagnostic,use_options\n import { export1 } from 'constants';\n ```\n\n ### `paths.<import>.message`\n\n Specifies the message to be shown when the restricted import is used.\n\n A default message will be generated if `message` is empty or not specified:\n\n ```json,options\n {\n     \"options\": {\n         \"paths\": {\n             \"import-foo\": { }\n         }\n     }\n }\n ```\n\n ```js,expect_diagnostic,use_options\n import { export1 } from 'import-foo';\n ```\n\n ### `paths.<import>.importNames`\n\n Specifies the array of import names that should be explicitly forbidden.\n The following import name specifiers are supported:\n\n - **Named import:** `\"someIdentifier\"` (`import { someIdentifier } from 'named-import'`)\n - **Default import:** `\"default\"` (`import defaultExport from 'default-import'`)\n - **Namespace import:** `\"*\"` (`import * as alias1 from 'namespace-import'`)\n - **Side effect/Bare import:** `\"\"` (`import \"sideeffect-import\"`)\n\n **Only one of `importNames` and `allowImportNames` must be specified.**\n\n ```json,options\n {\n     \"options\": {\n         \"paths\": {\n             \"import-foo\": {\n                 \"importNames\": [\"Bar\"],\n                 \"message\": \"Please use Bar from /import-bar/baz/ instead.\"\n             }\n         }\n     }\n }\n ```\n\n #### Invalid\n\n ```js,expect_diagnostic,use_options\n import { Bar } from 'import-foo';\n ```\n\n #### Valid\n\n ```js,use_options\n import { Foo } from 'import-foo';\n ```\n\n ### `paths.<import>.allowImportNames`\n\n Specifies the set of import names that should be explicitly allowed.\n See `importNames` for the set of supported import name specifiers.\n\n **Only one of `importNames` and `allowImportNames` must be specified.**\n\n ```json,options\n {\n     \"options\": {\n         \"paths\": {\n             \"import-bar\": {\n               \"allowImportNames\": [\"Bar\"]\n             },\n             \"restrictPackagePrivate\": \"all\"\n         }\n     }\n }\n ```\n\n #### Invalid\n\n ```js,expect_diagnostic,use_options\n import { Baz } from 'import-bar';\n ```\n\n #### Valid\n\n ```js,use_options\n import { Bar } from 'import-bar';\n ```\n\n ### `patterns`\n **Since `v2.2.0`**\n\n This option allows you to specify multiple modules to restrict using gitignore-style patterns.\n\n ### `group`\n\n The patterns array can also include objects. The group property is used to specify the gitignore-style patterns for restricting modules and the message property is used to specify a custom message.\n\n ```json,options\n {\n     \"options\": {\n         \"patterns\": [{\n             \"group\": [\"import-foo/*\", \"!import-foo/bar\"],\n             \"message\": \"import-foo is deprecated, except the modules in import-foo/bar.\"\n         }]\n     }\n }\n ```\n\n #### Invalid\n\n ```js,expect_diagnostic,use_options\n import foo from 'import-foo/foo';\n ```\n\n #### Valid\n\n ```js,use_options\n import foo from 'import-foo';\n import bar from 'import-foo/bar';\n ```\n\n ### `importNamePattern`\n **Since `v2.2.0`**\n\n This option allows you to use regex patterns to restrict import names.\n\n ```json,options\n {\n     \"options\": {\n        \"patterns\": [{\n             \"group\": [\"import-foo/*\"],\n             \"importNamePattern\": \"[xyz]\"\n         }]\n     }\n }\n ```\n\n #### Invalid\n\n ```js,expect_diagnostic,use_options\n import { x } from 'import-foo/foo';\n ```\n\n #### Valid\n\n ```js,use_options\n import { foo } from 'import-foo/foo';\n ```\n\n ### `invertImportNamePattern`\n **Since `v2.2.0`**\n\n If true, the matched patterns in the importNamePattern will be allowed\n\n ```json,options\n {\n     \"options\": {\n        \"patterns\": [{\n             \"group\": [\"import-foo/*\"],\n             \"importNamePattern\": \"[xyz]\",\n             \"invertImportNamePattern\": true\n         }]\n     }\n }\n ```\n\n #### Invalid\n\n ```js,expect_diagnostic,use_options\n import { foo } from 'import-foo/foo';\n ```\n\n #### Valid\n\n ```js,use_options\n import { x } from 'import-foo/foo';\n ```\n"
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
          "noSubstr": {
            "deprecated": false,
            "version": "1.8.2",
            "name": "noSubstr",
            "link": "https://biomejs.dev/linter/rules/no-substr",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "prefer-string-slice"
                }
              }
            ],
            "docs": " Enforce the use of `String.slice()` over `String.substr()` and `String.substring()`.\n\n `String.slice()` is preferred over `String.substr()` and `String.substring()` because it is a more popular option with clearer behavior,\n  and it has a consistent counterpart in arrays.\n\n Note that `String.substr`, `String.substring` and `String.slice` are not identical when arguments are passed.\n For detailed differences, refer to the MDN documentation:\n - [The difference between substring() and substr()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring#the_difference_between_substring_and_substr)\n - [Differences between substring() and slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring#differences_between_substring_and_slice)\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n foo.substr();\n ```\n\n ```js,expect_diagnostic\n foo.substring();\n ```\n\n ### Valid\n\n ```js\n foo.slice(beginIndex, endIndex);\n ```\n\n"
          },
          "noUselessElse": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noUselessElse",
            "link": "https://biomejs.dev/linter/rules/no-useless-else",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslint": "no-else-return"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "clippy": "redundant_else"
                }
              }
            ],
            "docs": " Disallow `else` block when the `if` block breaks early.\n\n If an `if` block breaks early using a breaking statement (`return`, `break`, `continue`, or `throw`),\n then the `else` block becomes useless.\n Its contents can be placed outside of the block.\n\n If an `if` block breaks early using a breaking statement (`return`, `break`, `continue`, or `throw`),\n then the `else` block becomes unnecessary.\n This is because the content of the `else` block will never be executed in conjunction with the `if` block,\n as the breaking statement ensures the control flow exits the `if` block immediately.\n Therefore, the `else` block is redundant, and its content can be placed outside of the block,\n reducing the indentation level by one.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n while (x > 0) {\n     if (f(x)) {\n         break;\n     } else {\n         x++\n     }\n }\n ```\n\n ```js,expect_diagnostic\n function f(x) {\n     if (x < 0) {\n         return 0;\n     } else {\n         return x;\n     }\n }\n ```\n\n ```js,expect_diagnostic\n function f(x) {\n     if (x < 0) {\n         throw new RangeError();\n     } else {\n         return x;\n     }\n }\n ```\n\n ### Valid\n\n ```js\n function f(x) {\n     if (x < 0) {\n         return 0;\n     }\n     return x;\n }\n ```\n\n ```js\n function f(x) {\n     if (x < 0) {\n         console.info(\"negative number\");\n     } else if (x > 0) {\n         return x;\n     } else {\n         console.info(\"number 0\");\n     }\n }\n ```\n"
          },
          "noYodaExpression": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noYodaExpression",
            "link": "https://biomejs.dev/linter/rules/no-yoda-expression",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "yoda"
                }
              }
            ],
            "docs": " Disallow the use of yoda expressions.\n\n A Yoda expression is a programming style where, given a binary operation, the \"static\" part of the binary operation is placed on the left-hand side.\n This rule **forbids** the use of Yoda expressions and enforces the placing of the \"static\" part of the binary operations on the right-hand side.\n\n ## Exceptions\n\n Range expressions like `0 < value && value < 1` or `value <= 0 || 1 < value` are allowed.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (\"red\" == value) {}\n ```\n\n ```js,expect_diagnostic\n if (true === value) {}\n ```\n\n ```js,expect_diagnostic\n if (5 != value) {}\n ```\n\n ### Valid\n\n ```js\n if (value === \"red\") {}\n ```\n\n ```js\n if (value === value) {}\n ```\n\n ```js\n if (value != 5) {}\n ```\n\n ```js\n if (0 < value && value < 1) {}\n ```\n\n ## Resources\n - [Wikipedia definition](https://en.wikipedia.org/wiki/Yoda_conditions)\n\n"
          },
          "useArrayLiterals": {
            "deprecated": false,
            "version": "1.7.2",
            "name": "useArrayLiterals",
            "link": "https://biomejs.dev/linter/rules/use-array-literals",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-array-constructor"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-array-constructor"
                }
              }
            ],
            "docs": " Disallow Array constructors.\n\n Use of the Array constructor to construct a new array is generally discouraged in favor of array literal notation because of the single-argument pitfall and because the Array global may be redefined.\n The exception is when the Array constructor intentionally creates sparse arrays of a specified size by giving the constructor a single numeric argument.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const xs = Array();\n ```\n\n ```js,expect_diagnostic\n const xs = Array(0, 1, 2);\n ```\n\n ```js,expect_diagnostic\n const xs = new Array(0, 1, 2);\n ```\n\n ```js,expect_diagnostic\n const xs = Array(...args);\n ```\n\n ```ts,expect_diagnostic\n const xs = new Array<number>()\n ```\n\n ### Valid\n\n ```js\n const xs = Array(65000);\n ```\n\n ```js\n const xs = [0, 1, 2];\n ```\n\n"
          },
          "useAtIndex": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "useAtIndex",
            "link": "https://biomejs.dev/linter/rules/use-at-index",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintUnicorn": "prefer-at"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintE18e": "prefer-array-at"
                }
              }
            ],
            "docs": " Use `at()` instead of integer index access.\n\n Accessing an element at the end of an array or a string is inconvenient because you have to subtract the length of the array or the string from the backward 1-based index of the element to access.\n For example, to access the last element of an array or a string, you would have to write `array[array.length - 1]`.\n A more convenient way to achieve the same thing is to use the `at()` method with a negative index.\n To access the last element of an array or a string just write `array.at(-1)`.\n\n This rule enforces the usage of `at()` over index access, `charAt()`, and `slice()[0]` when `at()` is more convenient.\n\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = array[array.length - 1];\n ```\n\n ```js,expect_diagnostic\n const foo = array[array.length - 5];\n ```\n\n ```js,expect_diagnostic\n const foo = array.slice(-1)[0];\n ```\n\n ```js,expect_diagnostic\n const foo = array.slice(-1).pop();\n ```\n\n ```js,expect_diagnostic\n const foo = array.slice(-5).shift();\n ```\n\n ```js,expect_diagnostic\n const foo = string.charAt(string.length - 5);\n ```\n\n ### Valid\n\n ```js\n const foo = array.at(-1);\n ```\n\n ```js\n const foo = array.at(-5);\n ```\n\n ```js\n const foo = array[100];\n ```\n\n ```js\n const foo = array.at(array.length - 1);\n ```\n\n ```js\n array[array.length - 1] = foo;\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "curly"
                }
              }
            ],
            "docs": " Requires following curly brace conventions.\n\n JavaScript allows the omission of curly braces when a block contains only one statement. However, it is considered by many to be best practice to never omit curly braces around blocks, even when they are optional, because it can lead to bugs and reduces code clarity.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n  if (x) x;\n ```\n\n ```js,expect_diagnostic\n  if (x) {\n    x;\n  } else y;\n ```\n\n ```js,expect_diagnostic\n if (x) {\n   x;\n } else if (y) y;\n ```\n\n ```js,expect_diagnostic\n    for (;;);\n ```\n\n ```js,expect_diagnostic\n    for (p in obj);\n ```\n\n ```js,expect_diagnostic\n   for (x of xs);\n ```\n\n ```js,expect_diagnostic\n   do;\n   while (x);\n ```\n\n ```js,expect_diagnostic\n    while (x);\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-lonely-if"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "collapsible_else_if"
                }
              }
            ],
            "docs": " Enforce using `else if` instead of nested `if` in `else` clauses.\n\n If an `if` statement is the only statement in the `else` block, it is often clearer to use an `else if` form.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (condition) {\n     // ...\n } else {\n     if (anotherCondition) {\n         // ...\n     }\n }\n ```\n\n ```js,expect_diagnostic\n if (condition) {\n     // ...\n } else {\n     if (anotherCondition) {\n         // ...\n     } else {\n         // ...\n     }\n }\n ```\n\n ```js,expect_diagnostic\n if (condition) {\n     // ...\n } else {\n     // Comment\n     if (anotherCondition) {\n         // ...\n     }\n }\n ```\n\n ### Valid\n\n ```js\n if (condition) {\n     // ...\n } else if (anotherCondition) {\n     // ...\n }\n ```\n\n ```js\n if (condition) {\n     // ...\n } else if (anotherCondition) {\n     // ...\n } else {\n     // ...\n }\n ```\n\n ```js\n if (condition) {\n     // ...\n } else {\n     if (anotherCondition) {\n         // ...\n     }\n     doSomething();\n }\n ```\n\n"
          },
          "useCollapsedIf": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "useCollapsedIf",
            "link": "https://biomejs.dev/linter/rules/use-collapsed-if",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "no-lonely-if"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "collapsible_if"
                }
              }
            ],
            "docs": " Enforce using single `if` instead of nested `if` clauses.\n\n If an `if (b)` statement is the only statement in an `if (a)` block, it is often clearer to use an `if (a && b)` form.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (condition) {\n     if (anotherCondition) {\n         // ...\n     }\n }\n ```\n\n ```js,expect_diagnostic\n if (condition) {\n     // Comment\n     if (anotherCondition) {\n         // ...\n     }\n }\n ```\n\n ### Valid\n\n ```js\n if (condition && anotherCondition) {\n     // ...\n }\n ```\n\n ```js\n if (condition) {\n     if (anotherCondition) {\n         // ...\n     }\n     doSomething();\n }\n ```\n\n ```js\n if (condition) {\n     if (anotherCondition) {\n         // ...\n     } else {\n         // ...\n     }\n }\n ```\n\n"
          },
          "useConsistentArrowReturn": {
            "deprecated": false,
            "version": "2.2.3",
            "name": "useConsistentArrowReturn",
            "link": "https://biomejs.dev/linter/rules/use-consistent-arrow-return",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "arrow-body-style"
                }
              }
            ],
            "docs": " Enforce consistent arrow function bodies.\n\n This rule enforces the use of arrow functions with no body block when the function body consists of a single return statement.\n This rule does not report when:\n - the function body contains directives (e.g. `\"use strict\"`), or\n - the body (or its descendants) contain comments, or\n - the single `return` has no argument (`return;`).\n\n The fix wraps expressions in parentheses when required for correctness (e.g. object literals and sequence expressions).\n\n ## Examples\n\n ### Invalid\n\n```js,expect_diagnostic\n const bar = () => {\n     return {\n         bar: {\n             foo: 1,\n             bar: 2,\n         }\n     };\n };\n ```\n\n ### Valid\n\n ```js\n const foo = () => 0;\n const bar = () => { \"use strict\"; return 1 }\n const baz = () => { /* intentional */ return x }\n const qux = () => ({ a: 1 })   // already concise with parens\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-new-wrappers"
                }
              }
            ],
            "docs": " Enforce the use of `new` for all builtins, except `String`, `Number` and `Boolean`.\n\n `new Builtin()` and `Builtin()` work the same, but `new` should be preferred for consistency with other constructors.\n Enforces the use of new for following builtins:\n\n - AggregateError\n - Array\n - Date\n - Error\n - EvalError\n - Object\n - Promise\n - RangeError\n - ReferenceError\n - RegExp\n - SyntaxError\n - TypeError\n - URIError\n\n Disallows the use of `new` for following builtins:\n\n - Boolean\n - Number\n - String\n\n > These should not use `new` as that would create object wrappers for the primitive values, which is not what you want.\n > However, without `new` they can be useful for coercing a value to that type.\n\n Note that, builtins that require `new` to be instantiated and\n builtins that require no `new` to be instantiated (`Symbol` and `BigInt`) are covered by the\n [noInvalidBuiltinInstantiation](https://biomejs.dev/linter/rules/no-invalid-builtin-instantiation/) rule.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const text = new String(10);\n ```\n\n ```js,expect_diagnostic\n const now = Date();\n ```\n\n ### Valid\n\n ```js\n const text = String(10);\n ```\n\n ```js\n const now = new Date();\n ```\n"
          },
          "useConsistentObjectDefinitions": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useConsistentObjectDefinitions",
            "link": "https://biomejs.dev/linter/rules/use-consistent-object-definitions",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslint": "object-shorthand"
                }
              }
            ],
            "docs": " Require the consistent declaration of object literals. Defaults to explicit definitions.\n\n ECMAScript 6 provides two ways to define an object literal: `{foo: foo}` and `{foo}`.\n The two styles are functionally equivalent.\n Using the same style consistently across your codebase makes it easier to quickly read and understand object definitions.\n\n ## Example\n\n ### Invalid\n\n ```json,options\n {\n     \"options\": {\n         \"syntax\": \"shorthand\"\n     }\n }\n ```\n\n ```js,expect_diagnostic,use_options\n let foo = 1;\n let invalid = {\n     foo: foo\n };\n ```\n\n ```js,expect_diagnostic,use_options\n let invalid = {\n     bar: function() { return \"bar\"; },\n };\n ```\n\n ### Valid\n\n ```js,use_options\n let foo = 1;\n let valid = {\n     foo,\n     bar() { return \"bar\"; },\n };\n ```\n\n ### Invalid\n\n ```json,options\n {\n     \"options\": {\n         \"syntax\": \"explicit\"\n     }\n }\n ```\n\n ```js,expect_diagnostic,use_options\n let foo = 1;\n let invalid = {\n     foo\n };\n ```\n\n ```js,expect_diagnostic,use_options\n let invalid = {\n     bar() { return \"bar\"; },\n };\n ```\n\n ### Valid\n\n ```js,use_options\n let foo = 1;\n let valid = {\n     foo: foo,\n     bar: function() { return \"bar\"; },\n };\n ```\n\n ## Options\n\n Use the options to specify the syntax of object literals to enforce.\n\n ```json,options\n {\n     \"options\": {\n         \"syntax\": \"explicit\"\n     }\n }\n ```\n\n ### syntax\n\n The syntax to use:\n - `shorthand`: enforces the use of shorthand object property syntax when possible.\n - `explicit`: enforces the use of explicit object property syntax in every case.\n\n **Default:** `shorthand`\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "prefer-const"
                }
              }
            ],
            "docs": " Require `const` declarations for variables that are only assigned once.\n\n Variables that are initialized and never reassigned and\n variables that are only assigned once can be declared as `const`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let a = 3;\n console.log(a);\n ```\n\n ```js,expect_diagnostic\n // `a` is redefined (not reassigned) on each loop step.\n for (let a of [1, 2, 3]) {\n     console.log(a);\n }\n ```\n\n ```js,expect_diagnostic\n // `a` is redefined (not reassigned) on each loop step.\n for (let a in [1, 2, 3]) {\n     console.log(a);\n }\n ```\n\n ```js,expect_diagnostic\n let a;\n a = 0;\n ```\n\n ```js,expect_diagnostic\n let a = 3;\n {\n     let a = 4;\n     a = 2;\n }\n ```\n\n ### Valid\n\n ```js\n let a = 2;\n a = 3;\n console.log(a);\n ```\n\n ```js\n let a = 1, b = 2;\n b = 3;\n ```\n\n ```js\n let a;\n a; // the variable is read before its assignment\n a = 0;\n ```\n\n ## Caveats\n\n Since v2.2, the rule no longer reports variables that are read in an inner function before being written.\n This can result in false negatives. For example, the following code is now valid:\n\n ```js\n let a;\n function f() {\n     return a; // read\n }\n a = 0; // written\n ```\n"
          },
          "useDefaultParameterLast": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useDefaultParameterLast",
            "link": "https://biomejs.dev/linter/rules/use-default-parameter-last",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "default-param-last"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "default-param-last"
                }
              }
            ],
            "docs": " Enforce default function parameters and optional function parameters to be last.\n\n Default and optional parameters that precede a required parameter cannot be omitted at call site.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function f(a = 0, b) {}\n ```\n\n ```js,expect_diagnostic\n function f(a, b = 0, c) {}\n ```\n\n ```ts,expect_diagnostic\n function f(a: number, b?: number, c: number) {}\n ```\n\n ```ts,expect_diagnostic\n class Foo {\n     constructor(readonly a = 10, readonly b: number) {}\n }\n ```\n\n ### Valid\n\n ```js\n function f(a, b = 0) {}\n ```\n\n ```ts\n function f(a: number, b?: number, c = 0) {}\n ```\n\n ```ts\n function f(a: number, b = 0, c?: number) {}\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "default-case"
                }
              }
            ],
            "docs": " Require the default clause in switch statements.\n\n Some code conventions require that all switch statements have a default clause. The thinking is that it’s better\n to always explicitly state what the default behavior should be so that it’s clear whether or not the developer\n forgot to include the default behavior by mistake.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n switch (a) {\n     case 1:\n         /* code */\n         break;\n }\n ```\n\n ### Valid\n\n ```js\n switch (a) {\n     case 1:\n         /* code */\n         break;\n     default:\n         /* code */\n         break;\n }\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "explicit-length-check"
                }
              }
            ],
            "docs": " Enforce explicitly comparing the `length`, `size`, `byteLength` or `byteOffset` property of a value.\n\n This rule enforces a specific style length comparisons to make them more clear.\n\n ## Zero comparison examples\n\n Enforce comparison with `=== 0` when checking for zero length.\n\n ### Invalid\n\n ```js,expect_diagnostic\n const isEmpty = !foo.length;\n ```\n ```js,expect_diagnostic\n const isEmpty = foo.length == 0;\n ```\n ```js,expect_diagnostic\n const isEmpty = foo.length < 1;\n ```\n ```js,expect_diagnostic\n const isEmpty = 0 === foo.length;\n ```\n ```js,expect_diagnostic\n const isEmpty = 0 == foo.length;\n ```\n ```js,expect_diagnostic\n const isEmpty = 1 > foo.length;\n ```\n ```js,expect_diagnostic\n // Negative style is disallowed too\n const isEmpty = !(foo.length > 0);\n ```\n ```js,expect_diagnostic\n const isEmptySet = !foo.size;\n ```\n\n ### Valid\n\n ```js\n const isEmpty = foo.length === 0;\n ```\n\n ## Non-zero comparison examples\n\n Enforce comparison with `> 0` when checking for non-zero length.\n\n ### Invalid\n ```js,expect_diagnostic\n const isNotEmpty = foo.length !== 0;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = foo.length != 0;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = foo.length >= 1;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = 0 !== foo.length;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = 0 != foo.length;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = 1 <= foo.length;\n ```\n ```js,expect_diagnostic\n const isNotEmpty = Boolean(foo.length);\n ```\n ```js,expect_diagnostic\n // Negative style is disallowed too\n const isNotEmpty = !(foo.length === 0);\n ```\n ```js,expect_diagnostic\n if (foo.length) {}\n ```\n ```js,expect_diagnostic\n const biome = foo.length ? 1 : 2\n ```\n ```js,expect_diagnostic\n while (foo.length) {}\n ```\n ```js,expect_diagnostic\n do {} while (foo.length);\n ```\n ```js,expect_diagnostic\n for (; foo.length; ) {};\n ```\n\n ### Valid\n\n ```js\n const isNotEmpty = foo.length > 0;\n ```\n ```js\n if (foo.length > 0 || bar.length > 0) {}\n ```\n\n ## Caveats\n\n This rule assumes that the `length`/`size` property is always numeric, even if it actually is not.\n In the example below the rule will trigger a warning, even though the `size` property is a string.\n\n ```js,expect_diagnostic\n const foo1 = { size: \"small\" }; if (foo1.size) {}\n ```\n\n To properly handle this case, type inference would be required, which is not supported by Biome at the moment.\n We recommend disabling this rule when working with non-numeric `length`/`size` properties.\n\n"
          },
          "useExponentiationOperator": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useExponentiationOperator",
            "link": "https://biomejs.dev/linter/rules/use-exponentiation-operator",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "prefer-exponentiation-operator"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintE18e": "prefer-exponentiation-operator"
                }
              }
            ],
            "docs": " Disallow the use of `Math.pow` in favor of the `**` operator.\n\n Introduced in ES2016, the infix exponentiation operator `**` is an alternative for the standard `Math.pow` function.\n Infix notation is considered to be more readable and thus more preferable than the function notation.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = Math.pow(2, 8);\n ```\n\n ```js,expect_diagnostic\n const bar = Math.pow(a, b);\n ```\n\n ```js,expect_diagnostic\n let baz = Math.pow(a + b, c + d);\n ```\n\n ```js,expect_diagnostic\n let quux = Math.pow(-1, n);\n ```\n\n ### Valid\n\n ```js\n const foo = 2 ** 8;\n\n const bar = a ** b;\n\n let baz = (a + b) ** (c + d);\n\n let quux = (-1) ** n;\n ```\n\n"
          },
          "useExportsLast": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useExportsLast",
            "link": "https://biomejs.dev/linter/rules/use-exports-last",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintImport": "exports-last"
                }
              }
            ],
            "docs": " Require that all exports are declared after all non-export statements.\n\n Enforces that export statements are placed at the end of the module, after all other statements.\n\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n export const a = 1;\n const b = 2;\n ```\n\n ### Valid\n\n ```js\n const a = 1;\n export const b = 2;\n ```\n\n ```js\n const a = 1;\n export { a };\n ```\n\n"
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
                "kind": "inspired",
                "source": {
                  "eslintUnicorn": "filename-case"
                }
              }
            ],
            "docs": " Enforce naming conventions for JavaScript and TypeScript filenames.\n\n Enforcing [naming conventions](https://en.wikipedia.org/wiki/Naming_convention_(programming)) helps to keep the codebase consistent.\n\n A filename consists of two parts: a name and a set of consecutive extensions.\n For instance, `my-filename.test.js` has `my-filename` as name, and two consecutive extensions: `.test` and `.js`.\n\n By default, the rule ensures that the name is either in [`camelCase`], [`kebab-case`], [`snake_case`],\n or equal to the name of one export in the file.\n By default, the rule ensures that the extensions are either in [`camelCase`], [`kebab-case`], or [`snake_case`].\n\n The rule supports the following exceptions:\n\n - The name of the file can start with a dot, a plus sign, or a dollar sign, be prefixed and suffixed by underscores `_`.\n   For example, `.filename.js`, `+filename.js`, `$filename.js`, `__filename__.js`, or even `.__filename__.js`.\n\n   - The convention of prefixing a filename with a plus sign is used by [Sveltekit](https://kit.svelte.dev/docs/routing#page) and [Vike](https://vike.dev/route).\n   - The convention of prefixing a filename with a dollar sign is used by [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/guide/routing#file-based-routing) for file-based routing.\n\n - Also, the rule supports dynamic route syntaxes of [Next.js](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments), [SolidStart](https://docs.solidjs.com/solid-start/building-your-application/routing#renaming-index), [Nuxt](https://nuxt.com/docs/guide/directory-structure/server#catch-all-route), and [Astro](https://docs.astro.build/en/guides/routing/#rest-parameters).\n   For example `[...slug].js` and `[[...slug]].js` are valid filenames.\n\n Note that if you specify the `match` option, the previous exceptions will no longer be handled.\n\n ## Ignoring some files\n\n Sometimes you want to completely ignore some files.\n Biome ignore comments cannot be used because the rule applies on filenames not file contents.\n To ignore files, you can use [`overrides`](https://biomejs.dev/reference/configuration/#overrides).\n If you want to ignore all files in the `test` directory, then you can disable the rule for those files only:\n\n ```json\n {\n   \"overrides\": [\n     {\n        \"includes\": [\"test/**/*\"],\n        \"linter\": {\n          \"rules\": {\n            \"style\": {\n              \"useFilenamingConvention\": \"off\"\n            }\n          }\n        }\n     }\n   ]\n }\n ```\n\n ## Options\n\n The rule provides several options that are detailed in the following subsections.\n\n ```jsonc,options\n {\n     \"options\": {\n         \"strictCase\": false,\n         \"requireAscii\": true,\n         \"match\": \"%?(.+?)[.](.+)\", // Since v2.0.0\n         \"filenameCases\": [\"camelCase\", \"export\"]\n     }\n }\n ```\n\n ### strictCase\n\n When this option is set to `true`, it forbids consecutive uppercase characters in [`camelCase`] and [`PascalCase`].\n For instance,  when the option is set to `true`, `agentID` will throw an error.\n This name should be renamed to `agentId`.\n\n When the option is set to `false`, consecutive uppercase characters are allowed.\n `agentID` is so valid.\n\n Default: `true`\n\n ### requireAscii\n\n When this option is set to `true`, it forbids names that include non-ASCII characters.\n For instance,  when the option is set to `true`, `café` or `안녕하세요` will throw an error.\n\n When the option is set to `false`, a name may include non-ASCII characters.\n `café` and `안녕하세요` are so valid.\n\n Default: `true`\n\n ### match\n\n `match` defines a regular expression that the filename must match.\n If the regex has capturing groups, then the first capture is considered as the filename\n and the second one as file extensions separated by dots.\n\n For example, given the regular expression `%?(.+?)\\.(.+)` and the filename `%index.d.ts`,\n the filename matches the regular expression with two captures: `index` and `d.ts`.\n The captures are checked against `filenameCases`.\n Note that we use the non-greedy quantifier `+?` to stop capturing as soon as we met the next character (`.`).\n If we use the greedy quantifier `+` instead, then the captures could be `index.d` and `ts`.\n\n The regular expression supports the following syntaxes:\n\n - Greedy quantifiers `*`, `?`, `+`, `{n}`, `{n,m}`, `{n,}`, `{m}`\n - Non-greedy quantifiers `*?`, `??`, `+?`, `{n}?`, `{n,m}?`, `{n,}?`, `{m}?`\n - Any character matcher `.`\n - Character classes `[a-z]`, `[xyz]`, `[^a-z]`\n - Alternations `|`\n - Capturing groups `()`\n - Non-capturing groups `(?:)`\n - Case-insensitive groups `(?i:)` and case-sensitive groups `(?-i:)`\n - A limited set of escaped characters including all special characters\n   and regular string escape characters `\\f`, `\\n`, `\\r`, `\\t`, `\\v`.\n   Note that you can also escape special characters using character classes.\n   For example, `\\$` and `[$]` are two valid patterns that escape `$`.\n\n ### filenameCases\n\n By default, the rule enforces that the filename  is either in [`camelCase`], [`kebab-case`], [`snake_case`], or equal to the name of one export in the file.\n\n You can enforce a stricter convention by setting `filenameCases` option.\n `filenameCases` accepts an array of cases among the following cases: [`camelCase`], [`kebab-case`], [`PascalCase`], [`snake_case`], and `export`.\n\n This option also applies to the file extensions.\n Extensions in lowercase are always allowed regardless of how `filenameCases` is set.\n\n [case]: https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats\n [`camelCase`]: https://en.wikipedia.org/wiki/Camel_case\n [`kebab-case`]: https://en.wikipedia.org/wiki/Letter_case#Kebab_case\n [`PascalCase`]: https://en.wikipedia.org/wiki/Camel_case\n [`snake_case`]: https://en.wikipedia.org/wiki/Snake_case\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "prefer-for-of"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "no-for-loop"
                }
              }
            ],
            "docs": " Prefer using `for...of` loops over standard `for` loops where possible.\n\n This rule recommends using a `for...of` loop in place of a `for` loop\n when the loop index is solely used to read from the iterated array.\n\n ### Exceptions for Index Usage\n When the loop index is declared within the outer scope or used anywhere within the loop body,\n it is acceptable to use a `for` loop.\n (`Array.entries()` can be used to a similar effect.)\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n for (let i = 0; i < array.length; i++) {\n   console.log(array[i]);\n }\n ```\n\n ### Valid\n\n ```js\n for (let item of array) {\n    console.log(item);\n  }\n ```\n\n ```js\n for (let i = 0; i < array.length; i++) {\n    // `i` is used, so for loop is OK\n    console.log(i, array[i]);\n  }\n ```\n\n ```js\n for (let i = 0, j = 0; i < array.length; i++) {\n    console.log(i, array[i]);\n  }\n ```\n\n ```js\n let i = 0;\n for (; i < array.length; i++) {\n    console.log(array[i]);\n  }\n ```\n\n"
          },
          "useGroupedAccessorPairs": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useGroupedAccessorPairs",
            "link": "https://biomejs.dev/linter/rules/use-grouped-accessor-pairs",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "grouped-accessor-pairs"
                }
              }
            ],
            "docs": " Enforce that getters and setters for the same property are adjacent in class and object definitions.\n\n When defining a property in a class or object, it's common to have both a getter and a setter.\n This rule enforces that getter is defined right before the setter,\n making the code more maintainable and easier to read.\n\n ## Examples\n\n ### Invalid\n\n Name getter and setter are not adjacent:\n\n ```js,expect_diagnostic\n class User {\n   get name() { return this._name; }\n   constructor() {}\n   set name(value) { this._name = value; }\n }\n ```\n\n Getter should go before the setter.\n\n ```js,expect_diagnostic\n const user = {\n   set name(value) { this._name = value; },\n   get name() { return this._name; }\n };\n ```\n\n ### Valid\n\n ```js\n class User {\n   get name() { return this._name; }\n   set name(value) { this._name = value; }\n   get age() { return this._age; }\n   set age(age) { this._age = age; }\n }\n ```\n\n This rule does not enforce the existence of both getter and setter for a property.\n Single getters without setters and setters without getters are ignored.\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "prefer-node-protocol"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintImport": "enforce-node-protocol-usage"
                }
              }
            ],
            "docs": " Enforces using the `node:` protocol for Node.js builtin modules.\n\n The rule marks traditional imports like `import fs from \"fs\";` as invalid,\n suggesting the format `import fs from \"node:fs\";` instead.\n\n The rule also isn't triggered if there are dependencies declared in the `package.json` that match\n the name of a built-in Node.js module.\n\n :::caution\n The rule doesn't support dependencies installed inside a monorepo.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import fs from 'fs';\n ```\n\n ```js,expect_diagnostic\n import os from 'os';\n ```\n\n ```js,expect_diagnostic\n import path from 'path';\n ```\n\n ### Valid\n\n ```js\n import fs from 'node:fs';\n\n import os from 'node:os';\n\n import path from 'node:path';\n ```\n\n"
          },
          "useNumberNamespace": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "useNumberNamespace",
            "link": "https://biomejs.dev/linter/rules/use-number-namespace",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "prefer-number-properties"
                }
              }
            ],
            "docs": " Use the `Number` properties instead of global ones.\n\n _ES2015_ moved some globals into the `Number` properties for consistency.\n\n The rule doesn't report the globals `isFinite` and `isNaN` because they have a slightly different behavior to their corresponding `Number`'s properties `Number.isFinite` and `Number.isNaN`.\n You can use the dedicated rules [noGlobalIsFinite](https://biomejs.dev/linter/rules/no-global-is-finite/) and  [noGlobalIsNan](https://biomejs.dev/linter/rules/no-global-is-nan/) to enforce the use of `Number.isFinite` and `Number.isNaN`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n parseInt(\"1\"); // true\n ```\n\n ```js,expect_diagnostic\n parseFloat(\"1.1\"); // true\n ```\n\n ```js,expect_diagnostic\n NaN; // true\n ```\n\n ```js,expect_diagnostic\n Infinity; // true\n ```\n\n ```js,expect_diagnostic\n -Infinity; // true\n ```\n\n ### Valid\n\n ```js\n Number.parseInt(\"1\"); // false\n ```\n\n ```js\n Number.parseFloat(\"1.1\"); // false\n ```\n\n ```js\n Number.NaN; // false\n ```\n\n ```js\n Number.POSITIVE_INFINITY; // false\n ```\n\n ```js\n Number.NEGATIVE_INFINITY; // false\n ```\n\n"
          },
          "useNumericSeparators": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useNumericSeparators",
            "link": "https://biomejs.dev/linter/rules/use-numeric-separators",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "numeric-separators-style"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "unreadable_literal"
                }
              }
            ],
            "docs": " Enforce the use of numeric separators in numeric literals.\n\n Enforces a convention of grouping digits using [numeric separators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_separators).\n Long numbers can become difficult to read, so separating groups of digits with an underscore (`_`) improves code clarity. This rule also enforces proper usage of the numeric separator, by checking if the groups of digits are of the correct size.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var a = 1234567890;\n ```\n\n ```js,expect_diagnostic\n var a = -999_99;\n ```\n\n ```js,expect_diagnostic\n var a = 0.1234567;\n ```\n\n ```js,expect_diagnostic\n var a = 0b11001100;\n ```\n\n ### Valid\n\n ```js\n var a = 1_234_567_890;\n ```\n\n ```js\n var a = -99_999;\n ```\n\n ```js\n var a = 0.123_456_7;\n ```\n\n ```js\n var a = 0b1100_1100;\n ```\n\n"
          },
          "useObjectSpread": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useObjectSpread",
            "link": "https://biomejs.dev/linter/rules/use-object-spread",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "prefer-object-spread"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintE18e": "prefer-spread-syntax"
                }
              }
            ],
            "docs": " Prefer object spread over `Object.assign()` when constructing new objects.\n\n Object spread syntax is more concise, more readable, and performs better\n than `Object.assign()` when creating a new object from existing objects.\n It also has better TypeScript integration.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n Object.assign({}, foo);\n ```\n\n ```js,expect_diagnostic\n Object.assign({}, { foo: 'bar' });\n ```\n\n ```js,expect_diagnostic\n Object.assign({ foo: 'bar' }, baz);\n ```\n\n ```js,expect_diagnostic\n Object.assign({}, baz, { foo: 'bar' });\n ```\n\n ### Valid\n\n ```js\n ({ ...foo });\n ```\n\n ```js\n ({ ...baz, foo: 'bar' });\n ```\n\n Modifying an existing object is allowed:\n ```js\n Object.assign(foo, { bar: baz });\n ```\n\n"
          },
          "useSelfClosingElements": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useSelfClosingElements",
            "link": "https://biomejs.dev/linter/rules/use-self-closing-elements",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintStylistic": "jsx-self-closing-comp"
                }
              }
            ],
            "docs": " Prevent extra closing tags for components without children.\n\n JSX elements without children should be marked as self-closing. In JSX, it is valid for any element to be self-closing.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div></div>\n ```\n\n ```jsx,expect_diagnostic\n <Component></Component>\n ```\n\n ```jsx,expect_diagnostic\n <Foo.bar></Foo.bar>\n ```\n\n ### Valid\n\n ```jsx\n <div />\n```\n\n ```jsx\n <div>child</div>\n```\n\n ```jsx\n <Component />\n```\n\n ```jsx\n <Component>child</Component>\n```\n\n ```jsx\n <Foo.bar />\n```\n\n ```jsx\n <Foo.bar>child</Foo.bar>\n```\n\n ## Options\n\n ### `ignoreHtmlElements`\n\n Default: `false`\n\n This option allows you to specify whether to ignore checking native HTML elements.\n\n In the following example, when the option is set to \"true\", it will not self close native HTML elements.\n\n ```json\n {\n     \"//\":\"...\",\n     \"options\": {\n         \"ignoreHtmlElements\": true\n     }\n }\n ```\n\n ```jsx,ignore\n <div></div>\n ```\n\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "operator-assignment"
                }
              }
            ],
            "docs": " Require assignment operator shorthand where possible.\n\n JavaScript provides shorthand operators combining a variable assignment and simple mathematical operation.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n a = a + 1;\n ```\n\n ```js,expect_diagnostic\n a = a - 1;\n ```\n\n  ```js,expect_diagnostic\n a = a * 1;\n ```\n\n ### Valid\n\n ```js\n a += 1;\n ```\n\n ```js\n a -= 1;\n ```\n\n  ```js\n a *= 1;\n ```\n"
          },
          "useSingleVarDeclarator": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useSingleVarDeclarator",
            "link": "https://biomejs.dev/linter/rules/use-single-var-declarator",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "one-var"
                }
              }
            ],
            "docs": " Disallow multiple variable declarations in the same variable statement\n\n In JavaScript, multiple variables can be declared within a single `var`, `const` or `let` declaration.\n It is often considered a best practice to declare every variable separately.\n That is what this rule enforces.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let foo = 0, bar, baz;\n ```\n\n ### Valid\n\n ```js\n const foo = 0;\n let bar;\n let baz;\n ```\n\n ```js\n for (let i = 0, x = 1; i < arr.length; i++) {}\n ```\n"
          },
          "useSymbolDescription": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useSymbolDescription",
            "link": "https://biomejs.dev/linter/rules/use-symbol-description",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "symbol-description"
                }
              }
            ],
            "docs": " Require a description parameter for the `Symbol()`.\n\n `Symbol` can have an optional description parameter which can be useful for\n debugging and making the purpose of the symbol clearer.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n Symbol();\n ```\n ```js,expect_diagnostic\n Symbol('');\n ```\n```js,expect_diagnostic\n Symbol(``);\n ```\n\n ### Valid\n\n ```js\n Symbol('description');\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "prefer-template"
                }
              }
            ],
            "docs": " Prefer template literals over string concatenation.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const s = foo + \"baz\";\n ```\n\n ```js,expect_diagnostic\n const s = 1 + 2 + \"foo\" + 3;\n ```\n\n ```js,expect_diagnostic\n const s = 1 * 2 + \"foo\";\n ```\n\n ```js,expect_diagnostic\n const s = 1 + \"foo\" + 2 + \"bar\" + \"baz\" + 3;\n ```\n\n ### Valid\n\n ```js\n let s = \"foo\" + \"bar\" + `baz`;\n ```\n\n ```js\n let s = `value: ${1}`;\n ```\n"
          },
          "useThrowNewError": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "useThrowNewError",
            "link": "https://biomejs.dev/linter/rules/use-throw-new-error",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "throw-new-error"
                }
              }
            ],
            "docs": " Require `new` when throwing an error.\n\n While it's possible to instantiate `Error` without using the `new` keyword, it's better to be consistent: modern builtins require `new` to be instantiated.\n\n Rule matches errors when their name ends with the word \"Error\" and the first character is uppercase.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n throw Error();\n ```\n ```js,expect_diagnostic\n throw TypeError('biome');\n ```\n ```js,expect_diagnostic\n throw lib.TypeError();\n ```\n\n ### Valid\n\n ```js\n throw new Error();\n ```\n ```js\n throw new TypeError('biome');\n ```\n ```js\n throw new lib.TypeError();\n ```\n\n"
          },
          "useThrowOnlyError": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "useThrowOnlyError",
            "link": "https://biomejs.dev/linter/rules/use-throw-only-error",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslint": "no-throw-literal"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "only-throw-error"
                }
              }
            ],
            "docs": " Disallow throwing non-`Error` values.\n\n It is considered good practice only to throw the `Error` object itself or an object using the `Error` object\n as base objects for user-defined exceptions. The fundamental benefit of `Error` objects is that they automatically\n keep track of where they were built and originated.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n throw undefined;\n ```\n ```js,expect_diagnostic\n throw false;\n ```\n ```js,expect_diagnostic\n throw \"a\" + \"b\";\n ```\n\n ### Valid\n\n ```js\n throw new Error();\n ```\n ```js\n throw new TypeError('biome');\n ```\n ```js\n class CustomError extends Error {}\n\n throw new CustomError();\n ```\n\n ## Caveats\n\n This rule only covers cases where throwing the value can be known statically.\n Complex cases such as object and function access aren't checked.\n This will be improved in the future once Biome supports type inference.\n\n"
          },
          "useTrimStartEnd": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "useTrimStartEnd",
            "link": "https://biomejs.dev/linter/rules/use-trim-start-end",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "prefer-string-trim-start-end"
                }
              }
            ],
            "docs": " Enforce the use of `String.trimStart()` and `String.trimEnd()` over `String.trimLeft()` and `String.trimRight()`.\n\n While `String.trimLeft()` and `String.trimRight()` are aliases for `String.trimStart()` and `String.trimEnd()`,\n only using the latter pair ensures consistency and is preferable for their direction-independent wording.\n\n Note that `String.trimStart()` and `String.trimEnd()` methods do not take any parameters. Any arguments passed to these methods will be ignored.\n See the MDN documentation for more details:\n - [String.prototype.trimStart()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart)\n - [String.prototype.trimEnd()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd)\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = bar.trimLeft();\n ```\n\n ```js,expect_diagnostic\n const foo = bar.trimRight();\n ```\n\n ### Valid\n\n ```js\n const foo = bar.trimStart();\n ```\n\n ```js\n const foo = bar.trimEnd();\n ```\n\n"
          }
        },
        "suspicious": {
          "noAlert": {
            "deprecated": false,
            "version": "2.1.0",
            "name": "noAlert",
            "link": "https://biomejs.dev/linter/rules/no-alert",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-alert"
                }
              }
            ],
            "docs": " Disallow the use of `alert`, `confirm`, and `prompt`.\n\n JavaScript's `alert`, `confirm`, and `prompt` functions are widely considered to be obtrusive\n as UI elements and should be replaced by a more appropriate custom UI implementation.\n Furthermore, `alert` is often used while debugging code, which should be removed before\n deployment to production.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n alert(\"here!\");\n ```\n\n ```js,expect_diagnostic\n confirm(\"Are you sure?\");\n ```\n\n ```js,expect_diagnostic\n prompt(\"What's your name?\", \"John Doe\");\n ```\n\n ### Valid\n\n ```js\n customAlert(\"Something happened!\");\n ```\n\n ```js\n customConfirm(\"Are you sure?\");\n ```\n\n ```js\n customPrompt(\"Who are you?\");\n ```\n\n ```js\n function foo() {\n     const alert = myCustomLib.customAlert;\n     alert();\n }\n ```\n"
          },
          "noApproximativeNumericConstant": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "noApproximativeNumericConstant",
            "link": "https://biomejs.dev/linter/rules/no-approximative-numeric-constant",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "approx_constant"
                }
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
                "kind": "inspired",
                "source": {
                  "eslint": "no-cond-assign"
                }
              }
            ],
            "docs": " Disallow assignments in expressions.\n\n In expressions, it is common to mistype a comparison operator (such as `==`) as an assignment operator (such as `=`).\n Moreover, the use of assignments in expressions is confusing.\n Indeed, expressions are often considered as side-effect free.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n let a, b;\n a = (b = 1) + 1;\n ```\n\n ```ts,expect_diagnostic\n let a;\n if (a = 1) {\n }\n ```\n\n ```ts,expect_diagnostic\n function f(a) {\n     return a = 1;\n }\n ```\n\n ### Valid\n\n ```ts\n let a;\n a = 1;\n ```\n\n ```ts\n let a = 0;\n const f = b => a += b;\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-async-promise-executor"
                }
              }
            ],
            "docs": " Disallows using an async function as a Promise executor.\n\n The executor function can also be an async function. However, this is usually a mistake, for a few reasons:\n 1. If an async executor function throws an error, the error will be lost and won't cause the newly-constructed `Promise` to reject. This could make it difficult to debug and handle some errors.\n 2. If a Promise executor function is using `await`, this is usually a sign that it is not actually necessary to use the `new Promise` constructor, or the scope of the `new Promise` constructor can be reduced.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n new Promise(async function foo(resolve, reject) {})\n ```\n\n ```js,expect_diagnostic\n   new Promise(async (resolve, reject) => {})\n ```\n\n ```js,expect_diagnostic\n   new Promise(((((async () => {})))))\n ```\n\n ### Valid\n\n ```js\n   new Promise((resolve, reject) => {})\n   new Promise((resolve, reject) => {}, async function unrelated() {})\n   new Foo(async (resolve, reject) => {})\n   new Foo((( (resolve, reject) => {} )))\n ```\n"
          },
          "noBitwiseOperators": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noBitwiseOperators",
            "link": "https://biomejs.dev/linter/rules/no-bitwise-operators",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-bitwise"
                }
              }
            ],
            "docs": " Disallow bitwise operators.\n\n The use of bitwise operators in JavaScript is very rare and often `&` or `|` is simply a mistyped `&&` or `||`,\n which will lead to unexpected behavior.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let x = y | z;\n ```\n\n ```js,expect_diagnostic\n x |= y;\n ```\n\n ### Valid\n\n ```js\n let x = y || z;\n ```\n\n ```js\n let x = y && z;\n ```\n\n ## Options\n\n The rule provides the options described below.\n\n ### allow\n\n Allows a list of bitwise operators to be used as exceptions.\n\n ```json,options\n {\n     \"options\": {\n         \"allow\": [\"&\", \"|\", \"^\", \"~\", \"<<\", \">>\", \">>>\"]\n     }\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-ex-assign"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-class-assign"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-compare-neg-zero"
                }
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
                "kind": "inspired",
                "source": {
                  "eslint": "no-labels"
                }
              }
            ],
            "docs": " Disallow labeled statements that are not loops.\n\n Labeled statements in JavaScript are used in conjunction with `break` and `continue` to control flow around multiple loops.\n Their use for other statements is suspicious and unfamiliar.\n\n The rule ignores reactive Svelte statements in Svelte components.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n label: f();\n ```\n\n ```js,expect_diagnostic\n label: {\n     f();\n     break label;\n }\n ```\n\n ```js,expect_diagnostic\n label: if (a) {\n     f()\n     break label;\n }\n ```\n\n ```js,expect_diagnostic\n label: switch (a) {\n     case 0:\n         break label;\n }\n ```\n\n ### Valid\n\n ```js\n outer: while (a) {\n     while(b) {\n         break outer;\n     }\n }\n ```\n\n ```svelte\n <script>\n $: { /* reactive block */ }\n </script>\n ```\n ## Options\n\n Use the options to allow specific labels in your code.\n Labels can be used to mark code that should be removed under certain conditions,\n such as in production builds.\n Some bundlers, such as [esbuild](https://esbuild.github.io/api/#drop-labels) and Vite,\n can be configured to remove labeled statements.\n\n ```json,options\n {\n     \"options\": {\n         \"allowedLabels\": [\"DEV\"]\n     }\n }\n ```\n\n ```js,use_options\n DEV: assertSomeCondition();\n ```\n\n"
          },
          "noConsole": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noConsole",
            "link": "https://biomejs.dev/linter/rules/no-console",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-console"
                }
              }
            ],
            "docs": " Disallow the use of `console`.\n\n In a browser environment, it’s considered a best practice to log messages using `console`.\n Such messages are considered to be for debugging purposes and therefore not suitable to ship to the client.\n In general, calls using `console` should be stripped before being pushed to production.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n console.error('hello world')\n ```\n\n ## Options\n\n Use the options to explicitly allow a specific subset of `console` methods.\n\n ```json,options\n {\n   \"options\": {\n     \"allow\": [\"assert\", \"error\", \"info\", \"warn\"]\n   }\n }\n ```\n\n ```js,expect_diagnostic,use_options\n console.error(\"error message\"); // Allowed\n console.warn(\"warning message\"); // Allowed\n console.info(\"info message\"); // Allowed\n console.log(\"log message\");\n console.assert(true, \"explanation\"); // Allowed\n ```\n"
          },
          "noConstantBinaryExpressions": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noConstantBinaryExpressions",
            "link": "https://biomejs.dev/linter/rules/no-constant-binary-expressions",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-constant-binary-expression"
                }
              }
            ],
            "docs": " Disallow expressions where the operation doesn't affect the value\n\n Comparisons which will always evaluate to true or false and logical expressions\n (`||`, `&&`, `??`) which either always short-circuit or never short-circuit are both likely\n indications of programmer error.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const value1 = +x == null;\n ```\n\n ```js,expect_diagnostic\n const value2 = condition ? x : {} || DEFAULT;\n ```\n\n ```js,expect_diagnostic\n const value3 = !foo == null;\n ```\n\n ```js,expect_diagnostic\n const value4 = new Boolean(foo) === true;\n ```\n\n ```js,expect_diagnostic\n const objIsEmpty = someObj === {};\n ```\n\n ```js,expect_diagnostic\n const arrIsEmpty = someArr === [];\n ```\n\n ```js,expect_diagnostic\n const shortCircuit1 = condition1 && false && condition2;\n ```\n\n ```js,expect_diagnostic\n const shortCircuit2 = condition1 || true || condition2;\n ```\n\n ```js,expect_diagnostic\n const shortCircuit3 = condition1 ?? \"non-nullish\" ?? condition2;\n ```\n\n ### Valid\n\n ```js\n const value1 = x == null;\n ```\n\n ```js\n const value2 = (condition ? x : {}) || DEFAULT;\n ```\n\n ```js\n const value3 = !(foo == null);\n ```\n\n ```js\n const value4 = Boolean(foo) === true;\n ```\n\n ```js\n const objIsEmpty = Object.keys(someObj).length === 0;\n ```\n\n ```js\n const arrIsEmpty = someArr.length === 0;\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-control-regex"
                }
              }
            ],
            "docs": " Prevents from having control characters and some escape sequences that match control characters in regular expression literals.\n\n Control characters are hidden special characters that are numbered from 0 to 31 in the ASCII system.\n They're not commonly used in JavaScript text. So, if you see them in a pattern (called a regular expression), it's probably a mistake.\n\n The following elements of regular expression patterns are considered possible errors in typing and are therefore disallowed by this rule:\n\n - Hexadecimal character escapes from `\\x00` to `\\x1F`\n - Unicode character escapes from `\\u0000` to `\\u001F`\n - Unicode code point escapes from `\\u{0}` to `\\u{1F}`\n - Unescaped raw characters from U+0000 to U+001F\n\n Control escapes such as `\\t` and `\\n` are allowed by this rule.\n\n ## Examples\n\n ### Invalid\n ```js,expect_diagnostic\n  var pattern1 = /\\x00/;\n ```\n ```js,expect_diagnostic\n  var pattern2 = /\\x0C/;\n ```\n ```js,expect_diagnostic\n  var pattern3 = /\\x1F/;\n ```\n ```js,expect_diagnostic\n  var pattern4 = /\\u000C/;\n ```\n ```js,expect_diagnostic\n  var pattern5 = /\\u{C}/u;\n ```\n\n ### Valid\n ```js\n var pattern1 = /\\x20/;\n var pattern2 = /\\u0020/;\n var pattern3 = /\\u{20}/u;\n var pattern4 = /\\t/;\n var pattern5 = /\\n/;\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-debugger"
                }
              }
            ],
            "docs": " Disallow the use of `debugger`\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n debugger;\n ```\n\n ### Valid\n\n ```js\n const test = { debugger: 1 };\n test.debugger;\n```\n"
          },
          "noDeprecatedImports": {
            "deprecated": false,
            "version": "2.2.5",
            "name": "noDeprecatedImports",
            "link": "https://biomejs.dev/linter/rules/no-deprecated-imports",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "no-deprecated"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintImport": "no-deprecated"
                }
              }
            ],
            "docs": " Restrict imports of deprecated exports.\n\n This rule flags any imports for symbols (such as types, functions, or\n anything else that can be imported), that are documented with a JSDoc\n comment that contains an \"@deprecated\" annotation.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic,file=foo.js\n import { oldUtility } from \"./utils.js\";\n ```\n\n ```js,file=utils.js\n /**\n  * @deprecated\n  */\n export function oldUtility() {}\n ```\n\n ### Valid\n\n ```js,file=foo.js\n import { newUtility, oldUtility } from \"./utils.js\";\n ```\n\n ```js,file=utils.js\n export function newUtility() {}\n\n // @deprecated (this is not a JSDoc comment)\n export function oldUtility() {}\n ```\n\n"
          },
          "noDocumentCookie": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "noDocumentCookie",
            "link": "https://biomejs.dev/linter/rules/no-document-cookie",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "no-document-cookie"
                }
              }
            ],
            "docs": " Disallow direct assignments to `document.cookie`.\n\n It's not recommended to use document.cookie directly as it's easy to get the string wrong.\n Instead, you should use the [Cookie Store API](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore).\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n document.cookie = \"foo=bar\";\n ```\n\n ```js,expect_diagnostic\n document.cookie += \"; foo=bar\";\n ```\n\n ### Valid\n\n ```js\n const array = document.cookie.split(\"; \");\n ```\n\n ```js\n await cookieStore\n   .set({\n     name: \"foo\",\n     value: \"bar\",\n     expires: Date.now() + 24 * 60 * 60,\n     domain: \"example.com\",\n })\n ```\n\n ```js\n import Cookies from 'js-cookie';\n\n Cookies.set('foo', 'bar');\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "eqeqeq"
                }
              }
            ],
            "docs": " Require the use of `===` and `!==`.\n\n It is generally bad practice to use `==` for comparison instead of\n `===`. Double operators will trigger implicit [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)\n and are thus not preferred. Using strict equality operators is almost\n always best practice.\n\n For ergonomic reasons, this rule makes by default an exception for `== null` for\n comparing to both `null` and `undefined`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n foo == bar\n ```\n\n ### Valid\n\n ```js\n foo == null\n```\n\n ```js\n foo != null\n```\n\n ```js\n null == foo\n```\n\n ```js\n null != foo\n```\n\n ## Options\n\n The rule provides the option described below.\n\n ```json\n {\n     \"//\":\"...\",\n     \"options\": {\n         \"ignoreNull\": true\n     }\n }\n ```\n\n ### ignoreNull\n\n When this option is set to `true`, an exception will be made for checking against `null`,\n as relying on the double equals operator to compare with `null` is frequently used to check\n equality with either `null` or `undefined`.\n\n When the option is set to `false`, all double equal operators will be forbidden without\n exceptions.\n\n Default: `true`\n\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-duplicate-case"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-dupe-class-members"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-dupe-class-members"
                }
              }
            ],
            "docs": " Disallow duplicate class members.\n\n If there are declarations of the same name among class members,\n the last declaration overwrites other declarations silently.\n It can cause unexpected behaviours.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class Foo {\n   bar() { }\n   bar() { }\n }\n ```\n\n ```js,expect_diagnostic\n class Foo {\n   bar() { }\n   get bar() { }\n }\n ```\n\n ```js,expect_diagnostic\n class Foo {\n   bar;\n   bar() { }\n }\n ```\n\n ```js,expect_diagnostic\n class Foo {\n   static bar() { }\n   static bar() { }\n }\n ```\n\n ### Valid\n\n ```js\n class Foo {\n   bar() { }\n   qux() { }\n }\n ```\n\n ```js\n class Foo {\n   set bar(value) { }\n   get bar() { }\n }\n ```\n\n ```js\n class Foo {\n   bar;\n   qux;\n }\n ```\n\n ```js\n class Foo {\n   bar;\n   qux() { }\n }\n ```\n\n ```js\n class Foo {\n   static bar() { }\n   bar() { }\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-dupe-else-if"
                }
              }
            ],
            "docs": " Disallow duplicate conditions in if-else-if chains\n\n if-else-if chains are commonly used when there is a need to execute only one branch\n (or at most one branch) out of several possible branches, based on certain conditions.\n\n Two identical test conditions in the same chain are almost always a mistake in the code.\n Unless there are side effects in the expressions,\n a duplicate will evaluate to the same true or false value as the identical expression earlier in the chain,\n meaning that its branch can never execute.\n\n Please note that this rule does not compare conditions from the chain with conditions inside statements\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n if (a) {\n     foo();\n } else if (b) {\n     bar();\n } else if (b) {\n     baz();\n }\n ```\n\n ### Valid\n\n ```js\n if (a) {\n     foo();\n } else if (b) {\n     bar();\n } else if (c) {\n     baz();\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-dupe-keys"
                }
              }
            ],
            "docs": " Disallow two keys with the same name inside objects.\n\n If an object property with the same name is defined multiple times (except when combining a getter with a setter), only the last definition makes it into the object and previous definitions are ignored, which is likely a mistake.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const obj = {\n\t\ta: 1,\n\t\ta: 2,\n }\n ```\n\n ```js,expect_diagnostic\n const obj = {\n\t\tset a(v) {},\n\t\ta: 2,\n }\n ```\n\n ### Valid\n\n ```js\n const obj = {\n\t\ta: 1,\n\t\tb: 2,\n }\n ```\n\n ```js\n const obj = {\n\t\tget a() { return 1; },\n\t\tset a(v) {},\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-dupe-args"
                }
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
                "kind": "inspired",
                "source": {
                  "eslintJest": "no-duplicate-hooks"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintVitest": "no-duplicate-hooks"
                }
              }
            ],
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-empty"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-empty-static-block"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-empty-function"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-empty-function"
                }
              }
            ],
            "docs": " Disallow empty block statements and static blocks.\n\n Empty static blocks and block statements, while not technically errors, usually occur due to refactoring that wasn’t completed. They can cause confusion when reading code.\n\n This rule disallows empty block statements and static blocks.\n This rule ignores block statements or static blocks which contain a comment (for example, in an empty catch or finally block of a try statement to indicate that execution should continue regardless of errors).\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function emptyFunctionBody () {}\n ```\n\n ```js,expect_diagnostic\n try {\n     doSomething();\n } catch(ex) {\n\n }\n ```\n\n ```js,expect_diagnostic\n class Foo {\n   static {}\n }\n ```\n\n ### Valid\n\n ```js\n function foo () {\n     doSomething();\n }\n ```\n\n ```js\n try {\n   doSomething();\n } catch (ex) {\n   // continue regardless of error\n }\n ```\n\n"
          },
          "noEmptySource": {
            "deprecated": false,
            "version": "2.2.7",
            "name": "noEmptySource",
            "link": "https://biomejs.dev/linter/rules/no-empty-source",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "no-empty-file"
                }
              }
            ],
            "docs": " Disallow empty sources.\n\n A source containing only the following is considered empty:\n   - Whitespace (spaces, tabs or newlines)\n   - Comments\n   - Directives\n   - Empty statements\n   - Empty block statements\n   - Hashbang\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n\n ```\n\n ```js,expect_diagnostic\n // Only comments\n ```\n\n ```js,expect_diagnostic\n /* Only comments */\n ```\n\n ```js,expect_diagnostic\n 'use strict';\n ```\n\n ```js,expect_diagnostic\n ;\n ```\n\n ```js,expect_diagnostic\n {\n }\n ```\n\n ```js,expect_diagnostic\n #!/usr/bin/env node\n ```\n\n ### Valid\n\n ```js\n const x = 0;\n ```\n\n ```js\n 'use strict';\n const x = 0;\n ```\n\n ```js\n ;;\n const x = 0;\n ```\n\n ```js\n {\n   const x = 0;\n }\n ```\n\n ## Options\n\n ### `allowComments`\n\n Whether the comments should be marked as meaningful.\n When this option has been set to `true`, a file with only comments is considered valid.\n\n Default `false`\n\n ```json,options\n {\n   \"options\": {\n     \"allowComments\": true\n   }\n }\n ```\n\n #### Invalid\n\n ```js,expect_diagnostic,use_options\n\n ```\n\n #### Valid\n\n ```js,use_options\n /* Only comments */\n ```\n\n"
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
                "kind": "inspired",
                "source": {
                  "eslintJest": "no-export"
                }
              }
            ],
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-fallthrough"
                }
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
                "kind": "inspired",
                "source": {
                  "eslintJest": "no-focused-tests"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintVitest": "no-focused-tests"
                }
              }
            ],
            "docs": " Disallow focused tests.\n\n Disabled test are useful when developing and debugging, because it forces the test suite to run only certain tests.\n\n However, in pull/merge request, you usually want to run all the test suite.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n describe.only(\"foo\", () => {});\n ```\n\n ```js,expect_diagnostic\n test.only(\"foo\", () => {});\n ```\n\n ```js,expect_diagnostic\n test.only.each([[\"a\"]])(\"%s\", (a) => {});\n ```\n\n ### Valid\n ```js\n test(\"foo\", () => {});\n ```\n\n ```js\n test.each([[\"a\"]])(\"%s\", (a) => {});\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-func-assign"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-global-assign"
                }
              }
            ],
            "docs": " Disallow assignments to native objects and read-only global variables.\n\n JavaScript's environments contain numerous built-in global variables, such as `window` in browsers and `process` in Node.js.\n Assigning values to these global variables can be problematic as it can override essential functionality.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n Object = null;\n ```\n\n ```js,expect_diagnostic\n window = {};\n ```\n\n ```js,expect_diagnostic\n undefined = true;\n ```\n\n ### Valid\n\n ```js\n a = 0;\n ```\n\n ```js\n let window;\n window = {};\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-import-assign"
                }
              }
            ],
            "docs": "  Disallow assigning to imported bindings\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import x from \"y\";\n x = 1;\n ```\n ```js,expect_diagnostic\n import y from \"y\";\n [y] = 1;\n ```\n ```js,expect_diagnostic\n import z from \"y\";\n ({ z } = 1);\n ```\n ```js,expect_diagnostic\n import a from \"y\";\n [...a] = 1;\n ```\n ```js,expect_diagnostic\n import b from \"y\";\n ({ ...b } = 1);\n ```\n ```js,expect_diagnostic\n import c from \"y\";\n for (c in y) {};\n ```\n\n ```js,expect_diagnostic\n import d from \"y\";\n d += 1;\n ```\n ```js,expect_diagnostic\n import * as e from \"y\";\n e = 1;\n ```\n"
          },
          "noImportCycles": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noImportCycles",
            "link": "https://biomejs.dev/linter/rules/no-import-cycles",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintImport": "no-cycle"
                }
              }
            ],
            "docs": " Prevent import cycles.\n\n This rule warns when a file imports another file that, either directly\n or indirectly, imports the original file again.\n\n Cycles can lead to symbols that are unexpectedly `undefined` and are\n generally considered poor code hygiene.\n\n If a cycle is detected, it is advised to move code such that imports\n only go in a single direction, i.e. they don't point \"back\" to the\n importing file.\n\n However, files that import themselves are allowed, and the rule won't trigger for these use cases.\n This allows for encapsulation of functions/variables into a namespace instead of using a\n static class (triggers [noStaticOnlyClass](https://biomejs.dev/linter/rules/no-static-only-class)).\n\n :::note\n This rule is computationally expensive. If you are particularly\n pressed for lint time, or don't think you have an issue with dependency\n cycles, you may not want this rule enabled.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic,file=foobar.js\n import { baz } from \"./baz.js\";\n\n export function foo() {\n     baz();\n }\n\n export function bar() {\n     console.log(\"foobar\");\n }\n ```\n\n ```js,expect_diagnostic,file=baz.js\n import { bar } from \"./foobar.js\";\n\n export function baz() {\n     bar();\n }\n ```\n\n ### Valid\n\n ```js,file=foo.js\n import { baz } from \"./baz.js\";\n\n export function foo() {\n     baz();\n }\n ```\n\n ```js,file=bar.js\n export function bar() {\n     console.log(\"foobar\");\n }\n ```\n\n ```js,file=baz.js\n import { bar } from \"./bar.js\";\n\n export function baz() {\n     bar();\n }\n ```\n\n ```js,file=foobaz.js\n export function foo() {\n     console.log(\"foobaz\");\n }\n\n export * as baz from './foobaz.js';\n\n import { baz } from './foobaz.js';\n ```\n\n ```ts,file=types.ts\n import type { bar } from \"./qux.ts\";\n\n export type Foo = {\n   bar: typeof bar;\n };\n ```\n\n ```ts,file=qux.ts\n import type { Foo } from \"./types.ts\";\n\n export function bar(foo: Foo) {\n     console.log(foo);\n }\n ```\n\n ## Options\n\n The rule provides the options described below.\n\n ### `ignoreTypes`\n\n Ignores type-only imports when finding an import cycle. A type-only import (`import type`)\n will be removed by the compiler, so it cuts an import cycle at runtime. Note that named type\n imports (`import { type Foo }`) aren't considered as type-only because it's not removed by\n the compiler if the `verbatimModuleSyntax` option is enabled. Enabled by default.\n\n ```json,options\n {\n   \"options\": {\n     \"ignoreTypes\": false\n   }\n }\n ```\n\n #### Invalid\n\n ```ts,file=types.ts\n import type { bar } from \"./qux.ts\";\n\n export type Foo = {\n   bar: typeof bar;\n };\n ```\n\n ```ts,use_options,expect_diagnostic,file=qux.ts\n import type { Foo } from \"./types.ts\";\n\n export function bar(foo: Foo) {\n     console.log(foo);\n }\n ```\n"
          },
          "noIrregularWhitespace": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noIrregularWhitespace",
            "link": "https://biomejs.dev/linter/rules/no-irregular-whitespace",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-irregular-whitespace"
                }
              }
            ],
            "docs": " Disallows the use of irregular whitespace characters.\n\n Invalid or irregular whitespace causes issues with various parsers and also makes code harder to debug.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let\u000bcount;\n ```\n\n ```js,expect_diagnostic\n let foo;\n ```\n\n ### Valid\n\n ```js\n const count = 1;\n ```\n\n ```js\n const foo = '\u000b';\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-label-var"
                }
              }
            ],
            "docs": " Disallow labels that share a name with a variable\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const x1 = \"test\";\n x1: expr;\n ```\n\n ### Valid\n\n ```js\n const x = \"test\";\n z: expr;\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-misleading-character-class"
                }
              }
            ],
            "docs": " Disallow characters made with multiple code points in character class syntax.\n\n Unicode includes the characters which are made with multiple code points. e.g. Á, 🇯🇵, 👨‍👩‍👦.\n A RegExp character class `/[abc]/` cannot handle characters with multiple code points.\n For example, the character `❇️` consists of two code points: `❇` (U+2747) and `VARIATION SELECTOR-16` (U+FE0F).\n If this character is in a RegExp character class, it will match to either `❇` or `VARIATION SELECTOR-16` rather than `❇️`.\n This rule reports the regular expression literals which include multiple code point characters in character class syntax.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n /^[Á]$/u;\n ```\n\n ```js,expect_diagnostic\n /^[❇️]$/u;\n ```\n\n ```js,expect_diagnostic\n /^[👶🏻]$/u;\n ```\n\n ```js,expect_diagnostic\n /^[🇯🇵]$/u;\n ```\n\n ```js,expect_diagnostic\n /^[👨‍👩‍👦]$/u;\n ```\n\n ```js,expect_diagnostic\n /^[👍]$/; // surrogate pair without u flag\n ```\n\n ### Valid\n\n ```js\n /^[abc]$/;\n /^[👍]$/u;\n /^[\\q{👶🏻}]$/v;\n ```\n"
          },
          "noMisplacedAssertion": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noMisplacedAssertion",
            "link": "https://biomejs.dev/linter/rules/no-misplaced-assertion",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintJest": "no-standalone-expect"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintVitest": "no-standalone-expect"
                }
              }
            ],
            "docs": " Checks that the assertion function, for example `expect`, is placed inside an `it()` function call.\n\n Placing (and using) the `expect` assertion function can result in unexpected behaviors when executing your testing suite.\n\n The rule will check for the following assertion calls:\n - `expect`\n - `assert`\n - `assertEquals`\n\n However, the rule will ignore the following assertion calls:\n - `expect.any`\n - `expect.anything`\n - `expect.closeTo`\n - `expect.arrayContaining`\n - `expect.objectContaining`\n - `expect.stringContaining`\n - `expect.stringMatching`\n - `expect.extend`\n - `expect.addEqualityTesters`\n - `expect.addSnapshotSerializer`\n\n If the assertion function is imported, the rule will check if they are imported from:\n - `\"chai\"`\n - `\"node:assert\"`\n - `\"node:assert/strict\"`\n - `\"bun:test\"`\n - `\"vitest\"`\n - Deno assertion module URL\n\n Check the [options](#options) if you need to change the defaults.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n describe(\"describe\", () => {\n     expect()\n })\n ```\n\n ```js,expect_diagnostic\n import assert from \"node:assert\";\n describe(\"describe\", () => {\n     assert.equal()\n })\n ```\n\n ```js,expect_diagnostic\n import {test, expect} from \"bun:test\";\n expect(1, 2)\n ```\n\n ```js,expect_diagnostic\n import {assertEquals} from \"https://deno.land/std@0.220.0/assert/mod.ts\";\n\n assertEquals(url.href, \"https://deno.land/foo.js\");\n Deno.test(\"url test\", () => {\n     const url = new URL(\"./foo.js\", \"https://deno.land/\");\n });\n ```\n\n ### Valid\n\n ```js\n import assert from \"node:assert\";\n describe(\"describe\", () => {\n     it(\"it\", () => {\n         assert.equal()\n     })\n })\n ```\n\n ```js\n describe(\"describe\", () => {\n     it(\"it\", () => {\n         expect()\n     })\n })\n ```\n\n ```js\n test.each([1, 2, 3])('test', (a, b, expected) => {\n     expect(a + b).toBe(expected)\n })\n ```\n\n ```js\n import { waitFor } from '@testing-library/react';\n await waitFor(() => {\n   expect(111).toBe(222);\n });\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "clippy": "misrefactored_assign_op"
                }
              }
            ],
            "docs": " Disallow shorthand assign when variable appears on both sides.\n\n This rule helps to avoid potential bugs related to incorrect assignments or unintended\n side effects that may occur during refactoring.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n a += a + b\n ```\n\n ```js,expect_diagnostic\n a -= a - b\n ```\n\n ```js,expect_diagnostic\n a *= a * b\n ```\n\n ### Valid\n\n ```js\n a += b\n ```\n\n ```js\n a = a + b\n ```\n\n ```js\n a = a - b\n ```\n"
          },
          "noNonNullAssertedOptionalChain": {
            "deprecated": false,
            "version": "2.1.4",
            "name": "noNonNullAssertedOptionalChain",
            "link": "https://biomejs.dev/linter/rules/no-non-null-asserted-optional-chain",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-non-null-asserted-optional-chain"
                }
              }
            ],
            "docs": " Disallow non-null assertions after optional chaining expressions.\n\n Optional chaining (`?.`) is designed to return `undefined` if the object is `null` or `undefined`.\n Using a non-null assertion (`!`) immediately after optional chaining defeats the purpose\n of optional chaining and can lead to runtime errors.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n obj?.prop!;\n ```\n\n ```ts,expect_diagnostic\n obj?.method()!.prop;\n ```\n\n ```ts,expect_diagnostic\n obj?.[key]!.method();\n ```\n\n ### Valid\n\n ```ts\n obj?.prop;\n ```\n\n ```ts\n obj!.prop?.method();\n ```\n\n ```ts\n obj?.prop ?? defaultValue;\n ```\n\n"
          },
          "noOctalEscape": {
            "deprecated": false,
            "version": "1.9.3",
            "name": "noOctalEscape",
            "link": "https://biomejs.dev/linter/rules/no-octal-escape",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-octal-escape"
                }
              }
            ],
            "docs": " Disallow octal escape sequences in string literals\n\n As of the ECMAScript 5 specification, octal escape sequences in string literals are deprecated and should not be used.\n Unicode escape sequences should be used instead.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = \"Copyright \\251\";\n ```\n\n ### Valid\n\n ```js\n const foo = \"Copyright \\u00A9\"; // unicode escape\n const bar = \"Copyright \\xA9\"; // hexadecimal escape\n ```\n\n"
          },
          "noPrototypeBuiltins": {
            "deprecated": false,
            "version": "1.1.0",
            "name": "noPrototypeBuiltins",
            "link": "https://biomejs.dev/linter/rules/no-prototype-builtins",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-prototype-builtins"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "prefer-object-has-own"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintE18e": "prefer-object-has-own"
                }
              }
            ],
            "docs": " Disallow direct use of `Object.prototype` builtins.\n\n ECMAScript 5.1 added `Object.create` which allows the creation of an object with a custom prototype.\n This pattern is often used for objects used as Maps. However, this pattern can lead to errors\n if something else relies on prototype properties/methods.\n Moreover, the methods could be shadowed, this can lead to random bugs and denial of service\n vulnerabilities. For example, calling `hasOwnProperty` directly on parsed JSON like `{\"hasOwnProperty\": 1}` could lead to vulnerabilities.\n To avoid subtle bugs like this, you should call these methods from `Object.prototype`.\n For example, `foo.isPrototypeOf(bar)` should be replaced with `Object.prototype.isPrototypeOf.call(foo, \"bar\")`\n As for the `hasOwn` method, `foo.hasOwn(\"bar\")` should be replaced with `Object.hasOwn(foo, \"bar\")`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var invalid = foo.hasOwnProperty(\"bar\");\n ```\n\n ```js,expect_diagnostic\n var invalid = foo.isPrototypeOf(bar);\n ```\n\n ```js,expect_diagnostic\n var invalid = foo.propertyIsEnumerable(\"bar\");\n ```\n\n ```js,expect_diagnostic\n Object.hasOwnProperty.call(foo, \"bar\");\n ```\n\n ### Valid\n\n ```js\n var valid = Object.hasOwn(foo, \"bar\");\n var valid = Object.prototype.isPrototypeOf.call(foo, bar);\n var valid = {}.propertyIsEnumerable.call(foo, \"bar\");\n ```\n\n"
          },
          "noReactForwardRef": {
            "deprecated": false,
            "version": "2.2.5",
            "name": "noReactForwardRef",
            "link": "https://biomejs.dev/linter/rules/no-react-forward-ref",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactX": "no-forward-ref"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactXyz": "no-forward-ref"
                }
              }
            ],
            "docs": " Replaces usages of `forwardRef` with passing `ref` as a prop.\n\n In React 19, `forwardRef` is no longer necessary. Pass `ref` as a prop instead.\n This rule detects the usage of the `forwardRef` API, and it suggests using the prop `ref`\n instead.\n See [the official blog post](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop) for details.\n\n This rule should be disabled if you are working with React 18 or earlier.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n import { forwardRef } from \"react\";\n\n const MyInput = forwardRef(function MyInput(props, ref) {\n   return <input ref={ref} {...props} />;\n });\n ```\n\n ```jsx,expect_diagnostic\n import { forwardRef } from \"react\";\n\n const MyInput = forwardRef((props, ref) => {\n   return <input ref={ref} {...props} />;\n });\n ```\n\n ### Valid\n\n ```jsx\n function MyInput({ ref, ...props }) {\n   return <input ref={ref} {...props} />;\n }\n ```\n\n ```jsx\n const MyInput = ({ ref, ...props }) => {\n   return <input ref={ref} {...props} />;\n }\n ```\n\n"
          },
          "noReactSpecificProps": {
            "deprecated": false,
            "version": "1.7.2",
            "name": "noReactSpecificProps",
            "link": "https://biomejs.dev/linter/rules/no-react-specific-props",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintSolid": "no-react-specific-props"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintQwik": "no-react-props"
                }
              }
            ],
            "docs": " Prevents React-specific JSX properties from being used.\n\n This rule is intended for use in JSX-based frameworks (such as Qwik, Solid, etc.) that do not use React-style prop names.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <Hello className=\"John\" />\n ```\n\n ### Valid\n\n ```jsx\n <Hello class=\"Doe\" />\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-redeclare"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-redeclare"
                }
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
            "docs": " Prevents from having redundant `\"use strict\"`.\n\n The directive `\"use strict\"` **isn't** needed in `.mjs` files, or in `.js` files inside projects where the `package.json` defines library as module:\n\n\n ```json,ignore\n {\n    \"type\": \"module\"\n }\n ```\n\n Instead, `.cjs` files are considered \"scripts\" and the directive `\"use strict\"` is accepted and advised.\n\n ## Examples\n\n ### Invalid\n ```cjs,expect_diagnostic\n \"use strict\";\n function foo() {\n  \t\"use strict\";\n }\n ```\n ```cjs,expect_diagnostic\n \"use strict\";\n \"use strict\";\n\n function foo() {\n\n }\n ```\n ```cjs,expect_diagnostic\n function foo() {\n \"use strict\";\n \"use strict\";\n }\n ```\n ```cjs,expect_diagnostic\n class C1 {\n \ttest() {\n \t\t\"use strict\";\n \t}\n }\n ```\n ```cjs,expect_diagnostic\n const C2 = class {\n \ttest() {\n \t\t\"use strict\";\n \t}\n };\n\n ```\n ### Valid\n ```cjs\n function foo() {\n\n }\n```\n ```cjs\n  function foo() {\n     \"use strict\";\n }\n function bar() {\n     \"use strict\";\n }\n```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-self-compare"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "clippy": "eq_op"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-shadow-restricted-names"
                }
              }
            ],
            "docs": " Disallow identifiers from shadowing restricted names.\n\n See also: [`noShadow`](http://biomejs.dev/linter/rules/no-shadow)\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function NaN() {}\n ```\n\n ```js,expect_diagnostic\n let Set;\n ```\n\n ```js,expect_diagnostic\n try {\t} catch(Object) {}\n ```\n\n ```js,expect_diagnostic\n function Array() {}\n ```\n\n ```js,expect_diagnostic\n function test(JSON) {console.log(JSON)}\n ```\n"
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
                "kind": "inspired",
                "source": {
                  "eslintJest": "no-disabled-tests"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintVitest": "no-disabled-tests"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintPlaywright": "no-skipped-test"
                }
              }
            ],
            "docs": " Disallow disabled tests.\n\n Disabled tests are useful when developing and debugging, although they should not be committed in production.\n\n The rule detects the following patterns:\n - `describe.skip`, `it.skip`, `test.skip`\n - `describe.fixme`, `it.fixme`, `test.fixme`\n - `test.describe.skip`, `test.describe.fixme`\n - `test.describe.parallel.skip`, `test.describe.serial.skip`\n - `test.describe.parallel.fixme`, `test.describe.serial.fixme`\n - `test.step.skip`, `test.step.fixme`\n - `xdescribe`, `xit`, `xtest`\n - Bracket notation: `test[\"skip\"]`, `test[\"fixme\"]`\n - Bare `test.skip()` / `test.fixme()` calls (0 arguments)\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n describe.skip(\"test\", () => {});\n ```\n\n ```js,expect_diagnostic\n test.skip(\"test\", () => {});\n ```\n\n ```js,expect_diagnostic\n test.fixme(\"needs fixing\", async () => {});\n ```\n\n ## Valid\n\n ```js\n test.only(\"test\", () => {});\n test(\"test\", () => {});\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-sparse-arrays"
                }
              }
            ],
            "docs": " Prevents the use of sparse arrays (arrays with holes).\n\n Sparse arrays may contain empty slots due to the use of multiple commas between two items, like the following:\n\n ```js,ignore\n const items = [a,,b];\n ```\n Arrays with holes might yield incorrect information. For example, the previous snippet, `items` has a length of `4`, but did the user\n really intended to have an array with four items? Or was it a typo.\n\n This rule enforce the user to explicitly an `undefined` in places where there's a hole.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n [1,,2]\n ```\n\n ### Valid\n\n ```js\n [1, undefined, 2]\n ```\n"
          },
          "noTemplateCurlyInString": {
            "deprecated": false,
            "version": "1.9.3",
            "name": "noTemplateCurlyInString",
            "link": "https://biomejs.dev/linter/rules/no-template-curly-in-string",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-template-curly-in-string"
                }
              }
            ],
            "docs": " Disallow template literal placeholder syntax in regular strings.\n\n ECMAScript 6 allows programmers to create strings containing variable or expressions using template literals,\n instead of string concatenation, by writing expressions like `${variable}` between two backtick quotes (\\`).\n It can be easy to use the wrong quotes when wanting to use template literals, by writing `\"${variable}\"`,\n and end up with the literal value `\"${variable}\"` instead of a string containing the value of the injected expressions.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const a = \"Hello ${name}!\";\n ```\n\n ```js,expect_diagnostic\n const a = 'Hello ${name}!';\n ```\n\n ```js,expect_diagnostic\n const a = \"Time: ${12 * 60 * 60 * 1000}\";\n ```\n\n ### Valid\n\n ```js\n const a = `Hello ${name}!`;\n const a = `Time: ${12 * 60 * 60 * 1000}`;\n\n const a = templateFunction`Hello ${name}`;\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "no-thenable"
                }
              }
            ],
            "docs": " Disallow `then` property.\n\n When combining objects with a `then` method (thenable objects) with await expressions or dynamic imports, caution is necessary.\n These syntaxes interpret the object's then method as intended for the resolution or rejection of a promise, which can lead to unexpected behavior or errors.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n export {then};\n ```\n\n ```js,expect_diagnostic\n const foo = {\n     then() {}\n };\n ```\n\n ```js,expect_diagnostic\n const foo = {\n     get then() {}\n };\n ```\n\n ```js,expect_diagnostic\n const foo = {\n    get then() {}\n };\n ```\n\n ```js,expect_diagnostic\n foo.then = function () {}\n ```\n\n ```js,expect_diagnostic\n class Foo {\n     then() {}\n }\n ```\n\n ```js,expect_diagnostic\n class Foo {\n     static then() {}\n }\n ```\n\n ### Valid\n\n ```js\n export {then as success};\n ```\n\n ```js\n const foo = {\n     success() {}\n };\n ```\n\n ```js\n class Foo {\n     success() {}\n }\n ```\n\n ```js\n const foo = bar.then;\n ```\n\n"
          },
          "noTsIgnore": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noTsIgnore",
            "link": "https://biomejs.dev/linter/rules/no-ts-ignore",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "ban-ts-comment"
                }
              }
            ],
            "docs": " Prevents the use of the TypeScript directive `@ts-ignore`.\n\n The directive `@ts-ignore` suppresses all compilation errors, even ones that could be considered bugs\n coming from an upstream library or the compiler itself. If you use `@ts-ignore`, it won't be possible to know\n when and if the bug is fixed.\n\n The rule promotes the use the directive `@ts-expect-error`, which is meant to raise an error if there aren't any errors.\n This means that once the bug is fixed, you can delete the directive, safely.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n // @ts-ignore\n let foo;\n ```\n\n ### Valid\n\n ```ts\n // @ts-expect-error\n let foo;\n ```\n\n"
          },
          "noUnassignedVariables": {
            "deprecated": false,
            "version": "2.1.0",
            "name": "noUnassignedVariables",
            "link": "https://biomejs.dev/linter/rules/no-unassigned-variables",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-unassigned-vars"
                }
              }
            ],
            "docs": " Disallow `let` or `var` variables that are read but never assigned.\n\n This rule flags let or var declarations that are never assigned a value but are still read or used in the code.\n Since these variables will always be undefined, their usage is likely a programming mistake.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let status;\n if (status === 'ready') {\n     console.log('Status is ready');\n }\n ```\n\n ```ts,expect_diagnostic\n let value: number | undefined;\n console.log(value);\n ```\n\n ### Valid\n\n ```js\n let message = \"hello\";\n console.log(message);\n\n let user;\n user = getUser();\n console.log(user.name);\n\n let count;\n count = 0;\n count++;\n ```\n\n ```ts\n declare let value: number | undefined;\n console.log(value);\n\n declare module \"my-module\" {\n     let value: string;\n     export = value;\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-unsafe-negation"
                }
              }
            ],
            "docs": " Disallow using unsafe negation.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n !1 in [1,2];\n ```\n\n ```js,expect_diagnostic\n /**test*/!/** test*/1 instanceof [1,2];\n ```\n\n ### Valid\n ```js\n -1 in [1,2];\n ~1 in [1,2];\n typeof 1 in [1,2];\n void 1 in [1,2];\n delete 1 in [1,2];\n +1 instanceof [1,2];\n ```\n"
          },
          "noUnusedExpressions": {
            "deprecated": false,
            "version": "2.2.5",
            "name": "noUnusedExpressions",
            "link": "https://biomejs.dev/linter/rules/no-unused-expressions",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-unused-expressions"
                }
              }
            ],
            "docs": " Disallow expression statements that are neither a function call nor an\n assignment.\n\n When an expression is used as a statement, it should be explicitly clear\n what the intention behind the expression is. This is clear for function\n calls and assignments, because the call or the assignment itself is the\n primary intention behind the statement. For other expression kinds, the\n intention is much more ambiguous; it could be the expression contains\n side-effects that are not very explicit, but it could also be that it is\n an error where the author forgot to use the result of the expression,\n such as a forgotten `return` keyword, or it could point to a function\n that the author forgot to call.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n 0\n ```\n\n ```js,expect_diagnostic\n if(0) 0\n ```\n\n ```js,expect_diagnostic\n {0}\n ```\n\n ```js,expect_diagnostic\n f(0), {}\n ```\n\n ```js,expect_diagnostic\n a && b()\n ```\n\n ```js,expect_diagnostic\n a, b()\n ```\n\n ```js,expect_diagnostic\n c = a, b\n ```\n\n ```js,expect_diagnostic\n a() && function namedFunctionInExpressionContext () {f();}\n ```\n\n ```js,expect_diagnostic\n (function anIncompleteIIFE () {});\n ```\n\n ```js,expect_diagnostic\n injectGlobal`body{ color: red; }`\n ```\n\n ```ts,expect_diagnostic\n Set<number>\n ```\n\n ```ts,expect_diagnostic\n 1 as number\n ```\n\n ```ts,expect_diagnostic\n window!\n ```\n\n JSX expressions are considered invalid when used as a statement too:\n\n ```jsx,expect_diagnostic\n <MyComponent />\n ```\n\n ```jsx,expect_diagnostic\n <></>\n ```\n\n ### Valid\n\n ```js\n {} // In this context, this is a block statement, not an object literal\n\n { myLabel: foo() } // In this context, this is a block statement with a label and expression, not an object literal\n\n function namedFunctionDeclaration () {}\n\n (function aGenuineIIFE () {}());\n\n f()\n\n a = 0\n\n new C\n\n delete a.b\n\n void a\n ```\n\n ### Handling of Directives\n\n Any stand-alone string at the start of a script, module, or function is\n considered a directive and is therefore allowed.\n\n ```js\n \"use strict\";\n \"use asm\"\n \"use stricter\";\n \"use babel\"\n \"any other strings like this in the directive prologue\";\n \"this is still the directive prologue\";\n\n function foo() {\n     \"bar\";\n }\n\n class Foo {\n     someMethod() {\n         \"use strict\";\n     }\n }\n ```\n\n The following are **not** considered valid directives:\n\n ```js,expect_diagnostic\n doSomething();\n \"use strict\"; // this isn't in a directive prologue, because there is a non-directive statement before it\n ```\n\n ```js,expect_diagnostic\n function foo() {\n     \"bar\" + 1;\n }\n ```\n\n ```js,expect_diagnostic\n class Foo {\n     static {\n         \"use strict\"; // class static blocks do not have directive prologues\n     }\n }\n ```\n"
          },
          "noUselessEscapeInString": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noUselessEscapeInString",
            "link": "https://biomejs.dev/linter/rules/no-useless-escape-in-string",
            "recommended": true,
            "fixKind": "safe",
            "docs": " Disallow unnecessary escapes in string literals.\n\n Escaping non-special characters in string literals doesn't have any effect.\n Hence, they may confuse a reader.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const s = \"\\a\";\n ```\n\n ```js,expect_diagnostic\n const o = {\n     \"\\a\": 0,\n };\n ```\n\n ```js,expect_diagnostic\n const s = `${0}\\a`;\n ```\n\n ### Valid\n\n ```js\n const s = \"\\n\";\n ```\n\n In template literals, `\\${` and `$\\{` are valid escapes:\n ```js\n const s = `\\${0}`;\n ```\n\n Tagged string templates are ignored:\n\n ```js\n const s = tagged`\\a`;\n ```\n\n JSX strings are ignored:\n\n ```jsx\n <div attr=\"str\\a\"/>;\n ```\n\n"
          },
          "noUselessRegexBackrefs": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noUselessRegexBackrefs",
            "link": "https://biomejs.dev/linter/rules/no-useless-regex-backrefs",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-useless-backreference"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintRegexp": "no-useless-backreference"
                }
              }
            ],
            "docs": " Disallow useless backreferences in regular expression literals that always match an empty string.\n\n A backreference refers to the submatch of a previous capturing group and matches the same text as that group.\n JavaScript regular expression support two syntaxes:\n\n - `\\N` where `N` is a 1-based integer that refers to the N-th declared capturing group.\n - `\\k<name>` that refers to the capturing group named `name`.\n   This syntax is only available in Unicode-aware regular expressions,\n   i.e. regular expressions using the `u` or `v` flag.\n\n A backreference always matches an empty string when it refers to:\n\n - A group that belongs to another alternate branch.\n   In `/(a)|b\\1b/`, the group `(a)` and its backreference `\\1` are in distinct alternate branches.\n   `/(a)|b\\1/` is equivalent to `(a)|b/`.\n\n - A group that appears after the backreference.\n   In `/\\1(a)/`, the group `(a)` is declared after its backreference `\\1`.\n   `/\\1(a)/` is equivalent to `(a)/`.\n\n - A group in which the backreference is declared.\n   In `/(\\1)/`, the backrefernce is nested in the group it refers to.\n   `/(\\1)/` is equivalent to `/()/`.\n\n - A group that is inside a negative lookaround assertion without the backreference.\n   In `/a(?!(b)).\\1/`, the backrefernce is in a negative assertion while its backreference is outside.\n   `/a(?!(b)).\\1/` is equivalent to `/a(?!(b))./`.\n\n - A group that is declared before the backreference inside a lookbehind assertion.\n   In `/(?<=(a)\\1)b/`, the backreference appears after the group while they are in a lookbehind assertion.\n   `/(?<=(a)\\1)b/` is equivalent to `/(?<=(a))b/`.\n\n A backreference that always matches an empty string is always successfully matched and is therefore useless.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n /(a)|b\\1/;\n ```\n\n ```js,expect_diagnostic\n /\\1(a)/;\n ```\n\n ```js,expect_diagnostic\n /(\\1)/;\n ```\n\n ```js,expect_diagnostic\n /a(?!(b)).\\1/;\n ```\n\n ```js,expect_diagnostic\n /(?<=(a)\\1)b/;\n ```\n\n ### Valid\n\n ```js\n /(a)\\1/;\n ```\n\n ```js\n /(?<foo>a)\\k<foo>/u;\n ```\n\n ```js\n /a(?!(b|c)\\1)./;\n ```\n\n"
          },
          "noVar": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noVar",
            "link": "https://biomejs.dev/linter/rules/no-var",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-var"
                }
              }
            ],
            "docs": " Disallow the use of `var`\n\n ECMAScript 6 allows programmers to create variables with block scope instead of function scope using the let and const keywords.\n\n Block scope is common in many other programming languages and helps programmers avoid mistakes.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n var foo = 1;\n ```\n\n ### Valid\n\n ```js\n const foo = 1;\n let bar = 1;\n```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "no-with"
                }
              }
            ],
            "docs": " Disallow `with` statements in non-strict contexts.\n\n The `with` statement is potentially problematic because it adds members of an object to the current\n scope, making it impossible to tell what a variable inside the block actually refers to.\n\n ## Examples\n\n ### Invalid\n\n ```cjs,expect_diagnostic\n function f() {\n   with (point) {\n     r = Math.sqrt(x * x + y * y); // is r a member of point?\n   }\n }\n ```\n"
          },
          "useAdjacentOverloadSignatures": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "useAdjacentOverloadSignatures",
            "link": "https://biomejs.dev/linter/rules/use-adjacent-overload-signatures",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "adjacent-overload-signatures"
                }
              }
            ],
            "docs": " Disallow the use of overload signatures that are not next to each other.\n\n Overload signatures must be adjacent.\n If a key is defined multiple times, only the last definition takes effect. Previous definitions are ignored.\n This rule is useful for preventing accidental overloads that are not adjacent.\n It is recommended to keep the overload signatures adjacent to make the code easier to read and maintain.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n type Foo = {\n   foo_type(s: string): void;\n   foo_type(n: number): void;\n   bar_type(): void;\n   foo_type(sn: string | number): void;\n };\n ```\n\n ```ts,expect_diagnostic\n interface Foo {\n   foo_interface(s: string): void;\n   foo_interface(n: number): void;\n   bar_interface(): void;\n   foo_interface(sn: string | number): void;\n }\n ```\n\n ```ts,expect_diagnostic\n class A {\n   fooA(s: string): void;\n   fooA(n: number): void;\n   barA(): void {};\n   fooA(sn: string | number): void {};\n }\n ```\n\n ### Valid\n\n ```ts\n declare namespace Foo {\n   export function foo_declare(s: string): void;\n   export function foo_declare(n: number): void;\n   export function foo_declare(sn: string | number): void;\n   export function bar_declare(): void;\n }\n ```\n\n ```ts\n type Foo = {\n   foo_type(s: string): void;\n   foo_type(n: number): void;\n   foo_type(sn: string | number): void;\n   bar_type(): void;\n };\n ```\n\n ```ts\n interface Foo {\n   foo_interface(s: string): void;\n   foo_interface(n: number): void;\n   foo_interface(sn: string | number): void;\n   bar_interface(): void;\n }\n ```\n\n ```ts\n class A {\n   fooA(s: string): void;\n   fooA(n: number): void;\n   fooA(sn: string | number): void {}\n   barA(): void {}\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "require-await"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "require-await"
                }
              }
            ],
            "docs": " Ensure `async` functions utilize `await`.\n\n This rule reports `async` functions that lack an `await` expression. As `async`\n functions return a promise, the use of `await` is often necessary to capture the\n resolved value and handle the asynchronous operation appropriately. Without `await`,\n the function operates synchronously and might not leverage the advantages of async\n functions.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n async function fetchData() {\n // Missing `await` for the promise returned by `fetch`\n   return fetch('/data');\n }\n ```\n\n ### Valid\n\n ```js\n async function fetchData() {\n   const response = await fetch('/data');\n   const data = await response.json();\n   return data;\n }\n\n // This rule does not warn about non-async functions\n function processData() {\n   return compute(data);\n }\n\n // Nor does it warn about empty `async` functions\n async function noop() { }\n\n // Async generators that use `yield*` with an async iterable\n async function* delegateToAsyncIterable() {\n   yield* otherAsyncIterable();\n }\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "default-case-last"
                }
              }
            ],
            "docs": " Enforce default clauses in switch statements to be last\n\n A switch statement can optionally have a default clause.\n\n If present, it’s usually the last clause, but it doesn’t need to be. It is also allowed to put the default clause before all case clauses, or anywhere between.\n The behavior is mostly the same as if it was the last clause.\n\n The default block will be still executed only if there is no match in the case clauses (including those defined after the default),\n but there is also the ability to “fall through” from the default clause to the following clause in the list.\n However, such flow is not common and it would be confusing to the readers.\n\n Even if there is no \"fall through\" logic, it’s still unexpected to see the default clause before or between the case clauses. By convention, it is expected to be the last clause.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n switch (foo) {\n     default:\n         break;\n     case 0:\n         break;\n }\n ```\n\n ```js,expect_diagnostic\n switch (foo) {\n     default:\n         f();\n     case 0:\n         break;\n }\n ```\n\n ```js,expect_diagnostic\n switch (foo) {\n     case 0:\n         break;\n     default:\n     case 1:\n         break;\n }\n ```\n\n ### Valid\n\n ```js\n switch (foo) {\n     case 0:\n         break;\n     case 1:\n     default:\n         break;\n }\n ```\n\n ```js\n switch (foo) {\n     case 0:\n         break;\n }\n ```\n\n"
          },
          "useErrorMessage": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "useErrorMessage",
            "link": "https://biomejs.dev/linter/rules/use-error-message",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "error-message"
                }
              }
            ],
            "docs": " Enforce passing a message value when creating a built-in error.\n\n This rule enforces a message value to be passed in when creating an instance of a built-in `Error` object,\n which leads to more readable and debuggable code.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n throw Error();\n ```\n ```js,expect_diagnostic\n throw Error('');\n ```\n ```js,expect_diagnostic\n throw new TypeError();\n ```\n ```js,expect_diagnostic\n const error = new AggregateError(errors);\n ```\n\n ### Valid\n\n ```js\n throw Error('Unexpected property.');\n ```\n ```js\n throw new TypeError('Array expected.');\n ```\n ```js\n const error = new AggregateError(errors, 'Promises rejected.');\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslint": "getter-return"
                }
              }
            ],
            "docs": " Enforce `get` methods to always return a value.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n class Person {\n     get firstName() {}\n }\n ```\n\n ```js,expect_diagnostic\n const obj = {\n     get firstName() {\n         return;\n     }\n }\n ```\n\n ```js,expect_diagnostic\n class Option {\n     get value() {\n         if (this.hasValue) {\n             log();\n         } else {\n             return null;\n         }\n     }\n }\n ```\n\n ### Valid\n\n ```js\n class Person {\n     get firstName() {\n         return this.fullname.split(\" \")[0];\n     }\n }\n ```\n\n ```js\n const obj = {\n     get firstName() {\n         return this.fullname.split(\" \")[0];\n     }\n }\n ```\n\n"
          },
          "useGuardForIn": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "useGuardForIn",
            "link": "https://biomejs.dev/linter/rules/use-guard-for-in",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "guard-for-in"
                }
              }
            ],
            "docs": " Require `for-in` loops to include an `if` statement.\n\n Looping over objects with a `for-in` loop will include properties inherited through the prototype chain.\n This behavior can lead to unexpected items in your for loop.\n\n For codebases that do not support ES2022, `Object.prototype.hasOwnProperty.call(foo, key)` can be used as a check that the property is not inherited.\n\n For codebases that do support ES2022, `Object.hasOwn(foo, key)` can be used as a shorter and more reliable alternative.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n for (key in foo) {\n   doSomething(key);\n }\n ```\n\n ### Valid\n\n ```js\n for (key in foo) {\n   if (Object.hasOwn(foo, key)) {\n    doSomething(key);\n   }\n }\n ```\n\n ```js\n for (key in foo) {\n   if (Object.prototype.hasOwnProperty.call(foo, key)) {\n     doSomething(key);\n   }\n }\n ```\n\n ```js\n for (key in foo) {\n   if ({}.hasOwnProperty.call(foo, key)) {\n     doSomething(key);\n   }\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "no-instanceof-array"
                }
              }
            ],
            "docs": " Use `Array.isArray()` instead of `instanceof Array`.\n\n In _JavaScript_ some array-like objects such as _arguments_ are not instances of the `Array` class.    ///\n Moreover, the global `Array` class can be different between two execution contexts.\n For instance, two frames in a web browser have a distinct `Array` class.\n Passing arrays across these contexts, results in arrays that are not instances of the contextual global `Array` class.\n To avoid these issues, use `Array.isArray()` instead of `instanceof Array`.\n See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) for more details.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const xs = [];\n if (xs instanceof Array) {}\n ```\n\n ### Valid\n\n ```js\n const xs = [];\n if (Array.isArray(xs)) {}\n ```\n\n"
          },
          "useIterableCallbackReturn": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useIterableCallbackReturn",
            "link": "https://biomejs.dev/linter/rules/use-iterable-callback-return",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslint": "array-callback-return"
                }
              }
            ],
            "docs": " Enforce consistent return values in iterable callbacks.\n\n This rule ensures that callbacks passed to certain iterable methods either always return a\n value or never return a value, depending on the method's requirements.\n\n Note that async and generator callbacks are ignored as they always return `Promise` or\n `Generator` respectively.\n\n ## Methods and Their Requirements\n\n The following methods require a return in their callback:\n\n - `every`\n - `filter`\n - `find`\n - `findIndex`\n - `findLast`\n - `findLastIndex`\n - `flatMap`\n - `map`\n - `reduce`\n - `reduceRight`\n - `some`\n - `sort`\n - `toSorted`\n — `from` (when called on `Array`)\n\n A return value is disallowed in the method `forEach`.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n [].map(() => {\n     // Missing return value\n });\n ```\n\n ```js\n [].forEach(() => {\n     // No return value, which is correct\n });\n ```\n\n ```js,expect_diagnostic\n [].filter(() => {\n     // Missing required return value\n });\n ```\n\n ### Valid\n\n ```js\n [].map(() => {\n     return 1; // Correctly returns a value\n });\n ```\n\n ```js\n [].forEach(() => void null); // Void return value, which doesn't trigger the rule\n ```\n\n ## Options\n\n ### `checkForEach`\n\n **Since `v2.4.0**\n\n Default: `true`\n\n When set to `false`, the rule will skip `forEach` callbacks that return a value.\n\n ### Examples\n\n ```json,options\n {\n     \"options\": {\n         \"checkForEach\": false\n     }\n }\n ```\n\n ```js,use_options\n [1, 2, 3].forEach((el) => {\n     return el * 2;\n });\n ```\n\n When `checkForEach` is `false` (default), the above code will not trigger any diagnostic.\n\n"
          },
          "useNumberToFixedDigitsArgument": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "useNumberToFixedDigitsArgument",
            "link": "https://biomejs.dev/linter/rules/use-number-to-fixed-digits-argument",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintUnicorn": "require-number-to-fixed-digits-argument"
                }
              }
            ],
            "docs": " Enforce using the digits argument with `Number#toFixed()`.\n\n When using `Number#toFixed()` explicitly specify the number of digits you want to appear after the decimal point,\n to avoid unexpected results, rather than relying on its default value of 0.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const string = number.toFixed();\n ```\n\n ### Valid\n\n ```js\n const string = foo.toFixed(0);\n ```\n ```js\n const string = foo.toFixed(2);\n ```\n\n ## Caveats\n\n This rule always assumes that `toFixed` is called on a number.\n It does not check the type of the callee.\n\n"
          },
          "useStaticResponseMethods": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useStaticResponseMethods",
            "link": "https://biomejs.dev/linter/rules/use-static-response-methods",
            "recommended": false,
            "fixKind": "unsafe",
            "docs": " Use static `Response` methods instead of `new Response()` constructor when possible.\n\n `new Response(JSON.stringify({ value: 1 }))` can be simplified to [Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Response/json).\n `new Response(null, { status: 301, headers: { location: 'https://example.com' } })` can be simplified to [Response.redirect()](https://developer.mozilla.org/en-US/docs/Web/API/Response/redirect_static).\n\n These methods are more concise and emphasize the intent of the code better,\n however they are not a direct replacement when additional options such as extra headers are needed.\n\n In case of `Response.redirect()`, the `location` header must also be a full URL, because server runtimes (Node, Deno, etc.) will throw an error for relative URLs.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n new Response(JSON.stringify({ value: 1 }));\n ```\n\n ```js,expect_diagnostic\n new Response(JSON.stringify({ value: 0 }), {\n     headers: {\n         'Content-Type': 'application/json',\n     }\n })\n ```\n\n ```js,expect_diagnostic\n new Response(null, {\n    headers: {\n        location: 'https://example.com',\n    },\n    status: 302,\n })\n ```\n\n ### Valid\n\n ```js\n // JSON.stringify() with a replacer function\n new Response(JSON.stringify({ value: 0 }, () => {}))\n ```\n\n ```js\n new Response(null, {\n    headers: {\n        location: 'https://example.com',\n        'x-foo': 'extra-header',\n    },\n    status: 302,\n })\n ```\n\n ```js\n new Response(null, {\n    headers: {\n        location: '/relative-url',\n    },\n    status: 302,\n })\n ```\n\n"
          },
          "useStrictMode": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "useStrictMode",
            "link": "https://biomejs.dev/linter/rules/use-strict-mode",
            "recommended": false,
            "fixKind": "safe",
            "docs": " Enforce the use of the directive `\"use strict\"` in script files.\n\n The JavaScript [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) prohibits some obsolete JavaScript syntaxes and makes some slight semantic changes to allow more optimizations by JavaScript engines.\n EcmaScript modules are always in strict mode, while JavaScript scripts are by default in non-strict mode, also known as _sloppy mode_.\n A developer can add the `\"use strict\"` directive at the start of a script file to enable the strict mode in that file.\n\n Biome considers a CommonJS (`.cjs`) file as a script file.\n By default, Biome recognizes a JavaScript file (`.js`) as a module file, except if `\"type\": \"commonjs\"` is specified in `package.json`.\n\n ## Examples\n\n ### Invalid\n\n ```cjs,expect_diagnostic\n var a = 1;\n ```\n\n ### Valid\n\n ```cjs\n \"use strict\";\n\n var a = 1;\n ```\n\n"
          }
        }
      },
      "json": {
        "nursery": {
          "useRequiredScripts": {
            "deprecated": false,
            "version": "2.3.9",
            "name": "useRequiredScripts",
            "link": "https://biomejs.dev/linter/rules/use-required-scripts",
            "recommended": false,
            "fixKind": "none",
            "docs": " Enforce the presence of required scripts in package.json.\n\n This rule ensures that specified scripts are defined in the `scripts` section of a `package.json` file.\n It's particularly useful in monorepo environments where consistency across workspaces is important.\n\n Without required scripts configured, this rule doesn't do anything.\n\n ## Examples\n\n ### Invalid\n\n ```json,options\n {\n     \"options\": {\n         \"requiredScripts\": [\"test\", \"build\"]\n     }\n }\n ```\n\n ```json,use_options\n {\n     \"scripts\": {\n         \"test\": \"vitest\"\n     }\n }\n ```\n\n ### Valid\n\n ```json,use_options\n {\n     \"scripts\": {\n         \"test\": \"vitest\",\n         \"build\": \"tsc\"\n     }\n }\n ```\n\n ## Options\n\n ### `requiredScripts`\n\n An array of script names that must be present in the `scripts` section of `package.json`.\n Default: `[]` (no scripts required)\n\n"
          }
        },
        "suspicious": {
          "noBiomeFirstException": {
            "deprecated": false,
            "version": "2.2.0",
            "name": "noBiomeFirstException",
            "link": "https://biomejs.dev/linter/rules/no-biome-first-exception",
            "recommended": true,
            "fixKind": "safe",
            "docs": " Prevents the misuse of glob patterns inside the `files.includes` field.\n\n ## Leading of negated patterns\n If the first pattern of `files.includes` starts with the leading `!`, Biome won't have any file to crawl. Generally,\n it is a good practice to declare the files/folders to include first, and then the files/folder to ignore.\n\n Check the [official documentation](https://biomejs.dev/guides/configure-biome/#exclude-files-via-configuration) for more examples.\n\n ### Examples\n\n #### Invalid\n\n ```json,ignore\n {\n     \"files\": {\n         \"includes\": [\"!dist\"]\n     }\n }\n ```\n\n #### Valid\n\n ```json,ignore\n {\n     \"files\": {\n         \"includes\": [\"src/**\", \"!dist\"]\n     }\n }\n ```\n\n ## Leading with catch-all `**`\n\n If the user configuration file extends from other sources (other configuration files or libraries), and those files contain the catch-all glob `**` in `files.includes`,\n the rule will trigger a violation if also the user configuration file has a `**`.\n\n #### Invalid\n\n ```jsonc,ignore\n // biome.json\n {\n     \"extends\": [\"./base.json\"],\n     \"files\": {\n         \"includes\": [\"**\", \"!**/test\"]\n     }\n }\n ```\n\n ```jsonc,ignore\n // base.json\n {\n     \"files\": {\n         \"includes\": [\"**\", \"!**/dist\"]\n     }\n }\n ```\n\n"
          },
          "noDuplicateDependencies": {
            "deprecated": false,
            "version": "2.2.4",
            "name": "noDuplicateDependencies",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-dependencies",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPackageJson": "unique-dependencies"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintPackageJsonDependencies": "duplicate-dependencies"
                }
              }
            ],
            "docs": " Prevent the listing of duplicate dependencies.\n The rule supports the following dependency groups: \"bundledDependencies\", \"bundleDependencies\", \"dependencies\", \"devDependencies\", \"overrides\", \"optionalDependencies\", and \"peerDependencies\".\n\n Dependencies are not allowed to be listed twice under the same dependency group.\n\n ## Examples\n\n ### Invalid\n\n ```json\n {\n     \"dependencies\": {\n         \"foo\": \"1.0.0\",\n         \"foo\": \"2.0.0\"\n     }\n }\n ```\n\n ```json\n {\n     \"bundleDependencies\": [\"foo\", \"foo\"]\n }\n ```\n\n ### Valid\n\n ```json\n {\n     \"dependencies\": {\n         \"foo\": \"2.0.0\"\n     }\n }\n ```\n\n ```json\n {\n     \"bundleDependencies\": [\"foo\"]\n }\n ```\n\n Some dependency group dependencies are checked against other dependency groups;\n  - Dependencies listed in \"dependencies\" cannot be listed under \"devDependencies\", \"optionalDependencies\" or \"peerDependencies\".\n  - Dependencies listed in \"optionalDependencies\" cannot be listed under \"peerDependencies\" (and vice versa).\n\n Dependencies listed in \"devDependencies\" are allowed to be listed in \"optionalDependencies\" or \"peerDependencies\".\n And dependencies listed in \"overrides\" & \"bundleDependencies\" are not checked against other dependency groups.\n\n ## Examples\n\n ### Invalid\n\n ```json\n {\n     \"dependencies\": {\n         \"foo\": \"1.0.0\"\n     },\n     \"devDependencies\": {\n         \"foo\": \"1.0.0\"\n     }\n }\n ```\n\n ### Valid\n\n ```json\n {\n     \"dependencies\": {\n         \"foo\": \"1.0.0\"\n     }\n }\n ```\n\n"
          },
          "noDuplicateObjectKeys": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDuplicateObjectKeys",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-object-keys",
            "recommended": true,
            "fixKind": "none",
            "docs": " Disallow two keys with the same name inside objects.\n\n ## Examples\n\n ### Invalid\n\n ```json,expect_diagnostic\n {\n   \"title\": \"New title\",\n   \"title\": \"Second title\"\n }\n ```\n\n ### Valid\n\n ```json\n {\n   \"title\": \"New title\",\n   \"secondTitle\": \"Second title\"\n }\n ```\n"
          },
          "noQuickfixBiome": {
            "deprecated": false,
            "version": "2.1.3",
            "name": "noQuickfixBiome",
            "link": "https://biomejs.dev/linter/rules/no-quickfix-biome",
            "recommended": true,
            "fixKind": "safe",
            "docs": " Disallow the use if `quickfix.biome` inside editor settings file.\n\n The code action `quickfix.biome` can be harmful because it instructs the editors\n to apply the code fix of lint rules and code actions atomically. If multiple rules or\n actions apply a code fix to the same code span, the editor will emit invalid code.\n\n The rule targets specifically VSCode settings and Zed settings. Specifically, paths that end with:\n - `.vscode/settings.json`\n - `Code/User/settings.json`\n - `.zed/settings.json`\n - `zed/settings.json`\n\n ## Examples\n\n ### Invalid\n\n ```json,ignore\n {\n     \"quickfix.biome\": \"explicit\"\n }\n ```\n\n ### Valid\n\n ```json,ignore\n {\n     \"source.fixAll.biome\": \"explicit\"\n }\n ```\n\n ## Options\n\n The following options are available\n\n ### `additionalPaths`\n\n It's possible to specify a list of JSON paths, if your editor uses a JSON file setting that isn't supported natively by the rule.\n\n If your editor uses, for example, a file called `.myEditor/file.json`, you can add `\".myEditor/file.json\"` to the list.\n **The rule checks if the file ends with the given paths**.\n\n ```json,options\n {\n     \"options\": {\n         \"additionalPaths\": [\".myEditor/file.json\"]\n     }\n }\n ```\n\n"
          },
          "useBiomeIgnoreFolder": {
            "deprecated": false,
            "version": "2.2.0",
            "name": "useBiomeIgnoreFolder",
            "link": "https://biomejs.dev/linter/rules/use-biome-ignore-folder",
            "recommended": true,
            "fixKind": "safe",
            "docs": " Promotes the correct usage for ignoring folders in the configuration file.\n\n Starting Biome v2.2, ignoring folders doesn't require the use of the trailing `/**`.\n When using the pattern `/**`, you tell Biome to ignore **all files** inside a folder, but the folder is still crawled. This pattern\n can lead to poor performance, especially if the folder contains many files.\n\n If the intention is to ignore specific files inside a folder, the trailing pattern `/**` shouldn't be used.\n\n ## Examples\n\n ### Invalid\n\n ```json,ignore\n {\n     \"files\": {\n         \"includes\": [\"**\", \"!dist/**\", \"!**/dist/**\"]\n     }\n }\n ```\n\n ### Valid\n\n ```json,ignore\n {\n     \"files\": {\n         \"includes\": [\"**\", \"!dist\", \"!**/dist\"]\n     }\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-access-key"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-aria-hidden-on-focusable"
                }
              }
            ],
            "docs": " Enforce that aria-hidden=\"true\" is not set on focusable elements.\n\n `aria-hidden=\"true\"` can be used to hide purely decorative content from screen reader users.\n A focusable element with `aria-hidden=\"true\"` can be reached by keyboard.\n This can lead to confusion or unexpected behavior for screen reader users.\n\n ## Example\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div aria-hidden=\"true\" tabIndex=\"0\" />\n ```\n\n ```jsx,expect_diagnostic\n <a href=\"/\" aria-hidden=\"true\" />\n ```\n\n ### Valid\n\n ```jsx\n <button aria-hidden=\"true\" tabIndex=\"-1\" />\n ```\n\n ```jsx\n <button aria-hidden=\"true\" tabIndex={-1} />\n ```\n\n ```jsx\n <div aria-hidden=\"true\"><a href=\"#\"></a></div>\n ```\n\n ## Resources\n\n - [aria-hidden elements do not contain focusable elements](https://dequeuniversity.com/rules/axe/html/4.4/aria-hidden-focus)\n - [Element with aria-hidden has no content in sequential focus navigation](https://www.w3.org/WAI/standards-guidelines/act/rules/6cfa84/proposed/)\n - [MDN aria-hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "aria-unsupported-elements"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-autofocus"
                }
              }
            ],
            "docs": " Enforce that autoFocus prop is not used on elements.\n\n Autofocusing elements can cause usability issues for sighted and non-sighted users, alike.\n But the autofocus attribute should be added to the element the user is expected to\n interact with immediately upon opening a modal dialog or popover.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <input autoFocus />\n ```\n\n ```jsx,expect_diagnostic\n <input autoFocus=\"true\" />\n ```\n\n ```jsx,expect_diagnostic\n <input autoFocus={\"false\"} />\n ```\n\n ```jsx,expect_diagnostic\n <input autoFocus={undefined} />\n ```\n\n ### Valid\n\n ```jsx\n <input />\n```\n\n ```jsx\n <div />\n```\n\n ```jsx\n <button />\n```\n\n ```jsx\n // `autoFocus` prop in user created component is valid\n <MyComponent autoFocus={true} />\n```\n\n ```jsx\n // `autoFocus` prop in element has `popover` attribute is valid\n <div popover><input autoFocus /></div>\n ```\n\n ```jsx\n // `autoFocus` prop in `dialog` is valid\n <dialog><input autoFocus /></dialog>\n ```\n\n ## Resources\n\n - [WHATWG HTML Standard, The autofocus attribute](https://html.spec.whatwg.org/multipage/interaction.html#attr-fe-autofocus)\n - [The accessibility of HTML 5 autofocus](https://brucelawson.co.uk/2009/the-accessibility-of-html-5-autofocus/)\n - [MDN Web Docs, HTMLElement: autofocus property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/autofocus)\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-distracting-elements"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "scope"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-interactive-element-to-noninteractive-role"
                }
              }
            ],
            "docs": " Enforce that non-interactive ARIA roles are not assigned to interactive HTML elements.\n\n Interactive HTML elements indicate controls in the user interface.\n Interactive elements include `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`.\n Non-interactive HTML elements and non-interactive ARIA roles indicate content and containers in the user interface.\n Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`.\n\n [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) should not be used to convert an interactive element to a non-interactive element.\n Non-interactive ARIA roles include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <input role=\"img\" />;\n ```\n\n ### Valid\n\n ```jsx\n <input role=\"button\" />;\n ```\n\n ```jsx\n <canvas role=\"img\" />;\n ```\n\n"
          },
          "noLabelWithoutControl": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "noLabelWithoutControl",
            "link": "https://biomejs.dev/linter/rules/no-label-without-control",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "label-has-associated-control"
                }
              }
            ],
            "docs": " Enforce that a label element or component has a text label and an associated input.\n\n An \"input\" is considered one of the following elements: `input`, `meter`, `output`, `progress`, `select`, `textarea` or `button`.\n\n There are two supported ways to associate a label with an input:\n - Wrapping an input in a label element.\n - Adding a `for` attribute (or `htmlFor` in React) to a label and assigning it a DOM ID string associated with an input on the page.\n\n\n This rule checks that any `label` element (or an indicated custom component that will output a `label` element) meets one of these conditions:\n - Wraps an `input` element (or an indicated custom component that will output an `input` element)\n - Has a `for` or `htmlFor` attribute and that the `label` element/component has accessible text content.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <label for=\"js_id\" />;\n ```\n\n ```jsx,expect_diagnostic\n <label for=\"js_id\"><input /></label>;\n ```\n\n ```jsx,expect_diagnostic\n <label htmlFor=\"js_id\" />;\n ```\n\n ```jsx,expect_diagnostic\n <label htmlFor=\"js_id\"><input /></label>;\n ```\n\n ```jsx,expect_diagnostic\n <label>A label</label>;\n ```\n\n ```jsx,expect_diagnostic\n <div><label /><input /></div>;\n ```\n\n ### Valid\n\n ```jsx\n <label for=\"js_id\" aria-label=\"A label\" />;\n <label for=\"js_id\" aria-labelledby=\"A label\" />;\n <label htmlFor=\"js_id\" aria-label=\"A label\" />;\n <label htmlFor=\"js_id\" aria-labelledby=\"A label\" />;\n <label>A label<input /></label>;\n <label>A label<textarea /></label>;\n <label><img alt=\"A label\" /><input /></label>;\n ```\n\n ## Options\n\n The rule supports the following options:\n - `inputComponents` - An array of component names that should be considered the same as an `input` element.\n - `labelAttributes` - An array of attributes that should be treated as the `label` accessible text content.\n - `labelComponents` - An array of component names that should be considered the same as a `label` element.\n\n Both options `inputComponents` and `labelComponents` don't have support for namespace components (e.g. `<Control.Input>`).\n\n ```json,options\n {\n     \"options\": {\n         \"inputComponents\": [\"CustomInput\"],\n         \"labelAttributes\": [\"label\"],\n         \"labelComponents\": [\"CustomLabel\"]\n     }\n }\n ```\n\n"
          },
          "noNoninteractiveElementInteractions": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noNoninteractiveElementInteractions",
            "link": "https://biomejs.dev/linter/rules/no-noninteractive-element-interactions",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-noninteractive-element-interactions"
                }
              }
            ],
            "docs": " Disallow use event handlers on non-interactive elements.\n\n Non-interactive HTML elements indicate _content_ and _containers_ in the user interface.\n Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`.\n\n A Non-interactive element does not support event handlers(mouse and key handlers).\n\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div onClick={() => {}}>button</div>\n ```\n\n ### Valid\n\n ```jsx\n <button onClick={() => { }}>button</button>\n ```\n\n ```jsx\n // Adding a role to element does not add behavior.\n // If not used semantic HTML elements like `button`, developers need to implement the expected behavior for role(like focusability and key press support)\n // See https://www.w3.org/WAI/ARIA/apg/\n <div role=\"button\" onClick={() => { }}>button</div>\n ```\n\n ```jsx\n // The role=\"presentation\" attribute removes the semantic meaning of an element, indicating that it should be ignored by assistive technologies.\n // Therefore, it's acceptable to add event handlers to elements with role=\"presentation\" for visual effects or other purposes,\n // but users relying on assistive technologies may not be able to interact with these elements.\n <div role=\"presentation\" onClick={() => { }}>button</div>\n ```\n\n ```jsx\n // Hidden from screen reader.\n <div onClick={() => {}} aria-hidden />\n ```\n\n ```jsx\n // Custom component is not checked.\n <SomeComponent onClick={() => {}}>button</SomeComponent>\n ```\n\n ```jsx\n // Spread attributes is not supported.\n <div {...{\"onClick\":() => {}}}>button</div>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n ### Resources\n\n - [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro)\n - [WAI-ARIA Authoring Practices Guide - Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex)\n - [Fundamental Keyboard Navigation Conventions](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_generalnav)\n - [Mozilla Developer Network - ARIA Techniques](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role#Keyboard_and_focus)\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-noninteractive-element-to-interactive-role"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-noninteractive-tabindex"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "tabindex-no-positive"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "img-redundant-alt"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "no-redundant-roles"
                }
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
            "docs": " Enforces the usage of the `title` element for the `svg` element.\n\n It is not possible to specify the `alt` attribute for the `svg` as for the `img`.\n To make svg accessible, the following methods are available:\n - provide the `title` element as the first child to `svg`\n - provide `role=\"img\"` and `aria-label` or `aria-labelledby` to `svg`\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <svg>foo</svg>\n ```\n\n ```jsx,expect_diagnostic\n <svg>\n     <title></title>\n     <circle />\n </svg>\n ```\n\n ```jsx,expect_diagnostic\n <svg>foo</svg>\n ```\n\n ```jsx,expect_diagnostic\n <svg>\n     <rect />\n     <rect />\n     <g>\n         <title>foo</title>\n         <circle />\n         <circle />\n     </g>\n </svg>\n ```\n\n ```jsx,expect_diagnostic\n <svg role=\"graphics-symbol\"><rect /></svg>\n ```\n\n ### Valid\n\n\n ```jsx\n <svg>\n     <title>Pass</title>\n     <circle />\n </svg>\n ```\n\n ```jsx\n <svg role=\"img\" aria-labelledby=\"title\">\n     <span id=\"title\">Pass</span>\n </svg>\n ```\n\n ```jsx\n <svg role=\"img\" aria-label=\"title\">\n     <span id=\"title\">Pass</span>\n </svg>\n ```\n\n ```jsx\n <svg role=\"graphics-symbol\">\n     <title>Pass</title>\n     <rect />\n </svg>\n ```\n\n ```jsx\n <svg aria-hidden=\"true\"><rect /></svg>\n ```\n\n ```jsx\n <svg role=\"img\" aria-label=\"\">\n     <span id=\"\">Pass</span>\n </svg>\n ```\n\n ```jsx\n <svg role=\"presentation\">foo</svg>\n ```\n\n\n ## Accessibility guidelines\n [Document Structure – SVG 1.1 (Second Edition)](https://www.w3.org/TR/SVG11/struct.html#DescriptionAndTitleElements)\n [ARIA: img role - Accessibility | MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role)\n [Accessible SVGs | CSS-Tricks - CSS-Tricks](https://css-tricks.com/accessible-svgs/)\n [Contextually Marking up accessible images and SVGs | scottohara.me](https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html)\n [Accessible SVGs](https://www.unimelb.edu.au/accessibility/techniques/accessible-svgs)\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "alt-text"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "anchor-has-content"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "aria-activedescendant-has-tabindex"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "role-has-required-aria-props"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "button-has-type"
                }
              }
            ],
            "docs": " Enforces the usage of the attribute `type` for the element `button`\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <button>Do something</button>\n ```\n\n ```jsx,expect_diagnostic\n <button type=\"incorrectType\">Do something</button>\n ```\n\n ```js,expect_diagnostic\n React.createElement('button');\n ```\n\n ### Valid\n\n ```jsx\n <>\n     <button type=\"button\">Do something</button>\n     <button type={buttonType}>Do something</button>\n </>\n ```\n"
          },
          "useFocusableInteractive": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "useFocusableInteractive",
            "link": "https://biomejs.dev/linter/rules/use-focusable-interactive",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "interactive-supports-focus"
                }
              }
            ],
            "docs": " Elements with an interactive role and interaction handlers must be focusable.\n\n HTML elements with interactive roles must have `tabIndex` defined to ensure they are\n focusable. Without tabIndex, assistive technologies may not recognize these elements as\n interactive.\n You could also consider switching from an interactive role to its semantic HTML element\n instead.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div role=\"button\" />\n ```\n\n ```jsx,expect_diagnostic\n <div role=\"tab\" />\n ```\n\n ### Valid\n\n ```jsx\n <div role=\"button\" tabIndex={0} />\n ```\n\n ```jsx\n <div />\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "heading-has-content"
                }
              }
            ],
            "docs": " Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the aria-hidden prop.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <h1 />\n ```\n\n ```jsx,expect_diagnostic\n <h1><div aria-hidden /></h1>\n ```\n\n ```jsx,expect_diagnostic\n <h1 aria-label=\"Screen reader content\" aria-hidden>invisible content</h1>\n ```\n\n\n ```jsx,expect_diagnostic\n <h1></h1>\n ```\n\n ### Valid\n\n ```jsx\n <h1>heading</h1>\n ```\n\n ```jsx\n <h1><div aria-hidden=\"true\"></div>visible content</h1>\n ```\n\n ```jsx\n <h1 aria-label=\"Screen reader content\"><div aria-hidden=\"true\">invisible content</div></h1>\n ```\n\n ```jsx\n <h1 dangerouslySetInnerHTML={{ __html: \"heading\" }} />\n ```\n\n ```jsx\n <h1><div aria-hidden />visible content</h1>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.4.6](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "html-has-lang"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "iframe-has-title"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "click-events-have-key-events"
                }
              }
            ],
            "docs": " Enforce onClick is accompanied by at least one of the following: `onKeyUp`, `onKeyDown`, `onKeyPress`.\n\n Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.\n This does not apply for interactive or hidden elements.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div onClick={() => {}} />\n ```\n\n ### Valid\n\n ```jsx\n <div onClick={() => {}} onKeyDown={handleKeyDown} />\n```\n\n ```jsx\n <div onClick={() => {}} onKeyUp={handleKeyUp} />\n```\n\n ```jsx\n <div onClick={() => {}} onKeyPress={handleKeyPress} />\n```\n\n ```jsx\n // this rule doesn't apply to user created component\n <MyComponent onClick={() => {}} />\n```\n\n ```jsx\n <button onClick={() => console.log(\"test\")}>Submit</button>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 2.1.1](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "mouse-events-have-key-events"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "media-has-caption"
                }
              }
            ],
            "docs": " Enforces that `audio` and `video` elements must have a `track` for captions.\n\n ## Examples\n\n ### Invalid\n ```jsx,expect_diagnostic\n \t<video />\n ```\n\n ```jsx,expect_diagnostic\n \t<audio>child</audio>\n ```\n\n ### Valid\n\n ```jsx\n \t<audio>\n \t\t<track kind=\"captions\" {...props} />\n \t</audio>\n ```\n\n ```jsx\n \t<video muted {...props}></video>\n ```\n"
          },
          "useSemanticElements": {
            "deprecated": false,
            "version": "1.8.0",
            "name": "useSemanticElements",
            "link": "https://biomejs.dev/linter/rules/use-semantic-elements",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "prefer-tag-over-role"
                }
              }
            ],
            "docs": " It detects the use of `role` attributes in JSX elements and suggests using semantic elements instead.\n\n The `role` attribute is used to define the purpose of an element, but it should be used as a last resort.\n Using semantic elements like `<button>`, `<nav>` and others are more accessible and provide better semantics.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div role=\"checkbox\"></div>\n ```\n\n ```jsx,expect_diagnostic\n <div role=\"separator\"></div>\n ```\n\n ```jsx,expect_diagnostic\n <div role=\"checkbox\" />\n ```\n\n ```jsx,expect_diagnostic\n <div role=\"separator\" />\n ```\n\n ### Valid\n\n ```jsx\n <>\n   <input type=\"checkbox\">label</input>\n   <hr/>\n </>;\n ```\n\n All elements with `role=\"img\"` are ignored:\n\n ```jsx\n <div role=\"img\" aria-label=\"That cat is so cute\">\n   <p>&#x1F408; &#x1F602;</p>\n </div>\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "anchor-is-valid"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintQwik": "jsx-a"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "aria-props"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "aria-role"
                }
              }
            ],
            "docs": " Elements with ARIA roles must use a valid, non-abstract ARIA role.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div role=\"datepicker\"></div>\n ```\n\n ```jsx,expect_diagnostic\n <div role=\"range\"></div>\n ```\n\n ```jsx,expect_diagnostic\n <div role=\"\"></div>\n ```\n\n ```jsx,expect_diagnostic\n <Foo role=\"foo\"></Foo>\n ```\n\n ### Valid\n\n ```jsx\n <>\n   <div role=\"button\"></div>\n   <div role={role}></div>\n   <div></div>\n </>\n ```\n\n ## Options\n\n\n ### `allowInvalidRoles`\n\n It allows specifying a list of roles that might be invalid otherwise\n\n ```json,options\n {\n     \"options\": {\n         \"allowInvalidRoles\": [\"datepicker\"]\n     }\n }\n ```\n\n ```jsx,use_options\n <div role=\"datepicker\"></div>\n ```\n\n ### `ignoreNonDom`\n\n Use this option to ignore non-DOM elements, such as components\n\n ```json,options\n {\n     \"options\": {\n         \"ignoreNonDom\": true\n     }\n }\n ```\n\n ```jsx,use_options\n <Datepicker role=\"foo\"></Datepicker>\n ```\n\n ## Accessibility guidelines\n\n - [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)\n\n ## Resources\n\n - [Chrome Audit Rules, AX_ARIA_01](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_01)\n - [DPUB-ARIA roles](https://www.w3.org/TR/dpub-aria-1.0/)\n - [MDN: Using ARIA: Roles, states, and properties](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques)\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "aria-proptypes"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintJsxA11y": "lang"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "jsx-no-useless-fragment"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactX": "no-useless-fragment"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactXyz": "no-useless-fragment"
                }
              }
            ],
            "docs": " Disallow unnecessary fragments\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <>\n     <>foo</>\n     <SomeComponent />\n </>\n ```\n\n ```jsx,expect_diagnostic\n <></>\n ```\n\n ### Valid\n\n ```jsx\n <>\n foo\n </>\n ```\n\n ```jsx\n <React.Fragment>\n foo\n </React.Fragment>\n ```\n\n ```jsx\n <>\n     <Foo />\n     <Bar />\n </>\n ```\n\n ```jsx\n <>foo {bar}</>\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "no-children-prop"
                }
              }
            ],
            "docs": " Prevent passing of **children** as props.\n\n When using JSX, the children should be nested between the opening and closing tags.\n When not using JSX, the children should be passed as additional arguments to `React.createElement`.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <FirstComponent children={'foo'} />\n ```\n\n ```js,expect_diagnostic\n React.createElement('div', { children: 'foo' });\n ```\n"
          },
          "noNestedComponentDefinitions": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noNestedComponentDefinitions",
            "link": "https://biomejs.dev/linter/rules/no-nested-component-definitions",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactX": "no-nested-components"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactXyz": "no-nested-components"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactXyz": "no-nested-component-definitions"
                }
              }
            ],
            "docs": " Disallows defining React components inside other components.\n\n Component definitions inside other components cause them to be recreated on every render,\n which can lead to performance issues and unexpected behavior.\n\n When a component is defined inside another component:\n - It gets recreated on every render of the parent component\n - It loses its internal state when the parent rerenders\n - It defeats props memoization and optimization techniques\n - It creates new function references on every render\n\n ## Examples\n\n ### Invalid\n\n A new component is created every time ParentComponent renders:\n ```jsx,expect_diagnostic\n function ParentComponent() {\n   function ChildComponent() {\n     return <div>Hello</div>;\n   }\n\n   return <ChildComponent />;\n }\n ```\n\n Even with memo, a new component is still created on each render:\n ```jsx,expect_diagnostic\n function ParentComponent() {\n   const MemoizedChild = memo(() => {\n     return <div>Hello</div>;\n   });\n\n   return <MemoizedChild />;\n }\n ```\n\n ### Valid\n\n Component is defined outside other components:\n ```jsx\n function ChildComponent() {\n   return <div>Hello</div>;\n }\n\n function ParentComponent() {\n   return <ChildComponent />;\n }\n ```\n\n ## Correct approaches\n\n 1. Move the component definition outside:\n    ```jsx\n    function ChildComponent() {\n      return <div>Hello</div>;\n    }\n\n    function ParentComponent() {\n      return <ChildComponent />;\n    }\n    ```\n\n 2. Pass components as props:\n    ```jsx\n    function ParentComponent({ CustomComponent }) {\n      return <CustomComponent />;\n    }\n    ```\n\n 3. Use React's Children API:\n    ```jsx\n    function ParentComponent({ children }) {\n      return <div>{children}</div>;\n    }\n    ```\n"
          },
          "noQwikUseVisibleTask": {
            "deprecated": false,
            "version": "2.1.4",
            "name": "noQwikUseVisibleTask",
            "link": "https://biomejs.dev/linter/rules/no-qwik-use-visible-task",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintQwik": "no-use-visible-task"
                }
              }
            ],
            "docs": " Disallow `useVisibleTask$()` functions in Qwik components.\n\n Prevents hydration-blocking operations that hurt Qwik's resumability.\n See [Qwik Tasks Documentation](https://qwik.dev/docs/components/tasks/) for proper alternatives.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n useVisibleTask$(() => {\n   console.log('Component is visible');\n });\n ```\n\n ### Valid\n\n ```js\n useTask$(() => {\n   console.log('Task executed');\n });\n ```\n\n"
          },
          "noReactPropAssignments": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noReactPropAssignments",
            "link": "https://biomejs.dev/linter/rules/no-react-prop-assignments",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactHooks": "react-compiler"
                }
              }
            ],
            "docs": " Disallow assigning to React component props.\n\n React's `props` are assumed to be immutable, and it is considered bad\n practice to assign to properties of the `props` object. When using the\n React Compiler, this is even a hard error.\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n function Foo(props) {\n \tprops.bar = \"Hello \" + props.bar;\n\n \treturn <div>{props.bar}</div>\n }\n ```\n\n\n ### Valid\n\n ```jsx\n const Foo = function({bar}) {\n    bar = \"Hello \" + bar;\n    return <div>{bar}</div>\n  }\n ```\n\n"
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
          "noRestrictedElements": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noRestrictedElements",
            "link": "https://biomejs.dev/linter/rules/no-restricted-elements",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "forbid-elements"
                }
              }
            ],
            "docs": " Disallow the use of configured elements.\n\n This rule disallows the use of configured elements. Without elements configured,\n this rule doesn't do anything.\n\n This rule is useful in situations where you want to enforce the use of specific components\n instead of certain HTML or custom elements. For example, in a React project,\n you might want to ensure that developers use a custom `TextField` component\n instead of the native `<input>` element to maintain consistency and apply\n custom styling or behavior.\n\n Here are some scenarios where this rule can be beneficial:\n\n * Consistency: Ensuring that all input fields use a custom component instead of the native\n   element to maintain a consistent look and feel across the application.\n * Accessibility: Enforcing the use of custom components that have built-in\n   accessibility features, ensuring that the application is accessible to all users.\n * Custom Behavior: Requiring the use of components that encapsulate specific business logic\n   or validation, reducing the risk of errors and improving code maintainability.\n * Styling: Ensuring that all elements adhere to the design system by using\n   custom components that apply consistent styling.\n\n By disallowing certain elements and enforcing the use of custom components,\n this rule helps maintain code quality and consistency across the codebase.\n\n ## Options\n\n ```json,options\n {\n     \"options\": {\n         \"elements\": {\n             \"input\": \"input is not allowed, use TextField component instead\",\n             \"CustomComponent\": \"deprecated\"\n         }\n     }\n }\n ```\n\n ## Examples\n\n ### Invalid\n\n Restricting the use of HTML elements:\n\n ```jsx,expect_diagnostic,use_options\n <input />\n ```\n\n Restricting the use of custom components:\n\n ```jsx,expect_diagnostic,use_options\n <CustomComponent />\n ```\n\n ### Valid\n\n ```jsx\n <TextField />\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "void-dom-elements-no-children"
                }
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
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactHooks": "exhaustive-deps"
                }
              }
            ],
            "docs": " Enforce correct dependency usage within React hooks.\n\n React components have access to various [hooks](https://react.dev/reference/react/hooks) that can perform\n various actions like querying and updating state.\n\n For hooks that trigger whenever a variable changes (such as `useEffect` and `useMemo`),\n React relies on the hook's listed dependencies array to determine when to re-compute Effects and re-render the page.\n\n This can lead to unexpected behavior when dependencies are incorrectly specified:\n ```jsx,ignore\n\n function ticker() {\n   const [count, setCount] = useState(0);\n\n   /** Increment the count once per second. */\n   function onTick() {\n     setCount(count + 1);\n   }\n\n   // React _thinks_ this code doesn't depend on anything else, so\n   // it will only use the _initial_ version of `onTick` when rendering the component.\n   // As a result, our normally-dynamic counter will always display 1!\n   // This is referred to as a \"stale closure\", and is a common pitfall for beginners.\n   useEffect(() => {\n     const id = setInterval(onTick, 1000);\n     return () => clearInterval(id);\n   }, []);\n\n   return <h1>Counter: {count}</h1>;\n }\n ```\n\n ```jsx,ignore\n function apples() {\n   const [count, setCount] = useState(0);\n   const [message, setMessage] = useState(\"We have 0 apples!\");\n\n   // React _thinks_ this code depends on BOTH `count` and `message`, and will re-run the hook whenever\n   // `message` is changed despite it not actually being used inside the closure.\n   // In fact, this will create an infinite loop due to our hook updating `message` and triggering itself again!\n   useEffect(() => {\n     setMessage(`We have ${count} apples!`)\n   }, [count, message]);\n\n }\n ```\n\n This rule attempts to prevent such issues by diagnosing potentially incorrect or invalid usages of hook dependencies.\n\n ### Default Behavior\n By default, the following hooks (and their Preact counterparts) will have their arguments checked by this rule:\n\n - `useEffect`\n - `useLayoutEffect`\n - `useInsertionEffect`\n - `useCallback`\n - `useMemo`\n - `useImperativeHandle`\n\n #### Stable results\n When a hook is known to have a stable return value (one whose identity doesn't change across invocations),\n that value doesn't need to and _should not_ be specified as a dependency.\n For example, setters returned by React's `useState` hook will not change throughout the lifetime of a program\n and should therefore be omitted.\n\n By default, the following hooks are considered to have stable return values:\n - `useState` (index 1)\n - `useReducer` (index 1)\n - `useTransition` (index 1)\n - `useRef`\n - `useEffectEvent`\n\n If you want to add custom hooks to the rule's diagnostics or specify your own functions with stable results,\n see the [options](#options) section for more information.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import { useEffect } from \"react\";\n\n function component() {\n   let a = 1;\n   useEffect(() => {\n     console.log(a);\n   }, []);\n }\n ```\n\n ```js,expect_diagnostic\n import { useEffect } from \"react\";\n\n function badComponent() {\n   let a = 1;\n   useEffect(() => {\n     console.log(a);\n   }, \"not an array\");\n }\n ```\n\n ```js,expect_diagnostic\n import { useEffect } from \"react\";\n\n function component() {\n     let unused = 1;\n     useEffect(() => {}, [unused]);\n }\n ```\n\n ```js,expect_diagnostic\n import { useEffect, useState } from \"react\";\n\n function component() {\n   const [name, setName] = useState();\n   useEffect(() => {\n     console.log(name);\n     setName(\"i never change and don't need to be here\");\n   }, [name, setName]);\n }\n ```\n\n ```js,expect_diagnostic\n import { useEffect, useState } from \"react\";\n\n function component() {\n   const name = \"foo\"\n   // name doesn't change, so specifying it is redundant\n   useEffect(() => {\n     console.log(name);\n   }, [name]);\n }\n ```\n\n ```js,expect_diagnostic\n import { useEffect } from \"react\";\n\n function component() {\n   let a = 1;\n   const b = a + 1;\n   useEffect(() => {\n     console.log(b);\n   }, []);\n }\n ```\n\n ```jsx,expect_diagnostic\n import { useCallback } from \"react\";\n\n function component() {\n   const Component = () => null;\n   const render = useCallback(() => <Component />, []);\n }\n ```\n\n ### Valid\n\n ```js\n import { useEffect } from \"react\";\n\n function component() {\n   let a = 1;\n   useEffect(() => {\n     console.log(a);\n   }, [a]);\n }\n ```\n\n ```js\n import { useEffect } from \"react\";\n\n function component() {\n   const SECONDS_PER_DAY = 60 * 60 * 24;\n   useEffect(() => {\n     console.log(SECONDS_PER_DAY);\n   });\n }\n ```\n\n ```js\n import { useEffect, useState } from \"react\";\n\n function component() {\n   const [name, setName] = useState();\n   useEffect(() => {\n     console.log(name);\n     setName(\"\");\n   }, [name]);\n }\n ```\n\n Hooks not imported from React are ignored by default (unless specified inside [rule options](#options))\n ```ts\n import type { EffectCallback, DependencyList } from \"react\";\n // custom useEffect function\n declare function useEffect(cb: EffectCallback, deps?: DependencyList): void;\n\n function component() {\n   let name = \"John Doe\";\n   useEffect(() => {\n     console.log(name);\n   }, []);\n }\n ```\n\n ## Ignoring a specific dependency\n\n Sometimes you may wish to ignore a diagnostic about a specific\n dependency without disabling *all* linting for that hook. To do so,\n you may specify the name of a specific dependency between parentheses,\n like this:\n\n ```js\n import { useEffect } from \"react\";\n\n function component() {\n   let a = 1;\n   // biome-ignore lint/correctness/useExhaustiveDependencies(a): suppress dependency a\n   useEffect(() => {\n     console.log(a);\n   }, []);\n }\n ```\n\n If you wish to ignore multiple dependencies, you can add multiple\n comments and add a reason for each:\n\n ```js\n import { useEffect } from \"react\";\n\n function component() {\n   let a = 1;\n   let b = 1;\n   // biome-ignore lint/correctness/useExhaustiveDependencies(a): suppress dependency a\n   // biome-ignore lint/correctness/useExhaustiveDependencies(b): suppress dependency b\n   useEffect(() => {\n     console.log(a, b);\n   }, []);\n }\n ```\n\n :::caution\n Mismatching code & dependencies has a **very high risk** of creating bugs in your components.\n By suppressing the linter, you “lie” to React about the values your Effect depends on,\n so prefer changing the code over suppressing the rule where possible.\n :::\n\n ## Options\n\n ### `hooks`\n Allows specifying custom hooks (from libraries or internal projects) whose dependencies\n should be checked and/or which are known to have stable return values.\n\n For every hook whose dependencies you want validated, you must specify the index of both the closure\n using the dependencies and the dependencies array to validate it against.\n\n ##### Example\n\n ```json,options\n {\n   \"options\": {\n     \"hooks\": [\n       { \"name\": \"useLocation\", \"closureIndex\": 0, \"dependenciesIndex\": 1 },\n       { \"name\": \"useQuery\", \"closureIndex\": 2, \"dependenciesIndex\": 0 }\n     ]\n   }\n }\n ```\n\n This would enable checks on the following code snippets:\n\n ```js,expect_diagnostic,use_options\n function Foo() {\n   let stateVar = 1;\n   useLocation(() => {console.log(stateVar)}, []);\n }\n ```\n ```js,use_options\n function Foo() {\n   let stateVar = 1;\n   useQuery([stateVar], \"smthng\", () => {console.log(stateVar)});\n }\n ```\n\n #### Configuring stable results\n\n As previously discussed, the lint rule takes into account so-called [stable results](#stable-results)\n and will ensure any such variables are _not_ specified as dependencies.\n\n You can specify custom functions as returning stable results in one of four ways:\n\n 1. `\"stableResult\": true` -- marks the return value as stable. An example\n   of a React hook that would be configured like this is `useRef()`.\n 2. `\"stableResult\": [1]` -- expects the return value to be an array and\n    marks the given indices as stable. An example of a React\n    hook that would be configured like this is `useState()`.\n 3. `\"stableResult\": 1` -- shorthand for option 2 (`\"stableResult\": [1]`).\n    Useful for hooks that only have a single stable return.\n 4. `\"stableResult\": [\"setValue\"]` -- expects the return value to be an\n    object and marks the properties with the given keys as stable.\n\n ##### Example\n\n ```json,options\n {\n   \"options\": {\n     \"hooks\": [\n       { \"name\": \"useDispatch\", \"stableResult\": true }\n     ]\n   }\n }\n ```\n\n With this configuration, the following is valid:\n\n ```js,use_options\n const dispatch = useDispatch();\n // No need to list `dispatch` as dependency since it doesn't change\n const doAction = useCallback(() => dispatch(someAction()), []);\n ```\n\n ### `reportUnnecessaryDependencies`\n\n If set to `false`, the rule will not trigger diagnostics for unused dependencies passed to hooks that do not use them.\n\n :::caution\n Over-specifying dependencies can reduce application performance or even cause infinite loops, so caution is advised.\n :::\n\n Default: `true`\n\n ##### Example\n\n ```json,options\n {\n   \"options\": {\n     \"reportUnnecessaryDependencies\": false\n   }\n }\n ```\n\n ```jsx,use_options\n import { useEffect } from \"react\";\n\n function Foo() {\n   let stateVar = 1;\n   // not used but still OK\n   useEffect(() => {}, [stateVar]);\n }\n ```\n\n ### `reportMissingDependenciesArray`\n\n If enabled, the rule will also trigger diagnostics for hooks that lack dependency arrays altogether,\n requiring any hooks lacking dependencies to explicitly specify an empty array.\n\n Default: `false`\n\n ##### Example\n\n ```json,options\n {\n   \"options\": {\n     \"reportMissingDependenciesArray\": true\n   }\n }\n ```\n\n ```jsx,expect_diagnostic,use_options\n function noArrayYesProblem() {\n   let stateVar = 1;\n   React.useEffect(() => {});\n }\n ```\n\n"
          },
          "useHookAtTopLevel": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useHookAtTopLevel",
            "link": "https://biomejs.dev/linter/rules/use-hook-at-top-level",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactHooks": "rules-of-hooks"
                }
              }
            ],
            "docs": " Enforce that all React hooks are being called from the Top Level component functions.\n\n _This rule should be used only in **React** projects._\n\n To understand why this required see https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n function Component1({ a }) {\n     if (a == 1) {\n         useEffect();\n     }\n }\n ```\n\n ```js,expect_diagnostic\n function Component1({ a }) {\n     if (a != 1) {\n         return;\n     }\n\n     useEffect();\n }\n ```\n\n ```js,expect_diagnostic\n function notAHook() {\n     useEffect();\n }\n ```\n\n ### Valid\n\n ```js\n function Component1() {\n     useEffect();\n }\n ```\n\n ```js\n test(\"the hook\", () => {\n     renderHook(() => useHook());\n });\n ```\n\n"
          },
          "useImageSize": {
            "deprecated": false,
            "version": "2.1.4",
            "name": "useImageSize",
            "link": "https://biomejs.dev/linter/rules/use-image-size",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintQwik": "jsx-img"
                }
              }
            ],
            "docs": " Enforces that `<img>` elements have both width and height attributes.\n\n This rule ensures that `<img>` elements have `width` and `height` attributes.\n\n Images without specified width and height can cause layout shifts as the browser does not know how much space to reserve for them, leading to a poor user experience.\n It's recommended to always include these attributes to prevent such issues.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <img src=\"/image.png\"/>\n ```\n\n ```jsx,expect_diagnostic\n <img src=\"/static/images/portrait-01.webp\"/>\n ```\n\n ```jsx,expect_diagnostic\n <img src=\"/image.png\" width=\"200\"/>\n ```\n\n ```jsx,expect_diagnostic\n <img src=\"/image.png\" height=\"200\"/>\n ```\n\n ### Valid\n\n ```jsx\n <img width=\"200\" height=\"600\" src=\"/static/images/portrait-01.webp\" />\n ```\n\n ```jsx\n <img width=\"100\" height=\"100\" src=\"https://example.com/image.png\" />\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "jsx-key"
                }
              },
              {
                "kind": "sameLogic",
                "source": {
                  "eslintQwik": "jsx-key"
                }
              }
            ],
            "docs": " Disallow missing key props in iterators/collection literals.\n\n Warn if an element that likely requires a key prop--namely, one present in an array literal or an arrow function expression.\n Check out React documentation for [explanation on the why does React need keys.](https://react.dev/learn/rendering-lists#why-does-react-need-keys)\n\n This rule is intended for use in both React and Qwik applications to prevent missing key props in JSX elements inside iterators.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n [<Hello />];\n ```\n ```jsx,expect_diagnostic\n {items.map(item => <li>{item}</li>)}\n ```\n\n ### Valid\n\n ```jsx\n [<Hello key=\"first\" />, <Hello key=\"second\" />, <Hello key=\"third\" />];\n {items.map(item => <li key={item.id}>{item}</li>)}\n ```\n\n ## Options\n\n ### checkShorthandFragments\n\n React fragments can not only be created with `<React.Fragment>`, but also with shorthand\n fragments (`<></>`). To also check if those require a key, pass `true` to this option.\n\n ```json,options\n {\n     \"options\": {\n         \"checkShorthandFragments\": true\n     }\n }\n ```\n ```jsx,expect_diagnostic,use_options\n data.map((x) => <>{x}</>);\n ```\n\n"
          },
          "useQwikClasslist": {
            "deprecated": false,
            "version": "2.1.4",
            "name": "useQwikClasslist",
            "link": "https://biomejs.dev/linter/rules/use-qwik-classlist",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintQwik": "prefer-classlist"
                }
              }
            ],
            "docs": " Prefer using the `class` prop as a classlist over the `classnames` helper.\n\n This rule encourages the use of `class` prop which natively supports strings, objects, and arrays, enabling fine-grained reactivity and optimal performance. Using utilities like `classnames` can interfere with Qwik's reactivity model and prevent the framework from optimizing component updates. Prefer using the built-in `class` prop for best results.\n\n For more information, see: [Qwik documentation on class bindings](https://qwik.dev/docs/components/rendering/#class-and-style-bindings)\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div class={classnames({ active: true, disabled: false })} />\n ```\n\n ### Valid\n\n ```jsx\n <div class={{ active: true, disabled: false }} />\n ```\n"
          },
          "useQwikMethodUsage": {
            "deprecated": false,
            "version": "2.2.6",
            "name": "useQwikMethodUsage",
            "link": "https://biomejs.dev/linter/rules/use-qwik-method-usage",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintQwik": "use-method-usage"
                }
              }
            ],
            "docs": " Disallow `use*` hooks outside of `component$` or other `use*` hooks in Qwik applications.\n\n Ensures Qwik's lifecycle hooks are only used in valid reactive contexts.\n See [Qwik Component Lifecycle](https://qwik.dev/docs/components/lifecycle/) for proper hook usage.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import { useSignal } from \"@builder.io/qwik\";\n\n export const Counter = () => {\n   const count = useSignal(0);\n };\n ```\n\n ### Valid\n\n ```js\n import { component$, useSignal } from \"@builder.io/qwik\";\n\n export const Counter = component$(() => {\n   const count = useSignal(0);\n });\n\n export const useCounter = () => {\n   const count = useSignal(0);\n   return count;\n };\n ```\n"
          },
          "useQwikValidLexicalScope": {
            "deprecated": false,
            "version": "2.2.6",
            "name": "useQwikValidLexicalScope",
            "link": "https://biomejs.dev/linter/rules/use-qwik-valid-lexical-scope",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintQwik": "valid-lexical-scope"
                }
              }
            ],
            "docs": " Disallow unserializable expressions in Qwik dollar ($) scopes.\n\n Ensures all captured values in Qwik components can be properly serialized for resumability.\n See [Qwik Optimizer: Lexical Scope](https://qwik.dev/docs/advanced/optimizer/#lexical-scope) for proper usage patterns.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n // Arrow function assigned without wrapping it in $(...)\n const handleClick = () => {\n   console.log(\"clicked\");\n };\n ```\n\n ### Valid\n\n ```js\n const handleClick = $(() => {\n   // Valid: only using serializable variables or props\n   console.log(\"clicked\");\n });\n ```\n\n"
          },
          "useUniqueElementIds": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useUniqueElementIds",
            "link": "https://biomejs.dev/linter/rules/use-unique-element-ids",
            "recommended": false,
            "fixKind": "none",
            "docs": " Prevent the usage of static string literal `id` attribute on elements.\n\n In React, hardcoding IDs is discouraged because IDs have to be unique in the DOM.\n You should use [`useId`](https://react.dev/reference/react/useId) to generate unique IDs for accessibility purposes.\n\n Please keep in mind this rule doesn't check whether ids are actually unique or not, and does check whether static literal id isn't passed to the elements or not. So you're encouraged to check by yourself if the ids are actually unique.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div id=\"foo\">bar</div>;\n ```\n\n ```jsx,expect_diagnostic\n React.createElement(\"div\", { id: \"foo\" });\n ```\n\n ### Valid\n\n ```jsx\n const id = useId();\n <div id={id}>bar</div>;\n ```\n\n ```jsx\n const id = useId();\n React.createElement(\"div\", { id });\n ```\n\n ## Options\n\n The following option is available\n\n ### `excludedComponents`\n\n List of unqualified component names to ignore.\n Use it to list components expecting an `id` attribute that does not represent\n a DOM element ID.\n\n **Default**: empty list.\n\n ```json,options\n {\n     \"options\": {\n         \"excludedComponents\": [\n             \"FormattedMessage\"\n         ]\n     }\n }\n ```\n\n ```jsx,use_options\n <FormattedMessage id=\"static\" />\n ```\n\n ```jsx,use_options\n <Library.FormattedMessage id=\"static\" />\n ```\n\n\n"
          }
        },
        "nursery": {
          "noBeforeInteractiveScriptOutsideDocument": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "noBeforeInteractiveScriptOutsideDocument",
            "link": "https://biomejs.dev/linter/rules/no-before-interactive-script-outside-document",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "no-before-interactive-script-outside-document"
                }
              }
            ],
            "docs": " Prevent usage of `next/script`'s `beforeInteractive` strategy outside of `pages/_document.js` in a Next.js project.\n\n Next.js provides a `next/script` component to optimize the loading of third-party scripts. Using the `beforeInteractive`\n strategy allows scripts to be preloaded before any first-party code. `beforeInteractive` scripts must be placed in `pages/_document.js`.\n\n This rule checks for any usage of the `beforeInteractive` scripts outside of these files.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n // pages/index.jsx\n import Script from 'next/script'\n\n export default function Index() {\n   return (\n     <div>\n       <Script\n         src=\"https://example.com/script.js\"\n         strategy=\"beforeInteractive\"\n       ></Script>\n     </div>\n   )\n }\n ```\n\n ### Valid\n\n ```jsx,ignore\n // pages/_document.jsx\n import { Html, Head, Main, NextScript } from 'next/document'\n import Script from 'next/script'\n\n export default function Document() {\n     return (\n         <Html>\n             <Head />\n             <body>\n                 <Main />\n                 <NextScript />\n                 <Script\n                   src=\"https://example.com/script.js\"\n                   strategy=\"beforeInteractive\"\n                 ></Script>\n             </body>\n         </Html>\n     )\n }\n ```\n\n"
          },
          "noJsxPropsBind": {
            "deprecated": false,
            "version": "2.3.11",
            "name": "noJsxPropsBind",
            "link": "https://biomejs.dev/linter/rules/no-jsx-props-bind",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintReact": "jsx-no-bind"
                }
              }
            ],
            "docs": " Disallow .bind(), arrow functions, or function expressions in JSX props\n\n Using `.bind()` or creating a function inline in props creates a new function\n on every render, changing identity and defeating memoisation,\n which may cause unnecessary rerenders.\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <Foo onClick={this._handleClick.bind(this)}></Foo>\n ```\n\n ```jsx,expect_diagnostic\n <Foo onClick={() => console.log('Hello!')}></Foo>\n ```\n\n ```jsx,expect_diagnostic\n <Foo onClick={function () { console.log('Hello!'); }}></Foo>\n ```\n\n ### Valid\n\n ```jsx\n <Foo onClick={this._handleClick}></Foo>\n ```\n"
          },
          "noLeakedRender": {
            "deprecated": false,
            "version": "2.3.8",
            "name": "noLeakedRender",
            "link": "https://biomejs.dev/linter/rules/no-leaked-render",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintReact": "jsx-no-leaked-render"
                }
              }
            ],
            "docs": " Prevent problematic leaked values from being rendered.\n\n This rule prevents values that might cause unintentionally rendered values\n or rendering crashes in React JSX. When using conditional rendering with the\n logical AND operator (`&&`), if the left-hand side evaluates to a falsy value like\n `0`, `NaN`, or any empty string, these values will be rendered instead of rendering nothing.\n\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n const Component = () => {\n   const count = 0;\n   return <div>{count && <span>Count: {count}</span>}</div>;\n }\n ```\n\n ```jsx,expect_diagnostic\n const Component = () => {\n   const items = [];\n   return <div>{items.length && <List items={items} />}</div>;\n }\n ```\n\n ```jsx,expect_diagnostic\n const Component = () => {\n   const user = null;\n   return <div>{user && <Profile user={user} />}</div>;\n }\n ```\n\n\n ### Valid\n\n ```jsx\n const Component = () => {\n   const count = 0;\n   return <div>{count > 0 && <span>Count: {count}</span>}</div>;\n }\n ```\n\n ```jsx\n const Component = () => {\n   const items = [];\n   return <div>{!!items.length && <List items={items} />}</div>;\n }\n ```\n\n ```jsx\n const Component = () => {\n   const user = null;\n   return <div>{user ? <Profile user={user} /> : null}</div>;\n }\n ```\n\n ```jsx\n const Component = () => {\n   const condition = false;\n   return <div>{condition ? <Content /> : <Fallback />}</div>;\n }\n ```\n\n ```jsx\n const Component = () => {\n   const isReady = true;\n   return <div>{isReady && <Content />}</div>;\n }\n ```\n"
          },
          "noUnknownAttribute": {
            "deprecated": false,
            "version": "2.3.3",
            "name": "noUnknownAttribute",
            "link": "https://biomejs.dev/linter/rules/no-unknown-attribute",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "no-unknown-property"
                }
              }
            ],
            "docs": " Disallow unknown DOM properties.\n\n In JSX, most DOM properties and attributes should be camelCased to be consistent with standard JavaScript style.\n This can be a possible source of error if you are used to writing plain HTML.\n Only `data-*` and `aria-*` attributes are allowed to use hyphens and lowercase letters in JSX.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div allowTransparency=\"true\" />\n ```\n\n ```jsx,expect_diagnostic\n <div onclick={() => {}} />\n ```\n\n ```jsx,expect_diagnostic\n <div for=\"bar\" />\n ```\n\n ### Valid\n\n ```jsx\n <div className=\"foo\" />\n ```\n\n ```jsx\n <div onClick={() => {}} />\n ```\n\n ```jsx\n <div htmlFor=\"bar\" />\n ```\n\n ```jsx\n <div data-foo=\"bar\" />\n ```\n\n ```jsx\n <div aria-label=\"Close\" />\n ```\n\n ## Options\n\n ### `ignore`\n\n An array of property and attribute names to ignore during validation.\n\n ```json\n {\n   \"noUnknownAttribute\": {\n     \"options\": {\n       \"ignore\": [\"custom-attribute\", \"non-standard-prop\"]\n     }\n   }\n }\n ```\n"
          },
          "useInlineScriptId": {
            "deprecated": false,
            "version": "2.3.12",
            "name": "useInlineScriptId",
            "link": "https://biomejs.dev/linter/rules/use-inline-script-id",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "inline-script-id"
                }
              }
            ],
            "docs": " Enforce `id` attribute on `next/script` components with inline content or `dangerouslySetInnerHTML`.\n\n Using inline scripts or `dangerouslySetInnerHTML` in `next/script` components requires an `id` attribute to ensure that Next.js can track and optimize them correctly.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n import Script from 'next/script'\n\n export default function Page() {\n   return (\n      <Script>{`console.log('Hello world!');`}</Script>\n   )\n }\n ```\n\n ```jsx,expect_diagnostic\n import Script from 'next/script'\n\n export default function Page() {\n   return (\n      <Script dangerouslySetInnerHTML={{ __html: `console.log('Hello world!');` }} />\n   )\n }\n ```\n\n ### Valid\n ```jsx\n import Script from 'next/script'\n\n export default function Page() {\n   return (\n      <Script id=\"my-script\">{`console.log('Hello world!');`}</Script>\n   )\n }\n ```\n\n ```jsx\n import Script from 'next/script'\n\n export default function Page() {\n   return (\n      <Script id=\"my-script\" dangerouslySetInnerHTML={{ __html: `console.log('Hello world!');` }} />\n   )\n }\n ```\n\n"
          }
        },
        "performance": {
          "noImgElement": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "noImgElement",
            "link": "https://biomejs.dev/linter/rules/no-img-element",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "no-img-element"
                }
              }
            ],
            "docs": " Prevent usage of `<img>` element in a Next.js project.\n\n Using the `<img>` element can result in slower Largest Contentful Paint (LCP)\n and higher bandwidth usage, as it lacks the optimizations provided by the `<Image />`\n component from `next/image`. Next.js's `<Image />` automatically optimizes images\n by serving responsive sizes and using modern formats, improving performance and reducing bandwidth.\n\n If your project is self-hosted, ensure that you have sufficient storage and have\n installed the `sharp` package to support optimized images. When deploying to managed\n hosting providers, be aware of potential additional costs or usage.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <img alt=\"Foo\" />\n ```\n\n ```jsx,expect_diagnostic\n <div>\n   <img alt=\"Foo\" />\n </div>\n ```\n\n ### Valid\n\n ```jsx\n <img />\n ```\n\n ```jsx\n <Image src=\"https://example.com/hero.jpg\" />\n ```\n\n ```jsx\n <picture>\n   <source srcSet=\"https://example.com/hero.avif\" type=\"image/avif\" />\n   <source srcSet=\"https://example.com/hero.webp\" type=\"image/webp\" />\n   <img src=\"https://example.com/hero.jpg\" />\n </picture>\n ```\n\n"
          },
          "noUnwantedPolyfillio": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noUnwantedPolyfillio",
            "link": "https://biomejs.dev/linter/rules/no-unwanted-polyfillio",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "no-unwanted-polyfillio"
                }
              }
            ],
            "docs": " Prevent duplicate polyfills from Polyfill.io.\n\n You are using polyfills from Polyfill.io and including polyfills already shipped with Next.js.\n This unnecessarily increases page weight which can affect loading performance.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <script src='https://polyfill.io/v3/polyfill.min.js?features=AbortController,Object.fromEntries'></script>\n ```\n\n ```jsx,expect_diagnostic\n import NextScript from 'next/script';\n\n export function MyApp({ Component, pageProps }) {\n   return <NextScript src='https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.copyWithin' />\n }\n ```\n\n ### Valid\n\n ```jsx\n <>\n   <script src='https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=AbortController'></script>\n   <script src='https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=IntersectionObserver'></script>\n   <Script src='https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=IntersectionObserver' />\n   <Script src='https://polyfill-fastly.io/v3/polyfill.min.js?features=IntersectionObserver' />\n </>\n ```\n\n"
          },
          "useGoogleFontPreconnect": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useGoogleFontPreconnect",
            "link": "https://biomejs.dev/linter/rules/use-google-font-preconnect",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "google-font-preconnect"
                }
              }
            ],
            "docs": " Ensure the `preconnect` attribute is used when using Google Fonts.\n\n When using Google Fonts, adding the `rel=\"preconnect\"` attribute to the `<link>` tag\n that points to `https://fonts.gstatic.com` is recommended to initiate an early\n connection to the font's origin. This improves page load performance by reducing latency.\n\n Failing to use `preconnect` may result in slower font loading times, affecting user experience.\n\n Note: Next.js automatically adds this preconnect link starting from version 12.0.1, but in cases\n where it's manually added, this rule ensures the `preconnect` attribute is properly used.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <link href=\"https://fonts.gstatic.com\"/>\n ```\n\n ```jsx,expect_diagnostic\n <link rel=\"preload\" href=\"https://fonts.gstatic.com\"/>\n ```\n\n ### Valid\n\n ```jsx\n <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"/>\n ```\n\n ```jsx\n <link href=\"/logo.svg\" rel=\"icon\" />\n ```\n\n"
          }
        },
        "security": {
          "noBlankTarget": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noBlankTarget",
            "link": "https://biomejs.dev/linter/rules/no-blank-target",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintReact": "jsx-no-target-blank"
                }
              }
            ],
            "docs": " Disallow `target=\"_blank\"` attribute without `rel=\"noopener\"`.\n\n When creating an anchor `a` element, there are times when its link has\n to be opened in a new browser tab via the `target=\"_blank\"` attribute.\n This attribute has to be paired with `rel=\"noopener\"` or you may run\n into security issues.\n\n See to the [`noopener` documentation](https://html.spec.whatwg.org/multipage/links.html#link-type-noopener).\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <a href='http://external.link' target='_blank'>child</a>\n ```\n\n ```jsx,expect_diagnostic\n <a href='http://external.link' target='_blank' rel='nofollow'>child</a>\n ```\n\n ```jsx,expect_diagnostic\n <a {...props} href='http://external.link' target='_blank' rel='nofollow'>child</a>\n ```\n\n ### Valid\n\n ```jsx\n <a href='http://external.link' rel='noopener' target='_blank'>child</a>\n ```\n\n ```jsx\n <a href='http://external.link' rel='noreferrer' target='_blank'>child</a>\n ```\n\n ```jsx\n // The rule accepts elements with spread props, because the required\n // attribute may be injected dynamically:\n <a href='http://external.link' target='_blank' {...props}>child</a>\n ```\n\n ## Options\n\n ### `allowNoReferrer`\n\n By default, `noBlankTarget` accepts both `rel=\"noopener\"` and\n `rel=\"noreferrer\"` with links that have `target=\"_blank\"`. This is\n because the latter _implies_ the former, so either one is sufficient to\n mitigate the security risk.\n\n However, allowing `rel=\"noreferrer\"` may still be undesirable, because\n it can break tracking, which may be an undesirable side-effect. As such,\n you can set `allowNoReferrer: false` to _only_ accept `rel=\"noopener\"`.\n\n See to the [`noreferrer` documentation](https://html.spec.whatwg.org/multipage/links.html#link-type-noreferrer).\n\n\n ```json,options\n {\n     \"options\": {\n         \"allowNoReferrer\": false\n     }\n }\n ```\n\n ```jsx,use_options,expect_diagnostic\n <a href='http://external.link' rel='noreferrer' target='_blank'>child</a>\n ```\n\n Default: `true`\n\n ### `allowDomains`\n\n The option `allowDomains` allows specific domains to use\n `target=\"_blank\"` without `rel=\"noopener\"`. In the following\n configuration, it's allowed to use the domains `https://example.com` and\n `example.org`:\n\n ```json,options\n {\n     \"options\": {\n         \"allowDomains\": [\"https://example.com\", \"example.org\"]\n     }\n }\n ```\n\n ```jsx,use_options\n <>\n   <a target='_blank' testme href='https://example.com'></a>\n   <a target='_blank' href='example.org'></a>\n </>\n ```\n\n The diagnostic is applied to all domains not in the allow list:\n\n ```json,options\n {\n     \"options\": {\n         \"allowDomains\": [\"https://example.com\"]\n     }\n }\n ```\n\n ```jsx,expect_diagnostic,use_options\n <>\n   <a target='_blank' testme href='https://example.com'></a>\n   <a target='_blank' href='example.org'></a>\n </>\n ```\n Biome doesn't check if the list contains valid URLs.\n"
          },
          "noDangerouslySetInnerHtml": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noDangerouslySetInnerHtml",
            "link": "https://biomejs.dev/linter/rules/no-dangerously-set-inner-html",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "no-danger"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "no-danger-with-children"
                }
              }
            ],
            "docs": " Report when a DOM element or a component uses both `children` and `dangerouslySetInnerHTML` prop.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n function createMarkup() {\n     return { __html: 'child' }\n }\n <Component dangerouslySetInnerHTML={createMarkup()}>\"child1\"</Component>\n ```\n\n ```jsx,expect_diagnostic\n function createMarkup() {\n     return { __html: 'child' }\n }\n <Component dangerouslySetInnerHTML={createMarkup()} children=\"child1\" />\n ```\n\n ```js,expect_diagnostic\n React.createElement('div', { dangerouslySetInnerHTML: { __html: 'HTML' } }, 'children')\n ```\n"
          }
        },
        "style": {
          "noHeadElement": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "noHeadElement",
            "link": "https://biomejs.dev/linter/rules/no-head-element",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "no-head-element"
                }
              }
            ],
            "docs": " Prevent usage of `<head>` element in a Next.js project.\n\n Next.js provides a specialized `<Head />` component from `next/head` that manages\n the `<head>` tag for optimal server-side rendering, client-side navigation, and\n automatic deduplication of tags such as `<meta>` and `<title>`.\n\n This rule only checks files that are outside of the [`app/` directory](https://nextjs.org/docs/app), as it's typically\n handled differently in Next.js.\n\n ## Examples\n\n ### Invalid\n ```jsx,expect_diagnostic\n function Index() {\n   return (\n     <head>\n       <title>Invalid</title>\n     </head>\n   )\n }\n ```\n\n ### Valid\n\n ```jsx\n import Head from 'next/head'\n\n function Index() {\n   return (\n     <Head>\n       <title>All good!</title>\n     </Head>\n   )\n }\n ```\n"
          },
          "noImplicitBoolean": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noImplicitBoolean",
            "link": "https://biomejs.dev/linter/rules/no-implicit-boolean",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintReact": "jsx-boolean-value"
                }
              }
            ],
            "docs": " Disallow implicit `true` values on JSX boolean attributes\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <input disabled />\n ```\n\n ### Valid\n\n ```jsx\n <input disabled={false} />\n```\n\n ```jsx\n <input disabled={''} />\n```\n\n ```jsx\n <input disabled={0} />\n```\n\n ```jsx\n <input disabled={undefined} />\n```\n\n ```jsx\n <input disabled='false' />\n```\n"
          },
          "noJsxLiterals": {
            "deprecated": false,
            "version": "2.2.4",
            "name": "noJsxLiterals",
            "link": "https://biomejs.dev/linter/rules/no-jsx-literals",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "jsx-no-literals"
                }
              }
            ],
            "docs": " Disallow string literals inside JSX elements.\n\n This rule discourages the use of\n string literals directly within JSX elements. String literals in JSX can make code harder\n to maintain, especially in applications that require internationalization or dynamic content.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div>Hello World</div>\n ```\n\n ```jsx,expect_diagnostic\n <>Welcome to our site</>\n ```\n\n ```jsx,expect_diagnostic\n <span>\n   Please enter your name\n </span>\n ```\n\n ### Valid\n\n ```jsx\n <div>{'Hello World'}</div>\n ```\n\n ```jsx\n <>{'Welcome to our site'}</>\n ```\n\n ```jsx\n <span>\n   {'Please enter your name'}\n </span>\n ```\n\n ```jsx\n <div>{`Hello ${name}`}</div>\n ```\n\n ## Options\n\n ### `noStrings`\n\n When enabled, the rule will also flag string literals inside JSX expressions and attributes.\n\n > **Default:** `false`\n\n ```json,options\n {\n   \"options\": {\n     \"noStrings\": true\n   }\n }\n ```\n\n ```jsx,expect_diagnostic,use_options\n <span>\n   {'Please enter your name'}\n </span>\n ```\n ```jsx,expect_diagnostic,use_options\n <Component title=\"Hello!\" />\n ```\n\n\n\n ### `allowedStrings`\n\n An array of strings that are allowed as literals. This can be useful for common words\n or characters that don't need to be wrapped in expressions.\n\n ```json,options\n {\n   \"options\": {\n     \"allowedStrings\": [\"Hello\", \"&nbsp;\", \"·\"]\n   }\n }\n ```\n\n ```jsx,use_options\n <>\n   <div>Hello</div>\n   <div>&nbsp;</div>\n   <div>·</div>\n </>\n ```\n\n ### `ignoreProps`\n\n When enabled, the rule will ignore string literals used as prop values.\n\n > **Default:** `false`\n\n ```json,options\n {\n   \"options\": {\n     \"ignoreProps\": true\n   }\n }\n ```\n\n ```jsx,use_options\n <>\n   <Component title=\"Welcome\" />\n   <input placeholder=\"Enter name\" />\n </>\n ```\n\n"
          },
          "useComponentExportOnlyModules": {
            "deprecated": false,
            "version": "1.9.2",
            "name": "useComponentExportOnlyModules",
            "link": "https://biomejs.dev/linter/rules/use-component-export-only-modules",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintReactRefresh": "only-export-components"
                }
              }
            ],
            "docs": " Enforce declaring components only within modules that export React Components exclusively.\n\n This is necessary to enable the [`React Fast Refresh`] feature, which improves development efficiency.\n The determination of whether something is a component depends on naming conventions.\n Components should be written in [`PascalCase`] and regular functions in [`camelCase`].\n If the framework already has established conventions, consider optionally specifying exceptions.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n export const foo = () => {};\n export const Bar = () => <></>;\n ```\n\n ```jsx,expect_diagnostic\n const Tab = () => {};\n export const tabs = [<Tab />, <Tab />];\n ```\n\n ```jsx,expect_diagnostic\n const App = () => {}\n createRoot(document.getElementById(\"root\")).render(<App />);\n ```\n\n ### Valid\n\n ```jsx\n export default function Foo() {\n     return <></>;\n }\n ```\n\n ```jsx\n const foo = () => {};\n export const Bar = () => <></>;\n ```\n\n ```jsx\n import { App } from \"./App\";\n createRoot(document.getElementById(\"root\")).render(<App />);\n ```\n\n Functions that return standard React components are also permitted.\n\n ```jsx\n import { memo } from 'react';\n const Component = () => <></>\n export default memo(Component);\n ```\n\n ## Options\n\n ### `allowConstantExport`\n\n Some tools, such as [Vite], allow exporting constants along with components. By enabling the following, the rule will support the pattern.\n\n ```json,options\n {\n     \"options\":{\n         \"allowConstantExport\" : true\n     }\n }\n ```\n\n ### `allowExportNames`\n\n If you use a framework that handles [Hot Module Replacement(HMR)] of some specific exports, you can use this option to avoid warning for them.\n\n Example for [Remix](https://remix.run/docs/en/main/discussion/hot-module-replacement#supported-exports):\n ```json,options\n {\n     \"options\":{\n         \"allowExportNames\": [\"json\", \"loader\", \"headers\", \"meta\", \"links\", \"scripts\"]\n     }\n }\n ```\n\n [`meta` in Remix]: https://remix.run/docs/en/main/route/meta\n [Hot Module Replacement(HMR)]: https://remix.run/docs/en/main/discussion/hot-module-replacement\n [`React Fast Refresh`]: https://github.com/facebook/react/tree/main/packages/react-refresh\n [Remix]: https://remix.run/\n [Vite]: https://vitejs.dev/\n [`camelCase`]: https://en.wikipedia.org/wiki/Camel_case\n [`PascalCase`]: https://en.wikipedia.org/wiki/Camel_case\n"
          },
          "useConsistentCurlyBraces": {
            "deprecated": false,
            "version": "1.8.2",
            "name": "useConsistentCurlyBraces",
            "link": "https://biomejs.dev/linter/rules/use-consistent-curly-braces",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintReact": "jsx-curly-brace-presence"
                }
              }
            ],
            "docs": " This rule enforces consistent use of curly braces inside JSX attributes and JSX children.\n\n For situations where JSX expressions are unnecessary, please refer to [the React doc](https://facebook.github.io/react/docs/jsx-in-depth.html) and [this page about JSX gotchas](https://github.com/facebook/react/blob/v15.4.0-rc.3/docs/docs/02.3-jsx-gotchas.md#html-entities).\n\n This rule will check for and warn about unnecessary curly braces in both JSX props and children.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <Foo>{'Hello world'}</Foo>\n ```\n ```jsx,expect_diagnostic\n <Foo foo={'bar'} />\n ```\n ```jsx,expect_diagnostic\n <Foo foo=<Bar /> />\n ```\n\n ### Valid\n\n ```jsx\n <>\n     <Foo>Hello world</Foo>\n     <Foo foo=\"bar\" />\n     <Foo foo={5} />\n     <Foo foo={<Bar />} />\n </>\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "jsx-fragments"
                }
              }
            ],
            "docs": " This rule enforces the use of `<>...</>` over `<Fragment>...</Fragment>`.\n\n The shorthand fragment syntax saves keystrokes and is only inapplicable when keys are required.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <Fragment>child</Fragment>\n ```\n\n ```jsx,expect_diagnostic\n <React.Fragment>child</React.Fragment>\n ```\n"
          },
          "useReactFunctionComponents": {
            "deprecated": false,
            "version": "2.1.3",
            "name": "useReactFunctionComponents",
            "link": "https://biomejs.dev/linter/rules/use-react-function-components",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReactPreferFunctionComponent": "react-prefer-function-component"
                }
              }
            ],
            "docs": " Enforce that components are defined as functions and never as classes.\n\n React in particular allows users to create components using functions or classes.\n However, using functions is generally preferred. This rule enforces the use of function components.\n\n This rule makes an exception for class components that implement `componentDidCatch` because there is\n currently no hook alternative for React. This function is typically used for defining error boundaries.\n It's recommended to define your error boundary once and then reuse it across your application.\n\n If you are using Preact, it has a [`useErrorBoundary`](https://preactjs.com/guide/v10/hooks/#useerrorboundary) hook.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n class Foo extends React.Component {\n   render() {\n     return (\n       <div>This is a class component.</div>\n     );\n   }\n }\n ```\n\n ### Valid\n\n ```jsx\n function Foo() {\n   return <div>This is a function component.</div>;\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "no-array-index-key"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "jsx-no-comment-textnodes"
                }
              }
            ],
            "docs": " Prevent comments from being inserted as text nodes\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <div>// comment</div>;\n ```\n\n ```jsx,expect_diagnostic\n <div>/* comment */</div>;\n ```\n\n ```jsx,expect_diagnostic\n <div>/** comment */</div>;\n ```\n\n ```jsx,expect_diagnostic\n <div>text /* comment */</div>;\n ```\n\n ```jsx,expect_diagnostic\n <div>/* comment */ text</div>;\n ```\n\n ```jsx,expect_diagnostic\n <div>\n     text\n     // comment\n </div>;\n ```\n\n ```jsx,expect_diagnostic\n <div>\n     // comment\n    text\n </div>;\n ```\n\n ```jsx,expect_diagnostic\n <div>\n     /* comment */\n     text\n </div>;\n ```\n\n ### Valid\n\n ```jsx\n <>\n    <div>{/* comment */}</div>;\n    <div>{/** comment */}</div>;\n    <div className={\"cls\" /* comment */}></div>;\n    <div>text {/* comment */}</div>;\n    <div>{/* comment */} text</div>;\n </>\n ```\n"
          },
          "noDocumentImportInPage": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "noDocumentImportInPage",
            "link": "https://biomejs.dev/linter/rules/no-document-import-in-page",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "no-document-import-in-page"
                }
              }
            ],
            "docs": " Prevents importing `next/document` outside of `pages/_document.jsx` in Next.js projects.\n\n The `next/document` module is intended for customizing the document structure globally in Next.js.\n Importing it outside of `pages/_document.js` can cause unexpected behavior and break certain features of the framework.\n\n ## Examples\n\n ### Valid\n\n ```jsx\n import { Document, Html } from 'next/document'\n\n export default class MyDocument extends Document {\n   render() {\n     return (\n       <Html lang=\"en\">\n         {/* */}\n       </Html>\n     )\n   }\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "jsx-no-duplicate-props"
                }
              }
            ],
            "docs": " Prevents JSX properties to be assigned multiple times.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <Hello name=\"John\" name=\"John\" />\n ```\n\n ```jsx,expect_diagnostic\n <label xml:lang=\"en-US\" xml:lang=\"en-US\"></label>\n ```\n\n ### Valid\n\n ```jsx\n <Hello firstname=\"John\" lastname=\"Doe\" />\n ```\n\n ```jsx\n <label xml:lang=\"en-US\" lang=\"en-US\"></label>\n ```\n"
          },
          "noHeadImportInDocument": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "noHeadImportInDocument",
            "link": "https://biomejs.dev/linter/rules/no-head-import-in-document",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "no-head-import-in-document"
                }
              }
            ],
            "docs": " Prevent using the `next/head` module in `pages/_document.js` on Next.js projects.\n\n Importing `next/head` within the custom `pages/_document.js` file can cause\n unexpected behavior in your application. The `next/head` component is designed\n to be used at the page level, and when used in the custom document it can interfere\n with the global document structure, which leads to issues with rendering and SEO.\n\n To modify `<head>` elements across all pages, you should use the `<Head />`\n component from the `next/document` module.\n\n ## Examples\n\n ### Valid\n\n ```jsx\n // pages/_document.js\n import Document, { Html, Head, Main, NextScript } from \"next/document\";\n\n class MyDocument extends Document {\n   static async getInitialProps(ctx) {\n     //...\n   }\n\n   render() {\n     return (\n       <Html>\n         <Head></Head>\n       </Html>\n     );\n   }\n }\n\n export default MyDocument;\n ```\n\n"
          },
          "noSuspiciousSemicolonInJsx": {
            "deprecated": false,
            "version": "1.6.0",
            "name": "noSuspiciousSemicolonInJsx",
            "link": "https://biomejs.dev/linter/rules/no-suspicious-semicolon-in-jsx",
            "recommended": true,
            "fixKind": "none",
            "docs": " It detects possible \"wrong\" semicolons inside JSX elements.\n\n Semicolons that appear after a self-closing element or a closing element are usually the result of a typo of a refactor gone wrong.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n const Component = () => {\n   return (\n     <div>\n       <div />;\n     </div>\n  );\n }\n ```\n\n ### Valid\n\n ```jsx\n const Component = () => {\n   return (\n     <div>\n       <div />\n       ;\n     </div>\n   );\n }\n const Component2 = () => {\n   return (\n     <div>\n       <span>;</span>\n     </div>\n   );\n }\n ```\n\n"
          },
          "useGoogleFontDisplay": {
            "deprecated": false,
            "version": "1.9.4",
            "name": "useGoogleFontDisplay",
            "link": "https://biomejs.dev/linter/rules/use-google-font-display",
            "recommended": true,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintNext": "google-font-display"
                }
              }
            ],
            "docs": " Enforces the use of a recommended `display` strategy with Google Fonts.\n\n The `display` property controls how a font is displayed while it is loading. When using Google Fonts,\n it's important to specify an appropriate value for this property to ensure good user experience and prevent layout shifts.\n\n This rule flags the absence of the `display` parameter, or the usage of less optimal values such as `auto`, `block`, or `fallback`.\n Using `&display=optional` is generally recommended as it minimizes the risk of invisible text or layout shifts.\n In cases where swapping to the custom font after it has loaded is important, consider using `&display=swap`.\n\n ## Examples\n\n ### Invalid\n\n ```jsx,expect_diagnostic\n <link href=\"https://fonts.googleapis.com/css2?family=Krona+One\" />\n ```\n\n ```jsx,expect_diagnostic\n <link href=\"https://fonts.googleapis.com/css2?family=Krona+One&display=auto\" />\n ```\n\n ```jsx,expect_diagnostic\n <link href=\"https://fonts.googleapis.com/css2?family=Krona+One&display=block\" />\n ```\n\n ```jsx,expect_diagnostic\n <link href=\"https://fonts.googleapis.com/css2?family=Krona+One&display=fallback\" />\n ```\n\n ### Valid\n\n ```jsx\n <link href=\"https://fonts.googleapis.com/css2?family=Krona+One&display=optional\" rel=\"stylesheet\" />\n ```\n\n ```jsx\n <link href=\"https://fonts.googleapis.com/css2?display=unknown\" rel=\"stylesheet\" />\n ```\n\n ```jsx\n <link rel=\"stylesheet\" />\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "ban-types"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "no-empty-object-type"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "no-wrapper-object-types"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "no-unsafe-function-type"
                }
              }
            ],
            "docs": " Disallow primitive type aliases and misleading types.\n\n This rule aims to prevent usage of potentially \"misleading\" types and type aliases\n which may behave unexpectedly.\n\n ### Disallow \"boxed object\" types like `Boolean` and `Number`\n\n JavaScript's 8 data types are described in TypeScript by the lowercase types\n `undefined`, `null`, `boolean`, `number`, `string`, `bigint`, `symbol`, and `object`.\n\n The latter 6 also have uppercase variants, which instead represent _interfaces_ with the shared properties of their primitive counterparts.\n Due to the nature of structural typing, these uppercase types accept both primitive values and non-primitive \"boxed object\"s\n like `new Boolean(true)`, despite the two behaving differently in many circumstances like equality and truthiness.\n\n It is thus considered best practice to avoid these \"boxed types\" in favor of their lowercase\n primitive counterparts.\n\n ### Disallow the unsafe `Function` type\n\n TypeScript's built-in `Function` type is capable of accepting callbacks of any shape or form,\n behaving equivalent to `(...rest: any[]) => any` (which uses the unsafe `any` type) when called directly. \\\n It also accepts classes or plain objects that happen to possess all properties of the `Function` class,\n which is likewise a potential source of confusion.\n\n As such, it is almost always preferable to explicitly specify function parameters and return types where possible. \\\n When a generic \"catch-all\" callback type is required, one of the following can be used instead:\n - `() => void`: A function that accepts no parameters and whose return value is ignored\n - `(...args: never) => unknown`: A \"top type\" for functions that can be _assigned_ any function type,\n    but can't be called directly\n\n ### Disallow the misleading empty object type `{}`\n `{}`, also known as the \"empty object\" type, _doesn't_ actually represent an empty object (despite what many new to TypeScript may assume). \\\n Due to TypeScript's type system being _structural_ instead of nominal, it actually accepts _any non-nullish value_,\n The following example is thus perfectly valid TypeScript:\n\n ```ts,ignore\n const n: {} = 0;\n ```\n\n Often, developers writing `{}` actually mean one of the following:\n - `object`: Represents any object value\n - `unknown`: Represents any value at all, including `null` and `undefined`\n - `{ [k: keyof any]: never }` or `Record<keyof any, never>`: Represent object types whose properties are all of type `never` (and cannot be used)\n - `{ [myUniqueInternalSymbol]?: never }`: Represents an object type whose only \"property\" is an unexported `unique symbol`, thereby forcing external consumers to omit it[^2]. \\\n   This can be used as a type guard for use in `extends` clauses or a type annotation for use in [excess property checks](https://www.typescriptlang.org/docs/handbook/2/objects.html#excess-property-checks),\n   both with their own respective use cases and pitfalls.\n\n To avoid confusion, this rule forbids the use of the type `{}`, except in two situations:\n\n 1. In type constraints to restrict a generic type to non-nullable types:\n\n ```ts\n function f<T extends {}>(x: T) {\n     assert(x != null);\n }\n ```\n\n 2. In a type intersection to narrow a type to its non-nullable equivalent type:\n\n ```ts\n type NonNullableMyType = MyType & {};\n ```\n\n In this last case, you can also use the `NonNullable` utility type to the same effect:\n\n ```ts\n // equivalent to `{}`\n type AnythingNotNullish = NonNullable<unknown>;\n ```\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n let foo: String = \"bar\";\n ```\n\n ```ts,expect_diagnostic\n const bool = true as Boolean;\n ```\n\n ```ts,expect_diagnostic\n let invalidTuple: [string, Number] = [\"foo\", 12];\n ```\n\n ```ts,expect_diagnostic\n function badFunction(cb: Function) {\n   cb(12);\n }\n ```\n\n ```ts,expect_diagnostic\n const notEmpty: {} = {prop: 12};\n ```\n\n ```ts,expect_diagnostic\n const alsoNotAnObj: Object = \"foo\";\n ```\n\n ### Valid\n\n ```ts\n const foo: string = \"bar\";\n ```\n\n ```ts\n let tuple: [boolean, string] = [false, \"foo\"];\n ```\n\n ```ts\n function betterFunction(cb: (n: number) => string) {\n   return cb(12);\n }\n ```\n\n ```ts\n type wrapFn<T extends (...args: never) => unknown> = { func: T }\n ```\n\n ```ts\n const goodObj: object = {foo: 12};\n ```\n\n ```ts\n type emptyObj = Record<string, never>;\n ```\n\n Exceptions for `{}`:\n ```ts\n declare function foo<T extends {}>(x: T): void;\n ```\n\n ```ts\n type notNull<T> = T & {};\n ```\n\n [^1]: This is the exact same mechanism that allows passing `{ foo: number, bar: string }`\n to a function expecting `{ bar: string }`.\n Specifying `{}` doesn't restrict compatible types to ones with _exactly_ 0 properties;\n it simply requires they have _at least_ 0 properties.\n [^2]: In this case, you'd write `declare const myUniqueInternalSymbol: unique symbol` somewhere in the same file.\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-useless-empty-export"
                }
              }
            ],
            "docs": " Disallow empty exports that don't change anything in a module file.\n\n An empty `export {}` is sometimes useful to turn a file that would otherwise be a script into a module.\n Per the [TypeScript Handbook Modules page](https://www.typescriptlang.org/docs/handbook/modules.html):\n\n > In TypeScript, just as in ECMAScript 2015,\n > any file containing a top-level import or export is considered a module.\n > Conversely, a file without any top-level import or export declarations is treated as a script\n > whose contents are available in the global scope.\n\n However, an `export {}` statement does nothing if there are any other top-level import or export in the file.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n import { A } from \"module\";\n export {};\n ```\n\n ```js,expect_diagnostic\n export const A = 0;\n export {};\n ```\n\n ### Valid\n\n ```js\n export {};\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-unnecessary-type-constraint"
                }
              }
            ],
            "docs": " Disallow using `any` or `unknown` as type constraint.\n\n Generic type parameters (`<T>`) in TypeScript may be **constrained** with [`extends`](https://www.typescriptlang.org/docs/handbook/generics.html#generic-constraints).\n A supplied type must then be a subtype of the supplied constraint.\n All types are subtypes of `any` and `unknown`.\n It is thus useless to extend from `any` or `unknown`.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface FooAny<T extends any> {}\n ```\n ```ts,expect_diagnostic\n type BarAny<T extends any> = {};\n ```\n ```ts,expect_diagnostic\n class BazAny<T extends any> {\n }\n ```\n ```ts,expect_diagnostic\n class BazAny {\n   quxAny<U extends any>() {}\n }\n ```\n ```ts,expect_diagnostic\n const QuuxAny = <T extends any>() => {};\n ```\n ```ts,expect_diagnostic\n function QuuzAny<T extends any>() {}\n ```\n\n ```ts,expect_diagnostic\n interface FooUnknown<T extends unknown> {}\n ```\n ```ts,expect_diagnostic\n type BarUnknown<T extends unknown> = {};\n ```\n ```ts,expect_diagnostic\n class BazUnknown<T extends unknown> {\n }\n ```\n ```ts,expect_diagnostic\n class BazUnknown {\n   quxUnknown<U extends unknown>() {}\n }\n ```\n ```ts,expect_diagnostic\n const QuuxUnknown = <T extends unknown>() => {};\n ```\n ```ts,expect_diagnostic\n function QuuzUnknown<T extends unknown>() {}\n ```\n\n ### Valid\n\n ```ts\n interface Foo<T> {}\n\n type Bar<T> = {};\n```\n"
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
          "noFloatingPromises": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "noFloatingPromises",
            "link": "https://biomejs.dev/linter/rules/no-floating-promises",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-floating-promises"
                }
              }
            ],
            "docs": " Require Promise-like statements to be handled appropriately.\n\n A \"floating\" `Promise` is one that is created without any code set up to\n handle any errors it might throw. Floating Promises can lead to several\n issues, including improperly sequenced operations, unhandled Promise\n rejections, and other unintended consequences.\n\n This rule will report Promise-valued statements that are not treated in\n one of the following ways:\n - Calling its `.then()` method with two arguments\n - Calling its `.catch()` method with one argument\n - `await`-ing it\n - `return`-ing it\n - `void`-ing it\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic,file=async-fn.ts\n async function returnsPromise(): Promise<string> {\n   return 'value';\n }\n returnsPromise().then(() => {});\n ```\n\n ```ts,expect_diagnostic,file=async-fn2.ts\n const returnsPromise = async (): Promise<string> => {\n   return 'value';\n }\n async function returnsPromiseInAsyncFunction() {\n   returnsPromise().then(() => {});\n }\n ```\n\n ```js,expect_diagnostic,file=new-promise.js\n const promise = new Promise((resolve) => resolve('value'));\n promise.then(() => { }).finally(() => { });\n ```\n\n ```js,expect_diagnostic,file=promise-all.js\n Promise.all([p1, p2, p3])\n ```\n\n ```ts,expect_diagnostic,file=async-method.ts\n class Api {\n   async returnsPromise(): Promise<string> {\n     return 'value';\n   }\n   async someMethod() {\n     this.returnsPromise();\n   }\n }\n ```\n\n ```ts,expect_diagnostic,file=async-super-method.ts\n class Parent {\n   async returnsPromise(): Promise<string> {\n     return 'value';\n   }\n }\n\n class Child extends Parent {\n   async someMethod() {\n     this.returnsPromise();\n   }\n }\n ```\n\n ```ts,expect_diagnostic,file=async-method2.ts\n class Api {\n   async returnsPromise(): Promise<string> {\n     return 'value';\n   }\n }\n const api = new Api();\n api.returnsPromise().then(() => {}).finally(() => {});\n ```\n\n ```ts,expect_diagnostic,file=async-object-method.ts\n const obj = {\n   async returnsPromise(): Promise<string> {\n     return 'value';\n   },\n };\n\n obj.returnsPromise();\n ```\n\n ```ts,expect_diagnostic,file=async-prop.ts\n type Props = {\n   returnsPromise: () => Promise<void>;\n };\n\n async function testCallingReturnsPromise(props: Props) {\n   props.returnsPromise();\n }\n ```\n\n ### Valid\n\n ```ts,file=valid-examples.ts\n async function returnsPromise(): Promise<string> {\n   return 'value';\n }\n\n await returnsPromise();\n\n void returnsPromise();\n\n // Calling .then() with two arguments\n returnsPromise().then(\n   () => {},\n   () => {},\n );\n\n // Calling .catch() with one argument\n returnsPromise().catch(() => {});\n\n await Promise.all([p1, p2, p3])\n\n class Api {\n   async returnsPromise(): Promise<string> {\n     return 'value';\n   }\n   async someMethod() {\n     await this.returnsPromise();\n   }\n }\n\n type Props = {\n   returnsPromise: () => Promise<void>;\n };\n\n async function testCallingReturnsPromise(props: Props) {\n   return props.returnsPromise();\n }\n ```\n\n"
          },
          "noMisusedPromises": {
            "deprecated": false,
            "version": "2.1.0",
            "name": "noMisusedPromises",
            "link": "https://biomejs.dev/linter/rules/no-misused-promises",
            "recommended": true,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-misused-promises"
                }
              }
            ],
            "docs": " Disallow Promises to be used in places where they are almost certainly a\n mistake.\n\n In most cases, if you assign a `Promise` somewhere a `Promise` is not\n allowed, the TypeScript compiler will be able to catch such a mistake.\n But there are a few places where TypeScript allows them -- they're not\n _necessarily_ a mistake -- even though they could be considered almost\n certainly to be one.\n\n This rule disallows using Promises in such places.\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic,file=promise-in-condition.js\n const promise = Promise.resolve('value');\n if (promise) { /* This branch will always execute */ }\n ```\n\n ```js,expect_diagnostic,file=promise-in-ternary-condition.js\n const promise = Promise.resolve('value');\n const val = promise ? 123 : 456; // Always evaluates to `123`.\n ```\n\n ```js,expect_diagnostic,file=promise-in-filter.js\n // The following filter has no effect:\n const promise = Promise.resolve('value');\n [1, 2, 3].filter(() => promise);\n ```\n\n ```js,expect_diagnostic,file=promise-while-condition.js\n const promise = Promise.resolve('value');\n while (promise) { /* This is an endless loop */ }\n ```\n\n ```js,expect_diagnostic,file=spread-promise.js\n // Using a `Promise` as an iterable expands to nothing:\n const getData = () => fetch('/');\n console.log({ foo: 42, ...getData() });\n ```\n\n ```js,expect_diagnostic,file=promise-in-forEach.js\n // These `fetch`-es are not `await`-ed in order:\n [1, 2, 3].forEach(async value => {\n     await fetch(`/${value}`);\n });\n ```\n\n ### Valid\n\n ```js,file=valid-promises.js\n const promise = Promise.resolve('value');\n if (await promise) { /* Do something */ }\n\n const val = (await promise) ? 123 : 456;\n\n while (await promise) { /* Do something */ }\n\n const getData = () => fetch('/');\n console.log({ foo: 42, ...(await getData()) });\n\n // for-of puts `await` in outer context:\n for (const value of [1, 2, 3]) {\n     await doSomething(value);\n }\n ```\n\n"
          },
          "useConsistentEnumValueType": {
            "deprecated": false,
            "version": "2.3.13",
            "name": "useConsistentEnumValueType",
            "link": "https://biomejs.dev/linter/rules/use-consistent-enum-value-type",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-mixed-enums"
                }
              }
            ],
            "docs": " Disallow enums from having both number and string members.\n\n TypeScript enums are allowed to assign numeric or string values to their members.\n Most enums contain either all numbers or all strings, but in theory you can mix-and-match within the same enum.\n Mixing enum member types is generally considered confusing and a bad practice.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n enum Status {\n   Unknown,\n   Closed = 1,\n   Open = 'open',\n }\n ```\n\n ### Valid\n\n ```ts\n enum Status {\n   Unknown = 0,\n   Closed = 1,\n   Open = 2,\n }\n ```\n\n ```ts\n enum Status {\n   Unknown,\n   Closed,\n   Open,\n }\n ```\n\n ```ts\n enum Status {\n   Unknown = 'unknown',\n   Closed = 'closed',\n   Open = 'open',\n }\n ```\n\n"
          },
          "useConsistentMethodSignatures": {
            "deprecated": false,
            "version": "2.3.14",
            "name": "useConsistentMethodSignatures",
            "link": "https://biomejs.dev/linter/rules/use-consistent-method-signatures",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "method-signature-style"
                }
              }
            ],
            "docs": " Enforce consistent use of either method signatures or function properties within interfaces and type aliases.\n\n TypeScript provides 2 different ways to declare methods within interfaces and object types:\n ```ts,ignore\n interface Example {\n   // method shorthand syntax\n   methodFunc(arg: string): void;\n\n   // regular property with function type\n   prop: (arg: string) => void;\n }\n\n // These forms correspond to the analogous JS object literal patterns:\n const obj = {\n   methodFunc(arg) {},\n   prop: (arg) => {},\n } satisfies Example;\n ```\n\n While mostly a matter of stylistic consistency, the two gain subtle differences in behavior when the\n [`strictFunctionTypes`](https://www.typescriptlang.org/tsconfig/#strictFunctionTypes) compiler option is enabled. \\\n More specifically, its stricter contravariant checks will **only** apply to functions written in _property_ syntax —\n ones written as methods will remain with the weaker bivariant type checks.\n\n <details>\n <summary>What's the difference?</summary>\n\n To illustrate the differences between method bivariance and contravariance, consider the following snippet of code:\n ```ts,ignore\n interface Emitter {\n   methodFunc(arg: Event): void;\n   propFunc: (arg: Event) => void;\n }\n\n interface SpecialEvent extends Event {\n   isBirthday: boolean;\n }\n\n interface SpecialEmitter extends Emitter {\n   methodFunc(arg: SpecialEvent): void; // OK\n   propFunc: (arg: SpecialEvent) => void; // Error under `strictFunctionTypes`\n }\n ```\n In the above example, `SpecialEmitter.methodFunc` is compatible with `Emitter.methodFunc` under _bivariant_[^1] checks,\n as `SpecialEvent` is assignable to `Event` (i.e. all `SpecialEvent`s are guaranteed to be valid `Event`s). \\\n On the other hand, the strict _contravariant_ checks for function properties produce errors on `propFunc` as the reverse is not guaranteed —\n `Event` is not assignable to `SpecialEvent` (i.e. not all `Event`s are guaranteed to be valid `SpecialEvent`s).\n\n The full rationale for this behavior can be found in the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#function-parameter-bivariance).\n\n [^1]: From a purely type-theoretical perspective, bivariance technically refers to a type being _both_ covariant _and_ contravariant at once\n (`A` ⊆ `B` implies `T<A>` ≣ `T<B>`). \\\n In practice, this is only true for pathological types like `type T<A> = number`,\n and so is often used to refer to a type being either covariant _or_ contravariant (which simply requires `T<A>` and `T<B>` to have some non-zero amount of overlap).\n\n </details>\n\n To avoid inconsistent type assignability issues and enforce stylistic consistency, this rule attempts to\n ensure either method- or property-style declarations are used consistently across a given codebase.\n\n :::info\n Without `strictFunctionTypes` enabled, method signatures and function properties become **functionally identical**.\n In this case, which option to use simply becomes a matter of personal preference.\n :::\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface Example {\n   methodFunc(arg: string): number;\n }\n ```\n\n ```ts,expect_diagnostic\n type Generic<T, U> = {\n   methodFunc(arg: T): U;\n }\n ```\n\n ```ts,expect_diagnostic\n type Union =\n   | {\n     foo(bar: number): number;\n   }\n   | 4;\n ```\n\n ```ts,expect_diagnostic\n type Intersection =\n   {\n     qux(quux: number): \"quuux\";\n   } & { foo: string };\n ```\n\n ### Valid\n\n ```ts\n interface Prop {\n   propFunc: (arg: string) => number;\n }\n ```\n\n ```ts\n type Thing<T> = {\n   genericProp: <U>(arg: U) => T;\n }\n ```\n\n ```ts\n type Callback = () => void;\n ```\n\n Classes (as well as interfaces lacking function declarations) are always ignored:\n ```ts\n interface Example {\n   notAFunc: number;\n }\n ```\n\n ```ts\n class Foo {\n   methodFunc(arg: string): number;\n }\n ```\n\n ## Options\n\n ### `style`\n The desired method signature style to enforce. \\\n Possible values are either `\"method\"` or `\"property\"`.\n\n Default: `\"property\"`[^2]\n\n #### Examples for `\"style\": \"method\"`\n\n ```json,options\n {\n  \"options\": {\n    \"style\": \"method\"\n  }\n }\n ```\n\n ```ts,use_options,expect_diagnostic\n interface Blah {\n   propFunc: (arg: string) => void;\n }\n ```\n\n ```ts,use_options,expect_diagnostic\n type Generic = {\n   propFunc: <T, U>(arg: T) => U;\n }\n ```\n\n ```ts,use_options\n type OK = {\n   flubber(arg: number): number;\n }\n ```\n\n [^2]: Chosen to allow stricter type checks under the aforementioned `strictFunctionTypes`.\n"
          },
          "useExplicitType": {
            "deprecated": false,
            "version": "1.9.3",
            "name": "useExplicitType",
            "link": "https://biomejs.dev/linter/rules/use-explicit-type",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "explicit-function-return-type"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "explicit-module-boundary-types"
                }
              }
            ],
            "docs": " Enforce types in functions, methods, variables, and parameters.\n\n Functions in TypeScript often don't need to be given an explicit return type annotation.\n Leaving off the return type is less code to read or write and allows the compiler to infer it from the contents of the function.\n\n However, explicit return types do make it visually clearer what type is returned by a function.\n They can also speed up TypeScript type-checking performance in large codebases with many large functions.\n Explicit return types also reduce the chance of bugs by asserting the return type, and it avoids surprising \"action at a distance,\" where changing the body of one function may cause failures inside another function.\n\n Annotating module-level variables serves a similar purpose. This rule only allows assignment of literals and some objects to untyped variables.\n Objects that are allowed must not contain spread syntax and values that aren't literals.\n Additionally, `let` and `var` variables with `null` or `undefined` as value require explicit annotation.\n\n This rule enforces that functions do have an explicit return type annotation.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n // Should indicate that no value is returned (void)\n function test() {\n   return;\n }\n ```\n\n ```ts,expect_diagnostic\n // Should indicate that a number is returned\n var fn = function () {\n    return 1;\n };\n ```\n\n ```ts,expect_diagnostic\n // Should indicate that a string is returned\n var arrowFn = () => 'test';\n ```\n\n ```ts,expect_diagnostic\n class Test {\n   // Should indicate that no value is returned (void)\n   method() {\n     return;\n   }\n }\n ```\n\n ```ts,expect_diagnostic\n // Should indicate that no value is returned (void)\n function test(a: number) {\n   a += 1;\n }\n ```\n\n ```ts,expect_diagnostic\n // Should use const assertions\n var func = (value: number) => ({ type: 'X', value }) as any;\n ```\n\n ```ts,expect_diagnostic\n // Unspecified variable type\n function fn(): string {\n     return \"Not inline\";\n }\n const direct = fn();\n ```\n\n ```ts,expect_diagnostic\n // Unspecified object member type\n function fn(): string {\n     return \"Not inline\";\n }\n const nested = { result: fn() };\n ```\n\n ```ts,expect_diagnostic\n // let bindings of null and undefined are usually overwritten by other code\n let foo = null;\n ```\n\n The following example is considered incorrect for a higher-order function, as the returned function does not specify a return type:\n\n ```ts,expect_diagnostic\n var arrowFn = () => () => {};\n ```\n\n ```ts,expect_diagnostic\n var arrowFn = () => {\n   return () => { };\n }\n ```\n\n The following example is considered incorrect for a higher-order function because the function body contains multiple statements. We only check whether the first statement is a function return.\n\n ```ts,expect_diagnostic\n // A function has multiple statements in the body\n function f() {\n   if (x) {\n     return 0;\n   }\n   return (): void => {}\n }\n ```\n\n ```ts,expect_diagnostic\n // A function has multiple statements in the body\n function f() {\n   let str = \"test\";\n   return (): string => {\n     str;\n   }\n }\n ```\n\n ```ts,expect_diagnostic\n // A function has multiple statements in the body\n function f() {\n   let str = \"test\";\n }\n ```\n\n The following example is considered incorrect for an interface method without a return type:\n\n ```ts,expect_diagnostic\n interface Array<Type> {\n   method();\n }\n ```\n\n The following example is considered incorrect for a type declaration of a function without a return type:\n\n ```ts,expect_diagnostic\n type MyObject = {\n   (input: string);\n   propertyName: string;\n };\n ```\n\n The following example is considered incorrect for an abstract class method without a return type:\n\n ```ts,expect_diagnostic\n abstract class MyClass {\n   public abstract method();\n }\n ```\n\n The following example is considered incorrect for an abstract class getter without a return type:\n\n ```ts,expect_diagnostic\n abstract class P<T> {\n   abstract get poke();\n }\n ```\n\n The following example is considered incorrect for a function declaration in a namespace without a return type:\n\n ```ts,expect_diagnostic\n declare namespace myLib {\n   function makeGreeting(s: string);\n }\n ```\n\n The following example is considered incorrect for a module function export without a return type:\n\n ```ts,expect_diagnostic\n declare module \"foo\" {\n   export default function bar();\n }\n ```\n\n The following example is considered incorrect because `arg` has `any` type.\n\n ```ts,expect_diagnostic\n var arrowFn = (arg: any): string => `test ${arg}`;\n ```\n\n ### Valid\n ```ts\n // No return value should be expected (void)\n function test(): void {\n   return;\n }\n ```\n\n ```ts\n // A return value of type number\n var fn = function (): number {\n   return 1;\n }\n ```\n\n ```ts\n // A return value of type string\n var arrowFn = (): string => 'test';\n ```\n\n ```ts\n // A literal value\n const PREFIX = \"/prefix\";\n ```\n\n ```ts\n // Explicit variable annotation\n function func(): string {\n     return \"\";\n }\n let something: string = func();\n ```\n\n ```ts\n class Test {\n   // No return value should be expected (void)\n   method(): void {\n     return;\n   }\n }\n ```\n\n The following example is considered correct code for a function immediately returning a value with `as const`:\n\n ```ts\n var func = (value: number) => ({ foo: 'bar', value }) as const;\n ```\n\n The following example is considered correct code for a value assigned using type assertion:\n\n ```ts\n function fn(): string {\n     return \"Not inline\";\n }\n const direct = fn() as string;\n const nested = { result: fn() as string };\n ```\n\n The following examples are considered correct code for a function allowed within specific expression contexts, such as an IIFE, a function passed as an argument, or a function inside an array:\n\n ```ts\n // Callbacks without return types\n setTimeout(function() { console.log(\"Hello!\"); }, 1000);\n ```\n\n ```ts\n // Callbacks without argument types (immediately nested in a function call)\n new Promise((resolve) => resolve(1));\n ```\n\n ```ts\n // IIFE\n (() => {})();\n ```\n\n The following example is considered correct code for a higher-order function, where the returned function explicitly specifies a return type and the function body contains only one statement:\n\n ```ts\n // the outer function returns an inner function that has a `void` return type\n var arrowFn = () => (): void => {};\n ```\n\n ```ts\n // the outer function returns an inner function that has a `void` return type\n var arrowFn = () => {\n   return (): void => { };\n }\n ```\n\n The following examples are considered correct for type annotations on variables in function expressions:\n\n ```ts\n // A function with a type assertion using `as`\n var asTyped = (() => '') as () => string;\n ```\n\n ```ts\n // A function with a type assertion using `<>`\n var castTyped = <() => string>(() => '');\n ```\n\n ```ts\n // A variable declarator with a type annotation.\n type FuncType = () => string;\n var arrowFn: FuncType = () => 'test';\n ```\n\n ```ts\n // A function is a default parameter with a type annotation\n type CallBack = () => void;\n var f = (gotcha: CallBack = () => { }): void => { };\n ```\n\n ```ts\n // A class property with a type annotation\n type MethodType = () => void;\n class App {\n     private method: MethodType = () => { };\n }\n ```\n\n"
          }
        },
        "style": {
          "noEnum": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noEnum",
            "link": "https://biomejs.dev/linter/rules/no-enum",
            "recommended": false,
            "fixKind": "none",
            "docs": " Disallow TypeScript enum.\n\n TypeScript enums are not a type-level extension to JavaScript like type annotations or definitions.\n Users may wish to disable non-type-level extensions to use bundlers or compilers that only strip types.\n\n Const enums are not covered by this rule since `noConstEnum` already handles them.\n Enums within the ambient context, including declaration files, are ignores as well.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n enum Foo {\n     BAR = 'bar',\n     BAZ = 'baz',\n }\n ```\n\n ### Valid\n\n ```ts\n const Foo = {\n     BAR: 'bar',\n     BAZ: 'baz',\n } as const\n ```\n\n ```ts\n type Foo = 'bar' | 'baz'\n ```\n\n ```ts\n const enum Foo {\n     BAR = 'bar',\n     BAZ = 'baz',\n }\n ```\n\n\n"
          },
          "noInferrableTypes": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noInferrableTypes",
            "link": "https://biomejs.dev/linter/rules/no-inferrable-types",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-inferrable-types"
                }
              }
            ],
            "docs": " Disallow type annotations for variables, parameters, and class properties initialized with a literal expression.\n\n TypeScript is able to infer the types of parameters, properties, and variables from their default or initial values.\n There is no need to use an explicit `:` type annotation for trivially inferred types (boolean, bigint, number, regex, string).\n Doing so adds unnecessary verbosity to code making it harder to read.\n\n In contrast to ESLint's rule, this rule allows to use a wide type for `const` declarations.\n Moreover, the rule does not recognize `undefined` values, primitive type constructors (String, Number, ...), and `RegExp` type.\n These global variables could be shadowed by local ones.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n const variable: 1 = 1;\n ```\n\n ```ts,expect_diagnostic\n let variable: number = 1;\n ```\n\n ```ts,expect_diagnostic\n class SomeClass {\n   readonly field: 1 = 1;\n }\n ```\n\n ```ts,expect_diagnostic\n class SomeClass {\n   field: number = 1;\n }\n ```\n\n ```ts,expect_diagnostic\n function f(param: number = 1): void {}\n ```\n\n ### Valid\n\n ```ts\n const variable: number = 1;\n ```\n\n ```ts\n let variable: 1 | 2 = 1;\n ```\n\n ```ts\n class SomeClass {\n   readonly field: number = 1;\n }\n ```\n\n ```ts\n // `undefined` could be shadowed\n const variable: undefined = undefined;\n ```\n\n ```ts\n // `RegExp` could be shadowed\n const variable: RegExp = /a/;\n ```\n\n ```ts\n // `String` could be shadowed\n let variable: string = String(5);\n ```\n\n ```ts\n class SomeClass {\n   field: 1 | 2 = 1;\n }\n ```\n\n ```ts\n function f(param: 1 | 2 = 1): void {}\n ```\n\n"
          },
          "noMagicNumbers": {
            "deprecated": false,
            "version": "2.1.0",
            "name": "noMagicNumbers",
            "link": "https://biomejs.dev/linter/rules/no-magic-numbers",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-magic-numbers"
                }
              }
            ],
            "docs": " Reports usage of \"magic numbers\" — numbers used directly instead of being assigned to named constants.\n\n Its goal is to improve code maintainability and readability by encouraging developers to extract such numbers into named constants, making their purpose explicit.\n\n It ignores:\n - non-magic values (like 0, 1, 2, 10, 24, 60, and their negative or bigint forms) found anywhere, including arithmetic expressions, fn calls etc.\n - Array indices\n - Enum values\n - Initial values in variable or class property declarations\n - Default values in function parameters or destructuring patterns\n - Arguments to JSON.stringify and parseInt (e.g., `JSON.stringify(22)`, `parseInt(\"123\", 8)`)\n - Operands in bitwise operations (e.g., `a & 7`, `a | 7`)\n - Values in JSX expressions (e.g., `<div>{1}</div>`)\n - Object property values (e.g., `{ tax: 0.25 }`)\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n let total = price * 1.23; // Magic number for tax rate\n ```\n\n ### Valid\n\n ```js\n const TAX_RATE = 1.23;\n let total = price * TAX_RATE;\n ```\n\n ```ts\n const TAX_RATE = 1.23 as const;\n let total = price * TAX_RATE;\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-namespace"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-non-null-assertion"
                }
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
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "parameter-properties"
                }
              }
            ],
            "docs": " Disallow the use of parameter properties in class constructors.\n\n TypeScript includes a \"parameter properties\" shorthand for declaring a class constructor parameter and class property in one location.\n Parameter properties can confuse those new to TypeScript as they are less explicit than other ways of declaring and initializing class members.\n Moreover, private class properties, starting with `#`, cannot be turned into \"parameter properties\".\n This questions the future of this feature.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n class A {\n     constructor(readonly name: string) {}\n }\n ```\n\n ### Valid\n\n ```ts\n class A {\n     constructor(name: string) {}\n }\n ```\n\n"
          },
          "noRestrictedTypes": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "noRestrictedTypes",
            "link": "https://biomejs.dev/linter/rules/no-restricted-types",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-restricted-types"
                }
              }
            ],
            "docs": " Disallow user defined types.\n\n This rule allows you to specify type names that you don’t want to use in your application.\n\n To prevent use of commonly misleading types, you can refer to [noBannedTypes](https://biomejs.dev/linter/rules/no-banned-types/)\n\n ## Options\n\n Use the options to specify additional types that you want to restrict in your\n source code.\n\n ```json,options\n {\n     \"options\": {\n         \"types\": {\n            \"Foo\": {\n               \"message\": \"Only bar is allowed\",\n               \"use\": \"bar\"\n             },\n             \"OldAPI\": \"Use NewAPI instead\"\n         }\n     }\n }\n ```\n\n In the example above, the rule will emit a diagnostics if `Foo` or `OldAPI` are used.\n\n"
          },
          "noUnusedTemplateLiteral": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noUnusedTemplateLiteral",
            "link": "https://biomejs.dev/linter/rules/no-unused-template-literal",
            "recommended": false,
            "fixKind": "safe",
            "docs": " Disallow template literals if interpolation and special-character handling are not needed\n\n ## Examples\n\n ### Invalid\n\n ```js,expect_diagnostic\n const foo = `bar`\n ```\n\n ```js,expect_diagnostic\n const foo = `bar `\n ```\n\n ### Valid\n\n ```js\n const foo = `bar\n has newline`;\n ```\n\n ```js\n const foo = `\"bar\"`\n ```\n\n ```js\n const foo = `'bar'`\n ```\n"
          },
          "useAsConstAssertion": {
            "deprecated": false,
            "version": "1.3.0",
            "name": "useAsConstAssertion",
            "link": "https://biomejs.dev/linter/rules/use-as-const-assertion",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "prefer-as-const"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "array-type"
                }
              }
            ],
            "docs": " Require consistently using either `T[]` or `Array<T>`\n\n _TypeScript_ provides two equivalent ways to define an array type: `T[]` and `Array<T>`.\n The two styles are functionally equivalent.\n Using the same style consistently across your codebase makes it easier for developers to read and understand array types.\n\n ## Example\n\n ### Invalid\n ```ts,expect_diagnostic\n let invalid: Array<foo>;\n ```\n\n ```ts,expect_diagnostic\n let invalid: Promise<Array<string>>;\n ```\n\n ```ts,expect_diagnostic\n let invalid3: Array<Foo<Bar>>;\n ```\n\n ### Valid\n ```ts\n const valid: Array<string | number> = ['a', 'b'];\n const valid: Array<{ prop: string }> = [{ prop: 'a' }];\n const valid: Array<() => void> = [() => {}];\n const valid: MyType[] = ['a', 'b'];\n const valid: string[] = ['a', 'b'];\n const valid: readonly string[] = ['a', 'b'];\n ```\n\n ## Options\n\n Use the options to specify the syntax of array declarations to use.\n\n ```json,options\n {\n     \"options\": {\n         \"syntax\": \"shorthand\"\n     }\n }\n ```\n\n ### syntax\n\n The syntax to use:\n - `generic`: array declarations will be converted to `Array<T>` or `ReadonlyArray<T>`\n - `shorthand`: array declarations will be converted to `T[]` or `readonly T[]`\n\n Default: `shorthand`\n\n"
          },
          "useConsistentMemberAccessibility": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "useConsistentMemberAccessibility",
            "link": "https://biomejs.dev/linter/rules/use-consistent-member-accessibility",
            "recommended": false,
            "fixKind": "none",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "explicit-member-accessibility"
                }
              }
            ],
            "docs": " Require consistent accessibility modifiers on class properties and methods.\n\n TypeScript allows placing explicit `public`, `protected`, and `private` accessibility modifiers in front of class members.\n The modifiers exist solely in the type system and just serve to describe who is allowed to access those members.\n Leaving off accessibility modifiers makes for less code to read and write. Members are public by default.\n\n However, adding in consistent accessibility modifiers can be helpful in codebases with many classes for enforcing proper privacy of members.\n Some developers also find it preferable for code readability to keep member publicity explicit.\n\n ## Examples\n\n ### Invalid\n\n #### `\"accessibility\": \"noPublic\"` (default value)\n\n Use the following configuration to disallow all explicit `public` modifiers:\n\n ```json,options\n {\n     \"options\": {\n         \"accessibility\": \"noPublic\"\n     }\n }\n ```\n\n The following patterns are considered incorrect code with `noPublic`:\n\n ```ts,expect_diagnostic,use_options\n class Animal {\n   public constructor(breed, name) {\n     // ...\n   }\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n class Animal {\n   constructor(\n     public breed,\n     name,\n   ) {\n     // ...\n   }\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n class Animal {\n   public animalName: string;\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n class Pet {\n   public get name(): string {\n     return this.animalName;\n   }\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n class Pet {\n   public set name(value: string) {\n     this.animalName = value;\n   }\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n class Dog {\n   public walk() {\n     // ...\n   }\n }\n ```\n\n #### `\"accessibility\": \"explicit\"`\n\n Use the following configuration to enforce the presence of explicit modifiers wherever possible:\n\n ```json,options\n {\n     \"options\": {\n         \"accessibility\": \"explicit\"\n     }\n }\n ```\n\n The following patterns are considered incorrect code with `accessibility` set to `explicit`:\n\n ```ts,expect_diagnostic,use_options\n class Animal {\n   constructor( // Invalid: Missing accessibility modifier\n     public breed,\n     name,\n   ) {\n     this.animalName = name;\n   }\n   private animalName: string; // OK: Modifier must be present\n   public get name(): string { // OK: Modifier must be present\n     return this.animalName;\n   }\n   public set name(value: string) { // OK: Modifier must be present\n     this.animalName = value;\n   }\n   protected walk() { // OK: Modifier must be present\n     // ...\n   }\n }\n ```\n\n #### `\"accessibility\": \"none\"`\n\n Use the following configuration to disallow all explicit visibility modifiers:\n\n ```json,options\n {\n     \"options\": {\n         \"accessibility\": \"none\"\n     }\n }\n ```\n\n The following patterns are considered incorrect code with `accessibility` set to `none`:\n\n ```ts,expect_diagnostic,use_options\n class Animal {\n   protected constructor(breed, name) {\n     // ...\n   }\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n class Animal {\n   constructor(\n     protected breed,\n     name,\n   ) {\n     // ...\n   }\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n class Animal {\n   private animalName: string;\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n class Animal {\n   protected get name(): string {\n     return this.animalName;\n   }\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n class Pet {\n   private set name(value: string) {\n     this.animalName = value;\n   }\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n class Dog {\n   public walk() {\n     // ...\n   }\n }\n ```\n\n ### Valid\n\n The following patterns are considered correct code with the default options `noPublic`:\n\n ```json,options\n {\n     \"options\": {\n         \"accessibility\": \"noPublic\"\n     }\n }\n ```\n\n ```ts,use_options\n class Animal {\n   constructor(\n     private breed,\n     name,\n   ) {\n     this.animalName = name;\n   }\n   private animalName: string; // Property\n   get name(): string {\n     // get accessor\n     return this.animalName;\n   }\n   set name(value: string) {\n     // set accessor\n     this.animalName = value;\n   }\n   protected walk() {\n     // method\n   }\n }\n ```\n\n The following patterns are considered correct code with the accessibility set to `explicit`:\n\n ```json,options\n {\n     \"options\": {\n         \"accessibility\": \"explicit\"\n     }\n }\n ```\n\n ```ts,use_options\n class Animal {\n   public constructor(\n     public breed,\n     name,\n   ) {\n     // Parameter property and constructor\n     this.animalName = name;\n   }\n   private animalName: string; // Property\n   public get name(): string {\n     // get accessor\n     return this.animalName;\n   }\n   public set name(value: string) {\n     // set accessor\n     this.animalName = value;\n   }\n   protected walk() {\n     // method\n   }\n }\n ```\n\n The following patterns are considered correct code with the accessibility set to `none`:\n\n ```json,options\n {\n     \"options\": {\n         \"accessibility\": \"none\"\n     }\n }\n ```\n\n ```ts,use_options\n class Animal {\n   constructor(\n     breed,\n     name,\n   ) {\n     // Parameter property and constructor\n     this.name = name;\n   }\n   animalName: string; // Property\n   get name(): string {\n     // get accessor\n     return this.animalName;\n   }\n   set name(value: string) {\n     // set accessor\n     this.animalName = value;\n   }\n   walk() {\n     // method\n   }\n }\n ```\n\n ## Options\n\n The rule supports the following options:\n\n ```json,options\n {\n     \"options\": {\n         \"accessibility\": \"explicit\"\n     }\n }\n ```\n\n ### `accessibility`\n\n This option determines the required accessibility modifiers on class properties and methods.\n It can be set to one of the following values:\n\n - `noPublic` - forbid the use of the `public` modifier.\n - `explicit` - requires an accessibility modifier for every member where it is permitted.\n - `none` - forbid all accessibility modifiers (public, protected, private).\n\n **Default: `noPublic`**\n\n"
          },
          "useConsistentTypeDefinitions": {
            "deprecated": false,
            "version": "2.1.4",
            "name": "useConsistentTypeDefinitions",
            "link": "https://biomejs.dev/linter/rules/use-consistent-type-definitions",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "consistent-type-definitions"
                }
              }
            ],
            "docs": " Enforce type definitions to consistently use either `interface` or `type`.\n\n _TypeScript_ provides two different ways to define an object type: `interface` and `type`.\n\n This rule enforces consistent usage of either `interface` or `type` for object type definitions.\n Consistent type definition styles, aside from improving code readability, help minimize cognitive load when developers\n switch between different codebases or within a large codebase.\n\n Empty object type declarations will be left as-is and will not be converted to interfaces,\n as it will conflict with the `noEmptyInterface` rule.\n\n ## Example\n\n ### Invalid\n\n ```ts,expect_diagnostic\n type Point = { x: number; y: number; };\n ```\n\n ### Valid\n\n ```ts\n interface Point {\n   x: number;\n   y: number;\n }\n ```\n\n ```ts\n type AnyObject = {};\n ```\n\n ## Options\n\n The following options are available\n\n ### `style`\n\n This option will determine which style to use for type definitions.\n\n Default: `interface`\n\n ```json,options\n {\n     \"options\": {\n         \"style\": \"type\"\n     }\n }\n ```\n\n ```ts,use_options,expect_diagnostic\n interface Point {\n   x: number;\n   y: number;\n }\n ```\n\n"
          },
          "useEnumInitializers": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "useEnumInitializers",
            "link": "https://biomejs.dev/linter/rules/use-enum-initializers",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "prefer-enum-initializers"
                }
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
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "consistent-type-exports"
                }
              }
            ],
            "docs": " Promotes the use of `export type` for types.\n\n _TypeScript_ allows adding the `type` keyword on an `export` to indicate that the `export` doesn't exist at runtime.\n This allows compilers to safely drop exports of types without looking for their definition.\n\n The rule ensures that types are exported using a type-only `export`.\n It also groups inline type exports into a grouped `export type`.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface I {}\n export { I };\n ```\n\n ```ts,expect_diagnostic\n type T = number;\n export { T };\n ```\n\n ```ts,expect_diagnostic\n import type { T } from \"./mod.js\";\n export { T };\n ```\n\n ```ts,expect_diagnostic\n export { type X, type Y };\n ```\n\n ### Valid\n\n ```js\n class C {}\n function f() {}\n export { C, f };\n ```\n\n This rules checks only the identifiers that are defined in a file.\n It doesn't warn against a type exported as a value in a re-export clause such as:\n\n ```ts,ignore\n export { TypeA } from \"./mod.ts\"\n ```\n"
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
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "consistent-type-imports"
                }
              }
            ],
            "docs": " Promotes the use of `import type` for types.\n\n _TypeScript_ allows specifying a `type` keyword on an `import` to indicate that the `import` doesn't exist at runtime.\n This allows compilers to safely drop imports of types without looking for their definition.\n This also ensures that some modules are not loaded at runtime.\n\n The rule ensures that all imports used only as a type use a type-only `import`.\n It also groups inline type imports into a grouped `import type`.\n\n If you use the TypeScript Compiler (TSC) to compile your code into JavaScript,\n then you can disable this rule, as TSC can remove imports only used as types.\n However, for consistency and compatibility with other compilers, you may want to enable this rule.\n In that case we recommend to enable TSC's [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax).\n This configuration ensures that TSC preserves imports not marked with the `type` keyword.\n\n You may also want to enable the editor setting [`typescript.preferences.preferTypeOnlyAutoImports`](https://devblogs.microsoft.com/typescript/announcing-typescript-5-3-rc/#settings-to-prefer-type-auto-imports) from the TypeScript LSP.\n This setting is available in Visual Studio Code.\n It ensures the `type` is used when the editor automatically imports a type.\n\n ## Caveat with TypeScript experimental decorators\n\n Some frameworks like Angular and NestJS rely on\n [experimental TypeScript decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)\n which allow code to be generated based on type annotations.\n This is mainly used for dependency injection.\n\n Since Biome doesn't know how a decorator is implemented,\n it is unable to detect that an import used as a type is also used as a value in the code generated by a decorator.\n This leads Biome to suggest importing some imports as type, which are actually used as value at runtime.\n\n We haven't found a way to support this pattern yet.\n We recommend disabling this rule when using such decorators.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n import { A } from \"./mod.js\";\n type TypeOfA = typeof A;\n let a: A;\n ```\n\n ```ts,expect_diagnostic\n import { type A, type B } from \"./mod.js\";\n ```\n\n ```ts,expect_diagnostic\n import { type A, B } from \"./mod.js\";\n let c: A;\n let d: typeof B;\n ```\n\n ### Valid\n\n ```ts\n import type { A } from \"./mod.js\";\n let a: A;\n ```\n\n ```ts\n import { B } from \"./mod.js\";\n let a: B = new B();\n ```\n\n ```ts\n import { type A, B } from \"./mod.js\";\n let c: A;\n let d = new B();\n ```\n\n The rule ignores unused imports and imports with import attributes.\n\n ```ts\n import { A } from \"./mod.js\";\n\n import { B } from \"./mod.js\" with {};\n export type { B };\n ```\n\n ## Options\n\n This rule respects the [`jsxRuntime`](https://biomejs.dev/reference/configuration/#javascriptjsxruntime)\n setting and will make an exception for React globals if it is set to\n `\"reactClassic\"`.\n\n ### `style`\n\n The `style` option allows enforcing a style for importing types.\n The option supports three values:\n\n - `inlineType`: always use `import { type T }` instead of `import type { T }`\n - `separatedType`: always use `import type { T }` instead of `import { type T }`\n - `auto`: use both `import type { T }` and `import { type T }` (default)\n\n ```jsonc,options\n {\n     \"options\": {\n         \"style\": \"inlineType\"\n     }\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n import { A } from \"./mod.ts\";\n export type { A };\n ```\n\n ```jsonc,options\n {\n     \"options\": {\n         \"style\": \"separatedType\"\n     }\n }\n ```\n\n ```ts,expect_diagnostic,use_options\n import { A } from \"./mod.ts\";\n export type { A };\n ```\n\n ```ts,expect_diagnostic,use_options\n import { type A, type B } from \"./mod.ts\";\n export type { A, B };\n ```\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "prefer-literal-enum-member"
                }
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
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "naming-convention"
                }
              }
            ],
            "docs": " Enforce naming conventions for everything across a codebase.\n\n Enforcing [naming conventions](https://en.wikipedia.org/wiki/Naming_convention_(programming)) helps to keep the codebase consistent,\n and reduces overhead when thinking about the name [case] of a variable.\n\n The following section describes the default conventions enforced by the rule.\n You can also enforce custom conventions with the [rule options](#options).\n\n ## Naming conventions\n\n All names can be prefixed and suffixed with underscores `_` and dollar signs `$`.\n Unused variables with a name prefixed with `_` are completely ignored.\n This avoids conflicts with the `noUnusedVariables` rule.\n\n ### Variable and parameter names\n\n All variables and function parameters are in [`camelCase`] or [`PascalCase`].\n Catch parameters are in [`camelCase`].\n\n Additionally, global variables declared as `const` or `var` may be in [`CONSTANT_CASE`].\n Global variables are declared at module or script level.\n Variables declared in a TypeScript `namespace` are also considered global.\n\n ```js\n function f(param, _unusedParam) {\n     let localValue = 0;\n     try {\n         /* ... */\n     } catch (customError) {\n         /* ... */\n     }\n }\n\n export const A_CONSTANT = 5;\n\n let aVariable = 0;\n\n export namespace ns {\n     export const ANOTHER_CONSTANT = \"\";\n }\n ```\n\n Examples of incorrect names:\n\n ```js,expect_diagnostic\n let a_value = 0;\n ```\n\n ```js,expect_diagnostic\n const fooYPosition = 0;\n ```\n\n ```js,expect_diagnostic\n function f(FIRST_PARAM) {}\n ```\n\n ### Function names\n\n - A `function` name is in [`camelCase`] or [`PascalCase`].\n - A global `function` can also be in `UPPERCASE`.\n   This allows supporting the frameworks that require some function to use valid [HTTP method names](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).\n\n ```jsx\n function trimString(s) { /*...*/ }\n\n function Component() {\n     return <div></div>;\n }\n\n export function GET() { /*...*/ }\n ```\n\n ### TypeScript `enum` names\n\n A _TypeScript_ `enum` name is in [`PascalCase`].\n\n `enum` members are by default in [`PascalCase`].\n However, you can configure the [case] of `enum` members.\n See [options](#options) for more details.\n\n ```ts\n enum Status {\n     Open,\n     Close,\n }\n ```\n\n ### Classes\n\n - A class name is in [`PascalCase`].\n\n - Static property and static getter names are in [`camelCase`] or [`CONSTANT_CASE`].\n\n - Class property and method names are in [`camelCase`].\n\n ```js\n class Person {\n     static MAX_FRIEND_COUNT = 256;\n\n     static get SPECIAL_PERSON_INSTANCE() { /*...*/ }\n\n     initializedProperty = 0;\n\n     specialMethod() {}\n }\n ```\n\n ### TypeScript `type` aliases and `interface`\n\n - A `type` alias or an interface name are in [`PascalCase`].\n\n - Member names of a type are in [`camelCase`].\n\n - `readonly` property and getter names can also be in [`CONSTANT_CASE`].\n\n ```ts\n type Named = {\n     readonly fullName: string;\n\n     specialMethod(): void;\n };\n\n interface Named {\n     readonly fullName: string;\n\n     specialMethod(): void;\n }\n\n interface PersonConstructor {\n     readonly MAX_FRIEND_COUNT: number;\n\n     get SPECIAL_PERSON_INSTANCE(): Person;\n\n     new(): Person;\n }\n ```\n\n Examples of an incorrect type alias:\n\n ```ts,expect_diagnostic\n type person = { fullName: string };\n ```\n\n ### Literal object member names\n\n - Literal object members are in [`camelCase`].\n\n ```js\n const alice = {\n     fullName: \"Alice\",\n }\n ```\n\n Example of an incorrect name:\n\n ```js,expect_diagnostic\n const alice = {\n     full_name: \"Alice\",\n }\n ```\n\n ### Import and export aliases and namespaces\n\n Import and export namespaces are in [`camelCase`] or [`PascalCase`].\n\n ```js\n import * as myLib from \"my-lib\";\n import * as Framework from \"framework\";\n\n export * as myLib from \"my-lib\";\n export * as Framework from \"framework\";\n ```\n\n `import` and `export` aliases are in [`camelCase`], [`PascalCase`], or [`CONSTANT_CASE`]:\n\n ```js\n import assert, {\n     deepStrictEqual as deepEqual,\n     AssertionError as AssertError\n } from \"node:assert\";\n ```\n\n Examples of an incorrect name:\n\n ```ts,expect_diagnostic\n import * as MY_LIB from \"my-lib\";\n ```\n\n ### TypeScript type parameter names\n\n A _TypeScript_ type parameter name is in [`PascalCase`].\n\n ```ts\n function id<Val>(value: Val): Val { /* ... */}\n ```\n\n ### TypeScript `namespace` names\n\n A _TypeScript_ `namespace` name is in [`camelCase`] or in [`PascalCase`].\n\n ```ts\n namespace mathExtra {\n     /*...*/\n }\n\n namespace MathExtra {\n     /*...*/\n }\n ```\n\n ## Ignored declarations\n\n Note that some declarations are always ignored.\n You cannot apply a convention to them.\n This is the case for:\n\n - Member names that are not identifiers\n\n   ```js\n   class C {\n     [\"not an identifier\"]() {}\n   }\n   ```\n\n - Named imports\n\n  ```js\n   import { an_IMPORT } from \"mod\"\n   ```\n\n - Destructured object properties\n\n   ```js\n   const { destructed_PROP } = obj;\n   ```\n\n - Class members marked with `override`:\n\n   ```ts\n   class C extends B {\n     override overridden_METHOD() {}\n   }\n   ```\n\n - Declarations inside an external TypeScript module\n\n   ```ts\n   declare module \"myExternalModule\" {\n     export interface my_INTERFACE {}\n   }\n   ```\n\n - Declarations inside a global declaration\n\n   ```ts\n   declare global {\n     interface HTMLElement {}\n   }\n   ```\n\n ## Options\n\n The rule provides several options that are detailed in the following subsections.\n\n ```json,options\n {\n     \"options\": {\n         \"strictCase\": false,\n         \"requireAscii\": false,\n         \"conventions\": [\n             {\n                 \"selector\": {\n                     \"kind\": \"classMember\",\n                     \"modifiers\": [\"private\"]\n                 },\n                 \"match\": \"_(.+)\",\n                 \"formats\": [\"camelCase\"]\n             }\n         ]\n     }\n }\n ```\n\n ### strictCase\n\n When this option is set to `true`, it forbids consecutive uppercase characters in [`camelCase`] and [`PascalCase`].\n\n **Default:** `true`\n\n For instance, `HTTPServer` or `aHTTPServer` are not permitted for `strictCase: true`.\n These names should be renamed to `HttpServer` and `aHttpServer`:\n\n ```json,options\n {\n     \"options\": {\n         \"strictCase\": true\n     }\n }\n ```\n\n ```js,expect_diagnostic,use_options\n class HTTPServer {\n }\n ```\n\n When `strictCase` is set to `false`, consecutive uppercase characters are allowed.\n For example, `HTTPServer` and `aHTTPServer` would be considered valid then:\n\n ```json,options\n {\n     \"options\": {\n         \"strictCase\": false\n     }\n }\n ```\n\n ```js,use_options\n class HTTPServer {\n }\n ```\n\n ### requireAscii\n\n When `true`, names must only consist of ASCII characters only,\n forbidding names like `café` or `안녕하세요` that include non-ASCII characters.\n\n When `requireAscii` is set to `false`, names may include non-ASCII characters.\n For example, `café` and `안녕하세요` would be considered valid then.\n\n **Default:** `true`\n\n ### conventions\n\n The `conventions` option allows applying custom conventions.\n The option takes an array of conventions.\n Every convention is an object that includes an optional `selector` and one or more requirements (`match` and `formats`).\n\n For example, you can enforce the use of [`CONSTANT_CASE`] for global `const` declarations:\n\n ```json,options\n {\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": {\n                     \"kind\": \"const\",\n                     \"scope\": \"global\"\n                 },\n                 \"formats\": [\"CONSTANT_CASE\"]\n             }\n         ]\n     }\n }\n ```\n\n A selector describes which declarations the convention applies to.\n You can select a declaration based on several criteria:\n\n - `kind`: the kind of the declaration among:\n   - `any` (default kind if the kind is unset)\n   - `typeLike`: classes, enums, type aliases, and interfaces\n   - `class`\n   - `enum`\n   - `enumMember`\n   - `interface`\n   - `typeAlias`\n   - `function`: named function declarations and expressions\n   - `namespaceLike`: TypeScript namespaces, import and export namespaces (`import * as namespace from`)\n   - `namespace`: TypeScript namespaces\n   - `importNamespace`\n   - `exportNamespace`\n   - `importAlias`: default imports and aliases of named imports\n   - `exportAlias`: aliases of re-exported names\n   - `variable`: const, let, using, and var declarations\n     - `const`\n     - `let`\n     - `var`\n     - `using`\n   - `functionParameter`\n   - `catchParameter`\n   - `indexParameter`: parameters of index signatures\n   - `typeParameter`: generic type parameter\n   - `classMember`: class properties, parameter properties, methods, getters, and setters\n     - `classProperty`: class properties, including parameter properties\n     - `classMethod`\n     - `classGetter`\n     - `classSetter`\n   - `objectLiteralMember`: literal object properties, methods, getters, and setters (you might want to duplicate the convention for `typeMember`)\n     - `objectLiteralProperty`\n     - `objectLiteralMethod`\n     - `objectLiteralGetter`\n     - `objectLiteralSetter`\n   - `typeMember`: properties, methods, getters, and setters declared in type aliases and interfaces\n     - `typeProperty`\n     - `typeMethod`\n     - `typeGetter`\n     - `typeSetter`\n - `modifiers`: an array of modifiers among:\n   - `abstract`: applies to class members and classes\n   - `private`: applies to class members\n   - `protected`: applies to class members\n   - `readonly`: applies to class members and type members\n   - `static`: applies to class members\n - `scope`: where the declaration appears. Allowed values:\n   - `any`: anywhere (default value if the scope is unset)\n   - `global`: the global scope (also includes the namespace scopes)\n\n For each declaration,\n the `conventions` array is traversed in-order until a selector selects the declaration.\n The requirements of the convention are so verified on the declaration.\n\n A convention must set at least one requirement among:\n\n - `match`: a regular expression that the name of the declaration must match.\n - `formats`: the string [case] that the name must follow.\n   The supported cases are: [`PascalCase`], [`CONSTANT_CASE`], [`camelCase`], and [`snake_case`].\n\n If only `formats` is set, it's checked against the name of the declaration.\n In the following configuration, we require `static readonly` class properties to be in [`CONSTANT_CASE`].\n\n ```json,options\n {\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": {\n                     \"kind\": \"classProperty\",\n                     \"modifiers\": [\"static\", \"readonly\"]\n                 },\n                 \"formats\": [\"CONSTANT_CASE\"]\n             }\n         ]\n     }\n }\n ```\n\n The following code is then reported by the rule:\n\n ```ts,use_options,expect_diagnostic\n class C {\n     static readonly prop = 0;\n }\n ```\n\n A convention can make another one useless.\n In the following configuration, the second convention is useless because the first one always applies to class members, including class properties.\n You should always place first more specific conventions.\n\n ```json,options\n {\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": { \"kind\": \"classMember\" },\n                 \"formats\": [\"camelCase\"]\n             },\n             {\n                 \"selector\": { \"kind\": \"classProperty\" },\n                 \"formats\": [\"camelCase\", \"CONSTANT_CASE\"]\n             }\n         ]\n     }\n }\n ```\n\n If only `match` is set and the regular expression has no capturing groups,\n then `match` is checked against the name of the declaration directly.\n In the following configuration, all variable names must have a minimum of 3 characters and a maximum of 20 characters.\n\n ```json,options\n {\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": { \"kind\": \"variable\" },\n                 \"match\": \".{3,20}\"\n             }\n         ]\n     }\n }\n ```\n\n If both `match` and `formats` are set, then `formats` is checked against the first capture of the regular expression.\n Only the first capture is tested. Other captures are ignored.\n If nothing is captured, then `formats` is ignored.\n\n In the following example, we require that:\n\n - A private property starts with `_` and consists of at least two characters.\n - The captured name (the name without the leading `_`) is in [`camelCase`].\n\n ```json,options\n {\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": { \"kind\": \"classMember\", \"modifiers\": [\"private\"] },\n                 \"match\": \"_(.+)\",\n                 \"formats\": [\"camelCase\"]\n             }\n         ]\n     }\n }\n ```\n\n If `match` is set and `formats` is unset, then the part of the name captured by the regular expression is forwarded to the next conventions of the array that selects the declaration.\n The following configuration has exactly the same effect as the previous one.\n The first convention applies to any private class member name.\n It stipulates that the name must have a leading underscore.\n The regular expression captures the part of the name without the leading underscore.\n Because `formats` is not set, the capture is forwarded to the next convention that applies to a private class member name.\n In our case, the next convention applies.\n The capture is then checked against `formats`.\n\n ```jsonc,options\n {\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": { \"kind\": \"classMember\", \"modifiers\": [\"private\"] },\n                 \"match\": \"_(.+)\"\n                 // We don't need to specify `formats` because the capture is forwarded to the next conventions.\n             }, {\n                 \"selector\": { \"kind\": \"classMember\", \"modifiers\": [\"private\"] },\n                 \"formats\": [\"camelCase\"]\n             }\n         ]\n     }\n }\n ```\n\n The forwarding has particularly useful to factorize some conventions.\n For example, the following configuration...\n\n ```jsonc,options\n {\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": { \"kind\": \"classMember\", \"modifiers\": [\"private\"] },\n                 \"match\": \"_(.+)\",\n                 \"formats\": [\"camelCase\"]\n             }, {\n                 \"selector\": { \"kind\": \"classMember\" },\n                 \"formats\": [\"camelCase\"]\n             }\n         ]\n     }\n }\n ```\n\n can be factorized to...\n\n ```jsonc,options\n {\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": { \"kind\": \"classMember\", \"modifiers\": [\"private\"] },\n                 \"match\": \"_(.+)\"\n             }, {\n                 \"selector\": { \"kind\": \"classMember\" },\n                 \"formats\": [\"camelCase\"]\n             }\n         ]\n     }\n }\n ```\n\n If a declaration is not selected or if a capture is forwarded while there are no more conventions,\n then the declaration name is verified against the default conventions.\n Because the default conventions already ensure that class members are in [\"camelCase\"],\n the previous example can be simplified to:\n\n ```jsonc,options\n {\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": { \"kind\": \"classMember\", \"modifiers\": [\"private\"] },\n                 \"match\": \"_(.+)\"\n                 // We don't need to specify `formats` because the capture is forwarded to the next conventions.\n             }\n             // default conventions\n         ]\n     }\n }\n ```\n\n If the capture is identical to the initial name (it is not a part of the initial name),\n then, leading and trailing underscore and dollar signs are trimmed before being checked against default conventions.\n In the previous example, the capture is a part of the name because `_` is not included in the capture, thus, no trimming is performed.\n\n You can reset all default conventions by adding a convention at the end of the array that accepts anything:\n\n ```jsonc,options\n {\n     \"options\": {\n         \"conventions\": [\n             // your conventions\n             // ...\n\n             // Otherwise, accept anything\n             {\n                 \"match\": \".*\"\n             }\n         ]\n     }\n }\n ```\n\n Let's take a more complex example with the following conventions:\n\n 1. A variable name is `i`, `j`, or follows the next selected convention (convention (2)).\n 2. An identifier contains at least two characters and follow the next selected convention (the default convention).\n 3. A `private` class member name starts with an underscore `_` and the name without the underscore follows the next selected convention (convention (4) for some of them, and the default convention for others).\n 4. A `static readonly` class property name is in [`CONSTANT_CASE`].\n 5. A global constant is in [`CONSTANT_CASE`] and can be enclosed by double underscores or to be named `_SPECIAL_`.\n 6. An interface name starts with `I`, except for interfaces ending with `Error`, and is in [`PascalCase`].\n 7. All other names follow the default conventions\n\n ```jsonc,options\n {\n     \"options\": {\n         \"conventions\": [\n             {\n                 \"selector\": {\n                     \"kind\": \"variable\"\n                 },\n                 \"match\": \"[ij]|(.*)\"\n             },\n             {\n                 \"match\": \"(.{2,})\"\n             },\n             {\n                 \"selector\": {\n                     \"kind\": \"classMember\",\n                     \"modifiers\": [\"private\"]\n                 },\n                 \"match\": \"_(.*)\"\n             }, {\n                 \"selector\": {\n                     \"kind\": \"classProperty\",\n                     \"modifiers\": [\"static\", \"readonly\"]\n                 },\n                 \"formats\": [\"CONSTANT_CASE\"]\n             }, {\n                 \"selector\": {\n                     \"kind\": \"const\",\n                     \"scope\": \"global\"\n                 },\n                 \"match\": \"__(.+)__|_SPECIAL_|(.+)\",\n                 \"formats\": [\"CONSTANT_CASE\"]\n             }, {\n                 \"selector\": {\n                     \"kind\": \"interface\"\n                 },\n                 \"match\": \"I(.*)|(.*?)Error\",\n                 \"formats\": [\"PascalCase\"]\n             }\n             // default conventions\n         ]\n     }\n }\n ```\n\n Hers some examples:\n\n - A private class property named `_` is reported by the rule because it contains a single character.\n   According to the second convention, the name should contain at least two characters.\n - A variable `a_variable` is reported by the rule because it doesn't respect the default convention that forbid variable names in [`snake_case`].\n   The variable name is first verified against the first convention.\n   It is forwarded to the second convention, which is also respected, because it is neither `i` nor `j`.\n   The name is captured and is forwarded to the next convention.\n   In our case, the next convention is the default one.\n\n ### Regular expression syntax\n\n The `match` option takes a regular expression that supports the following syntaxes:\n\n - Greedy quantifiers `*`, `?`, `+`, `{n}`, `{n,m}`, `{n,}`, `{m}`\n - Non-greedy quantifiers `*?`, `??`, `+?`, `{n}?`, `{n,m}?`, `{n,}?`, `{m}?`\n - Any character matcher `.`\n - Character classes `[a-z]`, `[xyz]`, `[^a-z]`\n - Alternations `|`\n - Capturing groups `()`\n - Non-capturing groups `(?:)`\n - Case-insensitive groups `(?i:)` and case-sensitive groups `(?-i:)`\n - A limited set of escaped characters including all special characters\n   and regular string escape characters `\\f`, `\\n`, `\\r`, `\\t`, `\\v`.\n   Note that you can also escape special characters using character classes.\n   For example, `\\$` and `[$]` are two valid patterns that escape `$`.\n\n [case]: https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats\n [`camelCase`]: https://en.wikipedia.org/wiki/Camel_case\n [`PascalCase`]: https://en.wikipedia.org/wiki/Camel_case\n [`CONSTANT_CASE`]: https://en.wikipedia.org/wiki/Snake_case\n [`snake_case`]: https://en.wikipedia.org/wiki/Snake_case\n"
          },
          "useReadonlyClassProperties": {
            "deprecated": false,
            "version": "2.1.0",
            "name": "useReadonlyClassProperties",
            "link": "https://biomejs.dev/linter/rules/use-readonly-class-properties",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "prefer-readonly"
                }
              }
            ],
            "docs": " Enforce marking members as `readonly` if they are never modified outside the constructor.\n\n This rule ensures that class properties, especially private ones, are marked as `readonly` if their values\n remain constant after being initialized. This helps improve code readability, maintainability, and ensures\n immutability where applicable.\n\n It can be configured to check only private members or all class properties.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n class Container {\n     private onlyModifiedInConstructor = 1;\n     constructor(\n         member1: number,\n     ) {\n         this.onlyModifiedInConstructor = onlyModifiedInConstructor;\n     }\n }\n ```\n\n ```ts,expect_diagnostic\n class Container {\n     constructor(\n        private constructorParameter: number,\n     ) {\n     }\n }\n ```\n\n ```ts,expect_diagnostic\n class Container {\n     private neverModifiedMember = true;\n }\n ```\n\n ```ts,expect_diagnostic\n class Container {\n     #neverModifiedPrivateField = 3;\n }\n ```\n\n ### Valid\n\n ```ts\n class Container {\n     private readonly neverModifiedMember = true;\n     private readonly onlyModifiedInConstructor: number;\n     readonly #neverModifiedPrivateField = 3;\n\n     public constructor(\n         onlyModifiedInConstructor: number,\n         private readonly neverModifiedParameter: string,\n     ) {\n         this.onlyModifiedInConstructor = onlyModifiedInConstructor;\n     }\n }\n ```\n\n ## Options\n\n ### `checkAllProperties`\n\n Checks whether all class properties (including public and protected) should be analyzed.\n By default, `checkAllProperties` is set to `false`.\n\n ```json,options\n {\n     \"options\": {\n         \"checkAllProperties\": true\n     }\n }\n ```\n\n ```ts,use_options,expect_diagnostic\n class Example {\n     public constantValue = 42;\n\n     constructor(value: number) {\n         this.constantValue = value;\n     }\n }\n ```\n\n ```ts,use_options,expect_diagnostic\n class Example {\n     constructor(protected constructorParameter: string) {\n     }\n }\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "prefer-function-type"
                }
              }
            ],
            "docs": " Enforce using function types instead of object type with call signatures.\n\n TypeScript allows for two common ways to declare a type for a function:\n\n - Function type: `() => string`\n - Object type with a signature: `{ (): string }`\n\n The function type form is generally preferred when possible for being more succinct.\n\n This rule suggests using a function type instead of an interface or object type literal with a single call signature.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface Example {\n   (): string;\n }\n ```\n\n ```ts,expect_diagnostic\n function foo(example: { (): number }): number {\n   return example();\n }\n ```\n\n ### Valid\n\n ```ts\n type Example = () => string;\n ```\n\n ```ts\n function foo(example: () => number): number {\n   return bar();\n }\n ```\n\n ```ts\n // returns the function itself, not the `this` argument.\n type ReturnsSelf2 = (arg: string) => ReturnsSelf;\n ```\n\n ```ts\n interface Foo {\n   bar: string;\n }\n interface Bar extends Foo {\n   (): void;\n }\n ```\n\n ```ts\n // multiple call signatures (overloads) is allowed:\n interface Overloaded {\n   (data: string): number;\n   (id: number): string;\n }\n // this is equivalent to Overloaded interface.\n type Intersection = ((data: string) => number) & ((id: number) => string);\n```\n\n"
          },
          "useUnifiedTypeSignatures": {
            "deprecated": false,
            "version": "2.1.0",
            "name": "useUnifiedTypeSignatures",
            "link": "https://biomejs.dev/linter/rules/use-unified-type-signatures",
            "recommended": false,
            "fixKind": "unsafe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "unified-signatures"
                }
              }
            ],
            "docs": " Disallow overload signatures that can be unified into a single signature.\n\n Overload signatures that can be merged into a single signature are redundant and should be avoided.\n This rule helps simplify function signatures by combining overloads by making parameters optional\n and/or using type unions.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n function f(a: number): void;\n function f(a: string): void;\n ```\n\n ```ts,expect_diagnostic\n function f({ a }: Record<\"a\", string>): void;\n function f({ a }: Record<\"a\", boolean>): void;\n function f(obj: any): void {};\n ```\n\n ```ts,expect_diagnostic\n type T = {\n     a(): void;\n     a(x: number): void;\n }\n ```\n\n ```ts,expect_diagnostic\n interface I {\n     (): void;\n     (x: number): void;\n }\n ```\n\n ```ts,expect_diagnostic\n export function fizzbuzz([fizz, buzz]: [number, number]): void;\n export function fizzbuzz([fizz, buzz]: [string, string]): void;\n export default function fizzbuzz([fizz, buzz]: [string | number, string | number]): void {}\n ```\n\n ### Valid\n\n ```ts\n function f(a: number | string): void {}\n ```\n\n ```ts\n function f({ a }: Record<\"a\", string | boolean>): void;\n ```\n\n ```ts\n interface I {\n     a(x?: number): void;\n }\n ```\n\n ```ts\n export function fizzbuzz([fizz, buzz]: [number, number] | [string, string]): void;\n export default function fizzbuzz([fizz, buzz]: [string | number, string | number]): void {}\n ```\n\n Different return types cannot be merged:\n ```ts\n interface I {\n     f(): void;\n     f(x: number): number;\n }\n ```\n\n Different type parameters cannot be merged:\n ```ts\n function f<T extends number>(x: T): void;\n function f<T extends string>(x: T): void;\n function f(x: unknown): void {}\n ```\n\n Different rest signatures cannot be merged:\n (cf https://github.com/microsoft/TypeScript/issues/5077)\n ```ts\n function foo(...x: string[]): void;\n function foo(...x: number[]): void;\n function foo(...x: any[]): void {}\n ```\n\n ## Options\n\n ### `ignoreDifferentlyNamedParameters`\n\n If set to `true`, overloads with differently named parameters will be ignored,\n even if said parameters would be of otherwise mergeable types.\n\n Parameter declarations that lack specified \"names\" (such as array spread and destructuring literals)\n will be ignored for this check.\n\n Default: `false`\n\n ```json,options\n {\n   \"options\": {\n     \"ignoreDifferentlyNamedParameters\": true\n   }\n }\n ```\n\n ```ts,use_options\n function bake(numApples: number): void;\n function bake(cakeType: string): void;\n ```\n\n ### `ignoreDifferentJsDoc`\n\n If set to `true`, overloads with different JSDoc comments from one another will be ignored.\n Ones with identical comments will be merged as normal.\n\n Default: `false`\n\n ```json,options\n {\n   \"options\": {\n     \"ignoreDifferentJsDoc\": true\n   }\n }\n ```\n\n ```ts,use_options\n /** Print foo + 1 */\n function doThing(foo: number): void;\n /** Print foo concatenated with 3 */\n function doThing(foo: string): void;\n /** @deprecated - don't use this, it crashes the program */\n function doThing(foo: boolean): void;\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-invalid-void-type"
                }
              }
            ],
            "docs": " Disallow `void` type outside of generic or return types.\n\n `void` in TypeScript refers to a function return that is meant to be ignored.\n Attempting to use a void type outside of a return type or a type parameter is often a sign of programmer error.\n `void` can also be misleading for other developers even if used correctly.\n\n > The `void` type means cannot be mixed with any other types, other than `never`, which accepts all types.\n > If you think you need this then you probably want the `undefined` type instead.\n\n The code action suggests using `undefined` instead of `void`.\n It is unsafe because a variable with the `void` type cannot be assigned to a variable with the `undefined` type.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n let foo: void;\n ```\n\n ```ts,expect_diagnostic\n function logSomething(thing: void) {}\n ```\n\n ```ts,expect_diagnostic\n interface Interface {\n     prop: void;\n }\n ```\n\n ```ts,expect_diagnostic\n type PossibleValues = number | void;\n ```\n\n ### Valid\n\n ```ts\n function foo(): void {};\n ```\n\n ```ts\n function doSomething(this: void) {}\n ```\n\n ```ts\n function printArg<T = void>(arg: T) {}\n ```\n"
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
                "kind": "inspired",
                "source": {
                  "eslintTypeScript": "no-empty-interface"
                }
              }
            ],
            "docs": " Disallow the declaration of empty interfaces.\n\n An empty interface in TypeScript does very little: any non-nullable value is assignable to `{}`.\n Using an empty interface is often a sign of programmer error, such as misunderstanding the concept of `{}` or forgetting to fill in fields.\n\n The rule ignores empty interfaces that `extends` one or multiple types.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n interface A {}\n ```\n\n ### Valid\n\n ```ts\n interface A {\n   prop: string;\n }\n\n // Allow empty interfaces that extend a type.\n interface B extends A {}\n\n // Allow empty interfaces in ambient modules\n declare module \"mod\" {\n   interface C {}\n }\n ```\n"
          },
          "noEvolvingTypes": {
            "deprecated": false,
            "version": "1.6.3",
            "name": "noEvolvingTypes",
            "link": "https://biomejs.dev/linter/rules/no-evolving-types",
            "recommended": false,
            "fixKind": "none",
            "docs": " Disallow variables from evolving into `any` type through reassignments.\n\n In TypeScript, variables without explicit type annotations can evolve their types based on subsequent assignments.\n\n When  TypeScript's [noImplicitAny](https://www.typescriptlang.org/tsconfig/#noImplicitAny) is disabled,\n variables without explicit type annotations have implicitly the type `any`.\n Just like the `any` type, evolved `any` types disable many type-checking rules and should be avoided to maintain strong type safety.\n This rule prevents such cases by ensuring variables do not evolve into `any` type, encouraging explicit type annotations and controlled type evolutions.\n\n If you enabled TypeScript's [noImplicitAny](https://www.typescriptlang.org/tsconfig/#noImplicitAny) and want to benefit of evolving types,\n then we recommend to disable this rule.\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n let a;\n ````\n\n ```ts,expect_diagnostic\n const b = [];\n ````\n\n ```ts,expect_diagnostic\n let c = null;\n ````\n\n\n ### Valid\n\n ```ts\n let a: number;\n let b = 1;\n var c : string;\n var d = \"abn\";\n const e: never[] = [];\n const f = [null];\n const g = ['1'];\n const h = [1];\n let workspace: Workspace | null = null;\n ```\n\n"
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-explicit-any"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-extra-non-null-assertion"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-misused-new"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "no-unsafe-declaration-merging"
                }
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
                "kind": "sameLogic",
                "source": {
                  "eslintTypeScript": "prefer-namespace-keyword"
                }
              }
            ],
            "docs": " Require using the `namespace` keyword over the `module` keyword to declare TypeScript namespaces.\n\n TypeScript historically allowed a code organization called _namespace_.\n [_ECMAScript modules_ are preferred](https://www.typescriptlang.org/docs/handbook/2/modules.html#typescript-namespaces) (`import` / `export`).\n\n For projects still using _namespaces_, it's preferred to use the `namespace` keyword instead of the `module` keyword.\n The `module` keyword is deprecated to avoid any confusion with the _ECMAScript modules_ which are often called _modules_.\n\n Note that TypeScript `module` declarations to describe external APIs (`declare module \"foo\" {}`) are still allowed.\n\n See also: https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html\n\n ## Examples\n\n ### Invalid\n\n ```ts,expect_diagnostic\n module Example {}\n ```\n\n ### Valid\n\n ```ts\n namespace Example {}\n ```\n\n ```ts\n declare module \"foo\" {}\n ```\n\n"
          }
        }
      }
    },
    "numberOrRules": 480
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
            "docs": " Disallow initializing a variable with a definite assertion to prevent `SyntaxError`.\n\n ## Examples\n\n ```ts\n let foo!: string = \"bar\";\n ```\n"
          },
          "noSuperWithoutExtends": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "noSuperWithoutExtends",
            "link": "https://biomejs.dev/linter/rules/no-super-without-extends",
            "recommended": false,
            "fixKind": "none",
            "docs": " Catch a `SyntaxError` when writing calling `super()` on a class that doesn't extends any class\n\n ## Examples\n\n ```js\n class A {\n     constructor() {\n         super()\n     }\n }\n ```\n"
          }
        }
      },
      "ts": {
        "correctness": {
          "noTypeOnlyImportAttributes": {
            "deprecated": false,
            "version": "1.5.0",
            "name": "noTypeOnlyImportAttributes",
            "link": "https://biomejs.dev/linter/rules/no-type-only-import-attributes",
            "recommended": false,
            "fixKind": "none",
            "docs": " Disallow type-only imports and exports with import attributes.\n\n There is one exception: TypeScript 5.3 and above allow this in CommonJS files, e.g. files ending with the `.cts` extension.\n See the [TypeScript docs](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html#stable-support-resolution-mode-in-import-types).\n\n ## Examples\n\n ### Invalid\n\n ```ts\n import type { A } from \"./a.json\" with { type: \"json\" };\n ```\n\n ### Valid\n\n ```cts\n import type { A } from \"./a.json\" with { \"resolution-mode\": \"require\" };\n ```\n\n"
          }
        }
      }
    },
    "numberOrRules": 4
  },
  "assist": {
    "languages": {
      "css": {
        "source": {
          "useSortedProperties": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useSortedProperties",
            "link": "https://biomejs.dev/linter/rules/use-sorted-properties",
            "recommended": false,
            "fixKind": "safe",
            "docs": " Enforce ordering of CSS properties and nested rules.\n\n This rule ensures the contents of a CSS rule are ordered consistently.\n\n Properties are ordered semantically, with more important properties near the top and\n similar properties grouped together. Nested rules and at-rules are placed after properties.\n\n The ordering is roughly:\n 1. Custom properties\n 1. Layout properties (display, flex, grid)\n 1. Margin and padding properties\n 1. Typography properties (font, color)\n 1. Interaction properties (pointer-events, visibility)\n 1. Background and border properties\n 1. Transition and animation properties\n 1. Nested rules, media queries and other at-rules\n\n ## Examples\n\n ### Invalid\n\n ```css,expect_diagnostic\n p {\n   transition: opacity 1s ease;\n   border: 1px solid black;\n   pointer-events: none;\n   color: black;\n   margin: 8px;\n   display: block;\n   --custom: 100;\n }\n ```\n\n ```css,expect_diagnostic\n p {\n   span { color: blue; }\n   color: red;\n }\n ```\n\n ### Valid\n\n ```css\n p {\n   --custom: 100;\n   display: block;\n   margin: 8px;\n   color: black;\n   pointer-events: none;\n   border: 1px solid black;\n   transition: opacity 1s ease;\n }\n ```\n\n ```css\n p {\n   color: red;\n   span { color: blue; }\n }\n ```\n\n"
          }
        }
      },
      "html": {
        "source": {
          "noDuplicateClasses": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "noDuplicateClasses",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-classes",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintBetterTailwindcss": "no-duplicate-classes"
                }
              }
            ],
            "docs": " Remove duplicate CSS classes.\n\n Detects and removes duplicate CSS classes in HTML `class` attributes.\n\n This action helps keep your class strings clean by detecting and removing duplicates.\n\n Duplicate classes are redundant and can indicate copy-paste errors or merge conflicts.\n\n ## Examples\n\n ```html,expect_diff\n <div class=\"flex flex\"></div>\n ```\n\n ```html,expect_diff\n <div class=\"p-4 text-red-500 p-4 bg-white\"></div>\n ```\n\n"
          }
        }
      },
      "js": {
        "source": {
          "organizeImports": {
            "deprecated": false,
            "version": "1.0.0",
            "name": "organizeImports",
            "link": "https://biomejs.dev/linter/rules/organize-imports",
            "recommended": true,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslint": "sort-imports"
                }
              },
              {
                "kind": "inspired",
                "source": {
                  "eslint": "no-duplicate-imports"
                }
              }
            ],
            "docs": " Provides a code action to sort the imports and exports in the file using a built-in or custom order.\n\n Imports and exports are first separated into chunks, before being sorted.\n Imports or exports of a chunk are then grouped according to the user-defined groups.\n Within a group, imports are sorted using a built-in order that depends on the import/export kind, whether the import/export has attributes and the source being imported from.\n **source** is also often called **specifier** in the JavaScript ecosystem.\n\n ```js,ignore\n import A from \"@my/lib\" with { \"attribute1\": \"value\" };\n ^^^^^^^^       ^^^^^^^         ^^^^^^^^^^^^^^^^^^^^^\n   kind         source                attributes\n\n export * from \"@my/lib\" with { \"attribute1\": \"value\" };\n ^^^^^^^^       ^^^^^^^         ^^^^^^^^^^^^^^^^^^^^^\n   kind         source                attributes\n ```\n\n\n ## Chunk of imports and chunk of exports\n\n A **chunk** is a sequence of adjacent imports or exports.\n A chunk contains only imports or exports, not both at the same time.\n The following example includes two chunks.\n The first chunk consists of the three imports and the second chunk consists of the three exports.\n\n ```js,ignore\n // chunk 1\n import A from \"a\";\n import * as B from \"b\";\n import { C } from \"c\";\n // chunk 2\n export * from \"d\";\n export * as F from \"e\";\n export { F } from \"f\";\n ```\n\n Chunks also end as soon as a statement or a **side-effect import** (also called _bare import_) is encountered.\n Every side-effect import forms an independent chunk.\n The following example contains six chunks:\n\n ```js,ignore\n // chunk 1\n import A from \"a\";\n import * as B from \"b\";\n // chunk 2\n import \"x\";\n // chunk 3\n import \"y\";\n // chunk 4\n import { C } from \"c\";\n // chunk 5\n export * from \"d\";\n function f() {}\n // chunk 6\n export * as E from \"e\";\n export { F } from \"f\";\n ```\n\n 1. The first chunk contains the two first `import` and ends with the appearance of the first side-effect import `import \"x\"`.\n 2. The second chunk contains only the side-effect import `import \"x\"`.\n 3. The third chunk contains only the side-effect import `import \"y\"`.\n 4. The fourth chunk contains a single `import`; The first `export` ends it.\n 5. The fifth chunk contains the first `export`; The function declaration ends it.\n 6. The sixth chunk contains the last two `export`.\n\n Chunks are also delimited by detached comments.\n A **detached comment** is a comment followed by a blank line.\n Comments not followed by a blank line are **attached comments**.\n Note that blank lines alone are not taken into account when chunking imports and exports.\n The following example contains a detached comment that splits the imports into two chunks:\n\n ```js,ignore\n // Attached comment 1\n import A from \"a\";\n\n // Attached comment 2\n import * as B from \"b\";\n // Detached comment\n\n import { C } from \"c\";\n ```\n\n The line `import { C } from \"c\"` forms the second chunk.\n The blank line between the first two imports is ignored so they form a single chunk.\n\n The sorter ensures that chunks are separated from each other with blank lines.\n Only side-effect imports adjacent to a chunk of imports are not separated by a blank line.\n The following code...\n\n ```js,ignore\n import A from \"a\";\n import * as B from \"b\";\n import \"x\";\n import { C } from \"c\";\n export * from \"d\";\n // Detached comment\n\n export * as F from \"e\";\n // Attached comment\n export { F } from \"f\";\n ```\n\n is sorted as:\n\n ```js,ignore\n import A from \"a\";\n import * as B from \"b\";\n import \"x\";\n import { C } from \"c\";\n\n export * from \"d\";\n\n // Detached comment\n\n export * as F from \"e\";\n // Attached comment\n export { F } from \"f\";\n ```\n\n Also, note that blank lines inside a chunk are ignored and preserved.\n They can be removed by explicitly defining groups as demonstrated in the next section.\n\n\n ## Import and export sorting\n\n Once chunks are formed, imports and exports of each chunk are sorted.\n Imports and exports are sorted by their source.\n Sources are ordered by \"distance\".\n Sources that are \"farther\" from the current module are put on the top, sources \"closer\" to the user are put on the bottom.\n This leads to the following order:\n\n 1. URLs such as `https://example.org`.\n 2. Packages with a protocol such as `node:path`, `bun:test`, `jsr:@my?lib`, or `npm:lib`.\n 3. Packages such as `mylib` or `@my/lib`.\n 4. Aliases: sources starting with `@/`, `#`, `~`, `$`, or `%`.\n    They usually are [Node.js subpath imports](https://nodejs.org/api/packages.html#subpath-imports) or [TypeScript path aliases](https://www.typescriptlang.org/tsconfig/#paths).\n 5. Absolute and relative paths.\n\n Two imports/exports with the same source category are sorted using a [natural sort order](https://en.wikipedia.org/wiki/Natural_sort_order) tailored to URLs, packages, and paths.\n Notably, the order ensures that `A < a < B < b`.\n The order takes also numbers into account, e.g. `a9 < a10`.\n\n For example, the following code...\n\n ```js,ignore\n import sibling from \"./file.js\";\n import internal from \"#alias\";\n import fs from \"fs\";\n import { test } from \"node:test\";\n import path from \"node:path\";\n import parent from \"../parent.js\";\n import scopedLibUsingJsr from \"jsr:@scoped/lib\";\n import data from \"https://example.org\";\n import lib from \"lib\";\n import scopedLib from \"@scoped/lib\";\n ```\n\n ...is sorted as follows:\n\n ```js,ignore\n import data from \"https://example.org\";\n import scopedLibUsingJsr from \"jsr:@scoped/lib\";\n import path from \"node:path\";\n import { test } from \"node:test\";\n import scopedLib from \"@scoped/lib\";\n import fs from \"fs\";\n import lib from \"lib\";\n import internal from \"#alias\";\n import parent from \"../parent.js\";\n import sibling from \"./file.js\";\n ```\n\n If two imports or exports share the same source and are in the same chunk, then they are ordered according to their kind as follows:\n\n 1. Namespace type import / Namespace type export\n 2. Default type import\n 3. Named type import / Named type export\n 4. Namespace import / Namespace export\n 5. Combined default and namespace import\n 6. Default import\n 7. Combined default and named import\n 8. Named import / Named export\n\n Imports and exports with attributes are always placed first.\n For example, the following code...\n\n ```ts,ignore\n import * as namespaceImport from \"same-source\";\n import type * as namespaceTypeImport from \"same-source\";\n import type { namedTypeImport } from \"same-source\";\n import defaultNamespaceCombined, * as namespaceCombined from \"same-source\";\n import defaultNamedCombined, { namedCombined } from \"same-source\";\n import defaultImport from \"same-source\";\n import type defaultTypeImport from \"same-source\";\n import { importWithAttribute } from \"same-source\" with { \"attribute\": \"value\" } ;\n ```\n\n is sorted as follows:\n\n ```ts,ignore\n import { importWithAttribute } from \"same-source\" with { \"attribute\": \"value\" } ;\n import type * as namespaceTypeImport from \"same-source\";\n import type defaultTypeImport from \"same-source\";\n import type { namedTypeImport } from \"same-source\";\n import * as namespaceImport from \"same-source\";\n import defaultNamespaceCombined, * as namespaceCombined from \"same-source\";\n import defaultImport from \"same-source\";\n import defaultNamedCombined, { namedCombined } from \"same-source\";\n ```\n\n This default order cannot be changed.\n However, users can still customize how imports and exports are sorted using the concept of groups as explained in the following section.\n\n\n ## Import and export groups\n\n Imports or exports of a chunk are divided into groups before being sorted with the built-in order described in the previous section.\n By default every chunk consists of a single group.\n These default groups and their order may not be to your taste.\n The sorter provides a `groups` option that allows you to customize how the chunks are divided into groups.\n The `groups` option is a list of group matchers.\n A group matcher is:\n\n - A predefined group matcher, or\n - A glob pattern, or\n - An object matcher, or\n - A list of glob patterns, predefined group matchers, and object matchers.\n\n Predefined group matchers are strings in `CONSTANT_CASE` prefixed and suffixed by `:`.\n The sorter provides several predefined group matchers:\n\n - `:ALIAS:`: sources starting with `#`, `@/`, `~`, `$`, or `%`.\n - `:BUN:`: sources starting with the protocol `bun:` or that correspond to a built-in Bun module such as `bun`.\n - `:NODE:`: sources starting with the protocol `node:` or that correspond to a built-in Node.js module such as `fs` or `path`.\n - `:PACKAGE:`: scoped and bare packages.\n - `:PACKAGE_WITH_PROTOCOL:`: scoped and bare packages with a protocol.\n - `:PATH:`: absolute and relative paths.\n - `:URL:`: sources starting with `https://` and `http://`.\n\n Let's take an example.\n In the default configuration, Node.js modules without the `node:` protocol are separated from those with a protocol.\n To group them together, you can use the predefined group `:NODE:`.\n Given the following configuration...\n\n ```json,full_options\n {\n     \"assist\": {\n         \"actions\": {\n             \"source\": {\n                 \"organizeImports\": {\n                     \"level\": \"on\",\n                     \"options\": {\n                         \"groups\": [\n                             \":URL:\",\n                             \":NODE:\"\n                         ]\n                     }\n                 }\n             }\n         }\n     }\n }\n ```\n\n ...and the following code...\n\n ```js,ignore\n import sibling from \"./file.js\";\n import internal from \"#alias\";\n import fs from \"fs\";\n import { test } from \"node:test\";\n import path from \"node:path\";\n import parent from \"../parent.js\";\n import scopedLibUsingJsr from \"jsr:@scoped/lib\";\n import data from \"https://example.org\";\n import lib from \"lib\";\n import scopedLib from \"@scoped/lib\";\n ```\n\n ...we end up with the following sorted result where the imports of `node:path` and the `fs` Node.js module are grouped together:\n\n ```js,ignore\n import data from \"https://example.org\";\n import fs from \"fs\";\n import path from \"node:path\";\n import { test } from \"node:test\";\n import scopedLibUsingJsr from \"jsr:@scoped/lib\";\n import scopedLib from \"@scoped/lib\";\n import lib from \"lib\";\n import internal from \"#alias\";\n import parent from \"../parent.js\";\n import sibling from \"./file.js\";\n ```\n\n Note that all imports that don't match a group matcher are always placed at the end.\n\n\n Group matchers can also be glob patterns and list of glob patterns.\n Glob patterns select imports and exports with a source that matches the pattern.\n In the following example, we create two groups: one that gathers imports/exports with a source starting with `@my/lib` except `@my/lib/special` and the other that gathers imports/exports starting with `@/`.\n\n ```json\n {\n     \"options\": {\n         \"groups\": [\n             [\"@my/lib\", \"@my/lib/**\", \"!@my/lib/special\", \"!@my/lib/special/**\"],\n             \"@/**\"\n         ]\n     }\n }\n ```\n\n By applying this configuration to the following code...\n\n ```js,ignore\n import lib from \"@my/lib\";\n import aliased from \"@/alias\";\n import path from \"@my/lib/special\";\n import test from \"@my/lib/path\";\n ```\n\n ...we obtain the following sorted result.\n Imports with the sources `@my/lib` and `@my/lib/path` form the first group.\n They match the glob patterns `@my/lib` and `@my/lib/**` respectively.\n The import with the source `@my/lib/special` is not placed in this first group because it is rejected by the exception `!@my/lib/special`.\n The import with the source `@/alias` is placed in a second group because it matches the glob pattern `@/**`.\n Finally, other imports are placed at the end.\n\n ```js,ignore\n import lib from \"@my/lib\";\n import test from \"@my/lib/path\";\n import aliased from \"@/alias\";\n import path from \"@my/lib/special\";\n ```\n\n Note that `@my/lib` matches `@my/lib` but not `@my/lib/**`.\n Conversely, `@my/lib/subpath` matches `@my/lib/**`, but not `@my/lib`.\n So, you have to specify both glob patterns if you want to accept all imports/exports that start with `@my/lib`.\n The prefix `!` indicates an exception.\n You can create exceptions of exceptions by following an exception by a regular glob pattern.\n For example `[\"@my/lib\", \"@my/lib/**\", \"!@my/lib/special\", \"!@my/lib/special/**\", \"@my/lib/special/*/accepted/**\"]` allows you to accepts all sources matching `@my/lib/special/*/accepted/**`.\n Note that the predefined groups can also be negated. `!:NODE:` matches all sources that don't match `:NODE:`.\n For more details on the supported glob patterns, see the dedicated section.\n\n Finally, group matchers can be object matchers.\n An object matcher allows to match type-only imports and exports.\n\n Given the following configuration:\n\n ```json\n {\n     \"options\": {\n         \"groups\": [\n             { \"type\": false, \"source\": [\"@my/lib\", \"@my/lib/**\"] },\n             [\"@my/lib\", \"@my/lib/**\"]\n         ]\n     }\n }\n ```\n\n The following code:\n\n ```ts,ignore\n import type { T } from \"@my/lib\";\n import { V } from \"@my/lib\";\n ```\n\n is sorted as follows:\n\n ```ts,ignore\n import { V } from \"@my/lib\";\n import type { T } from \"@my/lib\";\n ```\n\n The object matcher `{ \"type\": false, \"source\": [\"@my/lib\", \"@my/lib/**\"] }` match against imports and exports without the `type` keyword with a source that matches one of the glob pattern of the list `[\"@my/lib\", \"@my/lib/**\"]`.\n\n The sorter allows the separation of two groups with a blank line using the predefined string `:BLANK_LINE:`.\n Given the following configuration...\n\n ```json\n {\n     \"options\": {\n         \"groups\": [\n             [\":BUN:\", \":NODE:\"],\n             \":BLANK_LINE:\",\n             [\"@my/lib\", \"@my/lib/**\", \"!@my/lib/special\", \"!@my/lib/special/**\"],\n             \"@/**\"\n         ]\n     }\n }\n ```\n\n ...the following code...\n\n ```js,ignore\n import test from \"bun:test\";\n import path from \"node:path\";\n import lib from \"@my/lib\";\n import libPath from \"@my/lib/path\";\n import libSpecial from \"@my/lib/special\";\n import aliased from \"@/alias\";\n ```\n\n ...is sorted as:\n\n ```js,ignore\n import path from \"node:path\";\n\n import lib from \"@my/lib\";\n import test from \"@my/lib/path\";\n import aliased from \"@/alias\";\n import path from \"@my/lib/special\";\n ```\n\n Groups are matched in order.\n This means that one group matcher can shadow succeeding groups.\n For example, in the following configuration, the group matcher `:URL:` is never matched because all imports and exports match the first matcher `**`.\n\n ```json\n {\n     \"options\": {\n         \"groups\": [\n             \"**\",\n             \":URL:\"\n         ]\n     }\n }\n ```\n\n\n ## Comment handling\n\n When sorting imports and exports, attached comments are moved with their import or export,\n and detached comments (comments followed by a blank line) are left where they are.\n\n However, there is an exception to the rule.\n If a comment appears at the top of the file, it is considered as detached even if no blank line follows.\n This ensures that copyright notice and file header comments stay at the top of the file.\n\n For example, the following code...\n\n ```js,ignore\n // Copyright notice and file header comment\n import F from \"f\";\n // Attached comment for `e`\n import E from \"e\";\n // Attached comment for `d`\n import D from \"d\";\n // Detached comment (new chunk)\n\n // Attached comment for `b`\n import B from \"b\";\n // Attached comment for `a`\n import A from \"a\";\n ```\n\n ...is sorted as follows.\n A blank line is automatically added after the header comment to ensure that the attached comment doesn't merge with the header comment.\n\n ```js,ignore\n // Copyright notice and file header comment\n\n // Attached comment for `d`\n import D from \"d\";\n // Attached comment for `e`\n import E from \"e\";\n import F from \"f\";\n\n // Detached comment (new chunk)\n\n // Attached comment for `a`\n import A from \"a\";\n // Attached comment for `b`\n import B from \"b\";\n ```\n\n\n ## Import and export merging\n\n The organizer also merges imports and exports that can be merged.\n\n For example, the following code:\n\n ```ts,ignore\n import type { T1 } from \"package\";\n import type { T2 } from \"package\";\n import * as ns from \"package\";\n import D1 from \"package\";\n import D2 from \"package\";\n import { A } from \"package\";\n import { B } from \"package\";\n import { type T3 } from \"package\";\n ```\n\n is merged as follows:\n\n ```ts,ignore\n import type { T1, T2 } from \"package\";\n import D1, * as ns from \"package\";\n import D2, { A, B, type T3 } from \"package\";\n ```\n\n You may want to merge the first and the last imports.\n To do this, you have to enable the linter rule [`useImportType`](https://biomejs.dev/linter/rules/use-import-type/)\n and to set its option `style` to `inlineType`.\n\n With the following configuration...\n\n ```json\n {\n   \"linter\": {\n     \"enabled\": true,\n     \"rules\": {\n       \"style\": {\n         \"useImportType\": {\n           \"level\": \"on\",\n           \"options\": { \"style\": \"inlineType\" }\n         }\n       }\n     }\n   },\n   \"assist\": {\n     \"enabled\": true,\n     \"actions\": { \"source\": { \"organizeImports\": \"on\" } }\n   }\n }\n ```\n\n The previous imports are merged as follows:\n\n ```ts,ignore\n import D1, * as ns from \"package\";\n import D2, { A, B, type T1, type T2, type T3 } from \"package\";\n ```\n\n Note that if you set `style` to `separatedType` you will get the following merge:\n\n ```ts,ignore\n import type { T1, T2, T3 } from \"package\";\n import { V1 } from \"package\";\n import D1, * as ns from \"package\";\n import D2, { A, B } from \"package\";\n ```\n\n\n ## Named imports, named exports and attributes sorting\n\n The sorter also sorts named imports, named exports, as well as attributes.\n It uses a natural sort order for comparing numbers.\n\n The following code...\n\n ```js,ignore\n import { a, b, A, B, c10, c9 } from \"a\";\n\n export { a, b, A, B, c10, c9 } from \"a\";\n\n import special from  \"special\" with { \"type\": \"ty\", \"metadata\": \"data\" };\n ```\n\n ...is sorted as follows:\n\n ```js,ignore\n import { A, a, B, b, c9, c10 } from \"a\";\n\n export { A, a, B, b, c9, c10 } from \"a\";\n\n import special from  \"special\" with { \"metadata\": \"data\", \"type\": \"ty\" };\n ```\n\n\n ## Supported glob patterns\n\n You need to understand the structure of a source to understand which source matches a glob.\n A source is divided in source segments.\n Every source segment is delimited by the separator `/` or the start/end of the source.\n For instance `src/file.js` consists of two source segments: `src` and `file.js`.\n\n - star `*` that matches zero or more characters inside a source segment\n\n   `file.js` matches `*.js`.\n   Conversely, `src/file.js` doesn't match `*.js`\n\n - globstar `**` that matches zero or more source segments\n   `**` must be enclosed by separators `/` or the start/end of the glob.\n   For example, `**a` is not a valid glob.\n   Also, `**` must not be followed by another globstar.\n   For example, `**/**` is not a valid glob.\n\n   `file.js` and `src/file.js` match `**` and `**/*.js`\n   Conversely, `README.txt` doesn't match `**/*.js` because the source ends with `.txt`.\n\n - Use `\\*` to escape `*`\n\n   `\\*` matches the literal `*` character in a source.\n\n - `?`, `[`, `]`, `{`, and `}` must be escaped using `\\`.\n   These characters are reserved for possible future use.\n\n - Use `!` as first character to negate a glob\n\n   `file.js` matches `!*.test.js`.\n   `src/file.js` matches `!*.js` because the source contains several segments.\n\n\n ## Common configurations\n\n This section provides some examples of common configurations.\n\n ### Placing `import type` and `export type` at the start of the chunks\n\n ```json\n {\n     \"options\": {\n         \"groups\": [\n             { \"type\": true }\n         ]\n     }\n }\n ```\n\n Note that you may want to use the lint rule [`useImportType`](https://next.biomejs.dev/linter/rules/use-import-type/) and its [`style`](https://next.biomejs.dev/linter/rules/use-import-type/#style) to enforce the use of `import type` instead of `import { type }`.\n\n ### Placing `import type` and `export type` at the end of the chunks\n\n ```json\n {\n     \"options\": {\n         \"groups\": [\n             { \"type\": false }\n         ]\n     }\n }\n ```\n\n ## Change the sorting of import identifiers to lexicographic sorting\n This only applies to the named import/exports and not the source itself.\n\n ```json,options\n {\n     \"options\": {\n         \"identifierOrder\": \"lexicographic\"\n     }\n }\n ```\n ```js,use_options,expect_diagnostic\n import { var1, var2, var21, var11, var12, var22 } from 'my-package'\n ```\n\n ## Change the sorting of import identifiers to logical sorting\n This is the default behavior in case you do not override. This only applies to the named import/exports and not the source itself.\n\n ```json,options\n {\n     \"options\": {\n         \"identifierOrder\": \"natural\"\n     }\n }\n ```\n ```js,use_options,expect_diagnostic\n import { var1, var2, var21, var11, var12, var22 } from 'my-package'\n ```\n\n"
          },
          "useSortedKeys": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useSortedKeys",
            "link": "https://biomejs.dev/linter/rules/use-sorted-keys",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintPerfectionist": "sort-objects"
                }
              }
            ],
            "docs": " Sort properties of a JS object in natural order.\n\n [Natural order](https://en.wikipedia.org/wiki/Natural_sort_order) means\n that uppercase letters come before lowercase letters (e.g. `A` < `a` <\n `B` < `b`) and numbers are compared in a human way (e.g. `9` < `10`).\n\n This rule will consider spread/calculated keys e.g [k]: 1 as\n non-sortable. Instead, whenever it encounters a non-sortable key, it\n will sort all the previous sortable keys up until the nearest\n non-sortable key, if one exist. This prevents breaking the override of\n certain keys using spread keys.\n\n Sorting the keys of an object technically changes the semantics of the\n program. It affects the result of operations like\n `Object.getOwnPropertyNames`. Since ES2020, operations like `for-in`\n loops, `Object.keys`, and `JSON.stringify` are guaranteed to process\n string keys in insertion order.\n\n In cases where the order of such operations is important, you can\n disable the assist action using a suppression comment:\n\n `// biome-ignore assist/source/useSortedKeys`\n\n ## Examples\n\n ```js,expect_diff\n const obj = {\n   x: 1,\n   a: 2,\n };\n ```\n\n ```js,expect_diff\n const obj = {\n   x: 1,\n   ...f,\n   y: 4,\n   a: 2,\n   [calculated()]: true,\n   b: 3,\n   a: 1,\n };\n ```\n\n ```js\n const obj = {\n   get aab() {\n     return this._aab;\n   },\n   set aac(v) {\n     this._aac = v;\n   },\n   w: 1,\n   x: 1,\n   ...g,\n   get aaa() {\n     return \"\";\n   },\n   u: 1,\n   v: 1,\n   [getProp()]: 2,\n   o: 1,\n   p: 1,\n   q: 1,\n }\n ```\n\n ## Options\n This actions accepts following options\n\n ### `sortOrder`\n This options supports `natural` and `lexicographic` values. Where as `natural` is the default.\n\n Following will apply the natural sort order.\n\n ```json,options\n {\n     \"options\": {\n         \"sortOrder\": \"natural\"\n     }\n }\n ```\n ```js,use_options,expect_diff\n const obj = {\n     val13: 1,\n     val1: 1,\n     val2: 1,\n     val21: 1,\n     val11: 1,\n };\n ```\n\n Following will apply the lexicographic sort order.\n\n ```json,options\n {\n     \"options\": {\n         \"sortOrder\": \"lexicographic\"\n     }\n }\n ```\n ```js,use_options,expect_diff\n const obj = {\n     val13: 1,\n     val1: 1,\n     val2: 1,\n     val21: 1,\n     val11: 1,\n };\n ```\n\n ### `groupByNesting`\n When enabled, groups object keys by their value's nesting depth before sorting alphabetically.\n Simple values (primitives, single-line arrays, and single-line objects) are sorted first,\n followed by nested values (multi-line arrays and multi-line objects).\n\n > Default: `false`\n\n\n ```json,options\n {\n     \"options\": {\n         \"groupByNesting\": true\n     }\n }\n ```\n ```js,use_options,expect_diagnostic\n const obj = {\n     name: \"Sample\",\n     details: {\n         description: \"nested\"\n     },\n     id: 123\n };\n ```\n\n"
          }
        }
      },
      "json": {
        "source": {
          "useSortedKeys": {
            "deprecated": false,
            "version": "1.9.0",
            "name": "useSortedKeys",
            "link": "https://biomejs.dev/linter/rules/use-sorted-keys",
            "recommended": false,
            "fixKind": "safe",
            "docs": " Sort the keys of a JSON object in natural order.\n\n [Natural order](https://en.wikipedia.org/wiki/Natural_sort_order) means\n that uppercase letters come before lowercase letters (e.g. `A` < `a` <\n `B` < `b`) and numbers are compared in a human way (e.g. `9` < `10`).\n\n ## Examples\n\n ```json,expect_diff\n {\n     \"vase\": \"fancy\",\n     \"nested\": {\n         \"omega\": \"bar\",\n         \"alpha\": \"foo\"\n     }\n }\n ```\n\n ## Options\n This actions accepts following options\n\n ### `sortOrder`\n This options supports `natural` and `lexicographic` values. Where as `natural` is the default.\n\n Following will apply the natural sort order.\n\n ```json,options\n {\n     \"options\": {\n         \"sortOrder\": \"natural\"\n     }\n }\n ```\n ```json,use_options,expect_diff\n {\n     \"val13\": 1,\n     \"val1\": 1,\n     \"val2\": 1,\n     \"val21\": 1,\n     \"val11\": 1\n }\n ```\n\n Following will apply the lexicographic sort order.\n\n ```json,options\n {\n     \"options\": {\n         \"sortOrder\": \"lexicographic\"\n     }\n }\n ```\n ```json,use_options,expect_diff\n {\n     \"val13\": 1,\n     \"val1\": 1,\n     \"val2\": 1,\n     \"val21\": 1,\n     \"val11\": 1\n }\n ```\n\n ### `groupByNesting`\n When enabled, groups object keys by their value's nesting depth before sorting alphabetically.\n Simple values (primitives, single-line arrays, and single-line objects) are sorted first,\n followed by nested values (multi-line arrays and multi-line objects).\n\n > Default: `false`\n\n ```json,options\n {\n     \"options\": {\n         \"groupByNesting\": true\n     }\n }\n ```\n ```json,use_options,expect_diagnostic\n {\n     \"name\": \"Sample\",\n     \"details\": {\n         \"description\": \"nested\"\n     },\n     \"id\": 123\n }\n ```\n\n"
          }
        }
      },
      "jsx": {
        "source": {
          "noDuplicateClasses": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "noDuplicateClasses",
            "link": "https://biomejs.dev/linter/rules/no-duplicate-classes",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintBetterTailwindcss": "no-duplicate-classes"
                }
              }
            ],
            "docs": " Remove duplicate CSS classes.\n\n Detects and removes duplicate CSS classes in JSX `class` and `className` attributes,\n as well as in utility function calls like `clsx`, `cn`, `cva`, etc.\n\n Duplicate classes are redundant and can indicate copy-paste errors or merge conflicts.\n\n ## Examples\n\n ```jsx,expect_diff\n <div class=\"flex flex\" />;\n ```\n\n ```jsx,expect_diff\n <div class=\"p-4 text-red-500 p-4 bg-white\" />;\n ```\n\n ## Options\n\n Use the `attributes` option to specify additional JSX attributes to check.\n Use the `functions` option to specify utility functions to check (e.g., `clsx`, `cn`, `cva`).\n\n"
          },
          "useSortedAttributes": {
            "deprecated": false,
            "version": "2.0.0",
            "name": "useSortedAttributes",
            "link": "https://biomejs.dev/linter/rules/use-sorted-attributes",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "sameLogic",
                "source": {
                  "eslintReact": "jsx-sort-props"
                }
              }
            ],
            "docs": " Enforce attribute sorting in JSX elements.\n\n This rule checks if the JSX props are sorted in a consistent way.\n Props are sorted alphabetically using a [natural sort order](https://en.wikipedia.org/wiki/Natural_sort_order).\n This rule will not consider spread props as sortable.\n Instead, whenever it encounters a spread prop, it will sort all the\n previous non spread props up until the nearest spread prop, if one\n exist.\n This prevents breaking the override of certain props using spread\n props.\n\n ## Examples\n\n ```jsx,expect_diff\n <Hello lastName=\"Smith\" firstName=\"John\" />;\n ```\n\n ```jsx,expect_diff\n <Hello lastName=\"Smith\" firstName=\"John\" {...this.props} tel=\"0000\" address=\"111 Main Street\"  {...another.props} lastName=\"Smith\" />;\n ```\n\n ## Options\n This actions accepts following options\n\n ### `sortOrder`\n This options supports `natural` and `lexicographic` values. Where as `natural` is the default.\n\n Following will apply the natural sort order.\n\n ```json,options\n {\n     \"options\": {\n         \"sortOrder\": \"natural\"\n     }\n }\n ```\n ```jsx,use_options,expect_diagnostic\n <Hello tel={5555555} {...this.props} opt1=\"John\" opt2=\"\" opt12=\"\" opt11=\"\" />;\n ```\n\n Following will apply the lexicographic sort order.\n\n ```json,options\n {\n     \"options\": {\n         \"sortOrder\": \"lexicographic\"\n     }\n }\n ```\n ```jsx,use_options,expect_diagnostic\n <Hello tel={5555555} {...this.props} opt1=\"John\" opt2=\"\" opt12=\"\" opt11=\"\" />;\n ```\n\n"
          }
        }
      },
      "ts": {
        "source": {
          "useSortedInterfaceMembers": {
            "deprecated": false,
            "version": "2.4.0",
            "name": "useSortedInterfaceMembers",
            "link": "https://biomejs.dev/linter/rules/use-sorted-interface-members",
            "recommended": false,
            "fixKind": "safe",
            "sources": [
              {
                "kind": "inspired",
                "source": {
                  "eslintPerfectionist": "sort-interfaces"
                }
              }
            ],
            "docs": " Sort interface members by key.\n\n Interface members are sorted according to their names. The rule distinguishes between\n two types of members:\n\n **Sortable members** - Members with explicit, fixed names that can be alphabetically sorted:\n - Property signatures: `property: type`\n - Method signatures: `method(): type`\n - Getter signatures: `get property(): type`\n - Setter signatures: `set property(value: type): void`\n\n **Non-sortable members** - Members without fixed names or with dynamic/computed names:\n - Call signatures: `(): type` (represents the interface as a callable function)\n - Construct signatures: `new (): type` (represents the interface as a constructor)\n - Index signatures: `[key: string]: type` (represents dynamic property access)\n\n The rule sorts all sortable members alphabetically and places them first,\n followed by non-sortable members in their original order. Non-sortable members\n cannot be meaningfully sorted by name since they represent different interface\n contracts rather than named properties or methods.\n\n # Examples\n\n ## Invalid\n\n ```ts,expect_diagnostic\n interface MixedMembers {\n   z: string;\n   a: number;\n   (): void;  // Call signature\n   y: boolean;\n   new (): MixedMembers;  // Construct signature\n   b: string;\n   [key: string]: any;  // Index signature\n }\n ```\n\n ## Valid\n\n ```ts\n interface MixedMembers {\n   a: number;\n   b: string;\n   y: boolean;\n   z: string;\n   (): void;  // Non-sortable members remain in original order\n   new (): MixedMembers;\n   [key: string]: any;\n }\n ```\n\n"
          }
        }
      }
    },
    "numberOrRules": 8
  }
};
	return new Response(JSON.stringify(schema), {
		status: 200,
		headers: {
			"content-type": "application/json",
		},
	});
}
