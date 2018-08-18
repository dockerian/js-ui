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
        <h1>{{ progressPercent }} %</h1>
        <p v-html="progressInfo"></p>
      </div>
    </Circle>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import * as helper from '@/helper/progress'

Vue.use(iView)

export default {
  name: 'Progress',
  components: {
  },
  props: {
  },
  data () {
    return {
      ...helper.progressVm,
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
      let update = helper.progressUpdate(this.percentage, this.progressInterval)
      this.percentColor = update.percentColor
      this.percentage = update.percentage
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
  font-size: 7vh;
  padding-top: 0.5em;
}
p {
  font-size: 3.5vh;
  line-height: 1.5em;
  padding: 1em 3em;
}
</style>
