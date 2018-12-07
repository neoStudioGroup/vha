<style lang="stylus">
@import "./assets/stylus/reset.styl"
@import "./assets/stylus/ionicons.styl"
@import "./assets/stylus/global.styl"

#app
  height 100%
  >.ui-header
    box-shadow 0 2px 8px rgba(0,0,0,.06)
    z-index 10
    >.ant-menu
      line-height 61px
  >.ui-content
    position relative
  >.ui-footer
    display flex
    padding 0
    z-index 10
    font-size 12px
    box-shadow 0 -2px 8px rgba(0,0,0,.06)
    background-color #fff
    div
      cursor pointer
      padding 6px 12px
      display inline-block
      font-size 14px
      transition all 200ms
      span
        margin-left 6px
      &:hover
        background-color #e0e5ed

</style>
--------------------------------------------------------------------------------
<template>
  <div id="app" class="_df _fdc">
    
    <div class="_UI-mask" style="z-index:11" v-if="!$store.state.socket_connect">
      <div class="ui-m-box">
        <p>未连接服务器</p>
      </div>
    </div>
    
    <div class="ui-header">
      <a-menu v-model="current" mode="horizontal" @click="onClick">
        <a-menu-item key="command">
          <a-icon type="code" />
          终端
        </a-menu-item>
        <a-menu-item key="project">
          <a-icon type="folder-open" />
          项目
        </a-menu-item>
        <a-menu-item key="components">
          <a-icon type="appstore" />
          模板市场
        </a-menu-item>
        <a-menu-item key="native">
          <a-icon type="mobile" />
          组件市场
        </a-menu-item>
        <!-- <a-menu-item key="tutorial" style="float:right">
          <a-icon type="mobile" />
          官方教程
        </a-menu-item>
        <a-menu-item key="compmarket" style="float:right">
          <a-icon type="mobile" />
          组件商城
        </a-menu-item>
        <a-menu-item key="templatemarket" style="float:right">
          <a-icon type="mobile" />
          模板商城
        </a-menu-item>
        <a-menu-item key="templatemarket" style="float:right">
          <a-icon type="mobile" />
          云数据库
        </a-menu-item> -->
      </a-menu>
    </div>
    <div class="ui-content _flexYauto">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="ui-footer">
      <div>
        <a-icon type="home" />
      </div>
      <div @click="visible=true">
        <a-icon type="setting" />
      </div>
      <div class="_ownRowHide" style="max-width:300px;cursor:auto">
        <a-icon type="folder" /> 
        <span>{{$store.state.config.projectPath + '\\' + $store.state.config.choose}}</span>
      </div>
      <div style="flex:1">
        <a-icon type="info-circle-o" />
        <span>日志</span>
      </div>
      <div style="margin-left:auto" @click="onInfo">
        <span>v0.0.1</span>
      </div>
    </div>
    
    <UI-setting :visible='visible' @onClose='onClose'></UI-setting>
    
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
import UISetting from "./components/setting"
export default {
  name: 'App',
  beforeCreate() {
    //实例创建之前
  },
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
      current: ['project'],
      visible: false
    }
  },
  components: {
    //组件 - 引入或定义
    UISetting
  },
  computed: {
    //计算 - 缓存结果,变动时执行
  },
  sockets:{
    connect: function(){
      console.log('服务器 - 连接成功', 'SERVER_CONNECT')
      this.$store.state.socket_connect = true
      this.$socket.emit('CLIENT_GET_CONFIG')
      this.$socket.emit('CLIENT_GET_PROJECT')
      
      //100毫秒后请求资源信息
      setTimeout(() => {
        this.$store.state.command_code = this.$store.state.config.projectPath + "\\" + this.$store.state.config.choose + ">"
        if (this.$store.state.config.choose) {
          this.$socket.emit('CLIENT_GET_XML')//读取XML信息
          this.$socket.emit('CLIENT_GET_PLUGINS')//读取PLUGINS信息
        }
      }, 100)
    },
    disconnect: function(){
      console.log('服务器 - 断开连接', 'SERVER_DISCONNECT')
      this.$store.state.socket_connect = false
      this.$message.error('与Socket服务器断开连接')
    },
    SERVER_CMD_DATA: function(val){
      console.log('服务器 - 返回CMD数据', 'SERVER_CMD_DATA')
      this.$store.state.command_code += val
    },
    SERVER_CMD_END: function(){
      console.log('服务器 - CMD结束事件', 'SERVER_CMD_END')
      setTimeout(() => {
        if (this.$store.state.command_nexReload) {
          this.$socket.emit('CLIENT_GET_PROJECT')//可能修改了路径, 重新获取项目子目录
          this.$socket.emit('CLIENT_GET_XML')//读取XML信息
          this.$socket.emit('CLIENT_GET_PLUGINS')//读取PLUGINS信息
          this.$store.state.command_nexReload = false
        }
        
        this.$store.state.command_state = false
        this.$store.state.command_code += "\n"
        this.$store.state.command_code += this.$store.state.config.projectPath + "\\" + this.$store.state.config.choose + ">"
      }, 50)
    },
    SERVER_SND_CONFIG: function(val){
      console.log('服务器 - 返回配置信息', 'SERVER_SND_CONFIG', val)
      if (!val)
        return
      this.$store.state.config = val
    },
    SERVER_SND_PROJECT: function(val){
      console.log('服务器 - 返回项目信息', 'SERVER_SND_PROJECT', val)
      if (!val)
        return
      this.$store.state.project = val
    },
    SERVER_SND_XML: function(val){
      console.log('服务器 - 返回XML文件信息', 'SERVER_SND_XML', val)
      if (!val)
        return
      this.$store.state.xml = val
      this.$store.state.xml.widget.description = this.$store.state.xml.widget.description.replace(/(^\s*)|(\s*$)/g, "")
    },
    SERVER_SND_PLUGINS: function(val){
      console.log('服务器 - 返回插件信息', 'SERVER_SND_PLUGINS', val)
      if (!val)
        return
      this.$store.state.plugins = val
    }
  },
  methods: {
    //方法 - 每次进入页面创建
    onClick: function (item, key, keyPath) {
      // console.log(item.key, key, keyPath)
      this.$router.push("/" + item.key)
    },
    onInfo: function () {
      const h = this.$createElement
      this.$info({
        title: '关于vha(vue-Hybrid-App)',
        content: h('div',{}, [
          h('p', '　'),
          h('p', 'neoStudioGroup团队出品'),
          h('p', '当前版本 0.0.1'),
        ]),
        onOk() {},
      });
    },
    onClose: function () {
      this.visible = false
    }
  },
  watch: {
    //观察 - 数据或方法
  },
  created() {
    //实例创建完成后
  },
  mounted() {
    //挂载实例后 - this.el存在
  },
  beforeDestroy() {
    //销毁前 - 实例仍然完全可用
  },
  destroyed() {
    //销毁后
  }
}
</script>