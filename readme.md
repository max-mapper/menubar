# menubar

high level way to create menubar desktop applications with atom-shell

this module provides boilerplate for setting up a menubar application using atom-shell. all you have to do is point it at your `index.html` and menubar icon and this will handle opening/closing a window when you click/blur.

![screenshot](screenshot.png)

[![Build Status](https://travis-ci.org/maxogden/menubar.svg?branch=master)](https://travis-ci.org/maxogden/menubar)

[![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)

Watch the 1HR screen recording of me coding this module: https://www.youtube.com/watch?v=PAJAvsyaHs0

## installation

```
npm install menubar --save
```

## usage

create a JS program like this:

```js
var menubar = require('menubar')

var mb = menubar()

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
})

```

make sure there is also a `index.html` file in `dir`

then use [`atom-shell`](https://npmjs.org/atom-shell) or [`atom-shell-packager`](https://npmjs.org/atom-shell-packager) to build/run the app

see `example/` for a working example

the return value of `mb` is an event emitter with these properties:

```
{
  app: the atom shell require('app') instance,
  window: the atom shell require('browser-window') instance,
  tray: the atom shell require('tray') instance
}
```

## options

you can pass an optional options object into the menubar constructor

- `dir` (default `process.cwd()`) - the app source directory
- `index` (default `file:// + opts.dir + index.html`) - the html to load for the pop up window
- `icon` (default opts.dir + 'Icon.png') - the png icon to use for the menubar
- `tray` (default created on-the-fly) - an atom shell `Tray` instance. if provided `opts.icon` will be ignored
- `width` (default 400) - window width
- `height` (default 400) - window height
- `x` (default screen.workArea.width - opts.width - 200) - the x position of the window
- `y` (default screen.workArea.y) - the y position of the window

## events

the return value of the menubar constructor is an event emitter

- `ready` - when the app has been created and initialized
- `create-window` - the line before new BrowserWindow is called
- `after-create-window` - the line after all window init code is done
- `show` - the line before window.show is called
- `after-show` - the line after window.show is called
- `hide` - the line before window.hide is called (on window blur)
- `after-hide` - the line after window.hide is called
