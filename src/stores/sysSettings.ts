import { defineStore } from 'pinia'

export const usesystemSettingsStore = defineStore('systemSettings', {
  state: () => ({
    systemSettings: '',
  }),
  getters: {
    fullMessage: (state) => `The message is "${state.systemSettings}".`,
  },
  actions: {
    // 异步更新 message
    async updateMessage(newMessage: string): Promise<string> {
      return new Promise((resolve) => {
        setTimeout(() => {
          // 这里的 this 是当前的 Store 实例
          this.systemSettings = newMessage
          resolve('Async done.')
        }, 3000)
      })
    },
    // 同步更新 message
    updateMessageSync(newMessage: string): string {
      // 这里的 this 是当前的 Store 实例
      this.systemSettings = newMessage
      return 'Sync done.'
    },
  },
})
