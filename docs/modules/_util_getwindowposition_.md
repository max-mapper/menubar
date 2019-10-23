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

▸ **getWindowPosition**(`tray`: `Tray`): *`WindowPosition`*

*Defined in [util/getWindowPosition.ts:52](https://github.com/maxogden/menubar/blob/a8f1477/src/util/getWindowPosition.ts#L52)*

Depending on where the taskbar is, determine where the window should be
positioned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tray` | `Tray` | The Electron Tray instance.  |

**Returns:** *`WindowPosition`*

___

###  taskbarLocation

▸ **taskbarLocation**(`tray`: `Tray`): *`TaskbarLocation`*

*Defined in [util/getWindowPosition.ts:18](https://github.com/maxogden/menubar/blob/a8f1477/src/util/getWindowPosition.ts#L18)*

Determine taskbard location: "top", "bottom", "left" or "right".

Only tested on Windows for now, and only used in Windows.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tray` | `Tray` | The Electron Tray instance.  |

**Returns:** *`TaskbarLocation`*