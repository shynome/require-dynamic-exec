import fs = require('fs')
export const clearRequireCache = (path:string)=>require.cache[path] && delete require.cache[path]
export const clearRequireTreeCache = (path:string)=>{
  if(!require.cache[path])return
  let parent:NodeModule = require.cache[path].parent
  delete require.cache[path]
  return parent && clearRequireTreeCache(parent.id)
}
export const watchers = {}
export const watchFile = (clearCache:clearCache)=>(path:string)=>{
  if(watchers[path]){ return }
  let Timer = null
  watchers[path] = fs.watch(path,{},function(event){
    switch(event){
      default:
      case 'rename':
        this.close()
        watchers[path] = null
      case 'change':
        clearTimeout(Timer)
        Timer = process.nextTick(()=>{
          clearCache(path)
          try{
            require(path)//reload the module
          }catch(err){
            console.error(err && err.stack || err)
          }
        })
        break;
    }
  })
}
export type clearCache = (path:string)=>boolean
import { watch_mode as clearTree } from "./";
export let watchRequireFile = watchFile(clearTree ? clearRequireTreeCache : clearRequireCache)
