import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import Element from 'element-ui'
import FilterTitle from '@/common/filter/FilterTitle'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Element)
localVue.use(Vuex)

describe('common/filter/FilterTitle.vue', () => {
  it('should render app :: FilterTitle component', () => {
    const wrapper = vt.mount(FilterTitle, {
      store,
      localVue,
      propsData: {
        filtersCount: 9
      },
      mocks: {
        $route: { query: {} }
      }})
    expect(wrapper).not.toBeNull()
    expect(FilterTitle).not.toBeNull()
    expect(localVue).not.toBeNull()
    expect(store).not.toBeNull()
    const el = wrapper.find('sup')
    expect(el.text()).toBe('9')
  })
})
