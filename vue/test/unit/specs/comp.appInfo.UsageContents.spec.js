import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import iView from 'iview'
import UsageContents from '@/components/appInfo/UsageContents'
import store from '@/store'

require('./api.docs') // mocking docs api calls

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(iView)
localVue.use(Vuex)

describe('appInfo/UsageContents.vue', () => {
  it('should render UsageContents contents', () => {
    const wrapper = vt.mount(UsageContents, {
      store,
      localVue,
      mocks: {
        $route: {}
      }})
    const el = wrapper.find('.footer-notes')
    expect(el.text()).toContain('Powered by')
  })
})
