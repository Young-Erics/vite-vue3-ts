<template>
  <div>This is toolsdog home page!</div>
  <a-space>
    <a-button type="primary" size="mini" @click="handleClickMini">Mini</a-button>
    <a-button type="primary" size="small">Small</a-button>
    <a-button type="primary">Medium</a-button>
    <a-button type="primary" size="large">Large</a-button>
  </a-space>
  <!-- 这里 -->
  <HelloWorld />
  <!-- 使用icones的图标，Iconify IntelliSense vscode插件支持在代码中预览图标 -->
  <icon-teenyicons-area-chart-solid />
  <!-- 使用自定义图标 -->
  <icon-home-table class="" />
  <icon-user-user />
  <div>路径参数：{{ id }}</div>
  <a-button type="primary" @click="jumpSetupPage">点击跳转到/setup</a-button>
  <!-- 动态返回图片路径 -->
  <img src="@/assets/images/401.gif" />
</template>

<script setup lang="ts">
const handleClickMini = () => {
  AMessage.info('hello isboyjc, click mini AButton!')
}
// 使用useRoute获取路径参数 "id"
const route = useRoute()
let id = ref(route.params.id)
// 路由的跳转
const router = useRouter()
const jumpSetupPage = () => {
  router.push('/setup')
}
const routerMethods = () => {
  router.forward() //向前移动一条记录，等价于 router.go(1)
  router.back() //向后移动一条记录，等价于 router.go(-1)
}
let path = new URL('@/assets/images/401.gif', import.meta.url)
console.log('path', path)
console.log('router', router)
</script>
<style scoped lang="less"></style>
