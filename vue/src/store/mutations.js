// vuex mutations

import Vue from 'vue'
import { moveBackward, moveForward } from '@/router/appPerspectives'
import * as _const from './_constants'
import * as browser from '@/utils/browser'
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

  [_const.EL_TABLE_STYLE] (state, v) {
    state.elTableStyle = v
    settings.updateCookie(_const.EL_TABLE_STYLE, state.elTableStyle)
  },

  [_const.EXPORT_WITH_PAGINATION] (state, v) {
    state.exportWithPagination = v === true || v === 'true'
    settings.updateCookie(_const.EXPORT_WITH_PAGINATION, state.exportWithPagination)
  },

  [_const.PAGINATION_POSITION] (state, v) {
    state.paginationPosition = v
    settings.updateCookie(_const.PAGINATION_POSITION, state.paginationPosition)
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

  [_const.SHOW_APP_MESSAGES] (state, v) {
    state.showMessages = v
  },

  [_const.SHOW_CLOCK_ENV] (state, v) {
    state.envShowClock = v === true || v === 'true'
    settings.updateCookie(_const.SHOW_CLOCK_ENV, state.envShowClock)
  },

  [_const.SHOW_FILTER_ACTIONS] (state, v) {
    state.showFilterActions = v === true || v === 'true'
    settings.updateCookie(_const.SHOW_FILTER_ACTIONS, state.showFilterActions)
  },

  [_const.SHOW_FILTERS_2_IN_1] (state, v) {
    state.showFilters2in1 = v === true || v === 'true'
    settings.updateCookie(_const.SHOW_FILTERS_2_IN_1, state.showFilters2in1)
  },

  [_const.USAGE_AND_HELP] (state, v) {
    state.usageAndHelp = v
  },

  [_const.USER_SIGNED_IN] (state, v) {
    state.userSignedIn = v
  },

  [_const.VIEW_PORT_SIZE] (state, v) {
    state.viewPortSize = browser.checkViewPortSize(v)
  }
}

export default mutations
