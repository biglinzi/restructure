import { post, get } from '@/components/serverComponent/http/instance'

export interface LoginData {
  account: string
  password: string
}
// 登陆
const login = async (data: LoginData) => {
  return post({
    url: '/api/auth/doLogin',
    data,
  })
}
export interface loginOutType {
  id: string
}
/**
 * 登出
 * @param {Object} data
 */
const logout = (data: loginOutType) => {
  return get({
    url: '/api/auth/doLogout',
    data,
  })
}

/**
 * 短信验证码获取/登录
 * @param {Object} data
 */
export interface smCodeDataType {
  phone: string
  application: '知因拓客'
}
const getSmsCode = (data: smCodeDataType) => {
  return post({ url: '/api/auth/getSmsCode', data })
}
export interface loginBySmsType {
  phone: string
  code: string
}
const loginBySms = (data: loginBySmsType) => {
  return post({ url: '/api/auth/doLoginBySms', data })
}

export { login, logout, getSmsCode, loginBySms }
