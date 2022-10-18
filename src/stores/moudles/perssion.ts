import { defineStore } from 'pinia'
import { getSession } from '@/api/perssion'
import { useUserStore } from './user'

interface perissionState{
  menuList:any[],
  userType:string|number,
  message:string
}
export const usePerissionStore = defineStore('usePerissionStore', {
  state: ():perissionState => ({
    menuList: [],
    userType: '',
    message: '',
  }),
  getters: {
    fullMessage: (state) => `The perssion is "${state.message}".`,
  },
  actions: {
    async getMenuList() {
      return getSession().then((res) => {
        this.menuList = res.data.menuList
        const store = useUserStore()
        store.userData = res.data.user
      })
    },
    // 异步更新 message
    // async getPerssionDta(): Promise<string> {
    // return new Promise((resolve) => {
    //   getSession().then(res=>{

    //     resolve()
    //   })
    // })
    // },
    // // 同步更新 message
    // updateMessageSync(newMessage: string): string {
    //   // 这里的 this 是当前的 Store 实例
    //   this.message = newMessage
    //   return 'Sync done.'
    // },
  },
})
