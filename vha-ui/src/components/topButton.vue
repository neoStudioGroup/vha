<style scoped lang="stylus">
._UI-topButton
  margin 0
  border-bottom 1px solid #eee
  li
    float left
    padding 8px 16px
    margin 8px 0 8px 8px
    border-radius 2px
    font-size 12px
    text-align center
    color #666
    cursor pointer
    user-select none
    transition background-color 150ms, color 300ms, box-shadow 500ms, transform 100ms
    .anticon
      margin-right 4px
    &:hover
      color #000
      background-color #ddd
      box-shadow 0 0 3px rgba(0,0,0,0.3)
    &:active
      transition background-color 150ms, color 50ms, box-shadow 500ms
      color #fff
      /*background-color #2984eb*/
      box-shadow none
  
  .ui-t-active
    color #fff
    background-color #2984eb
    transform scale(0.9)
    &:hover
      color #fff
      background-color #2984eb
      // transform scale(0.9)

</style>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<template>
  <ul class="_UI-topButton" ref="UItopButton">
    <!-- <li key="directory">
      <a-icon type="folder-open" />
      工程目录
    </li> -->
    <li data-key="cmd" :class="UItopButtonStatus == 'cmd' ? 'ui-t-active':''">
      <a-icon type="credit-card" />
      常用命令
    </li>
    <li data-key="plugin" :class="UItopButtonStatus == 'plugin' ? 'ui-t-active':''">
      <a-icon type="profile" />
      插件管理
    </li>
    <li data-key="info" :class="UItopButtonStatus == 'info' ? 'ui-t-active':''">
      <a-icon type="info-circle-o" />
      项目信息
    </li>
    <li data-key="icon" :class="UItopButtonStatus == 'icon' ? 'ui-t-active':''">
      <a-icon type="picture" />
      项目图标
    </li>
    <li data-key="splash" :class="UItopButtonStatus == 'splash' ? 'ui-t-active':''">
      <a-icon type="mobile" />
      启动屏幕
    </li>
    <li data-key="keystore" :class="UItopButtonStatus == 'keystore' ? 'ui-t-active':''">
      <a-icon type="schedule" />
      生成签名
    </li>
    <li data-key="bindkeystore" :class="UItopButtonStatus == 'bindkeystore' ? 'ui-t-active':''">
      <a-icon type="wallet" />
      签名打包
    </li>
    <div class="_clear"></div>
  </ul>
</template>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<script type="text/ecmascript-6">
export default {
  name: 'UItopButton',
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
      UItopButtonStatus: 'cmd'
    }
  },
  methods: {
    //方法 - 进入页面创建
  },
  watch: {
    //观察 - 数据或方法变动
  },
  activated() {
    //keep-alive组件激活时
    this.$router.push("/project/" + this.UItopButtonStatus)
  },
  mounted() {
    //挂载实例后 - this.el存在
    let UItopButtonli = this.$refs.UItopButton.getElementsByTagName("li")
    Array.from(UItopButtonli).forEach(element => {
      element.onclick = () => {
        this.UItopButtonStatus = element.getAttribute('data-key')
        this.$router.push("/project/" + element.getAttribute('data-key'))
      }
    })
    
    if (this.$route.path.indexOf("/project/") != -1) {
      let getRoute = this.$route.path.split('/')
      this.UItopButtonStatus = getRoute[2]
    }
  },
}
</script>