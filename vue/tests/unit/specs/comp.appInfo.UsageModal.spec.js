import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import iView from 'iview'
import UsageModal from '@/components/appInfo/UsageModal'
import store from '@/store'

require('./api.docs') // mocking docs api calls

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(iView)
localVue.use(Vuex)

describe('appInfo/UsageModal.vue', () => {
  it('should render UsageModal contents', () => {
    const wrapper = vt.mount(UsageModal, {
      store,
      localVue,
      propsData: {
        visible: false
      },
      mocks: {
        $route: {}
      }})
    const el = wrapper.find('h2')
    expect(el.text()).toBe('Usage and Help')
  })
})
