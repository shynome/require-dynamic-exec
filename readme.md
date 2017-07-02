
# Install 
```bash
npm install require-dynamic-exec -D
```

# Useage
```javascript
require('ts-node').register({ fast:true, project:__dirname })
//如果你使用了其他编译器扩展 `require.extensions` , 放在 `watch` 前面确保能监听到该类后缀
require('require-dynamic-exec').watch(__dirname,true)
```
