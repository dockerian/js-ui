// router/appMenu.js - application menu

/**
  appMenu defines all application sub menu and menu items.
  each routing item must match both the route path and name in ./router.js.
**/
const appMenu = {
  about: {
    name: 'About',
    description: 'Project information',
    route: '/about',
    type: 'MenuItem'
  },
  demo: {
    name: 'Demo',
    description: 'Demo perspectives',
    type: 'Submenu',
    menuItems: {
      domains: {
        name: 'Hello World',
        description: 'Hello World demo',
        route: '/demo/hello',
        type: 'MenuItem'
      },
      search: {
        name: 'Search',
        description: 'Federated Search',
        route: '/demo/search',
        type: 'MenuItem'
      }
    }
  },
  messages: {
    name: 'MessageBoard',
    description: 'Application alerts, messages, and notifications',
    route: '/messages',
    type: 'MenuItem'
  },
  settings: {
    name: 'Settings',
    description: 'Application preference and settings',
    route: '/settings',
    type: 'MenuItem'
  },
  xref: {
    name: 'Links',
    description: 'Mostly used links',
    route: '/links',
    type: 'MenuItem'
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

export default appMenu
