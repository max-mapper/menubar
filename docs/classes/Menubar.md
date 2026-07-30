[**menubar**](../README.md)

***

[menubar](../globals.md) / Menubar

# Class: Menubar

Defined in: [Menubar.ts:14](https://github.com/gitify-app/electron-menubar/blob/4943b5e9ae3cdbe151beeef5dc680cb7a62bd3fc/src/Menubar.ts#L14)

The main Menubar class.

## Extends

- `EventEmitter`

## Accessors

### app

#### Get Signature

> **get** **app**(): `App`

Defined in: [Menubar.ts:46](https://github.com/gitify-app/electron-menubar/blob/4943b5e9ae3cdbe151beeef5dc680cb7a62bd3fc/src/Menubar.ts#L46)

The Electron [App](https://electronjs.org/docs/api/app)
instance.

##### Returns

`App`

***

### positioner

#### Get Signature

> **get** **positioner**(): `default`

Defined in: [Menubar.ts:54](https://github.com/gitify-app/electron-menubar/blob/4943b5e9ae3cdbe151beeef5dc680cb7a62bd3fc/src/Menubar.ts#L54)

The [electron-positioner](https://github.com/jenslind/electron-positioner)
instance.

##### Returns

`default`

***

### tray

#### Get Signature

> **get** **tray**(): `Tray`

Defined in: [Menubar.ts:67](https://github.com/gitify-app/electron-menubar/blob/4943b5e9ae3cdbe151beeef5dc680cb7a62bd3fc/src/Menubar.ts#L67)

The Electron [Tray](https://electronjs.org/docs/api/tray) instance.

##### Returns

`Tray`

***

### window

#### Get Signature

> **get** **window**(): `BrowserWindow` \| `undefined`

Defined in: [Menubar.ts:81](https://github.com/gitify-app/electron-menubar/blob/4943b5e9ae3cdbe151beeef5dc680cb7a62bd3fc/src/Menubar.ts#L81)

The Electron [BrowserWindow](https://electronjs.org/docs/api/browser-window)
instance, if it's present.

##### Returns

`BrowserWindow` \| `undefined`

## Methods

### getOption()

> **getOption**\<`K`\>(`key`): `Options`\[`K`\]

Defined in: [Menubar.ts:90](https://github.com/gitify-app/electron-menubar/blob/4943b5e9ae3cdbe151beeef5dc680cb7a62bd3fc/src/Menubar.ts#L90)

Retrieve a menubar option.

#### Type Parameters

##### K

`K` *extends* keyof `Options`

#### Parameters

##### key

`K`

The option key to retrieve, see Options.

#### Returns

`Options`\[`K`\]

***

### hideWindow()

> **hideWindow**(): `void`

Defined in: [Menubar.ts:97](https://github.com/gitify-app/electron-menubar/blob/4943b5e9ae3cdbe151beeef5dc680cb7a62bd3fc/src/Menubar.ts#L97)

Hide the menubar window.

#### Returns

`void`

***

### setOption()

> **setOption**\<`K`\>(`key`, `value`): `void`

Defined in: [Menubar.ts:117](https://github.com/gitify-app/electron-menubar/blob/4943b5e9ae3cdbe151beeef5dc680cb7a62bd3fc/src/Menubar.ts#L117)

Change an option after menubar is created.

#### Type Parameters

##### K

`K` *extends* keyof `Options`

#### Parameters

##### key

`K`

The option key to modify, see Options.

##### value

`Options`\[`K`\]

The value to set.

#### Returns

`void`

***

### showWindow()

> **showWindow**(`trayPos?`): `Promise`\<`void`\>

Defined in: [Menubar.ts:126](https://github.com/gitify-app/electron-menubar/blob/4943b5e9ae3cdbe151beeef5dc680cb7a62bd3fc/src/Menubar.ts#L126)

Show the menubar window.

#### Parameters

##### trayPos?

`Rectangle`

The bounds to show the window in.

#### Returns

`Promise`\<`void`\>
