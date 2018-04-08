<template>
  <div id="edge">
    <div id="slider" @mouseover="openMenu" @mouseout="clearout">
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
      hoverTimeout: null
    }
  },
  computed: {
  },
  methods: {
    clearout: function () {
      clearTimeout(this.hoverTimeout)
    },
    openMenu: function () {
      this.hoverTimeout = setTimeout(() => {
        this.$store.commit(_const.APP_MENU_SHOWN, true)
      }, 500)
    }
  },
  mounted: function () {
    this.clearout()
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
  margin: 0; padding: 0px 0px 31px 0px; top: 0px;
  vertical-align: middle;
  position: fixed;
}
#slider {
  /*
  // NOTE: DEBUG only
  border: 1px dotted green;
  */
  background-color: darkgray;
  background-blend-mode: overlay;
  background-clip: content-box;
  background-image: url('../../assets/slider.svg');
  background-origin: padding-box;
  background-position: right;
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 0px 7px 7px 0px;
  height: 31vh; width: 7px; top: 31%;
  position: relative;
  opacity: 0.65;
}
</style>
