<template>
  <h1
    v-bind:title="`${count} messages | ${countNotAck} acknowledgeable | ${countErrors} errors`">
    Message Board
    <Badge
      class-name="msg-count"
      v-bind:title="`${count} messages`"
      v-bind:count="count"
      >
      &nbsp;
    </Badge>
    <Badge
      class-name="msg-count-notAck"
      v-bind:count="countNotAck"
      >
      <Icon type="more" size="27" color="lightgray"
        v-bind:title="`${countNotAck}/${countErrors} acknowledgeable/error messages`"
      />&nbsp;
    </Badge>
    <Badge
      class-name="msg-count-error"
      v-bind:title="`${countErrors} error messages`"
      v-bind:count="countErrors"
      >
      &nbsp;
    </Badge>
    <div class="msg-buttons">
      <v-message-buttons>
      </v-message-buttons>
    </div>
  </h1>
</div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import { mapGetters } from 'vuex'
import * as _const from '@/store/appInfo/_constants'
import MessageButtons from '@/components/appInfo/MessageButtons'
import Messages from '@/components/appInfo/Messages'

Vue.use(iView)

export default {
  name: 'MessageHeader',
  components: {
    'v-message-buttons': MessageButtons,
    'v-messages': Messages
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      count: `appInfo/${_const.COUNT}`,
      countErrors: `appInfo/${_const.COUNT_ERROR}`,
      countNotAck: `appInfo/${_const.COUNT_NOT_ACK}`
    })
  },
  methods: {
    ackAll: function () {
      this.$store.dispatch(`appInfo/${_const.ACK_ALL}`)
    },
    clearAll: function (message) {
      this.$store.dispatch(`appInfo/${_const.CLEAR}`)
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg-buttons {
  display: inline;
  position: absolute; top: 13px; right: 15px;
  padding: 0px 0px 0px 9px;
}
.msg-copy-all {
  padding: 0px; margin: 0px;
}
</style>
