const assert = require('assert')
const fs = require('fs')
require('../../src').watch(__dirname,true)
let now = 'a'
const dynamicFile = require.resolve('./dynamic.js')
const toggle = async()=>{
  let str = fs.readFileSync(dynamicFile)
  if(now === 'a'){
    now = 'b'
  }else{
    now = 'a'
  }
  fs.writeFileSync(dynamicFile,`exports.exec=require('./${now}').exec`)
  await new Promise(rl=>setTimeout(rl,1000))
  return now
}
describe('dynamic exec',()=>{
  for (var index = 0; index < 3; index++) {
    it(`toggle ${index}`,async()=>{
      let now = await toggle()
      let res = require('./dynamic').exec()
      assert.equal(res,now)
    })
  }
})