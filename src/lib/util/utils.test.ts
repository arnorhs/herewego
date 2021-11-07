import { dimension, px, distanceBetweenPoints, formatStat } from './utils'

describe('dimension', () => {
  it('should return scaled dimension in pixels as string', () => {
    const str = dimension(37)
    const expected = 48 * 37

    expect(str).toBe(`${expected}px`)
  })
})

describe('px', () => {
  it('should return pixeled string', () => {
    expect(px(1)).toBe('1px')
    expect(px(0)).toBe('0px')
    expect(px(-10)).toBe('-10px')
  })
})

describe('distanceBetweenPoints', () => {
  it('should return the correct pythagorian distance', () => {
    const dist = distanceBetweenPoints({ x: 0, y: 0 }, { x: 3, y: 4 })
    expect(dist).toEqual(5)
  })
  it('should work when inverted', () => {
    const dist = distanceBetweenPoints({ x: 0, y: 0 }, { x: 4, y: 3 })
    expect(dist).toEqual(5)
  })
  it('should work with negative distance', () => {
    const dist = distanceBetweenPoints({ x: 3, y: 4 }, { x: 0, y: 0 })
    expect(dist).toEqual(5)
  })
})

describe('formatStat', () => {
  it('should format floats correctly', () => {
    expect(formatStat(4.2322)).toBe('4')
    expect(formatStat(4.9322)).toBe('4')
  })
})
