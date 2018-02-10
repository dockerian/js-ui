import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import HelloWorld from '@/components/app/HelloWorld'
import Login from '@/components/app/Login'
import About from '@/components/About'

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
      path: '/hello',
      name: 'HelloWorld',
      meta: { bypassAuth: true },
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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

export default router
