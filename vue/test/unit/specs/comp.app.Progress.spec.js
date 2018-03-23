import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import iView from 'iview'
import Progress from '@/components/app/Progress'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(iView)
localVue.use(Vuex)

describe('app/Progress.vue', () => {
  it('should render Progress contents', () => {
    const wrapper = vt.shallow(Progress, {store, localVue})
    const div = wrapper.find('#progress')
    expect(div).not.toBeNull()
  })
})
