<template>
  <div id="filter-pane">
    <div id="filter-view" v-on:click="focusFilterSearch">
      <div class="filter-title" v-if="exportWithPagination">
        <filter-title v-bind:filtersCount="filtersCount">
        </filter-title>
      </div>
      <div v-bind:class="`filter-block ${filterChanged ? 'filter-change' : ''}`">
        <div class="filter-inline">
          <div class="filter-title" v-if="!exportWithPagination">
            <filter-title v-bind:filtersCount="filtersCount">
            </filter-title>
          </div>
          <Input class="filter-inputs"
            ref="filterSearchInline"
            autocomplete="on" size="small" type="text"
            placeholder="press Enter to Apply all filters"
            v-bind:autofocus="true"
            v-bind:clearable="true"
            v-bind:disabled="filtersCount >= filterLimit"
            v-bind:title="`Only ${filterLimit} filters allowed.`"
            v-on:on-enter="onCommit"
            v-model="searchInput"
            >
          </Input>
        </div>

        <filter-tag
          v-for="item in filterList"
          v-bind:key="`${item.key}:${item.value}`"
          v-bind:filterName="item.key"
          v-bind:filterValue="item.value"
          v-on:clearFilter="clearFilter"
          >
        </filter-tag>

        <div class="filter-poptip" v-if="filtersCount >= 0 || filterChanged">
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

      <div class="functions">
        <div class="functions-group">
          <filter-actions
            v-bind:filtersCount="filtersCount"
            v-on:applyFilters="applyFilters"
            v-on:clearAllFilters="clearAllFilters">
          </filter-actions>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as search from '@/utils/search'

import FilterActions from '@/common/filter/FilterActions'
import FilterList from '@/common/filter/FilterList'
import FilterTitle from '@/common/filter/FilterTitle'
import FilterTag from '@/common/filter/FilterTag'

export default {
  name: 'FilterInline',
  components: {
    FilterTag,
    FilterActions,
    FilterList,
    FilterTitle
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
      oldFilters: search.getFilterString(this.filters),
      searchInput: ''
    }
  },
  computed: {
    ...mapState({
      exportWithPagination: state => state.exportWithPagination,
      showFilterActions: state => state.showFilterActions
    }),
    filterChanged: function () {
      return search.getFilterString(this.filters) !== this.oldFilters
    },
    filtersCount: function () {
      return search.countFilters(this.filters)
    },
    filterList: function () {
      return search.getFilterList(this.filters)
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
      this.focusFilterSearch()
    },
    focusFilterSearch: function (event) {
      this.$refs.filterSearchInline.focus()
    },
    onCommit: function () {
      if (this.searchInput.trim() !== '') {
        this.$emit('updateFilters', this.searchInput)
      } else {
        this.applyFilters()
      }
      this.searchInput = ''
    },
    undoFilters: function () {
      this.clearAllFilters()
      this.$emit('updateFilters', this.oldFilters)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#filter-view {
  display: flex;
  align-content: flex-start;
  align-items: stretch;
  justify-content: space-between;
  flex-flow: row nowrap; /* flex-direction: row; flex-wrap: nowrap; */
  font-size: 10.5pt;
  height: 73px; max-height: 73px;
  text-align: left;
}
.functions {
  display: flex;
  align-content: space-between;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  flex-flow: column nowrap; /* flex-direction: column; flex-wrap: nowrap; */
  height: 73px; max-height: 73px;
  padding: 0px; margin: 0px;
  position: relative;
  text-align: right;
}
.functions-group {
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0px; margin: 0px;
  white-space: nowrap;
  width: 100%;
}

.filter-block {
  display: inline-flex;
  align-content: flex-start;
  align-items: stretch;
  align-self: start;
  justify-content: flex-start;
  flex-flow: row wrap; /* flex-direction: row; flex-wrap: nowrap; */
  border-radius: 5px;
  border: 1px solid lavender;
  height: 69px; max-height: 69px;
  padding: 0px 19px 0px 5px; margin: 0px;
  position: relative;
  text-align: left;
  text-overflow: ellipsis;
  overflow-y: auto;
  width: 100%;
}
.filter-block:hover {
  border: 1px solid lightblue;
}
.filter-action {
  display: inline-flex;
  font-size: 13px; font-weight: bold;
  height: 32px; max-height: 32px; min-width: 39%; width: 49%;
  text-align: center; vertical-align: middle;
  margin-left: 5px;
}
.filter-change {
  background-color: lightyellow;
}

.filter-title {
  display: inline-block;
  align-self: start; flex-grow: 0;
  height: 31px; width: 67px; min-width: 67px;
  margin: 5px 0px; padding: 0px 0px 0px 5px;
  text-align: left; vertical-align: top;
  white-space: nowrap;
}

.filter-inline {
  display: inline-block;
  align-self: start; flex-grow: 0;
  height: 27px;
  margin: 1px 0px 3px 0px; padding: 0px;
  text-align: left; vertical-align: top;
  white-space: nowrap;
}
.filter-inputs {
  display: inline-flex;
  align-content: flex-start;
  align-items: stretch;
  justify-content: flex-start;
  flex-flow: row nowrap; /* flex-direction: row; flex-wrap: nowrap; */
  font-size: 10.5pt;
  height: 27px; max-height: 27px;
  padding: 0px; margin: 4px 7px 5px 0px;
  position: relative;
  text-align: left;
  width: 200px;
}

.filter-poptip {
  cursor: pointer;
  height: 31px; width: 27px;
  position: absolute; top: 0px; right: 0px;
  text-align: right; vertical-align: top;
  margin: 0px; padding: 0px;
}

.filter-splits {
  display: inline-block;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  height: 31px; width: 3px; min-width: 3px; max-width: 3px;
  padding: 0px; margin: 0px 3px 0px 5px;
}

.export-button {
  font-size: 10.5pt; font-weight: bold;
  margin-left: 5px;
}
.ticket-button {
  margin-left: 5px;
  white-space: nowrap;
}
</style>
