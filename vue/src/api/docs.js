// api/docs - api functions

import axios from 'axios'

const docsApi = {
  getFile: async function (url) {
    let res = {}
    try {
      res = await axios.get(url)
    } catch (exception) {
      res = exception
    }
    // console.log('docsApi.getFile:', JSON.stringify(res, null, 2))
    return res.data
  }
}

export default docsApi
