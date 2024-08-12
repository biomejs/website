**Since**: `v1.6.0`
:::caution
This rule is part of the [nursery](/linter/rules/#nursery) group.
:::

Disallow the use of dependencies that aren't specified in the `package.json`.

Indirect dependencies will trigger the rule because they aren't declared in the `package.json`. This means that if package `@org/foo` has a dependency on `lodash`, and then you use
`import "lodash"` somewhere in your project, the rule will trigger a diagnostic for this import.

The rule ignores imports using a protocol such as `node:`, `bun:`, `jsr:`, `https:`.

To ensure that Visual Studio Code uses relative imports when it automatically imports a variable,
you may set [`javascript.preferences.importModuleSpecifier` and `typescript.preferences.importModuleSpecifier`](https://code.visualstudio.com/docs/getstarted/settings) to `relative`.

## Examples

### Invalid

```js
import "vite";
```

### Valid

```js
import { A } from "./local.js";
```

```js
import assert from "node:assert";
```

## Related links

- [Disable a rule](/linter/#disable-a-lint-rule)
- [Configure the rule fix](/linter#configure-the-rule-fix)
- [Rule options](/linter/#rule-options)
