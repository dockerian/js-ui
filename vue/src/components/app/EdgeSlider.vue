<template>
  <div id="edge-right">
    <div id="edge-right-box"
      v-bind:class="boxClass" v-if="edgerVisible"
      v-on-clickaway="hide"
      >
      <div id="edge-right-handler" @mouseout="clearout" @mouseover.stop="setTimer">
      </div>
      <div class="settings-box" @mouseout="hide" @mouseover="show">
        <div class="settings-fix">
          <h1>Settings</h1>
        </div>
        <div class="settings-div">
          <v-settings-pane class="settings-vue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

import SettingsPane from '@/components/app/SettingsPane'

export default {
  name: 'EdgeSlider',
  components: {
    'v-settings-pane': SettingsPane
  },
  props: {
  },
  data () {
    return {
      hoverTimeout: null,
      boxClass: ''
    }
  },
  computed: {
    edgerVisible: {
      get: function () {
        return this.$route.path !== '/settings'
      }
    }
  },
  mixins: [ clickaway ],
  methods: {
    clearout: function () {
      clearTimeout(this.hoverTimeout)
    },
    setTimer: function () {
      this.hoverTimeout = setTimeout(() => { this.show() }, 750)
    },
    hide: function () {
      this.boxClass = ''
    },
    show: function () {
      this.boxClass = 'edge-right-div'
    }
  },
  mounted: function () {
    this.clearout()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#edge-right {
  /*
  // NOTE: DEBUG only
  border: 1px dotted red;
  */
  height: 100vh;
  margin: 0; padding: 0px 0px 31px 0px; top: 0px; right: 0px;
  vertical-align: middle;
  position: fixed;
}
#edge-right-handler {
  /*
  // NOTE: DEBUG only
  border: 1px dotted gold;
  */
  background-color: skyblue;
  background-blend-mode: overlay;
  background-clip: content-box;
  background-image: url('../../assets/slider.svg');
  background-origin: padding-box;
  background-position: left;
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 7px 0px 0px 7px;
  height: 31vh; width: 7px; top: 31%;
  position: absolute;
}
#edge-right-box {
  /*
  // NOTE: DEBUG only
  border: 1px dotted green;
  */
  height: 100%; min-width: 7px;
  margin: 0; padding: 0; top: 0px; right: 0px;
  position: relative;
  text-align: left;
}
.edge-right-div {
  height: 100%; width: 295px;
}

.settings-box {
  /*
  // NOTE: DEBUG only
  border: 1px dotted green;
  */
  height: 100vh; top: 0px;
  text-align: left; vertical-align: top; margin-left: 7px;
  position: fixed;
}
.settings-fix {
  /*
  // NOTE: DEBUG only
  border: 1px dotted blue;
  */
  color: dimgray;
  background-color: lightgray;
  border-bottom: 2px solid darkgray;
  position: fixed; top: 0px; padding: 0px 7px;
  height: 71px; width: 100%;
  z-index: 11;
}
.settings-div {
  /*
  // NOTE: DEBUG only
  border: 1px dotted gold;
  */
  background-color: lightgray;
  background-color: rgba(211, 211, 211, 0.85);
  padding: 57px 9px 35px 5px; margin: 0px;
  position: fixed; top: 0px;
  height: 100vh;
}
.settings-btn {
  cursor: pointer;
  border: 1px dotted red;
  height: 35px; width: 35px;
  position: fixed; top: 0px; right: 0px; padding: 5px;
  z-index: 100;
}
.settings-vue {
  overflow-y: scroll;
}
h1 {
  color: dimgray;
  position: fixed;
  height: 50px;
}
h2, h3 {
  color: dimgray;
  line-height: 120%;
  padding: 0pt;
}
</style>
