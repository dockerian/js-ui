// router/index.js - application router

import Vue from 'vue'
import Router from 'vue-router'

import { appRoutes } from './appRoutes'

Vue.use(Router)

const router = new Router({
  base: __dirname,
  routes: appRoutes,
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title = `${to.name}`
  next()
})

export default router
