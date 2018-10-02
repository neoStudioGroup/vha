#!/usr/bin/env node
'use strict';

const glb = require('./global.js');
const config = require('../bin/config.js')
const func = require('./func.js');

// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

//重载
async function reloding () {
  try {
    //读取配置文件
    glb.config = await config.readConfig()
    //读取项目目录
    glb.project = await func.readProject()
    //处理icon图标
    await func.procIcons()
    
    console.table(glb.config)
    console.table(glb.project)
  } catch (error) {
    console.log(error + '\n错误：重载时')
  }
}

// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

module.exports = {
  reloding: () => {
    return reloding()
  }
}