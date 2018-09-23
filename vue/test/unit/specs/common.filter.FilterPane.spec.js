import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import Element from 'element-ui'
import Export from '@/common/filter/FilterPane'
import store from '@/store'
import * as search from '@/utils/search'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Element)
localVue.use(Vuex)

let searchGetFilterString = search.getFilterString
let searchGetFilterList = search.getFilterList

beforeAll(() => {
  search.getFilterString = jest.fn(() => 'old filters')
  search.getFilterList = jest.fn()
})
afterAll(() => {
  search.getFilterString = searchGetFilterString
  search.getFilterList = searchGetFilterList
})

describe('common/filter/FilterPane.vue', () => {
  it('should render :: Filter Pane component', () => {
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      propsData: {
        filterLimit: 1,
        filters: {}
      },
      mocks: {
        $route: { query: {} }
      }
    })
    expect(wrapper).not.toBeNull()
    expect(Export).not.toBeNull()
    expect(localVue).not.toBeNull()
    expect(store).not.toBeNull()
  })

  it('should apply filters', () => {
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    wrapper.vm.applyFilters()
    expect(search.getFilterString).toBeCalled()
    expect(wrapper.emitted().applyFilters).toBeTruthy()
  })

  it('should clear all filters', () => {
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    wrapper.vm.clearAllFilters()
    expect(wrapper.emitted().clearAllFilters).toBeTruthy()
  })

  it('should clear a filter', () => {
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    wrapper.vm.clearFilter('filter')
    expect(wrapper.emitted().clearFilter).toBeTruthy()
    expect(wrapper.emitted().clearFilter.length).toBe(1)
    expect(wrapper.emitted().clearFilter[0]).toEqual(['filter'])
  })

  it('should download', () => {
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    wrapper.vm.download('cmd')
    expect(wrapper.emitted().download).toBeTruthy()
    expect(wrapper.emitted().download.length).toBe(1)
    expect(wrapper.emitted().download[0]).toEqual(['cmd'])
  })

  it('should undo filters', () => {
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    wrapper.setData({
      oldFilters: 'filters'
    })
    let wrapperClearALlFilters = wrapper.vm.clearAllFilters
    wrapper.vm.clearAllFilters = jest.fn()
    wrapper.vm.undoFilters()
    expect(wrapper.vm.clearAllFilters).toBeCalled()
    expect(wrapper.emitted().updateFilters).toBeTruthy()
    expect(wrapper.emitted().updateFilters.length).toBe(1)
    expect(wrapper.emitted().updateFilters[0]).toEqual(['filters'])
    wrapper.vm.clearAllFilters = wrapperClearALlFilters
  })

  it('should update filters', () => {
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    wrapper.vm.updateFilters('filterString')
    expect(wrapper.emitted().updateFilters).toBeTruthy()
    expect(wrapper.emitted().updateFilters.length).toBe(1)
    expect(wrapper.emitted().updateFilters[0]).toEqual(['filterString'])
  })
})
