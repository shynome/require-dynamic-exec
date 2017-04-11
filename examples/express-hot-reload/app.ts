
import *as express from "express";
export const app = express()

import { render } from "express-tsx";
app.engine('.tsx',render())
app.set('views',__dirname+'/views')
app.set('view engine','tsx')

app.get('/',(req,res)=>res.render('index'))
