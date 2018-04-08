<template>
  <div id="main">
    <v-workspace>
    </v-workspace>
  </div>
</template>

<script>
import * as appRoutes from '@/router/appRoutes'

export default {
  name: 'Main',
  components: {
    'v-workspace': appRoutes.WS
  },
  props: {
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {
}
</style>
