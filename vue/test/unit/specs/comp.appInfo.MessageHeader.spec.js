import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import iView from 'iview'
import MessageHeader from '@/components/appInfo/MessageHeader'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(iView)
localVue.use(Vuex)

jest.mock('@/helper/vm')

afterAll(() => {
  jest.unmock('@/helper/vm')
})

describe('components/appInfo/MessageHeader.vue', () => {
  it('should render MessageHeader contents', () => {
    const wrapper = vt.mount(MessageHeader, {store, localVue})
    const h1 = wrapper.find('h1')
    expect(h1.text()).toContain('Message Board')

    wrapper.vm.ackAll()
    wrapper.vm.clearAll({})
  })
})
