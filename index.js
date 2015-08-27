var path = require('path')
var events = require('events')
var fs = require('fs')

var app = require('app')
var Tray = require('tray')
var BrowserWindow = require('browser-window')

var extend = require('extend')

module.exports = function create (opts) {
  if (typeof opts === 'undefined') opts = {dir: app.getAppPath()}
  if (typeof opts === 'string') opts = {dir: opts}
  if (!opts.dir) opts.dir = app.getAppPath()
  if (!(path.isAbsolute(opts.dir))) opts.dir = path.resolve(opts.dir)
  if (!opts.index) opts.index = 'file://' + path.join(opts.dir, 'index.html')

  // set width/height on opts to be usable before the window is created
  opts.width = opts.width || 400
  opts.height = opts.height || 400

  app.on('ready', appReady)

  var menubar = new events.EventEmitter()
  menubar.app = app

  // Set / get options
  menubar.setOption = function (opt, val) {
    opts[opt] = val
  }

  menubar.getOption = function (opt) {
    return opts[opt]
  }

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

    if (opts.preloadWindow) {
      createWindow(false)
    }

    menubar.showWindow = showWindow
    menubar.hideWindow = hideWindow

    menubar.emit('ready')

    /**
     * Temporary workaround to retrieve the coordinates of the clicked display.
     *
     * @see https://github.com/atom/electron/issues/1847
     *
     * @param  {Object} bounds         Bounds object from click event
     * @param  {Object} activeWorkArea Coords for clicked display
     * @return {Object}
     */
    function getActiveDisplayCoords (bounds, activeWorkArea) {
      var boundsWorkArea = electronScreen.getDisplayNearestPoint(bounds).workArea
      var coords = {
        x: bounds.x,
        y: bounds.y
      }

      // make sure it's a different screen before modifying the bounds object
      if (boundsWorkArea.x !== activeWorkArea.x) {
        var offsetX = boundsWorkArea.x + boundsWorkArea.width - bounds.x
        coords.x = activeWorkArea.width + activeWorkArea.x - offsetX
        // ensure proper `y` value on vertically stacked displays
        coords.y = activeWorkArea.y
      }

      return coords
    }

    function calcBounds (bounds) {
      // workarea takes the taskbar/menubar height in consideration
      var size = electronScreen.getDisplayNearestPoint(electronScreen.getCursorScreenPoint()).workArea

      // double click sometimes returns `undefined`
      bounds = bounds || cachedBounds || {x: 0, y: 0, width: 0, height: 0}

      // default to bottom on windows
      // even when `bounds` is set, it doesn't take the app height in consideration
      if (process.platform === 'win32') bounds.y = size.height - opts.height

      if (bounds.x === 0) {
        // default to right
        bounds.x = size.width + size.x - (opts.width / 2)
      } else {
        var coords = getActiveDisplayCoords(bounds, size)
        bounds.x = coords.x
        bounds.y = coords.y
      }

      cachedBounds = bounds
      return bounds
    }

    function clicked (e, bounds) {
      if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) return hideWindow()

      if (menubar.window && menubar.window.isVisible()) return hideWindow()

      showWindow(calcBounds(bounds))
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

      if (!opts['always-on-top']) {
        menubar.window.on('blur', hideWindow)
      }

      if (opts['show-on-all-workspaces'] !== false) {
        menubar.window.setVisibleOnAllWorkspaces(true)
      }

      menubar.window.loadUrl(opts.index)
      menubar.emit('after-create-window')
    }

    function showWindow (trayPos) {
      trayPos = trayPos || calcBounds()

      var x = (opts.x !== undefined) ? opts.x : Math.floor(trayPos.x - ((opts.width / 2) || 200) + (trayPos.width / 2))
      var y = (opts.y !== undefined) ? opts.y : trayPos.y
      if (!menubar.window) {
        createWindow(true, x, y)
      }

      if (menubar.window) {
        menubar.emit('show')
        menubar.window.setPosition(x, y)
        menubar.window.show()
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
