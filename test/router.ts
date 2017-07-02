import { Router } from "express";
export const app = Router()
import { app as main } from './app'
app.use(main)