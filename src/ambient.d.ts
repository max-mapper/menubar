// TODO https://github.com/jenslind/electron-positioner/issues/15
declare module 'electron-positioner' {
  export default class {
    constructor(window: Electron.BrowserWindow);

    calculate(
      position?: string,
      rectangle?: Electron.Rectangle,
    ): { x: number; y: number };
  }
}
