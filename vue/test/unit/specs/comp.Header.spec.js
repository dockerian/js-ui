import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import Element from 'element-ui'
import Header from '@/components/Header'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Element)
localVue.use(Vuex)

describe('components/Header.vue', () => {
  it('should render Header component', () => {
    const wrapper = vt.mount(Header, {
      store,
      localVue,
      propsData: {
      },
      mocks: {
        $route: {
          query: {},
          path: ''
        }
      }})
    expect(wrapper).not.toBeNull()
    expect(Header).not.toBeNull()
    expect(localVue).not.toBeNull()
    expect(store).not.toBeNull()
  })
})
