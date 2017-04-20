import './global'
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
export { watch } from './watch'

