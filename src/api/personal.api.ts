import http, { get,post } from '@/components/serverComponent/http/instance'

export function getMessage <T>(data){
  return post<T>("api/user/message/getMessage",data)
}
