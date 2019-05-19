import { app, Tray, BrowserWindow } from 'electron';
import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as Positioner from 'electron-positioner';

import { cleanOptions } from './util/cleanOptions';
import { Options } from './types';

/**
 * The main Menubar class. Menubar is an EventEmitter.
 */
export class Menubar extends EventEmitter {
  /**
   * The Electron app instance.
   * @see https://electronjs.org/docs/api/app
   */
  public app: Electron.App;
  /**
   * The electron BrowserWindow instance.
   * @see https://electronjs.org/docs/api/browser-window
   */
  public browserWindow?: BrowserWindow;
  private cachedBounds?: Electron.Rectangle; // cachedBounds are needed for double-clicked event
  private options: Options;
  /**
   * The electron-positioner instance.
   * @see https://github.com/jenslind/electron-positioner
   */
  public positioner: any; // TODO https://github.com/jenslind/electron-positioner/issues/15
  private supportsTrayHighlightState = false;
  /**
   * The Electron Tray instance.
   * @see https://electronjs.org/docs/api/tray
   */
  public tray?: Tray;

  constructor (app: Electron.App, options?: Partial<Options> | string) {
    super();
    this.app = app;
    this.options = cleanOptions(options);

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
   * Retrieve a menubar option.
   *
   * @param key - The option key to retrieve.
   */
  getOption (key: keyof Options) {
    return this.options[key];
  }

  /**
   * Hide the menubar window.
   */
  hideWindow () {
    if (this.supportsTrayHighlightState) {
      this.tray!.setHighlightMode('never');
    }
    if (!this.browserWindow) {
      return;
    }

    this.emit('hide');
    this.browserWindow.hide();
    this.emit('after-hide');
  }

  /**
   * Change an option after menubar is created.
   *
   * @param key - The option key to modify.
   * @param value - The value to set.
   */
  setOption (key: keyof Options, value: any) {
    this.options[key] = value;
  }

  /**
   * Show the menubar window.
   *
   * @param trayPos - The bounds to show the window in.
   */
  private async showWindow (trayPos?: Electron.Rectangle) {
    if (!this.tray) {
      throw new Error('Tray should have been instantiated by now');
    }

    if (this.supportsTrayHighlightState) {
      this.tray.setHighlightMode('always');
    }
    if (!this.browserWindow) {
      await this.createWindow();
    }

    // Use guard for TypeScript, to avoid ! everywhere
    if (!this.browserWindow) {
      throw new Error('Window has been initialized just above. qed.');
    }

    this.emit('show');

    if (trayPos && trayPos.x !== 0) {
      // Cache the bounds
      this.cachedBounds = trayPos;
    } else if (this.cachedBounds) {
      // Cached value will be used if showWindow is called without bounds data
      trayPos = this.cachedBounds;
    } else if (this.tray.getBounds) {
      // Get the current tray bounds
      trayPos = this.tray.getBounds();
    }

    // Default the window to the right if `trayPos` bounds are undefined or null.
    let noBoundsPosition = null;
    if (
      (trayPos === undefined || trayPos.x === 0) &&
      this.options.windowPosition.substr(0, 4) === 'tray'
    ) {
      noBoundsPosition =
        process.platform === 'win32' ? 'bottomRight' : 'topRight';
    }

    const position = this.positioner.calculate(
      noBoundsPosition || this.options.windowPosition,
      trayPos
    ) as { x: number; y: number };

    // Not using `||` because x and y can be zero.
    const x =
      this.options.browserWindow.x !== undefined
        ? this.options.browserWindow.x
        : position.x;
    const y =
      this.options.browserWindow.y !== undefined
        ? this.options.browserWindow.y
        : position.y;

    this.browserWindow.setPosition(x, y);
    this.browserWindow.show();
    this.emit('after-show');
    return;
  }

  private async appReady () {
    if (app.dock && !this.options.showDockIcon) {
      app.dock.hide();
    }

    let trayImage =
      this.options.icon || path.join(this.options.dir, 'IconTemplate.png');
    if (typeof trayImage === 'string' && !fs.existsSync(trayImage)) {
      trayImage = path.join(__dirname, 'example', 'IconTemplate.png'); // Default cat icon
    }

    const defaultClickEvent = this.options.showOnRightClick
      ? 'right-click'
      : 'click';

    this.tray = this.options.tray || new Tray(trayImage);
    // Type guards for TS not to complain
    if (!this.tray) {
      throw new Error('Tray has been initialized above');
    }
    this.tray.on(defaultClickEvent as any, this.clicked.bind(this));
    this.tray.on('double-click', this.clicked.bind(this));
    this.tray.setToolTip(this.options.tooltip);

    try {
      this.tray.setHighlightMode('never');
      this.supportsTrayHighlightState = true;
    } catch (e) {
      /* Do nothing */
    }

    if (this.options.preloadWindow) {
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
  private async clicked (event: Electron.Event, bounds: Electron.Rectangle) {
    if (event.altKey || event.shiftKey || event.ctrlKey || event.metaKey) {
      return this.hideWindow();
    }
    if (this.browserWindow && this.browserWindow.isVisible()) {
      return this.hideWindow();
    }

    this.cachedBounds = bounds || this.cachedBounds;
    await this.showWindow(this.cachedBounds);
  }

  private async createWindow () {
    this.emit('create-window');

    // We add some default behavior for menubar's browserWindow
    const defaults = {
      show: false, // Don't show it at first
      frame: false // Remove window frame
    };

    this.browserWindow =
      this.options.browserWindow instanceof BrowserWindow
        ? this.options.browserWindow
        : new BrowserWindow({
          ...defaults,
          ...this.options.browserWindow,
            // For backward-compat, we keep allowing user doing e.g.:
            // `new Menubar({ nodeIntegration: true })`
            // and Menubar will pass down `nodeIntegration` to the BrowserWindow
            // constructor. But we should remove this.
            // https://github.com/amaurymartiny/menubar/issues/17
          ...this.options
        });

    this.positioner = new Positioner(this.browserWindow);

    this.browserWindow.on('blur', () => {
      if (!this.browserWindow) {
        return;
      }

      this.browserWindow.isAlwaysOnTop()
        ? this.emit('focus-lost')
        : this.hideWindow();
    });

    if (this.options.showOnAllWorkspaces !== false) {
      this.browserWindow.setVisibleOnAllWorkspaces(true);
    }

    this.browserWindow.on('close', this.windowClear.bind(this));
    await this.browserWindow.loadURL(this.options.index);
    this.emit('after-create-window');
  }

  private windowClear () {
    this.browserWindow = undefined;
    this.emit('after-close');
  }
}

export function menubar (options?: Partial<Options> | string) {
  return new Menubar(app, options);
}
