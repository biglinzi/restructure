import http from './instance'


export function login(data:any) {
  return http.post('/api/auth/doLogin', data)
}

export function logout() {
  return http.get('/api/auth/doLogout')
}

export function getSession(params:any) {
  return http.get('/api/auth/getSession', { params }).then(formatter)
  function formatter(data:any) {
    let { menuList = [], ...rest } = data
    return {
      ...rest,
      menuList: menuList.map((item:any) => {
        let { name, permission, ...others } = item
        return {
          ...others,
          name: permission,
          title: name,
        }
      }),
    }
  }
}
