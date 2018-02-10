<template>
  <div id="about">
    <img src="@/assets/logo.png">
    <h1>{{ msg }}</h1>
    <v-links />
  </div>
</template>

<script>
import VueLinks from '@/components/Links'

export default {
  name: 'About',
  components: {
    'v-links': VueLinks
  },
  data () {
    return {
      msg: 'Dockerian JsUi Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
