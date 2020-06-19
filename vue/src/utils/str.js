// utils/str.js

/**
  camelize converts a string to camel case format.

  @param {String} input - the input string.

  @return {String} - string in camel case format.

  @example
  // returns `thisIsATest`
  camelize(' this is a test')
**/
export const camelize = (input) => {
  let strim = typeof input === 'string' ? input.trim() : ''
  let lower = strim.charAt(0).toLowerCase() + strim.slice(1)
  let camel = lower.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
  return camel
}

/**
  checkLookup checks a string in a dictionary and returns matched or ''.

  @param {String} s - a string of word/name
  @param {Array} dictionary - a lookup dictionary
  @param {Boolean} returnKey - returning key if dictionary is not an Array;
                               otherwise, return value.

  @return {String} - matched string in dictionary or empty ('')

  @example <caption>Case-insensitive lookup</caption>
  // return 'Approved'
  checkLookup('approved', ['New', 'Approved', 'Rejected'])

  @example <caption>Object key/value</caption>
  // return 'warn'
  checkLookup('warning', {info: 'Informational', warn: 'Warning'}, true)

  @example <caption>Prefix lookup</caption>
  // return 'Rejected'
  checkLookup('reject', ['New', 'Approved', 'Rejected'])
**/
export const checkLookup = (s, dictionary, returnKey = false) => {
  if (typeof s !== 'string') return ''
  let ss = s.toLowerCase().trim()
  if (ss) {
    if (!Array.isArray(dictionary)) {
      for (let key in dictionary) {
        let item = dictionary[key]
        let k = key.toLowerCase()
        let v = typeof item === 'string' ? item.toLowerCase() : ''
        if (k === s || (v && v.indexOf(ss) === 0)) {
          return returnKey ? key : item
        }
      }
      return ''
    }
    for (let item of dictionary) {
      let v = typeof item === 'string' ? item.toLowerCase() : ''
      if (v && v.indexOf(ss) === 0) {
        return item
      }
    }
  }
  return ''
}

/**
  checkOrderBy checks if the orderBy clause has valid column key.

  @param {string} str - orderBy clause, in format of `<fieldName>[, desc]`.
  @param {Array} columnKeys - valid column key names.

  @return {string} - validated orderBy clause.
**/
export const checkOrderBy = (str, columnKeys) => {
  if (typeof str !== 'string') return ''
  let values = str.split(' ').filter(s => s !== '')
  let col = checkLookup(values[0], columnKeys)
  let val = String(values[1] || '').toLowerCase()
  if (col && val === 'desc') {
    col += ' desc'
  }
  return col
}

/**
  clock return current time in format of 'HH:MM:SS'

  @desc Alternatively using RegExp should produce the same result
    ```
    new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}.*)/, "$1")
    ```
**/
export const clock = () => {
  let now = new Date()
  let hrs = now.getHours()
  let min = now.getMinutes()
  let sec = now.getSeconds()
  let _hh = hrs < 10 ? '0' + hrs : hrs
  let _mm = min < 10 ? '0' + min : min
  let _ss = sec < 10 ? '0' + sec : sec

  return `${_hh}:${_mm}:${_ss}`
}

/**
  convert a contact to HTML mailto link.

  @param {String} contact - string in format of "Name <emailAddress>"

  @return {String} - HTML mailto link.
**/
export const contactToHTML = (contact) => {
  if (typeof contact !== 'string') {
    return ''
  }
  contact = contact.trim()

  let regex1 = /(.+)<(.+)>/
  let match1 = regex1.exec(contact)
  let regex2 = /[<]*(.+)@(.+)[>]*/
  let match2 = regex2.exec(contact)

  if (match1) {
    return `<a href="mailto:${match1[2]}">${match1[1].trim()}</a>`
  }
  if (match2) {
    return `<a href="mailto:${match2[1]}@${match2[2]}">${contact}</a>`
  }
  return contact
}

/**
  convert an object to JSON string.

  @param {Object} obj - object to be converted.
  @param space - A String or Number object that's used for JSON.stringify method.

  @return {String} - Formatted JSON string.
**/
export const jsonStringify = (obj, space) => {
  var allKeys = []
  JSON.stringify(obj, function (k, v) { allKeys.push(k); return v })
  allKeys.sort()
  return JSON.stringify(obj, allKeys, space)
}

/**
  parseDate returns ISO or locale date in format of 'yyyy-mm-dd HH:MM:SS',
  or '' if input is not a valid date.

  @param {String} s - string of date
  @param {Boolean} toLocale - using locale date

  @return {String} - ISO or locale date in format of 'yyyy-mm-dd HH:MM:SS'
**/
export const parseDateTime = (s, toLocale = false) => {
  let date = new Date(s)
  if (date.toString() !== 'Invalid Date') {
    if (toLocale) {
      let yyyy = date.getFullYear().toString().padStart(4, '0')
      let mm = (date.getMonth() + 1).toString().padStart(2, '0')
      let dd = date.getDate().toString().padStart(2, '0')
      let HH = date.getHours().toString().padStart(2, '0')
      let MM = date.getMinutes().toString().padStart(2, '0')
      let SS = date.getSeconds().toString().padStart(2, '0')
      return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`
    }
    let sUTC = date.toISOString().replace('T', ' ')
    return sUTC.slice(0, 19)
  }
  return ''
}

/**
  parseDate returns ISO or locale date in format of 'yyyy-mm-dd',
  or '' if input is not a valid date.

  @param {String} s - string of date
  @param {Boolean} toLocale - using locale date

  @return {String} - ISO or locale date in format of 'yyyy-mm-dd'

  @example <caption>Parsing mm/dd/yy</caption>
  // return '2017-01-16' (tz >= GMT) or '2017-01-15' (tz < GMT)
  parseDate('1/16/17')

  @example <caption>Parsing yyyy.mm.dd</caption>
  // return '2017-01-16' (tz >= GMT) or '2017-01-15' (tz < GMT)
  parseDate('2017.01.16')

  @example <caption>Parsing yyyy/mm/dd</caption>
  // return '2017-01-16' (tz >= GMT) or '2017-01-15' (tz < GMT)
  parseDate('2017/1/16')

  @example <caption>Parsing yyyy/mm/dd to locale</caption>
  // return '2017-01-16'
  parseDate('2017/1/16', true)

  @example <caption>Parsing yyyy-m-d to locale</caption>
  // return '2017-02-01'
  parseDate('2017-2-1')

  @example <caption>Parsing yyyy-mm-dd to locale</caption>
  // return '2017-12-11' (tz >= GMT) or '2017-12-10' (tz < GMT)
  parseDate('2017-12-11', true)

  @example <caption>Parsing yyyy-mm-dd</caption>
  // return '2017-01-16' since 'yyyy-mm-dd' always results in ISO date
  parseDate('2017-01-16')
**/
export const parseDate = (s, toLocale = false) => {
  let date = new Date(s)
  if (date.toString() !== 'Invalid Date') {
    if (toLocale) {
      let yyyy = date.getFullYear().toString().padStart(4, '0')
      let mm = (date.getMonth() + 1).toString().padStart(2, '0')
      let dd = date.getDate().toString().padStart(2, '0')
      return `${yyyy}-${mm}-${dd}`
    }
    return date.toISOString().slice(0, 10)
  }
  return ''
}
