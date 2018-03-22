<template>
  <div id="links">
    <img src="@/assets/vue.png" class="logo">
    <h1>{{ title }}</h1>
    <h2> &#x1f41f; </h2>
    <div v-for="(category, key) in links" v-bind:key="key">
      <h2>{{ category.name }}</h2>
      <ul>
        <li v-for="(link, name) in category.links" v-bind:key="key+'-'+name">
          <a v-bind:href="link" target="_blank">{{ name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

const links = {
  essential: {
    name: 'Essential Links',
    links: {
      'Core Docs': 'https://vuejs.org',
      'Forum': 'https://forum.vuejs.org',
      'Community Chat': 'https://chat.vuejs.org',
      'Twitter': 'https://twitter.com/vuejs',
      '': ''
    }
  },
  ecosystem: {
    name: 'Ecosystem',
    links: {
      'vue-router': 'http://router.vuejs.org/',
      'vuex': 'http://vuex.vuejs.org/',
      'vue-loader': 'http://vue-loader.vuejs.org/',
      'awesome-vue': 'https://github.com/vuejs/awesome-vue',
      '': ''
    }
  }
}

export default {
  name: 'AppLinks',
  data () {
    return {
      links: links,
      title: `Vue.js ${Vue.version}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#links {
  overflow-y: scroll;
}
div#links::after {
  content: "";
  background-attachment: fixed;
  background-blend-mode: lighten;
  background-clip: content-box;
  background-image: url('../../assets/sng.png');
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 87%;
  opacity: 0.05;
  padding: 0px; margin: 0px;
  bottom: 0; left: 0; right: 0; top: 0;
  position: absolute;
  z-index: -1;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  border: 0; margin: 0px; padding: 0px;
}
img.logo {
  width: 25%;
}
</style>
