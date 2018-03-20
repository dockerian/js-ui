import Vue from 'vue'
import Mailto from '@/components/app/Mailto'

describe('app/Mailto.vue', () => {
  it('should render Mailto contents', () => {
    const Constructor = Vue.extend(Mailto)
    const vm = new Constructor({
      propsData: {
        contact: 'Jason Zhu <jzhu@infoblox.com>'
      }
    }).$mount()
    expect(vm).not.toBeNull()
  })
})
