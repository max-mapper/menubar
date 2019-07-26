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

### Properties

* [defaultMaxListeners](_menubar_.menubar.md#static-defaultmaxlisteners)

### Accessors

* [app](_menubar_.menubar.md#app)
* [positioner](_menubar_.menubar.md#positioner)
* [tray](_menubar_.menubar.md#tray)
* [window](_menubar_.menubar.md#window)

### Methods

* [addListener](_menubar_.menubar.md#addlistener)
* [emit](_menubar_.menubar.md#emit)
* [eventNames](_menubar_.menubar.md#eventnames)
* [getMaxListeners](_menubar_.menubar.md#getmaxlisteners)
* [getOption](_menubar_.menubar.md#getoption)
* [hideWindow](_menubar_.menubar.md#hidewindow)
* [listenerCount](_menubar_.menubar.md#listenercount)
* [listeners](_menubar_.menubar.md#listeners)
* [off](_menubar_.menubar.md#off)
* [on](_menubar_.menubar.md#on)
* [once](_menubar_.menubar.md#once)
* [prependListener](_menubar_.menubar.md#prependlistener)
* [prependOnceListener](_menubar_.menubar.md#prependoncelistener)
* [rawListeners](_menubar_.menubar.md#rawlisteners)
* [removeAllListeners](_menubar_.menubar.md#removealllisteners)
* [removeListener](_menubar_.menubar.md#removelistener)
* [setMaxListeners](_menubar_.menubar.md#setmaxlisteners)
* [setOption](_menubar_.menubar.md#setoption)
* [showWindow](_menubar_.menubar.md#showwindow)
* [listenerCount](_menubar_.menubar.md#static-listenercount)

## Constructors

###  constructor

\+ **new Menubar**(`app`: `App`, `options?`: `Partial<Options>` | string): *[Menubar](_menubar_.menubar.md)*

*Defined in [Menubar.ts:21](https://github.com/maxogden/menubar/blob/be37c74/src/Menubar.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`app` | `App` |
`options?` | `Partial<Options>` \| string |

**Returns:** *[Menubar](_menubar_.menubar.md)*

## Properties

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:9

## Accessors

###  app

• **get app**(): *`App`*

*Defined in [Menubar.ts:44](https://github.com/maxogden/menubar/blob/be37c74/src/Menubar.ts#L44)*

The Electron [App](https://electronjs.org/docs/api/app)
instance.

**Returns:** *`App`*

___

###  positioner

• **get positioner**(): *any*

*Defined in [Menubar.ts:52](https://github.com/maxogden/menubar/blob/be37c74/src/Menubar.ts#L52)*

The [electron-positioner](https://github.com/jenslind/electron-positioner)
instance.

**Returns:** *any*

___

###  tray

• **get tray**(): *`Tray`*

*Defined in [Menubar.ts:65](https://github.com/maxogden/menubar/blob/be37c74/src/Menubar.ts#L65)*

The Electron [Tray](https://electronjs.org/docs/api/tray) instance.

**Returns:** *`Tray`*

___

###  window

• **get window**(): *undefined | `BrowserWindow`*

*Defined in [Menubar.ts:79](https://github.com/maxogden/menubar/blob/be37c74/src/Menubar.ts#L79)*

The Electron [BrowserWindow](https://electronjs.org/docs/api/browser-window)
instance, if it's present.

**Returns:** *undefined | `BrowserWindow`*

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:11

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`event` | string \| symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *`Array<string | symbol>`*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:24

**Returns:** *`Array<string | symbol>`*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:20

**Returns:** *number*

___

###  getOption

▸ **getOption**(`key`: keyof Options): *undefined | string | number | false | true | `BrowserWindowConstructorOptions` | `NativeImage` | `Tray`*

*Defined in [Menubar.ts:88](https://github.com/maxogden/menubar/blob/be37c74/src/Menubar.ts#L88)*

Retrieve a menubar option.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | keyof Options | The option key to retrieve.  |

**Returns:** *undefined | string | number | false | true | `BrowserWindowConstructorOptions` | `NativeImage` | `Tray`*

___

###  hideWindow

▸ **hideWindow**(): *void*

*Defined in [Menubar.ts:95](https://github.com/maxogden/menubar/blob/be37c74/src/Menubar.ts#L95)*

Hide the menubar window.

**Returns:** *void*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:25

**Parameters:**

Name | Type |
------ | ------ |
`type` | string \| symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *`Function`[]*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:21

**Parameters:**

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** *`Function`[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:17

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:12

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:13

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:14

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:15

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *`Function`[]*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** *`Function`[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:18

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string \| symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:16

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:19

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  setOption

▸ **setOption**(`key`: keyof Options, `value`: any): *void*

*Defined in [Menubar.ts:114](https://github.com/maxogden/menubar/blob/be37c74/src/Menubar.ts#L114)*

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

*Defined in [Menubar.ts:123](https://github.com/maxogden/menubar/blob/be37c74/src/Menubar.ts#L123)*

Show the menubar window.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`trayPos?` | `Electron.Rectangle` | The bounds to show the window in.  |

**Returns:** *`Promise<void>`*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: `EventEmitter`, `event`: string | symbol): *number*

*Inherited from void*

Defined in /Users/amaurymartiny/Workspaces/menubar/node_modules/@types/node/events.d.ts:8

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | `EventEmitter` |
`event` | string \| symbol |

**Returns:** *number*