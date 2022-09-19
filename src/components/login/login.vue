<template>
  <div class="login">
    <h1 class="logo">
      <a href="http://knowlegene.com/" target="_blank" title="知因智慧">
        <img src="~@/assets/toker/know-logo.svg" alt="知因智慧" />
      </a>
    </h1>
    <div class="login-content clearfix">
      <el-tabs class="login-style" :stretch="true">
        <el-tab-pane label="账号登录">
          <div class="fl form-container">
            <login-form @success="backTopreviousPage"></login-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="验证码登录">
          <div class="fl form-container">
            <login-code @success="backTopreviousPage"></login-code>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { useSystemSettingsStore } from '@/stores/index'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup() {
    function backTopreviousPage() {
      let URL = decodeURIComponent(location.search).replace(/^\?\w+=/g, '')
      if (URL) {
        return URL
        // return this.$router.push(URL);
      }
    }
    const store = useSystemSettingsStore()
    const systemSettings = computed(() => {
      return store.systemSettings
    })
    return {
      backTopreviousPage,
      systemSettings,
    }
  },
})
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  & > .logo {
    padding: 20px 30px;
    img {
      height: 36px;
    }
  }
  .login-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 860px;
    height: 440px;
    margin-top: -230px;
    margin-left: -430px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 0px 20px 4px rgba(202, 215, 225, 1);
    & > .showcase {
      height: 100%;
      width: 350px;
      overflow: hidden;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
    & > .form-container {
      width: 500px;
      height: 100%;
      padding: 50px 100px 0;
      overflow: hidden;
      & > h2 {
        margin: 10px 0 40px;
        font-size: 24px;
        text-align: center;
        color: #515361;
      }
      & > p {
        margin-top: -12px;
        font-size: 12px;
        text-align: right;
        color: #909399;
      }
    }
  }
}
</style>
