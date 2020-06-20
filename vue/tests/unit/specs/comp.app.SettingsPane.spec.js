import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import SettingsPane from '@/components/app/SettingsPane'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)

describe('SettingsPane.vue', () => {
  it('should render SettingsPane contents', () => {
    const wrapper = vt.shallowMount(SettingsPane, {
      store,
      stubs: ['router-link', 'router-view'],
      localVue
    })
    const el = wrapper.find('h3')
    expect(el.text()).toBe('Color Theme and Appearance')

    wrapper.vm.darkTheme = false
    wrapper.vm.expanderOnRight = false
    wrapper.vm.paginationPosition = false
    wrapper.vm.progressChart = false

    wrapper.vm.darkTheme = true
    wrapper.vm.expanderOnRight = true
    wrapper.vm.paginationPosition = true
    wrapper.vm.progressChart = true
  })
})
