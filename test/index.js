require('ts-node').register({ fast:true })
require('../')

require('./deep')
describe('proxy without watch',()=>require('./proxy'))
describe('proxy dynamic exec',()=>{
  require('./dynamic')
  require('./express')
})

