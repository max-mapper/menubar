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
class Menubar extends EventEmitter {
  /**
   * The Electron app instance.
   * @see https://electronjs.org/docs/api/app
   */
  public app: Electron.App;
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
  /**
   * The electron BrowserWindow instance.
   * @see https://electronjs.org/docs/api/browser-window
   */
  public window?: BrowserWindow;

  constructor (app: Electron.App, options: Options) {
    super();
    this.app = app;
    this.options = options;

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
    if (!this.window) {
      return;
    }

    this.emit('hide');
    this.window.hide();
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
    if (!this.window) {
      await this.createWindow();
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
    );

    const x = this.options.x !== undefined ? this.options.x : position.x;
    const y = this.options.y !== undefined ? this.options.y : position.y;

    // Use guard for TypeScript
    if (!this.window) {
      throw new Error('Window has been initialized above');
    }

    this.window.setPosition(x, y);
    this.window.show();
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
    if (this.window && this.window.isVisible()) {
      return this.hideWindow();
    }

    this.cachedBounds = bounds || this.cachedBounds;
    await this.showWindow(this.cachedBounds);
  }

  private async createWindow () {
    this.emit('create-window');
    const defaults = {
      show: false,
      frame: false
    };

    const winOpts = { ...defaults, ...this.options };
    this.window = new BrowserWindow(winOpts);

    this.positioner = new Positioner(this.window);

    this.window.on('blur', () => {
      this.options.alwaysOnTop ? this.emit('focus-lost') : this.hideWindow();
    });

    if (this.options.showOnAllWorkspaces !== false) {
      this.window.setVisibleOnAllWorkspaces(true);
    }

    this.window.on('close', this.windowClear.bind(this));
    await this.window.loadURL(this.options.index);
    this.emit('after-create-window');
  }

  private windowClear () {
    this.window = undefined;
    this.emit('after-close');
  }
}

export function menubar (options?: Options | string) {
  return new Menubar(app, cleanOptions(options));
}
