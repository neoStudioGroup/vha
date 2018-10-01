#!/usr/bin/env node
'use strict';

const fs = require("fs");
const glb = require('../bin/global.js');
const util = require('util');

const fsReaddir = util.promisify(fs.readdir);
const fsStat = util.promisify(fs.stat);

// --------------------------------------------------------------------------------

// 清空项目图标文件夹 复制项目图标
(async function doicons () {

  await fsReaddir('./www/icons/').then((files) => {
    files.forEach(element => {
      fs.unlink('./www/icons/' + element, function (unlink) {
        // console.log(unlink)
      })
    })
  }, (error) => {
    console.log(error)
  })
    
  for (const element of glb.project.Projects) {
    await fsStat(glb.config.projectPath + '/' + element.name + '/resources/icon.png').then((stats) => {
      element.src = 'http://localhost:' + glb.config.servePort + '/icons/' + element.name + '.png'
      let readStream = fs.createReadStream(glb.config.projectPath + '/' + element.name + '/resources/icon.png')
      let writeStream = fs.createWriteStream('./www/icons/' + element.name + '.png')
      readStream.pipe(writeStream)
    }, (error) => {
      // console.log("文件不存在", error)
    })
  }
  
})()
