#!/usr/bin/env node
'use strict';

const glb = require('../bin/global.js');
const config = require('../bin/config.js')

const path = require('path');
const fs = require("fs");
const iconv = require('iconv-lite');

const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

const xml2js = require('xml2js');

function runCmd(code, stdCallback, errorback, cpob) {
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

function exitCmd(cpob) {
  runCmd("taskkill /pid " + cpob.pid + " -t -f")
}

// 递归创建目录 异步方法
function mkdirs(dirname, callback) {
  fs.stat(dirname, function (stats) {
    if (!stats) {
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

// 根据位置替换字符串
function replacePos(str, oldStr, newStr, Pos, isAll) {
  if(!Pos)
    Pos = 0
  if(!isAll)
    isAll = false
    
  let tmp_for = str.substring(0, Pos)
  let tmp_back = str.substring(Pos, str.length)
  
  tmp_back = tmp_back.replace(eval('/' + oldStr + '/' + (isAll ? 'g' : '')), newStr)
  return tmp_for + tmp_back
}

function getStrMid(str, starStr, endStr) {
  let tmp_for = str.indexOf(starStr) + starStr.length
  let tmp_back = str.indexOf(endStr, tmp_for)
  let tmp_Str = str.substring(tmp_for, tmp_back)
  
  return tmp_Str
}


// --------------------------------------------------------------------------------

app.use(koaStatic(
  path.join(__dirname, '../www')
))

app.use(async (ctx, next) => {
  await next()
  ctx.body = 'hello world'
})

let CMD_SERVER_PID = 0

io.on('connect', function (client) {
  console.log('>  Client连接成功...')
  client.on('disconnect', function () {
    console.log('>  Client断开连接...')
  })

  client.on('CLIENT_CMD_SERVER', function (name) {
    console.log('客户端 - 执行npm服务器', name)

  })
  client.on('CLIENT_CMD_EXIT_SERVER', function () {
    console.log('客户端 - 退出npm服务器', command)
  })

  client.on('CLIENT_CMD_RUN', function (command) {
    console.log('客户端 - 执行CMD命令', glb.config.projectPath + "\\" + glb.config.choose, command)
    
    runCmd(command, (type, data) => {
      switch (type) {
        case "stdout": {
          client.emit('SERVER_CMD_DATA', data)
          console.log('stdout: ' + data)
        } break
        case "stderr":{
          // client.emit('SERVER_CMD_DATA', data)
          // console.log('stderr: ' + data)
        } break
      }
    }, (error, code) => {
      switch (error) {
        case -1: {
          console.log('无法启动CMD：', code)
        } break
        case 0:{
          console.log('CMD退出代码：' + code)
          client.emit('SERVER_CMD_END')
        } break
      }
    })
  })

  client.on('CLIENT_SET_PROJECT_CHOOSE', function (val) {
    console.log('客户端 - 设置当前项目', val)
    if (!val)
      return
    
    glb.config.choose = val
    config.saveConfig(glb.config)
    
    let parser = new xml2js.Parser({explicitArray: false})
    fs.readFile(glb.config.projectPath + "\\" + glb.config.choose + "\\config.xml", function(err, data) {
      parser.parseString(data, function (err, result) {
        client.emit('SERVER_SND_XML', result)
        // console.log(JSON.stringify(result, null, 2));
      })
    })
    
    fs.readdir(glb.config.projectPath + "\\" + glb.config.choose + "\\plugins", function(err, data) {
      if(!data)
        return
      
      let tmp_plugins = []
      data.forEach(element => {
        var stat = fs.lstatSync(glb.config.projectPath + "\\" + glb.config.choose + "\\plugins\\" + element)
        if (stat.isDirectory()) {
          tmp_plugins.push(element)
        }
      })
      client.emit('SERVER_SND_PLUGINS', tmp_plugins)
    })
    
  })
  
  client.on('CLIENT_GET_INFO', function () {
    console.log('客户端 - 请求相关信息')
    client.emit('SERVER_SND_CONFIG', glb.config)
    client.emit('SERVER_SND_PROJECT', glb.project)
  })
  
  client.on('CLIENT_SET_CONFIG', function (val) {
    console.log('客户端 - 设置CONFIG', val)
    let tmp_config = config.getConfig()
    
    for (const key in tmp_config) {
      if (tmp_config.hasOwnProperty(key)) {
        if (val[key]) {
          tmp_config[key] = val[key]
        }
      }
    }
    
    config.saveConfig(tmp_config)
    config.init()
    client.emit('SERVER_SND_CONFIG', glb.config)
  })
  
  client.on('CLIENT_SET_XML', function (val) {
    console.log('客户端 - 设置XML', val)
    
    //获取数据
    //根据新数据对应修改

    
    let parser = new xml2js.Parser({explicitArray: false})
    fs.readFile(glb.config.projectPath + "\\" + glb.config.choose + "\\config.xml", function(err, data) {
      parser.parseString(data, function (err, result) {
        let tmp_data = data.toString()
        
        for (const key in val) {
          if (val.hasOwnProperty(key)) {
            tmp_data = replacePos(tmp_data, getStrMid(tmp_data, val[key].startMark, val[key].endMark), val[key].value, tmp_data.indexOf(val[key].startMark))
          }
        }
        
        try {
          fs.writeFileSync(glb.config.projectPath + "\\" + glb.config.choose + "\\config.xml", tmp_data)
        } catch (err) {
          console.log(err)
        }
        
      })
    })
    
    
    
    
    
    
  })
  
  client.on('CLIENT_GEN_KEY', function (val, json) {
    console.log('客户端 - 生成密钥', val, json)
    
    fs.writeFile(val + '\\keyConfig.json', JSON.stringify(json, null, 2), function (err) {
      if (err) {
        console.log(err)
      } else {
        // console.log('ok.')
      }
    })
  })
  
  client.on('CLIENT_GEN_ICON', function (json) {
    console.log('客户端 - 生成图标')
    
    let savepng = function () {
      json.icondatas.forEach(element => {
        let dataBuffer = new Buffer(element.base64Data, 'base64')
        fs.writeFile(glb.config.projectPath + "\\" + glb.config.choose + json.savePath + "\\" + element.name, dataBuffer, function(err) {
          if(err){
            console.log(err)
          }else{
            // console.log('ok.')
          }
        })
      })
    }

    fs.stat(glb.config.projectPath + "\\" + glb.config.choose + json.savePath, function (err, stats) {
      if (err) {
        mkdirs(glb.config.projectPath + "\\" + glb.config.choose + json.savePath, function () {
          savepng()
        })
      } else {
        savepng()
      }
    })
  })
  
  
})

server.listen(glb.config.servePort)

// runCmd('start http://localhost:' + glb.config.servePort)

console.log('>  运行vue-Hebrid-App GUI构建工具')
console.log('>  打开链接 http://localhost:' + glb.config.servePort)
console.log('>  Socket Server 等待连接...')

// --------------------------------------------------------------------------------