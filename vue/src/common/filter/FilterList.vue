<template>
  <div id="filter-list">
    <div class="data-committing" v-if="onCommitting">
    </div>
    <div class="filter-applying" v-if="onLoading">
    </div>
    <Poptip
      v-if="!onLoading && !onCommitting"
      class="filter-poptip"
      placement="bottom-end" trigger="click"
      v-bind:transfer="true"
      >
      <Icon color="lightblue" size="21" type="ios-keypad" class="filter-opener" />
      <div class="filter-title" slot="title">
        <Badge v-bind:count="filtersCount"
          v-bind:class-name="`${filterChanged ? 'filter-change':'filter-counts'}`">
          <b>Filters</b>
          <span v-if="filtersCount <= 0">(none)</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </Badge>
        <Button
          class="filter-url"
          title="copy current filters as page URL to clipboard"
          type="text" icon="ios-browsers" shape="circle" size="default"
          v-on:click="copyURL(true)">
        </Button>
        <Button
          class="filter-url-applied"
          title="copy page URL to clipboard"
          type="text" icon="link" shape="circle" size="default"
          v-on:click="copyURL">
        </Button>
      </div>
      <div slot="content" class="filter-list">
        <filter-tag v-for="item in filterList"
          v-bind:key="`${item.key}:${item.value}`"
          v-bind:filterName="item.key"
          v-bind:filterValue="item.value"
          v-on:clearFilter="clearFilter"
          >
        </filter-tag>
        <hr style="margin: 15px 0px 11px 0px;"/>
        <el-button type="danger" size="small" plain class="filter-action clear-all"
          title="Clear all filters"
          v-bind:disabled="filtersCount <= 0"
          v-on:click="clearAllFilters"
          >
          Clear All
        </el-button>
        <el-button type="warning" size="small" class="filter-action undo"
          title="Undo filter change"
          v-bind:disabled="!filterChanged"
          v-on:click="undoFilters"
          >
          Undo
        </el-button>
        <el-button type="success" size="small" class="filter-action apply"
          title="Apply all filters"
          v-on:click="applyFilters"
          >
          Apply
        </el-button>
      </div>
    </Poptip>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import FilterTag from '@/common/filter/FilterTag'
import * as search from '@/utils/search'
import * as helper from '@/helper/vm'

Vue.use(iView)

export default {
  name: 'FilterList',
  components: {
    FilterTag
  },
  props: {
    filterChanged: {
      type: Boolean,
      required: true
    },
    filtersCount: {
      type: Number,
      required: true
    },
    filterList: {
      type: Array,
      required: true
    },
    filters: {
      type: Object,
      required: true
    },
    onCommitting: Boolean,
    onLoading: Boolean
  },
  methods: {
    applyFilters: async function () {
      this.$emit('applyFilters')
    },
    clearAllFilters: function () {
      this.$emit('clearAllFilters')
    },
    clearFilter: function (filter) {
      this.$emit('clearFilter', filter)
    },
    copyURL: function (usingFilters) {
      let queryString = usingFilters === true ? search.getQueryString(this.filters) : ''
      return helper.copyURL(this, queryString)
    },
    undoFilters: function () {
      this.$emit('undoFilters')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#filter-list {
  display: inline-block;
  height: 27px; width: 31px;
  position: absolute; top: 0px; right: 0px;
  text-align: right; vertical-align: top;
  margin: 0px; padding: 0px;
}
.data-committing {
  display: inline-block;
  height: 23px; width: 23px;
  background-clip: content-box;
  background-image: url('../../assets/icon_committing.gif');
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 3px 5px;
}
.filter-action {
  font-size: 13px; font-weight: bold;
  height: 32px; max-height: 32px; min-width: 80px;
}
.filter-applying {
  display: inline-block;
  height: 23px; width: 23px;
  background-clip: content-box;
  background-image: url('../../assets/icon_loading.gif');
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 3px 5px;
}
.filter-counts {
  background-color: skyblue !important;
}
.filter-opener {
  cursor: pointer;
  height: 23px; width: 23px;
}
.filter-poptip {
  height: 23px; width: 23px;
  position: absolute; top: 0px; right: 0px;
  margin-right: 5px; margin-top: 5px;
}
.filter-title {
  position: relative;
  width: 100%;
}
.filter-url-applied {
  position: absolute; top: -7px; right: -5px;
}
.filter-url {
  position: absolute; top: -7px; right: 25px;
}
.filter-list {
  height: 50vh; max-height: 75vh; max-width: 100vh;
  overflow: auto;
  padding-bottom: 5px;
}
</style>
