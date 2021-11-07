import { EntityType } from '../constants'
import { Armor, Weapon } from '../posessions'

export interface EntityAttr extends Record<string, unknown> {
  level: number
  strength: number
  health: number
  weapon: Weapon
  armor: Armor | null
  exp: number
  maxHealth?: number
}

export const defaultAttributesForType = (type: EntityType): EntityAttr | undefined => {
  switch (type) {
    case EntityType.ALIEN:
      return {
        level: 1,
        strength: 1,
        health: 10,
        weapon: new Weapon(2),
        armor: null,
        exp: 0,
      }
    case EntityType.PLAYER:
      return {
        level: 1,
        strength: 1,
        maxHealth: 20,
        health: 20,
        weapon: new Weapon(5),
        armor: null,
        exp: 0,
      }
  }

  return
}
