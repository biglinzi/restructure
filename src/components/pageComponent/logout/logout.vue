<template>
  <div>
    <div class="logout">
      <div class="message-container">
        <span>{{ message }}</span>
        <i class="el-icon-loading"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getDomain } from '@/utils/utils'
import Cookies from 'js-cookie'
import { logout } from '@/api/logout'
import router from '@/router'

export default defineComponent({
  setup() {
    let message = '正在注销...'
    onMounted(() => {
      logout()
        .then(() => {
          let domain = getDomain()
          Cookies.remove('token', { domain })
          Cookies.remove('token')
        })
        .catch((err) => err)
        .finally(() => {
          message = '已退出...'
          router.replace('/login')
        })
    })
    return {
      message,
    }
  },
})
</script>
<style lang="less" scoped>
.logout {
  margin: 0 auto;
  padding: 35vh 10vw 0;

  &>.message-container {
    font-size: 16px;
    text-align: center;

    &>span {
      margin-right: 5px;
    }
  }
}
</style>
