<template>
  <router-view :key="key" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() =>
  route.name ? String(route.name) + new Date() : String(route.path) + new Date()
)
</script>
<style lang="less">
@import '~@/styles/common.less';
@import '~@/styles/sprite.less';
@import '~@/styles/theme.less';
@import '~@/styles/el-theme/local.less';

html,
body {
  height: 100%;
  min-width: @app-min-width;
}

#knowlegene-marketing {
  position: relative;
  min-height: 100vh;
  min-width: 1200px;
  background: #ecf1f8;

  // 内嵌通知详情
  & > .notification-article {
    margin: 20px;
    padding: 20px;
    min-height: 500px;
    background-color: #fff;
  }

  // 内嵌企业中心
  & > .org-admin-wrapper {
    padding: 20px 16px 20px 0;
    & > .admin-side-nav {
      padding-top: 80px;
    }
  }
}
</style>
