require('../../').watch(__dirname)
const express = require('express')
const app = exports.app = express()
const router = express.Router()
router.use(require('./router').router)
app.use(router)
//test.js
const assert = require('assert')
const util = require('util')
const request = require('supertest')
let now = '1'
const fs = require('fs')
const dynamicFile = require.resolve('./router.js')
const toggle = async()=>{
  now = now === '1' ? '2' : '1'
  fs.writeFileSync(dynamicFile,`exports.router=require('./router${now}').router`)
  await new Promise(rl=>setTimeout(rl,200))
  return now
}
const server = require('.').app
describe('express router dynamic toggle',()=>{
  for (var index = 0; index < 4; index++) {
    it(`router ${index}`,async()=>{
      let now = await toggle()
      let res = await request(server).get('/').expect(now)
    })
  }
  it('clear',()=>{
    require('../../').unwatch()
  })
})