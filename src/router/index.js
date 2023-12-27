import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { isMenu: true, title: 'Demos' },
    children: [
      { path: 'home', component: () => import('@/views/home.vue') },
      { path: 'test', component: () => import('@/views/test.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router