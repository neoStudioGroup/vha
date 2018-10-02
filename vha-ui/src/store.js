import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket_connect: false,
    command_value: 'ipconfig',
    command_code: '请选择一个项目',
    config: {
      "servePort": "",
      "choose": "",
      "projectPath": "",
      "openSoftware": ""
    },
    project: {},
    xml: {},
    plugins: {},
    UIprojectsStatus: ''
  },
  mutations: {
    runCmd (state, value) {
      this._vm.$socket.emit('CLIENT_CMD_RUN', value)
      state.command_value = value
      state.command_code += value
      state.command_code += "\n"
    }
  },
  actions: {
  }
})
