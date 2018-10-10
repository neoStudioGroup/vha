#!/usr/bin/env node
'use strict';

async function run(obj) {
  if(obj[0] === 'ui'){
    // require('./_apis.js').reloding()
    require('./Start_ui.js')
  }else if(obj[0] === '-v'){
    console.log('version is -.-.-')
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