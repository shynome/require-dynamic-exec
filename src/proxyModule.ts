export function ProxyFunction(func:Function,getTarget:()=>any){
  if(typeof func!=='function'){
    return func
  }
  return new Proxy(func,{
    get(obj,key){
      let val = obj[key]
      return typeof val === 'function'?val.bind(obj):val
    },
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