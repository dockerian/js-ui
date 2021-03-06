// unit/specs/str - testing str functions

import * as str from '@/utils/str'

describe('utils.str.camelize', () => {
  it('should return a string in camel case format', () => {
    let tests = [
      { input: 'camelizeTest', expected: 'camelizeTest' },
      { input: 'camelCaseTest', expected: 'camelCaseTest' },
      { input: 'WhatAGame', expected: 'whatAGame' },
      { input: ' this is a test ', expected: 'thisIsATest' },
      { input: 'This is a test', expected: 'thisIsATest' },
      { input: { str: 'string object' }, expected: '' },
      { input: '', expected: '' }
    ]
    for (let test of tests) {
      let result = str.camelize(test.input)
      expect(result).toBe(test.expected)
    }
  })
})

describe('utils.str.checkLookup', () => {
  it('should return a matched string in dictionary', () => {
    const msgTypes = {
      debug: 'Log', // debugging message
      info: 'Informational', // generic or successful message
      warn: 'Warning', // caution or warning
      error: 'Error', // error or failure
      fatal: 'Fatal' // system failure
    }
    const tests = [
      {
        s: 'test',
        expected: ''
      },
      {
        s: 'info',
        expected: 'info'
      },
      {
        s: 'inform',
        expected: 'info'
      },
      {
        s: 'debug',
        expected: 'debug'
      },
      {
        s: 'log',
        expected: 'debug'
      },
      {
        s: 'Warn',
        expected: 'warn'
      }
    ]
    for (let test of tests) {
      let result = str.checkLookup(test.s, msgTypes, true)
      expect(result).toEqual(test.expected)
    }
  })

  it('should return a matched string in array', () => {
    const dicts = ['New', 'Approved', 'Rejected', 'Suspect', 'Deactivated']
    const tests = [
      {
        s: 101,
        expected: ''
      },
      {
        s: '',
        expected: ''
      },
      {
        s: '1/16/2017',
        expected: ''
      },
      {
        s: 'new',
        expected: 'New'
      },
      {
        s: 'approve',
        expected: 'Approved'
      },
      {
        s: 'deact',
        expected: 'Deactivated'
      },
      {
        s: 'deactive',
        expected: ''
      },
      {
        s: 'reject',
        expected: 'Rejected'
      }
    ]
    for (let test of tests) {
      let result = str.checkLookup(test.s, dicts)
      expect(result).toEqual(test.expected)
    }
  })
})

describe('utils.str.checkOrderBy', () => {
  let columns = [
    'domain', 'firstSeen', 'notes', 'lastSeen', 'pattern'
  ]
  let tests = [
    {input: 'notes', keys: columns, expected: 'notes'},
    {input: 'Pattern', keys: columns, expected: 'pattern'},
    {input: 'firstseen desc', keys: columns, expected: 'firstSeen desc'},
    {input: 'domain desc', keys: columns, expected: 'domain desc'},
    {input: 'name asc', keys: columns, expected: ''},
    {input: 'name desc', keys: columns, expected: ''},
    {input: 'name', keys: columns, expected: ''},
    {input: 'name', expected: ''},
    {input: undefined, expected: ''},
    {input: {}, expected: ''},
    {input: '', keys: columns, expected: ''},
    {input: '', expected: ''}
  ]
  for (let test of tests) {
    let result = str.checkOrderBy(test.input, test.keys)
    expect(result).toBe(test.expected)
  }
})

describe('utils.str.clock', () => {
  it('should return clock time in format of \'HH:MM:SS\'', () => {
    let clock = str.clock()
    let regex = /\d{2}:\d{2}:\d{2}/
    expect(clock).toMatch(regex)
  })
})

describe('utils.str.contactToHTML', () => {
  it('should return mailto in HTML', () => {
    let tests = [
      {
        contact: 'Foobar',
        expected: 'Foobar'
      },
      {
        contact: '  foobar@abc.edu',
        expected: '<a href="mailto:foobar@abc.edu">foobar@abc.edu</a>'
      },
      {
        contact: 'Foo Bar   <foobar@abc.edu>',
        expected: '<a href="mailto:foobar@abc.edu">Foo Bar</a>'
      },
      {
        contact: {},
        expected: ''
      }
    ]

    for (let test of tests) {
      let result = str.contactToHTML(test.contact)
      expect(result).toBe(test.expected)
    }
  })
})

describe('utils.str.jsonStringify', () => {
  it('should return a JSON string', () => {
    let tests = [{
      input: [{'y': 'z', 'x': 1}, {'a': {'h': 4, 'z': 3, 'm': {'s': 'test', 'a': 2}}, 'd': 2, 'y': 'yyy', 'c': 1, 22: 222, '1a': '11a'}],
      expected: '[{"x":1,"y":"z"},{"1a":"11a","22":222,"a":{"h":4,"m":{"a":2,"s":"test"},"z":3},"c":1,"d":2,"y":"yyy"}]'
    }, {
      input: {'a': 9, 'b': 3, '_': 'None'},
      expected: '{"_":"None","a":9,"b":3}'
    }, {
      input: {'a': 9, 'b': 3, '_': 'None'}, space: 2, expected: `{
  "_": "None",
  "a": 9,
  "b": 3
}`
    }, {
      input: -3.14, expected: '-3.14'
    }, {
      input: 123, expected: '123'
    }, {
      input: [''], expected: '[""]'
    }, {
      input: {}, expected: '{}'
    }, {
      input: '', expected: '""'
    }]
    for (let test of tests) {
      let result = str.jsonStringify(test.input, test.space)
      expect(result).toBe(test.expected)
    }
    expect(str.jsonStringify()).toBe(undefined)
  })
})

describe('utils.str.parseDateTime', () => {
  it('should return a normalized datetime string', () => {
    const dtJan = new Date('1/16/2017')
    const tzVal = (dtJan.getTimezoneOffset()) / 60
    const tzAdd = (dtJan.getTimezoneOffset()) <= 0 // before or equal GMT
    const tzOff = (dtJan.getTimezoneOffset()) >= 0 // behind or equal GMT
    // all test dates are in non-DST months
    const tests = [
      {
        s: '',
        expected: ''
      },
      {
        s: '1/16/2017',
        expected: tzOff ? '2017-01-16' : '2017-01-15'
      },
      {
        s: 'Feb 14, 2017',
        expected: tzOff ? '2017-02-14' : '2017-02-13'
      },
      {
        s: '2018-01-16',
        toLocale: true,
        gmtFormat: true,
        expected: tzAdd ? '2018-01-16' : '2018-01-15'
      },
      {
        s: '2018-01-01',
        toLocale: true,
        gmtFormat: true,
        expected: tzAdd ? '2018-01-01' : '2017-12-31'
      },
      {
        s: '2017-09-23',
        gmtFormat: true,
        expected: '2017-09-23'
      },
      {
        s: '2018-2-1',
        toLocale: true,
        expected: '2018-02-01'
      },
      {
        s: '2018.2.14',
        expected: tzOff ? '2018-02-14' : '2018-02-13'
      },
      {
        s: '2018/2/16',
        expected: tzOff ? '2018-02-16' : '2018-02-15'
      }
    ]

    for (let test of tests) {
      let result = str.parseDateTime(test.s, test.toLocale)
      let utcHrs = test.gmtFormat ? 0 : (24 + tzVal) % 24
      let locHrs = test.gmtFormat ? (24 - tzVal) % 24 : 0
      let valHrs = test.toLocale ? locHrs : utcHrs
      let padHrs = valHrs.toString().padStart(2, '0')
      let target = result ? `${test.expected} ${padHrs}:00:00` : ''
      // let tzInfo = tzVal !== 0 ? (tzVal > 0 ? '-' : '+') : '0'
      // let option = `tzoffset [${tzInfo}] ${test.toLocale ? '(toLocale)' : ''}`
      // console.log(`--- parse: '${test.s}' -> '${target}' ${option}`)
      expect(result).toEqual(target)
    }
  })
})

describe('utils.str.parseDate', () => {
  it('should return a normalized date string', () => {
    const tzVal = (new Date().getTimezoneOffset()) / 60
    const tzAdd = (new Date().getTimezoneOffset()) <= 0 // before or equal GMT
    const tzOff = (new Date().getTimezoneOffset()) >= 0 // behind or equal GMT
    const tests = [
      {
        s: '',
        expected: ''
      },
      {
        s: '1/16/2017',
        expected: tzOff ? '2017-01-16' : '2017-01-15'
      },
      {
        s: 'Feb 14, 2017',
        expected: tzOff ? '2017-02-14' : '2017-02-13'
      },
      {
        s: '2018-01-16',
        toLocale: true,
        expected: tzAdd ? '2018-01-16' : '2018-01-15'
      },
      {
        s: '2018-01-01',
        toLocale: true,
        expected: tzAdd ? '2018-01-01' : '2017-12-31'
      },
      {
        s: '2017-09-23',
        expected: '2017-09-23'
      },
      {
        s: '2018-2-1',
        toLocale: true,
        expected: '2018-02-01'
      },
      {
        s: '2018.2.14',
        expected: tzOff ? '2018-02-14' : '2018-02-13'
      },
      {
        s: '2018/2/16',
        expected: tzOff ? '2018-02-16' : '2018-02-15'
      }
    ]

    for (let test of tests) {
      let result = str.parseDate(test.s, test.toLocale)
      // let tzInfo = tzVal !== 0 ? (tzVal > 0 ? '+' : '+') : '0'
      // let option = `tzoffset [${tzInfo}] ${test.toLocale ? '(toLocale)' : ''}`
      // console.log(`--- parseDate: '${test.s}' -> '${test.expected}' ${option}`)
      expect(tzVal).toBeLessThanOrEqual(14)
      expect(tzVal).toBeGreaterThanOrEqual(-12)
      expect(result).toEqual(test.expected)
    }
  })
})
