// appInfo store module - App Info and Notifications

import * as _const from './_constants'
import AppInfo from '@/utils/appInfo'
import actions from './actions'

// appInfo state
const state = new AppInfo()

// appInfo getters
const getters = {
  [_const.COUNT] (state) { return state.count },
  [_const.COUNT_ERROR] (state) { return state.countError },
  [_const.COUNT_NOT_ACK] (state) { return state.countNotAck },
  [_const.GET_MESSAGES] (state) { return state.messages },
  [_const.HAS_MESSAGE] (state) { return state.count > 0 },
  [_const.HAS_NOTACK_OR_ERROR] (state) { return state.countError > 0 || state.countNotAck > 0 },
  [_const.LATEST_MESSAGE] (state) { return state.getLatest() },
  [_const.MESSAGES] (state) { return state.messages }
}

// appInfo mutations
const mutations = {
  [_const.COUNT] (state) {
    state.counts()
  },
  [_const.COUNT_ERROR] (state) {
    state.countsError()
  },
  [_const.COUNT_NOT_ACK] (state) {
    state.countsNotAck()
  }
}

// appInfo module
const appInfo = {
  modules: {
  },
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters,
  state: state
}

export default appInfo
