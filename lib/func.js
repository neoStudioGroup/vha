#!/usr/bin/env node
'use strict';

const glb = require('./global.js');

const fs = require("fs");
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const lstat = util.promisify(fs.lstat);

const xml2js = require('xml2js');

// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

//读取项目内文件夹
async function readProject () {
  try {
    if (!glb.config.projectPath)
      throw '未设置项目目录'
    
    let files = await readdir(glb.config.projectPath)
    
    let tmp_projects = []
    //循环输出所有文件
    for (const element of files) {
      let tmp_project = {
        name: element,
        src: ''
      }
      //如果是文件夹就加入
      let stats = await stat(glb.config.projectPath + '/' + element)
      if (stats.isDirectory()) {
        tmp_projects.push(tmp_project)
      }
    }
    
    return tmp_projects
  } catch (error) {
    console.log(error + '\n错误：读取项目目录内子项目')
  }
}

//将项目文件夹内icon复制到服务器www/icon文件夹内
async function procIcons () {
  try {
    if (!glb.config.projectPath)
      throw '未设置项目目录'
    
    //先删除清空icons文件夹内图标文件
    let files = await readdir('./www/icons/')
    files.forEach(element => {
      fs.unlink('./www/icons/' + element, function (unlink) {
        // console.log(unlink)
      })
    })
    
    //循环全局变量内项目文件夹,如果图标文件存在就复制
    for (const element of glb.project) {
      await stat(glb.config.projectPath + '/' + element.name + '/resources/icon.png').then((stats) => {
        element.src = 'http://localhost:' + glb.config.servePort + '/icons/' + element.name + '.png'
        let readStream = fs.createReadStream(glb.config.projectPath + '/' + element.name + '/resources/icon.png')
        let writeStream = fs.createWriteStream('./www/icons/' + element.name + '.png')
        readStream.pipe(writeStream)
      }, (error) => {
        // console.log("图标文件不存在", error)
      })
    }
  } catch (error) {
    console.log(error + '\n错误：处理Icon')
  }
}

//运行cmd命令
function runCmd (code, stdCallback, errorback, cpob) {
  cpob = require('child_process').spawn(code, [], {
    shell: true,
    encoding: 'buffer',
    cwd: glb.config.projectPath + "/" + glb.config.choose
  })
  cpob.stdout.on('data', function (stdout) {
    if(stdCallback)
      stdCallback("stdout", iconv.decode(stdout, 'cp936'))
  })
  cpob.stderr.on('data', function (stderr) {
    if(errorback)
      stdCallback("stderr", iconv.decode(stderr, 'cp936'))
  })
  cpob.on('error', function (code) {
    if(errorback)
      errorback(-1, code)
  })
  cpob.on('exit', function (code) {
    if(errorback)
      errorback(0, code)
  })
}

//退出cmd命令
function exitCmd (cpob) {
  runCmd("taskkill /pid " + cpob.pid + " -t -f")
}

//递归创建目录 异步方法
function mkdirs (dirname, callback) {
  fs.stat(dirname, function (error) {
    if (!error) {
      callback()
    } else {
      // console.log(path.dirname(dirname))
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback)
        // console.log('在' + path.dirname(dirname) + '目录创建好' + dirname  +'目录')
      })
    }
  })
}

//根据位置替换字符串
function replacePos (str, oldStr, newStr, Pos, isAll) {
  if(!Pos)
    Pos = 0
  if(!isAll)
    isAll = false
    
  let tmp_for = str.substring(0, Pos)
  let tmp_back = str.substring(Pos, str.length)
  
  tmp_back = tmp_back.replace(eval('/' + oldStr + '/' + (isAll ? 'g' : '')), newStr)
  return tmp_for + tmp_back
}

//取字符串中间内容
function getStrMid (str, starStr, endStr) {
  let tmp_for = str.indexOf(starStr) + starStr.length
  let tmp_back = str.indexOf(endStr, tmp_for)
  return str.substring(tmp_for, tmp_back)
}

//读取xml并转换成json保存到全局变量,then返回原始数据
function readXml () {
  if (!glb.config.projectPath || !glb.config.choose){
    console.log('未设置项目目录 或 未设置选中项目')
    return
  }
  
  return new Promise (function (resolve, reject) {
    let parser = new xml2js.Parser({explicitArray: false})
    fs.readFile(glb.config.projectPath + "\\" + glb.config.choose + "\\config.xml", function(error, data) {
      if (error)
        reject(error)
      
      parser.parseString(data, function (error, result) {
        glb.xml = result
        resolve(data)
      })
    })
  })
}

//读取Plugins并保存到全局变量
function readPlugins () {
  if (!glb.config.projectPath || !glb.config.choose){
    console.log('未设置项目目录 或 未设置选中项目')
    return
  }
  
  fs.readdir(glb.config.projectPath + "\\" + glb.config.choose + "\\plugins", function(error, data) {
    if(!data)
      return
    
    let tmp_plugins = []
    for (const element of data) {
      let stats = fs.lstatSync(glb.config.projectPath + "\\" + glb.config.choose + "\\plugins\\" + element)
      if (stats.isDirectory()) {
        tmp_plugins.push(element)
      }
    }
    glb.plugins = tmp_plugins
  })
}

//修改当前项目xml资源文件
async function changeXml (val) {
  if (!glb.config.projectPath || !glb.config.choose){
    console.log('未设置项目目录 或 未设置选中项目')
    return
  }
  
  try {
    //先读取一次最新的数据
    let data = await readXml()
    
    let tmp_data = data.toString()
    //根据新数据对应修改
    for (const key in val) {
      if (val.hasOwnProperty(key)) {
        let tmp_strMid = getStrMid(tmp_data, val[key].startMark, val[key].endMark)
        tmp_data = replacePos(tmp_data, tmp_strMid, val[key].value, tmp_data.indexOf(val[key].startMark))
      }
    }
    fs.writeFileSync(glb.config.projectPath + "\\" + glb.config.choose + "\\config.xml", tmp_data)
  } catch (error) {
    console.log(error + '\n错误：修改xml资源')
  }
}

//生成keyConfig.json配置
function genKey (path, json) {
  fs.writeFile(path + '\\keyConfig.json', JSON.stringify(json, null, 2), function (error) {
    if (error) {
      // console.log(error)
    } else {
      // console.log('ok.')
    }
  })
}

//生成resources图标
function genIcon (json) {
  if (!glb.config.projectPath || !glb.config.choose){
    console.log('未设置项目目录 或 未设置选中项目')
    return
  }
  
  //保存png图片资源方法
  let savepng = function () {
    json.icondatas.forEach(element => {
      //把base64转换成Buffer
      let dataBuffer = Buffer.from(element.base64Data, 'base64')
      //异步保存
      fs.writeFile(glb.config.projectPath + "\\" + glb.config.choose + json.savePath + "\\" + element.name, dataBuffer, (error) => {
        if(error){
          console.log(error + '\n错误：异步保存图标文件')
        }else{
          // console.log('ok.')
        }
      })
    })
  }

  fs.stat(glb.config.projectPath + "\\" + glb.config.choose + json.savePath, function (error, stats) {
    if (error) {
      //如果没有文件夹就递归创建
      mkdirs(glb.config.projectPath + "\\" + glb.config.choose + json.savePath, function () {
        //调用方法
        savepng()
      })
    } else {
      //调用方法
      savepng()
    }
  })
}


// let tmp_config = config.getConfig()
// for (const key in tmp_config) {
//   if (tmp_config.hasOwnProperty(key)) {
//     if (val[key]) {
//       tmp_config[key] = val[key]
//     }
//   }
// }
// config.saveConfig(tmp_config)
// config.init()
// client.emit('SERVER_SND_CONFIG', glb.config)

// module.exports.runCmd = function (code) {
//   return new Promise (function (resolve, reject) {
//     resolve({type: "stdout", data: iconv.decode(stdout, 'cp936')})
//     reject(-1)
//   })
// }


// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

module.exports = {
  readProject: () => {
    return readProject()
  },
  procIcons: () => {
    return procIcons()
  },
  runCmd: (...args) => {
    return runCmd(...args)
  },
  exitCmd: (...args) => {
    return exitCmd(...args)
  },
  mkdirs: (...args) => {
    return mkdirs(...args)
  },
  replacePos: (...args) => {
    return replacePos(...args)
  },
  getStrMid: (...args) => {
    return getStrMid(...args)
  },
  readXml: () => {
    return readXml()
  },
  readPlugins: () => {
    return readPlugins()
  },
  changeXml: (...args) => {
    return changeXml(...args)
  },
  genKey: (...args) => {
    return genKey(...args)
  },
  genIcon: (...args) => {
    return genIcon(...args)
  }
}



