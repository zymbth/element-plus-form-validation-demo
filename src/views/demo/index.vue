<script setup>
import RoutePageUl from '@/components/route-page-ul.vue'

</script>
<template>
  <div>
    <h3>Demo list:</h3>
    <RoutePageUl
      :routes="$router.options.routes.find(r => r.name === 'Demo')?.children"
      basePath="/demo" />
  </div>
</template>
