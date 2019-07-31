import { Tray, BrowserWindow } from 'electron';
import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as Positioner from 'electron-positioner';

import { cleanOptions } from './util/cleanOptions';
import { getWindowPosition } from './util/getWindowPosition';
import { Options } from './types';

/**
 * The main Menubar class.
 *
 * @noInheritDoc
 */
export class Menubar extends EventEmitter {
  private _app: Electron.App;
  private _browserWindow?: BrowserWindow;
  private _cachedBounds?: Electron.Rectangle; // _cachedBounds are needed for double-clicked event
  private _options: Options;
  private _positioner: any; // TODO https://github.com/jenslind/electron-positioner/issues/15
  private _supportsTrayHighlightState = false;
  private _tray?: Tray;

  constructor (app: Electron.App, options?: Partial<Options> | string) {
    super();
    this._app = app;
    this._options = cleanOptions(options);

    if (app.isReady()) {
      // See https://github.com/maxogden/menubar/pull/151
      process.nextTick(() =>
        this.appReady().catch(err => console.error('menubar: ', err))
      );
    } else {
      app.on('ready', () =>
        this.appReady().catch(err => console.error('menubar: ', err))
      );
    }
  }

  /**
   * The Electron [App](https://electronjs.org/docs/api/app)
   * instance.
   */
  get app () {
    return this._app;
  }

  /**
   * The [electron-positioner](https://github.com/jenslind/electron-positioner)
   * instance.
   */
  get positioner () {
    if (!this._positioner) {
      throw new Error(
        'Please access `this.positioner` after the `after-create-window` event has fired.'
      );
    }

    return this._positioner;
  }

  /**
   * The Electron [Tray](https://electronjs.org/docs/api/tray) instance.
   */
  get tray () {
    if (!this._tray) {
      throw new Error(
        'Please access `this.tray` after the `ready` event has fired.'
      );
    }

    return this._tray;
  }

  /**
   * The Electron [BrowserWindow](https://electronjs.org/docs/api/browser-window)
   * instance, if it's present.
   */
  get window () {
    return this._browserWindow;
  }

  /**
   * Retrieve a menubar option.
   *
   * @param key - The option key to retrieve, see {@link Options}.
   */
  getOption (key: keyof Options) {
    return this._options[key];
  }

  /**
   * Hide the menubar window.
   */
  hideWindow () {
    if (this._supportsTrayHighlightState) {
      this.tray.setHighlightMode('never');
    }
    if (!this._browserWindow || !this._browserWindow.isVisible()) {
      return;
    }

    this.emit('hide');
    this._browserWindow.hide();
    this.emit('after-hide');
  }

  /**
   * Change an option after menubar is created.
   *
   * @param key - The option key to modify, see {@link Options}.
   * @param value - The value to set.
   */
  setOption (key: keyof Options, value: any) {
    this._options[key] = value;
  }

  /**
   * Show the menubar window.
   *
   * @param trayPos - The bounds to show the window in.
   */
  async showWindow (trayPos?: Electron.Rectangle) {
    if (!this.tray) {
      throw new Error('Tray should have been instantiated by now');
    }

    if (this._supportsTrayHighlightState) {
      this.tray.setHighlightMode('always');
    }
    if (!this._browserWindow) {
      await this.createWindow();
    }

    // Use guard for TypeScript, to avoid ! everywhere
    if (!this._browserWindow) {
      throw new Error('Window has been initialized just above. qed.');
    }

    this.emit('show');

    if (trayPos && trayPos.x !== 0) {
      // Cache the bounds
      this._cachedBounds = trayPos;
    } else if (this._cachedBounds) {
      // Cached value will be used if showWindow is called without bounds data
      trayPos = this._cachedBounds;
    } else if (this.tray.getBounds) {
      // Get the current tray bounds
      trayPos = this.tray.getBounds();
    }

    // Default the window to the right if `trayPos` bounds are undefined or null.
    let noBoundsPosition = null;
    if (
      (trayPos === undefined || trayPos.x === 0) &&
      this._options.windowPosition &&
      this._options.windowPosition.startsWith('tray')
    ) {
      noBoundsPosition =
        process.platform === 'win32' ? 'bottomRight' : 'topRight';
    }

    const position = this.positioner.calculate(
      noBoundsPosition || this._options.windowPosition,
      trayPos
    ) as { x: number; y: number };

    // Not using `||` because x and y can be zero.
    const x =
      this._options.browserWindow.x !== undefined
        ? this._options.browserWindow.x
        : position.x;
    let y =
      this._options.browserWindow.y !== undefined
        ? this._options.browserWindow.y
        : position.y;

    // Multi-Taskbar: optimize vertical position
    // https://github.com/maxogden/menubar/pull/217
    if (process.platform === 'win32') {
      if (
        trayPos &&
        this._options.windowPosition &&
        this._options.windowPosition.startsWith('bottom')
      ) {
        y =
          trayPos.y +
          trayPos.height / 2 -
          this._browserWindow.getBounds().height / 2;
      }
    }

    // `.setPosition` crashed on non-integers
    // https://github.com/maxogden/menubar/issues/233
    this._browserWindow.setPosition(Math.round(x), Math.round(y));
    this._browserWindow.show();
    this.emit('after-show');
    return;
  }

  private async appReady () {
    if (this.app.dock && !this._options.showDockIcon) {
      this.app.dock.hide();
    }

    let trayImage =
      this._options.icon || path.join(this._options.dir, 'IconTemplate.png');
    if (typeof trayImage === 'string' && !fs.existsSync(trayImage)) {
      trayImage = path.join(__dirname, '..', 'assets', 'IconTemplate.png'); // Default cat icon
    }

    const defaultClickEvent = this._options.showOnRightClick
      ? 'right-click'
      : 'click';

    this._tray = this._options.tray || new Tray(trayImage);
    // Type guards for TS not to complain
    if (!this.tray) {
      throw new Error('Tray has been initialized above');
    }
    this.tray.on(defaultClickEvent as any, this.clicked.bind(this));
    this.tray.on('double-click', this.clicked.bind(this));
    this.tray.setToolTip(this._options.tooltip);

    if (!this._options.windowPosition) {
      // Fill in this._options.windowPosition when taskbar position is available
      this._options.windowPosition = getWindowPosition(this.tray);
    }

    try {
      this.tray.setHighlightMode('never');
      this._supportsTrayHighlightState = true;
    } catch (e) {
      /* Do nothing */
    }

    if (this._options.preloadWindow) {
      await this.createWindow();
    }

    this.emit('ready');
  }

  /**
   * Callback on tray icon click or double-click.
   *
   * @param e
   * @param bounds
   */
  private async clicked (
    event: Electron.KeyboardEvent,
    bounds: Electron.Rectangle
  ) {
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
      return this.hideWindow();
    }
    if (this._browserWindow && this._browserWindow.isVisible()) {
      return this.hideWindow();
    }

    this._cachedBounds = bounds || this._cachedBounds;
    await this.showWindow(this._cachedBounds);
  }

  private async createWindow () {
    this.emit('create-window');

    // We add some default behavior for menubar's browserWindow
    const defaults = {
      show: false, // Don't show it at first
      frame: false // Remove window frame
    };

    this._browserWindow =
      this._options.browserWindow instanceof BrowserWindow
        ? this._options.browserWindow
        : new BrowserWindow({
          ...defaults,
          ...this._options.browserWindow,
            // For backward-compat, we keep allowing user doing e.g.:
            // `new Menubar({ nodeIntegration: true })`
            // and Menubar will pass down `nodeIntegration` to the BrowserWindow
            // constructor. But we should remove this.
          ...this._options
        });

    this._positioner = new Positioner(this._browserWindow);

    this._browserWindow.on('blur', () => {
      if (!this._browserWindow) {
        return;
      }

      this._browserWindow.isAlwaysOnTop()
        ? this.emit('focus-lost')
        : this.hideWindow();
    });

    if (this._options.showOnAllWorkspaces !== false) {
      this._browserWindow.setVisibleOnAllWorkspaces(true);
    }

    this._browserWindow.on('close', this.windowClear.bind(this));
    await this._browserWindow.loadURL(this._options.index);
    this.emit('after-create-window');
  }

  private windowClear () {
    this._browserWindow = undefined;
    this.emit('after-close');
  }
}
