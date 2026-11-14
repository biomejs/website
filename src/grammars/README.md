# Vendored grammars

## `gritql.tmLanguage.json`

TextMate grammar for GritQL, used by Shiki to highlight `grit` code blocks in
the docs. It's registered in `astro.config.ts`.

- Source: [`biomejs/tree-sitter-gritql`](https://github.com/biomejs/tree-sitter-gritql/blob/ecaec54b30685c23e65013b2f116a1fb65284f2e/syntaxes/gritql.tmLanguage.json)
- Commit: `ecaec54b30685c23e65013b2f116a1fb65284f2e`
- License: MIT, see [`LICENSE-gritql`](./LICENSE-gritql)

The file is copied verbatim and excluded from Biome so it can be diffed against
upstream. To update it, copy the file from a newer commit and update the commit
above.

The playground doesn't use this grammar. It has its own CodeMirror tokenizer in
`packages/codemirror-lang-gritql`, which should be kept roughly in sync.
