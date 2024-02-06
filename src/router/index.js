import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const routes = [
  {
    path: '/',
    name: 'Article',
    component: Layout,
    meta: { isMenu: true, title: 'Read list' },
    children: [
      {
        path: '',
        name: 'ArticleIndex',
        meta: { title: '首页' },
        component: () => import('@/views/index.vue'),
      },
      {
        path: 'form-api',
        meta: { title: '表单组件相关API' },
        component: () => import('@/views/article/1-form-api/index.vue'),
      },
      {
        path: 'execution',
        meta: { title: '验证方法使用' },
        component: () => import('@/views/article/2-validate-exec/index.vue'),
      },
      {
        path: 'split-form-item',
        meta: { title: '表单项拆分' },
        component: () => import('@/views/article/3-split-form-item/index.vue'),
      },
      {
        path: 'split-form',
        meta: { title: '表单拆分' },
        component: () => import('@/views/article/4-split-form/index.vue'),
      },
    ],
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Layout,
    meta: { isMenu: true, title: 'Demo list' },
    children: [
      { path: '', name: 'DemoIndex', component: () => import('@/views/demo/index.vue') },
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
        path: 'split-form',
        meta: { title: '表单拆分' },
        component: () => import('@/views/demo/7-split-form/index.vue'),
      },
      {
        path: 'split-comp',
        meta: { title: '组件拆分' },
        component: () => import('@/views/demo/8-split-comp/index.vue'),
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
  // scrollBehavior: () => ({ top: 0 }),
  scrollBehavior: () => {
    return new Promise((resolve, reject) => {
      // transition delay: fade-transform
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 200)
    })
  },
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // set page title
  document.title = (pageTitle => {
    if (pageTitle) {
      return `${pageTitle} - Element Plus Form Validation Demo`
    }
    return 'Element Plus Form Validation Demo'
  })(to.meta.title)
  next()
  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
