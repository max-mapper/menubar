# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [6.0.0](https://github.com/maxogden/menubar/compare/v5.2.3...v6.0.0) (2019-05-31)


### Bug Fixes

* Update to Electron 5 ([#15](https://github.com/amaurymartiny/menubar/issues/15)) ([ce86216](https://github.com/maxogden/menubar/commit/ce86216))
* Window does not show when already app is ready ([#8](https://github.com/amaurymartiny/menubar/issues/8)) ([251fb21](https://github.com/maxogden/menubar/commit/251fb21))


### Code Refactoring

* Convert all codebase to typescript ([#2](https://github.com/amaurymartiny/menubar/issues/2)) ([820d41a](https://github.com/maxogden/menubar/commit/820d41a))


### Features

* Add `browserWindow` field in options, deprecate `height`, `width`, `x`, `y`, `alwaysOnTop` in favor of `browserWindow` ([#18](https://github.com/amaurymartiny/menubar/issues/18)) ([0b2d897](https://github.com/maxogden/menubar/commit/0b2d897))
* Support Electron.NativeImage icon argument ([#7](https://github.com/amaurymartiny/menubar/issues/7)) ([03d67f3](https://github.com/maxogden/menubar/commit/03d67f3))


### BREAKING CHANGES

* We're using a named export in Typescript now:
```diff
- var menubar = require('menubar');
+ var { menubar } = require('menubar');
```

Alternatively, using ES6/TS syntax:
```javascript
import { menubar } from 'menubar';
```
