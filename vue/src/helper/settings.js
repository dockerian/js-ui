// helper/settings.js - settings pane view model

import * as _const from '@/store/_constants'

const flags = {
  enableActiveTabMover: _const.ACTIVE_TAB_ORDER,
  exportWithPagination: _const.EXPORT_WITH_PAGINATION,
  noHistory: _const.NAV_NO_HISTORY,
  showFilterActions: _const.SHOW_FILTER_ACTIONS,
  showFilters2in1: _const.SHOW_FILTERS_2_IN_1,
  showClock: _const.SHOW_CLOCK_ENV
}

export const mapFlags = (vm) => {
  return Object.keys(flags).reduce(function (props, key) {
    const computedProp = {
      get () {
        return vm.$store.getters[flags[key]]
      },
      set (value) {
        vm.$store.commit(flags[key], value)
      }
    }
    // console.log('setting:', key, JSON.stringify(computedProp, null, 2))
    props[key] = computedProp
    return props
  }, {})
}
