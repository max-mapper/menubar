/**
 * Entry point of menubar
 * @example
 * ```typescript
 * import { menubar } from 'menubar';
 * ```
 */

/** */

import { app } from 'electron';

import { Menubar } from './Menubar';
import { Options } from './types';

export * from './util/getWindowPosition';
export { Menubar };

/**
 * Factory function to create a menubar application
 *
 * @param options - Options for creating a menubar application, see
 * {@link Options}
 */
export function menubar(options?: Partial<Options>): Menubar {
  return new Menubar(app, options);
}
