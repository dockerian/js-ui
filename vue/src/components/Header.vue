<template>
  <div v-bind:class="`header env-${env}`">
  <header id="header">
    <button id="btn-menu" class="btn-menu"
      v-on:click.stop="toggleAppMenu"
    />
    <div class="logo_product">
    </div>
    <div class="btn-title">
      <v-notification class="btn-messages" position="header">
      </v-notification>
      JsUi Demo
    </div>
    <div class="logo_user">
    </div>
  </header>
  </div>
</template>

<script>
import Notification from '@/components/appInfo/Notification'
import * as _const from '@/store/_constants'
import { mapGetters } from 'vuex'
import config from '@/config'

export default {
  name: 'Header',
  components: {
    'v-notification': Notification
  },
  props: {
  },
  data () {
    return {
      env: config.settings.env
    }
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
    margin: 2px 5px 3px 50px; padding: 1px;
    z-index: 100;
  }
  .btn-messages {
    display: inline;
    position: fixed; right: 125px;
  }
  .btn-title {
    cursor: default;
    display: inline-block;
    height: 35px; font-size: 20px; text-align: left; vertical-align: top;
    margin: 3px 0px 3px 125px; padding: 1px; width: 121px;
    outline: none; user-select: none;
    position: fixed; top: 0px; right: 39px;
  }
  .env-dev {
    background-color: lavender;
  }
  .env-test {
    background-color: khaki;
  }
  .env-prod {
    background-color: white;
  }
  .header {
    /*
    // NOTE: DEBUG only
    border: 1px dotted red;
    */
    display: flex;
    flex-flow: row nowrap; /* flex-direction: row; flex-wrap: nowrap; */
    height: 35px; margin: 0; padding: 0;
    top: 0; position: fixed;
    text-align: left;
    width: 100%;
  }
  .logo_product {
    background-image: url(../assets/vue.png);
    background-origin: content-box;
    background-position: left;
    background-repeat: no-repeat;
    background-size: 90%;
    position: fixed; top: 2px; left: 7px;
    height: 33px; width: 33px;
  }
  .logo_user {
    cursor: pointer;
    background-image: url(../assets/user.gif);
    background-origin: content-box;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 90%;
    position: fixed; top: 3px; right: 7px;
    height: 33px; width: 35px;
  }
</style>
