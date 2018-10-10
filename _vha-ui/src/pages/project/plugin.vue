<style lang="stylus">
.index_PG-plugin
  height 100%
  ._UI-pluginBox
    margin 20px
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
  <div class="index_PG-plugin _df _fdc">
    <div class="_UI-pluginBox">
      
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
          <a-checkbox @change="onChange($event, item)" :checked="item.ckd"></a-checkbox>
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
          <a-checkbox @change="onChange($event, item)" :checked="item.ckd"></a-checkbox>
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
          <a-checkbox @change="onChange($event, item)" :checked="item.ckd"></a-checkbox>
        </a-list-item>
      </a-list>
    
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
export default {
  name: 'indexPGplugin',
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
          cn: '启动屏幕',
          ckd: false,
          name: 'cordova-plugin-splashscreen'
        },
        {
          en: 'StatusBar',
          cn: '状态栏',
          ckd: false,
          name: 'cordova-plugin-statusbar'
        },
        {
          en: 'Network',
          cn: '网络状态',
          ckd: false,
          name: 'cordova-plugin-network-information'
        },
        {
          en: 'Clipboard',
          cn: '剪贴板',
          ckd: false,
          name: 'cordova-plugin-vha-clipboard'
        },
        {
          en: 'Toast',
          cn: '信息提示',
          ckd: false,
          name: 'cordova-plugin-x-toast'
        },
        {
          en: 'Dialogs',
          cn: '对话框',
          ckd: false,
          name: 'cordova-plugin-dialogs'
        },
        {
          en: 'File',
          cn: '文件',
          ckd: false,
          name: 'cordova-plugin-file'
        },
        {
          en: 'File Transfer',
          cn: '文件传输',
          ckd: false,
          name: 'cordova-plugin-file-transfer'
        },
        {
          en: 'File Opener2',
          cn: '打开文件',
          ckd: false,
          name: 'cordova-plugin-file-opener2'
        },
        {
          en: 'Image Picker',
          cn: '系统相册',
          ckd: false,
          name: 'cordova-plugin-mediapicker-dmcbig'
        },
        {
          en: 'Native Audio',
          cn: '播放音乐',
          ckd: false,
          name: 'cordova-plugin-nativeaudio'
        },
        {
          en: 'Contacts',
          cn: '通讯录管理',
          ckd: false,
          name: 'cordova-plugin-contacts'
        },
        {
          en: 'SMS',
          cn: '短信',
          ckd: false,
          name: 'cordova-sms-plugin'
        },
        {
          en: 'In App Browser',
          cn: '内置浏览器',
          ckd: false,
          name: 'cordova-plugin-inappbrowser'
        },
        {
          en: 'App Version',
          cn: '应用版本',
          ckd: false,
          name: 'cordova-plugin-app-version'
        },
        {
          en: 'App Availability',
          cn: '应用是否存在',
          ckd: false,
          name: 'cordova-plugin-appavailability'
        },
        {
          en: 'App Rate',
          cn: '应用评价',
          ckd: false,
          name: 'cordova-plugin-apprate'
        },
        {
          en: 'App Preferences',
          cn: '应用配置项',
          ckd: false,
          name: 'cordova-plugin-vha-apppreferences'
        }
      ],
      DevicePluginData: [
        {
          en: 'Device',
          cn: '设备信息',
          ckd: false,
          name: 'cordova-plugin-device'
        },
        {
          en: 'Battery Status',
          cn: '电池信息',
          ckd: false,
          name: 'cordova-plugin-battery-status'
        },
        {
          en: 'Globalization',
          cn: '地区/时区',
          ckd: false,
          name: 'cordova-plugin-globalization'
        },
        {
          en: 'Geolocation',
          cn: '地理位置',
          ckd: false,
          name: 'cordova-plugin-baidumaplocation'
        },
        {
          en: 'Camera',
          cn: '摄像头拍照',
          ckd: false,
          name: 'cordova-plugin-camera'
        },
        {
          en: 'Capture',
          cn: '录制',
          ckd: false,
          name: 'cordova-plugin-media-capture'
        },
        {
          en: 'Media',
          cn: '录制音频',
          ckd: false,
          name: 'cordova-plugin-media'
        },
        {
          en: 'Barcode Scanner',
          cn: '条形码/二维码扫描',
          ckd: false,
          name: 'cordova-plugin-vha-barcodescanner'
        },
        {
          en: 'Device Orientation',
          cn: '方向传感器',
          ckd: false,
          name: 'cordova-plugin-device-orientation'
        },
        {
          en: 'Device Motion',
          cn: '陀螺仪传感器',
          ckd: false,
          name: 'cordova-plugin-device-motion'
        },
        {
          en: 'Flash light',
          cn: '闪光灯',
          ckd: false,
          name: 'cordova-plugin-flashlight'
        },
        {
          en: 'Vibration',
          cn: '震动',
          ckd: false,
          name: 'cordova-plugin-vibration'
        },
        {
          en: 'iBeacon',
          cn: 'iBeacon',
          ckd: false,
          name: 'cordova-plugin-ibeacon'
        },
        {
          en: 'Bluetooth',
          cn: '蓝牙',
          ckd: false,
          name: 'cordova-plugin-ble-central'
        }
      ],
      OtherPluginData: [
        {
          en: 'SQLite',
          cn: '本地数据库',
          ckd: false,
          name: 'cordova-sqlite-storage'
        }
      ]
    }
  },
  components: {
    //组件 - 引入或定义
  },
  computed: {
    //计算 - 缓存结果,变动时执行
  },
  methods: {
    //方法 - 每次进入页面创建
    onChange: function (event, item) {
      let store = this.$store

      this.$confirm({
        title: '是否' + (!item.ckd ? '安装' : '卸载') + '该插件?  ' + item.cn,
        content: item.name,
        okText: "确认",
        cancelText: "取消",
        onOk() {
          item.ckd = !item.ckd
          store.commit('runCmd', 'cordova plugin ' + (!item.ckd ? 'remove' : 'add') + ' ' + item.name)
        },
        onCancel() {
          
        },
      })
    },
    dataInit: function () {
      let tmp_names = ''
      
      this.$store.state.plugins.forEach(element => {
        tmp_names += element + '|'
      })
      
      this.SystemPluginData.forEach(element => {
        if (tmp_names.indexOf(element.name + '|') != -1)
          element.ckd = true
        else
          element.ckd = false
      })
      
      this.DevicePluginData.forEach(element => {
        if (tmp_names.indexOf(element.name + '|') != -1)
          element.ckd = true
        else
          element.ckd = false
      })
      
      this.OtherPluginData.forEach(element => {
        if (tmp_names.indexOf(element.name + '|') != -1)
          element.ckd = true
        else
          element.ckd = false
      })
    }
  },
  watch: {
    //观察 - 数据或方法
    '$store.state.plugins': function () {
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