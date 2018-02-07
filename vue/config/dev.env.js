'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const JSON_API = 'https://jsonplaceholder.typicode.com/'

module.exports = merge(prodEnv, {
  REST_API: JSON.stringify(process.env.REST_API || JSON_API),

  NODE_ENV: '"development"'
})
