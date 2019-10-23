> **[menubar](../README.md)**

[Globals](../globals.md) / ["types"](../modules/_types_.md) / [Options](_types_.options.md) /

# Interface: Options

Options for creating a menubar application

## Hierarchy

* **Options**

## Index

### Properties

* [browserWindow](_types_.options.md#browserwindow)
* [dir](_types_.options.md#dir)
* [icon](_types_.options.md#optional-icon)
* [index](_types_.options.md#index)
* [preloadWindow](_types_.options.md#optional-preloadwindow)
* [showDockIcon](_types_.options.md#optional-showdockicon)
* [showOnAllWorkspaces](_types_.options.md#optional-showonallworkspaces)
* [showOnRightClick](_types_.options.md#optional-showonrightclick)
* [tooltip](_types_.options.md#tooltip)
* [tray](_types_.options.md#optional-tray)
* [windowPosition](_types_.options.md#optional-windowposition)

## Properties

###  browserWindow

• **browserWindow**: *`BrowserWindowConstructorOptions`*

*Defined in [types.ts:25](https://github.com/maxogden/menubar/blob/b54dce5/src/types.ts#L25)*

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

*Defined in [types.ts:29](https://github.com/maxogden/menubar/blob/b54dce5/src/types.ts#L29)*

The app source directory.

___

### `Optional` icon

• **icon**? : *string | `NativeImage`*

*Defined in [types.ts:36](https://github.com/maxogden/menubar/blob/b54dce5/src/types.ts#L36)*

The png icon to use for the menubar. A good size to start with is 20x20.
To support retina, supply a 2x sized image (e.g. 40x40) with @2x added to
the end of the name, so icon.png and icon@2x.png and Electron will
automatically use your @2x version on retina screens.

___

###  index

• **index**: *string*

*Defined in [types.ts:40](https://github.com/maxogden/menubar/blob/b54dce5/src/types.ts#L40)*

The html to load for the pop up window.

___

### `Optional` preloadWindow

• **preloadWindow**? : *undefined | false | true*

*Defined in [types.ts:45](https://github.com/maxogden/menubar/blob/b54dce5/src/types.ts#L45)*

Create BrowserWindow instance before it is used -- increasing resource
usage, but making the click on the menubar load faster.

___

### `Optional` showDockIcon

• **showDockIcon**? : *undefined | false | true*

*Defined in [types.ts:50](https://github.com/maxogden/menubar/blob/b54dce5/src/types.ts#L50)*

Configure the visibility of the application dock icon, macOS only. Calls
[`app.dock.hide`](https://electronjs.org/docs/api/app#appdockhide-macos).

___

### `Optional` showOnAllWorkspaces

• **showOnAllWorkspaces**? : *undefined | false | true*

*Defined in [types.ts:55](https://github.com/maxogden/menubar/blob/b54dce5/src/types.ts#L55)*

Makes the window available on all OS X workspaces. Calls
[`setVisibleOnAllWorkspaces`](https://electronjs.org/docs/api/browser-window#winsetvisibleonallworkspacesvisible-options).

___

### `Optional` showOnRightClick

• **showOnRightClick**? : *undefined | false | true*

*Defined in [types.ts:59](https://github.com/maxogden/menubar/blob/b54dce5/src/types.ts#L59)*

Show the window on 'right-click' event instead of regular 'click'.

___

###  tooltip

• **tooltip**: *string*

*Defined in [types.ts:63](https://github.com/maxogden/menubar/blob/b54dce5/src/types.ts#L63)*

Menubar tray icon tooltip text. Calls [`tray.setTooltip`](https://electronjs.org/docs/api/tray#traysettooltiptooltip).

___

### `Optional` tray

• **tray**? : *`Tray`*

*Defined in [types.ts:67](https://github.com/maxogden/menubar/blob/b54dce5/src/types.ts#L67)*

An electron Tray instance. If provided, `options.icon` will be ignored.

___

### `Optional` windowPosition

• **windowPosition**? : *"trayLeft" | "trayBottomLeft" | "trayRight" | "trayBottomRight" | "trayCenter" | "trayBottomCenter" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "topCenter" | "bottomCenter" | "leftCenter" | "rightCenter" | "center"*

*Defined in [types.ts:72](https://github.com/maxogden/menubar/blob/b54dce5/src/types.ts#L72)*

Sets the window position (x and y will still override this), check
electron-positioner docs for valid values.