# menubar [![Build Status](https://travis-ci.org/maxogden/menubar.svg?branch=master)](https://travis-ci.org/maxogden/menubar)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

High level way to create menubar desktop applications with [Electron](http://electron.atom.io/)

This module provides boilerplate for setting up a menubar application using electron. All you have to do is point it at your `index.html` and menubar icon and this will handle opening/closing a window when you click/blur.

Works on Mac OS X, Windows and some Linuxes (Tested on Xfce4, your mileage may vary -- patches welcome!)

**Mac OS X**

![screenshot](screenshot.png)

**Windows**

![screenshot](screenshot-windows.png)

Watch the 1HR screen recording of me coding this module [here](https://www.youtube.com/watch?v=PAJAvsyaHs0)

This module was written for + is used by [Monu](https://github.com/maxogden/monu)

## Installation

```
npm install menubar --save
```

## Usage

Create a JS program like this:

```js
var menubar = require('menubar')

var mb = menubar()

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
})
```

Make sure there is also a `index.html` file in `dir`

Then use [`electron`](https://npmjs.org/electron-prebuilt) or [`electron-packager`](https://npmjs.org/electron-packager) to build/run the app:

```
npm install electron-prebuilt -g
electron your-app.js
```

See `example/` for a working example

The return value of `mb` is an event emitter with these properties:

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

You can pass an optional options object into the menubar constructor

- `dir` (default `process.cwd()`) - the app source directory
- `index` (default `file:// + opts.dir + index.html`) - the html to load for the pop up window
- `icon` (default `opts.dir + Icon.png`) - the png icon to use for the menubar
- `tray` (default created on-the-fly) - an electron `Tray` instance. if provided `opts.icon` will be ignored
- `preloadWindow` (default `false`) - Create [BrowserWindow](https://github.com/atom/electron/blob/master/docs/api/browser-window.md) instance before it is used -- increasing resource usage, but making the click on the menubar load faster.
- `width` (default `400`) - window width
- `height` (default `400`) - window height
- `x` (default `null`) - the x position of the window
- `y` (default `null`) - the y position of the window
- `always-on-top` (default `false`) - if true, the window will not hide on blur
- `show-on-all-workspaces` (default `true`) - Makes the window available on all OS X workspaces.
- `window-position` (default `trayCenter` and `trayBottomCenter` on Windows) - Sets the window position (x and y will still override this), check [positioner docs](https://github.com/jenslind/electron-positioner#docs) for valid values.

## Events

The return value of the menubar constructor is an event emitter

- `ready` - when the app has been created and initialized
- `create-window` - the line before new [BrowserWindow](https://github.com/atom/electron/blob/master/docs/api/browser-window.md) is called
- `after-create-window` - the line after all window init code is done
- `show` - the line before `window.show` is called
- `after-show` - the line after `window.show` is called
- `hide` - the line before `window.hide` is called (on window blur)
- `after-hide` - the line after `window.hide` is called
