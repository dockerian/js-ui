<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-links />
  </div>
</template>

<script>
import VueLinks from '@/components/Links'

export default {
  name: 'HelloWorld',
  components: {
    'v-links': VueLinks
  },
  data () {
    return {
      msg: 'Dockerian JsUi Test Vue.js App'
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
