<style lang="stylus">
.index_PG-info
  height 100%
  >._UI-content
    padding 20px
    padding-top 40px

</style>
--------------------------------------------------------------------------------
<template>
  <div class="index_PG-info _df _fdc">
    <div class="_UI-content _flexYauto">
      
      <a-row class="_UI-table ui-t_title" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="5"><h2>项目信息</h2></a-col>
        <a-col :span="18"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="1">名称：</a-col>
        <a-col :span="5"><a-input v-model="xml.name.value" /></a-col>
        <a-col :span="18"></a-col>
      </a-row>
      
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="1">版本：</a-col>
        <a-col :span="5"><a-input v-model="xml.version.value" /></a-col>
        <a-col :span="18"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="5"><p class="ui-t-note">项目的版本 显示在应用管理中</p></a-col>
        <a-col :span="18"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="1">ID：</a-col>
        <a-col :span="5"><a-input v-model="xml.id.value" /></a-col>
        <a-col :span="18"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="5"><p class="ui-t-note">文件夹的标识 要符合com.xxxx.xxxx</p></a-col>
        <a-col :span="18"></a-col>
      </a-row>
      
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="1">描述：</a-col>
        <a-col :span="5"><a-input v-model="xml.description.value" /></a-col>
        <a-col :span="18"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="5"><p class="ui-t-note">项目的描述 显示在应用管理中</p></a-col>
        <a-col :span="18"></a-col>
      </a-row>

<!--         
        <tr>
          <td>
          </td>
          <td>
            <h2 style="margin-top: 20px;">包信息</h2>
          </td>
        </tr>
        <tr>
          <td>
            包名称：
          </td>
          <td>
            <a-input placeholder="large size" />
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">APK包的名称 非项目名</p>
          </td>
        </tr>
        <tr>
          <td>
            包版本：
          </td>
          <td>
            <a-input placeholder="large size" />
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">APK包的版本 非项目版本</p>
          </td>
        </tr>
        <tr>
          <td>
            包描述：
          </td>
          <td>
            <a-input placeholder="large size" />
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">APK包的描述信息 非项目描述</p>
          </td>
        </tr> -->

    </div>
    <div class="_UI-footer">
      <UI-select :buttons="['默认', '保存']" :callback="buttonCallback"></UI-select>
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
import UISelect from "../../components/select"
export default {
  name: 'indexPGinfo',
  beforeCreate() {
    //实例创建之前
  },
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
      xml: {
        name: {
          startMark: '<name>',
          endMark: '</name>',
          value: '',
        },
        version: {
          startMark: '" version="',
          endMark: '" xmlns="',
          value: '',
        },
        id: {
          startMark: 'widget id="',
          endMark: '" version="',
          value: '',
        },
        description: {
          startMark: '<description>',
          endMark: '</description>',
          value: '',
        }
      }
    }
  },
  components: {
    //组件 - 引入或定义
    UISelect
  },
  computed: {
    //计算 - 缓存结果,变动时执行
  },
  methods: {
    //方法 - 每次进入页面创建
    buttonCallback: function (index) {
      switch (index) {
        case 0: {
          this.dataInit()
        } break
        case 1: {
          this.$socket.emit('CLIENT_SET_XML', this.xml)
        } break
      }
    },
    dataInit: function () {
      this.xml.name.value = this.$store.state.xml.widget.name
      this.xml.version.value = this.$store.state.xml.widget.$.version
      this.xml.id.value = this.$store.state.xml.widget.$.id
      this.xml.description.value = this.$store.state.xml.widget.description
    }
  },
  watch: {
    //观察 - 数据或方法
    '$store.state.xml': function () {
      this.dataInit()
    }
  },
  created() {
    //实例创建完成后
  },
  mounted() {
    //挂载实例后 - this.el存在
  },
  activated() {
    //keep-alive组件激活时
    this.dataInit()
  },
  beforeDestroy() {
    //销毁前 - 实例仍然完全可用
  },
  destroyed() {
    //销毁后
  }
}
</script>