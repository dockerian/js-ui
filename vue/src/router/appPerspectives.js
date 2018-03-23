// router/appPerspectives.js - application perspectives

import Vue from 'vue'
import * as _const from '@/store/_constants'
import { appMenu, menuRoute } from './appMenu'

/**
  appPerspectives defines all application perspectives.

  Note:
  - reusing perspective menu items in app menu
  - appPerspectives is simply the reference for all available perspectives
  - store.state.perspectives maps to the app UI tabs
**/
const appPerspectives = {
  ...appMenu.perspectives.menuItems
}

/**
  buildTabs constructs perspective tabs, with additional properties.
    {
      key,     // the tab key for binding :value by UI component (Tabs).
      visible  // boolean, indicating if the tab is opened or closed.
    }
  Note:
  - the key is initially the same as alias or name in app perspectives
  - for multiple tabs, the key for the new tab will be generated
  - see openAppTab function
**/
export const buildAppTabs = () => {
  let i = 0
  let appTabs = []
  for (let key in appPerspectives) {
    let p = Object.assign({}, appPerspectives[key])
    p.key = key
    p.title = p.alias || p.name
    p.tabIndex = i++
    p.visible = true
    appTabs.push(p)
  }
  // console.log('built appTabs:', JSON.stringify(appTabs))
  return appTabs
}

/**
  checkAppTabs checks perspective tabs.

  Note:
  - if all tabs are closed, redirect to a default page (e.g. 'About').
**/
export const checkAppTabs = (store, router) => {
  let togo = appMenu.about
  let tabs = store.state.perspectives

  // console.log('current tabs:', JSON.stringify(store.state.perspectives, null, 2))
  for (let tab of tabs) {
    if (tab.visible) return true
  }
  menuRoute(togo, router, store)
}

/**
  checkMultiTab checks if allowing adding extra tab for the same perspective.
**/
export const checkMultiTab = (tabKey, store) => {
  let tabs = store.state.perspectives
  let tab = tabs.find(e => e.key === tabKey)
  if (tab && tab.allowMulti) {
    let filteredTabs = tabs.filter(e => e.name === tab.name && e.visible)
    return filteredTabs.length < _const.PERSPECTIVES_LIMIT
  }
  return false
}

// getPerspective looks up a perspective by route path
export const getPerspective = (path) => {
  for (let key in appPerspectives) {
    let p = appPerspectives[key]
    // console.log('getPerspective: comparing', path, JSON.stringify(p))
    if (p.route === path) {
      return {
        key: key,
        ...p
      }
    }
  }
  // console.log('no perspective for path:', path)
  return null
}

// moveBackward swaps a tab by name with its previous item
export const moveBackward = (name, tabs) => {
  let tidx = tabs.findIndex(e => e.key === name)
  let prev = tidx > 0 ? (tidx - 1) % tabs.length : tabs.length - 1
  if (tabs.length > tidx && tidx >= 0) {
    let prevItem = tabs[prev]
    let nameItem = tabs[tidx]
    Vue.set(tabs, tidx, {...prevItem, tabIndex: tidx})
    Vue.set(tabs, prev, {...nameItem, tabIndex: prev})
  }
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].tabIndex = i
  }
}

// moveForward swaps a tab by name with its next item
export const moveForward = (name, tabs) => {
  let tidx = tabs.findIndex(e => e.key === name)
  let next = (tidx + 1) % tabs.length
  if (tabs.length > tidx && tidx >= 0) {
    let nextItem = tabs[next]
    let nameItem = tabs[tidx]
    Vue.set(tabs, tidx, {...nextItem, tabIndex: tidx})
    Vue.set(tabs, next, {...nameItem, tabIndex: next})
  }
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].tabIndex = i
  }
}

// openAppTabByUser sync up active tab state and router history on user action.
export const openAppTabByUser = (tabKey, store, router) => {
  let tabs = store.state.perspectives

  for (let tab of tabs) {
    if (tab.key === tabKey) {
      store.commit(_const.ACTIVE_TAB_KEY, tabKey)
      Vue.set(tab, 'visible', true)
      menuRoute(tab, router, store)
    }
  }
}

/**
  openAppTab opens or appends a new tab per the route path.

  Note:
  - if a route-associated tab already exists, set visible = true;
  - if the tab exists and the perspective allows multiple tabs, append a new one;
  - otherwise, append a new visible tab at the end.
**/
export const openAppTab = (path, tabs) => {
  let activeTab
  let p = getPerspective(path)
  // console.log('searching tab:', path, JSON.stringify(p))
  if (p) {
    let activeTabIndex
    let countsMulti = 0
    let tabName = p.name
    let tabTitle = p.alias || p.name
    let tabKey = p.key

    for (let i = 0; i < tabs.length; i++) {
      // console.log('comparing path in tab:', path, JSON.stringify(tabs[i]))
      if (tabs[i].route === path) {
        tabs[i].allowMulti && countsMulti++
        if (activeTab && tabs[i].visible) continue
        // console.log('found tab:', JSON.stringify(tabs[i]))
        activeTab = tabs[i]
        activeTabIndex = i
      }
    }
    if (activeTab) {
      let canAdd = countsMulti > 0 && countsMulti < _const.PERSPECTIVES_LIMIT
      if (canAdd && activeTab.visible) {
        let newTab = Object.assign({}, {
          ...p,
          name: tabName,
          key: `${tabKey}-${countsMulti}`,
          title: `${tabTitle}-[${countsMulti}]`,
          tabIndex: tabs.length,
          visible: true
        })
        // console.log('appending new tab:', JSON.stringify(newTab, null, 2))
        activeTab = newTab
        activeTabIndex = tabs.length
        tabs.push(newTab)
      } else if (!activeTab.visible) {
        // NOTE: moving an earlier closed tab to the end (as iView Tabs)
        tabs.splice(activeTabIndex, 1)
        tabs.push(activeTab)
      }
      // console.log(`tab[${activeTabIndex}]:`, JSON.stringify(activeTab))
      activeTab.visible = true
    } else {
      activeTab = Object.assign({}, {
        ...p,
        key: tabKey,
        name: tabName,
        title: tabTitle,
        tabIndex: tabs.length,
        visible: true
      })
      // console.log('adding tab:', activeTab.key, JSON.stringify(activeTab))
      tabs.push(activeTab)
    }
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].tabIndex = i
    }
  }
  // console.log('updated tabs:', JSON.stringify(tabs, null, 2))
  return activeTab
}

/**
  openNewTab adds or active a new perspective tab.
**/
export const openNewTab = (key, store) => {
  let tabs = store.state.perspectives
  let tab = tabs.find(e => e.key === key)
  // console.log('found tab by key:', key, JSON.stringify(tab, null, 2))
  if (tab) {
    return openAppTab(tab.route, tabs)
  }
  // console.log('unable to open new tab by key:', key)
  return null
}
