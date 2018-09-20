'use strict';

var fs = require("fs")

module.exports = {
  getConfig: () => {
    try {
      var data = fs.readFileSync('bin/config.json', 'utf-8')
      
      console.log('')
      console.log('-- 读取配置 start --')
      console.log(JSON.stringify(JSON.parse(data), null, 2))
      console.log('-- 读取配置 end --')
      console.log('')
      
      return JSON.parse(data)
    } catch (err) {
      console.log(err)
    }
  },
  
  saveConfig: (config) => {
    fs.writeFile('bin/config.json', JSON.stringify(config, null, 2), function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('ok.')
      }
    })
  }
}





