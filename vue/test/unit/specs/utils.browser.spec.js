// unit/specs/utils.browser - testing browser functions

import dateformat from 'dateformat'
import download from 'downloadjs'
import * as browser from '@/utils/browser'
import * as json2csv from 'json2csv'

jest.mock('dateformat')
jest.mock('downloadjs')
jest.mock('json2csv')

afterAll(() => {
  jest.unmock('dateformat')
  jest.unmock('downloadjs')
  jest.unmock('json2csv')
})

beforeEach(() => {
  // use jest.doMock instead of hoisting jest.mock
  // see https://facebook.github.io/jest/docs/en/jest-object.html#jestdomockmodulename-factory-options
  // jest.resetModules()
})

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
        let result = browser.checkViewPortSize(test)
        console.log('input:', JSON.stringify(test), ' => result:', JSON.stringify(result))
        expect(result).toEqual(data.expected)
      }
    }
  })
})

describe('utils.browser.enableConsoleExtensions', () => {
  it('should extend console functions', () => {
    browser.enableConsoleExtensions()
    expect(console.debug).not.toBeUndefined()
    expect(console.error).not.toBeUndefined()
    expect(console.warn).not.toBeUndefined()
    console.debug()
    console.debug('DEBUG:', 'this is to test console.debug', 'parameters')
    console.error()
    console.error('ERROR:', 'this', 'is', 'to', 'test', 'console.error', {a: 'a', b: 'b'})
    console.warn()
    console.warn('WARN:', 'this', 'is to test', 'console.warn', JSON.stringify({
      test: 'console.warn',
      type: 'function'
    }))
  })
})

describe('utils.browser.downloadFile', () => {
  it('should download a file in browser', () => {
    let clicked = false
    let setAttributeCalled = false
    let mockedReturnValue = {
      click: function () {
        clicked = true
      },
      setAttribute: function () {
        setAttributeCalled = true
      },
      style: {
        display: 'block'
      }
    }
    document.body.appendChild = jest.fn()
    document.body.removeChild = jest.fn()
    document.createElement = jest.fn()
    document.createElement.mockReturnValue(mockedReturnValue)

    browser.downloadFile()

    expect(document.body.appendChild.mock.calls.length).toBe(1)
    expect(document.body.removeChild.mock.calls.length).toBe(1)
    expect(document.createElement.mock.calls.length).toBe(1)
    expect(mockedReturnValue.style.display).toBe('none')
    expect(setAttributeCalled).toBeTruthy()
    expect(clicked).toBeTruthy()
  })
})

describe('utils.browser.exportFile', () => {
  it('should return transformed data to export', () => {
    let calledDownload = false
    let exportDataToBe
    let exportFilename = ''
    let parsedJson2csv = `id,name,notes\n0,"data name","data notes"`
    let yyyymmddhhMMss = '20180406_053729'
    let resultMimeType

    dateformat.mockImplementation(() => {
      return yyyymmddhhMMss
    })
    download.mockImplementation((result, filename, mime) => {
      resultMimeType = mime
      exportDataToBe = result
      exportFilename = filename
      calledDownload = true
    })
    json2csv.parse.mockImplementation(() => {
      return parsedJson2csv
    })

    const data = {
      id: 0,
      name: 'data name',
      notes: 'data notes'
    }
    const tests = [
      {
        data: data,
        options: { indent: 4, filename: 'download-test.json', download: true },
        expected: {
          download: true,
          filename: `download-test.json`,
          result: JSON.stringify(data, null, 4),
          mime: 'application/json'
        }
      },
      {
        data: data,
        options: { mime: 'text/json', download: true },
        expected: {
          download: true,
          filename: `${yyyymmddhhMMss}.json`,
          result: JSON.stringify(data, null, 2),
          mime: 'text/json'
        }
      },
      {
        data: data,
        options: { format: 'csv', mime: 'text/plain', download: true },
        expected: {
          download: true,
          filename: `${yyyymmddhhMMss}.csv`,
          result: parsedJson2csv,
          mime: 'text/plain'
        }
      },
      {
        data: data,
        options: { format: 'csv', mime: 'text/plain' },
        expected: {
          download: false,
          filename: ``,
          result: parsedJson2csv
        }
      },
      {
        data: data,
        options: { format: 'csv' },
        expected: {
          download: false,
          filename: ``,
          result: parsedJson2csv
        }
      },
      {
        data: data,
        options: { format: 'docx' },
        expected: {
          download: false,
          filename: ``
        }
      },
      {
        data: data,
        options: { format: 'zip', download: true },
        expected: {
          download: true,
          filename: `20180406_053729.zip`,
          mime: 'application/zip',
          result: data
        }
      },
      {
        data: data,
        options: {},
        expected: {
          download: false,
          filename: ``,
          result: JSON.stringify(data, null, 2)
        }
      },
      {
        data: [data],
        options: {},
        expected: {
          download: false,
          filename: ``,
          result: JSON.stringify([data], null, 2)
        }
      },
      {
        data: data,
        options: { format: '' },
        expected: {
          download: false,
          filename: ``,
          result: JSON.stringify(data, null, 2)
        }
      },
      {
        data: [],
        options: {},
        expected: {
          download: false,
          filename: ``,
          result: JSON.stringify([], null, 2)
        }
      },
      {
        data: undefined,
        options: {},
        expected: {
          download: false,
          filename: ''
        }
      },
      {
        data: undefined,
        options: undefined,
        expected: {
          download: false,
          filename: ''
        }
      }
    ]
    for (let test of tests) {
      calledDownload = false
      resultMimeType = undefined
      exportDataToBe = undefined
      exportFilename = ''
      // console.log('testing options:', test.options, ', data:', test.data)
      let result = browser.exportFile(test.data, test.options)
      if (test.expected.download) {
        expect(exportDataToBe).toEqual(test.expected.result)
      }
      expect(calledDownload).toBe(test.expected.download)
      expect(exportFilename).toBe(test.expected.filename)
      expect(resultMimeType).toEqual(test.expected.mime)
      expect(result).toEqual(test.expected.result)
    }
  })
})
