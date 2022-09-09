import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

let Cookies = require('js-cookie')
let { getDomain } = require('@/utils/utils')
// 自定义码值等于0时认为接口响应正常
let PASS_CODE = 0
// 实例化，用于隔离配置
let http: AxiosInstance = axios.create()
// 判断浏览器是否支持History API，即单页应用须使用history路由模式
let supportsHistoryMode =
  window.history && typeof window.history.pushState === 'function'

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let token = Cookies.get('token')
    // 配置token
    if (!config.headers!.token && !!token) config.headers!.Token = token
    // 配置restful参数
    if (/:\w+/g.test(config.url as string)) {
      Object.keys(config.params).forEach((key) => {
        let reg = RegExp(':' + key, 'i')
        if (reg.test(config.url as string)) {
          config.url = config.url!.replace(reg, config.params[key])
          delete config.params[key]
        }
      })
    }
    return config
  },
  (err: AxiosResponse) => Promise.reject(err)
)

/**
 * 异步请求拦截器：响应阶段
 * 判断自定义状态码
 * HTTP状态码为401时(token错误/过期)强制跳转登录页
 */
http.interceptors.response.use(
  (res: AxiosResponse) => {
    let { data, request } = res
    // 文件流
    if (request.responseType === 'blob') {
      return res
    }
    // 数据正常
    if (data.code === PASS_CODE) {
      return data.data
    }
    // 数据异常
    return Promise.reject(res)
  },
  (err: AxiosError) => {
    // token不存在/错误/过期时统一返回401状态码
    if ((err.response as AxiosResponse<unknown, any>).status === 401) {
      let domain = getDomain()
      // 移除根域名下token
      domain && Cookies.remove('token', { domain })
      // 移除token
      Cookies.remove('token')
      // 若浏览器支持history路由模式，则退出登录时记住来源页
      if (supportsHistoryMode) {
        let fromURL =
          window.top!.location.pathname === '/'
            ? ''
            : encodeURIComponent(
                window.top!.location.pathname + window.top!.location.search
              )
        fromURL && (fromURL = '?from=' + fromURL)
        window.top!.location.assign('/login' + fromURL)
      }
    }
    return Promise.reject(err.response)
  }
)

export default http
