<template>
  <div class="header">
  <header id="header">
    <button id="btn-menu" class="btn-menu"
      v-on:click.stop="toggleAppMenu"
    />
  </header>
  </div>
</template>

<script>
import * as _const from '@/store/_constants'
import { mapGetters, mapMutations } from 'vuex'

var data = {
}

export default {
  name: 'Header',
  props: {
  },
  data () {
    return data
  },
  computed: {
    ...mapGetters({
      appMenuShown: _const.APP_MENU_SHOWN,
      userSignedIn: _const.USER_SIGNED_IN
    })
  },
  methods: {
    ...mapMutations({
      toggleAppMenu: _const.APP_MENU_SHOWN
    })
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #btn-menu {
    height: 31px; width: 31px;
    outline: none;
  }
  .btn-menu {
    background-color: transparent;
    background-image: url(../assets/icon_menu.svg);
    background-repeat: no-repeat;
    background-position: center;
    border: 0px dotted transparent;
    cursor: pointer;
    margin: 1px; padding: 1px;
    z-index: 100;
  }
  .header {
    background-color: white;
    height: 33px; margin: 0; padding: 0;
    top: 0; position: fixed;
    text-align: left;
    width: 100%;
  }
</style>
