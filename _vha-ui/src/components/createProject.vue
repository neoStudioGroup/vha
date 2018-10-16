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
    >
      <!-- <a-divider orientation="left">官方模板</a-divider> -->
      
      <a-radio-group v-model="selectValue" style="height: calc(100% - 55px);overflow:auto;paddingBottom: 53px;text-align:center">
        
        <a-radio-group v-model="formValue" style="margin:10px auto 20px">
          <a-radio-button value="oschina">oschina</a-radio-button>
          <a-radio-button value="git">git</a-radio-button>
        </a-radio-group>
        
        <a-row>
          <a-col :span="8" style="padding:10px">
            <a-card
              hoverable
              style="width: 100%;border:none;border-radius:6px;"
              @click="onChangeselectValue(1)"
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
              style="width: 100%;border:none;border-radius:6px;"
              @click="onChangeselectValue(2)"
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
              style="width: 100%;border:none;border-radius:6px;"
              @click="onChangeselectValue(3)"
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
          display: 'flex',
          alignItems: 'center',
        }"
      >
        <div style="margin-right:auto;display:flex;align-items:center">
          <span style="white-space:nowrap">项目名称：</span>
          <a-input placeholder="my-app" v-model="name"/>
        </div>
        <div style="margin-left:auto">
        <a-button
          style="margin-right:8px"
          @click="onClose()"
        >
          取消
        </a-button>
        <a-button @click="onCreate()" type="primary">创建</a-button>
      </div>
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
      formValue: 'oschina',
      selectValue: 1,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      name: '',
      gitTemplateList: [
        'https://github.com/mixingyu/vha-template-blank.git',
        'https://github.com/mixingyu/vha-template-tabs.git',
        'https://github.com/mixingyu/vha-template-app.git'
      ],
      oschinaTemplateList: [
        'https://gitee.com/mixingyu/vha-template-blank.git',
        'https://gitee.com/mixingyu/vha-template-tabs.git',
        'https://gitee.com/mixingyu/vha-template-app.git'
      ],
      selectNumber: 1
    }
  },
  methods: {
    //方法 - 进入页面创建
    onClose: function () {
      this.$emit('onClose')
    },
    onCreate: function () {
      if (!this.name) {
        this.$error({
          title: '错误！',
          content: '名称不能为空！',
        })
        return
      }
      
      if (/.*[\u4e00-\u9fa5]+.*$/.test(this.name)) { 
        this.$error({
          title: '错误！',
          content: '名称不能含有汉字！',
        })
      } else {
        // 判断目录是否存在 
        let temp_name = this.name
        let temp_TemplateList = (this.formValue === 'oschina' ? this.oschinaTemplateList : this.gitTemplateList)
        let temp_selectNumber = this.selectValue
        
        this.$ajax({
          method: 'get',
          url: `http://localhost:${this.$store.state.config.servePort}/api?path=${this.$store.state.config.projectPath}\\${temp_name}`
        }).then((response) => {
          //////////////////////////////////
          if (response.data != 0) {
            this.$error({
              title: '错误！',
              content: '路径已存在！'
            })
            return
          } else {
            this.$socket.emit('CLIENT_GEN_FOLDER', `${this.$store.state.config.projectPath}\\${temp_name}`)
            setTimeout(() => {
              this.$store.commit('runCmd', `git clone ${temp_TemplateList[temp_selectNumber - 1]} "${this.$store.state.config.projectPath}\\${temp_name}"`)
              setTimeout(() => {
                this.$store.state.command_nexReload = true
              }, 50)
            }, 100)
            this.$emit('onClose')
          }
          //////////////////////////////////
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    onChangeselectValue: function (val) {
      this.selectValue = val
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