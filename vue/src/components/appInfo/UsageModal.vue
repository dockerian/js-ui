<template>
  <div name="modal">
    <Modal
      v-bind:okText="`OK`"
      v-bind:cancelText="`Cancel`"
      v-bind:closable="true"
      v-bind:scrollable="true"
      v-bind:styles="{top: '39px', bottom: '39px', height: 'auto'}"
      v-bind:width="85"
      v-bind:modal="false"
      v-bind:modal-append-to-body="true"
      v-model="showUsage"
      v-on:on-cancel="showUsage = false"
      v-on:on-ok="showUsage = false"
      title="Usage and Help">
      <h2 slot="header">
        Usage and Help
      </h2>
      <v-usage-contents>
      </v-usage-contents>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import UsageContents from '@/components/appInfo/UsageContents'

Vue.use(iView)

export default {
  name: 'UsageModal',
  components: {
    'v-usage-contents': UsageContents
  },
  props: {
    visible: {
      default: false,
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  computed: {
    showUsage: {
      get: function () {
        return this.visible
      },
      set: function () {
        this.$emit('onCloseUsage')
      }
    }
  },
  methods: {
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
