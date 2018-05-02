import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import About from '@/components/appInfo/About'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)

jest.mock('@/helper/vm')

afterAll(() => {
  jest.unmock('@/helper/vm')
})

describe('appInfo/About.vue', () => {
  it('should render About contents', () => {
    let cmp = vt.mount(About, {
      store,
      localVue,
      propsData: {
      },
      mocks: {
        $route: { query: {} },
        path: ''
      }})
    expect(cmp).not.toBeNull()
    const el = cmp.find('#about h1')
    expect(el.text()).toBe('Dockerian JsUi')

    let helper = require('@/helper/vm')
    helper.copyConfig = jest.fn()
    cmp.vm.debug()
    expect(helper.copyConfig).toBeCalledWith(cmp.vm)

    let result = cmp.vm.mailto('Foo Bar<foo@bar.com>')
    expect(result).toBe('<a href="mailto:foo@bar.com">Foo Bar</a>')
  })
})
