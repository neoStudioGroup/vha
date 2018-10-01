import Vue from 'vue'
import Router from 'vue-router'
import index from './pages/index.vue'
import command from './pages/command.vue'
import project from './pages/project.vue'
  import cmd from './pages/project/cmd.vue'
  import plugin from './pages/project/plugin.vue'
  import info from './pages/project/info.vue'
  import icon from './pages/project/icon.vue'
  import splash from './pages/project/splash.vue'
  import keystore from './pages/project/keystore.vue'
  import bindkeystore from './pages/project/bindkeystore.vue'
import components from './pages/components.vue'
import native from './pages/native.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/project'
    },
    {
      path: '/command',
      name: 'command',
      component: command
    },
    {
      path: '/project',
      name: 'project',
      component: project,
      children: [
        {
          path: 'cmd',
          component: cmd
        },
        {
          path: 'plugin',
          component: plugin
        },
        {
          path: 'info',
          component: info
        },
        {
          path: 'icon',
          component: icon
        },
        {
          path: 'splash',
          component: splash
        },
        {
          path: 'keystore',
          component: keystore
        },
        {
          path: 'bindkeystore',
          component: bindkeystore
        }
      ]
    },
    {
      path: '/components',
      name: 'components',
      component: components
    },
    {
      path: '/native',
      name: 'native',
      component: native
    }
  ]
})
