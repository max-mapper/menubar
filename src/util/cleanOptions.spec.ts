import * as path from 'path';

import { MOCK_APP_GETAPPPATH } from '../__mocks__/electron';
import { cleanOptions } from './cleanOptions';

const DEFAULT_OPTIONS = {
  dir: path.resolve(MOCK_APP_GETAPPPATH),
  height: 400,
  index: `file://${path.join(path.resolve(MOCK_APP_GETAPPPATH), 'index.html')}`,
  showDockIcon: false,
  tooltip: '',
  width: 400,
  windowPosition: 'trayCenter'
};

describe('cleanOptions', () => {
  it('should handle undefined', () => {
    expect(cleanOptions(undefined)).toEqual(DEFAULT_OPTIONS);
  });

  it('should handle a string', () => {
    expect(cleanOptions('MY_CUSTOM_PATH')).toEqual({
      ...DEFAULT_OPTIONS,
      dir: path.resolve('MY_CUSTOM_PATH'),
      index: `file://${path.join(path.resolve('MY_CUSTOM_PATH'), 'index.html')}`
    });
  });

  it('should handle an object', () => {
    expect(
      cleanOptions({
        height: 100,
        showDockIcon: true,
        windowPosition: 'trayCenter'
      })
    ).toEqual({
      ...DEFAULT_OPTIONS,
      height: 100,
      showDockIcon: true,
      windowPosition: 'trayCenter'
    });
  });
});
