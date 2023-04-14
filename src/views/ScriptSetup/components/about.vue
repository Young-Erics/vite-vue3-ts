<template>
  <div>about子组件</div>
  <input :value="tool" @input="update" />
</template>

<script setup lang="ts">
defineProps({
  tool: String
})
const emit = defineEmits(['update:tool'])
const update = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:tool', target.value)
}
</script>

<style lang="scss" scoped></style>
