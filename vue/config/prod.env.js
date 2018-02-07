'use strict'

const JSON_API = 'https://jsonplaceholder.typicode.com/'

module.exports = {
  REST_API: JSON.stringify(process.env.REST_API || JSON_API),

  NODE_ENV: '"production"'
}
