
import { Router } from "express";
export const app = Router()

app.use('/test',(req,res)=>res.send(`test`))

import { app as view } from "./app";
app.use(view)
