import { GameEntity } from './GameEntity'
import { Position } from '../util/geometry'

// Hash that works as a reverse lookup for game objects at a specific square
//
// It would be really inefficient to loop through the whole thing, but it's well
// suited for looking up all the game objects in a specific square.
type Key = number

// TODO
/*
function PositionAsKey() {
  console.log('second(): factory evaluated')
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('second(): called')
  }
}
*/

export class EntityHash {
  private readonly hash: Record<string, GameEntity[]> = {}

  static getKey(position: Position): Key {
    // packed integer..
    // if we ever need to retrieve it... Well i hope we won't have to
    return position.x | (position.y << 12)
  }

  // this function will actually create and retrieve an array, so we can add to
  // it as we like.
  private _get(key: Key) {
    if (!this.hash[key]) {
      this.hash[key] = []
    }
    return this.hash[key]
  }

  // Moving in the hash will propogate into: removing and adding to hash, moving
  // the entity and ultimately the view
  move(entity: GameEntity, targetPosition: Position) {
    var oldPosition = entity.position
    this.remove(oldPosition, entity)
    this.add(targetPosition, entity)
    entity.move(targetPosition)
    // TODO trigger callback or something that will let the controller know that
    // the entity has moved, so the world view can be updated
  }

  remove(position: Position, object: GameEntity) {
    var key = EntityHash.getKey(position)
    var arr = this._get(key)
    var index = arr.indexOf(object)
    if (index >= 0) {
      arr.splice(index, 1)
    }
  }

  add(position: Position, object: GameEntity) {
    var key = EntityHash.getKey(position)
    this._get(key).push(object)
  }

  getHouse(position: Position) {
    return this._get(EntityHash.getKey(position)).find((item) => item.isHouse())
  }

  getEnemy(position: Position) {
    return this._get(EntityHash.getKey(position)).find((item) => item.isEnemy())
  }

  canPassThroughAll(position: Position) {
    var can = true
    this._get(EntityHash.getKey(position)).forEach(function (item) {
      if (!item.canPassThrough()) {
        can = false
      }
    })
    return can
  }

  enemyCanSpawn(position: Position) {
    var can = true
    this._get(EntityHash.getKey(position)).forEach(function (item) {
      if (!item.enemyCanSpawn()) {
        can = false
      }
    })
    return can
  }
}
