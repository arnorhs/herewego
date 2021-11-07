import { EntityType } from './constants'
import { EntityAttr } from './entities/entityAttributes'
import { Position } from './types'
import { dqs, formatStat, getValidCanvas, px } from './utils'
import { WorldMap } from './world_map'

let mapShown = false
let $mapCanvas: HTMLCanvasElement

const initMapCanvas = (map: WorldMap) => {
  const { canvas, ctx } = getValidCanvas('#map_canvas')
  $mapCanvas = canvas

  const rect = map.getRect()
  var hash: Record<number, string> = {}
  canvas.width = rect.width
  canvas.height = rect.height
  canvas.style.width = px(rect.width)
  canvas.style.height = px(rect.height)

  hash[EntityType.TREE] = '#0a0'
  hash[EntityType.SAND] = '#f0f0c9'
  hash[EntityType.GRASS] = '#6d6'
  hash[EntityType.ROAD] = '#ca3'
  hash[EntityType.MOUNTAIN] = '#bcd'
  hash[EntityType.WATER] = '#48C'

  map.getViews((position: Position, type: EntityType) => {
    ctx.fillStyle = hash[type]
    ctx.fillRect(position.x, position.y, 1, 1)
  })
}

function showMap(currentMap: WorldMap) {
  if (!$mapCanvas) {
    initMapCanvas(currentMap)
  }
  $mapCanvas.style.display = 'block'
  mapShown = true
}

function hideMap() {
  $mapCanvas.style.display = 'none'
  mapShown = false
}

export const HUD = {
  updateDashboard(playerStats: EntityAttr) {
    // playerStats should include: health, maxHealth, exp
    const percentEl = dqs<HTMLElement>('#health > .percent')
    percentEl.style.width =
      ((playerStats.health as number) * 100) / (playerStats.maxHealth as number) + '%'

    dqs('#xp').innerHTML = `xp: ${formatStat(playerStats.exp as number)}`
  },

  updateTime(newTime: string) {
    dqs('#time').innerHTML = newTime
  },

  updateCoords: function (position: Position) {
    // Coordinates.. probably will disable once this is a proper game
    dqs('#coords').innerHTML = position.x + ', ' + position.y
  },
  showMap: showMap,
  hideMap: hideMap,
}
