// vuex actions

import * as _const from './_constants'

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
  [_const.USER_SIGNED_IN] (store, v) {
    store.commit(_const.USER_SIGNED_IN, v)
  }
}

export default actions
