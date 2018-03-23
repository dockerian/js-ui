// vuex mutations

import Vue from 'vue'
import { moveBackward, moveForward } from '@/router/appPerspectives'
import * as _const from './_constants'
import * as settings from './settings'

// mutations must be synchronous transactions should not be directly called
// but by store.commit
const mutations = {
  [_const.ACTIVE_TAB_KEY] (state, v) {
    state.activatedTab = v
    settings.updateCookie(_const.ACTIVE_TAB_KEY, v)
  },

  [_const.ACTIVE_TAB_MOVE_UP] (state, selectedTab) {
    moveBackward(selectedTab, state.perspectives)
  },

  [_const.ACTIVE_TAB_MOVE_DOWN] (state, selectedTab) {
    moveForward(selectedTab, state.perspectives)
  },

  [_const.ACTIVE_TAB_ORDER] (state, v) {
    state.arrangingTab = v === true || v === 'true'
    settings.updateCookie(_const.ACTIVE_TAB_ORDER, v)
  },

  [_const.APP_MENU_SHOWN] (state, v) {
    state.appMenuShown = v === true || v === 'true'
  },

  [_const.APP_MENU_THEME] (state, themeName) {
    // For iView Menu, allow 'dark', 'light', and 'primary' (horizontal mode)
    state.appMenuTheme = themeName
    settings.updateCookie(_const.APP_MENU_THEME, themeName)
  },

  [_const.PERSPECTIVE_HIDE] (state, name) {
    // console.log('closing tab:', name)
    let i = state.perspectives.findIndex(e => e.key === name)
    if (i >= 0) {
      // console.log(`splice tab:`, JSON.stringify(state.perspectives[i]))
      Vue.set(state.perspectives[i], 'visible', false)
      // no need to splice - see `v-if="visible"` binding on iView TabPane
      // state.perspectives.splice(i, 1)
    }
    // console.log('updated tabs:', JSON.stringify(state.perspectives, null, 2))
  },

  [_const.NAV_NO_HISTORY] (state, v) {
    state.navNoHistory = v === true || v === 'true'
    settings.updateCookie(_const.NAV_NO_HISTORY, state.navNoHistory)
  },

  [_const.PERSPECTIVE_TABS] (state, tabs) {
    // reactive set. see https://vuejs.org/v2/guide/list.html
    Vue.set(state, 'perspectives', tabs)
  },

  [_const.PROGRESS_CHART] (state, v) {
    state.showProgress = v === true || v === 'true'
    settings.updateCookie(_const.PROGRESS_CHART, state.showProgress)
  },

  [_const.SHOW_CLOCK_ENV] (state, v) {
    state.envShowClock = v === true || v === 'true'
    settings.updateCookie(_const.SHOW_CLOCK_ENV, state.envShowClock)
  },

  [_const.USER_SIGNED_IN] (state, v) {
    state.userSignedIn = v
  }
}

export default mutations
