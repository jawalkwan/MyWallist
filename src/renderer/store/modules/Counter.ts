import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    main: 0
  }),
  
  actions: {
    decrementMainCounter() {
      this.main--
    },
    
    incrementMainCounter() {
      this.main++
    },
    
    async someAsyncTask() {
      // do something async
      this.incrementMainCounter()
    }
  },
  
  persist: true
})
