import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import SignIn from '@/components/user/SignIn'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)

describe('user/SignIn.vue', () => {
  it('should render User SignIn form', () => {
    let vm = vt.mount(SignIn, {
      store,
      localVue,
      propsData: {
      },
      mocks: {
        $route: { query: {} },
        path: ''
      }})
    expect(vm).not.toBeNull()
  })
})
