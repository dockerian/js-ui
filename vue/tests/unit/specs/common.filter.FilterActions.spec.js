import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import Element from 'element-ui'
import Export from '@/common/filter/FilterActions'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Element)
localVue.use(Vuex)

describe('common/filter/FilterActions.vue', () => {
  const wrapper = vt.mount(Export, {
    store,
    localVue,
    propsData: {
      filtersCount: 1
    },
    mocks: {
      $route: { query: {} }
    }})

  it('should render :: Filter Actions component', () => {
    expect(wrapper).not.toBeNull()
    expect(Export).not.toBeNull()
    expect(localVue).not.toBeNull()
    expect(store).not.toBeNull()
  })

  it('should apply all filters', () => {
    const button = wrapper.find('button.apply')
    button.trigger('click')
    expect(wrapper.emitted().applyFilters).toBeTruthy()
  })

  it('should clear all filters', () => {
    const button = wrapper.find('button.clear-all')
    button.trigger('click')
    expect(wrapper.emitted().clearAllFilters).toBeTruthy()
  })
})
