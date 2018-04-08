import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import MessageModal from '@/components/appInfo/MessageModal'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(Vuex)

describe('components/appInfo/MessageModal.vue', () => {
  it('should render MessageModal component', () => {
    let vm = vt.mount(MessageModal, {store, localVue})
    expect(vm).not.toBeNull()
    const el = vm.find('h2')
    expect(el.text()).toContain('Messages')
  })
})
