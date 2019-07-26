import { BrowserWindowConstructorOptions, Tray } from 'electron';

/**
 * Options for creating a menubar application
 */
export interface Options {
  /**
   * If true, the window will not hide on blur.
   * @deprecated Please pass this option inside `options.browserWindow`.
   */
  alwaysOnTop?: boolean;
  /**
   * An Electron BrowserWindow instance, or an options object to be passed into
   * the BrowserWindow constructor.
   * @example
   * ```typescript
   * const options = { height: 640, width: 480 };
   * const mb = new Menubar({
   *   browserWindow: new BrowserWindow(options)
   * });
   *
   * // The above is equivalent to
   *
   * const options = { height: 640, width: 480 };
   * const mb = new Menubar({
   *   browserWindow: options
   * });
   * ```
   */
  browserWindow: BrowserWindowConstructorOptions;
  /**
   * The app source directory.
   */
  dir: string;
  /**
   * Window height.
   * @deprecated Please pass this option inside `options.browserWindow`.
   */
  height?: number;
  /**
   * The png icon to use for the menubar. A good size to start with is 20x20.
   * To support retina, supply a 2x sized image (e.g. 40x40) with @2x added to
   * the end of the name, so icon.png and icon@2x.png and Electron will
   * automatically use your @2x version on retina screens.
   */
  icon: string | Electron.NativeImage;
  /**
   * The html to load for the pop up window.
   */
  index: string;
  /**
   * Create BrowserWindow instance before it is used -- increasing resource
   * usage, but making the click on the menubar load faster.
   */
  preloadWindow: boolean;
  /**
   * Configure the visibility of the application dock icon, macOS only. Calls
   * [`app.dock.hide`](https://electronjs.org/docs/api/app#appdockhide-macos).
   */
  showDockIcon: boolean;
  /**
   * Makes the window available on all OS X workspaces. Calls
   * [`setVisibleOnAllWorkspaces`](https://electronjs.org/docs/api/browser-window#winsetvisibleonallworkspacesvisible-options).
   */
  showOnAllWorkspaces: boolean;
  /**
   * Show the window on 'right-click' event instead of regular 'click'.
   */
  showOnRightClick: boolean;
  /**
   * Menubar tray icon tooltip text. Calls [`tray.setTooltip`](https://electronjs.org/docs/api/tray#traysettooltiptooltip).
   */
  tooltip: string;
  /**
   * An electron Tray instance. If provided, `options.icon` will be ignored.
   */
  tray: Tray;
  /**
   * Sets the window position (x and y will still override this), check
   * electron-positioner docs for valid values.
   */
  windowPosition?:
    | 'trayLeft'
    | 'trayBottomLeft'
    | 'trayRight'
    | 'trayBottomRight'
    | 'trayCenter'
    | 'trayBottomCenter'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'topCenter'
    | 'bottomCenter'
    | 'leftCenter'
    | 'rightCenter'
    | 'center';
  /**
   * Window width.
   * @deprecated Please pass this option inside `options.browserWindow`.
   */
  width?: number;
  /**
   * The x position of the window.
   * @deprecated Please pass this option inside `options.browserWindow`.
   */
  x?: number;
  /**
   * The x position of the window.
   * @deprecated Please pass this option inside `options.browserWindow`.
   */
  y?: number;
}
