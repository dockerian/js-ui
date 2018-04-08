<template>
  <div name="modal">
    <Modal
      v-bind:okText="`OK`"
      v-bind:cancelText="`Cancel`"
      v-bind:closable="true"
      v-bind:scrollable="true"
      v-bind:styles="{top: '39px', bottom: '39px', height: '85vh'}"
      v-bind:width="85"
      v-bind:modal="false"
      v-bind:modal-append-to-body="true"
      v-model="showAbout"
      v-on:on-cancel="showAbout = false"
      v-on:on-ok="showAbout = false"
      title="About">
      <h2 slot="header">
        About
      </h2>
      <v-about>
      </v-about>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import About from '@/components/appInfo/About'

Vue.use(iView)

export default {
  name: 'AboutModal',
  components: {
    'v-about': About
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
    showAbout: {
      get: function () {
        return this.visible
      },
      set: function () {
        this.$emit('onCloseAbout')
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
