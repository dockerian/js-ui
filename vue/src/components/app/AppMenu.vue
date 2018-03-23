<template>
  <div id="menu">
  <Menu mode="vertical"
    active-name="perspectives"
    v-bind:open-names="['perspectives']"
    v-bind:theme="appMenuTheme"
    v-on-clickaway="closeMenu"
    v-on:on-select="onSelect"
    class="scrollable">
    <component v-for="(fli, fliKey) in menu"
      v-bind:key="fliKey"
      v-bind:name="fli.route || fliKey"
      v-bind:is="fli.menuItems == undefined ? 'MenuItem' : 'Submenu'"
      >
      <template v-if="fli.menuItems != undefined" slot="title">
        <Icon v-bind:type="getIcon(fli.name)"></Icon>
        {{fli.name}}
      </template>
      <Tooltip v-else placement="right" v-bind:content="fli.description">
        <Icon v-bind:type="getIcon(fli.name)"></Icon>
        &nbsp; {{fli.name}}
      </Tooltip>
      <MenuItem
        v-for="(item, key) in fli.menuItems"
        v-bind:key="fliKey+'-'+key"
        v-bind:name="item.route">
        <Tooltip placement="right" v-bind:content="item.description">
          <Icon v-bind:type="getIcon(item.name)"></Icon>
          &nbsp; {{item.name}}
        </Tooltip>
      </MenuItem>
    </component>
  </Menu>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import { mapGetters } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'
import * as _const from '@/store/_constants'
import { appMenu, findRoute } from '@/router/appMenu'
import appIconsMapper from '@/helper/appIcons'

Vue.use(iView)

export default {
  name: 'AppMenu',
  components: {
  },
  props: {
  },
  data () {
    return {
      menu: appMenu
    }
  },
  computed: {
    ...mapGetters({
      appMenuShown: _const.APP_MENU_SHOWN,
      appMenuTheme: _const.APP_MENU_THEME
    })
  },
  mixins: [ clickaway ],
  methods: {
    closeMenu: function () {
      if (this.appMenuShown === true) {
        this.$store.commit(_const.APP_MENU_SHOWN, false)
      }
    },
    getIcon: function (name) {
      return appIconsMapper(name)
    },
    onSelect: function (name) {
      let item = findRoute(name, this.menu)
      if (item) {
        this.$store.commit(_const.APP_MENU_SHOWN, false)
        this.$store.dispatch(_const.PERSPECTIVE_OPEN, item.route)
        let location = {
          name: item.name,
          path: item.route,
          query: item.query
        }
        if (this.$store.state.navNoHistory) {
          this.$router.replace(location)
        } else {
          this.$router.push(location)
        }
      }
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#menu {
}
.scrollable {
  /*
  background: rgba(225, 225, 225, 0.65);
  */
  height: 91vh; max-height: 91vh;
  border-bottom: 6px solid #EEEEEE;
  overflow: hidden;
}
.scrollable:hover {
  overflow-y: scroll;
}

</style>
