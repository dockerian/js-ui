// test/unit/specs/helper.vm.spec.js

import * as _const from '@/store/appInfo/_constants'
import * as helper from '@/helper/vm'
import Message from '@/utils/message'
import clipboardCopy from 'clipboard-copy'

jest.mock('clipboard-copy')

afterAll(() => {
  jest.unmock('clipboard-copy')
})

beforeEach(() => {
  // TODO: use jest.doMock instead of hoisting jest.mock
  // see https://facebook.github.io/jest/docs/en/jest-object.html#jestdomockmodulename-factory-options
  // jest.resetModules()
})

describe('helper/vm', () => {
  it(`helper/vm :: addLoginMessage`, () => {
    let action
    let vm = {
      $store: {
        dispatch: function (actionName, v) {
          action = actionName
        }
      }
    }
    helper.addLoginMessage(vm)
    expect(action).toBe(`appInfo/${_const.ADD_MESSAGE}`)
  })

  it(`helper/vm :: checkPageSize`, () => {
    let tests = [
      { pageSize: 5, expected: 10 },
      { pageSize: 10, expected: 10 },
      { pageSize: 23, expected: 25 },
      { pageSize: 25, expected: 25 },
      { pageSize: 27, expected: 25 },
      { pageSize: 64, expected: 65 },
      { pageSize: 65, expected: 65 },
      { pageSize: 69, expected: 65 },
      { pageSize: 100, expected: 100 },
      { pageSize: 101, expected: 150 },
      { pageSize: 135, expected: 150 },
      { pageSize: 200, expected: 200 },
      { pageSize: 290, expected: 250 },
      { pageSize: 399, expected: 350 },
      { pageSize: 500, expected: 500 },
      { pageSize: 510, expected: 500 },
      { pageSize: -10, expected: 10 },
      { pageSize: 0, expected: 10 }
    ]
    for (let test of tests) {
      let result = helper.checkPageSize(test.pageSize)
      expect(result).toBe(test.expected)
    }
  })

  it(`helper/vm :: copyConfig`, () => {
    let output
    let vm = {
      config: {
        test: 'copyConfig test'
      },
      $Message: {
        success: () => {
          output = 'copied to clipboard'
        }
      }
    }
    let tests = [
      { mock: false, expected: '' },
      { mock: true, expected: 'copied to clipboard' }
    ]

    for (let test of tests) {
      output = ''
      clipboardCopy.mockImplementation(() => test.mock)
      // console.log(JSON.stringify(clipboardCopy, null, 2))
      helper.copyConfig(vm)
      expect(output).toBe(test.expected)
    }
  })

  it(`helper/vm :: copyMessage`, () => {
    let output
    let msg = new Message('message info')
    let vm = {
      $Message: {
        success: () => {
          output = 'copied to clipboard'
        }
      }
    }
    let tests = [
      { mock: false, expected: '' },
      { mock: true, expected: 'copied to clipboard' }
    ]

    for (let test of tests) {
      output = ''
      clipboardCopy.mockImplementation(() => test.mock)
      // console.log(JSON.stringify(clipboardCopy, null, 2))
      helper.copyMessage(vm, msg)
      expect(output).toBe(test.expected)

      output = ''
      helper.copyMessage(vm, [msg])
      expect(output).toBe(test.expected)

      output = 'unset'
      helper.copyMessage(vm)
      expect(output).toBe('unset')
    }
  })

  it(`helper/vm :: getAlertType`, () => {
    let tests = [
      {
        msg: new Message('error message', 'error'), expected: 'error'
      },
      {
        msg: new Message('fatal message', 'fatal'), expected: 'error'
      },
      {
        msg: new Message('debug message', 'debug'), expected: 'info'
      },
      {
        msg: new Message('info message', 'info'), expected: 'info'
      },
      {
        msg: new Message('success message', 'info', false, true, false), expected: 'success'
      },
      {
        msg: new Message('warn message', 'warn'), expected: 'warning'
      }
    ]
    for (let test of tests) {
      let result = helper.getAlertType(test.msg)
      expect(result).toBe(test.expected)
    }
  })

  it(`helper/vm :: replaceRouteQuery`, () => {
    let result = {}
    let mockVm = {
      $route: {
        path: '/route/path'
      },
      $router: {
        replace: function (obj) {
          result = obj
        }
      }
    }
    let tests = [
      { query: { domain: 'abc' } },
      { query: { domain: 'abc', state: 'approved' } },
      { query: {} }
    ]
    for (let test of tests) {
      result = { anythingElse: '' }
      helper.replaceRouteQuery(mockVm, test.query)
      expect(result).toEqual({
        path: '/route/path',
        query: test.query
      })
    }
  })
})
