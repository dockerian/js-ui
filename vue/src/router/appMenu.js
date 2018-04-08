// router/appMenu.js - application menu

import * as _const from '@/store/_constants'
import { appRoutes as routes } from '@/router/appRoutes'

// p is the reference to perspectives in router routes
const p = routes.find(e => e.path === '/p').children

/**
  appMenuMaps defines relationship between app menu item and router routes.

  Note:
  - menu item derives from a route to share properties, e.g. name, query.
  - menu item has its own `route` to map a full `path` of the mapping route.
  - only the top level menu item route is same as the route path.
**/
const appMenuMaps = {
  about: routes.find(e => e.path === '/about'),
  messages: routes.find(e => e.path === '/messages'),
  p_Demo: p.find(e => e.path === '/hello'),
  p_Search: p.find(e => e.path === '/search'),
  usage: routes.find(e => e.path === '/usage'),
  xref: routes.find(e => e.path === '/links')
}

/**
  appMenu defines all application sub menu and menu items.
  each routing item must match both the route path and name in ./router.js.
  each menu item (in both 1st or 2nd level) must have a unique key,
  and its component name must match with global registered.
**/
export const appMenu = {
  about: {
    ...appMenuMaps.about,
    description: 'About JsUi',
    route: '/about',
    type: 'MenuItem'
  },
  perspectives: {
    name: 'Perspectives',
    description: 'JsUi Perspectives',
    type: 'Submenu',
    menuItems: {
      demo: {
        ...appMenuMaps.p_Demo,
        alias: 'Hello', // overwriting 'alias' in appRoutes
        route: '/p/hello',
        component: 'v-hello',
        description: 'Hello World Demo',
        type: 'MenuItem'
      },
      search: {
        ...appMenuMaps.p_Search,
        alias: 'Search', // overwriting 'alias' in appRoutes
        allowMulti: true,
        description: 'Future Search',
        component: 'v-fsearch',
        route: '/p/search',
        type: 'MenuItem'
      }
    }
  },
  messages: {
    ...appMenuMaps.messages,
    description: 'Application alerts, messages & notifications',
    route: '/messages',
    type: 'MenuItem'
  },
  settings: {
    name: 'Settings',
    description: 'Application preference and settings',
    route: '/settings',
    type: 'MenuItem'
  },
  usage: {
    ...appMenuMaps.usage,
    alias: 'Help',
    description: 'Quick instructions and tips',
    component: 'v-usage',
    route: '/help',
    type: 'MenuItem'
  },
  xref: {
    name: 'Links',
    description: 'Mostly used links',
    route: '/links',
    type: 'MenuItem'
  }
}

// on-select event handler
export const appMenuOnSelect = (name, vm) => {
  let item = findRoute(name, appMenu)
  if (item) {
    vm.$store.commit(_const.APP_MENU_SHOWN, false)
    vm.$store.dispatch(_const.PERSPECTIVE_OPEN, item.route)
    let location = {
      name: item.name,
      path: item.route,
      query: item.query
    }
    if (vm.$store.state.navNoHistory) {
      vm.$router.replace(location)
    } else {
      vm.$router.push(location)
    }
  }
}

// findRoute looks up a route by name recursively in appMenu.
export const findRoute = (name, root) => {
  root = root || appMenu

  for (let key in root) {
    let item = root[key]
    if (item['menuItems']) {
      let result = findRoute(name, item['menuItems'])
      if (result) {
        return result
      }
    } else if (item['route'] === name) {
      return item
    }
  }
  return null
}

// menuRoute sets router by menuItem
export const menuRoute = (menuItem, router, store) => {
  let location = {
    name: menuItem.name,
    path: menuItem.route,
    query: menuItem.query
  }
  if (store.state.navNoHistory) {
    router.replace(location)
  } else {
    router.push(location)
  }
}

export default appMenu
