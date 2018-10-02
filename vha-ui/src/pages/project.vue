<style lang="stylus">
._PG-project
  height 100%
  >._UI-sider
    width 240px

._PG-project
  >._UI-sider
    display flex
    flex-direction column
    background-color #fff
    border-right 1px solid #eee
    ._UI-addButton
      margin 14px 8px 0
      padding 6px 0
      font-size 24px
      text-align center
      cursor pointer
      color #666
      border-radius 3px
      transition background-color 150ms, color 300ms, box-shadow 500ms
      &:hover
        background-color #ddd
        box-shadow 0 0 3px rgba(0,0,0,0.3)
    ._UI-projects
      margin 4px 0
      padding 8px
      color #888
      max-height 100%
      overflow-y auto
      flex 1
      .ui-p-item
        margin 4px 0
        padding 8px
        border-radius 3px
        cursor pointer
        user-select none
        display flex
        align-items center
        transition background-color 150ms, color 300ms, box-shadow 500ms
        &:hover
          color #000
          background-color #ddd
          box-shadow 0 0 3px rgba(0,0,0,0.3)
          img
            color rgba(255,255,255,0.8)
            background-color rgba(0,0,0,0.5)
            transform scale(1.05)
        img
          width 48px
          height 48px
          border-radius 6px
          transition color 150ms,background-color 200ms
          box-shadow 0 0 8px rgba(0,0,0,0.2)
          transition background-color 150ms, color 300ms, box-shadow 500ms
        span
          margin-left 8px
          max-width 100px
          overflow hidden
          display inline-block
          white-space nowrap
          text-overflow ellipsis
      .ui-p-active
        color #fff
        background-color #2984eb
        &:hover
          color #fff
          background-color #2984eb
          // transform scale(0.9)

._PG-project
  >._UI-content
    >.ui-c-content
      background-color #f0f2f5


</style>
--------------------------------------------------------------------------------
<template>
  <div class="_PG-project _df">
    <div class="_UI-sider">
      
      <div class="_UI-addButton" @click="visible=true">
        <a-icon type="plus-circle" />
      </div>
      
      <div class="_UI-projects">
        <div 
          class="ui-p-item"
          :class="$store.state.UIprojectsStatus === project.name ? 'ui-p-active' : ''"
          v-for="project in $store.state.project"
          :key="project.index"
          @dblclick="changePro(project.name)"
        >
          <img :src="project.src || '../assets/images/icon.png'">
          <span>{{project.name}}</span>
        </div>
      </div>
      
    </div>
    
    <div class="_UI-content _flexXauto _df _fdc">
      <div class="ui-c-header">
        <UI-topButton></UI-topButton>
      </div>
      <div class="ui-c-content _flexYauto">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    
    <UI-createProject :visible="visible" @onClose='onClose'></UI-createProject>
    
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
import UITopButton from "../components/topButton"
import UICreateProject from "../components/createProject"

export default {
  name: 'PGproject',
  beforeCreate() {
    //实例创建之前
  },
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
      visible: false
    }
  },
  components: {
    //组件 - 引入或定义
    UITopButton,
    UICreateProject
  },
  computed: {
    //计算 - 缓存结果,变动时执行
  },
  methods: {
    //方法 - 每次进入页面创建
    changePro: function (project) {
      this.$store.state.UIprojectsStatus = project
      this.$store.state.command_code = ""
      this.$store.state.command_code = this.$store.state.config.projectPath + "\\" + project + ">"
      this.$socket.emit('CLIENT_SET_PROJECT_CHOOSE', project)
      console.log('切换项目', this.$store.state.UIprojectsStatus)
    },
    onClose: function () {
      this.visible = false
    }
  },
  watch: {
    //观察 - 数据或方法
    '$store.state.config': function () {
      // this.changePro(this.$store.state.config.choose)
    }
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