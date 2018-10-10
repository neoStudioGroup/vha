import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://127.0.0.1:9876/')

import axios from 'axios'
Vue.prototype.$ajax = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
