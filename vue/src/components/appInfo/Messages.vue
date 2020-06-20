<template>
  <div id="messages">
    <Alert
      v-for="(msg, index) in messages"
      v-on:on-close="clear(msg)"
      v-bind:closable="!msg.important && !msg.notAcknowledged"
      v-bind:class="`msg-alert ${ msg.type } ${ msg.getAttributes() }`"
      v-bind:type="getAlertType(msg)"
      v-bind:show-icon="true"
      v-bind:key="msg.uuid"
      >
      <Icon v-if="msg.important" type="md-paper-plane" slot="icon" />
      <Icon v-if="msg.type === 'debug'" type="md-star" color="dimgray" slot="icon" />
      <Icon v-if="msg.type === 'fatal'" type="md-warning" slot="icon" />
      <Icon v-if="msg.notAcknowledged" type="md-flag" color="palevioletred" slot="icon" />
      <div
        class="msg-title"
        v-bind:title="index"
        >
        {{ msg.datetimeLocal }} &lt;{{ msg.type }}&gt;
        <div class="msg-title-copy">
          <Button
            title="copy this message to clipboard"
            type="text" icon="ios-paper" shape="circle" size="small"
            v-on:click="copyData(msg)">
          </Button>
        </div>
        <div class="msg-title-ack">
          <Button
            title="aknowledge this message"
            type="text" icon="ios-pricetag" shape="circle" size="small"
            v-if="msg.notAcknowledged"
            v-on:click="ack(msg)">
          </Button>
        </div>
      </div>
      <div class="msg-desc" slot="desc">
        {{ msg.datetime }} - {{ msg.message }}
      </div>
    </Alert>
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
  name: 'Messages',
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
      messages: `appInfo/${_const.MESSAGES}`
    })
  },
  methods: {
    ack: function (message) {
      this.$store.dispatch(`appInfo/${_const.ACK}`, message.uuid)
    },
    clear: function (message) {
      this.$store.dispatch(`appInfo/${_const.DEL_MESSAGE}`, message.uuid)
    },
    copyData: function (message) {
      return helper.copyMessage(this, message)
    },
    getAlertType: function (message) {
      return helper.getAlertType(message)
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#messages {
  /*
  // NOTE: DEBUG only
  background-color: blue;
  */
  display: inline-flex;
  flex-flow: row wrap; /* flex-direction: row; flex-wrap: nowrap; */
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%; width: 100%;
  overflow: auto;
}
.debug {
  background-color: gainsboro;
}
.msg-alert {
  padding: 5px 5px 7px 65px; margin: 5px 7px 0px 0px;
  width: 24%;
}
@media all and (max-width: 800px) {
  .msg-alert {
    width: 100%;
  }
}
@media all and (min-width: 800px) and (max-width: 1520px) {
  .msg-alert {
    width: 49%;
  }
}
@media all and (min-width: 1520px) and (max-width: 1960px) {
  .msg-alert {
    width: 32.5%;
  }
}
.msg-desc {
  text-align: left;
}
.msg-title {
  position: relative;
}
.msg-title-ack {
  position: absolute; top: -1px; right: 3px;
  padding: 0px; margin: 0px;
}
.msg-title-copy {
  position: absolute; top: -1px; right: 27px;
  padding: 0px; margin: 0px;
}
</style>
