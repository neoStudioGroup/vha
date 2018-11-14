<style lang="stylus">
.index_PG-cmd
  height 100%
  >._UI-content
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
  <div class="index_PG-cmd _df _fdc">
    <div class="_UI-content _flexYauto">

      <p class="_noteA">功能：</p>
      <ul class="_ulbtn">
        <!-- <li class="_buttonB">预览模式打开</li> -->
        <!-- <li class="_buttonB">用自建服务器打开</li> -->
        <li
          class="_buttonB" 
          @click='$store.commit("runCmd", "\"" + $store.state.config.openSoftware + "\" \"" + $store.state.config.projectPath + "\\" + $store.state.config.choose + "\"")'
        >
          在应用程序打开
        </li>
      </ul>
      <div class="_clear"></div>
      
      <p class="_noteA">npm：</p>
      <ul class="_ulbtn">
        <!-- <li class="_buttonB" @click='$store.commit("runCmd", "ping baidu.com -t")'>测试</li> -->
        <li class="_buttonB" @click='$store.commit("runCmd", "npm install")'>npm install</li>
        <li class="_buttonB" @click='$store.commit("runCmd", "cnpm install")'>cnpm install</li>
      </ul>
      <div class="_clear"></div>
      
      <p class="_noteA">添加：</p>
      <ul class="_ulbtn">
        <!-- <li class="_buttonB" @click='$store.commit("runCmd", "ping baidu.com -t")'>测试</li> -->
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova platform add android")'>添加Android平台</li>
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova platform add ios")'>添加ios平台</li>
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova platform add borwser")'>添加browser平台</li>
      </ul>
      <div class="_clear"></div>

      <p class="_noteA">清理：</p>
      <ul class="_ulbtn">
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova clean android")'>清理Android构建目录</li>
      </ul>
      <div class="_clear"></div>

      <p class="_noteA">编译：</p>
      <ul class="_ulbtn">
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova build android")'>Debug编译 Apk</li>
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova build android --release")'>发布编译 Apk</li>
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova emulate android")'>运行 Apk</li>
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova run android")'>真机调试</li>
      </ul>
      <div class="_clear"></div>

      <p class="_noteA">打开：</p>
      <ul class="_ulbtn">
        <li class="_buttonB" @click='$store.commit("runCmd", "start \"" + $store.state.config.projectPath + "\\" + $store.state.config.choose + "\"")'>打开CMD</li>
        <li class="_buttonB" @click='$store.commit("runCmd", "start " + $store.state.config.projectPath + "\\" + $store.state.config.choose)'>打开项目文件夹</li>
        <li class="_buttonB"  @click='$store.commit("runCmd", "start " + $store.state.config.projectPath + "\\" + $store.state.config.choose + "\\platforms\\android\\app\\build\\outputs\\apk")'>打开Apk文件夹</li>
        <li class="_buttonB"  @click='$store.commit("runCmd", "start " + $store.state.config.projectPath + "\\" + $store.state.config.choose + "\\plugins")'>打开插件文件夹</li>
        <li class="_buttonB"  @click='$store.commit("runCmd", "start " + $store.state.config.projectPath + "\\" + $store.state.config.choose + "\\resources")'>打开资源文件夹</li>
      </ul>
      <div class="_clear"></div>

      <!-- <p class="_noteA">自定义命令：</p>
      <ul class="_ulbtn">
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova platform add ios")'>查看vha版本信息</li>
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova platform add ios")'>更新cordova vha</li>
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova platform add ios")'>生成ios项目图标</li>
        <li class="_buttonB" @click='$store.commit("runCmd", "cordova platform add ios")'>生成ios启动屏幕</li>
      </ul>
      <div class="_clear"></div> -->
      
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">

export default {
  name: 'indexPGcmd',
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
    runCode: function () {
      
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