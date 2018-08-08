import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import WS from '@/components/app/WS'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)

describe('app/WS.vue', () => {
  it('should render Workspace contents', () => {
    let cmp = vt.mount(WS, {
      store,
      localVue,
      propsData: {},
      stubs: ['router-lik', 'router-view'],
      mocks: {
        $route: {
          $route: { query: {} },
          path: ''
        }
      }})
    expect(cmp.vm).not.toBeNull()

    cmp.vm.addTab()
    cmp.vm.closeTab(0)
    cmp.vm.moveTabBackward()
    cmp.vm.moveTabForward()
  })
})
