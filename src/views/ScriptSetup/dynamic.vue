<template>
  <div>
    <button v-for="(item, index) in tabs" :key="index" @click="toggleBtn(item)">
      {{ item.name }}
    </button>
    <!-- 对于缓存的组件来说，再次进入时，我们是不会执行created或者mounted等生命周期函数的 -->

    <KeepAlive exclude="homee">
      <component :is="currentTab.tabCom"></component>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import Homee from './components/homee.vue'
import About from './components/about.vue'
// 动态组件

const tabs = reactive([
  // proxy会代理reactive中的所有内容
  // 无需对组件进行proxy代理
  // 必须使用markRaw跳过对组件的代理，否则vue会给警告
  {
    name: 'Homee',
    tabCom: markRaw(Homee)
  },
  {
    name: 'about',
    tabCom: markRaw(About)
  }
])
let currentTab = reactive({
  tabCom: tabs[0].tabCom
})
const toggleBtn = (item: any) => {
  currentTab.tabCom = item.tabCom
}
</script>

<style lang="scss" scoped></style>
