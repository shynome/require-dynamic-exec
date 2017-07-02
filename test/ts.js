require('ts-node').register({ fast:true, project:__dirname+'/../' })
// require('./test')
require('../src').watch(__dirname,true)
require('./')