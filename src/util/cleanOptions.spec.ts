import * as path from 'path';

import { MOCK_APP_GETAPPPATH } from '../__mocks__/electron';
import { cleanOptions } from './cleanOptions';

const DEFAULT_OPTIONS = {
	browserWindow: {
		height: 400,
		width: 400,
	},
	dir: path.resolve(MOCK_APP_GETAPPPATH),
	index: `file://${path.join(
		path.resolve(MOCK_APP_GETAPPPATH),
		'index.html'
	)}`,
	loadUrlOptions: {},
	tooltip: '',
};

describe('cleanOptions', () => {
	it('should handle undefined', () => {
		expect(cleanOptions(undefined)).toEqual(DEFAULT_OPTIONS);
	});

	it('should handle a dir string with relative path', () => {
		expect(cleanOptions({ dir: 'MY_RELATIVE_PATH' })).toEqual({
			...DEFAULT_OPTIONS,
			dir: path.resolve('MY_RELATIVE_PATH'),
			index: `file://${path.join(
				path.resolve('MY_RELATIVE_PATH'),
				'index.html'
			)}`,
		});
	});

	it('should handle a dir string with absolute path', () => {
		expect(cleanOptions({ dir: '/home/me/MY_ABSOLUTE_PATH' })).toEqual({
			...DEFAULT_OPTIONS,
			dir: '/home/me/MY_ABSOLUTE_PATH',
			index: 'file:///home/me/MY_ABSOLUTE_PATH/index.html',
		});
	});

	it('should handle a false index', () => {
		expect(cleanOptions({ index: false })).toEqual({
			...DEFAULT_OPTIONS,
			index: false,
		});
	});

	it('should handle an object with multiple fields', () => {
		expect(
			cleanOptions({
				browserWindow: {
					height: 100,
				},
				index: 'file:///home/abc/index.html',
				showDockIcon: true,
				windowPosition: 'trayCenter',
			})
		).toEqual({
			...DEFAULT_OPTIONS,
			browserWindow: {
				...DEFAULT_OPTIONS.browserWindow,
				height: 100,
			},
			index: 'file:///home/abc/index.html',
			showDockIcon: true,
			windowPosition: 'trayCenter',
		});
	});
});
