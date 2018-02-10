import Vue from 'vue'
import Header from '@/components/app/Header'
import store from '@/store'

describe('Header.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Header)
    const vm = new Constructor({store}).$mount()
    expect(vm.userSignedIn).toBe(false)
    expect(vm.$el.querySelector('#header button').textContent)
      .toEqual('')
  })
})
