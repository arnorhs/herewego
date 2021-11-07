import { dimension, dqs, EntityType, Position, Size, UNIT } from './util'
import { Light, LightSource, ShadowCaster } from './light'
import { View } from './view'

type Rect = Size & Position

export class WorldView {
  rootView: HTMLElement
  viewportSize?: Size
  views: View[]
  light: Light
  centerPosition: Position
  currentMapRect?: Rect
  viewportOffset: Position = { x: 0, y: 0 }

  constructor(el: HTMLElement, centerPosition: Position) {
    this.rootView = el
    const canvas = dqs<HTMLCanvasElement>('#light_canvas')
    this.centerPosition = centerPosition
    this.views = []

    this.light = new Light(canvas)
    this.recalculateViewportSize()
    this.redrawViews()

    window.onresize = () => this.redrawViews()
  }

  recalculateViewportSize() {
    // this viewport size is in pixels
    const width = window.innerWidth
    const height = window.innerHeight

    this.viewportSize = {
      width: Math.ceil(width / UNIT),
      height: Math.ceil(height / UNIT),
    }

    this.light.setCanvasSize({
      width: width,
      height: height,
    })
  }

  isInViewport(position: Position): boolean {
    if (!this.viewportSize) {
      return false
    }

    return (
      position.x >= this.viewportOffset.x &&
      position.x < this.viewportOffset.x + this.viewportSize.width &&
      position.y >= this.viewportOffset.y &&
      position.y < this.viewportOffset.y + this.viewportSize.height
    )
  }

  redrawViews() {
    const viewsToShow: View[] = []
    const shadowCollection: ShadowCaster[] = []

    const lightSource = new LightSource({
      x: this.centerPosition.x + 0.5 - this.viewportOffset.x,
      y: this.centerPosition.y + 0.5 - this.viewportOffset.y,
    })

    this.views.forEach((view) => {
      if (this.isInViewport(view.position)) {
        view.element.style.left = dimension(view.position.x - this.viewportOffset.x)
        view.element.style.top = dimension(view.position.y - this.viewportOffset.y)

        if (!view.isPlaced) {
          this.rootView.appendChild(view.element)
          view.isPlaced = true
        }

        if ([EntityType.TREE, EntityType.MOUNTAIN].indexOf(view.type) >= 0) {
          // shadow collection needs the lightsource currently, because it uses it to pick a side
          shadowCollection.push(
            new ShadowCaster(
              {
                x: view.position.x - this.viewportOffset.x,
                y: view.position.y - this.viewportOffset.y,
              },
              view.size,
              lightSource,
            ),
          )
        }
        viewsToShow.push(view)
      } else if (view.isPlaced) {
        this.rootView.removeChild(view.element)
        view.isPlaced = false
      }
    })

    // sort the views based on type
    viewsToShow.sort(function ({ type: a }, { type: b }) {
      if (a === b) {
        return 0
      }

      return b - a
    })

    viewsToShow.forEach((viewToShow) => {
      this.rootView.appendChild(viewToShow.element)
    })

    this.light.drawShadows(shadowCollection, lightSource)
  }

  setViewportOffsetLimits(rect: Rect) {
    this.currentMapRect = rect
  }

  addView(view: View) {
    this.views.push(view)
  }

  centerOnPosition(position: Position) {
    if (!this.viewportSize || !this.currentMapRect) {
      return
    }

    var x = position.x - Math.floor(this.viewportSize.width / 2),
      y = position.y - Math.floor(this.viewportSize.height / 2)
    this.centerPosition = { x: position.x, y: position.y }

    // watch out not to scroll out of bounds. We add a unit in size from the map bounds
    // because we render the last tile on x/y out of bounds of the viewport (see the
    // Math.ceil() call in recalculateViewportSize()
    this.viewportOffset = {
      x: Math.max(
        this.currentMapRect.x,
        Math.min(x, this.currentMapRect.width + 1 - this.viewportSize.width),
      ),
      y: Math.max(
        this.currentMapRect.y,
        Math.min(y, this.currentMapRect.height + 1 - this.viewportSize.height),
      ),
    }

    this.redrawViews()
  }

  animateTextPop(view: View, color: CSSStyleDeclaration['color'], text: string) {
    var position = view.position,
      elem = document.createElement('div')
    elem.className = 'text_pop'
    elem.style.left = dimension(position.x - this.viewportOffset.x)
    elem.style.top = dimension(position.y - this.viewportOffset.y)
    elem.style.color = color
    elem.textContent = text
    // TODO it would probably be nicer to add this to some other view, but for now this is ok
    this.rootView.appendChild(elem)
    setTimeout(() => this.rootView.removeChild(elem), 3000)
  }
}
