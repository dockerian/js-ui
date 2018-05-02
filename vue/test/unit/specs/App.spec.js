import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import iView from 'iview'
import store from '@/store'
import App from '@/App'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(iView)
localVue.use(Vuex)

describe('App.vue', () => {
  it('should render App contents', () => {
    const component = vt.shallow(App, {
      store,
      localVue,
      mocks: {
        $route: {
          path: 'foo/bar/path',
          query: {}
        }
      }})
    const div = component.find('#help')
    expect(div).not.toBeNull()

    component.destroy()
  })
})
