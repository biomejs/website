---
title: VS Code extension V3
description: Biome releases v3 of the VS Code extension
summary: Biome releases v3 of the VS Code extension
authors:
  - nhedger
date: 2025-04-19
cover:
  light: "@/assets/blog/roadmap-2024/banner-light.png"
  dark: "@/assets/blog/roadmap-2024/banner-dark.png"
  alt: The brand of the project. It says "Biome, toolchain of the web"
socialImage: "@/assets/social-logo.png"
---

We're excited to announce that version 3 of the Biome VS Code extension is now available! This release includes a range of new features and improvements to make your development experience even better:

- 🗄️ Support for multi-root workspaces
- 📝 Support for single-file mode
- 👻 Support for unsaved files
- 🔄 Automatic reload after updating Biome
- ⚙️ Automatic reload after configuration changes
- ✨ Improved status indicator

## Multi-root workspaces

The Biome extension now supports [multi-root workspaces], so you can work on multiple projects side by side in a single VS Code window. Each workspace folder now runs its own independent Biome instance, keeping your projects isolated.

:::caution[heads up for pre-release users]
If you've been using the pre-release version over the past few months, please
note that support for the `biome.project` setting has been **removed** in the 
final release. We now recommend using **multiple workspace folders** instead 
to manage multiple projects.
:::

[multi-root workspaces]: https://code.visualstudio.com/docs/editor/multi-root-workspaces

## Single-file mode

Sometimes you just need to make a quick edit to _that one file_. The extension
now fully supports **single-file mode**, making it easy to work with files that
aren't part of a full project.

```sh frame="none"
code that-one-file.js
```

To use this feature, make sure you have [Biome installed globally].
No worries if you forget, the extension will let you know if it can’t find Biome
in your `PATH`.

[Biome installed globally]: https://biomejs.dev/guides/manual-installation/

## Unsaved files & VS Code settings

The extension now supports formatting and linting unsaved (Untitled) files, 
as well as your VS Code settings. When you open one of these, the extension
will spin up a global Biome instance on demand.

As with single-file mode, this feature requires [Biome to be installed globally]. 
The extension will notify you if it’s missing from your PATH.

[Biome to be installed globally]: https://biomejs.dev/guides/manual-installation/

## Automatic reload

When the extension detects that Biome has been updated in your project dependencies, it will automatically reload the relevant Biome instances to use the latest version.

Additionally, any changes to the extension’s configuration will trigger a reload of the Biome instance to ensure your new settings take effect immediately.

## Improved status indicator

The status bar now more reliably reflects the status of Biome for your active
workspace folder. When you switch between workspace folders, the indicator 
updates accordingly.

Plus, clicking the status indicator opens the logs for the current Biome 
instance, making it easier to access logs when troubleshooting.

## Retiring the downloader

From the start, the downloader was meant to bridge the gap until you installed
Biome as a project dependency.

Managing the lifecycle of downloaded binaries—including updates and cross-platform 
support is complex. We believe package managers handle this better than we could.

Going forward, if the extension needs a global Biome installation but can’t find it, 
you’ll see a notification with instructions on how to install Biome globally. And 
don’t worry, you can easily silence this notification if you prefer not to be reminded.

