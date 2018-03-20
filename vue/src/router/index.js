// router/index.js - application router

import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Settings from '@/components/app/Settings'
import MessageBoard from '@/components/app/MessageBoard'
import HelloWorld from '@/components/demo/HelloWorld'
import Search from '@/components/demo/Search'
import Login from '@/components/app/Login'
import Links from '@/components/app/Links'
import About from '@/components/app/About'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'About' },
      name: 'Main',
      component: Main
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Main,
      children: [
        {
          path: '/hello',
          name: 'Hello World',
          meta: { bypassAuth: true },
          component: HelloWorld
        },
        {
          path: '/search',
          name: 'Search',
          component: Search
        }
      ]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/messages',
      name: 'MessageBoard',
      component: MessageBoard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/links',
      name: 'Links',
      meta: { bypassAuth: true },
      component: Links
    },
    {
      path: '/about',
      name: 'About',
      meta: { bypassAuth: true },
      component: About
    }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title = `${to.name}`
  next()
})

export default router
