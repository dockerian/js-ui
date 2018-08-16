<!-- FederatedSearch perspective :: Search -->
<template>
  <div id="fsearch">
    <div id="fsearch-img"></div>
    <div id="fsearch-div">
      <div id="fsearch-p">
        <!--NOTE: DEBUG only
        <h1>Federated Search</h1>
        <br/>...<br/>..<br/>...<br/>...<br/>...<br/>
        ..end...
        -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
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
#fsearch {
  /*
  // NOTE: DEBUG only
  border: 1px dotted red;
  */
  height: 100vh; width: 100%;
  padding: 1px; top: -17px; padding-bottom: 97px;
  position: fixed;
}
#fsearch-img {
  /*
  // NOTE: DEBUG only
  border: 1px dotted green;
  */
  content: "";
  background-attachment: scroll;
  background-blend-mode: lighten;
  background-clip: content-box;
  background-image: url('../../assets/p_search.png');
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 33%;
  opacity: 0.05;
  padding: 0px; margin: 0px; padding-bottom: 85px;
  bottom: 0; left: 0; right: 0; top: 0;
  height: 100%; width: 100%;
  position: absolute;
  z-index: -1;
}
#fsearch-div {
  /*
  // NOTE: DEBUG only
  border: 1px dotted blue;
  */
  height: 100vh; width: 100%;
  padding: 0px; margin-top: 0px; padding-bottom: 97px;
  bottom: 0; left: 0; right: 0; top: 0;
  opacity: 1;
}
#fsearch-p {
  /*
  // NOTE: DEBUG only
  border: 1px dotted gold;
  */
  height: 100%; width: 100%;
  padding: 0px; margin: 0px;
  position: relative;
  overflow-y: none;
}
</style>
