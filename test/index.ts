import express = require('express')
export const app = express()
import { app as router } from './router'
app.use(router)
app.listen(3000,function(){
  // require('child_process').exec('explorer http://127.0.0.1:3000')
})