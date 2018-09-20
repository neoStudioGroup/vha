#!/usr/bin/env node
// vha仅开启服务器 执行cmd 返回结果
// 网页传入端口 打开 访问127.0.0.1执行命令 返回结果

var fs = require("fs"),
    path = process.cwd(),
    cmd = require('child_process'),
    iconv = require('iconv-lite'),
    
    server = require('http').createServer(),
    io = require('socket.io')(server)

// 引入配置文件模块:
var config = require('./config.js')
var _config = config.getConfig()

// _config.socketPort = '11'
// console.log(config.saveConfig(_config))


var run = function (obj) {
  if(obj[0] === 'ui'){
    
    io.on('connect', function(client){
      console.log('>  Client连接成功...')
      client.on('disconnect', function(){
        console.log('>  Client断开连接...')
      })
      
      client.on('CLIENT_CMD', function(command){
        
        var ls = cmd.spawn(command, [], {shell: true, encoding: 'buffer', cwd: 'F:/Project/vue/vha-appDemo'})
        ls.stdout.on('data', function (stdout) {
          client.emit('SERVER_CMD_DATA', iconv.decode(stdout, 'cp936'))
          console.log('stdout: ' + iconv.decode(stdout, 'cp936'))
        })
        
        ls.stderr.on('data', function (stderr) {
          client.emit('SERVER_CMD_DATA', iconv.decode(stderr, 'cp936'))
          console.log('stderr: ' + iconv.decode(stderr, 'cp936'))
        })
        
        ls.on('error', function(err) { 
          console.log('无法启动子进程。', err) 
        })
        
        ls.on('exit', function (code) {
          console.log('child process exited with code ' + code)
          client.emit('SERVER_CMD_END')
        })
        
        
      })
    
      
      client.on('CLIENT_GET_projectPath', function(){
        client.emit('SERVER_SND_projectPath', _config.projectPath)
      })
      
      
      
      
      
    })
    server.listen(9876)
    console.log('>  运行vue-Hebrid-App GUI构建工具')
    console.log('>  打开链接 http://localhost:9876')
    console.log('>  Socket Server 等待连接...')
  }else if(obj[0] === '-v'){
    console.log('version is 1.0.0')
  }else if(obj[0] === '-h'){
    console.log('Useage:')
    console.log('>  ui 可视化vue-Hebrid-App构建工具")')
    console.log('>  -v --version [show version]')
  }else{
    // fs.readdir(path, function(err, files){
    //   if(err){
    //     return console.log(err)
    //   }
    //   for(var i = 0 i < files.length i += 1){
    //     console.log(chalk.red(files[i]))
    //   }
    // })

    // // 创建http server，并传入回调函数:
    // var server = http.createServer(function (request, response) {
    // // 回调函数接收request和response对象,
    //     // 获得HTTP请求的method和url:
    //     console.log(request.method + ': ' + request.url)



    //     // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    //     response.writeHead(200, {'Content-Type': 'text/html'})
    //     // 将HTTP响应的HTML内容写入response:
    //     response.end('<h1>Hello world!</h1>')
    // })

    // // 让服务器监听8080端口:
    // server.listen(8080)
    // console.log('Server is running at http://127.0.0.1:8080/')

        
    // cmd.exec(data, { encoding: 'buffer' , cwd: 'F:/Project/vue/vha-appDemo'}, function (error, stdout, stderr) {
    //   console.log(iconv.decode(stdout, 'cp936'))

    //   client.emit('SERVER_CODE', iconv.decode(stdout, 'cp936'))
    //   if (error !== null) {
    //     console.log('exec error: ' + iconv.decode(error, 'cp936'))
    //   }
    // })
        

  }
}

//获取除第一个命令以后的参数，使用空格拆分
run(process.argv.slice(2))