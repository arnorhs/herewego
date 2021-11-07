import { EntityType, Position, Size, dimension, makeEl } from './util'

const classes: Record<EntityType, string> = {
  [EntityType.PLAYER]: 'player',
  [EntityType.GRASS]: 'land_grass',
  [EntityType.SAND]: 'land_sand',
  [EntityType.TREE]: 'land_tree',
  [EntityType.WATER]: 'land_water',
  [EntityType.BRIDGE_V]: 'land_bridge_v',
  [EntityType.BRIDGE_H]: 'land_bridge_h',
  [EntityType.MOUNTAIN]: 'land_mountain',
  [EntityType.ROAD]: 'land_road',
  [EntityType.PERSON_COWBOY]: 'person_cowboy',
  [EntityType.ALIEN]: 'enemy_alien',
  [EntityType.ALIEN_DEAD]: 'enemy_alien_dead',
  [EntityType.HOUSE_HEALING]: 'house_healing',
  [EntityType.HOUSE_RESTING]: 'house_resting',
  [EntityType.HOUSE_SPACESHIP]: 'house_spaceship',
  [EntityType.HOUSE_TOWER]: 'house_tower',
  [EntityType.HOUSE_FORTRESS]: 'house_fortress',
}

export class View {
  position: Position
  size: Size
  type: EntityType
  isPlaced: boolean
  element: HTMLDivElement

  constructor(position: Position, size: Size, type: EntityType) {
    this.position = position
    this.size = size
    this.type = type
    this.element = View.createElement(type, size)
    this.isPlaced = false
  }

  move(position: Position) {
    this.position = position
  }

  changeType(type: EntityType) {
    this.type = type

    if (!this.element) {
      throw new Error('no element on type ' + type)
    }

    this.element.className = classes[type]
  }

  static createElement(entityType: EntityType, size: Size) {
    return makeEl<HTMLDivElement>({
      tag: 'div',
      style: {
        position: 'absolute',
        width: dimension(size.width),
        height: dimension(size.height),
      },
      class: classes[entityType],
    })
  }
}
