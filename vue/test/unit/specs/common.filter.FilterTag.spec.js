import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import Element from 'element-ui'
import Export from '@/common/filter/FilterTag'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Element)
localVue.use(Vuex)

describe('common/filter/FilterTag.vue', () => {
  it('should render :: Filter Tag component', () => {
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      propsData: {
        filterName: 'filter',
        filterValue: 'indicator'
      },
      mocks: {
        $route: { query: {} }
      }})
    expect(wrapper).not.toBeNull()
    expect(Export).not.toBeNull()
    expect(localVue).not.toBeNull()
    expect(store).not.toBeNull()
  })
  it('should clear filter', () => {
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    let event = new Event('click')
    wrapper.vm.clearFilter(event, 'event_name')
    expect(wrapper.emitted().clearFilter).toBeTruthy()
  })
})
