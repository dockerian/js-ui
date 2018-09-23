<template>
  <div id="avatar">
    <Poptip trigger="hover" placement="bottom-end" popper-class="sign-in-popup" v-model="signInOpen">
      <v-avatar
        v-if="signedIn"
        :username="fullName"
        :initials="initials"
        :title="`Signed in as [${alias}] ${fullName} <${email}>`"
        :size="31"
        >
      </v-avatar>
      <Button v-else type="text" title="Sign In">
        &nbsp;
      </Button>
      <div id="sign-in-popup" slot="content">
        <v-sign-in v-on:signedIn="signInOpen = false" />
      </div>
    </Poptip>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import Avatar from 'vue-avatar'
import SignIn from '@/components/user/SignIn'
import * as _const from '@/store/user/_constants'
import * as _constApp from '@/store/_constants'
import { mapGetters } from 'vuex'

Vue.use(iView)

export default {
  name: 'Avatar',
  components: {
    'v-avatar': Avatar,
    'v-sign-in': SignIn
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      alias: `user/${_const.ALIAS}`,
      email: `user/${_const.EMAIL}`,
      fullName: `user/${_const.FULL_NAME}`,
      initials: `user/${_const.INITIALS}`,
      signedIn: _constApp.USER_SIGNED_IN,
      userId: `user/${_const.USER_ID}`,
      users: `user/${_const.USERS}`
    }),
    signInOpen: {
      get: function () {
        return this.$store.state.user.signInOpen
      },
      set: function (newValue) {
        this.$store.commit(`user/${_const.SIGN_IN_OPEN}`, newValue)
      }
    }
  },
  methods: {
  },
  mounted: function () {
    this.$store.dispatch(`user/${_const.GET_USERS}`)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#avatar {
  cursor: pointer;
  margin: 0px 0px 0px 2px;
  padding: 0px;
}

.sign-in-popup {
}
</style>
