// unit/specs/utils.jsKits - testing jsKits functions

import * as kit from '@/utils/jsKits'

describe('utils.jsKits', () => {
  it('utils.jsKits.arrayContains', () => {
    let arrayObj = [
      0,
      11,
      222,
      'aaaa',
      'bbbbb',
      ''
    ]
    let tests = [
      { item: '', expected: true },
      { item: 'aaaa', expected: true },
      { item: 'aaaaa', expected: false },
      { item: '  ', expected: false },
      { item: [], expected: false },
      { item: [1, 2, 3], expected: false },
      { item: [11, 'aaaa'], expected: true },
      { item: ['bbbb', 0, 222], expected: true },
      { item: [11, 'aaaa', 0, 222, 'bbbbb', ''], expected: true },
      { item: null, expected: false }
    ]
    for (let test of tests) {
      let result1 = arrayObj.contains(test.item)
      let result2 = kit.arrayContains(arrayObj, test.item)
      expect(result1).toBe(test.expected)
      expect(result1).toBe(result2)
    }
  })
})

describe('utils.jsKits.getPropByIdentifer', () => {
  it('should return undefined for non-object', () => {
    let tests = [
      '', 'abc', 'more\nlines', -1, 0, 2, 999, 3.14,
      NaN, undefined, true, null
    ]
    for (let test of tests) {
      let result = kit.getPropByIdentifer(test, 'key')
      expect(result).toBeUndefined()
    }
  })

  it('should return an object property by identifier', () => {
    let obj = {
      a: {
        a1: {
          aa1: 'vvv', aa2: 'zzz'
        },
        a2: 'a2',
        a3: {
          aa1: {aaa3: 'a.a3.aa1.aaa3'},
          aa2: {aaa3: 'here'}
        }
      },
      b: {b1: {bb1: {bbb1: 'bbb1'}}},
      c: {
        'cc': {'ccc': [0, 1, 2, {'3': {ccc3: 'mixed'}}, 5, 7]}
      },
      d: {
        'd-1': {
          ' space key ': {'  2-s.before': 'space value'}
        }
      },
      p: {pi: [3, 1, 4, 1, 5, 9, 2, 6]}
    }
    let tests = [
      {
        set: [ '', 'xyz', 'a.b.c.d', 'a.a1.aa1.aaa1', '@#$%', 3 ],
        expected: undefined
      },
      {
        set: [ [], [1, 2, 3], {}, { a: 'a1' }, 'a.a1.', 'c.cc.ccc.3.ccc3' ],
        expected: undefined
      },
      {
        set: [ 'a.a1' ],
        expected: { aa1: 'vvv', aa2: 'zzz' }
      },
      {
        set: [ 'a.a1.aa2' ],
        expected: 'zzz'
      },
      {
        set: [ 'a.a3.aa1' ],
        expected: { aaa3: 'a.a3.aa1.aaa3' }
      },
      {
        set: [ 'a.a3.aa1.aaa3' ],
        expected: 'a.a3.aa1.aaa3'
      },
      {
        set: [ 'b.b1.bb1' ],
        expected: {bbb1: 'bbb1'}
      },
      {
        set: [ 'c.cc.ccc.3.3.ccc3' ],
        expected: 'mixed'
      },
      {
        delimiter: '|',
        discards: /[<>]/g,
        set: ['d|<d-1>|< space key >|<  2-s.before>'],
        expected: 'space value'
      },
      {
        delimiter: '|',
        discards: /[<>]/g,
        set: ['d|<d-1>|<space key>|<2-s.before>'],
        expected: undefined
      },
      {
        set: [ 'p.pi.-1' ],
        expected: 6
      },
      {
        set: [ 'p.pi.5' ],
        expected: 9
      }
    ]
    for (let suite of tests) {
      for (let test of suite.set) {
        let result = kit.getPropByIdentifer(
          obj, test, suite.delimiter, suite.discards)
        expect(result).toEqual(suite.expected)
      }
    }
  })
})
