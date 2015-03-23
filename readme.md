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

menubar({dir: __dirname}, function ready (app) {
  console.log('ready', app)
})
```

make sure there is also a `index.html` file in `dir`

then use [`atom-shell`](https://npmjs.org/atom-shell) or [`atom-shell-packager`](https://npmjs.org/atom-shell-packager) to build/run the app

see `example/` for a working example
