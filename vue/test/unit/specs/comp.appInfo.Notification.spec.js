import Vuex from 'vuex'
import iView from 'iview'
import * as vt from 'vue-test-utils'
import Notification from '@/components/appInfo/Notification'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(iView)
localVue.use(Vuex)

describe('components/appInfo/Notification.vue', () => {
  it('should render appInfo :: Notification component', () => {
    const component = vt.shallow(Notification, {
      store,
      localVue,
      propsData: {
        position: 'header'
      },
      mocks: {
        $route: { query: {} }
      }})
    expect(component).not.toBeNull()
    expect(Notification).not.toBeNull()
    expect(localVue).not.toBeNull()
    expect(store).not.toBeNull()

    expect(component.vm.btnClass).toBe('btn-ellipsis')

    component.vm.openMessages()
  })
})
