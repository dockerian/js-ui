// test/unit/specs/router.appMenu.spec - testing router/appMenu

import * as _const from '@/store/_constants'
import * as appRoute from '@/router/appRoutes.js'
import appMenu, { appMenuOnSelect, findRoute, menuRoute } from '@/router/appMenu'
import router from '@/router'
import store from '@/store'

describe('router/appMenu', () => {
  it(`router/appMenu :: appMenuOnSelect`, () => {
    let path = {}
    let vm = {
      $router: {
        replace: function (location) {
          path.replaced = location
        },
        push: function (location) {
          path.pushed = location
        }
      },
      $store: {
        commit: function (name, v) {
        },
        dispatch: function (name, v) {
        },
        state: {
          navNoHistory: true
        }
      }
    }
    let tests = [
      {
        name: '', expected: {}
      },
      {
        name: '/links',
        noHistory: false,
        expected: {
          replaced: { name: 'Links', path: '/links' }
        }
      },
      {
        name: '/links',
        noHistory: true,
        expected: {
          pushed: { name: 'Links', path: '/links' }
        }
      }
    ]
    for (let test of tests) {
      path = {}
      vm.$store.state.navNoHistory = test.noHistory
      appMenuOnSelect(test.name, vm)
      console.log(JSON.stringify(path))
    }
  })

  it(`router/appMenu :: findRoute`, () => {
    let tests = [
      {
        route: '/links',
        expected: {
          name: 'Links',
          description: 'Mostly used links',
          route: '/links',
          type: 'MenuItem'
        }
      },
      {
        route: '/p/hello',
        expected: {
          alias: 'Hello',
          path: '/hello',
          query: {
            lang: 'en'
          },
          component: 'v-hello',
          components: { perspective: appRoute.HelloWorld },
          name: 'Hello World',
          description: 'Hello World Demo',
          meta: { bypassAuth: true },
          route: '/p/hello',
          type: 'MenuItem'
        }
      }
    ]

    for (let test of tests) {
      let result = findRoute(test.route, appMenu)
      expect(result).toEqual(test.expected)
    }
  })

  it(`router/appMenu :: menuRoute`, () => {
    let tests = [
      {
        navNoHistory: false
      },
      {
        navNoHistory: true
      }
    ]
    // console.log(JSON.stringify(store.state, null, 2))
    for (let test of tests) {
      store.commit(_const.NAV_NO_HISTORY, test.navNoHistory)
      menuRoute(appMenu.about, router, store)
    }
  })
})
