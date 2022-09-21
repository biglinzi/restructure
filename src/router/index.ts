import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { websiteTitle } from '@/config'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
// 识别浏览器信息
let userAgent = navigator.userAgent;
let isChrome = userAgent.indexOf('Chrome') > -1
if (!isChrome) {
  alert(
    '请使用Chrome浏览器访问系统，行内电脑可以快速安装，路径：任务栏-安全客户端-软件管家'
  )
}

// let alertStamp: number = 0;
let childrenProduct: number = 5

router.beforeEach((to, from, next) => {
  if (childrenProduct--<=0) {
    // clearPending()
  }
  to.path === '/login' && sessionStorage.clear()
  if (to.path === '/login' || to.path === '/auth') return next()
})
router.afterEach((to) => {
  const { title } = to.meta
  document.title = title ? `${title} - ${websiteTitle}` : websiteTitle
})

export default router
