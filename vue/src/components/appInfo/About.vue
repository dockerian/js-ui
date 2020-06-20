<template>
  <div id="about">
    <img src="@/assets/vue.png" class="logo">
    <h1>{{ project.name }}</h1>
    <p>{{ project.description }}</p>
    <p>&starf;</p>
    <p>
      Release: {{ project.version }}
      <Button
        class="btn-debug" type="text"
        v-bind:title="`Copy config for '${env}' env`"
        v-show="env !== 'prod'"
        v-on:click="debug">
        <Icon type="ios-paper" size="21" color="lightslategray">
        </Icon>
      </Button>
    </p>
    <div id="rest-info">
      <table>
        <tr v-for="(value, key) in rest" v-bind:key="key">
          <td class="rest-key">{{ key }}:</td>
          <td class="rest-url"
            v-bind:style="`max-width: ${viewPortSize.width * .75}px;`">
            <a v-bind:href="`${value}/info`" :alt="value" :title="value" target="_blank">
              {{ value }}
            </a>
          </td>
        </tr>
      </table>
    </div>
    <p>&starf;</p>
    <h3>Dev Team</h3>
    <div v-for="dev in project.developers" v-bind:key="dev">
      <v-mailto
        v-bind:contact="dev"
        v-bind:key="dev">
      </v-mailto>
    </div>
    <!--
    <div v-for="dev in project.developers"
      v-bind:key="dev"
      v-bind:title="`email to ${dev}`"
      v-html="mailto(dev)"
      >
    </div>
    -->
    <p>&starf;</p>
    <!--
    <v-links/>
    -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as _const from '@/store/_constants'
import * as appRoutes from '@/router/appRoutes'
import * as helper from '@/helper/vm'
import * as str from '@/utils/str'
import Mailto from '@/components/app/Mailto'
import config from '@/config'

const { apiVersion, ...rest } = config.settings.rest
const project = config.settings.project

export default {
  name: 'About',
  components: {
    /* eslint-disable-next-line */
    'v-links': appRoutes.Links,
    'v-mailto': Mailto
  },
  props: {
  },
  data () {
    return {
      config,
      env: config.settings.env,
      project,
      rest,
      restApiVersion: apiVersion,
      vue: `Vue.js ${Vue.version}`
    }
  },
  computed: {
    ...mapGetters({
      viewPortSize: _const.VIEW_PORT_SIZE
    })
  },
  methods: {
    debug: function () {
      helper.copyConfig(this)
    },
    mailto: function (s) {
      return str.contactToHTML(s)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#about {
  font-size: medium;
  overflow-y: scroll;
  text-align: center;
}
#rest-info {
  display: inline-block; max-width: 100%;
  text-align: center;
}
#rest-info table {
  border: 0px none; max-width: 100%;
  text-overflow: ellipsis;
}
.rest-key {
  text-align: right;
  white-space: nowrap;
}
.rest-url {
  max-width: 330px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.btn-debug {
  height: 31px; width: 31px;
  padding: 0px; margin: 0px;
}
h1, h2, h3 {
  font-weight: normal;
}
img {
  border: 0; margin: 0px; padding: 0px;
}
img.logo {
  width: 25%;
}
</style>
