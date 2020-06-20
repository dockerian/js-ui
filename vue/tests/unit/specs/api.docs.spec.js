/**
 * @jest-environment node
 */
// tests/unit/specs/api.docs.js - testing docs api

import api from '@/api'
import docsApi from '@/api/docs'

import './api.docs' // mocking docs api calls

import config from '@/config'

beforeEach(async () => {
})

describe('api', () => {
  it('api', async () => {
    expect(api).toEqual({})
  })
})

describe('api.docs', () => {
  it('api.docs.getFile', async () => {
    let content = await docsApi.getFile(config.doc)
    expect(content).toBe('markdown')
  })
})
