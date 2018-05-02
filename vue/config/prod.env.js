'use strict'

const JSON_API = 'https://jsonplaceholder.typicode.com/'

module.exports = {

  BUILD_NUMBER: JSON.stringify(process.env.BUILD_NUMBER || ''),

  REST_API: JSON.stringify(process.env.REST_API || JSON_API),

  NODE_ENV: '"production"'
}
