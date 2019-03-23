import { app } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { Options } from '../types';

const DEFAULT_WINDOW_HEIGHT = 400;
const DEFAULT_WINDOW_WIDTH = 400;

/**
 * Take as input some options, and return a sanitized version of it.
 *
 * @param opts - The options to clean.
 * @ignore
 */
export function cleanOptions (opts?: Partial<Options> | string) {
  let options: Partial<Options>;
  if (typeof opts === 'undefined') {
    options = { dir: app.getAppPath() };
  } else if (typeof opts === 'string') {
    options = { dir: opts };
  } else {
    options = { ...opts };
  }

  if (!options.dir) {
    options.dir = app.getAppPath();
  }
  if (!path.isAbsolute(options.dir)) {
    options.dir = path.resolve(options.dir);
  }
  if (!options.index) {
    options.index = url.format({
      pathname: path.join(options.dir, 'index.html'),
      protocol: 'file:',
      slashes: true
    });
  }
  if (!options.windowPosition) {
    options.windowPosition =
      process.platform === 'win32' ? 'trayBottomCenter' : 'trayCenter';
  }
  if (typeof options.showDockIcon === 'undefined') {
    options.showDockIcon = false;
  }

  // set width/height on opts to be usable before the window is created
  options.width = options.width || DEFAULT_WINDOW_WIDTH;
  options.height = options.height || DEFAULT_WINDOW_HEIGHT;
  options.tooltip = options.tooltip || '';

  return options as Options;
}
