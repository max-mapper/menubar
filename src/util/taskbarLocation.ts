import { Tray } from 'electron';

/**
 * Determine taskbard location: "top", "bottom", "left" or "right".
 *
 * Only tested on Windows for now, and only used in Windows.
 *
 * @param tray - The Electron Tray instance.
 */
export function taskbarLocation (tray: Tray) {
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
