---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noBiomeFirstException
description: Learn more about noBiomeFirstException
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JSON (and super languages)" icon="seti:json">
## Summary
- Rule available since: `v2.2.0`
- Diagnostic Category: [`lint/suspicious/noBiomeFirstException`](/reference/diagnostics#diagnostic-category)
- This rule is **recommended**, meaning it is enabled by default.
- This rule has a [**safe**](/linter/#safe-fixes) fix.
- The default severity of this rule is [**error**](/reference/diagnostics#error).
## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"suspicious": {
				"noBiomeFirstException": "error"
			}
		}
	}
}

```
## Description
Prevents the misuse of glob patterns inside the `files.includes` field.

## Leading of negated patterns

If the first pattern of `files.includes` starts with the leading `!`, Biome won't have any file to crawl. Generally,
it is a good practice to declare the files/folders to include first, and then the files/folder to ignore.

Check the [official documentation](https://biomejs.dev/guides/configure-biome/#exclude-files-via-configuration) for more examples.

### Examples

#### Invalid

```json
{
    "files": {
        "includes": ["!dist"]
    }
}
```

#### Valid

```json
{
    "files": {
        "includes": ["src/**", "!dist"]
    }
}
```

## Leading with catch-all `**`

If the user configuration file extends from other sources (other configuration files or libraries), and those files contain the catch-all glob `**` in `files.includes`,
the rule will trigger a violation if also the user configuration file has a `**`.

#### Invalid

```jsonc
// biome.json
{
    "extends": ["./base.json"],
    "files": {
        "includes": ["**", "!**/test"]
    }
}
```

```jsonc
// base.json
{
    "files": {
        "includes": ["**", "!**/dist"]
    }
}
```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_json_analyze/src/lint/suspicious/no_biome_first_exception.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_json_analyze/tests/specs/suspicious/noBiomeFirstException)

</TabItem>
</Tabs>

