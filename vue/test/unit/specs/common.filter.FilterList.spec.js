import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import Element from 'element-ui'
import Export from '@/common/filter/FilterList'
import store from '@/store'
import * as search from '@/utils/search'
import * as helper from '@/helper/vm'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Element)
localVue.use(Vuex)

let helperCopyURL = helper.copyURL
let searchGetQueryString = search.getQueryString

beforeAll(() => {
  helper.copyURL = jest.fn(() => ('copied url'))
  search.getQueryString = jest.fn(() => ('query'))
})
afterAll(() => {
  helper.copyURL = helperCopyURL
  search.getQueryString = searchGetQueryString
})

describe('common/filter/FilterList.vue', () => {
  it('should render :: Filter List component', () => {
    const wrapper = vt.shallow(Export, {
      store,
      localVue,
      propsData: {
        filterChanged: true,
        filtersCount: 2,
        filterList: [],
        filters: {}
      },
      mocks: {
        $route: { query: {} }
      }})
    expect(wrapper).not.toBeNull()
    expect(Export).not.toBeNull()
    expect(localVue).not.toBeNull()
    expect(store).not.toBeNull()
  })

  it('should apply all filters', () => {
    const wrapper = vt.shallow(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    const button = wrapper.find('button.apply')
    button.trigger('click')
    expect(wrapper.emitted().applyFilters).toBeTruthy()
  })

  it('should clear all filters', () => {
    const wrapper = vt.shallow(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    const button = wrapper.find('button.clear-all')
    button.trigger('click')
    expect(wrapper.emitted().clearAllFilters).toBeTruthy()
  })
  it('should clear given filter', () => {
    const wrapper = vt.shallow(Export, {
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
  it('should copy URL', () => {
    const wrapper = vt.shallow(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    wrapper.vm.copyURL(true)
    expect(wrapper.vm.copyURL()).toBe('copied url')
  })
  it('should clear undo the filters', () => {
    const wrapper = vt.shallow(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }
    })
    const button = wrapper.find('button.undo')
    button.trigger('click')
    expect(wrapper.emitted().undoFilters).toBeTruthy()
  })
})
