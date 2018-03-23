import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import EdgeSlider from '@/components/app/EdgeSlider'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(Vuex)

describe('app/EdgeSlider.vue', () => {
  it('should render EdgeSlider contents', () => {
    const wrapper = vt.shallow(EdgeSlider, {
      store,
      localVue,
      mocks: {
        $route: {}
      }})
    const el = wrapper.find('h1')
    expect(el.text()).toBe('Settings')
  })
})
