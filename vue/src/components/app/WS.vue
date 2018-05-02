<template>
  <div id="tabs-div">
    <Tabs id="tabs"
      type="card" closable
      @on-tab-remove="closeTab"
      v-model="selectedTab">
      <TabPane v-for="(tab, index) in appTabs"
        v-bind:key="index"
        v-bind:icon="getIcon(tab.name)"
        v-bind:label="tab.title"
        v-bind:name="tab.key"
        v-bind:to="tab.route" router
        v-if="tab.visible">
        <router-view class="perspective" name="perspective" />
        <!--
        <component v-bind:is="tab.component">
        </component>
        -->
      </TabPane>
      <Button type="text" icon="plus" shape="circle" size="small" slot="extra"
        v-bind:disabled="!allowMulti"
        v-on:click="addTab">
      </Button>
      <ButtonGroup class="extra" shape="circle" slot="extra"
        v-if="activeTabOrder">
        <!---->
        <Button type="text" icon="arrow-swap" size="small"
          @click="moveTabBackward">
        </Button>
        <!---->
        <!--
        <Button type="ghost" icon="arrow-left-b" size="small"
          @click="moveTabBackward">
        </Button>
        <Button type="ghost" icon="arrow-right-b" size="small"
          @click="moveTabForward">
        </Button>
        -->
      </ButtonGroup>
      <!---->
        <Poptip v-else trigger="hover" placement="left-start" class="extra" slot="extra">
          <Icon color="gold" type="help-circled" size="17" class="extra-icon"></Icon>
          <div class="align-right" slot="content">
            <div v-html="tabsOrderTip"></div>
            <div>See
              <router-link to="settings" replace>Settings</router-link>
              |
              <router-link to="usage" replace>Usage</router-link>.
            </div>
          </div>
        </Poptip>
      <!---->
    </Tabs>
    <!--
    <router-view />
    -->

  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import iView from 'iview'

import * as _const from '@/store/_constants'
import * as appRoutes from '@/router/appRoutes'
import * as appTab from '@/router/appPerspectives'
import { messages } from '@/helper/appMessages'

import appIconsMapper from '@/helper/appIcons'

Vue.component('v-hello', appRoutes.HelloWorld)
Vue.component('v-fsearch', appRoutes.Search)
Vue.component('v-usage', appRoutes.Usage)

Vue.use(iView)

const tabsOrderTip = messages.knownIssues.tabsOrder.replace(/\n\s+/g, '<br/>')

export default {
  name: 'Workspace',
  components: {
  },
  props: {
  },
  data () {
    return {
      tabsOrderTip
    }
  },
  computed: {
    allowMulti: {
      get: function () {
        let tab = this.appTabs.find(p => p.path === this.$route.path) || {}
        let key = tab.key || this.$store.getters[_const.ACTIVE_TAB_KEY]
        return key
      }
    },
    selectedTab: {
      get: function () {
        return this.$store.getters[_const.ACTIVE_TAB_KEY]
      },
      set: function (tabKeyValue) {
        // console.log('user activated on tab:', tabKeyValue)
        appTab.openAppTabByUser(tabKeyValue, this.$store, this.$router)
      }
    },
    ...mapGetters({
      activeTabOrder: _const.ACTIVE_TAB_ORDER,
      appTabs: _const.PERSPECTIVE_TABS
    })
  },
  methods: {
    addTab: function () {
      console.log('adding tab by user')
      appTab.openNewTab(this.selectedTab, this.$store)
    },
    closeTab: function (tabIndex) {
      this.$store.commit(_const.PERSPECTIVE_HIDE, tabIndex)
      appTab.checkAppTabs(this.$store, this.$router)
    },
    getIcon: function (name) {
      return appIconsMapper(name)
    },
    moveTabForward: function () {
      this.$store.commit(_const.ACTIVE_TAB_MOVE_DOWN, this.selectedTab)
    },
    moveTabBackward: function () {
      this.$store.commit(_const.ACTIVE_TAB_MOVE_UP, this.selectedTab)
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tabs {
  /*
  // NOTE: DEBUG only
  border: 1px dotted red;
  */
  height: 100%; width: 100%;
  margin-left: -1px;
}
#tabs-div {
  /*
  // NOTE: DEBUG only
  border: 1px dotted green;
  */
  background-color: transparent;
  border-radius: 5px 0px 0px 0px;
  border-left: 1px solid lightgray;
  margin: 0px 0px 0px 5px; padding:0px;
  bottom: 31px; left: 0px; right: 0px; top: 39px;
  position: fixed;
}
#tabs-dev::before {
  /*
  // NOTE: DEBUG only
  border: 1px dotted blue;
  */
}

.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
.extra {
  margin-right: 15px;
}
.extra-icon {
  margin-bottom: 1px;
  vertical-align: middle;
}

.perspective {
  /*
  // NOTE: DEBUG only
  border: 1px dotted gold;
  */
  height: 100vh; width: 100%;
  margin: 0; padding: 0;
  position: fixed;
}
</style>
