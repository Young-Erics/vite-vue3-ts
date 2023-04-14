export const useUnameStore = defineStore('uname', {
  state: () => ({
    oneName: '张晋',
    users: [
      { id: 1, name: 'Tom' },
      { id: 2, name: 'Jack' }
    ]
  }),
  getters: {
    oneNamesWife(state) {
      return state.oneName + '的老婆是蔡少芬'
    },
    // 将参数传递给 getter
    getUserById(state) {
      return (userId: Number) => state.users.find(user => user.id === userId)
    }
  }
})
