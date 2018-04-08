// store/_constants.js

/**
// vuex getter and mutation types
**/
// getters and mutations for perspective state
export const ACTIVE_TAB_KEY = 'ACTIVE_TAB_KEY'
export const ACTIVE_TAB_MOVE_UP = 'ACTIVE_TAB_MOVE_UP' // mutation to move tab up
export const ACTIVE_TAB_MOVE_DOWN = 'ACTIVE_TAB_MOVE_DOWN' // mutation to move tab down
export const ACTIVE_TAB_ORDER = 'ACTIVE_TAB_ORDER'
export const PERSPECTIVE_HIDE = 'PERSPECTIVE_HIDE' // mutation to close a tab
export const PERSPECTIVE_OPEN = 'PERSPECTIVE_OPEN' // mutation to open a tab
export const PERSPECTIVE_TABS = 'PERSPECTIVE_TABS'

// maximum numbers of opening perspectives, for the one with `allowMulti: true`
export const PERSPECTIVES_LIMIT = 3

// getters and mutations for app menu state
export const APP_MENU_SHOWN = 'APP_MENU_SHOWN'
export const APP_MENU_THEME = 'APP_MENU_THEME'

// getters and mutations for Element UI table style
export const EL_TABLE_STYLE = 'EL_TABLE_STYLE'
export const EXPORT_WITH_PAGINATION = 'EXPORT_WITH_PAGINATION'
export const PAGINATION_POSITION = 'PAGINATION_POSITION'

// getters and mutations for browser navigation
export const NAV_NO_HISTORY = 'NAV_NO_HISTORY'

// getters and mutations for MessageBoard
export const SHOW_APP_MESSAGES = 'SHOW_APP_MESSAGES'

// getters and mutations for clock state
export const SHOW_CLOCK_ENV = 'SHOW_CLOCK_ENV'

// getters and mutations for filter actions
export const SHOW_FILTER_ACTIONS = 'SHOW_FILTER_ACTIONS'
export const SHOW_FILTERS_2_IN_1 = 'SHOW_FILTERS_2_IN_1'

// getters and mutations for progress circle chart
export const PROGRESS_CHART = 'PROGRESS_CHART'

// getters and mutations for usage and help content
export const USAGE_AND_HELP = 'USAGE_AND_HELP'

// getters and mutations for user state
export const USER_SIGNED_IN = 'USER_SIGNED_IN'

// getters and mutations for browser window view port size
export const VIEW_PORT_SIZE = 'VIEW_PORT_SIZE'
