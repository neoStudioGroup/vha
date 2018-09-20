<style lang="stylus">
.p_UI-keystore
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
  <div class="p_UI-keystore _df _fdc">
    <div class="ui-content _flexYauto">


      <table class="UI-lists" border="0">
        <tr>
          <th style="width: 270px;padding: 2px;"></th>
          <th></th>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <h2>证书信息</h2>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            密钥尺寸(单位/bit)：
          </td>
          <td>
            <a-input placeholder="2048" value="2048"/>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            密钥加密算法：
          </td>
          <td>
            <a-input placeholder="RSA" value="RSA"/>
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">密钥的算法,如RSA、DSA（默认RSA）</p>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            密钥有效期(单位/天)：
          </td>
          <td>
            <a-input placeholder="36000" value="36000"/>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            密钥别名：
          </td>
          <td>
            <a-input placeholder="myKeystore" value="myKeystore"/>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            (keypass) 存取密码：
          </td>
          <td>
            <a-input placeholder="myKeystore" value="myKeystore"/>
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">别名条目的密码(私钥)留空则与密钥库相同</p>
          </td>
        </tr>
        
        <tr>
          <td>
          </td>
          <td>
            <h2 style="margin-top: 20px;">证书拥有者信息<a style="margin-left:8px;font-size: 12px;font-weight:normal;" href="http://bbs.ionic-china.com/read-133.html" target="_blank">如何查看签名文件信息?</a></h2>
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
            确认密钥库口令：
          </td>
          <td>
            <a-input />
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">确定密钥库的密码</p>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            您的名字与姓氏是什么?：
          </td>
          <td>
            <a-input placeholder="commonName" value="commonName"/>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            您的组织单位名称是什么?：
          </td>
          <td>
            <a-input placeholder="organizationUnit" value="organizationUnit"/>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            您的组织名称是什么?：
          </td>
          <td>
            <a-input placeholder="organizationName" value="organizationName"/>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            您所在的城市或区域名称是什么?：
          </td>
          <td>
            <a-input placeholder="localityName" value="localityName"/>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            您所在的省/市/自治区名称是什么?：
          </td>
          <td>
            <a-input placeholder="stateName" value="stateName"/>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            该单位的双字母国家/地区代码是什么?：
          </td>
          <td>
            <a-input placeholder="country" value="country"/>
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
  name: 'p_UI-keystore',
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