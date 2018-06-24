// test/unit/specs/helper.userVm.spec.js

import * as userVm from '@/helper/userVm'
import store from '@/store'

describe('helper/userVm', () => {
  it(`helper/userVm :: getAutoComplete`, () => {
    let users = [
      {
        'alias': 'dev', 'fullName': 'Software Dev'
      },
      {
        'alias': 'foobar', 'fullName': 'Foo Bar'
      },
      {
        'alias': 'abc', 'fullName': 'Alphabet'
      },
      {
        'alias': 'test', 'fullName': 'User Test'
      }
    ]
    let tests = [
      { input: 'a', key: '', expected: [] },
      { input: 'a', key: 'alias', expected: [ 'abc', 'foobar' ] },
      { input: 'a', key: 'fullName', expected: [ 'Alphabet', 'Foo Bar', 'Software Dev' ] },
      { input: 'bar', key: 'alias', expected: [ 'foobar' ] },
      { input: 'test', key: 'fullName', expected: [ 'User Test' ] },
      { input: ' ', key: 'fullName', expected: [] },
      { input: undefined, key: 'alias', expected: [] },
      { input: '', key: 'key', expected: [] }
    ]
    let result = userVm.getAutoComplete('input', 'key', {})
    expect(result).toEqual([])

    for (let test of tests) {
      result = userVm.getAutoComplete(test.input, test.key, users)
      expect(result.sort()).toEqual(test.expected.sort())
    }
  })

  it(`helper/userVm :: signIn`, async () => {
    let tests = [
      { user: { alias: 'dev', fullName: 'Dockerian Developers' }, success: true },
      { user: { alias: 'foo bar', fullName: 'Foo Bar' }, success: false },
      { user: { alias: '  ', fullName: 'Test' }, success: false },
      { user: { alias: '' }, success: false }
    ]
    let mockVm = {
      $store: store
    }

    for (let test of tests) {
      let result = await userVm.signIn(mockVm, test.user)
      expect(result).toBe(test.success)
    }
  })
})
