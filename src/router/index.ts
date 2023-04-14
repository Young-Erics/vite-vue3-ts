import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/scriptsetup',
      component: layout,
      children: [
        {
          path: 'scriptsetup',
          name: 'scriptsetup',
          // 对分包进行命名，打包后可见
          component: () =>
            import(/* webpackChunkName: "scriptsetup-chunk" */ '../views/ScriptSetup/parent.vue')
        },
        {
          path: 'homepage/:id',
          name: 'homepage',
          component: () => import('../views/HomePage.vue')
        },
        {
          path: 'attrs',
          name: 'attrs',
          component: () => import('../views/ComponentsCommunication/parent.vue')
        },
        {
          path: '/setup',
          name: 'setup',
          component: () => import('../views/setup/parent.vue')
        },
        {
          path: '/echarts',
          name: 'echarts',
          component: () => import('../views/echarts/index.vue')
        }
      ]
    }
  ]
})
/*
  路由守卫
*/

// 全局前置守卫
router.beforeEach((to, from) => {
  console.log('to', to)
  console.log('to', from)
})
export default router
