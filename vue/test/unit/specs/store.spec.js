/**
 * @jest-environment node
 */
// test/unit/specs/store.spec.js - testing vuex store

import * as _const from '@/store/_constants'
import store from '@/store'

beforeEach(async () => {
})

describe('store', () => {
  it(`store/actions :: ${_const.USER_SIGNED_IN}`, async () => {
    let value = store.getters[_const.USER_SIGNED_IN]
    expect(value).toBe(false)

    await store.dispatch(_const.USER_SIGNED_IN, !value)

    let newValue = store.getters[_const.USER_SIGNED_IN]
    expect(newValue).toBe(!value)
  })
})
