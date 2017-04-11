
import *as express from "express";
export const server = express()

import { app as router } from "./router";
server.use(router)

export const PORT = 3000
server.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`)
})
