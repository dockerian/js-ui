// vuex actions

import _ from 'lodash'
import * as _const from './_constants'
import { openAppTab } from '@/router/appPerspectives'

// actions commit mutations, with arbitrary asynchronous operations
// and are triggered by store.dispatch
//
// each action method receives a context object exposing
// {
//   state,      // same as `store.state`, or local state if in modules
//   rootState,  // same as `store.state`, only in modules
//   commit,     // same as `store.commit`
//   dispatch,   // same as `store.dispatch`
//   getters,    // same as `store.getters`, or local getters if in modules
//   rootGetters // same as `store.getters`, only in modules
// }
//
// for component `method`, use mapActions `from 'vuex'`
//
// see https://vuex.vuejs.org/en/api.html
const actions = {
  [_const.PERSPECTIVE_OPEN] (store, path) {
    let tabs = _.cloneDeep(store.state.perspectives)
    let activeTab = openAppTab(path, tabs)

    if (activeTab) {
      // console.log('updating store tabs:', JSON.stringify(tabs))
      store.commit(_const.PERSPECTIVE_TABS, tabs)

      // console.log('activating tab:', JSON.stringify(activeTab))
      store.commit(_const.ACTIVE_TAB_KEY, activeTab.key)
    }
  },
  [_const.USER_SIGNED_IN] (store, v) {
    store.commit(_const.USER_SIGNED_IN, v)
  }
}

export default actions
