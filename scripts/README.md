# Scripts

This directory includes JavaScript/Shell scripts that can be executed during the build process or CI workflows.

Since GitHub runners always have [Node.js runtimes](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2204-Readme.md#nodejs) preinstalled, to eliminate the need for a TypeScript runtime and accelerate the job execution time, the JavaScript scripts should be written in pure JavaScript, optionally with [JSDoc](https://jsdoc.app/)s to provide docs and type hints. If you're used to writing TypeScript, you can utilize tools like [`ts-to-jsdoc`](https://github.com/futurGH/ts-to-jsdoc) to transpile the scripts for you.

The `package.json` in this directory will mark all `.js` files in it as ES modules, so you can use [top level `await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)s and [`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta)s in these scripts.

Common utility functions should be exported from modules defined in the `utils` folder.
