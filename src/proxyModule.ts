export const proxyCache = new WeakMap()
export function ProxyFunction(func:Function,getTarget:()=>any){
  if(typeof func!=='function'){
    return func
  }
  if(!proxyCache.has(func)){
    let proxyFunction = new Proxy(func,{
      get(obj,key){
        let val = obj[key]
        return typeof val === 'function'?val.bind(obj):val
      },
      apply(func,that,args){
        let newGetTarget = ()=>getTarget().apply(that,args)
        return ProxyFunction(newGetTarget(),newGetTarget)
      }
    })
    proxyCache.set(func,proxyFunction)
  }
  return proxyCache.get(func)
}
export function ProxyModule(obj:Object,getTarget:()=>any){
  return new Proxy(obj,{
    get(obj,key){
      let newGetTarget = ()=>getTarget()[key]
      return ProxyFunction(newGetTarget(),newGetTarget)
    }
  })
}