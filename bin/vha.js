#!/usr/bin/env node
'use strict';

async function run(obj) {
  if(obj[0] === 'ui'){
    await require('../lib/init.js').reloding()
    await require('../lib/ui')
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