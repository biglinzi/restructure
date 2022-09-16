<template>
  <div class="login">
    <h1 class="logo">
      <slot name="logo">
        <img :src="systemSettings.logoPath + 'logo_colorized.png'" alt="logo" />
      </slot>
    </h1>
    <div class="login-content clearfix">
      <div class="fl showcase">
        <img
          src="../assets/img/login-decoration.png"
          alt="登录"
          height="100%"
        />
      </div>
      <div class="fl form-container">
        <h2>登 录</h2>
        <login-form @success="backTopreviousPage"></login-form>
        <p>若忘记密码，请联系管理员</p>
      </div>
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
