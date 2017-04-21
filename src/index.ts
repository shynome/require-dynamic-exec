import './global'
export function ProxyFunction(func:Function,getTarget:()=>any){
  if(typeof func!=='function'){
    return func
  }
  return new Proxy(func,{
    apply(func,that,args){
      let newGetTarget = ()=>getTarget().apply(that,args)
      return ProxyFunction(newGetTarget(),newGetTarget)
    }
  })
}
/**鬼知道你们会在 this 上干什么事 , 比如构建实例之类的 , 等等这好像是我的问题 , 那就只代理函数和模块了 */
export function ProxyObject(obj:Object,getTarget:()=>any){
  return new Proxy(obj,{
    get(obj,key){
      let newGetTarget = ()=>getTarget()[key]
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
    // case request[0] !== '.': //过滤掉非相对路径的模块
    case /\\node_modules\\/.test(this.id):
      return exports
    case typeof exports==='function':
      return ProxyFunction(exports,getTarget)
    case typeof exports==='object' && !!exports:
      return ProxyModule(exports,getTarget)
    default:
      return exports
  }
}
module.constructor.prototype.require = dynamicRequire
export { watch } from './watch'

