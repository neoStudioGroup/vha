#!/usr/bin/env node
'use strict';

module.exports.runCmd = function (code) {
  return new Promise (function (resolve, reject) {
    resolve({type: "stdout", data: iconv.decode(stdout, 'cp936')})
    reject(-1)
    
  })
}