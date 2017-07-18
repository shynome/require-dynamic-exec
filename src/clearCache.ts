import fs = require('fs')
export let watchRequireFile = (file:string)=>{}
export const watchers = {}
export const watchFile = (clearCache:clearCache)=>(path:string)=>{
  if(watchers[path]){ return }
  let Timer = null
  watchers[path] = fs.watch(path,{},function(event){
    switch(event){
      default:
      case 'rename':
        this.close()
      case 'change':
        clearTimeout(Timer)
        Timer = setTimeout(()=>clearCache(path),undefined)
        break;
    }
  })
  debugger
}
export type clearCache = (path:string)=>boolean
/**
 * start watch file which is required  , for clear require cahce when it has changed 
 * @param ___dirname it will not be used 
 * @param clearTree true from strong clear method
 */
export const watch = (__dirname:string=undefined,clearTree:boolean=false)=>{
  watchRequireFile = watchFile(clearTree ? clearRequireTreeCache : clearRequireCache)
}
export const clearRequireCache = (path:string)=>require.cache[path] && delete require.cache[path]
export const clearRequireTreeCache = (path:string)=>{
  if(!require.cache[path])return
  let parent:NodeModule = require.cache[path].parent
  delete require.cache[path]
  return parent && clearRequireTreeCache(parent.id)
}
