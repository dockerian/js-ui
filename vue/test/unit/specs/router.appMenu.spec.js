// test/unit/specs/rooter.appMenu.spec - testing router/appMenu

import appMenu, { findRoute } from '@/router/appMenu'

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
        route: '/demo/hello',
        expected: {
          name: 'Hello World',
          description: 'Hello World demo',
          route: '/demo/hello',
          type: 'MenuItem'
        }
      }
    ]

    for (let test of tests) {
      let result = findRoute(test.route, appMenu)
      expect(result).toEqual(test.expected)
    }
  })
})
