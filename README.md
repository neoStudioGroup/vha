
<h1 align="center">Vue Hybrid App</h1>
<p align="center">
  <em>Vue hybrid app 可视化构建平台 (vue混合移动开发集成解决方案)</em>
</p>

<p align="center"><img align="center" width="200" src="https://raw.githubusercontent.com/neoStudioGroup/vha/master/README/logo.png"/></p>
<p align="center"><img align="center" src="https://raw.githubusercontent.com/neoStudioGroup/vha/master/README/logo-ex.png"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/vha"><img src="https://badgen.net/npm/v/vha" alt="Version"></a>
  <a href="https://codeload.github.com/neoStudioGroup/vha/zip/master"><img src="https://badgen.net/npm/dt/vha" alt="downloads"></a>
  <a href="https://github.com/neoStudioGroup/vha/blob/master/LICENSE"><img src="https://badgen.net/npm/license/vha" alt="License"></a>
</p>

<div align="center">

[![NPM](https://nodei.co/npm/vha.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vha/)

</div>

## 关于vha

vha是实现vue混合移动开发的整合方案。使用ui工具可以快速方便的实现Cordova项目搭建、编译、修改、生成资源&证书等操作。（未来会加入各平台小程序的一键构建）

### 联系我们

临时官方讨论QQ群：928059701

### 当前版本

vha: 0.6.0
vha-components: 0.8.0
vha-native: 0.8.0
vha-appDemo: 1.0.0

## 传送门

[vha官网](https://neostudiogroup.github.io/vha/) | [vha-components文档](https://neostudiogroup.github.io/vha-components/) | [vha-native文档](https://neostudiogroup.github.io/vha-native/)

[vha(Github)](https://github.com/neoStudioGroup/vha) | [vha-components(Github)](https://github.com/neoStudioGroup/vha-components) | [vha-native(Github)](https://github.com/neoStudioGroup/vha-native) | [vha-appDemo(Github)](https://github.com/neoStudioGroup/vha-appDemo)

[vha-components (在线演示)](https://neostudiogroup.github.io/vha-appDemo/#/) | [vha-appDemo (Apk文件)](https://github.com/neoStudioGroup/vha-appDemo/releases/download/1.0.0/vha-appDemo.apk)

## 技术栈

VueCli3.0 + VueRouter + Vuex + Stylu + vha-components + vha-native(Cordova)

## 开始

```shell
npm install vha cordova -g
```

```shell
vha ui
vha -v
```

### 如何使用

1.点击左下角设置按钮

<img src="https://raw.githubusercontent.com/neoStudioGroup/vha/master/README/1.png"/>

2.设置一个工程目录(存放所有vha项目)

<img src="https://raw.githubusercontent.com/neoStudioGroup/vha/master/README/2.png"/>

3.点击加号按钮

<img src="https://raw.githubusercontent.com/neoStudioGroup/vha/master/README/3.png"/>

4.选择喜欢的模板. 源可以是oschina或者github

<img src="https://raw.githubusercontent.com/neoStudioGroup/vha/master/README/4.png"/>

5.vha不会执行npm install. 创建好项目后双击进入项目自行选择npm或cnpm安装相应包后就可以npm run serve启动了.

<br/>
<br/>
<br/>

<img src="https://raw.githubusercontent.com/neoStudioGroup/vha/master/README/1.gif"/>

### License

[MIT](https://github.com/neoStudioGroup/vha/blob/master/LICENSE)

<!-- 
vha create
vha resources

vha run serve
vha run build

vha cordova platform add android
vha cordova plugin add xxx
vha cordova emulate android
vha cordova run android
vha cordova build android
vha cordova build android --release 
-->
