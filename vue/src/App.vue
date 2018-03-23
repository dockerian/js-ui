<template>
  <div id="app">
    <v-header/>

    <transition>
      <router-view class="main" />
    </transition>

    <Affix v-bind:offset-top="25" v-show="appMenuShown" class="nav_menu">
      <v-menu></v-menu>
    </Affix>

    <v-edge-slider />
    <v-menu-slider />

    <v-footer/>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppMenu from '@/components/app/AppMenu'
import AppFooter from '@/components/Footer'
import AppMenuSlider from '@/components/app/AppMenuSlider'
import EdgeSlider from '@/components/app/EdgeSlider'

import { mapGetters } from 'vuex'
import * as _const from '@/store/_constants'

export default {
  name: 'app',
  components: {
    'v-menu': AppMenu,
    'v-menu-slider': AppMenuSlider,
    'v-edge-slider': EdgeSlider,
    'v-header': AppHeader,
    'v-footer': AppFooter
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      appMenuShown: _const.APP_MENU_SHOWN,
      userSignedIn: _const.USER_SIGNED_IN
    })
  },
  methods: {
  },
  mounted: function () {
  }
}
</script>

<style>
body {
  font-size: 12pt;
}
#app {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-top: 3pt; margin-bottom: 3em;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  width: 100%;
}
.main {
  position: fixed; bottom: 31px; top: 39px;
  overflow: auto; width: 100%;
}
.nav_menu {
  border-color: lightgray;
  border-radius: 0 5px 5px 5px;
  border-style: solid solid solid solid;
  border-width: 0.5px 1px 1px 0px;
  background-color: rgba(229, 229, 229, 0.75);
  height: 91vh;
  padding: 0px 5px 7px 0px;
  position: fixed; top: 39px; bottom: 33px; left: 5px;
  text-align: left;
  z-index: 100;
}
</style>
