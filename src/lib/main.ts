import {
  dqs,
  EntityType,
  INITIAL_PLAYER_POSITION,
  PlayerState,
  PLAYER_STATS,
  Position,
  Size,
  Whisper,
} from './util'
import { EntityHash, GameEntity } from './entities'
import { WorldMap } from './world_map'
import { WorldView } from './world_view'
import { HUD } from './hud'
import { Light } from './light'
import { formatTime, getCurrentWorldTime, initTime, luminosity } from './world_time'
import { initCommands } from './commands'
import { PlayerModal } from './player/playerModal'
import { ModalContainer } from './modal'

class Player {
  state: PlayerState = PlayerState.IDLE
  entity: GameEntity
  lastActionDate = 0

  constructor(entity: GameEntity) {
    this.entity = entity
  }

  movementRate(): number {
    switch (this.state) {
      case PlayerState.ATTACKING:
        return 800
      case PlayerState.MOVING:
        return 200
    }
    return 0
  }

  getDetailedStats() {
    return PLAYER_STATS.reduce((acc, key) => {
      acc[key] = (this.entity.attr?.key as number) ?? 0

      if (!acc[key]) {
        acc[key]
      }
      return acc
    }, {} as Record<string, number>)
  }

  canMove(targetPlayerPosition: Position, entities: EntityHash, currentMap: WorldMap) {
    return (
      Date.now() - this.lastActionDate > this.movementRate() &&
      !this.entity.dead &&
      currentMap.inBounds(targetPlayerPosition) &&
      entities.canPassThroughAll(targetPlayerPosition)
    )
  }

  move(offset: Position, entities: EntityHash, worldView: WorldView, worldMap: WorldMap) {
    var now = Date.now()

    var targetPlayerPosition = {
      x: this.entity.position.x + offset.x,
      y: this.entity.position.y + offset.y,
    }

    if (!this.canMove(targetPlayerPosition, entities, worldMap)) return

    const enemy = entities.getEnemy(targetPlayerPosition)

    if (enemy) {
      this.state = PlayerState.ATTACKING

      this.entity.attack(enemy)

      if (!enemy.dead) {
        enemy.attack(this.entity)
        if (this.entity.dead) {
          // game over
        }
      }
    } else {
      // successful player movement
      this.state = PlayerState.MOVING
      entities.move(this.entity, targetPlayerPosition)
      worldView.centerOnPosition(this.entity.position)
      HUD.updateCoords(this.entity.position)
    }

    // give him more health if he touches a healing house
    var house = entities.getHouse(targetPlayerPosition)
    if (house) {
      if (house.type === EntityType.HOUSE_HEALING) {
        this.entity.setHealth(this.entity.attr?.maxHealth ?? 0)
      }
    }

    this.lastActionDate = now

    this.updateDashboard()
  }

  updateDashboard() {
    if (this.entity.attr) {
      HUD.updateDashboard(this.entity.attr)
    }
  }
}

export const startGame = async () => {
  const entities = new EntityHash()
  const light = new Light(dqs('#light_canvas'))

  const worldView = new WorldView(dqs('#world_view'), INITIAL_PLAYER_POSITION, light)

  function addEntity(type: EntityType, position: Position, size: Size) {
    const entity = new GameEntity(type, position, size)
    worldView.addView(entity.view)
    entities.add(position, entity)
    return entity
  }

  const playerEntity = addEntity(EntityType.PLAYER, INITIAL_PLAYER_POSITION, {
    width: 1,
    height: 1,
  })
  const player = new Player(playerEntity)

  // create map
  const worldMap = await WorldMap.download('start')

  var landSize = { width: 1, height: 1 }

  worldMap.getViews(function (position, type) {
    addEntity(type, position, landSize)
  })

  // makes it so the viewport can't be scrolled past these limits
  worldView.setViewportOffsetLimits(worldMap.getRect())

  // make all buildings
  worldMap.getEntities(function (position, type) {
    addEntity(type, position, { width: 1, height: 1 })
  })

  light.setLuminosity(luminosity())

  // TODO: world view was initialized here
  worldView.centerOnPosition(player.entity.position)
  HUD.updateCoords(player.entity.position)

  initTime()
  HUD.updateTime(formatTime(getCurrentWorldTime()))

  initCommands(function (offset) {
    player.move(offset, entities, worldView, worldMap)
  })

  const modal = new ModalContainer('#modal')
  const playerModal = new PlayerModal()

  Whisper.listen<[GameEntity, number]>('entity_health_change', ([entity, healthChange]) => {
    var formatted = (healthChange < 0 ? '-' : '+') + healthChange.toFixed(1)
    worldView.animateTextPop(entity.view, healthChange < 0 ? '#f44' : '#4f4', formatted)
  })

  Whisper.listen('entity_level_up', function (entity: GameEntity) {
    setTimeout(function () {
      if (!entity.attr) {
        throw new Error('trying to level up an entity without attr')
      }

      var formatted = 'Level up: ' + entity.attr.level
      worldView.animateTextPop(entity.view, '#c93', formatted)
    }, 500)
  })

  Whisper.listen('time_tick', function () {
    // figure out if we should spawn an alien
    if (Math.random() > 0.7) {
      var alienPosition = {
        x: Math.floor(Math.random() * worldMap.getRect().width),
        y: Math.floor(Math.random() * worldMap.getRect().height),
      }
      if (entities.enemyCanSpawn(alienPosition)) {
        addEntity(EntityType.ALIEN, alienPosition, { width: 1, height: 1 })
        console.log('added an alien: ', alienPosition.x + ',' + alienPosition.y)
        worldView.redrawViews()
      }
    }
    HUD.updateTime(formatTime(getCurrentWorldTime()))
    light.setLuminosity(luminosity())
  })

  Whisper.listen('command_player_stats', function () {
    playerModal.updateStats(player.getDetailedStats())
    modal.toggleModal(playerModal)
  })

  Whisper.listen('command_show_map', function () {
    HUD.showMap(worldMap)
  })

  Whisper.listen('command_hide_map', function () {
    HUD.hideMap()
  })
}
