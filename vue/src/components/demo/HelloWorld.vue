<template>
  <div id="hello">
    <h1>{{ msg }}</h1>
    <v-links />
  </div>
</template>

<script>
import AppLinks from '@/components/app/Links'

export default {
  name: 'HelloWorld',
  components: {
    'v-links': AppLinks
  },
  data () {
    return {
      msg: 'Hello Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hello {
}
h1, h2 {
  font-weight: normal;
}
</style>
