<template>
  <div class="appp">home子组件</div>
  <input type="text" v-model="newData" />
</template>

<script setup lang="ts">
onActivated(() => {
  console.log('激活home子组件')
})
onDeactivated(() => {
  console.log('离开home子组件')
})
const props = defineProps({
  mouse: String
})
const emit = defineEmits(['update:mouse'])
const newData = useVModel(props, 'mouse', emit)
</script>

<style lang="scss" scoped>
.appp {
  width: 330px;
  height: 30px;
}
</style>
