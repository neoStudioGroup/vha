#!/usr/bin/env node
'use strict';

const fs = require("fs");
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

//读取配置文件
async function readConfig () {
  try {
    let data = await readFile('bin/config.json', 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.log(error + '\n错误：读取配置文件')
  }
}

//写入配置文件
async function saveConfig (config) {
  try {
    await writeFile('bin/config.json', JSON.stringify(config, null, 2))
  } catch (error) {
    console.log(error + '\n错误：写入配置文件')
  }
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
