import Vue from 'vue'
import WS from '@/components/app/WS'

describe('WS.vue', () => {
  it('should render WS contents', () => {
    const Constructor = Vue.extend(WS)
    const vm = new Constructor().$mount()
    expect(vm).not.toBeNull()
  })
})
