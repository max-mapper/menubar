# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [8.0.0](https://github.com/maxogden/menubar/compare/v7.2.0...v8.0.0) (2020-02-10)


### ⚠ BREAKING CHANGES

* Menubar's recommended peer dependency is `electron@^8.0.0`

### Features

* Support Electron 8 ([#268](https://github.com/maxogden/menubar/issues/268)) ([ad99c5a](https://github.com/maxogden/menubar/commit/ad99c5add02ab6d0d751cf6bda8a2c96c674620f))

## [7.2.0](https://github.com/maxogden/menubar/compare/v7.1.0...v7.2.0) (2020-01-16)


### Features

* Adding a loadUrlOptions option ([#263](https://github.com/maxogden/menubar/issues/263)) ([8e6bd01](https://github.com/maxogden/menubar/commit/8e6bd0154aaee02a5d601bbe37c51c55065c3923))

## [7.1.0](https://github.com/maxogden/menubar/compare/v7.0.0...v7.1.0) (2019-11-25)


### Features

* Allow skipping loadUrl ([#257](https://github.com/maxogden/menubar/issues/257)) ([095486a](https://github.com/maxogden/menubar/commit/095486ab338df26fc4d6a1e7a658cfa9fa4a69b7))

# [7.0.0](https://github.com/maxogden/menubar/compare/v6.0.8...v7.0.0) (2019-10-23)


* feat!: Support Electron 7 (#250) ([b54dce5](https://github.com/maxogden/menubar/commit/b54dce5)), closes [#250](https://github.com/maxogden/menubar/issues/250)


### BREAKING CHANGES

* - Drop support for Electron 4, 5, and 6.
- Remove deprecated passing string argument to `menubar`, use `dir` field instead
```diff
- menubar('/home/me/MY_ABSOLUTE_PATH');
+ menubar({ dir: '/home/me/MY_ABSOLUTE_PATH' });
```
- Remove deprecated passing `x`, `y`, `height`, `width`, `alwaysOnTop` fields to `menubar`, pass them instead into the `browserWindow` field
```diff
- menubar({
-   x: 12,
-   y: 34,
-   height: 500,
-   width: 320,
-   alwaysOnTop: true
- });
+ menubar({
+   browserWindow: {
+     x: 12,
+     y: 34,
+     height: 500,
+     width: 320,
+     alwaysOnTop: true
+  }
+ });
```



## [6.0.8](https://github.com/maxogden/menubar/compare/v6.0.7...v6.0.8) (2019-09-16)


### Bug Fixes

* Move doc tool to `devDependencies` ([#245](https://github.com/maxogden/menubar/issues/245)) ([2756c7a](https://github.com/maxogden/menubar/commit/2756c7a))



## [6.0.7](https://github.com/maxogden/menubar/compare/v6.0.6...v6.0.7) (2019-07-31)


### Bug Fixes

* Support Electron 6 ([#242](https://github.com/maxogden/menubar/issues/242)) ([1fd9bd7](https://github.com/maxogden/menubar/commit/1fd9bd7))



## [6.0.6](https://github.com/maxogden/menubar/compare/v6.0.5...v6.0.6) (2019-07-02)


### Bug Fixes

* Fix crash on windows position ([#235](https://github.com/maxogden/menubar/issues/235)) ([cbbe175](https://github.com/maxogden/menubar/commit/cbbe175))



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
