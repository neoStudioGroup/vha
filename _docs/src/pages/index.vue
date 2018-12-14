<style lang="stylus">
.PG-index
  iframe
    width 100%
    height 100vh
  .UI-header
    padding 20px 30px
    border-bottom 1px solid #eee
    .ui-logo
      span
        font-size 1.6em
        font-weight bold
        color #666
    .ui-nav
      a
        padding 20px 40px
        color #888
        font-size 16px
        &:hover
          color #333
        &:last-child
          padding-right 0
  .UI-banner
    padding 40px
    img
      width 280px
    // span
    //   margin-top 40px
    //   font-size 3em
    //   font-weight bold
    //   letter-spacing 2px
    //   color #666
    .ui-b-button
      margin-top 40px
      padding 16px 30px
      font-size 18px
      font-weight bold
      letter-spacing 4px
      border-radius 50px
      color #619ff4
      border 2px solid #619ff4
  .UI-features
    background-color #f6f6f6
  .UI-footer
    padding 40px
    // color #fff
    // background-color #34383b
    border-top 1px solid #eee
    img
      width 26px
    
</style>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<template>
  <div class="PG-index">
    <div class="UI-header _df _jcsb _aic">
      <div class="ui-logo">
        <a class="_clearA" href="#"><span>vha(vueHybridApp)</span></a>
      </div>
      <ul class="ui-nav _df _nomg">
        <li>
          <a href="https://neostudiogroup.com/vha-components/GettingStarted">指南</a>
        </li>
        <li>
          <a href="https://neostudiogroup.com/vha-components/routerView">组件</a>
        </li>
        <li>
          <a href="https://neostudiogroup.com/vha-native/Splashscreen">接口</a>
        </li>
        <!-- <li>
          <a href="#">支持vha</a>
        </li> -->
      </ul>
    </div>
    
    <!-- <iframe src="https://neostudiogroup.com/vha-native/" frameborder="0"></iframe> -->
    
    
    <div class="UI-banner _df _fdc _aic">
      <img src="../assets/images/logo.png">
      <!-- <h1>设计理念：把基础组件做到极致，快速构建移动端定制化ui界面。</h1> -->
      <h1>将基础组件做到极致</h1>
      <h1>为快速构建移动端"定制化"ui界面而生</h1>
      <!-- <h3>如果你对移动端ui有"定制化"需求我推荐你使用它</h3> -->
      <!-- <h3>如果你对移动端ui有"快速构建"需求我也推荐你使用它</h3> -->
      <a class="ui-b-button" href="https://neostudiogroup.com/vha-components/GettingStarted" target="_blank">快速开始</a>
    </div>
    <!-- <div class="UI-features">
      rpx
      透明背景 层级关系 构建过程
      
      易用
      灵活
      定制化
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </div> -->
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    <div class="UI-footer">
      <div class="_df _aic _jcsb">
        <span>MIT Licensed | Copyright © 2018 by <a href="https://neoStudioGroup.com" target="_blank">neoStudioGroup.com</a></span>
        <a href="https://github.com/neoStudioGroup/vha" target="_blank"><img src="../assets/images/github.png"></a>
      </div>
    </div>

  </div>
</template>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<script type="text/ecmascript-6">
export default {
  name: 'PGindex',
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