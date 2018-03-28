// unit/specs/utils.browser - testing browser functions

import * as hc from '@/utils/browser'

describe('utils.browser.checkViewPortSize', () => {
  it('should return a CSS hsl function string', () => {
    const tests = [
      {
        set: ['', null, undefined, [], {}, 100, NaN, {height: -1}, {width: 3}],
        expected: {height: 1200, width: 1920}
      },
      {
        set: [{height: 200, width: 100}], expected: {height: 200, width: 300}
      },
      {
        set: [{height: 'a', width: 500}], expected: {height: 1200, width: 500}
      },
      {
        set: [{height: 600, width: 'x'}], expected: {height: 600, width: 1920}
      },
      {
        set: [{height: 4000, width: 'x'}], expected: {height: 2400, width: 1920}
      },
      {
        set: [{height: 300, width: 6000}], expected: {height: 300, width: 3840}
      }
    ]
    for (let data of tests) {
      for (let test of data.set) {
        let result = hc.checkViewPortSize(test)
        console.log('input:', JSON.stringify(test), ' => result:', JSON.stringify(result))
        expect(result).toEqual(data.expected)
      }
    }
  })
})
