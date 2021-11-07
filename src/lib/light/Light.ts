import { Position, Size } from '../util/geometry'
import { LightSource } from './LightSource'
import { ShadowCaster } from './ShadowCaster'

export class Light {
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  lastShadowCollection?: ShadowCaster[]
  lastLightSource: LightSource | null
  luminosity = 0

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('failed to get 2d context')
    }

    this.ctx = ctx
    this.lastLightSource = null
  }

  setLuminosity(lum: number) {
    this.luminosity = 1 - lum
  }

  setCanvasSize(size: Size) {
    this.canvas.width = size.width
    this.canvas.height = size.height

    if (this.lastShadowCollection && this.lastLightSource) {
      this.drawShadows(this.lastShadowCollection, this.lastLightSource)
    }
  }

  addGradient(position: Position) {
    var gradient = this.ctx.createRadialGradient(
      position.x,
      position.y,
      0,
      position.x,
      position.y,
      400,
    )
    gradient.addColorStop(0, 'rgba(0,0,0,0)')
    gradient.addColorStop(0.1, 'rgba(0,0,0,0)')
    gradient.addColorStop(1, 'rgba(0,0,0,' + this.luminosity.toFixed(2) + ')')
    this.ctx.fillStyle = gradient
    this.ctx.rect(0, 0, window.innerWidth, window.innerHeight)
    this.ctx.fill()
  }

  // drawShadows
  // This function basically goes through all the objects that block light
  // and draws a shape from the edges of it to further away with a black
  // shadow, towards the angle away from the player
  drawShadows(shadowCollection: ShadowCaster[], ls: LightSource) {
    if (this.luminosity == 0) {
      return
    }
    // remember.. this is ugly. TODO
    this.lastShadowCollection = shadowCollection
    this.lastLightSource = ls
    // figure out what the maximum distance to a shadow is
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    // TODO turn off this shadow if it's at 0 opacity.. requires some refactoring of these draw things
    this.ctx.fillStyle =
      'rgba(0,0,0,' + 0.3 * (this.luminosity > 0.5 ? (this.luminosity - 0.5) * 2 : 0) + ')'
    var leftBounds = 0,
      rightBounds = window.innerWidth
    // we create 3 copies of the same light with a slight offset
    for (var i = -8; i <= 8; i += 8) {
      shadowCollection.forEach((shadowCaster: ShadowCaster) => {
        this.ctx.beginPath()
        // move to the last point we'll be drawing to, which will be the first point
        // then go through the points and compute those that are the furthest away
        // reverse the array, so we'll end in the right place and loop through the
        // original points, so we end where we began
        this.ctx.moveTo(shadowCaster.points[0].x, shadowCaster.points[0].y)
        shadowCaster.points.forEach((point) => {
          var ratio = (point.x + i - ls.x) / (point.y - ls.y)
          var x = point.x > ls.x ? rightBounds : leftBounds,
            y = (x - ls.x) / ratio + ls.y
          this.ctx.lineTo(x, y)
        })
        shadowCaster.points.reverse()
        shadowCaster.points.forEach((point) => {
          this.ctx.lineTo(point.x, point.y)
        })
        this.ctx.fill()
      })
    }

    this.ctx.beginPath()
    // now we need to loop through all the original objects to remove them.. so you see all the tops of all objects
    shadowCollection.forEach((shadowCaster) => {
      this.ctx.clearRect(
        shadowCaster.position.x,
        shadowCaster.position.y,
        shadowCaster.size.width,
        shadowCaster.size.height,
      )
    })

    this.addGradient(ls)
  }
}
