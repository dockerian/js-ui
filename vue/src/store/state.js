// vuex state

import { buildAppTabs } from '@/router/appPerspectives'

// app states in alphabic order
const state = {
  activatedTab: 'domains',
  arrangingTab: false,
  appMenuShown: false,
  appMenuTheme: 'dark',
  envShowClock: true,
  perspectives: buildAppTabs(),
  notification: {},
  navNoHistory: true,
  showProgress: true,
  userSignedIn: false
}

export default state
