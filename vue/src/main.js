// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as settings from './store/settings'
import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/css/iViewStyle.css'
import '@/css/elStyle.css'
import '@/css/vue.css'

Vue.config.productionTip = false
Vue.prototype.$log = console.log.bind(console)
Vue.use(iView)

settings.init(store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
