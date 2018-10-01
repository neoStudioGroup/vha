#!/usr/bin/env node
'use strict';

const fs = require("fs");
const glb = require('./global.js')

// --------------------------------------------------------------------------------

function init () {
  glb.config = getConfig()
  // glb.config.projectPath = "F:\共享文件夹\下载"
  // saveConfig(glb.config)

  // console.log('')
  // console.log('---- 读取配置 start ----')
  // console.log(JSON.stringify(glb.config, null, 2))
  console.table(glb.config)
  // console.log('---- 读取配置 end ----')
  // console.log('')
}

function getConfig () {
  try {
    let data = fs.readFileSync('bin/config.json', 'utf-8')
    // let str = data.replace(/\//g, "\\")
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
  }
}

function saveConfig (config) {
  try {
    fs.writeFileSync('bin/config.json', JSON.stringify(config, null, 2))
  } catch (err) {
    console.log(err)
  }
}

// --------------------------------------------------------------------------------

module.exports = {
  init: () => {
    return init()
  },
  getConfig: () => {
    return getConfig()
  },
  saveConfig: (...args) => {
    return saveConfig(...args)
  }
}
