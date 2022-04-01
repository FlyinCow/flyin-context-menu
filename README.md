# Context Menu Component for Vue3 based on slots

## todo:
- test
- context menu presets
- export & publish
- example

## usage

```html
<script>
import {flyinContextMenu} from 'flyin-context-menu'
</script>

<template>
<FlyinContextMenu>
  <template #contextmenu>
    <!-- put context menu here -->
  </template>
  <template #defalut="{onRightClick}">
    <!-- put content here with "@contextmenu='onRightClick'" on triggers-->
  </template>
</FlyinContextMenu>
</template>
```
## Example

## Props

## Emits
