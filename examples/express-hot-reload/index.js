require('ts-node').register({
  fast:true,
  project:__dirname
})
const Development = exports.Development = !process.env.PRODUCTION
Development && require('require-dynamic-exec').watch()
require('./server')