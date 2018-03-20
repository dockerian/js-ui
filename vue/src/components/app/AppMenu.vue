<template>
  <Menu mode="vertical"
    active-name="demo"
    v-bind:open-names="['demo']"
    v-bind:theme="appMenuTheme"
    v-on-clickaway="closeMenu"
    v-on:on-select="onSelect"
    class="scrollable">
    <component v-for="(fli, fliKey) in menu"
      v-bind:key="fliKey"
      v-bind:name="fli.route || fliKey"
      v-bind:is="fli.menuItems == undefined ? 'MenuItem' : 'Submenu'">
      <template v-if="fli.menuItems != undefined" slot="title">
        {{fli.name}}
      </template>
      <Tooltip v-else placement="right" v-bind:content="fli.description">
        {{fli.name}}
      </Tooltip>
      <MenuItem v-for="(item, key) in fli.menuItems"
        v-bind:key="`${fliKey}-${key}`"
        v-bind:name="item.route">
        <Tooltip placement="right" v-bind:content="item.description">
          {{item.name}}
        </Tooltip>
      </MenuItem>
    </component>
  </Menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'
import * as _const from '@/store/_constants'
import appMenu, { findRoute } from '@/router/appMenu'

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
        this.$store.commit(_const.APP_MENU_RESET, false)
      }
    },
    onSelect: function (name) {
      let item = findRoute(name, this.menu)
      if (item) {
        this.$store.commit(_const.APP_MENU_RESET, false)
        this.$router.push({
          name: item.name,
          path: item.route
        })
      }
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scrollable {
  /*
  background: rgba(225, 225, 225, 0.65);
  */
  height: 91vh; max-height: 91vh;
  border-bottom: 6px solid #EEEEEE;
  overflow-y: scroll;
}
</style>
