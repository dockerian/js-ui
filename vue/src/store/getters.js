// vuex getters
//
// for component `computed`, use mapGetters `from 'vuex'`
//

import * as _const from './_constants'

// getters are computed properties for vuex store
const getters = {
  [_const.ACTIVE_TAB_KEY] (state) { return state.activatedTab },
  [_const.ACTIVE_TAB_ORDER] (state) { return state.arrangingTab },
  [_const.APP_MENU_SHOWN] (state) { return state.appMenuShown },
  [_const.APP_MENU_THEME] (state) { return state.appMenuTheme },
  [_const.NAV_NO_HISTORY] (state) { return state.navNoHistory },
  [_const.PERSPECTIVE_TABS] (state) { return state.perspectives },
  [_const.PROGRESS_CHART] (state) { return state.showProgress },
  [_const.SHOW_CLOCK_ENV] (state) { return state.envShowClock },
  [_const.USER_SIGNED_IN] (state) { return state.userSignedIn }
}

export default getters
