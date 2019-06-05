import { app } from 'electron';

import { Menubar } from './Menubar';
import { Options } from './types';

export { Menubar };

export function menubar (options?: Partial<Options> | string) {
  return new Menubar(app, options);
}
