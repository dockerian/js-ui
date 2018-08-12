/**
 * @jest-environment node
 */
// test/unit/specs/api.rest.js - testing rest wrapper for axios

import axios from 'axios'
import rest from '@/api/rest'

const MockAdapter = require('axios-mock-adapter')
const mock = new MockAdapter(axios)

const successUrl = `/success`
const errorUrl = `/error`

mock.onAny(successUrl).reply(200)
mock.onAny(errorUrl).timeout()

describe('api/rest', () => {
  describe('calls the right request method with data', () => {
    it('get', async () => {
      let res = await rest.get(successUrl)
      expect(res.config.url).toBe(successUrl)
      expect(res.config.method).toBe('get')
    })

    it('put', async () => {
      let data = {'foo': 'bar'}
      let res = await rest.put(successUrl, data)
      expect(res.config.url).toBe(successUrl)
      expect(res.config.method).toBe('put')
      expect(res.config.data).toBe(JSON.stringify(data))
    })

    it('post', async () => {
      let data = {'foo': 'bar'}
      let res = await rest.post(successUrl, data)
      expect(res.config.url).toBe(successUrl)
      expect(res.config.method).toBe('post')
      expect(res.config.data).toBe(JSON.stringify(data))
    })

    it('delete', async () => {
      let res = await rest.delete(successUrl)
      expect(res.config.url).toBe(successUrl)
      expect(res.config.method).toBe('delete')
    })
  })

  describe('catches and returns exceptions', () => {
    it('get', async () => {
      let res = await rest.get(errorUrl)
      expect(res.message).toBeDefined()
      expect(res.stack).toBeDefined()
    })

    it('put', async () => {
      let res = await rest.put(errorUrl)
      expect(res.message).toBeDefined()
      expect(res.stack).toBeDefined()
    })

    it('post', async () => {
      let res = await rest.post(errorUrl)
      expect(res.message).toBeDefined()
      expect(res.stack).toBeDefined()
    })

    it('delete', async () => {
      let res = await rest.delete(errorUrl)
      expect(res.message).toBeDefined()
      expect(res.stack).toBeDefined()
    })
  })
})
