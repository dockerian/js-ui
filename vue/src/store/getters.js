// vuex getters
import state from './state'

const getters = {
  userSignedIn () {
    return state.userSignedIn
  }
}

export default getters
