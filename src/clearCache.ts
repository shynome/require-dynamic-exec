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
export let ignore = (file:string)=>!!watchers[file] && /node_modules/.test(file)
export const watchFile = (clearCache:clearCache)=>(file:string)=>{
  file = normalize(file)
  if(ignore(file)){ return }
  let Timer = null
  watchers[file] = fs.watch(file,{},function(event){
    switch(event){
      default:
      case 'rename':
        this.close()
        watchers[file] = null
      case 'change':
        clearTimeout(Timer)
        Timer = process.nextTick(()=>{
          clearCache(file)
        })
        break;
    }
  })
}
export type clearCache = (path:string)=>boolean
import { watch_mode as clearTree } from "./";
export let watchRequireFile = watchFile(clearTree ? clearRequireTreeCache : clearRequireCache)
