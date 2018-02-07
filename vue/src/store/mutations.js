// vuex mutations

// vuex mutation types
const USER_SIGNED_IN = 'USER_SIGNED_IN'

// mutations must be synchronous transactions should not be directly called
// but by store.commit
const mutations = {
  [USER_SIGNED_IN] (state, v) {
    state.userSignedIn = v
  }
}

export default mutations
