/**监听文件变化并清除缓存 */
export const watch = (dirname:string)=>
require('chokidar')
  .watch(process.cwd() || dirname,{
    ignored:/\.git/,
  })
  .on('change',function(path,stat){
    if( require.cache[path] ){
      delete require.cache[path]
    }
  })
