<style lang="stylus">
.index_PG-icon
  height 100%
  >._UI-content
    padding 20px
    padding-top 40px
    
    .avatar-uploader > .ant-upload {
      width: 180px;
      height: 180px;
    }
    .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
    }
    .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }

    ._UI-iconInfoBox
      margin-right 30px
      .ui-i-iconbox
        margin 6px
        span
          margin 4px auto 0
          font-size 12px
      .ui-i-span
        margin 2px auto
      
</style>
--------------------------------------------------------------------------------
<template>
  <div class="index_PG-icon _df _fdc">
    <div class="_UI-content _flexYauto">
      
      <a-row class="_UI-table ui-t_title" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="13"><h2>选择源图片</h2></a-col>
        <a-col :span="10"></a-col>
      </a-row>
      
      <a-row class="_UI-table">
        <a-col :span="1"></a-col>
        <a-col :span="13">
          
          <a-upload
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            action=" "
            :beforeUpload="beforeUpload"
          >
            <img class="ui-t-img" v-if="imageUrl" :src="imageUrl" style="max-width: 162px;max-height: 162px;" />
            <div v-else>
                <a-icon type="plus" />
                <div class="ant-upload-text">打开图片</div>
            </div>
          </a-upload>
            
        </a-col>
        <a-col :span="10"></a-col>
      </a-row>
      
      <a-row class="_UI-table" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="12"><p class="ui-t-note">必须是1024*1024的png图片。</p></a-col>
        <a-col :span="11"></a-col>
      </a-row>
      
      <!-- --------- -->
      <a-row class="_UI-table ui-t_title" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="13"><h2>Android 图标</h2></a-col>
        <a-col :span="10"></a-col>
      </a-row>

      <a-row class="_UI-table ui-t-android" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="13">
          <div class="_UI-iconInfoBox _dif _fdc">
            <div style="border-bottom:1px solid #ddd">
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-ldpi" width="36" height="36" data-name="drawable-ldpi-icon"></canvas>
                <span>ldpi 36*36</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-mdpi" width="48" height="48" data-name="drawable-mdpi-icon"></canvas>
                <span>mdpi 48*48</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-hdpi" width="72" height="72" data-name="drawable-hdpi-icon"></canvas>
                <span>hdpi 72*72</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-xhdpi" width="96" height="96" data-name="drawable-xhdpi-icon"></canvas>
                <span>xhdpi 96*96</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-xxhdpi" width="144" height="144" data-name="drawable-xxhdpi-icon"></canvas>
                <span>xxhdpi 144*144</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-xxxhdpi" width="192" height="192" data-name="drawable-xxxhdpi-icon"></canvas>
                <span>xxxhdpi 192*192</span>
              </div>
            </div>
            <span class="ui-i-span">APP图标</span>
          </div>
        </a-col>
        <a-col :span="10"></a-col>
      </a-row>


      <!-- --------- -->
      <a-row class="_UI-table ui-t_title" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="13"><h2>iPhone 图标</h2></a-col>
        <a-col :span="10"></a-col>
      </a-row>

      <a-row class="_UI-table ui-t-ios" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="13">
          <div class="_UI-iconInfoBox _dif _fdc">
            <div style="border-bottom:1px solid #ddd">
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-iPhone61" width="57" height="57" data-name="icon"></canvas>
                <span>57*57</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-iPhone612" width="114" height="114" data-name="icon@2x"></canvas>
                <span>114*114</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-iPhone7" width="60" height="60" data-name="icon-60"></canvas>
                <span>60*60</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-iPhone72" width="120" height="120" data-name="icon-60@2x"></canvas>
                <span>120*120</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-iPhone8" width="180" height="180" data-name="icon-60@3x"></canvas>
                <span>180*180</span>
              </div>
            </div>
            <span class="ui-i-span">iPhone / iPod Touch程序图标</span>
          </div>
        </a-col>
        <a-col :span="10"></a-col>
      </a-row>
      <a-row class="_UI-table ui-t-ios" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="13">
          <div class="_UI-iconInfoBox _dif _fdc">
            <div style="border-bottom:1px solid #ddd">
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-Settings1" width="29" height="29" data-name="icon-small"></canvas>
                <span>29*29</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-Settings2" width="58" height="58" data-name="icon-small@2x"></canvas>
                <span>58*58</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-Settings3" width="87" height="87" data-name="icon-small@3x"></canvas>
                <span>87*87</span>
              </div>
            </div>
            <span class="ui-i-span">iPhone Spotlight and Settings图标</span>
          </div>
          <div class="_UI-iconInfoBox _dif _fdc">
            <div style="border-bottom:1px solid #ddd">
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-Spotlight1" width="40" height="40" data-name="icon-40"></canvas>
                <span>40*40</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-Spotlight2" width="80" height="80" data-name="icon-40@2x"></canvas>
                <span>80*80</span>
              </div>
            </div>
            <span class="ui-i-span">Spotlight 图标</span>
          </div>
        </a-col>
        <a-col :span="10"></a-col>
      </a-row>


      <!-- --------- -->
      <a-row class="_UI-table ui-t_title" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="13"><h2>iPad 图标</h2></a-col>
        <a-col :span="10"></a-col>
      </a-row>

      <a-row class="_UI-table ui-t-ios" type="flex" justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="13">
          <div class="_UI-iconInfoBox _dif _fdc">
            <div style="border-bottom:1px solid #ddd">
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-iPad1" width="76" height="76" data-name="icon-76"></canvas>
                <span>76*76</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-iPad2" width="152" height="152" data-name="icon-76@2x"></canvas>
                <span>152*152</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-iPad3" width="72" height="72" data-name="icon-72"></canvas>
                <span>72*72</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-iPad4" width="144" height="144" data-name="icon-72@2x"></canvas>
                <span>144*144</span>
              </div>
            </div>
            <span class="ui-i-span">iPad图标</span>
          </div>
          <div class="_UI-iconInfoBox _dif _fdc">
            <div style="border-bottom:1px solid #ddd">
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-iPadPro" width="167" height="167" data-name="icon-83.5@2x"></canvas>
                <span>167*167</span>
              </div>
            </div>
            <span class="ui-i-span">iPad Pro图标</span>
          </div>
          <div class="_UI-iconInfoBox _dif _fdc">
            <div style="border-bottom:1px solid #ddd">
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-Settings1" width="50" height="50" data-name="iconicon-50"></canvas>
                <span>50*50</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc">
                <canvas class="ui-t-Settings2" width="100" height="100" data-name="iconicon-50@2x"></canvas>
                <span>100*100</span>
              </div>
              <div class="ui-i-iconbox _dif _fdc" style="display:none">
                <canvas class="ui-t-Settings3" width="1024" height="1024" data-name="icon-1024"></canvas>
                <span>1024*1024</span>
              </div>
            </div>
            <span class="ui-i-span">iPad Spotlight and Settings图标</span>
          </div>
        </a-col>
        <a-col :span="10"></a-col>
      </a-row>




    </div>
    <div class="_UI-footer">
      <UI-select :buttons="['打开资源文件夹', '生成图标资源']" :callback="buttonCallback"></UI-select>
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script type="text/ecmascript-6">
import UISelect from "../../components/select"

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  name: 'indexPGicon',
  beforeCreate() {
    //实例创建之前
  },
  props: {
    //父组件参数
  },
  data() {
    //动态数据
    return {
      imageUrl: ''
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
    CLIENT_GEN_ICON: function (_savePath, _query) {
      let temp_iocnInfo = {
        savePath: _savePath,
        icondatas: []
      }
      
      let canvas = document.querySelectorAll(_query)
      canvas.forEach(element => {
        temp_iocnInfo.icondatas.push({
          name: element.getAttribute('data-name') + '.png',
          base64Data: element.toDataURL().replace(/^data:image\/\w+;base64,/, "")
        })
      })
      
      this.$socket.emit('CLIENT_GEN_ICON', temp_iocnInfo)
    },
    buttonCallback: function (index) {
      switch (index) {
        case 0: {
          this.$store.commit("runCmd", "start " + this.$store.state.config.projectPath + "\\" + this.$store.state.config.choose + "\\resources")
        } break
        case 1: {
          this.CLIENT_GEN_ICON('\\resources\\android\\icon', '.index_PG-icon .ui-t-android canvas')
          this.CLIENT_GEN_ICON('\\resources\\ios\\icon', '.index_PG-icon .ui-t-ios canvas')
        } break
      }
    },
    beforeUpload : function (file) {
      if (file.type != 'image/png') {
        this.$message.error('只允许png格式的图片。')
        return false
      }
      getBase64(file, (imageUrl) => {
        let image = new Image()
        image.src= imageUrl
        image.onload = () => {
          if (image.width != 1024 || image.height != 1024) {
            this.$message.error('尺寸必须为1024*1024。')
            return false
          }
          
          let canvas = document.querySelectorAll(".index_PG-icon canvas")
          canvas.forEach(element => {
            let ctx = element.getContext("2d")
            ctx.imageSmoothingQuality = "high"
            ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
          })
          
          this.imageUrl = imageUrl
        }
      })
      return true
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