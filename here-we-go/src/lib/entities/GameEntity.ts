import { EntityType } from '../constants'
import { defaultAttributesForType, EntityAttr } from './entityAttributes'
import { Position, Size } from '../types'
import { View } from '../view'
import { Whisper } from '../whisper'

function requireOwnAttr(target: GameEntity, propertyKey: string | symbol, parameterIndex: number) {
  console.log('requireOwnAttr', { target, propertyKey, parameterIndex })

  if (!target.attr) {
    throw new Error(`entity with attr called for required: ${propertyKey.toString()}`)
  }
}

function requireAttr(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log('requireAttr', { target, propertyKey, parameterIndex })
}

export class GameEntity {
  type: EntityType
  position: Position
  size: Size
  view: View
  dead: boolean
  attr?: EntityAttr

  constructor(type: EntityType, position: Position, size: Size) {
    this.type = type
    this.position = position
    this.size = size
    this.view = new View(position, size, type)
    this.dead = false
    this.attr = defaultAttributesForType(type)
  }

  move(targetPosition: Position) {
    this.position = targetPosition
    this.view.move(targetPosition)
  }

  canPassThrough() {
    switch (this.type) {
      case EntityType.TREE:
      case EntityType.MOUNTAIN:
      case EntityType.WATER:
      case EntityType.PERSON_COWBOY:
        return false
    }
    return true
  }

  enemyCanSpawn() {
    switch (this.type) {
      case EntityType.TREE:
      case EntityType.MOUNTAIN:
      case EntityType.WATER:
      case EntityType.HOUSE_HEALING:
      case EntityType.HOUSE_RESTING:
      case EntityType.HOUSE_SPACESHIP:
      case EntityType.HOUSE_TOWER:
      case EntityType.HOUSE_FORTRESS:
      case EntityType.PERSON_COWBOY:
      case EntityType.PLAYER:
      case EntityType.ALIEN:
        return false
    }
    return true
  }

  isHouse() {
    switch (this.type) {
      case EntityType.HOUSE_HEALING:
      case EntityType.HOUSE_RESTING:
      case EntityType.HOUSE_SPACESHIP:
      case EntityType.HOUSE_TOWER:
      case EntityType.HOUSE_FORTRESS:
        return true
    }
    return false
  }

  isEnemy() {
    switch (this.type) {
      case EntityType.ALIEN:
        return true
    }
    return false
  }

  // TODO this probably shouldn't change the type.. probably just set the dead property
  setDead() {
    this.dead = true
    let newType: EntityType
    switch (this.type) {
      case EntityType.ALIEN:
        newType = EntityType.ALIEN_DEAD
        break
      default:
        throw new Error('type cant die')
    }

    this.view.changeType(newType)
    this.type = newType
  }

  // Expects a victim, and emits an event with the damage dealt
  attack(victim: GameEntity) {
    const attacker = this

    if (!attacker.attr || !victim.attr) {
      throw new Error('attacker and victim should have attrs')
    }

    // attacker
    var strength = attacker.attr.strength,
      weaponDamage = attacker.attr.weapon.damage,
      maxDamage = strength * 3 + weaponDamage

    // how much of the damage is random? 0-1
    var accuracy = 0.4,
      fixedDamage = maxDamage * accuracy,
      randomDamage = Math.random() * maxDamage * (1 - accuracy),
      damage = fixedDamage + randomDamage

    // victim
    victim.setHealth(victim.attr.health - damage)

    if (victim.dead) {
      // give experience points to attacker
      this.addExp(this.experienceForKilling(victim))
    }
  }

  experienceForKilling(victim: GameEntity) {
    if (!victim.attr || !this.attr) {
      throw new Error('victim needs to have attr')
    }
    // pretty simple right now.. i'm sure this can change later
    return victim.attr.level / this.attr.level
  }

  setHealth(newHealth: number) {
    if (!this.attr) {
      throw new Error('we need to have attr')
    }

    const oldHealth = this.attr.health
    if (oldHealth == newHealth) return
    if (this.attr) {
      this.attr.health = newHealth
    }

    if (newHealth <= 0) {
      this.setDead()
    }

    Whisper.say('entity_health_change', this, newHealth - oldHealth)
  }

  addExp(exp: number) {
    if (!this.attr) {
      throw new Error('calling addExp on an entity without attr')
    }

    const newExp = this.attr.exp + exp,
      oldLevel = this.attr.level,
      newLevel = 1 + Math.floor(newExp / 10)

    this.attr.exp = newExp
    this.attr.level = newLevel
    if (newLevel > oldLevel) {
      Whisper.say('entity_level_up', this)
    }
  }
}
