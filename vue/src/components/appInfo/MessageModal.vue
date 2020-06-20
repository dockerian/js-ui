<template>
  <div name="modal">
    <el-dialog
      v-if="useElementUi"
      top="35px" width="90%"
      v-bind:okText="`OK`"
      v-bind:cancelText="`Cancel`"
      v-bind:center="true"
      v-bind:close-on-click-modal="true"
      v-bind:close-on-press-escape="true"
      v-bind:closable="true"
      v-bind:scrollable="true"
      v-bind:show-close="true"
      v-bind:modal="false"
      v-bind:modal-append-to-body="true"
      v-bind:visible="showMessages"
      v-on:close="showMessages = false"
      >
      <h2 class="msg-buttons-div" slot="title">
        Messages ({{ count }})
        <v-message-buttons>
        </v-message-buttons>
      </h2>
      <v-messages>
      </v-messages>
      <div class="msg-footer" slot="footer">
        {{ count }} messages
      </div>
    </el-dialog>
    <Modal
      v-else
      v-bind:okText="`OK`"
      v-bind:cancelText="`Cancel`"
      v-bind:closable="true"
      v-bind:scrollable="true"
      v-bind:styles="{top: '39px'}"
      v-bind:width="90"
      v-model="showMessages"
      title="Message Board">
      <h2 class="msg-buttons-div" slot="header">
        Messages ({{ count }})
        <v-message-buttons class="msg-buttons">
        </v-message-buttons>
      </h2>
      <v-messages>
      </v-messages>
      <div slot="footer">
        {{ count }} messages &#9679;
        {{ countNotAck }} acknowledgeable &#9679;
        {{ countErrors }} errors
      </div>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import { mapGetters } from 'vuex'
import * as _constApp from '@/store/_constants'
import * as _const from '@/store/appInfo/_constants'
import MessageButtons from '@/components/appInfo/MessageButtons'
import Messages from '@/components/appInfo/Messages'

Vue.use(Element, { locale })
Vue.use(iView)

export default {
  name: 'MessageModal',
  components: {
    'v-message-buttons': MessageButtons,
    // 'v-message-header': MessageHeader,
    'v-messages': Messages
  },
  props: {
  },
  data () {
    return {
      useElementUi: false
    }
  },
  computed: {
    ...mapGetters({
      count: `appInfo/${_const.COUNT}`,
      countErrors: `appInfo/${_const.COUNT_ERROR}`,
      countNotAck: `appInfo/${_const.COUNT_NOT_ACK}`
    }),
    showMessages: {
      get: function () {
        return this.$store.getters[_constApp.SHOW_APP_MESSAGES]
      },
      set: function (v) {
        this.$store.commit(_constApp.SHOW_APP_MESSAGES, v)
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
.msg-buttons-div {
  display: inline-block;
  line-height: 31px; text-align: left; vertical-align: baseline;
  padding: 0px; margin: 0px; width: 96.5%;
  position: relative;
}
.msg-buttons {
  position: absolute; top: 0px; right: 0px;
  text-align: right; width: 100%;
}
.msg-footer {
  text-align: right;
}
</style>
