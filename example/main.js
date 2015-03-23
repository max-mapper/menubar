var menubar = require('menubar')

// doesnt use CLI args until https://github.com/atom/atom-shell/issues/1248 is resolved

var args = {
  dir: __dirname
}

menubar(args, function ready (app) {
  console.log('ready', app)
})
