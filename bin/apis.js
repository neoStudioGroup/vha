#!/usr/bin/env node
'use strict';

const glb = require('./global.js');
const config = require('./config.js')

const os = require('os');
const fs = require("fs");
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const xml2js = require('xml2js');
const iconv = require('iconv-lite');
// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

// console.log('运行目录', __dirname, path.resolve(__dirname, '..'))

//ANCHOR 重载"
async function reloding () {
  return new Promise (async function (resolve, reject) {
    try {
      //读取配置文件
      glb.config = await config.readConfig()
      // console.table(glb.config)
      
      //读取项目目录
      glb.project = await readProject()
      //处理icon图标
      await procIcons()
      // console.table(glb.project)
      resolve()
    } catch (error) {
      console.log(error + '\n错误：重载时')
      // reject(error + '\n错误：重载时')
    }
  })
}

//ANCHOR 读取项目内文件夹"
function readProject () {
  return new Promise (async function (resolve, reject) {
    try {
      if (!glb.config.projectPath) {
        console.log('未设置项目目录')
        return
      }
      
      let files = await readdir(glb.config.projectPath)
      
      let temp_projects = []
      //循环输出所有文件
      for (const element of files) {
        let temp_project = {
          name: element,
          src: ''
        }
        //如果是文件夹且不包含汉字就加入
        let stats = await stat(glb.config.projectPath + '/' + element)
        if (stats.isDirectory()) {
          if (!/.*[\u4e00-\u9fa5]+.*$/.test(element))
            temp_projects.push(temp_project)
        }
      }
      resolve(temp_projects)
    } catch (error) {
      console.log(error + '\n错误：读取项目目录内子项目')
      reject(error + '\n错误：读取项目目录内子项目')
    }
  })
}

//ANCHOR 将项目文件夹内icon复制到服务器ui/icon文件夹内"
function procIcons () {
  return new Promise (async function (resolve, reject) {
    try {
      if (!glb.config.projectPath || !glb.project) {
        console.log('未设置项目目录或没有子目录')
        return
      }
      
      //如果不存在先创建
      await isPath(path.resolve(__dirname, '..') + '\\ui\\icons', true)
      
      //删除清空icons文件夹内图标文件
      let files = await readdir(path.resolve(__dirname, '..') + '\\ui\\icons')
      files.forEach(element => {
        fs.unlink(path.resolve(__dirname, '..') + '\\ui\\icons\\' + element, function (unlink) {
          // console.log(unlink)
        })
      })
      
      //循环全局变量内项目文件夹,如果图标文件存在就复制
      for (const element of glb.project) {
        await stat(glb.config.projectPath + '/' + element.name + '/resources/icon.png').then((stats) => {
          element.src = 'http://localhost:' + glb.config.servePort + '/icons/' + element.name + '.png'
          let readStream = fs.createReadStream(glb.config.projectPath + '/' + element.name + '/resources/icon.png')
          let writeStream = fs.createWriteStream(path.resolve(__dirname, '..') + '\\ui\\icons\\' + element.name + '.png')
          readStream.pipe(writeStream)
        }, (error) => {
          // console.log("图标文件不存在", error)
          // reject("图标文件不存在 " + error)
        })
      }
      resolve()
    } catch (error) {
      console.log(error + '\n错误：处理Icon')
      // reject(error + '\n错误：处理Icon')
    }
  })
}

//ANCHOR 运行cmd命令   -- 废弃"
function runCmd (command, stdCallback, errorback, cpob) {
  // if (!glb.config.projectPath || !glb.config.choose){
  //   console.log('未设置项目目录 或 未设置选中项目')
  //   return
  // }
  
  // cpob = require('child_process').spawn(command, [], {
  //   shell: true,
  //   encoding: 'buffer',
  //   cwd: glb.config.projectPath + "/" + glb.config.choose
  // })
  // cpob.stdout.on('data', function (stdout) {
  //   if(stdCallback)
  //     stdCallback("stdout", iconv.decode(stdout, 'cp936'))
  // })
  // cpob.stderr.on('data', function (stderr) {
  //   if(stdCallback)
  //     stdCallback("stderr", iconv.decode(stderr, 'cp936'))
  // })
  // cpob.on('error', function (code) {
  //   if(errorback)
  //     errorback(-1, code)
  // })
  // cpob.on('exit', function (code) {
  //   if(errorback)
  //     errorback(0, code)
  // })
}
// let cpob = func.runCmd(command, (type, data) => {
//   console.log(cpob)
//   switch (type) {
//     case "stdout": {
//       client.emit('SERVER_CMD_DATA', data)
//       console.log('stdout: ' + data)
//     } break
//     case "stderr":{
//       // client.emit('SERVER_CMD_DATA', data)
//       // console.log('stderr: ' + data)
//     } break
//   }
// }, (error, code) => {
//   switch (error) {
//     case -1: {
//       console.log('无法启动CMD：', code)
//     } break
//     case 0:{
//       console.log('CMD退出代码：' + code)
//       client.emit('SERVER_CMD_END')
//     } break
//   }
// })

//ANCHOR 退出cmd命令"
function exitCmd (process) {
  if (os.platform() === 'win32') {
    require('child_process').exec("taskkill /pid " + process.pid + " -t -f")
  } else {
    process.kill()
  }
}

//ANCHOR "判断一个目录或文件是否存在, 1文件 2目录 如果0不存在就创建"
function isPath (path, isGen) {
  return new Promise (async function (resolve, reject) {
    if(!isGen)
      isGen = false
    
    try {
      let stats = await stat(path)
      if (stats.isFile()) {
        resolve(1)
        return
      } else if (stats.isDirectory()) {
        resolve(2)
        return
      }
    } catch (error) {
      if (isGen) {
        await mkdirs(path, () => {
          resolve(0)
          return
        })
      } else {
        resolve(0)
        // reject(-1)
        return
      }
    }
  })
}

//ANCHOR 递归创建目录 异步方法"
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

//ANCHOR 根据位置替换字符串"
function replacePos (str, oldStr, newStr, Pos, isAll) {
  if(!Pos)
    Pos = 0
  if(!isAll)
    isAll = false
    
  let temp_for = str.substring(0, Pos)
  let temp_back = str.substring(Pos, str.length)
  
  temp_back = temp_back.replace(eval('/' + oldStr + '/' + (isAll ? 'g' : '')), newStr)
  return temp_for + temp_back
}

//ANCHOR 取字符串中间内容"
function getStrMid (str, starStr, endStr) {
  let temp_for = str.indexOf(starStr) + starStr.length
  let temp_back = str.indexOf(endStr, temp_for)
  return str.substring(temp_for, temp_back)
}

//ANCHOR 读取xml并转换成json保存到全局变量,then返回原始数据"
function readXml () {
  return new Promise (function (resolve, reject) {
    glb.xml = {}
    if (!glb.config.projectPath || !glb.config.choose){
      console.log('未设置项目目录 或 未设置选中项目')
      return
    }
    
    let parser = new xml2js.Parser({explicitArray: false})
    fs.readFile(glb.config.projectPath + "\\" + glb.config.choose + "\\config.xml", function(error, data) {
      if (error) {
        console.log(error + '\n错误：读取xml文件')
        return
      }
      
      parser.parseString(data, function (error, result) {
        glb.xml = result
        resolve(data)
      })
    })
  })
}

//ANCHOR 读取Plugins并保存到全局变量"
function readPlugins () {
  return new Promise (function (resolve, reject) {
    glb.plugins = []
    if (!glb.config.projectPath || !glb.config.choose){
      console.log('未设置项目目录 或 未设置选中项目')
      return
    }
    
    fs.readdir(glb.config.projectPath + "\\" + glb.config.choose + "\\plugins", function(error, data) {
      if (error) {
        console.log(error + '\n错误：读取plugins目录')
        return
      }
      
      let temp_plugins = []
      for (const element of data) {
        let stats = fs.lstatSync(glb.config.projectPath + "\\" + glb.config.choose + "\\plugins\\" + element)
        if (stats.isDirectory()) {
          temp_plugins.push(element)
        }
      }
      glb.plugins = temp_plugins
      resolve(glb.plugins)
    })
  })
}

//ANCHOR 修改当前项目xml资源文件"
function changeXml (val) {
  return new Promise (async function (resolve, reject) {
    try {
      if (!glb.config.projectPath || !glb.config.choose){
        console.log('未设置项目目录 或 未设置选中项目')
        return
      }
      
      //先读取一次最新的数据
      let data = await readXml()
      
      let temp_data = data.toString()
      //根据新数据对应修改
      for (const key in val) {
        if (val.hasOwnProperty(key)) {
          let temp_strMid = getStrMid(temp_data, val[key].startMark, val[key].endMark)
          temp_data = replacePos(temp_data, temp_strMid, val[key].value, temp_data.indexOf(val[key].startMark))
        }
      }
      fs.writeFileSync(glb.config.projectPath + "\\" + glb.config.choose + "\\config.xml", temp_data)
      resolve()
    } catch (error) {
      console.log(error + '\n错误：修改xml资源')
      // reject(error + '\n错误：修改xml资源')
    }
  })
}

//ANCHOR 生成keyConfig.json配置"
function genKey (path, json) {
  return new Promise (function (resolve, reject) {
    fs.writeFile(path + '\\keyConfig.json', JSON.stringify(json, null, 2), function (error) {
      if (error) {
        console.log(error + '\n错误：生成keyConfig.json配置')
        // reject(error)
      } else {
        // console.log('ok.')
        resolve()
      }
    })
  })
}

//ANCHOR 生成resources图标"
function genIcon (json) {
  return new Promise (function (resolve, reject) {
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
          resolve()
        })
      } else {
        //调用方法
        savepng()
        resolve()
      }
    })
  })
}

//ANCHOR 创建文件夹"
function genFolder (path) {
  return new Promise (async function (resolve, reject) {
    await mkdirs(path, () => {
      resolve(0)
      return
    })
  })
}

//ANCHOR 构建项目"
function genProject (json) {
  return new Promise (function (resolve, reject) {
    if (!glb.config.projectPath){
      console.log('未设置项目目录')
      return
    }
    
    //检测文件夹必须不存在
    //创建文件夹
    //git clone 路径 文件夹
    //npm install
    //npm run serve
    //重载
    resolve()
    
  })
}





// let temp_config = config.getConfig()
// for (const key in temp_config) {
//   if (temp_config.hasOwnProperty(key)) {
//     if (val[key]) {
//       temp_config[key] = val[key]
//     }
//   }
// }
// config.saveConfig(temp_config)
// config.init()
// client.emit('SERVER_SND_CONFIG', glb.config)

// module.exports.runCmd = function (code) {
//   return new Promise (function (resolve, reject) {
//     resolve({type: "stdout", data: iconv.decode(stdout, 'cp936')})
//     reject(-1)
//   })
// }

// return new Promise (function (resolve, reject) {
//   resolve()
//   reject()
// })

// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

module.exports = {
  reloding: () => {
    return reloding()
  },
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
  isPath: (...args) => {
    return isPath(...args)
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
  },
  genFolder: (...args) => {
    return genFolder(...args)
  },
  genProject: (...args) => {
    return genProject(...args)
  }
}



