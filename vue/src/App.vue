<template>
  <div id="app">
    <v-header/>
    <img src="./assets/logo.png">
    <router-view/>
    <v-footer :org-name="orgName" />
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import VueFooter from '@/components/Footer'

const data = {
  orgName: 'Dockerian'
}

export default {
  name: 'app',
  data: () => data,
  components: {
    'v-header': AppHeader,
    'v-footer': VueFooter
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-top: 3pt; margin-bottom: 3em;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-align: center;
}
</style>
