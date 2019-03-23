import { Tray } from 'electron';

export interface Options {
  /**
   * If true, the window will not hide on blur.
   */
  alwaysOnTop?: boolean;
  /**
   * The app source directory.
   */
  dir: string;
  /**
   * Window height.
   */
  height: number;
  /**
   * The png icon to use for the menubar. A good size to start with is 20x20.
   * To support retina, supply a 2x sized image (e.g. 40x40) with @2x added to
   * the end of the name, so icon.png and icon@2x.png and Electron will
   * automatically use your @2x version on retina screens.
   */
  icon?: string;
  /**
   * The html to load for the pop up window.
   */
  index: string;
  /**
   * Create BrowserWindow instance before it is used -- increasing resource
   * usage, but making the click on the menubar load faster.
   */
  preloadWindow?: boolean;
  /**
   * Configure the visibility of the application dock icon.
   */
  showDockIcon: boolean;
  /**
   * Makes the window available on all OS X workspaces.
   */
  showOnAllWorkspaces?: boolean;
  /**
   * Show the window on 'right-click' event instead of regular 'click'.
   */
  showOnRightClick?: boolean;
  /**
   * Menubar tray icon tooltip text.
   */
  tooltip: string;
  /**
   * An electron Tray instance. If provided, `options.icon` will be ignored.
   */
  tray?: Tray;
  /**
   * the x position of the window.
   */
  x?: number;
  /**
   * Sets the window position (x and y will still override this), check
   * electron-positioner docs for valid values.
   */
  windowPosition:
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
   */
  width: number;
  /**
   * the x position of the window.
   */
  y?: number;
}
