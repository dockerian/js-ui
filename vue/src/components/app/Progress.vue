<template>
  <div id="progress">
    <Circle
      v-bind:size="circleSize"
      v-bind:trail-width="7"
      v-bind:stroke-width="7"
      v-bind:percent="percentage"
      v-bind:stroke-color="percentColor"
      stroke-linecap="round"
      >
      <div class="progress-info">
        <h1>{{ progress }} %</h1>
        <p>{{ progressInfo }}</p>
      </div>
    </Circle>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import moment from 'moment'
import config from '@/config'
import * as hc from '@/utils/htmlColor'

Vue.use(iView)

const calcDays = (start, end) => {
  return moment(end).diff(start, 'days')
}
const calcDaysByNow = (start) => {
  let now = new Date()
  return moment(now).diff(start, 'days')
}
const calcPercent = (start, end) => {
  let now = new Date()
  return Math.round(Math.min(1,
    moment(now).diff(start, 'days') /
    moment(end).diff(start, 'days')) * 100)
}

const version = 'MVP'
const project = config.settings.project
const progress = {
  colorEnd: 'green',
  colorStart: 'red',
  dateEnd: project.releases[version],
  dateStart: project.startDate,
  percent: calcPercent(project.startDate, project.releases[version]),
  days: calcDays(project.startDate, project.releases[version]),
  daysByNow: calcDaysByNow(project.startDate)
}
const daysLeft = progress.days - progress.daysByNow
const beOnLiveInfo = daysLeft < 0
  ? `${-daysLeft} days ${version} live`
  : `${project.name} ${version} on live`
const progressInfo = daysLeft > 0
  ? `${daysLeft} days to ${version} release`
  : beOnLiveInfo

export default {
  name: 'Progress',
  components: {
  },
  props: {
  },
  data () {
    return {
      percentage: 0,
      percentColor: hc.getHslByPercent(0, progress.colorStart, progress.colorEnd),
      progress: progress.percent,
      progressInfo,
      progressInterval: null,
      vpHeight: window.innerHeight,
      vpWidth: window.innerWidth
    }
  },
  computed: {
    circleSize: {
      get: function () {
        let vpSize = Math.min(this.vpHeight, this.vpWidth)
        return vpSize > 200 ? vpSize * 0.75 : 300
      }
    }
  },
  methods: {
    _begin: function () {
      this.progressInterval = setInterval(this.progressFill, 25)
    },
    onWindowResize: function (e) {
      // document.documentElement.clientHeight < outerHeight
      this.vpHeight = e.currentTarget.innerHeight
      // document.documentElement.clientWidth < outerWidth
      this.vpWidth = e.currentTarget.innerWidth
    },
    progressFill: function () {
      let x = Math.log10(1 + this.percentage / 10)
      this.percentage += 0.5 * (1 + this.progress * x / 10)
      if (this.percentage > this.progress) {
        clearInterval(this.progressInterval)
        this.percentage = this.progress
      }
      this.percentColor = hc.getHslByPercent(this.percentage)
    }
  },
  mounted: function () {
    this._begin()
    window.addEventListener('resize', this.onWindowResize)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#progress {
}
.progress-info {
  line-height: 300%;
}
h1 {
  font-size: 33pt;
}
p {
  font-size: 21pt;
}
</style>
