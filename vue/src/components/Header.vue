<template>
  <div class="header">
  <header id="header">
    <button id="btn-menu" class="btn-menu"
      v-on:click.stop="toggleAppMenu"
    />
    <div class="logo">
    </div>
  </header>
  </div>
</template>

<script>
import * as _const from '@/store/_constants'
import { mapGetters } from 'vuex'

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
    toggleAppMenu: function () {
      this.$store.commit(_const.APP_MENU_SHOWN, !this.appMenuShown)
    }
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
    background-origin: content-box;
    background-position: center;
    background-size: 100%;
    border: 0px dotted transparent;
    cursor: pointer;
    margin: 2px 3px; padding: 1px;
    z-index: 100;
  }
  .header {
    /*
    // NOTE: DEBUG only
    border: 1px dotted red;
    */
    display: flex;
    flex-flow: row nowrap; /* flex-direction: row; flex-wrap: nowrap; */
    background-color: white;
    height: 35px; margin: 0; padding: 0;
    top: 0; position: fixed;
    text-align: left;
    width: 100%;
  }
  .logo {
    background-origin: content-box;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 90%;
    position: fixed; top: 0; right: 3px;
    height: 35px; width: 120px;
  }
</style>
