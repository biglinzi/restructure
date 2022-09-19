<template>
  <div>
    <el-form ref="ruleFormRef" class="login-code" :model="form" :rules="rules">
      <el-form-item prop="phone">
        <el-input
          v-model.trim="form.phone"
          placeholder="请输入手机号"
          tabindex="100"
          name="phone"
          @blur="data.errorMessage = ''"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="form.code"
          placeholder="请输入验证码"
          tabindex="101"
          class="login-code"
          @blur="data.errorMessage = ''"
          @keyup="handleSubmit(ruleFormRef)"
        />
        <el-button
          class="get-code"
          @click="handleSend"
          :disabled="data.isSend"
          >{{ data.sendCount }}</el-button
        >
      </el-form-item>
      <el-form-item class="form-error"
        >{{ data.errorMessage }}&nbsp;</el-form-item
      >
      <div class="seat"></div>
      <el-form-item>
        <el-button
          type="primary"
          class="confirm-btn"
          :loading="data.formLoading"
          @click="handleSubmit(ruleFormRef)"
          tabindex="102"
          >立即登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import Cookies from 'js-cookie'
import {
  getSmsCode, // 获取验证码
  loginBySms, // 验证码登录
} from '@/api/login'
import { getDomain } from '@/utils/utils'

export default defineComponent({
  setup(props, context) {
    let data = reactive({
      sendCount: '获取验证码',
      verification: false,
      isSend: false,
      errorMessage: '',
      formLoading: false,
    })
    let form = reactive({
      phone: '',
      code: '',
    })

    const rules = reactive<FormRules>({
      phone: [
        {
          required: true,
          trigger: 'blur',
          message: '手机号不能为空',
        },
      ],
    })
    // form ref 字段 必须与此处变量key 一致
    const ruleFormRef = ref<FormInstance>()
    const handleSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          loginBySms({
            phone: form.phone,
            code: form.code,
          })
            .then((data) => {
              let domain = getDomain()
              Cookies.set('token', data.token || '', { domain, expires: 1 })
              context.emit('success')
            })
            .catch((err) => {
              data.errorMessage =
                (err && err.data && err.data.message) || '未知错误'
            })
            .finally(() => {
              data.formLoading = false
            })
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    // 发送短信验证码
    const handleSend = async (formEl: FormInstance | undefined) => {
      if (!formEl) return false
      await formEl.validate((valid) => {
        if (valid) {
          getSmsCode({
            phone: form.phone,
            application: '知因拓客',
          })
            .then(() => {
              let sendNum = 60
              const auth_time = setInterval(() => {
                data.isSend = true
                data.sendCount = '重新获取' + sendNum-- + 's'
                if (sendNum <= 0) {
                  data.verification = false
                  data.sendCount = '获取验证码'
                  data.isSend = false
                  clearInterval(auth_time)
                }
              }, 1000)
            })
            .catch((err) => {
              data.errorMessage =
                (err && err.data && err.data.message) || '未知错误'
            })
            .finally(() => {})
        }
      })
    }
    return {
      rules,
      data,
      form,
      ruleFormRef,
      handleSubmit,
      handleSend,
    }
  },
})
</script>

<style lang="less" scoped>
@import url('~@/styles/theme.less');

.login-code {
  .el-icon-code {
    margin: 0px 3px;
  }

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

    .login-code {
      width: 200px;
    }

    .get-code {
      float: right;
    }
  }

  .seat {
    height: 28px;
  }
}
</style>
