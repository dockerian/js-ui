import Vue from 'vue'
import Blank from '@/components/app/Blank'

describe('Blank.vue', () => {
  it('should render Blank contents', () => {
    const Constructor = Vue.extend(Blank)
    const vm = new Constructor().$mount()
    expect(vm).not.toBeNull()
  })
})
