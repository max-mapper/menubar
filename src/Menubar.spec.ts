import { app, BrowserWindow, Tray } from 'electron';

import { Menubar } from './Menubar';

describe('Menubar', () => {
  let mb: Menubar | undefined;

  beforeEach(() => {
    mb = new Menubar(app, { preloadWindow: true });
  });

  it('should have property `app`', () => {
    expect(mb!.app).toBeDefined();
  });

  it('should have property `positioner`', () => {
    expect(() => mb!.positioner as unknown).toThrow();
    return new Promise<void>((resolve) => {
      mb!.on('after-create-window', () => {
        expect(mb!.positioner).toBeDefined();
        resolve();
      });
    });
  });

  it('should have property `tray`', () => {
    expect(() => mb!.tray).toThrow();
    return new Promise<void>((resolve) => {
      mb!.on('ready', () => {
        expect(mb!.tray).toBeInstanceOf(Tray);
        resolve();
      });
    });
  });

  it('should have property `window`', () => {
    expect(mb!.window).toBeUndefined();
    return new Promise<void>((resolve) => {
      mb!.on('ready', () => {
        expect(mb!.window).toBeInstanceOf(BrowserWindow);
        resolve();
      });
    });
  });

  it('destroys its window, owned tray, and registered listeners', () => {
    return new Promise<void>((resolve) => {
      mb!.on('ready', () => {
        const tray = mb!.tray;
        const window = mb!.window!;

        mb!.destroy();

        expect(window.on).toHaveBeenCalledWith(
          'closed',
          expect.any(Function),
        );
        expect(window.destroy).toHaveBeenCalledTimes(1);
        expect(tray.removeListener).toHaveBeenCalledWith(
          'click',
          expect.any(Function),
        );
        expect(tray.removeListener).toHaveBeenCalledWith(
          'double-click',
          expect.any(Function),
        );
        expect(tray.destroy).toHaveBeenCalledTimes(1);
        expect(app.removeListener).toHaveBeenCalledWith(
          'activate',
          expect.any(Function),
        );
        expect(mb!.window).toBeUndefined();
        expect(() => mb!.tray).toThrow();
        expect(mb!.isDestroyed()).toBe(true);
        resolve();
      });
    });
  });

  it('does not destroy a tray supplied by the caller', () => {
    const tray = new Tray('');
    const externalTrayMenubar = new Menubar(app, {
      preloadWindow: true,
      tray,
    });

    return new Promise<void>((resolve) => {
      externalTrayMenubar.on('ready', () => {
        externalTrayMenubar.destroy();

        expect(tray.removeListener).toHaveBeenCalled();
        expect(tray.destroy).not.toHaveBeenCalled();
        resolve();
      });
    });
  });

  it('can be destroyed more than once', () => {
    return new Promise<void>((resolve) => {
      mb!.on('ready', () => {
        const tray = mb!.tray;

        mb!.destroy();
        mb!.destroy();

        expect(tray.destroy).toHaveBeenCalledTimes(1);
        expect(mb!.isDestroyed()).toBe(true);
        resolve();
      });
    });
  });

});
