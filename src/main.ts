import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import ElementPuls from 'element-plus'

import directives from "./directive";
import permission from "@/directives/permission";
// 全局样式
import '@less/global.less'

createApp(App)
  .use(createPinia()) // 启用 Pinia
  .use(router)
  .use(ElementPuls)
  .use(directives)
  .directive('permission',permission)
  .mount('#app')


