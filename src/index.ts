import './global'
export function ProxyFunction(func:Function,getTarget:()=>any){
  return new Proxy(func,{
    apply(func,that,args){
      func = getTarget()
      return ProxyExports(func.apply(that,args),()=>func.apply(that,args))
    }
  })
}
export function ProxyObject(obj:Object,getTarget:()=>any){
  return new Proxy(obj,{
    get(obj,key){
      obj = getTarget()
      return ProxyExports(obj[key],()=>getTarget()[key])
    }
  })
}
export function ProxyExports(exports:any,getTarget:()=>any){
  switch(true){
    case typeof exports==='object' && !!exports:
      return ProxyObject(exports,getTarget)
    case typeof exports==='function':
      return ProxyFunction(exports,getTarget)
    default:
      return exports;
  }
}
module.constructor.prototype.originRequire = module.constructor.prototype.require
function dynamicRequire(this:NodeModule,request){
  let exports = this.originRequire(request)
  let getTarget = ()=>this.originRequire(request)
  switch(true){
    case /\\node_modules\\/.test(this.id):
      return exports
    default:
      return ProxyExports(exports,getTarget)
  }
}
module.constructor.prototype.require = dynamicRequire
export { watch } from './watch'

