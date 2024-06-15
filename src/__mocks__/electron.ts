// https://github.com/electron/electron/issues/3909#issuecomment-190990825

import { Display, Rectangle } from "electron";

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
	getDisplayMatching(rect: Rectangle): Display {
		return {
			id: 1,
			bounds: { x: 0, y: 0, width: 1920, height: 1080 },
			workArea: { x: 0, y: 0, width: 1920, height: 1040 },
			scaleFactor: 1,
			rotation: 0,
			touchSupport: 'unknown',
		} as Display;
	}
}
