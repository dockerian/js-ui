/**
 * @jest-environment node
 */
// tests/unit/specs/store.spec.js - testing vuex store

import _ from 'lodash'
import * as _const from '@/store/_constants'
import { buildAppTabs } from '@/router/appPerspectives'
import { getCookie, init, setCookie } from '@/store/settings'
import store from '@/store'

beforeEach(async () => {
})

describe('store/mutations', () => {
  it(`store/mutations`, () => {
    let tests = [
      {
        stateKey: _const.ACTIVE_TAB_KEY,
        oldValue: 'helloWorld',
        newValue: 'search'
      },
      {
        stateKey: _const.ACTIVE_TAB_ORDER,
        oldValue: false,
        newValue: true
      },
      {
        stateKey: _const.APP_MENU_SHOWN,
        oldValue: false,
        newValue: true
      },
      {
        stateKey: _const.APP_MENU_THEME,
        oldValue: 'dark',
        newValue: 'light'
      },
      {
        stateKey: _const.EL_TABLE_STYLE,
        oldValue: { 'columnsFixed': false, 'expandsFixed': 'right' },
        newValue: { 'columnsFixed': false, 'expandsFixed': 'left' }
      },
      {
        stateKey: _const.EXPORT_WITH_PAGINATION,
        oldValue: true,
        newValue: false
      },
      {
        stateKey: _const.NAV_NO_HISTORY,
        oldValue: true,
        newValue: false
      },
      {
        stateKey: _const.PAGINATION_POSITION,
        oldValue: 'bottom',
        newValue: 'top'
      },
      {
        stateKey: _const.PERSPECTIVE_TABS,
        oldValue: buildAppTabs(),
        newValue: [1, 2, 3]
      },
      {
        stateKey: _const.PROGRESS_CHART,
        oldValue: true,
        newValue: false
      },
      {
        stateKey: _const.SHOW_CLOCK_ENV,
        oldValue: true,
        newValue: false
      },
      {
        stateKey: _const.SHOW_FILTER_ACTIONS,
        oldValue: true,
        newValue: false
      },
      {
        stateKey: _const.SHOW_FILTERS_2_IN_1,
        oldValue: true,
        newValue: false
      },
      {
        stateKey: _const.VIEW_PORT_SIZE,
        oldValue: { height: 600, width: 600 },
        newValue: { height: 960, width: 1200 }
      },
      {
        stateKey: _const.USER_SIGNED_IN,
        oldValue: false,
        newValue: true
      }
    ]
    for (let test of tests) {
      let oldValue = store.getters[test.stateKey]
      expect(oldValue).toEqual(test.oldValue)

      store.commit(test.stateKey, test.newValue)

      let newValue = store.getters[test.stateKey]
      expect(newValue).toEqual(test.newValue)

      store.commit(test.stateKey, oldValue)
    }
  })

  it(`store/mutations :: ${_const.APP_MENU_SHOWN}`, async () => {
    let value = store.getters[_const.APP_MENU_SHOWN]
    expect(value).toBe(false)

    await store.commit(_const.APP_MENU_SHOWN, !value)

    let newValue = store.getters[_const.APP_MENU_SHOWN]
    expect(newValue).toBe(!value)
  })

  it(`store/mutations :: ${_const.APP_MENU_THEME}`, async () => {
    let value = store.getters[_const.APP_MENU_THEME]
    expect(value).toBe('dark')

    await store.commit(_const.APP_MENU_THEME, 'light')

    let newValue = store.getters[_const.APP_MENU_THEME]
    expect(newValue).toBe('light')
  })

  it(`store/mutations :: ${_const.ACTIVE_TAB_MOVE_DOWN}`, async () => {
    let tabs = _.cloneDeep(store.state.perspectives)
    expect(store.state.perspectives).toEqual(tabs)

    let tab = store.state.perspectives[0]
    expect(tab).not.toBeNull()

    await store.commit(_const.ACTIVE_TAB_MOVE_DOWN, tab.key)

    expect(store.state.perspectives).not.toEqual(tabs)

    await store.commit(_const.ACTIVE_TAB_MOVE_UP, tab.key)

    expect(store.state.perspectives).toEqual(tabs)
  })

  it(`store/mutations :: ${_const.PERSPECTIVE_HIDE}`, async () => {
    let tabs = store.state.perspectives
    let tab = store.state.perspectives.find(e => e.visible)
    expect(tab).not.toBeNull()

    await store.commit(_const.PERSPECTIVE_HIDE, '/not/exists')
    expect(store.state.perspectives).toEqual(tabs)

    await store.commit(_const.PERSPECTIVE_HIDE, tab.key)

    expect(tab.visible).toBe(false)
  })

  it(`store/mutations :: ${_const.SHOW_CLOCK_ENV}`, async () => {
    let value = store.getters[_const.SHOW_CLOCK_ENV]
    expect(value).toBe(true)

    await store.commit(_const.SHOW_CLOCK_ENV, !value)

    let newValue = store.getters[_const.SHOW_CLOCK_ENV]
    expect(newValue).toBe(!value)
  })
})

describe('store/actions', () => {
  it(`store/actions :: ${_const.PERSPECTIVE_OPEN}`, async () => {
    let tabs = store.state.perspectives
    let tab = store.state.perspectives[1]
    tab.visible = false

    await store.dispatch(_const.PERSPECTIVE_OPEN, '/not/exists')
    expect(store.state.perspectives).toEqual(tabs)

    await store.dispatch(_const.PERSPECTIVE_OPEN, tab.route)

    let siz = store.state.perspectives.length
    let end = store.state.perspectives[siz - 1]
    expect(store.state.perspectives).not.toEqual(tabs)
    expect(end.name).toEqual(tab.name)
    expect(end.route).toEqual(tab.route)
    expect(end.visible).toBe(true)
  })

  it(`store/actions :: ${_const.USER_SIGNED_IN}`, async () => {
    let value = store.getters[_const.USER_SIGNED_IN]
    expect(value).toBe(false)

    await store.dispatch(_const.USER_SIGNED_IN, !value)

    let newValue = store.getters[_const.USER_SIGNED_IN]
    expect(newValue).toBe(!value)
  })
})

describe('store/settings', () => {
  it(`store/settings :: init`, async () => {
    let change = setCookie(_const.SHOW_CLOCK_ENV, false)
    init()
    let result = getCookie(_const.SHOW_CLOCK_ENV)
    expect(result).toBe(change)
  })
})
