import './global'
export let watch_mode = false
import { clearCache } from "./clearCache";
export { watchers } from "./clearCache";
export let watchRequireFile:(path:string)=>void = (path)=>false
import { hookRequire } from "./hookRequire";
/**
 * start watch file which is required  , for clear require cahce when it has changed 
 * @param ___dirname it will not be used 
 * @param clearTree true from strong clear mode
 */
export let watch = (__dirname,mode=watch_mode)=>{
  module.constructor.prototype.require = hookRequire
  watch_mode = mode
  watchRequireFile = require('./clearCache').watchRequireFile
}
import { watchers } from "./clearCache";
export let unwatch = ()=>{
  module.constructor.prototype.require = module.constructor.prototype.originRequire
  for(let file in watchers){
    let watcher = watchers[file]
    watcher.close()
  }
}
export { hookRequire } from './hookRequire'