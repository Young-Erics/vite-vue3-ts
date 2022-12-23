<template>
  <div>孙子的颜色{{ color }}</div>
  <div>孙子的state信息{{ state.name }}</div>
</template>

<script setup lang="ts">
const color = inject('color')
const state = inject('state')
</script>

<style scoped lang="scss"></style>
