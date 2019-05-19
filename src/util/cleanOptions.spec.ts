import * as path from 'path';

import { MOCK_APP_GETAPPPATH } from '../__mocks__/electron';
import { cleanOptions } from './cleanOptions';

const DEFAULT_OPTIONS = {
  browserWindow: {
    height: 400,
    width: 400
  },
  dir: path.resolve(MOCK_APP_GETAPPPATH),
  index: `file://${path.join(path.resolve(MOCK_APP_GETAPPPATH), 'index.html')}`,
  tooltip: '',
  windowPosition: 'trayCenter'
};

describe('cleanOptions', () => {
  it('should handle undefined', () => {
    expect(cleanOptions(undefined)).toEqual(DEFAULT_OPTIONS);
  });

  it('should handle a string with relative path', () => {
    expect(cleanOptions('MY_RELATIVE_PATH')).toEqual({
      ...DEFAULT_OPTIONS,
      dir: path.resolve('MY_RELATIVE_PATH'),
      index: `file://${path.join(
        path.resolve('MY_RELATIVE_PATH'),
        'index.html'
      )}`
    });
  });

  it('should handle a string with absolute path', () => {
    expect(cleanOptions('/home/me/MY_ABSOLUTE_PATH')).toEqual({
      ...DEFAULT_OPTIONS,
      dir: '/home/me/MY_ABSOLUTE_PATH',
      index: 'file:///home/me/MY_ABSOLUTE_PATH/index.html'
    });
  });

  it('should handle an object', () => {
    expect(
      cleanOptions({
        browserWindow: {
          height: 100
        },
        index: 'file:///home/abc/index.html',
        showDockIcon: true,
        windowPosition: 'trayCenter'
      })
    ).toEqual({
      ...DEFAULT_OPTIONS,
      browserWindow: {
        ...DEFAULT_OPTIONS.browserWindow,
        height: 100
      },
      index: 'file:///home/abc/index.html',
      showDockIcon: true,
      windowPosition: 'trayCenter'
    });
  });

  describe('Backwards compatibility', () => {
    ['height', 'width', 'x', 'y'].forEach(field => {
      it(`should handle options.${field}`, () => {
        console.warn = jest.fn();

        expect(
          cleanOptions({
            [field]: 123
          })
        ).toEqual({
          ...DEFAULT_OPTIONS,
          browserWindow: {
            ...DEFAULT_OPTIONS.browserWindow,
            [field]: 123
          }
        });
        expect(console.warn).toHaveBeenCalledWith(
          `Passing 'options.${field}' is deprecated, please use 'options.browserWindow.${field}'`
        );
      });
    });
  });
});
