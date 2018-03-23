import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import Main from '@/components/Main'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(Vuex)

describe('Main.vue', () => {
  it('should render Main contents', () => {
    let vm = vt.mount(Main, {store, localVue})
    expect(vm).not.toBeNull()
  })
})
