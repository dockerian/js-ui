'use strict'

const merge = require('webpack-merge')
const devEnv = require('./dev.env')

const JSON_API = 'https://jsonplaceholder.typicode.com/'

module.exports = merge(devEnv, {
  REST_API: JSON.stringify(process.env.REST_API || JSON_API),

  NODE_ENV: '"testing"'
})
