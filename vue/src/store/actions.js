// vuex actions
// import api from '../api'
import * as vmt from './mutation_types'

// actions are an abstraction that is meant to commit mutations,
// allowing asynchronous calls to trigger synchronous mutations
const actions = {
  userSignedIn ({commit}, v) {
    // api.CRUD().then(response => {
    //   commit(vmt.USER_SIGNED_IN, response.data)
    // }
    // note: commit should only be used for actions; otherwise, use dispatch
    commit(vmt.USER_SIGNED_IN, v)
  }
}

export default actions
