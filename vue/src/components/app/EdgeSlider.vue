<template>
  <div id="edge-right">
    <div id="edge-right-box"
      v-bind:class="boxClass" v-if="edgerVisible"
      v-on-clickaway="hide"
      >
      <div id="edge-right-handler" @mouseover.stop="show">
      </div>
      <div class="settings-box" @mouseover.stop="show">
        <div class="settings-fix">
          <h1>Settings</h1>
        </div>
        <div class="settings-div" @mouseout="hide" >
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
    hide: function () {
      this.boxClass = ''
    },
    show: function () {
      this.boxClass = 'edge-right-div'
    }
  },
  mounted: function () {
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
  height: 31vh; width: 5px; top: 31%;
  position: absolute;
}
#edge-right-box {
  /*
  // NOTE: DEBUG only
  border: 1px dotted green;
  */
  height: 100%; min-width: 5px;
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
  text-align: left; vertical-align: top; margin-left: 5px;
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
  position: fixed; top: 21px; padding: 0px 7px;
  height: 50px; width: 100%;
  z-index: 11;
}
.settings-div {
  /*
  // NOTE: DEBUG only
  border: 1px dotted gold;
  */
  background-color: lightgray;
  padding: 57px 9px 35px 5px; margin: 0px;
  position: fixed; top: 0px;
  height: 100vh;
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
