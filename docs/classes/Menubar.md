[**menubar**](../README.md) • **Docs**

***

[menubar](../globals.md) / Menubar

# Class: Menubar

The main Menubar class.

## Extends

- `EventEmitter`

## Accessors

### app

> `get` **app**(): `App`

The Electron [App](https://electronjs.org/docs/api/app)
instance.

#### Returns

`App`

#### Defined in

[Menubar.ts:46](https://github.com/max-mapper/menubar/blob/9dfd6c1353193306024f315a191d68a0c6e1fa38/src/Menubar.ts#L46)

***

### positioner

> `get` **positioner**(): `default`

The [electron-positioner](https://github.com/jenslind/electron-positioner)
instance.

#### Returns

`default`

#### Defined in

[Menubar.ts:54](https://github.com/max-mapper/menubar/blob/9dfd6c1353193306024f315a191d68a0c6e1fa38/src/Menubar.ts#L54)

***

### tray

> `get` **tray**(): `Tray`

The Electron [Tray](https://electronjs.org/docs/api/tray) instance.

#### Returns

`Tray`

#### Defined in

[Menubar.ts:67](https://github.com/max-mapper/menubar/blob/9dfd6c1353193306024f315a191d68a0c6e1fa38/src/Menubar.ts#L67)

***

### window

> `get` **window**(): `undefined` \| `BrowserWindow`

The Electron [BrowserWindow](https://electronjs.org/docs/api/browser-window)
instance, if it's present.

#### Returns

`undefined` \| `BrowserWindow`

#### Defined in

[Menubar.ts:81](https://github.com/max-mapper/menubar/blob/9dfd6c1353193306024f315a191d68a0c6e1fa38/src/Menubar.ts#L81)

## Methods

### getOption()

> **getOption**\<`K`\>(`key`): `Options`\[`K`\]

Retrieve a menubar option.

#### Type Parameters

• **K** *extends* keyof `Options`

#### Parameters

• **key**: `K`

The option key to retrieve, see Options.

#### Returns

`Options`\[`K`\]

#### Defined in

[Menubar.ts:90](https://github.com/max-mapper/menubar/blob/9dfd6c1353193306024f315a191d68a0c6e1fa38/src/Menubar.ts#L90)

***

### hideWindow()

> **hideWindow**(): `void`

Hide the menubar window.

#### Returns

`void`

#### Defined in

[Menubar.ts:97](https://github.com/max-mapper/menubar/blob/9dfd6c1353193306024f315a191d68a0c6e1fa38/src/Menubar.ts#L97)

***

### setOption()

> **setOption**\<`K`\>(`key`, `value`): `void`

Change an option after menubar is created.

#### Type Parameters

• **K** *extends* keyof `Options`

#### Parameters

• **key**: `K`

The option key to modify, see Options.

• **value**: `Options`\[`K`\]

The value to set.

#### Returns

`void`

#### Defined in

[Menubar.ts:117](https://github.com/max-mapper/menubar/blob/9dfd6c1353193306024f315a191d68a0c6e1fa38/src/Menubar.ts#L117)

***

### showWindow()

> **showWindow**(`trayPos`?): `Promise`\<`void`\>

Show the menubar window.

#### Parameters

• **trayPos?**: `Rectangle`

The bounds to show the window in.

#### Returns

`Promise`\<`void`\>

#### Defined in

[Menubar.ts:126](https://github.com/max-mapper/menubar/blob/9dfd6c1353193306024f315a191d68a0c6e1fa38/src/Menubar.ts#L126)
