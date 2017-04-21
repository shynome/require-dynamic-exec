require('ts-node').register({ fast:true, project:__dirname })
// require('./test')
require('require-dynamic-exec').watch(__dirname)
require('./')