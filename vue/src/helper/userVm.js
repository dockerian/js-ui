/**
  helper/userVm.js - helper for User View Model
**/

import * as _const from '@/store/user/_constants'

export const columns = {
  alias: {
    autocomplete: true,
    description: 'user alias',
    title: 'User',
    show: true
  },
  fullName: {
    autocomplete: true,
    description: 'user full name',
    title: 'Name',
    show: true
  },
  password: {
    autocomplete: false,
    description: 'login password',
    title: 'Password',
    show: false
  }
}

export const getAutoComplete = (input, key, users) => {
  let search = input ? String(input).trim().toLowerCase() : ''
  if (search && Array.isArray(users)) {
    let result = users.filter(
      u => u[key] && u[key].toLowerCase().includes(search)).map(
      e => e[key])
    return result
  }
  return []
}

export const signIn = async (vm, signInUser) => {
  if (!signInUser) return false

  for (let key of Object.keys(signInUser)) {
    signInUser[key] = String(signInUser[key]).trim()
  }

  if (!signInUser.alias) return false
  if (!signInUser.fullName) return false

  let payload = {
    ...signInUser
  }
  let actionName = `user/${_const.SIGN_IN}`
  let res = await vm.$store.dispatch(actionName, payload)
  let success = res !== null

  return success
}
