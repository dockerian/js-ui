<template>
  <div id="settings">
    <div id="setting-header">
      <h1>Settings</h1>
    </div>
    <div id="setting-panel">
      <div id="color-theme">
        <h3>Color Theme and Display</h3>
        <div class="setting-section">
          <Checkbox
            v-model="darkTheme"
            v-bind:value="darkTheme"
            size="large">
            &nbsp; Use dark theme for App menu
          </Checkbox>
          <Checkbox
            v-model="showClock"
            v-bind:value="showClock"
            size="large">
            &nbsp; Show clock at footer
          </Checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as _const from '@/store/_constants'

export default {
  name: 'Settings',
  components: {
  },
  props: {
  },
  data () {
    return {
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
    showClock: {
      get: function () {
        return this.$store.state.envShowClock
      },
      set: function (value) {
        this.$store.commit(_const.SET_SHOW_CLOCK, value)
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
#settings {
  margin: 0pt 5pt;
  position: fixed; top: 33px;
  text-align: left;
}
#setting-header {
  color: dimgray;
  background-color: white;
  border-bottom: 2px solid lightgray;
  position: fixed; top: 31px;
  height: 50px; width: 100%;
  z-index: 10;
}
#setting-panel {
  display: inline-block;
  padding: 5px 5px 0px 5px;
  margin: 0 5px 5pt 0pt; width: 99%; position: relative; top: 35px;
  overflow-y: scroll;
}
.setting-section {
  display: inline-block;
}
h3 {
  color: dimgray;
  line-height: 120%;
  padding: 15pt 0pt 5pt 0pt;
}

</style>
