// tests/unit/specs/router.spec.js - testing vue router

import router from '@/router'
import { scrollBehavior } from '@/router'
import stringify from 'fast-safe-stringify'

beforeEach(async () => {
})

describe('router', () => {
  it(`router :: mode`, () => {
    expect(router.mode).toBe('history')
  })

  it(`router :: scrollBehavior`, () => {
    console.log(stringify(router, undefined, 2))

    let fn = scrollBehavior
    let tests = [{
      to: {}, from: {}, saved: 10, expected: 10
    }, {
      to: {}, from: {}, saved: undefined, expected: { x: 0, y: 0 }
    }, {
      to: { hash: 'anchor' }, from: {}, saved: 10,
      expected: { selector: 'anchor' }
    }]
    for (let test of tests) {
      let result = fn(test.to, test.from, test.saved)
      expect(result).toEqual(test.expected)
    }
  })
})
