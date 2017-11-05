import { ProxyFunction,ProxyModule } from "./proxyModule";
//save origin require
module.constructor.prototype.originRequire = module.constructor.prototype.require
import { watchRequireFile } from './'
//proxy module
export function hookRequire(this:NodeModule,request,forced_proxy=false){
  let getTarget = ()=>this.originRequire(request)
  let exports = getTarget()
  switch(true){
    case forced_proxy:
    default:
      this.children.map(({filename})=>filename).forEach(watchRequireFile)
      watchRequireFile(this.id)
      switch(true){
        default:
          return exports
        case typeof exports==='function':
          return ProxyFunction(exports,getTarget)
        case typeof exports==='object' && !!exports:
          return ProxyModule(exports,getTarget)
      }
    case !(/\/|\\/.test(request))://ignore require node_module and core module
    case /node_modules/.test(this.id)://ignore request from node_modules 
      return exports  
  }
}