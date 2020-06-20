import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import Blank from '@/components/app/Blank'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)

describe('app/Blank.vue', () => {
  it('should render Blank contents', () => {
    let vm = vt.mount(Blank, {
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
