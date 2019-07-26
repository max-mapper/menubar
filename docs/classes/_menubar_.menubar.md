> **[menubar](../README.md)**

[Globals](../globals.md) / ["Menubar"](../modules/_menubar_.md) / [Menubar](_menubar_.menubar.md) /

# Class: Menubar

The main Menubar class.

## Hierarchy

* `EventEmitter`

  * **Menubar**

## Index

### Constructors

* [constructor](_menubar_.menubar.md#constructor)

### Accessors

* [app](_menubar_.menubar.md#app)
* [positioner](_menubar_.menubar.md#positioner)
* [tray](_menubar_.menubar.md#tray)
* [window](_menubar_.menubar.md#window)

### Methods

* [getOption](_menubar_.menubar.md#getoption)
* [hideWindow](_menubar_.menubar.md#hidewindow)
* [setOption](_menubar_.menubar.md#setoption)
* [showWindow](_menubar_.menubar.md#showwindow)

## Constructors

###  constructor

\+ **new Menubar**(`app`: `App`, `options?`: `Partial<Options>` | string): *[Menubar](_menubar_.menubar.md)*

*Defined in [Menubar.ts:23](https://github.com/maxogden/menubar/blob/e2b8e16/src/Menubar.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`app` | `App` |
`options?` | `Partial<Options>` \| string |

**Returns:** *[Menubar](_menubar_.menubar.md)*

## Accessors

###  app

• **get app**(): *`App`*

*Defined in [Menubar.ts:46](https://github.com/maxogden/menubar/blob/e2b8e16/src/Menubar.ts#L46)*

The Electron [App](https://electronjs.org/docs/api/app)
instance.

**Returns:** *`App`*

___

###  positioner

• **get positioner**(): *any*

*Defined in [Menubar.ts:54](https://github.com/maxogden/menubar/blob/e2b8e16/src/Menubar.ts#L54)*

The [electron-positioner](https://github.com/jenslind/electron-positioner)
instance.

**Returns:** *any*

___

###  tray

• **get tray**(): *`Tray`*

*Defined in [Menubar.ts:67](https://github.com/maxogden/menubar/blob/e2b8e16/src/Menubar.ts#L67)*

The Electron [Tray](https://electronjs.org/docs/api/tray) instance.

**Returns:** *`Tray`*

___

###  window

• **get window**(): *undefined | `BrowserWindow`*

*Defined in [Menubar.ts:81](https://github.com/maxogden/menubar/blob/e2b8e16/src/Menubar.ts#L81)*

The Electron [BrowserWindow](https://electronjs.org/docs/api/browser-window)
instance, if it's present.

**Returns:** *undefined | `BrowserWindow`*

## Methods

###  getOption

▸ **getOption**(`key`: keyof Options): *undefined | string | number | false | true | `BrowserWindowConstructorOptions` | `NativeImage` | `Tray`*

*Defined in [Menubar.ts:90](https://github.com/maxogden/menubar/blob/e2b8e16/src/Menubar.ts#L90)*

Retrieve a menubar option.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | keyof Options | The option key to retrieve.  |

**Returns:** *undefined | string | number | false | true | `BrowserWindowConstructorOptions` | `NativeImage` | `Tray`*

___

###  hideWindow

▸ **hideWindow**(): *void*

*Defined in [Menubar.ts:97](https://github.com/maxogden/menubar/blob/e2b8e16/src/Menubar.ts#L97)*

Hide the menubar window.

**Returns:** *void*

___

###  setOption

▸ **setOption**(`key`: keyof Options, `value`: any): *void*

*Defined in [Menubar.ts:116](https://github.com/maxogden/menubar/blob/e2b8e16/src/Menubar.ts#L116)*

Change an option after menubar is created.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | keyof Options | The option key to modify. |
`value` | any | The value to set.  |

**Returns:** *void*

___

###  showWindow

▸ **showWindow**(`trayPos?`: `Electron.Rectangle`): *`Promise<void>`*

*Defined in [Menubar.ts:125](https://github.com/maxogden/menubar/blob/e2b8e16/src/Menubar.ts#L125)*

Show the menubar window.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`trayPos?` | `Electron.Rectangle` | The bounds to show the window in.  |

**Returns:** *`Promise<void>`*