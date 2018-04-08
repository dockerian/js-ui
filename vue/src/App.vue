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

    <div class="overlay" v-if="env !== 'prod'" v-draggable>
      :: {{ env }} {{ project.version }} ::
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppMenu from '@/components/app/AppMenu'
import AppFooter from '@/components/Footer'
import AppMenuSlider from '@/components/app/AppMenuSlider'
import EdgeSlider from '@/components/app/EdgeSlider'
import draggable from '@/helper/draggable'

import { mapGetters } from 'vuex'
import * as _const from '@/store/_constants'
import config from '@/config'

export default {
  name: 'app',
  directives: {
    'draggable': draggable
  },
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
      project: config.settings.project,
      env: config.settings.env
    }
  },
  computed: {
    ...mapGetters({
      appMenuShown: _const.APP_MENU_SHOWN,
      viewPortSize: _const.VIEW_PORT_SIZE,
      userSignedIn: _const.USER_SIGNED_IN
    })
  },
  methods: {
    onWindowResize: function (e) {
      let vp = e && e.currentTarget ? e.currentTarget : window

      // from document client size or window inner size
      // document.documentElement.clientHeight < outerHeight
      // document.documentElement.clientWidth < outerWidth
      this.$store.commit(
        _const.VIEW_PORT_SIZE, {
          height: vp.innerHeight, width: vp.innerWidth
        })
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.onWindowResize)
  },
  mounted: function () {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
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
.overlay {
  cursor: pointer;
  color: lightgray;
  font-size: 19pt; font-weight: bold;
  font-family: "Helvetica Neue","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Segoe UI","Tahoma";
  position: fixed; bottom: 51pt; right: 27pt;
  padding: 0px; margin: 0px;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
}
</style>
