<style lang="stylus">
.p_UI-splash
  height 100%
  background-color #fff
  >.ui-content
    padding 20px
    width 800px
    .ant-row-flex
      margin 14px 0
      .ant-col-6
        padding-right 10px
        text-align right
      h6
        color #bbb


</style>
--------------------------------------------------------------------------------
<template>
  <div class="p_UI-splash _df _fdc">
    <div class="ui-content _flexYauto">
      
      <a-divider orientation="left">启动选项</a-divider>
      
      <a-row type="flex" align="middle">
        <a-col :span="6">
          使用淡入淡出效果：
        </a-col>
        <a-col :span="18">
          <a-switch defaultChecked @change='onChange'/>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :span="6">
        </a-col>
        <a-col :span="16">
          <h6>是否使用淡入淡出效果(如果不使用则会忽略持续时间)</h6>
        </a-col>
      </a-row>
      
      <a-row type="flex" align="middle">
        <a-col :span="6">
          淡入淡出持续时间：
        </a-col>
        <a-col :span="10">
          <a-input placeholder="2000"/>
        </a-col>
        <a-col :span="8">
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :span="6">
        </a-col>
        <a-col :span="18">	
          <h6>启动屏幕的淡入淡出时间</h6>
        </a-col>
      </a-row>
      
      <a-row type="flex" align="middle">
        <a-col :span="6">
          启动屏幕持续时间：
        </a-col>
        <a-col :span="10">
          <a-input placeholder="2000"/>
        </a-col>
        <a-col :span="8">
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :span="6">
        </a-col>
        <a-col :span="18">	
          <h6>启动屏幕画面的持续时间</h6>
        </a-col>
      </a-row>
      
      <a-row type="flex" align="middle">
        <a-col :span="6">
          是否显示加载动画：
        </a-col>
        <a-col :span="18">
          <a-switch defaultChecked @change='onChange'/>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :span="6">
        </a-col>
        <a-col :span="18">
          <h6>是否显示启动屏幕laoding加载动画</h6>
        </a-col>
      </a-row>
      
      
    </div>
    <div class="ui-footer">
      <UIselect></UIselect>
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
import UIselect from "../../components/_UI-select"
export default {
  name: 'pUIsplash',
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
    UIselect
  },
  computed: {
    //计算 - 缓存结果,变动时执行
  },
  methods: {
    //方法 - 每次进入页面创建
    onChange(checked){
      console.log(`a-switch to ${checked}`);
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