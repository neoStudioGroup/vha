<style lang="stylus">
.p_UI-icon
  height 100%
  >.ui-content
    padding 20px
    // UI组件-名称
    .p_UI-name
      background-color red

</style>
--------------------------------------------------------------------------------
<template>
  <div class="p_UI-icon _df _fdc">
    <div class="ui-content _flexYauto">
      555555
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
  name: 'pUIicon',
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