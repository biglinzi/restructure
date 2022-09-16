import { post } from '@cp/http/instance'

export interface LoginData {
  account: string
  password: string
}
const login = async (data: LoginData) => {
  return post<any>({
    url: '/api/auth/doLogin',
    data,
  })
}
export { login }
