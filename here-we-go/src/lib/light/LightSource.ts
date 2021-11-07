import { UNIT } from '../util/constants'
import { Position } from '../types'

// TODO: This is a useless class.. pls remove
export class LightSource implements Position {
  public x
  public y

  constructor(position: Position) {
    this.x = position.x * UNIT
    this.y = position.y * UNIT
  }
}
