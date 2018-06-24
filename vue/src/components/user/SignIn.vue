<template>
  <div id="sign-in">
    <div v-for="(column, key) in columns" v-bind:key="key">
      <div v-if="column.show" class="sign-in-input">
        <div class="sign-in-title">
          {{ column.title }} :
        </div>
        <Input v-if="key === 'password'"
          class="sign-in-field"
          size="large"
          type="password"
          v-bind:name="key"
          v-bind:placeholder="`input ${column.description}`"
          v-model="signInUser[key]"
        ></Input>
        <AutoComplete v-else
          class="sign-in-field"
          size="large"
          v-bind:name="key"
          v-bind:clearable="true"
          v-bind:data="searchOptions[`${key}`]"
          v-bind:element-id="`sign-in-field-${key}`"
          v-bind:placeholder="`input ${column.description}`"
          v-bind:transfer="false"
          v-model="signInUser[key]"
          v-on:on-search="onSearch(`${key}`)"
          v-on:on-focus="onCheck"
          v-on:on-change="onCheck"
          v-on:on-blur="onCheck"
          >
        </AutoComplete>
      </div>
    </div>
    <div class="sign-in-errors">
      {{ signInOkay ? '' : 'Please match user id/alias to the full name.' }}
    </div>
    <div class="sign-in-button">
      <el-button type="primary" size="medium"
        title="Sign in"
        v-bind:disabled="emptyOrSameUser"
        v-on:click="signIn"
        >
        Sign In {{ `${ anotherUser ? 'as another user' : '' }` }}
      </el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import iView from 'iview'
import * as _const from '@/store/user/_constants'
import * as _constApp from '@/store/_constants'
import * as helper from '@/helper/userVm'
import { mapGetters } from 'vuex'

Vue.use(iView)

export default {
  name: 'SignIn',
  components: {
  },
  props: {
  },
  data () {
    return {
      input: '',
      columns: helper.columns,
      searchOptions: {},
      signInOkay: true,
      signInUser: {}
    }
  },
  computed: {
    anotherUser: {
      get: function () {
        return this.signedIn && (
          this.signInUser.alias !== this.user.alias ||
          this.signInUser.fullName !== this.user.fullName)
      }
    },
    emptyOrSameUser: {
      get: function () {
        return (this.signedIn &&
          this.signInUser.alias === this.user.alias &&
          this.signInUser.fullName === this.user.fullName) ||
          !this.signInUser.alias ||
          !this.signInUser.fullName
      }
    },
    ...mapGetters({
      signedIn: _constApp.USER_SIGNED_IN,
      users: `user/${_const.USERS}`,
      user: `user/${_const.USER}`
    })
  },
  methods: {
    onCheck: function () {
      for (let key of Object.keys(this.signInUser)) {
        this.signInUser[key] = String(this.signInUser[key]).trim()
      }
    },
    onSearch: function (key) {
      let query = this.signInUser[key]
      this.searchOptions[key] = helper.getAutoComplete(query, key, this.users)
    },
    signIn: async function () {
      this.signInOkay = await helper.signIn(this, this.signInUser)
    }
  },
  mounted: function () {
    this.signInUser = {
      ...this.user
    }
    this.searchOptions = Object.keys(
      this.columns).reduce((obj, key) => {
      obj[key] = []
      return obj
    }, {})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sign-in {
  min-width: 300px;
}
.sign-in-input {
  display: block;
  line-height: 150%;
  padding: 3pt 0pt;
}
.sign-in-button {
  display: block;
  text-align: right;
  margin: 9pt 0pt 7pt 0pt;
  padding: 0px;
}
.sign-in-errors {
  color: red;
  text-align: right;
}
.sign-in-field {
  font-size: 11pt;
  display: inline-block;
  width: 250px;
}
.sign-in-title {
  font-size: 11pt;
  display: inline-block;
  min-width: 75px;
  padding-right: 3pt;
  text-align: right;
  vertical-align: middle;
}
</style>
