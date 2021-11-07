import { EntityType } from './util/constants'
import { Position, Rect, Size } from './types'

interface PositionWithEntity extends Position {
  type?: EntityType
}

interface MapDefinition {
  buildings: PositionWithEntity[]
  people: PositionWithEntity[]
}

const mapDefinitions: Record<string, MapDefinition> = {
  start: {
    buildings: [
      { x: 6, y: 5 },
      { x: 63, y: 31 },
      { x: 88, y: 46 },
      { x: 76, y: 15 },
      // house on the side of the road
      { x: 41, y: 41, type: EntityType.HOUSE_RESTING },
      // single house in the middle of large lake
      { x: 134, y: 8 },
      // town above maze
      { x: 134, y: 26, type: EntityType.HOUSE_RESTING },
      { x: 134, y: 28 },
      { x: 139, y: 30 },
      { x: 145, y: 28, type: EntityType.HOUSE_RESTING },
      { x: 142, y: 27, type: EntityType.HOUSE_RESTING },
      { x: 148, y: 26 },
      { x: 136, y: 28, type: EntityType.HOUSE_TOWER },
      { x: 148, y: 29, type: EntityType.HOUSE_FORTRESS },
      // space ships
      { x: 2, y: 57, type: EntityType.HOUSE_SPACESHIP },
      { x: 71, y: 57, type: EntityType.HOUSE_SPACESHIP },
      { x: 101, y: 46, type: EntityType.HOUSE_SPACESHIP },
      { x: 122, y: 19, type: EntityType.HOUSE_SPACESHIP },
      { x: 44, y: 18, type: EntityType.HOUSE_SPACESHIP },
      { x: 17, y: 3, type: EntityType.HOUSE_SPACESHIP },
    ],
    people: [
      // town above maze
      { x: 136, y: 26 },
      { x: 139, y: 31 },
      { x: 146, y: 26 },
    ],
  },
}

export type MapName = keyof typeof mapDefinitions

const tileTypes: Record<string, EntityType> = {
  '.': EntityType.GRASS,
  s: EntityType.SAND,
  t: EntityType.TREE,
  w: EntityType.WATER,
  b: EntityType.BRIDGE_V,
  B: EntityType.BRIDGE_H,
  m: EntityType.MOUNTAIN,
  r: EntityType.ROAD,
}

function squareToType(square: keyof typeof tileTypes) {
  return tileTypes[square]
}

type Raw = string[]

// Eventually the map will probably also be managed somewhere else in the
// game engine - especially if it will become mutable
export class WorldMap {
  name: MapName
  raw: Raw
  size: Size

  constructor(name: MapName, raw: Raw) {
    this.name = name
    this.raw = raw

    this.size = {
      width: raw[0].length,
      height: raw.length,
    }
  }

  static async download(name: string) {
    const url = `maps/${name}.map`

    const response = await fetch(url, {
      headers: {
        Accept: 'text/plain',
      },
    })

    const data = await response.text()

    const raw = data.split('\n')
    // I contemplated looping through and removing each empty string, but I think
    // it's just going to be the last one.
    raw.pop()

    return new WorldMap(name, raw)
  }

  getViews(callback: (position: Position, type: EntityType) => void) {
    // loop through each tile
    for (let y = 0; y < this.raw.length; y++) {
      for (let x = 0; x < this.raw[y].length; x++) {
        callback({ x, y }, squareToType(this.raw[y][x]))
      }
    }
  }

  getEntities(callback: (pos: Position, type: EntityType) => void) {
    const { buildings, people } = mapDefinitions[this.name]

    buildings.forEach((building) => {
      callback(building, building.type || EntityType.HOUSE_HEALING)
    })

    people.forEach((person) => {
      callback(person, person.type || EntityType.PERSON_COWBOY)
    })
  }

  getRect(): Rect {
    return {
      x: 0,
      y: 0,
      width: this.size.width,
      height: this.size.height,
    }
  }

  inBounds(position: Position) {
    return (
      position.x >= 0 &&
      position.x < this.size.width &&
      position.y >= 0 &&
      position.y < this.size.height
    )
  }

  export() {
    return this.raw.join('\n')
  }
}
