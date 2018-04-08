import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import MessageBoard from '@/components/appInfo/MessageBoard'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(Vuex)

describe('components/appInfo/MessageBoard.vue', () => {
  it('should render MessageBoard component', () => {
    let vm = vt.mount(MessageBoard, {store, localVue})
    expect(vm).not.toBeNull()
  })
})
