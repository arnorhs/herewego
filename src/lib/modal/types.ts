import { Size } from '../util/geometry'

export interface Modal {
  getContent: () => HTMLElement
  getSize: () => Size
}
