<style scoped lang="stylus">
._UI-select
  border-top 1px solid #ddd
  background-color #e7eaef
  display flex
  ul
    display inline
    margin 0
    margin-left auto
    li
      padding 10px 50px   
      margin-left 6px
      display inline-block

</style>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<template>
  <div class="_UI-select">

    <ul>
      <li class="_buttonB" v-for="(button, index) in buttons" :key="index" @click="callback(index)">{{button}}</li>
    </ul>

  </div>
</template>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<script type="text/ecmascript-6">
export default {
  name: 'UIselect',
  props: {
    //父组件参数
    buttons: {
      type: Array,
      default: ['默认', '保存']
    },
    callback: null
  },
  data() {
    //动态数据
    return {
    }
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
}
</script>