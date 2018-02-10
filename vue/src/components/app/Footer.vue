<template>
  <footer class="footer">
  <div id="footer" v-html="copyright" v-bind:title="copyrightInfo" />
  <v-notification class="center" :title="orgName"></v-notification>
  <div class="clock">{{ clock }}</div>
  </footer>
</template>

<script>
import Notification from '@/components/app/Notification'
import * as str from '@/utils/str'
import config from '@/config'

const org = config.settings.org || 'Dockerian'

var data = {
  clock: '',
  clockFunc: str.clock,
  copyrightInfo: config.settings.copyrightInfo,
  project: config.settings.project,
  org: org
}

export default {
  name: 'Footer',
  components: {
    'v-notification': Notification
  },
  props: ['orgName'],
  data: () => data,
  computed: {
    copyright: {
      get: function () {
        return `&copy; ${config.settings.copyright}`
      }
    }
  },
  methods: {
    _tick: function () {
      this.clock = str.clock()
      return this.clock
    },
    startTick: function () {
      this.interval = setInterval(this._tick, 1000)
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
    position: absolute; left: 190px; right: 95px; top: 0px;
    vertical-align: center;
  }
  .clock {
    display: inline;
    padding-right: 1em;
    position: fixed;
    text-align: right;
    right: 0;
  }
  .footer {
    bottom: 0; left: 0;
    background-color: white;
    /*
    border: dotted 1px red;
    */
    display: inline-block;
    font-size: 9pt;
    padding: 0.5em 1em;
    position: fixed;
    text-align: left;
    vertical-align: middle;
    width: 100%;
  }
  #footer {
    display: inline;
  }
  .vinfo {

  }
</style>
