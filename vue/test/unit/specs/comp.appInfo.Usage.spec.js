import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import iView from 'iview'
import Usage from '@/components/appInfo/Usage'
import store from '@/store'

require('./api.docs') // mocking docs api calls

const localVue = vt.createLocalVue()
localVue.use(iView)
localVue.use(Vuex)

describe('appInfo/Usage.vue', () => {
  it('should render Usage contents', () => {
    const wrapper = vt.shallow(Usage, {
      store,
      localVue,
      mocks: {
        $route: {}
      }})
    const div = wrapper.find('#help')
    expect(div).not.toBeNull()

    wrapper.vm.showHelp()
    wrapper.vm.scrollTo()
  })
})
