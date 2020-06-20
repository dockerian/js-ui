import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import Main from '@/components/Main'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})

describe('Main.vue', () => {
  it('should render Main contents', () => {
    let vm = vt.mount(Main, {
      store,
      localVue,
      stubs: ['router-link', 'router-view'],
      mocks: {
        $route: {
          $route: { query: {} },
          path: ''
        }
      }})
    expect(vm).not.toBeNull()
  })
})
