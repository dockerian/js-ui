<template>
  <div class="msg-buttons-div">
    <Button type="error" class="msg-button-clearAll"
      title="clear all messages"
      v-on:click="clearAll">
      Clear
    </Button>
    <Button type="warning" class="msg-button-ackAll"
      title="acknowledge all messages"
      v-bind:disabled="countNotAck <= 0"
      v-on:click="ackAll">
      Acknowledge All
    </Button>
    <Button type="text" class="msg-copy-all" title="copy messages to clipboard"
      v-on:click="copyData">
      <Icon type="ios-paper" size="35" color="lightslategray" class="msg-copy-ico">
      </Icon>
    </Button>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import { mapGetters } from 'vuex'
import * as _const from '@/store/appInfo/_constants'
import * as helper from '@/helper/vm'

Vue.use(iView)

export default {
  name: 'MessageButtons',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      countNotAck: `appInfo/${_const.COUNT_NOT_ACK}`,
      messages: `appInfo/${_const.MESSAGES}`
    })
  },
  methods: {
    ackAll: function () {
      this.$store.dispatch(`appInfo/${_const.ACK_ALL}`)
    },
    clearAll: function (message) {
      this.$store.dispatch(`appInfo/${_const.CLEAR}`)
      let content = 'Important and not-acknowledged messages remain.'
      this.$Message.success({content, duration: 5})
    },
    copyData: function () {
      return helper.copyMessage(this, this.messages)
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg-buttons-div {
  display: inline;
  padding: 0px 0px 0px 9px;
}
.msg-copy-all {
  padding: 0px; margin: 0px;
}
</style>
