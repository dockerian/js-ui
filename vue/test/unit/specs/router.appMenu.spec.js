// test/unit/specs/rooter.appMenu.spec - testing router/appMenu

import * as _const from '@/store/_constants'
import * as appRoute from '@/router/appRoutes.js'
import appMenu, { findRoute, menuRoute } from '@/router/appMenu'
import router from '@/router'
import store from '@/store'

describe('router/appMenu', () => {
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
