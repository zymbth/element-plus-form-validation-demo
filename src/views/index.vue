<script setup>
import RoutePageUl from '@/components/route-page-ul.vue'
</script>
<template>
  <div>
    <a target="_blank" href="https://blog.csdn.net/ymzhaobth/article/details/120820053"
      >博文：element-plus表单验证使用 个人总结</a
    >
    <h3>相关链接：</h3>
    <ul class="no-marker">
      <li>
        <a target="_blank" href="https://element-plus.org/zh-CN/component/form.html"
          >element-plus Form组件官方文档</a
        >
      </li>
      <li>
        <a target="_blank" href="https://github.com/yiminghe/async-validator"
          >async-validator - Github</a
        >
      </li>
      <li>
        <a target="_blank" href="https://gitee.com/mirrors/async-validator"
          >async-validator - Gitee</a
        >
      </li>
    </ul>
    <h3>Read list:</h3>
    <RoutePageUl
      :routes="$router.options.routes.find(r => r.name === 'Article')?.children"
      basePath="/" />
  </div>
</template>
