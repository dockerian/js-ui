/**
 * @jest-environment node
 */
// test/unit/specs/store.spec.js - testing vuex store

import * as _const from '@/store/_constants'
import store from '@/store'

beforeEach(async () => {
})

describe('store', () => {
  it(`store/actions :: ${_const.APP_MENU_SHOWN}`, async () => {
    let value = store.getters[_const.APP_MENU_SHOWN]
    expect(value).toBe(false)

    await store.commit(_const.APP_MENU_SHOWN, !value)

    let newValue = store.getters[_const.APP_MENU_SHOWN]
    expect(newValue).toBe(!value)
  })

  it(`store/actions :: ${_const.APP_MENU_THEME}`, async () => {
    let value = store.getters[_const.APP_MENU_THEME]
    expect(value).toBe('dark')

    await store.commit(_const.APP_MENU_THEME, 'light')

    let newValue = store.getters[_const.APP_MENU_THEME]
    expect(newValue).toBe('light')
  })

  it(`store/actions :: ${_const.ENV_SHOW_CLOCK}`, async () => {
    let value = store.getters[_const.ENV_SHOW_CLOCK]
    expect(value).toBe(true)

    await store.commit(_const.ENV_SHOW_CLOCK, !value)

    let newValue = store.getters[_const.ENV_SHOW_CLOCK]
    expect(newValue).toBe(!value)
  })

  it(`store/actions :: ${_const.USER_SIGNED_IN}`, async () => {
    let value = store.getters[_const.USER_SIGNED_IN]
    expect(value).toBe(false)

    await store.dispatch(_const.USER_SIGNED_IN, !value)

    let newValue = store.getters[_const.USER_SIGNED_IN]
    expect(newValue).toBe(!value)
  })
})
