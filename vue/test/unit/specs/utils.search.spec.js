// unit/specs/search - testing search filters functions

import * as search from '@/utils/search'
import * as str from '@/utils/str'

describe('utils.search.addFilters', () => {
  it('should return added filters', () => {
    const tests = [
      {
        filters: {
          a: 'a',
          b: ['b', 'bb', 'bbb']
        },
        adds: {},
        expected: {
          a: 'a',
          b: ['b', 'bb', 'bbb']
        }
      },
      {
        filters: {
          state: ['New']
        },
        adds: {
          state: ['Suspect', 'Approved']
        },
        expected: {
          state: ['Approved', 'New', 'Suspect']
        }
      },
      {
        filters: {
          a: ['a'],
          b: ['b', 'bb', 'bbb']
        },
        adds: {
          a: 'aa',
          b: 'bb'
        },
        expected: {
          a: ['a', 'aa'],
          b: ['b', 'bb', 'bbb']
        }
      },
      {
        filters: {
          a: ['a', 'aa'],
          b: ['b', 'bb', 'bbb']
        },
        adds: {
          aa: 'aa',
          b: ['bb', 'bbb'],
          bb: ['bb'],
          c: ['c', 'cc']
        },
        expected: {
          a: ['a', 'aa'],
          aa: ['aa'],
          b: ['b', 'bb', 'bbb'],
          bb: ['bb'],
          c: ['c', 'cc']
        }
      }
    ]
    for (let test of tests) {
      let copy = Object.assign({}, test.filters)
      let result = search.addFilters(test.filters, test.adds)
      expect(result).toEqual(test.expected)
      expect(test.filters).toEqual(copy)
    }
  })
})

describe('utils.search.checkFilters', () => {
  it('should return normalized filters', () => {
    const states = Object.values({
      new: 'New',
      approved: 'Approved',
      rejected: 'Rejected',
      suspect: 'Suspect'
    })
    const keymap = {
      a: 'adhoc',
      b: 'bar'
    }
    const checkerLookup = (s) => (({
      bar: (v) => isNaN(v) ? '' : v,
      d: str.parseDate,
      x: (s) => str.checkLookup(s, states)
    })[s] || (s => s))

    const tests = [
      {
        filters: {
          a: ['a'],
          b: ['b', 'bb', 'bbb'],
          c: ['c', 'cc']
        },
        keymap: {},
        checkerLookup: null,
        expected: {
          a: ['a'],
          b: ['b', 'bb', 'bbb'],
          c: ['c', 'cc']
        }
      },
      {
        filters: {
          a: ['a'],
          b: ['b', 'bb', 'bbb'],
          c: ['c', 'cc']
        },
        keymap: keymap,
        checkerLookup: null,
        expected: {
          adhoc: ['a'],
          bar: ['b', 'bb', 'bbb'],
          c: ['c', 'cc']
        }
      },
      {
        filters: {
          a: ['abc'],
          b: [0, 'b', 20, 10, 30, 'x'],
          d: ['a', '2018', '2018-01-01', '2017-01-16', 'invalid'],
          x: ['new', 'Approve', 'deactive', 'xyz']
        },
        keymap: keymap,
        checkerLookup: checkerLookup,
        expected: {
          adhoc: ['abc'],
          bar: [0, 10, 20, 30],
          d: ['2017-01-16', '2018-01-01'],
          x: ['Approved', 'New']
        }
      }
    ]
    for (let test of tests) {
      let copy = Object.assign({}, test.filters)
      let result = search.checkFilters(test.filters, test.keymap, test.checkerLookup)
      expect(result).toEqual(test.expected)
      expect(test.filters).toEqual(copy)
    }
  })
})

describe('utils.search.countFilters', () => {
  it('should return numbers of filters', () => {
    const tests = [
      {
        filters: {},
        expected: 0
      },
      {
        filters: {
          a: ['a'],
          b: ['b', 'bb', 'bbb'],
          c: ['c', 'cc']
        },
        expected: 6
      },
      {
        filters: {
          a: 'abc',
          b: [0, 10, 20, 30],
          c: null
        },
        expected: 5
      }
    ]
    for (let test of tests) {
      let copy = Object.assign({}, test.filters)
      let result = search.countFilters(test.filters)
      expect(result).toEqual(test.expected)
      expect(test.filters).toEqual(copy)
    }
  })
})

describe('utils.search.deleteFilters', () => {
  it('should return spliced filters', () => {
    const tests = [
      {
        filters: {
          a: 'a',
          b: ['b', 'bb', 'bbb']
        },
        removes: {},
        expected: {
          a: 'a',
          b: ['b', 'bb', 'bbb']
        }
      },
      {
        filters: {
          a: ['a'],
          b: ['b', 'bb', 'bbb']
        },
        removes: {
          a: 'aa',
          b: 'bb'
        },
        expected: {
          a: ['a'],
          b: ['b', 'bbb']
        }
      },
      {
        filters: {
          a: ['a', 'aa'],
          b: ['b', 'bb', 'bbb'],
          c: ['c', 'cc']
        },
        removes: {
          aa: 'aa',
          bb: 'bb',
          c: ['c', 'cc']
        },
        expected: {
          a: ['a', 'aa'],
          b: ['b', 'bb', 'bbb']
        }
      }
    ]
    for (let test of tests) {
      let copy = Object.assign({}, test.filters)
      let result = search.deleteFilters(test.filters, test.removes)
      expect(result).toEqual(test.expected)
      expect(test.filters).toEqual(copy)
    }
  })
})

describe('utils.search.deleteFilterKeys', () => {
  it('should return filters excluding spcific keys', () => {
    const tests = [
      {
        filters: {
          a: 'a',
          b: ['b', 'bb', 'bbb']
        },
        keys: {},
        expected: {
          a: 'a',
          b: ['b', 'bb', 'bbb']
        }
      },
      {
        filters: {
          a: 'a',
          b: ['b', 'bb', 'bbb']
        },
        keys: 'a',
        expected: {
          b: ['b', 'bb', 'bbb']
        }
      },
      {
        filters: {
          a: 'a',
          b: ['b', 'bb'],
          c: ['c', 'cc', 'ccc']
        },
        keys: 'a, aa c; a',
        expected: {
          b: ['b', 'bb']
        }
      },
      {
        filters: {
          a: ['a'],
          b: ['b', 'bb', 'bbb']
        },
        keys: {
          a: 'aa',
          b: 'bb'
        },
        expected: {}
      },
      {
        filters: {
          a: ['a', 'aa'],
          b: ['b', 'bb', 'bbb'],
          c: ['c', 'cc']
        },
        keys: ['aa', 'b'],
        expected: {
          a: ['a', 'aa'],
          c: ['c', 'cc']
        }
      },
      {
        filters: {
          a: ['a', 'aa'],
          b: ['b', 'bb', 'bbb'],
          c: ['c', 'cc']
        },
        keys: ['a', 'bb', 'cc'],
        expected: {
          b: ['b', 'bb', 'bbb'],
          c: ['c', 'cc']
        }
      }
    ]
    for (let test of tests) {
      let copy = Object.assign({}, test.filters)
      let result = search.deleteFilterKeys(test.filters, test.keys)
      expect(result).toEqual(test.expected)
      expect(test.filters).toEqual(copy)
    }
  })
})

describe('utils.search.getQueryString', () => {
  it('should return a URL query string', () => {
    const tests = [
      {
        filters: {},
        expected: ''
      },
      {
        filters: {
          key: 'value'
        },
        expected: 'key=value'
      },
      {
        filters: {
          a: 1,
          b: [2, 22]
        },
        expected: 'a=1&b=2&b=22'
      },
      {
        filters: {
          a: 'a',
          b: ['b', 'bb'],
          c: ['c', 'cc', 'ccc']
        },
        expected: 'a=a&b=b&b=bb&c=c&c=cc&c=ccc'
      },
      {
        filters: {
          a: ['a a a'],
          b: 2
        },
        expected: 'a=a a a&b=2'
      }
    ]
    for (let test of tests) {
      let copy = Object.assign({}, test.filters)
      let result = search.getQueryString(test.filters)
      expect(result).toEqual(test.expected)
      expect(test.filters).toEqual(copy)
    }
  })
})

describe('utils.search.mergeFilters', () => {
  it('should return merged filters', () => {
    const tests = [
      {
        filters1: {},
        filters2: {},
        expected: {}
      },
      {
        filters1: {
          a: 0,
          b: [9, 10, 12]
        },
        filters2: {
          a: 1,
          b: 11
        },
        expected: {
          a: [0, 1],
          b: [10, 11, 12, 9]
        }
      },
      {
        filters1: {
          a: ['a'],
          d: ['d', 'dd', 'ddd', 'dddd']
        },
        filters2: {},
        expected: {
          a: ['a'],
          d: ['d', 'dd', 'ddd', 'dddd']
        }
      },
      {
        filters1: [],
        filters2: {
          a: ['a', 'aa'],
          c: ['3', '33', '333']
        },
        expected: {
          a: ['a', 'aa'],
          c: ['3', '33', '333']
        }
      },
      {
        filters1: {
          a: ['a'],
          b: ['bb', 'b'],
          c: ['c3'],
          d: ['d', 'dd', 'ddd', 'dddd']
        },
        filters2: {
          a: ['aa'],
          b: ['b', 'bb'],
          c: ['c1', 'c2', 'c4'],
          cc: ['cc', 'ccc']
        },
        expected: {
          a: ['a', 'aa'],
          b: ['b', 'bb'],
          c: ['c1', 'c2', 'c3', 'c4'],
          cc: ['cc', 'ccc'],
          d: ['d', 'dd', 'ddd', 'dddd']
        }
      }
    ]
    for (let test of tests) {
      let copyF1 = Object.assign(test.filters1 instanceof Array ? [] : {}, test.filters1)
      let copyF2 = Object.assign(test.filters2 instanceof Array ? [] : {}, test.filters2)
      let result = search.mergeFilters(test.filters1, test.filters2)
      expect(result).toEqual(test.expected)
      expect(test.filters1).toEqual(copyF1)
      expect(test.filters2).toEqual(copyF2)
    }
  })
})

describe('utils.search.parseFilters', () => {
  it('should return parsed filters', () => {
    const tests = [
      {
        searchInput: '',
        result: {}
      },
      {
        searchInput: '   ',
        result: {}
      },
      {
        searchInput: ['abc'], // expect string input only
        result: {}
      },
      {
        searchInput: {a: 'abc'}, // expect string input only
        result: {}
      },
      {
        searchInput: ' abc  ',
        result: {
          default: ['abc']
        }
      },
      {
        searchInput: 'abc xyz foo bar',
        result: {
          default: ['abc', 'xyz', 'foo', 'bar']
        }
      },
      {
        searchInput: 'abc xyz abc  abc+def/g abc', // some chars to be ignored
        defaultKey: 'key1',
        ignoreChars: '\\+/',
        result: {
          key1: ['abc', 'xyz', 'abcdefg']
        }
      },
      {
        searchInput: `  firstSeen:2018-01-02 notes:"  here go tests. "
          ab.com domain:test.org   " a long one" `,
        defaultKey: 'domain',
        result: {
          domain: ['ab.com', 'test.org', 'a long one'],
          firstSeen: ['2018-01-02'],
          notes: ['here go tests.']
        }
      }
    ]
    for (let test of tests) {
      let result = search.parseFilters(test.searchInput, test.defaultKey, test.ignoreChars)
      expect(result).toEqual(test.result)
    }
  })
})
