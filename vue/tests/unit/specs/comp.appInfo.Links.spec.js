import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import Links from '@/components/appInfo/Links'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)

describe('appInfo/Links.vue', () => {
  it('should render Links contents', () => {
    const vm = vt.mount(Links, {store, localVue})
    expect(vm.find('#links h1').text())
      .toMatch(/Vue\.js 2\.\d+\.\d+/)
  })
})
