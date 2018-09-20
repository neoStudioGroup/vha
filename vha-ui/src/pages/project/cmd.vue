<style lang="stylus">
.p_UI-cmd
  height 100%
  >.ui-content
    padding 20px
    ._ulbtn
      padding-left 60px
      li
        float left
        margin-right 15px
        padding 8px 26px
        background-color #fff
        border-radius 30px
        border 1px solid #ddd


</style>
--------------------------------------------------------------------------------
<template>
  <div class="p_UI-cmd _df _fdc">
    <div class="ui-content _flexYauto">

      <p class="_noteA">功能：</p>
      
      <ul class="_ulbtn">
        <!-- <li class="_buttonB">预览模式打开</li> -->
        <!-- <li class="_buttonB">用自建服务器打开</li> -->
        <li class="_buttonB">在应用程序打开</li>
      </ul>
      
      <div class="_clear"></div>
      
      <p class="_noteA">添加：</p>
      
      <ul class="_ulbtn">
        <li class="_buttonB">添加Android平台</li>
        <li class="_buttonB">添加ios平台</li>
        <li class="_buttonB">添加browser平台</li>
        <!-- <li class="_buttonB">添加Crosswalk</li> -->
        <!-- <li class="_buttonB">添加ngCordova</li> -->
      </ul>
      
      <div class="_clear"></div>
      
      <!-- <ul class="addtext _texthide">
        <li class="_buttonB">ionic platform add android</li>
        <li class="_buttonB">添加Crosswalk</li>
        <li class="_buttonB">添加ngCordova</li>
        <li class="_buttonB">111</li>
        <li class="_buttonB">222</li>
      </ul> -->


      <p class="_noteA">编译：</p>
      
      <ul class="_ulbtn">
        <li class="_buttonB">Debug编译 Apk</li>
        <li class="_buttonB">发布编译 Apk</li>
        <li class="_buttonB">运行 Apk</li>
        <li class="_buttonB">真机调试</li>
      </ul>
      
      <div class="_clear"></div>


      <p class="_noteA">打开：</p>
      
      <ul class="_ulbtn">
        <li class="_buttonB">打开项目文件夹</li>
        <li class="_buttonB">打开Apk文件夹</li>
        <li class="_buttonB">打开插件文件夹</li>
        <li class="_buttonB">打开资源文件夹</li>
      </ul>
      
      <div class="_clear"></div>


      <p class="_noteA">自定义命令：</p>
      
      <ul class="_ulbtn">
        <li class="_buttonB">查看vha版本信息</li>
        <li class="_buttonB">更新cordova vha</li>
        <li class="_buttonB">生成ios项目图标</li>
        <li class="_buttonB">生成ios启动屏幕</li>
      </ul>
      
      <div class="_clear"></div>
      
      
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">

export default {
  name: 'p_UI-cmd',
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