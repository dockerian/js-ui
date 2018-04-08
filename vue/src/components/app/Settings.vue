<template>
  <div id="settings">
    <div id="settings-header">
      <h1>Settings</h1>
    </div>
    <div class="settings-vue">
      <v-settings-pane />
    </div>
  </div>
</template>

<script>
import SettingsPane from '@/components/app/SettingsPane'

export default {
  name: 'Settings',
  components: {
    'v-settings-pane': SettingsPane
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
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
div#settings::after {
  content: "";
  background-attachment: fixed;
  background-blend-mode: lighten;
  background-clip: content-box;
  background-image: url('../../assets/p_settings.png');
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 51%;
  opacity: 0.05;
  padding: 0px; margin: 0px;
  bottom: 0; left: 0; right: 0; top: 0;
  position: absolute;
  z-index: -1;
}
#settings-header {
  color: dimgray;
  background-color: white;
  border-bottom: 2px solid lightgray;
  position: fixed; top: 35px;
  height: 70px; width: 100%; padding-top: 20px;
  z-index: 10;
}
.settings-vue {
  display: inline-flex;
  flex-flow: row wrap; /* flex-direction: row; flex-wrap: nowrap; */
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px; padding: 0px; width: 100%;
  position: relative; top: 57px;
  overflow-y: scroll;
}
</style>
