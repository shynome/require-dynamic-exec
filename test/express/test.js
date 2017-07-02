const assert = require('assert')
const util = require('util')
const request = 0?require('request'):util.promisify(require('request'))
let now = '1'
const fs = require('fs')
const dynamicFile = require.resolve('./router.js')
const toggle = async()=>{
  now = now === '1' ? '2' : '1'
  fs.writeFileSync(dynamicFile,`exports.router=require('./router${now}').router`)
  await new Promise(rl=>setTimeout(rl,200))
  return now
}
describe('express router dynamic toggle',()=>{
  for (var index = 0; index < 4; index++) {
    it(`router ${index}`,async()=>{
      const port = await require('./index').createServer
      let now = await toggle()
      let res = (await request(`http://127.0.0.1:${port}`)).body
      assert.equal(res,now,`dynamic router1 is error , return ${res}`)
    })
  }
})