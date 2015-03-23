var path = require('path')

var app = require('app')
var Tray = require('tray')
var BrowserWindow = require('browser-window')
var ipc = require('ipc')
var shell = require('shell')

var extend = require('extend')

// atom shell has weird crash issues if you let certain atom-shell values get GC'd
var win, icon

module.exports = function create (opts, ready) {
  if (typeof opts === 'string') opts = {dir: opts}
  if (!(path.isAbsolute(opts.dir))) opts.dir = path.resolve(opts.dir)
  if (!opts.index) opts.index = path.join(opts.dir, 'index.html')

  app.on('ready', appReady)
  
  return app
  
  function appReady () {
    app.dock.hide()
    var atomScreen = require('screen')
    var size = atomScreen.getPrimaryDisplay()

    var canQuit = false
    app.on('will-quit', function tryQuit (e) {
      if (canQuit) return true
      win = undefined
      e.preventDefault()
    })
    
    var iconPath = opts.icon || path.join(opts.dir, 'Icon.png')
    icon = new Tray(iconPath)

    icon.on('clicked', function clicked (e) {
      if (win && win.isVisible()) return hideWindow()
      showWindow()
    })
    
    ready(null, app)

    function showWindow () {
      if (win) {
        return win.show()
      }
      var defaults = {
        width: 400,
        height: 400,
        show: true,
        frame: false
      }
      var winOpts = extend(defaults, winOpts)
      win = new BrowserWindow(defaults)
      var x = opts.x || size.workArea.width - 600
      var y = opts.y || size.workArea.y
      win.setPosition(x, y)
      win.on('blur', hideWindow)
      win.loadUrl('file://' + opts.index)
    }

    function hideWindow () {
      if (win) return win.hide()
    }
  }
}

