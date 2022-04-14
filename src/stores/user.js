import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    username:localStorage.getItem('username')||""
  }),
  getters: {

  },
  actions: {
    setUsername(val){
      this.username=val
      localStorage.setItem('username',val)
    }
  }
})
