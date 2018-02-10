import Vue from 'vue'
import App from '@/App'

describe('App.vue', () => {
  it('should render app root', () => {
    // TODO [jason]: testing App with router
    const Constructor = Vue.extend(App)
    const data = App.data()
    expect(data.orgName).toBe('Dockerian')
    expect(Constructor)
  })
})
