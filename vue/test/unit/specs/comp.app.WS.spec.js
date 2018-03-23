import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import WS from '@/components/app/WS'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(Vuex)

describe('app/WS.vue', () => {
  it('should render Workspace contents', () => {
    let vm = vt.mount(WS, {store, localVue})
    expect(vm).not.toBeNull()
  })
})
