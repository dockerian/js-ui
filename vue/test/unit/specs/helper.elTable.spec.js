// test/unit/specs/helper.elTable.spec.js

import _ from 'lodash'
import * as elTable from '@/helper/elTable'

jest.mock('clipboard-copy')

afterAll(() => {
  jest.unmock('clipboard-copy')
})

beforeEach(() => {
  // TODO: use jest.doMock instead of hoisting jest.mock
  // see https://facebook.github.io/jest/docs/en/jest-object.html#jestdomockmodulename-factory-options
  // jest.resetModules()
})

describe('helper/elTable', () => {
  it(`helper/elTable :: cellStyle`, () => {
    let defStyle = {
      'white-space': 'nowrap'
    }
    let tests = [
      {
        data: {column: {columnKey: 'pattern'}},
        expected: {
          ...defStyle,
          'font-family': 'Lucida Console,Courier New,Courier',
          'font-size': '10pt'
        }
      },
      {
        data: {column: {columnKey: 'expand'}},
        expected: {
          ...defStyle,
          'padding': '0'
        }
      },
      {
        data: {column: {columnKey: 'none'}},
        expected: {
          ...defStyle
        }
      }
    ]
    for (let test of tests) {
      let result = elTable.cellStyle(test.data)
      expect(result).toEqual(test.expected)
    }
  })
})

describe('helper/elTable', () => {
  it(`helper/elTable :: cellFormatter`, () => {
    let tests = [
      {
        data: {
          column: {columnKey: 'none'},
          cellValue: '2017-01-16T00:00:00Z'
        },
        expected: '2017-01-16T00:00:00Z'
      },
      {
        data: {
          column: {columnKey: 'created'},
          cellValue: '2017-12-15T12:21:41Z'
        },
        expected: '2017-12-15'
      },
      {
        data: {
          column: {columnKey: 'firstSeen'},
          cellValue: '2017-01-05T00:00:00Z'
        },
        expected: '2017-01-05'
      },
      {
        data: {
          column: {columnKey: 'lastSeen'},
          cellValue: '2018-02-14T20:44:36Z'
        },
        expected: '2018-02-14'
      },
      {
        data: {
          column: {columnKey: 'modified'},
          cellValue: '2017-06-30T20:15:42Z'
        },
        expected: '2017-06-30'
      },
      {
        data: {
          column: {columnKey: 'updated'},
          cellValue: '2017-12-15T12:21:41Z'
        },
        expected: '2017-12-15'
      },
      {
        data: {
          column: {columnKey: 'updated'},
          cellValue: ''
        },
        expected: ''
      }
    ]
    for (let test of tests) {
      let result = elTable.cellFormatter(
        {}, test.data.column, test.data.cellValue)
      expect(result).toBe(test.expected)
    }
  })
})

describe('helper/elTable', () => {
  it(`helper/elTable :: enforceOneRowExpand`, () => {
    let mockVm = {
      toggleRowExpansion: function (expr, v) {
        expr.expanded = v
      }
    }
    let tests = [
      {
        data: {
          row: {id: 1},
          rows: [
            {id: 1, expanded: true},
            {id: 2, expanded: false},
            {id: 3, expanded: true},
            {id: 4, expanded: true},
            {id: 5, expanded: true}
          ]
        }
      },
      {
        data: {
          row: {id: 1},
          rows: [
            {id: 5, expanded: true}
          ]
        }
      }
    ]
    for (let test of tests) {
      let size = test.data.rows.length
      let expandedRows = _.cloneDeep(test.data.rows)
      let result = elTable.enforceOneRowExpand(
        test.data.row, expandedRows, mockVm)
      let count = expandedRows.filter(e => e.expanded).length
      expect(result).toBe(size > 0)
      if (size > 1) {
        expect(count).toBe(1)
        expect(expandedRows).not.toEqual(test.data.rows)
      } else {
        expect(expandedRows).toEqual(test.data.rows)
      }
    }
  })
})

describe('helper/elTable', () => {
  it(`helper/elTable :: rowKey`, () => {
    let tests = [
      {
        data: {id: 0}, expected: 0
      },
      {
        data: {id: 100}, expected: 100
      },
      {
        data: {}, expected: undefined
      }
    ]
    for (let test of tests) {
      let result = elTable.rowKey(test.data)
      expect(result).toBe(test.expected)
    }
  })
})
