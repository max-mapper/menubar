> **[menubar](../README.md)**

[Globals](../globals.md) / ["util/getWindowPosition"](_util_getwindowposition_.md) /

# External module: "util/getWindowPosition"

Utilities to get taskbar position and consequently menubar's position

## Index

### Functions

* [getWindowPosition](_util_getwindowposition_.md#getwindowposition)
* [taskbarLocation](_util_getwindowposition_.md#taskbarlocation)

## Functions

###  getWindowPosition

▸ **getWindowPosition**(`tray`: `Tray`): *undefined | "trayBottomLeft" | "trayCenter" | "trayBottomCenter" | "topRight" | "bottomRight"*

*Defined in [util/getWindowPosition.ts:43](https://github.com/maxogden/menubar/blob/5b64c5c/src/util/getWindowPosition.ts#L43)*

Depending on where the taskbar is, determine where the window should be
positioned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tray` | `Tray` | The Electron Tray instance.  |

**Returns:** *undefined | "trayBottomLeft" | "trayCenter" | "trayBottomCenter" | "topRight" | "bottomRight"*

___

###  taskbarLocation

▸ **taskbarLocation**(`tray`: `Tray`): *"top" | "bottom" | "left" | "right"*

*Defined in [util/getWindowPosition.ts:16](https://github.com/maxogden/menubar/blob/5b64c5c/src/util/getWindowPosition.ts#L16)*

Determine taskbard location: "top", "bottom", "left" or "right".

Only tested on Windows for now, and only used in Windows.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tray` | `Tray` | The Electron Tray instance.  |

**Returns:** *"top" | "bottom" | "left" | "right"*