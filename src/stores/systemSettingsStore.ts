import { defineStore } from 'pinia'

interface systemSettingsType {
  logoPath: string
  systemName: string | undefined
  systemCode: string | undefined
  accountSuffix?: string | undefined
}
export const useSystemSettingsStore = defineStore('systemSettings', {
  state: () => ({
    systemSettings: {
      logoPath: '//static.knowlegene.com/',
      systemName: process.env.VUE_APP_TITLE,
      systemCode: process.env.VUE_APP_CODE,
      accountSuffix:''
    },
  }),
  getters: {
    fullMessage: (state) => `The message is "${state.systemSettings}".`,
  },
  actions: {
    // 异步更新 message
    async updateMessage(newMessage: systemSettingsType): Promise<string> {
      return new Promise((resolve) => {
        setTimeout(() => {
          // 这里的 this 是当前的 Store 实例
          this.systemSettings = newMessage
          resolve('Async done.')
        }, 3000)
      })
    },
    // 同步更新 message
    updateMessageSync(newMessage: systemSettingsType): string {
      // 这里的 this 是当前的 Store 实例
      this.systemSettings = newMessage
      return 'Sync done.'
    },
  },
})
