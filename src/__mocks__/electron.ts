// https://github.com/electron/electron/issues/3909#issuecomment-190990825

export const MOCK_APP_GETAPPPATH = 'mock.app.getAppPath';

export const app = {
  getAppPath: jest.fn(() => MOCK_APP_GETAPPPATH),
  isReady: jest.fn(() => true),
  on: jest.fn(),
  removeListener: jest.fn(),
};

export class BrowserWindow {
  destroy = jest.fn();
  hide = jest.fn();
  isAlwaysOnTop = jest.fn(() => false);
  isDestroyed = jest.fn(() => false);
  loadURL = jest.fn(() => Promise.resolve());
  on = jest.fn();
  setPosition = jest.fn();
  setVisibleOnAllWorkspaces = jest.fn();
  show = jest.fn();
}

export const screen = {
  getDisplayMatching: jest.fn(() => ({
    bounds: { height: 1080, width: 1920, x: 0, y: 0 },
    workArea: { height: 1040, width: 1920, x: 0, y: 0 },
  })),
};

export class Tray {
  destroy = jest.fn();
  getBounds = jest.fn(() => ({ height: 24, width: 24, x: 0, y: 0 }));
  isDestroyed = jest.fn(() => false);
  on = jest.fn();
  removeListener = jest.fn();
  setToolTip = jest.fn();
}
