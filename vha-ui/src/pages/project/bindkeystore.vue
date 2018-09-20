<style lang="stylus">
.p_UI-bindkeystore
  height 100%
  >.ui-content
    padding 20px
    .UI-lists
      td
        height 50px
      td:first-child
        padding-right 10px
        text-align right
      h2
        width 100%
        /* margin-right 50px */
        padding-bottom 10px
        margin-bottom 10px
        color #777
        border-bottom 3px solid #ddd
      ._noteB
        color #999
        font-size 12px

</style>
--------------------------------------------------------------------------------
<template>
  <div class="p_UI-bindkeystore _df _fdc">
    <div class="ui-content _flexYauto">

      <table class="UI-lists" border="0">
        <tr>
          <th style="width: 180px;padding: 2px;"></th>
          <th></th>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <h2>签名文件</h2>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            (keypass) 存取密码：
          </td>
          <td>
            <a-input />
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">别名条目的密码(私钥)留空则与密钥库相同</p>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            (storepass) 密钥库口令：
          </td>
          <td>
            <a-input />
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">密钥库的密码(获取keystore信息所需的密码)</p>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            待签名密钥别名：
          </td>
          <td>
            <a-input placeholder="myKeystore" value="myKeystore"/>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            待签名证书：
          </td>
          <td style="height:80px">
            <a-input />
            <input type="file"/>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            待签名APK：
          </td>
          <td style="height:80px">
            <a-input />
            <input type="file"/>
          </td>
        </tr>
      </table>
      
    </div>
    <div class="ui-footer">
      <UIselect></UIselect>
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
import UIselect from "../../components/_UI-select"
export default {
  name: 'p_UI-bindkeystore',
  beforeCreate() {
    //实例创建之前
  },
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
    }
  },
  components: {
    //组件 - 引入或定义
    UIselect
  },
  computed: {
    //计算 - 缓存结果,变动时执行
  },
  methods: {
    //方法 - 每次进入页面创建
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