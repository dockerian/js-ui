// vuex mutations

import * as _const from './_constants'
import * as settings from './settings'

// mutations must be synchronous transactions should not be directly called
// but by store.commit
const mutations = {
  [_const.APP_MENU_RESET] (state, v) {
    state.appMenuShown = v === true || v === 'true'
  },
  [_const.APP_MENU_SHOWN] (state) {
    state.appMenuShown = !state.appMenuShown
  },
  [_const.APP_MENU_THEME] (state, themeName) {
    // For iView Menu, allow 'dark', 'light', and 'primary' (horizontal mode)
    state.appMenuTheme = themeName
    settings.updateCookie(_const.APP_MENU_THEME, themeName)
  },
  [_const.ENV_SHOW_CLOCK] (state) {
    state.envShowClock = !state.envShowClock
    settings.updateCookie(_const.ENV_SHOW_CLOCK, state.envShowClock)
  },
  [_const.SET_SHOW_CLOCK] (state, v) {
    state.envShowClock = v === true || v === 'true'
    settings.updateCookie(_const.ENV_SHOW_CLOCK, state.envShowClock)
  },
  [_const.USER_SIGNED_IN] (state, v) {
    state.userSignedIn = v
  }
}

export default mutations
