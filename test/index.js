require('ts-node').register({ fast:true })
require('../')

describe('proxy without watch',()=>require('./proxy'))
describe('proxy dynamic exec',()=>{
  require('./dynamic')
  require('./express')
})

