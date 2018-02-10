<template>
  <div id="app">
    <v-header/>
    <transition>
      <router-view />
    </transition>
    <v-footer :org-name="orgName" />
  </div>
</template>

<script>
import AppHeader from '@/components/app/Header'
import AppFooter from '@/components/app/Footer'
import config from '@/config'

const data = {
  orgName: config.settings.org || 'Dockerian'
}

export default {
  name: 'app',
  data: () => data,
  components: {
    'v-header': AppHeader,
    'v-footer': AppFooter
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
