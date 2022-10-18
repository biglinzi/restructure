import { post,get } from '@/components/serverComponent/http/instance'

//顶部卡片统计
export function getStatistics<T>(data){
  return post<T>('/octopus/statistics/getStatistics',data)
}
