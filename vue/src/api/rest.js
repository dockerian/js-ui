// api/rest.js - api wrapper for axios to handle all the common code

import axios from 'axios'

const rest = {
  delete: async function (url, config) {
    let res = {}
    try {
      console.log(`[api] DELETE: ${url}`)
      res = await axios.delete(url, config)
    } catch (exception) {
      res = exception
    }
    return res
  },
  get: async function (url, config) {
    let res = {}
    try {
      console.log(`[api] GET: ${url}`)
      res = await axios.get(url, config)
    } catch (exception) {
      res = exception
    }
    return res
  },
  put: async function (url, data, config) {
    let res = {}
    try {
      console.log(`[api] PUT: ${url}`)
      res = await axios.put(url, data, config)
    } catch (exception) {
      res = exception
    }
    return res
  },
  post: async function (url, data, config) {
    let res = {}
    try {
      console.log(`[api] POST: ${url}`)
      res = await axios.post(url, data, config)
    } catch (exception) {
      res = exception
    }
    return res
  }
}

export default rest
