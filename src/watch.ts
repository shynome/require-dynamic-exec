/**监听文件变化并清除缓存 */
export const watch = (dirname:string=process.cwd())=>
require('chokidar')
  .watch(dirname,{
    ignored:/\.git/,
  })
  .on('change',function(path,stat){
    if( require.cache[path] ){
      delete require.cache[path]
    }
  })
