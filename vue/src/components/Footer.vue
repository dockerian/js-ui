<template>
  <footer class="footer">
  <div id="footer" v-html="copyright" />
  <div class="clock">{{ clock }}</div>
  </footer>
</template>

<script>
const clockFunc = () => {
  let now = new Date()
  let hrs = now.getHours()
  let min = now.getMinutes()
  let sec = now.getSeconds()
  let _hh = (hrs < 10 ? '0' : '') + hrs
  let _mm = (min < 10 ? '0' : '') + min
  let _ss = (sec < 10 ? '0' : '') + sec
  return `${_hh}:${_mm}:${_ss}`
}

const copyrightFunc = (orgName) => {
  let year = (new Date()).getFullYear()
  let yearCopy = (year <= 2017 ? '' : '2017-') + year
  return `&copy; ${yearCopy} ${orgName}`
}

var data = {
  clock: '',
  clockFunc,
  copyrightFunc,
  status: ''
}

export default {
  name: 'Footer',
  props: ['orgName'],
  data () { return data },
  computed: {
    copyright: function () {
      return copyrightFunc(this.orgName)
    }
  },
  methods: {
    _tick: function () {
      this.clock = clockFunc()
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
    display: inline-block;
    font-size: 9pt;
    padding: 0.5em 1em;
    position: fixed;
    text-align: left;
    width: 100%;
  }
  #footer {
    display: inline;
  }
</style>
