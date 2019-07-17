// https://github.com/electron/electron/issues/3909#issuecomment-190990825

export const MOCK_APP_GETAPPPATH = 'mock.app.getAppPath';

export const app = {
  getAppPath: jest.fn(() => MOCK_APP_GETAPPPATH),
  isReady: () => Promise.resolve()
};

export class BrowserWindow {
  loadURL () {
    // Do nothing
  }

  on () {
    // Do nothing
  }

  setVisibleOnAllWorkspaces () {
    // Do nothing
  }
}

export class Tray {
  on () {
    // Do nothing
  }

  getBounds () {
    return { height: 0, width: 0, x: 0, y: 0 };
  }

  setToolTip () {
    // Do nothing
  }
}
