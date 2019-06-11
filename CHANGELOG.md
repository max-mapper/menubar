# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.0.5](https://github.com/maxogden/menubar/compare/v6.0.4...v6.0.5) (2019-06-11)


### Bug Fixes

* Remove postinstall, export taskbarLocation ([#226](https://github.com/maxogden/menubar/issues/226)) ([941b3be](https://github.com/maxogden/menubar/commit/941b3be))



## [6.0.4](https://github.com/maxogden/menubar/compare/v6.0.3...v6.0.4) (2019-06-11)


### Bug Fixes

* Correct position on Windows & multi-taskbar ([#217](https://github.com/maxogden/menubar/issues/217)) ([4f29fe2](https://github.com/maxogden/menubar/commit/4f29fe2)), closes [#196](https://github.com/maxogden/menubar/issues/196)
* Fix double 'after-hide' event ([#216](https://github.com/maxogden/menubar/issues/216)) ([a4d900e](https://github.com/maxogden/menubar/commit/a4d900e))



## [6.0.3](https://github.com/maxogden/menubar/compare/v6.0.2...v6.0.3) (2019-06-05)


### Bug Fixes

* Fix accessing Menubar.window ([#214](https://github.com/maxogden/menubar/issues/214)) ([cd5ef73](https://github.com/maxogden/menubar/commit/cd5ef73))



## [6.0.2](https://github.com/maxogden/menubar/compare/v6.0.1...v6.0.2) (2019-05-31)


### Bug Fixes

* Use cat icon if no icon provided ([#205](https://github.com/maxogden/menubar/issues/205)) ([fc02e02](https://github.com/maxogden/menubar/commit/fc02e02))



## [6.0.1](https://github.com/maxogden/menubar/compare/v6.0.0...v6.0.1) (2019-05-31)


### Bug Fixes

* Fix changelog links ([#204](https://github.com/maxogden/menubar/issues/204)) ([de96756](https://github.com/maxogden/menubar/commit/de96756))



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
