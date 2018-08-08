import Vue from 'vue'
import Vuex from 'vuex'
import * as vt from 'vue-test-utils'
import flushPromises from 'flush-promises'

import * as _constApp from '@/store/_constants'
import * as helper from '@/helper/userVm'
import SignIn from '@/components/user/SignIn'
import store from '@/store'

jest.mock('@/helper/userVm')

afterAll(() => {
  jest.unmock('@/helper/userVm')
})

const localVue = vt.createLocalVue()
localVue.prototype.$eventBus = new Vue() // Global event bus
localVue.use(Vuex)

describe('user/SignIn.vue', () => {
  it('should render User SignIn form', () => {
    let el = vt.mount(SignIn, {
      store,
      localVue,
      propsData: {
      },
      mocks: {
        $route: { query: {} },
        path: ''
      }})
    expect(el).not.toBeNull()
  })

  it('onCheck should trim input values', () => {
    let el = vt.mount(SignIn, {
      store,
      localVue,
      mocks: {
        $route: { query: {} },
        path: ''
      }})
    el.setData({
      signInUser: {
        alias: '     foobar   ',
        fullName: '  Foo Bar  '
      }
    })

    el.vm.onCheck()
    expect(el.vm.signInUser.alias).toBe('foobar')
    expect(el.vm.signInUser.fullName).toBe('Foo Bar')
  })

  it('async signIn on button clicked', async () => {
    let el = vt.mount(SignIn, {
      store,
      localVue,
      mocks: {
        $route: { query: {} },
        path: ''
      }})

    store.commit(`${_constApp.USER_SIGNED_IN}`, true)

    el.setData({
      signInUser: {
        alias: 'foobar',
        fullName: 'Foo Bar'
      }
    })
    helper.signIn = jest.fn((vm, s) => false)
    await flushPromises()
    el.find('#signIn').trigger('click')
    await flushPromises()
    expect(el.vm.signInOkay).toBe(false)
  })
})
