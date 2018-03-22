<template>
  <div id="about">
    <img src="@/assets/vue.png" class="logo">
    <h1>{{ project.name }}</h1>
    <p>{{ project.description }}</p>
    <p>&starf;</p>
    <p>Release: {{ project.version }}</p>
    <div id="rest-info">
      <table>
        <tr v-for="(value, key) in rest" v-bind:key="key">
          <td class="rest-key">{{ key }}:</td>
          <td class="rest-url">
            <a v-bind:href="value"
              v-bind:title="value"
              target="_blank">{{ value }}</a>
          </td>
        </tr>
      </table>
    </div>
    <p>&starf;</p>
    <h3>Dev Team</h3>
    <div v-for="dev in project.developers" v-bind:key="dev">
      <v-mailto v-bind:contact="dev"></v-mailto>
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
  </div>
</template>

<script>
import Vue from 'vue'
import Mailto from '@/components/app/Mailto'
import Links from '@/components/app/Links'
import * as str from '@/utils/str'
import config from '@/config'

const {ver, ...rest} = config.settings.rest
const project = config.settings.project

export default {
  name: 'About',
  components: {
    'v-mailto': Mailto,
    'v-links': Links
  },
  props: {
  },
  data () {
    return {
      config,
      project,
      rest,
      restApiVersion: ver,
      vue: `Vue.js ${Vue.version}`
    }
  },
  methods: {
    mailto: function (s) {
      return str.contactToHTML(s)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#about {
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
