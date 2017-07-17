
import chokidar = require('chokidar')
export const ext = 
  new RegExp(
    `\\\.(${Object.keys(require.extensions).map(ext=>ext.slice(1)).join('|')})$`,
    'i'
  )
import { Stats } from "fs";
import parseGitignore = require('parse-gitignore')
/**监听文件变化并清除缓存 */
export const watch = (basedir:any=process.cwd(),clearRequireTree=false)=>
  chokidar
  .watch( basedir, { ignored:['.git'].concat(parseGitignore('.gitignore')), })
  .on( 'change', clearRequireTree ? clearRequireTreeCache : clearRequireCache )

export let clearRequireCache = (path:string)=>require.cache[path] && delete require.cache[path]

export let clearRequireTreeCache = (path:string)=>{
  if(!require.cache[path])return
  let parent:NodeModule = require.cache[path].parent
  delete require.cache[path]
  return parent && clearRequireTreeCache(parent.id)
}