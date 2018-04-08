<template>
  <div class="notification">
    <div class="message-inline"
      v-bind:title="msg ? msg.message : ''"
      v-if="position === 'footer'">
      <div
        v-bind:class="`message msg-${msg.type}`"
        v-if="hasMessages">
        {{ msg ? msg.datetimeLocal : '' }}
        ~
        {{ msg ? msg.message : '' }}
      </div>
      <button
        id="btn-ellipsis"
        v-bind:class="btnClass"
        v-on:click="openMessages"
      />
    </div>
    <div class="btn-group" v-else>
      <Button
        type="text" class="btn-msg" title="MessageBoard"
        v-on:click="openMessages">
        <Icon type="android-notifications" size="23" color="lightslategray">
        </Icon>
        <Badge
          v-if="allowModal"
          class-name="msg-count-notAck-pointer"
          v-bind:count="countNotAck"
          >&nbsp;
        </Badge>
        <Badge
          v-if="allowModal"
          class-name="msg-count-error-pointer"
          v-bind:title="`${countErrors} error messages`"
          v-bind:count="countErrors"
          >&nbsp;
        </Badge>
      </Button>
      <Button class="btn-help" type="text"
        title="Usage and Help"
        v-bind:disabled="$route.path === '/usage'"
        v-on:click="usageVisible = true">
        <Icon type="help-circled" size="21" color="lightslategray">
        </Icon>
      </Button>
      <Button class="btn-about" type="text"
        title="About"
        v-bind:disabled="$route.path === '/about'"
        v-on:click="aboutVisible = true">
        <Icon type="information-circled" size="21" color="lightslategray">
        </Icon>
      </Button>
    </div>
    <v-about-modal
      v-bind:visible="aboutVisible"
      v-on:onCloseAbout="aboutVisible = false">
    </v-about-modal>
    <v-usage-modal
      v-bind:visible="usageVisible"
      v-on:onCloseUsage="usageVisible = false">
    </v-usage-modal>
    <v-message-modal>
    </v-message-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import { mapGetters } from 'vuex'
import * as _constApp from '@/store/_constants'
import * as _const from '@/store/appInfo/_constants'
import AboutModal from '@/components/appInfo/AboutModal'
import UsageModal from '@/components/appInfo/UsageModal'
import MessageModal from '@/components/appInfo/MessageModal'

Vue.use(iView)

export default {
  name: 'Notification',
  components: {
    'v-about-modal': AboutModal,
    'v-usage-modal': UsageModal,
    'v-message-modal': MessageModal
  },
  props: {
    position: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      aboutVisible: false,
      usageVisible: false
    }
  },
  computed: {
    ...mapGetters({
      countErrors: `appInfo/${_const.COUNT_ERROR}`,
      countNotAck: `appInfo/${_const.COUNT_NOT_ACK}`,
      hasMessages: `appInfo/${_const.HAS_MESSAGE}`,
      msg: `appInfo/${_const.LATEST_MESSAGE}`
    }),
    allowModal: {
      get: function () {
        return this.$route.path !== '/messages'
      }
    },
    btnClass: {
      get: function () {
        let postfix = this.countNotAck > 0 ? '-more' : (this.countErrors > 0 ? '-error' : '')
        return 'btn-ellipsis' + postfix
      }
    }
  },
  methods: {
    openMessages: function () {
      if (this.allowModal) {
        this.$store.commit(_constApp.SHOW_APP_MESSAGES, true)
      }
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  cursor: pointer !important;
}
.btn-ellipsis, #btn-ellipsis {
  background-color: transparent;
  background-image: url(../../assets/icon_ellipsis.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 0px dotted transparent;
  cursor: pointer;
  display: inline-block;
  height: 8px; width: 27px;
  margin: 2px 0px 3px 5px; padding: 0px;
  text-align: right;
  vertical-align: middle;
  position: relative;
  outline: none;
}
.btn-ellipsis-error {
  background-image: url(../../assets/icon_ellipsis.gif) !important;
  height: 8px !important; width: 37px !important;
  margin: 3px 0px 3px 5px !important;
}
.btn-ellipsis-more {
  background-image: url(../../assets/icon_ellipsis_color.gif) !important;
  height: 25px !important; width: 45px !important;
  margin: 2px 0px 3px 5px !important;
}
.btn-group {
  display: inline;
  height: 31px; width: 151px;
  padding: 0px; margin: 0px;
  vertical-align: top;
}
.btn-about {
  cursor: pointer;
  margin: 3px 7px 0px 1px; padding: 0px;
}
.btn-help {
  cursor: pointer;
  margin: 3px 3px 0px 1px; padding: 0px;
}
.btn-msg {
  cursor: pointer;
  margin: 2px 15px 0px 0px; padding: 0px;
}
.message {
  cursor: default;
  display: inline;
  font-style: italic;
  height: 28px; line-height: 28px;
  padding: 1px 3px 5px 5px;
  max-width: 25vh; width: 25vh;
  overflow: hidden; text-overflow: ellipsis;
  vertical-align: top;
  position: relative;
}
@media all and (max-width: 640px) {
  .message {
    display: none;
  }
}
.message-inline {
  display: inline;
  height: 28px; line-height: 28px;
  padding: 0px 0px 5px 0px; margin: 0px;
  vertical-align: top;
}
.msg-info {
  color: darkblue;
}
.msg-error, .msg-fatal {
  font-weight: bold;
  color: darkred;
}
.msg-warn {
  font-weight: bold;
  color: darkkhaki;
}
.notification {
  cursor: default;
  display: inline-flex;
  flex-flow: row nowrap; /* flex-direction: row; flex-wrap: nowrap; */
  justify-content: flex-end;
  align-content: flex-start;
  align-items: center;
  height: 28px; line-height: 28px;
  margin: 0px; padding: 0px;
  position: absolute;
  vertical-align: middle;
  text-overflow: ellipsis;
  text-align: right;
}
</style>
