#!/usr/bin/env node
'use strict';

const glb = require('./global.js');

const fs = require("fs");
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

//读取配置文件
function readConfig () {
  return new Promise (async function (resolve, reject) {
    try {
      let data = await readFile(__dirname + glb.debug ? '\\config_debug.json' : '\\config.json', 'utf-8')
      resolve (JSON.parse(data))
    } catch (error) {
      // console.log(error + '\n错误：读取配置文件')
      reject(error + '\n错误：读取配置文件')
    }
  })
}

//写入配置文件
function saveConfig (config) {
  return new Promise (async function (resolve, reject) {
    try {
      await writeFile(__dirname + glb.debug ? '\\config_debug.json' : '\\config.json', JSON.stringify(config, null, 2))
      resolve ()
    } catch (error) {
      // console.log(error + '\n错误：写入配置文件')
      reject(error + '\n错误：写入配置文件')
    }
  })
}

// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

module.exports = {
  readConfig: () => {
    return readConfig()
  },
  saveConfig: (...args) => {
    return saveConfig(...args)
  }
}
