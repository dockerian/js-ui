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
  [_const.EL_TABLE_STYLE] (state) { return state.elTableStyle },
  [_const.EXPORT_WITH_PAGINATION] (state) { return state.exportWithPagination },
  [_const.PAGINATION_POSITION] (state) { return state.paginationPosition },
  [_const.NAV_NO_HISTORY] (state) { return state.navNoHistory },
  [_const.PERSPECTIVE_TABS] (state) { return state.perspectives },
  [_const.PROGRESS_CHART] (state) { return state.showProgress },
  [_const.SHOW_APP_MESSAGES] (state) { return state.showMessages },
  [_const.SHOW_CLOCK_ENV] (state) { return state.envShowClock },
  [_const.SHOW_FILTER_ACTIONS] (state) { return state.showFilterActions },
  [_const.SHOW_FILTERS_2_IN_1] (state) { return state.showFilters2in1 },
  [_const.VIEW_PORT_SIZE] (state) { return state.viewPortSize },
  [_const.USAGE_AND_HELP] (state) { return state.usageAndHelp },
  [_const.USER_SIGNED_IN] (state) { return state.userSignedIn }
}

export default getters
