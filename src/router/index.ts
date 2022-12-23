import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/scriptsetup'
      // component: () => import('../views/HomePage.vue')
    },
    {
      path: '/attrs',
      name: 'attrs',
      component: () => import('../views/ComponentsCommunication/parent.vue')
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('../views/setup/parent.vue')
    },
    {
      path: '/scriptsetup',
      name: 'scriptsetup',
      component: () => import('../views/ScriptSetup/parent.vue')
    }
  ]
})

export default router
