import Vuex from 'vuex'
import iView from 'iview'
import * as vt from 'vue-test-utils'
import AppMenu from '@/components/app/AppMenu'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(Vuex)
localVue.use(iView)

describe('app/AppMenu.vue', () => {
  it('should render AppMenu contents', () => {
    // TODO: mock $router in order to trigger onSelect method in the vm.
    // Currently there is an error on "$router" which "has only a getter".
    // See: https://github.com/vuejs/vue-router/issues/1768
    let vm = vt.mount(AppMenu, {store, localVue})
    expect(vm).not.toBeNull()

    const el = vm.find('div[class="ivu-tooltip-rel"]')
    expect(el.text()).toBe('About')
  })
})
