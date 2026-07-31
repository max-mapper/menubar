import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import { BrowserWindow, Tray } from 'electron';
import Positioner from 'electron-positioner';

import type { Options } from './types';
import { cleanOptions } from './util/cleanOptions';
import { getWindowPosition } from './util/getWindowPosition';

/**
 * The main Menubar class.
 *
 * @noInheritDoc
 */
export class Menubar extends EventEmitter {
  private _app: Electron.App;
  private _browserWindow?: BrowserWindow;
  private _blurTimeout: NodeJS.Timeout | null = null; // track blur events with timeout
  private _defaultClickEvent?: 'click' | 'right-click';
  private _isDestroyed: boolean;
  private _isVisible: boolean; // track visibility
  private _cachedBounds?: Electron.Rectangle; // _cachedBounds are needed for double-clicked event
  private _options: Options;
  private _positioner: Positioner | undefined;
  private _tray?: Tray;

  private readonly _appReadyHandler = (): void => {
    if (this._isDestroyed) {
      return;
    }
    this.appReady().catch((err) => console.error('menubar: ', err));
  };

  private readonly _appActivateHandler = (
    _event: Electron.Event,
    hasVisibleWindows: boolean,
  ): void => {
    if (!this._isDestroyed && !hasVisibleWindows) {
      this.showWindow().catch(console.error);
    }
  };

  private readonly _trayClickHandler = (
    event?: Electron.KeyboardEvent,
    bounds?: Electron.Rectangle,
  ): void => {
    if (!this._isDestroyed) {
      this.clicked(event, bounds).catch(console.error);
    }
  };

  constructor(app: Electron.App, options?: Partial<Options>) {
    super();
    this._app = app;
    this._options = cleanOptions(options);
    this._isDestroyed = false;
    this._isVisible = false;

    if (app.isReady()) {
      // See https://github.com/maxogden/menubar/pull/151
      process.nextTick(this._appReadyHandler);
    } else {
      app.on('ready', this._appReadyHandler);
    }
  }

  /**
   * The Electron [App](https://electronjs.org/docs/api/app)
   * instance.
   */
  get app(): Electron.App {
    return this._app;
  }

  /**
   * The [electron-positioner](https://github.com/jenslind/electron-positioner)
   * instance.
   */
  get positioner(): Positioner {
    if (!this._positioner) {
      throw new Error(
        'Please access `this.positioner` after the `after-create-window` event has fired.',
      );
    }

    return this._positioner;
  }

  /**
   * The Electron [Tray](https://electronjs.org/docs/api/tray) instance.
   */
  get tray(): Tray {
    if (!this._tray) {
      throw new Error(
        'Please access `this.tray` after the `ready` event has fired.',
      );
    }

    return this._tray;
  }

  /**
   * The Electron [BrowserWindow](https://electronjs.org/docs/api/browser-window)
   * instance, if it's present.
   */
  get window(): BrowserWindow | undefined {
    return this._browserWindow;
  }

  /**
   * Tear down the menubar instance and release the resources it owns.
   *
   * Calling this method more than once has no effect. A tray supplied through
   * {@link Options.tray} is detached but not destroyed.
   */
  destroy(): void {
    if (this._isDestroyed) {
      return;
    }
    this._isDestroyed = true;

    if (this._blurTimeout) {
      clearTimeout(this._blurTimeout);
      this._blurTimeout = null;
    }

    if (this._browserWindow) {
      if (!this._browserWindow.isDestroyed()) {
        this._browserWindow.destroy();
      }
      this._browserWindow = undefined;
    }

    if (this._tray) {
      if (this._defaultClickEvent) {
        this._tray.removeListener(
          this._defaultClickEvent as Parameters<Tray['on']>[0],
          this._trayClickHandler,
        );
      }
      this._tray.removeListener('double-click', this._trayClickHandler);
      if (!this._options.tray && !this._tray.isDestroyed()) {
        this._tray.destroy();
      }
      this._tray = undefined;
    }

    this._app.removeListener('ready', this._appReadyHandler);
    this._app.removeListener('activate', this._appActivateHandler);
    this._cachedBounds = undefined;
    this._isVisible = false;
    this._positioner = undefined;
  }

  /**
   * Whether {@link destroy} has been called on this menubar instance.
   */
  isDestroyed(): boolean {
    return this._isDestroyed;
  }

  /**
   * Retrieve a menubar option.
   *
   * @param key - The option key to retrieve, see {@link Options}.
   */
  getOption<K extends keyof Options>(key: K): Options[K] {
    return this._options[key];
  }

  /**
   * Hide the menubar window.
   */
  hideWindow(): void {
    if (!this._browserWindow || !this._isVisible) {
      return;
    }
    this.emit('hide');
    this._browserWindow.hide();
    this.emit('after-hide');
    this._isVisible = false;
    if (this._blurTimeout) {
      clearTimeout(this._blurTimeout);
      this._blurTimeout = null;
    }
  }

  /**
   * Change an option after menubar is created.
   *
   * @param key - The option key to modify, see {@link Options}.
   * @param value - The value to set.
   */
  setOption<K extends keyof Options>(key: K, value: Options[K]): void {
    this._options[key] = value;
  }

  /**
   * Show the menubar window.
   *
   * @param trayPos - The bounds to show the window in.
   */
  async showWindow(trayPos?: Electron.Rectangle): Promise<void> {
    if (this._isDestroyed) {
      return;
    }
    if (!this.tray) {
      throw new Error('Tray should have been instantiated by now');
    }

    if (!this._browserWindow) {
      await this.createWindow();
    }

    // Use guard for TypeScript, to avoid ! everywhere
    if (!this._browserWindow) {
      throw new Error('Window has been initialized just above. qed.');
    }

    // 'Windows' taskbar: sync windows position each time before showing
    // https://github.com/maxogden/menubar/issues/232
    if (['win32', 'linux'].includes(process.platform)) {
      // Fill in this._options.windowPosition when taskbar position is available
      this._options.windowPosition = getWindowPosition(this.tray);
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
    let noBoundsPosition: Options['windowPosition'];
    if (
      (trayPos === undefined || trayPos.x === 0) &&
      this._options.windowPosition &&
      this._options.windowPosition.startsWith('tray')
    ) {
      noBoundsPosition =
        process.platform === 'win32' ? 'bottomRight' : 'topRight';
    }

    const position = this.positioner.calculate(
      this._options.windowPosition || noBoundsPosition,
      trayPos,
    ) as { x: number; y: number };

    // Not using `||` because x and y can be zero.
    const x =
      this._options.browserWindow.x !== undefined
        ? this._options.browserWindow.x
        : position.x;
    const y =
      this._options.browserWindow.y !== undefined
        ? this._options.browserWindow.y
        : position.y;

    // `.setPosition` crashed on non-integers
    // https://github.com/maxogden/menubar/issues/233
    this._browserWindow.setPosition(Math.round(x), Math.round(y));
    this._browserWindow.show();
    this._isVisible = true;
    this.emit('after-show');
    return;
  }

  private async appReady(): Promise<void> {
    if (this._isDestroyed) {
      return;
    }
    if (this.app.dock && !this._options.showDockIcon) {
      this.app.dock.hide();
    }

    if (this._options.activateWithApp) {
      this.app.on('activate', this._appActivateHandler);
    }

    let trayImage =
      this._options.icon || path.join(this._options.dir, 'IconTemplate.png');
    if (typeof trayImage === 'string' && !fs.existsSync(trayImage)) {
      trayImage = path.join(__dirname, '..', 'assets', 'IconTemplate.png'); // Default cat icon
    }

    this._defaultClickEvent = this._options.showOnRightClick
      ? 'right-click'
      : 'click';

    this._tray = this._options.tray || new Tray(trayImage);
    // Type guards for TS not to complain
    if (!this.tray) {
      throw new Error('Tray has been initialized above');
    }
    this.tray.on(
      this._defaultClickEvent as Parameters<Tray['on']>[0],
      this._trayClickHandler,
    );
    this.tray.on('double-click', this._trayClickHandler);
    this.tray.setToolTip(this._options.tooltip);

    if (!this._options.windowPosition) {
      this._options.windowPosition = getWindowPosition(this.tray);
    }

    if (this._options.preloadWindow) {
      await this.createWindow();
    }

    if (this._isDestroyed) {
      return;
    }
    this.emit('ready');
  }

  /**
   * Callback on tray icon click or double-click.
   *
   * @param e
   * @param bounds
   */
  private async clicked(
    event?: Electron.KeyboardEvent,
    bounds?: Electron.Rectangle,
  ): Promise<void> {
    if (event && (event.shiftKey || event.ctrlKey || event.metaKey)) {
      return this.hideWindow();
    }

    // if blur was invoked clear timeout
    if (this._blurTimeout) {
      clearInterval(this._blurTimeout);
    }

    if (this._browserWindow && this._isVisible) {
      return this.hideWindow();
    }

    this._cachedBounds = bounds || this._cachedBounds;
    await this.showWindow(this._cachedBounds);
  }

  private async createWindow(): Promise<void> {
    this.emit('create-window');

    // We add some default behavior for menubar's browserWindow, to make it
    // look like a menubar
    const defaults = {
      show: false, // Don't show it at first
      frame: false, // Remove window frame
    };

    this._browserWindow = new BrowserWindow({
      ...defaults,
      ...this._options.browserWindow,
    });

    this._positioner = new Positioner(this._browserWindow);

    this._browserWindow.on('blur', () => {
      if (!this._browserWindow) {
        return;
      }

      // hack to close if icon clicked when open
      this._browserWindow.isAlwaysOnTop()
        ? this.emit('focus-lost')
        : (this._blurTimeout = setTimeout(() => {
            this.hideWindow();
          }, 100));
    });

    if (this._options.showOnAllWorkspaces !== false) {
      // https://github.com/electron/electron/issues/37832#issuecomment-1497882944
      this._browserWindow.setVisibleOnAllWorkspaces(true, {
        skipTransformProcessType: true, // Avoid damaging the original visible state of app.dock
      });
    }

    this._browserWindow.on('closed', this.windowClear.bind(this));

    this.emit('before-load');

    // If the user explicity set options.index to false, we don't loadURL
    // https://github.com/maxogden/menubar/issues/255
    if (this._options.index !== false) {
      await this._browserWindow.loadURL(
        this._options.index,
        this._options.loadUrlOptions,
      );
    }
    this.emit('after-create-window');
  }

  private windowClear(): void {
    this._browserWindow = undefined;
    this.emit('after-close');
  }
}
