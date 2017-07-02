
# Install 
```shell
npm install require-dynamic-exec
```

# Useage
```javascript
require('ts-node').register({ fast:true, project:__dirname })
//if u has use other extname , set before this like the last one
require('require-dynamic-exec').watch(__dirname,true)
```
