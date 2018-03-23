import Vue from 'vue'
import About from '@/components/app/About'

describe('app/About.vue', () => {
  it('should render About contents', () => {
    const Constructor = Vue.extend(About)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#about h1').textContent)
      .toEqual('Dockerian JsUi')
  })
})