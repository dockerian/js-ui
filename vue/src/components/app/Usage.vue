<template>
  <div id="help">
    <div id="circle" v-if="showChart">
      <v-progress></v-progress>
      <div id="circle-closer">
        <Poptip trigger="hover" placement="left-end">
          <Icon color="gold" type="help-circled" size="35"></Icon>
          <div slot="content">
            <div id="tip">
              <span @click="showHelp" style="cursor:pointer">
                Click to show usage page,
              </span>
              or see
              <router-link to="settings" replace>Settings</router-link>
            </div>
          </div>
        </Poptip>
      </div>
    </div>
    <div id="help-div" v-else>
      <div id="help-header">
        <h1>Quick User Guide</h1>
      </div>
      <div id="help-panel">
        <h2>How To</h2>
        <p>
          Load from static HTML page ...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import { mapGetters } from 'vuex'
import * as _const from '@/store/_constants'
import Progress from '@/components/app/Progress'
import config from '@/config'

Vue.use(iView)

export default {
  name: 'Usage',
  components: {
    'v-progress': Progress
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      showChart: _const.PROGRESS_CHART
    })
  },
  methods: {
    showHelp: function () {
      this.$store.commit(_const.PROGRESS_CHART, false)
    },
    scrollTo: function (hashtag) {
      setTimeout(() => { location.href = hashtag }, 1)
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.onWindowResize)
  },
  mounted: function () {
    if (this.$route.hash) {
      // NOTE: must to have a brief timeout, or it won't work.
      setTimeout(() => this.scrollTo(this.$route.hash), 1)
    }
    if (config.settings.env === 'prod') {
      this.showHelp()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#help {
  overflow-y: scroll;
}
div#help::after {
  content: "";
  background-attachment: fixed;
  background-blend-mode: lighten;
  background-clip: content-box;
  background-image: url('../../assets/p_usage.png');
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
#help-div {
  margin: 0pt 5pt;
  position: fixed; top: 33px;
  text-align: left;
}
#help-header {
  color: dimgray;
  background-color: white;
  border-bottom: 2px solid lightgray;
  position: fixed; top: 31px;
  height: 50px; width: 100%;
  z-index: 10;
}
#help-panel {
  display: inline-block;
  padding: 5px 5px 0px 5px;
  margin: 10pt 5px 5pt 0pt; width: 99%; position: relative; top: 35px;
  overflow-y: scroll;
}

#circle {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 87vh;
  justify-content: center;
  position: relative;
}
#circle-closer {
  position: absolute; top: 5pt; right: 5pt;
}
#tip {
  display: block; vertical-align: middle;
}

h2, h3 {
  color: dimgray;
  line-height: 120%;
  padding: 5pt 0pt 5pt 0pt;
}
p {
  text-indent: 2em;
}
</style>
