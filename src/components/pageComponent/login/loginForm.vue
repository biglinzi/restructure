<template>
  <el-form ref="ruleFormRef" class="login-form" :model="form" :rules="rules">
    <el-form-item prop="account">
      <el-input
        ref="account"
        v-model.trim="form.account"
        prefix-icon="el-icon-user"
        placeholder="请输入您的用户名"
        tabindex="100"
        name="username"
        class="account-input"
        @blur="stateData.errorMessage = ''"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <!-- 防止浏览器自动填充密码 -->
      <input type="password" name="pwd" class="fake-input" />
      <el-input
        v-model.trim="form.password"
        prefix-icon="el-icon-lock"
        type="password"
        placeholder="请输入密码"
        tabindex="101"
        @blur="stateData.errorMessage = ''"
        @keyup.enter="handleSubmit(ruleFormRef)"
      ></el-input>
    </el-form-item>
    <el-form-item class="form-error">{{ stateData.errorMessage }}&nbsp;</el-form-item>
    <p>若忘记密码，请联系管理员</p>
    <el-form-item>
      <el-button
        type="primary"
        class="confirm-btn"
        :loading="stateData.formLoading"
        @click="handleSubmit(ruleFormRef)"
        tabindex="102"
        >立即登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">

import { reactive, ref, computed, defineComponent } from 'vue'
import { useSystemSettingsStore } from '@/stores'
import md5 from 'js-md5'
import { getDomain } from '@/utils/utils'
import Cookies from 'js-cookie'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api/login'

export default defineComponent({
  setup(props, context) {
    // const crypto = require('crypto')
    // 使用node 中内置的crypto
    const rules = reactive<FormRules>({
      account: [
        {
          required: true,
          trigger: 'blur',
          message: '用户名不能为空',
        },
      ],
      password: [
        {
          required: true,
          trigger: 'blur',
          message: '密码不能为空',
        },
      ],
    })
    const ruleFormRef = ref<FormInstance>()
    let form = reactive({
      account: '',
      password: '',
    })
    let stateData = reactive({
      errorMessage: '',
      formLoading: false,
    })
    let store = useSystemSettingsStore()
    let accountSuffix = computed(() => {
      return store.systemSettings.accountSuffix
    })
    const handleSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          md5.update(form.password)
          login({
            account: form.account, //+ (accountSuffix || ''),
            password: md5(form.password).toString(),
          })
            .then((data) => {
              let domain = getDomain()
              console.log(data)
              Cookies.set('token', data.data.token || '', { domain, expires: 1 })
              context.emit('success')
            })
            .catch((err) => {
              console.log(err)
              stateData.errorMessage =
                (err && err.data && err.data.message) || '未知错误'
            })
            .finally(() => {
              stateData.formLoading = false
            })
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    return {
      form,
      rules,
      stateData,
      accountSuffix,
      ruleFormRef,
      handleSubmit,
    }
  },
})
</script>

<style lang="less" scoped>
@import url('~@/styles/theme.less');
.login-form {
  .el-form-item {
    .el-input {
      & > .el-input__prefix {
        left: 5px;
        color: #888;
        font-size: 16px;
      }
      & > input {
        border-radius: 3px;
        border-width: 1px;
      }
    }
    .fake-input {
      position: absolute;
      left: 0;
      width: 0;
      height: 0;
      z-index: -1;
      opacity: 0;
    }
    .confirm-btn {
      width: 100%;
      margin-top: 10%;
    }
    &.form-error {
      margin-top: -5px;
      margin-bottom: 0px;
      white-space: nowrap;
      overflow: hidden;
      color: @color-danger;
      position: absolute;
    }
  }
  p {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 400;
    text-align: right;
    color: #666;
    height: 28px;
  }
}
</style>
