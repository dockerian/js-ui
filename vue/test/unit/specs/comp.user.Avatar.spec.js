import Vue from 'vue'
import Vuex from 'vuex'
import iView from 'iview'
import * as vt from '@vue/test-utils'
import Avatar from '@/components/user/Avatar'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(iView)
localVue.use(Vuex)

describe('user/Avatar.vue', () => {
  it('should render Avatar contents', () => {
    let vm = vt.mount(Avatar, {
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
