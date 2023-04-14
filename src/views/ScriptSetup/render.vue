<template>
  <!-- <my-div />
  <h-button /> -->
  <div></div>
</template>
<script lang="ts">
export default {
  setup() {
    // return () => h('h2', { class: 'render' }, 'h函数')
    let counter = ref(0)
    return () =>
      h('div', null, [
        h('h3', null, `当前的计数${counter.value}`),
        h('button', { onClick: () => (counter.value += 1) }, 'counter + 1'),
        h('button', { onClick: () => (counter.value -= 1) }, 'counter - 1')
      ])
  }
}
//
// let myDiv: any = h('h2', { style: { color: 'red' } }, 'hello,render')
// let myDiv: any = h('h2', { class: 'render' }, 'hello,render')
// 计数器更新
// const props = defineProps({
//   counter: Number
// })
// let counter = ref(0)
// let hButton: any = h('div', null, [
//   h('h3', null, `当前的计数${counter.value}`),
//   h('button', { onClick: () => (counter.value += 1) }, 'counter + 1'),
//   h('button', { onClick: () => (counter.value -= 1) }, 'counter - 1')
// ])
</script>

<style lang="scss" scoped></style>
