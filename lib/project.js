#!/usr/bin/env node
'use strict';

const fs = require("fs");
const glb = require('../bin/global.js');
const util = require('util');

const fsReaddir = util.promisify(fs.readdir);
// --------------------------------------------------------------------------------

async function _getProjects () {
  let tmp_projects = []
  
  await fsReaddir(glb.config.projectPath).then((result) => {
    
    result.forEach(element => {
      let tmp_project = {
        name: element,
        src: ''
      }
      
      var stat = fs.lstatSync(glb.config.projectPath + '/' + element)
      if (stat.isDirectory()) {
        tmp_projects.push(tmp_project)
      }
    })
    
  }).catch((reason) => {
    console.log('失败：' + reason)
  })
  
  return tmp_projects
}

// --------------------------------------------------------------------------------
module.exports = {
  getProjects: () => {
    return _getProjects()
  }
}
