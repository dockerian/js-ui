import Vue from 'vue'
import Links from '@/components/Links'

describe('Links.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Links)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('Essential Links')
  })
})
