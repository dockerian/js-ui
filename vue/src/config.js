// config.js

const env = process.env

const REST_API = (env.REST_API || 'http://localhost:8001').replace(/\/$/, '')
const REST_API_DATA = `${REST_API}/data`
const REST_API_COMMENTS = `${REST_API}/comments`
const REST_API_PHOTOS = `${REST_API}/photos`
const REST_API_POSTS = `${REST_API}/posts`
const REST_API_USERS = `${REST_API}/users`

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
    description: 'Dockerian JavaScript framework UI project',
    manager: 'Jason Zhu <jason.zhuyx@gmail.com>',
    developers: [
      'Jason Zhu <jason.zhuyx@gmail.com>',
      'Jason Zhu <jzhu@infoblox.com>'
    ],
    startDate: '2018-01-05',
    team: 'dockerian'
  },
  rest: {
    api: REST_API,
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
  settings: {
    copyright: copyright(),
    copyrightInfo: `(c) ${copyright()} - All rights reserved.`,
    ...settings
  }
}

export default config
