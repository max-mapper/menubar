import { app } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { Options } from '../types';

const DEFAULT_WINDOW_HEIGHT = 400;
const DEFAULT_WINDOW_WIDTH = 400;

// Deprecated fields on Options
const DEPRECATED = {
  alwaysOnTop: true,
  height: true,
  width: true,
  x: true,
  y: true
};

/**
 * Take as input some options, and return a sanitized version of it.
 *
 * @param opts - The options to clean.
 * @ignore
 */
export function cleanOptions (opts?: Partial<Options> | string) {
  let options: Partial<Options>;
  if (typeof opts === 'undefined') {
    options = { browserWindow: {}, dir: app.getAppPath() };
  } else if (typeof opts === 'string') {
    options = { browserWindow: {}, dir: opts };
  } else {
    // These 5 fields are deprecated, we don't want them in `options`
    // tslint:disable-next-line
    const { alwaysOnTop, height, width, x, y, ...rest } = opts;
    options = { ...rest };
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

  options.tooltip = options.tooltip || '';

  // `icon`, `preloadWindow`, `showDockIcon`, `showOnAllWorkspaces`,
  // `showOnRightClick` don't need any special treatment

  // Now we take care of `browserWindow`
  if (!options.browserWindow) {
    options.browserWindow = {};
  }

  // Backward-compat
  Object.keys(DEPRECATED).forEach(backwardCompat(opts, options));

  // Set width/height on options to be usable before the window is created
  options.browserWindow.width =
    options.browserWindow.width !== undefined
      ? options.browserWindow.width
      : DEFAULT_WINDOW_WIDTH;
  options.browserWindow.height =
    options.browserWindow.height !== undefined
      ? options.browserWindow.height
      : DEFAULT_WINDOW_HEIGHT;

  return options as Options;
}

/**
 * Helper function to deal with backwards-compatibility of the following fields:
 * x, y, height, width, alwaysOnTop
 */
function backwardCompat (
  opts: Partial<Options> | string | undefined,
  options: Partial<Options>
) {
  return function (field: string) {
    if (opts === undefined || typeof opts === 'string') {
      return;
    }

    const _field = field as keyof typeof DEPRECATED;
    if (opts[_field]) {
      console.warn(
        `Passing 'options.${field}' is deprecated, please use 'options.browserWindow.${field}'`
      );
      options.browserWindow![_field] =
        opts.browserWindow && opts.browserWindow[_field] !== undefined
          ? opts.browserWindow[_field]
          : opts[_field];
    }
  };
}
