import { dimension, EntityType, makeEl, Position, Size, UNIT } from './util'
import { Light, LightSource, ShadowCaster } from './light'
import { View } from './view'

type Rect = Size & Position

export class WorldView {
  rootView: HTMLElement
  viewportSize?: Size
  private readonly views: View[]
  light: Light
  centerPosition: Position
  currentMapRect?: Rect
  viewportOffset: Position = { x: 0, y: 0 }

  constructor(el: HTMLElement, centerPosition: Position, light: Light) {
    this.rootView = el
    this.centerPosition = centerPosition
    this.views = []

    this.light = light
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
          view.isPlaced = true
          viewsToShow.push(view)
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
      } else if (view.isPlaced) {
        this.rootView.removeChild(view.element)
        view.isPlaced = false
      }
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
    const position = view.position

    const el = makeEl({
      tag: 'div',
      class: 'text_pop',
      style: {
        left: dimension(position.x - this.viewportOffset.x),
        top: dimension(position.y - this.viewportOffset.y),
        color,
        display: 'block',
      },
      kids: text,
    })

    // TODO it would probably be nicer to add this to some other view, but for now this is ok
    this.rootView.appendChild(el)

    setTimeout(() => this.rootView.removeChild(el), 3000)
  }
}
