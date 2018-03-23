<template>
  <div class="settings-pane">
    <div id="color-theme" class="setting-subject">
      <h3>Color Theme and Appearance</h3>
      <div class="setting-section">
        <Checkbox
          v-model="darkTheme"
          v-bind:value="darkTheme"
          size="large">
          &nbsp; Use dark theme for App menu
        </Checkbox>
        <br/>
        <Checkbox
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
          v-model="noHistory"
          size="large">
          &nbsp; SPA mode without browser history
        </Checkbox>
        <br/>
        <Checkbox
          v-model="progressChart"
          size="large">
          &nbsp; Show next release progress
        </Checkbox>
        <Poptip trigger="hover" placement="bottom-start">
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
import { messages } from '@/router/appMessages'
import * as _const from '@/store/_constants'
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
        let themeName = this.$store.state.appMenuTheme
        return themeName === 'dark'
      },
      set: function (value) {
        let themeName = value ? 'dark' : 'light'
        this.$store.commit(_const.APP_MENU_THEME, themeName)
      }
    },
    enableActiveTabMover: {
      get: function () {
        return this.$store.state.arrangingTab
      },
      set: function (value) {
        this.$store.commit(_const.ACTIVE_TAB_ORDER, value)
      }
    },
    noHistory: {
      get: function () {
        return this.$store.state.navNoHistory
      },
      set: function (value) {
        this.$store.commit(_const.NAV_NO_HISTORY, value)
      }
    },
    progressChart: {
      get: function () {
        return this.$store.state.showProgress && this.env !== 'prod'
      },
      set: function (value) {
        this.$store.commit(_const.PROGRESS_CHART, value)
      }
    },
    showClock: {
      get: function () {
        return this.$store.state.envShowClock
      },
      set: function (value) {
        this.$store.commit(_const.SHOW_CLOCK_ENV, value)
      }
    }
  },
  methods: {
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
.setting-section {
  display: inline-block;
  font-size: small;
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
