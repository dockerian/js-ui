/**
 * @jest-environment node
 */
// tests/unit/specs/store.appInfo.spec.js - testing appInfo store

import Message from '@/utils/message'
import * as _const from '@/store/appInfo/_constants'
import store from '@/store'

const getData = (store) => {
  return {
    count: store.getters[`appInfo/${_const.COUNT}`],
    countError: store.getters[`appInfo/${_const.COUNT_ERROR}`],
    countNotAck: store.getters[`appInfo/${_const.COUNT_NOT_ACK}`],
    messages: store.getters[`appInfo/${_const.GET_MESSAGES}`],
    messagesList: store.getters[`appInfo/${_const.MESSAGES}`],
    hasMessage: store.getters[`appInfo/${_const.HAS_MESSAGE}`],
    hasNotAckOrError: store.getters[`appInfo/${_const.HAS_NOTACK_OR_ERROR}`],
    top: store.getters[`appInfo/${_const.LATEST_MESSAGE}`],
    x: ''
  }
}

beforeEach(async () => {
  await store.dispatch(`appInfo/${_const.RESET}`)
})

describe('store/appInfo', () => {
  it(`store/appInfo/actions :: ${_const.ACK_ALL}`, async () => {
    let data = {}
    let msg1 = new Message('not-acked warning', 'warn', true)
    let msg2 = new Message('not-acked error', 'error', true)
    store.dispatch(`appInfo/${_const.ADD_MESSAGE}`, msg1)
    store.dispatch(`appInfo/${_const.ADD_MESSAGE}`, msg2)
    data = getData(store)

    expect(data.count).toBe(2)
    expect(data.countError).toBe(1)
    expect(data.countNotAck).toBe(2)
    expect(typeof data.messages).toBe('object')
    expect(data.messages instanceof Array).toBe(true)
    expect(data.top).toEqual(msg2)
    expect(data.top instanceof Message).toBe(true)
    expect(data.top.type).toBe('error')
    expect(data.top.notAcknowledged).toBe(true)
    expect(data.hasMessage).toBe(true)

    store.dispatch(`appInfo/${_const.ACK}`, data.top.uuid)
    data = getData(store)
    expect(data.countNotAck).toBe(1)
    expect(data.countError).toBe(1)
    expect(data.count).toBe(2)

    store.dispatch(`appInfo/${_const.ACK_ALL}`)
    data = getData(store)
    expect(data.countNotAck).toBe(0)
    expect(data.countError).toBe(1)
    expect(data.count).toBe(2)
  })

  it(`store/appInfo/actions :: ${_const.ADD_MESSAGE}`, async () => {
    let data = {}
    let msg1 = new Message('new success info', 'success')
    let msg2 = new Message('not-acked error', 'error', true)
    let msg3 = new Message('not-acked important', 'warn', true, false, true)

    store.dispatch(`appInfo/${_const.ADD_MESSAGE}`, msg3)
    store.dispatch(`appInfo/${_const.ADD_MESSAGE}`, msg2)
    store.dispatch(`appInfo/${_const.ADD_MESSAGE}`, msg1)
    data = getData(store)
    expect(data.count).toBe(3)
    expect(data.countError).toBe(1)
    expect(data.countNotAck).toBe(2)
    expect(typeof data.messages).toBe('object')
    expect(data.messages instanceof Array).toBe(true)
    expect(data.messages).toEqual(data.messagesList)
    expect(data.top).toEqual(msg1)
    expect(data.top instanceof Message).toBe(true)
    expect(data.top.type).toBe('info')
    expect(data.top.notAcknowledged).toBe(false)
    expect(data.hasMessage).toBe(true)

    store.dispatch(`appInfo/${_const.ACK_ALL}`)
    data = getData(store)
    expect(data.count).toBe(3)
    expect(data.countError).toBe(1)
    expect(data.countNotAck).toBe(0)

    store.dispatch(`appInfo/${_const.CLEAR}`)
    data = getData(store)
    expect(data.count).toBe(1)
    expect(data.countError).toBe(0)
    expect(data.countNotAck).toBe(0)
    expect(data.hasMessage).toBe(true)
    expect(data.messages.length).toBe(1)
    expect(data.top).toEqual(msg3)

    store.dispatch(`appInfo/${_const.RESET}`)
    data = getData(store)
    expect(data.count).toBe(0)
    expect(data.countError).toBe(0)
    expect(data.countNotAck).toBe(0)
    expect(data.hasMessage).toBe(false)
    expect(data.messages.length).toBe(0)
    expect(data.top).toBeNull()
  })

  it(`store/appInfo/actions :: ${_const.ADD_MESSAGE} and ${_const.DEL_MESSAGE}`, async () => {
    let data = getData(store)

    expect(data.count).toBe(0)
    expect(data.countError).toBe(0)
    expect(data.countNotAck).toBe(0)
    expect(data.hasMessage).toBe(false)
    expect(data.messages.length).toBe(0)
    expect(data.top).toBeNull()

    // adding empty message
    store.dispatch(`appInfo/${_const.ADD_MESSAGE}`, '')
    store.dispatch(`appInfo/${_const.ADD_MESSAGE}`, {test: true})
    store.dispatch(`appInfo/${_const.ADD_MESSAGE}`, new Message())
    data = getData(store)
    expect(data.count).toBe(0)
    expect(data.countError).toBe(0)
    expect(data.countNotAck).toBe(0)
    expect(data.hasMessage).toBe(false)
    expect(data.messages.length).toBe(0)
    expect(data.top).toBeNull()

    // adding new message from params array
    let msgParams = ['new msg', 'error', true, true, true]
    store.dispatch(`appInfo/${_const.ADD_MESSAGE}`, msgParams)
    data = getData(store)
    expect(data.count).toBe(1)
    expect(data.countError).toBe(1)
    expect(data.countNotAck).toBe(1)
    expect(data.hasMessage).toBe(true)
    expect(data.messages.length).toBe(1)
    expect(data.top).not.toBeNull()

    // deleting message
    store.dispatch(`appInfo/${_const.DEL_MESSAGE}`, data.top.uuid)
    data = getData(store)
    expect(data.count).toBe(0)
    expect(data.countError).toBe(0)
    expect(data.countNotAck).toBe(0)
    expect(data.hasMessage).toBe(false)
    expect(data.messages.length).toBe(0)
    expect(data.top).toBeNull()
  })

  it(`store/appInfo/actions`, async () => {
    let data = {}
    let msgParams = ['new important notAcked', 'warn', true, false, true]

    store.dispatch(`appInfo/${_const.ADD_MESSAGE}`, msgParams)
    data = getData(store)
    expect(data.count).toBe(1)
    expect(data.countError).toBe(0)
    expect(data.countNotAck).toBe(1)
    expect(data.hasMessage).toBe(true)
    expect(data.messages.length).toBe(1)
    expect(data.top).not.toBeNull()

    store.dispatch(`appInfo/${_const.DEL_MESSAGE}`, 'invalid uuid')
    data = getData(store)
    expect(data.count).toBe(1)
    expect(data.countError).toBe(0)
    expect(data.countNotAck).toBe(1)
    expect(data.hasMessage).toBe(true)
    expect(data.messages.length).toBe(1)
    expect(data.top).not.toBeNull()

    store.dispatch(`appInfo/${_const.ACK}`, 'invalid uuid')
    data = getData(store)
    expect(data.count).toBe(1)
    expect(data.countError).toBe(0)
    expect(data.countNotAck).toBe(1)
    expect(data.hasMessage).toBe(true)
    expect(data.messages.length).toBe(1)
    expect(data.top).not.toBeNull()
  })
})
