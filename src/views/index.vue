<script setup>
import RoutePageUl from '@/components/route-page-ul.vue'

</script>
<template>
  <div>
    <a target="_blank" href="https://blog.csdn.net/ymzhaobth/article/details/120820053">博文：element-plus表单验证使用 个人总结</a>
    <h3>Read list:</h3>
    <RoutePageUl
      :routes="$router.options.routes.find(r => r.name === 'Article')?.children"
      basePath="/" />
  </div>
</template>
