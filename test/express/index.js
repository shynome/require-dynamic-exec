require('../../src').watch(__dirname)
/**
 * @type {number}
 */
exports.port = null
const express = require('express')
const app = exports.app = express()
const router = express.Router()
router.use(require('./router').router)
app.use(router)
exports.createServer = new Promise((resolve,reject)=>{
  app.listen(function(err){
    if(err){
      reject(err)
      return
    }
    exports.port = this.address().port
    console.log('port:'+exports.port)
    resolve(exports.port)
  })
})
require('./test')