<template>
  <div id="main">
    <v-workspace>
    </v-workspace>
  </div>
</template>

<script>
import Workspace from '@/components/app/WS'

export default {
  name: 'Main',
  components: {
    'v-workspace': Workspace
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
