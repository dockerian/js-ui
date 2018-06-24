// store/truth/actions.js

import * as _const from './_constants'
import * as _constApp from '@/store/_constants'
import * as _constAppInfo from '@/store/appInfo/_constants'
import Message from '@/utils/message'

// truths actions
const actions = {
  async [_const.GET_USERS] (store) {
    let data = require('./_users.json')
    store.dispatch(_const.SET_USERS, data)
  },

  [_const.SET_USERS] ({commit}, users) {
    if (users instanceof Array) {
      let usersById = {}
      users.forEach((user) => {
        usersById[user.id] = user
      })
      commit(_const.USERS_DATA, usersById)
      commit(_const.USERS, users)
    }
  },

  async [_const.SIGN_IN] (store, user) {
    let all = require('./_users.json')
    let res = {
      data: all.filter(
        u => u.alias === user.alias && u.fullName === user.fullName)
    }
    if (res && res.data && res.data.length === 1) {
      store.commit(`${_constApp.USER_SIGNED_IN}`, true, {root: true})
      store.commit(`${_const.USER}`, res.data[0])
      let log = `Signed in as ${user.fullName} <${user.alias}>`
      let msg = new Message(log, 'sticky', false, true)
      store.dispatch(`appInfo/${_constAppInfo.ADD_MESSAGE}`, msg, {root: true})
      return res.data[0]
    } else {
      let val = `user (alias= ${user.alias}, name= ${user.fullName})`
      let log = `Failed to sign in as ${val}`
      let typ = res.response ? 'error' : 'fatal'
      let msg = new Message(log, typ, true)
      msg.res = res
      let status = res.response ? res.response.status : 'FATAL'
      store.dispatch(`appInfo/${_constAppInfo.ADD_MESSAGE}`, msg, {root: true})
      console.log(status, log)
    }
    return null
  }
}

export default actions
