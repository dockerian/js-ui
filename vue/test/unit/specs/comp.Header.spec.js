import Vue from 'vue'
import Header from '@/components/Header'

describe('Header.vue', () => {
  it('should render Header contents', () => {
    const Constructor = Vue.extend(Header)
    const vm = new Constructor().$mount()
    expect(vm).not.toBeNull()
  })
})
