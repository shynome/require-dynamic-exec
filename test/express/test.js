const assert = require('assert')
const util = require('util')
const request = 0?require('request'):util.promisify(require('request'))
describe('express router dynamic toggle',async()=>{
  it('router1',async()=>{
    const port = await require('./index').createServer
    let res1 = (await request(`http://127.0.0.1:${port}`)).body
    assert.equal(res1,'1',`dynamic router1 is error , return ${res1}`)
  })
  it('router2',async()=>{
    const port = await require('./index').createServer
    let res1 = (await request(`http://127.0.0.1:${port}`)).body
    assert.equal(res1,'2',`dynamic router1 is error , return ${res1}`)
  })
})