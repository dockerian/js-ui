<template>
  <div class="filter-tag">
    <Tag
      v-bind:closable="true"
      v-bind:name="filterName"
      v-on:on-close="clearFilter">
      <b>{{ filterName }}</b>: {{ filterValue }}
    </Tag>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'

Vue.use(iView)

export default {
  name: 'FilterTag',
  props: {
    filterName: {
      required: true,
      type: String
    },
    filterValue: {
      required: true,
      type: String
    }
  },
  methods: {
    clearFilter: function () {
      this.$emit('clearFilter', {
        [this.filterName]: this.filterValue
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter-tag {
  font-size: 12px; font-weight: normal;
  height: 25px; margin: 2px 1px 5px 1px;
  white-space: nowrap;
}
</style>
