import Vue from 'vue'
import iView from 'iview'
import App from '@/App'

Vue.use(iView)

describe('App.vue', () => {
  it('should render app root', () => {
    // TODO [jzhu]: testing App with router
    const Constructor = Vue.extend(App)
    expect(Constructor)
  })
})
