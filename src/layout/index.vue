<template>
  <div>
    <RouterLink to="/homepage/199725" active-class="router-link-active">去hompage</RouterLink>
    <RouterLink to="/attrs" v-slot="{ href, navigate, route, isActive }">
      <a-button type="primary" @click="navigate">href:{{ href }}</a-button>
      <span :class="{ 'active': isActive }">active</span>
      <!-- <p>route{{ route }}</p> -->
    </RouterLink>
    <RouterLink to="/scriptsetup" replace>去scriptsetup</RouterLink>
    <RouterLink to="/echarts">去echarts</RouterLink>
    <hr />
    <!-- 重新部署后提示用户刷新的方法 -->
    <!-- <a-modal
      v-model:visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      ok-text="立即刷新"
      cancel-text="稍后自行刷新"
    >
      <template #title>更新提示</template>
      <div>网页有更新内容，是否立即刷新？</div>
    </a-modal> -->
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { Updater } from '@/utils/update'
/*
  动态添加路由
*/
const router = useRouter()
const routeOne = {
  path: 'one',
  name: 'one',
  component: () => import('@/views/OneRoute.vue')
}
// 为name是default的路由添加children子路由
router.addRoute('default', routeOne)
/*
  获取一个包含所有路由记录的数组
*/
const routerList = router.getRoutes()
console.log('所有路由记录', routerList)
let routerOption = router.options.routes
console.log('routerOption', routerOption) //这是静态路由，一开始在路由规则里定义好的

/**
 * 重新部署后提示用户刷新的方法
 */
//实例化该类
// const up = new Updater({
//   timer: 2000
// })
// //未更新通知
// up.on('no-update', () => {
//   console.log('未更新')
// })
// //更新通知
// up.on('update', () => {
//   console.log('更新了')
//   visible.value = true
// })
// const visible = ref(false)
// const handleOk = () => {
//   visible.value = false
//   window.location.reload()
// }
// const handleCancel = () => {
//   visible.value = false
//   up.clear()
// }
</script>
<style lang="scss" scoped>
// 表示router-link激活时的样式
.router-link-active {
  background-color: blue;
}
.active {
  color: #333;
}
</style>
