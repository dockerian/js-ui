import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import iView from 'iview'
import Messages from '@/components/appInfo/Messages'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(iView)
localVue.use(Vuex)

jest.mock('@/helper/vm')

afterAll(() => {
  jest.unmock('@/helper/vm')
})

describe('components/appInfo/Messages.vue', () => {
  it('should render Messages component', () => {
    const cmp = vt.mount(Messages, {store, localVue})
    const el = cmp.find('#message')
    expect(el).toEqual({selector: '#message'})

    cmp.vm.ack({})
    cmp.vm.clear({})

    let helper = require('@/helper/vm')
    helper.copyMessage = jest.fn()
    cmp.vm.copyData({message: 'msg'})
    expect(helper.copyMessage).toBeCalledWith(cmp.vm, {message: 'msg'})

    helper.getAlertType = jest.fn()
    cmp.vm.getAlertType({message: 'msg'})
    expect(helper.getAlertType).toBeCalledWith({message: 'msg'})
  })
})
