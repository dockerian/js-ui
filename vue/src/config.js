// config.js

const env = process.env
const pkg = require('../package.json')

const REST_API = (env.REST_API || 'http://localhost:8001').replace(/\/$/, '')
const REST_API_DATA = `${REST_API}/data`
const REST_API_COMMENTS = `${REST_API}/comments`
const REST_API_PHOTOS = `${REST_API}/photos`
const REST_API_POSTS = `${REST_API}/posts`
const REST_API_USERS = `${REST_API}/users`
const REST_VER = (env.REST_VER || '1.0')

const APP_BUILD = env.APP_BUILD || env.BUILD_NUMBER || 'a'
const APP_VERSION = env.APP_VERSION || pkg.version
const APP_RELEASE = `${APP_VERSION}.${APP_BUILD}`

// filter limit: [5, 25], default: 20
const FILTER_LIMIT = Math.min(25, Math.max(5, parseInt(env.FILTER_LIMIT) || 20))

// page offset limit: [100, 1000000], default: 100
const PAGE_OFFSET_LIMIT = Math.min(1000000, Math.max(100, parseInt(env.PAGE_OFFSET_LIMIT) || 100))
// page size limit: [5, 1000], default: 500
const PAGE_SIZE_LIMIT = Math.min(1000, Math.max(5, parseInt(env.PAGE_SIZE_LIMIT) || 500))

const runtime = process.env === 'production' ? 'prod' : (
  process.env === 'testing' ? 'test' : 'dev'
)

const settings = {
  env: runtime,
  org: 'Dockerian',
  contact: 'Jason Zhu <jason.zhuyx@gmail.com>',
  project: {
    alias: 'jsui',
    name: 'Dockerian JsUi',
    version: `${APP_VERSION}`,
    release: `${APP_RELEASE}`,
    description: 'Dockerian JavaScript framework UI project',
    manager: 'Jason Zhu <jason.zhuyx@gmail.com>',
    developers: [
      'Dockeria USA <dockeria@gmail.com>',
      'Jason Zhu <jason.zhuyx@gmail.com>'
    ],
    startDate: '2018-01-05',
    releases: {
      'MVP': '2018-04-30',
      '': ''
    },
    team: 'dockerian'
  },
  rest: {
    api: REST_API,
    ver: REST_VER,
    data: REST_API_DATA,
    comments: REST_API_COMMENTS,
    photos: REST_API_PHOTOS,
    posts: REST_API_POSTS,
    users: REST_API_USERS
  }
}

const copyright = (orgName) => {
  let org = orgName || settings.org
  let year = new Date().getFullYear()
  let startYear = new Date(settings.project.startDate).getFullYear()
  let copyYear = (year <= startYear ? '' : `${startYear}-`) + year
  return `${copyYear} ${org}`
}

const config = {
  env: {
    ...process.env // making a copy
  },
  doc: '/static/README.md',
  dataTableOptions: {
    filterLimit: FILTER_LIMIT,
    pageOffsetLimit: PAGE_OFFSET_LIMIT,
    pageSizeLimit: PAGE_SIZE_LIMIT,
    pageSizes: [10, 20, 50, 100]
  },
  restApiUrl: runtime === 'dev' ? '/api' : REST_API, // see proxyTable in config/index.js
  settings: {
    copyright: copyright(),
    copyrightInfo: `(c) ${copyright()} - All rights reserved.`,
    ...settings
  }
}

export default config
