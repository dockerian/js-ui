import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import Footer from '@/components/Footer'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)

beforeEach(() => {
})

describe('Footer.vue', () => {
  it('should render correct contents', () => {
    const wrapper = vt.shallowMount(Footer, {store, localVue})
    const el = wrapper.find('#footer')
    expect(el.text())
      .toContain('Dockerian')
  })
})
