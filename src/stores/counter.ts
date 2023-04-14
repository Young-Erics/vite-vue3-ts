import { useUnameStore } from './uname'
// defineStore()定义一个store，第一个参数表示storeID，第二个参数表示配置项
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 3, arr: [1] }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    // 可访问其他getter, 返回类型必须明确设置
    doublePlusOne(): number {
      return this.doubleCount + 1
    },
    // 访问其他store的getter
    otherGetter(state) {
      const useOtherStore = useUnameStore()
      return useOtherStore.oneNamesWife + state.count
    }
  },
  actions: {
    increment() {
      this.count++
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        // key: 'myCounter', // 存储的 key 值，默认为 storeId
        // storage: localStorage, // 存储的位置，默认为 sessionStorage
        // paths: ['name', 'age'] // 需要存储的 state 状态，默认存储所有的状态
      }
    ]
  }
})
