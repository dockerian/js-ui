// vuex getters
//
// for component `computed`, use mapGetters `from 'vuex'`
//

import * as _const from './_constants'

// getters are computed properties for vuex store
const getters = {
  [_const.APP_MENU_SHOWN] (state) { return state.appMenuShown },
  [_const.APP_MENU_THEME] (state) { return state.appMenuTheme },
  [_const.ENV_SHOW_CLOCK] (state) { return state.envShowClock },
  [_const.USER_SIGNED_IN] (state) { return state.userSignedIn }
}

export default getters
