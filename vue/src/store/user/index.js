// user store module

import _ from 'lodash'
import * as _const from './_constants'
import * as settings from '@/store/settings'
import actions from './actions'

// user state
const initState = {
  signInOpen: false,
  user: {
    alias: '',
    email: '',
    fullName: '',
    initials: '',
    id: 0
  },
  usersById: {},
  users: []
}

const getInitState = () => _.cloneDeep({
  ...initState,
  users: require('./_users.json')
})

// user getters
const getters = {
  [_const.ALIAS] (state) { return state.user.alias },
  [_const.EMAIL] (state) { return state.user.email },
  [_const.FULL_NAME] (state) { return state.user.fullName },
  [_const.INITIALS] (state) { return state.user.initials },
  [_const.SIGN_IN_OPEN] (state) { return state.user.signInOpen },
  [_const.USER_ID] (state) { return state.user.id },
  [_const.USER] (state) { return state.user },
  [_const.USERS_DATA] (state) { return state.usersById },
  [_const.USERS] (state) { return state.users }
}

// user mutations
const mutations = {
  [_const.ALIAS] (state, v) { state.user.alias = v },
  [_const.EMAIL] (state, v) { state.user.email = v },
  [_const.FULL_NAME] (state, v) { state.user.fullName = v },
  [_const.INITIALS] (state, v) { state.user.initials = v },
  [_const.SIGN_IN_OPEN] (state, v) { state.signInOpen = v },
  [_const.USER_ID] (state, v) { state.user.id = v },
  [_const.USER] (state, v) {
    state.user = v
    settings.updateCookie(`user/${_const.USER}`, v)
  },
  [_const.USERS_DATA] (state, v) { state.usersById = v },
  [_const.USERS] (state, v) { state.users = v }
}

// user module
const user = {
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters,
  state: getInitState()
}

export default user
