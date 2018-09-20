<style lang="stylus">
.p_UI-plugin
  height 100%
  >.ui-content
    padding 20px
    .p_UI-pluginBox
      // margin 20px
      width 600px
    .ant-list
      background-color #fff
      .ant-list-item
        padding 10px 20px
      .ant-checkbox-inner
        width 24px
        height 24px
        &:after
          top 3px
          left 6px
          width 8px
          height 12px

</style>
--------------------------------------------------------------------------------
<template>
  <div class="p_UI-plugin _df _fdc">
    <div class="ui-content _flexYauto">
      <div class="p_UI-pluginBox">
        
        <a-divider orientation="left">系统 System</a-divider>
        
        <a-list
          size="large"
          bordered
          :dataSource="SystemPluginData"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta :description="item.cn">
              <h3 slot="title">{{item.en}}</h3>
            </a-list-item-meta>
            <a-checkbox @change="onChange($event, item.en)" :schecked="false"></a-checkbox>
          </a-list-item>
        </a-list>
        
        <a-divider orientation="left">设备 Device</a-divider>
        
        <a-list
          size="large"
          bordered
          :dataSource="DevicePluginData"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta :description="item.cn">
              <h3 slot="title">{{item.en}}</h3>
            </a-list-item-meta>
            <a-checkbox @change="onChange($event, item.en)" :schecked="false"></a-checkbox>
          </a-list-item>
        </a-list>
        
        <a-divider orientation="left">其它 Other</a-divider>
        
        <a-list
          size="large"
          bordered
          :dataSource="OtherPluginData"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta :description="item.cn">
              <h3 slot="title">{{item.en}}</h3>
            </a-list-item-meta>
            <a-checkbox @change="onChange($event, item.en)" :schecked="false"></a-checkbox>
          </a-list-item>
        </a-list>
      
      </div>
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
  name: 'pUIplugin',
  beforeCreate() {
    //实例创建之前
  },
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
      SystemPluginData: [
        {
          en: 'Splashscreen',
          cn: '启动屏幕'
        },
        {
          en: 'StatusBar',
          cn: '状态栏'
        },
        {
          en: 'Network',
          cn: '网络状态'
        },
        {
          en: 'Clipboard',
          cn: '剪贴板'
        },
        {
          en: 'Toast',
          cn: '信息提示'
        },
        {
          en: 'Dialogs',
          cn: '对话框'
        },
        {
          en: 'File',
          cn: '文件'
        },
        {
          en: 'File Transfer',
          cn: '文件传输'
        },
        {
          en: 'File Opener2',
          cn: '打开文件'
        },
        {
          en: 'Image Picker',
          cn: '系统相册'
        },
        {
          en: 'Native Audio',
          cn: '播放音乐'
        },
        {
          en: 'Contacts',
          cn: '通讯录管理'
        },
        {
          en: 'SMS',
          cn: '短信'
        },
        {
          en: 'In App Browser',
          cn: '内置浏览器'
        },
        {
          en: 'App Version',
          cn: '应用版本'
        },
        {
          en: 'App Availability',
          cn: '应用是否存在'
        },
        {
          en: 'App Rate',
          cn: '应用评价'
        },
        {
          en: 'App Preferences',
          cn: '应用配置项'
        }
      ],
      DevicePluginData: [
        {
          en: 'Device',
          cn: '设备信息'
        },
        {
          en: 'Battery Status',
          cn: '电池信息'
        },
        {
          en: 'Globalization',
          cn: '地区/时区'
        },
        {
          en: 'Geolocation',
          cn: '地理位置'
        },
        {
          en: 'Camera',
          cn: '摄像头拍照'
        },
        {
          en: 'Capture',
          cn: '录制'
        },
        {
          en: 'Media',
          cn: '录制音频'
        },
        {
          en: 'Barcode Scanner',
          cn: '条形码/二维码扫描'
        },
        {
          en: 'Device Orientation',
          cn: '方向传感器'
        },
        {
          en: 'Device Motion',
          cn: '陀螺仪传感器'
        },
        {
          en: 'Flash light',
          cn: '闪光灯'
        },
        {
          en: 'Vibration',
          cn: '震动'
        },
        {
          en: 'iBeacon',
          cn: 'iBeacon'
        },
        {
          en: 'Bluetooth',
          cn: '蓝牙'
        }
      ],
      OtherPluginData: [
        {
          en: 'SQLite',
          cn: '本地数据库'
        }
      ]
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
    onChange: function (event, name) {
      event.target.checked = !event.target.checked
      console.log(event.target.checked, name)
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