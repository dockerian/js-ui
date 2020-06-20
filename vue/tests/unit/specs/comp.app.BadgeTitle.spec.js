import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from '@vue/test-utils'
import Element from 'element-ui'
import BadgeTitle from '@/components/app/BadgeTitle'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Element)
localVue.use(Vuex)

describe('components/app/BadgeTitle.vue', () => {
  it('should render app :: BadgeTitle component', () => {
    const wrapper = vt.mount(BadgeTitle, {
      store,
      localVue,
      propsData: {
        count: 9
      },
      mocks: {
        $route: { query: {} }
      }})
    expect(wrapper).not.toBeNull()
    expect(BadgeTitle).not.toBeNull()
    expect(localVue).not.toBeNull()
    expect(store).not.toBeNull()
    const el = wrapper.find('sup')
    expect(el.text()).toBe('9')
  })
})
