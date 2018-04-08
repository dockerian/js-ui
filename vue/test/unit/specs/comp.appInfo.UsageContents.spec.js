import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import iView from 'iview'
import UsageContents from '@/components/appInfo/UsageContents'
import store from '@/store'

require('./api.docs') // mocking docs api calls

const localVue = vt.createLocalVue()
localVue.use(iView)
localVue.use(Vuex)

describe('appInfo/UsageContents.vue', () => {
  it('should render UsageContents contents', () => {
    const wrapper = vt.shallow(UsageContents, {
      store,
      localVue,
      mocks: {
        $route: {}
      }})
    const el = wrapper.find('.footer-notes')
    expect(el.text()).toContain('Powered by')
  })
})
