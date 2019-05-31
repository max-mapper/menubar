// https://github.com/electron/electron/issues/3909#issuecomment-190990825

export const MOCK_APP_GETAPPPATH = 'mock.app.getAppPath';

export const app = {
  getAppPath: jest.fn(() => MOCK_APP_GETAPPPATH)
};
