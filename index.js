var path = require('path')
var events = require('events')
var fs = require('fs')

var app = require('app')
var Tray = require('tray')
var BrowserWindow = require('browser-window')

var extend = require('extend')

module.exports = function create (opts) {
  if (typeof opts === 'undefined') opts = {dir: process.resourcesPath}
  if (typeof opts === 'string') opts = {dir: opts}
  if (!opts.dir) opts.dir = process.resourcesPath
  if (!(path.isAbsolute(opts.dir))) opts.dir = path.resolve(opts.dir)
  if (!opts.index) opts.index = 'file://' + path.join(opts.dir, 'index.html')

  // set width/height on opts to be usable before the window is created
  opts.width = opts.width || 400
  opts.height = opts.height || 400

  app.on('ready', appReady)

  var menubar = new events.EventEmitter()
  menubar.app = app

  return menubar

  function appReady () {
    if (app.dock) app.dock.hide()

    var iconPath = opts.icon || path.join(opts.dir, 'Icon.png')
    if (!fs.existsSync(iconPath)) iconPath = path.join(__dirname, 'example', 'IconTemplate.png') // default cat icon

    var electronScreen = require('screen')
    var cachedBounds // cachedBounds are needed for double-clicked event

    menubar.tray = opts.tray || new Tray(iconPath)

    menubar.tray
      .on('clicked', clicked)
      .on('double-clicked', clicked)

    menubar.emit('ready')

    if (opts.preloadWindow) {
      createWindow(false)
    }

    function clicked (e, bounds) {
      if (menubar.window && menubar.window.isVisible()) return hideWindow()

      // workarea takes the taskbar/menubar height in consideration
      var size = electronScreen.getDisplayNearestPoint(electronScreen.getCursorScreenPoint()).workArea

      if (bounds) cachedBounds = bounds

      // ensure bounds is an object
      bounds = bounds || {}

      // bounds may not be populated on all OSes
      if (bounds.x === 0 && bounds.y === 0) {
        // default to bottom on windows
        if (process.platform === 'win32') bounds.y = size.height - opts.height
        bounds.x = size.width + size.x - (opts.width / 2) // default to right
        cachedBounds = bounds
      }

      showWindow(cachedBounds)
    }

    function createWindow (show, x, y) {
      menubar.emit('create-window')
      var defaults = {
        show: show,
        frame: false
      }

      var winOpts = extend(defaults, opts)
      menubar.window = new BrowserWindow(winOpts)

      if (show) {
        menubar.window.setPosition(x, y)
      }

      if (!opts['always-on-top']) menubar.window.on('blur', hideWindow)

      menubar.window.loadUrl(opts.index)
      menubar.emit('after-create-window')
    }

    function showWindow (trayPos) {
      var x = opts.x || Math.floor(trayPos.x - ((opts.width / 2) || 200) + (trayPos.width / 2))
      var y = opts.y || trayPos.y
      if (!menubar.window) {
        createWindow(true, x, y)
      }

      if (menubar.window) {
        menubar.emit('show')
        menubar.window.show()
        menubar.window.setPosition(x, y)
        menubar.emit('after-show')
        return
      }
    }

    function hideWindow () {
      if (!menubar.window) return
      menubar.emit('hide')
      menubar.window.hide()
      menubar.emit('after-hide')
    }
  }
}
