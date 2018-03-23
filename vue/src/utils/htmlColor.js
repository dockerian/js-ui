// utils/htmlColor.js

export const hslColors = {
  blue: 240,
  green: 120,
  pink: 300,
  red: 0,
  turquoise: 180,
  yellow: 60
}

/**
  getHslByPercent returns a CSS `hsl()` by percentage, with start/end color.

  @param {Integer} percent - percentage from 0 - 100
  @param {String} start - start color name, default 'red'
  @param {String} end - end color name, default 'green'

  @return {String} - a CSS `hsl()` function string.
**/
export const getHslByPercent = (percent, start, end) => {
  let endValue = hslColors[end] || 100
  let startValue = hslColors[start] || 0
  let p = Math.max(Math.min(percent, 100), 0) / 100
  let r = endValue > startValue ? 0 : 360
  let d = Math.round(startValue + (endValue - startValue + r) * p * p)
  let v = d % 360

  // return a CSS HSL string
  return `hsl(${v}, 100%, 50%)`
}
