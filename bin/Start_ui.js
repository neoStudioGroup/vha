#!/usr/bin/env node
'use strict';

const api = require('./_apis.js');
const glb = require('./_global.js');
const config = require('./config.js')

const os = require('os');
const path = require('path');
const iconv = require('iconv-lite');

const Koa = require('koa');
const app = new Koa();
const Static = require('koa-static');
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

// 服务器相关－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

app.use(Static(
  path.join(__dirname, '../ui')
))

app.use(async (ctx, next) => {
  if (ctx.request.path === '/api') {
    let path = ctx.query.path
    let result = await api.isPath(path)
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.body = `${result}`
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  // console.log(`Process ${ctx.request.method} ${ctx.request.url}`)
  await next()
  ctx.body = `<script>
    window.location.href="http://localhost:${glb.config.servePort}"
  </script>`
})


// Socket相关－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

let CMD_SERVER_CP = null
let CMD_CP = null

io.on('connect', (client) => {
  console.log('>  Client连接成功...')
  client.on('disconnect', function () {
    console.log('>  Client断开连接...')
  })

  // client.on('CLIENT_CMD_RUN_SERVER', function (name) {
  //   console.log('客户端 - 执行npm服务器', name)
  // })
  
  // client.on('CLIENT_CMD_EXIT_SERVER', function () {
  //   console.log('客户端 - 退出npm服务器', command)
  // })

  client.on('CLIENT_CMD_RUN', async function (command) {
    console.log('客户端 - 执行CMD命令', glb.config.projectPath + '\\' + glb.config.choose, command)
    if (!command)
      return
    
    if (!glb.config.projectPath){
      console.log('未设置项目目录')
      return
    }
    
    // //处理命令和参数|分割
    let temp_command = command
    let temp_args = []
    
    // if (temp_command.indexOf('|') != -1) {
    //   let temp_commands = temp_command.split('|')
    //   temp_command = temp_commands[0]
    //   if (temp_command = 'npm') {
    //     if (os.platform() === 'win32') {
    //       temp_command = 'npm.cmd'
    //     } else {
    //       temp_command = 'npm'
    //     }
    //   }
    //   temp_args.push(temp_commands[1])
    // }
    
    //判断执行路径是否存在 如果不存在就''执行
    let temp_result = await api.isPath(glb.config.projectPath + "\\" + glb.config.choose)
    
    //运行cmd命令
    let childProcess = require('child_process').spawn(temp_command, temp_args, {
      shell: true,
      encoding: 'buffer',
      cwd: (temp_result === 0 ? '' : glb.config.projectPath + "\\" + glb.config.choose)
    })
    childProcess.stdout.on('data', function (stdout) {
      client.emit('SERVER_CMD_DATA', iconv.decode(stdout, 'cp936'))
      console.log('stdout: ' + iconv.decode(stdout, 'cp936'))
    })
    childProcess.stderr.on('data', function (stderr) {
      console.log('stderr: ' + iconv.decode(stderr, 'cp936'))
    })
    childProcess.on('error', function (code) {
      CMD_CP = null
      console.log('无法启动CMD：', code)
    })
    childProcess.on('exit', function (code) {
      CMD_CP = null
      console.log('CMD退出代码：' + code)
      client.emit('SERVER_CMD_END')
    })
    
    CMD_CP = childProcess
  })

  client.on('CLIENT_EXIT_CMD', function () {
    console.log('客户端 - 退出CMD命令', CMD_CP)
    api.exitCmd(CMD_CP)
  })
  
  client.on('CLIENT_GET_CONFIG', async function () {
    console.log('客户端 - 读取CONFIG')
    glb.config = {}
    glb.config = await config.readConfig()
    console.table(glb.config)
    client.emit('SERVER_SND_CONFIG', glb.config)
  })
  
  client.on('CLIENT_GET_PROJECT', async function () {
    console.log('客户端 - 读取PROJECT')
    try {
      glb.project = []
      glb.project = await api.readProject()
      await api.procIcons()
      console.table(glb.project)
      client.emit('SERVER_SND_PROJECT', glb.project)
    } catch (error) {
      client.emit('SERVER_SND_PROJECT', [])
    }
  })
  
  client.on('CLIENT_GET_XML', async function () {
    console.log('客户端 - 读取XML')
    await api.readXml()
    client.emit('SERVER_SND_XML', glb.xml)
  })
  
  client.on('CLIENT_GET_PLUGINS', async function () {
    console.log('客户端 - 读取PLUGINS')
    await api.readPlugins()
    client.emit('SERVER_SND_PLUGINS', glb.plugins)
  })
  
  client.on('CLIENT_SET_CONFIG', async function (val) {
    console.log('客户端 - 设置CONFIG', val)
    if (!val)
      return
    
    await config.saveConfig(val)
    await api.reloding()
  })
  
  client.on('CLIENT_SET_XML', function (val) {
    console.log('客户端 - 设置XML')
    console.table(val)
    if (!val)
      return
    api.changeXml(val)
  })
  
  client.on('CLIENT_GEN_ICON', function (json) {
    console.log('客户端 - 生成图标')
    if (!json)
      return
    api.genIcon(json)
  })
  
  client.on('CLIENT_GEN_KEY', function (path, json) {
    console.log('客户端 - 生成密钥', path)
    console.table(json)
    if (!path || !json)
      return
    api.genKey(path, json)
  })
  
  client.on('CLIENT_GEN_FOLDER', function (path) {
    console.log('客户端 - 创建文件夹', path)
    if (!path)
      return
    api.genFolder(path)
  })
  
  // client.on('CLIENT_GEN_PROJECT', function (json) {
  //   console.log('客户端 - 构建项目', json.name, json.gitpath)
  //   if (!json)
  //     return
  //   // api.genProject(json)
  // })

})

// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

server.listen(glb.config.servePort)

require('child_process').exec('start http://localhost:' + glb.config.servePort)

console.log('>  运行vue-Hebrid-App GUI构建工具')
console.log('>  打开链接 http://localhost:' + glb.config.servePort)
console.log('>  Socket Server 等待连接...')
