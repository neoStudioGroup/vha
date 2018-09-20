<style lang="stylus">
.p_UI-project
  height 100%
  >.ui-p-sider
    width 240px

.p_UI-project
  >.ui-p-sider
    display flex
    flex-direction column
    background-color #fff
    border-right 1px solid #eee
    .p_UI-addButton
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
    .p_UI-projects
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

.p_UI-project
  >.ui-p-content
    >.ui-p-c-content
      background-color #f0f2f5


</style>
--------------------------------------------------------------------------------
<template>
  <div class="p_UI-project _df">
    <div class="ui-p-sider">
      
      <div class="p_UI-addButton" @click="showDrawer">
        <a-icon type="plus-circle" />
      </div>
      
      <div class="p_UI-projects">
        <div class="ui-p-item">
          <img src="../assets/images/icon.png">
          <span>vha-appDemo</span>
        </div>
        <div class="ui-p-item">
          <img src="../assets/images/icon.png">
          <span>vha-ui</span>
        </div>
        <div class="ui-p-item">
          <img src="../assets/images/icon.png">
          <span>neo-studio</span>
        </div>
        <div class="ui-p-item">
          <img src="../assets/images/icon.png">
          <span>wxapp-vue</span>
        </div>
      </div>
      
    </div>
    <div class="ui-p-content _flexXauto _df _fdc">
      <div class="ui-p-c-header">
        <UItopButton></UItopButton>
      </div>
      <div class="ui-p-c-content _flexYauto">
        <router-view></router-view>
      </div>
    </div>
    
    
    <a-drawer
      title="创建项目"
      width=700
      placement="left"
      :closable="false"
      @close="onClose"
      :visible="visible"
      style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px"
    >
    
    
    
      <a-divider orientation="left">选择模板</a-divider>
      
      
      <a-radio-group @change="onChange($event)" v-model="value">
      
      
        
        <a-row>
          <a-col :span="8" style="padding:10px">
            <a-card
              hoverable
              style="width: 100%"
            >
              <img
                alt="example"
                src="../assets/images/blank-app.png"
                slot="cover"
              />
              <a-card-meta>
                <template slot="description">
                  <a-radio :style="radioStyle" :value="1">blank(空模版)</a-radio>
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
          <a-col :span="8" style="padding:10px">
           <a-card
              hoverable
              style="width: 100%"
            >
              <img
                alt="example"
                src="../assets/images/tabs-app.png"
                slot="cover"
              />
              <a-card-meta>
                <template slot="description">
                  <a-radio :style="radioStyle" :value="2">tabs(带选项卡)</a-radio>
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
          <a-col :span="8" style="padding:10px">
           <a-card
              hoverable
              style="width: 100%"
            >
              <img
                alt="example"
                src="../assets/images/menu-app.png"
                slot="cover"
              />
              <a-card-meta>
                <template slot="description">
                  <a-radio :style="radioStyle" :value="3">app(完整的示例)</a-radio>
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </a-radio-group>
      
      <h6 :style="{marginTop:'40px'}">项目名称：</h6>
      <a-input placeholder="my-app"/>
      
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
      >
        <a-button
          style="margin-right:8px"
          @click="onClose"
        >
          取消
        </a-button>
        <a-button @click="onClose" type="primary">创建</a-button>
      </div>
    </a-drawer>
    
    
    
    
    
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
import UItopButton from "../components/_UI-topButton"

export default {
  name: 'p_UI-project',
  beforeCreate() {
    //实例创建之前
  },
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
      visible: false,
      value: 1,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      }
    }
  },
  components: {
    //组件 - 引入或定义
    UItopButton
  },
  computed: {
    //计算 - 缓存结果,变动时执行
  },
  methods: {
    //方法 - 每次进入页面创建
    click: function (item, key, keyPath) {
      console.log(item.key, key, keyPath)
      this.$router.push("/project/" + item.key)
    },
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    onChange (e) {
      console.log('radio checked', e.target.value)
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