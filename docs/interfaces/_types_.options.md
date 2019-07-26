> **[menubar](../README.md)**

[Globals](../globals.md) / ["types"](../modules/_types_.md) / [Options](_types_.options.md) /

# Interface: Options

Options for creating a menubar application

## Hierarchy

* **Options**

## Index

### Properties

* [alwaysOnTop](_types_.options.md#optional-alwaysontop)
* [browserWindow](_types_.options.md#browserwindow)
* [dir](_types_.options.md#dir)
* [height](_types_.options.md#optional-height)
* [icon](_types_.options.md#icon)
* [index](_types_.options.md#index)
* [preloadWindow](_types_.options.md#preloadwindow)
* [showDockIcon](_types_.options.md#showdockicon)
* [showOnAllWorkspaces](_types_.options.md#showonallworkspaces)
* [showOnRightClick](_types_.options.md#showonrightclick)
* [tooltip](_types_.options.md#tooltip)
* [tray](_types_.options.md#tray)
* [width](_types_.options.md#optional-width)
* [windowPosition](_types_.options.md#optional-windowposition)
* [x](_types_.options.md#optional-x)
* [y](_types_.options.md#optional-y)

## Properties

### `Optional` alwaysOnTop

• **alwaysOnTop**? : *undefined | false | true*

*Defined in [types.ts:11](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L11)*

If true, the window will not hide on blur.

**`deprecated`** Please pass this option inside `options.browserWindow`.

___

###  browserWindow

• **browserWindow**: *`BrowserWindowConstructorOptions`*

*Defined in [types.ts:30](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L30)*

An Electron BrowserWindow instance, or an options object to be passed into
the BrowserWindow constructor.

**`example`** 
```typescript
const options = { height: 640, width: 480 };
const mb = new Menubar({
  browserWindow: new BrowserWindow(options)
});

// The above is equivalent to

const options = { height: 640, width: 480 };
const mb = new Menubar({
  browserWindow: options
});
```

___

###  dir

• **dir**: *string*

*Defined in [types.ts:34](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L34)*

The app source directory.

___

### `Optional` height

• **height**? : *undefined | number*

*Defined in [types.ts:39](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L39)*

Window height.

**`deprecated`** Please pass this option inside `options.browserWindow`.

___

###  icon

• **icon**: *string | `NativeImage`*

*Defined in [types.ts:46](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L46)*

The png icon to use for the menubar. A good size to start with is 20x20.
To support retina, supply a 2x sized image (e.g. 40x40) with @2x added to
the end of the name, so icon.png and icon@2x.png and Electron will
automatically use your @2x version on retina screens.

___

###  index

• **index**: *string*

*Defined in [types.ts:50](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L50)*

The html to load for the pop up window.

___

###  preloadWindow

• **preloadWindow**: *boolean*

*Defined in [types.ts:55](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L55)*

Create BrowserWindow instance before it is used -- increasing resource
usage, but making the click on the menubar load faster.

___

###  showDockIcon

• **showDockIcon**: *boolean*

*Defined in [types.ts:60](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L60)*

Configure the visibility of the application dock icon, macOS only. Calls
[`app.dock.hide`](https://electronjs.org/docs/api/app#appdockhide-macos)

___

###  showOnAllWorkspaces

• **showOnAllWorkspaces**: *boolean*

*Defined in [types.ts:65](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L65)*

Makes the window available on all OS X workspaces. Calls
[`setVisibleOnAllWorkspaces`](https://electronjs.org/docs/api/browser-window#winsetvisibleonallworkspacesvisible-options)

___

###  showOnRightClick

• **showOnRightClick**: *boolean*

*Defined in [types.ts:69](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L69)*

Show the window on 'right-click' event instead of regular 'click'.

___

###  tooltip

• **tooltip**: *string*

*Defined in [types.ts:73](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L73)*

Menubar tray icon tooltip text. Calls [`tray.setTooltip`](https://electronjs.org/docs/api/tray#traysettooltiptooltip)

___

###  tray

• **tray**: *`Tray`*

*Defined in [types.ts:77](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L77)*

An electron Tray instance. If provided, `options.icon` will be ignored.

___

### `Optional` width

• **width**? : *undefined | number*

*Defined in [types.ts:102](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L102)*

Window width.

**`deprecated`** Please pass this option inside `options.browserWindow`.

___

### `Optional` windowPosition

• **windowPosition**? : *"trayLeft" | "trayBottomLeft" | "trayRight" | "trayBottomRight" | "trayCenter" | "trayBottomCenter" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "topCenter" | "bottomCenter" | "leftCenter" | "rightCenter" | "center"*

*Defined in [types.ts:82](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L82)*

Sets the window position (x and y will still override this), check
electron-positioner docs for valid values.

___

### `Optional` x

• **x**? : *undefined | number*

*Defined in [types.ts:107](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L107)*

The x position of the window.

**`deprecated`** Please pass this option inside `options.browserWindow`.

___

### `Optional` y

• **y**? : *undefined | number*

*Defined in [types.ts:112](https://github.com/maxogden/menubar/blob/fa4969a/src/types.ts#L112)*

The x position of the window.

**`deprecated`** Please pass this option inside `options.browserWindow`.