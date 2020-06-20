// tests/unit/specs/rooter.appPerspectives.spec - testing router/appPerspectives

import _ from 'lodash'
import * as p from '@/router/appPerspectives'
import router from '@/router'
import store from '@/store'

describe('router/appPerspectives', () => {
  it(`router/appPerspectives :: buildAppTabs`, () => {
    let appTabs = p.buildAppTabs()
    for (let tab of appTabs) {
      expect(tab.visible).toBe(true)
    }
  })
})

describe('router/appPerspectives', () => {
  it(`router/appPerspectives :: checkAppTabs`, () => {
    let result = p.checkAppTabs(store, router)
    expect(result).toBe(true)

    let saved = _.cloneDeep(store.state.perspectives)
    for (let tab of store.state.perspectives) {
      if (tab.visible) {
        tab.visible = false
      }
    }
    result = p.checkAppTabs(store, router)
    store.state.perspectives = saved
  })
})

describe('router/appPerspectives', () => {
  it(`router/appPerspectives :: checkMultiTab`, () => {
    const tests = [
      {
        key: 'demo', expected: false
      },
      {
        key: 'foobar', expected: false
      },
      {
        key: 'invalidKey', expected: false
      },
      {
        key: 'search', expected: true
      }
    ]
    for (let test of tests) {
      let result = p.checkMultiTab(test.key, store)
      expect(result).toBe(test.expected)
    }
  })
})

describe('router/appPerspectives', () => {
  it(`router/appPerspectives :: getPerspective`, () => {
    let p1 = p.getPerspective('/p/hello')
    expect(p1).not.toBeNull()

    let p2 = p.getPerspective('/not/exists')
    expect(p2).toBeNull()
  })
})

describe('router/appPerspectives', () => {
  it(`router/appPerspectives :: moveBackward`, () => {
  })
})

describe('router/appPerspectives', () => {
  it(`router/appPerspectives :: moveForward`, () => {
  })
})

describe('router/appPerspectives', () => {
  it(`router/appPerspectives :: openAppTabByUser`, () => {
    p.openAppTabByUser('Hello', store, router)
    p.openAppTabByUser('search', store, router)
  })
})

describe('router/appPerspectives', () => {
  it(`router/appPerspectives :: openAppTab`, () => {
    let tabs = _.cloneDeep(store.state.perspectives)
    let tab1 = p.openAppTab('/p/hello', tabs)
    expect(tabs).toEqual(store.state.perspectives)
    expect(tab1.title).toBe('Hello')
    expect(tab1.key).toBe('demo')

    let tab2 = p.openAppTab('/p/search', tabs)
    // console.log('tab2:', JSON.stringify(tab2, null, 2))
    expect(tab2.title).toBe('Search-[1]')
    expect(tab2.key).toBe('search-1')
  })
})

describe('router/appPerspectives', () => {
  it(`router/appPerspectives :: openNewTab`, () => {
    let tabs = _.cloneDeep(store.state.perspectives)
    let tab1 = p.openNewTab('demo', store)
    expect(tabs).toEqual(store.state.perspectives)
    expect(tab1.title).toBe('Hello')
    expect(tab1.key).toBe('demo')
  })
})
