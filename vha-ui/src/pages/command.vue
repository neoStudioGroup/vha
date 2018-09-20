<style lang="stylus">
.p_UI-command
  height 100%
  padding 20px
  pre
    margin 20px 0
    color #c0c0c0
    background-color #000
    max-height 80vh
    border-radius 5px
    line-height 100%
</style>
--------------------------------------------------------------------------------
<template>
  <div class="p_UI-command">
    <p>连接状态: {{this.$store.state.socket_connect}}</p>
    
    <a-input-search placeholder="ipconfig" @search="clickButton" enterButton="运行" size="large" />

    <pre>{{this.$store.state.command_code}}</pre>
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
export default {
  name: 'p_UI-command',
  beforeCreate() {
    //实例创建之前
  },
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
    }
  },
  components: {
    //组件 - 引入或定义
  },
  computed: {
    //计算 - 缓存结果,变动时执行
  },
  methods: {
    //方法 - 每次进入页面创建
    clickButton: function(value){
      this.$socket.emit('CLIENT_CMD', value)
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