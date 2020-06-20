// tests/unit/specs/api.docs.js

/**
  This `api.docs` module uses `'axios-mock-adapter'` to mock axios calls.
*/

import axios from 'axios'
import config from '@/config'

const MockAdapter = require('axios-mock-adapter')
const mock = new MockAdapter(axios)

export const getDocsTest = 'markdown'

mock.onGet(config.doc).reply(200, getDocsTest)
