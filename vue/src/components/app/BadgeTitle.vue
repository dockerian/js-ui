<!-- BadgeTitle -->
<template>
  <div id="filter-title">
    <el-badge class="filter-badge"
      v-bind:hidden="count < 2"
      v-bind:value="count"
      v-bind:max="9">
      <b>Filters</b>:&nbsp;&nbsp;
    </el-badge>
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })

export default {
  name: 'BadgeTitle',
  components: {
  },
  props: {
    count: {
    }
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
#filter-title {
  display: inline-block;
  margin: 0px; padding: 0px;
  white-space: nowrap;
}
</style>
