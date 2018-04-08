<template>
  <div id="msg">
    <div id="msg-header">
      <v-message-header>
      </v-message-header>
    </div>
    <div class="msg-vue">
      <v-messages>
      </v-messages>
    </div>
  </div>
</template>

<script>
import MessageHeader from '@/components/appInfo/MessageHeader'
import Messages from '@/components/appInfo/Messages'

export default {
  name: 'MessageBoard',
  components: {
    'v-message-header': MessageHeader,
    'v-messages': Messages
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#msg {
  margin: 0pt 5pt;
  position: fixed; top: 33px;
  text-align: left;
}
div#msg::after {
  content: "";
  background-attachment: fixed;
  background-blend-mode: lighten;
  background-clip: content-box;
  background-image: url('../../assets/p_messages.png');
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 51%;
  opacity: 0.07;
  padding: 0px; margin: 0px;
  bottom: 0; left: 0; right: 0; top: 0;
  position: absolute;
  z-index: -1;
}
#msg-header {
  color: dimgray;
  background-color: white;
  border-bottom: 2px solid lightgray;
  position: fixed; top: 35px;
  height: 66px; width: 100%; padding-top: 15px;
  white-space: nowrap;
  z-index: 10;
}
.msg-vue {
  display: inline-flex;
  flex-flow: row wrap; /* flex-direction: row; flex-wrap: nowrap; */
  justify-content: space-between;
  align-items: flex-start;
  margin: 0px; padding: 5px 15px 0px 0px; width: 100%;
  position: relative; top: 63px;
  overflow-y: auto;
}
</style>
