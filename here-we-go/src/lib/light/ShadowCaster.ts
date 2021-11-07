import { LightSource } from './LightSource'
import { Position, Size } from '../types'
import { UNIT } from '../constants'
import { distanceBetweenPoints } from '../utils'

// used to store an object that can cast shadows
export class ShadowCaster {
  public readonly points: [Position, Position]
  public readonly position: Position
  public readonly size: Size

  constructor(pos: Position, sz: Size, lightSource: LightSource) {
    // convert from game sizes to pixel sizes
    const position = {
      x: pos.x * UNIT,
      y: pos.y * UNIT,
    }
    const size = {
      width: sz.width * UNIT,
      height: sz.height * UNIT,
    }
    // we can figure out the greatest degrees by using:
    // (b^2 + c^2 - a^2)/(2bc)
    //
    // TODO: This is pretty horrible..
    // Should probably be using a convex hull algorithm.
    // even a Gift Wrapping algorithm would do the trick, or if we start doing something
    // more complicated a QuickHull algorithm
    // http://westhoffswelt.de/blog/0040_quickhull_introduction_and_php_implementation.html/
    const points: Position[] = [
      { x: position.x, y: position.y },
      { x: position.x + size.width, y: position.y },
      { x: position.x + size.width, y: position.y + size.height },
      { x: position.x, y: position.y + size.height },
    ]

    let minDegrees = 100,
      maxPoints: [Position, Position] | undefined = undefined

    for (var i = 0; i < points.length - 1; i++) {
      for (var j = i + 1; j < points.length; j++) {
        // the missing corner is A
        // sizes of sides
        const a = distanceBetweenPoints(points[i], points[j]),
          b = distanceBetweenPoints(lightSource, points[j]),
          c = distanceBetweenPoints(lightSource, points[i])
        var degrees = (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)
        degrees = Math.pow(Math.acos(degrees), -1)
        if (degrees <= minDegrees) {
          maxPoints = [points[i], points[j]]
          minDegrees = degrees
        }
      }
    }

    if (!maxPoints) {
      throw new Error('maxPoints was not assigned')
    }

    this.points = maxPoints
    this.position = position
    this.size = size
  }
}
