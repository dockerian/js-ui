// vuex state

import { buildAppTabs } from '@/router/appPerspectives'

// app states in alphabic order
const state = {
  activatedTab: 'helloWorld',
  arrangingTab: false,
  appMenuShown: false,
  appMenuTheme: 'dark',
  elTableStyle: {
    columnsFixed: false,
    expandsFixed: 'right'
  },
  envShowClock: true,
  exportWithPagination: true,
  paginationPosition: 'bottom',
  perspectives: buildAppTabs(),
  notification: {},
  navNoHistory: true,
  showFilters2in1: true,
  showFilterActions: true,
  showMessages: false,
  showProgress: true,
  viewPortSize: {
    height: 600, width: 600
  },
  usageAndHelp: '',
  userSignedIn: false
}

export default state
