<template>
  <div id="msg">
    <!--NOTE: DEBUG only
    <h1>Messages</h1>
    <br/>...<br/>..<br/>...<br/>...<br/>...<br/>
    ..end...
    -->
  </div>
</template>

<script>
export default {
  name: 'MessageBoard',
  components: {
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
</style>
