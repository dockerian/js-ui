import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import Element from 'element-ui'
import Export from '@/common/filter/FilterInline'
import FilterList from '@/common/filter/FilterList'
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
  search.getFilterList = jest.fn(() => [])
})
afterAll(() => {
  search.getFilterString = searchGetFilterString
  search.getFilterList = searchGetFilterList
})

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})

describe('common/filter/FilterInline.vue', () => {
  const stubs = {
    FilterList
  }
  const options = {
    store,
    localVue,
    stubs,
    propsData: {
      filters: {},
      filterLimit: 3
    },
    mocks: {
      $route: { query: {} }
    }
  }

  it('should render :: Filter Inline component', () => {
    const wrapper = vt.mount(Export, options)
    expect(wrapper).not.toBeNull()
    expect(Export).not.toBeNull()
    expect(localVue).not.toBeNull()
    expect(store).not.toBeNull()
  })

  it('should apply filters', () => {
    const wrapper = vt.mount(Export, options)
    wrapper.vm.applyFilters()
    expect(wrapper.emitted().applyFilters).toBeTruthy()
  })

  it('should clear all filters', () => {
    const wrapper = vt.mount(Export, options)
    wrapper.vm.clearAllFilters()
    expect(wrapper.emitted().clearAllFilters).toBeTruthy()
  })

  it('should clear a filter', () => {
    const wrapper = vt.mount(Export, options)
    wrapper.vm.clearFilter('filter')
    expect(wrapper.emitted().clearFilter).toBeTruthy()
    expect(wrapper.emitted().clearFilter[0]).toEqual(['filter'])
  })

  it('should commit', () => {
    const wrapper = vt.mount(Export, options)
    wrapper.setData({
      searchInput: ''
    })
    let wrapperApplyFilters = wrapper.vm.applyFilters
    wrapper.vm.applyFilters = jest.fn()
    wrapper.vm.onCommit()
    expect(wrapper.vm.applyFilters).toBeCalled()
    wrapper.vm.applyFilters = wrapperApplyFilters
  })

  it('should commit', () => {
    const wrapper = vt.mount(Export, options)
    wrapper.setData({
      searchInput: 'search'
    })
    wrapper.vm.onCommit()
    expect(wrapper.emitted().updateFilters).toBeTruthy()
    expect(wrapper.emitted().updateFilters.length).toBe(1)
    expect(wrapper.emitted().updateFilters[0]).toEqual(['search'])
  })

  it('should undo filters', () => {
    const wrapper = vt.mount(Export, options)
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
})
