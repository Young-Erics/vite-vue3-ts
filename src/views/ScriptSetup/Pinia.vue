<template>
  <div>pinia-count {{ count }}</div>
  <div>pinia-doubleCount {{ doubleCount }}</div>
  <div>pinia-arr {{ counterStore.arr[1] }}</div>
  <div>pinia-otherGetter {{ otherGetter }}</div>
  <p>user:{{ getUserById(2)?.name }}</p>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useUnameStore } from '@/stores/uname'
// 执行一下这个函数，就可以获取到 store 了
const counterStore = useCounterStore()
const unameStore = useUnameStore()
// 解构 store
const { count, doubleCount, otherGetter } = storeToRefs(counterStore)
const { getUserById } = storeToRefs(unameStore)
// 监听store
counterStore.$subscribe((mutation, state) => {
  // mutation参数包含了一系列关于侦听到的state的参数项
  console.log('subscribe的mutations', mutation)
  // 每当状态发生变化时，将 state 本地存储
  sessionStorage.setItem('counter', JSON.stringify(state))
})
// 修改store 两种写法
// 1.接收一个函数来修改,适合批量修改 patch function
counterStore.$patch(state => {
  state.count = 5
  state.arr.push(10)
})
// 2.对象形式修改 patch object
counterStore.$patch({
  count: count.value + 2
})
// 3.直接修改
count.value++
counterStore.increment()
</script>

<style lang="scss" scoped></style>
