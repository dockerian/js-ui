import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import iView from 'iview'
import Progress from '@/components/app/Progress'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(iView)
localVue.use(Vuex)

describe('app/Progress.vue', () => {
  it('should render Progress contents', () => {
    const component = vt.shallow(Progress, {store, localVue})
    const div = component.find('#progress')
    expect(div).not.toBeNull()

    component.vm.onWindowResize({
      currentTarget: {
        innerHeight: 600,
        innerWidth: 800
      }
    })

    component.vm.progressFill()
    component.vm._begin()
  })
})
