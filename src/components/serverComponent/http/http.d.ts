//response 返回类型声明
// 根据当前项目返回值格式创建
interface  MyResponseType <T> {
  code: number;
  message: string;
  data: T;
}
interface apiFn <T>{
  ():Promise<MyResponseType<T>>
}
