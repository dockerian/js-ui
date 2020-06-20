// router/index.js - application router

import Vue from 'vue'
import VueRouter from 'vue-router'

import { appRoutes } from './appRoutes'

// Fix console error on navigating to same route -
// Error: Avoided redundant navigation to current location
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
}

Vue.use(VueRouter)

export const scrollBehavior = (to, from, savedPosition) => {
  if (to && to.hash) return {
    selector: to.hash
  }
  if (to && to.meta && savedPosition) {
    to.meta.fromHistory = true
  }
  return savedPosition || { x: 0, y: 0 }
}

const router = new VueRouter({
  mode: 'history',
  // base: __dirname,
  base: process.env.BASE_URL,
  routes: appRoutes,
  scrollBehavior
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title = `${to.name}`
  next()
})

export default router
