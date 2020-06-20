import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import HelloWorld from '@/components/demo/HelloWorld'

import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)

describe('demo/HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const comp = vt.shallowMount(HelloWorld, {
      store,
      localVue,
      propsData: {
      },
      mocks: {
        $route: { query: {} },
        path: ''
      }})
    const el = comp.find('#demo-p h1')
    expect(el.text()).toEqual('Hello')
  })
})
