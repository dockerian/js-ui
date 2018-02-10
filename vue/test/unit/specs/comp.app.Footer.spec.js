import Vue from 'vue'
import Footer from '@/components/app/Footer'

describe('Footer.vue', () => {
  it('should render correct contents', () => {
    const regex = /(\d\d):(\d\d):(\d\d)/
    const Constructor = Vue.extend(Footer)
    const vm = new Constructor({propsData: {orgName: 'Dockerian'}}).$mount()
    expect(vm.$el.querySelector('#footer').textContent)
      .toContain('Dockerian')
    const results = vm._data.clockFunc().match(regex)
    expect(results[1] !== '' && results[2] !== '' && results[3] !== '')
      .toEqual(true)
    const clock = Footer.methods._tick()
    const hhmmss = clock.match(regex)
    expect(hhmmss[1] !== '' && hhmmss[2] !== '' && hhmmss[3] !== '')
      .toEqual(true)
  })
})
