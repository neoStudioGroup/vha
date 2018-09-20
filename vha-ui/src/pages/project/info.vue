<style lang="stylus">
.p_UI-info
  height 100%
  >.ui-content
    padding 20px
    .UI-lists
      td
        height 40px
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
        margin-top 8px
        color #999
        font-size 12px

</style>
--------------------------------------------------------------------------------
<template>
  <div class="p_UI-info _df _fdc">
    <div class="ui-content _flexYauto">

      <table class="UI-lists" border="0">
        <tr>
          <th style="width: 100px;padding: 2px;"></th>
          <th></th>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <h2>项目信息</h2>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            名称：
          </td>
          <td>
            <a-input placeholder="large size" />
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">输入中文后程序会将文件自动转为UTF8编码</p>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            版本：
          </td>
          <td>
            <a-input placeholder="large size" />
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">项目的版本 显示在应用管理中</p>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            ID：
          </td>
          <td>
            <a-input placeholder="large size" />
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">文件夹的标识 要符合com.xxxx.xxxx</p>
          </td>
        </tr>
        <!-- ========== --> 
        <tr>
          <td>
            描述：
          </td>
          <td>
            <a-input placeholder="large size" />
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <p class="_noteB">项目的描述 显示在应用管理中</p>
          </td>
        </tr>
        
        <tr>
          <td>
          </td>
          <td>
            <h2 style="margin-top: 20px;">包信息</h2>
          </td>
        </tr>
        <!-- ========== --> 
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
        <!-- ========== --> 
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
        <!-- ========== --> 
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
  name: 'p_UI-info',
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