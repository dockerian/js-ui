<template>
  <footer v-bind:class="`footer env-${env}`">
  <div id="footer" v-html="copyright" v-bind:title="copyrightInfo" />
  <v-notification class="center"></v-notification>
  <div v-on:click="toggleClock" class="clock">
    <span v-if="envShowClock">{{ clock }}</span>
    <span v-else v-bind:class="`vinfo v-${env}`">
      {{ project.version + (env !== 'prod' ? `-${env}` : '' ) }}
    </span>
  </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import Notification from '@/components/app/Notification'
import * as _const from '@/store/_constants'
import * as str from '@/utils/str'
import config from '@/config'

const org = config.settings.org || 'Dockerian'

var data = {
  clock: '',
  copyrightInfo: config.settings.copyrightInfo,
  project: config.settings.project,
  env: config.settings.env,
  org: org
}

export default {
  name: 'Footer',
  components: {
    'v-notification': Notification
  },
  props: {
  },
  data: () => data,
  computed: {
    copyright: {
      get: function () {
        return `&copy; ${config.settings.copyright}`
      }
    },
    // envShowClock: () => true,
    ...mapGetters({
      envShowClock: _const.SHOW_CLOCK_ENV
    })
  },
  methods: {
    _tick: function () {
      this.clock = str.clock()
    },
    startTick: function () {
      this.interval = setInterval(this._tick, 1000)
    },
    toggleClock: function () {
      this.$store.commit(_const.SHOW_CLOCK_ENV, !this.envShowClock)
    }
  },
  mounted: function () {
    this.startTick()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .center {
    display: block;
    /*
    border: dotted 1px green;
    */
    height: 28px; margin-top: 0; padding: 0;
    position: absolute; left: 190px; right: 71px; top: 0px;
    vertical-align: center;
  }
  .clock {
    cursor: pointer;
    display: inline;
    padding-right: 0.75em;
    position: fixed;
    text-align: right;
    right: 0;
  }
  .env-dev {
    background-color: lavender;
    /*
    background-color: palegreen;
    background-color: mistyrose;
    background-color: gainsboro;
    */
  }
  .env-test {
    background-color: khaki;
  }
  .env-prod {
    background-color: transparent;
  }
  .footer {
    bottom: 0; left: 0;
    /*
    border: dotted 1px red;
    */
    display: inline-block;
    font-size: 9pt;
    padding: 0.5em 0.75em;
    position: fixed;
    text-align: left;
    vertical-align: middle;
    width: 100%;
  }
  #footer {
    display: inline;
  }
  .v-dev {
    color: darkred;
  }
  .v-test {
    color: darkgreen;
  }
  .vinfo {
    font-weight: bold;
  }
</style>
