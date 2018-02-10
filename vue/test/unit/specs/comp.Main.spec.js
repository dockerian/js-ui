import Vue from 'vue'
import Main from '@/components/Main'

describe('Main.vue', () => {
  it('should render Main contents', () => {
    const Constructor = Vue.extend(Main)
    const vm = new Constructor().$mount()
    expect(vm).not.toBeNull()
  })
})
