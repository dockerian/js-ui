// router/appRoutes.js - application routes

export const About = () => import('@/components/app/About')
export const HelloWorld = () => import('@/components/demo/HelloWorld')
export const Links = () => import('@/components/app/Links')
export const Login = () => import('@/components/app/Login')
export const Main = () => import('@/components/Main')
export const MessageBoard = () => import('@/components/app/MessageBoard')
export const Search = () => import('@/components/demo/Search')
export const Settings = () => import('@/components/app/Settings')
export const Usage = () => import('@/components/app/Usage')
export const WS = () => import('@/components/app/WS')

export const appRoutes = [
  {
    path: '/',
    redirect: { name: 'About' },
    alias: '/home',
    name: 'Home',
    component: Main
  },
  {
    path: '/p',
    name: 'Demo',
    component: WS,
    children: [
      {
        alias: '/demo',
        path: '/hello',
        name: 'Hello World',
        components: { perspective: HelloWorld },
        query: {
          lang: 'en'
        },
        meta: { bypassAuth: true }
      },
      {
        alias: '/find',
        path: '/search',
        name: 'Search',
        components: { perspective: Search },
        query: {
          keyword: 'test'
        }
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
    name: 'Message Board',
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
    alias: '/help',
    path: '/usage',
    name: 'Usage and Help',
    meta: { bypassAuth: true },
    component: Usage
  },
  {
    path: '/about',
    name: 'About',
    meta: { bypassAuth: true },
    component: About
  },
  {
    path: '*',
    name: 'Redirect',
    meta: { bypassAuth: true },
    component: Usage
  }
]
