import Vue from 'vue'
import Vuex from 'vuex'

import appInfo from './appInfo'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'
import user from './user'

Vue.use(Vuex)

// app vuex store
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    appInfo,
    user
  },
  mutations,
  state
})
