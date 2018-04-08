// test/unit/specs/helper.settings.spec.js

import * as _const from '@/store/_constants'
import * as helper from '@/helper/settings'

describe('helper/settings', () => {
  it(`helper/settings :: mapFlags`, () => {
    let mockedVm = {
      $store: {
        getters: {
          [_const.ACTIVE_TAB_ORDER]: (state) => { return _const.ACTIVE_TAB_ORDER },
          [_const.EXPORT_WITH_PAGINATION]: (state) => { return _const.EXPORT_WITH_PAGINATION },
          [_const.NAV_NO_HISTORY]: (state) => { return _const.NAV_NO_HISTORY },
          [_const.SHOW_FILTER_ACTIONS]: (state) => { return _const.SHOW_FILTER_ACTIONS },
          [_const.SHOW_CLOCK_ENV]: (state) => { return _const.SHOW_CLOCK_ENV }
        },
        commit: function (name, v) {
          console.log('commit', name, v)
        }
      }
    }
    let result = helper.mapFlags(mockedVm)
    for (let key in result) {
      expect(result[key]).not.toBeNull()
      result[key] = ''
    }
  })
})
