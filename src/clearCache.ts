import fs = require('fs')
import path = require('path')
export const clearRequireCache = (path:string)=>require.cache[path] && delete require.cache[path]
export const clearRequireTreeCache = (path:string)=>{
  if(!require.cache[path])return
  let parent:NodeModule = require.cache[path].parent
  delete require.cache[path]
  return parent && clearRequireTreeCache(parent.id)
}
export const watchers = {}
export const normalize = (file:string)=>require.resolve(path.resolve(file))
/**u can replace this method for ignore other files */
export let ignore = (file:string)=>/node_modules/.test(file)
export const watchFile = (clearCache:clearCache)=>(module_id:string)=>{
  if(watchers[module_id]){ return }
  let file = normalize(module_id)
  if(ignore(file)){ return }
  let Timer = null
  watchers[module_id] = fs.watch(file,{},function(event){
    switch(event){
      default:
      case 'rename':
        this.close()
        watchers[file] = null
      case 'change':
        clearTimeout(Timer)
        Timer = process.nextTick(()=>{
          clearCache(module_id)
        })
        break;
    }
  })
}
export type clearCache = (path:string)=>boolean
import { watch_mode as clearTree } from "./";
export let watchRequireFile = watchFile(clearTree ? clearRequireTreeCache : clearRequireCache)
