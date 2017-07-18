import './global'
export let watch_mode = false
import { clearCache } from "./clearCache";
export { watchers } from "./clearCache";
export let watchRequireFile:(path:string)=>void = (path)=>false
/**
 * start watch file which is required  , for clear require cahce when it has changed 
 * @param ___dirname it will not be used 
 * @param clearTree true from strong clear mode
 */
export let watch = (__dirname,mode=watch_mode)=>{
  watch_mode = mode
  watchRequireFile = require('./clearCache').watchRequireFile
}
export { hookRequire } from './hookRequire'