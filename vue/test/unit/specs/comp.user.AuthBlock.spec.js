import Vue from 'vue'
import Vuex from 'vuex'
import iView from 'iview'
import * as vt from 'vue-test-utils'
import AuthBlock from '@/components/user/AuthBlock'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(iView)
localVue.use(Vuex)

describe('user/AuthBlock.vue', () => {
  it('should render AuthBlock contents', () => {
    let vm = vt.mount(AuthBlock, {
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
