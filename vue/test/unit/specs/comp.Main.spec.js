import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import Main from '@/components/Main'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)

describe('Main.vue', () => {
  it('should render Main contents', () => {
    let vm = vt.mount(Main, {
      store,
      localVue,
      mocks: {
        $route: {
          $route: { query: {} },
          path: ''
        }
      }})
    expect(vm).not.toBeNull()
  })
})
