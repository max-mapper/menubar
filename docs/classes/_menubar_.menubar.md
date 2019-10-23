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

\+ **new Menubar**(`app`: `App`, `options?`: `Partial<Options>`): *[Menubar](_menubar_.menubar.md)*

*Defined in [Menubar.ts:24](https://github.com/maxogden/menubar/blob/b54dce5/src/Menubar.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`app` | `App` |
`options?` | `Partial<Options>` |

**Returns:** *[Menubar](_menubar_.menubar.md)*

## Accessors

###  app

• **get app**(): *`App`*

*Defined in [Menubar.ts:47](https://github.com/maxogden/menubar/blob/b54dce5/src/Menubar.ts#L47)*

The Electron [App](https://electronjs.org/docs/api/app)
instance.

**Returns:** *`App`*

___

###  positioner

• **get positioner**(): *any*

*Defined in [Menubar.ts:56](https://github.com/maxogden/menubar/blob/b54dce5/src/Menubar.ts#L56)*

The [electron-positioner](https://github.com/jenslind/electron-positioner)
instance.

**Returns:** *any*

___

###  tray

• **get tray**(): *`Tray`*

*Defined in [Menubar.ts:69](https://github.com/maxogden/menubar/blob/b54dce5/src/Menubar.ts#L69)*

The Electron [Tray](https://electronjs.org/docs/api/tray) instance.

**Returns:** *`Tray`*

___

###  window

• **get window**(): *`BrowserWindow` | undefined*

*Defined in [Menubar.ts:83](https://github.com/maxogden/menubar/blob/b54dce5/src/Menubar.ts#L83)*

The Electron [BrowserWindow](https://electronjs.org/docs/api/browser-window)
instance, if it's present.

**Returns:** *`BrowserWindow` | undefined*

## Methods

###  getOption

▸ **getOption**<**K**>(`key`: `K`): *`Options[K]`*

*Defined in [Menubar.ts:92](https://github.com/maxogden/menubar/blob/b54dce5/src/Menubar.ts#L92)*

Retrieve a menubar option.

**Type parameters:**

▪ **K**: *keyof Options*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | `K` | The option key to retrieve, see [Options](../interfaces/_types_.options.md).  |

**Returns:** *`Options[K]`*

___

###  hideWindow

▸ **hideWindow**(): *void*

*Defined in [Menubar.ts:99](https://github.com/maxogden/menubar/blob/b54dce5/src/Menubar.ts#L99)*

Hide the menubar window.

**Returns:** *void*

___

###  setOption

▸ **setOption**<**K**>(`key`: `K`, `value`: `Options[K]`): *void*

*Defined in [Menubar.ts:115](https://github.com/maxogden/menubar/blob/b54dce5/src/Menubar.ts#L115)*

Change an option after menubar is created.

**Type parameters:**

▪ **K**: *keyof Options*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | `K` | The option key to modify, see [Options](../interfaces/_types_.options.md). |
`value` | `Options[K]` | The value to set.  |

**Returns:** *void*

___

###  showWindow

▸ **showWindow**(`trayPos?`: `Electron.Rectangle`): *`Promise<void>`*

*Defined in [Menubar.ts:124](https://github.com/maxogden/menubar/blob/b54dce5/src/Menubar.ts#L124)*

Show the menubar window.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`trayPos?` | `Electron.Rectangle` | The bounds to show the window in.  |

**Returns:** *`Promise<void>`*