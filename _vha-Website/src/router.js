import Vue from 'vue'
import Router from 'vue-router'
import index from './pages/index.vue'
import aaa from './pages/aaa.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/',
      name: 'aaa',
      component: aaa
    }
  ]
})
