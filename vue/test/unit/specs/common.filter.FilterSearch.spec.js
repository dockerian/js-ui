import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import Element from 'element-ui'
import Export from '@/common/filter/FilterSearch'
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

describe('common/filter/FilterSearch.vue', () => {
  it('should render :: Filter Search component', () => {
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      propsData: {
        filterLimit: 1,
        filtersCount: 1
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
    expect(wrapper.emitted().applyFilters).toBeTruthy()
  })
  it('should download', () => {
    const wrapper = vt.shallow(Export, {
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

  it('should commit', () => {
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
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
    const wrapper = vt.mount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    wrapper.setData({
      searchInput: 'search'
    })
    wrapper.vm.onCommit()
    expect(wrapper.emitted().updateFilters).toBeTruthy()
    expect(wrapper.emitted().updateFilters.length).toBe(1)
    expect(wrapper.emitted().updateFilters[0]).toEqual(['search'])
  })
})
