import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import EdgeSlider from '@/components/app/EdgeSlider'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(Vuex)

describe('app/EdgeSlider.vue', () => {
  it('should render EdgeSlider contents', () => {
    const component = vt.shallow(EdgeSlider, {
      store,
      localVue,
      mocks: {
        $route: {}
      }})
    const el = component.find('h1')
    expect(el.text()).toBe('Settings')

    component.vm.setTimer()
    component.vm.hide()
    component.vm.show()
  })
})
