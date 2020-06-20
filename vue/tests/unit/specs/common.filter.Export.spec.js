import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import Element from 'element-ui'
import Export from '@/common/filter/Export'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Element)
localVue.use(Vuex)

describe('common/filter/Export.vue', () => {
  it('should render :: Export component', () => {
    const wrapper = vt.shallowMount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }})
    expect(wrapper).not.toBeNull()
    expect(Export).not.toBeNull()
    expect(localVue).not.toBeNull()
    expect(store).not.toBeNull()
  })

  it('should download', () => {
    const wrapper = vt.shallowMount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }})
    let mouse = new MouseEvent('click')
    wrapper.vm.download(mouse)
    expect(wrapper.emitted().download).toBeTruthy()
    expect(wrapper.emitted().download.length).toBe(1)
    expect(wrapper.emitted().download[0]).toEqual(['clip.json'])
  })
  it('should download other', () => {
    const wrapper = vt.shallowMount(Export, {
      store,
      localVue,
      mocks: {
        $route: { query: {} }
      }})
    wrapper.vm.download('other')
    expect(wrapper.emitted().download).toBeTruthy()
    expect(wrapper.emitted().download.length).toBe(1)
    expect(wrapper.emitted().download[0]).toEqual(['other'])
  })
})
