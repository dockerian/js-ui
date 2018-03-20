// store/cookies/index.js

import Cookies from 'js-cookie'
import * as _const from './_constants'

// cookieKeys defines {key, mut} keys to store getter and mutation.
// note: add prefix path if the key is for scoped store module.
const cookieKeys = [
  {
    key: _const.APP_MENU_THEME,
    mut: _const.APP_MENU_THEME
  },
  {
    key: _const.ENV_SHOW_CLOCK,
    mut: _const.SET_SHOW_CLOCK
  }
]

export const init = function (store) {
  for (const item of cookieKeys) {
    let key = item.key
    let mut = item.mut
    let storedValue = getCookie(key)
    // console.log(` stored cookie: ${key} = ${JSON.stringify(storedValue)}`)
    if (storedValue !== undefined && storedValue !== 'undefined') {
      store.commit(mut, storedValue)
    }
  }
}

export const getCookie = function (key) {
  const value = Cookies.get(key)
  // console.log(`current cookie: ${key} = ${JSON.stringify(value)}`)
  return value
}

export const updateCookie = function (key, value, options) {
  if (getCookie(key) !== value) {
    return setCookie(key, value, options)
  }
}

export const setCookie = function (key, value, options) {
  options = options || { expires: 365 }
  // console.log(`setting cookie: ${key} = ${value}, options = ${options}`)
  Cookies.set(key, value, options)
  const checkedValue = Cookies.get(key)
  console.log(`updated cookie: ${key} = ${JSON.stringify(checkedValue)}`)
  return checkedValue
}
