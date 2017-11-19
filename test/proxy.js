const assert = require('assert')
describe('proxy func toString',()=>{
  it('proxy function toString',()=>{
    let func = require('./exports').func
    let str = func.toString()
    assert.equal(str,'function func(){}',str)
  })
  it('proxy object toString',()=>{
    let obj = require('./exports').obj
    let str = obj.toString()
    assert.equal(str,'[object Object]',str)
  })
  it('proxy array toString',()=>{
    let arr = require('./exports').arr
    let str = arr.toString()
    assert.equal(str,'1,2,3,[object Object]',str)    
  })
  it('proxy symbol toString',()=>{
    let symbol = require('./exports').symbol
    let str = symbol.toString()
    assert.equal(str,'Symbol(0)',str)    
  })
})
describe('proxy func run',()=>{
  it('run',()=>{
    let run = require('./exports').run
    let result = run()
    assert.equal(result,'run',result)
  })
  it('get the same proxy function',()=>{
    let a = require('./exports').func
    let b = require('./exports').func
    assert.equal(a,b,`export function don't should return a new proxy function when each require`)
  })
})