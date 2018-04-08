<template>
  <div class="settings-pane">
    <div id="color-theme" class="setting-subject">
      <h3>Color Theme and Appearance</h3>
      <div class="setting-section">
        <Checkbox
          class="setting-checkbox"
          v-model="darkTheme"
          v-bind:value="darkTheme"
          size="large">
          &nbsp; Use dark theme for App menu
        </Checkbox>
        <br/>
        <Checkbox
          class="setting-checkbox"
          v-model="expanderOnRight"
          v-bind:value="expanderOnRight"
          size="large">
          &nbsp; Details expander on the right (reload required)
        </Checkbox>
        <br/>
        <Checkbox
          class="setting-checkbox"
          v-model="paginationPosition"
          v-bind:value="paginationPosition"
          size="large">
          &nbsp; Pagination position at the bottom of the data table
        </Checkbox>
        <br/>
        <Checkbox
          class="setting-checkbox"
          v-model="exportWithPagination"
          v-bind:value="exportWithPagination"
          size="large">
          &nbsp; Show Export button next to pagination
        </Checkbox>
        <br/>
        <Checkbox
          class="setting-checkbox"
          v-model="showFilterActions"
          v-bind:value="showFilterActions"
          size="large">
          &nbsp; Show both "Clear All" and "Apply" buttons next to Filters
        </Checkbox>
        <br/>
        <Checkbox
          class="setting-checkbox"
          v-model="showFilters2in1"
          v-bind:value="showFilters2in1"
          size="large">
          &nbsp; Show Filter Pane with inline Search
        </Checkbox>
        <br/>
        <Checkbox
          class="setting-checkbox"
          v-model="showClock"
          v-bind:value="showClock"
          size="large">
          &nbsp; Show clock at footer
        </Checkbox>
      </div>
    </div>
    <div id="user-actions" class="setting-subject">
      <h3>User Actions</h3>
      <div class="setting-section">
        <Checkbox
          class="setting-checkbox"
          v-model="enableActiveTabMover"
          size="large">
          &nbsp; Allow re-arranging perspective tabs
        </Checkbox>
        <Poptip trigger="hover" placement="bottom-start">
          (with some issue)
          <Icon color="gold" type="help-circled"></Icon>
          <div slot="content">
            <div v-html="tabsOrderTip"></div>
            <div>See
              <router-link to="p" replace>Perspectives</router-link>.
            </div>
          </div>
        </Poptip>
        <br/>
      </div>
    </div>
    <div id="system" class="setting-subject">
      <h3>System</h3>
      <div class="setting-section">
        <Checkbox
          class="setting-checkbox"
          v-model="noHistory"
          size="large">
          &nbsp; SPA mode without browser history
        </Checkbox>
        <br/>
        <Checkbox
          class="setting-checkbox"
          v-if="env !== 'prod'"
          v-model="progressChart"
          size="large">
          &nbsp; Show next release progress
        </Checkbox>
        <Poptip trigger="hover" placement="bottom-start"
          v-if="env !== 'prod'"
          >
          <Icon color="gold" type="help-circled"></Icon>
          <div slot="content">
            <p>
              This is not shown in production
            </p>
            <div v-if="progressChart">See
              <router-link to="usage" replace>Usage</router-link> page
            </div>
          </div>
        </Poptip>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import { messages } from '@/helper/appMessages'
import * as _const from '@/store/_constants'
import * as helper from '@/helper/settings'
import config from '@/config'

Vue.use(iView)

const tabsOrderTip = messages.knownIssues.tabsOrder.replace(/\n\s+/g, '<br/>')

export default {
  name: 'SettingsPane',
  components: {
  },
  props: {
  },
  data () {
    return {
      env: config.settings.env,
      tabsOrderTip
    }
  },
  computed: {
    darkTheme: {
      get: function () {
        let themeName = this.$store.getters[_const.APP_MENU_THEME]
        return themeName === 'dark'
      },
      set: function (value) {
        let themeName = value ? 'dark' : 'light'
        this.$store.commit(_const.APP_MENU_THEME, themeName)
      }
    },
    expanderOnRight: {
      get: function () {
        let style = this.$store.state.elTableStyle
        return style.expandsFixed === 'right'
      },
      set: function (value) {
        let sider = value ? 'right' : 'left'
        let style = {
          ...this.$store.state.elTableStyle,
          expandsFixed: sider
        }
        // console.log(JSON.stringify(style, null, 2))
        this.$store.commit(_const.EL_TABLE_STYLE, style)
      }
    },
    paginationPosition: {
      get: function () {
        let pos = this.$store.state.paginationPosition
        return pos === 'bottom'
      },
      set: function (value) {
        let pos = value ? 'bottom' : 'top'
        this.$store.commit(_const.PAGINATION_POSITION, pos)
      }
    },
    progressChart: {
      get: function () {
        return this.$store.state.showProgress && this.env !== 'prod'
      },
      set: function (value) {
        this.$store.commit(_const.PROGRESS_CHART, value)
      }
    }
  },
  methods: {
  },
  beforeCreate: function () {
    let computed = this.$options.computed || {}
    this.$options.computed = {
      ...helper.mapFlags(this),
      ...computed
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.settings-pane {
  /*
  // NOTE: DEBUG only
  border: 1px dotted gold;
  */
  display: flex;
  flex-flow: row wrap; /* flex-direction: row; flex-wrap: nowrap; */
  justify-content: flex-start;
  align-items: stretch;
  padding: 5px 5px 0px 5px;
  margin: 10pt 5px 5pt 0pt; height: 100%; width: 99%;
  overflow-y: scroll;
}
.setting-checkbox {
  padding: 2px 0px 5px 0px;
}
.setting-section {
  display: inline-block;
  font-size: small; line-height: 150%;
  padding-bottom: 7px;
}
.setting-subject {
  /*
  // NOTE: DEBUG only
  border: 1px dotted green;
  */
  border-radius: 3pt;
  border-style: solid;
  border-color: #EEEEEE;
  border-width: 0px 2pt 2pt 0;
  display: inline-block; vertical-align: top;
  max-width: 50%; min-width: 275px;
  margin: 0pt 20pt 5pt 0pt;
}
h2, h3 {
  color: dimgray;
  line-height: 120%;
  padding: 5pt 0pt 5pt 0pt;
}

</style>
