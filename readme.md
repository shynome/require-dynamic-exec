
# main code 

```typescript
module.constructor.prototype.originRequire = module.constructor.prototype.require
function dynamicRequire(this:NodeModule,request){
  let exports = this.originRequire(request)
  if(/\\node_modules\\/.test(this.id)){
    return exports
  }
  return new Proxy(exports,{
    get:(exports,key)=>{
      let returnValue = ()=>this.originRequire(request)[key]
      let val = returnValue()
      if(typeof val === 'function'){
        return new Proxy(val,{
          apply:(func,that,args)=>returnValue().apply(that,args)
        })
      }
      return val
    }
  })
}
module.constructor.prototype.require = dynamicRequire
```
[source file](./src/index.ts)

# 示例应用
[`express-hot-reload`](./examples/express-hot-reload/readme.md)