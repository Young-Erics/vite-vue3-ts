<template>
  <div>
    <!-- 实现父子组件数据双向绑定 -->
    <!-- 1.不使用vueuse的useVModel，原始方法 -->
    <child :tool="data" @update:tool="update" />
    <div>{{ data }}</div>
    <!-- 2.使用useVModel方法 -->
    <child2 v-model:mouse="data2" />
    <div>{{ data2 }}</div>
    <div>{{ data2 }}</div>
    <div>v-model</div>
    <div>v-model2</div>
    <div>v-model3</div>
    <div>v-model4</div>
  </div>
</template>

<script setup lang="ts">
import child from './components/about.vue'
import child2 from './components/homee.vue'
// ------------原始方法--------------
let data = ref('工具')
// val就是子组件传来的参数
const update = (val: string) => {
  data.value = val
}
// ------------使用useVModel方法--------------
let data2 = ref('鼠标')
</script>

<style lang="scss" scoped></style>
