import { UNIT } from './constants'
import { Position } from './geometry'

export const dimension = function (dimension: number): string {
  return px(dimension * UNIT)
}

export const px = (dimension: number) => {
  return `${dimension}px`
}

export const distanceBetweenPoints = function (position1: Position, position2: Position): number {
  // good ol' Pytho
  const a = Math.pow(position1.x - position2.x, 2)
  const b = Math.pow(position1.y - position2.y, 2)
  return Math.sqrt(a + b)
}

export const formatStat = function (stat: number): string {
  return `${Math.floor(stat)}`
}

export interface ValidCanvas {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
}

export const getValidCanvas = (selector: string): ValidCanvas => {
  const canvas = dqs<HTMLCanvasElement>(selector)
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error(`no <canvas> 2dcontext: ${selector}`)
  }

  return {
    canvas,
    ctx,
  }
}

export const dqs = <T extends Element>(selector: string, parent?: HTMLElement): T => {
  const el = (parent ?? document).querySelector<T>(selector)
  if (!el) {
    throw new Error(`Query selector didnt find: '${selector}'`)
  }

  return el
}

type StyleKeys = keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>
type Styles = {
  [key in StyleKeys]?: string
}

export type ElTag = keyof HTMLElementTagNameMap
export interface ElDescriptor {
  tag: ElTag
  class?: string
  kids?: ElDescriptor[] | string
  style?: Styles
}

export const makeEl = <T extends HTMLElement>(d: ElDescriptor): T => {
  const el = document.createElement(d.tag)
  if (d.class) {
    el.classList.add(d.class)
  }

  if (d.style) {
    Object.entries(d.style).forEach(([key, val]) => {
      if (val) {
        el.style.setProperty(key, val)
      }
    })
  }

  if (d.kids) {
    if (Array.isArray(d.kids)) {
      d.kids.forEach((descriptor) => {
        el.appendChild(makeEl(descriptor))
      })
    } else {
      el.innerHTML = d.kids
    }
  }

  return el as T
}
