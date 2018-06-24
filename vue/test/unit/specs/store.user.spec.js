/**
 * @jest-environment node
 */
// test/unit/specs/store.user.spec.js - testing user store

import * as _const from '@/store/user/_constants'
import store from '@/store'

const userTest = {
  alias: 'foobar',
  email: 'foobar@myvue.org',
  fullName: 'Foo Bar',
  initials: 'FB',
  id: 0
}

beforeEach(async () => {
  store.commit(`user/${_const.ALIAS}`, userTest.alias)
  store.commit(`user/${_const.EMAIL}`, userTest.email)
  store.commit(`user/${_const.FULL_NAME}`, userTest.fullName)
  store.commit(`user/${_const.INITIALS}`, userTest.initials)
  store.commit(`user/${_const.USER_ID}`, userTest.id)
  store.commit(`user/${_const.USERS_DATA}`, {})
  store.commit(`user/${_const.USERS}`, ['foobar', 'test'])
})

describe('store/user', () => {
  it(`store/user :: mutations`, () => {
    let tests = [
      {
        stateKey: _const.ALIAS,
        oldValue: 'foobar',
        newValue: 'test'
      },
      {
        stateKey: _const.EMAIL,
        oldValue: 'foobar@myvue.org',
        newValue: 'test@myvue.org'
      },
      {
        stateKey: _const.FULL_NAME,
        oldValue: 'Foo Bar',
        newValue: 'Test'
      },
      {
        stateKey: _const.INITIALS,
        oldValue: 'FB',
        newValue: 'JZ'
      },
      {
        stateKey: _const.USER_ID,
        oldValue: 0,
        newValue: 11
      },
      {
        stateKey: _const.USER,
        oldValue: userTest,
        newValue: { alias: 'foobar', initials: 'FB' }
      },
      {
        stateKey: _const.USERS_DATA,
        oldValue: {},
        newValue: { 0: { initials: 'JZ' }, 1: { alias: 'fbar' } }
      },
      {
        stateKey: _const.USERS,
        oldValue: ['foobar', 'test'],
        newValue: ['a', 'b', 'c', 'd']
      }
    ]
    for (let test of tests) {
      let oldValue = store.getters[`user/${test.stateKey}`]
      expect(oldValue).toEqual(test.oldValue)

      store.commit(`user/${test.stateKey}`, test.newValue)

      let newValue = store.getters[`user/${test.stateKey}`]
      expect(newValue).toEqual(test.newValue)

      store.commit(`user/${test.stateKey}`, oldValue)
    }
  })
})

describe('store/user', () => {
  it(`store/user/actions :: ${_const.SET_USERS}`, async () => {
    let users = [
      { alias: 'abc', id: 0 },
      { alias: 'def', id: 1 },
      { alias: 'ghi', id: 2 }
    ]
    let usersById = {
      0: { alias: 'abc', id: 0 },
      1: { alias: 'def', id: 1 },
      2: { alias: 'ghi', id: 2 }
    }
    let data = store.getters[`user/${_const.USERS_DATA}`]
    await store.dispatch(`user/${_const.SET_USERS}`, {}) // not an array
    let result1 = store.getters[`user/${_const.USERS_DATA}`]
    expect(result1).toEqual(data)

    await store.dispatch(`user/${_const.SET_USERS}`, users)
    let result2 = store.getters[`user/${_const.USERS_DATA}`]
    expect(result2).toEqual(usersById)
  })

  it(`store/user/actions :: ${_const.SET_USERS} (empty)`, async () => {
    await store.dispatch(`user/${_const.SET_USERS}`, [])
    let usersById = store.getters[`user/${_const.USERS_DATA}`]
    expect(usersById).toEqual({})
  })
})
