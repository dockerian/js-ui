<template>
  <div id="filter-ctrl">
    <div class="inline-title">
      Search:
    </div>
    <div class="inline-input">
      <Input autocomplete="on" type="text" class="input"
        placeholder="press Enter to Apply all filters"
        v-bind:autofocus="true"
        v-bind:clearable="true"
        v-bind:disabled="filtersCount >= filterLimit"
        v-on:on-enter="onCommit"
        v-model="searchInput"
        >
      </Input>
      <Alert type="warning" class="inline-alert"
        v-if="filtersCount >= filterLimit"
        v-bind:title="`Only ${filterLimit} filters allowed.`"
        v-bind:show-icon="true">
        Filters have exceeded the limit of {{ filterLimit }}
      </Alert>
    </div>
    <el-button type="success" size="small" class="filter-action"
      title="Apply all filters"
      v-if="exportWithPagination && !showFilterActions"
      v-on:click="applyFilters"
      >
      Apply
    </el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import { mapState } from 'vuex'

Vue.use(iView)

export default {
  name: 'FilterSearch',
  props: {
    filtersCount: {
      type: Number,
      required: true
    },
    filterLimit: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      searchInput: ''
    }
  },
  computed: {
    ...mapState({
      exportWithPagination: state => state.exportWithPagination,
      showFilterActions: state => state.showFilterActions
    })
  },
  methods: {
    applyFilters: function () {
      this.$emit('applyFilters')
    },
    download: function (cmd) {
      this.$emit('download', cmd)
    },
    onCommit: function () {
      if (this.searchInput.trim() !== '') {
        this.$emit('updateFilters', this.searchInput)
      } else {
        this.applyFilters()
      }
      this.searchInput = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#filter-ctrl {
  display: flex;
  align-content: flex-start;
  align-items: stretch;
  justify-content: flex-start;
  flex-flow: row nowrap; /* flex-direction: row; flex-wrap: nowrap; */
  font-size: 10.5pt;
  height: 34px; max-height: 37px;
  padding: 0px 0px 0px 11px; margin-top: 0px;
  text-align: left;
}
.ticket-button {
  margin-left: 5px;
  white-space: nowrap;
}
.export-button {
  margin-left: 5px; min-width: 100px;
  white-space: nowrap;
}
.filter-action {
  font-size: 13px; font-weight: bold;
  height: 32px; max-height: 32px;
  margin-left: 3px;
}
.inline-alert {
  background-color: transparent;
  border-radius: 3px; border-width: 0px;
  color: darkred; cursor: default; font-size: 12px;
  position: absolute; top: 0px; left: 0px;
  height: 29px; width: 99%; margin: 1px 1px; padding: 7px 21px;
  text-align: left; vertical-align: middle;
  text-overflow: ellipsis; overflow: auto;
  white-space: nowrap;
}
.inline-input {
  display: inline-flex;
  align-content: flex-start;
  align-items: stretch;
  justify-content: flex-start;
  flex-flow: row nowrap; /* flex-direction: row; flex-wrap: nowrap; */
  font-size: 10.5pt;
  height: 37px; max-height: 37px;
  padding: 0px; margin: 0px;
  position: relative;
  text-align: left;
  width: 100%;
}
.inline-split {
  display: inline-block;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  height: 32px; width: 3px; min-width: 3px; max-width: 3px;
  padding: 0px; margin: 0px 3px 0px 7px;
}
.inline-title {
  display: inline-block;
  align-self: center; flex-grow: 0;
  vertical-align: middle;
  min-width: 53px;
}
</style>
