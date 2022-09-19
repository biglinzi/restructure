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
  width: 100%;
  min-height: 100vh;
  background-image: url(~@/assets/toker/login-bg.jpg);
  background-size: cover;
  background-position: center;
  & > .logo {
    padding: 20px 30px;
    img {
      height: 36px;
    }
  }
  .login-content {
    position: absolute;
    top: 23%;
    right: 10%;
    width: 380px;
    height: 398px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(92, 108, 163, 0.23), 0px 4px 31px rgba(103, 121, 185, 0.4);
    .form-container {
      width: 380px;
      height: 100%;
      padding: 30px 20px 10px 30px;
      overflow: hidden;
      & > h2 {
        margin: 10px 0 40px;
        font-size: 24px;
        text-align: center;
        color: #515361;
      }
    }
    .login-style {
      .el-tabs__item {
        height: 70px !important;
        line-height: 70px !important;
        font-weight: 400 !important;
        font-size: 18px !important;
      }
      .el-tabs__item.is-active {
        font-style: normal !important;
        font-weight: 700 !important;
        font-size: 18px !important;
      }
      .el-tabs__active-bar {
        width: 106px !important;
        height: 4px;
        left: 33px;
      }
    }
  }
}
</style>
