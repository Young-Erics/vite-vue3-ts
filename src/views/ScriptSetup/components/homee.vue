<template>
  <div class="appp">home子组件</div>
</template>

<script setup lang="ts">
onActivated(() => {
  console.log('激活home子组件')
})
onDeactivated(() => {
  console.log('离开home子组件')
})
</script>

<style lang="scss" scoped>
.appp {
  width: 330px;
  height: 30px;
}
</style>
