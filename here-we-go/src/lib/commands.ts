// Emits command events. Takes care of nuances regarding keyboard vs game time etc.
//
// Main events it emits so far:
// - player movement
// - show map
// - hide map
// - show stats
//
// Eventually this might become tied with a game cycle and it would be queried
// instead of emitting events, but for now this will probably do

import { Position } from './types'
import { Whisper } from './whisper'

type Handler = (movementOffset: Position) => void

var INTERVAL = 20,
  keysDown = new Set<KeyCommand>(),
  handler: Handler

// Main keyboard event loop
function startLoop() {
  setInterval(function () {
    var movementOffset = { x: 0, y: 0 }
    // some of the commands emit their own whisper events, we just need to
    // special-case the movement commands
    keysDown.forEach((command) => command(movementOffset))
    if (movementOffset.x != 0 || movementOffset.y != 0) {
      handler(movementOffset)
    }
  }, INTERVAL)
}

type KeyCommand = (pos: Position) => void
const up: KeyCommand = (pos) => {
  pos.y += -1
}
const down: KeyCommand = (pos) => {
  pos.y += 1
}
const left: KeyCommand = (pos) => {
  pos.x += -1
}
const right: KeyCommand = (pos) => {
  pos.x += 1
}

enum KeyCode {
  up = 38,
  down = 40,
  left = 37,
  right = 39,
  w = 87,
  a = 65,
  s = 83,
  d = 68,
  k = 75,
  j = 74,
  h = 72,
  l = 76,
  tab = 9,
  m = 77,
}

// It's pretty stupid to define these like this, should probably be using addEventListener
// and also using a factory or whatever the pattern would be called to have the same method
// call remove/add depending on what's happening. I'm just too lazy
document.onkeydown = function (e) {
  if (e.metaKey) {
    // clear the queue of keys, if any
    keysDown.clear()
    return true
  }
  switch (e.keyCode) {
    case KeyCode.up:
    case KeyCode.w:
    case KeyCode.k:
      keysDown.add(up)
      break
    case KeyCode.down:
    case KeyCode.s:
    case KeyCode.j:
      keysDown.add(down)
      break
    case KeyCode.left:
    case KeyCode.a:
    case KeyCode.h:
      keysDown.add(left)
      break
    case KeyCode.right:
    case KeyCode.d:
    case KeyCode.l:
      keysDown.add(right)
      break
    case KeyCode.tab:
      Whisper.say('command_player_stats')
      break
    case KeyCode.m:
      Whisper.say('command_show_map')
      break
    default:
      return true
  }

  return false
}

document.onkeyup = function (e) {
  switch (e.keyCode) {
    case KeyCode.up:
    case KeyCode.w:
    case KeyCode.k:
      keysDown.delete(up)
      break
    case KeyCode.down:
    case KeyCode.s:
    case KeyCode.j:
      keysDown.delete(down)
      break
    case KeyCode.left:
    case KeyCode.a:
    case KeyCode.h:
      keysDown.delete(left)
      break
    case KeyCode.right:
    case KeyCode.d:
    case KeyCode.l:
      keysDown.delete(right)
      break
    case KeyCode.m:
      Whisper.say('command_hide_map')
      break
    default:
      return true
  }
  return false
}

export const initCommands = function (callback: Handler) {
  handler = callback
  startLoop()
}
