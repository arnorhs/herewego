import { Position } from './geometry'

export const UNIT = 48

export const INITIAL_PLAYER_POSITION: Position = { x: 73, y: 33 }

// player states
export enum PlayerState {
  IDLE = 'IDLE',
  MOVING = 'MOVING',
  ATTACKING = 'ATTACKING',
}

// define entity types - probably should define
export enum EntityType {
  PLAYER = 1,
  ALIEN = 2,
  PERSON_COWBOY = 3,
  ALIEN_DEAD = 4,
  HOUSE_HEALING = 5,
  HOUSE_RESTING = 6,
  HOUSE_SPACESHIP = 7,
  HOUSE_TOWER = 8,
  HOUSE_FORTRESS = 9,
  GRASS = 10,
  SAND = 11,
  TREE = 12,
  WATER = 13,
  BRIDGE_V = 14,
  BRIDGE_H = 15,
  MOUNTAIN = 16,
  ROAD = 17,
}

export const PLAYER_STATS = [
  'level',
  'exp',
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
]
