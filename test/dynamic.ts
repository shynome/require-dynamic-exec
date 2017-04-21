
import { app } from "./b";
import { renderToString } from "react-dom/server";
export let a = ()=>()=>console.log(renderToString(app))
export default a
