// utils/search.js - search filter functions

import _ from 'lodash'
import * as str from '@/utils/str'

/**
  addFilters constructs a new filters object to include specific
  key:value pairs in addingItems

  @param {Object} filters - original filters object
  @param {Object} addingItems - fitler items to be added

  @return {Object} - a new filters object including added items

  @example
  // return {a: [1,2,3], b: ['b']}
  addFilters({a: [1,3], b: ['b']}, {a: 2})
**/
export const addFilters = (filters, addingItems) => {
  let result = Object.assign({}, filters)
  for (let key in addingItems) {
    let val1 = result[key]
    let val2 = addingItems[key]
    let set1 = val1 instanceof Array ? val1 : (val1 !== undefined ? [val1] : [])
    let set2 = val2 instanceof Array ? val2 : (val2 !== undefined ? [val2] : [])
    for (let item of set2) {
      if (set1.indexOf(item) < 0) {
        set1.push(item)
      }
    }
    result[key] = set1.sort()
  }
  return result
}

/**
  checkFilters uses filterKeys to validate keys in filters object.

  @param {Object} filters - filters object.
  @param {Array} filterKeys - filter keys list or map.

  @return {Object} filters object without invalid keys.
**/
export const checkFilterKeys = (filters, filterKeys) => {
  let results = _.cloneDeep(filters)
  let deleteKeys = []
  let keys = filterKeys instanceof Array ? filterKeys : Object.keys(filterKeys || {})

  // sort in order to match the longest rather than shorter alias
  keys.sort().reverse()
  // console.log('keys:', JSON.stringify(keys))

  for (let key in results) {
    if (keys.indexOf(key) >= 0) continue

    let camelKey = str.camelize(key)
    let matchKey = keys.find(s => {
      let sKey = s.toLowerCase()
      return sKey === key.toLowerCase() || sKey === camelKey.toLowerCase()
    })
    let validKey = matchKey || keys.find(s => s.startsWith(camelKey))
    if (validKey && validKey !== key) {
      let others = results[validKey] || []
      results[validKey] = [
        ...results[key],
        ...others
      ].sort()
    }
    deleteKeys.push(key)
  }
  for (let key of deleteKeys) {
    delete results[key]
  }
  return results
}

/**
  checkFilters normalizes filter keys by keyMap and keyTypes
  @param {Object} filters - filters object
  @param {Object} keyMap - filters keys mapping
  @param {Function} keyTypesLookup - filters key types checker lookup function

  @return {Object} - normalized filters

  @example <caption>Customized key map and checkerLookup function</caption>
  // define a key map:
  //      let keyMap = {a: 'adhoc', b: 'bar', d: 'date'}
  // define a checker lookup:
  //      let checkerLookup = (s) => (({d: str.parseDate})[s] || s => s)
  // return {adhoc:'a', bar:'bbb', d:['2018-01-01']}
  checkFilters({a:'a', b:'bbb', d:['2018', 'd']}, keyMap, checkerLookup)
**/
export const checkFilters = (filters, keyMap = {}, keyTypesLookup = null) => {
  let deleteKeys = []
  let result = Object.assign({}, filters)

  for (let filterKey in result) {
    let map = keyMap instanceof Object ? keyMap : {}
    let key = map[filterKey] || filterKey
    if (key && key !== filterKey) {
      let others = result[key] || []
      result[key] = [
        ...result[filterKey],
        ...others
      ].sort()
      deleteKeys.push(filterKey)
    }

    if (keyTypesLookup instanceof Function) {
      let checker = keyTypesLookup(key)
      if (checker instanceof Function) {
        let value = result[key]
        let array = value instanceof Array ? value : (value ? [`${value}`] : [])
        let vList = []
        for (let item of array) {
          let val = checker(item)
          if (val !== undefined && val !== null && val !== '' && vList.indexOf(val) < 0) {
            vList.push(val)
          }
        }
        result[key] = vList.sort()
      }
    }
  }

  for (let key of deleteKeys) {
    delete result[key]
  }

  return result
}

/**
  countFilters calculates numbers of filters

  @param {Object} filters - filters object

  @return {Number} - counts of filters

  @example
  // return 5
  countFilters({a: ['x','y','z'], b: [1,2]})
**/
export const countFilters = (filters) => {
  let counts = 0
  for (let key in filters) {
    let val = filters[key]
    let set = val instanceof Array ? val : (val ? [`${val}`] : [])
    counts += set.length
  }
  return counts
}

/**
  deleteFilters constructs a new filters object to exclude specific
  key:value pairs in removingItems

  @param {Object} filters - original filters object
  @param {Object} removingItems - fitler items to be removed

  @return {Object} - a new filters object excluding removed items

  @example
  // return {a: [1,3], b: ['b']}
  deleteFilters({a: [1,2,3], b: ['b']}, {a: 2})
**/
export const deleteFilters = (filters, removingItems) => {
  let result = Object.assign({}, filters)
  for (let key in removingItems) {
    let val1 = result[key]
    let val2 = removingItems[key]
    let set1 = val1 instanceof Array ? val1 : (val1 !== undefined ? [val1] : [])
    let set2 = val2 instanceof Array ? val2 : (val2 !== undefined ? [val2] : [])
    for (let item of set2) {
      let idx = set1.indexOf(item)
      if (idx >= 0) {
        set1.splice(idx, 1)
      }
    }
    if (set1.length > 0) {
      result[key] = set1.sort()
    } else {
      delete result[key]
    }
  }
  return result
}

/**
  deleteFilterKeys constructs a new filters object to exclude specific keys

  @param {Object} filters - original filters object
  @param {Object} keys - fitler keys to be deleted

  @return {Object} - a new filters object excluding deleted keys

  @example
  // return {a: [1,2,3]}
  deleteFilterKeys({a: [1,2,3]}, ['b', 'c'])
**/
export const deleteFilterKeys = (filters, keys) => {
  let result = Object.assign({}, filters)
  let exKeys = []
  if (keys instanceof Array) {
    exKeys = keys
  } else if (keys instanceof Object) {
    exKeys = Object.keys(keys)
  } else {
    exKeys = `${keys}`.replace(/[,;]/g, ' ').split(' ')
  }
  for (let key of exKeys) {
    delete result[key]
  }
  return result
}

/**
  getFilterList convert filters object to a list of filter key/value pairs.

  @param {Object} filters - filters object.

  @return {Array} - a list of filter key/value pairs.

  @example
  // return [
  //  {key: 'key1', value: 'v1'},
  //  {key: 'key1', value: 'v2'},
  //  {key: 'key2', value: 'v3'}
  // ]
  getFilterList({ key1: ['v1', 'v2'], key2: 'v3' })
**/
export const getFilterList = (filters) => {
  let filterList = []
  let keys = Object.keys(filters).slice().sort()
  for (let key of keys) {
    let val = filters[key]
    let set = val instanceof Array ? val : (val !== undefined ? [val] : [])
    for (let item of set.slice().sort()) {
      filterList.push({
        key: key, value: item
      })
    }
  }
  return filterList
}

/**
  getFilterString convert filters object to filter string.

  @param {Object} filters - filters object.

  @return {String} - filter string.

  @example
  // return `key1:"v1" key1:"v2" key2:"v3"`
  getFilterString({ key1: ['v1', 'v2'], key2: 'v3' })
**/
export const getFilterString = (filters) => {
  let filterString = ''
  let keys = Object.keys(filters).slice().sort()
  for (let key of keys) {
    let val = filters[key]
    let set = val instanceof Array ? val : (val !== undefined ? [val] : [])
    for (let item of set.slice().sort()) {
      filterString += `${key}:"${item}" `
    }
  }
  return filterString.trim()
}

/**
  getQueryString returns a URL query string (`k1=v1&k2=v2`) from filters object

  @param {Object} filters - filters object

  @return {String} - a URL query string

  @example
  // return `a=1&a=2&a=3&b=b`
  getQueryString({a: [1,2,3], b: ['b']})
**/
export const getQueryString = (filters) => {
  let query = ''
  for (let key of Object.keys(filters).sort()) {
    let value = filters[key]
    let array = value instanceof Array ? value : (value ? [`${value}`] : [])
    for (let val of array) {
      query += `&${key}=${val}`
    }
  }
  return query.slice(1)
}

/**
  mergeFilters combines keys and values from 2 filters objects
  and constructs a new filters object without changing sources

  @param {Object} filters1 - 1st immuted filters to be merged
  @param {Object} filters2 - 2nd immuted filters to be merged

  @return {Object} - merged filters

  @example <caption>Merging two filters</caption>
  // return {a: [1,2,3], b:['b']}
  mergeFilters({a: [1,2]}, {a: [3], b:['b']})
**/
export const mergeFilters = (filters1, filters2) => {
  let filters = filters1 instanceof Object ? Object.assign({}, filters1) : {}
  for (let key in filters2) {
    let val1 = filters[key]
    let val2 = filters2[key]
    let arr1 = val1 instanceof Array ? val1 : (val1 !== undefined ? [val1] : [])
    let arr2 = val2 instanceof Array ? val2 : (val2 !== undefined ? [val2] : [])

    filters[key] = Array.from(new Set([...arr1, ...arr2])).sort()
  }
  return filters
}

/**
  parseFilters converts a search string to filters (as a key:values
  object, where `values` is an array of strings), optionally with specific
  default key name.

  @param {string} input - search input string
  @param {string} defaultKey - default filter key name

  @return {Object} - parsed result (a filters object)

  @example <caption>Parsing with default key</caption>
  // return {"default": ["abc", "xyz"]}
  parseFilters('abc xyz')

  @example <caption>Parsing with specific keys</caption>
  // return
  // {
  //   key1: ["value1", "value2"],
  //   key2: ["a test phase"],
  // }
  parseFilters(`key1:value1 key2:"a test phase" value2`, 'key1')
**/
export const parseFilters = (
  input, defaultKey = 'default', ignoreChars = ':?&=') => {
  let filters = {}
  let regex = /([0-9a-zA-Z-_.]+:)?\s*("(.*?)"|'(.*?)'|`(.*?)`|[^ ]*)/
  let regrm = ignoreChars ? new RegExp(`[${ignoreChars}]`, 'g') : /"/g
  let text = typeof input === 'string' || input instanceof String ? input.trim() : ''
  let m = []

  while ((m = regex.exec(text)) && text !== '') {
    text = text.slice(m[0].length).trim()

    let key = m[1] ? m[1].replace(/:/g, '') : defaultKey
    let val = m[2] ? m[2].replace(regrm, '').trim() : ''
    let set = filters[key]
    // trim back-quotes, single-quotes, or double-quotes
    val = val.replace(/^(['"`]?)(.*?)\1$/, '$2').trim()

    if (set instanceof Array) {
      if (set.indexOf(val) < 0) { // value not in filter key list
        set.push(val) // adding value to filter key list
      }
    } else {
      filters[key] = [val]
    }
  }

  return filters
}
