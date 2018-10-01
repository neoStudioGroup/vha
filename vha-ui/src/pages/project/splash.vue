<style lang="stylus">
.index_PG-splash
  height 100%
  >._UI-content
    padding 20px
    padding-top 40px

</style>
--------------------------------------------------------------------------------
<template>
  <div class="index_PG-splash _df _fdc">
    <div class="_UI-content _flexYauto">
      
      <a-row class="_UI-table ui-t_title" type="flex" justify="space-around" align="middle">
        <a-col :span="3"></a-col>
        <a-col :span="5"><h2>启动选项</h2></a-col>
        <a-col :span="16"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3">使用淡入淡出效果：</a-col>
        <a-col :span="5"><a-switch v-model="preferences.FadeSplashScreen.value"/></a-col>
        <a-col :span="16"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3"></a-col>
        <a-col :span="5"><p class="ui-t-note">是否使用淡入淡出效果(如果不使用则会忽略持续时间)</p></a-col>
        <a-col :span="16"></a-col>
      </a-row>
      
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3">淡入淡出持续时间：</a-col>
        <a-col :span="5"><a-input v-model="preferences.FadeSplashScreenDuration.value"/></a-col>
        <a-col :span="16"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3"></a-col>
        <a-col :span="5"><p class="ui-t-note">启动屏幕的淡入淡出时间</p></a-col>
        <a-col :span="16"></a-col>
      </a-row>
      
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3">启动屏幕持续时间：</a-col>
        <a-col :span="5"><a-input v-model="preferences.SplashScreenDelay.value"/></a-col>
        <a-col :span="16"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3"></a-col>
        <a-col :span="5"><p class="ui-t-note">启动屏幕画面的持续时间</p></a-col>
        <a-col :span="16"></a-col>
      </a-row>
      
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3">是否显示加载动画：</a-col>
        <a-col :span="5"><a-switch v-model="preferences.ShowSplashScreenSpinner.value"/></a-col>
        <a-col :span="16"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3"></a-col>
        <a-col :span="5"><p class="ui-t-note">是否显示启动屏幕laoding加载动画</p></a-col>
        <a-col :span="16"></a-col>
      </a-row>
      
      
<!-- 选择启动屏幕图片(可拖动文件到此)支持.png(.psd.ai请自行设置) - 2208x2208px 中间区域1200x1200px -->
      
      <br>
      <br>
      <br>
      <br>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3"></a-col>
        <a-col :span="5"><p class="ui-t-note">待完善启动屏幕裁剪...</p></a-col>
        <a-col :span="16"></a-col>
      </a-row>
      
    </div>
    <div class="_UI-footer">
      <UI-select :buttons="['默认', '保存']" :callback="buttonCallback"></UI-select>
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
import UISelect from "../../components/select"
export default {
  name: 'indexPGsplash',
  beforeCreate() {
    //实例创建之前
  },
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
      preferences: {
        FadeSplashScreen: {
          startMark: 'FadeSplashScreen" value="',
          endMark: '" />',
          value: false,
        },
        FadeSplashScreenDuration: {
          startMark: 'FadeSplashScreenDuration" value="',
          endMark: '" />',
          value: 250,
        },
        SplashScreenDelay: {
          startMark: 'SplashScreenDelay" value="',
          endMark: '" />',
          value: 3000,
        },
        ShowSplashScreenSpinner: {
          startMark: 'ShowSplashScreenSpinner" value="',
          endMark: '" />',
          value: false,
        }
      }
    }
  },
  components: {
    //组件 - 引入或定义
    UISelect
  },
  computed: {
    //计算 - 缓存结果,变动时执行
  },
  methods: {
    //方法 - 每次进入页面创建
    buttonCallback: function (index) {
      switch (index) {
        case 0: {
          this.dataInit()
        } break
        case 1: {
          this.$socket.emit('CLIENT_SET_XML', this.preferences)
        } break
      }
    },
    toBoolean: function (val) {
      switch (val) {
        case true:
          return 'true'
          break;
        case false:
          return 'false'
          break;
        case 'true':
          return true
          break;
        case 'false':
          return false
          break;
      }
    },
    dataInit: function () {
      this.$store.state.xml.widget.preference.forEach(element => {
        switch (element.$.name) {
          case 'FadeSplashScreen':
            this.preferences.FadeSplashScreen.value = this.toBoolean(element.$.value)
          break;
          case 'FadeSplashScreenDuration':
            this.preferences.FadeSplashScreenDuration.value = element.$.value
            break;
          case 'SplashScreenDelay':
            this.preferences.SplashScreenDelay.value = element.$.value
            break;
          case 'ShowSplashScreenSpinner':
            this.preferences.ShowSplashScreenSpinner.value = this.toBoolean(element.$.value)
            break;
        }
      })
    }
  },
  watch: {
    //观察 - 数据或方法
    '$store.state.xml': function () {
      this.dataInit()
    }
  },
  created() {
    //实例创建完成后
  },
  mounted() {
    //挂载实例后 - this.el存在
  },
  activated() {
    //keep-alive组件激活时
    this.dataInit()
  },
  deactivated() {
    //keep-alive组件停用时
  },
  beforeDestroy() {
    //销毁前 - 实例仍然完全可用
  },
  destroyed() {
    //销毁后
  }
}
</script>