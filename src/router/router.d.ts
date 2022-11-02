import type { Router } from 'vue-router'
interface openParma {
  name:string,
 [key:string]:any
}
export interface Routers extends Router {
  $open: (locationString: string|openParma) => void
  $verification: (v: boolean) => void
}
