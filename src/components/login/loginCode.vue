<template>
  <div>
    <el-form ref="form" class="login-code" :model="form" :rules="rules">
      <el-form-item prop="phone">
        <el-input
          ref="phone"
          v-model.trim="form.phone"
          placeholder="请输入手机号"
          tabindex="100"
          name="username"
          @blur="data.errorMessage = ''"
        >
          <i slot="prefix" class="el-icon-code">
            <img src="~@/assets/toker/phone.svg" alt="logo" />
          </i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model.trim="form.code"
          placeholder="请输入验证码"
          tabindex="101"
          class="login-code"
          @blur="data.errorMessage = ''"
          @keyup.enter="handleSubmit"
        >
          <i slot="prefix" class="el-icon-code">
            <img src="~@/assets/toker/verification-code.svg" alt="logo" />
          </i>
        </el-input>
        <el-button class="get-code" @click="handleSend" :disabled="data.isSend">{{
          data.sendCount
        }}</el-button>
      </el-form-item>
      <el-form-item class="form-error">{{ data.errorMessage }}&nbsp;</el-form-item>
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
import { getDomain } from '@/utils/utils'

export default defineComponent({
  setup(props, context) {
    let data = reactive({
        sendCount: '获取验证码',
        verification: false,
        isSend: false,
        errorMessage: '',
        formLoading: false,
      }),
      form = reactive({
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
    const ruleFormRef = ref<FormInstance>()
    const handleSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          login({
            phone: this.form.phone,
            code: this.form.code,
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

    return {
      rules,
      data,
      form,
      ruleFormRef,
      handleSubmit,
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
