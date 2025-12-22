---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.

title: noSecrets
description: Learn more about noSecrets
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="JavaScript (and super languages)" icon="seti:javascript">
## Summary
- Rule available since: `v1.9.0`
- Diagnostic Category: [`lint/security/noSecrets`](/reference/diagnostics#diagnostic-category)
- This rule isn't recommended, so you need to enable it.
- This rule doesn't have a fix.
- The default severity of this rule is [**information**](/reference/diagnostics#information).
- Sources: 
  - Inspired from [`no-secrets/no-secrets`](https://github.com/nickdeis/eslint-plugin-no-secrets/blob/master/README.md)

## How to configure
```json title="biome.json"
{
	"linter": {
		"rules": {
			"security": {
				"noSecrets": "error"
			}
		}
	}
}

```
## Description
Disallow usage of sensitive data such as API keys and tokens.

This rule checks for high-entropy strings and matches common patterns
for secrets, including AWS keys, Slack tokens, and private keys.
It aims to help users identify immediate potential secret leaks in their codebase,
especially for those who may not be aware of the risks associated with
sensitive data exposure.

## Detected Secrets

The following list contains the patterns we detect:

- **JSON Web Token (JWT)**: Tokens in the format of `ey...`
- **Base64-encoded JWT**: Base64-encoded JWT tokens with various parameters (alg, aud, iss, etc.)
- **Slack Token**: Tokens such as `xox[baprs]-...`
- **Slack Webhook URL**: URLs like `https://hooks.slack.com/services/...`
- **GitHub Token**: GitHub tokens with lengths between 35-40 characters
- **Twitter OAuth Token**: Twitter OAuth tokens with lengths between 35-44 characters
- **Facebook OAuth Token**: Facebook OAuth tokens with possible lengths up to 42 characters
- **Google OAuth Token**: Google OAuth tokens in the format `ya29...`
- **AWS API Key**: Keys that begin with `AKIA` followed by 16 alphanumeric characters
- **Passwords in URLs**: Passwords included in URL credentials (`protocol://user:pass@...`)
- **Google Service Account**: JSON structure with the service-account identifier
- **Twilio API Key**: API keys starting with `SK...` followed by 32 characters
- **RSA Private Key**: Key blocks that start with `-----BEGIN RSA PRIVATE KEY-----`
- **OpenSSH Private Key**: Key blocks that start with `-----BEGIN OPENSSH PRIVATE KEY-----`
- **DSA Private Key**: Key blocks that start with `-----BEGIN DSA PRIVATE KEY-----`
- **EC Private Key**: Key blocks that start with `-----BEGIN EC PRIVATE KEY-----`
- **PGP Private Key Block**: Key blocks that start with `-----BEGIN PGP PRIVATE KEY BLOCK-----`

### Entropy Check

In addition to detecting the above patterns, we also employ a **string entropy checker** to catch potential secrets based on their entropy (randomness). The entropy checker is configurable through the `entropyThreshold` option (see below), allowing customization of thresholds for string entropy to fine-tune detection and minimize false positives.

### Disclaimer

While this rule helps with most common cases, it is not intended to handle all of them.
Therefore, always review your code carefully and consider implementing additional security
measures, such as automated secret scanning in your CI/CD and git pipeline.

### Recommendations

Some recommended tools for more comprehensive secret detection include:

- [SonarQube](https://www.sonarsource.com/products/sonarqube/downloads/): Clean Code scanning solution with a secret scanner (Community version).
- [Gitleaks](https://github.com/gitleaks/gitleaks/): A mature secret scanning tool.
- [Trufflehog](https://github.com/trufflesecurity/trufflehog): A tool for finding secrets in git history.
- [Sensleak](https://github.com/crates-pro/sensleak-rs): A Rust-based solution for secret detection.

## Examples

### Invalid

```js
const secret = "AKIA1234567890EXAMPLE";
```

<pre class="language-text"><code class="language-text">code-block.js:1:16 <a href="https://biomejs.dev/linter/rules/no-secrets">lint/security/noSecrets</a> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br /><br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Potential secret found.</span><br />  <br />  <strong><span style="color: Tomato;">&gt;</span></strong> <strong>1 │ </strong>const secret = &quot;AKIA1234567890EXAMPLE&quot;;<br />   <strong>   │ </strong>               <strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><strong><span style="color: Tomato;">^</span></strong><br />    <strong>2 │ </strong><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Type of secret detected: AWS API Key</span><br />  <br />  <strong><span style="color: lightgreen;">ℹ</span></strong> <span style="color: lightgreen;">Storing secrets in source code is a security risk. Consider the following steps:<br /></span>    <span style="color: lightgreen;">1. Remove the secret from your code. If you've already committed it, consider removing the commit entirely from your git tree.<br /></span>    <span style="color: lightgreen;">2. If needed, use environment variables or a secure secret management system to store sensitive data.<br /></span>    <span style="color: lightgreen;">3. If this is a false positive, consider adding an inline disable comment, or tweak the entropy threshold. See options </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/rules/no-secrets/#options">in our docs.</a></span><span style="color: lightgreen;"><br /></span>    <span style="color: lightgreen;">This rule only catches basic vulnerabilities. For more robust, proper solutions, check out our recommendations at: </span><span style="color: lightgreen;"><a href="https://biomejs.dev/linter/rules/no-secrets/#recommendations">https://biomejs.dev/linter/rules/no-secrets/#recommendations</a></span><br />  <br /></code></pre>

### Valid

```js
const nonSecret = "hello world";
```

## Options

The rule supports the following option:

```json title='biome.json'
{
	"linter": {
		"rules": {
			"security": {
				"noSecrets": {
					"options": {
						"entropyThreshold": 41
					}
				}
			}
		}
	}
}

```

### `entropyThreshold`

Sets the sensitivity threshold for the high‑entropy detection pass.
The underlying algorithm computes an adjusted entropy score for string tokens; if the score
exceeds `entropyThreshold / 10` (e.g. `41` => `4.1`), and the string does not match any known
safe pattern, it is reported as a potential secret.

Increase the value to reduce false positives (stricter: fewer strings flagged).
Decrease the value to increase sensitivity (more strings flagged).

>**Default:** `41`


Example raising the threshold (fewer detections):

```json title='biome.json'
{
	"linter": {
		"rules": {
			"security": {
				"noSecrets": {
					"options": {
						"entropyThreshold": 50
					}
				}
			}
		}
	}
}

```

## Related links

- [Disable a rule](/linter/#disable-a-rule)
- [Configure the code fix](/linter#configure-the-code-fix)
- [Rule options](/linter/#rule-options)
- [Source Code](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/src/lint/security/no_secrets.rs)
- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/biome_js_analyze/tests/specs/security/noSecrets)

</TabItem>
</Tabs>

