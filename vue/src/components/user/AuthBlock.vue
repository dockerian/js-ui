<template>
<div class="not-logged-in">
  <div class="background"></div>
  <p>
    Please
    <Button
      type="primary"
      v-on:click="setSignInOpen(true)"
      >
      Sign In
    </Button>
    to access this perspective
  </p>
</div>
</template>

<script>
import * as _const from '@/store/user/_constants'
import { mapMutations } from 'vuex'

import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })

export default {
  name: 'AuthBlock',
  methods: {
    ...mapMutations('user', {
      setSignInOpen: _const.SIGN_IN_OPEN
    })
  }
}
</script>

<style scoped>
.not-logged-in .background {
  background-image: url('../../assets/p_authlock.png');
  background-attachment: scroll;
  background-position: center;
  background-repeat: no-repeat;
  background-origin: content-box;
  background-clip: content-box;
  background-size: 30%;
  position: absolute;
  height: 100vh;
  width: 100vw;
  opacity: .3;
  z-index: -1;
}

.not-logged-in > p {
  font-size: 18pt;
  padding-top: 10%;
  color: darkred;
}
</style>
