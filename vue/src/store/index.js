import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

// app vuex store
export default new Vuex.Store({
  actions,
  getters,
  modules: {
  },
  mutations,
  state
})
