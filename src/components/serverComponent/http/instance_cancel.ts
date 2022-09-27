import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

const CancelToken = axios.CancelToken
const REQUEST_PENDING_MAP = new Map()
/**
 * 将当前请求添加到MAP中
 * @param {Object} config 请求配置/响应配置
 */
export const addPending = (config: AxiosRequestConfig) => {
  // ignoreParamsWithCancel属性放入config.header原因  config 属性在axios中定义的为固定属性不能拓展其他属性，config.header为可拓展属性.
  const requestKey = (config.headers as AxiosRequestHeaders)
    .ignoreParamsWithCancel
    ? [config.method, config.url].join('&')
    : [
        config.method,
        config.url,
        JSON.stringify(config.params),
        JSON.stringify(config.data),
      ].join('&')
  config.cancelToken =
    config.cancelToken ||
    new CancelToken((cancel) => {
      //如果 pending 中不存在当前请求，则添加进去
      if (!REQUEST_PENDING_MAP.has(requestKey)) {
        REQUEST_PENDING_MAP.set(requestKey, cancel)
      }
    })
}

/**
 * 移除请求（取消重复的请求、移除已完成的请求）
 * @param {Object} config 请求配置/响应配置
 * @param {String} type [request|response] 请求拦截时的config.data是对象或undefined，响应拦截时的config.data是JSON字符串或undefined
 */

export const removePending = (config: AxiosRequestConfig, type: string) => {
  const requestKey = (config.headers as AxiosRequestHeaders)
    .ignoreParamsWithCancel
    ? [config.method, config.url].join('&')
    : [
        config.method,
        config.url,
        JSON.stringify(config.params),
        type === 'request'
          ? JSON.stringify(config.data)
          : config.data
          ? JSON.stringify(JSON.parse(config.data))
          : config.data,
      ].join('&')
  //如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
  if (REQUEST_PENDING_MAP.has(requestKey)) {
    const cancel = REQUEST_PENDING_MAP.get(requestKey)
    cancel(requestKey)
    REQUEST_PENDING_MAP.delete(requestKey)
  }
}

/**
 * 清空所有pending中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of REQUEST_PENDING_MAP) {
    cancel(url)
  }
  REQUEST_PENDING_MAP.clear()
}

/**
 * 判断错误是否因为取消请求导致
 * @param {Error} error 错误对象
 * @returns {Boolean}
 */
export const isCancel = (error) => {
  return axios.isCancel(error)
}
