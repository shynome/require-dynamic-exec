
import chokidar = require('chokidar')
/**监听文件变化并清除缓存 */
export const watch = (basedir:any=process.cwd(),clearRequireTree=false)=>
chokidar
  .watch(basedir, { ignored:/\.git/, })
  .on( 'change', clearRequireTree ? clearRequireTreeCache : clearRequireCache )

export let clearRequireCache = (path:string)=>require.cache[path] && delete require.cache[path]

export let clearRequireTreeCache = (path:string)=>{
  if(!require.cache[path])return
  let parent:NodeModule = require.cache[path].parent
  delete require.cache[path]
  return parent && clearRequireTreeCache(parent.id)
}