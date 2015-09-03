var path = require('path')
var events = require('events')
var fs = require('fs')

var app = require('app')
var Tray = require('tray')
var BrowserWindow = require('browser-window')

var extend = require('extend')
var Positioner = require('electron-positioner')

module.exports = function create (opts) {
  if (typeof opts === 'undefined') opts = {dir: app.getAppPath()}
  if (typeof opts === 'string') opts = {dir: opts}
  if (!opts.dir) opts.dir = app.getAppPath()
  if (!(path.isAbsolute(opts.dir))) opts.dir = path.resolve(opts.dir)
  if (!opts.index) opts.index = 'file://' + path.join(opts.dir, 'index.html')
  if (!opts['window-position']) opts['window-position'] = (process.platform === 'win32') ? 'trayBottomCenter' : 'trayCenter'

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

    var iconPath = opts.icon || path.join(opts.dir, 'IconTemplate.png')
    if (!fs.existsSync(iconPath)) iconPath = path.join(__dirname, 'example', 'IconTemplate.png') // default cat icon

    var electronScreen = require('screen')
    var cachedBounds // cachedBounds are needed for double-clicked event

    menubar.tray = opts.tray || new Tray(iconPath)

    menubar.tray
      .on('clicked', clicked)
      .on('double-clicked', clicked)

    if (opts.preloadWindow) {
      createWindow()
    }

    menubar.showWindow = showWindow
    menubar.hideWindow = hideWindow

    menubar.positioner

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

    function clicked (e, bounds) {
      if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) return hideWindow()

      if (menubar.window && menubar.window.isVisible()) return hideWindow()

      // workarea takes the taskbar/menubar height in consideration
      var size = electronScreen.getDisplayNearestPoint(electronScreen.getCursorScreenPoint()).workArea

      // double click sometimes returns `undefined`
      bounds = bounds || cachedBounds

      if (bounds.x === 0 && opts['window-position'].substr(0, 4) === 'tray') {
        // default to right if x is null and if we are trying to position the window at the tray.
        opts['window-position'] = (process.platform === 'win32') ? 'bottomRight' : 'topRight'
      } else {
        var coords = getActiveDisplayCoords(bounds, size)
        bounds.x = coords.x
        bounds.y = coords.y
      }

      cachedBounds = bounds
      showWindow(cachedBounds)
    }

    function createWindow () {
      menubar.emit('create-window')
      var defaults = {
        show: false,
        frame: false
      }

      var winOpts = extend(defaults, opts)
      menubar.window = new BrowserWindow(winOpts)

      menubar.positioner = new Positioner(menubar.window)

      if (!opts['always-on-top']) {
        menubar.window.on('blur', hideWindow)
      }

      if (opts['show-on-all-workspaces'] !== false) {
        menubar.window.setVisibleOnAllWorkspaces(true)
      }

      menubar.window.loadUrl(opts.index, {
        userAgent: opts.userAgent
      })
      menubar.emit('after-create-window')
    }

    function showWindow (trayPos) {
      if (!menubar.window) {
        createWindow()
      }

      menubar.emit('show')
      var position = menubar.positioner.calculate(opts['window-position'], trayPos)

      var x = (opts.x !== undefined) ? opts.x : position.x
      var y = (opts.y !== undefined) ? opts.y : position.y

      menubar.window.setPosition(x, y)
      menubar.window.show()
      menubar.emit('after-show')
      return
    }

    function hideWindow () {
      if (!menubar.window) return
      menubar.emit('hide')
      menubar.window.hide()
      menubar.emit('after-hide')
    }
  }
}
