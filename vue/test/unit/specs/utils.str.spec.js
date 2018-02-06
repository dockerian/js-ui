// unit/specs/str - testing str functions

import * as str from '@/utils/str'

describe('utils.str.checkLookup', () => {
  it('should return a matched string in dictionary', () => {
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

describe('utils.str.clock', () => {
  it('should return clock time in format of \'HH:MM:SS\'', () => {
    let clock = str.clock()
    let regex = /\d{2}:\d{2}:\d{2}/
    expect(clock).toMatch(regex)
  })
})

describe('utils.str.parseDateTime', () => {
  it('should return a normalized datetime string', () => {
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
      let tzInfo = tzVal !== 0 ? (tzVal > 0 ? '-' : '+') : '0'
      let option = `tzoffset [${tzInfo}] ${test.toLocale ? '(toLocale)' : ''}`
      let utcHrs = test.gmtFormat ? 0 : (24 + tzVal) % 24
      let locHrs = test.gmtFormat ? (24 - tzVal) % 24 : 0
      let valHrs = test.toLocale ? locHrs : utcHrs
      let padHrs = valHrs.toString().padStart(2, '0')
      let target = result ? `${test.expected} ${padHrs}:00:00` : ''
      console.log(`--- parse: '${test.s}' -> '${target}' ${option}`)
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
      let tzInfo = tzVal !== 0 ? (tzVal > 0 ? '+' : '+') : '0'
      let option = `tzoffset [${tzInfo}] ${test.toLocale ? '(toLocale)' : ''}`
      console.log(`--- parseDate: '${test.s}' -> '${test.expected}' ${option}`)
      expect(result).toEqual(test.expected)
    }
  })
})
