import Vue from 'vue'
import Footer from '@/components/Footer'

describe('Footer.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Footer)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#footer').textContent)
    .toContain('Dockerian')
    const results = vm._data.clockFunc().match(/(\d\d):(\d\d):(\d\d)/)
    expect(results[1] != '' && results[2] != '' && results[3] != '')
    .toEqual(true)
  })
})
