export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export type Rect = Size & Position
