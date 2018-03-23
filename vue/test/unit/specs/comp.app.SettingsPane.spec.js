import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import SettingsPane from '@/components/app/SettingsPane'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(Vuex)

describe('SettingsPane.vue', () => {
  it('should render SettingsPane contents', () => {
    const wrapper = vt.shallow(SettingsPane, {store, localVue})
    const el = wrapper.find('h3')
    expect(el.text()).toBe('Color Theme and Appearance')
  })
})
