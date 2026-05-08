---
title: Daemon requests
description: List of daemon requests that clients can use.
---

The Biome Daemon uses [JSON-RPC](https://www.jsonrpc.org/specification), a series of methods that can be leveraged by third-party clients, such as editor extensions.

Each method sends a request with the following JSON payload, where `method` is one of the methods listed on this page. Below is an example of a `biome/open_project` request:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "biome/open_project",
  "params": {
    "path": "/Some/path",
    "openInitialized": true
  }
}
```

:::caution
These methods aren't part of the semantic versioning contract, and may change without notice.
:::

[//]: # (Start-custom-requests)
## Custom Requests

### `biome/file_features`

Accepts `SupportsFeatureParams`.

```ts
interface SupportsFeatureParams {
	features: FeatureName;
	inlineConfig?: Configuration;
	/**
	 * Features that shouldn't be enabled
	 */
	notRequestedFeatures?: FeatureName;
	path: string;
	projectKey: number;
	skipIgnoreCheck?: boolean;
}
```

Returns `FileFeaturesResult`.

```ts
interface FileFeaturesResult {
	featuresSupported: FeaturesSupported;
}
```

### `biome/update_settings`

Accepts `UpdateSettingsParams`.

```ts
interface UpdateSettingsParams {
	configuration: Configuration;
	extendedConfigurations?: unknown[][];
	moduleGraphResolutionKind?: string;
	projectKey: number;
	workspaceDirectory?: string;
}
```

Returns `UpdateSettingsResult`.

```ts
interface UpdateSettingsResult {
	diagnostics: Diagnostic[];
}
```

### `biome/open_project`

Accepts `OpenProjectParams`.

```ts
interface OpenProjectParams {
	/**
	 * Whether the folder should be opened as a project, even if no `biome.json` can be found.
	 */
	openUninitialized: boolean;
	/**
	 * The path to open
	 */
	path: string;
}
```

Returns `OpenProjectResult`.

```ts
interface OpenProjectResult {
	/**
	 * A unique identifier for this project
	 */
	projectKey: number;
}
```

### `biome/scan_project`

Accepts `ScanProjectParams`.

```ts
interface ScanProjectParams {
	/**
	 * Forces scanning of the folder, even if it is already being watched.
	 */
	force: boolean;
	projectKey: number;
	scanKind: ScanKind;
	verbose?: boolean;
	/**
	 * Whether the watcher should watch this path. Does nothing if the watcher is already watching this path.
	 */
	watch: boolean;
}
```

Returns `ScanProjectResult`.

```ts
interface ScanProjectResult {
	/**
	 * A list of child configuration files found inside the project
	 */
	configurationFiles: string[];
	/**
	 * Diagnostics reported while scanning the project.
	 */
	diagnostics: Diagnostic[];
	/**
	 * Duration of the scan.
	 */
	duration: Duration;
}
```

### `biome/open_file`

Accepts `OpenFileParams`.

```ts
interface OpenFileParams {
	content: FileContent;
	documentFileSource?: DocumentFileSource;
	inlineConfig?: Configuration;
	path: string;
	/**
	 * Set to `true` to persist the node cache used during parsing, in order to speed up subsequent reparsing if the document has been edited. This should only be enabled if reparsing is to be expected, such as when the file is opened through the LSP Proxy.
	 */
	persistNodeCache?: boolean;
	projectKey: number;
}
```

Returns `OpenFileResult`.

```ts
interface OpenFileResult {
	diagnostics: Diagnostic[];
}
```

### `biome/change_file`

Accepts `ChangeFileParams`.

```ts
interface ChangeFileParams {
	content: string;
	inlineConfig?: Configuration;
	path: string;
	projectKey: number;
	version: number;
}
```

Returns `ChangeFileResult`.

```ts
interface ChangeFileResult {
	diagnostics: Diagnostic[];
}
```

### `biome/close_file`

Accepts `CloseFileParams`.

```ts
interface CloseFileParams {
	path: string;
	projectKey: number;
}
```

Returns `void`.

### `biome/file_exists`

Accepts `FileExitsParams`.

```ts
interface FileExitsParams {
	filePath: string;
}
```

Returns `boolean`.

### `biome/is_path_ignored`

Accepts `PathIsIgnoredParams`.

```ts
interface PathIsIgnoredParams {
	/**
	 * Whether the path is ignored for specific features e.g. `formatter.includes`. When this field is empty, Biome checks only `files.includes`.
	 */
	features: FeatureName;
	/**
	 * Controls how to ignore check should be done
	 */
	ignoreKind?: IgnoreKind;
	/**
	 * Whether the path is a directory. Used to skip stat calls when the caller already knows the file type from the filesystem traversal.
	 */
	isDir?: boolean;
	/**
	 * The path to inspect
	 */
	path: string;
	projectKey: number;
}
```

Returns `boolean`.

### `biome/update_module_graph`

Accepts `UpdateModuleGraphParams`.

```ts
interface UpdateModuleGraphParams {
	path: string;
	projectKey: number;
	/**
	 * The kind of update to apply to the module graph
	 */
	updateKind: string;
}
```

Returns `void`.

### `biome/get_syntax_tree`

Accepts `GetSyntaxTreeParams`.

```ts
interface GetSyntaxTreeParams {
	path: string;
	projectKey: number;
}
```

Returns `GetSyntaxTreeResult`.

```ts
interface GetSyntaxTreeResult {
	ast: string;
	cst: string;
}
```

### `biome/check_file_size`

Accepts `CheckFileSizeParams`.

```ts
interface CheckFileSizeParams {
	path: string;
	projectKey: number;
}
```

Returns `CheckFileSizeResult`.

```ts
interface CheckFileSizeResult {
	fileSize: number;
	limit: number;
}
```

### `biome/get_file_content`

Accepts `GetFileContentParams`.

```ts
interface GetFileContentParams {
	path: string;
	projectKey: number;
}
```

Returns `string`.

### `biome/get_control_flow_graph`

Accepts `GetControlFlowGraphParams`.

```ts
interface GetControlFlowGraphParams {
	cursor: number;
	path: string;
	projectKey: number;
}
```

Returns `string`.

### `biome/get_formatter_ir`

Accepts `GetFormatterIRParams`.

```ts
interface GetFormatterIRParams {
	path: string;
	projectKey: number;
}
```

Returns `string`.

### `biome/get_type_info`

Accepts `GetTypeInfoParams`.

```ts
interface GetTypeInfoParams {
	path: string;
	projectKey: number;
}
```

Returns `string`.

### `biome/get_registered_types`

Accepts `GetRegisteredTypesParams`.

```ts
interface GetRegisteredTypesParams {
	path: string;
	projectKey: number;
}
```

Returns `string`.

### `biome/get_semantic_model`

Accepts `GetSemanticModelParams`.

```ts
interface GetSemanticModelParams {
	path: string;
	projectKey: number;
}
```

Returns `string`.

### `biome/get_module_graph`

Accepts `GetModuleGraphParams`.

```ts
interface GetModuleGraphParams {}
```

Returns `GetModuleGraphResult`.

```ts
interface GetModuleGraphResult {
	data: object;
}
```

### `biome/pull_diagnostics`

Accepts `PullDiagnosticsParams`.

```ts
interface PullDiagnosticsParams {
	categories: RuleCategories;
	/**
	 * Minimum severity for a diagnostic to be included. Diagnostics with a severity below this threshold are ignored entirely (not counted, not serialized). Defaults to [`Severity::Hint`] (include everything).
	 */
	diagnosticLevel?: Severity;
	/**
	 * Rules to apply on top of the configuration
	 */
	enabledRules?: string[];
	/**
	 * When true, promote assist diagnostics (`assist/*`) to error severity before applying the diagnostic_level filter.
	 */
	enforceAssist?: boolean;
	/**
	 * When `true`, diagnostics include code suggestions for rule fixes.
	 */
	includeCodeFix?: boolean;
	inlineConfig?: Configuration;
	/**
	 * Max limit of diagnostics types to pull. This limit is meant to cap the number of [Diagnostic] to pull. However, the workspace still processes ALL diagnostics coming from the analyzer to compute their severity. If no value is provided, the workspace will pull all diagnostics.
	 */
	maxDiagnostics?: unknown;
	only?: string[];
	path: string;
	projectKey: number;
	skip?: string[];
}
```

Returns `PullDiagnosticsResult`.

```ts
interface PullDiagnosticsResult {
	diagnostics: Diagnostic[];
	errors: number;
	infos: number;
	/**
	 * Number of parse errors (subset of `errors`). Used by `--skip-parse-errors` to distinguish parse errors from analyzer errors.
	 */
	parseErrors: number;
	skippedDiagnostics: number;
	warnings: number;
}
```

### `biome/pull_actions`

Accepts `PullActionsParams`.

```ts
interface PullActionsParams {
	categories?: RuleCategories;
	/**
	 * When `false`, returned actions have `suggestion: None` (no `BatchMutation` computed). Used by `codeAction/resolve` to defer edit computation.
	 */
	computeActions?: boolean;
	enabledRules?: string[];
	inlineConfig?: Configuration;
	only?: string[];
	path: string;
	projectKey: number;
	range?: TextRange;
	skip?: string[];
	suppressionReason?: unknown;
}
```

Returns `PullActionsResult`.

```ts
interface PullActionsResult {
	actions: CodeAction[];
}
```

### `biome/pull_diagnostics_and_actions`

Accepts `PullDiagnosticsAndActionsParams`.

```ts
interface PullDiagnosticsAndActionsParams {
	categories?: RuleCategories;
	enabledRules?: string[];
	inlineConfig?: Configuration;
	only?: string[];
	path: string;
	projectKey: number;
	skip?: string[];
}
```

Returns `PullDiagnosticsAndActionsResult`.

```ts
interface PullDiagnosticsAndActionsResult {
	diagnostics: unknown[][];
}
```

### `biome/format_file`

Accepts `FormatFileParams`.

```ts
interface FormatFileParams {
	inlineConfig?: Configuration;
	path: string;
	projectKey: number;
}
```

Returns `Printed`.

```ts
interface Printed {
	code: string;
	range?: TextRange;
	sourcemap: SourceMarker[];
	verbatimRanges: TextRange[];
}
```

### `biome/format_range`

Accepts `FormatRangeParams`.

```ts
interface FormatRangeParams {
	inlineConfig?: Configuration;
	path: string;
	projectKey: number;
	range: TextRange;
}
```

Returns `Printed`.

```ts
interface Printed {
	code: string;
	range?: TextRange;
	sourcemap: SourceMarker[];
	verbatimRanges: TextRange[];
}
```

### `biome/format_on_type`

Accepts `FormatOnTypeParams`.

```ts
interface FormatOnTypeParams {
	inlineConfig?: Configuration;
	offset: number;
	path: string;
	projectKey: number;
}
```

Returns `Printed`.

```ts
interface Printed {
	code: string;
	range?: TextRange;
	sourcemap: SourceMarker[];
	verbatimRanges: TextRange[];
}
```

### `biome/fix_file`

Accepts `FixFileParams`.

```ts
interface FixFileParams {
	/**
	 * Rules to apply to the file
	 */
	enabledRules?: string[];
	fixFileMode: FixFileMode;
	inlineConfig?: Configuration;
	only?: string[];
	path: string;
	projectKey: number;
	ruleCategories: RuleCategories;
	shouldFormat: boolean;
	skip?: string[];
	suppressionReason?: unknown;
}
```

Returns `FixFileResult`.

```ts
interface FixFileResult {
	/**
	 * List of all the code actions applied to the file
	 */
	actions: FixAction[];
	/**
	 * New source code for the file with all fixes applied
	 */
	code: string;
	/**
	 * Number of errors
	 */
	errors: number;
	/**
	 * number of skipped suggested fixes
	 */
	skippedSuggestedFixes: number;
}
```

### `biome/rename`

Accepts `RenameParams`.

```ts
interface RenameParams {
	newName: string;
	path: string;
	projectKey: number;
	symbolAt: number;
}
```

Returns `RenameResult`.

```ts
interface RenameResult {
	/**
	 * List of text edit operations to apply on the source code
	 */
	indels: TextEdit;
	/**
	 * Range of source code modified by this rename operation
	 */
	range: TextRange;
}
```

### `biome/parse_pattern`

Accepts `ParsePatternParams`.

```ts
interface ParsePatternParams {
	defaultLanguage: GritTargetLanguage;
	pattern: string;
}
```

Returns `ParsePatternResult`.

```ts
interface ParsePatternResult {
	patternId: string;
}
```

### `biome/search_pattern`

Accepts `SearchPatternParams`.

```ts
interface SearchPatternParams {
	path: string;
	pattern: string;
	projectKey: number;
}
```

Returns `SearchResults`.

```ts
interface SearchResults {
	matches: TextRange[];
	path: string;
}
```

### `biome/drop_pattern`

Accepts `DropPatternParams`.

```ts
interface DropPatternParams {
	pattern: string;
}
```

Returns `void`.


[//]: # (End-custom-requests)
