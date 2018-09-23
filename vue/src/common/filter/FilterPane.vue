<template>
  <div id="filter-pane-wrapper">
    <div id="filter-pane">
      <div id="filter-view">
        <div class="filter-title">
          <el-badge class="filter-badge"
            v-bind:hidden="filtersCount < 2"
            v-bind:value="filtersCount"
            v-bind:max="9">
          Filters:
        </el-badge>
        </div>
        <div v-bind:class="`filter-block ${filterChanged ? 'filter-change' : ''}`">
          <filter-tag v-for="item in filterList"
            v-bind:key="`${item.key}:${item.value}`"
            v-bind:filterName="item.key"
            v-bind:filterValue="item.value"
            v-on:clearFilter="clearFilter"
            >
          </filter-tag>

          <div class="filter-popup" v-if="filtersCount >= 0 || filterChanged">
            <filter-list
              v-bind:filtersCount="filtersCount"
              v-bind:filterChanged="filterChanged"
              v-bind:filters="filters"
              v-bind:filterList="filterList"
              v-bind:oldFilters="oldFilters"
              v-bind:on-committing="onCommitting"
              v-bind:on-loading="onLoading"
              v-on:clearAllFilters="clearAllFilters"
              v-on:clearFilter="clearFilter"
              v-on:applyFilters="applyFilters"
              v-on:undoFilters="undoFilters"
              >
            </filter-list>
          </div>
        </div>
      </div>
      <filter-search
        v-bind:filtersCount="filtersCount"
        v-bind:filterLimit="filterLimit"
        v-on:applyFilters="applyFilters"
        v-on:updateFilters="updateFilters">
      </filter-search>
    </div>
    <filter-actions
      v-bind:filtersCount="filtersCount"
      v-on:applyFilters="applyFilters"
      v-on:clearAllFilters="clearAllFilters">
    </filter-actions>
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import { mapState } from 'vuex'
import * as search from '@/utils/search'
import FilterActions from '@/common/filter/FilterActions'
import FilterSearch from '@/common/filter/FilterSearch'
import FilterList from '@/common/filter/FilterList'
import FilterTag from '@/common/filter/FilterTag'

Vue.use(Element, { locale })

export default {
  name: 'FilterPane',
  components: {
    FilterTag,
    FilterActions,
    FilterList,
    FilterSearch
  },
  props: {
    filters: {
      type: Object,
      required: true
    },
    filterLimit: {
      type: Number,
      required: true
    },
    onCommitting: Boolean,
    onLoading: Boolean
  },
  data () {
    return {
      oldFilters: search.getFilterString(this.filters)
    }
  },
  computed: {
    ...mapState({
      showFilterActions: state => state.showFilterActions
    }),
    filterChanged: function () {
      return search.getFilterString(this.filters) !== this.oldFilters
    },
    filterList: function () {
      return search.getFilterList(this.filters)
    },
    filtersCount: function () {
      return search.countFilters(this.filters)
    }
  },
  methods: {
    applyFilters: function () {
      this.oldFilters = search.getFilterString(this.filters)
      this.$emit('applyFilters')
    },
    clearAllFilters: function () {
      this.$emit('clearAllFilters')
    },
    clearFilter: function (filter) {
      this.$emit('clearFilter', filter)
    },
    download: function (cmd) {
      this.$emit('download', cmd)
    },
    undoFilters: function () {
      this.clearAllFilters()
      this.$emit('updateFilters', this.oldFilters)
    },
    updateFilters: function (filterString) {
      this.$emit('updateFilters', filterString)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#filter-pane-wrapper {
  display:flex;
}
#filter-pane {
  flex-grow:1;
}
#filter-view {
  display: flex;
  align-content: flex-start;
  align-items: stretch;
  justify-content: flex-start;
  flex-flow: row nowrap; /* flex-direction: row; flex-wrap: nowrap; */
  font-size: 10.5pt;
  height: 37px; max-height: 37px;
  padding: 0px 0px 2px 11px; margin-bottom: 0px;
  text-align: left;
}
.filter-block {
  display: inline-flex;
  align-content: flex-start;
  align-items: stretch;
  justify-content: flex-start;
  flex-flow: row wrap; /* flex-direction: row; flex-wrap: nowrap; */
  border-radius: 5px;
  border: 1px solid lavender;
  height: 35px; max-height: 35px;
  padding: 0px 19px 0px 3px; margin: 0px 0px 5px 0px;
  position: relative;
  text-align: left;
  text-overflow: ellipsis;
  overflow: auto;
  width: 100%;
}
.filter-block:hover {
  border: 1px solid lightblue;
}
.filter-action {
  font-size: 13px; font-weight: bold;
  height: 32px; max-height: 32px; min-width: 80px;
  margin-left: 7px;
}
.filter-change {
  background-color: lightyellow;
}
.filter-popup {
  cursor: pointer;
  height: 31px; width: 27px;
  position: absolute; top: 0px; right: 0px;
  text-align: right; vertical-align: top;
  margin: 0px; padding: 0px;
}
.filter-title {
  display: inline-block;
  align-self: center; flex-grow: 0;
  vertical-align: middle;
  min-width: 53px;
}
</style>
