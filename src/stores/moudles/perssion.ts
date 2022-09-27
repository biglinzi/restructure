import { defineStore } from 'pinia'
import {getSession} from '@/api/perssion'

export const permissionStore = defineStore('perssion', {
  state: () => ({
    userData: {},
    userType: ""
  }),
  getters: {
    fullMessage: (state) => `The perssion is "${state.message}".`,
  },
  actions: {
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
