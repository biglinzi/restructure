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
        <template #suffix>{{ accountSuffix }}</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <!-- 防止浏览器自动填充密码 -->
      <input type="password" name="pwd" class="fake-input" />
      <el-input
        v-model.trim="form.password"
        prefix-icon="el-icon-lock"
        type="password"
        placeholder="请输入您的密码"
        tabindex="101"
        @blur="stateData.errorMessage = ''"
        @keyup.enter.native="handleSubmit"
      ></el-input>
    </el-form-item>
    <el-form-item class="form-error"
      >{{ stateData.errorMessage }}&nbsp;</el-form-item
    >
    <el-form-item>
      <el-button
        type="primary"
        class="confirm-btn"
        :loading="formLoading"
        @click="handleSubmit"
        tabindex="102"
        >立即登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
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
const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
return {
  form,
  rules,
  stateData,
}
</script>

<style lang="less" scoped>
.login-form {
  .el-form-item {
    .el-input {
      & > .el-input__prefix {
        left: 1px;
        color: #888;
        font-size: 16px;
      }

      & > input {
        border-radius: 0;
        border-width: 0 0 1px 0;
      }

      &.account-input {
        .el-input__suffix-inner {
          color: #333;
        }
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
    }

    &.form-error {
      margin-top: -5px;
      margin-bottom: 0px;
      white-space: nowrap;
      overflow: hidden;
      color: #e05454;
    }
  }
}
</style>