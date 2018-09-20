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
      span
        margin-left 6px
      &:hover
        background-color #e0e5ed

</style>
--------------------------------------------------------------------------------
<template>
  <div id="app" class="_df _fdc">
    <div class="ui-header">
      <a-menu v-model="current" mode="horizontal" @click="click">
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
          组件文档
        </a-menu-item>
        <a-menu-item key="native">
          <a-icon type="mobile" />
          API文档
        </a-menu-item>
      </a-menu>
    </div>
    <div class="ui-content _flexYauto">
      <router-view></router-view>
    </div>
    <div class="ui-footer">
      <div>
        <a-icon type="home" />
      </div>
      <div @click="showDrawer">
        <a-icon type="setting" />
      </div>
      <div style="cursor:auto">
        <a-icon type="folder" /> 
        <span>F:\Project\vue\hybridApp</span>
      </div>
      <div>
        <a-icon type="info-circle-o" />
        <span>提示</span>
      </div>
      
      
      <div style="margin-left:auto" @click="info">
        <span>v0.0.1</span>
      </div>
    </div>
    
    <a-drawer
      width=400
      placement="left"
      :closable="false"
      @close="onClose"
      :visible="visible"
      style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px"
    >
      <a-divider orientation="left">系统配置</a-divider>
      
      <h6 :style="{marginTop:'40px'}">项目目录：</h6>
      <a-input placeholder="C:\" v-model="this.$store.state.projectPath"/>
      <h6 :style="{marginTop:'10px', marginLeft:'10px', color:'#bbb'}">项目的管理目录</h6>
      
      <h6 :style="{marginTop:'40px'}">打开浏览器路径：</h6>
      <a-input placeholder="C:\"/>
      <h6 :style="{marginTop:'10px', marginLeft:'10px', color:'#bbb'}">指定用于浏览打开项目的浏览器</h6>
      
      <h6 :style="{marginTop:'40px'}">打开程序路径</h6>
      <a-input placeholder="C:\"/>
      <h6 :style="{marginTop:'10px', marginLeft:'10px', color:'#bbb'}">指定用于打开项目的应用程序(如webstrom、vscode、sublime)</h6>
      
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
      >
        <a-button
          style="margin-right:8px"
          @click="onClose"
        >
          取消
        </a-button>
        <a-button @click="onClose" type="primary">确定</a-button>
      </div>
    </a-drawer>
    
    
    
    
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
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
      visible: false,
    }
  },
  components: {
    //组件 - 引入或定义
  },
  computed: {
    //计算 - 缓存结果,变动时执行
  },
  sockets:{
    connect: function(){
      console.log('SERVER_CONNECT')
      this.$store.state.socket_connect = true
      this.$socket.emit('CLIENT_GET_projectPath')
    },
    disconnect: function(){
      console.log('SERVER_DISCONNECT')
      this.$store.state.socket_connect = false
      this.$message.error('与Socket服务器断开连接')
    },
    SERVER_CMD_DATA: function(val){
      console.log('SERVER_CMD_DATA')
      this.$store.state.command_code += val
    },
    SERVER_CMD_END: function(){
      console.log("SERVER_CMD_END")
    },
    SERVER_SND_projectPath: function(val){
      console.log("SERVER_SND_projectPath", val)
      this.$store.state.projectPath = val
    }
  },
  methods: {
    //方法 - 每次进入页面创建
    click: function (item, key, keyPath) {
      console.log(item.key, key, keyPath)
      this.$router.push("/" + item.key)
    },
    showDrawer: function () {
      this.visible = true
    },
    onClose: function () {
      this.visible = false
    },
    info: function () {
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