<script setup>
import RoutePageUl from '@/components/route-page-ul.vue'
</script>
<template>
  <div>
    <h3>Demo list:</h3>
    <RoutePageUl
      :routes="$router.options.routes.find(r => r.name === 'Demo')?.children"
      basePath="/demo" />
    <h3>注意：</h3>
    <p>
      本项目实例基于 <code>element-plus@2.4.4</code> & <code>vue@3.3.11</code>，表单验证自
      <code>element-plus@v1.0.x</code> 后变化不大
    </p>
  </div>
</template>
