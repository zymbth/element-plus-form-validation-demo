import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { isMenu: true, title: 'Intro' },
    children: [
      { path: 'home', meta: { title: '首页' }, component: () => import('@/views/home/index.vue') },
      {
        path: 'execution',
        meta: { title: '验证方法使用' },
        component: () => import('@/views/validate-exec/index.vue'),
      },
    ],
  },
  {
    path: '/demo',
    component: Layout,
    meta: { isMenu: true, title: 'Demo list' },
    children: [
      {
        path: 'basic',
        meta: { title: '基本示例' },
        component: () => import('@/views/demo/basic/index.vue'),
      },
      {
        path: 'simple',
        meta: { title: '极简使用' },
        component: () => import('@/views/demo/simple/index.vue'),
      },
      {
        path: 'inline-validate',
        meta: { title: '行内验证' },
        component: () => import('@/views/inline-validate/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
