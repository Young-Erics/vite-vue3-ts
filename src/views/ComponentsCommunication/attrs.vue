<template>
  <div>
    <h2 v-bind="$attrs">{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts">
export default {
  // props: ['title', 'content']
  inheritAttrs: true,
  props: {
    title: String,
    content: {
      type: String,
      required: false,
      default: '123'
    },
    counter: {
      type: Number
    },
    info: {
      type: Object,
      default() {
        return { name: 'why' }
      }
    },
    messageInfo: {
      type: String
    }
  },
  setup() {
    const instance = getCurrentInstance()?.proxy
    console.log('$attrs', instance?.$attrs)
  }
}
</script>

<style scoped></style>
