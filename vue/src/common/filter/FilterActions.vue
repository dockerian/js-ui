<template>
  <div id="filter-actions">
    <el-button type="danger" size="small" plain class="filter-action clear-all"
      title="Clear all filters"
      v-if="showFilterActions"
      v-bind:disabled="filtersCount <= 0"
      v-on:click="clearAllFilters"
      >
      Clear All
    </el-button>
    <el-button type="success" size="small" class="filter-action apply"
      title="Apply all filters"
      v-if="showFilterActions"
      v-on:click="applyFilters"
      >
      Apply
    </el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import { mapState } from 'vuex'

Vue.use(Element, { locale })

export default {
  name: 'FilterPane',
  props: {
    filtersCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState({
      showFilterActions: state => state.showFilterActions
    })
  },
  methods: {
    applyFilters: async function () {
      this.$emit('applyFilters')
    },
    clearAllFilters: function () {
      this.$emit('clearAllFilters')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#filter-actions {
  display: inline-flex;
  flex-direction: column;
}

.filter-action {
  font-size: 13px; font-weight: bold;
  height: 32px; max-height: 32px; min-width: 83px;
  margin-left: 7px;
}

.clear-all {
  margin-bottom: 5px;
}

</style>
