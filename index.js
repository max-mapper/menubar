var path = require('path')
var events = require('events')
var fs = require('fs')

var app = require('app')
var Tray = require('tray')
var BrowserWindow = require('browser-window')

var extend = require('extend')

module.exports = function create (opts) {
  if (typeof opts === 'undefined') opts = {dir: process.cwd()}
  if (typeof opts === 'string') opts = {dir: opts}
  if (!opts.dir) opts.dir = process.cwd()
  if (!(path.isAbsolute(opts.dir))) opts.dir = path.resolve(opts.dir)
  if (!opts.index) opts.index = 'file://' + path.join(opts.dir, 'index.html')

  app.on('ready', appReady)

  var menubar = new events.EventEmitter()
  menubar.app = app

  return menubar

  function appReady () {
    if (app.dock) app.dock.hide()
    var atomScreen = require('screen')

    var iconPath = opts.icon || path.join(opts.dir, 'Icon.png')
    if (!fs.existsSync(iconPath)) iconPath = path.join(__dirname, 'example', 'Icon.png') // default cat icon

    menubar.tray = opts.tray || new Tray(iconPath)

    menubar.tray.on('clicked', function clicked (e) {
      if (menubar.window && menubar.window.isVisible()) return hideWindow()
      showWindow()
    })

    menubar.emit('ready')

    function showWindow () {
      var size = atomScreen.getPrimaryDisplay()
      var x = opts.x || size.workArea.width - (opts.width || 400) - 200
      var y = opts.y || size.workArea.y
      if (menubar.window) {
        menubar.emit('show')
        menubar.window.show()
        menubar.window.setPosition(x, y)
        menubar.emit('after-show')
        return
      }
      menubar.emit('create-window')
      var defaults = {
        width: 400,
        height: 400,
        show: true,
        frame: false
      }
      var winOpts = extend(defaults, {width: opts.width, height: opts.height})
      menubar.window = new BrowserWindow(winOpts)
      menubar.window.setPosition(x, y)
      menubar.window.on('blur', hideWindow)
      menubar.window.loadUrl(opts.index)
      menubar.emit('after-create-window')
    }

    function hideWindow () {
      if (!menubar.window) return
      menubar.emit('hide')
      menubar.window.hide()
      menubar.emit('after-hide')
    }
  }
}
