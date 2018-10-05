<style scoped lang="stylus">
// ._UI-stting
</style>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<template>
  <div class="_UI-stting">

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
      <a-input placeholder="C:\" v-model="$store.state.config.projectPath"/>
      <h6 :style="{marginTop:'10px', marginLeft:'10px', color:'#bbb'}">项目的管理目录(不能包含中文)</h6>
      
      <!-- <h6 :style="{marginTop:'40px'}">打开浏览器路径：</h6>
      <a-input placeholder="C:\"/>
      <h6 :style="{marginTop:'10px', marginLeft:'10px', color:'#bbb'}">指定用于浏览打开项目的浏览器</h6> -->
      
      <h6 :style="{marginTop:'40px'}">打开程序路径</h6>
      <a-input placeholder="C:\" v-model="$store.state.config.openSoftware"/>
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
        <a-button style="margin-right:8px" @click="onClose">取消</a-button>
        <a-button @click="onOk" type="primary">保存</a-button>
      </div>
    </a-drawer>

  </div>
</template>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<script type="text/ecmascript-6">
export default {
  name: 'UIstting',
  props: {
    //父组件参数
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    //动态数据
    return {
    }
  },
  methods: {
    //方法 - 进入页面创建
    onClose: function () {
      this.$socket.emit('CLIENT_GET_CONFIG')
      this.$emit('onClose')
    },
    onOk: function () {
      // 判断目录是否存在 
      this.$ajax({
        method: 'get',
        url: `http://localhost:${this.$store.state.config.servePort}/api?path=${this.$store.state.config.projectPath}`
      }).then((response) => {
        //////////////////////////////////
        if (response.data === 0) {
          this.$error({
            title: '错误！',
            content: '路径不存在！',
          })
          return
        } else {
          this.$store.state.config.projectPath = this.$store.state.config.projectPath.replace(/\//,'//')
          this.$store.state.config.openSoftware = this.$store.state.config.openSoftware.replace(/\//,'//')
          this.$socket.emit('CLIENT_SET_CONFIG', this.$store.state.config)
          setTimeout(() => {
            this.$socket.emit('CLIENT_GET_PROJECT')//可能修改了路径, 重新获取项目子目录
            this.$socket.emit('CLIENT_GET_XML')//读取XML信息
            this.$socket.emit('CLIENT_GET_PLUGINS')//读取PLUGINS信息
          }, 50)
          this.$emit('onClose')
        }
        //////////////////////////////////
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  watch: {
    //观察 - 数据或方法变动
    'this.visible': function () {
      if (this.visible) {
        this.$socket.emit('CLIENT_GET_CONFIG')
      }
    }
  },
  mounted() {
    //挂载实例后 - this.el存在
  }
}
</script>