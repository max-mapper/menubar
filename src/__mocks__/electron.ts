// https://github.com/electron/electron/issues/3909#issuecomment-190990825

export const MOCK_APP_GETAPPPATH = 'mock.app.getAppPath';

export const app = {
	getAppPath: jest.fn(() => MOCK_APP_GETAPPPATH),
	isReady: (): Promise<void> => Promise.resolve(),
	on: (): void => {
		/* Do nothing */
	},
};

export class BrowserWindow {
	loadURL(): void {
		// Do nothing
	}

	on(): void {
		// Do nothing
	}

	setVisibleOnAllWorkspaces(): void {
		// Do nothing
	}
}

export class Tray {
	on(): void {
		// Do nothing
	}

	setToolTip(): void {
		// Do nothing
	}
}

export class Screen {
	getDisplayMatching(): void {
		// Do nothing
	}
}
