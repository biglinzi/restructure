import { get } from '@/components/serverComponent/http/instance'

/**
 *
 * 获取用户信息
 */
interface menu {
  mid: string
  parentId: string
  name: string
  permission: string
  icon: string | null
  childList: Object[] | null
  content: string | null
}
interface org {
  createBy: string | number
  createByName: string
  createDate: string
  updateDate: string
  orgcode: string | number | null
  orgName: string
  simpleOrgName: string
  person: string
  tel: string | number
  type: 'normal' | 'test' //正常机构|试用机构
  opfrom: string
  opto: string
  status: number | string
  accountNumber: number
  mid: string | null
}
interface user {
  createBy: string
  createByName: string
  createDate: string
  updateDate: string
  username: string
  password: string
  name: string
  type: 'ordinary' | 'child' //普通账号|子账号
  email: string
  mobile: string | null
  loginFlag: boolean | null
  orgId: string
  deptId: string
  deptName: string
  deptArea: string
  deptAreaCode: number | string | null
  status: string
  roles: any[]
  roleIds: string[]
  deleted: number
  disableTime: null
  loginCode: null
  dataScope: null
  thirdAccount: null
  mid: string | null
}
declare interface perssionDataType {
  menuList: menu[]
  org: org
  user: user
}
export function getSession() {
  return get<perssionDataType>(
     '/auth/getSession',
     { params: { sysCode: 'octopus' }, transformResponse: formatter },
  )
  function formatter(data:perssionDataType) {
    let { menuList = [], ...rest } = data
    return {
      ...rest,
      permissionList: menuList.map((item) => {
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
