require('ts-node').register({ fast:true, project:__dirname })
// require('./test')
require('../')
.watch(__dirname)
require('./')