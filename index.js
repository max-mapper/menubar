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

  app.on('ready', appReady)

  var menubar = new events.EventEmitter()
  menubar.app = app

  return menubar

  function appReady () {
    if (app.dock) app.dock.hide()

    var iconPath = opts.icon || path.join(opts.dir, 'IconTemplate.png')
    if (!fs.existsSync(iconPath)) iconPath = path.join(__dirname, 'example', 'IconTemplate.png') // default cat icon

    menubar.tray = opts.tray || new Tray(iconPath)

    menubar.tray.on('clicked', function clicked (e, bounds) {
      if (menubar.window && menubar.window.isVisible()) return hideWindow()
      showWindow(bounds)
    })

    menubar.emit('ready')

    if (opts.preloadWindow) {
      createWindow(false)
    }

    function createWindow (show, x, y) {
      menubar.emit('create-window')
      var defaults = {
        width: 400,
        height: 400,
        show: show,
        frame: false
      }

      var winOpts = extend(defaults, opts)
      menubar.window = new BrowserWindow(winOpts)

      if (show) {
        menubar.window.setPosition(x, y)
      }

      menubar.window.on('blur', hideWindow)
      menubar.window.loadUrl(opts.index)
      menubar.emit('after-create-window')
    }

    function showWindow (bounds) {
      var x = opts.x || bounds.x - ((opts.width / 2) || 200) + (bounds.width / 2)
      var y = opts.y || bounds.y
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
