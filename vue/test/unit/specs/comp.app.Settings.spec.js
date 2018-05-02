import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import iView from 'iview'
import Settings from '@/components/app/Settings'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(iView)
localVue.use(Vuex)

describe('app/Settings.vue', () => {
  it('should render Settings contents', () => {
    const wrapper = vt.shallow(Settings, {store, localVue})
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe('Settings')
  })
})
