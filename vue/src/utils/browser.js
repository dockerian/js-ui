// utils/browser.js

// maximum view port size in [width, height]
const MAXIMUM_VIEW_PORT_SIZE = [3840, 2400]
// minimum view port size in [width, height]
const MINIMUM_VIEW_PORT_SIZE = [300, 200]

/**
  checkViewPortSize checks and returns a valid view port size within limits.

  @param {Array} v - view port size in [with, height].

  @return {Array} corrected view port size in limits.
**/
export const checkViewPortSize = (v) => {
  let maxW = MAXIMUM_VIEW_PORT_SIZE[0]
  let minW = MINIMUM_VIEW_PORT_SIZE[0]
  let maxH = MAXIMUM_VIEW_PORT_SIZE[1]
  let minH = MINIMUM_VIEW_PORT_SIZE[1]
  let half = MAXIMUM_VIEW_PORT_SIZE.map(e => e / 2)
  let size = v && v.height && v.width ? v : { height: half[1], width: half[0] }
  size.height = Math.max(Math.min(size.height, maxH), minH) || half[1]
  size.width = Math.max(Math.min(size.width, maxW), minW) || half[0]
  return size
}
