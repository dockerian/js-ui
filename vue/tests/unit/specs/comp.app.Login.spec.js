import Vue from 'vue'
import Login from '@/components/app/Login'

describe('app/Login.vue', () => {
  it('should render Login contents', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm).not.toBeNull()
  })
})
