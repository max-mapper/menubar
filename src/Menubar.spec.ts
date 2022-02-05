/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { BrowserWindow, Tray, app } from 'electron';

import { Menubar } from './Menubar';

describe('Menubar', () => {
	let mb: Menubar | undefined;

	beforeEach(() => {
		mb = new Menubar(app, { preloadWindow: true });
	});

	it('should have property `app`', () => {
		expect(mb!.app).toBeDefined();
	});

	it('should have property `positioner`', (done) => {
		expect(() => mb!.positioner as unknown).toThrow();
		mb!.on('after-create-window', () => {
			expect(mb!.positioner).toBeDefined();
			done();
		});
	});

	it('should have property `tray`', (done) => {
		expect(() => mb!.tray).toThrow();
		mb!.on('ready', () => {
			expect(mb!.tray).toBeInstanceOf(Tray);
			done();
		});
	});

	it('should have property `window`', (done) => {
		expect(mb!.window).toBeUndefined();
		mb!.on('ready', () => {
			expect(mb!.window).toBeInstanceOf(BrowserWindow);
			done();
		});
	});
});
