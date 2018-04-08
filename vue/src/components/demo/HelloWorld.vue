<!-- HelloWorld perspective -->
<template>
  <div id="demo">
    <div id="demo-img"></div>
    <div id="demo-div">
      <div id="demo-p">
        <h1>Hello World for Vue.js</h1>
        <!--NOTE: DEBUG only
        <br/>...<br/>..<br/>...<br/>...<br/>...<br/>
        ..end...
        -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
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
    // NOTE: component within Tabs will be mounted multiple times
    //       by the number of TabPane in the Tabs.
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#demo {
  /*
  // NOTE: DEBUG only
  border: 1px dotted red;
  */
  height: 100vh; width: 100%;
  padding: 1px; top: -17px; padding-bottom: 97px;
  position: fixed;
}
#demo-img {
  /*
  // NOTE: DEBUG only
  border: 1px dotted green;
  z-index: -1;
  */
  content: "";
  background-attachment: scroll;
  background-blend-mode: lighten;
  background-clip: content-box;
  background-image: url('../../assets/p_demo.svg');
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 33%;
  opacity: 0.07;
  padding: 0px; margin: 0px; padding-bottom: 85px;
  bottom: 0; left: 0; right: 0; top: 0;
  height: 100%; width: 100%;
  position: absolute;
}
#demo-div {
  /*
  // NOTE: DEBUG only
  border: 1px dotted blue;
  */
  height: 100vh; width: 100%;
  padding: 0px; margin-top: 0px; padding-bottom: 97px;
  bottom: 0; left: 0; right: 0; top: 0;
  opacity: 1;
}
#demo-p {
  /*
  // NOTE: DEBUG only
  border: 1px dotted gold;
  */
  height: 100%; width: 100%;
  padding: 0px; margin: 0px;
  position: relative;
  overflow-y: scroll;
}
</style>
