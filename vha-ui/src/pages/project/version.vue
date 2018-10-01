<style lang="stylus">
._PG-version

  // UI组件-名称
  ._UI-name
    background-color red

</style>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<template>
  <div class="_PG-version">

    <!-- UI组件-名称 -->
    <div class="_UI-name">
      检查cordova
      检查vha 安装正确和版本
      
      检查java命令是否可以运行
      
      查看debug签名文件信息
      和签名SHA1值等等
    </div>

  </div>
</template>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<script type="text/ecmascript-6">
export default {
  name: 'PGversion',
  data() {
    //动态数据
    return {
    }
  },
  components: {
    //组件 - 引入或定义
  },
  methods: {
    //方法 - 进入页面创建
  },
  watch: {
    //观察 - 数据或方法变动
  },
  mounted() {
    //挂载实例后 - this.el存在
  },
  beforeDestroy() {
    //销毁前 - 实例仍然完全可用
  },
}
</script>