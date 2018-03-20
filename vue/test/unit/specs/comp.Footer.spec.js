import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import Footer from '@/components/Footer'
import store from '@/store'

const localVue = vt.createLocalVue()
localVue.use(Vuex)

beforeEach(() => {
})

describe('Footer.vue', () => {
  it('should render correct contents', () => {
    const wrapper = vt.shallow(Footer, {store, localVue})
    const el = wrapper.find('#footer')
    expect(el.text())
      .toContain('Dockerian')
  })
})
