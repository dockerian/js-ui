import Vue from 'vue'
import Search from '@/components/demo/Search'

describe('demo/Search.vue', () => {
  it('should render Search contents', () => {
    const Constructor = Vue.extend(Search)
    const vm = new Constructor().$mount()
    expect(vm).not.toBeNull()
  })
})
