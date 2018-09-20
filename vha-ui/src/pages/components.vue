<style lang="stylus">
.p_UI-components

  // UI组件-名称
  .p_UI-name
    background-color red

</style>
--------------------------------------------------------------------------------
<template>
  <a-layout class="p_UI-components">
    <a-layout-content>
      
      <!-- UI组件-名称 -->
      <div class="p_UI-name">
        3333
      </div>

    </a-layout-content>
  </a-layout>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
export default {
  name: 'p_UI-components',
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