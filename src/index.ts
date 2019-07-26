import { app } from 'electron';

import { Menubar } from './Menubar';
import { Options } from './types';

export * from './util/getWindowPosition';
export { Menubar };

/**
 * Factory function to create a menubar application instance
 *
 * @param options - Options for creating a menubar application
 */
export function menubar (options?: Partial<Options> | string) {
  return new Menubar(app, options);
}
