// vuex mutations
import * as vmt from './mutation_types'

const mutations = {
  // using ES2015 computed property key/name simplifies setting
  // object property, e.g. mutations[expression] = (state, v) => ...
  [vmt.USER_SIGNED_IN] (state, v) {
    state.userSignedIn = v
  }
}

export default mutations
