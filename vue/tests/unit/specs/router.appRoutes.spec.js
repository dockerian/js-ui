// tests/unit/specs/rooter.appRoutes - testing router/appRoutes

import { appRoutes } from '@/router/appRoutes'

describe('router/appRoutes', () => {
  it(`router/appRoutes :: import`, () => {
    for (let route of appRoutes) {
      if (route.children) {
        for (let child of route.children) {
          if (child.component) {
            child.component()
          }
        }
      } else if (route.component) {
        route.component()
      }
    }
  })
})
