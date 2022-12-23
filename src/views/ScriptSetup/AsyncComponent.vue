<template>
  <div>
    <h2>{{ time }}</h2>
  </div>
</template>

<script setup lang="ts">
const { time } = defineProps({
  time: {
    type: Number,
    required: true
  }
})

// 加入一个延迟，以模拟加载数据
await new Promise(resolve => {
  setTimeout(() => {
    resolve(time)
  }, 3000)
})
</script>

<style scoped lang="scss"></style>
