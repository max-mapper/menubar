/**
 * Utilities to get taskbar position and consequently menubar's position
 */

/** */

import { Tray } from 'electron';

type TaskbarLocation = 'top' | 'bottom' | 'left' | 'right';

/**
 * Determine taskbard location: "top", "bottom", "left" or "right".
 *
 * Only tested on Windows for now, and only used in Windows.
 *
 * @param tray - The Electron Tray instance.
 */
export function taskbarLocation(tray: Tray): TaskbarLocation {
	const trayBounds = tray.getBounds();

	// Determine taskbar location
	if (trayBounds.width !== trayBounds.height && trayBounds.y === 0) {
		return 'top';
	}
	if (trayBounds.width !== trayBounds.height && trayBounds.y > 0) {
		return 'bottom';
	}
	if (trayBounds.width === trayBounds.height && trayBounds.x < trayBounds.y) {
		return 'left';
	}
	if (trayBounds.width === trayBounds.height && trayBounds.x > trayBounds.y) {
		return 'right';
	}

	// By default, return 'bottom'
	return 'bottom';
}

type WindowPosition =
	| 'trayCenter'
	| 'topRight'
	| 'trayBottomCenter'
	| 'trayBottomLeft'
	| 'bottomRight';

/**
 * Depending on where the taskbar is, determine where the window should be
 * positioned.
 *
 * @param tray - The Electron Tray instance.
 */
export function getWindowPosition(tray: Tray): WindowPosition {
	switch (process.platform) {
		// macOS
		// Supports top taskbars
		case 'darwin':
			return 'trayCenter';
		// Linux
		// Supports top taskbars
		// TODO Support bottom taskbars too https://github.com/maxogden/menubar/issues/123
		case 'linux':
			return 'topRight';
		// Windows
		// Supports top/bottom/left/right taskbar, default bottom
		case 'win32': {
			const traySide = taskbarLocation(tray);

			// Assign position for menubar
			if (traySide === 'top') {
				return 'trayCenter';
			}
			if (traySide === 'bottom') {
				return 'trayBottomCenter';
			}
			if (traySide === 'left') {
				return 'trayBottomLeft';
			}
			if (traySide === 'right') {
				return 'bottomRight';
			}
		}
	}

	// When we really don't know, we just show the menubar on the top-right
	return 'topRight';
}
