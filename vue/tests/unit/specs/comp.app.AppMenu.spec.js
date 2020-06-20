import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import iView from 'iview'
import * as vt from '@vue/test-utils'
import AppMenu from '@/components/app/AppMenu'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(iView)

describe('AppMenu.vue', () => {
  it('should render AppMenu contents', () => {
    // TODO [jzhu]: mock $router in order to trigger onSelect method in the vm.
    // Currently there is an error on "$router" which "has only a getter".
    // See: https://github.com/vuejs/vue-router/issues/1768
    let vm = vt.mount(AppMenu, {store, localVue})
    expect(vm).not.toBeNull()

    const el = vm.find('div[class="ivu-tooltip-rel"]')
    expect(el.text()).toBe('About')
  })
})
