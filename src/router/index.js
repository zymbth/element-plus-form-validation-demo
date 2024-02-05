import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const routes = [
  {
    path: '/',
    component: Layout,
    name: 'Home',
    meta: { isMenu: true, title: 'Read list' },
    children: [
      { path: '', meta: { title: '首页' }, component: () => import('@/views/index.vue') },
      {
        path: 'form-api',
        meta: { title: '表单相关API' },
        component: () => import('@/views/home/index.vue'),
      },
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
    name: 'Demo',
    meta: { isMenu: true, title: 'Demo list' },
    children: [
      { path: '', component: () => import('@/views/demo/index.vue') },
      {
        path: 'basic',
        meta: { title: '基本示例' },
        component: () => import('@/views/demo/1-basic/index.vue'),
      },
      {
        path: 'inline-validate',
        meta: { title: '行内验证' },
        component: () => import('@/views/demo/2-inline-validate/index.vue'),
      },
      {
        path: 'validator',
        meta: { title: '自定义表单验证' },
        component: () => import('@/views/demo/3-validator/index.vue'),
      },
      {
        path: 'regex',
        meta: { title: '正则验证' },
        component: () => import('@/views/demo/4-regex/index.vue'),
      },
      {
        path: 'deep-rules-object',
        meta: { title: '深层规则验证-对象' },
        component: () => import('@/views/demo/5-deep-rules-object/index.vue'),
      },
      {
        path: 'deep-rules-array',
        meta: { title: '深层规则验证-数组' },
        component: () => import('@/views/demo/6-deep-rules-array/index.vue'),
      },
      {
        path: 'simple',
        meta: { title: '极简使用' },
        component: () => import('@/views/demo/simple/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
