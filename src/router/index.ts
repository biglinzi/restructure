import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes/publicRouter'
import { websiteTitle } from '@/config'
import { usePerissionStore } from '@/stores'
import type { Router } from 'vue-router'
import { Forbidden } from '@cp/pageComponent'
import { ElMessageBox } from 'element-plus'

interface Routers extends Router {
  $open: (locationString: string) => void
  $verification: (v: boolean) => void
}
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
/**
 * 使用路由配置打开新页面
 * @param {string} locationString
 */
;(router as Routers).$open = (locationString) => {
  const ref = router.resolve(locationString)
  window.open(ref.href, '_blank')
}

/**
 * 路由校验开关
 * @param {boolean} v
 */
;(router as Routers).$verification = function (v) {
  verificationRequired = Boolean(v)
}
// 识别浏览器信息
const userAgent = navigator.userAgent
const isChrome = userAgent.indexOf('Chrome') > -1
if (!isChrome) {
  alert(
    '请使用Chrome浏览器访问系统，行内电脑可以快速安装，路径：任务栏-安全客户端-软件管家'
  )
}
// 标记弹窗状态
let alertStamp = 0
// 权限验证开关
let verificationRequired = true

router.beforeEach((to, from, next) => {
  to.path === '/login' && sessionStorage.clear()
  if (to.path === '/login' || to.path === '/auth') return next()
  // 权限验证
  const store = usePerissionStore()
  if (!store.menuList.length) {
    store
      .getMenuList()
      .then(() => {
        const menuList = store.menuList
        verification(to.matched, menuList)
        next()
      })
      .catch((err) => {
        document.title = '权限验证失败'
        if (err && err.status === 401) return
        if (Date.now() - alertStamp > 6e4) {
          alertStamp = Date.now()
          // 提示错误信息
          ElMessageBox.alert(
            '',
            (err.data && err.data.message) || document.title,
            {
              type: 'error',
              center: true,
              showClose: false,
              confirmButtonText: '登录',
            }
          ).then(() => {
            setTimeout(() => {
              router.push('/login')
            }, 400)
          })
        }
      })
  }else{
    let menuList = store.menuList;
    verification(to.matched, menuList);
    next();
  }
})
router.afterEach((to) => {
  const { title } = to.meta
  document.title = title ? `${title} - ${websiteTitle}` : websiteTitle
})

/**
 * 校验路由权限
 * @param {array} routes 匹配路由列表
 * @param {array} menus 菜单列表
 */
function verification(routes: any[], menus: any[]) {
  if (!verificationRequired) {
    for (let i = 0; i < routes.length; i++) {
      const current = routes[i]
      if (current.path === '/') continue
      if (current.meta.authRequired === false) continue
      if (menus.some((item) => item.name === current.name)) break
      else current.components.default = Forbidden
    }
  }
}
export default router
