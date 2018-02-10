import Vue from 'vue'
import Menu from '@/components/app/Menu'

describe('Menu.vue', () => {
  it('should render Menu contents', () => {
    const Constructor = Vue.extend(Menu)
    const vm = new Constructor().$mount()
    expect(vm).not.toBeNull()
  })
})
