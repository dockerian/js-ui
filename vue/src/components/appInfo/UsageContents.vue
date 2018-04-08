<template>
  <!--
  <div id="help-panel" v-html="usageAndHelp">
  </div>
  -->
  <div class="help-content">
    <v-markdown
      v-bind:breaks="false"
      v-bind:source="usageAndHelp"
      >
    </v-markdown>

    <div class="footer-notes">
      <Icon type="star" size="11" />
      Powered by
      <a href="https://www.npmjs.com/package/vue-markdown" target="_blank">
        vue-markdown
      </a>
    </div>
  </div>
  <!--
  -->
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import { mapGetters } from 'vuex'
import * as _const from '@/store/_constants'
import VueMarkdown from 'vue-markdown'

Vue.use(iView)

export default {
  name: 'UsageContents',
  components: {
    'v-markdown': VueMarkdown
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      usageAndHelp: _const.USAGE_AND_HELP
    })
  },
  methods: {
  },
  mounted: function () {
    this.$store.dispatch(_const.USAGE_AND_HELP)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#help-panel, .help-content {
  display: block;
  font-size: medium;
  height: 100%; width: 100%; position: relative;
  padding: 5px 1em 150px 1.5em; margin: 11px 5px 0px -5px;
  white-space: normal;
  overflow-y: auto;
}
ul li {
  margin-left: 2em;
}

.footer-notes {
  font-size: 9pt;
  margin: 1em 0px;
}

h2, h3 {
  color: dimgray;
  line-height: 120%;
  padding: 5pt 0pt 5pt 0pt;
}
p {
  text-indent: 2em;
}
</style>
