<style lang="stylus">
.index_PG-bindkeystore
  height 100%
  >._UI-content
    padding 20px
    padding-top 40px

</style>
--------------------------------------------------------------------------------
<template>
  <div class="index_PG-bindkeystore _df _fdc">
    <div class="_UI-content _flexYauto">

      <a-row class="_UI-table ui-t_title" type="flex" justify="space-around" align="middle">
        <a-col :span="3"></a-col>
        <a-col :span="6"><h2>签名文件</h2></a-col>
        <a-col :span="15"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3">(keypass) 存取密码：</a-col>
        <a-col :span="6"><a-input v-model="keyPass"/></a-col>
        <a-col :span="15"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3"></a-col>
        <a-col :span="6"><p class="ui-t-note">别名条目的密码(私钥)留空则与密钥库相同</p></a-col>
        <a-col :span="15"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3">(storepass) 密钥库口令：</a-col>
        <a-col :span="6"><a-input v-model="keyStorepass"/></a-col>
        <a-col :span="15"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3"></a-col>
        <a-col :span="6"><p class="ui-t-note">密钥库的密码(获取keystore信息所需的密码)</p></a-col>
        <a-col :span="15"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3">待签名密钥别名：</a-col>
        <a-col :span="6"><a-input v-model="keyAlias"/></a-col>
        <a-col :span="15"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3">待签名证书：</a-col>
        <a-col :span="6"><a-input placeholder="..\..\my.keystore" v-model="keyPath"/></a-col>
        <a-col :span="15"><a-button @click='$store.commit("runCmd", "start " + processPath(keyPath))'>打开</a-button></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="3">待签名APK：</a-col>
        <a-col :span="6"><a-input placeholder="..\..\app-release-unsigned.apk" v-model="apkPath"/></a-col>
        <a-col :span="15"><a-button @click='$store.commit("runCmd", "start " + processPath(apkPath))'>打开</a-button></a-col>
      </a-row>

    </div>
    <div class="_UI-footer">
      <UI-select :buttons="['打包']" :callback="buttonCallback"></UI-select>
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
import UISelect from "../../components/select"
export default {
  name: 'indexPGbindkeystore',
  beforeCreate() {
    //实例创建之前
  },
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
      keyPass: '',
      keyStorepass: '',
      keyAlias: 'myKeystore',
      keyPath: '..\\..\\my.keystore',
      apkPath: '..\\..\\app-release-unsigned.apk'
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
    buttonCallback: function () {
      if (!this.keyStorepass) {
        this.$error({
          title: '错误！',
          content: '口令不能为空',
        })
      }
      
      if (this.keyPass === '') {
        this.keyPass = this.keyStorepass
      }
      
      // let tmp_apkPath = this.apkPath
      // if (tmp_apkPath.indexOf('-unsigned.apk') != -1) {
      //   tmp_apkPath = tmp_apkPath.replace(/-unsigned\.apk/, "-unaligned-OK.apk")
      // } else {
      //   tmp_apkPath = tmp_apkPath.replace(/\.apk/, "-unaligned-OK.apk")
      // }
      
      this.$store.commit('runCmd', 
        'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1' + 
        ' -keypass \"' + this.keyPass + '\"' + 
        ' -storepass \"' + this.keyStorepass + '\"' + 
        ' -keystore \"' + this.keyPath + '\"' + 
        ' \"' + this.apkPath + '\"' + 
        ' ' + this.keyAlias + 
        ' -signedjar \"' + this.apkPath + '-unsigned-OK.apk\"'
      )
    },
    processPath: function (path) {
      let tmp_pst = path.lastIndexOf('\\')
      if (tmp_pst != -1) {
        return path.slice(0, tmp_pst)
      }
    },
    dataInit: function () {
      this.keyPath = this.$store.state.config.projectPath + "\\" + this.$store.state.config.choose + '\\platforms\\android\\app\\build\\outputs\\apk\\my.keystore'
      this.apkPath = this.$store.state.config.projectPath + "\\" + this.$store.state.config.choose + '\\platforms\\android\\app\\build\\outputs\\apk\\release\\app-release-unsigned.apk'     
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