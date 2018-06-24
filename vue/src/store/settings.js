// store/cookies/index.js

import Cookies from 'js-cookie'
import * as _const from './_constants'
import * as _constUser from './user/_constants'

// cookieKeys defines key name of the store getter and mutation.
// note: add prefix paths if the key is for scoped store module.
const cookieKeys = [
  `user/${_constUser.USER}`,
  _const.ACTIVE_TAB_KEY,
  _const.ACTIVE_TAB_ORDER,
  _const.APP_MENU_THEME,
  _const.EL_TABLE_STYLE,
  _const.EXPORT_WITH_PAGINATION,
  _const.PAGINATION_POSITION,
  _const.NAV_NO_HISTORY,
  _const.PROGRESS_CHART,
  _const.SHOW_FILTER_ACTIONS,
  _const.SHOW_FILTERS_2_IN_1,
  _const.SHOW_CLOCK_ENV
]

export const init = function (store) {
  for (const name of cookieKeys) {
    let storedValue = getCookie(name)
    // console.log(` stored cookie: ${name} = ${JSON.stringify(storedValue)}`)
    if (storedValue !== undefined && storedValue !== 'undefined') {
      store.commit(name, storedValue)
    }
  }
}

export const getCookie = function (key) {
  let value = Cookies.get(key)
  // console.log(`current cookie: ${key} = ${JSON.stringify(value)}`)
  if (typeof value === 'string' && String(value).startsWith(`{`)) {
    value = JSON.parse(value)
  }
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
