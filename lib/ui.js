#!/usr/bin/env node
'use strict';

const glb = require('./global.js');
const config = require('../bin/config.js')
const func = require('./func.js');
const init = require('./init.js');

const path = require('path');
const fs = require("fs");
const iconv = require('iconv-lite');

const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

app.use(koaStatic(
  path.join(__dirname, '../www')
))

app.use(async (ctx, next) => {
  await next()
  ctx.body = 'hello world'
})

let CMD_SERVER_PID = 0

io.on('connect', (client) => {
  console.log('>  Client连接成功...')
  client.on('disconnect', function () {
    console.log('>  Client断开连接...')
  })

  // client.on('CLIENT_CMD_SERVER', function (name) {
  //   console.log('客户端 - 执行npm服务器', name)
  // })
  
  // client.on('CLIENT_CMD_EXIT_SERVER', function () {
  //   console.log('客户端 - 退出npm服务器', command)
  // })

  client.on('CLIENT_CMD_RUN', function (command) {
    console.log('客户端 - 执行CMD命令', glb.config.projectPath + "\\" + glb.config.choose, command)
    if (!val)
      return
    
    func.runCmd(command, (type, data) => {
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

  client.on('CLIENT_SET_PROJECT_CHOOSE', async function (val) {
    console.log('客户端 - 设置当前项目', val)
    if (!val)
      return
    
    glb.config.choose = val
    await config.saveConfig(glb.config)
    
    await func.readXml()
    client.emit('SERVER_SND_XML', glb.xml)
    
    await func.readPlugins()
    client.emit('SERVER_SND_PLUGINS', glb.plugins)
  })
  
  client.on('CLIENT_GET_CONFIG', async function () {
    console.log('客户端 - 读取CONFIG')
    glb.config = await config.readConfig()
    client.emit('SERVER_SND_CONFIG', glb.config)
  })
  
  client.on('CLIENT_GET_PROJECT', async function () {
    console.log('客户端 - 读取PROJECT')
    glb.project = await func.readProject()
    await func.procIcons()
    client.emit('SERVER_SND_PROJECT', glb.project)
  })
  
  client.on('CLIENT_SET_CONFIG', async function (val) {
    console.log('客户端 - 设置CONFIG', val)
    if (!val)
      return
    
    await config.saveConfig(val)
    await init.reloding()
  })
  
  client.on('CLIENT_SET_XML', function (val) {
    console.log('客户端 - 设置XML')
    console.table(val)
    func.changeXml(val)
  })
  
  client.on('CLIENT_GEN_KEY', function (path, json) {
    console.log('客户端 - 生成密钥', path)
    console.table(json)

    func.genKey(path, json)
  })
  
  client.on('CLIENT_GEN_ICON', function (json) {
    console.log('客户端 - 生成图标')
    func.genIcon(json)
  })



})

server.listen(glb.config.servePort)

// func.runCmd('start http://localhost:' + glb.config.servePort)

console.log('>  运行vue-Hebrid-App GUI构建工具')
console.log('>  打开链接 http://localhost:' + glb.config.servePort)
console.log('>  Socket Server 等待连接...')
