import { post, get } from '@/components/serverComponent/http/instance'

export interface LoginData {
  account: string
  password: string
}
interface loginResType{
  token:string
}
// 登陆
const login = async (data: LoginData) => {
  return post<loginResType>(
    '/auth/doLogin',
    data,
  )
}
export interface loginOutType {
  id: string
}
/**
 * 登出
 * @param {Object} data
 */
const logout = (data: loginOutType) => {
  return get(
    '/api/auth/doLogout',
    data,
  )
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
  return post( '/api/auth/getSmsCode', data)
}
export interface loginBySmsType {
  phone: string
  code: string
}
const loginBySms = (data: loginBySmsType) => {
  return post('/api/auth/doLoginBySms', data )
}

export { login, logout, getSmsCode, loginBySms }
