<style scoped lang="stylus">
// ._UI-createProject
</style>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<template>
  <div class="_UI-createProject">

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
          @click="onClose()"
        >
          取消
        </a-button>
        <a-button @click="onClose()" type="primary">创建</a-button>
      </div>
    </a-drawer>

  </div>
</template>
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
<script type="text/ecmascript-6">
export default {
  name: 'UIcreateProject',
  props: {
    //父组件参数
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    //动态数据
    return {
      value: 1,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      }
    }
  },
  methods: {
    //方法 - 进入页面创建
    onClose: function () {
      this.$emit('onClose')
    },
    onChange: function () {
      console.log('radio checked', e.target.value)
    }
  },
  watch: {
    //观察 - 数据或方法变动
  },
  mounted() {
    //挂载实例后 - this.el存在
  },
}
</script>