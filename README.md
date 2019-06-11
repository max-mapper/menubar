[![Build Status](https://travis-ci.org/maxogden/menubar.svg?branch=master)](https://travis-ci.org/maxogden/menubar)
[![npm (scoped)](https://img.shields.io/npm/v/menubar.svg)](https://www.npmjs.com/package/@maxogden/menubar)
[![dependencies Status](https://david-dm.org/maxogden/menubar/status.svg)](https://david-dm.org/maxogden/menubar)

# Menubar

High level way to create menubar desktop applications with Electron.

This module provides boilerplate for setting up a menubar application using Electron. All you have to do is point it at your `index.html` and menubar icon and this will handle opening/closing a window when you click/blur.

Works on Mac OS, Windows and some Linuxes (patches welcome!) - check out [WORKING_PLATFORMS.md](./WORKING_PLATFORMS.md) to see all the known platforms where menubar works well.

**Mac OS**

![screenshot](screenshot.png)

**Windows**

![screenshot](screenshot-windows.png)

## Installation

```bash
yarn add menubar
```

## Usage

Starting with your own new project, run these commands:

```bash
$ yarn add menubar
$ touch myApp.js
$ touch index.html
```

Fill `index.html` with some HTML, and `myApp.js` like this:

```javascript
const { menubar } = require('menubar');

const mb = menubar();

mb.on('ready', () => {
  console.log('app is ready');
  // your app code here
});
```

Then use [`electron`](https://npmjs.org/electron) to run the app:

```bash
$ electron myApp.js
```

Alternatively, see [`examples/hello-world`](/examples/hello-world) folder for a simple working example.

The return value of `menubar()` is a `Menubar` class instance, which has these properties:

```
{
  app: the electron require('app') instance,
  window: the electron require('browser-window') instance,
  tray: the electron require('tray') instance,
  positioner: the electron-positioner instance,
  setOption(option, value): change an option after menubar is created,
  getOption(option): get an menubar option,
  showWindow(): show the menubar window,
  hideWindow(): hide the menubar window
}
```

## Options

You can pass an optional options object into the menubar constructor:

- `dir` (default `process.cwd()`) - the app source directory
- `index` (default `file:// + opts.dir + index.html`) - the html to load for the pop up window
- `browserWindow` - BrowserWindow options to be passed to the BrowserWindow constructor, see [Electron docs](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions). Some interesting fields to passed down are:
  - `x` (default `undefined`) - the x position of the window
  - `y` (default `undefined`) - the y position of the window
  - `width` (default 400) - window width
  - `height` (default 400) - window height
  - `alwaysOnTop` (default false) - if true, the window will not hide on blur
- `icon` (default `opts.dir + IconTemplate.png`) - the png icon to use for the menubar. A good size to start with is 20x20. To support retina, supply a 2x sized image (e.g. 40x40) with `@2x` added to the end of the name, so `icon.png` and `icon@2x.png` and Electron will automatically use your `@2x` version on retina screens.
- `tooltip` (default empty) - menubar tray icon tooltip text
- `tray` (default created on-the-fly) - an electron `Tray` instance. if provided `opts.icon` will be ignored
- `preloadWindow` (default false) - Create [BrowserWindow](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) instance before it is used -- increasing resource usage, but making the click on the menubar load faster.
- `showOnAllWorkspaces` (default true) - Makes the window available on all OS X workspaces.
- `windowPosition` (default trayCenter and trayBottomCenter on Windows) - Sets the window position (x and y will still override this), check [positioner docs](https://github.com/jenslind/electron-positioner#docs) for valid values.
- `showDockIcon` (default false) - Configure the visibility of the application dock icon.
- `showOnRightClick` (default false) - Show the window on 'right-click' event instead of regular 'click'
- ~`width`~ _deprecated_ - Please use `options.browserWindow.width`, see [Electron docs](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) for more info on this field.
- ~`height`~ _deprecated_ - Please use `options.browserWindow.height`, see [Electron docs](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) for more info on this field.
- ~`x`~ _deprecated_ - Please use `options.browserWindow.x`, see [Electron docs](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) for more info on this field.
- ~`y`~ _deprecated_ - Please use `options.browserWindow.y`, see [Electron docs](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) for more info on this field.
- ~`alwaysOnTop`~ _deprecated_ - Please use `options.browserWindow.alwaysOnTop`, see [Electron docs](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) for more info on this field.

## Events

The return value of the menubar constructor is an event emitter:

- `ready` - when the app has been created and initialized
- `create-window` - the line before new BrowserWindow is called
- `after-create-window` - the line after all window init code is done
- `show` - the line before window.show is called
- `after-show` - the line after window.show is called
- `hide` - the line before window.hide is called (on window blur)
- `after-hide` - the line after window.hide is called
- `after-close` - after the .window (BrowserWindow) property has been deleted
- `focus-lost` - emitted if always-on-top option is set and the user clicks away

## Tips

- Use `mb.on('after-create-window', callback)` to run things after your app has loaded. For example you could run `mb.window.openDevTools()` to open the developer tools for debugging, or load a different URL with `mb.window.loadUrl()`
- Use `mb.on('focus-lost')` if you would like to perform some operation when using the option `browserWindow.alwaysOnTop: true`
- To restore focus of previous window after menubar hide, use `mb.on('after-hide', () => { mb.app.hide() } )` or similar
