import { login ,logout } from '@cp/pageComponent'
import type { RouteRecordRaw } from 'vue-router'
import knowlegeneRouter from "@/router/routes/knowToker";
// import loginName form '@views/login'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const routers: RouteRecordRaw[] = [
  // {
  //   path:'/content',
  //   name:'content',
  //   redirect:"content/knowtoker",
  //   component:()=>import('@cp/layout/index.vue'),
  //   children:[knowToker],
  // },
  ...knowlegeneRouter,
  {
    path: '/login',
    name: 'login',
    component:login,
    meta: {
      authRequired: false, // 免登录
      title: '请登录',
    },
  },
  {
    path: '/logout',
    name: 'logout',
    component:logout,
    meta: {
      authRequired: false, // 免登录
      title: '请登录',
    },
  },
]

export default routers
