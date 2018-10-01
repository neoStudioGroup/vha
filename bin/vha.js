#!/usr/bin/env node
'use strict';

(async function init () {
  const glb = require('./global.js')
  
  // 引入配置文件模块: ---------------------------------------------
  const tmp_config = require('./config.js')
  await tmp_config.init()
  
  // 引入初始化模块: ---------------------------------------------
  const tmp_project = require('../lib/project.js')
  glb.project = {
    Choose: '',
    Projects: await tmp_project.getProjects()
  }
  
  // console.log('---- 项目配置 start ----')
  // console.log(JSON.stringify(glb.project, null, 2))
  // console.log('---- 项目配置 end ----')
  // console.log('')
  
  require('../lib/init.js')

  // 判断运行参数: ---------------------------------------------
  function run(obj) {
    if(obj[0] === 'ui'){
      require('../lib/ui')
    }else if(obj[0] === '-v'){
      console.log('version is 1.0.0')
    }else if(obj[0] === '-h'){
      console.log('')
      console.log('>  ui 可视化vue-Hebrid-App构建工具")')
      console.log('>  -v --version [show version]')
    }else{
      console.log('')
      console.log('>  ui 可视化vue-Hebrid-App构建工具")')
      console.log('>  -v --version [show version]')
    }
  }
  
  run(process.argv.slice(2))
})()


