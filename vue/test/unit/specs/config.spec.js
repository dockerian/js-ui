// unit/specs/config - testing config

import config from '@/config'

describe('conifg', () => {
  it('should return config and settings', () => {
    // console.log(config.env)
    // console.log(config.settings)
    expect(config.settings.env).toEqual('dev')
    expect(config.settings.rest.posts).toEqual('http://localhost:8001/posts')
    expect(config.settings.project.alias).toEqual('jsui')
    expect(config.env).toBeInstanceOf(Object)
  })
})
