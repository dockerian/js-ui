<template>
  <div id="edge">
    <div id="slider" @mouseover="openMenu">
    </div>
  </div>
</template>

<script>
import * as _const from '@/store/_constants'

export default {
  name: 'AppMenuSlider',
  components: {
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
    openMenu: function () {
      this.$store.commit(_const.APP_MENU_SHOWN, true)
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#edge {
  /*
  // NOTE: DEBUG only
  border: 1px dotted red;
  background-color: blue;
  */
  height: 100vh; width: 3px;
  margin:0; padding: 0px 0px 31px 0px; top: 0px;
  vertical-align: middle;
  position: fixed;
}
#slider {
  /*
  // NOTE: DEBUG only
  border: 1px dotted green;
  */
  background-color: darkgray;
  height: 31vh; width: 3px; top: 31%;
  position: relative;
}
</style>
