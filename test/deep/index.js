require('../../').watch()
const _ = require('lodash')
const assert = require('assert')
describe('deep require',()=>{
  it('deep1',()=>{
    let watch_files1 = Object.keys(require('../../').watchers)
    let a = require('./deep1')
    let watch_files2 = Object.keys(require('../../').watchers)
    let df = _.difference(watch_files2,watch_files1)
    assert(
      df.length === 2,
      `should more load two module`
    )
  })
  it('deep2',()=>{
    let watch_files1 = Object.keys(require('../../').watchers)
    let a = require('./deep2')
    let watch_files2 = Object.keys(require('../../').watchers)
    let df = _.difference(watch_files2,watch_files1)
    assert(
      df.length === 4,
      `should more load two module`
    )
  })
})