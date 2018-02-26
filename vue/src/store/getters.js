// vuex getters
//
// for component `computed`, use mapGetters `from 'vuex'`
//

import * as _const from './_constants'

// getters are computed properties for vuex store
const getters = {
  [_const.USER_SIGNED_IN] (state) { return state.userSignedIn }
}

export default getters
