<style lang="stylus">
.index_PG-keystore
  height 100%
  >._UI-content
    padding 20px
    padding-top 40px
      
</style>
--------------------------------------------------------------------------------
<template>
  <div class="index_PG-keystore _df _fdc">
    <div class="_UI-content _flexYauto">

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">保存目录：</a-col>
        <a-col :span="6"><a-input v-model="configPath"/></a-col>
        <a-col :span="14"><a-button @click='$store.commit("runCmd", "start " + configPath)'>打开</a-button></a-col>
      </a-row>

      <a-row class="_UI-table ui-t_title" type="flex" justify="space-around" align="middle">
        <a-col :span="4"></a-col>
        <a-col :span="6"><h2>证书信息</h2></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">密钥尺寸(单位/bit)：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.keySize"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">密钥加密算法：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.keyAlg"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4"></a-col>
        <a-col :span="6"><p class="ui-t-note">密钥的算法,如RSA、DSA（默认RSA）</p></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">密钥有效期(单位/天)：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.keyDay"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">密钥别名：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.keyAlias"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">(keypass) 存取密码：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.keyPass"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4"></a-col>
        <a-col :span="6"><p class="ui-t-note">别名条目的密码(私钥) 留空则与密钥库相同</p></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table ui-t_title" type="flex" justify="space-around" align="middle">
        <a-col :span="4"></a-col>
        <a-col :span="6"><h2>证书拥有者信息<a style="margin-left:8px;font-size: 12px;font-weight:normal;" href="http://bbs.ionic-china.com/read-133.html" target="_blank">如何查看签名文件信息?</a></h2></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">(storepass) 密钥库口令：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.keyStorepass"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4"></a-col>
        <a-col :span="6"><p class="ui-t-note">密钥库的密码(获取keystore信息所需的密码)</p></a-col>
        <a-col :span="14"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4"></a-col>
        <a-col :span="6"><p class="ui-t-noteB">请保管好您的密码，会被记录在配置文件中，如果需要请及时删除！</p></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">确认密钥库口令：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.keyconStorepass"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4"></a-col>
        <a-col :span="6"><p class="ui-t-note">确定密钥库的密码</p></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">您的名字与姓氏是什么?：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.commonName"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">您的组织单位名称是什么?：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.organizationUnit"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>
      
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">您的组织名称是什么?：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.organizationName"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">您所在的城市或区域名称是什么?：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.localityName"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>

      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">您所在的省/市/自治区名称是什么?：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.stateName"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>
      
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="4">该单位的双字母国家/地区代码是什么?：</a-col>
        <a-col :span="6"><a-input v-model="keyConfig.country"/></a-col>
        <a-col :span="14"></a-col>
      </a-row>

    </div>
    <div class="_UI-footer">
      <input class="ui-f-input" type="file" style="display: none;" @change="inputChange($event)"/>
      <UI-select :buttons="['读入配置', '生成']" :callback="buttonCallback"></UI-select>
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
import UISelect from "../../components/select"
export default {
  name: 'indexPGkeystore',
  beforeCreate() {
    //实例创建之前
  },
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
      configPath: '',
      keyConfig: {
        keySize: '2048',
        keyAlg: 'RSA',
        keyDay: '36000',
        keyAlias: 'myKeystore',
        keyPass: '',
        keyStorepass: '',
        keyconStorepass: '',
        commonName: 'commonName',
        organizationUnit: 'organizationUnit',
        organizationName: 'organizationName',
        localityName: 'localityName',
        stateName: 'stateName',
        country: 'country',
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
          document.querySelector('.index_PG-keystore .ui-f-input').value = ''
          document.querySelector('.index_PG-keystore .ui-f-input').click()
        } break
        case 1: {
          if (this.keyConfig.keyStorepass != this.keyConfig.keyconStorepass) {
            this.$error({
              title: '错误！',
              content: '两次输入的密钥库口令不相同',
            })
          }
          if (this.keyConfig.keyPass === '') {
            this.keyConfig.keyPass = this.keyConfig.keyStorepass
          }
          
          this.$store.commit('runCmd', 
            'keytool -genkey' + 
            ' -keysize ' + this.keyConfig.keySize + 
            ' -keyalg ' + this.keyConfig.keyAlg + 
            ' -validity ' + this.keyConfig.keyDay + 
            ' -alias ' + this.keyConfig.keyAlias + 
            ' -keypass ' + this.keyConfig.keyPass + 
            ' -storepass ' + this.keyConfig.keyStorepass + 
            ' -dname \"' + 
              'CN=' + this.keyConfig.commonName + ',' + 
              'OU=' + this.keyConfig.organizationUnit + ',' + 
              'O=' + this.keyConfig.organizationName + ',' + 
              'L=' + this.keyConfig.localityName + ',' + 
              'ST=' + this.keyConfig.stateName + ',' + 
              'C=' + this.keyConfig.country + '\"' + 
            ' -keystore \"' + this.configPath + '\\my.keystore\"'
          )

          this.$socket.emit('CLIENT_GEN_KEY', this.configPath, this.keyConfig)
        } break
      }
    },
    inputChange: function (event) {
      let reader = new FileReader()
      reader.readAsText(event.target.files[0], 'gb2312')
      reader.onload = (event) => {
        if (event.target.result.indexOf('keyAlias') != -1 && event.target.result.indexOf('keyPass') != -1) {
          this.keyConfig = JSON.parse(event.target.result)
        } else {
          this.$error({
            title: '错误！',
            content: '配置文件信息不正确。',
          })
        }
      }
    },
    dataInit: function () {
      this.configPath = this.$store.state.config.projectPath + "\\" + this.$store.state.UIprojectsStatus + '\\platforms\\android\\app\\build\\outputs\\apk'      
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