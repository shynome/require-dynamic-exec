import './global'
export function ProxyFunction(func:Function,getTarget:()=>any){
  if(typeof func!=='function'){
    return func
  }
  return new Proxy(func,{
    get:(target,name)=>name==='toString'?target[name].bind(target):target[name],
    apply(func,that,args){
      let newGetTarget = ()=>getTarget().apply(that,args)
      return ProxyFunction(newGetTarget(),newGetTarget)
    }
  })
}
export function ProxyModule(obj:Object,getTarget:()=>any){
  return new Proxy(obj,{
    get(obj,key){
      let newGetTarget = ()=>getTarget()[key]
      return ProxyFunction(newGetTarget(),newGetTarget)
    }
  })
}
module.constructor.prototype.originRequire = module.constructor.prototype.require
function dynamicRequire(this:NodeModule,request){
  let getTarget = ()=>this.originRequire(request)
  let exports = getTarget()
  switch(true){
    case !(/\/|\\/.test(request))://ignore require node_module and core module
    case /node_modules/.test(this.id)://ignore request from node_modules 
    default:
      return exports
    case typeof exports==='function':
      return ProxyFunction(exports,getTarget)
    case typeof exports==='object' && !!exports:
      return ProxyModule(exports,getTarget)
  }
}
module.constructor.prototype.require = dynamicRequire
export * from './watch'

