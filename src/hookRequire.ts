import { ProxyFunction,ProxyModule } from "./proxyModule";
//save origin require
module.constructor.prototype.originRequire = module.constructor.prototype.require
import { watchRequireFile } from './clearCache'
//proxy module
module.constructor.prototype.require = hookRequire
export function hookRequire(this:NodeModule,request){
  let getTarget = ()=>this.originRequire(request)
  let exports = getTarget()
  switch(true){
    case !(/\/|\\/.test(request))://ignore require node_module and core module
    case /node_modules/.test(this.id)://ignore request from node_modules 
    default:
      return exports
    case typeof exports==='function':
      watchRequireFile(this.id)
      return ProxyFunction(exports,getTarget)
    case typeof exports==='object' && !!exports:
      watchRequireFile(this.id)
      return ProxyModule(exports,getTarget)
  }
}