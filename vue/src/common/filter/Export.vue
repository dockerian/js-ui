<template>
  <div class="export">
    <el-dropdown
      class="export-button"
      size="small" :split-button="true" type="primary"
      v-on:click="download" v-on:command="download">
      Export
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="list.json">All search result (.json)</el-dropdown-item>
        <el-dropdown-item command="list.csv">All search result (.csv)</el-dropdown-item>
        <el-dropdown-item command="clip.json" divided>Current view to clipboard (.json)</el-dropdown-item>
        <el-dropdown-item command="clip.csv">Current view to clipboard (.csv)</el-dropdown-item>
        <el-dropdown-item command="view.json" divided>Current view data (.json)</el-dropdown-item>
        <el-dropdown-item command="view.csv">Current view data (.csv)</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })

export default {
  name: 'Export',
  methods: {
    download (cmd) {
      let opt = cmd instanceof MouseEvent ? 'clip.json' : cmd
      this.$emit('download', opt)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.export-button {
  height: 32px; max-height: 32px;
  margn: 0px;
}
</style>
