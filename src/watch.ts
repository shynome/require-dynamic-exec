
import *as chokidar from 'chokidar'
chokidar
  .watch(process.cwd() || __dirname,{
    ignored:/\.git/,
  })
  .on('change',function(path,stat){
    if( require.cache[path] ){
      delete require.cache[path]
    }
  })
