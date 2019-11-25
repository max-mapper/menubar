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

*Defined in [types.ts:19](https://github.com/maxogden/menubar/blob/790f6b7/src/types.ts#L19)*

An Electron BrowserWindow instance, or an options object to be passed into
the BrowserWindow constructor.

**`example`** 
```typescript
const options = { height: 640, width: 480 };

const mb = new Menubar({
  browserWindow: options
});
```

___

###  dir

• **dir**: *string*

*Defined in [types.ts:23](https://github.com/maxogden/menubar/blob/790f6b7/src/types.ts#L23)*

The app source directory.

___

### `Optional` icon

• **icon**? : *string | `NativeImage`*

*Defined in [types.ts:30](https://github.com/maxogden/menubar/blob/790f6b7/src/types.ts#L30)*

The png icon to use for the menubar. A good size to start with is 20x20.
To support retina, supply a 2x sized image (e.g. 40x40) with @2x added to
the end of the name, so icon.png and icon@2x.png and Electron will
automatically use your @2x version on retina screens.

___

###  index

• **index**: *string | false*

*Defined in [types.ts:39](https://github.com/maxogden/menubar/blob/790f6b7/src/types.ts#L39)*

The URL to load the menubar's browserWindow with. The url can be a remote
address (e.g. `http://`) or a path to a local HTML file using the
`file://` protocol. If false, then menubar won't call `loadUrl` on
start.

**`default`** `file:// + options.dir + index.html`

**`see`** https://electronjs.org/docs/api/browser-window#winloadurlurl-options

___

### `Optional` preloadWindow

• **preloadWindow**? : *undefined | false | true*

*Defined in [types.ts:44](https://github.com/maxogden/menubar/blob/790f6b7/src/types.ts#L44)*

Create BrowserWindow instance before it is used -- increasing resource
usage, but making the click on the menubar load faster.

___

### `Optional` showDockIcon

• **showDockIcon**? : *undefined | false | true*

*Defined in [types.ts:49](https://github.com/maxogden/menubar/blob/790f6b7/src/types.ts#L49)*

Configure the visibility of the application dock icon, macOS only. Calls
[`app.dock.hide`](https://electronjs.org/docs/api/app#appdockhide-macos).

___

### `Optional` showOnAllWorkspaces

• **showOnAllWorkspaces**? : *undefined | false | true*

*Defined in [types.ts:54](https://github.com/maxogden/menubar/blob/790f6b7/src/types.ts#L54)*

Makes the window available on all OS X workspaces. Calls
[`setVisibleOnAllWorkspaces`](https://electronjs.org/docs/api/browser-window#winsetvisibleonallworkspacesvisible-options).

___

### `Optional` showOnRightClick

• **showOnRightClick**? : *undefined | false | true*

*Defined in [types.ts:58](https://github.com/maxogden/menubar/blob/790f6b7/src/types.ts#L58)*

Show the window on 'right-click' event instead of regular 'click'.

___

###  tooltip

• **tooltip**: *string*

*Defined in [types.ts:62](https://github.com/maxogden/menubar/blob/790f6b7/src/types.ts#L62)*

Menubar tray icon tooltip text. Calls [`tray.setTooltip`](https://electronjs.org/docs/api/tray#traysettooltiptooltip).

___

### `Optional` tray

• **tray**? : *`Tray`*

*Defined in [types.ts:66](https://github.com/maxogden/menubar/blob/790f6b7/src/types.ts#L66)*

An electron Tray instance. If provided, `options.icon` will be ignored.

___

### `Optional` windowPosition

• **windowPosition**? : *"trayLeft" | "trayBottomLeft" | "trayRight" | "trayBottomRight" | "trayCenter" | "trayBottomCenter" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "topCenter" | "bottomCenter" | "leftCenter" | "rightCenter" | "center"*

*Defined in [types.ts:71](https://github.com/maxogden/menubar/blob/790f6b7/src/types.ts#L71)*

Sets the window position (x and y will still override this), check
electron-positioner docs for valid values.