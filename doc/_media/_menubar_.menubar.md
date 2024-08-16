> **[menubar](../README.md)**

[Globals](../globals.md) / ["Menubar"](../modules/_menubar_.md) / [Menubar](_menubar_.menubar.md) /

# Class: Menubar

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

*Defined in [Menubar.ts:24](https://github.com/adam-lynch/menubar/blob/6b93752/src/Menubar.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`app` | `App` |
`options?` | `Partial<Options>` |

**Returns:** *[Menubar](_menubar_.menubar.md)*

## Accessors

###  app

• **app**:

*Defined in [Menubar.ts:47](https://github.com/adam-lynch/menubar/blob/6b93752/src/Menubar.ts#L47)*

___

###  positioner

• **positioner**:

*Defined in [Menubar.ts:56](https://github.com/adam-lynch/menubar/blob/6b93752/src/Menubar.ts#L56)*

___

###  tray

• **tray**:

*Defined in [Menubar.ts:69](https://github.com/adam-lynch/menubar/blob/6b93752/src/Menubar.ts#L69)*

___

###  window

• **window**:

*Defined in [Menubar.ts:83](https://github.com/adam-lynch/menubar/blob/6b93752/src/Menubar.ts#L83)*

## Methods

###  getOption

▸ **getOption**<**K**>(`key`: `K`): *`Options[K]`*

*Defined in [Menubar.ts:92](https://github.com/adam-lynch/menubar/blob/6b93752/src/Menubar.ts#L92)*

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

*Defined in [Menubar.ts:99](https://github.com/adam-lynch/menubar/blob/6b93752/src/Menubar.ts#L99)*

**Returns:** *void*

___

###  setOption

▸ **setOption**<**K**>(`key`: `K`, `value`: `Options[K]`): *void*

*Defined in [Menubar.ts:115](https://github.com/adam-lynch/menubar/blob/6b93752/src/Menubar.ts#L115)*

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

*Defined in [Menubar.ts:124](https://github.com/adam-lynch/menubar/blob/6b93752/src/Menubar.ts#L124)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`trayPos?` | `Electron.Rectangle` | The bounds to show the window in.  |

**Returns:** *`Promise<void>`*