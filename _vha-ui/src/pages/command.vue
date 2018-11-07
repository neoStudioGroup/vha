<style lang="stylus">
._PG-command
  height 100%
  padding 20px
  pre
    margin 20px 0
    padding 20px
    color #c0c0c0
    background-color #000
    // max-height 80vh
    border-radius 5px
    line-height 120%
    white-space pre-wrap
    word-wrap break-word
    
</style>
--------------------------------------------------------------------------------
<template>
  <div class="_PG-command">
    
    <p>连接状态: {{$store.state.socket_connect}}</p>
    
    <a-input-search v-model="$store.state.command_value" @search="onButton" enterButton="运行" size="large" />
    
    <pre>{{$store.state.command_code}}</pre>
    
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
export default {
  name: 'PGcommand',
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
    onButton: function(value){
      this.$store.commit('runCmd', value)
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