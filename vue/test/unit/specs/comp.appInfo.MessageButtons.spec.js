import Vuex from 'vuex'
import iView from 'iview'
import * as vt from 'vue-test-utils'
import MessageButtons from '@/components/appInfo/MessageButtons'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(iView)
localVue.use(Vuex)

jest.mock('@/helper/vm')

afterAll(() => {
  jest.unmock('@/helper/vm')
})

describe('components/appInfo/MessageButtons.vue', () => {
  it('should render MessageButtons component', () => {
    let cmp = vt.shallow(MessageButtons, {store, localVue})
    expect(cmp).not.toBeNull()

    cmp.vm.ackAll()
    cmp.vm.clearAll()

    let helper = require('@/helper/vm')
    helper.copyMessage = jest.fn()
    cmp.vm.copyData()
    expect(helper.copyMessage).toBeCalledWith(cmp.vm, [])
  })
})
