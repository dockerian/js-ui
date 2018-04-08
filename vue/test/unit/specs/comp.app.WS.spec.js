import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import WS from '@/components/app/WS'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(Vuex)

describe('app/WS.vue', () => {
  it('should render Workspace contents', () => {
    let cmp = vt.mount(WS, {
      store,
      localVue,
      mocks: {
        $route: {
          $route: { query: {} },
          path: ''
        }
      }})
    expect(cmp.vm).not.toBeNull()

    cmp.vm.addTab()
    cmp.vm.closeTab(0)
    cmp.vm.moveTabBackward()
    cmp.vm.moveTabForward()
  })
})
