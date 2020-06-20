// unit/specs/utils.htmlColor - testing htmlColor functions

import * as hc from '@/utils/htmlColor'

describe('utils.htmlColor.getHslByPercent', () => {
  it('should return a CSS hsl function string', () => {
    const tests = [
      {
        percent: 0
      },
      {
        percent: 100,
        start: 'red',
        end: 'green'
      },
      {
        percent: 50,
        start: 'pink',
        end: 'green'
      }
    ]
    for (let test of tests) {
      let result = hc.getHslByPercent(test.percent, test.start, test.end)
      let regexp = /hsl\((\d+), 100%, 50%\)/
      let regmap = result.match(regexp)
      let hslVal = Number.parseInt(regmap[1])

      let endValue = hc.hslColors[test.end] || 100
      let startValue = hc.hslColors[test.start] || 0

      if (test.percent === 0) {
        expect(hslVal).toBe(startValue)
      } else if (test.percent === 100) {
        expect(hslVal).toBe(endValue)
      }

      expect(hslVal).toBeGreaterThanOrEqual(0)
      expect(hslVal).toBeLessThanOrEqual(360)
    }
  })
})
