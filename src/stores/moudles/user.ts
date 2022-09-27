import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    userData: {},
    userType: '',
    message: 'HellowWord',
  }),
  getters: {
    fullMessage: (state) => `The userData is "${state.message}".`,
  },
  actions: {
    // 异步更新 message
    // async upDateUserData(newMessage: string): Promise<string> {
    //   return new Promise((resolve) => {})
    // },
    // 同步更新 message
    // updateMessageSync(newMessage: string): string {
    //   // 这里的 this 是当前的 Store 实例
    //   this.message = newMessage
    //   return 'Sync done.'
    // },
  },
})
